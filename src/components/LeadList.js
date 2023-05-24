import React, { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  Modal,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const LeadList = (payload) => {
  const [modal, setModal] = useState({
    title: "",
    message: "",
    show: false,
  });

  const [currentLead, setCurrentLead] = useState(null);

  const handleModal = (lead) => {
    setCurrentLead(lead);
    setModal({
      show: true,
      title: "CANCELLAZIONE",
      message: "Sei sicuro di voler continuare con la cancellazione?",
    });
  };

  const handleDeleteButton = () => {
    payload.deleteLead(currentLead.leadId);
    setModal({
      ...modal,
      show: false,
    });
  };

  return (
    <>
      {!payload?.leadList ? (
        <div
          style={{
            height: "90%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <CircularProgress size={120} sx={{ alignSelf: "center" }} />
        </div>
      ) : (
        <List>
          {payload.leadList.map((entry) => {
            return (
              <>
                <ListItem>
                  <Grid container spacing={3}>
                    <Grid item xs={4} display={"flex"} alignItems={"center"}>
                      {entry.name}
                    </Grid>
                    <Grid item xs={2} display={"flex"} alignItems={"center"}>
                      {entry.leadId}
                    </Grid>
                    <Grid item xs={6}>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => handleDeleteButton(entry.leadId)}
                        sx={{
                          marginRight: "10px",
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => payload.getLeadDetail(entry.leadId)}
                      >
                        <EditNoteIcon />
                      </IconButton>
                    </Grid>
                  </Grid>
    </List>
      })}
        );
          </>
            </Modal>
              </Box>
                </Box>
                  </Button>
                    Conferma
                  >
                    onClick={() => handleDeleteButton()}
                    variant="contained"
                  <Button
                  </Button>
                    Annulla
                  >
                    }}
                      setModal({ ...modal, show: false });
                    onClick={() => {
                    variant="outlined"
                  <Button
                >
                  }}
                    justifyContent: "space-around",
                    display: "flex",
                    marginTop: "30px",
                  sx={{
                <Box
                </Typography>
                  {modal.message}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                </Typography>
                  {modal.title}
                <Typography id="modal-modal-title" variant="h6" component="h2">
              <Box sx={style}>
            >
              aria-describedby="modal-modal-description"
              aria-labelledby="modal-modal-title"
              }}
                setModal({ ...modal, show: false });
              onClose={() => {
              open={modal.show}
            <Modal

                </ListItem>
                <Divider />
  );
};

export default LeadList;
