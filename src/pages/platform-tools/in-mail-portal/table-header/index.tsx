import { Box, TableCell, TableHead, TableRow, TableSortLabel } from '@mui/material';
import styles from './styles.css';
import palette from '@src/theme/palette';

const TableHeader = ({
  order,
  orderBy,
  headLabel,
  onRequestSort,
  disableButton,
}: any) => {

  return (
    <TableHead >
      <TableRow >
        {headLabel.map((item: any, index: number) => (
          <TableCell
            key={`${index}`}
            align={item.align}
            
            sx={{bgcolor: "rgba(0,0,0,0.1)", color: palette.primary.darker}}
            sortDirection={orderBy === item.id ? order : false}
          >
            <TableSortLabel
              hideSortIcon
              disabled={disableButton}
              active={orderBy === item.id}
              direction={orderBy === item.id ? order : 'asc'}
              onClick={() => item.sortable ? onRequestSort(item.id) : null}
            >
              {item.label}
              {orderBy === item.id ? (
                <Box sx={{ ...styles.sort_style }}>{order === 'desc' ? 'sorted descending' : 'sorted ascending'}</Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default TableHeader;
