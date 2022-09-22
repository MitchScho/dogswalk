import { useState, useEffect } from 'react';
import axios from "axios";


const useApplicationData = () => {
  //console.log("useApplicationData called");
  const [state, setState] = useState({
    addWalkDate: null,
    walks: [],
    dogs: [],
    users: [],
    availibleSpots: 10,

  });
  // console.log("state before api call", state);

  useEffect(() => {
    // console.log("in useEffect");
    Promise.all([
      axios.get("http://localhost:8000/api/walks"),
      axios.get("http://localhost:8000/api/dogs"),
      axios.get("http://localhost:8000/api/users")
      
    ])
      .then((all) => {
        // console.log(" axios request returned from server");
        console.log("all data walks", all[0].data)
        // console.log("all data dogs", all[1].data)
        // console.log("all data users", all[2].data)
        setState((prev) => ({
          ...prev,
          walks: all[0].data,
          dogs: all[1].data,
          users: all[2].data
          
        }));
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const requestDogWalk = (date, selectedDogs) => { 
    
    const walk = { date, selectedDogs };
    
    return axios.post(`http://localhost:8000/api/walks`, walk)
      .then((response) => {
        console.log("request dog walk response", response);
        // console.log("request dog walk data.dogs", data.data.dogs);
        // console.log("request dog walk data.dogs.length", data.data.dogs.length);
        // console.l og("request dog walk data.dogs.length", data.data.dogs.length);
        // const walk = {
        //   ...state.walks[date],
        //   dogs: { ...selectedDogs },
        // };
        // console.log("walk", walk)
        // const walks = {
        //   ...state.walks,
        //   [date]: walk,
        // };
        // console.log("walks", walks)
        // setState({
        //   ...state, walks
        // });
      })

  };


  return {state, requestDogWalk};
}

export default useApplicationData;
