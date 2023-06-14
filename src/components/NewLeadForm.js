import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { updateLead } from "../api/LeadApi";

const initialLead = {
  name: "",
  ownerName: "",
  type: "",
  leadId: 0,
  groupId: 0,
};

const NewLeadForm = (props) => {
  const [lead, setLead] = useState({
    ...initialLead,
    ...props.lead,
  });

  const handleResetClick = () => {
    setLead({
      ...initialLead,
      ...props.lead,
    });

    if (props.isModal) {
      props.closeDialog();
    }
  };

  const handleSave = () => {
    if (lead.name === null || lead.name === "") {
      console.log("Name value is not null");
    } else if (lead.ownerName === null || lead.ownerName === "") {
      console.log("ownerName value is not null");
    } else if (lead.type === null || lead.type === "") {
      console.log("Type value is not null");
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

      updateLead(lead).then((res) => {
        if (props.isModal) {
          props.closeDialog();
        }
        props.refreshList();
      });
    } else {
      console.log("Validazione fallita");
    }
  };

  return (
    <Box
      sx={{
        padding: "20px",
      }}
    >
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h4" component="h4" align="center">
            {props.lead.leadId ? "Modifica del Lead" : "Inserimento nuovo Lead"}
          </Typography>
        </Grid>
        <Grid item md={12} sm={4} xs={12}>
          <TextField
            id="name"
            label="Nome"
            variant="outlined"
            name="name"
            onChange={(event) =>
              setLead({ ...lead, [event.target.name]: event.target.value })
            }
            fullWidth
            value={lead?.name}
          />
        </Grid>
        <Grid item md={12} sm={4} xs={12}>
          <TextField
            id="ownerName"
            label="Responsabile"
            variant="outlined"
            name="ownerName"
            onChange={(event) =>
              setLead({ ...lead, [event.target.name]: event.target.value })
            }
            fullWidth
            value={lead?.ownerName}
          />
        </Grid>
        <Grid item md={12} sm={4} xs={12}>
          <TextField
            id="type"
            label="Tipo"
            variant="outlined"
            name="type"
            onChange={(event) =>
              setLead({ ...lead, [event.target.name]: event.target.value })
            }
            fullWidth
            value={lead?.type}
          />
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button
            variant="outlined"
            onClick={(event) => {
              handleResetClick();
            }}
            fullWidth
          >
            {props.lead.leadId ? "Annulla" : "Reset"}
          </Button>
        </Grid>
        <Grid item sm={6} xs={12}>
          <Button
            variant="contained"
            onClick={(event) => {
              handleSave();
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

export default NewLeadForm;
