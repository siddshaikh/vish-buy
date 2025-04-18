import { Pagination, Stack } from "@mui/material";

const PaginationComponent = ({ page, total, onPageChange }) => {
  const totalPages = Math.ceil(total / 10);

  return (
    <Stack spacing={2} alignItems="center" my={4}>
      <Pagination
        count={totalPages}
        page={page}
        onChange={(e, value) => onPageChange(value)}
        color="primary"
        variant="outlined"
        shape="rounded"
      />
    </Stack>
  );
};

export default PaginationComponent;
