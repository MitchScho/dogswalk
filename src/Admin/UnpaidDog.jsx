/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import { useNavigate } from 'react-router-dom';

function UnpaidDog({ unpaidDog, setAdminState }) {
  const navigate = useNavigate();
  //--------------------------------------------------------------------------------------------

  const updateAndNavigateUnpaidDog = () => {
    setAdminState((prev) => ({
      ...prev,
      unpaidDog,
      adminReFreshKey: prev.adminReFreshKey + 1,
    }));
    navigate('/admin/unpaid-dog-requests', { unpaidDog });
  };

  return (
    <div onClick={updateAndNavigateUnpaidDog}>{unpaidDog[0]}</div>
  );
}

export default UnpaidDog;
