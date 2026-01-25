/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
//---------------------------------------------------------------------------
import { useMemo } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { NavLink, useNavigate } from 'react-router-dom';
import AdminClient from './AdminClient';
import './index.scss';

function UnpaidWalks({ adminState }) {
  const navigate = useNavigate();

  // Get clients with unpaid walks from adminState.walks
  const usersWithUnpaidWalks = useMemo(() => {
    if (!adminState.walks) return [];

    // Get all unpaid walks
    const unpaidWalks = adminState.walks.filter((walk) => walk.paidFor === false);

    // Group by user
    const usersMap = {};

    unpaidWalks.forEach((walk) => {
      if (!walk.dogs || walk.dogs.length === 0) return;

      walk.dogs.forEach((dog) => {
        const userId = dog.user?.id || dog.userId;
        if (!userId) return;

        if (!usersMap[userId]) {
          usersMap[userId] = {
            userId,
            userName: dog.user?.username || dog.user?.email || 'Unknown',
            dogs: [],
            dogIds: new Set(),
          };
        }

        // Add dog if not already in the list
        if (!usersMap[userId].dogIds.has(dog.id)) {
          usersMap[userId].dogs.push({
            id: dog.id,
            name: dog.name,
            image: dog.image,
          });
          usersMap[userId].dogIds.add(dog.id);
        }
      });
    });

    return Object.values(usersMap);
  }, [adminState.walks]);

  const clientList = usersWithUnpaidWalks.map((userData) => (
    <div key={userData.userId} className="dog-light-button">
      <AdminClient
        userId={userData.userId}
        userName={userData.userName}
        dogs={userData.dogs || []}
        navigate={navigate}
        navigateTo="/admin/unpaid-walks/detail"
      />
    </div>
  ));

  return (
    <>
      <div className="header-container">
        <div />
        <h3>Unpaid Walks</h3>
        <NavLink to="/admin">
          <FontAwesomeIcon className="back-icon" icon={faArrowLeft} />
          {' '}
        </NavLink>
      </div>
      <div className="button-list-container walk-history-avatars">
        {clientList.length > 0 ? clientList : (
          <p className="walk-history-empty">No unpaid walks.</p>
        )}
      </div>
    </>
  );
}

export default UnpaidWalks;
