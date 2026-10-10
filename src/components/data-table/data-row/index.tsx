import { TableBody, TableCell, TableRow, Typography } from '@mui/material';
import SearchNotFound from '@src/components/notfound';
import RowLoading from '@src/components/table-row';
import { memo } from 'react';
import TableRowItem from './data-item';

type DataTableRowProps = {
  data: any[];
  headers: any[];
  colSpan?: number;
  isLoading?: boolean;
  isRefreshing?: boolean;
  renderItem?: any;
  onRowPress?: any;
  disabled?: boolean;
  isNotFound?: boolean;
  filterName?: string;
};

const DataTableRow = (props: DataTableRowProps) => {
  const { headers, renderItem, data, colSpan, isLoading, isRefreshing, isNotFound, filterName } = props;

  if (isRefreshing) return <RowLoading colSpan={colSpan} isLoading />;

  return (
    <TableBody>
      {!isLoading && data.length === 0 ? (
        <TableRow>
          <TableCell colSpan={headers.length}>
            <Typography textAlign="center">No data available</Typography>
          </TableCell>
        </TableRow>
      ) : (
        <>
          {data.map((item: any, index: number) => {
            if (typeof renderItem === 'function') {
              return renderItem({ item, index });
            }

            return <TableRowItem key={`${index}`} {...{ item, headers }} />
          })}
        </>
      )}

      <RowLoading colSpan={colSpan} isLoading={isLoading} />
      <SearchNotFound colSpan={colSpan} isNotFound={isNotFound} filterName={filterName} />
    </TableBody>
  );
};

export default memo(DataTableRow);
