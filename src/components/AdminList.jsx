
const AdminList = ({setToggleAdmin}) => { 

  const handleOnClick = () => {
    setToggleAdmin(true);
  };

  return (
    <div onClick={handleOnClick} style={{ display: "flex", justifyContent: "space-between" }}>
      <div>Day</div>
      <div>Date</div>
      <div>No. Of Dogs Not Accepted</div>
    </div>
  );

};

export default AdminList;