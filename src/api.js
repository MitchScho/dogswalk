import axios from 'axios';
import Cookies from 'js-cookie';
//-------------------------------------------------------------------------------------

export function getWalkRequestUser(id) {
  return axios.get(`http://localhost:8000/api/users/${id}`);
}

//---------------------------------------------------------------------------------

export function getMe() {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return axios.get('http://localhost:8000/api/me', config);
}

//---------------------------------------------------------------------------------

export function getDogs() {
  return axios.get('http://localhost:8000/api/dogs');
}
//---------------------------------------------------------------------------------

export function getWalkDateDogs(id) {
  return axios.get(`http://localhost:8000/api/walks-dogs/${id}`);
}

//------------------------------------------------------------------------------

export function getWalks() {
  // if (date) {
  //   return axios.get('http://localhost:8000/api/walks', date);
  // }
  return axios.get('http://localhost:8000/api/walks');
}

//------------------------------------------------------------------------------

export function getUnFinalisedWalkRequests() {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get('http://localhost:8000/api/admin/walks-requests', config);
}

//-------------------------------------------------------------------------------

export function requestDogWalk(date, selectedDogs, user) {
  const walk = {
    date,
    user,
    selectedDogs,
  };

  return axios.post('http://localhost:8000/api/walks-requests', walk);
}

//--------------------------------------------------------------------------------

export function getWalkRequest(id) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get(`http://localhost:8000/api/admin/walks-requests/${id}`, config);
}

//--------------------------------------------------------------------------------

export function getDogWalkRequests() {
  return axios.get('http://localhost:8000/api/walks-requests');
}

//--------------------------------------------------------------------------------

export function updateWalkRequest(id, payload) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  // const id = payload.walkId;
  return axios
    .put(`http://localhost:8000/api/admin/walks-requests/${id}`, payload, config);
}

//-------------------------------------------------------------------------------------------------

export function deleteDogWalkRequest(id) {
  return axios.delete(`http://localhost:8000/api/walks-requests/${id}`);
}

//---------------------------------------------------------------------------------
