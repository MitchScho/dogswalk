/* eslint-disable quotes */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import Loader from "./Loader";

function ImageLoader({ imageURL }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  useEffect(() => {
    const loadImage = async () => {
      try {
        const response = await fetch(imageURL);
        if (!response.ok) {
          throw new Error("Netwrok not reponding");
        }
        const blob = await response.blob();
        const src = URL.createObjectURL(blob);
        setImageSrc(src);
        setLoading(false);
      } catch (errorc) {
        console.log("Image loader error ", errorc);
        setLoading(false);
        setError(true);
      }
    };

    loadImage();

    return () => {
      if (imageSrc) {
        URL.revokeObjectURL(imageSrc);
      }
    };
  }, [imageURL]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p className="error">Error</p>;
  }

  return (
    <div className="imageLoaderContainer">
      <img src={imageSrc} alt="" className="avatarL" />
    </div>
  );
}

export default ImageLoader;
