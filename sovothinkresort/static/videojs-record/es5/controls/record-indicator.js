'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file record-indicator.js
 * @since 2.0.0
 */

var Component = videojs.getComponent('Component');

/**
 * Icon indicating recording is active.
 *
 * @class
 * @augments videojs.Component
*/

var RecordIndicator = function (_Component) {
  _inherits(RecordIndicator, _Component);

  /**
   * The constructor function for the class.
   *
   * @private
   * @param {(videojs.Player|Object)} player - Video.js player instance.
   * @param {Object} options - Player options.
   */
  function RecordIndicator(player, options) {
    _classCallCheck(this, RecordIndicator);

    var _this = _possibleConstructorReturn(this, (RecordIndicator.__proto__ || Object.getPrototypeOf(RecordIndicator)).call(this, player, options));

    _this.enable();
    return _this;
  }

  /**
   * Create the `RecordIndicator`s DOM element.
   *
   * @return {Element}
   *         The dom element that gets created.
   */


  _createClass(RecordIndicator, [{
    key: 'createEl',
    value: function createEl() {
      return _get(RecordIndicator.prototype.__proto__ || Object.getPrototypeOf(RecordIndicator.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-record-indicator vjs-control',
        dir: 'ltr'
      });
    }

    /**
     * Enable event handlers.
     */

  }, {
    key: 'enable',
    value: function enable() {
      this.on(this.player_, 'startRecord', this.show);
      this.on(this.player_, 'stopRecord', this.hide);
    }

    /**
     * Disable event handlers.
     */

  }, {
    key: 'disable',
    value: function disable() {
      this.off(this.player_, 'startRecord', this.show);
      this.off(this.player_, 'stopRecord', this.hide);
    }
  }]);

  return RecordIndicator;
}(Component);

Component.registerComponent('RecordIndicator', RecordIndicator);

exports.default = RecordIndicator;