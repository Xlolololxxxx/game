import {
  Button,
  IconButton,
  Stack,
  TableCell,
  TableRow,
  Typography,
} from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { redeemExchangeStatus, redeemStatus, redeemTypeName } from '@src/utils/filter-helper';
import moment from 'moment';
import numeral from 'numeral';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ActionMenu from './menu';
import RedemptionDetails from '../pending-redemption/redemption-details';
import UpdateStatus from '../pending-redemption/update-status';

const TableRowItem = (props: any) => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState<any>(null);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [showUpdateStatusDialog, setShowUpdateStatusDialog] = useState<string>("");

  const statusColor = useMemo(() => {
    switch (props.redeemStatusID) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 7:
      case 9:
      case 13:
        return "#F76B00";
      case 5:
      case 12:
        return "#44B370";
      case 6:
      case 8:
      case 10:
      case 11:
        return "#E85858";
    }
  },[props.redeemStatusID]);

  const onViewUserDetails = () => {
    navigate(`/dashboard/users?u=${props.userID}`);
  }

  if(props.currentTab === "exchange") {
    return (
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
        <TableCell align="inherit">{numeral(props.creditAmount).format("0,000.00")}</TableCell>
        <TableCell align="left">{moment.parseZone(props.requestDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
        <TableCell align="inherit" sx={{color: statusColor}}>{redeemExchangeStatus(props.redeemStatusID)}</TableCell>
      </TableRow>
    );
  }

  if(props.currentTab === "processing") {
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
        <TableCell align="inherit" sx={{ whiteSpace: "pre-line" }}>{moment.parseZone(props.lastUpdatedTime).format("MM-DD-YYYY")}{"\n"}{moment.parseZone(props.lastUpdatedTime).format("hh:mm A")}</TableCell>
        <TableCell align="inherit" sx={{color: statusColor}}>{redeemStatus(props.redeemStatusID)}</TableCell>
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
        }}
        onShowRejectDialog={() => {
          setShowMenu(null);
          setShowUpdateStatusDialog("REJECT");
        }}/>
        }
      {showDialog && <RedemptionDetails item={props} visible={showDialog} 
        onClose={() => setShowDialog(false)} />}
      {showUpdateStatusDialog && <UpdateStatus item={props} 
        visible={Boolean(showUpdateStatusDialog)} 
        status={showUpdateStatusDialog}
        onClose={() => setShowUpdateStatusDialog("")} />}
      </>
    );
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
      <TableCell align="inherit" sx={{color: statusColor}}>{redeemStatus(props.redeemStatusID)}</TableCell>
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
      }}
      onShowRejectDialog={() => {
        setShowMenu(null);
        setShowUpdateStatusDialog("REJECT");
      }}/>
      }
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
