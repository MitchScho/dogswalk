/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';
// import { InputText } from 'primereact/inputtext';
// import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Avatar from 'react-avatar-edit';
import Modal from './widgets/Modal';
import Img from '../dog.thumbnail.png';
// --- Import Api ---
import { updateDogProfile } from '../api';
import { storage } from '../firebase';
// --- Style Imports ---
import './ProfileEditor.scss';

function ProfileEditor({
  handleDeleteDog, dog, onModalClose, setImageData,
}) {
  // eslint-disable-next-line no-unused-vars
  const [img, setImg] = useState(dog.image);
  const [imagePrev, setImagePrev] = useState(null);
  const [imgFile, setImgFile] = useState(dog.image);
  const [dogName, setDogName] = useState(dog.name);
  const [imageCrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(null);
  const [profile, setProfile] = useState([]);
  const [pView, setPview] = useState(false);
  console.log('dog', dog);
  //-------------------------------------------------------------------------------
  useEffect(() => {
    setSrc(img);
  }, [img]);
  //-------------------------------------------------------------------------------
  const profileFinal = profile.map((item) => item.pView);

  const onClose = () => {
    setPview(null);
  };

  const onCrop = (view) => {
    setPview(view);
  };

  const handleImage = (e) => {
    const file = e.target.files[0];
    setImgFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setImagePrev(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const saveCropImage = () => {
    setProfile([...profile, { pView }]);
    setImageCrop(false);
  };

  const handleSave = async () => {
    onModalClose();
    let image = img;
    const name = dogName;

    console.log('Image from profile', image);

    try {
      if (imgFile != null) {
        const imageRef = storage.ref().child(`Images/${dog.id}/${imgFile.name}`);

        const imageSnapshot = await imageRef.put(imgFile);
        const imageURL = await imageSnapshot.ref.getDownloadURL();
        image = imageURL;
        console.log('image url: ', image);
      }

      const payload = { name, image };
      updateDogProfile(dog.id, payload)
        .then((res) => {
          console.log('response from dog image update', res);
          setImageData(res.data.image);
        })
        .catch((err) => {
          console.log('error', err.message);
        });
    } catch (e) {
      console.error('Cannot uplaod image: ', e);
    }
    // console.log('image', image);
    console.log('save button clicked');
  };

  //-------------------------------------------------------------------------------
  return (
    <div className="profile_editor_container">
      <div className="profile_editor">
        <label htmlFor="getImage">
          <img
            onClick={() => setImageCrop(true)}
              // src={profileFinal.length ? profileFinal : Img}
            src={imagePrev ?? img ?? Img}
            alt=""
          />
        </label>
        <input
          type="file"
          id="getImage"
          accept="/image/*"
          onChange={handleImage}
          style={{ display: 'none' }}
        />
        {/* <InputText
            type="file"
            accept="/image/*"
            style={{ display: 'none' }}
            onChange={(event) => {
              const file = event.target.files[0];
              const reader = new FileReader();
              reader.onload = () => {
                setImg(reader.result);
                console.log('inside reader', reader.result);
              };

              reader.readAsDataURL(file);
              console.log('file', file);
              // if (file && file.type.substring(0, 5) === 'image') {
              //   setImg(file);
              // } else {
              //   setImg(null);
              // }
            }}
          /> */}
        <div className="editor_controls">
          <div>
            <input
              value={dogName}
              onChange={(value) => setDogName(value.target.value)}
              type="text"
            />
            <p>Address</p>
          </div>
          <div className="flex mt-20">
            <button
              className="save-button"
              type="button"
              onClick={handleSave}
            >
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
        <Modal
            // style={{ backgrounColor: 'white' }}
            // breakpoints={{ '960px': '75vw', '641px': '100vw' }}
            // style={{
            //   height: '100 %',
            //   width: '100%',
            // }}
            // visible={imageCrop}
          isOpen={imageCrop}
            // header={() => {
            //   <p htmlFor="" className="mt-3 font-semibold text-5xl">
            //     Update Profile Avatar
            //   </p>;
            // }}
          onClose={() => setImageCrop(false)}
        >
          <div className="confirmation-content flex flex-col items-center">
            <Avatar
              width={600}
              height={450}
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
