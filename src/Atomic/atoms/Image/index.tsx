
import React from 'react';
import thumbnail from '../../../images/thumbnail.jpg';

const style = { width: '100%', height: '100%', borderRadius: '10px', objectFit: "cover" as "cover" }
function CustomImage(props: any) {
    const { width, height } = props;
    return <img
        style={style}
        onError={({ currentTarget }) => {
            currentTarget.onerror = null; // prevents looping
            currentTarget.src = thumbnail;
        }}
        src={props?.src}
    />;
}

export default React.memo(CustomImage);