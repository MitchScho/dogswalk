import Nav from './components/Nav'
import Extras from './components/Extras'
import DateList from './components/DateList'
import './App.scss';
import useApplicationData from './hooks/useApplicationData';

import { useState } from "react";

// const walks = [
//   {
//     title: "walk",
//     allDay: true,
//     user_id: 1,
//     dog_id: 1,
//     spots: 11,
//     start: new Date(2022, 7, 7),
//     end: new Date(2022, 7, 10)
//   },
//   {
//     title: "walk",
//     allDay: true,
//     user_id: 1,
//     dog_id: 2,
//     spots: 11,
//     start: new Date(2022, 7, 8),
//     end: new Date(2022, 7, 8)
//   },
//   {
//     title: "walk",
//     allDay: true,
//     user_id: 1,
//     dog_id: 1,
//     spots: 11,
//     start: new Date(2022, 7, 20),
//     end: new Date(2022, 7, 20)
//   }
// ]

function App() {

  const { state } = useApplicationData();
  
  

  

  return (
    <div className="App">
      <Nav />
      <main>
        <DateList />
        <Extras />
      </main>
    </div>
  );
}

export default App;
