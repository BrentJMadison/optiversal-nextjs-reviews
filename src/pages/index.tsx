import { useState, useCallback, useMemo, useEffect } from "react";
import styled from "styled-components";
import {
  Card,
  Button,
  TextField,
  Typography,
  Box,
  Grid,
  Container,
} from "@mui/material";

import ProductReview from "@/components/ProductReview";
import { useFetchReviews } from "@/hooks/useFetchReviews";
import {
  SearchBoxProps,
  PaginationControlsProps,
} from "@/types/ProductReview.types";
import Head from "next/head";

const StyledContainer = styled(Container)({
  padding: "30px 0",
  display: "flex",
  alignItems: "center",
  flexDirection: "column",
});

const StyledCard = styled(Card)({
  padding: "20px",
  border: "1px solid #ddd",
  boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
  marginBottom: "20px",
  display: "flex",
  justifyContent: "space-evenly",
  alignItems: "center",
  width: "100%",
});

const StyledBox = styled(Box)({
  display: "flex",
  justifyContent: "center",
  marginBottom: "20px",
  maxWidth: "600px",
  marginTop: "30px",
});

const StyledMetricLabels = styled(Typography)({
  color: "#999",
  fontSize: "16px",
});

const SearchBox: React.FC<SearchBoxProps> = ({
  searchKeyword,
  setSearchKeyword,
}) => {
  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchKeyword(e.target.value);
    },
    [setSearchKeyword]
  );

  return (
    <TextField
      label="Search Reviews"
      value={searchKeyword}
      onChange={handleSearchChange}
      sx={{
        width: "400px",
      }}
    />
  );
};

const PaginationControls: React.FC<PaginationControlsProps> = ({
  currentIndex,
  setCurrentIndex,
  maxIndex,
}) => (
  <Box sx={{ display: "flex" }}>
    <Button
      variant="contained"
      onClick={() => setCurrentIndex(currentIndex - 1)}
      disabled={currentIndex === 0}
      sx={{ mr: 2.5 }}
    >
      Previous
    </Button>
    <Button
      variant="contained"
      onClick={() => setCurrentIndex(currentIndex + 1)}
      disabled={currentIndex === maxIndex - 1 || maxIndex === 0}
    >
      Next
    </Button>
  </Box>
);

export default function Home() {
  const [searchKeyword, setSearchKeyword] = useState("");
  const [currentDisplayIndex, setCurrentDisplayIndex] = useState(0);

  const jsonData = useFetchReviews();

  // Reset currentDisplayIndex to 0 whenever searchKeyword changes
  useEffect(() => {
    setCurrentDisplayIndex(0);
  }, [searchKeyword]);

  //Memoized filteredData so it doesnt have to be recalculated on every render, only when searchKeyword changes
  const filteredData = useMemo(
    () =>
      jsonData.filter((review) =>
        review.reviewText.toLowerCase().includes(searchKeyword.toLowerCase())
      ),
    [searchKeyword, jsonData]
  );

  return (
    <>
      <Head>
        <title>Optiversal Search Reviews</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <StyledContainer>
        <StyledCard>
          <SearchBox
            searchKeyword={searchKeyword}
            setSearchKeyword={setSearchKeyword}
          />
          <Grid
            container
            sx={{ flexDirection: "column", alignItems: "center" }}
          >
            <StyledMetricLabels variant="h6">
              Total Reviews: {jsonData.length}
            </StyledMetricLabels>
            {filteredData.length > 0 && (
              <StyledMetricLabels variant="h6">
                Viewing: {currentDisplayIndex + 1} / {filteredData.length}
              </StyledMetricLabels>
            )}
          </Grid>

          <PaginationControls
            currentIndex={currentDisplayIndex}
            setCurrentIndex={setCurrentDisplayIndex}
            maxIndex={filteredData.length}
          />
        </StyledCard>

        {filteredData.length > 0 ? (
          <StyledBox>
            <ProductReview review={filteredData[currentDisplayIndex]} />
          </StyledBox>
        ) : (
          <Typography
            variant="h6"
            sx={{ textAlign: "center", mt: "30px", color: "black" }}
          >
            No reviews found for search term: {searchKeyword}
          </Typography>
        )}
      </StyledContainer>
    </>
  );
}
