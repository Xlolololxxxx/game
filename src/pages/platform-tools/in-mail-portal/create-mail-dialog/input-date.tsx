import { Stack } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { StyledTypography } from './styles.css';

type Props = {
  sx?: any;
  inputSx?: any;
  placeholder?: string;
  label: string;
  value: any;
  onChange: (value: any) => void;
}

function InputDate(props: Props) {

  return (
    <Stack mt={2} sx={props.sx}>
      <StyledTypography sx={{fontSize: 14}} >{props.label}</StyledTypography>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker']}>
          <DatePicker sx={props.inputSx} value={props.value} onChange={props.onChange}/>
        </DemoContainer>
      </LocalizationProvider>
    </Stack>
  );
}

export default InputDate;