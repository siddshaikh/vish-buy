"use client";

import { Badge, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector } from "react-redux";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);

  return (
    <Link href="/buy-now">
      <Tooltip title="Check your'e cart">
        <Badge
          badgeContent={cartItems.length}
          color="secondary"
          overlap="rectangular"
          sx={{
            "& .MuiBadge-badge": {
              top: 4,
              right: 4,
            },
          }}
        >
          <IconButton size="small" color="inherit" aria-label="cart">
            <ShoppingCartIcon />
          </IconButton>
        </Badge>
      </Tooltip>
    </Link>
  );
};

export default Cart;
