var queryString = window.location.search;
var urlParams = new URLSearchParams(queryString);
var id = urlParams.get("party_id");

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

  var alcoholPolicy = document.getElementById("alcoholPolicy");
  alcoholPolicy.textContent = data.AlcoholPolicy;

  var capacity = document.getElementById("capacity");
  capacity.textContent = data.PersonCapacity;

  var dressCode = document.getElementById("dressCode");
  dressCode.textContent = data.DressCode;

  var startTime = document.getElementById("startDatetime");
  startTime.textContent = formatDate(data.StartDate);

  var endTime = document.getElementById("endDatetime");
  endTime.textContent = formatDate(data.EndDate);

  var partyTheme = document.getElementById("partyTheme");
  partyTheme.textContent = data.Theme;
}
// format date as mm/dd/yyyy hh:mm AM/PM
function formatDate(date) {
  var d = new Date(date);
  var hours = d.getHours();
  var minutes = d.getMinutes();
  var ampm = hours >= 12 ? "PM" : "AM";
  var month = d.getMonth() + 1;
  var day = d.getDate();
  var year = d.getFullYear();
  hours = hours % 12;
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  var strTime =
    month + "/" + day + "/" + year + " " + hours + ":" + minutes + " " + ampm;
  return strTime;
}

async function getPartyWithID(id) {
  const response = await getPartyUsingID(id);
  const party = await response.json();
  return party;
}
