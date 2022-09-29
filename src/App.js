import Nav from './components/Nav'
import Register from './pages/Register';
import Admin from './pages/Admin';
import DateList from './components/DateList'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';
import { Routes, Route } from "react-router-dom";
//------------------------------------------------------------------------------------------------------------

function App() {

  
  const { state, createDogWalk } = useApplicationData();
  

  return (
    <>
      <div className="App">
        <Nav />
        <main>
            <Routes>
              <Route path="/" element={<DateList
                walks={state.walks}
                createDogWalk={createDogWalk}
                dogs={state.dogs} />}>
              </Route>
              <Route path="register" element={<Register/>}></Route>
              <Route path="admin" element={<Admin/>}></Route>
            </Routes>
        </main>
      </div>
    </>
  );

}

export default App;

