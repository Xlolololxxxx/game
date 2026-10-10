import {
  IconButton,
  TableCell,
  TableRow
} from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import moment from 'moment';

const TableRowItem = (props: any) => {

  return (
    <TableRow hover role="checkbox">
      <TableCell align="inherit" >
        {props.gameName}
      </TableCell>
      <TableCell align="inherit" >{props.gameType?.provider?.name}</TableCell>
      <TableCell align="inherit" >{props.sequence}</TableCell>
      <TableCell align="inherit" >{props.gameCategory?.gameTypeName}</TableCell>
      <TableCell align="inherit" >{props.code}</TableCell>
      <TableCell align="inherit" >{props.tier?.id}</TableCell>
      <TableCell align="inherit" >{props.isActive === 1 ? "Active" : "Inactive"}</TableCell>
      <TableCell align="inherit" >{props.isTop === 1 ? "Yes" : "No"}</TableCell>
      <TableCell align="inherit" >{props.isGoldAllow === 1 ? "Yes" : "No"}</TableCell>
      {/* <TableCell align="inherit" >{momentTz(props.enrollmentDate).tz(momentTz.tz.guess()).format("MM-DD-YYYY hh:mm A ([GMT] Z)")}</TableCell> */}
      <TableCell align="inherit" >{moment.parseZone(props.enrollmentDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
      <TableCell align="inherit" >{moment.parseZone(props.lastModifiedDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
      <TableCell align="inherit" >
        <IconButton
          size="large"
          color="inherit"
          onClick={props.handleOpenMenu}
          disabled={!props.showMenu}
        >
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
