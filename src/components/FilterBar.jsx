"use client";

import { Paper, Stack, Chip, useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useProducts } from "@/hooks/useProducts";

// * icons
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SpaIcon from "@mui/icons-material/Spa";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ChairIcon from "@mui/icons-material/Chair";
import WbIncandescentIcon from "@mui/icons-material/WbIncandescent";
import DirectionsCarIcon from "@mui/icons-material/DirectionsCar";
import TwoWheelerIcon from "@mui/icons-material/TwoWheeler";
import SunglassesIcon from "@mui/icons-material/WbSunny";
import HomeIcon from "@mui/icons-material/Home";
import LaptopMacIcon from "@mui/icons-material/LaptopMac";
import CheckroomIcon from "@mui/icons-material/Checkroom";
import PhoneIphoneIcon from "@mui/icons-material/PhoneIphone";
import WatchIcon from "@mui/icons-material/Watch";
import GridViewIcon from "@mui/icons-material/GridView";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export const PRODUCT_CATEGORIES = [
  { label: "All", icon: <GridViewIcon />, value: "all" },
  { label: "Smartphones", icon: <PhoneIphoneIcon />, value: "smartphones" },
  { label: "Laptops", icon: <LaptopMacIcon />, value: "laptops" },
  { label: "Fragrances", icon: <SpaIcon />, value: "fragrances" },
  { label: "Skincare", icon: <SpaIcon />, value: "skincare" },
  { label: "Groceries", icon: <LocalGroceryStoreIcon />, value: "groceries" },
  { label: "Home Decor", icon: <HomeIcon />, value: "home-decoration" },
  { label: "Furniture", icon: <ChairIcon />, value: "furniture" },
  { label: "Tops", icon: <CheckroomIcon />, value: "tops" },
  {
    label: "Women's Dresses",
    icon: <CheckroomIcon />,
    value: "womens-dresses",
  },
  { label: "Women's Shoes", icon: <CheckroomIcon />, value: "womens-shoes" },
  { label: "Men's Shirts", icon: <CheckroomIcon />, value: "mens-shirts" },
  { label: "Men's Shoes", icon: <CheckroomIcon />, value: "mens-shoes" },
  { label: "Men's Watches", icon: <WatchIcon />, value: "mens-watches" },
  { label: "Women's Watches", icon: <WatchIcon />, value: "womens-watches" },
  { label: "Women's Bags", icon: <LocalOfferIcon />, value: "womens-bags" },
  {
    label: "Women's Jewellery",
    icon: <LocalOfferIcon />,
    value: "womens-jewellery",
  },
  { label: "Sunglasses", icon: <SunglassesIcon />, value: "sunglasses" },
  { label: "Automotive", icon: <DirectionsCarIcon />, value: "automotive" },
  { label: "Motorcycle", icon: <TwoWheelerIcon />, value: "motorcycle" },
  { label: "Lighting", icon: <WbIncandescentIcon />, value: "lighting" },
];

const FILTERS = [
  { label: "Price", icon: <FilterAltIcon />, value: "price" },
  { label: "Rating", icon: <FilterAltIcon />, value: "rating" },
];

const FilterBar = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedFilter, setSelectedFilter] = useState("price");

  const {
    products = [],
    loading,
    total,
  } = useProducts({
    page: 1,
    limit: 10,
    category: selectedCategory,
    search: "",
    sortBy: selectedFilter,
  });

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
