import { Box, Dialog as MUIDialog, Stack, TextField, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';

export const BootstrapDialog = styled(MUIDialog)(({ theme }) => ({
  width: "100%",
  "& .MuiDialog-paper": {
    margin: 0, // Removes margin
    padding: 0, // Removes padding
    width: "100%", // Ensures full width
  },
}));

export const StyledContainer = styled(Box)(({ theme }) => ({
  [theme.breakpoints.up("lg")]: {
    padding: "40px", paddingRight: "112px"
  },
  [theme.breakpoints.down("lg")]: {
    padding: "40px", paddingRight: "112px"
  },
  [theme.breakpoints.down("md")]: {
    padding: "40px", paddingRight: "112px"
  },
  [theme.breakpoints.down("sm")]: {
     padding: "20px", paddingRight: "20px"
  },
  [theme.breakpoints.down("xs")]: {
     padding: "20px", paddingRight: "20px"
  },
}));

export const StyledTypography = styled(Typography)({
  fontWeight: 500,
  fontSize: 14,
  color: "#0F172A"
});

export const StyledReminderBox = styled(Box)(({ theme }) => ({
  width: 270,
  height: 200,
  marginTop: 7,
  display: 'flex',
  border: "1px solid #575757",
  [theme.breakpoints.up("lg")]: {
    width: 270,
    height: 200,
  },
  [theme.breakpoints.down("lg")]: {
    width: 270,
    height: 200,
  },
  [theme.breakpoints.down("md")]: {
    width:"90%",
    height: 170,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 141,
  },
  [theme.breakpoints.down("xs")]: {
    width: "100%",
    height: 141,
  },
}));

export const StyledUploadBox = styled(Box)(({ theme }: any) => ({
  width: 325,
  height: 200,
  marginTop: 7,
  borderRadius: 12,
  display: 'flex',
  alignItems: "center",
  justifyContent: 'center',
  border: "1px dashed #575757",
  [theme.breakpoints.up("lg")]: {
    width: 325,
    height: 200,
  },
  [theme.breakpoints.down("lg")]: {
    width: 325,
    height: 200,
  },
  [theme.breakpoints.down("md")]: {
    width:"90%",
    height: 170,
  },
  [theme.breakpoints.down("sm")]: {
    width: "100%",
    height: 200,
  },
  [theme.breakpoints.down("xs")]: {
    width: "100%",
    height: 200,
  },
}));

export const StyledStackRow = styled(Stack)(({ theme }) => ({
  display: 'flex',
  flexDirection: "row",
  alignItems: "flex-start",
  justifyContent: 'space-between',
  gap: "4rem",
}));

export const StyledStackField = styled(Stack)(({ theme }) => ({
  display: 'flex',  
  [theme.breakpoints.up("lg")]: {
    flexDirection: "row",
    alignItems: "center",
  },
  [theme.breakpoints.down("lg")]: {
    flexDirection: "row",
    alignItems: "center",
  },
  [theme.breakpoints.down("md")]: {
    flexDirection: "row",
    alignItems: "center",
  },
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
  [theme.breakpoints.down("xs")]: {
    flexDirection: "column",
    alignItems: "flex-start",
  },
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
    // right: 20, 
    top: 20,
    right: {
      xl: 20,
      lg: 20,
      md: 20,
      sm: "86%",
      xs: "86%",
    },
  },

  btn_save: { width: 101, height: 33, borderRadius: 1, 
    color: "white", bgcolor: "#6A00AC", alignSelf: "flex-end", marginTop: 1.3},
  btn_upload: { width: 101, height: 33, borderRadius: 1, color: "white", bgcolor: "#484848", alignSelf: "center", marginTop: 1.3},
  btn_deactivation: { paddingLeft: 2, paddingRight: 2, height: 39, borderRadius: 1.2, color: "white", bgcolor: "#484848"},


  box_advance: {
    pl: 5,
    pr: 5,
    width: "100%", 
    height: 78, 
    bgcolor: "#5FA3FF", 
    display: "flex", 
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
    
  },
  box_upload: {
    width: 270, 
    height: 50,
    gap: "1rem",
    border: "1px dashed #575757", 
    borderRadius: 1, display: "flex", 
    alignItems: "center", justifyContent: "center"
  },
}