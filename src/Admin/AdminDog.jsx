/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
// --- Image Imports ---
import Avatar from '../dog.thumbnail.png';

function AdminDog({
  dogId, dogName, dogImage, onClick, navigate, navigateTo,
}) {
  //--------------------------------------------------------------------------------------------

  const handleClick = () => {
    if (onClick) {
      onClick({ dogId, dogName, dogImage });
    } else if (navigate && navigateTo) {
      navigate(navigateTo, { state: { dogId, dogName } });
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      style={{
        width: '100%',
        height: '100%',
        padding: 0,
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        borderRadius: '50%',
        overflow: 'hidden',
      }}
    >
      <img
        src={dogImage == null ? Avatar : dogImage}
        alt={dogName}
        style={{
          width: '128px',
          height: '128px',
          minWidth: '128px',
          minHeight: '128px',
          maxWidth: '128px',
          maxHeight: '128px',
          objectFit: 'cover',
          display: 'block',
          border: 'none',
        }}
      />
    </button>
  );
}

export default AdminDog;
