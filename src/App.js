import FirstForm from "./components/FirstForm";
import LeadList from "./components/LeadList";
import LeadDetails from "./components/leadDetails";
import { useEffect, useState } from "react";
import {
  deleteLead,
  findAll,
  findByPrimaryKey,
  updateLead,
} from "./api/LeadApi";
import {
  Alert,
  AppBar,
  CssBaseline,
  FormControlLabel,
  Grid,
  IconButton,
  Snackbar,
  Switch,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
} from "@mui/material";
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
  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    message: "",
    severity: "success",
    duration: 2000,
  });
  const [currentLead, setCurrentLead] = useState({ ...initialLead });

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
    },
  });

  useEffect(() => {
    loadInitialData();
  }, []);

  const loadInitialData = () => {
    findAll({}).then((result) => {
      console.log("Risultato ottenuto dalla FETCH", result);
      setLeadList(result);
      const detailStillValid = result.find(
        (lead) => lead.leadId === currentLead?.leadId
      );
      if (!detailStillValid) {
        hideLeadDetails();
      }
    });
  };

  const getLeadDetail = (leadId) => {
    setShowLeadDetails(true);
    setCurrentLead(null);
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
    setCurrentLead({ ...initialLead });
  };

  const deleteSelectedLead = (leadId) => {
    deleteLead({ leadId }).then((result) => {
      loadInitialData();
      setSnackbarStatus({
        open: true,
        message: "Cancellazione avvenuta con successo",
        severity: "success",
        duration: 2000,
      });
    });
  };

  const updateSelectedLead = (lead) => {
    updateLead(lead).then((result) => {
      result?.leadId > 0
        ? setSnackbarStatus({
            open: true,
            message: "Salvataggio avvenuto con successo",
            severity: "success",
            duration: 2000,
          })
        : setSnackbarStatus({
            ...snackbarStatus,
            open: false,
          });
      console.log("Risultato della chiamata rest UPDATE-LEAD", result);
      loadInitialData();
      resetForm();
    });
  };

  const validateSelectedLead = (lead) => {
    setSnackbarStatus({
      open: true,
      severity: "error",
      duration: 5000,
    });

    if (lead.name === null || lead.name === "") {
      console.log("Name value is not null");
      setSnackbarStatus({
        ...snackbarStatus,
        message: "Inserire il nome del lead",
      });
    } else if (lead.ownerName === null || lead.ownerName === "") {
      console.log("ownerName value is not null");
      setSnackbarStatus({
        ...snackbarStatus,
        message: "Inserire l'owner del lead",
      });
    } else if (lead.type === null || lead.type === "") {
      console.log("Type value is not null");
      setSnackbarStatus({
        ...snackbarStatus,
        message: "Inserire il tipo del lead",
      });
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
      console.log("Validazione fallita");
    }
  };

  const handleThemeChange = () => {
    setDarkMode(!darkMode);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My App v0.1
          </Typography>
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
        </Toolbar>
      </AppBar>

      <Grid container spacing={3} padding={2}>
        <Grid item xs={12}>
          <Typography variant="h4" align="center">
            Lead Control Panel
          </Typography>
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
          open={snackbarStatus.open}
          autoHideDuration={snackbarStatus.duration}
          message="Note archived"
          onClose={() => {
            setSnackbarStatus({ ...snackbarStatus, open: false });
          }}
        >
          <Alert
            severity={snackbarStatus.severity}
            action={
              <IconButton
                aria-label="close"
                color="inherit"
                size="small"
                onClick={() => {
                  setSnackbarStatus({ ...snackbarStatus, open: false });
                }}
              >
                <CloseIcon fontSize="inherit" />
              </IconButton>
            }
          >
            {snackbarStatus.message}
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
