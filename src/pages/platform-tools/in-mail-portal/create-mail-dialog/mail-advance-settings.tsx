import ErrorIcon from '@mui/icons-material/Error';
import { Box, Checkbox, FormControlLabel, FormGroup, Stack, Typography, useTheme } from '@mui/material';
import Config from "@src/utils/api/config";
import React from "react";
import { useInMailService } from "../hooks";
import Input from './input';
import { useCreateMailContext } from './provider';
import SelectItem from "./select-item";
import { StyledContainer, StyledStackField, StyledStackRow, StyledTypography } from './styles.css';

function MailAdvanceSettings() {
  const theme: any = useTheme();
  const boxRef = React.useRef<any>();
  const {products, games, uploadImage } = useInMailService();
  const { state, error, onDispatch } = useCreateMailContext();

  const onChangeActionButton = (type: string) => (value: boolean) => {
    if(type === "enableCoinBonus"){
      onDispatch("enableCoinBonus")(value);
      onDispatch("actionButtonType")("COIN_BONUS");
      onDispatch("enableCTA")(false);
    }else if(type === "enableCTA"){
      onDispatch("enableCTA")(value);
      onDispatch("actionButtonType")("CTA");
      onDispatch("enableCoinBonus")(false);
    }
  }

  React.useEffect(() => {
    if(uploadImage.data && uploadImage.isSuccess){
      onDispatch(uploadImage.data.type)(`${Config.APP_CDN_URL}/${uploadImage.data.result.filePath}`);
    }
  },[uploadImage.isSuccess, uploadImage.data, onDispatch]);

  React.useEffect(() => {
    if(state.isActionButtonEnabled){
      boxRef.current?.scrollIntoView({ behavior: "smooth" })
    }
  },[state.isActionButtonEnabled]);

  if(!state.isActionButtonEnabled) return null;

  return (
    <StyledContainer ref={boxRef} >
      <StyledStackField sx={{gap: "0.2rem" }}>
        <FormControlLabel 
          label="ADD COIN BONUS"
          control={<Checkbox checked={state.enableCoinBonus} />} 
          onChange={(e: any) => onChangeActionButton("enableCoinBonus")(e.target.checked)}
          slotProps={{typography: {color: theme.palette.purple.dark, fontSize: 20, fontWeight: 700}}} />
        <Typography color="#B4B4B4" sx={{fontStyle: "italic"}}>
          Create a reward for your users. Enter coin amounts in your message
        </Typography>
      </StyledStackField>
      <StyledStackField 
        gap={{
          xl: "2rem",
          lg: "2rem",
          md: "2rem",
          sm: "0.7rem",
          xs: "0.7rem",
        }}
        ml={{
          xl: 6,
          lg: 6,
          md: 6,
          sm: 2,
          xs: 2,
        }}>
        <Input
          sx={{ width: 270 }}
          disabled={!state.enableCoinBonus}
          placeholder="Enter Amount"
          inputSx={{
            '& .MuiInputBase-root': {
              height: '50px',
            },
            }}
          label="Silver Coins:" 
          type="number"
          error={error.silverAmount}
          value={state.silverAmount}
          onChange={onDispatch("silverAmount")} />
        <Input
          sx={{ width: 270 }}
          disabled={!state.enableCoinBonus}
          placeholder="Enter Amount"
          type="number"
          inputSx={{
            '& .MuiInputBase-root': {
              height: '50px',
            },
            }}
          label="Bonus Gold Coins:" 
          error={error.silverAmount}
          value={state.bonusGoldAmount}
          onChange={onDispatch("bonusGoldAmount")} />
      </StyledStackField>
      <Stack direction={"row"} alignItems={"flex-end"} gap="2rem" 
        ml={{
          xl: 6,
          lg: 6,
          md: 6,
          sm: 2,
          xs: 2,
        }}>
        <Input
          disabled={!state.enableCoinBonus}
          sx={{ width: 270 }}
          placeholder="CTA Name"
          inputSx={{
            '& .MuiInputBase-root': {
              height: '50px',
            },
            }}
          label="CTA Button:" value={state.ctaButtonName}
          onChange={onDispatch("ctaButtonName")} />
          <FormGroup  aria-label="position" row sx={{gap: 2}}>
            <FormControlLabel
              disabled={!state.enableCoinBonus}
              control={<Checkbox checked={state.enableCoinBonus && state.ctaButtonColor === "#EABC34"} />}
              label="Yellow"
              labelPlacement="end"
              onChange={() => onDispatch("ctaButtonColor")(state.ctaButtonColor === "#EABC34" ? "#2EAC50" : "#EABC34")} 
            />
            <FormControlLabel
              disabled={!state.enableCoinBonus}
              control={<Checkbox checked={state.enableCoinBonus && state.ctaButtonColor === "#2EAC50"} />}
              label="Green(for Promo Purchase)"
              labelPlacement="end"
              onChange={() => onDispatch("ctaButtonColor")(state.ctaButtonColor === "#2EAC50" ? "#EABC34" : "#2EAC50")} 
            />
          </FormGroup>
      </Stack>

      <StyledStackField sx={{gap: "0.2rem", mt: 4 }}>
        <FormControlLabel
          label="ADD CTA" 
          control={<Checkbox checked={state.enableCTA} />} 
          onChange={(e: any) => onChangeActionButton("enableCTA")(e.target.checked)}
          slotProps={{typography: {color: error.enableCTA ? "red" : theme.palette.purple.dark, 
            fontSize: 20, fontWeight: 700}}} />
        <Typography color="#B4B4B4" sx={[{fontStyle: "italic"}, error.enableCTA && { color: "red"}]}>
          Select 1 action to apply to your message.
        </Typography>
      </StyledStackField>
      <Stack direction={"row"} gap="0.5rem" ml={3}>
        <Checkbox sx={{mt: 5}}
          disabled={!state.enableCTA}
          checked={state.ctaType === "GAME"} 
          onChange={() => onDispatch("ctaType")(state.ctaType === "GAME" ? "" : "GAME")} />
        <SelectItem
          disabled={!state.enableCTA || state.ctaType !== "GAME"}
          options={games}
          formControlSx={{
            '& .MuiInputBase-root': {
              marginTop: "4px",
              width: "270px",
              height: '50px',
          }}}
          label="Connect to Game:"
          placeholder="Select Game"
          value={state.gameId}
          error={error.gameId}
          getOptionLabel={(option: any) => `${option.gameName}`}
          onChange={onDispatch("gameId")}  />
      </Stack>
      <Stack direction={"row"} gap="0.5rem" ml={3}>
        <Checkbox sx={{mt: 5}} 
          disabled={!state.enableCTA}
          checked={state.ctaType === "PRODUCT"} 
          onChange={() => onDispatch("ctaType")(state.ctaType === "PRODUCT" ? "" : "PRODUCT")} />
        <SelectItem
          disabled={!state.enableCTA || state.ctaType !== "PRODUCT"}
          options={products}
          formControlSx={{
            '& .MuiInputBase-root': {
              marginTop: "4px",
              width: "270px",
              height: '50px',
          }}}
          label="Connect to Store Package:"
          placeholder="Select Store Package"
          value={state.productId}
          error={error.productId}
          getOptionLabel={(option: any) => `${option.description}`}
          onChange={onDispatch("productId")}  />
      </Stack>
      <Stack direction={"row"} alignItems={"flex-end"} gap="0.5rem" ml={3}>
        <Checkbox sx={{mt: 5}}
          disabled={!state.enableCTA}
          checked={state.ctaType === "URL"} 
          onChange={() => onDispatch("ctaType")(state.ctaType === "URL" ? "" : "URL")} />
        <Input
          disabled={!state.enableCTA || state.ctaType !== "URL"}
          sx={{ width: 270 }}
          error={error.url}
          placeholder="Enter URL"
          inputSx={{
            '& .MuiInputBase-root': {
              height: '50px',
            },
            }}
          label="Connect to URL:" value={state.url}
          onChange={onDispatch("url")} />

          <StyledStackRow sx={{mb: 2, ml: 1, gap: "0.4rem", alignItems: "center", justifyContent: "flex-start"}}>
            <ErrorIcon sx={{color: "#B4B4B4", width: "22px", height: "22px"}} />
            <StyledTypography sx={{
              fontSize: 14, fontWeight: 500,
              fontStyle: "italic",
              color: "#B4B4B4"}} >
                Lead audience to your social pages
            </StyledTypography>
          </StyledStackRow>
          <Box flexDirection={"row"} >
            
          
          </Box>
      </Stack>
      <Stack direction={"row"} alignItems={"flex-end"} gap="2rem" ml={9.1}>
        <Input
          disabled={!state.enableCTA}
          sx={{ width: 270 }}
          placeholder="CTA Name"
          inputSx={{
            '& .MuiInputBase-root': {
              height: '50px',
            },
            }}
          label="CTA Button:" value={state.ctaButtonName}
          onChange={onDispatch("ctaButtonName")} />
          <FormGroup  aria-label="position" row sx={{gap: 2}}>
            <FormControlLabel
              disabled={!state.enableCTA}
              control={<Checkbox checked={state.enableCTA && state.ctaButtonColor === "#EABC34"} />}
              label="Yellow"
              labelPlacement="end"
              onChange={() => onDispatch("ctaButtonColor")(state.ctaButtonColor === "#EABC34" ? "#2EAC50" : "#EABC34")} 
            />
            <FormControlLabel
              disabled={!state.enableCTA}
              control={<Checkbox checked={state.enableCTA && state.ctaButtonColor === "#2EAC50"} />}
              label="Green(for Promo Purchase)"
              labelPlacement="end"
              onChange={() => onDispatch("ctaButtonColor")(state.ctaButtonColor === "#2EAC50" ? "#EABC34" : "#2EAC50")} 
            />
          </FormGroup>
      </Stack>
    </StyledContainer>
  );
}

export default MailAdvanceSettings;