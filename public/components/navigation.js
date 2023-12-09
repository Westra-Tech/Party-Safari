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
            </ul>
            <ul class="accountLoginOptions">
                <li id="login"><a href="#">Login</a></li>
                <li id="register"><a href="#">Register</a></li>
            </ul>
            

      
        </div>
        `;
//                <li><img id="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" loading="lazy" width="52" alt="">

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


    }



  }
  
  customElements.define("nav-bar", NavigationBar);
  
  // NOTE: CUSTOM ELEMENTS NEED AT LEAST 1 HYPHEN