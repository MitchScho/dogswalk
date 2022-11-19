const getAvailibleSpots = (date, walks) => {
  
  const walksForDate = walks.filter((walk) => {
    return date.isSame(walk.date, "day")
  });

  const dogsForDate = walksForDate.filter((walk) => {
    
    if (walk.isAccepted) {
      return walk.dogs;
    }
  })

  let allDogsForDate = 0;
  for (const item of dogsForDate) {
    allDogsForDate += item.dogs.length;
  }
  
  const availibleSpotsForDate = 12 - allDogsForDate;
  return availibleSpotsForDate;
};

export default getAvailibleSpots;