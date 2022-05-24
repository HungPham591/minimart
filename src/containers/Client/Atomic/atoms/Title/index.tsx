import React from 'react';
import { Typography } from '@mui/material';



export default function Title(props: any) {
    return (
        <Typography variant='h3' component='h4' fontWeight='bold' {...props}>
            {props?.value}
        </Typography>
    )
}