/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useEffect, useState } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faCheck, faTimes, faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { getAdminWalkRequestsForDog } from '../api';
import './index.scss';

function WalkHistoryDetail() {
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
    return <Navigate to="/admin/walk-history" replace />;
  }

  return (
    <>
      <div className="header-container">
        <div />
        <h3>
          {dogName}
          &apos;s Walk History
        </h3>
        <NavLink to="/admin/walk-history">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </NavLink>
      </div>
      <div className="walk-history-detail-container">
        <table className="walk-history-table">
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
                <td colSpan={5} className="walk-history-table-empty">
                  No walk requests for this dog.
                </td>
              </tr>
            ) : (
              requests.map((req) => {
                const d = moment(req.date);
                return (
                  <tr key={req.id} className="walk-history-table-row">
                    <td>{d.format('ddd MMM D, YYYY')}</td>
                    <td>
                      <span
                        className={`walk-history-status ${
                          req.isAccepted ? 'walk-history-status--accepted' : 'walk-history-status--pending'
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
                        className={`walk-history-status ${
                          req.paidFor ? 'walk-history-status--paid' : 'walk-history-status--unpaid'
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

export default WalkHistoryDetail;
