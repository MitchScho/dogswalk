import "./DateListItem.scss"; 

const DateListItem = ({ date, setAddWalk, walks }) => {
  
  const clickToAddWalk = () => {
    setAddWalk(date);
    console.log("click to add walk");
  };

  return (
    <div className="dateListItem">
      <div>{date.format('dddd')}</div> 
      <div>{12}</div> 
      <button onClick={clickToAddWalk}>Add Walk</button>
      <div>{date.format('MMM D')}</div> 
    </div>
  );
};

export default DateListItem;
