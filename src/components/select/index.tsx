import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  MenuItem
} from '@mui/material';
import { useController } from 'react-hook-form';

import { SelectProps } from './types';

export const Select = <T extends string | number>(props: SelectProps<T>) => {
  const {
    name,
    control,
    rules,
    label = '',
    labelId,
    options = [],
    valueKey = 'value',
    labelKey = 'label',
    disabledKey = 'disabled', // 👈 NEW
    ...rest
  } = props;

  const { field, fieldState } = useController({
    name,
    control,
    rules,
  });

  const { error } = fieldState;
  const { value: selectValue, onChange } = field;

  return (
    <FormControl fullWidth error={!!error} size="small">
      <InputLabel id={labelId}>{label}</InputLabel>

      <MUISelect
        label={label}
        labelId={labelId}
        value={selectValue ?? ''}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      >
        {options.map((option: any, index: number) => (
          <MenuItem
            key={`${label}-${index}`}
            value={option[valueKey]}
            disabled={Boolean(option[disabledKey])} // 👈 DISABLE ITEM
          >
            {option[labelKey]}
          </MenuItem>
        ))}
      </MUISelect>

      {error && (
        <FormHelperText sx={{ color: '#F80606' }}>
          {error.message}
        </FormHelperText>
      )}
    </FormControl>
  );
};
