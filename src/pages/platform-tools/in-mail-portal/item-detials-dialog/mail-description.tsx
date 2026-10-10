import { Box, Button, CircularProgress, Stack, Typography, useMediaQuery, useTheme } from '@mui/material';
import Iconify from '@src/components/iconify';
import { useToasterContext } from '@src/context/Toaster';
import { AlertType } from '@src/lib/types/toaster';
import Config from '@src/utils/api/config';
import React from 'react';
import NewMailMask from '../create-mail-dialog/new-mail-mask';
import { StyledContainer } from '../create-mail-dialog/styles.css';
import { useInMailService } from '../hooks';
import { useInMailContext } from '../provider';
import Input from './input';
import { useUpdateMailContext } from './provider';
import {
  StyledReminderBox, StyledStackRow,
  StyledTypography, StyledUploadBox,
  styles
} from './styles.css';

function MailDescription() {
  const theme = useTheme();
  const { uploadImage } = useInMailService();
  const { triggerOpen } = useToasterContext();
  const { handleMailDetails } = useInMailContext();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { state, error, enableEdit, setEnableEdit,
    onUpdateMailDetails, onDispatch } = useUpdateMailContext();

  const onPress = () => {
    if(enableEdit){
      onUpdateMailDetails();
    }else{
      setEnableEdit(true);
    }
  }

  const handleFileChange = (type: string) => (event: any) => {
    const file = event.target.files[0];
    if (file) {
      if (file.size > 3 * 1024 * 1024) {
        triggerOpen({
          type: AlertType.error,
          title: "Failed",
          message: "File size must be less than 3MB",
        });
        return;
      }

      const formData = new FormData();
      formData.append("file", file);
      formData.append("type", type);
      uploadImage.mutate(formData);
    }
  };

  React.useEffect(() => {
    if(uploadImage.data && uploadImage.isSuccess){
      onDispatch(uploadImage.data.type)(`${Config.APP_CDN_URL}/${uploadImage.data.result.filePath}`);   
    }
  },[uploadImage.isSuccess, uploadImage.data, onDispatch])

  return (
    <StyledContainer>
      <Iconify onClick={() => handleMailDetails({})} icon={isMobile ? 'mdi:arrow-left' : 'mdi:close'} sx={styles.btn_close} />
      <StyledStackRow 
        sx={{
          gap: "1rem",
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column-reverse",
            xs: "column-reverse"
          }
        }} >
        <Input
          disabled={!enableEdit}
          sx={{
            display: "flex", 
            flexDirection: "row", 
            alignItems: "center", 
            justifyContent: "center",
            width: {
              xl: 500,
              lg: 500,
              md: 500,
              sm: "100%",
              xs: "100%"
            },
            gap: "1rem",
          }}
          inputSx={{
            marginTop: 0,
            '& .MuiInputBase-root': {
              height: '40px',
            }}}
          error={error.subject}
          label="Mail Name: " value={state.subject}
          onChange={onDispatch("subject")}  />
        <Button variant="contained" onClick={onPress} sx={styles.btn_save} >{enableEdit ? "SAVE" : "EDIT MAIL"}</Button>
      </StyledStackRow>
      <Input 
        disabled={!enableEdit}
        sx={{mt: 1.4}} 
        label="Pop up Description:" 
        inputSx={{
          '& .MuiInputBase-root': {
            height: '40px',
          }}}
        error={error.popupDescription}
        value={state.popupDescription}
        onChange={onDispatch("popupDescription")} />
      <StyledStackRow 
        sx={{
          flexDirection: {
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          },
          gap: {
            xl: "4rem",
            lg: "4rem",
            md: "3rem",
            sm: "1rem",
            xs: "1rem",
          }}} mt={2}>
        <Stack>
          <StyledTypography >Remainders:</StyledTypography>
          <StyledReminderBox >
            <Typography component="div" sx={{m: 1.8, fontSize: 12, lineHeight: 1.6}}>
              <Box sx={{}}>Note:</Box>
              <Box sx={{mt: 2}}>• image uploaded needs to be optimized.</Box>
              <Box sx={{}}>• a maximum file size of 3MB only.</Box>
              <Box sx={{}}>• message should be in .png file format while the thumbnail in .jpg format.</Box>
            </Typography>
          </StyledReminderBox>
        </Stack>
        <Stack sx={{width: "100%"}}>
          <StyledTypography >Thumbnail Preview:</StyledTypography>
          <StyledUploadBox sx={[error.thumbnailImage && {border: "1px dashed red"}]} >
            <input
              type="file"
              id="thumbnailImage"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleFileChange("thumbnailImage")}
            />
            {enableEdit && <Stack sx={{
              display: "flex",
              width: 325,
              height: 200, 
              opacity: 0.9,
              alignItems: "center",
              justifyContent: "center",
              position: "absolute"
              }} >
              <NewMailMask notes="Recommended size: 500x500" />
            </Stack>}
            {uploadImage.isPending && 
              <CircularProgress sx={{position: "absolute"}} />}
            {state.thumbnailImage && 
              <img 
                src={state.thumbnailImage} 
                alt="Selected" 
                style={{ maxWidth: '90%', height: '90%' }} />}
          </StyledUploadBox>
          {enableEdit && 
          <Stack width={325}>
            <Button variant="contained" onClick={() => {
              document.getElementById('thumbnailImage')?.click();
            }} sx={styles.btn_upload} >UPLOAD</Button>
          </Stack>}
        </Stack>
      </StyledStackRow>
    </StyledContainer>
  );
}

export default MailDescription;