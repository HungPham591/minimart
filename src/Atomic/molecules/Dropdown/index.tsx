import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Field } from 'formik';
import React from 'react';
import FormikSelect from '../../atoms/FormikSelect';


function CustomDropdown(props: any) {
  return (
    <FormControl fullWidth>
      <InputLabel style={{ backgroundColor: "white" }}>{props?.title}</InputLabel>
      <Field name={props?.name} component={FormikSelect}>
        {
          props?.data ? props?.data.map((value: any, index: any) => (
            <MenuItem value={value.value} key={index}>{value.label}</MenuItem>
          )
          ) : null
        }
      </Field>
    </FormControl>
  )
}


export default React.memo(CustomDropdown);