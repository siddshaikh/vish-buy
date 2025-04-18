"use client";

import { Paper, Stack, Chip, useMediaQuery, useTheme } from "@mui/material";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import TvIcon from "@mui/icons-material/Tv";
import KitchenIcon from "@mui/icons-material/Kitchen";
import WatchIcon from "@mui/icons-material/Watch";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { useState } from "react";

const PRODUCT_CATEGORIES = [
  { label: "All", icon: <GridViewIcon />, value: "all" },
  { label: "Laptops", icon: <LaptopMacIcon />, value: "laptops" },
  { label: "Mobiles", icon: <PhoneIphoneIcon />, value: "mobiles" },
  { label: "TVs", icon: <TvIcon />, value: "tvs" },
  { label: "Appliances", icon: <KitchenIcon />, value: "appliances" },
  { label: "Watches", icon: <WatchIcon />, value: "watches" },
  { label: "Clothing", icon: <CheckroomIcon />, value: "clothing" },
];

const FILTERS = [{ label: "Price", icon: <FilterAltIcon />, value: "price" }];

const FilterBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("price");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Paper
      elevation={3}
      sx={{
        mt: 2,
        px: 1,
        py: 1.5,
        borderRadius: 3,
        overflowX: "auto",
        scrollbarWidth: "none",
        "&::-webkit-scrollbar": {
          display: "none",
        },
      }}
    >
      <Stack
        direction="row"
        spacing={1}
        sx={{
          width: "max-content",
          minWidth: "100%",
          transition: "all 0.3s ease-in-out",
        }}
      >
        {FILTERS.map((filter) => (
          <Chip
            key={filter.value}
            icon={filter.icon}
            label={filter.label}
            clickable
            color={selectedFilter === filter.value ? "primary" : "default"}
            onClick={() => setSelectedFilter(filter.value)}
            sx={{
              px: isMobile ? 1 : 2,
              fontSize: isMobile ? "0.75rem" : "0.85rem",
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        ))}

        {PRODUCT_CATEGORIES.map((category) => (
          <Chip
            key={category.value}
            icon={category.icon}
            label={category.label}
            clickable
            color={selectedCategory === category.value ? "primary" : "default"}
            onClick={() => setSelectedCategory(category.value)}
            sx={{
              px: isMobile ? 1 : 2,
              fontSize: isMobile ? "0.75rem" : "0.85rem",
              borderRadius: 2,
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default FilterBar;
