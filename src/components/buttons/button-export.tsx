import { LoadingButton } from '@mui/lab';

function ButtonExport(props: any) {
  return (
    <LoadingButton
      sx={props.sx}
      {...props}
      variant={props.variant || "contained"}
      onClick={props.onClick}
      loadingPosition="center"
    >
      {props.label || "Export"}
    </LoadingButton>
  )
}

export default ButtonExport;
