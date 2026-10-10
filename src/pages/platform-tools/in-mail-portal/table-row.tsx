import {
  Avatar,
  Button,
  Stack,
  TableCell,
  TableRow
} from '@mui/material';
import { InMailItemType } from '@src/lib/types/in-mail-portal';
import palette from '@src/theme/palette';
import numeral from 'numeral';

const TableRowItem = (props: InMailItemType) => {
  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell align="left" >
        <Stack direction="row" spacing={2} ml={1} useFlexGap alignItems={"center"} justifyContent={"space-between"}>
          <Stack direction="row" alignItems={"center"} gap="1rem">
            <Avatar 
              sx={{ bgcolor: palette.grey[100] }}
              variant="square" 
              src={props.thumbnailImage}/>
            {props.subject}
          </Stack>
          <Button sx={{
            bgcolor: "#E5EFF4", 
            color: "#457DBF",
            fontWeight: "600",
            borderRadius: 16,
          }} onClick={props.onOpen}>
            OPEN
          </Button>
        </Stack>
      </TableCell>
      <TableCell 
        sx={{ width: 150, fontWeight: 700, color: props.isActive ? palette.success.main : "red" }} 
        align="center">
        {props.isActive ? "ACTIVE" : "INACTIVE"}
      </TableCell>
      <TableCell sx={{ width: 150, fontWeight: 700 }} align="center">{numeral(props.ctaClickCount).format("0,000")}</TableCell>
      <TableCell sx={{ width: 150, fontWeight: 700 }} align="center">{numeral(props.purchaseCount).format("0,000")}</TableCell>
    </TableRow>
  );
}

export default TableRowItem;
