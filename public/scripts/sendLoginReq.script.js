function sendLoginReq(event){
    console.log('req got');
    event.preventDefault(); // Prevent form submission
                const form = event.target;
                const formData = new FormData(form);
                
                // Get username and password from form data
                const username = formData.get('username');
                const password = formData.get('password');
                console.log(username);
                console.log(password);
                
                // Construct URL with query parameters
                const url = `http://localhost:8080/sendlogin?username=${username}&password=${password}`;
                
                fetch(url, {
                    method: 'GET'
                })
                .then(response => {
                    if (response.ok) {
                        console.log('req ok');
                        window.location.href = '/profile';
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