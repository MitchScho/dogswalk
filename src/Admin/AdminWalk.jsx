/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleLeft } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../dog.thumbnail.png';
import './AdminWalk.scss';

function AdminWalk({ state }) {
  const { date } = useParams();
  const navigate = useNavigate();

  const selectedDate = moment(date);
  const walksForDate = state.walks.filter((walk) => {
    const walkDate = moment(walk.date);
    return walkDate.isSame(selectedDate, 'day');
  });

  const handleBack = () => {
    navigate('/admin/schedule');
  };

  return (
    <div className="admin-walk-container">
      <div className="admin-walk-header">
        <button
          type="button"
          className="admin-walk-back-button"
          onClick={handleBack}
        >
          <FontAwesomeIcon icon={faCircleLeft} />
          <span>Back to Schedule</span>
        </button>
        <h2 className="admin-walk-title">
          Walks for
          {selectedDate.format('dddd, MMMM D, YYYY')}
        </h2>
      </div>

      {walksForDate.length === 0 ? (
        <div className="admin-walk-empty">
          <p>No walks scheduled for this date.</p>
        </div>
      ) : (
        <div className="admin-walk-list">
          {walksForDate.map((walk) => (
            <div key={walk.id} className="admin-walk-item">
              <div className="admin-walk-item-header">
                <h3 className="admin-walk-item-id">
                  Walk ID:
                  {walk.id}
                  {walk.id}
                </h3>
                <div className="admin-walk-item-meta">
                  <span className="admin-walk-item-date">
                    {moment(walk.date).format('h:mm A')}
                  </span>
                  {walk.payed_for && (
                    <span className="admin-walk-item-paid">Paid</span>
                  )}
                </div>
              </div>

              {walk.dogs && walk.dogs.length > 0 && (
                <div className="admin-walk-item-dogs">
                  <h4 className="admin-walk-item-dogs-title">Dogs:</h4>
                  <div className="admin-walk-item-dogs-list">
                    {walk.dogs.map((dog) => (
                      <div key={dog.id} className="admin-walk-item-dog">
                        <img
                          src={dog.image || dog.avatar || Avatar}
                          alt={dog.name}
                          className="admin-walk-item-dog-image"
                        />
                        <span className="admin-walk-item-dog-name">
                          {dog.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {walk.availible_spots !== undefined && (
                <div className="admin-walk-item-spots">
                  <span>
                    Available Spots:
                    {walk.availible_spots}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AdminWalk;
