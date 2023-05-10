const LeadDetails = (payload) => {
  return (
    <div>
      <div>Nome: {payload?.lead?.name}</div>
      <div>Owner: {payload?.lead?.ownerName}</div>
      <div>Tipo: {payload?.lead?.type}</div>
      <button onClick={() => payload.hideLeadDetails()}>Nascondi</button>
    </div>
  );
};

export default LeadDetails;
