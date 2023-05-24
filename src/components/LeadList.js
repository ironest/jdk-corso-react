import React, { useState } from "react";
import {
  Box,
  Button,
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
    <List>
      {payload.leadList.map((entry) => {
        return (
          <>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item xs={5} display={"flex"} alignItems={"center"}>
                  {entry.name}
                </Grid>
                <Grid item xs={4} display={"flex"} alignItems={"center"}>
                  {entry.leadId}
                </Grid>
                <Grid item xs={3}>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => handleModal(entry)}
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
            </ListItem>
            <Divider />

            <Modal
              open={modal.show}
              onClose={() => {
                setModal({ ...modal, show: false });
              }}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                  {modal.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                  {modal.message}
                </Typography>
                <Box
                  sx={{
                    marginTop: "30px",
                    display: "flex",
                    justifyContent: "space-around",
                  }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setModal({ ...modal, show: false });
                    }}
                  >
                    Annulla
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => handleDeleteButton()}
                  >
                    Conferma
                  </Button>
                </Box>
              </Box>
            </Modal>
          </>
        );
      })}
    </List>
  );
};

export default LeadList;
