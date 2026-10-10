import {
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';


import Iconify from '@src/components/iconify/Iconify';
import { ManagePartnersTableRowProps } from '@src/lib/types/control-panel';
import moment from 'moment';

const TableRowItem = (props: ManagePartnersTableRowProps) => {
  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit"> {props.partnerName}</TableCell>
      <TableCell align="inherit">{props.license?.licenseKey}</TableCell>
      <TableCell align="inherit">{moment.parseZone(props.createdDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
      <TableCell align="inherit">{props.license?.expireAt ? moment.parseZone(props.license?.expireAt).format("MM-DD-YYYY hh:mm A") : 'N/A'}</TableCell>
      <TableCell align="inherit">{props.isActive ? 'Active' : 'Inactive'}</TableCell>
      <TableCell align="right">
        <IconButton size="large" color="inherit" onClick={props.handleOpenMenu}>
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
