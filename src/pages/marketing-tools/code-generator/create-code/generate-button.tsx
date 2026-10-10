import { LoadingButton } from '@mui/lab';
import { Box, Button, Stack, Typography } from '@mui/material';
import Iconify from '@src/components/iconify';
import { useMobileChecker } from '@src/utils/screensize-helper';
import { useMemo } from 'react';

interface Props {
  url: string;
  type: string;
  copied: boolean;
  isLoading: boolean;
  isSuccess: boolean;
  handleCopyLink: () => void;
}

function GenerateButton(props: Props) {
  const isMobileScreen = useMobileChecker();

  const label = useMemo(() => {
    if(props.type === "REF"){
      return props.copied ? "CODE COPIED!" : "COPY CODE";
    }else{
      return props.copied ? "LINK COPIED!" : "COPY LINK"
    }
  },[props.type, props.copied]);

  if(isMobileScreen){
    return (
      <Box>
        {props.isSuccess ? null : 
        <LoadingButton
          variant="contained"
          loading={props.isLoading}
          type="submit"
          sx={{
            px: 5,
            width: "100%",
            borderRadius: "10px",
            color: "white",
            height: "50px",
            bgcolor: "#6A00AC"
          }}>
          GENERATE
        </LoadingButton>}
        <Stack 
          direction={{
            xl: "row",
            lg: "row",
            md: "row",
            sm: "column",
            xs: "column",
          }} gap="2rem"
          p="7px"
          alignItems={"center"} 
          width="100%"
          height={64}
          mt={2}
          bgcolor={"#B8E0FC"}
          borderRadius={"10px"}
          border="2px solid #72C5FF" >
          <Box 
            sx={{
              display: "flex", bgcolor: "white", width: "100%", 
              height: "50px", borderRadius: "10px", 
              pl: {
                xl: "26px",
                lg: "26px",
                md: "26px",
                sm: "12px",
                xs: "12px",
              }, alignItems: "center",
              justifyContent: "space-between"
            }}>
            <Typography variant='body1' color="#B1B6BF"
               fontSize={{
                xl: 12,
                lg: 12,
                md: 11,
                sm: 9.5,
                xs: 9.5,
              }}>
              {props.url}
            </Typography>
          </Box>
  
        </Stack>
        <Button
          disabled={!props.url}
          variant="contained"
          onClick={props.handleCopyLink}
          startIcon={<Iconify icon="fluent-mdl2:copy" width={17} height={17} />}
          sx={{
            px: 8,
            mt: 2,
            width: "100%",
            borderRadius: "10px",
            color: "white",
            height: "50px",
            bgcolor: props.url ? "#0E39C1" : "#C3C3C3"
          }}>
          {label}
        </Button>
      </Box>
    );
  }

  return (
    <Stack direction={"row"} gap="2rem"
      px="17px"
      alignItems={"center"} 
      width="100%" height={79} 
      bgcolor={"#B8E0FC"} mt={2}
      borderRadius={"10px"}
      border="2px solid #72C5FF" >
      {props.isSuccess ? null : <LoadingButton
        variant="contained"
        loading={props.isLoading}
        type="submit"
        sx={{
          px: 5,
          borderRadius: "10px",
          color: "white",
          height: "50px",
          bgcolor: "#6A00AC"
        }}>
        GENERATE
      </LoadingButton>}
      <Box 
        sx={{
          display: "flex", bgcolor: "white", width: "100%", 
          height: "50px", borderRadius: "10px", 
          pl: "26px", alignItems: "center",
          justifyContent: "space-between"
        }}>
        <Typography variant='body1' color="#B1B6BF">
          {props.url}
        </Typography>
        <Button
          disabled={!props.url}
          variant="contained"
          disableRipple
          onClick={props.handleCopyLink}
          startIcon={<Iconify icon="fluent-mdl2:copy" width={17} height={17} />}
          sx={{
            px: 8,
            borderRadius: "10px",
            color: "white",
            height: "50px",
            bgcolor: props.url ? "#0E39C1" : "#C3C3C3"
          }}>
          {label}
        </Button>
      </Box>
    </Stack>
  )
  
}

export default GenerateButton;