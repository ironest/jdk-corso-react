import React from "react";
import { deleteLead } from "../api/LeadApi";
import {
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteIcon from "@mui/icons-material/EditNote";

const LeadList = (payload) => {
  const handleDeleteButton = (leadId) => {
    // console.log(leadId)
    deleteLead({ leadId }).then((result) => {
      console.log(result);
      payload.loadInitialData();
    });
  };

  return (
    <List>
      {payload.leadList.map((entry) => {
        return (
          <>
            <ListItem>
              <Grid container spacing={3}>
                <Grid item md={4} display={"flex"} alignItems={"center"}>
                  {entry.name}
                </Grid>
                <Grid item md={2} display={"flex"} alignItems={"center"}>
                  {entry.leadId}
                </Grid>
                <Grid item md={6}>
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
            </ListItem>
            <Divider />
          </>
        );
      })}
    </List>
  );
};

export default LeadList;
