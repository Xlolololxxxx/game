import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, Stack } from '@mui/material';
import { mapAndReplaceValues } from '@src/utils/validation-helper';
import _ from 'lodash';
import React from 'react';
import { useMissionsService } from '../hooks';
import { useMissionContext } from '../provider';
import Input from './input';
import { useUpdateMissionContext } from './provider';
import SelectItem from './select-item';
import { styles } from './styles.css';
import numeral from 'numeral';

function InputDescription() {
  const { games } = useMissionsService();
  const { handleMissionDetails } = useMissionContext();
  const { state, onDispatch, onUpdateMissionDetails } = useUpdateMissionContext();

  const preview = React.useMemo(() => {
    return mapAndReplaceValues(
      state.name,
      state?.gameCategory?.gameTypeName ?? "",
      numeral(state.requiredAmount).format("0,000"),
      numeral(state.requiredTimes).format("0,000"),
      state?.game?.gameName ?? "",
      state.type,

    )?.replaced ?? ""
  },[state]);

  return (
    <Box sx={{p: 3}}>
      <CloseIcon onClick={() => handleMissionDetails({})} sx={styles.btn_close}/>
      {["WIN_TOTAL", "BET_TOTAL"].includes(state.type) && <SelectItem
        options={games}
        formControlSx={{
          '& .MuiInputBase-root': {
            marginTop: "4px",
            width: "auto",
            height: '56px',
        }}}
        label={preview}
        placeholder="Select Game"
        value={state.game}
        error={_.isEmpty(state?.game)}
        getOptionLabel={(option: any) => `${option.gameName}`}
        onChange={onDispatch("game")} />}
      <Input sx={{mt: 3}} 
        label="Preview:"
        disabled
        inputSx={{
          '& .MuiInputBase-root': {
            height: '69px',
            bgcolor: "#E9E9E9"
        }}}
        value={preview}
        onChange={onDispatch("requiredTimes")} />
        <Stack direction={"row"} justifyContent={"space-between"} mt={6} >
          <Button onClick={() => handleMissionDetails({})} sx={styles.btn_cancel} >CANCEL</Button>
          <Button disabled={_.isEmpty(state?.game)} onClick={() => onUpdateMissionDetails(preview)} sx={styles.btn_save} >SAVE</Button>
        </Stack>
    </Box>
  );
}

export default InputDescription;