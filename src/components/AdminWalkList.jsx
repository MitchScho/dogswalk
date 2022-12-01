import moment from "moment";

const AdminWalkList = ({ walk, setToggleAdmin, setSelectedAdminWalk }) => {

//-----------------------------------------------------------------------------------------------------------
//-- Create walk date moment ---------
  const adminWalkListDate = moment(new Date(walk.date));
  
//------------------------------------------------------------------------------------------------------
//--Click to select Admin walk date ------
  const handleOnClick = () => {
    setToggleAdmin(true);
    
  };


  return (
      <ul
      onClick={handleOnClick}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <li>{adminWalkListDate.format("dddd")}</li>
      <li>{adminWalkListDate.format("MMM D")}</li>
      <li>{walk.dogs.length}</li>
    </ul>
  );
};

export default AdminWalkList;
 