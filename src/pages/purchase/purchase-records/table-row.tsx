import {
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { TransactionType } from '@src/lib/types/purchases';
import { OptionValue, StatusChange } from '@src/utils/filter-helper';

const TableRowItem = (props: TransactionType) => {
  const userID = props.user.id;

  const navigate = useNavigate();

  const onViewUserDetails = () => {
    navigate(`/dashboard/users?u=${userID}`);
  }

  return (
    <TableRow hover tabIndex={-1} role="checkbox" >
      <TableCell onClick={onViewUserDetails} component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" ml={2} spacing={1}>
          <Button>
            <Typography variant="subtitle2" noWrap sx={{ textDecoration: 'underline' }}>
              {userID}
            </Typography>
          </Button>
        </Stack>
      </TableCell>
      <TableCell align="left">{props.user.displayName}</TableCell>
      <TableCell align="left">{props.purchaseItemName}</TableCell>
      <TableCell align="left">{OptionValue[props.paymentTypeID]}</TableCell>
      <TableCell align="left">{props.amount}</TableCell>
      <TableCell align="left">{StatusChange(props.status)}</TableCell>
      <TableCell align="left">{moment.parseZone(props.transactionDate).format("MM-DD-YYYY hh:mm A")}</TableCell>
    </TableRow>
  );
}


export default TableRowItem;
