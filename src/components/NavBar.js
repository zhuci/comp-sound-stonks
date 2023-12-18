import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const NavBar = () => {
  const sections = [
    {
      title: "Home",
      url: "/",
    },
    {
      title: "Blog",
      url: "/blog",
    },
  ];
  console.log(
    "window.location.pathname !== section.url ",
    window.location.pathname
  );
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar sx={{ bgcolor: "#8884d8" }}>
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            STONKS
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {/* <Button key={0} sx={{ color: "#fff" }}>
              <Link to="/">Home</Link>
            </Button>
            <Button key={1} sx={{ color: "#fff" }}>
              <Link to="/blog">Blog</Link>
            </Button> */}
            {/* <Button key={2} sx={{ color: "#fff" }}>
              <Link to="https://github.com/zhuci/comp-sound-stonks">
                Github
              </Link>
            </Button> */}

            {sections.map((section, index) => (
              <Link to={section.url}>
                {window.location.pathname ===
                  "/comp-sound-stonks" + section.url ||
                (section.url === "/" &&
                  window.location.pathname === "/comp-sound-stonks") ? (
                  <Button key={index} sx={{ color: "#82ca9d" }}>
                    {section.title}
                  </Button>
                ) : (
                  <Button key={index} sx={{ color: "#fff" }}>
                    {section.title}
                  </Button>
                )}
              </Link>
            ))}
            <Link to="https://github.com/zhuci/comp-sound-stonks">
              <Button key={2} sx={{ color: "#fff" }}>
                Github
              </Button>
            </Link>
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default NavBar;
