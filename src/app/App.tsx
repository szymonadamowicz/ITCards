import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import routes from "./routes/routeConfig";
import { AppProvider } from "./context/appContext";

function App() {
  return (
    <AppProvider>
    <Router>
      <Routes>
      {routes.map(({ path, element: Component }) => (
          <Route key={path} path={path} element={<Component />} />
        ))}
      </Routes>
    </Router>
    </AppProvider>
  );
}

export default App;
