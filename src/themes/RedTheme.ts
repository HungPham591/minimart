import { createTheme } from "@mui/material/styles";
import BaseTheme from "../constants/BaseTheme";


const RedTheme = createTheme({
    ...BaseTheme,
    palette: {
        primary: {
            main: '#FF385C'
        },
        secondary: {
            main: "#FEBB02"
        },
    }
});

export default RedTheme;