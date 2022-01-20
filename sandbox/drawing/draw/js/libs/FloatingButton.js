"use strict";

var FloatingButton = (function () {
  var buttonSize =
    Math.max(window.innerWidth, window.innerHeight) > 768 ? 80 : 50;
  var getOffset = function getOffset(offset, margin) {
    return offset - margin + "px";
  };
  var FloatingButton = {
    dom: null,
    config: {
      size: 0,
      margin: 0,
      inactiveOpacity: 0,
      activeOpacity: 0,
    },
    onClick: null,
    init: function init(elementId) {
      this.dom = constructElement.call(this, elementId);

      applyStyle.call(this, {
        position: "absolute",
        top: getOffset(document.body.clientHeight, this.config.margin),
        left: getOffset(document.body.clientWidth, this.config.margin),
      });
    },
  };

  // Initialisation
  var constructElement = function constructElement(elementId) {
    var element = document.createElement("div");
    document.body.appendChild(element);
    element.setAttribute("id", "floatingButton");
    return element;
  };

  var applyStyle = function applyStyle(cssStyle) {
    var self = this;
    Object.keys(cssStyle).map(function (key) {
      self.dom.style[key] = cssStyle[key];
    });
  };

  return FloatingButton;
})();
