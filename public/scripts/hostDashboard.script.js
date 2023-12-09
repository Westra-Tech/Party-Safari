 // sends a request to the server to pull all of the host's parties
// returns "success" or "fail" responses
async function getPartiesByHost(id){
    const url = new URL('/api/parties/get-parties-by-host', 'http://localhost:8080');
    url.searchParams.append('host-id', id);
  
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      } 
    };
  
  
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
      console.log("me " + data.message);
      // process the response data
      return data;
    })
    .catch(error => {
      console.error(error);
      // handle the error
      return data.json();
    });
   
  
  }
  
  // sends a request to the server to generate a qr code, which will be inserted into the html object
  // returns the url that is to be inserted into <img src="${url}" alt="QR Code">
  
    
  async function updateMyEvents(){
    const customElement = document.createElement('party-component');
    customElement.setAttribute("title", "t");
    customElement.setAttribute("description", "desc");
    customElement.setAttribute("startDate", "10/5");

    console.log(customElement.getAttribute('description'));
    // Step 3: Get a reference to the <div> element
    const divElement = document.getElementById('scrollable-events-data');

    // Step 4: Append the custom element to the <div>
    divElement.appendChild(customElement);

    
  }

