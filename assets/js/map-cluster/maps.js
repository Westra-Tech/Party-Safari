!(function (event) {
  "use strict";
  function setupMap() {
    var infobox = new InfoBox();
    function newListing(e, t, o, l, i, s) {
      return (
        '<a href="' +
        e +
        '" class="listing-img-container"><div class="infoBox-close"><i class="fa fa-times"></i></div><img src="' +
        t +
        '" alt=""><div class="rate-info"> <h5>$550.000</h5> <span>For Rent</span> </div><div class="listing-item-content"><h3>' +
        o +
        "</h3><span><i class='la la-map-marker'></i>" +
        l +
        "</span></div></a>"
      );
    }
    var listings = [
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/1.jpg",
            "Grameen Sweets",
            "964 School Street, New York"
          ),
          23.72447089779572,
          90.42868673801422,
          1,
          '<i class="la la-home"></i>',
        ],
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/2.jpg",
            "Traditional Apartments",
            "212 5th Ave, New York"
          ),
          23.86009382,
          90.054245,
          2,
          '<i class="la la-home"></i>',
        ],
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/3.jpg",
            "Hotel Govendor",
            "778 Country Street, New York"
          ),
          24.01322578,
          90.44700623,
          3,
          '<i class="la la-home"></i>',
        ],
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/4.jpg",
            "Burger House",
            "2726 Shinn Street, New York"
          ),
          24.01591629,
          90.38771057,
          4,
          '<i class="la la-home"></i>',
        ],
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/5.jpg",
            "Airport",
            "1512 Duncan Avenue, New York"
          ),
          23.36179824,
          90.17234802,
          5,
          '<i class="la la-home"></i>',
        ],
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/6.jpg",
            "Think Coffee",
            "215 Terry Lane, New York"
          ),
          23.23061995,
          90.68733215,
          6,
          '<i class="la la-home"></i>',
        ],
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/7.jpg",
            "Burger House",
            "2726 Shinn Street, New York"
          ),
          23.60740779,
          89.59007263,
          7,
          '<i class="la la-home"></i>',
        ],
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/8.jpg",
            "Burger House",
            "2726 Shinn Street, New York"
          ),
          23.75329634,
          90.94825745,
          7,
          '<i class="la la-home"></i>',
        ],
        [
          newListing(
            "24_Property_Single.html",
            "assets/images/listing/5.jpg",
            "Burger House",
            "2726 Shinn Street, New York"
          ),
          23.60866614,
          90.76423645,
          7,
          '<i class="la la-home"></i>',
        ],
      ],
      datamapzoom = event("#map").attr("data-map-zoom"),
      datamapscroll = event("#map").attr("data-map-scroll");
    if (void 0 !== datamapzoom && !1 !== datamapzoom)
      var n = parseInt(datamapzoom);
    else n = 10;
    if (void 0 !== datamapscroll && !1 !== datamapscroll)
      var r = parseInt(datamapscroll);
    else r = !1;
    var m = new google.maps.Map(document.getElementById("map"), {
      zoom: n,
      scrollwheel: r,
      center: new google.maps.LatLng(23.728661581133366, 90.43003517390389),
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      zoomControl: !1,
      mapTypeControl: !1,
      scaleControl: !1,
      panControl: !1,
      navigationControl: !1,
      streetViewControl: !1,
      gestureHandling: "cooperative",
      styles: [
        {
          featureType: "water",
          elementType: "geometry",
          stylers: [
            {
              color: "#e9e9e9",
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: "landscape",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5",
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 17,
            },
          ],
        },
        {
          featureType: "road.highway",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 29,
            },
            {
              weight: 0.2,
            },
          ],
        },
        {
          featureType: "road.arterial",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 18,
            },
          ],
        },
        {
          featureType: "road.local",
          elementType: "geometry",
          stylers: [
            {
              color: "#ffffff",
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          featureType: "poi",
          elementType: "geometry",
          stylers: [
            {
              color: "#f5f5f5",
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          featureType: "poi.park",
          elementType: "geometry",
          stylers: [
            {
              color: "#dedede",
            },
            {
              lightness: 21,
            },
          ],
        },
        {
          elementType: "labels.text.stroke",
          stylers: [
            {
              visibility: "on",
            },
            {
              color: "#ffffff",
            },
            {
              lightness: 16,
            },
          ],
        },
        {
          elementType: "labels.text.fill",
          stylers: [
            {
              saturation: 36,
            },
            {
              color: "#333333",
            },
            {
              lightness: 40,
            },
          ],
        },
        {
          elementType: "labels.icon",
          stylers: [
            {
              visibility: "off",
            },
          ],
        },
        {
          featureType: "transit",
          elementType: "geometry",
          stylers: [
            {
              color: "#f2f2f2",
            },
            {
              lightness: 19,
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.fill",
          stylers: [
            {
              color: "#fefefe",
            },
            {
              lightness: 20,
            },
          ],
        },
        {
          featureType: "administrative",
          elementType: "geometry.stroke",
          stylers: [
            {
              color: "#fefefe",
            },
            {
              lightness: 17,
            },
            {
              weight: 1.2,
            },
          ],
        },
      ],
    });
    event(".listing-item-container").on("mouseover", function () {
      if (void 0 !== event(this).data("marker-id")) {
        var t = event(this).data("marker-id") - 1,
          o = allListingsNew[t].div;
        event(o).addClass("clicked"),
          event(this).on("mouseout", function () {
            event(o).is(":not(.infoBox-opened)") &&
              event(o).removeClass("clicked");
          });
      }
    });
    var g = document.createElement("div");
    g.className = "map-box";
    var p,
      c,
      d = {
        content: g,
        disableAutoPan: !1,
        alignBottom: !0,
        maxWidth: 0,
        pixelOffset: new google.maps.Size(-148, -55),
        zIndex: null,
        boxStyle: {
          width: "295px",
        },
        closeBoxMargin: "0",
        closeBoxURL: "",
        infoBoxClearance: new google.maps.Size(25, 25),
        isHidden: !1,
        pane: "floatPane",
        enableEventPropagation: !1,
      },
      allListingsNew = [];
    for (p = 0; p < listings.length; p++) {
      c = listings[p][4];
      var newListingMarkerthing = new markerobj(
        new google.maps.LatLng(listings[p][1], listings[p][2]),
        m,
        {
          marker_id: p,
        },
        c
      );
      function markerobj(e, t, o, l) {
        (this.latlng = e),
          (this.args = o),
          (this.markerIco = l),
          this.setMap(t);
      }
      allListingsNew.push(newListingMarkerthing),
        google.maps.event.addDomListener(
          newListingMarkerthing,
          "click",
          (function (o, i) {
            return function () {
              var open = false;
              if (typeof listings[i].open != "undefined")
                open = listings[i].open;

              jQuery.each(listings, function () {
                this.open = false;
              });

              infobox.close();
              if (open) {
                listings[i].open = false;
                return false;
              }
              listings[i].open = true;

              infobox.setOptions(d),
                (g.innerHTML = listings[i][0]),
                infobox.open(m, o),
                listings[i][3],
                google.maps.event.addListener(infobox, "domready", function () {
                  event(".infoBox-close").click(function (o) {
                    o.preventDefault(),
                      infobox.close(),
                      event(".map-marker-container").removeClass(
                        "clicked infoBox-opened"
                      );
                  });
                });
            };
          })(newListingMarkerthing, p)
        );
    }
    new MarkerClusterer(m, allListingsNew, {
      imagePath: "images/",
      styles: [
        {
          textColor: "white",
          url: "",
          height: 50,
          width: 50,
        },
      ],
      minClusterSize: 2,
    });
    google.maps.event.addDomListener(window, "resize", function () {
      var e = m.getCenter();
      google.maps.event.trigger(m, "resize"), m.setCenter(e);
    });
    var u = document.createElement("div");
    new (function (e, t) {
      (u.index = 1),
        t.controls[google.maps.ControlPosition.RIGHT_CENTER].push(u),
        (e.style.padding = "5px"),
        (e.className = "zoomControlWrapper");
      var o = document.createElement("div");
      e.appendChild(o);
      var l = document.createElement("div");
      (l.className = "custom-zoom-in"), o.appendChild(l);
      var i = document.createElement("div");
      (i.className = "custom-zoom-out"),
        o.appendChild(i),
        google.maps.event.addDomListener(l, "click", function () {
          t.setZoom(t.getZoom() + 1);
        }),
        google.maps.event.addDomListener(i, "click", function () {
          t.setZoom(t.getZoom() - 1);
        });
    })(u, m);
    var v = event("#scrollEnabling");
    event(v).click(function (t) {
      t.preventDefault(),
        event(this).toggleClass("enabled"),
        event(this).is(".enabled")
          ? m.setOptions({
              scrollwheel: !0,
            })
          : m.setOptions({
              scrollwheel: !1,
            });
    }),
      event("#geoLocation, .input-with-icon.location a").click(function (e) {
        e.preventDefault(),
          navigator.geolocation &&
            navigator.geolocation.getCurrentPosition(function (e) {
              var t = new google.maps.LatLng(
                e.coords.latitude,
                e.coords.longitude
              );
              m.setCenter(t), m.setZoom(12);
            });
      });
  }
  var mapRef = document.getElementById("map");
  function setIconsOnMap() {
    var googleMaps = new google.maps.LatLng({
        lng: event("#singleListingMap").data("longitude"),
        lat: event("#singleListingMap").data("latitude"),
      }),
      map = new google.maps.Map(document.getElementById("singleListingMap"), {
        zoom: 15,
        center: googleMaps,
        scrollwheel: !1,
        zoomControl: !1,
        mapTypeControl: !1,
        scaleControl: !1,
        panControl: !1,
        navigationControl: !1,
        streetViewControl: !1,
        styles: [
          {
            featureType: "poi",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#747474",
              },
              {
                lightness: "23",
              },
            ],
          },
          {
            featureType: "poi.attraction",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#f38eb0",
              },
            ],
          },
          {
            featureType: "poi.government",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ced7db",
              },
            ],
          },
          {
            featureType: "poi.medical",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffa5a8",
              },
            ],
          },
          {
            featureType: "poi.park",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#c7e5c8",
              },
            ],
          },
          {
            featureType: "poi.place_of_worship",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#d6cbc7",
              },
            ],
          },
          {
            featureType: "poi.school",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#c4c9e8",
              },
            ],
          },
          {
            featureType: "poi.sports_complex",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#b1eaf1",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "geometry",
            stylers: [
              {
                lightness: "100",
              },
            ],
          },
          {
            featureType: "road",
            elementType: "labels",
            stylers: [
              {
                visibility: "off",
              },
              {
                lightness: "100",
              },
            ],
          },
          {
            featureType: "road.highway",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffd4a5",
              },
            ],
          },
          {
            featureType: "road.arterial",
            elementType: "geometry.fill",
            stylers: [
              {
                color: "#ffe9d2",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "all",
            stylers: [
              {
                visibility: "simplified",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "geometry.fill",
            stylers: [
              {
                weight: "3.00",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "geometry.stroke",
            stylers: [
              {
                weight: "0.30",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text",
            stylers: [
              {
                visibility: "on",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text.fill",
            stylers: [
              {
                color: "#747474",
              },
              {
                lightness: "36",
              },
            ],
          },
          {
            featureType: "road.local",
            elementType: "labels.text.stroke",
            stylers: [
              {
                color: "#e9e5dc",
              },
              {
                lightness: "30",
              },
            ],
          },
          {
            featureType: "transit.line",
            elementType: "geometry",
            stylers: [
              {
                visibility: "on",
              },
              {
                lightness: "100",
              },
            ],
          },
          {
            featureType: "water",
            elementType: "all",
            stylers: [
              {
                color: "#d2e7f7",
              },
            ],
          },
        ],
      });
    event("#streetView").click(function (event) {
      event.preventDefault(),
        map.getStreetView().setOptions({
          visible: !0,
          position: googleMaps,
        });
    });
    var l = document.createElement("div");
    new (function (e, t) {
      (l.index = 1),
        t.controls[google.maps.ControlPosition.RIGHT_CENTER].push(l),
        (e.style.padding = "5px");
      var o = document.createElement("div");
      e.appendChild(o);
      var i = document.createElement("div");
      (i.className = "custom-zoom-in"), o.appendChild(i);
      var s = document.createElement("div");
      (s.className = "custom-zoom-out"),
        o.appendChild(s),
        google.maps.event.addDomListener(i, "click", function () {
          t.setZoom(t.getZoom() + 1);
        }),
        google.maps.event.addDomListener(s, "click", function () {
          t.setZoom(t.getZoom() - 1);
        });
    })(l, map);
    var mapIcon =
      "<i class='" + event("#singleListingMap").data("map-icon") + "'></i>";
    new overlayView(
      googleMaps,
      map,
      {
        marker_id: "1",
      },
      mapIcon
    );
  }
  void 0 !== mapRef &&
    null != mapRef &&
    (google.maps.event.addDomListener(window, "load", setupMap),
    google.maps.event.addDomListener(window, "resize", setupMap));
  var i = document.getElementById("singleListingMap");
  function overlayView(e, t, o, l) {
    (this.latlng = e), (this.args = o), (this.markerIco = l), this.setMap(t);
  }
  void 0 !== i &&
    null != i &&
    (google.maps.event.addDomListener(window, "load", setIconsOnMap),
    google.maps.event.addDomListener(window, "resize", setIconsOnMap)),
    (overlayView.prototype = new google.maps.OverlayView()),
    (overlayView.prototype.draw = function () {
      var t = this,
        newMarkerMapObject = this.div;
      newMarkerMapObject ||
        (((newMarkerMapObject = this.div =
          document.createElement("div")).className = "map-marker-container"),
        (newMarkerMapObject.innerHTML =
          '<div class="marker-container"><div class="marker-card"><div class="front face">' +
          t.markerIco +
          '</div><div class="back face">' +
          t.markerIco +
          '</div><div class="marker-arrow"></div></div></div>'),
        google.maps.event.addDomListener(
          newMarkerMapObject,
          "click",
          function (o) {
            var open = false;
            if (event(this).hasClass("infoBox-opened")) open = true;
            event(".map-marker-container").removeClass(
              "clicked infoBox-opened"
            ),
              google.maps.event.trigger(t, "click");
            if (!open) {
              event(this).addClass("clicked infoBox-opened");
            }
          }
        ),
        void 0 !== t.args.marker_id &&
          (newMarkerMapObject.dataset.marker_id = t.args.marker_id),
        this.getPanes().overlayImage.appendChild(newMarkerMapObject));
      var l = this.getProjection().fromLatLngToDivPixel(this.latlng);
      l &&
        ((newMarkerMapObject.style.left = l.x + "px"),
        (newMarkerMapObject.style.top = l.y + "px"));
    }),
    (overlayView.prototype.remove = function () {
      this.div &&
        (this.div.parentNode.removeChild(this.div),
        (this.div = null),
        event(this).removeClass("clicked"));
    }),
    (overlayView.prototype.getPosition = function () {
      return this.latlng;
    });
})(this.jQuery);
