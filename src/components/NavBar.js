import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { COLORS } from "../values/colors";

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
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        sx={{
          background: `linear-gradient(to bottom, ${COLORS.black} 70%, ${COLORS.red})`,
        }}
      >
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{
              flexGrow: 1,
              display: { xs: "none", sm: "block" },
              fontWeight: "bold",
            }}
            color={COLORS.white}
          >
            AUTOMATED COMPOSITON WITH STOCK DATA
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {sections.map((section, index) => (
              <Link to={section.url}>
                {window.location.pathname ===
                  "/comp-sound-stonks" + section.url ||
                (section.url === "/" &&
                  window.location.pathname === "/comp-sound-stonks") ? (
                  <Button
                    key={index}
                    sx={{ color: COLORS.orange }}
                    variant="text"
                  >
                    {section.title}
                  </Button>
                ) : (
                  <Button
                    key={index}
                    sx={{ color: COLORS.white }}
                    variant="text"
                  >
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
