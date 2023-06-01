export default function sortRequestsByDog(unpaidRequests) {
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
  const sortedRequests = {};
  // Loop through dogRequests. If a request has the same dogName.
  // Store request in array as value of dogName
  dogRequests.forEach((request) => {
    if (Object.hasOwn(sortedRequests, request.dogName)) {
      sortedRequests[request.dogName].push(request);
    } else {
      sortedRequests[request.dogName] = [request];
    }
  });

  return sortedRequests;
}
