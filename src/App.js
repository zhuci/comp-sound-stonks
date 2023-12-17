import { BrowserRouter, Routes, Route } from "react-router-dom";
import { React } from "react";

import Home from "./containers/Home";
import Blog from "./containers/Blog";

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      {/* // <BrowserRouter> */}
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
