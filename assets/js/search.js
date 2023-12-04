// document
//   .getElementById("searchFilterSubmit")
//   .addEventListener("click", function () {
//     console.log("searchFilterSubmit clicked");
//     var formData = new FormData(event.target);
//     var searchParams = new URLSearchParams(formData).toString();
//     console.log("searchParams", searchParams);
//     fetch("http:localhost:8000/map/party_listings_by_filters?" + searchParams)
//       .then((response) => response.json())
//       .then((data) => {
//         // Update the sidebar with the new parties
//         loadSidebarListings(data.parties);
//         console.log("parties: ", data.parties);
//         // Update the map markers with the new parties
//         initMap(data.parties);
//       })
//       .catch((error) => {
//         console.error("Error:", error);
//       });
//   });

// function submitSearch() {
//   console.log("searchFilterSubmit clicked");
//   var formData = new FormData(event.target);
//   var searchParams = new URLSearchParams(formData).toString();
//   console.log("searchParams", searchParams);
//   fetch("http:localhost:8000/map/party_listings_by_filters?" + searchParams)
//     .then((response) => response.json())
//     .then((data) => {
//       // Update the sidebar with the new parties
//       loadSidebarListings(data.parties);
//       console.log("parties: ", data.parties);
//       // Update the map markers with the new parties
//       initMap(data.parties);
//     })
//     .catch((error) => {
//       console.error("Error:", error);
//     });
// }

// Handle form submission: send form data to endpoint and send response to map.js and sidebarListings.js
document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    var searchParams = new URLSearchParams(formData).toString();
    console.log("searchParams", searchParams);
    fetch("http:localhost:8000/map/party_listings_by_filters?" + searchParams)
      .then((response) => response.json())
      .then((data) => {
        // Update the sidebar with the new parties
        loadSidebarListings(data.parties);
        clearAllMarkersFromMap();
        addMarkersToMap(data.parties);
        console.log("parties: ", data.parties);
        // Update the map markers with the new parties
        // initMap(data.parties);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

// Handle dropdown selection
document.addEventListener("DOMContentLoaded", function () {
  const dropMenu = document.querySelector(".drop-menu");
  const displaySpan = dropMenu.querySelector(".select > span");
  const hiddenInput = dropMenu.querySelector('input[type="hidden"]');

  dropMenu.querySelectorAll(".dropeddown > li").forEach((item) => {
    item.addEventListener("click", function () {
      displaySpan.textContent = this.textContent;
      hiddenInput.value = this.getAttribute("data-value");
      dropMenu.classList.remove("open");
    });
  });

  // Handle dropdown open
  dropMenu.querySelector(".select").addEventListener("click", function () {
    dropMenu.classList.toggle("open");
  });
});

// Handle "Next Page" button click
document
  .getElementById("nextPageButton")
  .addEventListener("click", function () {
    var pageInput = document.querySelector('input[name="page"]');
    pageInput.value = Number(pageInput.value || 0) + 1;

    var event = new Event("submit");
    document.getElementById("searchForm").dispatchEvent(event);
  });

// Handle "Previous Page" button click
document
  .getElementById("prevPageButton")
  .addEventListener("click", function () {
    var pageInput = document.querySelector('input[name="page"]');
    var currentPage = Number(pageInput.value || 1);
    if (currentPage > 1) {
      pageInput.value = currentPage - 1;

      var event = new Event("submit");
      document.getElementById("searchForm").dispatchEvent(event);
    }
  });
