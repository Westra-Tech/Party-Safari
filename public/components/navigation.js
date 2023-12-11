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
                <li id="profile"><img id="pfp" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" loading="lazy" width="52" alt=""></li>
            </ul>
            <div id="profile-menu-container">
                <ul id="profile-menu">
                    <li id="myProfile" class="user-option"><a href="#">My Profile</a></li>
                    <li><hr></hr></li>
                    <li id="cart" class="user-option"><a href="#">Cart</a></li>
                    <li id="dashboard" class="user-option"><a href="#">Dashboard</a></li>
                    <li id="logout" class="user-option"><a href="#">Logout</a></li>
                </ul>
            </div>
        </div>

        `;

        // ADD EVENT LISTENERS
        const home = this.querySelector('#home'); // home button
        const map = this.querySelector('#map'); // this is the text content of the review
        const pfp = this.querySelector('#profile');
        const login = this.querySelector('#login');
        const register = this.querySelector('#register');
        const menu = this.querySelector('#profile-menu-container');
        const cart = this.querySelector('#cart');
        const dashboard = this.querySelector('#dashboard');
        const logout = this.querySelector('#logout');

        if(window.location.href === 'http://localhost:8080/login'){
          login.style.display = 'none'; 
          register.style.display = 'none';
        }

        if(window.location.href === 'http://localhost:8080/profile'){
          login.style.display = 'none'; 
          register.style.display = 'none';
          pfp.style.display = 'flex';
        }

        if(window.location.href === 'http://localhost:8080/host-dashboard'){
          login.style.display = 'none'; 
          register.style.display = 'none';
          pfp.style.display = 'flex';
          cart.style.display = 'none';
        }

        login.addEventListener('click', () => {
          login.style.display = 'none'; 
          register.style.display = 'none';
          window.location.href = '/login';

        });

        register.addEventListener('click', () => {
          login.style.display = 'none'; 
          register.style.display = 'none';
          window.location.href = '/login';
        });

        logout.addEventListener('click', () => {
          window.location.href = '/sendlogout';
        });

        home.addEventListener('click', () => {
          window.location.href = '/';
        });

        map.addEventListener('click', () => {
          window.location.href = '/partyMap';
        });

        pfp.addEventListener('click', () => {
          menu.style.display = 'flex';

          //check if party host
        });

        dashboard.addEventListener('click', () => {
          login.style.display = 'none'; 
          register.style.display = 'none';
          window.location.href = '/host-dashboard';

        });

        //hide menu if click outside of it
        document.addEventListener('click', (event) => {
          const isClickInsideMenu = menu.contains(event.target);
          const isClickOnProfile = pfp.contains(event.target);

          if(!isClickInsideMenu && (menu.style.display == 'flex') && !isClickOnProfile){
            menu.style.display = 'none';
          }

        })


        // menu event listeners


    }



  }
  
  customElements.define("nav-bar", NavigationBar);
  
  // NOTE: CUSTOM ELEMENTS NEED AT LEAST 1 HYPHEN