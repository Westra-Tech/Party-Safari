function initHost() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var id = urlParams.get("host_id");
  // Display the received data on the page
  const hostDetails = getHostInfo(id);
  hostDetails.then((data) => {
    console.log("hostDetails", data);
    if (!data || !id) window.location.href = "404.html";
    loadHostDetails(data);
    data.parties_hosting.map((party) => {
      getPartyDetails(party).then((partyData) => {
        console.log(partyData);
        loadPartyDetailsIntoSidebar(partyData);
      });
    });
  });

  function loadHostDetails(data) {
    var hostName = document.getElementById("hostName");
    hostName.textContent = data.name;

    var hostDescription = document.getElementById("hostDescription");
    hostDescription.textContent = data.description;

    var hostAddress = document.getElementById("hostAddress");
    hostAddress.textContent =
      data.AddressLine1 + ", " + data.City + ", " + data.State;

    var hostEmail = document.getElementById("hostEmail");
    hostEmail.textContent = data.email_address;

    var hostPhone = document.getElementById("hostPhone");
    hostPhone.textContent = data.phone_number;
  }

  function loadPartyDetailsIntoSidebar(party) {
    const HTML = `
    <li>
        <div class="wd-posts">
            <div class="ps-img">
                <a href="partyDetail.html?party_id=${party._id}" title="">
                    <img src="assets/images/listing/9.jpg" alt="" style="max-height:100px">
                </a>
            </div>
            <div class="ps-info">
                <h3><a href="partyDetail.html?party_id=${party._id}" title="">${
      party.Name
    }</a></h3>
                <strong style="color: #6cd7f4;font-weight:600;font-size:18px;margin-bottom:11px">$${
                  party.Price
                }</strong>
                <span><i class="la la-map-marker"></i>${
                  party.AddressLine1 + ", " + party.City + ", " + party.State
                }</span>
            </div>
        </div>
    </li>
    `;
    const sidebarList = document.getElementById("sidebarList");
    sidebarList.insertAdjacentHTML("beforeend", HTML);
  }

  const hostInfoFav = document.getElementById("hostInfoFav");
  const user_id = "3d6985d6-2f06-493d-82d1-d808e4bd7218";
  const response = getFavoritesList(user_id, id);
  const hostName = "Sigma Sigma Sigma";
  response.then((data) => {
    // check if host is in favoritesHosts array
    if (data.favoriteHosts.some((host) => host === hostName))
      hostInfoFav.innerHTML =
        "<i class='bx bxs-heart' style='color:#d57d19'></i>";
  });
}

async function getFavoritesList(user_id, id) {
  const response = await isInFavoritesWithID(user_id, id);
  return response.json();
}

async function addHostToFavsWithID(user_id, id) {
  const response = await addHostToFavoritesWithID(user_id, id);
  return response.json();
}

function addHostToFavorites() {
  var queryString = window.location.search;
  var urlParams = new URLSearchParams(queryString);
  var id = document.getElementById("hostName").textContent;
  var user_id = "3d6985d6-2f06-493d-82d1-d808e4bd7218";

  const isHostInFav = getFavoritesList(user_id, id);
  isHostInFav.then((data) => {
    if (data.favoriteHosts.some((host) => host === id)) {
      const response = removeHostFromFavsWithID(user_id, id);
      response.then((data) => {
        document.getElementById("hostInfoFav").innerHTML =
          "<i class='la la-heart-o'></i>";
      });
    } else {
      const response = addHostToFavsWithID(user_id, id);
      response.then((data) => {
        console.log("addHostToFavsWithID", data);
        document.getElementById("hostInfoFav").innerHTML =
          "<i class='bx bxs-heart' style='color:#d57d19'></i>";
      });
    }
  });
}

async function removeHostFromFavsWithID(user_id, id) {
  const response = await removeHostFromFavoritesWithID(user_id, id);
  return response.json();
}

async function getHostInfo(id) {
  const response = await getHostUsingID(id);
  return response.json();
}

async function getPartyDetails(id) {
  const response = await getPartyWithID(id);
  return response.json();
}
initHost();
