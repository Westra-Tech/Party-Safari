// sends a request to the server to pull all of the host's information
async function getUserByUsername(username){
    const url = new URL('/api/users/get-user-by-username', 'http://localhost:8080');
    url.searchParams.append('user_id', username);
  
    const options = {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        } 
    };
  
  
    fetch(url, options)
    .then(response => response.json())
    .then(data => {
        console.log(data[0]);
        // process the response data
        // return data;
    })
    .catch(error => {
        console.error(error);
        // handle the error
        // return data.json();
    });
   
}
