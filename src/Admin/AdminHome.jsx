/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-lone-blocks */
/* eslint-disable react/react-in-jsx-scope */
import { Link } from 'react-router-dom';

function AdminHome() {
  return (
    <>
      <Link to="/admin/walk-requests"> Walk Requests </Link>
      <Link to="/admin/unpaid-requests"> Unpaid Requests </Link>
    </>
  );
}

export default AdminHome;
