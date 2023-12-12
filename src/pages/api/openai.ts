import { OpenAIAction, OpenAIActions } from "@/types/OpenAIActions";
import type { NextApiRequest, NextApiResponse } from "next";
import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  console.error("OPENAI_API_KEY is not set in the environment variables.");
  process.exit(1);
}

interface OpenAPIPostRequest extends NextApiRequest {
  body: {
    text: string;
    type: OpenAIAction;
  };
}

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: OpenAPIPostRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { text, type } = req.body;

  if (!text || !type) {
    return res.status(400).json({ message: "No text or type provided" });
  }

  try {
    const content = await generateResponse(text, type);
    return res.status(200).json({ content });
  } catch (error) {
    console.error("Error querying OpenAI:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

async function generateResponse(
  text: string,
  type: OpenAIAction
): Promise<string> {
  let prompt;

  switch (type) {
    case OpenAIActions.SUMMARIZE:
      prompt = `Summarize this review text in 10 words or fewer:\n\n${text}`;
      break;
    case OpenAIActions.GUESS_TYPE:
      prompt = `Read the following review and reply with only the product type in 2-3 words:\n\n"${text}"`;
      break;
    default:
      throw new Error(`Unsupported action type: ${type}`);
  }

  const response = await openai.chat.completions.create({
    messages: [{ role: "user", content: prompt }],
    model: "gpt-3.5-turbo",
  });

  return response?.choices?.[0]?.message?.content?.trim() ?? "";
}
