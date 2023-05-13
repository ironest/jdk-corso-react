import FirstForm from "./components/FirstForm";
import LeadList from "./components/LeadList";
import LeadDetails from "./components/leadDetails";
import { useEffect, useState } from "react";
import { findAll, findByPrimaryKey } from "./api/LeadApi";
import {
  CssBaseline,
  FormControlLabel,
  Grid,
  Switch,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [leadList, setLeadList] = useState();
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [currentLead, setCurrentLead] = useState(null);
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light"
    },
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    findAll({}).then((result) => {
      console.log("Risultato ottenuto dalla FETCH", result);
      setLeadList(result);
      const detailStillValid = result.find(lead => lead.leadId === currentLead?.leadId);
      if (!detailStillValid) {
        hideLeadDetails()
      }
    });
  };

  const getLeadDetail = (leadId) => {
    setShowLeadDetails(true);
    setCurrentLead(null)
    console.log("Chiamata funzione di caricamento dettagli lead", leadId);
    findByPrimaryKey({ id: leadId }).then((result) => {
      setCurrentLead(result);
      console.log(result);
    });
  };

  const hideLeadDetails = () => {
    setShowLeadDetails(false);
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Grid container spacing={3} padding={2}>
        <Grid item md={11} xs={10}>
          <Typography variant="h4" align="center">
            MY APP
          </Typography>
        </Grid>
        <Grid item md={1} xs={2} display={"flex"} justifyContent={"end"}>
          <FormControlLabel
            control={
              <Switch
                checked={darkMode}
                onChange={handleThemeChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={darkMode ? "Dark" : "Light"}
            labelPlacement="start"
          />
        </Grid>
        <Grid item md={4} xs={12}>
          <Typography variant="h6" align="center">
            Inserimento Nuovo Lead
          </Typography>
          <FirstForm loadInitialData={loadInitialData} />
        </Grid>
        <Grid item md={8} xs={12}>
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
    </ThemeProvider>
  );
}

export default App;
