import React, { useEffect, useState } from "react";

const SecondComponent = () => {
  useEffect(() => {
    // setMySwitch(true);
    console.log("Siamo all'interno dello Use-Effect");
  });

  const [mySwitch, setMySwitch] = useState(false);

  return (
    <>
      <div>My Second component</div>
      <div>Valore di mySwitch: {mySwitch ? "TRUE" : "FALSE"}</div>
      <button onClick={()=> setMySwitch(!mySwitch)}>Cambia stato</button>
    </>
  );
};

export default SecondComponent;
