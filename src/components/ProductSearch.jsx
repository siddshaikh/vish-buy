"use client";

import { useProducts } from "@/hooks/useProducts";
import { Search } from "@mui/icons-material";
import { CircularProgress, InputAdornment, TextField } from "@mui/material";
import { debounce } from "lodash";
import { useEffect, useMemo, useState } from "react";

const ProductSearch = () => {
  const [input, setInput] = useState("");
  const [debouncedInput, setDebouncedInput] = useState("");

  const debounceSetSearch = useMemo(() => {
    return debounce((val) => {
      setDebouncedInput(val);
    }, 500);
  }, []);

  useEffect(() => {
    debounceSetSearch(input);

    return () => {
      debounceSetSearch.cancel();
    };
  }, [input, debounceSetSearch]);

  const {
    products = [],
    loading,
    total,
  } = useProducts({
    page: 1,
    limit: 10,
    category: "",
    search: debouncedInput,
    sortBy: "",
  });

  return (
    <TextField
      size="small"
      placeholder="Search electronics, & more..."
      variant="outlined"
      value={input}
      onChange={(e) => setInput(e.target.value)}
      sx={{ minWidth: 250 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            {loading ? (
              <CircularProgress size="1em" />
            ) : (
              <Search color="action" />
            )}
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ProductSearch;
