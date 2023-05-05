import React from "react";

const LeadList = (payload) => {
  return (
    <>
      {payload.leadList.map((lead) => {
        return <div>{lead.name}</div>;
      })}

      <button onClick={(event) => payload.childParentFunction(event)}>
        Function
      </button>
    </>
  );
};

export default LeadList;
