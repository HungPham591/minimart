import { Shadows } from "@mui/material/styles/shadows";

const BaseTheme = {
    palette: {
        primary: {
            contrastText: '#fff',
        },
        secondary: {
            main: "#FEBB02"
        },
        background: {
            default: "#FAFAFA"
        },
        text: {
            primary: "#11142d",
        }
    },
    shadows: Array(25).fill('rgb(90 114 123 / 11%) 0px 7px 30px 0px') as Shadows,
    shape: {
        borderRadius: 15,
    },
    typography: {
        fontFamily: "'Montserrat', sans-serif",
        fontWeightRegular: 500,
        fontWeightLight: 500,
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
                    backgroundColor: "white",
                    color: "#000000",
                    // left: `calc(${theme.spacing(7)} + 10px)`,
                    // right: 0,
                    // boxShadow: "none",
                    position: "sticky" as "sticky"
                })
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: ({ theme }: any) => ({
                    backgroundColor: theme.shadows[4],
                })
            },
        },
        MuiBottomNavigation: {
            styleOverrides: {
                root: {
                    position: 'fixed' as 'fixed',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    zIndex: 1100
                }
            }
        },
    }
}
export default BaseTheme;