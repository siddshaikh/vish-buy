import { addToCart, removeFromCart } from "@/store/features/cartSlice";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { Button } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";

const AddToCart = ({ product }) => {
  const dispatch = useDispatch();

  const selectedItem = useSelector((state) =>
    product ? state.cart.items.find((item) => item.id === product.id) : null
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (product) {
      dispatch(addToCart(product));
    }
  };

  const handleRemoveFromCart = (e) => {
    e.stopPropagation();
    if (product) {
      dispatch(removeFromCart(product.id));
    }
  };

  if (!product) return null;

  return (
    <Button
      variant="contained"
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
      onClick={selectedItem ? handleRemoveFromCart : handleAddToCart}
    >
      {selectedItem ? "Remove From Cart" : "Add to Cart"}
    </Button>
  );
};

export default AddToCart;
