import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import React from 'react';


export default function ClientFilterDropdown(props: any) {
  return (
    <FormControl fullWidth>
      <InputLabel >Sắp xếp</InputLabel>
      <Select
        {...props}
        defaultValue=""
      >
        <MenuItem value="" ><p>Mặc định</p></MenuItem>
        {
          props?.data ? props?.data.map((value: any, index: any) => (
            <MenuItem value={value.value} key={index}>{value.label}</MenuItem>
          )) : null
        }
      </Select>
    </FormControl>
  )
}
