import { withStyles } from "@mui/styles";
import React from 'react';
import './style.scss';

const styles = {

}
function TextSkeleton(props: any) {
    return (
        <div className="skeleton skeleton-text"></div>
    )
}

export default withStyles(styles)(TextSkeleton);