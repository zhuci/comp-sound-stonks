import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { COLORS } from "./values/colors";

import Home from "./containers/Home";
import Blog from "./containers/Blog";

const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: COLORS.green,
    },
  },
});

const App = () => {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <BrowserRouter basename={"/comp-sound-stonks"}>
        {/* // <BrowserRouter> */}
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
