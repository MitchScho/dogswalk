/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState, useEffect } from 'react';

import { InputText } from 'primereact/inputtext';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import Avatar from 'react-avatar-edit';
import Img from '../dog.thumbnail.png';

function ProfileAvatar() {
  const [image, setImage] = useState('');
  const [imageCrop, setImageCrop] = useState(false);
  const [src, setSrc] = useState(false);
  const [profile, setProfile] = useState([]);
  const [pView, setPview] = useState(false);
  console.log('image', image);
  //-------------------------------------------------------------------------------
  useEffect(() => {
    setSrc(image);
  }, []);
  //-------------------------------------------------------------------------------
  const profileFinal = profile.map((item) => item.pView);

  const onClose = () => {
    setPview(null);
  };

  const onCrop = (view) => {
    setPview(view);
  };

  const saveCropImage = () => {
    setProfile([...profile, { pView }]);
    setImageCrop(false);
  };
  //-------------------------------------------------------------------------------
  return (
    <div>
      <div className="profile_img text-center p-4">
        <div className="flex flex-column justify-content-center align-items-center">
          <img
            style={{
              height: '200px',
              width: '200px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '4px solid grey',
            }}
            onClick={() => setImageCrop(true)}
            src={profileFinal.length ? profileFinal : Img}
            // src={Img}
            alt=""
          />
          <label htmlFor="">Dog Name</label>
          <Dialog
            visible={imageCrop}
            header={() => {
              <p htmlFor="" className="mt-3 font-semibold text-5xl">
                Update Profile Avatar
              </p>;
            }}
            onHide={() => setImageCrop(false)}
          >
            <div className="confirmation-content flex flex-column align-items-center">
              <Avatar
                width={500}
                height={400}
                onCrop={onCrop}
                onClose={onClose}
                src={src}
                shadingColor="#474649"
                backgroundColor="#474649"
              />
              <div className="flex flex-column align-items-center mt-5 w-12">
                <div className="flex justify-content-around w-12 mt-4">
                  <Button
                    onClick={saveCropImage}
                    label="save"
                    icon="pi pi-check"
                  />
                </div>
              </div>
            </div>
          </Dialog>
          <InputText
            type="file"
            accept="/image/*"
            style={{ display: 'none' }}
            onChange={(event) => {
              const file = event.target.files[0];
              if (file && file.type.substring(0, 5) === 'image') {
                setImage(file);
              } else {
                setImage(null);
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfileAvatar;
