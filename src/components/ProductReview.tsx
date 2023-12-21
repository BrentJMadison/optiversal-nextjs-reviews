import {
  Card,
  CardContent,
  Typography,
  CardMedia,
  Box,
  Rating,
  Chip,
  Grid,
  Container,
} from "@mui/material";

import { ProductReviewProps } from "@/types/ProductReview.types";

const ProductReview = (props: ProductReviewProps) => {
  const { review } = props;

  return (
    <Container
      disableGutters
      sx={{
        marginTop: "30px",
      }}
    >
      <Card
        sx={{
          border: "1px solid #ddd",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <CardContent>
          <Grid container spacing={2}>
            <Grid item>
              <Typography variant="h5">{review.summary}</Typography>
            </Grid>
            <Grid item>
              <Rating value={review.overall} readOnly />
            </Grid>
            <Grid item>
              <Typography variant="body2" color="text.secondary">
                {review.reviewText}
              </Typography>
            </Grid>
            <Grid item>
              <Box>
                {review.image &&
                  review.image.map((imgUrl, index) => (
                    <CardMedia
                      key={index}
                      component="img"
                      height="140"
                      image={imgUrl}
                      alt={`Review Image ${index + 1}`}
                    />
                  ))}
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body1" color="text.primary">
                Reviewed by: {review.reviewerName}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="body2" color="text.secondary">
                Date: {review.reviewTime}
              </Typography>
            </Grid>
            {review.verified && (
              <Grid item>
                <Chip label="Verified Purchase" color="primary" />
              </Grid>
            )}
          </Grid>
        </CardContent>
      </Card>
    </Container>
  );
};

export default ProductReview;
