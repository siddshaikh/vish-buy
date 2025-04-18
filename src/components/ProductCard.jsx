import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Stack,
  Rating,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarIcon from "@mui/icons-material/Star";

const ProductCard = ({ product }) => {
  console.log(product);

  return (
    <Card
      sx={{
        width: 300,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        boxShadow: 3,
        borderRadius: 2,
        transition: "transform 0.2s",
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

        <Button
          variant="outlined"
          startIcon={<ShoppingCartIcon />}
          fullWidth
          sx={{
            textTransform: "none",
            transition: "all 0.3s ease",
            "&:hover": {
              bgcolor: "primary.main",
              color: "white",
              borderColor: "primary.main",
            },
          }}
        >
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
