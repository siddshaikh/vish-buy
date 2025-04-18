"use client";

import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";

const ProductSearch = () => {
  return (
    <TextField
      size="small"
      placeholder="Search electronics, clothes, more..."
      variant="outlined"
      sx={{ minWidth: 250 }}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search color="action" />
          </InputAdornment>
        ),
      }}
    />
  );
};

export default ProductSearch;
