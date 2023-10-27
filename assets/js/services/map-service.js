// gets the map data for the location
function fetchMapDataForLocation(location) {
  return fetch("http://localhost:3000/api/map?location=" + location)
    .then((response) => response.json())
    .then((data) => {
      return data;
    });
}
