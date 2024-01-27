/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
// import UnpaidDogRequest from './UnpaidDogRequest';

function UnpaidDog({
  unpaidDog, setAdminState,
}) {
  // console.log("unpaidDog", unpaidDog[1][0].dogName);

  const navigate = useNavigate();
  //--------------------------------------------------------------------------------------------

  const handleClick = () => {
    setAdminState((prev) => ({
      ...prev,
      unpaidDog,
      adminReFreshKey: prev.adminReFreshKey + 1,
    }));
    navigate('/admin/unpaid-dog-requests');
  };

  return (
    <div onClick={handleClick}>{unpaidDog[0]}</div>
  );
}

export default UnpaidDog;
