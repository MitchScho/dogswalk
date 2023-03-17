import { useEffect, useState } from "react";

//--- Component Imports ---
import AdminWalkList from "./AdminWalkList";
import AdminListItem from "./AdminListItem";
import Nav from "../components/Nav";
//--- Router Imports ---
import { Routes, Route, Link } from "react-router-dom";
//--- Style Imports ---
import "./index.scss";
//--- API Imports ---
import { getUnFinalisedDogWalks } from "../api";

//------------------------------------------------------------------------------------------------------
const Admin = ({ walks }) => {
  const [toggleAdmin, setToggleAdmin] = useState(null);
  const [adminWalks, setAdminWalks] = useState(walks);
  const [state, setState] = useState({
    adminReFreshKey: 0,
  });

  //----------------------------------------------------------------------------------------------

  useEffect(() => {
    getUnFinalisedDogWalks().then((walks) => {
      setAdminWalks(walks.data);
    });
  }, [state.adminReFreshKey]);

  //---------------------------------------------------------------------------------------------------------
  //--- Create Admin Walk List Array ----
  const walksArray = adminWalks.map((walk) => {
    return (
      <Link to={`/admin/walk/${walk.id}`} key={walk.id}>
        <AdminWalkList walk={walk} setToggleAdmin={setToggleAdmin} />
      </Link>
    );
  });

  //-------------------------------------------------------------------------------------------------------------

  const Home = () => {
    return (
      <>
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
        <div>{walksArray}</div>
      </>
    );
  };

  //---------------------------------------------------------------------------------------------------

  return (
    <>
      <Nav state={state} setState={setState} />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div></div>
        <h3
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          Admin Page
        </h3>
        {toggleAdmin ? (
          <Link to="/admin">
            <button onClick={() => setToggleAdmin(false)}>Back</button>
          </Link>
        ) : (
          <div></div>
        )}
      </div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/walk/:walkId"
          element={
            <AdminListItem walks={walks} state={state} setState={setState} />
          }
        />
      </Routes>
    </>
  );
};

export default Admin;
