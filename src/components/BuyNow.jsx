import { addToCart } from "@/store/features/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch } from "react-redux";

const BuyNow = ({ product }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product) {
      dispatch(addToCart(product));
      router.push(`/buy-now`);
    }
  };
  return (
    <Button
      variant="contained"
      color="secondary"
      startIcon={<ShoppingCartIcon />}
      fullWidth
      sx={{
        textTransform: "none",
        transition: "all 0.3s ease",
        "&:hover": {
          color: "white",
          borderColor: "primary.main",
        },
      }}
      onClick={handleAddToCart}
    >
      buy now
    </Button>
  );
};

export default BuyNow;
