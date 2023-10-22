let map;

async function initMap() {
  let zoom = document.getElementById("map").getAttribute("data-map-zoom");

  const position = { lat: 40.50165524175918, lng: -74.44824480993542 };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: parseFloat(zoom),
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Rutgers University",
  });
}

async function addMarkersToMap(marker) {
  const { MarkerClusterer } = await google.maps.importLibrary(
    "markerclusterer"
  );

  const markers = [];

  const clusterer = new MarkerClusterer(map, markers, {
    imagePath:
      "https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m",
  });
}

initMap();
