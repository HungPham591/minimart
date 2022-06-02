import { Select } from '@mui/material';
import React from 'react';



const FormikSelect = ({ children, form, field }: any) => {
    const { name, value } = field;
    const { setFieldValue } = form;

    return (
        <Select
            name={name}
            value={value}
            onChange={e => {
                setFieldValue(name, e.target.value);
            }}
        >
            {children}
        </Select>
    );
};

export default React.memo(FormikSelect);