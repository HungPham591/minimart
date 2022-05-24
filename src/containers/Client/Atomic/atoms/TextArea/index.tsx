import { SearchOutlined } from '@mui/icons-material';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';


export default function ClientTextArea(props: any) {
    return (
        <TextField
            {...props}
            multiline
            rows={4}
            style={{ width: '100%' }}
            variant="outlined"
        />
    )
}