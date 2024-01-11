import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import PrivateRoutes from "./Routes";
import darkThemeOptions from "./styles/theme/DarkTheme";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import MotionLazyContainer from "./animate/MotionLazyContainer";
import { SnackbarProvider } from "notistack";

const darkTheme = createTheme(darkThemeOptions);

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        <SnackbarProvider
          maxSnack={2}
          data-testid="toastid"
          autoHideDuration={3000}
          anchorOrigin={{ horizontal: "center", vertical: "top" }}
        >
          <CssBaseline enableColorScheme />
          <MotionLazyContainer>
            <PrivateRoutes />
          </MotionLazyContainer>
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
