import Nav from './components/Nav'
import Extras from './components/Extras'
import Calander from './components/Calander'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

function App() {

  const { state } = useApplicationData();
  
  return (
    <div className="App">
      <Nav />
      <main>
        <Calander />
        <Extras />
      </main>
    </div>
  );
}

export default App;
