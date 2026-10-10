import {
  IconButton,
  TableCell,
  TableRow
} from '@mui/material';
import Iconify from '@src/components/iconify';

const TableRowItem = (props: any) => {
  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit" >{props.description}</TableCell>
      <TableCell align="center" >{props.name}</TableCell>
      <TableCell align="center" >{props.purchaseCount}</TableCell>
      <TableCell align="right">
        <IconButton size="large" color="inherit" onClick={props.handleOpenMenu}>
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
