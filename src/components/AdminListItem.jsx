import moment from "moment";

const AdminListItem = ({ selectedAdminWalk }) => { 
  
  const adminWalkDate = moment(new Date(selectedAdminWalk.date));

  const dogs = selectedAdminWalk.dogs.map((dog) => {
    return <div key={dog.id}>{dog.name}</div>
  })
  
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{adminWalkDate.format("dddd")}</div>
      <div>{adminWalkDate.format("MMM D")}</div>
      <div>User</div>
      <div>{dogs}</div>
      <button>Payed For</button>
      <button>Is Accepted</button>
      <div>no. Of Dogs On Walk</div>
    </div>
  );

};

export default AdminListItem;