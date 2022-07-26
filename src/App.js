import Nav from './components/Nav'
import Extras from './components/Extras'
import DateList from './components/DateList'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

import { useState } from "react";

function App() {

  const [addWalk, setAddWalk] = useState(null);
  const { state } = useApplicationData();
  
  

  

  return (
    <div className="App">
      <Nav />
      <main>
        <DateList addWalk={addWalk} setAddWalk={setAddWalk}/>
        <Extras />
      </main>
    </div>
  );
}

export default App;
