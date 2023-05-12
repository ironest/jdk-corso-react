import FirstForm from "./components/FirstForm";
import LeadList from "./components/LeadList";
import LeadDetails from "./components/leadDetails";
import { useEffect, useState } from "react";
import { findAll, findByPrimaryKey } from "./api/LeadApi";
import { Grid, Typography } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [leadList, setLeadList] = useState([]);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    findAll({}).then((result) => {
      console.log("Risultato ottenuto dalla FETCH", result);
      setLeadList(result);
    });
  };

  const getLeadDetail = (leadId) => {
    console.log("Chiamata funzione di caricamento dettagli lead", leadId);
    findByPrimaryKey({ id: leadId }).then((result) => {
      setCurrentLead(result);
      console.log(result);
      setShowLeadDetails(true);
    });
  };

  const hideLeadDetails = () => {
    setShowLeadDetails(false);
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item md={12}>
          <Typography variant="h4" align="center">
            MY APP
          </Typography>
        </Grid>
        <Grid item md={4}>
          <Typography variant="h6" align="center">
            Inserimento Nuovo Lead
          </Typography>
          <FirstForm loadInitialData={loadInitialData} />
        </Grid>
        <Grid item md={8}>
          <Typography variant="h6" align="center">
            Elenco Leads
          </Typography>
          <LeadList
            leadList={leadList}
            loadInitialData={loadInitialData}
            getLeadDetail={getLeadDetail}
            handleShowLeadDetails={setShowLeadDetails}
          />
        </Grid>
      </Grid>

      <hr />
      {showLeadDetails ? (
        <LeadDetails lead={currentLead} hideLeadDetails={hideLeadDetails} />
      ) : (
        <></>
      )}
    </>
  );
}

export default App;
