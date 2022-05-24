
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import RenderSwitchRoute from '../../Atomic/_settings/RenderSwitchRoute';
import { selectSetting } from '../../reducers/setting.reducer';
import ClientRoutes from '../../routes/CLientRoutes';
import ClientContainer from './ClientContainer';
import BlueTheme from './themes/blueTheme';
import RedTheme from './themes/redTheme';

export default function Client() {
    const { mode } = useSelector(selectSetting);
    const theme = React.useMemo(
        () => {
            if (mode) { console.log(mode); return RedTheme; }
            return BlueTheme;
        },
        [mode],
    );
    return (
        <ThemeProvider theme={theme}>
            <ClientContainer >{RenderSwitchRoute(ClientRoutes)}</ClientContainer>
        </ThemeProvider>
    );
}