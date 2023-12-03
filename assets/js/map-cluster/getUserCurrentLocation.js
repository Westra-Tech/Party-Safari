function requestUserLocation() {
  return new Promise((resolve, reject) => {
    // Check if we already have the location stored in sessionStorage
    const storedLocation = sessionStorage.getItem("userLocation");
    if (storedLocation) {
      return resolve(JSON.parse(storedLocation));
    }

    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state === "granted") {
          navigator.geolocation.getCurrentPosition((position) => {
            // Store the location in sessionStorage
            sessionStorage.setItem(
              "userLocation",
              JSON.stringify(position.coords)
            );
            resolve(position);
          }, reject);
        } else if (result.state === "prompt") {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              // Store the location in sessionStorage
              sessionStorage.setItem(
                "userLocation",
                JSON.stringify(position.coords)
              );
              resolve(position);
            },
            (error) => {
              if (error.code === error.PERMISSION_DENIED) {
                // If permission is denied, remove any stored location
                sessionStorage.removeItem("userLocation");
              }
              reject(error);
            }
          );
        } else if (result.state === "denied") {
          // Permission has been denied previously
          reject(new Error("Geolocation permission denied"));
        }
      });
  });
}

function showPosition(position) {
  console.log(
    "Latitude: " + position.latitude + ", Longitude: " + position.longitude
  );
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
