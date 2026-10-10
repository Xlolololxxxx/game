import { Box, Typography } from "@mui/material";

type Props = {
  label: string;
  value: string | number;
}

const BoxAmount = (props: Props) => {
	return (
		<Box
      sx={{
        width: {
          xl: 302,
          lg: 302,
          md: "100%",
          sm: "100%",
          xs: "100%",
        }, 
        px: 3, 
        height: {
          xl: 60,
          lg: 60,
          md: 74,
          sm: 74,
          xs: 74,
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "white", borderRadius: "10px"
      }}>
      <Typography
        variant='h5'
        textAlign="center" >
        {props.value}
      </Typography>
      <Typography variant='body1' 
        color="#718EBF"
        fontSize={{
          xl: 12,
          lg: 12,
          md: 9,
          sm: 9,
          xs: 9,
        }}
        fontFamily={"Inter"}
        fontWeight={"700"}
        textAlign="center" >
        {props.label}
      </Typography>
    </Box>
	)
}

export default BoxAmount;