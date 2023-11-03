function initAutocomplete(map) {
  const input = document.querySelector("#addressSearch");
  const autocomplete = new google.maps.places.Autocomplete(input);

  autocomplete.addListener("place_changed", function () {
    const place = autocomplete.getPlace();
    if (place.geometry) {
      map.setCenter(place.geometry.location);
    }
  });
}
