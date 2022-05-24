
import { Box } from '@mui/material';
import React from 'react';



export default function ClientImage(props: any) {
    return (
        <React.Fragment>
            <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src={props?.src} />
        </React.Fragment>
    );
}