import { SearchOutlined } from '@mui/icons-material';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';


export default function ClientInput(props: any) {
    return (
        <TextField
            {...props}
            style={{ width: '100%' }}
            variant="outlined"
        />
    )
}