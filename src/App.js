import { useEffect, useState } from "react";
import FirstForm from "./components/FirstForm";
import LeadList from "./components/LeadList";
import { findAll } from "./api/LeadApi";

// const leadList = [
//   {
//     name: 'Amazon',
//     email: 'jeff.bezos@amazon.com',
//     vat: 123,
//     address: 'Via dei magazzini, 24'
//   },
//   {
//     name: 'Leonardo',
//     email: 'leonardo@cingolani.it',
//     vat: 456,
//     address: 'Via Laurentina, 760'
//   },
//   {
//     name: 'JDK',
//     email: 'e.vurro@jdk.it',
//     vat: 789,
//     address: 'Via Simone Martini, 5'
//   }
// ]

const childParentFunction = (event) => {
  console.log("Inside Child-Parent Function", event)
}

function App() {

  const [leadList, setLeadList] = useState([]);

  useEffect(() => {
    loadInitialData()
  },[]);

  // useEffect(()=> {
  //   console.log('Lista ricevuta', payload)
  // },[leadList, payload])

  const loadInitialData = () => {
    findAll({})
      .then(result => {
        console.log('Risultato ottenuto dalla FETCH', result);
        setLeadList(result);
      }
    )
  }

  return (
    <>
      <FirstForm loadInitialData={loadInitialData} />
      <LeadList leadList={leadList} childParentFunction={childParentFunction} />
    </>
  );
}

export default App;
