/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
//---------------------------------------------------------------------------
import { Link } from 'react-router-dom';

function AdminHome() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center', alignContent: 'center',
    }}
    >
      <Link className="dashboard-button" to="/admin/walk-requests"> Walk Requests </Link>
      <Link className="dashboard-button" to="/admin/unpaid-requests"> Unpaid Requests </Link>
    </div>
  );
}

export default AdminHome;
