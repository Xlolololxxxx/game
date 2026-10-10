import {
  TableCell,
  TableRow,
} from '@mui/material';
import { GameHistoryItemType } from '@src/lib/types/game-history';
import moment from 'moment';
import numeral from 'numeral';


const TableRowItem = (props: GameHistoryItemType) => {
  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell align="left">{props.gameId}</TableCell>
      <TableCell align="left">{props.gameName}</TableCell>
      <TableCell align="left">{props.userId}</TableCell>
      <TableCell align="left">{props.roundID}</TableCell>
      <TableCell align="left">{props.callbackActionType}</TableCell>
      <TableCell align="left">{props.currency}</TableCell>
      <TableCell align="left">{numeral(props.totalBet).format("0,000.00")}</TableCell>
      <TableCell align="left">{numeral(props.totalWin).format("0,000.00")}</TableCell>
      <TableCell align="left">{moment.parseZone(props.createdDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
