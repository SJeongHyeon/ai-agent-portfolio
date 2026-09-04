"""Run deterministic examples without calling an external LLM."""

from dataclasses import asdict
import json

from output_contract.pipeline import run_pipeline


valid_output = json.dumps({
    "sentiment": "negative",
    "issue": "delivery_delay",
    "delay_days": 3,
    "sentiment_score": -0.8,
})

schema_error_output = json.dumps({
    "sentiment": "angry",
    "issue": "delivery_delay",
    "delay_days": 31,
    "sentiment_score": -0.8,
})

policy_error_output = json.dumps({
    "sentiment": "negative",
    "issue": "delivery_delay",
    "delay_days": 0,
    "sentiment_score": -0.8,
})

scenarios = {
    "valid_first_attempt": [valid_output],
    "parse_error_then_repaired": ["설명만 있는 응답", valid_output],
    "json_decode_then_escalated": [
        '{"sentiment": "negative",}',
        '{"sentiment": "negative",}',
    ],
    "schema_error_then_escalated": [
        schema_error_output,
        schema_error_output,
    ],
    "policy_error_then_escalated": [
        policy_error_output,
        policy_error_output,
    ],
}

for scenario_name, outputs in scenarios.items():
    def provider(attempt, previous_result, values=outputs):
        return values[attempt - 1]

    result = run_pipeline(provider)
    summary = {
        "scenario": scenario_name,
        "status": result.status,
        "attempts": result.attempts,
        "retries": result.retries,
        "final_decision": result.final_decision,
        "escalation_owner": result.escalation_owner,
        "error_category": result.error_category,
        "traces": [asdict(trace) for trace in result.traces],
    }
    print(json.dumps(summary, ensure_ascii=False))
