// assets/js/map-cluster/sidebarListings.js
const user_id = "3d6985d6-2f06-493d-82d1-d808e4bd7218";

// Generate HTML for listing 
const listingHTML = (
  id,
  price,
  title,
  description,
  addressLine,
  city,
  zip,
  state,
  host,
  startTime,
  endTime,
  isFavorited,
  distance,
  discounted,
  originalPrice
) => {
  return `
    <div class="col-lg-6 col-md-6">
        <div class="card">
            <a href="partyDetail.html?party_id=${id}" title="">
                <div class="img-block">
                    <div class="overlay"></div>
                    <img src="assets/images/listing/9.jpg" alt=""
                        class="img-fluid">
                    <div class="rate-info">
                        <h5>$${
                          discounted
                            ? '<span style="margin-right:10px"><del style="text-decoration: line-through;text-decoration-thickness: .15em;text-decoration-color: black;">$' +
                              originalPrice +
                              "</del></span>"
                            : ""
                        }${price}</h5>
                        <span> ${discounted ? "Discounted" : "Party"}</span>
                    </div>
                </div>
            </a>
            <div class="card-body">
                <a href="partyDetail.html?party_id=${id}" title="">
                    <h3>${title}</h3>
                    <p>
                        <i class="la la-map-marker"></i>${addressLine}, ${city}, ${state} ${zip}
                        </p>
                        <strong>At a distance of ${distance} miles from your current location</strong>
                </a>
                <ul>
                    <li>${host}</li>
                    
                </ul>
            </div>
            <div class="card-footer">
                <a class="pull-left" onclick="favoriteParty('${id}', ${isFavorited})" id="${id}">
                    ${
                      isFavorited
                        ? "<i class='bx bxs-heart' style='color:#d57d19'></i>"
                        : '<i class="la la-heart-o"></i>'
                    }
                </a>
                <a href="#" class="pull-right">
                    <i class="la la-calendar-check-o"></i> ${formatDate(
                      startTime
                    )}</a>
            </div>
        </div>
    </div>`;
};

function encodeAddressToLongLat(address) {
  const geocoder = new google.maps.Geocoder();
  return geocoder.geocode({ address: address });
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  // Create LatLng objects
  var point1 = new google.maps.LatLng(lat1, lon1);
  var point2 = new google.maps.LatLng(lat2, lon2);

  // Calculate distance using geometry library
  var distance = google.maps.geometry.spherical.computeDistanceBetween(
    point1,
    point2
  );

  // Convert distance to miles
  var distanceInMiles = distance * 0.000621371;

  return distanceInMiles;
}

async function loadSidebarListings(listings) {
  var sidebarListings = document.getElementById("sidebarListings");
  var sidebarListingsContent = "";
  
  const sortedListings = sortPartiesByPromotedStatus(listings);

  for (listing of sortedListings) {
    const distance = await calculateDistance(
      listing.Latitude,
      listing.Longitude,
      40.50165524175918,
      -74.44824480993542
    );
    const response = await checkUserFavs(user_id, listing._id);
    sidebarListingsContent += listingHTML(
      listing._id,
      listing.Price,
      listing.Name,
      listing.Description,
      listing.AddressLine1,
      listing.City,
      listing.Zip,
      listing.State,
      listing.HostName,
      listing.StartDate,
      listing.EndDate,
      listing.Promoted,
      response,
      distance.toFixed(3),
      listing.Discounted,
      listing.originalPrice
    );
  }

  sidebarListings.innerHTML = sidebarListingsContent;
  //use below code to zoom in on a marker from listing
  //   var sidebarListingsItems = sidebarListings.getElementsByClassName("item");
  //   for (var i = 0; i < sidebarListingsItems.length; i++) {
  //     sidebarListingsItems[i].addEventListener("click", function (e) {
  //       var markerId = parseInt(this.getAttribute("data-marker-id"));
  //       map.setCenter(markers[markerId].getPosition());
  //       google.maps.event.trigger(markers[markerId], "click");
  //     });
  //   }
}

// Promoted Parties Appear first in Listing
function sortPartiesByPromotedStatus(parties) {
  return parties.sort((a, b) => b.Promoted - a.Promoted);
}

function formatDate(inputDate) {
  const options = {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
    timeZoneName: "short",
  };

  const dateObj = new Date(inputDate);
  const formattedDate = dateObj.toLocaleDateString("en-US", options);
  return formattedDate;
}

function toggleFavErrorModal(show) {
  $("#errorFavModal").modal("show");
}

function favoriteParty(party_id, isFavorited) {
  const testing = true;
  isLoggedIn = testing ? true : isLoggedIn();
  const user_id = "3d6985d6-2f06-493d-82d1-d808e4bd7218";
  // if there are no users logged in, show error modal
  if (!isLoggedIn) {
    toggleFavErrorModal(true);
  } else {
    if (isFavorited) {
      removePartyFromFavorites(user_id, party_id).then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("success");
          // if the party was removed from favorites successfully, show success modal
        } else {
          // if the party was not removed from favorites successfully, show error modal
          toggleFavErrorModal(true);
        }
      });
      const favButton = document.getElementById(party_id);
      favButton.innerHTML = "<i class='la la-heart-o'></i>";
      favButton.onclick = function () {
        favoriteParty(party_id, false);
      };
    } else {
      addPartyToFavorites(user_id, party_id).then((response) => {
        console.log(response);
        if (response.status === 201) {
          $("#successFavModal").modal("show");
        } else {
          // if the party was not added to favorites successfully, show error modal
          toggleFavErrorModal(true);
        }
      });
      const favButton = document.getElementById(party_id);
      favButton.innerHTML =
        "<i class='bx bxs-heart' style='color:#d57d19'></i>";
      favButton.onclick = function () {
        favoriteParty(party_id, true);
      };
    }
    // if there is a user logged in, add party to favorites
  }
}

function isLoggedIn() {
  return false;
}

async function checkUserFavs(user_id, party_id) {
  const response = await isInFavorites(user_id, party_id);
  return response.json();
}
