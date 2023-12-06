async function getPartyWithID(id) {
  return fetch("http://localhost:8000/map/party_listings?party_id=" + id);
}
