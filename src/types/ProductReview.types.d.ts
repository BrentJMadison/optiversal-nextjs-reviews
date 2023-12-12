export type Review = {
  overall: number; // Assuming 1.0 to 5.0
  verified: boolean;
  reviewTime: string; // Looks like MM DD, YYYY | Example 12 21, 2016
  reviewerID: string;
  asin: string; // Amazon Standard Identification Number
  reviewerName: string;
  reviewText: string;
  summary: string; // Summary or title of the review.
  unixReviewTime: number; // Unix timestamp of when the review was written.
  image?: string[]; // Array of image URLs
};

export type ProductReviewProps = {
  review: Review;
};

export interface PaginationControlsProps {
  currentIndex: number;
  setCurrentIndex: (index: number) => void;
  maxIndex: number;
}

export interface SearchBoxProps {
  searchKeyword: string;
  setSearchKeyword: (keyword: string) => void;
}
