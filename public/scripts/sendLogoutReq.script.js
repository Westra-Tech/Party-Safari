function sendLogoutReq(){
  
                
                // Construct URL with query parameters
                const url = `http://localhost:8080/sendlogout`;
                
                fetch(url, {
                    method: 'GET'
                })
                .then(response => {
                    if (response.ok) {
                        console.log('req ok');
                        window.location.href = '/login';
                    } else {
                        console.log('req not ok');
                        window.location.href = '/loginfail'
                    }
                })
                .then(data => {
                    // Handle the response here, redirect if 'ok' or other logic
                    console.log(data);
                    // Example redirection if data is 'ok'
                    //if (data === 'ok') {
                        //window.location.href = '/profile'; // Change to your profile URL
                    //}
                })
                .catch(error => {
                    console.error('Error:', error);
                });

                return false;
}