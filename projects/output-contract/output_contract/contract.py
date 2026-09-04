"""Versioned output contract and operational metadata."""

from typing import Literal

from pydantic import BaseModel, ConfigDict, Field


SCHEMA_VERSION = "1.0.0"
RETRY_CEILING = 1
ESCALATION_OWNER = "human_reviewer"


class ReviewExtraction(BaseModel):
    """Structured result expected from the model."""

    model_config = ConfigDict(extra="forbid", strict=True)

    sentiment: Literal["positive", "negative", "neutral"]
    issue: Literal[
        "none",
        "delivery_delay",
        "packaging",
        "product_defect",
        "customer_service",
        "other",
    ]
    delay_days: int = Field(ge=0, le=30)
    sentiment_score: float = Field(ge=-1.0, le=1.0)
