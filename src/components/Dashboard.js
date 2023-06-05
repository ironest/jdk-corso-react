import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import NewLeadList from "./NewLeadList";

const Dashboard = (props) => {
  const { leadList, getLeadDetail, handleShowLeadDetails, deleteLead } = props;
  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Typography variant="h1" component="h1">
            Questa e' la Dashboard
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
