import { Box, styled, Typography } from "@mui/material";
import React from "react";
import ThemeToggle from "./ThemeToggler";
import User from "./User";
import Cart from "./Cart";
import ProductSearch from "./ProductSearch";
import Link from "next/link";

const StyledNav = styled("nav")({
  position: "sticky",
  top: 0,
  padding: "15px 25px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: "1px solid",
});

const Navbar = () => {
  return (
    <StyledNav>
      {/* logo */}
      <Link href={"/dashboard"}>
        <Typography variant="h1" fontSize={"1.5rem"}>
          VishBuy
        </Typography>
      </Link>
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        <ProductSearch />
        <Cart />
        <ThemeToggle />
        <User />
      </Box>
    </StyledNav>
  );
};

export default Navbar;
