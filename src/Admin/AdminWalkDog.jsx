/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Avatar from '../dog.thumbnail.png';
import './AdminWalkDog.scss';

function AdminWalkDog({
  dog, isSelected, onCardClick, onDelete,
}) {
  return (
    <div
      className={`admin-walk-dog-card ${isSelected ? 'selected' : ''}`}
      onClick={onCardClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onCardClick();
        }
      }}
    >
      {isSelected && (
        <button
          type="button"
          className="admin-walk-dog-delete-button"
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <div className="admin-walk-dog-image-container">
        <img
          src={dog.image || dog.avatar || Avatar}
          alt={dog.name || 'Dog'}
          className="admin-walk-dog-image"
        />
      </div>
      <div className="admin-walk-dog-details">
        <h4 className="admin-walk-dog-name">
          {dog.name || 'Dog Name'}
        </h4>
        <div className="admin-walk-dog-info">
          <div className="admin-walk-dog-info-item">
            <span className="admin-walk-dog-info-label">Address:</span>
            <span className="admin-walk-dog-info-value">
              {dog.address || 'Address not provided'}
            </span>
          </div>
          <div className="admin-walk-dog-info-item">
            <span className="admin-walk-dog-info-label">Door Code:</span>
            <span className="admin-walk-dog-info-value">
              {dog.doorCode || dog.door_code || 'Not provided'}
            </span>
          </div>
          <div className="admin-walk-dog-info-item">
            <span className="admin-walk-dog-info-label">Access Details:</span>
            <span className="admin-walk-dog-info-value">
              {dog.accessDetails || dog.access_details || 'No special access instructions'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminWalkDog;
