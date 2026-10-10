import {
  TableCell,
  TableRow
} from '@mui/material';

const TableRowItem = (props: any) => {
  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit" >{props.name}</TableCell>
      <TableCell align="center" >{props.completionCount}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
