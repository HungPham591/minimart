import { SearchOutlined } from '@mui/icons-material';
import { TextField } from '@mui/material';
import React from 'react';


function CustomSearchInput(props: any) {
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
export default React.memo(CustomSearchInput);