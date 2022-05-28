import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';


function CustomDropdown(props: any) {
  return (
    <FormControl fullWidth>
      <InputLabel >{props?.title}</InputLabel>
      <Select
        {...props}
        onChange={props?.onChange}
        value={props?.defaultValue}
        disabled={props?.disabled}
      >
        {
          props?.data ? props?.data.map((value: any, index: any) => (
            <MenuItem value={value.value} key={index}>{value.label}</MenuItem>
          )
          ) : null
        }
      </Select>
    </FormControl>
  )
}
export default React.memo(CustomDropdown);