import { Box, Dialog as MUIDialog, Stack, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export const BootstrapDialog = styled(MUIDialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
  },
}));

export const StyledTypography = styled(Typography)({
  fontWeight: 500,
  fontSize: 14,
  color: "#0F172A"
});

export const StyledReminderBox = styled(Box)({
  width: 270,
  height: 200,
  marginTop: 7,
  display: 'flex',
  border: "1px solid #575757",
});

export const StyledUploadBox = styled(Box)(({ theme }: any) => ({
  width: 325,
  height: 200,
  marginTop: 7,
  borderRadius: 12,
  display: 'flex',
  alignItems: "center",
  justifyContent: 'center',
  border: "1px dashed #575757",
}));

export const StyledStackRow = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: 'space-between',
  gap: "4rem"
}));

export const StyledInput = styled(TextField)(({ theme }) => ({
  display: 'flex',
  flex: 1,
  marginTop: 4,
}));

export const styles = {
  t_status: {
    display: "flex",
    flexDirection: "row",
    fontSize: 16,
    fontWeight: 500, 
    color: "#4C4C4C",
    gap: "0.5rem"
  },
  btn_close: { 
    width: 30, 
    height: 30,
    color: "#7D7D7D", 
    bgcolor: "white", 
    position: "absolute",
    right: 20, 
    top: 20
  },

  btn_cancel: {
    width: "47%", height: 56, borderRadius: 2,
    border: "1px solid #E2E8F0",
    color: "black", bgcolor: "white", 
    alignSelf: "center", marginTop: 1.3
  },

  btn_save: { 
    width: "47%", height: 56, borderRadius: 2, 
    color: "white", bgcolor: "#6A00AC", 
    alignSelf: "center", marginTop: 1.3
  },
}