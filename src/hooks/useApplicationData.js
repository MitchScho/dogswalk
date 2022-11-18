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
  const getUsers = () => {

    return axios.get("http://localhost:8000/api/users")
      .then((users) => {
        setState((prev) => ({
          ...prev, users: users.data
        }))
      })
  }
  useEffect(() => {
    getUsers();

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
      .then(() => {
        console.log("Dog walk created!")
        // setState((prev) => ({
        //   ...prev, reFreshKey: prev.reFreshKey + 1
        // }))
      })

  };

  //---------------------------------------------------------------------------------------------------

  const getDogWalks = () => {

    return axios.get("http://localhost:8000/api/walks")
      .then((walks) => {
          console.log("Get dog walks response")
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
