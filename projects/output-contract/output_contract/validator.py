"""Three-stage validation: parse, schema, then business policy."""

from dataclasses import dataclass
import json
from typing import Any

from pydantic import ValidationError

from .contract import ReviewExtraction


@dataclass(frozen=True)
class ValidationResult:
    """A stable result type for both accepted and rejected model output."""

    success: bool
    status: str
    data: dict[str, Any] | None = None
    error_category: str | None = None
    error_code: str | None = None
    error_detail: str | None = None


def _extract_json_candidate(raw_output: str) -> str | None:
    start = raw_output.find("{")
    end = raw_output.rfind("}")
    if start == -1 or end == -1 or end < start:
        return None
    return raw_output[start : end + 1]


def _policy_errors(data: ReviewExtraction) -> list[str]:
    errors: list[str] = []

    if data.issue == "delivery_delay" and data.delay_days == 0:
        errors.append("delivery_delay requires delay_days greater than 0")

    if data.issue != "delivery_delay" and data.delay_days != 0:
        errors.append("non-delivery issues require delay_days equal to 0")

    return errors


def validate_output(raw_output: str) -> ValidationResult:
    """Return valid only when parse, schema, and policy checks all pass."""

    candidate = _extract_json_candidate(raw_output)
    if candidate is None:
        return ValidationResult(
            success=False,
            status="invalid",
            error_category="parse_error",
            error_code="NO_JSON",
            error_detail="No JSON object was found in the model output.",
        )

    try:
        parsed = json.loads(candidate)
    except json.JSONDecodeError as error:
        return ValidationResult(
            success=False,
            status="invalid",
            error_category="parse_error",
            error_code="JSON_DECODE",
            error_detail=str(error),
        )

    try:
        validated = ReviewExtraction.model_validate(parsed)
    except ValidationError as error:
        return ValidationResult(
            success=False,
            status="invalid",
            error_category="schema_error",
            error_code="SCHEMA_VIOLATION",
            error_detail=str(error),
        )

    policy_errors = _policy_errors(validated)
    if policy_errors:
        return ValidationResult(
            success=False,
            status="invalid",
            error_category="policy_error",
            error_code="POLICY_ERROR",
            error_detail="; ".join(policy_errors),
        )

    return ValidationResult(
        success=True,
        status="valid",
        data=validated.model_dump(),
    )
