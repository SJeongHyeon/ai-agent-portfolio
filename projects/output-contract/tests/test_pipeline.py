import json
import unittest

from output_contract.pipeline import run_pipeline


VALID_PAYLOAD = json.dumps({
    "sentiment": "negative",
    "issue": "delivery_delay",
    "delay_days": 3,
    "sentiment_score": -0.8,
})


class SequenceProvider:
    def __init__(self, outputs):
        self.outputs = list(outputs)
        self.calls = []

    def __call__(self, attempt, previous_result):
        self.calls.append({
            "attempt": attempt,
            "previous_error": (
                None if previous_result is None
                else previous_result.error_category
            ),
        })
        return self.outputs[attempt - 1]


class PipelineTests(unittest.TestCase):
    def test_valid_first_attempt_is_accepted_without_retry(self):
        provider = SequenceProvider([VALID_PAYLOAD])

        result = run_pipeline(provider)

        self.assertEqual(result.status, "accepted")
        self.assertEqual(result.attempts, 1)
        self.assertEqual(result.retries, 0)
        self.assertEqual(result.final_decision, "accept")
        self.assertIsNone(result.escalation_owner)
        self.assertEqual([trace.decision for trace in result.traces], ["accept"])
        self.assertEqual(len(provider.calls), 1)

    def test_parse_error_retries_once_then_accepts_repaired_output(self):
        provider = SequenceProvider(["설명만 있는 응답", VALID_PAYLOAD])

        result = run_pipeline(provider)

        self.assertEqual(result.status, "accepted")
        self.assertEqual(result.attempts, 2)
        self.assertEqual(result.retries, 1)
        self.assertEqual(
            [trace.decision for trace in result.traces],
            ["retry", "accept"],
        )
        self.assertEqual(provider.calls[1]["previous_error"], "parse_error")

    def test_repeated_schema_error_escalates_to_configured_owner(self):
        invalid = json.dumps({
            "sentiment": "angry",
            "issue": "delivery_delay",
            "delay_days": 50,
            "sentiment_score": -0.8,
        })
        provider = SequenceProvider([invalid, invalid])

        result = run_pipeline(provider)

        self.assertEqual(result.status, "human_review")
        self.assertEqual(result.attempts, 2)
        self.assertEqual(result.retries, 1)
        self.assertEqual(result.final_decision, "escalate")
        self.assertEqual(result.escalation_owner, "human_reviewer")
        self.assertEqual(result.error_category, "schema_error")
        self.assertEqual(
            [trace.decision for trace in result.traces],
            ["retry", "escalate"],
        )
        self.assertEqual(len(provider.calls), 2)

    def test_zero_retry_ceiling_escalates_after_initial_failure(self):
        provider = SequenceProvider(['{"sentiment": "negative",}'])

        result = run_pipeline(provider, retry_ceiling=0)

        self.assertEqual(result.status, "human_review")
        self.assertEqual(result.attempts, 1)
        self.assertEqual(result.retries, 0)
        self.assertEqual(result.error_category, "parse_error")
        self.assertEqual(result.final_decision, "escalate")
        self.assertEqual(len(provider.calls), 1)

    def test_negative_retry_ceiling_is_rejected(self):
        provider = SequenceProvider([VALID_PAYLOAD])

        with self.assertRaisesRegex(ValueError, "retry_ceiling"):
            run_pipeline(provider, retry_ceiling=-1)


if __name__ == "__main__":
    unittest.main()
