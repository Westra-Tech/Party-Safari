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
  });

  const iconContainer = document.createElement("div");

  const icon =
    '<i class="fa fa-pizza-slice fa-lg" style="font-size:auto" ></i>';
  iconContainer.className = "map-marker-container";
  iconContainer.innerHTML =
    '<div class="marker-container"><div class="marker-card"><div class="front face">' +
    icon +
    '</div><div class="back face">' +
    icon +
    '</div><div class="marker-arrow"></div></div></div>';

  const faPin = new PinElement({
    glyph: iconContainer,
    glyphColor: "#ff8300",
    background: "#FFD514",
    borderColor: "#ff8300",
    scale: 1.5,
  });
  const faMarker = new AdvancedMarkerElement({
    map,
    position: { lat: 40.5, lng: -74.448 },
    content: faPin.element,
    title: "A marker using a FontAwesome icon for the glyph.",
  });
}

async function addMarkersToMap(markers) {
  let allMarkers = [];
  let newMarkerObject;
  for (let i = 0; i < markers.length; i++) {
    (newMarkerObject = document.createElement("div")).className =
      "map-marker-container";
    newMarkerObject.innerHTML =
      '<div class="marker-container"><div class="marker-card"><div class="front face">' +
      icon +
      '</div><div class="back face">' +
      icon +
      '</div><div class="marker-arrow"></div></div></div>';

    const marker = markers[i].icon;
    const icon = document.createElement("div");

    icon.innerHTML = `<i class="fa fa-pizza-slice fa-lg" style="font-size: 212px;"></i>`;

    const pin = new PinElement({
      glyph: icon,
      glyphColor: "#ff8300",
      background: "#FFD514",
      borderColor: "#ff8300",
    });
    allMarkers.push(
      new AdvancedMarkerElement({
        map,
        position: { lat: 40.5, lng: -74.448 },
        content: pin.element,
        title: "A marker using a FontAwesome icon for the glyph.",
        scale: 10,
      })
    );
  }
}

function newListing(link, imgSource, locationName, address) {
  return (
    '<a href="' +
    link +
    '" class="listing-img-container"><div class="infoBox-close"><i class="fa fa-times"></i></div><img src="' +
    imgSource +
    '" alt=""><div class="rate-info"> <h5>$550.000</h5> <span>PARTY!</span> </div><div class="listing-item-content"><h3>' +
    locationName +
    "</h3><span><i class='la la-map-marker'></i>" +
    address +
    "</span></div></a>"
  );
}

initMap();
