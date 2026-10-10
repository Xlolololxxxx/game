import { FormControl, FormHelperText } from '@mui/material';
import { LocalizationProvider, MobileDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { Dayjs } from 'dayjs';
import { useController } from 'react-hook-form';

type FormDatePickerProps = {
  name: string;
  control: any;
  rules?: any;
  label?: string;
  sx?: any;
  disableFuture?: boolean;
  disablePast?: boolean;
  disabled?: boolean;
};

export const FormDatePicker = ({
  name,
  control,
  rules,
  label = '',
  sx,
  disableFuture,
  disablePast,
  disabled,
}: FormDatePickerProps) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });
  const { value, onChange } = field;
  const { error } = fieldState;

  return (
    <FormControl fullWidth error={!!error} size="small">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <MobileDatePicker
          label={label}
          disabled={disabled}
          value={value}
          format="DD/MM/YYYY"
          disableFuture={disableFuture}
          disablePast={disablePast}
          sx={sx}
          onChange={(newValue: Dayjs | null) => {
            // store ISO string or null in RHF
            onChange(newValue);
          }}
          slotProps={{
            textField: {
              fullWidth: true,
              variant: 'outlined',
              error: !!error,
            },
          }}
        />
      </LocalizationProvider>

      {error && (
        <FormHelperText sx={{ color: '#F80606' }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
