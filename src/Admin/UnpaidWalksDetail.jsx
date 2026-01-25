/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useMemo, useState, useEffect } from 'react';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft, faCheck } from '@fortawesome/free-solid-svg-icons';
import { NavLink, Navigate, useLocation } from 'react-router-dom';
import { updateWalk } from '../api';
import Avatar from '../dog.thumbnail.png';
import './UnpaidWalksDetail.scss';

// Walk price constant
const WALK_PRICE = 30.00;

function UnpaidWalksDetail({ adminState, setAdminState }) {
  const { state: locationState } = useLocation();
  const userId = locationState?.userId;
  const userName = locationState?.userName ?? 'Client';
  const dogs = locationState?.dogs || [];
  const [visibleRequestDates, setVisibleRequestDates] = useState(new Set());
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  // Detect screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  // Get unpaid walks for this user from adminState
  const unpaidWalks = useMemo(() => {
    if (!userId || !adminState.walks) return [];

    // Get all walks that include this user's dogs and are unpaid
    const userDogIds = dogs.map((dog) => dog.id);

    return (adminState.walks || [])
      .filter((walk) => {
        if (walk.paidFor) return false;
        if (!walk.dogs || walk.dogs.length === 0) return false;
        // Check if any of the walk's dogs belong to this user
        return walk.dogs.some((dog) => userDogIds.includes(dog.id));
      })
      .map((walk) => {
        // Filter to only include this user's dogs
        const userDogsInWalk = walk.dogs.filter((dog) => userDogIds.includes(dog.id));
        return {
          ...walk,
          dogs: userDogsInWalk,
        };
      })
      .sort((a, b) => new Date(a.date) - new Date(b.date)); // Sort by date ascending
  }, [userId, adminState.walks, dogs]);

  // Flatten walks into individual rows (one row per walk)
  const invoiceRows = useMemo(() => unpaidWalks.map((walk) => ({
    id: walk.id,
    walkDate: walk.date,
    requestDate: walk.createdAt || walk.date,
    dogs: walk.dogs || [],
    quantity: walk.dogs?.length || 0,
    price: WALK_PRICE,
    total: (walk.dogs?.length || 0) * WALK_PRICE,
    paidFor: walk.paidFor,
  })), [unpaidWalks]);

  // Calculate invoice total
  const invoiceTotal = useMemo(
    () => invoiceRows.reduce((sum, row) => sum + row.total, 0),
    [invoiceRows],
  );

  const handleMarkAsPaid = async (walkId) => {
    try {
      await updateWalk(walkId, { paidFor: true });
      // Refresh admin state
      setAdminState((prev) => ({
        ...prev,
        adminReFreshKey: prev.adminReFreshKey + 1,
      }));
    } catch (err) {
      console.error('Error updating walk:', err.message);
    }
  };

  const toggleRequestDate = (walkId) => {
    setVisibleRequestDates((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(walkId)) {
        newSet.delete(walkId);
      } else {
        newSet.add(walkId);
      }
      return newSet;
    });
  };

  if (!userId) {
    return <Navigate to="/admin/unpaid-walks" replace />;
  }

  return (
    <>
      <div className="header-container">
        <div />
        <h3>
          {userName}
          &apos;s Invoice
        </h3>
        <NavLink to="/admin/unpaid-walks">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </NavLink>
      </div>
      <div className="unpaid-walks-detail-container">
        {invoiceRows.length === 0 ? (
          <p className="unpaid-walks-empty">No unpaid walks for this client.</p>
        ) : (
          <div className="unpaid-walks-invoice">
            <div className="unpaid-walks-invoice-header-section">
              <h2 className="unpaid-walks-invoice-title">Invoice</h2>
              <div className="unpaid-walks-client-info">
                <div className="unpaid-walks-client-name">
                  <strong>Client:</strong>
                  {' '}
                  {userName}
                </div>
                <div className="unpaid-walks-invoice-date">
                  <strong>Invoice Date:</strong>
                  {' '}
                  {moment().format('MMM D, YYYY')}
                </div>
              </div>
            </div>

            <table className="unpaid-walks-invoice-table">
              <thead>
                <tr>
                  <th>Walk Date</th>
                  <th>Dogs</th>
                  {!isSmallScreen && <th>Request Date</th>}
                  {!isSmallScreen && <th>Quantity</th>}
                  {!isSmallScreen && <th>Price</th>}
                  {!isSmallScreen && <th>Total</th>}
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {invoiceRows.map((row) => (
                  <tr key={row.id} className={row.paidFor ? 'paid-row' : ''}>
                    <td>{moment(row.walkDate).format('MMM D, YYYY')}</td>
                    <td>
                      <div className="unpaid-walks-dogs-cell">
                        {row.dogs.map((dog) => (
                          <div key={dog.id} className="unpaid-walks-dog-cell-item">
                            <img
                              src={dog.image || Avatar}
                              alt={dog.name}
                              className="unpaid-walks-dog-cell-image"
                            />
                            <span>{dog.name}</span>
                          </div>
                        ))}
                      </div>
                    </td>
                    {!isSmallScreen && (
                      <td className="unpaid-walks-request-date-cell">
                        <button
                          type="button"
                          className={`unpaid-walks-request-date-button ${visibleRequestDates.has(row.id) ? 'persisted' : ''}`}
                          onClick={() => toggleRequestDate(row.id)}
                        >
                          {visibleRequestDates.has(row.id) ? (
                            moment(row.requestDate).format('MMM D, YYYY')
                          ) : (
                            <>
                              <span className="unpaid-walks-request-date-visible">{moment(row.requestDate).format('MMM D, YYYY')}</span>
                              <span className="unpaid-walks-request-date-placeholder" />
                            </>
                          )}
                        </button>
                      </td>
                    )}
                    {!isSmallScreen && <td>{row.quantity}</td>}
                    {!isSmallScreen && (
                      <td>
                        $
                        {row.price.toFixed(2)}
                      </td>
                    )}
                    {!isSmallScreen && (
                      <td>
                        $
                        {row.total.toFixed(2)}
                      </td>
                    )}
                    <td>
                      <button
                        type="button"
                        onClick={() => handleMarkAsPaid(row.id)}
                        className={`unpaid-walks-paid-button ${row.paidFor ? 'paid' : 'unpaid'}`}
                      >
                        {row.paidFor ? (
                          <>
                            <FontAwesomeIcon icon={faCheck} />
                            <span>Paid</span>
                          </>
                        ) : (
                          <span>Mark as Paid</span>
                        )}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="unpaid-walks-total-row">
                  <td colSpan={isSmallScreen ? 2 : 5} className="unpaid-walks-total-label">
                    <strong>Total:</strong>
                  </td>
                  <td className="unpaid-walks-total-amount">
                    <strong>
                      $
                      {invoiceTotal.toFixed(2)}
                    </strong>
                  </td>
                  <td />
                </tr>
              </tfoot>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default UnpaidWalksDetail;
