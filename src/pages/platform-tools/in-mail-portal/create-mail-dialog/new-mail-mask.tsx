import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Stack, Typography } from '@mui/material';

function NewMailMask(props: any) {
  return (
    <Stack p={2} 
      width={"94%"} 
      height={"90%"}
      sx={props.stackSx} 
      bgcolor="rgba(237, 237, 237, 1)" alignItems={"center"} justifyContent={"center"}>
      <CloudUploadOutlinedIcon />
      <Typography variant='h6' mt={1}>New Image</Typography>
      <Box mt={1} sx={{
        fontWeight: "600",
        fontStyle: "italic",
        color: "#9A9A9A",
        display: "flex", flexDirection: "row", 
        fontSize: 10, alignItems: "center", 
        justifyContent: "center", gap: '0.4rem'
      }} >
        <InfoIcon sx={{fontSize: 15, fontStyle: "italic", color: "#9A9A9A"}}/>
        {props.notes}
      </Box>
    </Stack>
  );
}

export default NewMailMask;