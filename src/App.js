import Nav from './components/Nav'
import Extras from './components/Extras'
import WalkCalendar from './components/WalkCalendar'
import WalkForm from './components/WalkForm';
import './App.scss';
import useApplicationData from './hooks/useApplicationData';
// import { Calendar, dateFnsLocalizer } from "react-big-calendar";
// import format from "date-fns/format";
// import parse from "date-fns/parse";
// import startOfWeek from "date-fns/startOfWeek";
// import getDay from "date-fns/getDay";
// import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";
//import DatePicker from "react-datepicker";

// const locales = {
//   "en-US": require("date-fns/locale/en-US")
// }
// const localizer = dateFnsLocalizer({
//   format,
//   parse,
//   startOfWeek,
//   getDay,
//   locales,
// })

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
  // const[newWalk,setNewWalk] = useState({title: "", start: "", end: ""})
  // const[allWalks,setAllWalks] = useState({walks})
  const [showWalkForm, setShowWalkForm] = useState(false);
  // const handleAddWalk = () => {
  //   setAllWalks([...allWalks, newWalk])
  // }

  const clickDay = () => {
    setShowWalkForm(!showWalkForm);
  };

  return (
    <div className="App">
      <Nav />
      <main>
        {/* <Calendar
          localizer={localizer}
          events={allWalks}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 800, margin: "50px" }}
        /> */}
        {showWalkForm && <WalkForm />}
        <WalkCalendar clickDay={clickDay}/>
        <Extras />
      </main>
    </div>
  );
}

export default App;
