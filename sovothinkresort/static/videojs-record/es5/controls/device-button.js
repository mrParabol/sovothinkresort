'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file device-button.js
 * @since 2.0.0
 */

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');

/**
 * Button to select recording device.
 *
 * @class
 * @augments videojs.Button
*/

var DeviceButton = function (_Button) {
  _inherits(DeviceButton, _Button);

  function DeviceButton() {
    _classCallCheck(this, DeviceButton);

    return _possibleConstructorReturn(this, (DeviceButton.__proto__ || Object.getPrototypeOf(DeviceButton)).apply(this, arguments));
  }

  _createClass(DeviceButton, [{
    key: 'handleClick',

    /**
     * This gets called when this button gets:
     *
     * - Clicked (via the `click` event, listening starts in the constructor)
     * - Tapped (via the `tap` event, listening starts in the constructor)
     *
     * @param {EventTarget~Event} event
     *        The `keydown`, `tap`, or `click` event that caused this function to be
     *        called.
     *
     * @listens tap
     * @listens click
     */
    value: function handleClick(event) {
      // open device dialog
      this.player_.record().getDevice();
    }
  }]);

  return DeviceButton;
}(Button);

/**
 * The text that should display over the `DeviceButton`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


DeviceButton.prototype.controlText_ = 'Device';

Component.registerComponent('DeviceButton', DeviceButton);

exports.default = DeviceButton;