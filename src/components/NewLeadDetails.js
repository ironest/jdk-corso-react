import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Grid,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { findByPrimaryKey, updateLead } from "../api/LeadApi";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import React, { useEffect, useState } from "react";

const NewLeadDetails = () => {
  const { leadId } = useParams();
  const [lead, setLead] = useState(null);
  const [currentLead, setCurrentLead] = useState(null);

  const [open, setOpen] = useState(false);
  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    console.log("LeadID = ", leadId);
    initialLoad();
  }, []);

  const initialLoad = () => {
    findByPrimaryKey({ id: leadId }).then((res) => {
      console.log("Ottenuto lead", res);
      setCurrentLead(res);
      setLead(res);
      if (true) {
        setSnackbarStatus({
          open: true,
          message: "Salvataggio completato",
          severity: "success",
        });
      }
    });
  };

  const handleEdit = () => {
    setOpen(true);
  };

  const handleSaveLead = () => {
    setOpen(false);
    setSnackbarStatus({
      open: true,
      message: "Salvataggio in corso...",
      severity: "warning",
    });
    updateLead(lead).then((res) => {
      console.log("Lead salvato con dati = ", res);
      initialLoad();
    });
  };

  // TODO Catturare il parametro leadId dalla request
  // TODO Recuperare il lead tramite il leadId ricevuto come parametro dalla request

  return (
    <>
      <Box align='center'>
        {!currentLead && (
          <CircularProgress size={80} sx={{ marginTop: '60px' }} />
        )}

        {currentLead && (
          <>
            <Grid container spacing={3} align="center">
              <Grid item md={12}>
                <Typography variant="h4" component="h4">
                  {currentLead.name}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography variant="h6" component="h6">
                  {currentLead.ownerName}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Typography variant="h6" component="h6">
                  {currentLead.type}
                </Typography>
              </Grid>
              <Grid item md={12}>
                <Button variant="contained" onClick={handleEdit}>
                  Modifica
                </Button>
              </Grid>
            </Grid>
          </>
        )}
      </Box>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle align="center">Modifica Lead</DialogTitle>
        <DialogContent>
          <Box
            sx={{
              padding: "10px",
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
                    setLead({
                      ...lead,
                      [event.target.name]: event.target.value,
                    })
                  }
                  fullWidth
                  defaultValue={currentLead?.name}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="ownerName"
                  label="Responsabile"
                  variant="outlined"
                  name="ownerName"
                  onChange={(event) =>
                    setLead({
                      ...lead,
                      [event.target.name]: event.target.value,
                    })
                  }
                  fullWidth
                  defaultValue={currentLead?.ownerName}
                />
              </Grid>

              <Grid item xs={12}>
                <TextField
                  id="type"
                  label="Tipo"
                  variant="outlined"
                  name="type"
                  onChange={(event) =>
                    setLead({
                      ...lead,
                      [event.target.name]: event.target.value,
                    })
                  }
                  fullWidth
                  defaultValue={currentLead?.type}
                />
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Annulla</Button>
          <Button onClick={handleSaveLead}>Salva</Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={snackbarStatus.open}
        autoHideDuration={6000}
        onClose={() => setSnackbarStatus({ ...snackbarStatus, open: false })}
      >
        <Alert
          onClose={() => setSnackbarStatus({ ...snackbarStatus, open: false })}
          severity={snackbarStatus.severity}
          sx={{ width: "100%" }}
        >
          {snackbarStatus.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NewLeadDetails;
