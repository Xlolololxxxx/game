import {
  Box,
  Button,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import moment from 'moment';
import numeral from 'numeral';
import { useNavigate } from 'react-router-dom';
import Iconify from '@src/components/iconify/Iconify';
import ActionMenu from './menu';
import { useState } from 'react';
import RedemptionDetails from './redemption-details';
import UpdateStatus from './update-status';
import { redeemTypeName } from '@src/utils/filter-helper';

const TableRowItem = (props: any) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<any>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showUpdateStatusDialog, setShowUpdateStatusDialog] = useState<string>("");

  const onViewUserDetails = () => {
    navigate(`/dashboard/users?u=${props.userID}`);
  }

  return (
    <>
    <TableRow hover role="checkbox">
      <TableCell onClick={onViewUserDetails} component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" ml={2} spacing={1}>
          <Button>
            <Typography variant="subtitle2" noWrap sx={{ textDecoration: 'underline' }}>
              {props.userID}
            </Typography>
          </Button>
        </Stack>
      </TableCell>
      <TableCell align="inherit">{props?.user?.displayName}</TableCell>
      <TableCell align="inherit">{numeral(props.goldAmount).format("0,000.00")}</TableCell>
      <TableCell align="inherit">{redeemTypeName(props.redeemTypeID)}</TableCell>
      <TableCell align="inherit" sx={{ whiteSpace: "pre-line" }}>{moment.parseZone(props.requestDate).format("MM-DD-YYYY")}{"\n"}{moment.parseZone(props.requestDate).format("hh:mm A")}</TableCell>
      <TableCell align="center">{props?.id}</TableCell>
      <TableCell align="inherit">
        {props.redeemStatusID === 2 ?
          <Box display="flex" flexDirection="row" gap={1}>
            <Iconify onClick={() => setShowUpdateStatusDialog("REJECT")} icon="mdi:close-circle" width={35} color={"#E85858"} sx={{ cursor: "pointer" }}/>
            <Iconify onClick={() => setShowUpdateStatusDialog("APPROVE")} icon="mdi:check-circle" width={35} color={ "#33BB48"} sx={{ cursor: "pointer" }}/>
          </Box>
          : null
        }
      </TableCell>
      <TableCell align="right">
        <IconButton size="large" color="inherit" onClick={(event) => setShowMenu(event.currentTarget)}>
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </TableCell>
    </TableRow>
    {showMenu && <ActionMenu item={props} anchor={showMenu} 
      onClose={() => setShowMenu(null)} 
      onShowDialog={() => {
        setShowMenu(null);
        setShowDialog(true);
      }}/>}
    {showDialog && <RedemptionDetails item={props} visible={showDialog} 
      onClose={() => setShowDialog(false)} />}
     {showUpdateStatusDialog && <UpdateStatus item={props} 
        visible={Boolean(showUpdateStatusDialog)} 
        status={showUpdateStatusDialog}
        onClose={() => setShowUpdateStatusDialog("")} />}
    </>
  );
}

export default TableRowItem;
