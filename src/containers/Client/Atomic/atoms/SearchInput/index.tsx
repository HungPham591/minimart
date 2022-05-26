import { SearchOutlined } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';


export default function ClientSearchInput(props: any) {
    return (
        <TextField
            {...props}
            InputProps={{
                endAdornment: <SearchOutlined />
            }}
            fullWidth
            variant="outlined"
        />
    )
}