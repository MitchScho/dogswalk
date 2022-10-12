import { useEffect, useState } from 'react';
import axios from "axios";
import AdminWalkList from '../components/AdminWalkList';
import AdminListItem from '../components/AdminListItem';
//------------------------------------------------------------------------------------------------------
const Admin = ({ walks }) => {

  const [toggleAdmin, setToggleAdmin] = useState(null);
  const [selectedAdminWalk, setSelectedAdminWalk] = useState(null);

//----------------------------------------------------------------------------------------------
  const getUnAcceptedDogWalks = () => {


    return axios.get("http://localhost:8000/api/admin/walks")
      .then((walks) => {
      
      })
  }

  useEffect(() => {
    getUnAcceptedDogWalks()

  }, []);

//---------------------------------------------------------------------------------------------
  
  const walksArray = walks.map((walk) => {

    return (
      <AdminWalkList
        key={walk.id}
        date={walk.date}
        dogs={walk.dogs} 
        walk={walk}
        setToggleAdmin={setToggleAdmin}
        setSelectedAdminWalk={setSelectedAdminWalk} />
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
        <div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>Day</div>
            <div>Date</div>
            <div>User</div>
            <div>Dogs</div>
            <div>Payed For</div>
            <div>Is Accepted</div>
            <div>no. Of Dogs On Walk</div>
          </div>
          <AdminListItem selectedAdminWalk={selectedAdminWalk} />
        </div>
      }
    </>

  )
};

export default Admin;