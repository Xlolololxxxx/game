import ErrorIcon from '@mui/icons-material/Error';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { Box, Checkbox, FormControl, FormControlLabel, FormGroup } from '@mui/material';
import palette from '@src/theme/palette';
import { tierName } from '@src/utils/transform-helper';
import _ from 'lodash';
import InputDate from './input-date';
import { useCreateMailContext } from './provider';
import { StyledContainer, StyledStackRow, StyledTypography } from './styles.css';

function MailSettings() {
  const { state, error, onDispatch } = useCreateMailContext();

  const handleTierChange = (value: number) => {
    if(state.applicableTiers?.includes(value)){
      const filterArray = _.filter(state.applicableTiers, function(n) {
        return n !== value;
      });

      onDispatch("applicableTiers")(filterArray);
    }else{
      const newlyArray = state.applicableTiers || [];
      newlyArray.push(value);
      onDispatch("applicableTiers")(newlyArray);
    }
  }

  const handleEveryone = (event: any) => {
    const isChecked = event.target.checked;
    if(isChecked){
      onDispatch("applicableTiers")([1,2,3,4]);
    }else{
      onDispatch("applicableTiers")([]);
    }
  }

  const onSchedule = (value: number) => {
    if(state.daysOfWeek?.includes(value)){
      const filterArray = _.filter(state.daysOfWeek, function(n) {
        return n !== value;
      });

      onDispatch("daysOfWeek")(filterArray);
    }else{
      const newlyArray = state.daysOfWeek || [];
      newlyArray.push(value);
      onDispatch("daysOfWeek")(newlyArray);
    }
  }

  return (
    <StyledContainer>
      <StyledTypography sx={{fontSize: 20, fontWeight: 700, color: "black"}} >Settings</StyledTypography>
      <StyledStackRow
        sx={{
          gap: "2rem", mt: 4,
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column"
          }
      }}>
        <Box >
          <StyledStackRow sx={{gap: "0.4rem", alignItems: "center", justifyContent: "flex-start"}}>
            <ErrorIcon sx={{color: error.applicableTiers ? palette.error.main : palette.purple.dark}} />
            <StyledTypography sx={{fontSize: 20, fontWeight: 700, color: error.applicableTiers ? palette.error.main : palette.purple.dark}} >Visible to:</StyledTypography>
          </StyledStackRow>
          <FormControl component="fieldset" variant="standard">
            <FormGroup>
              <FormControlLabel control={<Checkbox checked={state?.applicableTiers?.length === 4} />} label="Everyone" onChange={handleEveryone} />
              <FormControlLabel control={<Checkbox checked={state?.applicableTiers?.includes(1)} />} label={tierName(1)} onChange={() => handleTierChange(1)} />
              <FormControlLabel control={<Checkbox checked={state?.applicableTiers?.includes(2)} />} label={tierName(2)} onChange={() => handleTierChange(2)}/>
              <FormControlLabel control={<Checkbox checked={state?.applicableTiers?.includes(3)} />} label={tierName(3)} onChange={() => handleTierChange(3)}/>
              <FormControlLabel control={<Checkbox checked={state?.applicableTiers?.includes(4)} />} label={tierName(4)} onChange={() => handleTierChange(4)}/>
            </FormGroup>
          </FormControl>
        </Box>

        <Box sx={{
          width: {
            xl: "auto",
            lg: "auto",
            md: "auto",
            sm: "100%",
            xs: "100%",
          }
        }}>
          <StyledStackRow sx={{gap: "0.4rem", alignItems: "center", justifyContent: "flex-start" }}>
            <EventAvailableIcon sx={{color: palette.purple.dark}} />
            <StyledTypography sx={{fontSize: 20, fontWeight: 700, color: palette.purple.dark}} >Schedule</StyledTypography>
          </StyledStackRow>
          <StyledStackRow sx={{gap: "2rem", alignItems: "center", justifyContent: "flex-start", mt: 0}}>
            <InputDate label="Start Date" 
              sx={{width: "47%", mt: 0.8}}
              value={state.startDate}
              onChange={onDispatch("startDate")}
              inputSx={{
                '& .MuiInputBase-root': {
                  border: error.startDate && "1px solid red",
                  borderColor: "red",
                  borderRadius: "12px",
                  width: '197px',
                  height: '50px',
                },
              }} />
            <InputDate label="End Date" 
              sx={{width: "47%", mt: 0.8, overFlow: "hidden"}}
              value={state.endDate}
              onChange={onDispatch("endDate")}
              inputSx={{
                '& .MuiInputBase-root': {
                  border: error.endDate && "1px solid red",
                  borderRadius: "12px",
                  width: '197px',
                  height: '50px',
                },
              }} />
          </StyledStackRow>
        </Box>

        <Box>
          <StyledStackRow sx={{mt: 0, gap: "0.4rem", alignItems: "center", justifyContent: "flex-start", width: 230}}>
            <ErrorIcon sx={{color: error.daysOfWeek ? palette.error.main : palette.purple.dark}} />
            <StyledTypography sx={{fontSize: 14, fontWeight: 700, color: error.daysOfWeek ? palette.error.main : palette.purple.dark}} >Select Days your message
            will appear in users inbox:</StyledTypography>
          </StyledStackRow>

          <Box  sx={{ marginLeft: 0, mt: 1, paddingLeft: 0, display: 'flex', gap: "3rem" }}>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={state?.daysOfWeek?.includes(1)}  />} label="Mon" onChange={() => onSchedule(1)}/>
                <FormControlLabel control={<Checkbox checked={state?.daysOfWeek?.includes(2)}  />} label="Tue" onChange={() => onSchedule(2)}/>
                <FormControlLabel control={<Checkbox checked={state?.daysOfWeek?.includes(3)}  />} label="Wed" onChange={() => onSchedule(3)}/>
                <FormControlLabel control={<Checkbox checked={state?.daysOfWeek?.includes(4)}  />} label="Thu" onChange={() => onSchedule(4)}/>
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" variant="standard">
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={state?.daysOfWeek?.includes(5)}  />} label="Fri" onChange={() => onSchedule(5)}/>
                <FormControlLabel control={<Checkbox checked={state?.daysOfWeek?.includes(6)}  />} label="Sat" onChange={() => onSchedule(6)}/>
                <FormControlLabel control={<Checkbox checked={state?.daysOfWeek?.includes(7)}  />} label="Sun" onChange={() => onSchedule(7)}/>
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
      </StyledStackRow>
    </StyledContainer>
  );
}

export default MailSettings;