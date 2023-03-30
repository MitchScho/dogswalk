import { useEffect, useState } from "react";

//--- Component Imports ---
import AdminWalkList from "./AdminWalkList";
import AdminListItem from "./AdminListItem";
import Nav from "../components/Nav";
//--- Router Imports ---
import { Routes, Route, Link, NavLink } from "react-router-dom";
//--- Style Imports ---
import "./index.scss";
//--- API Imports ---
import { getUnFinalisedWalkRequests } from "../api";

//------------------------------------------------------------------------------------------------------
const Admin = ({ walkRequests }) => {
  // const [toggleAdmin, setToggleAdmin] = useState(null);
  const [adminWalkRequests, setAdminWalkRequests] = useState(walkRequests);
  const [state, setState] = useState({
    adminReFreshKey: 0,
  });
 
  //----------------------------------------------------------------------------------------------

  useEffect(() => {
    getUnFinalisedWalkRequests().then((walkRequests) => {
      setAdminWalkRequests(walkRequests.data);
    });
  }, [state.adminReFreshKey]);

  //---------------------------------------------------------------------------------------------------------
  //--- Create Admin Walk List Array ----
  const walkRequestArray = adminWalkRequests.map((walkRequest) => {
    return (
      <Link to={`/admin/walk-request/${walkRequest.id}`} key={walkRequest.id}>
        <AdminWalkList walkRequest={walkRequest} />
      </Link>
    );
  });

  //-------------------------------------------------------------------------------------------------------------

  const Home = () => {
    return (
      <>
        <h3 style={
          {
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }
        } >Walk Requests
        </h3>
        
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "1em",
          }}
        >
          <div>Day</div>
          <div>Date</div>
          <div>Dogs Requested For Walk</div>
        </div>
        <div>{walkRequestArray}</div>
      </>
    );
  };

  //---------------------------------------------------------------------------------------------------

  return (
    <>
      <Nav state={state} setState={setState} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/walk-request/:walkRequestId"
          element={
            <AdminListItem walkRequests={walkRequests} state={state} setState={setState} />
          }
        />
      </Routes>
    </>
  );
};

export default Admin;
