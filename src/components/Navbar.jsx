import { Box, styled, Typography } from "@mui/material";
import React from "react";
import ThemeToggle from "./ThemeToggler";

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
      <Typography variant="h1" fontSize={"1.5rem"}>
        VishBuy
      </Typography>
      <ThemeToggle />
    </StyledNav>
  );
};

export default Navbar;
