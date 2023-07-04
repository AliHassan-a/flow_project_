import React, { useEffect } from "react";
import "./App.scss";
import { useStore } from "./state/store";
import Agent from "./components/Agent";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DataView from "./components/DataView";
import LoadRun from "./components/LoadRun";
import { shallow } from "zustand/shallow";
import NavBar from "./components/NavBar";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Layout from "./Layouts/Layout";
import Dashboard from "./Pages/Dashboard";
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});

function App() {
  const [fetchData] = useStore((state) => [state.fetchData], shallow);

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <div className="App">
        <Router>
          <Routes>
            <Route path="/" element={<LoadRun />} />
            <Route path="/view" element={<DataView />} />
            {/* Route for Dashboard Screen */}
            <Route path="/Dashboard" element={<Dashboard />} />
          </Routes>
        </Router>
      </div>
    </ThemeProvider>
  );
}

export default App;
