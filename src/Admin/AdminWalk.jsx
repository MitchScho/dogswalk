/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowLeft, faTimes, faPlus,
} from '@fortawesome/free-solid-svg-icons';
import AdminWalkDog from './AdminWalkDog';
import {
  removeDogFromWalk, addDogToWalk, getDogs, getWalks,
} from '../api';
import './AdminWalk.scss';

function AdminWalk({ state, setState }) {
  const { date } = useParams();
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [dogToDelete, setDogToDelete] = useState(null);
  const [showAddDog, setShowAddDog] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [allDogs, setAllDogs] = useState([]);
  const [selectedDog, setSelectedDog] = useState(null);
  const [selectedDogCard, setSelectedDogCard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const selectedDate = moment(date);
  const walksForDate = state.walks.filter((walk) => {
    const walkDate = moment(walk.date);
    return walkDate.isSame(selectedDate, 'day');
  });

  // Get all dogs from all walks on this date, keeping track of which walk each dog belongs to
  const allDogsOnWalk = useMemo(() => {
    const dogsList = [];
    walksForDate.forEach((walk) => {
      (walk.dogs ?? []).forEach((dog) => {
        dogsList.push({ ...dog, walkId: walk.id });
      });
    });
    return dogsList;
  }, [walksForDate]);

  // Load all dogs when clicking plus to add a dog
  const handleAddDogClick = async () => {
    if (!showAddDog) {
      setShowAddDog(true);
      setSearchQuery('');
      setSelectedDog(null);
      try {
        const response = await getDogs();
        setAllDogs(response.data || []);
      } catch (err) {
        console.error('Error fetching dogs:', err);
      }
    }
  };

  const handleCancelAddDog = () => {
    setShowAddDog(false);
    setSearchQuery('');
    setSelectedDog(null);
  };

  // Handle dog card click to select/deselect for deletion
  const handleDogCardClick = (dog) => {
    if (selectedDogCard?.id === dog.id) {
      // Deselect if clicking the same card
      setSelectedDogCard(null);
    } else {
      // Select the clicked card
      setSelectedDogCard(dog);
    }
  };

  const handleDeleteClick = (dog) => {
    setDogToDelete(dog);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (!dogToDelete || !dogToDelete.walkId) return;

    setIsLoading(true);
    try {
      await removeDogFromWalk(dogToDelete.walkId, dogToDelete.id);

      // Directly refetch walks to ensure we have the latest data
      try {
        const walksResponse = await getWalks();
        setState((prev) => ({
          ...prev,
          walks: walksResponse.data,
        }));
      } catch (err) {
        console.error('Error refreshing walks:', err);
        // Fallback to refresh key if direct fetch fails
        setState((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
      }

      setShowDeleteModal(false);
      setDogToDelete(null);
    } catch (err) {
      console.error('Error removing dog from walk:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setDogToDelete(null);
  };
  // Filter dogs based on search query
  const filteredDogs = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const query = searchQuery.toLowerCase();
    return allDogs.filter((dog) => {
      const name = (dog.name || '').toLowerCase();
      // Exclude dogs that are already in any walk on this date
      const isAlreadyOnWalk = allDogsOnWalk.some((walkDog) => walkDog.id === dog.id);
      return name.startsWith(query) && !isAlreadyOnWalk;
    });
  }, [searchQuery, allDogs, allDogsOnWalk]);

  // Handle dog selection from search
  const handleDogSelect = (dog) => {
    setSelectedDog(dog);
    setSearchQuery(dog.name);
  };

  // Handle confirm add dog
  const handleConfirmAddDog = async () => {
    if (!selectedDog) return;

    // Check if dog is already on the walk
    const isAlreadyOnWalk = allDogsOnWalk.some((walkDog) => walkDog.id === selectedDog.id);
    if (isAlreadyOnWalk) {
      setToastMessage('This dog is already on the walk for this date.');
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
      return;
    }

    setIsLoading(true);
    try {
      // Use the first walk's ID if exists, otherwise create a new walk
      const targetWalkId = walksForDate.length > 0 ? walksForDate[0].id : 'new';
      const dateToUse = selectedDate.toISOString();

      console.log('Adding dog to walk - walkId:', targetWalkId, 'dogId:', selectedDog.id, 'date:', dateToUse);

      await addDogToWalk(targetWalkId, selectedDog.id, dateToUse);

      // Directly refetch walks to ensure we have the latest data
      try {
        const walksResponse = await getWalks();
        setState((prev) => ({
          ...prev,
          walks: walksResponse.data,
        }));
      } catch (err) {
        console.error('Error refreshing walks:', err);
        // Fallback to refresh key if direct fetch fails
        setState((prev) => ({
          ...prev,
          reFreshKey: prev.reFreshKey + 1,
        }));
      }

      setShowAddDog(false);
      setSearchQuery('');
      setSelectedDog(null);
    } catch (err) {
      console.error('Error adding dog to walk:', err);
      console.error('Error response:', err.response?.data);
      const errorMessage = err.response?.data?.error || err.message || 'Failed to add dog to walk';
      setToastMessage(`Error: ${errorMessage}`);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    } finally {
      setIsLoading(false);
    }
  };

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
        <div className="admin-walk-header-buttons">
          {!showAddDog ? (
            <button
              type="button"
              className="admin-walk-edit-button"
              onClick={handleAddDogClick}
              title="Add dog"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          ) : (
            <button
              type="button"
              className="admin-walk-cancel-button"
              onClick={handleCancelAddDog}
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          )}
          <button
            type="button"
            className="admin-walk-back-button"
            onClick={handleBack}
          >
            <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          </button>
        </div>
      </div>

      {showAddDog && (
        <div className="admin-walk-add-dog-section">
          <div className="admin-walk-add-dog-form">
            <div className="admin-walk-search-container">
              <input
                type="text"
                className="admin-walk-search-input"
                placeholder="Search for a dog..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setSelectedDog(null);
                }}
              />
              {filteredDogs.length > 0 && (
                <div className="admin-walk-search-results">
                  {filteredDogs.map((dog) => (
                    <button
                      key={dog.id}
                      type="button"
                      className="admin-walk-search-result-item"
                      onClick={() => handleDogSelect(dog)}
                    >
                      {dog.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <button
            type="button"
            className="admin-walk-add-dog-button confirm-mode"
            onClick={handleConfirmAddDog}
            disabled={!selectedDog || isLoading}
          >
            {isLoading ? 'Adding...' : 'Confirm'}
          </button>
        </div>
      )}

      {walksForDate.length === 0 && !showAddDog ? (
        <div className="admin-walk-empty">
          <p>No walks scheduled for this date.</p>
        </div>
      ) : (
        <div className="admin-walk-dogs-list">
          {allDogsOnWalk.map((dog) => (
            <AdminWalkDog
              key={dog.id}
              dog={dog}
              isSelected={selectedDogCard?.id === dog.id}
              onCardClick={() => handleDogCardClick(dog)}
              onDelete={() => handleDeleteClick(dog)}
            />
          ))}
        </div>
      )}

      {showDeleteModal && (
        <div className="admin-walk-delete-modal-overlay">
          <div className="admin-walk-delete-modal">
            <h3>Confirm Delete</h3>
            <p>
              Are you sure you want to remove
              {' '}
              <strong>{dogToDelete?.name}</strong>
              {' '}
              from this walk?
            </p>
            <div className="admin-walk-delete-modal-buttons">
              <button
                type="button"
                className="admin-walk-delete-confirm-button"
                onClick={handleConfirmDelete}
                disabled={isLoading}
              >
                {isLoading ? 'Removing...' : 'Confirm'}
              </button>
              <button
                type="button"
                className="admin-walk-delete-cancel-button"
                onClick={handleCancelDelete}
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {showToast && (
        <div className="admin-walk-toast">
          <span className="admin-walk-toast-message">
            {toastMessage}
          </span>
        </div>
      )}
    </div>
  );
}

export default AdminWalk;
