import json
import unittest

from output_contract.contract import (
    ESCALATION_OWNER,
    RETRY_CEILING,
    SCHEMA_VERSION,
)
from output_contract.validator import validate_output


def make_payload(**overrides):
    payload = {
        "sentiment": "negative",
        "issue": "delivery_delay",
        "delay_days": 3,
        "sentiment_score": -0.8,
    }
    payload.update(overrides)
    return payload


class ContractMetadataTests(unittest.TestCase):
    def test_required_contract_metadata_is_explicit(self):
        self.assertEqual(SCHEMA_VERSION, "1.0.0")
        self.assertEqual(RETRY_CEILING, 1)
        self.assertEqual(ESCALATION_OWNER, "human_reviewer")


class ValidatorTests(unittest.TestCase):
    def test_valid_means_parse_schema_and_policy_all_pass(self):
        result = validate_output(json.dumps(make_payload()))

        self.assertTrue(result.success)
        self.assertEqual(result.status, "valid")
        self.assertEqual(result.data["delay_days"], 3)
        self.assertIsNone(result.error_category)
        self.assertIsNone(result.error_code)

    def test_no_json_is_parse_error(self):
        result = validate_output("배송이 늦었습니다.")

        self.assertFalse(result.success)
        self.assertEqual(result.status, "invalid")
        self.assertEqual(result.error_category, "parse_error")
        self.assertEqual(result.error_code, "NO_JSON")

    def test_malformed_json_is_parse_error(self):
        result = validate_output('{"sentiment": "negative",}')

        self.assertFalse(result.success)
        self.assertEqual(result.error_category, "parse_error")
        self.assertEqual(result.error_code, "JSON_DECODE")

    def test_wrong_enum_or_range_is_schema_error(self):
        result = validate_output(json.dumps(make_payload(
            sentiment="angry",
            delay_days=31,
        )))

        self.assertFalse(result.success)
        self.assertEqual(result.error_category, "schema_error")
        self.assertEqual(result.error_code, "SCHEMA_VIOLATION")

    def test_delivery_delay_requires_positive_delay_days(self):
        result = validate_output(json.dumps(make_payload(delay_days=0)))

        self.assertFalse(result.success)
        self.assertEqual(result.error_category, "policy_error")
        self.assertEqual(result.error_code, "POLICY_ERROR")

    def test_non_delivery_issue_requires_zero_delay_days(self):
        result = validate_output(json.dumps(make_payload(
            issue="product_defect",
            delay_days=2,
        )))

        self.assertFalse(result.success)
        self.assertEqual(result.error_category, "policy_error")
        self.assertEqual(result.error_code, "POLICY_ERROR")


if __name__ == "__main__":
    unittest.main()
