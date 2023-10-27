function InfoBox(options) {
    options = options || {};
    this.boxStyle = options.boxStyle || {};
    this.content = options.content || "";
    this.disableAutoPan = options.disableAutoPan || false;
    this.maxWidth = options.maxWidth || 0;
    this.pixelOffset = options.pixelOffset || { width: 0, height: -35 };
    this.position = options.position || null;
    this.zIndex = options.zIndex || null;
    this.boxClass = options.boxClass || "infoBox";
    this.enableEventPropagation = options.enableEventPropagation || false;
  
    this.isHidden = false;
    this.isHidden_ = false;
    this.moveListener_ = null;
    this.closeListener_ = null;
    this.contextListener_ = null;
    this.eventListeners_ = null;
    this.fixedWidthSet_ = false;
  }
  
  InfoBox.prototype = {
    setOptions: function (options) {
      if (typeof options.boxStyle !== "undefined") {
        this.boxStyle = options.boxStyle;
        this.setBoxStyle_();
      }
      if (typeof options.content !== "undefined") {
        this.setContent(options.content);
      }
      if (typeof options.disableAutoPan !== "undefined") {
        this.disableAutoPan = options.disableAutoPan;
      }
      if (typeof options.maxWidth !== "undefined") {
        this.maxWidth = options.maxWidth;
        this.fixedWidthSet_ = true;
        this.setBoxStyle_();
      }
      if (typeof options.pixelOffset !== "undefined") {
        this.pixelOffset = options.pixelOffset;
      }
      if (typeof options.position !== "undefined") {
        this.setPosition(options.position);
      }
      if (typeof options.zIndex !== "undefined") {
        this.setZIndex(options.zIndex);
      }
      if (typeof options.boxClass !== "undefined") {
        this.setBoxClass_(options.boxClass);
      }
      if (typeof options.enableEventPropagation !== "undefined") {
        this.enableEventPropagation = options.enableEventPropagation;
      }
    },
  
    setContent: function (content) {
      this.content = content;
      if (this.div_) {
        if (this.fixedWidthSet_) {
          this.div_.style.width = this.maxWidth + "px";
        }
        this.div_.innerHTML = content;
      }
      this.fixedWidthSet_ = false;
      this.setBoxStyle_();
    },
  
    setPosition: function (position) {
      this.position = position;
      if (this.div_) {
        this.div_.style.visibility = "hidden";
        this.moveTo_(this.getPosition());
      }
    },
  
    setZIndex: function (zIndex) {
      this.zIndex = zIndex;
      if (this.div_) {
        this.div_.style.zIndex = zIndex;
      }
    },
  
    setVisible: function (isVisible) {
      if (isVisible) {
        this.show();
      } else {
        this.hide();
      }
    },
  
    getContent: function () {
      return this.content;
    },
  
    getPosition: function () {
      return this.position;
    },
  
    getZIndex: function () {
      return this.zIndex;
    },
  
    show: function () {
      if (this.div_) {
        this.div_.style.visibility = "visible";
      }
      this.isHidden = false;
      this.isHidden_ = false;
      if (this.moveListener_) {
        this.moveListener_();
      }
    },
  
    hide: function () {
      if (this.div_) {
        this.div_.style.visibility = "hidden";
      }
      this.isHidden = true;
      this.isHidden_ = true;
      if (this.moveListener_) {
        this.moveListener_();
      }
    },
  
    toggle: function () {
      if (this.isHidden) {
        this.show();
      } else {
        this.hide();
      }
    },
  
    addClickHandler: function (callback) {
      this.eventListeners_ = this.eventListeners_ || [];
      var eventListener = google.maps.event.addListener(
        this.div_,
        "click",
        function (e) {
          callback(e);
        }
      );
      this.eventListeners_.push(eventListener);
    },
  
    clearClickHandlers: function () {
      if (this.eventListeners_) {
        for (var i = 0; i < this.eventListeners_.length; i++) {
          google.maps.event.removeListener(this.eventListeners_[i]);
        }
        this.eventListeners_.length = 0;
      }
    },
  
    createInfoBoxDiv_: function () {
      var div = document.createElement("div");
      div.className = this.boxClass;
      div.style.visibility = "hidden";
      if (this.zIndex) {
        div.style.zIndex = this.zIndex;
      }
      div.style.position = "absolute";
      if (this.maxWidth > 0) {
        div.style.width = this.maxWidth + "px";
        this.fixedWidthSet_ = true;
      }
      if (typeof this.content === "string") {
        div.innerHTML = this.content;
      } else {
        div.appendChild(this.content);
      }
      this.div_ = div;
      this.setBoxStyle_();
      this.moveListener_ = google.maps.event.addListener(
        this,
        "position_changed",
        this.moveTo.bind(this)
      );
      this.closeListener_ = google.maps.event.addListener(
        this,
        "closeclick",
        this.close
      );
      this.contextListener_ = google.maps.event.addListener(
        this,
        "contextmenu",
        this.close
      );
      return div;
    },
  
    setBoxStyle_: function () {
      if (!this.div_) {
        return;
      }
      this.div_.style.cssText = "";
      this.div_.style.cssText = this.createInfoBoxDiv_.style.cssText;
      this.applyBoxStyle_();
    },
  
    applyBoxStyle_: function () {
      if (!this.div_) {
        return;
      }
      if (this.boxStyle) {
        for (var i in this.boxStyle) {
          if (this.boxStyle.hasOwnProperty(i)) {
            this.div_.style[i] = this.boxStyle[i];
          }
        }
      }
    },
  
    moveTo_: function (latLng) {
      var projection = this.getProjection();
      if (projection) {
        var point = projection.fromLatLngToDivPixel(latLng);
        this.div_.style.left = point.x + this.pixelOffset.width + "px";
        this.div_.style.top = point.y + this.pixelOffset.height + "px";
        if (this.isHidden_) {
          this.div_.style.visibility = "hidden";
        } else {
          this.div_.style.visibility = "visible";
        }
      }
    },
  
    close: function () {
      if (this.closeListener_) {
        google.maps.event.removeListener(this.closeListener_);
        this.closeListener_ = null;
      }
      if (this.contextListener_) {
        google.maps.event.removeListener(this.contextListener_);
        this.contextListener_ = null;
      }
      if (this.moveListener_) {
        google.maps.event.removeListener(this.moveListener_);
        this.moveListener_ = null;
      }
      this.setMap(null);
    },
  };
  