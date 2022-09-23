import Nav from './components/Nav'
import Extras from './components/Extras'
import DateList from './components/DateList'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

//------------------------------------------------------------------------------------------------------------

function App() {

  
  const { state, createDogWalk } = useApplicationData();
  

  return (
    <div className="App">
      <Nav />
      <main>
        <DateList
          walks={state.walks}
          createDogWalk={createDogWalk}
          dogs={state.dogs}
        />
          
        <Extras />
      </main>
    </div>
  );

}

export default App;

