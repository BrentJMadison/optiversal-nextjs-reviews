export const OpenAIActions = {
  SUMMARIZE: "SUMMARIZE",
  GUESS_TYPE: "GUESS_TYPE",
} as const;

export type OpenAIAction = keyof typeof OpenAIActions;
