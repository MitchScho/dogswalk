/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import './DogAvatar.scss';
import Avatar from '../dog.thumbnail.png';
//-------------------------------------------------------------------------------------------------

function DogAvatar({
  dog, selectDogs, selectedDogs,
}) {
  const [disabled, setDisabled] = useState(true);
  const [selected, setSelected] = useState(false);

  useEffect(() => {
    if (selectDogs) {
      setDisabled(false);
      setSelected(selectedDogs.includes(dog));
    }
  }, [selectDogs, dog]);

  const handleClick = () => {
    if (!disabled) {
      selectDogs(dog);
      setSelected(!selected);
    }
  };

  const selectedClass = selected ? 'selected-dog' : 'unselected-dog';

  return (
    <div
      onClick={handleClick}
      className={selectedClass}
      role="button"
      tabIndex={disabled ? undefined : 0}
      disabled={disabled}
    >
      <img src={Avatar} height={50} width={50} alt="" />
      {dog.name}
    </div>
  );
}

export default DogAvatar;
