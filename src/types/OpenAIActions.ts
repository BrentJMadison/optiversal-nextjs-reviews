import { Review } from "./ProductReview.types";

export const OpenAIActions = {
  SUMMARIZE: "SUMMARIZE",
  GUESS_TYPE: "GUESS_TYPE",
} as const;

export type OpenAIAction = keyof typeof OpenAIActions;

export const emptyReview: Review = {
  overall: 0,
  verified: false,
  reviewTime: "",
  reviewerID: "",
  asin: "",
  reviewerName: "",
  reviewText: "",
  summary: "",
  unixReviewTime: 0,
  image: [],
};
