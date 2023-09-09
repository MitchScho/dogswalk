/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';
import { getUsersDogs, addDogForUser } from '../api';
// import DogAvatar from './DogAvatar';

function Profile({ state }) {
  console.log('userId in profile component', state.user.id);

  const [inputDog, setInputDog] = useState(null);

  const [usersDogs, setUsersDogs] = useState('');
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

  const submitDog = ((e) => {
    e.preventDefault();
    console.log('input dog', inputDog);
    addDogForUser(state.user.id, inputDog)
      .then((res) => {
        console.log('add dog for user response', res);
      });
  });

  return (
    <div className="flex items-center justify-center flex-col">
      <div>{state.user?.username}</div>
      <div>{usersDogList}</div>
      <form className="w-full max-w-sm">
        <div className="flex items-center border-b border-teal-500 py-2">
          <input
            value={inputDog}
            onChange={(e) => setInputDog(e.target.value)}
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="text"
            placeholder="Register Dog"
            aria-label="Full name"
          />
          <button
            className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={submitDog}
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
