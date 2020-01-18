(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ApplicationDetailsModal =
/*#__PURE__*/
function () {
  function ApplicationDetailsModal() {
    var _this = this;

    _classCallCheck(this, ApplicationDetailsModal);

    this.visible = false;
    this.$titleContainer = $('<div class="modal-title">');
    this.$bodyImage = $('<img class="modal-body-image img-fluid mb-4">');
    this.$bodyText = $('<div class="modal-body-text">');
    this.$bodyLinks = $('<div class="modal-body-links">');
    this.$bodyContainer = $('<div class="modal-body">').append($('<div class="container-fluid">').append($('<div class="row">').append($('<div class="col-lg col-md-12">').append(this.$bodyImage)).append($('<div class="col-lg col-md-12">').append(this.$bodyText))).append($('<div class="row">').append($('<div class="col">').append(this.$bodyLinks))));
    this.$modal = $('<div class="modal fade">').append($('<div class="modal-dialog modal-lg">').append($('<div class="modal-content">').append($('<div class="modal-header">').append(this.$titleContainer).append($('<button type="button" class="close" data-dismiss="modal">').append($('<span>').html('&times;')))).append(this.$bodyContainer)));
    this.$modal.on('hidden.bs.modal', function () {
      _this.visible = false;
    });
    this.$modal.on('shown.bs.modal', function () {
      _this.visible = true;
    });
  }

  _createClass(ApplicationDetailsModal, [{
    key: "formatURL",
    value: function formatURL(url) {
      return url.replace(/\//g, '/<wbr>').replace(/_/g, '_<wbr>').replace(/\./g, '.<wbr>');
    }
  }, {
    key: "show",
    value: function show(application) {
      var _this2 = this;

      this.$titleContainer.html(application.title);
      this.$bodyImage.attr('src', "assets/img/applications/".concat(application.id, ".jpg"));
      this.$bodyText.html(application.body);
      this.$bodyLinks.empty();

      if (application.links) {
        var links = application.links.split('\n').map(function (each) {
          if (each.substr(0, 'http'.length) !== 'http') {
            return "http://".concat(each);
          }

          return each;
        }).map(function (each) {
          return $('<li>').append($('<a>').attr('href', each).attr('target', '_blank').attr('rel', 'noopener').html(_this2.formatURL(each)));
        });
        this.$bodyLinks.append($('<ul class="colored">').append(links));
      }

      if (!this.visible) {
        this.$modal.modal('show');
      } else {
        this.$modal.modal('handleUpdate');
      }
    }
  }, {
    key: "hide",
    value: function hide() {
      this.$modal.modal('hide');
    }
  }]);

  return ApplicationDetailsModal;
}();

exports["default"] = ApplicationDetailsModal;

},{}],2:[function(require,module,exports){
"use strict";

require("./responsiveMenu");

var _applicationDetailsModal = _interopRequireDefault(require("./applicationDetailsModal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// eslint-disable-next-line import/no-extraneous-dependencies
// import 'core-js/stable'; // ES Polyfills, include only if needed... around 200k minimized!
if (window.MathsEverywhere.applications) {
  window.MathsEverywhere.applicationsById = Object.fromEntries(window.MathsEverywhere.applications.map(function (each) {
    return [each.id, each];
  }));
}

var modal = new _applicationDetailsModal["default"](); // If the modal closes we change the URL. This breaks encapsulation
// but adding an extra event is overkill at this point.

modal.$modal.on('hidden.bs.modal', function () {
  if (window.history.pushState) {
    window.history.pushState(null, null, '#');
  } else {
    window.location.hash = '';
  }
});
/**
 * Redraw the view based on the route
 */

function update() {
  if (window.location.hash.length > 0) {
    var applicationID = window.location.hash.replace('#', '');

    if (window.MathsEverywhere.applicationsById[applicationID] !== undefined) {
      var application = window.MathsEverywhere.applicationsById[applicationID];
      modal.show(application);
    }
  } else {
    modal.hide();
  }
}

$(window).on('hashchange', function () {
  update();
});
update(); // Change the internal links so instead of the default internal
// navigation they change the hash via "location.replace". This
// changes how navigation history is created. If you
// click on an application, close it, open another, close it, etc.
// and then navigate via the back button several times you'll
// go through all the seen applications instead of seeing
// home, application, home, application, etc.

$('.application a').each(function (i, appLink) {
  $(appLink).on('click', function (ev) {
    ev.preventDefault();
    window.location.replace($(appLink).attr('href'));
    return false;
  });
});

},{"./applicationDetailsModal":1,"./responsiveMenu":3}],3:[function(require,module,exports){
"use strict";

var $container = $('.header-col-title');
var $menu = $('<div class="dropdown-menu dropdown-menu-right"></div>');
var $element = $('<div class="menu-responsive dropdown d-xl-none"></div>').append($('<button class="btn dropdown-toggle" type="button" data-toggle="dropdown">')).append($menu);
$('.header-menu a').each(function (i, element) {
  $(element).clone().addClass('dropdown-item').appendTo($menu);
});
$menu.append($('<div class="dropdown-divider"></div>'));
$('.lang-switcher .dropdown-item').clone().appendTo($menu);
$container.append($element);

},{}]},{},[2]);
