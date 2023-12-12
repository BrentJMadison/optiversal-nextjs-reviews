import { useEffect, useState } from "react";

import { Review } from "@/types/ProductReview.types";

export const useFetchReviews = () => {
  const [jsonData, setJsonData] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("data.json");
        const text = await response.text();
        const lines = text.trim().split("\n");
        const parsedData = lines.map((line) => JSON.parse(line));
        setJsonData(parsedData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  return jsonData;
};
