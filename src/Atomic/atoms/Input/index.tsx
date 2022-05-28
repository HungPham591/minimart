import { TextField } from '@mui/material';
import React from 'react';


function CustomInput(props: any) {
    return (
        <TextField
            {...props}
            ref={props?.ref}
            fullWidth
            variant="outlined"
        />
    )
}
export default React.memo(CustomInput);