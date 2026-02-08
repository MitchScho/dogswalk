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

export function getUsersDogs(id) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get(`http://localhost:8000/api/users/${id}/dogs`, config);
}

//------------------------------------------------------------------------------

export function getWalks() {
  // if (date) {
  //   return axios.get('http://localhost:8000/api/walks', date);
  // }
  return axios.get('http://localhost:8000/api/walks');
}

//------------------------------------------------------------------------------

export function getAdminWalkRequests() {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get('http://localhost:8000/api/admin/walks-requests', config);
}
//------------------------------------------------------------------------------

export function getAdminWalkRequestsForDog(id) {
  console.log('id in api request', id);
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get(`http://localhost:8000/api/admin/walks-requests/dogs/${id}`, config);
}
//------------------------------------------------------------------------------

export function getUnpaidWalks() {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get('http://localhost:8000/api/admin/unpaid-walks', config);
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
  // console.log('walk request id', id);
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

  return axios
    .put(`http://localhost:8000/api/admin/walks-requests/${id}`, payload, config);
}

//-------------------------------------------------------------------------------------------------
export function updateDogProfile(id, payload) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios
    .put(`http://localhost:8000/api/dogs/${id}`, payload, config);
}

//-------------------------------------------------------------------------------------------------

export function addDogForUser(id, dogName) {
  const authToken = Cookies.get('token');
  const dog = {
    name: dogName,
  };
  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return axios.post(`http://localhost:8000/api/users/${id}/dogs`, dog, config);
}
//-------------------------------------------------------------------------------------------------

export function deleteDogWalkRequest(id) {
  return axios.delete(`http://localhost:8000/api/walks-requests/${id}`);
}

//------------------------------------------------------------------------------------------------

export function deleteDog(id) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };
  return axios.delete(`http://localhost:8000/api/dogs/${id}`, config);
}

//---------------------------------------------------------------------------------
export function deletePaidWalkRequests() {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.delete('http://localhost:8000/api/admin/walks-requests', config);
}

//---------------------------------------------------------------------------------

export function getAdminClients() {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get('http://localhost:8000/api/admin/clients', config);
}

//---------------------------------------------------------------------------------

export function getClientWalkHistory(userId) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get(`http://localhost:8000/api/admin/clients/${userId}/walk-history`, config);
}

//---------------------------------------------------------------------------------

export function getAdminWalks() {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.get('http://localhost:8000/api/admin/walks', config);
}

//---------------------------------------------------------------------------------

export function updateWalk(walkId, payload) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.put(`http://localhost:8000/api/admin/walks/${walkId}`, payload, config);
}

//---------------------------------------------------------------------------------

export function removeDogFromWalk(walkId, dogId) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.delete(`http://localhost:8000/api/admin/walks/${walkId}/dogs/${dogId}`, config);
}

//---------------------------------------------------------------------------------

export function addDogToWalk(walkId, dogId, date) {
  const authToken = Cookies.get('token');

  const config = {
    headers: {
      Authorization: `Bearer ${authToken}`,
    },
  };

  return axios.post(`http://localhost:8000/api/admin/walks/${walkId}/dogs`, { dogId, date }, config);
}

//---------------------------------------------------------------------------------
