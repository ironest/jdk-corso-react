import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";
import InfoIcon from "@mui/icons-material/Info";
import AddIcon from "@mui/icons-material/Add";

import { deleteLead, findAll } from "../api/LeadApi";
import { Link } from "react-router-dom";
import NewLeadForm from "./NewLeadForm";

const NewLeadList = (props) => {
  const [leadList, setLeadList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [displayMode, setDisplayMode] = useState("list");
  const [showEditDialog, setShowEditDialog] = useState(false);

  useEffect(() => {
    loadInitialList();
  }, []);

  useEffect(() => {
    loadInitialList();
  }, [props]);

  const loadInitialList = () => {
    setLeadList([])
    findAll({}).then((result) => {
      console.log("Risultato ottenuto dalla FETCH", result);
      setLeadList(result);
    });
  };

  const handleDeleteButton = (lead) => {
    setCurrentLead(lead);
    setShowDialog(true);
  };

  const handleEditButton = (lead) => {
    setCurrentLead(lead);
    setShowEditDialog(true);
  };

  const handleDeleteConfirm = (id) => {
    deleteLead({ leadId: id }).then((result) => {
      loadInitialList();
      setShowDialog(false);
    });
  };

  // TODO: Gestire il modal per la cancellazione
  // TODO: Decider dove innescare la cancellazione del lead

  const showList = () => {
    return (
      <List>
        {leadList.map((entry) => {
          return (
            <>
              <ListItem>
                <Grid container spacing={3}>
                  <Grid item xs={5} display={"flex"} alignItems={"center"}>
                    {entry.name}
                  </Grid>
                  <Grid item xs={3} display={"flex"} alignItems={"center"}>
                    {entry.leadId}
                  </Grid>

                  <Grid item xs={4} align="right">
                    <IconButton
                      aria-label="info"
                      color="primary"
                      component={Link}
                      to={"/lead-details/" + entry.leadId}
                    >
                      <InfoIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => {
                        handleDeleteButton(entry);
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => handleEditButton(entry)}
                    >
                      <EditNoteIcon />
                    </IconButton>
                  </Grid>
                </Grid>
              </ListItem>
              <Divider />
            </>
          );
        })}
      </List>
    );
  };

  const showCards = () => {
    return (
      <Grid container spacing={3}>
        {leadList.map((entry) => {
          return (
            <Grid item>
              <Card
                variant="outlined"
                sx={{
                  width: 250,
                }}
              >
                <CardHeader title={entry.name + " (" + entry.leadId + ")"} />
                <CardContent>
                  {/* {entry.leadId} - {entry.ownerName} */}
                  <Grid container>
                    <Grid item md={12}>
                      {entry.type}
                      <Divider />
                    </Grid>
                    <Grid item md={12} align="end">
                      ({entry.ownerName})
                    </Grid>
                  </Grid>
                </CardContent>
                <CardActions>
                  <Button
                    size="small"
                    onClick={() => handleDeleteButton(entry)}
                  >
                    Delete
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <Box
      align="center"
      sx={{
        padding: "20px",
      }}
    >
      {leadList.length === 0 ? (
        <CircularProgress size={80} sx={{ marginTop: "60px" }} />
      ) : (
        <Grid container spacing={3} align='left'>
          <Grid item xs={10}>
            <Button onClick={() => setDisplayMode("list")}>Mostra Lista</Button>
            <Button onClick={() => setDisplayMode("cards")}>
              Mostra Cards
            </Button>
          </Grid>
          <Grid item xs={2} align="right">
            <Button
              variant="contained"
              size="small"
              onClick={() => {
                handleEditButton({});
              }}
            >
              <AddIcon />
            </Button>
          </Grid>
        </Grid>
      )}

      {displayMode === "list" ? showList() : showCards()}

      <Dialog
        onClose={() => {
          setShowDialog(false);
        }}
        open={showDialog}
      >
        <DialogTitle>Cancellazione del Lead</DialogTitle>
        <DialogContent>
          <Button
            variant="contained"
            onClick={() => handleDeleteConfirm(currentLead.leadId)}
          >
            Conferma
          </Button>
        </DialogContent>
      </Dialog>

      <Dialog
        onClose={() => {
          setShowEditDialog(false);
        }}
        open={showEditDialog}
      >
        <DialogContent>
          <NewLeadForm
            lead={currentLead}
            isModal={true}
            closeDialog={() => setShowEditDialog(false)}
            refreshList={() => loadInitialList()}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default NewLeadList;
