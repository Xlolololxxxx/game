import { styled, alpha } from '@mui/material/styles';
import { Box, OutlinedInput, Toolbar } from "@mui/material";

export const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

export const StyledWrap = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
}));

export const StyledWrapRight = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem'
}));

export const StyledSearch = styled(OutlinedInput)(({ theme }: any) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': {
    width: 320,
    boxShadow: theme.customShadows.z8,
  },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${alpha(theme.palette.grey[500], 0.32)} !important`,
  },
}));

export const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  backgroundColor: "#E5EFF4", 
  color: "#457DBF", 
  width: 77, 
  height: 35,
  fontWeight: "600",
  borderRadius: 16,
  alignItems: "center",
  justifyContent: 'center',
}));