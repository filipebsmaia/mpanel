import React from "react";

import { AuthProvider } from "./auth";
import { ToastProvider } from "./toast";
import { ThemeProvider } from "./theme";

// import { Container } from './styles';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider>
      <AuthProvider>
        <ToastProvider>{children}</ToastProvider>
      </AuthProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
