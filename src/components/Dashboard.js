import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewLeadList from "./NewLeadList";
import NewLeadForm from "./NewLeadForm";

const Dashboard = (props) => {

  const [statusUpdate, setStatusUpdate] = useState(false);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={6}>
          <NewLeadForm setStatusUpdate={setStatusUpdate}/>
        </Grid>
        <Grid item md={6}>
          <NewLeadList statusUpdate={statusUpdate} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
