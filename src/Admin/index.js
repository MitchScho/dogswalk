import { useEffect, useState } from 'react';
import axios from "axios";
//--- Component Imports ---
import AdminWalkList from './AdminWalkList';
import AdminListItem from './AdminListItem';
//--- Router Imports ---
import { Routes, Route, Link } from "react-router-dom";
//--- Style Imports ---
import './index.scss';


//------------------------------------------------------------------------------------------------------
const Admin = ({ walks }) => {

  const [toggleAdmin, setToggleAdmin] = useState(null);
  const [adminWalks, setAdminWalks] = useState(walks);
  const [state, setState] = useState({
    adminReFreshKey: 0
  })

//----------------------------------------------------------------------------------
  
  const getWalk = (id) => {

    return axios.get(`http://localhost:8000/api/admin/walks/${id}`)
      .then((res) => {
      
        return res.data;
    })
  }

//----------------------------------------------------------------------------------------------

  const getUnFinalisedDogWalks = () => {

    return axios.get("http://localhost:8000/api/admin/walks")
      .then((walks) => {

        setAdminWalks(walks.data);
      })
  }

  useEffect(() => {
    getUnFinalisedDogWalks()

  }, [state.adminReFreshKey]);
  
//-----------------------------------------------------------------------------------------------------------

  const updateDogWalk = (payload) => {

    const id = payload.walkId;
    return axios
      .put(`http://localhost:8000/api/admin/walks/${id}`, payload)
      .then((upDatedWalk) => {
        setState((prev) => ({ ...prev, adminReFreshKey: prev.adminReFreshKey + 1 }));
        setState((prev) => ({ ...prev, ReFreshKey: prev.reFreshKey + 1 }));
        return upDatedWalk;
      });
  };

//---------------------------------------------------------------------------------------------------------  
//--- Create Admin Walk List Array ----
  const walksArray = adminWalks.map((walk) => {

    return (
      <Link to={`/admin/walk/${walk.id}`} key={walk.id}>
        <AdminWalkList
        walk={walk}
        setToggleAdmin={setToggleAdmin}
        />
      </Link>
      
    )
  })


//-------------------------------------------------------------------------------------------------------------
  
  const Home = () => {
    return (
      <>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1em" }}>
          <div>Day</div>
          <div>Date</div>
          <div>Number of Dogs To Be Accepted</div>
        </div>
        <div>
          {walksArray}
        </div>
      </>
    )
  }

  //---------------------------------------------------------------------------------------------------

  return (
    <>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div></div>
        <h3 style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          Admin Page
        </h3>
        {toggleAdmin ?
          <Link to="/admin"><button onClick={() => setToggleAdmin(false)}>Back</button></Link>
          :
          <div></div>}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/walk/:walkId" element={
          <AdminListItem
            getWalk={getWalk}
            updateDogWalk={updateDogWalk}
            walks={walks}
          />}
        />
      </Routes>
    </>
  )
};

export default Admin;