"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  TextField,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeFromCart,
} from "@/store/features/cartSlice";
import DeleteIcon from "@mui/icons-material/Delete";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);
const BuyNowPage = () => {
  const [discountCode, setDiscountCode] = useState("");
  const [discountValue, setDiscountValue] = useState(0);
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const cartItems = useSelector((state) => state.cart.items);

  const totalPrice = useSelector((state) => state.cart.totalPrice);

  const handleApplyDiscount = () => {
    if (discountCode === "DISCOUNT10") {
      setDiscountValue(0.1);
    } else {
      setDiscountValue(0);
    }
  };

  const finalAmount = totalPrice - totalPrice * discountValue;

  const handleCheckout = async (amount, quantity) => {
    const stripe = await stripePromise;

    const res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100),
        quantity: quantity,
      }),
    });
    const data = await res.json();

    if (data.id) {
      await stripe.redirectToCheckout({ sessionId: data.id });
      dispatch(clearCart());
    } else {
      console.error("Checkout session creation failed");
    }
  };

  return (
    <Box sx={{ maxWidth: 800, mx: "auto", mt: 4 }}>
      <Box sx={{ mt: 4 }}>
        <Box>
          {/* Cart Items */}
          {cartItems.map((item) => (
            <Card key={item.id} sx={{ mb: 2 }}>
              <CardContent>
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={4}>
                    <Typography variant="subtitle1">{item.title}</Typography>
                    <Typography variant="body2">₹{item.price}</Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <Button onClick={() => dispatch(decreaseQty(item.id))}>
                      -
                    </Button>
                    <span>{item.quantity}</span>
                    <Button onClick={() => dispatch(increaseQty(item.id))}>
                      +
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body2">
                      ₹{item.quantity * item.price}
                    </Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          ))}

          {/* Discount Code */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              size="small"
              label="Discount Code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
            />
            <Button
              onClick={handleApplyDiscount}
              size="small"
              variant="contained"
            >
              Apply
            </Button>
          </Box>

          {/* Address */}
          <TextField
            label="Shipping Address"
            multiline
            fullWidth
            size="small"
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            sx={{ mb: 2 }}
          />

          {/* Summary */}
          <Typography variant="h6">
            Total: ${totalPrice.toFixed(2)} <br />
            Discount: ${(totalPrice * discountValue).toFixed(2)} <br />
            Final Amount:${finalAmount.toFixed(2)}
          </Typography>

          <Button
            variant="contained"
            onClick={() => handleCheckout(finalAmount, cartItems.length)}
            disabled={!cartItems.length || !address}
            sx={{ mt: 2 }}
          >
            Proceed to Payment
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default BuyNowPage;
