import React, { useEffect, useState } from "react";
import {
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

const NewLeadList = (props) => {
  const [leadList, setLeadList] = useState([]);
  const [showDialog, setShowDialog] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [displayMode, setDisplayMode] = useState("list");

  useEffect(() => {
    loadInitialList();
  }, []);

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
                <CardContent>
                  <Typography variant="h5">
                    {entry.name}
                  </Typography>
                  <Typography variant="p">
                  {entry.leadId} - {entry.ownerName}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>
    );
  };

  return (
    <>
      <Button onClick={() => setDisplayMode("list")}>Mostra Lista</Button>
      <Button onClick={() => setDisplayMode("cards")}>Mostra Cards</Button>
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
    </>
  );
};

export default NewLeadList;
