"use client";
import React, { useEffect } from "react";
import { Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <Container>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
        height="100vh"
      >
        <Typography variant="h4" gutterBottom>
          Payment Successful!
        </Typography>
        <Typography variant="body1">
          Your payment was processed successfully. You will be redirected to
          your dashboard shortly.
        </Typography>
      </Box>
    </Container>
  );
};

export default SuccessPage;
