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

  // If single dog, use the same style as AdminDog
  if (dogs.length === 1) {
    return (
      <button
        type="button"
        onClick={handleClick}
        className="admin-client-button admin-client-button--single"
      >
        <img
          src={dogs[0].image == null ? Avatar : dogs[0].image}
          alt={dogs[0].name}
          className="admin-client-image admin-client-image--single"
        />
      </button>
    );
  }

  // Multiple dogs - display them equally spaced
  return (
    <button
      type="button"
      onClick={handleClick}
      className="admin-client-button admin-client-button--multiple"
    >
      <div className="admin-client-images-container">
        {dogs.map((dog) => (
          <img
            key={dog.id}
            src={dog.image == null ? Avatar : dog.image}
            alt={dog.name}
            className="admin-client-image admin-client-image--multiple"
          />
        ))}
      </div>
    </button>
  );
}

export default AdminClient;
