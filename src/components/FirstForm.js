import React, { useEffect, useState } from "react";
import { updateLead } from "../api/LeadApi";

const FirstForm = (payload) => {
  let initialLead = {
    name: null,
    ownerName: null,
    type: null,
    leadId: 0,
    groupId: 0,
  };

  const [lead, setLead] = useState(initialLead);

  // useEffect(() => {
  //   console.log("Value of Name: ", name);
  //   console.log("Value of Email: ", email);
  // })

  useEffect(() => {
    console.log("Inside useEffect", lead);
  }, [lead]);

  const validateForm = (event) => {
    event.preventDefault();

    if (lead.name === null || lead.name === "") {
      console.log("Name value is not null");
    }
    if (lead.ownerName === null || lead.ownerName === "") {
      console.log("ownerName value is not null");
    }
    if (lead.type === null || lead.type === "") {
      console.log("ownerName value is not null");
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
      updateLead(lead).then((result) => {
        console.log("Risultato della chiamata rest UPDATE-LEAD", result);
        payload.loadInitialData();
      });
    } else {
      console.log("Attenzione: validazione fallita");
    }
  };

  return (
    <div>
      <form>
        <label>Nome: </label>
        <input
          type="text"
          name="name"
          onChange={(event) =>
            setLead({ ...lead, [event.target.name]: event.target.value })
          }
        />
        <br />
        <br />
        <label>Responsabile: </label>
        <input
          type="text"
          name="ownerName"
          onChange={(event) =>
            setLead({ ...lead, [event.target.name]: event.target.value })
          }
        />
        <br />
        <br />
        <label>Tipo: </label>
        <input
          type="text"
          name="type"
          onChange={(event) =>
            setLead({ ...lead, [event.target.name]: event.target.value })
          }
        />
        <button
          onClick={(event) => {
            validateForm(event);
          }}
        >
          Validate
        </button>
      </form>

      <br />
      <br />
    </div>
  );
};

export default FirstForm;
