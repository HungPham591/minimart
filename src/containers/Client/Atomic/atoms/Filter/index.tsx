import { MenuItem, Select } from '@mui/material';
import React from 'react';

export default function ClientFilter(props: any) {
    return (
        <Select
            labelId=''
            id=''
            {...props}
            value=""
        >
            <MenuItem value="">None</MenuItem>
            {
                props?.value ? props?.value.map((value: any, index: any) => (
                    <MenuItem value={value.value} key={index}>{value.label}</MenuItem>
                )) : null
            }
        </Select>
    )
}