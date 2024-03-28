/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
import './UnpaidDog.scss';

function UnpaidDog({ dogId, dogName, unpaidDog }) {
  const navigate = useNavigate();
  //--------------------------------------------------------------------------------------------
  console.log('unpaid Dog', unpaidDog[1][0].image);
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
    <div onClick={updateAndNavigateUnpaidDog}>
      <img className="unpaid-dog-img" src={unpaidDog[1][0].image} alt="" />
    </div>
  );
}

export default UnpaidDog;
