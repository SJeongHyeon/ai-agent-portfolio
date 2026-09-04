"""Retry-or-escalate control flow for validated model output."""

from dataclasses import dataclass
from typing import Any, Callable

from .contract import ESCALATION_OWNER, RETRY_CEILING
from .validator import ValidationResult, validate_output


OutputProvider = Callable[[int, ValidationResult | None], str]


@dataclass(frozen=True)
class AttemptTrace:
    attempt: int
    decision: str
    error_category: str | None
    error_code: str | None


@dataclass(frozen=True)
class PipelineResult:
    status: str
    data: dict[str, Any] | None
    attempts: int
    retries: int
    final_decision: str
    escalation_owner: str | None
    error_category: str | None
    error_code: str | None
    traces: tuple[AttemptTrace, ...]


def run_pipeline(
    provider: OutputProvider,
    *,
    retry_ceiling: int = RETRY_CEILING,
    escalation_owner: str = ESCALATION_OWNER,
) -> PipelineResult:
    """Validate each response, retry within the ceiling, then escalate."""

    if retry_ceiling < 0:
        raise ValueError("retry_ceiling must be 0 or greater")

    traces: list[AttemptTrace] = []
    previous_result: ValidationResult | None = None

    for attempt in range(1, retry_ceiling + 2):
        raw_output = provider(attempt, previous_result)
        validation = validate_output(raw_output)

        if validation.success:
            traces.append(AttemptTrace(
                attempt=attempt,
                decision="accept",
                error_category=None,
                error_code=None,
            ))
            return PipelineResult(
                status="accepted",
                data=validation.data,
                attempts=attempt,
                retries=attempt - 1,
                final_decision="accept",
                escalation_owner=None,
                error_category=None,
                error_code=None,
                traces=tuple(traces),
            )

        retries_used = attempt - 1
        if retries_used < retry_ceiling:
            decision = "retry"
        else:
            decision = "escalate"

        traces.append(AttemptTrace(
            attempt=attempt,
            decision=decision,
            error_category=validation.error_category,
            error_code=validation.error_code,
        ))

        if decision == "escalate":
            return PipelineResult(
                status="human_review",
                data=None,
                attempts=attempt,
                retries=retries_used,
                final_decision="escalate",
                escalation_owner=escalation_owner,
                error_category=validation.error_category,
                error_code=validation.error_code,
                traces=tuple(traces),
            )

        previous_result = validation

    raise RuntimeError("pipeline ended without accept or escalate")
