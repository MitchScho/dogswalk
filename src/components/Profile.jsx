/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getUsersDogs } from '../api';
// import DogAvatar from './DogAvatar';

function Profile({ state }) {
  console.log('userId', state.user.id);

  const [usersDogs, setUsersDogs] = useState(null);
  useEffect(() => {
    console.log('user in useEffect', state.user.id);
    // const { id } = state.user.id;
    getUsersDogs(state.user.id)
      .then((res) => {
        console.log('res', res);
        setUsersDogs(res.data);
      });
  }, []);

  if (!usersDogs) {
    return <div>Loading no Dogs yet...</div>;
  }

  console.log('users Dogs', usersDogs);
  const usersDogList = usersDogs.map((dog) => (
    <div key={dog.name}>{dog.name}</div>
  ));

  return (
    <div className="flex items-center justify-center flex-col">
      <div>{state.user?.username}</div>
      <div>
        {usersDogList}
      </div>
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Register Dog"
            aria-label="Full name"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
          >
            Add Dog
          </button>
          <button
            className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
            type="button"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Profile;
