import { useState, useEffect } from 'react';
import axios from "axios";


const useApplicationData = () => {
  //console.log("useApplicationData called");
  const [state, setState] = useState({
    day: "Monday",
    days: []
    
  });

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/api/days")
      
    ])
      .then((all) => {
        console.log(" axios request returned from server");
        setState((prev) => ({
          ...prev,
          days: all[0].data
          
        }));
      })
      .catch((err) => {
        console.log('useApplicationData error');
        console.log(err.message);
      });
  }, []);

  return {state};
}

export default useApplicationData;
