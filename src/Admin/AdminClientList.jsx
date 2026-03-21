/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Link } from 'react-router-dom';
import './index.scss';

function AdminClientList({ adminState }) {
  const clients = adminState?.clients || [];

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Client List</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </NavLink>
      </div>
      <div className="button-list-container admin-client-list-container">
        {clients.length > 0 ? (
          clients.map((client) => (
            <Link
              key={client.id}
              className="light-button admin-client-list-item"
              to={`/admin/client-list/${client.id}`}
            >
              {client.username || client.name || client.email || `Client ${client.id}`}
            </Link>
          ))
        ) : (
          <p className="walk-history-empty">No clients found.</p>
        )}
      </div>
    </>
  );
}

export default AdminClientList;
