/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/prop-types */
import React from 'react';
// --- Router Imports ---
import { NavLink } from 'react-router-dom';
// --- Style Imports ---
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import './Profile.scss';
// --- Component Imports ---
import DogAvatar from './DogAvatar';
// --- Api Imports ---

function Profile({
  handleDeleteDog, state, addDog, setInputDog, inputDog,
}) {
  if (!state.dogs) {
    return <div>Loading no Dogs yet...</div>;
  }
  //---------------------------------------------------------------------
  const profileImgClass = 'profile-img';

  //-----------------------------------------------------------------------

  const usersDogList = state.dogs.map((dog) => (
    <div key={dog.id} className="flex flex-row justify-between items-center">
      <DogAvatar
        key={dog.id}
        imgClass={profileImgClass}
        dog={dog}
        handleDeleteDog={handleDeleteDog}
      />
      <p>{dog.address}</p>
    </div>
  ));

  //-----------------------------------------------------------------
  //----------------------------------------

  return (
    <div className="profile_overlay">
      <div className="profile-container">
        <div className="profile-header">
          <div />
          <h4>Profile</h4>
          <NavLink to="/calendar">
            <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
          </NavLink>
        </div>
        <div className="profile-body">
          <form className="w-half max-w-sm">
            <div className="img-container">{usersDogList}</div>
            <div className="flex items-center border-b border-grey-500 py-2">
              <input
                value={inputDog}
                onChange={(e) => setInputDog(e.target.value)}
                className="appearance-none bg-transparent border-none w-half text-white-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                placeholder="Register Dog"
                aria-label="Full name"
              />
              <button
                className="add-button"
                type="button"
                onClick={() => addDog(state.user.id, inputDog)}
              >
                Add Dog
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Profile;
