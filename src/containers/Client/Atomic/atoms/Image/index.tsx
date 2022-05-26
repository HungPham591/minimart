
import React from 'react';



export default function ClientImage(props: any) {
    return <img style={{ width: '100%', height: '100%', borderRadius: '10px' }} src={props?.src} />;
}