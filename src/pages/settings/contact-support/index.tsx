import { Card } from '@mui/material';
import Box from '@mui/material/Box';
import { Helmet } from 'react-helmet-async';
import InputDetails from './input-details';

export default function ContactSupport() {
  return (
    <Box display={"flex"} justifyContent={"center"}>
      <Helmet>
        <title>Contact Support</title>
      </Helmet>
      <Card 
        sx={{ 
          width: {
            xl: "100%",
            lg: "100%",
            md: "90%",
            sm: "90%",
            xs: "90%",
          }, height: "100%", 
          px: {
            xl: "46px",
            lg: "40px",
            md: "10px",
            sm: "10px",
            xs: "10px",
          }, 
          py: {
            xl: "61px",
            lg: "50px",
            md: "40px",
            sm: "20px",
            xs: "20px",
          }, borderRadius: "25px" }}>
        <InputDetails />
      </Card>
    </Box>
  );
}