import Nav from './components/Nav'
import Extras from './components/Extras'
import DateList from './components/DateList'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';
import { useState } from "react";
//------------------------------------------------------------------------------------------------------------

function App() {

  const [addWalkDate, setAddWalkDate] = useState(null);
  const { state, createDogWalk } = useApplicationData();
  

  return (
    <div className="App">
      <Nav />
      <main>
        <DateList
          addWalk={addWalkDate}
          setAddWalk={setAddWalkDate}
          walks={state.walks}
          createDogWalk={createDogWalk}
          dogs={state.dogs}
          availibleSpots={state.availibleSpots}
        />
          
        <Extras />
      </main>
    </div>
  );

}

export default App;

