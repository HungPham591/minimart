import React from 'react';
import { Button } from '@mui/material';


export default function ClientButton(props: any) {
    return (
        <Button {...props} variant="contained">{props?.title}</Button>
    )
}