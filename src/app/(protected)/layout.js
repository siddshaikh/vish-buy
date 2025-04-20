"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import app from "@/firebase/firebaseConfig";
import FilterBar from "@/components/FilterBar";
import { Breadcrumbs, Link } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import DiscountBanner from "@/components/DiscountCard";

export default function ProtectedLayout({ children }) {
  const router = useRouter();
  const pathName = usePathname();

  const [loading, setLoading] = useState(true);
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [auth, router]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <DiscountBanner />
      <Navbar />
      {pathName !== "/dashboard" ? (
        <Breadcrumbs aria-label="breadcrumb" sx={{ ml: 2 }}>
          <Link
            underline="hover"
            color="inherit"
            href="/dashboard"
            sx={{ display: "flex" }}
          >
            <HomeIcon fontSize="small" />
            Home
          </Link>
        </Breadcrumbs>
      ) : (
        <FilterBar />
      )}

      <main style={{ padding: "0 1rem" }}>{children}</main>
    </>
  );
}
