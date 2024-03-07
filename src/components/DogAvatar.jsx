/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// --- Style Imports ---
import './DogAvatar.scss';
// --- Component Imports ---
import Avatar from '../dog.thumbnail.png';
import Modal from './widgets/Modal';
import ProfileEditor from './ProfileEditor';
//-------------------------------------------------------------------------------------------------

function DogAvatar({
  dog, selectDogs, selectedDogs, handleDeleteDog,
}) {
  const [disabled, setDisabled] = useState(true);
  const [selected, setSelected] = useState(false);
  const [displayProfileAvatar, setDisplayProfileAvatar] = useState(false);
  const [updatedDog, setUpdatedDog] = useState(dog);

  useEffect(() => {
    if (selectDogs) {
      setDisabled(false);
      setSelected(selectedDogs.includes(dog));
    }
  }, [selectDogs, dog]);

  const handleClick = () => {
    if (!disabled) {
      selectDogs(dog);
      setSelected(!selected);
    }
    if (disabled) {
      setDisplayProfileAvatar(true);
    }
  };

  const selectedClass = selected ? 'selected-dog' : 'unselected-dog';

  return (
    <>
      <div
        onClick={handleClick}
        className={selectedClass}
        role="button"
        tabIndex={disabled ? undefined : 0}
        disabled={disabled}
      >
        <img src={updatedDog.image == null ? Avatar : updatedDog.image} alt="" />
        {updatedDog.name}
      </div>
      <Modal
        isOpen={displayProfileAvatar}
        onClose={() => setDisplayProfileAvatar(false)}
        modalHeader="Edit Profile"
      >
        <ProfileEditor
          handleDeleteDog={handleDeleteDog}
          dog={updatedDog}
          onModalClose={() => setDisplayProfileAvatar(false)}
          setUpdatedDog={setUpdatedDog}
        />
      </Modal>
    </>
  );
}

export default DogAvatar;
