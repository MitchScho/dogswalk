/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
// --- Image Imports ---
import Avatar from '../dog.thumbnail.png';

function UnpaidDog({ dogId, dogName, dogImage }) {
  const navigate = useNavigate();
  //--------------------------------------------------------------------------------------------

  const updateAndNavigateUnpaidDog = () => {
    // setAdminState((prev) => ({
    //   ...prev,
    //   unpaidDog,
    //   adminReFreshKey: prev.adminReFreshKey + 1,
    // }));

    console.log('DOG IS IN UNPAID DOG: ', dogId);
    navigate('/admin/unpaid-dog-requests', { state: { dogId, dogName } });
  };

  return (
    <button
      type="button"
      onClick={updateAndNavigateUnpaidDog}
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
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          display: 'block',
        }}
      />
    </button>
  );
}

export default UnpaidDog;
