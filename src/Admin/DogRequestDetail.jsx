/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useEffect, useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCircleLeft, faCheck, faTimes, faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { getAdminWalkRequestsForDog } from '../api';
import './index.scss';

function DogRequestDetail() {
  const { state: locationState } = useLocation();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const dogId = locationState?.dogId;
  const dogName = locationState?.dogName ?? 'Dog';

  useEffect(() => {
    if (!dogId) {
      setLoading(false);
      return;
    }
    getAdminWalkRequestsForDog(dogId)
      .then((res) => {
        setRequests(res.data);
      })
      .catch((err) => {
        console.error(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dogId]);

  if (loading) {
    return (
      <div className="header-container">
        <div />
        <h3>Loading…</h3>
        <div />
      </div>
    );
  }

  if (!dogId) {
    return <Navigate to="/admin/dog-requests" replace />;
  }

  return (
    <>
      <div className="header-container">
        <div />
        <h3>
          {dogName}
          &apos;s Walk Requests
        </h3>
        <NavLink to="/admin/dog-requests">
          <FontAwesomeIcon className="back-icon" icon={faCircleLeft} />
        </NavLink>
      </div>
      <div className="dog-request-detail-container">
        <table className="dog-requests-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Accepted</th>
              <th>Paid For</th>
              <th>Request ID</th>
              <th>Created</th>
            </tr>
          </thead>
          <tbody>
            {requests.length === 0 ? (
              <tr>
                <td colSpan={5} className="dog-requests-table-empty">
                  No walk requests for this dog.
                </td>
              </tr>
            ) : (
              requests.map((req) => {
                const d = moment(req.date);
                return (
                  <tr key={req.id} className="dog-requests-table-row">
                    <td>{d.format('ddd MMM D, YYYY')}</td>
                    <td>
                      <span
                        className={`dog-requests-status ${
                          req.isAccepted ? 'dog-requests-status--accepted' : 'dog-requests-status--pending'
                        }`}
                      >
                        {req.isAccepted ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faTimes} />
                        )}
                        <span className="sr-only">{req.isAccepted ? 'Accepted' : 'Not accepted'}</span>
                      </span>
                    </td>
                    <td>
                      <span
                        className={`dog-requests-status ${
                          req.paidFor ? 'dog-requests-status--paid' : 'dog-requests-status--unpaid'
                        }`}
                      >
                        <FontAwesomeIcon icon={faDollarSign} />
                        <span className="sr-only">{req.paidFor ? 'Paid' : 'Unpaid'}</span>
                      </span>
                    </td>
                    <td>{req.id}</td>
                    <td>{req.createdAt ? moment(req.createdAt).format('MMM D, YYYY') : '—'}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default DogRequestDetail;
