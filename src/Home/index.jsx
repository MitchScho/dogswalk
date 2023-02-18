import DateList from "../components/DateList";
import axios from "axios";
import Cookies from 'js-cookie';

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";


const getMe = () => {
  const authToken = Cookies.get('token');
  console.log("auth token", authToken);
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return axios.get("http://localhost:8000/api/me", config);
   
};

const Home = ({ state, createDogWalk, deleteDogWalk }) => {
  
  const [user, setUser] = useState(null);

  useEffect(() => {
    
    getMe()
      .then((res) => {
        setUser(res.data);
        // console.log("user ===>", res.data);
    
    })
  },[])

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <DateList
              walks={state.walks}
              createDogWalk={createDogWalk}
              deleteDogWalk={deleteDogWalk}
              dogs={state.dogs}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default Home;
