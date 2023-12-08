async function getHostUsingID(id) {
  return fetch("http://localhost:8000/host?host_id=" + id);
}

async function addHostToFavoritesWithID(user_id, host_id) {
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

async function removeHostFromFavoritesWithID(user_id, host_id) {
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

async function isInFavoritesWithID(user_id, host_id) {
  return await fetch(
    `http://localhost:8000/favorites?user_id=${user_id}&host_id=${host_id}`
  );
}

// Compare this snippet from assets/js/services/party-service.js:
