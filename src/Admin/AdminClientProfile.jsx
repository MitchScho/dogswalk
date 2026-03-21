/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Navigate, useParams } from 'react-router-dom';
import DogAvatar from '../components/DogAvatar';
import './index.scss';

function AdminClientProfile({ adminState }) {
  const { clientId } = useParams();
  const parsedClientId = parseInt(clientId, 10);
  const clients = adminState?.clients || [];
  const client = clients.find((user) => user.id === parsedClientId);

  if (!clientId || Number.isNaN(parsedClientId)) {
    return <Navigate to="/admin/client-list" replace />;
  }

  if (!client) {
    return (
      <>
        <div className="header-container">
          <div />
          <h3>Client Profile</h3>
          <NavLink to="/admin/client-list">
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </NavLink>
        </div>
        <div className="walk-history-detail-container">
          <p className="walk-history-empty">Client not found.</p>
        </div>
      </>
    );
  }

  const clientDisplayName = client.username || client.name || client.email || `Client ${client.id}`;
  const clientDogs = client.dogs || [];

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Client Profile</h3>
        <NavLink to="/admin/client-list">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </NavLink>
      </div>
      <div className="admin-client-profile-container">
        <div className="admin-client-profile-card">
          <h4>{clientDisplayName}</h4>
          <p>
            <strong>Email:</strong>
            {' '}
            {client.email || 'Not provided'}
          </p>
          <p>
            <strong>Client ID:</strong>
            {' '}
            {client.id}
          </p>
          <div>
            <strong>Dogs:</strong>
            <div className="admin-client-profile-dogs">
              {clientDogs.length > 0 ? (
                clientDogs.map((dog) => (
                  <div key={dog.id} className="admin-client-profile-dog-card">
                    <div className="admin-client-profile-dog-avatar">
                      <DogAvatar dog={dog} readOnly />
                    </div>
                    <div className="admin-client-profile-dog-details">
                      <h5>{dog.name || `Dog ${dog.id}`}</h5>
                      <p>
                        <strong>Dog ID:</strong>
                        {' '}
                        {dog.id}
                      </p>
                      <p>
                        <strong>Address:</strong>
                        {' '}
                        {dog.address || 'Address not provided'}
                      </p>
                      <p>
                        <strong>Door Code:</strong>
                        {' '}
                        {dog.doorCode || dog.door_code || 'Not provided'}
                      </p>
                      <p>
                        <strong>Access Details:</strong>
                        {' '}
                        {dog.accessDetails || dog.access_details || 'No special access instructions'}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="walk-history-empty">No dogs on file.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminClientProfile;
