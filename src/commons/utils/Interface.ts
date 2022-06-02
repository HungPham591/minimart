import { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
export interface IRefObject {
    value: any
}
export interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}