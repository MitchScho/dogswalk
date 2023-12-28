/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
import { getUsersDogs, addDogForUser, deleteDog } from '../api';
// import ProfileDogAvatar from './DogAvatar';

function Profile({ state, setState }) {
  const [inputDog, setInputDog] = useState('');

  useEffect(() => {
    getUsersDogs(state.user.id).then((dogs) => {
      setState((prev) => ({
        ...prev,
        dogs: dogs.data,
      }));
    });
  }, [state.reFreshKey]);

  if (!state.dogs) {
    return <div>Loading no Dogs yet...</div>;
  }

  const handleDeleteDog = (dogId) => {
    deleteDog(dogId);
    setState((prev) => ({
      ...prev,
      reFreshKey: prev.reFreshKey + 1,
    }));
  };

  const usersDogList = state.dogs.map((dog) => (
    <div key={dog.id} className="flex flex-row justify-between">
      {dog.name}
      <button
        className="flex-shrink-0 border-transparent border-4 text-teal-500 hover:text-teal-800 text-sm py-1 px-2 rounded"
        type="button"
        onClick={() => handleDeleteDog(dog.id)}
      >
        Delete
      </button>
    </div>
  ));

  console.log(usersDogList);

  const submitDog = (e) => {
    e.preventDefault();

    addDogForUser(state.user.id, inputDog).then(() => {
      setInputDog('');
      setState((prev) => ({
        ...prev,
        reFreshKey: prev.reFreshKey + 1,
      }));
    });
  };

  return (
    <div className="border-solid flex items-center justify-center flex-col">
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
        </div>
      </form>
    </div>
  );
}

export default Profile;
