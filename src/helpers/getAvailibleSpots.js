const getAvailibleSpots = (date, walks) => {
  console.log("Get availible spots called");
  console.log("Get availible spots date", date);
  console.log("Get availible spots walks", walks);
  const walksForDate = walks.filter((walk) => {
    return date.isSame(walk.date, "day")
  });

  const dogsForDate = walksForDate.filter((walk) => {
    console.log("walk.isAccepted", walk.isAccepted)
    if (walk.isAccepted) {
      return walk.dogs;
    }
  })


  let allDogsForDate = 0;
  for (const item of dogsForDate) {
    allDogsForDate += item.dogs.length;
  }
  console.log("all dogs for date", allDogsForDate);
  const availibleSpotsForDate = 12 - allDogsForDate;
  return availibleSpotsForDate;
};

export default getAvailibleSpots;