import { styled, alpha } from '@mui/material/styles';
import { OutlinedInput, Toolbar } from "@mui/material";

export const StyledRoot = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
  "&.MuiToolbar-regular": {
    paddingLeft: 0,
    marginLeft: 0,
    paddingRight: 0,
    marginRight: 0,
  },
}));

export const StyledWrap = styled(Toolbar)(({ theme }) => ({
  height: 96,
  gap: 5,
  display: 'flex',
}));

export const StyledWrapRight = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem'
}));

export const StyledSearch = styled(OutlinedInput)(({ theme }: any) => ({
  width: 320,
  fontFamily: "Inter",
  backgroundColor: "white",
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