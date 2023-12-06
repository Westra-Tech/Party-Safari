async function getHostUsingID(id) {
  return fetch("http://localhost:8000/host?host_id=" + id);
}

// Compare this snippet from assets/js/services/party-service.js:
