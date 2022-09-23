import DogAvatar from "./DogAvatar";
import "./WalkForm.scss";
import { useState } from "react";
//--------------------------------------------------------------------------------------------------------------

const WalkForm = ({ date, createDogWalk, dogs, setAddWalkDate }) => {

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
    if (selectedDogs.length > 0) {
      createDogWalk(date, selectedDogs);
      setAddWalkDate(null);
    }
  };


  const dogList = dogs.map((dog) => {
    
    return (
      <DogAvatar
        key={dog.id}
        dog={dog}
        selectDogs={selectDogs}
        selectedDogs={selectedDogs}
      />
    );
  });


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
        <div className= "walk-request-buttons">
        <button onClick={(() => {setAddWalkDate(null)})}>Cancel</button>
        <button onClick={confirmWalk}>Request Walk</button>
        </div>
      </div>
    </>
  );

};

export default WalkForm;
