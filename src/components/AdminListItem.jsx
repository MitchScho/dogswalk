import moment from "moment";

const AdminListItem = (date) => { 

  const selectedDate = moment(new Date(date));
  console.log(" date", date);
  return (
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <div>{selectedDate.format("MMM D")}</div>
      <div>{selectedDate.format("dddd")}</div>
      <div>User</div>
      <div>Dogs</div>
      <div>Payed For</div>
      <div>Is Accepted</div>
      <div>no. Of Dogs On Walk</div>
    </div>
  );

};

export default AdminListItem;