// sends a request to the server to pull all of the host's information
async function getUserInformation(id){
    const url = new URL('/api/users/get-user-by-username', 'http://localhost:8080');
    url.searchParams.append('username', id);
  
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        } 
    };
  
  
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        updateUserInformation(data[0]);
        // process the response data
        // return data;
    })
    .catch(error => {
        console.error(error);
        // handle the error
        // return data.json();
    });
   
}

async function updateUserInformation(json){

    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const phone = document.getElementById('phone');
    const username = document.getElementById('username');

    name.textContent = json.name;
    email.textContent = json.email_address;
    phone.textContent =json.phone_number;
    username.textContent = json.username;

}

//gets username of latest user and updates page
async function getLatestUserUsername(){
    const url = new URL('/api/users/get-latest-user', 'http://localhost:8080');
  
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        } 
    };
  
  
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log(data.username);
        getUserInformation(data.username);
        // process the response data
        return data.username;
    })
    .catch(error => {
        console.error(error);
        // handle the error
        // return data.json();
        return "";
    });
}

// on page load, update events list


getLatestUserUsername();
