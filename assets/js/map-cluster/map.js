var map;
function markerobj(googleLatLng, map, args, markerIcon) {
  (this.latlng = googleLatLng),
    (this.args = args),
    (this.markerIco = markerIcon);
  // this.setMap(map);
}

async function initMap() {
  let zoom = document.getElementById("map").getAttribute("data-map-zoom");

  const defaultPosition = { lat: 40.50165524175918, lng: -74.44824480993542 };
  const { Map } = await google.maps.importLibrary("maps");
  const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary(
    "marker"
  );

  map = new Map(document.getElementById("map"), {
    zoom: parseFloat(zoom),
    center: defaultPosition,
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    mapId: "a9ad8d72f2c5e145",
    disableDefaultUI: true,
  });

  // get all parties from the database
  const response = await fetch("http://localhost:3000/map?location=08901");
  response.json().then((data) => {
    console.log(data);
    // addMarkersToMap(data);
  });
  console.log(response);
}

// Add Markers to the map
// each marker object must have attributes: lat, lng, title
async function addMarkersToMap(markers) {
  let allMarkers = [];
  const iconContainer = document.createElement("div");
  const icon = '<i class="bx bx-party"></i>';
  iconContainer.className = "map-marker-container";
  iconContainer.innerHTML =
    '<div class="marker-container"><div class="marker-card"><div class="front face">' +
    icon +
    '</div><div class="back face">' +
    icon +
    '</div><div class="marker-arrow"></div></div></div>';
  for (let i = 0; i < markers.length; i++) {
    const faPin = new PinElement({
      glyph: iconContainer,
      glyphColor: "#ff8300",
      background: "#FFD514",
      borderColor: "#ff8300",
      scale: 1.5,
    });
    const faMarker = new AdvancedMarkerElement({
      map,
      position: { lat: markers[i].lat, lng: markers[i].lng },
      content: faPin.element,
      title: markers[i].title,
    });

    allMarkers.push(faMarker);
  }
}

initMap();
