/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useNavigate } from 'react-router-dom';

function UnpaidDog({ dog, setUnpaidDog }) {
  console.log('dog', dog);
  const navigate = useNavigate();
  //----------------------------------------------------------------------------------------------

  const handleClick = () => {
    setUnpaidDog(dog);
    navigate('/admin/unpaid-dog-requests');
  };

  return <div onClick={handleClick}>{dog[0]}</div>;
}

export default UnpaidDog;
