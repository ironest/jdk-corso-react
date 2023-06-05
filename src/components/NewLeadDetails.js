import { Box, Grid, Typography } from "@mui/material";
import React from "react";

const NewLeadDetails = () => {

  // TODO Catturare il parametro leadId dalla request
  // TODO Recuperare il lead tramite il leadId ricevuto come parametro dalla request

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Typography variant="h1" component="h1">Questa e' il Nuovo Lead Details</Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default NewLeadDetails