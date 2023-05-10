import FirstForm from "./components/FirstForm";
import LeadList from "./components/LeadList";
import LeadDetails from "./components/leadDetails";
import { useEffect, useState } from "react";
import { findAll, findByPrimaryKey } from "./api/LeadApi";

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

  const hideLeadDetails =() => {
    setShowLeadDetails(false)
  }

  return (
    <>
      <FirstForm loadInitialData={loadInitialData} />
      <LeadList
        leadList={leadList}
        loadInitialData={loadInitialData}
        getLeadDetail={getLeadDetail}
        handleShowLeadDetails={setShowLeadDetails}
      />
      <hr />
      {showLeadDetails ? <LeadDetails lead={currentLead} hideLeadDetails={hideLeadDetails} /> : <></>}
    </>
  );
}

export default App;
