"use client";
import dynamic from "next/dynamic";
import { Box, styled, Typography, useMediaQuery } from "@mui/material";
import React from "react";
import ThemeToggle from "./ThemeToggler";
import User from "./User";
import ProductSearch from "./ProductSearch";
import Link from "next/link";
import { useTheme } from "@mui/material/styles";
import useAuth from "@/hooks/useAuth";
import { usePathname } from "next/navigation";
import FilterBar from "./FilterBar";

const Cart = dynamic(() => import("./Cart"), { ssr: false });
const StyledNav = styled("nav")(({ theme }) => ({
  padding: "12px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderBottom: `1px solid ${theme.palette.divider}`,
  flexWrap: "wrap",
  rowGap: "12px",
}));

const Navbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const pathName = usePathname();
  const isLogin = pathName === "/login";
  const { user, loading, isAuthenticated } = useAuth();

  return (
    <>
      <StyledNav>
        <Link href="/" style={{ textDecoration: "none" }}>
          <Typography
            variant="h1"
            fontSize="1.5rem"
            fontWeight="bold"
            color="textPrimary"
          >
            VishBuy
          </Typography>
        </Link>

        <Box
          sx={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            justifyContent: isMobile ? "flex-start" : "center",
            gap: isMobile ? 2 : 4,
            width: isMobile ? "100%" : "auto",
          }}
        >
          {!isLogin && (
            <>
              {" "}
              <ProductSearch />
              <Cart />
            </>
          )}

          <ThemeToggle />
          {!isLogin && <User isAuthenticate={isAuthenticated} />}
        </Box>
      </StyledNav>
      {!isLogin && <FilterBar />}
    </>
  );
};

export default Navbar;
