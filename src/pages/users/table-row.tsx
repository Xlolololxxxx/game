import {
  IconButton,
  TableCell,
  TableRow,
} from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import { getAmountBalanceByCoinType } from '@src/utils/filter-helper';
import moment from 'moment';
import numeral from 'numeral';

const TableRowItem = (props: any) => {
  const { partner } = usePartnerDropdownContext();
  const result: any = getAmountBalanceByCoinType(props.userBalanceList || []);

  if (partner === "palmsplay") {
    return (
      <TableRow hover role="checkbox">
        <TableCell align="inherit">{props.id}</TableCell>
        <TableCell align="inherit"> {props.displayName}</TableCell>
        <TableCell align="inherit">{props.emailAddress}</TableCell>
        <TableCell align="inherit">{numeral(result.SILVER).format("0,000")}</TableCell>
        <TableCell align="inherit">{numeral(result.GOLD).format("0,000.00")}</TableCell>
        <TableCell align="inherit">{numeral(result["GOLD BONUS"]).format("0,000.00")}</TableCell>
        <TableCell align="left">{moment.parseZone(props.enrollmentDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
        <TableCell align="left">{props.isDeleted ? "Deactivated" : "Active"}</TableCell>
        {props.showMenuOptions && (
          <TableCell align="right">
            <IconButton size="large" color="inherit" onClick={props.handleOpenMenu}>
              <Iconify icon={'eva:more-vertical-fill'} />
            </IconButton>
          </TableCell>
        )}
      </TableRow>
    );
  }else if(partner === "gambly") {
    return (
      <TableRow hover role="checkbox">
        <TableCell align="inherit">{props.id}</TableCell>
        <TableCell align="inherit"> {(`${props.firstName || ""} ${props.lastName || ""}`).trim()}</TableCell>
        <TableCell align="inherit">{props.emailAddress}</TableCell>
        <TableCell align="inherit">{props.displayName}</TableCell>
        <TableCell align="inherit">{numeral(result.SILVER).format("0,000")}</TableCell>
        <TableCell align="inherit">{numeral(result.GOLD).format("0,000.00")}</TableCell>
        <TableCell align="inherit">{numeral(result["GOLD BONUS"]).format("0,000.00")}</TableCell>
        <TableCell align="left">{moment.parseZone(props.enrollmentDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
        <TableCell align="inherit">{props.kycStatus?.replace("NOT_SUBMITTED", "UNVERIFIED")}</TableCell>
        <TableCell align="left">{props.isDeleted ? "Deactivated" : "Active"}</TableCell>
        <TableCell align="left">{props.isVerified ? "Yes" : "No"}</TableCell>
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



  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit">{props.id}</TableCell>
      <TableCell align="inherit"> {(`${props.firstName || ""} ${props.lastName || ""}`).trim()}</TableCell>
      <TableCell align="inherit">{props.emailAddress}</TableCell>
      <TableCell align="inherit">{props.displayName}</TableCell>
      <TableCell align="inherit">{numeral(result.SILVER).format("0,000")}</TableCell>
      <TableCell align="inherit">{numeral(result.GOLD).format("0,000.00")}</TableCell>
      <TableCell align="inherit">{numeral(result["GOLD BONUS"]).format("0,000.00")}</TableCell>
      <TableCell align="left">{moment.parseZone(props.enrollmentDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
      <TableCell align="left">{props.isDeleted ? "Deactivated" : "Active"}</TableCell>
      <TableCell align="left">{props.isVerified ? "Yes" : "No"}</TableCell>
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
