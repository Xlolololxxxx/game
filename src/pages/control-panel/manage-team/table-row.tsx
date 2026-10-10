import {
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';

import Iconify from '@src/components/iconify/Iconify';
import { ACCOUNT_TYPE } from '@src/utils/mockdata/menu-options';

const TableRowItem = (props: any) => {
  const getUserTypeValue = (userTypeID: number | string) => {
    return ACCOUNT_TYPE.find((acct) => Number(acct.value) === Number(userTypeID))?.label;
  }

  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit">{props.id}</TableCell>
      <TableCell align="inherit"> {(`${props.firstName || ""} ${props.lastName || ""}`).trim()}</TableCell>
      <TableCell align="inherit">{props.emailAddress}</TableCell>
      <TableCell align="inherit">{props.userDetail?.jobTitle}</TableCell>
      <TableCell align="inherit">{getUserTypeValue(props.userTypeID)}</TableCell>
      <TableCell align="left">{props.isDeleted ? "Deactivated" : "Active"}</TableCell>
      <TableCell align="right">
        <IconButton
          size="large"
          color="inherit"
          onClick={props.handleOpenMenu}
          disabled={!props.canEdit}
        >
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
