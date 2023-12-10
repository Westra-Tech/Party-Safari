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
        </div>
        `;

        
    }


  }
  
  customElements.define("party-component", partyComponent);
  
  // NOTE: CUSTOM ELEMENTS NEED AT LEAST 1 HYPHEN