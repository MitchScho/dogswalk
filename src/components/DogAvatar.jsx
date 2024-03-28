/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// --- Style Imports ---
import './DogAvatar.scss';
// --- Component Imports ---
// import Avatar from '../dog.thumbnail.png';
import Modal from './widgets/Modal';
import ProfileEditor from './ProfileEditor';
import Loader from './widgets/Loader';
import ImageLoader from './widgets/ImageLoader';
//-------------------------------------------------------------------------------------------------

function DogAvatar({
  dog,
  selectDogs,
  selectedDogs,
  handleDeleteDog,
  imgClass,
}) {
  const [disabled, setDisabled] = useState(true);
  const [selected, setSelected] = useState(false);
  const [displayProfileAvatar, setDisplayProfileAvatar] = useState(false);
  const [updatedDog, setUpdatedDog] = useState(dog);
  // const [imgLoading, setImgLoading] = useState(true);
  // const [dogImage, setDogImage] = useState(dog.image);
  useEffect(() => {
    if (selectDogs) {
      setDisabled(false);
      setSelected(selectedDogs.includes(dog));
    }
  }, [selectDogs, dog]);

  if (!dog) {
    return <Loader />;
  }
  console.log('dog', dog);
  const handleClick = () => {
    if (!disabled) {
      selectDogs(dog);
      setSelected(!selected);
    }
    if (disabled) {
      setDisplayProfileAvatar(true);
    }
  };

  //   if
  // setTimeout(() => {
  //   setImgLoading
  // }, 2000);

  const selectedClass = selected ? 'selected-dog' : null;

  return (
    <>
      <div
        onClick={handleClick}
        className="unselected-dog"
        role="button"
        tabIndex={disabled ? undefined : 0}
        disabled={disabled}
      >
        <ImageLoader
          imageURL={updatedDog.image}
          className={`${imgClass} ${selectedClass}`}
        />
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
