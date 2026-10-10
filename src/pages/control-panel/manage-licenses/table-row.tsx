import {
  TableCell,
  TableRow,
} from '@mui/material';
import moment from 'moment';

import { ManageLicensesTableRowProps } from '@src/lib/types/control-panel';

const TableRowItem = (props: ManageLicensesTableRowProps) => {
  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit"> {props.id}</TableCell>
      <TableCell align="inherit">{props.licenseKey}</TableCell>
      <TableCell align="inherit">{props.partner?.partnerName}</TableCell>
      <TableCell align="inherit">{moment(props.createdAt).format("MM-DD-YYYY hh:mm A")}</TableCell>
      <TableCell align="inherit">{props.expireAt ? moment(props.expireAt).format("MM-DD-YYYY hh:mm A") : 'N/A'}</TableCell>
      <TableCell align="inherit">{props.status}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
