import { blue, red } from "@material-ui/core/colors";
import { createTheme } from "@material-ui/core";

export const themeCreator = createTheme({
    palette: {
      primary: {
        main: blue[300],
      },
      secondary: {
        main: red[300],
      },
    },
    overrides: {
      MuiButtonBase: {
        root: {
          justifyContent: "flex-start",
        },
      },
      MuiButton: {
        root: {
          textTransform: undefined,
          padding: "12px 16px",
          fontWeight: 600,
        },
        startIcon: {
          marginRight: 8,
        },
        endIcon: {
          marginLeft: 8,
        },
        label: {
          color: "white",
        },
      },
      MuiLink: {
        root: {
          color: "initial",
        },
      },
    },
}); 