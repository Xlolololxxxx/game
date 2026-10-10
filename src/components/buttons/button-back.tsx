import { Button } from "@mui/material";
import Iconify from "@src/components/iconify";

type Props = {
  onClick: () => void;
}

const ButtonBack = (props: Props) => {

  return (
    <Button
      onClick={props.onClick}
      sx={{
        color: "#747994",
        mb: 2
      }}
      startIcon ={
        <Iconify icon={'mdi:arrow-left'} width={{
          xl: 30,
          lg: 22,
          md: 22,
          sm: 20,
          xs: 20,
      }} />
      }>
      Go Back
    </Button>
  )
}

export default ButtonBack;