import { TextField } from '@mui/material';
import React from 'react';


export default function ClientInput(props: any) {
    return (
        <TextField
            {...props}
            fullWidth
            variant="outlined"
        />
    )
}