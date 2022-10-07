import moment from "moment";

const AdminList = ({ date, dogs, setToggleAdmin, setSelectedAdminDate }) => {

  const handleOnClick = () => {
    setToggleAdmin(true);
    setSelectedAdminDate(adminListDate);
  };

  const adminListDate = moment(new Date(date));
  console.log(" adminListDate", adminListDate);

  return (
      <div
      onClick={handleOnClick}
      style={{ display: "flex", justifyContent: "space-between" }}
    >
      <div>{adminListDate.format("dddd")}</div>
      <div>{adminListDate.format("MMM D")}</div>
      <div>{dogs.length}</div>
    </div>
  );
};

export default AdminList;
