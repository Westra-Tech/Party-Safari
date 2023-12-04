// gets the map data for the location
async function fetchMapDataForLocation(location) {
  return fetch("http://localhost:8000/map?location=" + location);
}

async function getPartyUsingID(id) {
  return fetch("http://localhost:8000/map/party_listings?party_id=" + id);
}
