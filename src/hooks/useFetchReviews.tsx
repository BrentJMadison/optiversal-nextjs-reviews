import { useEffect, useState } from "react";

import { Review } from "@/types/ProductReview.types";

export const useFetchReviews = () => {
  const [jsonData, setJsonData] = useState<Review[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        //This could be replaced with a call to an API endpoint that returns the data
        const response = await fetch("data.json");
        const text = await response.text();

        //The data is stored as a newline delimited JSON file, so we need to parse it line by line
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
