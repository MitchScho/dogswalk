/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';

function UnpaidDog({ dogId, dogName }) {
  const navigate = useNavigate();
  //--------------------------------------------------------------------------------------------

  const updateAndNavigateUnpaidDog = () => {
    // setAdminState((prev) => ({
    //   ...prev,
    //   unpaidDog,
    //   adminReFreshKey: prev.adminReFreshKey + 1,
    // }));

    console.log('DOG IS IN UNPAID DOG: ', dogId);
    navigate('/admin/unpaid-dog-requests', { state: { dogId } });
  };

  return <div onClick={updateAndNavigateUnpaidDog}>{dogName}</div>;
}

export default UnpaidDog;
