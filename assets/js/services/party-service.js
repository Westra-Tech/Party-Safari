async function getPartyWithID(id) {
  const response = await fetch(`http://localhost:3000/api/party/${id}`);
  const party = await response.json();
  return party;
}
