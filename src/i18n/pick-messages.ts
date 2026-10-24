import type { AbstractIntlMessages } from "next-intl";

type Messages = AbstractIntlMessages;

export function pickMessages(
  messages: Messages,
  paths: readonly string[]
): Messages {
  const picked: Messages = {};

  for (const path of paths) {
    const keys = path.split(".");
    let source: Messages | string | undefined = messages;
    for (const key of keys) {
      source = typeof source === "object" ? source[key] : undefined;
    }
    if (source === undefined) continue;

    let target = picked;
    for (const key of keys.slice(0, -1)) {
      const next = target[key];
      target = typeof next === "object" ? next : (target[key] = {});
    }
    target[keys[keys.length - 1]] = source;
  }

  return picked;
}
