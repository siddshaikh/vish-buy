"use client";

import { Badge, IconButton, Tooltip } from "@mui/material";
import Link from "next/link";
import React from "react";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const cartItemCount = 3;

const Cart = () => {
  return (
    <Link href="/my-cart">
      <Tooltip title="Check your'e cart">
        <Badge
          badgeContent={cartItemCount}
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
