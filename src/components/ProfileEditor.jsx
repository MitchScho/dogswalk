/* eslint-disable no-plusplus */
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Button } from 'primereact/button';
import Avatar from 'react-avatar-edit';
import Modal from './widgets/Modal';
// --- Import Api ---
import { updateDogProfile } from '../api';
import { storage } from '../firebase';
// --- Style Imports ---
import './ProfileEditor.scss';

function ProfileEditor({
  handleDeleteDog, dog, onModalClose, setUpdatedDog,
}) {
  const [img, setImg] = useState(dog.image);
  const [dogName, setDogName] = useState(dog.name);
  const [dogAddress, setDogAddress] = useState(dog.address);
  const [imageCrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(img);
  const [profileImg, setProfileImg] = useState(null);
  const [pView, setPview] = useState(false);

  //-------------------------------------------------------------------------------

  const onClose = () => {
    setPview(null);
  };
  //-------------------------------------------------------------------------------

  const onCrop = (view) => {
    setPview(view);
  };
  //-------------------------------------------------------------------------------

  const saveCropImage = () => {
    setProfileImg(pView);
    setImageCrop(false);
  };
  //-------------------------------------------------------------------------------

  const handleSave = async () => {
    onModalClose();
    let image = img;
    const name = dogName;
    const address = dogAddress;

    try {
      if (profileImg != null) {
        const base64Data = profileImg;
        const blob = await fetch(base64Data).then((res) => res.blob());
        const imageRef = storage
          .ref()
          .child(`Images/${dog.id}/${Date.now().toString() + dog.name}`);
        const imageSnapshot = await imageRef.put(blob);
        const imageURL = await imageSnapshot.ref.getDownloadURL();
        image = imageURL;
      }

      const payload = { name, image, address };
      updateDogProfile(dog.id, payload)
        .then((res) => {
          setUpdatedDog(res.data);
          setImg(res.data.image);
        })
        .catch((err) => {
          console.log('error', err.message);
        });
    } catch (e) {
      console.error('Cannot uplaod image: ', e.message);
    }
  };
  //-------------------------------------------------------------------------------

  return (
    <div className="profile_editor_container">
      <div className="profile_editor">
        <label htmlFor="getImage">
          <img
            onClick={() => {
              setSrc(null);
              setImageCrop(true);
            }}
            src={profileImg != null ? profileImg : img ?? dog.image}
            alt=""
          />
        </label>
        <div className="editor_controls">
          <div>
            <input
              value={dogName}
              onChange={(value) => setDogName(value.target.value)}
              type="text"
              placeholder="Name"
            />
            <textarea
              value={dogAddress}
              rows={5}
              onChange={(value) => setDogAddress(value.target.value)}
              type="text"
              placeholder="Address"
            />
          </div>
          <div className="editor-buttons">
            <button className="save-button" type="button" onClick={handleSave}>
              Save
            </button>
            <button
              className="delete-button"
              type="button"
              onClick={() => handleDeleteDog(dog.id)}
            >
              Delete
            </button>
          </div>
        </div>
        <Modal isOpen={imageCrop} onClose={() => setImageCrop(false)}>
          <div className="confirmation-content flex flex-col items-center">
            <Avatar
              width={400}
              height={400}
              onCrop={onCrop}
              onClose={onClose}
              src={src}
              shadingColor="#474649"
              backgroundColor="#4029941"
            />
            <div className="flex flex-col align-center mt-5 w-12">
              <div className="flex justify-around w-12 mt-4">
                <Button
                  className="save-button"
                  onClick={saveCropImage}
                  label="save"
                  icon="pi pi-check"
                />
              </div>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}

export default ProfileEditor;
