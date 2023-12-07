// assets/js/map-cluster/getUserCurrentLocation.js
function requestUserLocation() {
  console.log("Requesting user location...");
  return new Promise((resolve, reject) => {
    // Check if we already have the location stored in sessionStorage
    const storedLocation = sessionStorage.getItem("userLocation");
    if (storedLocation) {
      console.log("Using stored location from sessionStorage.");
      const parsedLocation = JSON.parse(storedLocation);
      showPosition(parsedLocation); // Display the stored location
      return resolve(parsedLocation);
    }

    const options = {
      enableHighAccuracy: true,
      timeout: 10000,
    };

    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log("getCurrentPosition callback called.");
        if (position && position.coords) {
          // Store the location in sessionStorage
          const coordinates = position.coords;
          sessionStorage.setItem("userLocation", JSON.stringify(coordinates));
          showPosition(coordinates); // Display the current location
          console.log("User location obtained successfully.");
          resolve(coordinates);
        } else {
          console.log("Position or coordinates are undefined.");
          reject(new Error("Unable to retrieve user location coordinates."));
        }
      },
      (error) => {
        console.log("Error in getCurrentPosition callback:", error);
        if (error.code === error.PERMISSION_DENIED) {
          // If permission is denied, remove any stored location
          sessionStorage.removeItem("userLocation");
          console.log("Geolocation permission denied.");
        }
        reject(error);
      },
      options
    );
  });
}

function showPosition(position) {
  if (position && position.coords) {
    const coordinates = position.coords;
    console.log(
      "Latitude: " + coordinates.latitude + ", Longitude: " + coordinates.longitude
    );
  } else {
    console.log("Unable to retrieve user location coordinates.");
  }
}

function showError(error) {
  switch (error.code) {
    case error.PERMISSION_DENIED:
      console.log("User denied the request for Geolocation.");
      break;
    case error.POSITION_UNAVAILABLE:
      console.log("Location information is unavailable.");
      break;
    case error.TIMEOUT:
      console.log("The request to get user location timed out.");
      break;
    case error.UNKNOWN_ERROR:
      console.log("An unknown error occurred.");
      break;
  }
}
