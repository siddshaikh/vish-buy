"use client";

import {
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Divider,
  Chip,
  Stack,
} from "@mui/material";
import Link from "next/link";
import ReviewsSection from "./ReviewSection";
import { useState } from "react";
import AddToCart from "./AddToCart";
import BuyNow from "./BuyNow";

const ProductDetail = ({ product, relatedProducts }) => {
  const [activeImage, setActiveImage] = useState(product?.thumbnail);
  return (
    <Box sx={{ mt: 2 }}>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
              {product.images.map((image) => (
                <Card
                  key={image}
                  onClick={() => setActiveImage(image)}
                  sx={{
                    border: (theme) =>
                      activeImage === image
                        ? `1px solid ${theme.palette.primary.main}`
                        : "1px solid #ccc",
                    borderRadius: 2,
                    cursor: "pointer",
                    padding: 0.5,
                    transition: "border 0.3s",
                    minWidth: 60,
                    maxWidth: 60,
                  }}
                >
                  <CardMedia
                    component="img"
                    image={image}
                    alt={product.title}
                    sx={{
                      height: 50,
                      objectFit: "contain",
                    }}
                  />
                </Card>
              ))}
            </Box>

            {/* Main Image */}
            <Card sx={{ boxShadow: 3 }}>
              <CardMedia
                component="img"
                image={activeImage}
                alt={product.title}
                sx={{
                  height: { xs: 250, sm: 300, md: 400 },
                  width: "100%",
                  objectFit: "contain",
                  borderRadius: 2,
                }}
              />
            </Card>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            {product.title}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {product.description}
          </Typography>
          <Typography variant="h5" color="primary" gutterBottom>
            ${product.price}
          </Typography>
          <Stack direction="row" spacing={2} mt={2}>
            <AddToCart product={product} />
            <BuyNow product={product} />
          </Stack>
          <Stack direction="row" spacing={2} mt={2}>
            <Chip label={`Rating: ${product.rating}`} />
            <Chip label={`In stock: ${product.stock}`} />
            <Chip label={`Brand: ${product.brand}`} />
          </Stack>
        </Grid>
      </Grid>

      <Divider sx={{ my: 4 }} />
      <ReviewsSection product={product} />

      <Divider sx={{ my: 4 }} />

      <Typography variant="h5" gutterBottom>
        Related Products in {product.category}
      </Typography>
      <Box
        sx={{
          display: "flex",
          overflowX: "auto",
          gap: 2,
          py: 2,
          px: 1,
        }}
      >
        {relatedProducts.map((item) => (
          <Link key={item.id} href={`/product-detail/${item.id}`}>
            <Card sx={{ minWidth: 200 }}>
              <CardMedia
                component="img"
                height="140"
                image={item.thumbnail}
                alt={item.title}
                sx={{ objectFit: "contain" }}
              />
              <CardContent>
                <Typography variant="subtitle2">{item.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  ${item.price}
                </Typography>
              </CardContent>
            </Card>
          </Link>
        ))}
      </Box>
    </Box>
  );
};

export default ProductDetail;
