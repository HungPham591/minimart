import { createTheme } from "@mui/material/styles";


const RedTheme = createTheme({
    palette: {
        primary: {
            main: '#FF385C',
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

export default RedTheme;