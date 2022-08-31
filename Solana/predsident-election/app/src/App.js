import React from "react";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import { SnackbarProvider } from "notistack";
import { ThemeProvider } from "@material-ui/core";
import { network } from "./utils/config";
import { themeCreator } from './Theme';
import AppWrappedWithProviders from './components/Wrapper/AppWrapper';

const theme = themeCreator;

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <SnackbarProvider>
        <ConnectionProvider endpoint={network}>
          <AppWrappedWithProviders />
        </ConnectionProvider>
      </SnackbarProvider>
    </ThemeProvider>
  );
}
