function formatDate(dateString) {
  // Create a new instance of DateTimeFormat with desired options
  const formatter = new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short', // omit time zone information if not needed
    hour12: true // Use 12-hour time (use `false` for 24-hour format)
  });
  // Convert the input date string to a Date object
  const date = new Date(dateString);
  // Use the formatter to get the formatted date string
  return formatter.format(date);
}

// Fetches from temporary users collection users_co
function login(username, password) {
  const url = new URL('/api/users/login', 'http://localhost:8080');
  url.searchParams.append('username', username);
  url.searchParams.append('password', password);

  fetch(url)
    .then(response => {
      const databaseResponse = document.getElementById('user-database-response');
      if (!response.ok) {
        sessionStorage.setItem('user_id', '');
        databaseResponse.textContent = 'Login failed. Please try again.';
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const databaseResponse = document.getElementById('user-database-response');
      if (data.user_id) {
        sessionStorage.setItem('user_id', data.user_id);
        databaseResponse.textContent = 'Login successful. User_id: ' + data.user_id;
      } else {
        console.error('Login failed:', data);
      }
    })
    .catch(error => {
      console.error('Fetch error:', error);
    });
}

// Fetches from temporary parties collection parties_co
function fetchLatestParties(num) {
  const url = new URL('/api/parties/get-latest-n', 'http://localhost:8080');
  url.searchParams.append('N', num);
  
  fetch(url)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      sessionStorage.setItem('party_array', JSON.stringify(data));
      populatePartyDropdown('dev-party-dropdown', data);
      populatePartyDropdown('dev-reviews-by-party-dropdown', data);
    })
    .catch(error => {
      console.error('Fetching error:', error);
    });
}

function populatePartyDropdown(dropdownId, parties) {
  const select = document.getElementById(dropdownId);
  select.innerHTML = '';
  parties.forEach(party => {
    const option = document.createElement('option');
    
    option.textContent = party.Name || party;

    select.appendChild(option);
  });
}



async function submitReview(partyID, userID, rating, reviewTitle, reviewText) {
  try {
    const url = new URL('/api/reviews/create', 'http://localhost:8080');

    // Check if userID is provided
    if (!userID) {
      throw new Error('Please login first.');
    }
    if (!partyID) {
      throw new Error('Please select a party first.');
    }

    // Append parameters to the URL
    url.searchParams.append('user_id', userID);
    url.searchParams.append('party_id', partyID);
    url.searchParams.append('review_date', new Date().toISOString());
    url.searchParams.append('rating', rating);
    url.searchParams.append('review_title', reviewTitle);
    url.searchParams.append('review_text', reviewText);

    // Options for the fetch call
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: userID,
        party_id: partyID,
        rating: rating,
        review_title: reviewTitle,
        review_text: reviewText
      }),
    };

    // Perform the network request
    const response = await fetch(url, options);
    const databaseResponse = document.getElementById('review-database-response');
    // Check if the request was successful
    if (!response.ok) {
      response.text().then((text) => {
        databaseResponse.textContent = 'Review submission failed. ' + text;
      });
      throw new Error(`HTTP error! status: ${response.status}, ${await response.text()}`);
    }

    // Process the response (assuming JSON data)
    const data = await response.json();
    console.log('Review submitted successfully:', data);
    databaseResponse.textContent = 'Review submission successful.';
  } catch (error) {
    console.error('Error submitting review:', error);
  }
}


function fetchOneReviewByReviewID(reviewId) {
  const url = new URL('/api/reviews/get-one', 'http://localhost:8080');
  url.searchParams.append('review_id', reviewId);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        return response.text().then(body => {
          throw new Error(`HTTP error! status: ${response.status}, body: ${body}`);
        });
      }
      return response.json();
    })
    .then(data => {
      const reviewContainer = document.getElementById('reviews-container');
      const userReview = document.createElement('user-review');
      userReview.setAttribute('username', data.user_id);
      userReview.setAttribute('review-date', data.review_date);
      userReview.setAttribute('review-text', data.review_text);
      reviewContainer.appendChild(userReview);
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

function fetchNLatestReviewsByID(partyID, userID, num) {
  const url = new URL('/api/reviews/get-latest-n', 'http://localhost:8080');
  url.searchParams.append('party_id', partyID);
  url.searchParams.append('user_id', userID);
  url.searchParams.append('N', num);

  fetch(url)
    .then(response => {
      if (!response.ok) {
        return response.text().then(body => {
          throw new Error(`HTTP error! status: ${response.status}, body: ${body}`);
        });
      }
      return response.json();
    })
    .then(data => {
      const reviewsContainer = document.getElementById('reviews-container');
      reviewsContainer.innerHTML = ''; // Clear existing reviews

      data.forEach(review => {
        const userReview = document.createElement('user-review');
        userReview.setAttribute('review-id', review._id);
        userReview.setAttribute('review-title', review.review_title);
        userReview.setAttribute('username', review.username);
        userReview.setAttribute('review-date', formatDate(review.review_date));
        userReview.setAttribute('rating', review.rating);
        userReview.setAttribute('party-name', review.party_name);
        userReview.setAttribute('review-text', review.review_text);

        // userReview.innerHTML = `<div>...</div>`; 
        reviewsContainer.appendChild(userReview);
      });
    })
    .catch((error) => {
      console.error('Fetch error:', error);
    });
}

function editReivew(reviewID, userID, rating, reviewTitle, reviewText) {
  const url = new URL('/api/reviews/edit', 'http://localhost:8080');
  url.searchParams.append('review_id', reviewID);
  url.searchParams.append('user_id', userID);
  url.searchParams.append('rating', rating);
  url.searchParams.append('review_title', reviewTitle);
  url.searchParams.append('review_text', reviewText);
  fetch(url, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then(response => {
      if (!response.ok) {
        return response.text().then(body => {
          alert(body, "Please query again to see original review.");
          throw new Error(`HTTP error! status: ${response.status}, body: ${body}`);
        });
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error('There was an error editing the review:', error);
  })
  
}

function deleteReview(reviewID, userID) {
  const url = new URL('/api/reviews/delete', 'http://localhost:8080');
  url.searchParams.append('review_id', reviewID);
  url.searchParams.append('user_id', userID);
  fetch(url, {
    method: 'DELETE',
    headers: {
        'Content-Type': 'application/json',
    }
  })
  .then(response => {
      if (!response.ok) {
        return response.text().then(body => {
          alert(body);
          throw new Error(`HTTP error! status: ${response.status}, body: ${body}`);
        });
      }
      return response.json();
  })
  .then(data => {
      console.log(data);
  })
  .catch(error => {
      console.error('There was an error deleting the review:', error);
  });

}