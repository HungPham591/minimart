const BaseTheme = {
    palette: {
        primary: {
            contrastText: '#fff',
        },
        secondary: {
            main: "#FEBB02"
        },
    },
    shape: {
        borderRadius: 10,
    },
    spacing: [0, 4, 8, 16, 32, 64],
    typography: {
        button: {
            fontWeight: "bold"
        },
        subtitle1: {
            height: "60px",
            color: "grey"
        },
        subtitle2: {
            height: "60px",
            backgroundColor: '#E6E6E6',
            color: "red"
        }
    },
    components: {
        MuiAppBar: {
            styleOverrides: {
                root: ({ theme }: any) => ({
                    backgroundColor: "#fff",
                    color: theme?.palette.grey[800],
                    boxShadow: '0 4px 8px 0 rgba(172, 172, 172, 0.2)',
                })
            },
        },
    }
}
export default BaseTheme;