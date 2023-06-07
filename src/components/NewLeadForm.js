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
  const [lead, setLead] = useState(initialLead);

  const handleSave = () => {
    updateLead(lead).then((res) => {
        props.setStatusUpdate((prev)=>!prev)
    });
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
            Inserimento nuovo Lead
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
              // handleResetClick();
            }}
            fullWidth
          >
            Reset
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
