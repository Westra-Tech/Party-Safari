// gets the map data for the location
async function fetchMapDataForLocation(location) {
  return fetch("http://localhost:8000/map?location=" + location);
}

async function getPartyUsingID(id) {
  return fetch("http://localhost:8000/map/party_listings?party_id=" + id);
}

async function addHostToFavorites(user_id, host_id) {
  return fetch(
    "http://localhost:8000/favorites?user_id=" +
      user_id +
      "&host_id=" +
      host_id,
    {
      method: "PATCH",
    }
  );
}

async function removeHostFromFavorites(user_id, host_id) {
  return fetch(
    "http://localhost:8000/favorites?user_id=" +
      user_id +
      "&host_id=" +
      host_id,
    {
      method: "DELETE",
    }
  );
}

async function addPartyToFavorites(user_id, party_id) {
  return fetch(
    "http://localhost:8000/favorites?user_id=" +
      user_id +
      "&party_id=" +
      party_id,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json", // Adjust the content type based on your API requirements
      },
    }
  );
}

async function removePartyFromFavorites(user_id, party_id) {
  return fetch(
    "http://localhost:8000/favorites?user_id=" +
      user_id +
      "&party_id=" +
      party_id,
    {
      method: "DELETE",
    }
  );
}

async function isInFavorites(user_id, party_id) {
  return await fetch(
    `http://localhost:8000/favorites?user_id=${user_id}&party_id=${party_id}`
  );
}
