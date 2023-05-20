import React, { useEffect, useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

const FirstForm = (payload) => {
  const [lead, setLead] = useState(payload?.lead);

  useEffect(() => {
    setLead(payload?.lead);
  }, [payload?.lead]);

  const handleResetClick = () => {
    payload.reset();
  };

  const handleSaveClick = () => {
    payload.validateLead(lead);
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
          <Grid item md={6}>
            <Button
              variant="outlined"
              onClick={(event) => {
                handleResetClick();
              }}
              fullWidth
            >
              Reset
            </Button>
          </Grid>
          <Grid item md={6}>
            <Button
              variant="contained"
              onClick={(event) => {
                handleSaveClick();
              }}
              fullWidth
            >
              Salva
            </Button>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default FirstForm;
