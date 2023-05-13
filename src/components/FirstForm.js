import React, { useEffect, useState } from "react";
import { updateLead } from "../api/LeadApi";
import { Box, Button, Grid, TextField } from "@mui/material";

const FirstForm = (payload) => {
  let initialLead = {
    name: null,
    ownerName: null,
    type: null,
    leadId: 0,
    groupId: 0,
  };

  const [lead, setLead] = useState(initialLead);

  useEffect(() => {
    console.log("Inside useEffect", lead);
  }, [lead]);

  const validateForm = (event) => {
    event.preventDefault();

    if (lead.name === null || lead.name === "") {
      console.log("Name value is not null");
    }
    if (lead.ownerName === null || lead.ownerName === "") {
      console.log("ownerName value is not null");
    }
    if (lead.type === null || lead.type === "") {
      console.log("ownerName value is not null");
    }
    if (
      lead.name !== null &&
      lead.ownerName !== null &&
      lead.type !== null &&
      lead.name !== "" &&
      lead.ownerName !== "" &&
      lead.type !== ""
    ) {
      console.log("Dati valorizzati correttamente");
      updateLead(lead).then((result) => {
        console.log("Risultato della chiamata rest UPDATE-LEAD", result);
        payload.loadInitialData();
      });
    } else {
      console.log("Attenzione: validazione fallita");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px"
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            name="name"
            onChange={(event) =>
              setLead({ ...lead, [event.target.name]: event.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="ownerName"
            label="Responsabile"
            variant="outlined"
            name="ownerName"
            onChange={(event) =>
              setLead({ ...lead, [event.target.name]: event.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="type"
            label="Tipo"
            variant="outlined"
            name="type"
            onChange={(event) =>
              setLead({ ...lead, [event.target.name]: event.target.value })
            }
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <Button
            variant="contained"
            onClick={(event) => {
              validateForm(event);
            }}
            fullWidth
          >
            Salva
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default FirstForm;
