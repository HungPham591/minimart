import { createTheme } from "@mui/material/styles";


const BlueTheme = createTheme({
    palette: {
        primary: {
            main: '#1a73e8',
            contrastText: '#fff',
        },
    },
    shape: {
        borderRadius: '10px'
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }) => ({
                    backgroundColor: "#fff",
                    color: theme.palette.grey[800],
                    boxShadow: '0 4px 8px 0 rgba(172, 172, 172, 0.2)',
                })
            },
        },
    }
});

export default BlueTheme;