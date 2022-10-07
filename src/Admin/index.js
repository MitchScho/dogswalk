import { useEffect, useState } from 'react';
import axios from "axios";
import AdminList from '../components/AdminList';
import AdminListItem from '../components/AdminListItem';
//------------------------------------------------------------------------------------------------------
const Admin = ({ walks }) => {

  const [toggleAdmin, setToggleAdmin] = useState(null);
  const [selectedAdminDate, setSelectedAdminDate] = useState(null);

//----------------------------------------------------------------------------------------------
  const getUnAcceptedDogWalks = () => {


    return axios.get("http://localhost:8000/api/admin/walks")
      .then((walks) => {
      
        console.log("Admin Walks", walks);
      })
  }

  useEffect(() => {
    getUnAcceptedDogWalks()

  }, []);

//---------------------------------------------------------------------------------------------
  
  const walksArray = walks.map((walk) => {
    console.log(walk);

    return (
      <AdminList
        key={walk.id}
        date={walk.date}
        dogs={walk.dogs} 
        setToggleAdmin={setToggleAdmin}
        setSelectedAdminDate={setSelectedAdminDate} />
    )
  })
//---------------------------------------------------------------------------------------------------

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between"}}>
        <div></div>
        <h3
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: " column",
          }}
        >
          Admin Page
        </h3>
        {toggleAdmin ? <button onClick={() => setToggleAdmin(false)}>Back</button>: <div></div>}
      </div>
      {!toggleAdmin &&<div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom:"1em" }}>
          <div>Day</div>
          <div>Date</div>
          <div>Number of Dogs To Be Accepted</div>
        </div>}
      {!toggleAdmin ? 
      <div>
        {walksArray}
        </div>
        :
        <AdminListItem date={selectedAdminDate} />
      }
    </>

  )
};

export default Admin;