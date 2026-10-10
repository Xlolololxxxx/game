import { Autocomplete, Stack, TextField } from '@mui/material';
import { StyledTypography } from './styles.css';

type Props = {
  sx?: any;
  formControlSx?: any;
  label: string;
  error?: boolean;
  disabled?: boolean;
  placeholder?: string;
  value?: any;
  options: any[];
  onChange: (e: any) => void;
  getOptionLabel: (e: any) => string;
}

function SelectItem(props: Props) {

  return (
    <Stack mt={2} sx={props.sx}>
      <StyledTypography sx={{fontSize: 14}} >{props.label}</StyledTypography>
      <Autocomplete
        value={props.value}
        disabled={props.disabled}
        onChange={(event: any, newValue: any) => {
          props.onChange(newValue);
        }}
        id="update-autocomplete"
        options={props.options}
        
        sx={[{ mt: 0.8}, props.formControlSx]}
        getOptionLabel={props.getOptionLabel}
        renderInput={(params) => <TextField {...params} placeholder={props.placeholder} error={props.error} />}
      />
    </Stack>
  );
}

export default SelectItem;