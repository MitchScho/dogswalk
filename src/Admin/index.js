import { useEffect, useState } from 'react';
import axios from "axios";
import AdminWalkList from '../components/AdminWalkList';
import AdminListItem from '../components/AdminListItem';
import './index.scss';
import { Routes, Route, Link } from "react-router-dom";



//------------------------------------------------------------------------------------------------------
const Admin = ({ walks }) => {

  const [toggleAdmin, setToggleAdmin] = useState(null);
  // const [selectedAdminWalk, setSelectedAdminWalk] = useState(null);
  const [adminWalks, setAdminWalks] = useState(walks);

  const [state, setState] = useState({
    reFreshKey: 0
  })

//---------------------
  const getWalk = (id) => {

    return axios.get(`http://localhost:8000/api/admin/walks/${id}`)
      .then((res) => {
        // console.log(res.data);
      
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

  }, [state.reFreshKey]);
  // console.log(state.reFreshKey);

  //-----------------------------------------------------------------------------------------------------------
  // const params = useParams();

  const updateDogWalk = (payload) => {

    console.log("payload", payload);
    const id = payload.walkId;
    return axios
      .put(`http://localhost:8000/api/admin/walks/${id}`, payload)
      .then((upDatedWalk) => {
        setState((prev) => ({ ...prev, reFreshKey: prev.reFreshKey + 1 }));
        return upDatedWalk;
      });
  };

  // console.log("Updated walk data", upDatedWalk.data);
  // setSelectedAdminWalk((prev) => ({ ...prev, walk: upDatedWalk.data }));
  // setState((prev) => ({
  //   ...prev, reFreshKey: prev.reFreshKey + 1
  // }))

  //---------------------------------------------------------------------------------------------------------  

  const walksArray = adminWalks.map((walk) => {

    return (
      <Link to={`/admin/walk/${walk.id}`} key={walk.id}>
        <AdminWalkList
        walk={walk}
        // setToggleAdmin={setToggleAdmin}
        // setSelectedAdminWalk={setSelectedAdminWalk}
        />
      </Link>
      
    )
  })
  //---------
 
  // const Component = () => {

    
  // }

  //----------------------------------------------------------------------------------------------
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
        {toggleAdmin ? <Link to="/admin"><button onClick={() => setToggleAdmin(false)}>Back</button></Link> : <div></div>}
        
      </div>
      <Routes>
      
        <Route path="/" element={<Home />} />
        
        <Route path="/walk/:walkId" element={
          <AdminListItem
          getWalk={getWalk}
          // walks={adminWalks}
          updateDogWalk={updateDogWalk}
          />}
        />
        
      </Routes>
    </>

  )
};

export default Admin;