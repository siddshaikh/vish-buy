import { Box } from "@mui/material";
import React from "react";
import ThemeToggle from "./ThemeToggler";

const Navbar = () => {
  return (
    <Box component={"nav"}>
      <ThemeToggle />
    </Box>
  );
};

export default Navbar;
