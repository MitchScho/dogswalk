import Nav from './components/Nav'
import Extras from './components/Extras'
import DateList from './components/DateList'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

import { useState } from "react";

function App() {

  const [addWalkDate, setAddWalkDate] = useState(null);
  const { state, requestDogWalk } = useApplicationData();
  console.log("state of dogs in app", state.dogs);
  console.log("state of walks in app", state.walks);
  

  

  return (
    <div className="App">
      <Nav />
      <main>
        <DateList
          addWalk={addWalkDate}
          setAddWalk={setAddWalkDate}
          walks={state.walks}
          requestDogWalk={requestDogWalk}
          dogs={state.dogs}
        />
          
        <Extras />
      </main>
    </div>
  );
}

export default App;

