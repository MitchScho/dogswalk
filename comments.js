// File input with display none
/* <input
              type="file"
              id="getImage"
              accept="/image/*"
              onChange={handleImage}
              style={{ display: 'none' }}
            /> */

/* <InputText
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
              /> */

// Handle image function
// const handleImage = (e) => {
//   setImg(null);
//   const file = e.target.files[0];
//   setImgFile(file);
//   const reader = new FileReader();
//   reader.onload = () => {
//     setImg(reader.result);
//   };
//   reader.readAsDataURL(file);
//   setImageCrop(true);
// };
