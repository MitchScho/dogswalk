/* eslint-disable jsx-a11y/interactive-supports-focus */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import './DogAvatar.scss';
import Avatar from '../dog.thumbnail.png';
//-------------------------------------------------------------------------------------------------

function DogAvatar({ dog, selectDogs, selectedDogs }) {
  const selected = selectedDogs.includes(dog);
  const selectedClass = selected ? 'selected-dog' : 'unselected-dog';

  return (
    <div onClick={() => selectDogs(dog)} className={selectedClass} role="button">
      <img src={Avatar} height={50} width={50} alt="" />
      {dog.name}
    </div>
  );
}

export default DogAvatar;
