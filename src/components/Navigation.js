import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import React from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Dashboard from "./Dashboard";
import NewLeadDetails from "./NewLeadDetails";
import NewLeadList from "./NewLeadList";

const Navigation = (props) => {
  const { leadList, getLeadDetail, handleShowLeadDetails, deleteLead } = props;

  return (
    <BrowserRouter>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Home</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/lead-details">Lead Details</Link>
            </Typography>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/lead-list">Lista Lead</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Routes>
        <Route
          path="/"
          element={
            <Dashboard
              leadList={leadList}
              getLeadDetail={getLeadDetail}
              handleShowLeadDetails={handleShowLeadDetails}
              deleteLead={deleteLead}
            />
          }
        />
        <Route path="/lead-details" element={<NewLeadDetails />} />
        <Route path="/lead-list" element={<NewLeadList />} />
        
      </Routes>
    </BrowserRouter>
  );
};

export default Navigation;
