import DateList from "../components/DateList";
import { getMe } from "../api";

import { Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";

//-----------------------------------------------------------------------------------------------



//-------------------------------------------------------------------------------------------

const Home = ({ state, setState }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getMe().then((res) => {
      setUser(res.data);
  
    });
  }, []);

  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <DateList
              state={state}
              setState={setState}
            />
          }
        ></Route>
      </Routes>
    </div>
  );
};

export default Home;
