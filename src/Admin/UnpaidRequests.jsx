/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom';
import UnpaidDog from './UnpaidDog';

function UnpaidRequests({ adminUnpaidRequests }) {
  console.log('Unpaid requests', adminUnpaidRequests);

  function sortByDog(unpaidRequests) {
    // Store Dog requests in array
    const dogRequests = [];

    unpaidRequests.forEach((request) => {
      // Loop through unpaid requests
      // For every dog withing request. create new object dogRequest.
      request.dogs.forEach((dog) => {
        const dogRequest = {
          id: request.id,
          date: request.date,
          userId: request.userId,
          payedFor: request.payedFor,
          isAccepted: request.isAccepted,
          dogId: dog.id,
          dogName: dog.name,
          avatar: dog.avatar,
          createdAt: request.createdAt,
          updatedAt: request.updatedAt,
        };
        // Push new dog request to array
        dogRequests.push(dogRequest);
      });
    });
    // Store requests for each dog
    const dogsRequests = [];
    // Loop through dogRequests. If a request has the same dogName.
    // Store request in array as value of dogName
    dogRequests.forEach((request) => {
      if (Object.hasOwn(dogsRequests, request.dogName)) {
        dogsRequests[request.dogName].push(request);
      } else {
        dogsRequests[request.dogName] = [request];
      }
    });

    return dogsRequests;
  }

  const dogsWithUnpaidRequests = sortByDog(adminUnpaidRequests);
  // if (adminUnpaidRequests.length > 0) {
  // }
  //------------------------------------------------------------------------------------------------
  console.log('dogsWithUnpaidRequests', dogsWithUnpaidRequests);

  // --- Create Unpaid Dog List Array ----
  const unpaidRequestsDogList = dogsWithUnpaidRequests.map((dog) => (
    // <div>{dog}</div>
    <UnpaidDog key={dog} dog={dog} />
    // console.log('dog', dog)
  ));

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div />
        <h3>Unpaid Requests</h3>
        <NavLink to="/admin">back </NavLink>
      </div>
      <div>{unpaidRequestsDogList}</div>
    </>
  );
}

export default UnpaidRequests;
