import {
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

const TableRowItem = (props: any) => {
  const navigate = useNavigate();
  
  const onViewUserDetails = () => {
    navigate(`/dashboard/users?u=${props.userId}`);
  }

  return (
    <TableRow hover role="checkbox">
      <TableCell onClick={onViewUserDetails} component="th" scope="row" padding="none">
        <Stack direction="row" alignItems="center" ml={2} spacing={1}>
          <Button>
            <Typography variant="subtitle2" noWrap sx={{ textDecoration: 'underline' }}>
              {props.userId}
            </Typography>
          </Button>
        </Stack>
      </TableCell>
      <TableCell align="inherit" >{props.displayName}</TableCell>
      <TableCell align="center" >{props.transactionDate}</TableCell>
      <TableCell align="center" >{props.purchasedItemName}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
