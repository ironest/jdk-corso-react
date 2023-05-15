import React, { useEffect, useState } from "react";
import { updateLead } from "../api/LeadApi";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Snackbar,
  Stack,
  TextField,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

const FirstForm = (payload) => {
  const [lead, setLead] = useState(payload?.lead);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    setLead(payload?.lead);
  }, [payload?.lead]);

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
        result?.leadId > 0
          ? setShowSuccessAlert(true)
          : setShowSuccessAlert(false);
        console.log("Risultato della chiamata rest UPDATE-LEAD", result);
        payload.loadInitialData();
      });
    } else {
      console.log("Attenzione: validazione fallita");
    }
  };

  return (
    <>
      <Box
        sx={{
          padding: "20px",
        }}
      >
        <Grid container spacing={3}>
          <Grid item md={12}>
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
          <Grid item md={12}>
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
          <Grid item md={12}>
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
          <Grid item md={12}>
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

      <Box sx={{ padding: "20px" }}>
        <Stack sx={{ width: "100%" }} spacing={2}></Stack>

        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={3000}
          message="Note archived"
          onClose={() => {
            setShowSuccessAlert(false);
          }}
        >
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowSuccessAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            Lead salvato con successo
          </Alert>
        </Snackbar>
      </Box>
    </>
  );
};

export default FirstForm;
