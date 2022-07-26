import { useState, useEffect } from 'react';
import axios from "axios";


const useApplicationData = () => {
  //console.log("useApplicationData called");
  const [state, setState] = useState({

    walks: {}

  });
  console.log("state", state)

  useEffect(() => {
    Promise.all([
      axios.get("http://localhost:8000/api/walks")
      
    ])
      .then((all) => {
        console.log(" axios request returned from server");
        console.log("all data", all[0].data)
        setState((prev) => ({
          ...prev,
          walks: all[0].data
          
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
