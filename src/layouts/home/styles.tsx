import { AppBar, Box, Button, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

export const Header = styled(Box)(({ theme }) => ({
  alignItems: "center",
  alignSelf: "center",
  width: "100%",
  justifyContent: "center",
  backgroundColor: "transparent",
  [theme.breakpoints.down('md')]: {
    padding: '20px',
    // paddingTop: 100
  },
  [theme.breakpoints.up('md')]: {
    padding: '20px',
    // paddingTop: "70px"
  },
}));

export const HeaderLogoContainer = styled('div')({
  height: 90,
});

export const Footer = styled(AppBar)({
  backgroundColor: 'rgba(255, 255, 255, 0.75)',
  padding: '41px 0',
});

export const FooterLogoContainer = styled('div')({
  height: 27
});

export const SigninButton = styled(Button)({
  backgroundColor: '#620395',
  border: '1px solid #6C05A3',
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  borderRadius: 10,
  fontFamily: 'Montserrat',
});

export const Logo = styled('img')({
  width: '100%',
  height: '100%',
  pointerEvents: 'none'
});

export const FooterHeadingText = styled(Typography)({
  color: '#6C05A3',
  fontWeight: 'bold',
});

export const FooterText = styled(Typography)({});

export const AddressContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  color: '#6C05A3',
});

export const Address = styled('div')({
  marginTop: 16
});

export const JumboIcon = styled('img')({
  width: 427
});

export const JumboButton = styled(Button)({
  backgroundColor: '#04BECE',
  border: '1px solid #6BEDF5',
  boxShadow: "0px 4px 4px 0px rgba(0, 0, 0, 0.25)",
  borderRadius: 10,
  fontFamily: 'Montserrat',
  width: 245,
  height: 60,
  marginTop: 37
});