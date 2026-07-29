import { docentContent } from "./docent-data.js";

export const MAX_QUESTION_LENGTH = 240;

export function normalizeQuestion(question) {
  return String(question ?? "").trim().replace(/\s+/g, " ").toLowerCase();
}

export function validateQuestion(question) {
  const normalized = normalizeQuestion(question);

  if (!normalized) {
    return { valid: false, normalized, reason: "empty" };
  }

  if (normalized.length > MAX_QUESTION_LENGTH) {
    return { valid: false, normalized, reason: "too-long" };
  }

  return { valid: true, normalized, reason: null };
}

export function selectDocentResponse(question) {
  const validation = validateQuestion(question);

  if (!validation.valid) {
    return {
      topic: "fallback",
      answer: docentContent.fallback,
      links: [],
      fallback: true,
    };
  }

  const matchedTopic = docentContent.topics.find((item) =>
    item.keywords.some((keyword) => validation.normalized.includes(keyword)),
  );

  if (!matchedTopic) {
    return {
      topic: "fallback",
      answer: docentContent.fallback,
      links: [],
      fallback: true,
    };
  }

  return {
    topic: matchedTopic.id,
    answer: matchedTopic.answer,
    links: [...matchedTopic.links],
    fallback: false,
  };
}
