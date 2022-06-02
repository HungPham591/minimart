import { createTheme } from "@mui/material/styles";
import BaseTheme from "../constants/BaseTheme";
import * as _ from 'lodash';

const RedTheme = createTheme(_.merge({
    palette: {
        primary: {
            main: '#FF385C',
        },
        secondary: {
            main: "#FEBB02"
        },
    },
}, BaseTheme));

export default RedTheme;