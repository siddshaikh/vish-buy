import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useRouter } from "next/navigation";
import AddToCart from "./AddToCart";

const ProductCard = ({ product }) => {
  const router = useRouter();

  const handleCardClick = () => {
    router.push(`/product-detail/${product.id}`);
  };

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s",
        cursor: "pointer",
        "&:hover": {
          transform: "translateY(-5px)",
        },
      }}
    >
      <Box
        sx={{
          height: 180,
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "#f5f5f5",
        }}
      >
        <CardMedia
          component="img"
          image={product.thumbnail}
          alt={product.title}
          sx={{
            objectFit: "contain",
            width: "100%",
            maxHeight: "100%",
          }}
        />
      </Box>

      <CardContent>
        <Typography variant="subtitle1" fontWeight={600} gutterBottom noWrap>
          {product.title}
        </Typography>

        <Stack direction="row" spacing={1} alignItems="center" mb={1}>
          <StarIcon fontSize="small" color="warning" />
          <Typography variant="body2">{product.rating || 4.5}</Typography>
        </Stack>

        <Typography variant="h6" color="primary" mb={2}>
          ${product.price}
        </Typography>

        <AddToCart product={product} />
      </CardContent>
    </Card>
  );
};

export default ProductCard;
