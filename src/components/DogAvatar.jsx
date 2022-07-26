import classNames from 'classnames';
import './DogAvatar.scss';
const DogAvatar = ({dog, selectedDogs, setSelectedDogs}) => { 
  
  const selected = selectedDogs.includes(dog);
  
  console.log("selected", selected);
  const selectedClass = selected ? "selected-dog" : "unselected-dog";

const selectDogs = (dog) => {
  
  if (selected) {
    const newDogList = selectedDogs.filter((selectedDog) => selectedDog !== dog);
    return setSelectedDogs(newDogList);
  }

  setSelectedDogs(prev => [...prev, dog])
};
  

  
  return (
    <div onClick={() => selectDogs(dog)} className={selectedClass}>
      {dog}
    </div>
  );


};

export default DogAvatar;