import React from 'react'
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import Radio from '@mui/material/Radio';

function RadioField(props: any) {
  return (
    <FormControl variant='filled' sx={[{ marginTop: 1, width: '49%' }, props.sx]} fullWidth={props.fullWidth}>
      <FormLabel id="demo-row-radio-buttons-group-label" sx={{ fontSize: 13 }}>{props.label}</FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        value={props.value}
        onChange={props.onChange}
      >
        {props.data.map((item: any, index: number) => {
          return <FormControlLabel key={index.toString()}
            value={item.value} control={<Radio />} slotProps={{ typography: { fontSize: 13 } }} label={item.label} />
        })}
      </RadioGroup>
    </FormControl>
  )
}

export default RadioField;