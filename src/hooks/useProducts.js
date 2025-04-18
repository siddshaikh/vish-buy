import { fetchProducts } from "@/store/features/productSlice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useProducts = ({
  page = 1,
  limit = 10,
  category = "",
  search = "",
  sortBy = "",
}) => {
  const dispatch = useDispatch();
  const { items, loading, total, error } = useSelector(
    (state) => state.products
  );
  const skip = (page - 1) * limit;

  useEffect(() => {
    dispatch(fetchProducts({ limit, skip, category, search, sortBy }));
  }, [page, limit, category, search, dispatch, skip, sortBy]);

  return { products: items, loading, total, error };
};
