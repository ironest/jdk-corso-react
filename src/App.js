import FirstForm from "./components/FirstForm";
import LeadList from "./components/LeadList";
import LeadDetails from "./components/leadDetails";
import { useEffect, useState } from "react";
import { deleteLead, findAll, findByPrimaryKey, updateLead } from "./api/LeadApi";
import {
  Alert,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  Snackbar,
  Switch,
  Typography,
} from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

let initialLead = {
  name: "",
  ownerName: "",
  type: "",
  leadId: 0,
  groupId: 0,
};

function App() {
  const [leadList, setLeadList] = useState();
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentLead, setCurrentLead] = useState({...initialLead});
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

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

  const resetForm = () => {
    setCurrentLead({...initialLead});
  };

  const deleteSelectedLead = (leadId) => {
    deleteLead({ leadId }).then((result) => {
      loadInitialData();
      setSnackbarMessage("Cancellazione avvenuta con successo");
      setShowSuccessAlert(true);
    });
  };

  const updateSelectedLead = (lead) => {
    updateLead(lead).then((result) => {
      setSnackbarMessage("Salvataggio avvenuto con successo");
      result?.leadId > 0
        ? setShowSuccessAlert(true)
        : setShowSuccessAlert(false);
      console.log("Risultato della chiamata rest UPDATE-LEAD", result);
      loadInitialData();
      resetForm();
    });
  };

  const validateSelectedLead = (lead) => {
    if (lead.name === null || lead.name === "") {
      console.log("Name value is not null");
      setSnackbarMessage("Inserire il nome del lead");
      setShowErrorAlert(true);
    } else if (lead.ownerName === null || lead.ownerName === "") {
      console.log("ownerName value is not null");
      setSnackbarMessage("Inserire l'owner del lead");
      setShowErrorAlert(true);
    } else if (lead.type === null || lead.type === "") {
      console.log("ownerName value is not null");
      setSnackbarMessage("Inserire il tipo del lead");
      setShowErrorAlert(true);
    }
    if (
      lead.name !== null &&
      lead.ownerName !== null &&
      lead.type !== null &&
      lead.name !== "" &&
      lead.ownerName !== "" &&
      lead.type !== ""
    ) {
      console.log("Dati valorizzati correttamente");
      updateSelectedLead(lead);
    } else {
      console.log('Validazione fallita');
    }
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
          <FirstForm
            lead={currentLead}
            reset={resetForm}
            validateLead={validateSelectedLead}
          />
        </Grid>
        <Grid item md={8} xs={12}>
          <Typography variant="h6" align="center">
            Elenco Leads
          </Typography>
          <LeadList
            leadList={leadList}
            getLeadDetail={getLeadDetail}
            handleShowLeadDetails={setShowLeadDetails}
            deleteLead={deleteSelectedLead}
          />
        </Grid>

        <Snackbar
          open={showSuccessAlert}
          autoHideDuration={3000}
          message="Note archived"
          onClose={() => {
            setShowSuccessAlert(false);
          }}
        >
          <Alert
            severity="success"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowSuccessAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
        <Snackbar
          open={showErrorAlert}
          autoHideDuration={5000}
          message="Note archived"
          onClose={() => {
            setShowErrorAlert(false);
          }}
        >
          <Alert
            severity="error"
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setShowErrorAlert(false);
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
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
