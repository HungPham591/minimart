import { SearchOutlined } from '@mui/icons-material';
import { Autocomplete, TextField } from '@mui/material';
import React from 'react';


export default function ClientSearchInput(props: any) {
    return (
        <TextField
            {...props}
            InputProps={{
                endAdornment: <SearchOutlined />
            }}
            style={{ width: '100%' }}
            variant="outlined"
        />
    )
}