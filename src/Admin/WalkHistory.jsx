/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminClient from './AdminClient';
import './index.scss';

function WalkHistory({ adminState }) {
  const navigate = useNavigate();
  const clients = adminState?.clients || [];

  const clientList = clients.map((client) => (
    <div key={client.id} className="dog-light-button">
      <AdminClient
        userId={client.id}
        userName={client.username || client.email}
        dogs={client.dogs || []}
        navigate={navigate}
        navigateTo="/admin/walk-history/detail"
      />
    </div>
  ));

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Walk History</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </NavLink>
      </div>
      <div className="button-list-container walk-history-avatars">
        {clientList.length > 0 ? clientList : (
          <p className="walk-history-empty">No clients found.</p>
        )}
      </div>
    </>
  );
}

export default WalkHistory;
