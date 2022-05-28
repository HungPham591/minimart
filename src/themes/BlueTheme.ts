import { createTheme } from "@mui/material/styles";
import BaseTheme from "../constants/BaseTheme";


const BlueTheme = createTheme({
    ...BaseTheme,
    palette: {
        primary: {
            main: '#1a73e8'
        },
        secondary: {
            main: "#FEBB02"
        },
    }
});

export default BlueTheme;