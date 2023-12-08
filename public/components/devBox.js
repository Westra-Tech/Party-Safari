class DevBox extends HTMLElement {
    constructor() {
        super();
    }
    connectedCallback() {
        this.render();
    }
    render() {
        this.innerHTML = `
        <!-- Developer's Box -->
        <div id="dev-box" style="background-color: #f9f9f9; padding: 20px; margin-top: 20px;">
        <h2>Developer's Testing Box</h2>

        <!-- Login Section -->
        <h3>Login</h3>
        <div class="input-group">
            <label for="dev-username">Username:</label>
            <input type="text" id="dev-username" name="dev-username" required>

            <label for="dev-password">Password:</label>
            <input type="password" id="dev-password" name="dev-password" required>

            <button id="login-button">Login</button>
            <span id="login-status">Status: <span id="user-database-response">Awaiting login...</span></span>
        </div>

        <hr>

        <!-- Review Creation Section -->
        <h3>Write a Review</h3>
        <label for="dev-party-dropdown">Choose a party:</label>
        <select id="dev-party-dropdown">
            <!-- Options will be populated later -->
        </select>

        <div class="input-group">
            <label for="dev-review-rating">Rating:</label>
            <input type="number" id="dev-review-rating" name="rating" min="0" max="10" step="1">
            <label for="dev-review-title">Review Title:</label>
            <input type="text" id="dev-review-title" name="review_title">
            <label for="dev-review-text">Review Text:</label>
            <textarea id="dev-review-text" name="review_text" rows="4"></textarea>
            <button id="dev-submit-button">Submit</button>
            <span id="review-submit-status">Status: <span id="review-database-response">Awaiting review submission...</span></span>
        </div>
        <hr>

        <!-- Viewing Items Section -->
        <h3>View Reviews</h3>
        <label for="dev-reviews-by-party-dropdown">By party:</label>
        <select id="dev-reviews-by-party-dropdown">
            <!-- Options will be populated later -->
        </select>

        <button id="filter-by-party-button">Filter By Party</button>

        <button id="filter-by-user-button">View My Reviews</button>
        <span id="query-status">Status: <span id="view-message">Awaiting query...</span></span>

        </div>
        `;

        

        var reviewPartyIndex = 0;
        var viewPartyIndex = 0;
        
        window.onload = () => {
            fetchNLatestReviewsByID('b3df52a9-ebd7-4e70-8bdc-b5ec0fab6441', '', 10);
            fetchLatestParties(10);
        };
        
        // Wait for the DOM to be fully loaded
        document.addEventListener('DOMContentLoaded', function () {
        
        // USER LOGIN
            document.getElementById('login-button').addEventListener('click', function () {
            login(
            document.getElementById('dev-username').value,
            document.getElementById('dev-password').value
            );
        });
        
        // CHOOSE PARTY TO REVIEW
        document.getElementById('dev-party-dropdown').addEventListener('change', function () {
            reviewPartyIndex = this.selectedIndex; // 'this' refers to the dropdown element
        });
        
        // SUBMIT REVIEW
        document.getElementById('dev-submit-button').addEventListener('click', function () {
            var partyArray = JSON.parse(sessionStorage.getItem('party_array'));
            submitReview(
            partyArray[reviewPartyIndex]._id, // Party ID
            sessionStorage.getItem('user_id'), // User ID
            document.getElementById('dev-review-rating').value, // Rating
            document.getElementById('dev-review-title').value, // Review title
            document.getElementById('dev-review-text').value // Review text
            );
        });
        
        // CHOOSE PARTY TO VIEW
        document.getElementById('dev-reviews-by-party-dropdown').addEventListener('change', function () {
            viewPartyIndex = this.selectedIndex; // 'this' refers to the dropdown element
        });
        
        // FILTER BY PARTY
        document.getElementById('filter-by-party-button').addEventListener('click', function () {
            var partyArray = JSON.parse(sessionStorage.getItem('party_array'));
            const queryMessage = document.getElementById('query-status');
            queryMessage.textContent = 'Queried by party.';
            fetchNLatestReviewsByID(partyArray[viewPartyIndex]._id, '', 10);
        });
        
        // FILTER BY CURRENT USER LOGGED IN
        document.getElementById('filter-by-user-button').addEventListener('click', function () {
            var userID = sessionStorage.getItem('user_id');
            const queryMessage = document.getElementById('query-status');
            if (!userID) {
            queryMessage.textContent = 'Please login first.';
            } else {
            queryMessage.textContent = 'Queried by user.';
            fetchNLatestReviewsByID('', sessionStorage.getItem('user_id'), 10);
            }
        });
        });
    }
}

customElements.define('dev-box', DevBox);