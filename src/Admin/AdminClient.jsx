/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
// import { useNavigate } from 'react-router-dom';
// --- Image Imports ---
import Avatar from '../dog.thumbnail.png';
import './AdminClient.scss';

function AdminClient({
  userId, userName, dogs, onClick, navigate, navigateTo,
}) {
  //--------------------------------------------------------------------------------------------

  const handleClick = () => {
    if (onClick) {
      onClick({ userId, userName, dogs });
    } else if (navigate && navigateTo) {
      navigate(navigateTo, { state: { userId, userName, dogs } });
    }
  };

  const getDogImageSrc = (dog) => {
    const image = typeof dog?.image === 'string' ? dog.image.trim() : dog?.image;
    const avatar = typeof dog?.avatar === 'string' ? dog.avatar.trim() : dog?.avatar;
    return image || avatar || Avatar;
  };

  // If no dogs are present yet, still show a default avatar instead of rendering nothing.
  if (!dogs || dogs.length === 0) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="admin-client-button admin-client-button--single"
      >
        <img
          src={Avatar}
          alt={userName || 'Client'}
          className="admin-client-image admin-client-image--single"
        />
      </button>
    );
  }

  // If single dog, use the same style as AdminDog
  if (dogs.length === 1) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="admin-client-button admin-client-button--single"
      >
        <img
          src={getDogImageSrc(dogs[0])}
          alt={dogs[0].name}
          className="admin-client-image admin-client-image--single"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = Avatar;
          }}
        />
      </button>
    );
  }

  // Multiple dogs - display them equally spaced in a circular container
  return (
    <button
      type="button"
      onClick={handleClick}
      className="admin-client-button admin-client-button--multiple"
    >
      <div className="admin-client-images-container">
        {dogs.map((dog, index) => (
          <img
            key={dog.id || index}
            src={getDogImageSrc(dog)}
            alt={dog.name || `Dog ${index + 1}`}
            className="admin-client-image admin-client-image--multiple"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = Avatar;
            }}
          />
        ))}
      </div>
    </button>
  );
}

export default AdminClient;
