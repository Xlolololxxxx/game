import {
  TableCell,
  TableRow,
} from '@mui/material';
import { usePartnerDropdownContext } from '@src/context/PartnerDropdown';
import { CoinHistoryItemType } from '@src/lib/types/coin-history';
import { getObjectCoinType } from '@src/utils/mockdata/menu-options';
import moment from 'moment';
import numeral from 'numeral';

const TableRowItem = (props: CoinHistoryItemType) => {
  const { partner } = usePartnerDropdownContext();
  
  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell align="left">{props.id}</TableCell>
      <TableCell align="left">{getObjectCoinType(partner)[props.coinTypeId]}</TableCell>
      <TableCell align="left">{props.description}</TableCell>
      <TableCell align="left">{numeral(props.amount).format("0,000.00")}</TableCell>
      <TableCell align="left">{numeral(props.balanceBefore).format("0,000.00")}</TableCell>
      <TableCell align="left">{numeral(props.balanceAfter).format("0,000.00")}</TableCell>
      <TableCell align="left">{moment.parseZone(props.enrollmentDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
