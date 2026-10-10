import React from "react";
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import _ from "lodash";

function DatePickerScreen(props: any) {
  const { error, label, value, onChange } = props;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <MobileDatePicker
        label={label}
        value={value}
        sx={props.sx}
        slotProps={{
          textField: {
            // fullWidth: true,
            variant: 'outlined',
            error: !_.isEmpty(error),
            helperText: error,
          },
        }}
        onChange={onChange}
      />
    </LocalizationProvider>
  );
}

export default DatePickerScreen;
