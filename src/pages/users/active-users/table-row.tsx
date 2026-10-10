import {
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import moment from 'moment';

import Iconify from '@src/components/iconify/Iconify';

const TableRowItem = (props: any) => {
  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit">{props.user?.id}</TableCell>
      <TableCell align="inherit"> {props.user?.displayName}</TableCell>
      <TableCell align="left">{props.startedAt ? moment.parseZone(props.startedAt).format("MM-DD-YYYY") : '-'}</TableCell>
      <TableCell align="left">{props.startedAt ? moment.parseZone(props.startedAt).format("hh:mm A") : '-'}</TableCell>
      <TableCell align="left">{props.endedAt ? moment.parseZone(props.endedAt).format("hh:mm A") : '-'}</TableCell>
      {props.showMenuOptions && (
        <TableCell align="right">
          <IconButton size="large" color="inherit" onClick={props.handleOpenMenu}>
            <Iconify icon={'eva:more-vertical-fill'} />
          </IconButton>
        </TableCell>
      )}
    </TableRow>
  );
}

export default TableRowItem;
