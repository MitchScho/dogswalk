/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useMemo } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faCheck, faTimes, faDollarSign,
} from '@fortawesome/free-solid-svg-icons';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import './index.scss';

function WalkHistoryDetail({ adminState }) {
  const { state: locationState } = useLocation();
  const userId = locationState?.userId;
  const userName = locationState?.userName ?? 'Client';

  // Build walk history from adminState
  const history = useMemo(() => {
    if (!userId || !adminState) return [];

    const historyItems = [];

    // Get walk requests for this user
    const walkRequests = (adminState.walkRequests || []).filter(
      (wr) => wr.userId === parseInt(userId, 10),
    );

    walkRequests.forEach((wr) => {
      historyItems.push({
        id: wr.id,
        type: 'walkRequest',
        date: wr.date,
        isAccepted: wr.isAccepted,
        paidFor: wr.paidFor || false,
        createdAt: wr.createdAt,
        dogs: wr.dogs || [],
      });
    });

    // Get walks that include this user's dogs
    const userDogs = (adminState.clients || [])
      .find((client) => client.id === parseInt(userId, 10))?.dogs || [];
    const userDogIds = userDogs.map((dog) => dog.id);

    const walks = (adminState.walks || []).filter((walk) => {
      if (!walk.dogs || walk.dogs.length === 0) return false;
      // Check if any of the walk's dogs belong to this user
      return walk.dogs.some((dog) => userDogIds.includes(dog.id));
    });

    walks.forEach((walk) => {
      // Only add walks that have at least one of this user's dogs
      const userDogsInWalk = walk.dogs.filter((dog) => userDogIds.includes(dog.id));
      if (userDogsInWalk.length > 0) {
        historyItems.push({
          id: walk.id,
          type: 'walk',
          date: walk.date,
          isAccepted: true, // Walks are always accepted
          paidFor: walk.paidFor || false,
          createdAt: walk.createdAt,
          dogs: userDogsInWalk,
        });
      }
    });

    // Sort by date descending
    historyItems.sort((a, b) => new Date(b.date) - new Date(a.date));

    return historyItems;
  }, [userId, adminState]);

  if (!userId) {
    return <Navigate to="/admin/walk-history" replace />;
  }

  return (
    <>
      <div className="header-container">
        <div />
        <h3>
          {userName}
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
              <th>Request Date</th>
            </tr>
          </thead>
          <tbody>
            {history.length === 0 ? (
              <tr>
                <td colSpan={4} className="walk-history-table-empty">
                  No walk history for this client.
                </td>
              </tr>
            ) : (
              history.map((item) => {
                const d = moment(item.date);
                return (
                  <tr key={`${item.type}-${item.id}`} className="walk-history-table-row">
                    <td>{d.format('ddd MMM D, YYYY')}</td>
                    <td>
                      <span
                        className={`walk-history-status ${
                          item.isAccepted ? 'walk-history-status--accepted' : 'walk-history-status--pending'
                        }`}
                      >
                        {item.isAccepted ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : (
                          <FontAwesomeIcon icon={faTimes} />
                        )}
                        <span className="sr-only">{item.isAccepted ? 'Accepted' : 'Not accepted'}</span>
                      </span>
                    </td>
                    <td>
                      <span
                        className={`walk-history-status ${
                          item.paidFor ? 'walk-history-status--paid' : 'walk-history-status--unpaid'
                        }`}
                      >
                        <FontAwesomeIcon icon={faDollarSign} />
                        <span className="sr-only">{item.paidFor ? 'Paid' : 'Unpaid'}</span>
                      </span>
                    </td>
                    <td>{item.createdAt ? moment(item.createdAt).format('MMM D, YYYY') : '—'}</td>
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
