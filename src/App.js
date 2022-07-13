import Nav from './components/Nav'
import Extras from './components/Extras'
import Calander from './components/Calander'
import './App.scss';

function App() {
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
