var map;
var allMarkers = [];

async function initMap() {
  let zoom = document.getElementById("map").getAttribute("data-map-zoom");
  var defaultPosition = { lat: 40.50165524175918, lng: -74.44824480993542 };
  var defaultZip = "08901";

  requestUserLocation()
    .then((position) => {
      if (position) {
        defaultPosition = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        defaultZip = position.coords.zip;
        console.log("defaultPosition", defaultPosition, defaultZip);
      }
    })
    .catch((e) => console.log("Error getting user location, denied", e));

  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: parseFloat(zoom),
    center: defaultPosition,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapId: "a9ad8d72f2c5e145",
    disableDefaultUI: true,
  });
  initAutocomplete();

  // get all parties from the database
  await showParties(defaultZip);
}

async function showParties(zip) {
  const response = await fetchMapDataForLocation(zip);
  response.json().then((data) => {
    console.log(data);
    loadSidebarListings(data);
    addMarkersToMap(data);
  });
}

function clearAllMarkersFromMap() {
  allMarkers.map((marker) => {
    marker.setMap(null);
  });
  allMarkers = [];
}

/* Add Markers to the map
 each marker object must have attributes: lat, lng, title
*/
async function addMarkersToMap(markers) {
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
  let latlng;

  markers.map((marker) => {
    if (!marker.Latitude || !marker.Longitude) {
      geocodeAddress(marker.AddressLine1).then((encLoc) => {
        latlng = encLoc.results[0].geometry.location;
        const faMarker = new AdvancedMarkerElement({
          map,
          position: latlng,
          content: createNewMarker(),
          title: marker.Name,
        });
        faMarker.addListener("click", () => {
          window.location.href = "partyDetail.html?party_id=" + marker._id;
        });
        allMarkers.push(faMarker);
      });
    } else {
      latlng = new google.maps.LatLng(marker.Latitude, marker.Longitude);
      const faMarker = new AdvancedMarkerElement({
        map,
        position: latlng,
        content: createNewMarker(),
        title: marker.Name,
      });
      faMarker.addListener("click", () => {
        window.location.href = "partyDetail.html?party_id=" + marker._id;
      });
      allMarkers.push(faMarker);
    }
  });
}

function createNewMarker() {
  const iconContainer = document.createElement("div");
  const icon = '<i class="bx bx-party"></i>';
  iconContainer.className = "map-marker-container";
  iconContainer.innerHTML =
    '<div class="marker-container"><div class="marker-card"><div class="front face">' +
    icon +
    '</div><div class="back face">' +
    icon +
    '</div><div class="marker-arrow"></div></div></div>';
  return iconContainer;
}

async function geocodeAddress(address) {
  const geocoder = new google.maps.Geocoder();
  return geocoder.geocode({ address: address });
  // .then((results) => {
  //   console.log("results", results, results.results[0].geometry.location);
  // map.setCenter(results.results[0].geometry.location);
  // new google.maps.Marker({
  //   map,
  //   position: results.results[0].geometry.location,
  // });
  // return results.results[0].geometry.location;
  // })
  // .catch((e) => console.log("Error trying to geocode address", e));
}

function initAutocomplete() {
  const input = document.querySelector("#addressSearch");
  const autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      map.setCenter(place.geometry.location);
      console.log("changed place", place);

      let address = "";
      let city = "";

      place.address_components.forEach((component) => {
        if (component.types.includes("locality")) {
          city = component.long_name;
        }
        if (component.types.includes("street_number")) {
          address += component.long_name;
        }
        if (component.types.includes("route")) {
          address += " " + component.long_name;
        }
      });

      if (address) {
        clearAllMarkersFromMap();
        showParties(address);
      } else {
        clearAllMarkersFromMap();
        showParties(city);
      }
    }
  });
}

initMap();
