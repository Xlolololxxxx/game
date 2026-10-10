import {
  TableRow,
  TableCell,
  Stack,
  Typography,
  IconButton,
} from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import numeral from 'numeral';

const TableRowItem = (props: any) => {
  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" ml={2} spacing={1}>
          <Typography variant="subtitle2" noWrap>
            {props.gameType?.provider?.name}
          </Typography>
        </Stack>
      </TableCell>
      <TableCell align="left">{props.gameName}</TableCell>
      <TableCell align="left">{props.id}</TableCell>
      <TableCell align="left">{props.totalPlayers || 0}</TableCell>
      <TableCell align="left">{numeral(props.totalSilverBet || 0).format("0,000")}</TableCell>
      <TableCell align="left">{numeral(props.totalGoldBet || 0).format("0,000")}</TableCell>
      <TableCell align="right">
        <IconButton
          size="large"
          color="inherit"
          onClick={props.handleOpenMenu}
        >
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
