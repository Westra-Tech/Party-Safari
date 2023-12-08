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
// assets/js/search.js
let allParties = []; // Global array to store all parties
let currentPage = 1;
const partiesPerPage = 4; // Number of parties to show per page

document
  .getElementById("searchForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    var formData = new FormData(event.target);
    var searchParams = new URLSearchParams(formData).toString();
    const user_id = "3d6985d6-2f06-493d-82d1-d808e4bd7218";

    fetch(
      "http://localhost:8000/map/party_listings_by_filters?" +
        searchParams +
        "&user_id=" +
        user_id
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        allParties = data.parties; // Store parties in the global array
        clearAllMarkersFromMap();
        addMarkersToMap(data.parties); // Add all parties to the map
        paginateParties(1); // Load first page of parties in the sidebar
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

function paginateParties(page) {
  currentPage = page; // Update the current page
  const startIndex = (page - 1) * partiesPerPage;
  const endIndex = startIndex + partiesPerPage;
  const partiesToShow = allParties.slice(startIndex, endIndex);
  loadSidebarListings(partiesToShow); // Load listings for current page
  updatePaginationButtons(); // Update the state of pagination buttons
}

function updatePaginationButtons() {
  const nextPageButton = document.getElementById("nextPageButton");
  const prevPageButton = document.getElementById("prevPageButton");

  nextPageButton.disabled = currentPage * partiesPerPage >= allParties.length;
  prevPageButton.disabled = currentPage === 1;
}

document.addEventListener("DOMContentLoaded", function () {
  const dropMenu = document.querySelector(".drop-menu");
  const displaySpan = dropMenu.querySelector(".select > span");
  const hiddenInput = dropMenu.querySelector('input[type="hidden"]');

  dropMenu.querySelectorAll(".dropeddown > li").forEach((item) => {
    item.addEventListener("click", function () {
      displaySpan.textContent = this.textContent;
      hiddenInput.value = this.getAttribute("data-value");
      dropMenu.classList.remove("open");
      // Trigger the search form submission to re-fetch and sort the parties
      document.getElementById("searchForm").dispatchEvent(new Event("submit"));
    });
  });

  dropMenu.querySelector(".select").addEventListener("click", function () {
    dropMenu.classList.toggle("open");
  });

  const nextPageButton = document.getElementById("nextPageButton");
  const prevPageButton = document.getElementById("prevPageButton");

  nextPageButton.addEventListener("click", function () {
    if (currentPage * partiesPerPage < allParties.length) {
      currentPage++;
      paginateParties(currentPage);
    }
  });

  prevPageButton.addEventListener("click", function () {
    if (currentPage > 1) {
      currentPage--;
      paginateParties(currentPage);
    }
  });

  // Initial pagination setup on page load
  paginateParties(currentPage);
});
