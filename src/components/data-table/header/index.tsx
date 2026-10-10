import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import styles from './styles.css';

const TableHeader = ({
  order,
  orderBy,
  headLabel,
  onRequestSort,
  tableRowStyle,
  sx,
  ...rest
}: any) => {

  return (
    <TableHead >
      <TableRow sx={{ ...tableRowStyle }} >
        {headLabel.map((item: any, index: number) => {
          return (
            <TableCell
              key={`${index}`}
              sx={{ bgcolor: "white", color: "#718EBF", ...sx, ...(item?.tableCellSx || {}) }}
              align={item.align || (item.alignRight ? 'right' : 'left')}
              sortDirection={order || 'desc'}
              {...rest}
            >
              <TableSortLabel
                hideSortIcon
                disabled={!item.sortable}
                active={orderBy === item.id}
                direction={order || 'desc'}
                onClick={() => item.sortable ? onRequestSort(item.id) : null}
              >
                {item.label}
                {orderBy === item.id ? (
                  <Box sx={{ ...styles.sort_style }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
