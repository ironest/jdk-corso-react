import React from "react";
import { deleteLead } from "../api/LeadApi";

const LeadList = (payload) => {

  const handleDeleteButton = (leadId) => {
    // console.log(leadId)
    deleteLead({leadId})
    .then(result => {
      console.log(result)
      payload.loadInitialData()
    })
  }

  return (
    <>
      {payload.leadList.map((entry) => {
        return <div>{entry.name} - {entry.leadId} <button onClick={() => handleDeleteButton(entry.leadId)}>Cancella</button> <button onClick={()=>payload.getLeadDetail(entry.leadId)}>Dettagli</button></div>;
      })}

      <button onClick={(event) => payload.childParentFunction(event)}>
        Function
      </button>
    </>
  );
};

export default LeadList;
