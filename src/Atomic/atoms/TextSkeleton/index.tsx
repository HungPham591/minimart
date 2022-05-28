import React from 'react';
import './style.scss';

function CustomTextSkeleton(props: any) {
    return (
        <div className="skeleton skeleton-text"></div>
    )
}
export default React.memo(CustomTextSkeleton);