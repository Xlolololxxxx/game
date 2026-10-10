// @mui
import { MenuItem, TextField } from '@mui/material';


export default function DropDownMenu({ options, value, onSort }: any) {
  return (
    <TextField fullWidth select variant="outlined" value={value} onChange={onSort}>
      {options.map((option: any) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  );
}
