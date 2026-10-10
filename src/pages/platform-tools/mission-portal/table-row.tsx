import {
  Button,
  TableCell,
  TableRow
} from '@mui/material';
import { MissionItemType } from '@src/lib/types/missions-portal';
import { useCallback, useState } from 'react';
import { useMissionsService } from './hooks';
import { IOSSwitch } from './styles.css';
import _ from 'lodash';

const TableRowItem = (props: MissionItemType) => {
  const { updateMissionStatus } = useMissionsService();
  const [enable, setEnable] = useState(props.active);

  const onSwitchPress = useCallback(() => {
    updateMissionStatus.mutate({
      id: props.id,
      isActive: !enable,
    });

    setEnable(!enable);
  },[updateMissionStatus, props.id, enable]);

  return (
    <TableRow hover tabIndex={-1} role="checkbox">
      <TableCell align="left" sx={{fontWeight: 700}} >
        {props.name}
      </TableCell>
      <TableCell 
        sx={{ width: 150, fontWeight: 700,}} 
        align="center">
        <IOSSwitch sx={{ m: 0 }} 
          checked={enable} 
          onChange={onSwitchPress} />
      </TableCell>
      <TableCell sx={{ width: 150, fontWeight: 700 }} align="center">
        {!_.isEmpty(props.game) &&
        <Button 
          variant='text'
          onClick={props.onOpen}
          sx={{width: 69, height: 35, borderRadius: 48, bgcolor: "#E5EFF4", color: "#457DBF"}}>
          EDIT
        </Button>}
      </TableCell>
    </TableRow>
  );
}

export default TableRowItem;
