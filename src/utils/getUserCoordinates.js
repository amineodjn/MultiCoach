export const getUserCoordinates = async (usersData) => {
  const userMarkers = [];
  for (const user of usersData) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?city=${user.city}&format=json`
    );
    const data = await response.json();

    if (data.length > 0) {
      const location = data[0];
      userMarkers.push({
        position: {
          lat: parseFloat(location.lat),
          lng: parseFloat(location.lon),
        },
        user: user,
      });
    } else {
      console.error("Geocode was not successful for the city: " + user.city);
    }
  }
  return userMarkers;
};
