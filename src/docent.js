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

function createMessage(root, role, text, links = []) {
  const message = root.createElement("article");
  message.className = `docent-message docent-message--${role}`;

  const speaker = root.createElement("strong");
  speaker.textContent = role === "user" ? "방문자" : "AI 도슨트";

  const body = root.createElement("p");
  body.textContent = text;

  message.append(speaker, body);

  if (links.length > 0) {
    const linkList = root.createElement("ul");

    for (const link of links) {
      const item = root.createElement("li");
      const anchor = root.createElement("a");
      anchor.href = link.url;
      anchor.target = "_blank";
      anchor.rel = "noreferrer";
      anchor.textContent = link.label;
      item.append(anchor);
      linkList.append(item);
    }

    message.append(linkList);
  }

  return message;
}

export function initDocent(root = document) {
  const launcher = root.querySelector("#docent-launcher");
  const panel = root.querySelector("#docent-panel");
  const closeButton = root.querySelector("#docent-close");
  const resetButton = root.querySelector("#docent-reset");
  const messages = root.querySelector("#docent-messages");
  const suggestions = root.querySelector("#docent-suggestions");
  const form = root.querySelector("#docent-form");
  const input = root.querySelector("#docent-input");
  const validation = root.querySelector("#docent-validation");

  const required = [
    launcher,
    panel,
    closeButton,
    resetButton,
    messages,
    suggestions,
    form,
    input,
    validation,
  ];

  if (required.some((element) => !element)) {
    return null;
  }

  const appendMessage = (role, text, links = []) => {
    messages.append(createMessage(root, role, text, links));
    messages.scrollTop = messages.scrollHeight;
  };

  const renderSuggestions = () => {
    suggestions.replaceChildren();

    for (const question of docentContent.suggestedQuestions) {
      const button = root.createElement("button");
      button.type = "button";
      button.dataset.docentQuestion = question;
      button.textContent = question;
      suggestions.append(button);
    }
  };

  const resetConversation = () => {
    messages.replaceChildren();
    validation.textContent = "";
    input.value = "";
    appendMessage("assistant", docentContent.initialMessage);
    renderSuggestions();
  };

  const setOpen = (open) => {
    panel.hidden = !open;
    launcher.setAttribute("aria-expanded", String(open));

    if (open) {
      input.focus();
    } else {
      launcher.focus();
    }
  };

  const submitQuestion = (question) => {
    const result = validateQuestion(question);

    if (!result.valid) {
      validation.textContent =
        result.reason === "too-long"
          ? "질문은 240자 이내로 입력해 주세요."
          : "질문을 입력해 주세요.";
      return;
    }

    validation.textContent = "";
    appendMessage("user", String(question).trim().replace(/\s+/g, " "));

    const response = selectDocentResponse(question);
    appendMessage("assistant", response.answer, response.links);

    if (response.fallback) {
      renderSuggestions();
    } else {
      suggestions.replaceChildren();
    }

    input.value = "";
    input.focus();
  };

  const onLauncherClick = () => setOpen(panel.hidden);
  const onCloseClick = () => setOpen(false);
  const onResetClick = () => resetConversation();
  const onSubmit = (event) => {
    event.preventDefault();
    submitQuestion(input.value);
  };
  const onSuggestionClick = (event) => {
    const button = event.target.closest("[data-docent-question]");
    if (button && suggestions.contains(button)) {
      submitQuestion(button.dataset.docentQuestion);
    }
  };
  const onKeydown = (event) => {
    if (event.key === "Escape" && !panel.hidden) {
      setOpen(false);
    }
  };

  launcher.addEventListener("click", onLauncherClick);
  closeButton.addEventListener("click", onCloseClick);
  resetButton.addEventListener("click", onResetClick);
  form.addEventListener("submit", onSubmit);
  suggestions.addEventListener("click", onSuggestionClick);
  root.addEventListener("keydown", onKeydown);

  resetConversation();

  return {
    destroy() {
      launcher.removeEventListener("click", onLauncherClick);
      closeButton.removeEventListener("click", onCloseClick);
      resetButton.removeEventListener("click", onResetClick);
      form.removeEventListener("submit", onSubmit);
      suggestions.removeEventListener("click", onSuggestionClick);
      root.removeEventListener("keydown", onKeydown);
    },
  };
}
