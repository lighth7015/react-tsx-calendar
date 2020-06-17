import {
  Theme,
  createMuiTheme,
  responsiveFontSizes,
  ThemeOptions
} from "@material-ui/core/styles";
import createPalette from "@material-ui/core/styles/createPalette";
import blue from "@material-ui/core/colors/blue";
import lightBlue from "@material-ui/core/colors/lightBlue";

export const palette = {
  primary: { main: blue[600], contrastText: "#ffffff" },
  secondary: { main: lightBlue[600], contrastText: "#ffffff" }
};

export const overrides = {
  MuiCssBaseline: {
    "@global": {
      "@font-face": [
        {
          fontFamily: "Source Sans Pro",
          fontStyle: "normal",
          fontDisplay: "swap",
          fontWeight: 300,
          src:
            "https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@200,300;400;600&display=swap"
        }
      ]
    }
  }
};

export const typography = {
  h1: {
    fontWeight: 300
  },
  h2: {
    fontWeight: 400
  },
  h3: {
    fontWeight: 300
  },
  h4: {
    fontWeight: 300
  },
  h5: {
    fontWeight: 200
  },
  h6: {
    fontWeight: 200
  },
  body1: {
    fontSize: 16,
    lineHeight: 1.6
  },
  fontFamily: ["Source Sans Pro", "Arial"]
};

const themeName: string = "MedAccess Rx";
export default createMuiTheme({
  palette,
  typography,
  overrides,
  themeName
});