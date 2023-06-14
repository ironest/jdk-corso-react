import { Box, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import NewLeadList from "./NewLeadList";
import NewLeadForm from "./NewLeadForm";

const Dashboard = (props) => {
  const [statusUpdate, setStatusUpdate] = useState(false);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={4} xs={12}>
          <NewLeadForm
            refreshList={() => setStatusUpdate(!statusUpdate)}
            title="Inserimento nuovo Lead"
            lead={{}}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <NewLeadList statusUpdate={statusUpdate} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
