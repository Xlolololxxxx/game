import { Stack } from '@mui/material';
import { StyledInput, StyledTypography } from './styles.css';

type Props = {
  sx?: any;
  inputSx?: any;
  label: string;
  error?: boolean;
  disabled?: boolean;
  type?: string;
  placeholder?: string;
  helperText?: string;
  inputProps?: any;
  value: number | string;
  onChange: (e: any) => void;
}

function Input(props: Props) {

  return (
    <Stack mt={2} sx={props.sx}>
      <StyledTypography noWrap sx={{fontSize: 14}} >{props.label}</StyledTypography>
      <StyledInput 
        error={props.error}
        variant="outlined"
        type={props.type}
        inputProps={props.inputProps}
        helperText={props.helperText}
        disabled={props.disabled} 
        placeholder={props.placeholder} 
        sx={props.inputSx} value={props.value}
        onChange={(e) => props.onChange(e.target.value)} />
    </Stack>
  );
}

export default Input;