import {
  AppBar,
  Box,
  FormControlLabel,
  Toolbar,
  Typography,
  ThemeProvider,
  createTheme,
  Switch,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import React, { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import NewLeadDetails from "./NewLeadDetails";
import NewLeadList from "./NewLeadList";

const Navigation = (props) => {
  // const [darkMode, setDarkMode] = useState(false);

  // const theme = createTheme({
  //   palette: {
  //     mode: darkMode ? "dark" : "light",
  //   },
  // });

  // const handleThemeChange = () => {
  //   setDarkMode(!darkMode);
  // };

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/"
                color="inherit"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "inherit",
                  textDecoration: "none",
                }}
              >
                <HomeIcon />
                Home
              </Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link
                to="/lead-list"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "5px",
                  color: "inherit",
                  textDecoration: "none"
                }}
              >
                <FormatListBulletedIcon />
                Lista Lead
              </Link>
            </Typography>

            <FormControlLabel
              control={
                <Switch
                  checked={props.darkMode}
                  onChange={() => props.setDarkMode(!props.darkMode)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
              label={props.darkMode ? "Dark" : "Light"}
              labelPlacement="start"
            />
          </Toolbar>
        </AppBar>
      </Box>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        {/* <Route path="/lead-details/" element={<NewLeadDetails />} /> */}
        <Route path="/lead-list" element={<NewLeadList />} />
        <Route path="/lead-details/:leadId" element={<NewLeadDetails />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
