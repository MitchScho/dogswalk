import { useEffect, useState } from 'react';
import axios from "axios";
import AdminWalkList from '../components/AdminWalkList';
import AdminListItem from '../components/AdminListItem';
import './index.scss';


//------------------------------------------------------------------------------------------------------
const Admin = ({walks}) => {

  const [toggleAdmin, setToggleAdmin] = useState(null);
  const [selectedAdminWalk, setSelectedAdminWalk] = useState(null);
  const [adminWalks, setAdminWalks] = useState(walks);
  const [isAccepted, setIsAccepted] = useState(true);
  const [reFreshKey, setReFreshKey] = useState(0)
  console.log("admin walks", adminWalks);
//----------------------------------------------------------------------------------------------
  
  const getUnAcceptedDogWalks = () => {
   
    return axios.get("http://localhost:8000/api/admin/walks")
      .then((walks) => {
       
        setAdminWalks(walks.data);
      })
  }

  useEffect(() => {
    getUnAcceptedDogWalks()

  }, [reFreshKey]);

//-----------------------------------------------------------------------------------------------------------

  const updateIsAcceptedDogWalks = () => {
    
    const id = selectedAdminWalk.id;
    return axios
      .put(`http://localhost:8000/api/admin/walks/${id}`, isAccepted)
      .then(() => {
        setReFreshKey((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
      });
  };

//---------------------------------------------------------------------------------------------------------  
  
  const walksArray = adminWalks.map((walk) => {

    return (
      <AdminWalkList
        key={walk.id} 
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
          <AdminListItem
            selectedAdminWalk={selectedAdminWalk}
            walks={adminWalks}
            setIsAccepted={setIsAccepted}
            updateIsAcceptedDogWalks={updateIsAcceptedDogWalks}
          />
        </div>
      }
    </>

  )
};

export default Admin;