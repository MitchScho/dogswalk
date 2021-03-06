import DogAvatar from "./DogAvatar";
import './WalkForm.scss';
import { useState } from 'react';
//import classNames from 'classnames';

const WalkForm = ({ date }) => {

  const [selectedDogs, setSelectedDogs] = useState([]);

  
  const selectDogs = (dog) => {
    if (selectedDogs.includes(dog)) {
      const newDogList = selectedDogs.filter(
        (selectedDog) => selectedDog !== dog
      );
      return setSelectedDogs(newDogList);
    }

    setSelectedDogs((prev) => [...prev, dog]);
  };
  

  const confirmWalk = () => { 
    console.log("clicked confirmWalk")
  };
  
  const dogs = ["lexi", "Hugo", "Roxy"];

  const dogList = dogs.map((dog) => {
    return (
      <DogAvatar
        key={dog}
        dog={dog}
        selectDogs={selectDogs}
        selectedDogs={selectedDogs}
      />
    );
  })

  


  return (
    <>
      <div className="walk-form-date">
        <div>{date.format("dddd")}</div>
        <div>{date.format("MMM D")}</div>
      </div>
      <div className="dog-form-controls">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          {dogList}
        </div>
        <button onClick={confirmWalk}>Request Walk</button>
      </div>
    </>
  );
};

export default WalkForm;