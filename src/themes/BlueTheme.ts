import { createTheme } from "@mui/material/styles";
import BaseTheme from "../constants/BaseTheme";
import * as _ from 'lodash';


const BlueTheme = createTheme(_.merge({
    palette: {
        primary: {
            main: '#1a73e8',
        },
        secondary: {
            main: "#FEBB02"
        },
    },
}, BaseTheme));

export default BlueTheme;