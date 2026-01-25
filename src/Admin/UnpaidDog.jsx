/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react/button-has-type */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';
import AdminDog from './AdminDog';

function UnpaidDog({ dogId, dogName, dogImage }) {
  const navigate = useNavigate();
  //--------------------------------------------------------------------------------------------

  return (
    <AdminDog
      dogId={dogId}
      dogName={dogName}
      dogImage={dogImage}
      navigate={navigate}
      navigateTo="/admin/unpaid-dog-requests"
    />
  );
}

export default UnpaidDog;
