import {
  Button,
  Stack,
  TableCell,
  TableRow,
  Typography
} from '@mui/material';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';

import { UsersClaimValue } from '@src/lib/types/code-generator';

const TableRowItem = (props: UsersClaimValue) => {
  const userID = props.user.id;

  const navigate = useNavigate();

  const onViewUserDetails = () => {
    navigate(`/dashboard/users?u=${userID}`);
  }

  return (
    <TableRow hover tabIndex={-1} role="checkbox" >
      <TableCell onClick={onViewUserDetails} >
        <Stack direction="row" alignItems="center" spacing={1}>
          <Button>
            <Typography variant="subtitle2" noWrap sx={{ textDecoration: 'underline' }}>
              {userID}
            </Typography>
          </Button>
        </Stack>
      </TableCell>
      {/* <TableCell align="left">{props?.user?.emailAddress}</TableCell> */}
      <TableCell align="left">{props?.user?.emailAddress}</TableCell>
      <TableCell align="left">{moment.parseZone(props.claimedAt).format("MM-DD-YYYY hh:mm A")}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
