import ErrorIcon from '@mui/icons-material/Error';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import IndeterminateCheckBoxIcon from '@mui/icons-material/IndeterminateCheckBox';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import { Box, Button, Checkbox, FormControl, FormControlLabel, FormGroup, Stack, Typography } from '@mui/material';
import Config from "@src/utils/api/config";
import { tierName } from '@src/utils/transform-helper';
import _ from 'lodash';
import React from 'react';
import SelectItem from '../create-mail-dialog/select-item';
import { useInMailService } from '../hooks';
import Input from './input';
import InputDate from './input-date';
import { useUpdateMailContext } from './provider';
import {
  StyledButton,
  StyledButtonBox,
  StyledStackField,
  StyledStackRow,
  StyledStatus,
  StyledTypography,
  styles
} from './styles.css';
import { StyledContainer } from "../create-mail-dialog/styles.css";

function MailSettings() {
  const { products, games, uploadImage } = useInMailService({ getInMailDetails: true});
  const { state, error, enableEdit, onDispatch, onUpdateMailStatus } = useUpdateMailContext();

  const handleEveryone = (event: any) => {
    const isChecked = event.target.checked;
    if(isChecked){
      onDispatch("applicableTiers")([1,2,3,4]);
    }else{
      onDispatch("applicableTiers")([]);
    }
  }

  const onVisibleTo = (value: number) => {
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

  React.useEffect(() => {
    if(uploadImage.data && uploadImage.isSuccess){
      onDispatch(uploadImage.data.type)(`${Config.APP_CDN_URL}/${uploadImage.data.result.filePath}`);
    }
  },[uploadImage.isSuccess, uploadImage.data, onDispatch]);

  return (
    <StyledContainer>
      <Stack 
        direction={{
          xl: "row",
          lg: "row",
          md: "row",
          sm: "column",
          xs: "column"
        }}>
        <StyledTypography sx={{flex: 1, fontSize: 20, fontWeight: 700, color: "black"}} >Settings</StyledTypography>
        <StyledStatus>
          <Typography display="inline" variant="body1" sx={styles.t_status} >
            Status: 
            <Typography display="inline" variant="body1" fontWeight={"600"} 
              color={state?.isActive ? '#44B370' : "error.main"}>
              {state?.isActive ? "Active" : "Inactive"}
            </Typography>
          </Typography>
          <Button onClick={onUpdateMailStatus} 
            variant="contained"
            disabled={!enableEdit}
            sx={styles.btn_deactivation} >{state.isActive ? "DEACTIVATE" : "ACTIVATE"}</Button>
        </StyledStatus>
      </Stack>
      <Stack direction={{
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column"
          }}>
        <Box sx={{flex: 1, p: 0 }} >
          <StyledStackRow sx={{gap: "0.4rem", alignItems: "center", justifyContent: "flex-start", mt: 4}}>
            <MonetizationOnIcon sx={{color: "#6A00AC"}} />
            <StyledTypography sx={{fontSize: 20, fontWeight: 700, color: "#6A00AC"}} >Coin Bonus</StyledTypography>
          </StyledStackRow>
          <StyledStackField gap={3}>
            <Input 
              sx={{width: {
                xl: "47%",
                lg: "47%",
                md: "47%",
                sm: "100%",
                xs: "100%"
              }, mt: 0.8}} label="Silver Coins:"
              type='number'
              disabled={!enableEdit}
              error={error.silverAmount}
              value={state.silverAmount}
              onChange={(value) => {
                onDispatch("silverAmount")(value);
                onDispatch("gameId")(null);
                onDispatch("productId")(null);
                onDispatch("url")("");
                onDispatch("ctaType")("");
                onDispatch("actionButtonType")("COIN_BONUS");
              }}  />
            <Input sx={{width: {
                xl: "47%",
                lg: "47%",
                md: "47%",
                sm: "100%",
                xs: "100%"
              }, mt: 0.8}} label="Bonus Gold Coins:" 
              type='number'
              disabled={!enableEdit}
              error={error.bonusGoldAmount}
              value={state.bonusGoldAmount}
              onChange={(value) => {
                onDispatch("bonusGoldAmount")(value)
                onDispatch("gameId")(null);
                onDispatch("productId")(null);
                onDispatch("url")("");
                onDispatch("ctaType")("");
                onDispatch("actionButtonType")("COIN_BONUS");
              }}/>
          </StyledStackField>
          <StyledStackRow sx={{gap: "0.4rem", alignItems: "center", justifyContent: "flex-start", mt: 4}}>
            <IndeterminateCheckBoxIcon sx={{color: "#6A00AC"}} />
            <StyledTypography sx={{fontSize: 20, fontWeight: 700, color: "#6A00AC"}} >CTA Details</StyledTypography>
          </StyledStackRow>
          <SelectItem
            disabled={!enableEdit}
            options={games}
            label="Connect to Game:"
            placeholder="Select Game"
            value={state.gameId}
            getOptionLabel={(option: any) => `${option.gameName}`}
            onChange={(value) => {
              onDispatch("gameId")(value);
              onDispatch("productId")(null);
              onDispatch("url")("");
              onDispatch("ctaType")("GAME");
              onDispatch("silverAmount")("");
              onDispatch("bonusGoldAmount")("");
              onDispatch("actionButtonType")("CTA");
            }}  />
          <SelectItem
            options={products}
            disabled={!enableEdit}
            label="Connect to Store Package:"
            placeholder="Select Store Package"
            value={state.productId}
            getOptionLabel={(option: any) => `${option.description}`}
            onChange={(value) => {
              onDispatch("productId")(value);
              onDispatch("gameId")(null);
              onDispatch("url")("");
              onDispatch("ctaType")("PRODUCT");
              onDispatch("silverAmount")("");
              onDispatch("bonusGoldAmount")("");
              onDispatch("actionButtonType")("CTA");
            }}  />
          <Input label="URL:" 
            disabled={!enableEdit}
            error={error.url}
            value={state.url}
            onChange={(value) => {
              onDispatch("url")(value);
              onDispatch("productId")(null);
              onDispatch("gameId")(null);
              onDispatch("ctaType")("URL");
              onDispatch("silverAmount")("");
              onDispatch("bonusGoldAmount")("");
              onDispatch("actionButtonType")("CTA");
            }}/>
          <Stack mt={2} >
            <StyledTypography sx={{fontSize: 14}} >CTA Button Preview:</StyledTypography>
            <StyledButtonBox >
              <StyledButton bgcolor={state?.ctaButtonColor}>{state?.ctaButtonName}</StyledButton>
            </StyledButtonBox>
          </Stack>
          <FormControlLabel sx={{display: "flex", mt: 2, alignItems: "center", justifyContent: "center"}}
            slotProps={{typography: { fontWeight: "700" }}}
            control={<Checkbox checked={!state?.isActionButtonEnabled}  />} 
            label="DISABLE BUTTON" onChange={() => onDispatch("isActionButtonEnabled")(!state?.isActionButtonEnabled)}/>
        </Box>
        <Box sx={{flex: {
            xl: 0.9,
            lg: 0.9,
            md: 0.9,
            sm: 1,
            xs: 1
          }, marginLeft: {
            xl: 10,
            lg: 10,
            md: 10,
            sm: 0,
            xs: 0
          },
          
          width: {
            xl: "auto",
            lg: "auto",
            md: "auto",
            sm: "100%",
            xs: "100%",
          } }} >
          <StyledStackRow sx={{gap: "0.4rem", alignItems: "center", justifyContent: "flex-start", mt: 4}}>
            <EventAvailableIcon sx={{color: "#6A00AC"}} />
            <StyledTypography sx={{fontSize: 20, fontWeight: 700, color: "#6A00AC"}} >Schedule</StyledTypography>
          </StyledStackRow>
          <StyledStackRow sx={{gap: "0rem", alignItems: "center", justifyContent: "flex-start", mt: 0}}>
            <InputDate label="Start Date" 
              sx={{width: "50%", mt: 0.8}}
              value={state.startDate}
              disabled={!enableEdit}
              onChange={onDispatch("startDate")}
              inputSx={{
                '& .MuiInputBase-root': {
                  borderRadius: "12px",
                  width: "95%",
                  height: '50px',
                },
              }} />
            <InputDate label="End Date" 
              value={state.endDate}
              disabled={!enableEdit}
              onChange={onDispatch("endDate")}
              sx={{width: "50%", mt: 0.8}}
              inputSx={{
                '& .MuiInputBase-root': {
                  borderRadius: "12px",
                  width: "95%",
                  height: '50px',
                },
              }} />
          </StyledStackRow>
          <Box sx={{ marginLeft: 0, paddingLeft: 0, display: 'flex', gap: "3rem" }}>
            <FormControl component="fieldset" variant="standard" disabled={!enableEdit}>
              <FormGroup>
              <FormControlLabel control={<Checkbox checked={state.daysOfWeek.includes(1)}  />} label="Mon" onChange={() => onSchedule(1)}/>
                <FormControlLabel control={<Checkbox checked={state.daysOfWeek.includes(2)}  />} label="Tue" onChange={() => onSchedule(2)}/>
                <FormControlLabel control={<Checkbox checked={state.daysOfWeek.includes(3)}  />} label="Wed" onChange={() => onSchedule(3)}/>
                <FormControlLabel control={<Checkbox checked={state.daysOfWeek.includes(4)}  />} label="Thu" onChange={() => onSchedule(4)}/>
              </FormGroup>
            </FormControl>
            <FormControl component="fieldset" variant="standard" disabled={!enableEdit}>
              <FormGroup>
              <FormControlLabel control={<Checkbox checked={state.daysOfWeek.includes(5)}  />} label="Fri" onChange={() => onSchedule(5)}/>
                <FormControlLabel control={<Checkbox checked={state.daysOfWeek.includes(6)}  />} label="Sat" onChange={() => onSchedule(6)}/>
                <FormControlLabel control={<Checkbox checked={state.daysOfWeek.includes(7)}  />} label="Sun" onChange={() => onSchedule(7)}/>
              </FormGroup>
            </FormControl>
          </Box>
          <Box sx={{ }}>
            <StyledStackRow sx={{gap: "0.4rem", alignItems: "center", justifyContent: "flex-start", mt: 2}}>
              <ErrorIcon sx={{color: "#6A00AC"}} />
              <StyledTypography sx={{fontSize: 20, fontWeight: 700, color: "#6A00AC"}} >Visible to:</StyledTypography>
            </StyledStackRow>
            <FormControl component="fieldset" variant="standard" disabled={!enableEdit} >
              <FormGroup>
                <FormControlLabel control={<Checkbox checked={state.applicableTiers.length === 4} />} label="Everyone" onChange={handleEveryone} />
                <FormControlLabel control={<Checkbox checked={state.applicableTiers.includes(1)} />} label={tierName(1)} onChange={() => onVisibleTo(1)} />
                <FormControlLabel control={<Checkbox checked={state.applicableTiers.includes(2)} />} label={tierName(2)} onChange={() => onVisibleTo(2)}/>
                <FormControlLabel control={<Checkbox checked={state.applicableTiers.includes(3)} />} label={tierName(3)} onChange={() => onVisibleTo(3)}/>
                <FormControlLabel control={<Checkbox checked={state.applicableTiers.includes(4)} />} label={tierName(4)} onChange={() => onVisibleTo(4)}/>
              </FormGroup>
            </FormControl>
          </Box>
        </Box>
      </Stack>
    </StyledContainer>
  );
}

export default MailSettings;