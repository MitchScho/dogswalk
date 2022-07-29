import Nav from './components/Nav'
import Extras from './components/Extras'
import DateList from './components/DateList'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

import { useState } from "react";

function App() {

  const [addWalkDate, setAddWalkDate] = useState(null);
  const { state, requestDogWalk } = useApplicationData();
  
  

  

  return (
    <div className="App">
      <Nav />
      <main>
        <DateList addWalk={addWalkDate}
          setAddWalk={setAddWalkDate}
          availibleSpots={state.walks[0]?.availible_spots}
          requestDogWalk={requestDogWalk} />
          dogs={state.dogs}
        <Extras />
      </main>
    </div>
  );
}

export default App;

