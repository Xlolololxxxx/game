import {
  TableCell,
  TableRow
} from '@mui/material';
import moment from 'moment';
import numeral from 'numeral';

const TableRowItem = (props: any) => {

  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit">{props.user.id}</TableCell>
      <TableCell align="inherit">{props.user.displayName}</TableCell>
      <TableCell align="inherit">{props.rank}</TableCell>
      <TableCell align="inherit">{numeral(props.totalScore).format("0,000")}</TableCell>
      <TableCell align="left">{moment.parseZone(props.lastModifiedDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
