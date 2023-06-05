import FirstForm from "./components/FirstForm";
import LeadList from "./components/LeadList";
import LeadDetails from "./components/leadDetails";
import { useEffect, useState } from "react";
import {
  findAll,
  findByPrimaryKey,
  deleteLead,
  updateLead,
} from "./api/LeadApi";
import { Alert, Grid, IconButton, Snackbar, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import Navigation from "./components/Navigation";

let initialLead = {
  name: "",
  ownerName: "",
  type: "",
  leadId: 0,
  groupId: 0,
};

function App() {
  const [leadList, setLeadList] = useState([]);
  const [showLeadDetails, setShowLeadDetails] = useState(false);
  const [currentLead, setCurrentLead] = useState({ ...initialLead });
  const [snackbarStatus, setSnackbarStatus] = useState({
    open: false,
    message: "",
    severity: "success",
    duration: 2000,
  });

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

  return (
    <>
      <Navigation
        leadList={leadList}
        getLeadDetail={getLeadDetail}
        handleShowLeadDetails={setShowLeadDetails}
        deleteLead={deleteSelectedLead}
      />
    </>
  );
}

export default App;
