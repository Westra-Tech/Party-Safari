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
  endTime
) => {
  return `
    <div class="col-lg-6 col-md-6">
        <div class="card">
            <a href="partyDetail.html?party_id=${id}" title="">
                <div class="img-block">
                    <div class="overlay"></div>
                    <img src="assets/images/listing/1.jpg" alt=""
                        class="img-fluid">
                    <div class="rate-info">
                        <h5>$${price}</h5>
                        <span>Party</span>
                    </div>
                </div>
            </a>
            <div class="card-body">
                <a href="partyDetail.html" title="">
                    <h3>${title}</h3>
                    <p>
                        <i class="la la-map-marker"></i>${addressLine}, ${city}, ${state} ${zip}
                    </p>
                </a>
                <ul>
                    <li>${host}</li>
                    
                </ul>
                <p>${description}</p>
            </div>
            <div class="card-footer">
                <a class="pull-left" onclick="favoriteParty('${id}')">
                    <i class="la la-heart-o"></i>
                </a>
                <a href="#" class="pull-right">
                    <i class="la la-calendar-check-o"></i> ${formatDate(
                      startTime
                    )}</a>
            </div>
            <a href="partyDetail.html" title="" class="ext-link"></a>
        </div>
    </div>`;
};

function loadSidebarListings(listings) {
  var sidebarListings = document.getElementById("sidebarListings");
  var sidebarListingsContent = "";
  console.log("typeof", listings, typeof listings);
  listings.map((listing) => {
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
      listing.EndDate
    );
  });

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

function favoriteParty(party_id) {
  console.log(party_id);
  // if there are no users logged in, show error modal
  if (isLoggedIn) {
    toggleFavErrorModal(true);
  }
}

function isLoggedIn() {
  return false;
}
