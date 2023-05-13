import React from "react";
import { deleteLead } from "../api/LeadApi";
import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const LeadList = (payload) => {
  const handleDeleteButton = (leadId) => {
    // console.log(leadId)
    deleteLead({ leadId }).then((result) => {
      console.log(result);
      payload.loadInitialData();
    });
  };

  return (
    <>
      {!payload?.leadList ? (
        <div style={{ height: '90%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <CircularProgress size={120} sx={{alignSelf: 'center'}} />
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
                      <Button
                        variant="outlined"
                        onClick={() => payload.getLeadDetail(entry.leadId)}
                      >
                        Dettagli
                      </Button>
                    </Grid>
                  </Grid>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      )}
    </>
  );
};

export default LeadList;
