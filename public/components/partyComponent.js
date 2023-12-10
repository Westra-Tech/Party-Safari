// This component is used to create custom object that will display basic party information. 
// When clicked on, it will provide more options
class partyComponent extends HTMLElement {
    constructor() {
        super();

    }
  
    connectedCallback() {
        this.title = this.getAttribute('title');
        this.description = this.getAttribute('description');
        this.startDate = this.getAttribute('startDate');
        this.location = this.getAttribute('location');

        this.render();
    }
  
    render() {
        this.innerHTML = `
        <div class="party-item-display">
            <div class="square-image-container">
                <img class="shrunk-party-image" src="https://media.gettyimages.com/id/130899584/photo/crowd-of-people-at-concert-waving-arms-in-the-air.jpg?s=612x612&w=0&k=20&c=iyYp5ajkWBsX65f_8AS1V8YVAw_WHyRItrcs5QzHm0A=">
            </div>

            <div class="brief-party-details">
                <p id="title">${this.title}</p>
                <p id="location-date">${this.location}  |  ${this.startDate}</p>
                <p id="description">${this.description}</p>
            </div>

            <div class="party-modifying-options">
                <button id="edit-listing-button" class="listing-button">Edit Listing</button>
                <button id="manage-attendance-button" class="listing-button">Manage Attendance</button>
                <button id="delete-listing-button" class="listing-button">Delete Listing</button>
            </div>
            <div id="delete-confirmation" class="delete-confirmation-container">
                <div class="delete-confirmation-content">
                    <p>Are you sure you want to delete?</p>
                    <div class="delete-confirmation-buttons">
                        <button id="confirmDeleteButton">Delete</button>
                        <button id="cancelDeleteButton">Cancel</button>
                    </div>
                </div>
            </div>
        </div>
        
        `;

        const deleteButton = this.querySelector('#delete-listing-button');
        const deletePopUp = this.querySelector('#delete-confirmation');
        const confirmDeleteButton = this.querySelector('#confirmDeleteButton');
        const cancelDeleteButton = this.querySelector('#cancelDeleteButton');


        deleteButton.addEventListener('click', () => {
            deletePopUp.style.display = 'block';
        });

        // hide pop up after confirming delete
        confirmDeleteButton.addEventListener('click', () => {
            deletePopUp.style.display = 'none';
        });

        // hide pop up after confirming cancel
        cancelDeleteButton.addEventListener('click', () => {
            deletePopUp.style.display = 'none';
        });

    }


  }
  
  customElements.define("party-component", partyComponent);
  
  // NOTE: CUSTOM ELEMENTS NEED AT LEAST 1 HYPHEN