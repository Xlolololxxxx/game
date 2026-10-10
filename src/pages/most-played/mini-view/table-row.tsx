import {
  TableCell,
  TableRow
} from '@mui/material';
import numeral from 'numeral';

const TableRowItem = (props: any) => {
  return (
    <TableRow sx={{ display: 'flex' }}>
      <TableCell sx={{ flex: 1, textAlign: 'center' }}>
        {props.gameType?.provider?.name}
      </TableCell>
      <TableCell sx={{ flex: 1, textAlign: 'center' }}>{props.gameName}</TableCell>
      <TableCell sx={{ flex: 1, textAlign: 'center' }}>{props.id}</TableCell>
      <TableCell sx={{ flex: 1, textAlign: 'center' }}>{props.totalPlayers || 0}</TableCell>
      <TableCell sx={{ flex: 1, textAlign: 'center' }}>{numeral(props.totalSilverBet || 0).format("0,000")}</TableCell>
      <TableCell sx={{ flex: 1, textAlign: 'center' }}>{numeral(props.totalGoldBet || 0).format("0,000")}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
