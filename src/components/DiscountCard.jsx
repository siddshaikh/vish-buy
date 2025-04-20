import { Box, Typography } from "@mui/material";

const DiscountBanner = () => {
  return (
    <Box
      sx={{
        backgroundColor: "primary.main",
        color: "white",
        padding: "8px 16px",
        textAlign: "center",
        // position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1000,
      }}
    >
      <Typography variant="body2" sx={{ fontWeight: 600 }}>
        For new users, use the coupon code <strong>NEW10</strong> to get 10% off
        on your first purchase!
      </Typography>
    </Box>
  );
};

export default DiscountBanner;
