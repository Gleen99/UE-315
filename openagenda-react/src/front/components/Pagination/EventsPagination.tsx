import React from "react";
import { Button, Box, Pagination, Stack } from "@mui/material";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

export const EventsPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
}) => (
  <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 2 }}>
    <Stack spacing={2}>
      <Pagination
        count={totalPages}
        page={currentPage}
        boundaryCount={0}
        onChange={(event, page) => setCurrentPage(page)}
      />
    </Stack>
  </Box>
);

