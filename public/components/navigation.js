class NavigationBar extends HTMLElement {
    constructor() {
      super();
  
    }
  
    connectedCallback() {
      this.render();
    }
  
    render() {
        this.innerHTML = `
        <p class="logo">PartySafari</p>
        <div id="nav-bar-container" class="nav_bar_container">
            <ul>
                <li id="home"><a href="#">Home</a></li>
                <li id="map"><a href="#">Map</a></li>
                <li id="contact"><a href="#">Contact</a></li>
            </ul>
      
        </div>
        `;

        // ADD EVENT LISTENERS
        const home = this.querySelector('#home'); // home button
        const map = this.querySelector('#map'); // this is the text content of the review
        const contact = this.querySelector('#contact'); // this is the text content of the review

        home.addEventListener('click', () => {
          window.location.href = '/';
        });

        map.addEventListener('click', () => {
          window.location.href = '/partyMap';
        });

        contact.addEventListener('click', () => {
          window.location.href = '/';
        });



    }



  }
  
  customElements.define("nav-bar", NavigationBar);
  
  // NOTE: CUSTOM ELEMENTS NEED AT LEAST 1 HYPHEN