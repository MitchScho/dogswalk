import moment from "moment";

const AdminWalkList = ({ walk, setToggleAdmin, setSelectedAdminWalk }) => {

//-----------------------------------------------------------------------------------------------------------
//-- Create walk date moment ---------
  const adminWalkListDate = moment(new Date(walk.date));
  
//------------------------------------------------------------------------------------------------------
//--Click to select Admin walk date ------
  const handleOnClick = () => {
    setToggleAdmin(true);
    setSelectedAdminWalk(walk);
  };


  return (
      <div
      onClick={handleOnClick}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>{adminWalkListDate.format("dddd")}</div>
      <div>{adminWalkListDate.format("MMM D")}</div>
      <div>{walk.dogs.length}</div>
    </div>
  );
};

export default AdminWalkList;
