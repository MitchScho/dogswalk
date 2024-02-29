/* eslint-disable import/no-named-as-default */
/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import React, { useState, useEffect } from 'react';
// import { Buffer } from 'buffer';
import './DogAvatar.scss';
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
  const [imageData, setImageData] = useState(dog.image);
  // const imageData = btoa(
  //   String.fromCharCode(...new Uint8Array(dog.image.data)),
  // );

  console.log('disabled', disabled);
  console.log('imagedata', imageData);

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
        <img src={imageData == null ? Avatar : imageData} alt="" />
        {dog.name}
      </div>
      <Modal
        isOpen={displayProfileAvatar}
        onClose={() => setDisplayProfileAvatar(false)}
        modalHeader="Edit Profile"
      >
        <ProfileEditor
          handleDeleteDog={handleDeleteDog}
          dog={dog}
          onModalClose={() => setDisplayProfileAvatar(false)}
          setImageData={setImageData}
        />
      </Modal>
    </>
  );
}

export default DogAvatar;
