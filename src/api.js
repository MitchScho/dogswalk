import axios from "axios";
import Cookies from "js-cookie";
//-------------------------------------------------------------------------------------

export function getUsers() {
  return axios.get("http://localhost:8000/api/users")
};

//---------------------------------------------------------------------------------

export function getMe() {

  const authToken = Cookies.get("token");
  
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return axios.get("http://localhost:8000/api/me", config);
};

//---------------------------------------------------------------------------------

export function getDogs() {
  return axios.get("http://localhost:8000/api/dogs")
};

//------------------------------------------------------------------------------

export function getUnFinalisedDogWalks() {

  return axios.get("http://localhost:8000/api/admin/walks")

}

//-------------------------------------------------------------------------------

export function createDogWalk(date, selectedDogs) {

  const walk = {
    date,
    selectedDogs
  };

  return axios.post(`http://localhost:8000/api/walks`, walk)
};

//--------------------------------------------------------------------------------

export function getWalk(id) {

  return axios.get(`http://localhost:8000/api/admin/walks/${id}`)
    
};

//--------------------------------------------------------------------------------

export function getDogWalks() {
  return axios.get("http://localhost:8000/api/walks")
};

//--------------------------------------------------------------------------------

export function updateDogWalk(payload) {
  
  const id = payload.walkId;
  return axios
  .put(`http://localhost:8000/api/admin/walks/${id}`, payload)
  
};

//-----------------------------------------------------------------------------------------------------------

export function deleteDogWalk(id) {

  if (id) {
    return axios.delete(`http://localhost:8000/api/walks/${id}`)
  }
};

//---------------------------------------------------------------------------------