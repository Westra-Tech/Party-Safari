class ReviewMenu extends HTMLElement {
    constructor() {
      super();
  
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
        this.innerHTML = `
        <div id="menu-container" class="menu_container">
            <ul id="menu" class="menu">
              <li><button id="edit" type="button">Edit</button></li>
              <li><button id="delete" type="button">Delete</button></li>
            </ul>
        </div>
        `;

        const editButton = this.querySelector('#edit');
        const c = this.querySelector('#menu-container');

        editButton.addEventListener('click', () => {
          console.log("edit");
          console.log(c.parentElement);
          // button.disabled = false;
        });
    }


  }
  
  customElements.define("review-menu", ReviewMenu);
  
  // NOTE: CUSTOM ELEMENTS NEED AT LEAST 1 HYPHEN