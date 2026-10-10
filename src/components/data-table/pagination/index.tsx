import { Button, Stack, Typography } from "@mui/material";
import Iconify from "@src/components/iconify";
import React from "react";

type PaginationProps = {
  page: number;
  count: number;
  rowsPerPage: number;
  onPageChange: (value: any) => void;
}

const Pagination = (props: PaginationProps) => {
  const { page, rowsPerPage, count, onPageChange: onPageChangeProp } = props;
  const value = React.useMemo(() => {
    const to = (page + 1) * rowsPerPage;
    return {
      from: (page * rowsPerPage) + (count > 0 ? 1 : 0),
      to: to >= count ? count : to,
    };
  },[page, rowsPerPage, count]);

  const onPageChange = React.useCallback((value: number) => {
    const newpage = page + value;
    if(newpage <= 0){
      onPageChangeProp(0);
    }else{
      onPageChangeProp(newpage);
    }
  },[page, onPageChangeProp]);

  return (
    <Stack direction={{
      xl: 'row',
      lg: 'row',
      md: 'row',
      sm: 'column',
      xs: 'column',
    }} gap={2} alignItems={{
      xl: 'center',
      lg: 'center',
      md: 'center',
      sm: 'flex-end',
      xs: 'flex-end',
    }} justifyContent={"space-between"} mt={3} p={1}>
      <Typography>
        Showing {value.from} to {value.to} of {count} results
      </Typography>  
      <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
        <Button 
          variant='outlined'
          color="inherit"
          disabled={page === 0}
          startIcon={<Iconify icon="mdi:chevron-left" />}
          onClick={() => onPageChange(-1)}
        >
          Previous
        </Button>
        <Button 
          variant='outlined'
          color="inherit"
          disabled={value.to >= count}
          endIcon={<Iconify icon="mdi:chevron-right" />}
          onClick={() => onPageChange(1)}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export default Pagination;