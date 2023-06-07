import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Dialog,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import CategoryIcon from "@mui/icons-material/Category";

import { deleteLead, findAll } from "../api/LeadApi";
import { Link } from "react-router-dom";

const NewLeadList = (props) => {
  const [leadList, setLeadList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [displayMode, setDisplayMode] = useState("list");

  useEffect(() => {
    loadInitialList();
  }, []);

  useEffect(() => {
    loadInitialList();
  }, [props]);

  const loadInitialList = () => {
    findAll({}).then((result) => {
      console.log("Risultato ottenuto dalla FETCH", result);
      setLeadList(result);
    });
  };

  const handleDeleteButton = (lead) => {
    setCurrentLead(lead);
    setShowDialog(true);
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
                  <Grid item xs={3} display={"flex"} alignItems={"center"}>
                    {entry.name}
                  </Grid>
                  <Grid item xs={3} display={"flex"} alignItems={"center"}>
                    {entry.leadId}
                  </Grid>

                  <Grid item xs={3} display={"flex"} alignItems={"center"}>
                    <Link to={'/lead-details/' + entry.leadId}>DETTAGLIO</Link>
                  </Grid>

                  <Grid item xs={3}>
                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => {
                        handleDeleteButton(entry);
                      }}
                      sx={{
                        marginRight: "10px",
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

                    <IconButton
                      aria-label="delete"
                      color="primary"
                      onClick={() => props.getLeadDetail(entry.leadId)}
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
                <CardHeader title={entry.name + ' (' + entry.leadId + ')'} />
                <CardContent>
                  {/* {entry.leadId} - {entry.ownerName} */}
                  <Grid container>
                    <Grid item md={12}>
                      {entry.type}
                      <Divider />
                    </Grid>
                    <Grid item md={12} align='end'>
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
      sx={{
        padding: "20px",
      }}
    >
      <Button onClick={() => setDisplayMode("list")}>Mostra Lista</Button>
      <Button onClick={() => setDisplayMode("cards")}>Mostra Cards</Button>
      <br />
      <br />

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
    </Box>
  );
};

export default NewLeadList;
