import {
  Button,
  TableCell,
  TableRow
} from '@mui/material';
import { TransactionType } from '@src/lib/types/purchases';
import numeral from 'numeral';
import { useNavigate } from 'react-router-dom';

const TableRowItem = (props: TransactionType) => {
  const navigate = useNavigate();

  const onViewMonthReport = () => {
    navigate(`/dashboard/purchase?year=${props.year}&month=${props.month}`)
  }

  return (
    <TableRow hover tabIndex={-1} >
      <TableCell align="center" sx={{fontWeight: "600"}}>{props.year}</TableCell>
      <TableCell align="center" sx={{fontWeight: "600"}}>{props.monthName}</TableCell>
      <TableCell align="center" sx={{fontWeight: "600"}}>{numeral(props.totalAmount).format("0,000.0")}</TableCell>
      <TableCell align="right">
        <Button variant='contained'
          onClick={onViewMonthReport}
          sx={{
            color: "#457DBF", bgcolor: "#E5EFF4",
            boxShadow: 0,
            "&:hover": {
              bgcolor: "#E2E9FF"
            }
           }}>
          VIEW REPORT
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
