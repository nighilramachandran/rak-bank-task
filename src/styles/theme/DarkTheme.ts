import { ThemeOptions } from "@mui/material/styles";
import { componetnsOverrides } from "./overrides/components";
const darkThemeOptions: ThemeOptions = {
  palette: {
    mode: "dark",
    text: {
      primary: "#FFFFFF",
      secondary: "#6b53fe",
    },
    background: {
      default: "#FFFFFF",
    },
    primary: {
      main: "#6b53fe",
    },
  },
  // shape: { ...shapOverrides },
  //   typography: { ...typographyStylesOverrides, ...typographyOverride },

  components: {
    ...componetnsOverrides,
  },
};

export default darkThemeOptions;
