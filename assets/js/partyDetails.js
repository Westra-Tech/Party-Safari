var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get("party_id");
console.log(id);

// Display the received data on the page

const partyDetails = getPartyWithID(id);

partyDetails.then((data) => {
  loadPartyDetails(data);
});

function loadPartyDetails(data) {
  var title = document.getElementById("partyTitle");
  title.textContent = data.Name;

  var description = document.getElementById("partyDescription");
  description.textContent = data.Description;

  var address = document.getElementById("partyAddress");
  address.textContent =
    data.AddressLine1 + ", " + data.City + ", " + data.State;

  var price = document.getElementById("partyPrice");
  price.textContent = "$" + data.Price;

  var host = document.getElementById("hostName");
  host.textContent = data.HostName;

  var hostDescription = document.getElementById("hostDescription");
  hostDescription.textContent = data.HostDescription;
}

async function getPartyWithID(id) {
  const response = await fetch(
    `http://localhost:3000/map/party_listings?party_id=${id}`
  );
  const party = await response.json();
  return party;
}
