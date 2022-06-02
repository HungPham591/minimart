import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';
import React from 'react';
import FormikSelect from '../../atoms/FormikSelect';


// function CustomDropdown(props: any) {
//   return (
//     <FormControl fullWidth>
//       <InputLabel style={{ backgroundColor: "white" }}>{props?.title}</InputLabel>
//       <Field component={FormikSelect}>

//       </Field>
//     </FormControl>
//   )
// }

function CustomDropdown(props: any) {
  return (
    <FormControl fullWidth>
      <InputLabel style={{ backgroundColor: "white" }}>{props?.title}</InputLabel>
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