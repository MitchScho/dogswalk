import './DogAvatar.scss';
//--------------------------------------------------------------------------------------------------------------------

const DogAvatar = ({dog, selectDogs, selectedDogs}) => { 
  
const selected = selectedDogs.includes(dog);
const selectedClass = selected ? "selected-dog" : "unselected-dog";
  

  return (
    <div onClick={() => selectDogs(dog)} className={selectedClass}>
      {dog.name}
    </div>
  );


};

export default DogAvatar;