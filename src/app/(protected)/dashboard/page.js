"use client";
import { Box, Grid, CircularProgress } from "@mui/material";
import { useState } from "react";
import PaginationComponent from "@/components/Pagination";
import ProductCard from "@/components/ProductCard";
import { useProducts } from "@/hooks/useProducts";

const DashboardPage = () => {
  const [page, setPage] = useState(1);

  const {
    products = [],
    loading,
    total,
  } = useProducts({
    page,
    limit: 10,
    category: "",
    search: "",
  });

  return (
    <Box p={2}>
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <>
          <Box display="flex" justifyContent="center">
            <Grid
              container
              spacing={2}
              justifyContent="center"
              maxWidth="lg"
              sx={{ margin: "0 auto" }}
            >
              {products.map((product) => (
                <Grid item key={product.id} xs={12} sm={6} md={3} lg={3}>
                  <ProductCard product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
          <Box display="flex" justifyContent="center" mt={4}>
            <PaginationComponent
              page={page}
              total={total}
              onPageChange={setPage}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default DashboardPage;
