import { useState, useCallback } from "react";
import { OpenAIAction } from "@/types/OpenAIActions";

const useOpenAIQuery = () => {
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState("");

  const clearResponse = useCallback(() => {
    setResponse("");
  }, []);

  const queryOpenAI = useCallback(
    async (reviewText: string, type: OpenAIAction) => {
      setLoading(true);

      try {
        const res = await fetch("/api/openai", {
          method: "POST",
          body: JSON.stringify({ text: reviewText, type }),
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }

        const data = await res.json();
        setResponse(data.content || "Error: No content received.");
      } catch (err) {
        console.error("Error fetching OpenAI response:", err);
        setResponse("Error fetching OpenAI response.");
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { loading, response, queryOpenAI, clearResponse };
};

export default useOpenAIQuery;
