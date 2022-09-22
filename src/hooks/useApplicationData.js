import { useState, useEffect } from 'react';
import axios from "axios";


const useApplicationData = () => {
  
  const [state, setState] = useState({
    addWalkDate: null,
    walks: [],
    dogs: [],
    users: [],
    reFreshKey: 0,

  });
  
  //-------------------------------------------------------------------------------------------------

  useEffect(() => {
    
    Promise.all([
      // axios.get("http://localhost:8000/api/dogs"),
      axios.get("http://localhost:8000/api/users")
      
    ])
      .then((all) => {

        setState((prev) => ({
          ...prev,
          // dogs: all[0].data,
          users: all[0].data
        }));

      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);
  //-----------------------------------------------------------------------------------------------
  const getDogs = () => {

    return axios.get("http://localhost:8000/api/dogs")
      .then((dogs) => {
        setState((prev) => ({
          ...prev, dogs: dogs.data
        }))
      })
  }

  useEffect(() => {
    getDogs()

  }, []);
  //------------------------------------------------------------------------------------------------

  const createDogWalk = (date, selectedDogs) => { 
    
    const walk = { date, selectedDogs };
    
    return axios.post(`http://localhost:8000/api/walks`, walk)
      .then((response) => {

        console.log("request dog walk response data", response.data);
       
        setState((prev) => ({
          ...prev, reFreshKey: prev.reFreshKey + 1
        }))
      })

  };

  //---------------------------------------------------------------------------------------------------

  const getDogWalks = () => {

    return axios.get("http://localhost:8000/api/walks")
      .then((walks) => {
        setState((prev) => ({
        ...prev, walks: walks.data
      }))
    })
  }

  useEffect(() => {
    getDogWalks()

  }, [state.reFreshKey]);

//------------------------------------------------------------------------------------------------------------

  return { state, createDogWalk };
  
}

export default useApplicationData;
