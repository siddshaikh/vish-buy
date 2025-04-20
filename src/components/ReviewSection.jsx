import { Card, CardContent, Typography, Rating, Box } from "@mui/material";
import React from "react";

const ReviewsSection = ({ product }) => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Customer Reviews
      </Typography>

      {product.reviews.map((review, index) => (
        <Card key={index} sx={{ mb: 3, boxShadow: 2 }}>
          <CardContent>
            <Box
              sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}
            >
              <Typography variant="body2" color="text.primary">
                {review.reviewerName}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {new Date(review.date).toLocaleDateString()}
              </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Rating
                value={review.rating}
                readOnly
                precision={0.5}
                sx={{ mr: 1 }}
              />
              <Typography variant="body2" color="text.secondary">
                {review.rating} Stars
              </Typography>
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              "{review.comment}"
            </Typography>
          </CardContent>
        </Card>
      ))}
    </Box>
  );
};

export default ReviewsSection;
