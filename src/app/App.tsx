import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routeConfig";
import { AppProvider } from "./context/appContext";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

function App() {
  const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: `
          body {
            background-color: #D3E6F7;
          }
        `,
      },
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppProvider>
        <Router>
          <Routes>
            {routes.map(({ path, element: Component }) => (
              <Route key={path} path={path} element={<Component />} />
            ))}
          </Routes>
        </Router>
      </AppProvider>
    </ThemeProvider>
  );
}

export default App;
