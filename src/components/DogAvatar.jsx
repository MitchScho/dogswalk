import classNames from 'classnames';
import './DogAvatar.scss';
const DogAvatar = ({dog, selectedDogs, setSelectedDogs}) => { 
  

const selectDogs = () => {
  console.log("selectDogs");
  setSelectedDogs(prev => [...prev, dog])
};
  
  const selected = selectedDogs.includes(dog);

  console.log("selected", selected);
  const selectedClass = selected ? "selected-dog" : "unselected-dog";

  
  return (
    <div onClick={selectDogs} className={selectedClass}>
      {dog}
    </div>
  );


};

export default DogAvatar;