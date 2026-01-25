/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import AdminWalkDog from './AdminWalkDog';
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
        <div className="admin-walk-month-year">
          {selectedDate.format('MMMM YYYY')}
        </div>
        <div className="admin-walk-day">
          {selectedDate.format('dddd D')}
        </div>
        <button
          type="button"
          className="admin-walk-back-button"
          onClick={handleBack}
        >
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
        </button>
      </div>

      {walksForDate.length === 0 ? (
        <div className="admin-walk-empty">
          <p>No walks scheduled for this date.</p>
        </div>
      ) : (
        <div className="admin-walk-dogs-list">
          {walksForDate
            .flatMap((walk) => walk.dogs ?? [])
            .map((dog) => (
              <AdminWalkDog key={dog.id} dog={dog} />
            ))}
        </div>
      )}
    </div>
  );
}

export default AdminWalk;
