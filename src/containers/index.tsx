
import { ThemeProvider } from '@mui/material/styles';
import React from 'react';
import { useSelector } from 'react-redux';
import RenderSwitchRoute from '../Atomic/_settings/RenderSwitchRoute';
import { selectSetting } from '../reducers/SettingReducer';
import ClientRoutes from '../routes/CLientRoutes';
import BlueTheme from '../themes/BlueTheme';
import RedTheme from '../themes/RedTheme';
import PageContainer from './PageContainer';

export default function Page() {
    const { mode } = useSelector(selectSetting);
    const theme = React.useMemo(
        () => {
            if (mode) return RedTheme
            return BlueTheme;
        },
        [mode],
    );
    return (
        <ThemeProvider theme={theme}>
            <PageContainer >{RenderSwitchRoute(ClientRoutes)}</PageContainer>
        </ThemeProvider>
    );
}