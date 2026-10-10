import {
  Button,
  IconButton,
  TableCell,
  TableRow
} from '@mui/material';
import Iconify from '@src/components/iconify/Iconify';
import { CodeGeneratorItemType } from '@src/lib/types/code-generator';
import moment from 'moment';
import { useCallback } from 'react';
import { useCodeGeneratorService } from './hooks';

const TableRowItem = (props: CodeGeneratorItemType) => {
  const { updateCodeGeneratorStatus, onRefreshCodeGenerator } = useCodeGeneratorService();

  const onSwitchPress = useCallback(() => {
    updateCodeGeneratorStatus.mutate({
      id: props.id,
      status: props.status === "ACTIVE" ? "INACTIVE" : "ACTIVE",
    },{
      onSuccess: () => {
        onRefreshCodeGenerator();
      }
    });
  },[props.id, props.status, onRefreshCodeGenerator, updateCodeGeneratorStatus]);

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell align="center" sx={{fontWeight: 600}} >
        {props.name}
      </TableCell>
      <TableCell align="center" sx={{fontWeight: 600}} >
        {props.type}
      </TableCell>
      <TableCell align="center" sx={{fontWeight: 600}} >
        {moment(props.startAt).format("MM-DD-YYYY")}
      </TableCell>
      <TableCell align="center" sx={{fontWeight: 600}} >
        {props.claimCount}
      </TableCell>
      <TableCell align="center" sx={{fontWeight: 600}} >
        {props.type === "REF" ? "N/A" : props.accessCount}
      </TableCell>
      <TableCell align="center" 
        sx={{
          textTransform: 'capitalize',
          fontWeight: 600, 
          color: props.status === "ACTIVE" ? "success.main" : "#E85858", 
        }} >
        {props.status}
      </TableCell>
      <TableCell sx={{ width: 120 }} align="center">
        {["ACTIVE", "INACTIVE"].includes(props.status) && <Button 
          variant='text'
          onClick={onSwitchPress}
          sx={{
            width: 106, height: 29, borderRadius: "4px", fontSize: 12,
            bgcolor: props.status === "ACTIVE" ? "#484848" : "white",
            border: props.status === "ACTIVE" ? "" : "1px solid #9F9F9F",
            color: props.status === "ACTIVE" ? "white" : "#484848", 
          }}>
          {props.status === "ACTIVE" ? "DEACTIVATE" : "ACTIVATE"}
        </Button>}
      </TableCell>
      <TableCell align="center" sx={{ width: 50 }}>
        <IconButton onClick={props.onOpen} size="large" color="inherit" >
          <Iconify icon={'eva:more-vertical-fill'} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
