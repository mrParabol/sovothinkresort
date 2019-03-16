(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
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
 * @file animation-display.js
 * @since 2.0.0
 */

var Component = videojs.getComponent('Component');

/**
 * Image for displaying animated GIF image.
 *
 * @class
 * @augments videojs.Component
*/

var AnimationDisplay = function (_Component) {
  _inherits(AnimationDisplay, _Component);

  function AnimationDisplay() {
    _classCallCheck(this, AnimationDisplay);

    return _possibleConstructorReturn(this, (AnimationDisplay.__proto__ || Object.getPrototypeOf(AnimationDisplay)).apply(this, arguments));
  }

  _createClass(AnimationDisplay, [{
    key: 'createEl',


    /**
     * Create the `AnimationDisplay`s DOM element.
     *
     * @return {Element}
     *         The dom element that gets created.
     */
    value: function createEl() {
      return _get(AnimationDisplay.prototype.__proto__ || Object.getPrototypeOf(AnimationDisplay.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-animation-display',
        innerHTML: '<img />'
      });
    }
  }]);

  return AnimationDisplay;
}(Component);

Component.registerComponent('AnimationDisplay', AnimationDisplay);

exports.default = AnimationDisplay;
},{}],2:[function(require,module,exports){
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
 * @file camera-button.js
 * @since 2.0.0
 */

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');

/**
 * Button to toggle between create and retry snapshot image.
 *
 * @class
 * @augments videojs.Button
*/

var CameraButton = function (_Button) {
  _inherits(CameraButton, _Button);

  function CameraButton() {
    _classCallCheck(this, CameraButton);

    return _possibleConstructorReturn(this, (CameraButton.__proto__ || Object.getPrototypeOf(CameraButton)).apply(this, arguments));
  }

  _createClass(CameraButton, [{
    key: 'buildCSSClass',

    /**
     * Builds the default DOM `className`.
     *
     * @return {string}
     *         The DOM `className` for this object.
     */
    value: function buildCSSClass() {
      return 'vjs-camera-button vjs-control vjs-button vjs-icon-photo-camera';
    }

    /**
     * Enable the `CameraButton` element so that it can be activated or clicked.
     */

  }, {
    key: 'enable',
    value: function enable() {
      _get(CameraButton.prototype.__proto__ || Object.getPrototypeOf(CameraButton.prototype), 'enable', this).call(this);

      this.on(this.player_, 'startRecord', this.onStart);
      this.on(this.player_, 'stopRecord', this.onStop);
    }

    /**
     * Disable the `CameraButton` element so that it cannot be activated or clicked.
     */

  }, {
    key: 'disable',
    value: function disable() {
      _get(CameraButton.prototype.__proto__ || Object.getPrototypeOf(CameraButton.prototype), 'disable', this).call(this);

      this.off(this.player_, 'startRecord', this.onStart);
      this.off(this.player_, 'stopRecord', this.onStop);
    }

    /**
     * This gets called when the button is clicked.
     *
     * @param {EventTarget~Event} event
     *        The `tap` or `click` event that caused this function to be
     *        called.
     *
     * @listens tap
     * @listens click
     */

  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      var recorder = this.player_.record();

      if (!recorder.isProcessing()) {
        // create snapshot
        recorder.start();
      } else {
        // retry
        recorder.retrySnapshot();

        // reset camera button
        this.onStop();
      }
    }

    /**
     * Add the vjs-icon-replay class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#startRecord
     */

  }, {
    key: 'onStart',
    value: function onStart(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-photo-camera');
      this.addClass('vjs-icon-replay');

      // change the button text
      this.controlText('Retry');
    }

    /**
     * Add the vjs-icon-photo-camera class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#stopRecord
     */

  }, {
    key: 'onStop',
    value: function onStop(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-replay');
      this.addClass('vjs-icon-photo-camera');

      // change the button text
      this.controlText('Image');
    }
  }]);

  return CameraButton;
}(Button);

/**
 * The text that should display over the `CameraButton`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


CameraButton.prototype.controlText_ = 'Image';

Component.registerComponent('CameraButton', CameraButton);

exports.default = CameraButton;
},{}],3:[function(require,module,exports){
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
},{}],4:[function(require,module,exports){
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
 * @file record-canvas
 * @since 2.0.0
 */

var Component = videojs.getComponent('Component');

/**
 * Canvas for displaying snapshot image.
 *
 * @class
 * @augments videojs.Component
*/

var RecordCanvas = function (_Component) {
  _inherits(RecordCanvas, _Component);

  function RecordCanvas() {
    _classCallCheck(this, RecordCanvas);

    return _possibleConstructorReturn(this, (RecordCanvas.__proto__ || Object.getPrototypeOf(RecordCanvas)).apply(this, arguments));
  }

  _createClass(RecordCanvas, [{
    key: 'createEl',


    /**
     * Create the `RecordCanvas`s DOM element.
     *
     * @return {Element}
     *         The dom element that gets created.
     */
    value: function createEl() {
      return _get(RecordCanvas.prototype.__proto__ || Object.getPrototypeOf(RecordCanvas.prototype), 'createEl', this).call(this, 'div', {
        className: 'vjs-record-canvas',
        innerHTML: '<canvas></canvas>'
      });
    }
  }]);

  return RecordCanvas;
}(Component);

Component.registerComponent('RecordCanvas', RecordCanvas);

exports.default = RecordCanvas;
},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
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
 * @file record-toggle.js
 * @since 2.0.0
 */

var Button = videojs.getComponent('Button');
var Component = videojs.getComponent('Component');

/**
 * Button to toggle between start and stop recording.
 *
 * @class
 * @augments videojs.Button
*/

var RecordToggle = function (_Button) {
  _inherits(RecordToggle, _Button);

  function RecordToggle() {
    _classCallCheck(this, RecordToggle);

    return _possibleConstructorReturn(this, (RecordToggle.__proto__ || Object.getPrototypeOf(RecordToggle)).apply(this, arguments));
  }

  _createClass(RecordToggle, [{
    key: 'buildCSSClass',

    /**
     * Builds the default DOM `className`.
     *
     * @return {string}
     *         The DOM `className` for this object.
     */
    value: function buildCSSClass() {
      return 'vjs-record-button vjs-control vjs-button vjs-icon-record-start';
    }

    /**
     * Enable the `RecordToggle` element so that it can be activated or clicked.
     */

  }, {
    key: 'enable',
    value: function enable() {
      _get(RecordToggle.prototype.__proto__ || Object.getPrototypeOf(RecordToggle.prototype), 'enable', this).call(this);

      this.on(this.player_, 'startRecord', this.onStart);
      this.on(this.player_, 'stopRecord', this.onStop);
    }

    /**
     * Disable the `RecordToggle` element so that it cannot be activated or clicked.
     */

  }, {
    key: 'disable',
    value: function disable() {
      _get(RecordToggle.prototype.__proto__ || Object.getPrototypeOf(RecordToggle.prototype), 'disable', this).call(this);

      this.off(this.player_, 'startRecord', this.onStart);
      this.off(this.player_, 'stopRecord', this.onStop);
    }

    /**
     * This gets called when the button is clicked.
     *
     * @param {EventTarget~Event} event
     *        The `tap` or `click` event that caused this function to be
     *        called.
     *
     * @listens tap
     * @listens click
     */

  }, {
    key: 'handleClick',
    value: function handleClick(event) {
      var recorder = this.player_.record();
      if (!recorder.isRecording()) {
        recorder.start();
      } else {
        recorder.stop();
      }
    }

    /**
     * Add the vjs-icon-record-stop class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#startRecord
     */

  }, {
    key: 'onStart',
    value: function onStart(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-record-start');
      this.addClass('vjs-icon-record-stop');

      // change the button text
      this.controlText('Stop');
    }

    /**
     * Add the vjs-icon-record-start class to the element so it can change appearance.
     *
     * @param {EventTarget~Event} [event]
     *        The event that caused this function to run.
     *
     * @listens Player#stopRecord
     */

  }, {
    key: 'onStop',
    value: function onStop(event) {
      // replace element class so it can change appearance
      this.removeClass('vjs-icon-record-stop');
      this.addClass('vjs-icon-record-start');

      // change the button text
      this.controlText('Record');
    }
  }]);

  return RecordToggle;
}(Button);

/**
 * The text that should display over the `RecordToggle`s controls. Added for localization.
 *
 * @type {string}
 * @private
 */


RecordToggle.prototype.controlText_ = 'Record';

Component.registerComponent('RecordToggle', RecordToggle);

exports.default = RecordToggle;
},{}],7:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file defaults.js
 * @since 2.0.0
 */

//plugin defaults
var pluginDefaultOptions = {
    // Single snapshot image.
    image: false,
    // Include audio in the recorded clip.
    audio: false,
    // Include video in the recorded clip.
    video: false,
    // Animated GIF.
    animation: false,
    // Maximum length of the recorded clip.
    maxLength: 10,
    // Width of the recorded video frames.
    frameWidth: 320,
    // Height of the recorded video frames.
    frameHeight: 240,
    // Enables console logging for debugging purposes.
    debug: false,
    // The mime type for the video recorder. Default to 'video/webm'.
    // Use 'video/mp4' (Firefox) or 'video/webm;codecs=H264' (Chrome 52 and
    // newer) for MP4.
    videoMimeType: 'video/webm',
    // Video recorder type to use. This allows you to specify an alternative
    // recorder class, e.g. WhammyRecorder. Defaults to 'auto' which let's
    // recordrtc specify the best available recorder type.
    videoRecorderType: 'auto',
    // Audio recording library to use. Legal values are 'recordrtc',
    // 'libvorbis.js', 'opus-recorder', 'lamejs' and 'recorder.js'.
    audioEngine: 'recordrtc',
    // Audio recorder type to use. This allows you to specify an alternative
    // recorder class, e.g. StereoAudioRecorder. Defaults to 'auto' which let's
    // recordrtc specify the best available recorder type. Currently this
    // setting is only used with the 'recordrtc' audioEngine.
    audioRecorderType: 'auto',
    // The mime type for the audio recorder. Defaults to 'auto' which will pick
    // the best option available in the browser (e.g. either 'audio/wav',
    // 'audio/ogg' or 'audio/webm').
    audioMimeType: 'auto',
    // The size of the audio buffer (in sample-frames) which needs to
    // be processed each time onprocessaudio is called.
    // From the spec: This value controls how frequently the audioprocess event is
    // dispatched and how many sample-frames need to be processed each call.
    // Lower values for buffer size will result in a lower (better) latency.
    // Higher values will be necessary to avoid audio breakup and glitches.
    // Legal values are 256, 512, 1024, 2048, 4096, 8192 or 16384.
    audioBufferSize: 4096,
    // The audio sample rate (in sample-frames per second) at which the
    // AudioContext handles audio. It is assumed that all AudioNodes
    // in the context run at this rate. In making this assumption,
    // sample-rate converters or "varispeed" processors are not supported
    // in real-time processing.
    // The sampleRate parameter describes the sample-rate of the
    // linear PCM audio data in the buffer in sample-frames per second.
    // An implementation must support sample-rates in at least
    // the range 22050 to 96000.
    audioSampleRate: 44100,
    // The audio bitrate in kbps (only used in lamejs plugin).
    audioBitRate: 128,
    // Allows you to record single-channel audio, which can reduce the
    // filesize.
    audioChannels: 2,
    // URL for the audio worker.
    audioWorkerURL: '',
    // Frame rate in frames per second.
    animationFrameRate: 200,
    // Sets quality of color quantization (conversion of images to the
    // maximum 256 colors allowed by the GIF specification).
    // Lower values (minimum = 1) produce better colors,
    // but slow processing significantly. 10 is the default,
    // and produces good color mapping at reasonable speeds.
    // Values greater than 20 do not yield significant improvements
    // in speed.
    animationQuality: 10,
    // Accepts numbers in milliseconds; use this to force intervals-based blobs.
    timeSlice: 0
};

exports.default = pluginDefaultOptions;
},{}],8:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file record-engine.js
 * @since 2.0.0
 */

var Component = videojs.getComponent('Component');

// supported recorder plugin engines
var RECORDRTC = 'recordrtc';
var LIBVORBISJS = 'libvorbis.js';
var RECORDERJS = 'recorder.js';
var LAMEJS = 'lamejs';
var OPUSRECORDER = 'opus-recorder';

/**
 * Base class for recorder backends.
 * @class
 * @augments videojs.Component
 */

var RecordEngine = function (_Component) {
    _inherits(RecordEngine, _Component);

    /**
     * Creates an instance of this class.
     *
     * @param  {Player} player
     *         The `Player` that this class should be attached to.
     *
     * @param  {Object} [options]
     *         The key/value store of player options.
     */
    function RecordEngine(player, options) {
        _classCallCheck(this, RecordEngine);

        // auto mixin the evented mixin (required since video.js v6.6.0)
        options.evented = true;

        return _possibleConstructorReturn(this, (RecordEngine.__proto__ || Object.getPrototypeOf(RecordEngine)).call(this, player, options));
    }

    /**
     * Remove any temporary data and references to streams.
     * @private
     */


    _createClass(RecordEngine, [{
        key: 'dispose',
        value: function dispose() {
            // dispose previous recording
            if (this.recordedData !== undefined) {
                URL.revokeObjectURL(this.recordedData);
            }
        }

        /**
         * Add filename and timestamp to recorded file object.
         *
         * @param {(blob|file)} fileObj - Blob or File object.
         */

    }, {
        key: 'addFileInfo',
        value: function addFileInfo(fileObj) {
            if (fileObj instanceof Blob || fileObj instanceof File) {
                // set modification date
                var now = new Date();
                try {
                    fileObj.lastModified = now.getTime();
                    fileObj.lastModifiedDate = now;
                } catch (e) {
                    if (e instanceof TypeError) {
                        // ignore: setting getter-only property "lastModifiedDate"
                    } else {
                        // re-raise error
                        throw e;
                    }
                }
                // guess extension name from mime type, e.g. audio/ogg, but
                // any extension is valid here. Chrome also accepts extended
                // mime types like video/webm;codecs=h264,vp9,opus
                var fileExtension = '.' + fileObj.type.split('/')[1];
                if (fileExtension.indexOf(';') > -1) {
                    fileExtension = fileExtension.split(';')[0];
                }

                // use timestamp in filename, e.g. 1451180941326.ogg
                try {
                    fileObj.name = now.getTime() + fileExtension;
                } catch (e) {
                    if (e instanceof TypeError) {
                        // ignore: setting getter-only property "name"
                    } else {
                        // re-raise error
                        throw e;
                    }
                }
            }
        }

        /**
         * Invoked when recording is stopped and resulting stream is available.
         *
         * @param {blob} data - Reference to the recorded Blob.
         */

    }, {
        key: 'onStopRecording',
        value: function onStopRecording(data) {
            this.recordedData = data;

            // add filename and timestamp to recorded file object
            this.addFileInfo(this.recordedData);

            // remove reference to recorded stream
            this.dispose();

            // notify listeners
            this.trigger('recordComplete');
        }

        /**
         * Show save as dialog in browser so the user can store the recorded media
         * locally.
         *
         * @param {object} name - Object with names for the particular blob(s)
         *     you want to save. File extensions are added automatically. For
         *     example: {'video': 'name-of-video-file'}. Supported keys are
         *     'audio', 'video' and 'gif'.
         */

    }, {
        key: 'saveAs',
        value: function saveAs(name) {
            var fileName = name[Object.keys(name)[0]];

            if (typeof navigator.msSaveOrOpenBlob !== 'undefined') {
                return navigator.msSaveOrOpenBlob(this.recordedData, fileName);
            } else if (typeof navigator.msSaveBlob !== 'undefined') {
                return navigator.msSaveBlob(this.recordedData, fileName);
            }

            var hyperlink = document.createElement('a');
            hyperlink.href = URL.createObjectURL(this.recordedData);
            hyperlink.download = fileName;

            hyperlink.style = 'display:none;opacity:0;color:transparent;';
            (document.body || document.documentElement).appendChild(hyperlink);

            if (typeof hyperlink.click === 'function') {
                hyperlink.click();
            } else {
                hyperlink.target = '_blank';
                hyperlink.dispatchEvent(new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                }));
            }

            URL.revokeObjectURL(hyperlink.href);
        }
    }]);

    return RecordEngine;
}(Component);

// expose component for external plugins


videojs.RecordEngine = RecordEngine;
Component.registerComponent('RecordEngine', RecordEngine);

exports.RecordEngine = RecordEngine;
exports.RECORDRTC = RECORDRTC;
exports.LIBVORBISJS = LIBVORBISJS;
exports.RECORDERJS = RECORDERJS;
exports.LAMEJS = LAMEJS;
exports.OPUSRECORDER = OPUSRECORDER;
},{}],9:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file record-mode.js
 * @since 2.0.0
 */

// recorder modes
var IMAGE_ONLY = 'image_only';
var AUDIO_ONLY = 'audio_only';
var VIDEO_ONLY = 'video_only';
var AUDIO_VIDEO = 'audio_video';
var ANIMATION = 'animation';

var getRecorderMode = function getRecorderMode(image, audio, video, animation) {
    if (isModeEnabled(image)) {
        return IMAGE_ONLY;
    } else if (isModeEnabled(animation)) {
        return ANIMATION;
    } else if (isModeEnabled(audio) && !isModeEnabled(video)) {
        return AUDIO_ONLY;
    } else if (isModeEnabled(audio) && isModeEnabled(video)) {
        return AUDIO_VIDEO;
    } else if (!isModeEnabled(audio) && isModeEnabled(video)) {
        return VIDEO_ONLY;
    }
};

/**
 * Return boolean indicating whether mode is enabled or not.
 */
var isModeEnabled = function isModeEnabled(mode) {
    return mode === Object(mode) || mode === true;
};

exports.getRecorderMode = getRecorderMode;
exports.IMAGE_ONLY = IMAGE_ONLY;
exports.AUDIO_ONLY = AUDIO_ONLY;
exports.VIDEO_ONLY = VIDEO_ONLY;
exports.AUDIO_VIDEO = AUDIO_VIDEO;
exports.ANIMATION = ANIMATION;
},{}],10:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _recordEngine = require('./record-engine');

var _detectBrowser = require('../utils/detect-browser');

var _recordMode = require('./record-mode');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file record-rtc.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @since 2.0.0
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Component = videojs.getComponent('Component');

/**
 * Engine used with the MRecordRTC class in the RecordRTC library.
 *
 * @class
 * @augments videojs.RecordEngine
 */

var RecordRTCEngine = function (_RecordEngine) {
    _inherits(RecordRTCEngine, _RecordEngine);

    function RecordRTCEngine() {
        _classCallCheck(this, RecordRTCEngine);

        return _possibleConstructorReturn(this, (RecordRTCEngine.__proto__ || Object.getPrototypeOf(RecordRTCEngine)).apply(this, arguments));
    }

    _createClass(RecordRTCEngine, [{
        key: 'setup',


        /**
         * Setup recording engine.
         */
        value: function setup(stream, mediaType, debug) {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            // setup RecordRTC
            this.engine = new RecordRTC.MRecordRTC();
            this.engine.mediaType = this.mediaType;
            this.engine.disableLogs = !this.debug;
            this.engine.mimeType = this.mimeType;

            // audio settings
            this.engine.bufferSize = this.bufferSize;
            this.engine.sampleRate = this.sampleRate;
            this.engine.numberOfAudioChannels = this.audioChannels;

            // video/canvas settings
            this.engine.video = this.video;
            this.engine.canvas = this.canvas;

            // animated gif settings
            this.engine.quality = this.quality;
            this.engine.frameRate = this.frameRate;
            if (this.onTimeStamp !== undefined) {
                this.engine.timeSlice = this.timeSlice;
                this.engine.onTimeStamp = this.onTimeStamp;
            }

            // connect stream to recording engine
            this.engine.addStream(this.inputStream);
        }

        /**
         * Remove any temporary data and references to streams.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            _get(RecordRTCEngine.prototype.__proto__ || Object.getPrototypeOf(RecordRTCEngine.prototype), 'dispose', this).call(this);

            if (typeof this.engine.destroy === 'function') {
                this.engine.destroy();
            }
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            this.engine.startRecording();
        }

        /**
         * Stop recording. Result will be available async when onStopRecording
         * is called.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.engine.stopRecording(this.onStopRecording.bind(this));
        }

        /**
         * Pause recording.
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.engine.pauseRecording();
        }

        /**
         * Resume recording.
         */

    }, {
        key: 'resume',
        value: function resume() {
            this.engine.resumeRecording();
        }

        /**
         * Show save as dialog in browser so the user can store the recorded media
         * locally.
         *
         * @param {object} name - Object with names for the particular blob(s)
         *     you want to save. File extensions are added automatically. For
         *     example: {'video': 'name-of-video-file'}. Supported keys are
         *     'audio', 'video' and 'gif'.
         */

    }, {
        key: 'saveAs',
        value: function saveAs(name) {
            if (this.engine && name !== undefined) {
                this.engine.save(name);
            }
        }

        /**
         * Invoked when recording is stopped and resulting stream is available.
         *
         * @private
         * @param {string} audioVideoURL - Reference to the recorded Blob
         *     object, e.g. 'blob:http://localhost:8080/10100016-4248-9949-b0d6-0bb40db56eba'
         * @param {string} type - Media type, eg. 'video' or 'audio'.
         */

    }, {
        key: 'onStopRecording',
        value: function onStopRecording(audioVideoURL, type) {
            var _this2 = this;

            // store reference to recorded stream URL
            this.mediaURL = audioVideoURL;

            // store reference to recorded stream data
            var recordType = this.player().record().getRecordType();
            this.engine.getBlob(function (recording) {
                switch (recordType) {
                    case _recordMode.AUDIO_ONLY:
                        _this2.recordedData = recording.audio;

                        _this2.addFileInfo(_this2.recordedData);

                        // notify listeners
                        _this2.trigger('recordComplete');
                        break;

                    case _recordMode.VIDEO_ONLY:
                    case _recordMode.AUDIO_VIDEO:
                        // when recording both audio and video, recordrtc
                        // calls this twice on chrome, first with audio data
                        // and then with video data.
                        // on firefox it's called once but with a single
                        // blob that includes both audio and video data.
                        if (recording.video !== undefined) {
                            // data is video-only but on firefox audio+video
                            _this2.recordedData = recording.video;

                            // on the chrome browser two blobs are created
                            // containing the separate audio/video streams.
                            if (recordType === _recordMode.AUDIO_VIDEO && (0, _detectBrowser.isChrome)()) {
                                // store both audio and video
                                _this2.recordedData = recording;

                                for (var mtype in _this2.recordedData) {
                                    _this2.addFileInfo(_this2.recordedData[mtype]);
                                }
                            } else {
                                _this2.addFileInfo(_this2.recordedData);
                            }

                            // notify listeners
                            _this2.trigger('recordComplete');
                        }
                        break;

                    case _recordMode.ANIMATION:
                        _this2.recordedData = recording.gif;

                        _this2.addFileInfo(_this2.recordedData);

                        // notify listeners
                        _this2.trigger('recordComplete');
                        break;
                }
            });
        }
    }]);

    return RecordRTCEngine;
}(_recordEngine.RecordEngine);

// expose plugin


videojs.RecordRTCEngine = RecordRTCEngine;

Component.registerComponent('RecordRTCEngine', RecordRTCEngine);

exports.default = RecordRTCEngine;
},{"../utils/detect-browser":16,"./record-engine":8,"./record-mode":9}],11:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file lamejs-plugin.js
 * @since 1.1.0
 */

var RecordEngine = videojs.getComponent('RecordEngine');

/**
 * Audio-only engine for the lamejs library.
 *
 * @class
 * @augments videojs.RecordEngine
 */

var LamejsEngine = function (_RecordEngine) {
    _inherits(LamejsEngine, _RecordEngine);

    function LamejsEngine() {
        _classCallCheck(this, LamejsEngine);

        return _possibleConstructorReturn(this, (LamejsEngine.__proto__ || Object.getPrototypeOf(LamejsEngine)).apply(this, arguments));
    }

    _createClass(LamejsEngine, [{
        key: 'setup',

        /**
         * Setup recording engine.
         */
        value: function setup(stream, mediaType, debug) {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;
            this.audioType = 'audio/mp3';

            var config = {
                debug: this.debug,
                sampleRate: this.sampleRate,
                bitRate: this.bitRate
            };

            this.audioContext = new AudioContext();
            this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream);
            this.processor = this.audioContext.createScriptProcessor(16384, 1, 1);

            this.engine = new Worker(this.audioWorkerURL);
            this.engine.onmessage = this.onWorkerMessage.bind(this);

            this.engine.postMessage({ cmd: 'init', config: config });
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            this.processor.onaudioprocess = this.onAudioProcess.bind(this);
            this.audioSourceNode.connect(this.processor);
            this.processor.connect(this.audioContext.destination);
        }

        /**
         * Stop recording.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.audioSourceNode.disconnect();
            this.processor.disconnect();
            this.processor.onaudioprocess = null;
            this.inputStream.getAudioTracks().forEach(function (track) {
                return track.stop();
            });
            this.audioContext.close();

            this.engine.postMessage({ cmd: 'finish' });
        }

        /**
         * Received a message from the worker.
         */

    }, {
        key: 'onWorkerMessage',
        value: function onWorkerMessage(ev) {
            switch (ev.data.cmd) {
                case 'end':
                    this.onStopRecording(new Blob(ev.data.buf, { type: this.audioType }));
                    break;

                case 'error':
                    this.player().trigger('error', ev.data.error);
                    break;

                default:
                    // invalid message received
                    this.player().trigger('error', ev.data);
                    break;
            }
        }

        /**
         * Continuous encoding of audio data.
         * @private
         */

    }, {
        key: 'onAudioProcess',
        value: function onAudioProcess(ev) {
            // send microphone data to LAME for MP3 encoding while recording
            var data = ev.inputBuffer.getChannelData(0);

            this.engine.postMessage({ cmd: 'encode', buf: data });
        }
    }]);

    return LamejsEngine;
}(RecordEngine);

// expose plugin


videojs.LamejsEngine = LamejsEngine;

exports.default = LamejsEngine;
},{}],12:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file libvorbis-plugin.js
 * @since 1.1.0
 */

var RecordEngine = videojs.getComponent('RecordEngine');

/**
 * Audio-only engine for the libvorbis.js library.
 *
 * @class
 * @augments videojs.RecordPlugin
 */

var LibVorbisEngine = function (_RecordEngine) {
    _inherits(LibVorbisEngine, _RecordEngine);

    function LibVorbisEngine() {
        _classCallCheck(this, LibVorbisEngine);

        return _possibleConstructorReturn(this, (LibVorbisEngine.__proto__ || Object.getPrototypeOf(LibVorbisEngine)).apply(this, arguments));
    }

    _createClass(LibVorbisEngine, [{
        key: 'setup',

        /**
         * Setup recording engine.
         */
        value: function setup(stream, mediaType, debug) {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            // setup libvorbis.js
            this.options = {
                audioBitsPerSecond: this.sampleRate
            };
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            this.chunks = [];
            this.engine = new VorbisMediaRecorder(this.inputStream, this.options);
            this.engine.ondataavailable = this.onData.bind(this);
            this.engine.onstop = this.onRecordingAvailable.bind(this);

            this.engine.start();
        }

        /**
         * Stop recording.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.engine.stop();
        }

        /**
         * @private
         */

    }, {
        key: 'onData',
        value: function onData(event) {
            this.chunks.push(event.data);
        }

        /**
         * @private
         */

    }, {
        key: 'onRecordingAvailable',
        value: function onRecordingAvailable() {
            var blob = new Blob(this.chunks, { type: this.chunks[0].type });
            this.chunks = [];
            this.onStopRecording(blob);
        }
    }]);

    return LibVorbisEngine;
}(RecordEngine);

// expose plugin


videojs.LibVorbisEngine = LibVorbisEngine;

exports.default = LibVorbisEngine;
},{}],13:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file opus-recorder-plugin.js
 * @since 1.1.0
 */

var RecordEngine = videojs.getComponent('RecordEngine');

/**
 * Audio-only engine for the opus-recorder library.
 *
 * Audio is encoded using libopus.
 *
 * @class
 * @augments videojs.RecordEngine
 */

var OpusRecorderEngine = function (_RecordEngine) {
    _inherits(OpusRecorderEngine, _RecordEngine);

    function OpusRecorderEngine() {
        _classCallCheck(this, OpusRecorderEngine);

        return _possibleConstructorReturn(this, (OpusRecorderEngine.__proto__ || Object.getPrototypeOf(OpusRecorderEngine)).apply(this, arguments));
    }

    _createClass(OpusRecorderEngine, [{
        key: 'setup',

        /**
         * Setup recording engine.
         */
        value: function setup(stream, mediaType, debug) {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            // also supports 'audio/wav'; but make sure to use waveEncoder worker
            // in that case
            this.audioType = 'audio/ogg';

            this.engine = new Recorder({
                leaveStreamOpen: true,
                numberOfChannels: this.audioChannels,
                bufferLength: this.bufferSize,
                encoderSampleRate: this.sampleRate,
                encoderPath: this.audioWorkerURL
            });
            this.engine.ondataavailable = this.onRecordingAvailable.bind(this);

            this.audioContext = new AudioContext();
            this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream);
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            var _this2 = this;

            this.engine.start(this.audioSourceNode).then(function () {
                // recording started ok
            }).catch(function (err) {
                // can't start playback
                _this2.player().trigger('error', err);
            });
        }

        /**
         * Stop recording.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.engine.stop();
        }

        /**
         * Pause recording.
         */

    }, {
        key: 'pause',
        value: function pause() {
            this.engine.pause();
        }

        /**
         * Resume recording.
         */

    }, {
        key: 'resume',
        value: function resume() {
            this.engine.resume();
        }

        /**
         * @private
         */

    }, {
        key: 'onRecordingAvailable',
        value: function onRecordingAvailable(data) {
            // Opus format stored in an Ogg container
            var blob = new Blob([data], { type: this.audioType });

            this.onStopRecording(blob);
        }
    }]);

    return OpusRecorderEngine;
}(RecordEngine);

// expose plugin


videojs.OpusRecorderEngine = OpusRecorderEngine;

exports.default = OpusRecorderEngine;
},{}],14:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @file recorderjs-plugin.js
 * @since 1.1.0
 */

var RecordEngine = videojs.getComponent('RecordEngine');

/**
 * Audio-only engine for the recorder.js library.
 *
 * @class
 * @augments videojs.RecordEngine
 */

var RecorderjsEngine = function (_RecordEngine) {
    _inherits(RecorderjsEngine, _RecordEngine);

    function RecorderjsEngine() {
        _classCallCheck(this, RecorderjsEngine);

        return _possibleConstructorReturn(this, (RecorderjsEngine.__proto__ || Object.getPrototypeOf(RecorderjsEngine)).apply(this, arguments));
    }

    _createClass(RecorderjsEngine, [{
        key: 'setup',

        /**
         * Setup recording engine.
         */
        value: function setup(stream, mediaType, debug) {
            this.inputStream = stream;
            this.mediaType = mediaType;
            this.debug = debug;

            this.audioContext = new AudioContext();
            this.audioSourceNode = this.audioContext.createMediaStreamSource(this.inputStream);

            // setup recorder.js
            this.engine = new Recorder(this.audioSourceNode, {
                bufferLen: this.bufferSize,
                numChannels: this.audioChannels
            });
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            this.engine.record();
        }

        /**
         * Stop recording.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.engine.stop();

            this.engine.exportWAV(this.onStopRecording.bind(this));

            this.engine.clear();
        }
    }]);

    return RecorderjsEngine;
}(RecordEngine);

// expose plugin


videojs.RecorderjsEngine = RecorderjsEngine;

exports.default = RecorderjsEngine;
},{}],15:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file browser-shim.js
 * @since 2.0.0
 */

var setSrcObject = function setSrcObject(stream, element, ignoreCreateObjectURL) {
    if ('createObjectURL' in URL && !ignoreCreateObjectURL) {
        try {
            element.src = URL.createObjectURL(stream);
        } catch (e) {
            setSrcObject(stream, element, true);
            return;
        }
    } else if ('srcObject' in element) {
        element.srcObject = stream;
    } else if ('mozSrcObject' in element) {
        element.mozSrcObject = stream;
    } else {
        console.log('createObjectURL/srcObject both are not supported.');
    }
};

exports.default = setSrcObject;
},{}],16:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isSafari = exports.isChrome = exports.isOpera = exports.isEdge = exports.detectBrowser = undefined;

var _window = require('global/window');

var _window2 = _interopRequireDefault(_window);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Browser detector.
 *
 * @private
 * @return {object} result containing browser, version and minVersion
 *     properties.
 */
var detectBrowser = function detectBrowser() {
    // returned result object
    var result = {};
    result.browser = null;
    result.version = null;
    result.minVersion = null;

    // fail early if it's not a browser
    if (typeof _window2.default === 'undefined' || !_window2.default.navigator) {
        result.browser = 'Not a supported browser.';
        return result;
    }

    // Firefox
    if (navigator.mozGetUserMedia) {
        result.browser = 'firefox';
        result.version = extractVersion(navigator.userAgent, /Firefox\/(\d+)\./, 1);
        result.minVersion = 31;
    } else if (navigator.webkitGetUserMedia) {
        // Chrome, Chromium, Webview, Opera
        if (_window2.default.webkitRTCPeerConnection) {
            result.browser = 'chrome';
            result.version = extractVersion(navigator.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
            result.minVersion = 38;
        } else {
            // Safari (in an unpublished version) or unknown webkit-based.
            if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
                result.browser = 'safari';
                result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
                result.minVersion = 11;
            } else {
                // unknown webkit-based browser.
                result.browser = 'Unsupported webkit-based browser ' + 'with GUM support but no WebRTC support.';
                return result;
            }
        }
        // Edge
    } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
        result.browser = 'edge';
        result.version = extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
        result.minVersion = 10547;
    } else if (navigator.mediaDevices && navigator.userAgent.match(/AppleWebKit\/(\d+)\./)) {
        // Safari, with webkitGetUserMedia removed.
        result.browser = 'safari';
        result.version = extractVersion(navigator.userAgent, /AppleWebKit\/(\d+)\./, 1);
    } else {
        // default fallthrough: not supported.
        result.browser = 'Not a supported browser.';
        return result;
    }

    return result;
};

/**
 * Extract browser version out of the provided user agent string.
 *
 * @private
 * @param {!string} uastring - userAgent string.
 * @param {!string} expr - Regular expression used as match criteria.
 * @param {!number} pos - position in the version string to be
 *     returned.
 * @return {!number} browser version.
 */
/**
 * @file detect-browser.js
 * @since 2.0.0
 */

var extractVersion = function extractVersion(uastring, expr, pos) {
    var match = uastring.match(expr);
    return match && match.length >= pos && parseInt(match[pos], 10);
};

var isEdge = function isEdge() {
    return detectBrowser().browser === 'edge';
};

var isSafari = function isSafari() {
    return detectBrowser().browser === 'safari';
};

var isOpera = function isOpera() {
    return !!_window2.default.opera || navigator.userAgent.indexOf('OPR/') !== -1;
};

var isChrome = function isChrome() {
    return detectBrowser().browser === 'chrome';
};

exports.detectBrowser = detectBrowser;
exports.isEdge = isEdge;
exports.isOpera = isOpera;
exports.isChrome = isChrome;
exports.isSafari = isSafari;
},{"global/window":19}],17:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
/**
 * @file format-time.js
 * @since 2.0.0
 */

/**
 * Format seconds as a time string, H:MM:SS, M:SS or M:SS:MMM.
 *
 * Supplying a guide (in seconds) will force a number of leading zeros
 * to cover the length of the guide.
 *
 * @param {number} seconds - Number of seconds to be turned into a
 *     string.
 * @param {number} guide - Number (in seconds) to model the string
 *     after.
 * @param {number} msDisplayMax - Number (in milliseconds) to model the string
 *     after.
 * @return {string} Time formatted as H:MM:SS, M:SS or M:SS:MMM, e.g.
 *     0:00:12.
 * @private
 */
var formatTime = function formatTime(seconds, guide, msDisplayMax) {
    // Default to using seconds as guide
    seconds = seconds < 0 ? 0 : seconds;
    guide = guide || seconds;
    var s = Math.floor(seconds % 60),
        m = Math.floor(seconds / 60 % 60),
        h = Math.floor(seconds / 3600),
        gm = Math.floor(guide / 60 % 60),
        gh = Math.floor(guide / 3600),
        ms = Math.floor((seconds - s) * 1000);

    // handle invalid times
    if (isNaN(seconds) || seconds === Infinity) {
        // '-' is false for all relational operators (e.g. <, >=) so this
        // setting will add the minimum number of fields specified by the
        // guide
        h = m = s = ms = '-';
    }

    // Check if we need to show milliseconds
    if (guide > 0 && guide < msDisplayMax) {
        if (ms < 100) {
            if (ms < 10) {
                ms = '00' + ms;
            } else {
                ms = '0' + ms;
            }
        }
        ms = ':' + ms;
    } else {
        ms = '';
    }

    // Check if we need to show hours
    h = h > 0 || gh > 0 ? h + ':' : '';

    // If hours are showing, we may need to add a leading zero.
    // Always show at least one digit of minutes.
    m = ((h || gm >= 10) && m < 10 ? '0' + m : m) + ':';

    // Check if leading zero is need for seconds
    s = s < 10 ? '0' + s : s;

    return h + m + s + ms;
};

exports.default = formatTime;
},{}],18:[function(require,module,exports){
(function (global){
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _animationDisplay = require('./controls/animation-display');

var _animationDisplay2 = _interopRequireDefault(_animationDisplay);

var _recordCanvas = require('./controls/record-canvas');

var _recordCanvas2 = _interopRequireDefault(_recordCanvas);

var _deviceButton = require('./controls/device-button');

var _deviceButton2 = _interopRequireDefault(_deviceButton);

var _cameraButton = require('./controls/camera-button');

var _cameraButton2 = _interopRequireDefault(_cameraButton);

var _recordToggle = require('./controls/record-toggle');

var _recordToggle2 = _interopRequireDefault(_recordToggle);

var _recordIndicator = require('./controls/record-indicator');

var _recordIndicator2 = _interopRequireDefault(_recordIndicator);

var _defaults = require('./defaults');

var _defaults2 = _interopRequireDefault(_defaults);

var _formatTime = require('./utils/format-time');

var _formatTime2 = _interopRequireDefault(_formatTime);

var _browserShim = require('./utils/browser-shim');

var _browserShim2 = _interopRequireDefault(_browserShim);

var _detectBrowser = require('./utils/detect-browser');

var _recordRtc = require('./engine/record-rtc');

var _recordRtc2 = _interopRequireDefault(_recordRtc);

var _recordEngine = require('./engine/record-engine');

var _recordMode = require('./engine/record-mode');

var _video = (typeof window !== "undefined" ? window['videojs'] : typeof global !== "undefined" ? global['videojs'] : null);

var _video2 = _interopRequireDefault(_video);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @file videojs.record.js
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * The main file for the videojs-record project.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * MIT license: https://github.com/collab-project/videojs-record/blob/master/LICENSE
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var Plugin = _video2.default.getPlugin('plugin');
var Player = _video2.default.getComponent('Player');

var AUTO = 'auto';

// monkey-patch play (#152)
Player.prototype.play = function play() {
    var retval = this.techGet_('play');
    // silence errors (unhandled promise from play)
    if (retval !== undefined && typeof retval.then === 'function') {
        retval.then(null, function (e) {});
    }
    return retval;
};

/**
 * Record audio/video/images using the Video.js player.
 *
 * @class
 * @augments videojs.Plugin
 */

var Record = function (_Plugin) {
    _inherits(Record, _Plugin);

    /**
     * The constructor function for the class.
     *
     * @param {(videojs.Player|Object)} player
     * @param {Object} options - Player options.
     */
    function Record(player, options) {
        _classCallCheck(this, Record);

        // setup plugin options
        var _this = _possibleConstructorReturn(this, (Record.__proto__ || Object.getPrototypeOf(Record)).call(this, player, options));

        _this.loadOptions();

        // (re)set recorder state
        _this.resetState();

        // add device button with icon based on type
        var deviceIcon = 'av-perm';
        switch (_this.getRecordType()) {
            case _recordMode.IMAGE_ONLY:
            case _recordMode.VIDEO_ONLY:
            case _recordMode.ANIMATION:
                deviceIcon = 'video-perm';
                break;
            case _recordMode.AUDIO_ONLY:
                deviceIcon = 'audio-perm';
                break;
        }
        _deviceButton2.default.prototype.buildCSSClass = function () {
            // use dynamic icon class
            return 'vjs-device-button vjs-control vjs-icon-' + deviceIcon;
        };
        player.deviceButton = new _deviceButton2.default(player, options);
        player.addChild(player.deviceButton);

        // add blinking record indicator
        player.recordIndicator = new _recordIndicator2.default(player, options);
        player.recordIndicator.hide();
        player.addChild(player.recordIndicator);

        // add canvas for recording and displaying image
        player.recordCanvas = new _recordCanvas2.default(player, options);
        player.recordCanvas.hide();
        player.addChild(player.recordCanvas);

        // add image for animation display
        player.animationDisplay = new _animationDisplay2.default(player, options);
        player.animationDisplay.hide();
        player.addChild(player.animationDisplay);

        // add camera button
        player.cameraButton = new _cameraButton2.default(player, options);
        player.cameraButton.hide();

        // add record toggle
        player.recordToggle = new _recordToggle2.default(player, options);
        player.recordToggle.hide();

        // wait until player ui is ready
        _this.player.one('ready', _this.setupUI.bind(_this));
        return _this;
    }

    /**
     * Setup plugin options.
     */


    _createClass(Record, [{
        key: 'loadOptions',
        value: function loadOptions() {
            var recordOptions = _video2.default.mergeOptions(_defaults2.default, this.player.options_.plugins.record);

            // record settings
            this.recordImage = recordOptions.image;
            this.recordAudio = recordOptions.audio;
            this.recordVideo = recordOptions.video;
            this.recordAnimation = recordOptions.animation;
            this.maxLength = recordOptions.maxLength;
            this.debug = recordOptions.debug;
            this.recordTimeSlice = recordOptions.timeSlice;

            // video/canvas settings
            this.videoFrameWidth = recordOptions.frameWidth;
            this.videoFrameHeight = recordOptions.frameHeight;
            this.videoRecorderType = recordOptions.videoRecorderType;
            this.videoMimeType = recordOptions.videoMimeType;

            // audio settings
            this.audioEngine = recordOptions.audioEngine;
            this.audioRecorderType = recordOptions.audioRecorderType;
            this.audioWorkerURL = recordOptions.audioWorkerURL;
            this.audioBufferSize = recordOptions.audioBufferSize;
            this.audioSampleRate = recordOptions.audioSampleRate;
            this.audioBitRate = recordOptions.audioBitRate;
            this.audioChannels = recordOptions.audioChannels;
            this.audioMimeType = recordOptions.audioMimeType;

            // animation settings
            this.animationFrameRate = recordOptions.animationFrameRate;
            this.animationQuality = recordOptions.animationQuality;
        }

        /**
         * Player UI is ready.
         * @private
         */

    }, {
        key: 'setupUI',
        value: function setupUI() {
            var _this2 = this;

            // insert custom controls on left-side of controlbar
            this.player.controlBar.addChild(this.player.cameraButton);
            this.player.controlBar.el().insertBefore(this.player.cameraButton.el(), this.player.controlBar.el().firstChild);
            this.player.controlBar.el().insertBefore(this.player.recordToggle.el(), this.player.controlBar.el().firstChild);

            // get rid of unused controls
            if (this.player.controlBar.remainingTimeDisplay !== undefined) {
                this.player.controlBar.remainingTimeDisplay.el().style.display = 'none';
            }
            if (this.player.controlBar.liveDisplay !== undefined) {
                this.player.controlBar.liveDisplay.el().style.display = 'none';
            }

            // loop feature is never used in this plugin
            this.player.loop(false);

            // tweak player UI based on type
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // reference to videojs-wavesurfer plugin
                    this.surfer = this.player.wavesurfer();
                    break;

                case _recordMode.IMAGE_ONLY:
                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                case _recordMode.ANIMATION:
                    // customize controls
                    this.player.bigPlayButton.hide();

                    // loadedmetadata resets the durationDisplay for the
                    // first time
                    this.player.one('loadedmetadata', function () {
                        // display max record time
                        _this2.setDuration(_this2.maxLength);
                    });

                    // the native controls don't work for this UI so disable
                    // them no matter what
                    if (this.player.usingNativeControls_ === true) {
                        if (this.player.tech_.el_ !== undefined) {
                            this.player.tech_.el_.controls = false;
                        }
                    }

                    // clicking or tapping the player video element should not try
                    // to start playback
                    this.player.removeTechControlsListeners_();

                    if (this.player.options_.controls) {
                        // progress control isn't used by this plugin
                        this.player.controlBar.progressControl.hide();

                        // prevent controlbar fadeout
                        this.player.on('userinactive', function (event) {
                            _this2.player.userActive(true);
                        });

                        // videojs automatically hides the controls when no valid 'source'
                        // element is included in the video or audio tag. Don't. Ever again.
                        this.player.controlBar.show();
                        this.player.controlBar.el().style.display = 'flex';
                    }
                    break;
            }

            // disable time display events that constantly try to reset the current time
            // and duration values
            this.player.off('timeupdate');
            this.player.off('durationchange');
            this.player.off('loadedmetadata');

            // display max record time
            this.setDuration(this.maxLength);

            // hide play control
            this.player.controlBar.playToggle.hide();
        }

        /**
         * Indicates whether the plugin is currently recording or not.
         *
         * @return {boolean} Plugin currently recording or not.
         */

    }, {
        key: 'isRecording',
        value: function isRecording() {
            return this._recording;
        }

        /**
         * Indicates whether the plugin is currently processing recorded data
         * or not.
         *
         * @return {boolean} Plugin processing or not.
         */

    }, {
        key: 'isProcessing',
        value: function isProcessing() {
            return this._processing;
        }

        /**
         * Indicates whether the plugin is destroyed or not.
         *
         * @return {boolean} Plugin destroyed or not.
         */

    }, {
        key: 'isDestroyed',
        value: function isDestroyed() {
            return this.player && this.player.children() === null;
        }

        /**
         * Open the browser's recording device selection dialog.
         */

    }, {
        key: 'getDevice',
        value: function getDevice() {
            // define device callbacks once
            if (this.deviceReadyCallback === undefined) {
                this.deviceReadyCallback = this.onDeviceReady.bind(this);
            }
            if (this.deviceErrorCallback === undefined) {
                this.deviceErrorCallback = this.onDeviceError.bind(this);
            }
            if (this.engineStopCallback === undefined) {
                this.engineStopCallback = this.onRecordComplete.bind(this);
            }
            // ask the browser to give the user access to the media device
            // and get a stream reference in the callback function
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // setup microphone
                    this.mediaType = {
                        audio: this.audioRecorderType === AUTO ? true : this.audioRecorderType,
                        video: false
                    };
                    // remove existing microphone listeners
                    this.surfer.surfer.microphone.un('deviceReady', this.deviceReadyCallback);
                    this.surfer.surfer.microphone.un('deviceError', this.deviceErrorCallback);

                    // setup new microphone listeners
                    this.surfer.surfer.microphone.on('deviceReady', this.deviceReadyCallback);
                    this.surfer.surfer.microphone.on('deviceError', this.deviceErrorCallback);

                    // disable existing playback events
                    this.surfer.setupPlaybackEvents(false);

                    // (re)set surfer liveMode
                    this.surfer.liveMode = true;
                    this.surfer.surfer.microphone.paused = false;

                    // open browser device selection dialog
                    this.surfer.surfer.microphone.start();
                    break;

                case _recordMode.IMAGE_ONLY:
                case _recordMode.VIDEO_ONLY:
                    // setup camera
                    this.mediaType = {
                        audio: false,
                        video: this.videoRecorderType === AUTO ? true : this.videoRecorderType
                    };
                    navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: this.getRecordType() === _recordMode.IMAGE_ONLY ? this.recordImage : this.recordVideo
                    }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
                    break;

                case _recordMode.AUDIO_VIDEO:
                    // setup camera and microphone
                    this.mediaType = {
                        audio: this.audioRecorderType === AUTO ? true : this.audioRecorderType,
                        video: this.videoRecorderType === AUTO ? true : this.videoRecorderType
                    };
                    navigator.mediaDevices.getUserMedia({
                        audio: this.recordAudio,
                        video: this.recordVideo
                    }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
                    break;

                case _recordMode.ANIMATION:
                    // setup camera
                    this.mediaType = {
                        // animated GIF
                        audio: false,
                        video: false,
                        gif: true
                    };
                    navigator.mediaDevices.getUserMedia({
                        audio: false,
                        video: this.recordAnimation
                    }).then(this.onDeviceReady.bind(this)).catch(this.onDeviceError.bind(this));
                    break;
            }
        }

        /**
         * Invoked when the device is ready.
         * @private
         * @param stream: LocalMediaStream instance.
         */

    }, {
        key: 'onDeviceReady',
        value: function onDeviceReady(stream) {
            var _this3 = this;

            this._deviceActive = true;

            // store reference to stream for stopping etc.
            this.stream = stream;

            // hide device selection button
            this.player.deviceButton.hide();

            // reset time (e.g. when stopDevice was used)
            this.setDuration(this.maxLength);
            this.setCurrentTime(0);

            // hide play/pause control (e.g. when stopDevice was used)
            this.player.controlBar.playToggle.hide();

            // reset playback listeners
            this.off(this.player, 'timeupdate', this.playbackTimeUpdate);
            this.off(this.player, 'ended', this.playbackTimeUpdate);

            // setup recording engine
            if (this.getRecordType() !== _recordMode.IMAGE_ONLY) {
                // currently libvorbis.js, recorder.js, opus-recorder and lamejs
                // are only supported in audio-only mode
                if (this.getRecordType() !== _recordMode.AUDIO_ONLY && (this.audioEngine === _recordEngine.LIBVORBISJS || this.audioEngine === _recordEngine.RECORDERJS || this.audioEngine === _recordEngine.LAMEJS || this.audioEngine === _recordEngine.OPUSRECORDER)) {
                    throw new Error('Currently ' + this.audioEngine + ' is only supported in audio-only mode.');
                }

                // get recorder class
                var EngineClass;
                switch (this.audioEngine) {
                    case _recordEngine.RECORDRTC:
                        // RecordRTC.js (default)
                        EngineClass = _video2.default.RecordRTCEngine;
                        break;

                    case _recordEngine.LIBVORBISJS:
                        // libvorbis.js
                        EngineClass = _video2.default.LibVorbisEngine;
                        break;

                    case _recordEngine.RECORDERJS:
                        // recorder.js
                        EngineClass = _video2.default.RecorderjsEngine;
                        break;

                    case _recordEngine.LAMEJS:
                        // lamejs
                        EngineClass = _video2.default.LamejsEngine;
                        break;

                    case _recordEngine.OPUSRECORDER:
                        // opus-recorder
                        EngineClass = _video2.default.OpusRecorderEngine;
                        break;

                    default:
                        // unknown engine
                        throw new Error('Unknown audioEngine: ' + this.audioEngine);
                }
                try {
                    // connect stream to recording engine
                    this.engine = new EngineClass(this.player, this.player.options_);
                } catch (err) {
                    console.error(err);
                    throw new Error('Could not load ' + this.audioEngine + ' plugin');
                }

                // listen for events
                this.engine.on('recordComplete', this.engineStopCallback);

                // audio settings
                this.engine.bufferSize = this.audioBufferSize;
                this.engine.sampleRate = this.audioSampleRate;
                this.engine.bitRate = this.audioBitRate;
                this.engine.audioChannels = this.audioChannels;
                this.engine.audioWorkerURL = this.audioWorkerURL;

                // mime type
                this.engine.mimeType = {
                    video: this.videoMimeType,
                    gif: 'image/gif'
                };
                if (this.audioMimeType !== null && this.audioMimeType !== AUTO) {
                    this.engine.mimeType.audio = this.audioMimeType;
                }

                // video/canvas settings
                this.engine.video = {
                    width: this.videoFrameWidth,
                    height: this.videoFrameHeight
                };
                this.engine.canvas = {
                    width: this.videoFrameWidth,
                    height: this.videoFrameHeight
                };

                // animated GIF settings
                this.engine.quality = this.animationQuality;
                this.engine.frameRate = this.animationFrameRate;

                // timeSlice
                if (this.recordTimeSlice && this.recordTimeSlice > 0) {
                    this.engine.timeSlice = this.recordTimeSlice;
                    this.engine.onTimeStamp = this.onTimeStamp.bind(this);
                }

                // initialize recorder
                this.engine.setup(this.stream, this.mediaType, this.debug);

                // show elements that should never be hidden in animation,
                // audio and/or video modus
                var uiElements = [this.player.controlBar.currentTimeDisplay, this.player.controlBar.timeDivider, this.player.controlBar.durationDisplay];
                uiElements.forEach(function (element) {
                    if (element !== undefined) {
                        element.el().style.display = 'block';
                        element.show();
                    }
                });

                // show record button
                this.player.recordToggle.show();
            } else {
                // disable record indicator
                this.player.recordIndicator.disable();

                // setup UI for retrying snapshot (e.g. when stopDevice was
                // used)
                this.retrySnapshot();

                // reset and show camera button
                this.player.cameraButton.onStop();
                this.player.cameraButton.show();
            }

            // setup preview
            if (this.getRecordType() !== _recordMode.AUDIO_ONLY) {
                // show live preview
                this.mediaElement = this.player.el().firstChild;
                this.mediaElement.controls = false;

                // mute incoming audio for feedback loops
                this.mediaElement.muted = true;

                // hide the volume bar while it's muted
                this.displayVolumeControl(false);

                // load stream
                this.load(this.stream);

                // stream loading is async, so we wait until it's ready to play
                // the stream
                this.player.one('loadedmetadata', function () {
                    // start stream
                    _this3.mediaElement.play();

                    // forward to listeners
                    _this3.player.trigger('deviceReady');
                });
            } else {
                // forward to listeners
                this.player.trigger('deviceReady');
            }
        }

        /**
         * Invoked when an device error occurred.
         * @private
         */

    }, {
        key: 'onDeviceError',
        value: function onDeviceError(code) {
            this._deviceActive = false;

            // store code
            this.player.deviceErrorCode = code;

            // forward error to player
            this.player.trigger('deviceError');
        }

        /**
         * Start recording.
         */

    }, {
        key: 'start',
        value: function start() {
            var _this4 = this;

            if (!this.isProcessing()) {
                this._recording = true;

                // hide play/pause control
                this.player.controlBar.playToggle.hide();

                // reset playback listeners
                this.off(this.player, 'timeupdate', this.playbackTimeUpdate);
                this.off(this.player, 'ended', this.playbackTimeUpdate);

                // start preview
                switch (this.getRecordType()) {
                    case _recordMode.AUDIO_ONLY:
                        // disable playback events
                        this.surfer.setupPlaybackEvents(false);

                        // start/resume live audio visualization
                        this.surfer.surfer.microphone.paused = false;
                        this.surfer.liveMode = true;
                        this.surfer.surfer.microphone.play();
                        break;

                    case _recordMode.VIDEO_ONLY:
                    case _recordMode.AUDIO_VIDEO:
                        // preview video stream in video element
                        this.startVideoPreview();
                        break;

                    case _recordMode.ANIMATION:
                        // hide the first frame
                        this.player.recordCanvas.hide();

                        // hide the animation
                        this.player.animationDisplay.hide();

                        // show preview video
                        this.mediaElement.style.display = 'block';

                        // for animations, capture the first frame
                        // that can be displayed as soon as recording
                        // is complete
                        this.captureFrame().then(function (result) {
                            // start video preview **after** capturing first frame
                            _this4.startVideoPreview();
                        });
                        break;
                }

                // start recording
                switch (this.getRecordType()) {
                    case _recordMode.IMAGE_ONLY:
                        // create snapshot
                        this.createSnapshot();

                        // notify UI
                        this.player.trigger('startRecord');
                        break;

                    case _recordMode.VIDEO_ONLY:
                    case _recordMode.AUDIO_VIDEO:
                    case _recordMode.ANIMATION:
                        // wait for media stream on video element to actually load
                        this.player.one('loadedmetadata', function () {
                            // start actually recording process
                            _this4.startRecording();
                        });
                        break;

                    default:
                        // all resources have already loaded, so we can start
                        // recording right away
                        this.startRecording();
                }
            }
        }

        /**
         * Start recording.
         * @private
         */

    }, {
        key: 'startRecording',
        value: function startRecording() {
            // register starting point
            this.paused = false;
            this.pauseTime = this.pausedTime = 0;
            this.startTime = new Date().getTime();

            // start countdown
            this.countDown = this.player.setInterval(this.onCountDown.bind(this), 100);

            // cleanup previous recording
            if (this.engine !== undefined) {
                this.engine.dispose();
            }

            // start recording stream
            this.engine.start();

            // notify UI
            this.player.trigger('startRecord');
        }

        /**
         * Stop recording.
         */

    }, {
        key: 'stop',
        value: function stop() {
            if (!this.isProcessing()) {
                this._recording = false;
                this._processing = true;

                if (this.getRecordType() !== _recordMode.IMAGE_ONLY) {
                    // notify UI
                    this.player.trigger('stopRecord');

                    // stop countdown
                    this.player.clearInterval(this.countDown);

                    // stop recording stream (result will be available async)
                    if (this.engine) {
                        this.engine.stop();
                    }
                } else {
                    if (this.player.recordedData) {
                        // notify listeners that image data is (already) available
                        this.player.trigger('finishRecord');
                    }
                }
            }
        }

        /**
         * Stop device(s) and recording if active.
         */

    }, {
        key: 'stopDevice',
        value: function stopDevice() {
            if (this.isRecording()) {
                // stop stream once recorded data is available,
                // otherwise it'll break recording
                this.player.one('finishRecord', this.stopStream.bind(this));

                // stop recording
                this.stop();
            } else {
                // stop stream now, since there's no recorded data available
                this.stopStream();
            }
        }

        /**
         * Stop stream and device.
         */

    }, {
        key: 'stopStream',
        value: function stopStream() {
            // stop stream and device
            if (this.stream) {
                this._deviceActive = false;

                if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
                    // make the microphone plugin stop it's device
                    this.surfer.surfer.microphone.stopDevice();
                    return;
                }
                this.stream.getTracks().forEach(function (stream) {
                    stream.stop();
                });
            }
        }

        /**
         * Pause recording.
         */

    }, {
        key: 'pause',
        value: function pause() {
            if (!this.paused) {
                this.pauseTime = new Date().getTime();
                this.paused = true;

                this.engine.pause();
            }
        }

        /**
         * Resume recording.
         */

    }, {
        key: 'resume',
        value: function resume() {
            if (this.paused) {
                this.pausedTime += new Date().getTime() - this.pauseTime;

                this.engine.resume();
                this.paused = false;
            }
        }

        /**
         * Invoked when recording completed and the resulting stream is
         * available.
         * @private
         */

    }, {
        key: 'onRecordComplete',
        value: function onRecordComplete() {
            var _this5 = this;

            // store reference to recorded stream data
            this.player.recordedData = this.engine.recordedData;

            // change the replay button back to a play button
            this.player.controlBar.playToggle.removeClass('vjs-ended');
            this.player.controlBar.playToggle.show();

            // notify listeners that data is available
            this.player.trigger('finishRecord');

            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // pause player so user can start playback
                    this.surfer.pause();

                    // setup events for playback
                    this.surfer.setupPlaybackEvents(true);

                    // display loader
                    this.player.loadingSpinner.show();

                    // restore interaction with controls after waveform
                    // rendering is complete
                    this.surfer.surfer.once('ready', function () {
                        _this5._processing = false;
                    });

                    // visualize recorded stream
                    this.load(this.player.recordedData);
                    break;

                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                    // pausing the player so we can visualize the recorded data
                    // will trigger an async video.js 'pause' event that we
                    // have to wait for.
                    this.player.one('pause', function () {
                        // video data is ready
                        _this5._processing = false;

                        // hide loader
                        _this5.player.loadingSpinner.hide();

                        // show stream total duration
                        _this5.setDuration(_this5.streamDuration);

                        // update time during playback and at end
                        _this5.on(_this5.player, 'timeupdate', _this5.playbackTimeUpdate);
                        _this5.on(_this5.player, 'ended', _this5.playbackTimeUpdate);

                        // unmute local audio during playback
                        if (_this5.getRecordType() === _recordMode.AUDIO_VIDEO) {
                            _this5.mediaElement.muted = false;

                            // show the volume bar when it's unmuted
                            _this5.displayVolumeControl(true);
                        }

                        // load recorded media
                        if ((0, _detectBrowser.isChrome)() && _this5.getRecordType() === _recordMode.AUDIO_VIDEO) {
                            // use video property on Chrome
                            _this5.load(_this5.player.recordedData.video);
                        } else {
                            _this5.load(_this5.player.recordedData);
                        }
                    });

                    // pause player so user can start playback
                    this.player.pause();
                    break;

                case _recordMode.ANIMATION:
                    // animation data is ready
                    this._processing = false;

                    // hide loader
                    this.player.loadingSpinner.hide();

                    // show animation total duration
                    this.setDuration(this.streamDuration);

                    // hide preview video
                    this.mediaElement.style.display = 'none';

                    // show the first frame
                    this.player.recordCanvas.show();

                    // pause player so user can start playback
                    this.player.pause();

                    // show animation on play
                    this.on(this.player, 'play', this.showAnimation);

                    // hide animation on pause
                    this.on(this.player, 'pause', this.hideAnimation);
                    break;
            }
        }

        /**
         * Invoked during recording and displays the remaining time.
         * @private
         */

    }, {
        key: 'onCountDown',
        value: function onCountDown() {
            if (!this.paused) {
                var now = new Date().getTime();
                var duration = this.maxLength;
                var currentTime = (now - (this.startTime + this.pausedTime)) / 1000;

                this.streamDuration = currentTime;

                if (currentTime >= duration) {
                    // at the end
                    currentTime = duration;

                    // stop recording
                    this.stop();
                }

                // update duration
                this.setDuration(duration);

                // update current time
                this.setCurrentTime(currentTime, duration);

                // notify listeners
                this.player.trigger('progressRecord');
            }
        }

        /**
         * Get the current time of the recorded stream during playback.
         *
         * Returns 0 if no recording is available (yet).
         */

    }, {
        key: 'getCurrentTime',
        value: function getCurrentTime() {
            var currentTime = isNaN(this.streamCurrentTime) ? 0 : this.streamCurrentTime;

            if (this.getRecordType() === _recordMode.AUDIO_ONLY) {
                currentTime = this.surfer.getCurrentTime();
            }

            return currentTime;
        }

        /**
         * Updates the player's element displaying the current time.
         *
         * @private
         * @param {number} [currentTime=0] - Current position of the
         *    playhead (in seconds).
         * @param {number} [duration=0] - Duration in seconds.
         */

    }, {
        key: 'setCurrentTime',
        value: function setCurrentTime(currentTime, duration) {
            currentTime = isNaN(currentTime) ? 0 : currentTime;
            duration = isNaN(duration) ? 0 : duration;

            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    this.surfer.setCurrentTime(currentTime, duration);
                    break;

                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                case _recordMode.ANIMATION:
                    this.streamCurrentTime = Math.min(currentTime, duration);

                    // update current time display component
                    this.player.controlBar.currentTimeDisplay.formattedTime_ = this.player.controlBar.currentTimeDisplay.contentEl().lastChild.textContent = (0, _formatTime2.default)(this.streamCurrentTime, duration, this.msDisplayMax);
                    break;
            }
        }

        /**
         * Get the length of the recorded stream in seconds.
         *
         * Returns 0 if no recording is available (yet).
         */

    }, {
        key: 'getDuration',
        value: function getDuration() {
            var duration = isNaN(this.streamDuration) ? 0 : this.streamDuration;

            return duration;
        }

        /**
         * Updates the player's element displaying the duration time.
         *
         * @param {number} [duration=0] - Duration in seconds.
         * @private
         */

    }, {
        key: 'setDuration',
        value: function setDuration(duration) {
            duration = isNaN(duration) ? 0 : duration;

            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    this.surfer.setDuration(duration);
                    break;

                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                case _recordMode.ANIMATION:
                    // update duration display component
                    this.player.controlBar.durationDisplay.formattedTime_ = this.player.controlBar.durationDisplay.contentEl().lastChild.textContent = (0, _formatTime2.default)(duration, duration, this.msDisplayMax);
                    break;
            }
        }

        /**
         * Start loading data.
         *
         * @param {(string|blob|file)} url - Either the URL of the media file,
         *     a Blob, a File object or MediaStream.
         */

    }, {
        key: 'load',
        value: function load(url) {
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // visualize recorded Blob stream
                    this.surfer.load(url);
                    break;

                case _recordMode.IMAGE_ONLY:
                case _recordMode.VIDEO_ONLY:
                case _recordMode.AUDIO_VIDEO:
                case _recordMode.ANIMATION:
                    if (url instanceof Blob || url instanceof File) {
                        // assign blob using createObjectURL
                        (0, _browserShim2.default)(url, this.mediaElement, false);
                    } else {
                        // assign stream without createObjectURL
                        (0, _browserShim2.default)(url, this.mediaElement, true);
                    }
                    break;
            }
        }

        /**
         * Show save as dialog in browser so the user can store the recorded media
         * locally.
         *
         * @param {object} name - Object with one or more names for the particular
         *     blob(s) you want to save. File extensions are added automatically.
         *     For example: {'video': 'name-of-video-file'}. Supported keys are
         *     'audio', 'video' and 'gif'.
         */

    }, {
        key: 'saveAs',
        value: function saveAs(name) {
            if (this.engine && name !== undefined) {
                this.engine.saveAs(name);
            }
        }

        /**
         * Destroy plugin only.
         *
         * Use `destroy` to remove the plugin and the player.
         */

    }, {
        key: 'dispose',
        value: function dispose() {
            // disable common event listeners
            this.player.off('ready');
            this.player.off('userinactive');
            this.player.off('loadedmetadata');

            // prevent callbacks if recording is in progress
            if (this.engine) {
                this.engine.dispose();
                this.engine.off('recordComplete', this.engineStopCallback);
            }

            // stop recording and device
            this.stop();
            this.stopDevice();

            // stop countdown
            this.player.clearInterval(this.countDown);

            // dispose wavesurfer.js
            if (this.getRecordType() == _recordMode.AUDIO_ONLY) {
                if (this.surfer) {
                    // also disposes player
                    this.surfer.destroy();
                }
            }

            this.resetState();

            _get(Record.prototype.__proto__ || Object.getPrototypeOf(Record.prototype), 'dispose', this).call(this);
        }

        /**
         * Destroy plugin and players and cleanup resources.
         */

    }, {
        key: 'destroy',
        value: function destroy() {
            this.player.dispose();
        }

        /**
         * Reset the plugin.
         */

    }, {
        key: 'reset',
        value: function reset() {
            var _this6 = this;

            // prevent callbacks if recording is in progress
            if (this.engine) {
                this.engine.dispose();
                this.engine.off('recordComplete', this.engineStopCallback);
            }

            // stop recording and device
            this.stop();
            this.stopDevice();

            // stop countdown
            this.player.clearInterval(this.countDown);

            // reset options
            this.loadOptions();

            // reset recorder state
            this.resetState();

            // reset record time
            this.setDuration(this.maxLength);
            this.setCurrentTime(0);

            // reset player
            this.player.reset();
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    if (this.surfer && this.surfer.surfer) {
                        // empty last frame
                        this.surfer.surfer.empty();
                    }
                    break;

                case _recordMode.IMAGE_ONLY:
                case _recordMode.ANIMATION:
                    // reset UI
                    this.player.recordCanvas.hide();
                    this.player.cameraButton.hide();
                    break;
            }

            // hide play control
            this.player.controlBar.playToggle.hide();

            // show device selection button
            this.player.deviceButton.show();

            // hide record button
            this.player.recordToggle.hide();

            // loadedmetadata resets the durationDisplay for the
            // first time
            this.player.one('loadedmetadata', function () {
                // display max record time
                _this6.setDuration(_this6.maxLength);
            });
        }

        /**
         * Reset the plugin recorder state.
         * @private
         */

    }, {
        key: 'resetState',
        value: function resetState() {
            this._recording = false;
            this._processing = false;
            this._deviceActive = false;
            this.devices = [];
        }

        /**
         * Get recorder type.
         */

    }, {
        key: 'getRecordType',
        value: function getRecordType() {
            return (0, _recordMode.getRecorderMode)(this.recordImage, this.recordAudio, this.recordVideo, this.recordAnimation);
        }

        /**
         * Create and display snapshot image.
         * @private
         */

    }, {
        key: 'createSnapshot',
        value: function createSnapshot() {
            var _this7 = this;

            this.captureFrame().then(function (result) {
                // turn the canvas data into base64 data with a PNG header
                _this7.player.recordedData = result.toDataURL('image/png');

                // hide preview video
                _this7.mediaElement.style.display = 'none';

                // show the snapshot
                _this7.player.recordCanvas.show();

                // stop recording
                _this7.stop();
            });
        }

        /**
         * Reset UI for retrying a snapshot image.
         * @private
         */

    }, {
        key: 'retrySnapshot',
        value: function retrySnapshot() {
            this._processing = false;

            // retry: hide the snapshot
            this.player.recordCanvas.hide();

            // show preview video
            this.player.el().firstChild.style.display = 'block';
        }

        /**
         * Capture frame from camera and copy data to canvas.
         * @private
         */

    }, {
        key: 'captureFrame',
        value: function captureFrame() {
            var _this8 = this;

            var detected = (0, _detectBrowser.detectBrowser)();
            var recordCanvas = this.player.recordCanvas.el().firstChild;

            // set the canvas size to the dimensions of the camera,
            // which also wipes the content of the canvas
            recordCanvas.width = this.player.width();
            recordCanvas.height = this.player.height();

            return new Promise(function (resolve, reject) {
                // MediaCapture is only supported on:
                // - Chrome 60 and newer (see
                // https://github.com/w3c/mediacapture-image/blob/gh-pages/implementation-status.md)
                // - Firefox behind flag (https://bugzilla.mozilla.org/show_bug.cgi?id=888177)
                //
                // importing ImageCapture can fail when enabling chrome flag is still required.
                // if so; ignore and continue
                if (detected.browser === 'chrome' && detected.version >= 60 && (typeof ImageCapture === 'undefined' ? 'undefined' : _typeof(ImageCapture)) === (typeof Function === 'undefined' ? 'undefined' : _typeof(Function))) {
                    try {
                        var track = _this8.stream.getVideoTracks()[0];
                        var imageCapture = new ImageCapture(track);
                        var photoSettings = {
                            imageWidth: recordCanvas.width,
                            imageHeight: recordCanvas.height
                        };

                        // take picture
                        imageCapture.takePhoto(photoSettings).then(function (blob) {
                            return createImageBitmap(blob);
                        }).then(function (imageBitmap) {
                            // get a frame and copy it onto the canvas
                            _this8.drawCanvas(recordCanvas, imageBitmap);

                            // notify others
                            resolve(recordCanvas);
                        });
                        return;
                    } catch (err) {}
                }
                // no ImageCapture available: do it the oldskool way

                // get a frame and copy it onto the canvas
                _this8.drawCanvas(recordCanvas, _this8.mediaElement);

                // notify others
                resolve(recordCanvas);
            });
        }

        /**
         * Draw image frame on canvas element.
         * @private
         */

    }, {
        key: 'drawCanvas',
        value: function drawCanvas(canvas, element) {
            canvas.getContext('2d').drawImage(element, 0, 0, canvas.width, canvas.height);
        }

        /**
         * Start preview of video stream.
         * @private
         */

    }, {
        key: 'startVideoPreview',
        value: function startVideoPreview() {
            // disable playback events
            this.off('timeupdate');
            this.off('durationchange');
            this.off('loadedmetadata');
            this.off('play');

            // mute local audio
            this.mediaElement.muted = true;

            // hide volume control to prevent feedback
            this.displayVolumeControl(false);

            // start or resume live preview
            this.load(this.stream);
            this.mediaElement.play();
        }

        /**
         * Show animated GIF.
         * @private
         */

    }, {
        key: 'showAnimation',
        value: function showAnimation() {
            var animationDisplay = this.player.animationDisplay.el().firstChild;

            // set the image size to the dimensions of the recorded animation
            animationDisplay.width = this.player.width();
            animationDisplay.height = this.player.height();

            // hide the first frame
            this.player.recordCanvas.hide();

            // show the animation
            (0, _browserShim2.default)(this.player.recordedData, animationDisplay, false);
            this.player.animationDisplay.show();
        }

        /**
         * Hide animated GIF.
         * @private
         */

    }, {
        key: 'hideAnimation',
        value: function hideAnimation() {
            // show the first frame
            this.player.recordCanvas.show();

            // hide the animation
            this.player.animationDisplay.hide();
        }

        /**
         * Update time during playback.
         * @private
         */

    }, {
        key: 'playbackTimeUpdate',
        value: function playbackTimeUpdate() {
            this.setCurrentTime(this.player.currentTime(), this.streamDuration);
        }

        /**
         * Received new timestamp (when timeSlice option is enabled).
         * @private
         */

    }, {
        key: 'onTimeStamp',
        value: function onTimeStamp(current, all) {
            this.player.currentTimestamp = current;
            this.player.allTimestamps = all;

            // get blob (only for MediaStreamRecorder)
            var internal;
            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    internal = this.engine.engine.audioRecorder;
                    break;

                case _recordMode.ANIMATION:
                    internal = this.engine.engine.gifRecorder;
                    break;

                default:
                    internal = this.engine.engine.videoRecorder;
            }
            internal = internal.getInternalRecorder();
            if (internal instanceof MediaStreamRecorder === true) {
                this.player.recordedData = internal.getArrayOfBlobs();

                // inject file info for newest blob
                this.engine.addFileInfo(this.player.recordedData[this.player.recordedData.length - 1]);
            }

            // notify others
            this.player.trigger('timestamp');
        }

        /**
         * Collects information about the media input and output devices
         * available on the system.
         *
         * Returns an array.
         */

    }, {
        key: 'enumerateDevices',
        value: function enumerateDevices() {
            var _this9 = this;

            if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
                this.player.enumerateErrorCode = 'enumerateDevices() not supported.';
                this.player.trigger('enumerateError');
                return;
            }

            // List cameras and microphones.
            navigator.mediaDevices.enumerateDevices(this).then(function (devices) {
                _this9.devices = [];
                devices.forEach(function (device) {
                    _this9.devices.push(device);
                });

                // notify listeners
                _this9.player.trigger('enumerateReady');
            }).catch(function (err) {
                _this9.player.enumerateErrorCode = err;
                _this9.player.trigger('enumerateError');
            });
        }

        /**
         * Change the audio output device.
         *
         * @param {string} deviceId - Id of audio output device.
         */

    }, {
        key: 'setAudioOutput',
        value: function setAudioOutput(deviceId) {
            var _this10 = this;

            var errorMessage = void 0;

            switch (this.getRecordType()) {
                case _recordMode.AUDIO_ONLY:
                    // use wavesurfer
                    this.surfer.surfer.setSinkId(deviceId).then(function (result) {
                        // notify listeners
                        _this10.player.trigger('audioOutputReady');
                    }).catch(function (err) {
                        errorMessage = err;
                    });
                    break;

                default:
                    var element = player.tech_.el_;
                    if (deviceId) {
                        if (typeof element.sinkId !== 'undefined') {
                            element.setSinkId(deviceId).then(function (result) {
                                // notify listeners
                                _this10.player.trigger('audioOutputReady');
                            }).catch(function (err) {
                                errorMessage = err;
                            });
                        } else {
                            errorMessage = 'Browser does not support audio output device selection.';
                        }
                    } else {
                        errorMessage = 'Invalid deviceId: ' + deviceId;
                    }
                    break;
            }

            // error if we get here: notify listeners
            if (errorMessage) {
                this.player.trigger('error', errorMessage);
            }
        }

        /**
         * Show or hide the volume menu.
         *
         * @private
         * @param {boolean} display - Hide/show volume control.
         */

    }, {
        key: 'displayVolumeControl',
        value: function displayVolumeControl(display) {
            if (this.player.controlBar.volumePanel !== undefined) {
                if (display === true) {
                    display = 'flex';
                } else {
                    display = 'none';
                }
                this.player.controlBar.volumePanel.el().style.display = display;
            }
        }
    }]);

    return Record;
}(Plugin);

// version nr gets replaced during build


Record.VERSION = 'dev';

// register plugin
_video2.default.Record = Record;
_video2.default.registerPlugin('record', Record);

// export plugin
module.exports = {
    Record: Record
};
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./controls/animation-display":1,"./controls/camera-button":2,"./controls/device-button":3,"./controls/record-canvas":4,"./controls/record-indicator":5,"./controls/record-toggle":6,"./defaults":7,"./engine/record-engine":8,"./engine/record-mode":9,"./engine/record-rtc":10,"./utils/browser-shim":15,"./utils/detect-browser":16,"./utils/format-time":17}],19:[function(require,module,exports){
(function (global){
var win;

if (typeof window !== "undefined") {
    win = window;
} else if (typeof global !== "undefined") {
    win = global;
} else if (typeof self !== "undefined"){
    win = self;
} else {
    win = {};
}

module.exports = win;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}],20:[function(require,module,exports){
/* eslint-disable no-var */
/* eslint-env qunit */
var q = window.QUnit;

var vr = require('../es5/videojs.record.js');

q.module('Browserify Require videojs.record');
q.test('videojs.record should be requirable and bundled via browserify', function(assert) {
    assert.ok(vr, 'videojs.record is required properly');
});

var lame = require('../es5/plugins/lamejs-plugin.js');

q.module('Browserify Require lamejs');
q.test('lamejs plugin should be requirable and bundled via browserify', function(assert) {
    assert.ok(lame, 'videojs.record.lamejs is required properly');
});


var libvorbis = require('../es5/plugins/libvorbis-plugin.js');

q.module('Browserify Require libvorbis');
q.test('libvorbis plugin should be requirable and bundled via browserify', function(assert) {
    assert.ok(libvorbis, 'videojs.record.libvorbis is required properly');
});


var opus = require('../es5/plugins/opus-recorder-plugin.js');

q.module('Browserify Require opus-recorder');
q.test('opus-recorder plugin should be requirable and bundled via browserify', function(assert) {
    assert.ok(opus, 'videojs.record.opus-recorder is required properly');
});


var recorderjs = require('../es5/plugins/recorderjs-plugin.js');

q.module('Browserify Require recorderjs');
q.test('recorderjs plugin should be requirable and bundled via browserify', function(assert) {
    assert.ok(recorderjs, 'videojs.record.recorderjs is required properly');
});

},{"../es5/plugins/lamejs-plugin.js":11,"../es5/plugins/libvorbis-plugin.js":12,"../es5/plugins/opus-recorder-plugin.js":13,"../es5/plugins/recorderjs-plugin.js":14,"../es5/videojs.record.js":18}]},{},[20])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJlczUvY29udHJvbHMvYW5pbWF0aW9uLWRpc3BsYXkuanMiLCJlczUvY29udHJvbHMvY2FtZXJhLWJ1dHRvbi5qcyIsImVzNS9jb250cm9scy9kZXZpY2UtYnV0dG9uLmpzIiwiZXM1L2NvbnRyb2xzL3JlY29yZC1jYW52YXMuanMiLCJlczUvY29udHJvbHMvcmVjb3JkLWluZGljYXRvci5qcyIsImVzNS9jb250cm9scy9yZWNvcmQtdG9nZ2xlLmpzIiwiZXM1L2RlZmF1bHRzLmpzIiwiZXM1L2VuZ2luZS9yZWNvcmQtZW5naW5lLmpzIiwiZXM1L2VuZ2luZS9yZWNvcmQtbW9kZS5qcyIsImVzNS9lbmdpbmUvcmVjb3JkLXJ0Yy5qcyIsImVzNS9wbHVnaW5zL2xhbWVqcy1wbHVnaW4uanMiLCJlczUvcGx1Z2lucy9saWJ2b3JiaXMtcGx1Z2luLmpzIiwiZXM1L3BsdWdpbnMvb3B1cy1yZWNvcmRlci1wbHVnaW4uanMiLCJlczUvcGx1Z2lucy9yZWNvcmRlcmpzLXBsdWdpbi5qcyIsImVzNS91dGlscy9icm93c2VyLXNoaW0uanMiLCJlczUvdXRpbHMvZGV0ZWN0LWJyb3dzZXIuanMiLCJlczUvdXRpbHMvZm9ybWF0LXRpbWUuanMiLCJlczUvdmlkZW9qcy5yZWNvcmQuanMiLCJub2RlX21vZHVsZXMvZ2xvYmFsL3dpbmRvdy5qcyIsInRlc3QvYnJvd3NlcmlmeS10ZXN0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25LQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN09BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQ3hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7OztBQzlpREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCl7ZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9cmV0dXJuIGV9KSgpIiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSBhbmltYXRpb24tZGlzcGxheS5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxudmFyIENvbXBvbmVudCA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdDb21wb25lbnQnKTtcblxuLyoqXG4gKiBJbWFnZSBmb3IgZGlzcGxheWluZyBhbmltYXRlZCBHSUYgaW1hZ2UuXG4gKlxuICogQGNsYXNzXG4gKiBAYXVnbWVudHMgdmlkZW9qcy5Db21wb25lbnRcbiovXG5cbnZhciBBbmltYXRpb25EaXNwbGF5ID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKEFuaW1hdGlvbkRpc3BsYXksIF9Db21wb25lbnQpO1xuXG4gIGZ1bmN0aW9uIEFuaW1hdGlvbkRpc3BsYXkoKSB7XG4gICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIEFuaW1hdGlvbkRpc3BsYXkpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChBbmltYXRpb25EaXNwbGF5Ll9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQW5pbWF0aW9uRGlzcGxheSkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICB9XG5cbiAgX2NyZWF0ZUNsYXNzKEFuaW1hdGlvbkRpc3BsYXksIFt7XG4gICAga2V5OiAnY3JlYXRlRWwnLFxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGBBbmltYXRpb25EaXNwbGF5YHMgRE9NIGVsZW1lbnQuXG4gICAgICpcbiAgICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgICAqICAgICAgICAgVGhlIGRvbSBlbGVtZW50IHRoYXQgZ2V0cyBjcmVhdGVkLlxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBjcmVhdGVFbCgpIHtcbiAgICAgIHJldHVybiBfZ2V0KEFuaW1hdGlvbkRpc3BsYXkucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQW5pbWF0aW9uRGlzcGxheS5wcm90b3R5cGUpLCAnY3JlYXRlRWwnLCB0aGlzKS5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3Zqcy1hbmltYXRpb24tZGlzcGxheScsXG4gICAgICAgIGlubmVySFRNTDogJzxpbWcgLz4nXG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gQW5pbWF0aW9uRGlzcGxheTtcbn0oQ29tcG9uZW50KTtcblxuQ29tcG9uZW50LnJlZ2lzdGVyQ29tcG9uZW50KCdBbmltYXRpb25EaXNwbGF5JywgQW5pbWF0aW9uRGlzcGxheSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IEFuaW1hdGlvbkRpc3BsYXk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSBjYW1lcmEtYnV0dG9uLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG52YXIgQnV0dG9uID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0J1dHRvbicpO1xudmFyIENvbXBvbmVudCA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdDb21wb25lbnQnKTtcblxuLyoqXG4gKiBCdXR0b24gdG8gdG9nZ2xlIGJldHdlZW4gY3JlYXRlIGFuZCByZXRyeSBzbmFwc2hvdCBpbWFnZS5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLkJ1dHRvblxuKi9cblxudmFyIENhbWVyYUJ1dHRvbiA9IGZ1bmN0aW9uIChfQnV0dG9uKSB7XG4gIF9pbmhlcml0cyhDYW1lcmFCdXR0b24sIF9CdXR0b24pO1xuXG4gIGZ1bmN0aW9uIENhbWVyYUJ1dHRvbigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgQ2FtZXJhQnV0dG9uKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoQ2FtZXJhQnV0dG9uLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2FtZXJhQnV0dG9uKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoQ2FtZXJhQnV0dG9uLCBbe1xuICAgIGtleTogJ2J1aWxkQ1NTQ2xhc3MnLFxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSBkZWZhdWx0IERPTSBgY2xhc3NOYW1lYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKiAgICAgICAgIFRoZSBET00gYGNsYXNzTmFtZWAgZm9yIHRoaXMgb2JqZWN0LlxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZENTU0NsYXNzKCkge1xuICAgICAgcmV0dXJuICd2anMtY2FtZXJhLWJ1dHRvbiB2anMtY29udHJvbCB2anMtYnV0dG9uIHZqcy1pY29uLXBob3RvLWNhbWVyYSc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRoZSBgQ2FtZXJhQnV0dG9uYCBlbGVtZW50IHNvIHRoYXQgaXQgY2FuIGJlIGFjdGl2YXRlZCBvciBjbGlja2VkLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdlbmFibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBfZ2V0KENhbWVyYUJ1dHRvbi5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihDYW1lcmFCdXR0b24ucHJvdG90eXBlKSwgJ2VuYWJsZScsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgIHRoaXMub24odGhpcy5wbGF5ZXJfLCAnc3RhcnRSZWNvcmQnLCB0aGlzLm9uU3RhcnQpO1xuICAgICAgdGhpcy5vbih0aGlzLnBsYXllcl8sICdzdG9wUmVjb3JkJywgdGhpcy5vblN0b3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgdGhlIGBDYW1lcmFCdXR0b25gIGVsZW1lbnQgc28gdGhhdCBpdCBjYW5ub3QgYmUgYWN0aXZhdGVkIG9yIGNsaWNrZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgX2dldChDYW1lcmFCdXR0b24ucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoQ2FtZXJhQnV0dG9uLnByb3RvdHlwZSksICdkaXNhYmxlJywgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgdGhpcy5vZmYodGhpcy5wbGF5ZXJfLCAnc3RhcnRSZWNvcmQnLCB0aGlzLm9uU3RhcnQpO1xuICAgICAgdGhpcy5vZmYodGhpcy5wbGF5ZXJfLCAnc3RvcFJlY29yZCcsIHRoaXMub25TdG9wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGdldHMgY2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudFRhcmdldH5FdmVudH0gZXZlbnRcbiAgICAgKiAgICAgICAgVGhlIGB0YXBgIG9yIGBjbGlja2AgZXZlbnQgdGhhdCBjYXVzZWQgdGhpcyBmdW5jdGlvbiB0byBiZVxuICAgICAqICAgICAgICBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyB0YXBcbiAgICAgKiBAbGlzdGVucyBjbGlja1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVDbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICB2YXIgcmVjb3JkZXIgPSB0aGlzLnBsYXllcl8ucmVjb3JkKCk7XG5cbiAgICAgIGlmICghcmVjb3JkZXIuaXNQcm9jZXNzaW5nKCkpIHtcbiAgICAgICAgLy8gY3JlYXRlIHNuYXBzaG90XG4gICAgICAgIHJlY29yZGVyLnN0YXJ0KCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyByZXRyeVxuICAgICAgICByZWNvcmRlci5yZXRyeVNuYXBzaG90KCk7XG5cbiAgICAgICAgLy8gcmVzZXQgY2FtZXJhIGJ1dHRvblxuICAgICAgICB0aGlzLm9uU3RvcCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgdmpzLWljb24tcmVwbGF5IGNsYXNzIHRvIHRoZSBlbGVtZW50IHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnRUYXJnZXR+RXZlbnR9IFtldmVudF1cbiAgICAgKiAgICAgICAgVGhlIGV2ZW50IHRoYXQgY2F1c2VkIHRoaXMgZnVuY3Rpb24gdG8gcnVuLlxuICAgICAqXG4gICAgICogQGxpc3RlbnMgUGxheWVyI3N0YXJ0UmVjb3JkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uU3RhcnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblN0YXJ0KGV2ZW50KSB7XG4gICAgICAvLyByZXBsYWNlIGVsZW1lbnQgY2xhc3Mgc28gaXQgY2FuIGNoYW5nZSBhcHBlYXJhbmNlXG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtaWNvbi1waG90by1jYW1lcmEnKTtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1pY29uLXJlcGxheScpO1xuXG4gICAgICAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0XG4gICAgICB0aGlzLmNvbnRyb2xUZXh0KCdSZXRyeScpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgdmpzLWljb24tcGhvdG8tY2FtZXJhIGNsYXNzIHRvIHRoZSBlbGVtZW50IHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnRUYXJnZXR+RXZlbnR9IFtldmVudF1cbiAgICAgKiAgICAgICAgVGhlIGV2ZW50IHRoYXQgY2F1c2VkIHRoaXMgZnVuY3Rpb24gdG8gcnVuLlxuICAgICAqXG4gICAgICogQGxpc3RlbnMgUGxheWVyI3N0b3BSZWNvcmRcbiAgICAgKi9cblxuICB9LCB7XG4gICAga2V5OiAnb25TdG9wJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gb25TdG9wKGV2ZW50KSB7XG4gICAgICAvLyByZXBsYWNlIGVsZW1lbnQgY2xhc3Mgc28gaXQgY2FuIGNoYW5nZSBhcHBlYXJhbmNlXG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtaWNvbi1yZXBsYXknKTtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1pY29uLXBob3RvLWNhbWVyYScpO1xuXG4gICAgICAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0XG4gICAgICB0aGlzLmNvbnRyb2xUZXh0KCdJbWFnZScpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBDYW1lcmFCdXR0b247XG59KEJ1dHRvbik7XG5cbi8qKlxuICogVGhlIHRleHQgdGhhdCBzaG91bGQgZGlzcGxheSBvdmVyIHRoZSBgQ2FtZXJhQnV0dG9uYHMgY29udHJvbHMuIEFkZGVkIGZvciBsb2NhbGl6YXRpb24uXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cblxuXG5DYW1lcmFCdXR0b24ucHJvdG90eXBlLmNvbnRyb2xUZXh0XyA9ICdJbWFnZSc7XG5cbkNvbXBvbmVudC5yZWdpc3RlckNvbXBvbmVudCgnQ2FtZXJhQnV0dG9uJywgQ2FtZXJhQnV0dG9uKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gQ2FtZXJhQnV0dG9uOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIGRldmljZS1idXR0b24uanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbnZhciBCdXR0b24gPSB2aWRlb2pzLmdldENvbXBvbmVudCgnQnV0dG9uJyk7XG52YXIgQ29tcG9uZW50ID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0NvbXBvbmVudCcpO1xuXG4vKipcbiAqIEJ1dHRvbiB0byBzZWxlY3QgcmVjb3JkaW5nIGRldmljZS5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLkJ1dHRvblxuKi9cblxudmFyIERldmljZUJ1dHRvbiA9IGZ1bmN0aW9uIChfQnV0dG9uKSB7XG4gIF9pbmhlcml0cyhEZXZpY2VCdXR0b24sIF9CdXR0b24pO1xuXG4gIGZ1bmN0aW9uIERldmljZUJ1dHRvbigpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgRGV2aWNlQnV0dG9uKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoRGV2aWNlQnV0dG9uLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoRGV2aWNlQnV0dG9uKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoRGV2aWNlQnV0dG9uLCBbe1xuICAgIGtleTogJ2hhbmRsZUNsaWNrJyxcblxuICAgIC8qKlxuICAgICAqIFRoaXMgZ2V0cyBjYWxsZWQgd2hlbiB0aGlzIGJ1dHRvbiBnZXRzOlxuICAgICAqXG4gICAgICogLSBDbGlja2VkICh2aWEgdGhlIGBjbGlja2AgZXZlbnQsIGxpc3RlbmluZyBzdGFydHMgaW4gdGhlIGNvbnN0cnVjdG9yKVxuICAgICAqIC0gVGFwcGVkICh2aWEgdGhlIGB0YXBgIGV2ZW50LCBsaXN0ZW5pbmcgc3RhcnRzIGluIHRoZSBjb25zdHJ1Y3RvcilcbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnRUYXJnZXR+RXZlbnR9IGV2ZW50XG4gICAgICogICAgICAgIFRoZSBga2V5ZG93bmAsIGB0YXBgLCBvciBgY2xpY2tgIGV2ZW50IHRoYXQgY2F1c2VkIHRoaXMgZnVuY3Rpb24gdG8gYmVcbiAgICAgKiAgICAgICAgY2FsbGVkLlxuICAgICAqXG4gICAgICogQGxpc3RlbnMgdGFwXG4gICAgICogQGxpc3RlbnMgY2xpY2tcbiAgICAgKi9cbiAgICB2YWx1ZTogZnVuY3Rpb24gaGFuZGxlQ2xpY2soZXZlbnQpIHtcbiAgICAgIC8vIG9wZW4gZGV2aWNlIGRpYWxvZ1xuICAgICAgdGhpcy5wbGF5ZXJfLnJlY29yZCgpLmdldERldmljZSgpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBEZXZpY2VCdXR0b247XG59KEJ1dHRvbik7XG5cbi8qKlxuICogVGhlIHRleHQgdGhhdCBzaG91bGQgZGlzcGxheSBvdmVyIHRoZSBgRGV2aWNlQnV0dG9uYHMgY29udHJvbHMuIEFkZGVkIGZvciBsb2NhbGl6YXRpb24uXG4gKlxuICogQHR5cGUge3N0cmluZ31cbiAqIEBwcml2YXRlXG4gKi9cblxuXG5EZXZpY2VCdXR0b24ucHJvdG90eXBlLmNvbnRyb2xUZXh0XyA9ICdEZXZpY2UnO1xuXG5Db21wb25lbnQucmVnaXN0ZXJDb21wb25lbnQoJ0RldmljZUJ1dHRvbicsIERldmljZUJ1dHRvbik7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IERldmljZUJ1dHRvbjsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIHJlY29yZC1jYW52YXNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbnZhciBDb21wb25lbnQgPSB2aWRlb2pzLmdldENvbXBvbmVudCgnQ29tcG9uZW50Jyk7XG5cbi8qKlxuICogQ2FudmFzIGZvciBkaXNwbGF5aW5nIHNuYXBzaG90IGltYWdlLlxuICpcbiAqIEBjbGFzc1xuICogQGF1Z21lbnRzIHZpZGVvanMuQ29tcG9uZW50XG4qL1xuXG52YXIgUmVjb3JkQ2FudmFzID0gZnVuY3Rpb24gKF9Db21wb25lbnQpIHtcbiAgX2luaGVyaXRzKFJlY29yZENhbnZhcywgX0NvbXBvbmVudCk7XG5cbiAgZnVuY3Rpb24gUmVjb3JkQ2FudmFzKCkge1xuICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWNvcmRDYW52YXMpO1xuXG4gICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChSZWNvcmRDYW52YXMuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihSZWNvcmRDYW52YXMpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgfVxuXG4gIF9jcmVhdGVDbGFzcyhSZWNvcmRDYW52YXMsIFt7XG4gICAga2V5OiAnY3JlYXRlRWwnLFxuXG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGUgdGhlIGBSZWNvcmRDYW52YXNgcyBET00gZWxlbWVudC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge0VsZW1lbnR9XG4gICAgICogICAgICAgICBUaGUgZG9tIGVsZW1lbnQgdGhhdCBnZXRzIGNyZWF0ZWQuXG4gICAgICovXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZUVsKCkge1xuICAgICAgcmV0dXJuIF9nZXQoUmVjb3JkQ2FudmFzLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlY29yZENhbnZhcy5wcm90b3R5cGUpLCAnY3JlYXRlRWwnLCB0aGlzKS5jYWxsKHRoaXMsICdkaXYnLCB7XG4gICAgICAgIGNsYXNzTmFtZTogJ3Zqcy1yZWNvcmQtY2FudmFzJyxcbiAgICAgICAgaW5uZXJIVE1MOiAnPGNhbnZhcz48L2NhbnZhcz4nXG4gICAgICB9KTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmVjb3JkQ2FudmFzO1xufShDb21wb25lbnQpO1xuXG5Db21wb25lbnQucmVnaXN0ZXJDb21wb25lbnQoJ1JlY29yZENhbnZhcycsIFJlY29yZENhbnZhcyk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJlY29yZENhbnZhczsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbnZhciBfZ2V0ID0gZnVuY3Rpb24gZ2V0KG9iamVjdCwgcHJvcGVydHksIHJlY2VpdmVyKSB7IGlmIChvYmplY3QgPT09IG51bGwpIG9iamVjdCA9IEZ1bmN0aW9uLnByb3RvdHlwZTsgdmFyIGRlc2MgPSBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG9iamVjdCwgcHJvcGVydHkpOyBpZiAoZGVzYyA9PT0gdW5kZWZpbmVkKSB7IHZhciBwYXJlbnQgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqZWN0KTsgaWYgKHBhcmVudCA9PT0gbnVsbCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IGVsc2UgeyByZXR1cm4gZ2V0KHBhcmVudCwgcHJvcGVydHksIHJlY2VpdmVyKTsgfSB9IGVsc2UgaWYgKFwidmFsdWVcIiBpbiBkZXNjKSB7IHJldHVybiBkZXNjLnZhbHVlOyB9IGVsc2UgeyB2YXIgZ2V0dGVyID0gZGVzYy5nZXQ7IGlmIChnZXR0ZXIgPT09IHVuZGVmaW5lZCkgeyByZXR1cm4gdW5kZWZpbmVkOyB9IHJldHVybiBnZXR0ZXIuY2FsbChyZWNlaXZlcik7IH0gfTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIHJlY29yZC1pbmRpY2F0b3IuanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbnZhciBDb21wb25lbnQgPSB2aWRlb2pzLmdldENvbXBvbmVudCgnQ29tcG9uZW50Jyk7XG5cbi8qKlxuICogSWNvbiBpbmRpY2F0aW5nIHJlY29yZGluZyBpcyBhY3RpdmUuXG4gKlxuICogQGNsYXNzXG4gKiBAYXVnbWVudHMgdmlkZW9qcy5Db21wb25lbnRcbiovXG5cbnZhciBSZWNvcmRJbmRpY2F0b3IgPSBmdW5jdGlvbiAoX0NvbXBvbmVudCkge1xuICBfaW5oZXJpdHMoUmVjb3JkSW5kaWNhdG9yLCBfQ29tcG9uZW50KTtcblxuICAvKipcbiAgICogVGhlIGNvbnN0cnVjdG9yIGZ1bmN0aW9uIGZvciB0aGUgY2xhc3MuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSB7KHZpZGVvanMuUGxheWVyfE9iamVjdCl9IHBsYXllciAtIFZpZGVvLmpzIHBsYXllciBpbnN0YW5jZS5cbiAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBQbGF5ZXIgb3B0aW9ucy5cbiAgICovXG4gIGZ1bmN0aW9uIFJlY29yZEluZGljYXRvcihwbGF5ZXIsIG9wdGlvbnMpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVjb3JkSW5kaWNhdG9yKTtcblxuICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChSZWNvcmRJbmRpY2F0b3IuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihSZWNvcmRJbmRpY2F0b3IpKS5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucykpO1xuXG4gICAgX3RoaXMuZW5hYmxlKCk7XG4gICAgcmV0dXJuIF90aGlzO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSB0aGUgYFJlY29yZEluZGljYXRvcmBzIERPTSBlbGVtZW50LlxuICAgKlxuICAgKiBAcmV0dXJuIHtFbGVtZW50fVxuICAgKiAgICAgICAgIFRoZSBkb20gZWxlbWVudCB0aGF0IGdldHMgY3JlYXRlZC5cbiAgICovXG5cblxuICBfY3JlYXRlQ2xhc3MoUmVjb3JkSW5kaWNhdG9yLCBbe1xuICAgIGtleTogJ2NyZWF0ZUVsJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gY3JlYXRlRWwoKSB7XG4gICAgICByZXR1cm4gX2dldChSZWNvcmRJbmRpY2F0b3IucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkSW5kaWNhdG9yLnByb3RvdHlwZSksICdjcmVhdGVFbCcsIHRoaXMpLmNhbGwodGhpcywgJ2RpdicsIHtcbiAgICAgICAgY2xhc3NOYW1lOiAndmpzLXJlY29yZC1pbmRpY2F0b3IgdmpzLWNvbnRyb2wnLFxuICAgICAgICBkaXI6ICdsdHInXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBFbmFibGUgZXZlbnQgaGFuZGxlcnMuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2VuYWJsZScsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGVuYWJsZSgpIHtcbiAgICAgIHRoaXMub24odGhpcy5wbGF5ZXJfLCAnc3RhcnRSZWNvcmQnLCB0aGlzLnNob3cpO1xuICAgICAgdGhpcy5vbih0aGlzLnBsYXllcl8sICdzdG9wUmVjb3JkJywgdGhpcy5oaWRlKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEaXNhYmxlIGV2ZW50IGhhbmRsZXJzLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdkaXNhYmxlJyxcbiAgICB2YWx1ZTogZnVuY3Rpb24gZGlzYWJsZSgpIHtcbiAgICAgIHRoaXMub2ZmKHRoaXMucGxheWVyXywgJ3N0YXJ0UmVjb3JkJywgdGhpcy5zaG93KTtcbiAgICAgIHRoaXMub2ZmKHRoaXMucGxheWVyXywgJ3N0b3BSZWNvcmQnLCB0aGlzLmhpZGUpO1xuICAgIH1cbiAgfV0pO1xuXG4gIHJldHVybiBSZWNvcmRJbmRpY2F0b3I7XG59KENvbXBvbmVudCk7XG5cbkNvbXBvbmVudC5yZWdpc3RlckNvbXBvbmVudCgnUmVjb3JkSW5kaWNhdG9yJywgUmVjb3JkSW5kaWNhdG9yKTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gUmVjb3JkSW5kaWNhdG9yOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxudmFyIF9nZXQgPSBmdW5jdGlvbiBnZXQob2JqZWN0LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpIHsgaWYgKG9iamVjdCA9PT0gbnVsbCkgb2JqZWN0ID0gRnVuY3Rpb24ucHJvdG90eXBlOyB2YXIgZGVzYyA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3Iob2JqZWN0LCBwcm9wZXJ0eSk7IGlmIChkZXNjID09PSB1bmRlZmluZWQpIHsgdmFyIHBhcmVudCA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmplY3QpOyBpZiAocGFyZW50ID09PSBudWxsKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gZWxzZSB7IHJldHVybiBnZXQocGFyZW50LCBwcm9wZXJ0eSwgcmVjZWl2ZXIpOyB9IH0gZWxzZSBpZiAoXCJ2YWx1ZVwiIGluIGRlc2MpIHsgcmV0dXJuIGRlc2MudmFsdWU7IH0gZWxzZSB7IHZhciBnZXR0ZXIgPSBkZXNjLmdldDsgaWYgKGdldHRlciA9PT0gdW5kZWZpbmVkKSB7IHJldHVybiB1bmRlZmluZWQ7IH0gcmV0dXJuIGdldHRlci5jYWxsKHJlY2VpdmVyKTsgfSB9O1xuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9XG5cbi8qKlxuICogQGZpbGUgcmVjb3JkLXRvZ2dsZS5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxudmFyIEJ1dHRvbiA9IHZpZGVvanMuZ2V0Q29tcG9uZW50KCdCdXR0b24nKTtcbnZhciBDb21wb25lbnQgPSB2aWRlb2pzLmdldENvbXBvbmVudCgnQ29tcG9uZW50Jyk7XG5cbi8qKlxuICogQnV0dG9uIHRvIHRvZ2dsZSBiZXR3ZWVuIHN0YXJ0IGFuZCBzdG9wIHJlY29yZGluZy5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLkJ1dHRvblxuKi9cblxudmFyIFJlY29yZFRvZ2dsZSA9IGZ1bmN0aW9uIChfQnV0dG9uKSB7XG4gIF9pbmhlcml0cyhSZWNvcmRUb2dnbGUsIF9CdXR0b24pO1xuXG4gIGZ1bmN0aW9uIFJlY29yZFRvZ2dsZSgpIHtcbiAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVjb3JkVG9nZ2xlKTtcblxuICAgIHJldHVybiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybih0aGlzLCAoUmVjb3JkVG9nZ2xlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkVG9nZ2xlKSkuYXBwbHkodGhpcywgYXJndW1lbnRzKSk7XG4gIH1cblxuICBfY3JlYXRlQ2xhc3MoUmVjb3JkVG9nZ2xlLCBbe1xuICAgIGtleTogJ2J1aWxkQ1NTQ2xhc3MnLFxuXG4gICAgLyoqXG4gICAgICogQnVpbGRzIHRoZSBkZWZhdWx0IERPTSBgY2xhc3NOYW1lYC5cbiAgICAgKlxuICAgICAqIEByZXR1cm4ge3N0cmluZ31cbiAgICAgKiAgICAgICAgIFRoZSBET00gYGNsYXNzTmFtZWAgZm9yIHRoaXMgb2JqZWN0LlxuICAgICAqL1xuICAgIHZhbHVlOiBmdW5jdGlvbiBidWlsZENTU0NsYXNzKCkge1xuICAgICAgcmV0dXJuICd2anMtcmVjb3JkLWJ1dHRvbiB2anMtY29udHJvbCB2anMtYnV0dG9uIHZqcy1pY29uLXJlY29yZC1zdGFydCc7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRW5hYmxlIHRoZSBgUmVjb3JkVG9nZ2xlYCBlbGVtZW50IHNvIHRoYXQgaXQgY2FuIGJlIGFjdGl2YXRlZCBvciBjbGlja2VkLlxuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdlbmFibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBlbmFibGUoKSB7XG4gICAgICBfZ2V0KFJlY29yZFRvZ2dsZS5wcm90b3R5cGUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihSZWNvcmRUb2dnbGUucHJvdG90eXBlKSwgJ2VuYWJsZScsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgIHRoaXMub24odGhpcy5wbGF5ZXJfLCAnc3RhcnRSZWNvcmQnLCB0aGlzLm9uU3RhcnQpO1xuICAgICAgdGhpcy5vbih0aGlzLnBsYXllcl8sICdzdG9wUmVjb3JkJywgdGhpcy5vblN0b3ApO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIERpc2FibGUgdGhlIGBSZWNvcmRUb2dnbGVgIGVsZW1lbnQgc28gdGhhdCBpdCBjYW5ub3QgYmUgYWN0aXZhdGVkIG9yIGNsaWNrZWQuXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ2Rpc2FibGUnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNhYmxlKCkge1xuICAgICAgX2dldChSZWNvcmRUb2dnbGUucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkVG9nZ2xlLnByb3RvdHlwZSksICdkaXNhYmxlJywgdGhpcykuY2FsbCh0aGlzKTtcblxuICAgICAgdGhpcy5vZmYodGhpcy5wbGF5ZXJfLCAnc3RhcnRSZWNvcmQnLCB0aGlzLm9uU3RhcnQpO1xuICAgICAgdGhpcy5vZmYodGhpcy5wbGF5ZXJfLCAnc3RvcFJlY29yZCcsIHRoaXMub25TdG9wKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBUaGlzIGdldHMgY2FsbGVkIHdoZW4gdGhlIGJ1dHRvbiBpcyBjbGlja2VkLlxuICAgICAqXG4gICAgICogQHBhcmFtIHtFdmVudFRhcmdldH5FdmVudH0gZXZlbnRcbiAgICAgKiAgICAgICAgVGhlIGB0YXBgIG9yIGBjbGlja2AgZXZlbnQgdGhhdCBjYXVzZWQgdGhpcyBmdW5jdGlvbiB0byBiZVxuICAgICAqICAgICAgICBjYWxsZWQuXG4gICAgICpcbiAgICAgKiBAbGlzdGVucyB0YXBcbiAgICAgKiBAbGlzdGVucyBjbGlja1xuICAgICAqL1xuXG4gIH0sIHtcbiAgICBrZXk6ICdoYW5kbGVDbGljaycsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIGhhbmRsZUNsaWNrKGV2ZW50KSB7XG4gICAgICB2YXIgcmVjb3JkZXIgPSB0aGlzLnBsYXllcl8ucmVjb3JkKCk7XG4gICAgICBpZiAoIXJlY29yZGVyLmlzUmVjb3JkaW5nKCkpIHtcbiAgICAgICAgcmVjb3JkZXIuc3RhcnQoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlY29yZGVyLnN0b3AoKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHZqcy1pY29uLXJlY29yZC1zdG9wIGNsYXNzIHRvIHRoZSBlbGVtZW50IHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZS5cbiAgICAgKlxuICAgICAqIEBwYXJhbSB7RXZlbnRUYXJnZXR+RXZlbnR9IFtldmVudF1cbiAgICAgKiAgICAgICAgVGhlIGV2ZW50IHRoYXQgY2F1c2VkIHRoaXMgZnVuY3Rpb24gdG8gcnVuLlxuICAgICAqXG4gICAgICogQGxpc3RlbnMgUGxheWVyI3N0YXJ0UmVjb3JkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uU3RhcnQnLFxuICAgIHZhbHVlOiBmdW5jdGlvbiBvblN0YXJ0KGV2ZW50KSB7XG4gICAgICAvLyByZXBsYWNlIGVsZW1lbnQgY2xhc3Mgc28gaXQgY2FuIGNoYW5nZSBhcHBlYXJhbmNlXG4gICAgICB0aGlzLnJlbW92ZUNsYXNzKCd2anMtaWNvbi1yZWNvcmQtc3RhcnQnKTtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1pY29uLXJlY29yZC1zdG9wJyk7XG5cbiAgICAgIC8vIGNoYW5nZSB0aGUgYnV0dG9uIHRleHRcbiAgICAgIHRoaXMuY29udHJvbFRleHQoJ1N0b3AnKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBBZGQgdGhlIHZqcy1pY29uLXJlY29yZC1zdGFydCBjbGFzcyB0byB0aGUgZWxlbWVudCBzbyBpdCBjYW4gY2hhbmdlIGFwcGVhcmFuY2UuXG4gICAgICpcbiAgICAgKiBAcGFyYW0ge0V2ZW50VGFyZ2V0fkV2ZW50fSBbZXZlbnRdXG4gICAgICogICAgICAgIFRoZSBldmVudCB0aGF0IGNhdXNlZCB0aGlzIGZ1bmN0aW9uIHRvIHJ1bi5cbiAgICAgKlxuICAgICAqIEBsaXN0ZW5zIFBsYXllciNzdG9wUmVjb3JkXG4gICAgICovXG5cbiAgfSwge1xuICAgIGtleTogJ29uU3RvcCcsXG4gICAgdmFsdWU6IGZ1bmN0aW9uIG9uU3RvcChldmVudCkge1xuICAgICAgLy8gcmVwbGFjZSBlbGVtZW50IGNsYXNzIHNvIGl0IGNhbiBjaGFuZ2UgYXBwZWFyYW5jZVxuICAgICAgdGhpcy5yZW1vdmVDbGFzcygndmpzLWljb24tcmVjb3JkLXN0b3AnKTtcbiAgICAgIHRoaXMuYWRkQ2xhc3MoJ3Zqcy1pY29uLXJlY29yZC1zdGFydCcpO1xuXG4gICAgICAvLyBjaGFuZ2UgdGhlIGJ1dHRvbiB0ZXh0XG4gICAgICB0aGlzLmNvbnRyb2xUZXh0KCdSZWNvcmQnKTtcbiAgICB9XG4gIH1dKTtcblxuICByZXR1cm4gUmVjb3JkVG9nZ2xlO1xufShCdXR0b24pO1xuXG4vKipcbiAqIFRoZSB0ZXh0IHRoYXQgc2hvdWxkIGRpc3BsYXkgb3ZlciB0aGUgYFJlY29yZFRvZ2dsZWBzIGNvbnRyb2xzLiBBZGRlZCBmb3IgbG9jYWxpemF0aW9uLlxuICpcbiAqIEB0eXBlIHtzdHJpbmd9XG4gKiBAcHJpdmF0ZVxuICovXG5cblxuUmVjb3JkVG9nZ2xlLnByb3RvdHlwZS5jb250cm9sVGV4dF8gPSAnUmVjb3JkJztcblxuQ29tcG9uZW50LnJlZ2lzdGVyQ29tcG9uZW50KCdSZWNvcmRUb2dnbGUnLCBSZWNvcmRUb2dnbGUpO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSZWNvcmRUb2dnbGU7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIEBmaWxlIGRlZmF1bHRzLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG4vL3BsdWdpbiBkZWZhdWx0c1xudmFyIHBsdWdpbkRlZmF1bHRPcHRpb25zID0ge1xuICAgIC8vIFNpbmdsZSBzbmFwc2hvdCBpbWFnZS5cbiAgICBpbWFnZTogZmFsc2UsXG4gICAgLy8gSW5jbHVkZSBhdWRpbyBpbiB0aGUgcmVjb3JkZWQgY2xpcC5cbiAgICBhdWRpbzogZmFsc2UsXG4gICAgLy8gSW5jbHVkZSB2aWRlbyBpbiB0aGUgcmVjb3JkZWQgY2xpcC5cbiAgICB2aWRlbzogZmFsc2UsXG4gICAgLy8gQW5pbWF0ZWQgR0lGLlxuICAgIGFuaW1hdGlvbjogZmFsc2UsXG4gICAgLy8gTWF4aW11bSBsZW5ndGggb2YgdGhlIHJlY29yZGVkIGNsaXAuXG4gICAgbWF4TGVuZ3RoOiAxMCxcbiAgICAvLyBXaWR0aCBvZiB0aGUgcmVjb3JkZWQgdmlkZW8gZnJhbWVzLlxuICAgIGZyYW1lV2lkdGg6IDMyMCxcbiAgICAvLyBIZWlnaHQgb2YgdGhlIHJlY29yZGVkIHZpZGVvIGZyYW1lcy5cbiAgICBmcmFtZUhlaWdodDogMjQwLFxuICAgIC8vIEVuYWJsZXMgY29uc29sZSBsb2dnaW5nIGZvciBkZWJ1Z2dpbmcgcHVycG9zZXMuXG4gICAgZGVidWc6IGZhbHNlLFxuICAgIC8vIFRoZSBtaW1lIHR5cGUgZm9yIHRoZSB2aWRlbyByZWNvcmRlci4gRGVmYXVsdCB0byAndmlkZW8vd2VibScuXG4gICAgLy8gVXNlICd2aWRlby9tcDQnIChGaXJlZm94KSBvciAndmlkZW8vd2VibTtjb2RlY3M9SDI2NCcgKENocm9tZSA1MiBhbmRcbiAgICAvLyBuZXdlcikgZm9yIE1QNC5cbiAgICB2aWRlb01pbWVUeXBlOiAndmlkZW8vd2VibScsXG4gICAgLy8gVmlkZW8gcmVjb3JkZXIgdHlwZSB0byB1c2UuIFRoaXMgYWxsb3dzIHlvdSB0byBzcGVjaWZ5IGFuIGFsdGVybmF0aXZlXG4gICAgLy8gcmVjb3JkZXIgY2xhc3MsIGUuZy4gV2hhbW15UmVjb3JkZXIuIERlZmF1bHRzIHRvICdhdXRvJyB3aGljaCBsZXQnc1xuICAgIC8vIHJlY29yZHJ0YyBzcGVjaWZ5IHRoZSBiZXN0IGF2YWlsYWJsZSByZWNvcmRlciB0eXBlLlxuICAgIHZpZGVvUmVjb3JkZXJUeXBlOiAnYXV0bycsXG4gICAgLy8gQXVkaW8gcmVjb3JkaW5nIGxpYnJhcnkgdG8gdXNlLiBMZWdhbCB2YWx1ZXMgYXJlICdyZWNvcmRydGMnLFxuICAgIC8vICdsaWJ2b3JiaXMuanMnLCAnb3B1cy1yZWNvcmRlcicsICdsYW1lanMnIGFuZCAncmVjb3JkZXIuanMnLlxuICAgIGF1ZGlvRW5naW5lOiAncmVjb3JkcnRjJyxcbiAgICAvLyBBdWRpbyByZWNvcmRlciB0eXBlIHRvIHVzZS4gVGhpcyBhbGxvd3MgeW91IHRvIHNwZWNpZnkgYW4gYWx0ZXJuYXRpdmVcbiAgICAvLyByZWNvcmRlciBjbGFzcywgZS5nLiBTdGVyZW9BdWRpb1JlY29yZGVyLiBEZWZhdWx0cyB0byAnYXV0bycgd2hpY2ggbGV0J3NcbiAgICAvLyByZWNvcmRydGMgc3BlY2lmeSB0aGUgYmVzdCBhdmFpbGFibGUgcmVjb3JkZXIgdHlwZS4gQ3VycmVudGx5IHRoaXNcbiAgICAvLyBzZXR0aW5nIGlzIG9ubHkgdXNlZCB3aXRoIHRoZSAncmVjb3JkcnRjJyBhdWRpb0VuZ2luZS5cbiAgICBhdWRpb1JlY29yZGVyVHlwZTogJ2F1dG8nLFxuICAgIC8vIFRoZSBtaW1lIHR5cGUgZm9yIHRoZSBhdWRpbyByZWNvcmRlci4gRGVmYXVsdHMgdG8gJ2F1dG8nIHdoaWNoIHdpbGwgcGlja1xuICAgIC8vIHRoZSBiZXN0IG9wdGlvbiBhdmFpbGFibGUgaW4gdGhlIGJyb3dzZXIgKGUuZy4gZWl0aGVyICdhdWRpby93YXYnLFxuICAgIC8vICdhdWRpby9vZ2cnIG9yICdhdWRpby93ZWJtJykuXG4gICAgYXVkaW9NaW1lVHlwZTogJ2F1dG8nLFxuICAgIC8vIFRoZSBzaXplIG9mIHRoZSBhdWRpbyBidWZmZXIgKGluIHNhbXBsZS1mcmFtZXMpIHdoaWNoIG5lZWRzIHRvXG4gICAgLy8gYmUgcHJvY2Vzc2VkIGVhY2ggdGltZSBvbnByb2Nlc3NhdWRpbyBpcyBjYWxsZWQuXG4gICAgLy8gRnJvbSB0aGUgc3BlYzogVGhpcyB2YWx1ZSBjb250cm9scyBob3cgZnJlcXVlbnRseSB0aGUgYXVkaW9wcm9jZXNzIGV2ZW50IGlzXG4gICAgLy8gZGlzcGF0Y2hlZCBhbmQgaG93IG1hbnkgc2FtcGxlLWZyYW1lcyBuZWVkIHRvIGJlIHByb2Nlc3NlZCBlYWNoIGNhbGwuXG4gICAgLy8gTG93ZXIgdmFsdWVzIGZvciBidWZmZXIgc2l6ZSB3aWxsIHJlc3VsdCBpbiBhIGxvd2VyIChiZXR0ZXIpIGxhdGVuY3kuXG4gICAgLy8gSGlnaGVyIHZhbHVlcyB3aWxsIGJlIG5lY2Vzc2FyeSB0byBhdm9pZCBhdWRpbyBicmVha3VwIGFuZCBnbGl0Y2hlcy5cbiAgICAvLyBMZWdhbCB2YWx1ZXMgYXJlIDI1NiwgNTEyLCAxMDI0LCAyMDQ4LCA0MDk2LCA4MTkyIG9yIDE2Mzg0LlxuICAgIGF1ZGlvQnVmZmVyU2l6ZTogNDA5NixcbiAgICAvLyBUaGUgYXVkaW8gc2FtcGxlIHJhdGUgKGluIHNhbXBsZS1mcmFtZXMgcGVyIHNlY29uZCkgYXQgd2hpY2ggdGhlXG4gICAgLy8gQXVkaW9Db250ZXh0IGhhbmRsZXMgYXVkaW8uIEl0IGlzIGFzc3VtZWQgdGhhdCBhbGwgQXVkaW9Ob2Rlc1xuICAgIC8vIGluIHRoZSBjb250ZXh0IHJ1biBhdCB0aGlzIHJhdGUuIEluIG1ha2luZyB0aGlzIGFzc3VtcHRpb24sXG4gICAgLy8gc2FtcGxlLXJhdGUgY29udmVydGVycyBvciBcInZhcmlzcGVlZFwiIHByb2Nlc3NvcnMgYXJlIG5vdCBzdXBwb3J0ZWRcbiAgICAvLyBpbiByZWFsLXRpbWUgcHJvY2Vzc2luZy5cbiAgICAvLyBUaGUgc2FtcGxlUmF0ZSBwYXJhbWV0ZXIgZGVzY3JpYmVzIHRoZSBzYW1wbGUtcmF0ZSBvZiB0aGVcbiAgICAvLyBsaW5lYXIgUENNIGF1ZGlvIGRhdGEgaW4gdGhlIGJ1ZmZlciBpbiBzYW1wbGUtZnJhbWVzIHBlciBzZWNvbmQuXG4gICAgLy8gQW4gaW1wbGVtZW50YXRpb24gbXVzdCBzdXBwb3J0IHNhbXBsZS1yYXRlcyBpbiBhdCBsZWFzdFxuICAgIC8vIHRoZSByYW5nZSAyMjA1MCB0byA5NjAwMC5cbiAgICBhdWRpb1NhbXBsZVJhdGU6IDQ0MTAwLFxuICAgIC8vIFRoZSBhdWRpbyBiaXRyYXRlIGluIGticHMgKG9ubHkgdXNlZCBpbiBsYW1lanMgcGx1Z2luKS5cbiAgICBhdWRpb0JpdFJhdGU6IDEyOCxcbiAgICAvLyBBbGxvd3MgeW91IHRvIHJlY29yZCBzaW5nbGUtY2hhbm5lbCBhdWRpbywgd2hpY2ggY2FuIHJlZHVjZSB0aGVcbiAgICAvLyBmaWxlc2l6ZS5cbiAgICBhdWRpb0NoYW5uZWxzOiAyLFxuICAgIC8vIFVSTCBmb3IgdGhlIGF1ZGlvIHdvcmtlci5cbiAgICBhdWRpb1dvcmtlclVSTDogJycsXG4gICAgLy8gRnJhbWUgcmF0ZSBpbiBmcmFtZXMgcGVyIHNlY29uZC5cbiAgICBhbmltYXRpb25GcmFtZVJhdGU6IDIwMCxcbiAgICAvLyBTZXRzIHF1YWxpdHkgb2YgY29sb3IgcXVhbnRpemF0aW9uIChjb252ZXJzaW9uIG9mIGltYWdlcyB0byB0aGVcbiAgICAvLyBtYXhpbXVtIDI1NiBjb2xvcnMgYWxsb3dlZCBieSB0aGUgR0lGIHNwZWNpZmljYXRpb24pLlxuICAgIC8vIExvd2VyIHZhbHVlcyAobWluaW11bSA9IDEpIHByb2R1Y2UgYmV0dGVyIGNvbG9ycyxcbiAgICAvLyBidXQgc2xvdyBwcm9jZXNzaW5nIHNpZ25pZmljYW50bHkuIDEwIGlzIHRoZSBkZWZhdWx0LFxuICAgIC8vIGFuZCBwcm9kdWNlcyBnb29kIGNvbG9yIG1hcHBpbmcgYXQgcmVhc29uYWJsZSBzcGVlZHMuXG4gICAgLy8gVmFsdWVzIGdyZWF0ZXIgdGhhbiAyMCBkbyBub3QgeWllbGQgc2lnbmlmaWNhbnQgaW1wcm92ZW1lbnRzXG4gICAgLy8gaW4gc3BlZWQuXG4gICAgYW5pbWF0aW9uUXVhbGl0eTogMTAsXG4gICAgLy8gQWNjZXB0cyBudW1iZXJzIGluIG1pbGxpc2Vjb25kczsgdXNlIHRoaXMgdG8gZm9yY2UgaW50ZXJ2YWxzLWJhc2VkIGJsb2JzLlxuICAgIHRpbWVTbGljZTogMFxufTtcblxuZXhwb3J0cy5kZWZhdWx0ID0gcGx1Z2luRGVmYXVsdE9wdGlvbnM7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5cbnZhciBfY3JlYXRlQ2xhc3MgPSBmdW5jdGlvbiAoKSB7IGZ1bmN0aW9uIGRlZmluZVByb3BlcnRpZXModGFyZ2V0LCBwcm9wcykgeyBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BzLmxlbmd0aDsgaSsrKSB7IHZhciBkZXNjcmlwdG9yID0gcHJvcHNbaV07IGRlc2NyaXB0b3IuZW51bWVyYWJsZSA9IGRlc2NyaXB0b3IuZW51bWVyYWJsZSB8fCBmYWxzZTsgZGVzY3JpcHRvci5jb25maWd1cmFibGUgPSB0cnVlOyBpZiAoXCJ2YWx1ZVwiIGluIGRlc2NyaXB0b3IpIGRlc2NyaXB0b3Iud3JpdGFibGUgPSB0cnVlOyBPYmplY3QuZGVmaW5lUHJvcGVydHkodGFyZ2V0LCBkZXNjcmlwdG9yLmtleSwgZGVzY3JpcHRvcik7IH0gfSByZXR1cm4gZnVuY3Rpb24gKENvbnN0cnVjdG9yLCBwcm90b1Byb3BzLCBzdGF0aWNQcm9wcykgeyBpZiAocHJvdG9Qcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvci5wcm90b3R5cGUsIHByb3RvUHJvcHMpOyBpZiAoc3RhdGljUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IsIHN0YXRpY1Byb3BzKTsgcmV0dXJuIENvbnN0cnVjdG9yOyB9OyB9KCk7XG5cbmZ1bmN0aW9uIF9jbGFzc0NhbGxDaGVjayhpbnN0YW5jZSwgQ29uc3RydWN0b3IpIHsgaWYgKCEoaW5zdGFuY2UgaW5zdGFuY2VvZiBDb25zdHJ1Y3RvcikpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjYWxsIGEgY2xhc3MgYXMgYSBmdW5jdGlvblwiKTsgfSB9XG5cbmZ1bmN0aW9uIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHNlbGYsIGNhbGwpIHsgaWYgKCFzZWxmKSB7IHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcInRoaXMgaGFzbid0IGJlZW4gaW5pdGlhbGlzZWQgLSBzdXBlcigpIGhhc24ndCBiZWVuIGNhbGxlZFwiKTsgfSByZXR1cm4gY2FsbCAmJiAodHlwZW9mIGNhbGwgPT09IFwib2JqZWN0XCIgfHwgdHlwZW9mIGNhbGwgPT09IFwiZnVuY3Rpb25cIikgPyBjYWxsIDogc2VsZjsgfVxuXG5mdW5jdGlvbiBfaW5oZXJpdHMoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIHsgaWYgKHR5cGVvZiBzdXBlckNsYXNzICE9PSBcImZ1bmN0aW9uXCIgJiYgc3VwZXJDbGFzcyAhPT0gbnVsbCkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiU3VwZXIgZXhwcmVzc2lvbiBtdXN0IGVpdGhlciBiZSBudWxsIG9yIGEgZnVuY3Rpb24sIG5vdCBcIiArIHR5cGVvZiBzdXBlckNsYXNzKTsgfSBzdWJDbGFzcy5wcm90b3R5cGUgPSBPYmplY3QuY3JlYXRlKHN1cGVyQ2xhc3MgJiYgc3VwZXJDbGFzcy5wcm90b3R5cGUsIHsgY29uc3RydWN0b3I6IHsgdmFsdWU6IHN1YkNsYXNzLCBlbnVtZXJhYmxlOiBmYWxzZSwgd3JpdGFibGU6IHRydWUsIGNvbmZpZ3VyYWJsZTogdHJ1ZSB9IH0pOyBpZiAoc3VwZXJDbGFzcykgT2JqZWN0LnNldFByb3RvdHlwZU9mID8gT2JqZWN0LnNldFByb3RvdHlwZU9mKHN1YkNsYXNzLCBzdXBlckNsYXNzKSA6IHN1YkNsYXNzLl9fcHJvdG9fXyA9IHN1cGVyQ2xhc3M7IH1cblxuLyoqXG4gKiBAZmlsZSByZWNvcmQtZW5naW5lLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG52YXIgQ29tcG9uZW50ID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ0NvbXBvbmVudCcpO1xuXG4vLyBzdXBwb3J0ZWQgcmVjb3JkZXIgcGx1Z2luIGVuZ2luZXNcbnZhciBSRUNPUkRSVEMgPSAncmVjb3JkcnRjJztcbnZhciBMSUJWT1JCSVNKUyA9ICdsaWJ2b3JiaXMuanMnO1xudmFyIFJFQ09SREVSSlMgPSAncmVjb3JkZXIuanMnO1xudmFyIExBTUVKUyA9ICdsYW1lanMnO1xudmFyIE9QVVNSRUNPUkRFUiA9ICdvcHVzLXJlY29yZGVyJztcblxuLyoqXG4gKiBCYXNlIGNsYXNzIGZvciByZWNvcmRlciBiYWNrZW5kcy5cbiAqIEBjbGFzc1xuICogQGF1Z21lbnRzIHZpZGVvanMuQ29tcG9uZW50XG4gKi9cblxudmFyIFJlY29yZEVuZ2luZSA9IGZ1bmN0aW9uIChfQ29tcG9uZW50KSB7XG4gICAgX2luaGVyaXRzKFJlY29yZEVuZ2luZSwgX0NvbXBvbmVudCk7XG5cbiAgICAvKipcbiAgICAgKiBDcmVhdGVzIGFuIGluc3RhbmNlIG9mIHRoaXMgY2xhc3MuXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtQbGF5ZXJ9IHBsYXllclxuICAgICAqICAgICAgICAgVGhlIGBQbGF5ZXJgIHRoYXQgdGhpcyBjbGFzcyBzaG91bGQgYmUgYXR0YWNoZWQgdG8uXG4gICAgICpcbiAgICAgKiBAcGFyYW0gIHtPYmplY3R9IFtvcHRpb25zXVxuICAgICAqICAgICAgICAgVGhlIGtleS92YWx1ZSBzdG9yZSBvZiBwbGF5ZXIgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBSZWNvcmRFbmdpbmUocGxheWVyLCBvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWNvcmRFbmdpbmUpO1xuXG4gICAgICAgIC8vIGF1dG8gbWl4aW4gdGhlIGV2ZW50ZWQgbWl4aW4gKHJlcXVpcmVkIHNpbmNlIHZpZGVvLmpzIHY2LjYuMClcbiAgICAgICAgb3B0aW9ucy5ldmVudGVkID0gdHJ1ZTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKFJlY29yZEVuZ2luZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlY29yZEVuZ2luZSkpLmNhbGwodGhpcywgcGxheWVyLCBvcHRpb25zKSk7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogUmVtb3ZlIGFueSB0ZW1wb3JhcnkgZGF0YSBhbmQgcmVmZXJlbmNlcyB0byBzdHJlYW1zLlxuICAgICAqIEBwcml2YXRlXG4gICAgICovXG5cblxuICAgIF9jcmVhdGVDbGFzcyhSZWNvcmRFbmdpbmUsIFt7XG4gICAgICAgIGtleTogJ2Rpc3Bvc2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgICAgIC8vIGRpc3Bvc2UgcHJldmlvdXMgcmVjb3JkaW5nXG4gICAgICAgICAgICBpZiAodGhpcy5yZWNvcmRlZERhdGEgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwodGhpcy5yZWNvcmRlZERhdGEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEFkZCBmaWxlbmFtZSBhbmQgdGltZXN0YW1wIHRvIHJlY29yZGVkIGZpbGUgb2JqZWN0LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0geyhibG9ifGZpbGUpfSBmaWxlT2JqIC0gQmxvYiBvciBGaWxlIG9iamVjdC5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2FkZEZpbGVJbmZvJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGFkZEZpbGVJbmZvKGZpbGVPYmopIHtcbiAgICAgICAgICAgIGlmIChmaWxlT2JqIGluc3RhbmNlb2YgQmxvYiB8fCBmaWxlT2JqIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgICAgICAgICAgIC8vIHNldCBtb2RpZmljYXRpb24gZGF0ZVxuICAgICAgICAgICAgICAgIHZhciBub3cgPSBuZXcgRGF0ZSgpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVPYmoubGFzdE1vZGlmaWVkID0gbm93LmdldFRpbWUoKTtcbiAgICAgICAgICAgICAgICAgICAgZmlsZU9iai5sYXN0TW9kaWZpZWREYXRlID0gbm93O1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGUgaW5zdGFuY2VvZiBUeXBlRXJyb3IpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGlnbm9yZTogc2V0dGluZyBnZXR0ZXItb25seSBwcm9wZXJ0eSBcImxhc3RNb2RpZmllZERhdGVcIlxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmUtcmFpc2UgZXJyb3JcbiAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IGU7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gZ3Vlc3MgZXh0ZW5zaW9uIG5hbWUgZnJvbSBtaW1lIHR5cGUsIGUuZy4gYXVkaW8vb2dnLCBidXRcbiAgICAgICAgICAgICAgICAvLyBhbnkgZXh0ZW5zaW9uIGlzIHZhbGlkIGhlcmUuIENocm9tZSBhbHNvIGFjY2VwdHMgZXh0ZW5kZWRcbiAgICAgICAgICAgICAgICAvLyBtaW1lIHR5cGVzIGxpa2UgdmlkZW8vd2VibTtjb2RlY3M9aDI2NCx2cDksb3B1c1xuICAgICAgICAgICAgICAgIHZhciBmaWxlRXh0ZW5zaW9uID0gJy4nICsgZmlsZU9iai50eXBlLnNwbGl0KCcvJylbMV07XG4gICAgICAgICAgICAgICAgaWYgKGZpbGVFeHRlbnNpb24uaW5kZXhPZignOycpID4gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZUV4dGVuc2lvbiA9IGZpbGVFeHRlbnNpb24uc3BsaXQoJzsnKVswXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB1c2UgdGltZXN0YW1wIGluIGZpbGVuYW1lLCBlLmcuIDE0NTExODA5NDEzMjYub2dnXG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgZmlsZU9iai5uYW1lID0gbm93LmdldFRpbWUoKSArIGZpbGVFeHRlbnNpb247XG4gICAgICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZSBpbnN0YW5jZW9mIFR5cGVFcnJvcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaWdub3JlOiBzZXR0aW5nIGdldHRlci1vbmx5IHByb3BlcnR5IFwibmFtZVwiXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZS1yYWlzZSBlcnJvclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZva2VkIHdoZW4gcmVjb3JkaW5nIGlzIHN0b3BwZWQgYW5kIHJlc3VsdGluZyBzdHJlYW0gaXMgYXZhaWxhYmxlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge2Jsb2J9IGRhdGEgLSBSZWZlcmVuY2UgdG8gdGhlIHJlY29yZGVkIEJsb2IuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvblN0b3BSZWNvcmRpbmcnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25TdG9wUmVjb3JkaW5nKGRhdGEpIHtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkZWREYXRhID0gZGF0YTtcblxuICAgICAgICAgICAgLy8gYWRkIGZpbGVuYW1lIGFuZCB0aW1lc3RhbXAgdG8gcmVjb3JkZWQgZmlsZSBvYmplY3RcbiAgICAgICAgICAgIHRoaXMuYWRkRmlsZUluZm8odGhpcy5yZWNvcmRlZERhdGEpO1xuXG4gICAgICAgICAgICAvLyByZW1vdmUgcmVmZXJlbmNlIHRvIHJlY29yZGVkIHN0cmVhbVxuICAgICAgICAgICAgdGhpcy5kaXNwb3NlKCk7XG5cbiAgICAgICAgICAgIC8vIG5vdGlmeSBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHRoaXMudHJpZ2dlcigncmVjb3JkQ29tcGxldGUnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IHNhdmUgYXMgZGlhbG9nIGluIGJyb3dzZXIgc28gdGhlIHVzZXIgY2FuIHN0b3JlIHRoZSByZWNvcmRlZCBtZWRpYVxuICAgICAgICAgKiBsb2NhbGx5LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge29iamVjdH0gbmFtZSAtIE9iamVjdCB3aXRoIG5hbWVzIGZvciB0aGUgcGFydGljdWxhciBibG9iKHMpXG4gICAgICAgICAqICAgICB5b3Ugd2FudCB0byBzYXZlLiBGaWxlIGV4dGVuc2lvbnMgYXJlIGFkZGVkIGF1dG9tYXRpY2FsbHkuIEZvclxuICAgICAgICAgKiAgICAgZXhhbXBsZTogeyd2aWRlbyc6ICduYW1lLW9mLXZpZGVvLWZpbGUnfS4gU3VwcG9ydGVkIGtleXMgYXJlXG4gICAgICAgICAqICAgICAnYXVkaW8nLCAndmlkZW8nIGFuZCAnZ2lmJy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NhdmVBcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzYXZlQXMobmFtZSkge1xuICAgICAgICAgICAgdmFyIGZpbGVOYW1lID0gbmFtZVtPYmplY3Qua2V5cyhuYW1lKVswXV07XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgbmF2aWdhdG9yLm1zU2F2ZU9yT3BlbkJsb2IgIT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tc1NhdmVPck9wZW5CbG9iKHRoaXMucmVjb3JkZWREYXRhLCBmaWxlTmFtZSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBuYXZpZ2F0b3IubXNTYXZlQmxvYiAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gbmF2aWdhdG9yLm1zU2F2ZUJsb2IodGhpcy5yZWNvcmRlZERhdGEsIGZpbGVOYW1lKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgdmFyIGh5cGVybGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2EnKTtcbiAgICAgICAgICAgIGh5cGVybGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTCh0aGlzLnJlY29yZGVkRGF0YSk7XG4gICAgICAgICAgICBoeXBlcmxpbmsuZG93bmxvYWQgPSBmaWxlTmFtZTtcblxuICAgICAgICAgICAgaHlwZXJsaW5rLnN0eWxlID0gJ2Rpc3BsYXk6bm9uZTtvcGFjaXR5OjA7Y29sb3I6dHJhbnNwYXJlbnQ7JztcbiAgICAgICAgICAgIChkb2N1bWVudC5ib2R5IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCkuYXBwZW5kQ2hpbGQoaHlwZXJsaW5rKTtcblxuICAgICAgICAgICAgaWYgKHR5cGVvZiBoeXBlcmxpbmsuY2xpY2sgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICBoeXBlcmxpbmsuY2xpY2soKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgaHlwZXJsaW5rLnRhcmdldCA9ICdfYmxhbmsnO1xuICAgICAgICAgICAgICAgIGh5cGVybGluay5kaXNwYXRjaEV2ZW50KG5ldyBNb3VzZUV2ZW50KCdjbGljaycsIHtcbiAgICAgICAgICAgICAgICAgICAgdmlldzogd2luZG93LFxuICAgICAgICAgICAgICAgICAgICBidWJibGVzOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBjYW5jZWxhYmxlOiB0cnVlXG4gICAgICAgICAgICAgICAgfSkpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKGh5cGVybGluay5ocmVmKTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBSZWNvcmRFbmdpbmU7XG59KENvbXBvbmVudCk7XG5cbi8vIGV4cG9zZSBjb21wb25lbnQgZm9yIGV4dGVybmFsIHBsdWdpbnNcblxuXG52aWRlb2pzLlJlY29yZEVuZ2luZSA9IFJlY29yZEVuZ2luZTtcbkNvbXBvbmVudC5yZWdpc3RlckNvbXBvbmVudCgnUmVjb3JkRW5naW5lJywgUmVjb3JkRW5naW5lKTtcblxuZXhwb3J0cy5SZWNvcmRFbmdpbmUgPSBSZWNvcmRFbmdpbmU7XG5leHBvcnRzLlJFQ09SRFJUQyA9IFJFQ09SRFJUQztcbmV4cG9ydHMuTElCVk9SQklTSlMgPSBMSUJWT1JCSVNKUztcbmV4cG9ydHMuUkVDT1JERVJKUyA9IFJFQ09SREVSSlM7XG5leHBvcnRzLkxBTUVKUyA9IExBTUVKUztcbmV4cG9ydHMuT1BVU1JFQ09SREVSID0gT1BVU1JFQ09SREVSOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBAZmlsZSByZWNvcmQtbW9kZS5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxuLy8gcmVjb3JkZXIgbW9kZXNcbnZhciBJTUFHRV9PTkxZID0gJ2ltYWdlX29ubHknO1xudmFyIEFVRElPX09OTFkgPSAnYXVkaW9fb25seSc7XG52YXIgVklERU9fT05MWSA9ICd2aWRlb19vbmx5JztcbnZhciBBVURJT19WSURFTyA9ICdhdWRpb192aWRlbyc7XG52YXIgQU5JTUFUSU9OID0gJ2FuaW1hdGlvbic7XG5cbnZhciBnZXRSZWNvcmRlck1vZGUgPSBmdW5jdGlvbiBnZXRSZWNvcmRlck1vZGUoaW1hZ2UsIGF1ZGlvLCB2aWRlbywgYW5pbWF0aW9uKSB7XG4gICAgaWYgKGlzTW9kZUVuYWJsZWQoaW1hZ2UpKSB7XG4gICAgICAgIHJldHVybiBJTUFHRV9PTkxZO1xuICAgIH0gZWxzZSBpZiAoaXNNb2RlRW5hYmxlZChhbmltYXRpb24pKSB7XG4gICAgICAgIHJldHVybiBBTklNQVRJT047XG4gICAgfSBlbHNlIGlmIChpc01vZGVFbmFibGVkKGF1ZGlvKSAmJiAhaXNNb2RlRW5hYmxlZCh2aWRlbykpIHtcbiAgICAgICAgcmV0dXJuIEFVRElPX09OTFk7XG4gICAgfSBlbHNlIGlmIChpc01vZGVFbmFibGVkKGF1ZGlvKSAmJiBpc01vZGVFbmFibGVkKHZpZGVvKSkge1xuICAgICAgICByZXR1cm4gQVVESU9fVklERU87XG4gICAgfSBlbHNlIGlmICghaXNNb2RlRW5hYmxlZChhdWRpbykgJiYgaXNNb2RlRW5hYmxlZCh2aWRlbykpIHtcbiAgICAgICAgcmV0dXJuIFZJREVPX09OTFk7XG4gICAgfVxufTtcblxuLyoqXG4gKiBSZXR1cm4gYm9vbGVhbiBpbmRpY2F0aW5nIHdoZXRoZXIgbW9kZSBpcyBlbmFibGVkIG9yIG5vdC5cbiAqL1xudmFyIGlzTW9kZUVuYWJsZWQgPSBmdW5jdGlvbiBpc01vZGVFbmFibGVkKG1vZGUpIHtcbiAgICByZXR1cm4gbW9kZSA9PT0gT2JqZWN0KG1vZGUpIHx8IG1vZGUgPT09IHRydWU7XG59O1xuXG5leHBvcnRzLmdldFJlY29yZGVyTW9kZSA9IGdldFJlY29yZGVyTW9kZTtcbmV4cG9ydHMuSU1BR0VfT05MWSA9IElNQUdFX09OTFk7XG5leHBvcnRzLkFVRElPX09OTFkgPSBBVURJT19PTkxZO1xuZXhwb3J0cy5WSURFT19PTkxZID0gVklERU9fT05MWTtcbmV4cG9ydHMuQVVESU9fVklERU8gPSBBVURJT19WSURFTztcbmV4cG9ydHMuQU5JTUFUSU9OID0gQU5JTUFUSU9OOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbnZhciBfcmVjb3JkRW5naW5lID0gcmVxdWlyZSgnLi9yZWNvcmQtZW5naW5lJyk7XG5cbnZhciBfZGV0ZWN0QnJvd3NlciA9IHJlcXVpcmUoJy4uL3V0aWxzL2RldGVjdC1icm93c2VyJyk7XG5cbnZhciBfcmVjb3JkTW9kZSA9IHJlcXVpcmUoJy4vcmVjb3JkLW1vZGUnKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfSAvKipcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIEBmaWxlIHJlY29yZC1ydGMuanNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIEBzaW5jZSAyLjAuMFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cbnZhciBDb21wb25lbnQgPSB2aWRlb2pzLmdldENvbXBvbmVudCgnQ29tcG9uZW50Jyk7XG5cbi8qKlxuICogRW5naW5lIHVzZWQgd2l0aCB0aGUgTVJlY29yZFJUQyBjbGFzcyBpbiB0aGUgUmVjb3JkUlRDIGxpYnJhcnkuXG4gKlxuICogQGNsYXNzXG4gKiBAYXVnbWVudHMgdmlkZW9qcy5SZWNvcmRFbmdpbmVcbiAqL1xuXG52YXIgUmVjb3JkUlRDRW5naW5lID0gZnVuY3Rpb24gKF9SZWNvcmRFbmdpbmUpIHtcbiAgICBfaW5oZXJpdHMoUmVjb3JkUlRDRW5naW5lLCBfUmVjb3JkRW5naW5lKTtcblxuICAgIGZ1bmN0aW9uIFJlY29yZFJUQ0VuZ2luZSgpIHtcbiAgICAgICAgX2NsYXNzQ2FsbENoZWNrKHRoaXMsIFJlY29yZFJUQ0VuZ2luZSk7XG5cbiAgICAgICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChSZWNvcmRSVENFbmdpbmUuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihSZWNvcmRSVENFbmdpbmUpKS5hcHBseSh0aGlzLCBhcmd1bWVudHMpKTtcbiAgICB9XG5cbiAgICBfY3JlYXRlQ2xhc3MoUmVjb3JkUlRDRW5naW5lLCBbe1xuICAgICAgICBrZXk6ICdzZXR1cCcsXG5cblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0dXAgcmVjb3JkaW5nIGVuZ2luZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXR1cChzdHJlYW0sIG1lZGlhVHlwZSwgZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRTdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgICB0aGlzLm1lZGlhVHlwZSA9IG1lZGlhVHlwZTtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcblxuICAgICAgICAgICAgLy8gc2V0dXAgUmVjb3JkUlRDXG4gICAgICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBSZWNvcmRSVEMuTVJlY29yZFJUQygpO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUubWVkaWFUeXBlID0gdGhpcy5tZWRpYVR5cGU7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5kaXNhYmxlTG9ncyA9ICF0aGlzLmRlYnVnO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUubWltZVR5cGUgPSB0aGlzLm1pbWVUeXBlO1xuXG4gICAgICAgICAgICAvLyBhdWRpbyBzZXR0aW5nc1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUuYnVmZmVyU2l6ZSA9IHRoaXMuYnVmZmVyU2l6ZTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnNhbXBsZVJhdGUgPSB0aGlzLnNhbXBsZVJhdGU7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5udW1iZXJPZkF1ZGlvQ2hhbm5lbHMgPSB0aGlzLmF1ZGlvQ2hhbm5lbHM7XG5cbiAgICAgICAgICAgIC8vIHZpZGVvL2NhbnZhcyBzZXR0aW5nc1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUudmlkZW8gPSB0aGlzLnZpZGVvO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2FudmFzID0gdGhpcy5jYW52YXM7XG5cbiAgICAgICAgICAgIC8vIGFuaW1hdGVkIGdpZiBzZXR0aW5nc1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUucXVhbGl0eSA9IHRoaXMucXVhbGl0eTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLmZyYW1lUmF0ZSA9IHRoaXMuZnJhbWVSYXRlO1xuICAgICAgICAgICAgaWYgKHRoaXMub25UaW1lU3RhbXAgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLnRpbWVTbGljZSA9IHRoaXMudGltZVNsaWNlO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLm9uVGltZVN0YW1wID0gdGhpcy5vblRpbWVTdGFtcDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gY29ubmVjdCBzdHJlYW0gdG8gcmVjb3JkaW5nIGVuZ2luZVxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuYWRkU3RyZWFtKHRoaXMuaW5wdXRTdHJlYW0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlbW92ZSBhbnkgdGVtcG9yYXJ5IGRhdGEgYW5kIHJlZmVyZW5jZXMgdG8gc3RyZWFtcy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2Rpc3Bvc2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZGlzcG9zZSgpIHtcbiAgICAgICAgICAgIF9nZXQoUmVjb3JkUlRDRW5naW5lLnByb3RvdHlwZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKFJlY29yZFJUQ0VuZ2luZS5wcm90b3R5cGUpLCAnZGlzcG9zZScsIHRoaXMpLmNhbGwodGhpcyk7XG5cbiAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5lbmdpbmUuZGVzdHJveSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLmRlc3Ryb3koKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdGFydCByZWNvcmRpbmcuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdGFydCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnN0YXJ0UmVjb3JkaW5nKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcCByZWNvcmRpbmcuIFJlc3VsdCB3aWxsIGJlIGF2YWlsYWJsZSBhc3luYyB3aGVuIG9uU3RvcFJlY29yZGluZ1xuICAgICAgICAgKiBpcyBjYWxsZWQuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdG9wJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5zdG9wUmVjb3JkaW5nKHRoaXMub25TdG9wUmVjb3JkaW5nLmJpbmQodGhpcykpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdXNlIHJlY29yZGluZy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3BhdXNlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUucGF1c2VSZWNvcmRpbmcoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXN1bWUgcmVjb3JkaW5nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVzdW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc3VtZSgpIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnJlc3VtZVJlY29yZGluZygpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgc2F2ZSBhcyBkaWFsb2cgaW4gYnJvd3NlciBzbyB0aGUgdXNlciBjYW4gc3RvcmUgdGhlIHJlY29yZGVkIG1lZGlhXG4gICAgICAgICAqIGxvY2FsbHkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBuYW1lIC0gT2JqZWN0IHdpdGggbmFtZXMgZm9yIHRoZSBwYXJ0aWN1bGFyIGJsb2IocylcbiAgICAgICAgICogICAgIHlvdSB3YW50IHRvIHNhdmUuIEZpbGUgZXh0ZW5zaW9ucyBhcmUgYWRkZWQgYXV0b21hdGljYWxseS4gRm9yXG4gICAgICAgICAqICAgICBleGFtcGxlOiB7J3ZpZGVvJzogJ25hbWUtb2YtdmlkZW8tZmlsZSd9LiBTdXBwb3J0ZWQga2V5cyBhcmVcbiAgICAgICAgICogICAgICdhdWRpbycsICd2aWRlbycgYW5kICdnaWYnLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2F2ZUFzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNhdmVBcyhuYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmdpbmUgJiYgbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuc2F2ZShuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZva2VkIHdoZW4gcmVjb3JkaW5nIGlzIHN0b3BwZWQgYW5kIHJlc3VsdGluZyBzdHJlYW0gaXMgYXZhaWxhYmxlLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcGFyYW0ge3N0cmluZ30gYXVkaW9WaWRlb1VSTCAtIFJlZmVyZW5jZSB0byB0aGUgcmVjb3JkZWQgQmxvYlxuICAgICAgICAgKiAgICAgb2JqZWN0LCBlLmcuICdibG9iOmh0dHA6Ly9sb2NhbGhvc3Q6ODA4MC8xMDEwMDAxNi00MjQ4LTk5NDktYjBkNi0wYmI0MGRiNTZlYmEnXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSB0eXBlIC0gTWVkaWEgdHlwZSwgZWcuICd2aWRlbycgb3IgJ2F1ZGlvJy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uU3RvcFJlY29yZGluZycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvblN0b3BSZWNvcmRpbmcoYXVkaW9WaWRlb1VSTCwgdHlwZSkge1xuICAgICAgICAgICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHN0b3JlIHJlZmVyZW5jZSB0byByZWNvcmRlZCBzdHJlYW0gVVJMXG4gICAgICAgICAgICB0aGlzLm1lZGlhVVJMID0gYXVkaW9WaWRlb1VSTDtcblxuICAgICAgICAgICAgLy8gc3RvcmUgcmVmZXJlbmNlIHRvIHJlY29yZGVkIHN0cmVhbSBkYXRhXG4gICAgICAgICAgICB2YXIgcmVjb3JkVHlwZSA9IHRoaXMucGxheWVyKCkucmVjb3JkKCkuZ2V0UmVjb3JkVHlwZSgpO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUuZ2V0QmxvYihmdW5jdGlvbiAocmVjb3JkaW5nKSB7XG4gICAgICAgICAgICAgICAgc3dpdGNoIChyZWNvcmRUeXBlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQVVESU9fT05MWTpcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5yZWNvcmRlZERhdGEgPSByZWNvcmRpbmcuYXVkaW87XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5hZGRGaWxlSW5mbyhfdGhpczIucmVjb3JkZWREYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm90aWZ5IGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ3JlY29yZENvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLlZJREVPX09OTFk6XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQVVESU9fVklERU86XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB3aGVuIHJlY29yZGluZyBib3RoIGF1ZGlvIGFuZCB2aWRlbywgcmVjb3JkcnRjXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjYWxscyB0aGlzIHR3aWNlIG9uIGNocm9tZSwgZmlyc3Qgd2l0aCBhdWRpbyBkYXRhXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhbmQgdGhlbiB3aXRoIHZpZGVvIGRhdGEuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBvbiBmaXJlZm94IGl0J3MgY2FsbGVkIG9uY2UgYnV0IHdpdGggYSBzaW5nbGVcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGJsb2IgdGhhdCBpbmNsdWRlcyBib3RoIGF1ZGlvIGFuZCB2aWRlbyBkYXRhLlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlY29yZGluZy52aWRlbyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGF0YSBpcyB2aWRlby1vbmx5IGJ1dCBvbiBmaXJlZm94IGF1ZGlvK3ZpZGVvXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnJlY29yZGVkRGF0YSA9IHJlY29yZGluZy52aWRlbztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG9uIHRoZSBjaHJvbWUgYnJvd3NlciB0d28gYmxvYnMgYXJlIGNyZWF0ZWRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBjb250YWluaW5nIHRoZSBzZXBhcmF0ZSBhdWRpby92aWRlbyBzdHJlYW1zLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZWNvcmRUeXBlID09PSBfcmVjb3JkTW9kZS5BVURJT19WSURFTyAmJiAoMCwgX2RldGVjdEJyb3dzZXIuaXNDaHJvbWUpKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RvcmUgYm90aCBhdWRpbyBhbmQgdmlkZW9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnJlY29yZGVkRGF0YSA9IHJlY29yZGluZztcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgKHZhciBtdHlwZSBpbiBfdGhpczIucmVjb3JkZWREYXRhKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIuYWRkRmlsZUluZm8oX3RoaXMyLnJlY29yZGVkRGF0YVttdHlwZV0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLmFkZEZpbGVJbmZvKF90aGlzMi5yZWNvcmRlZERhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczIudHJpZ2dlcigncmVjb3JkQ29tcGxldGUnKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQU5JTUFUSU9OOlxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnJlY29yZGVkRGF0YSA9IHJlY29yZGluZy5naWY7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5hZGRGaWxlSW5mbyhfdGhpczIucmVjb3JkZWREYXRhKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm90aWZ5IGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnRyaWdnZXIoJ3JlY29yZENvbXBsZXRlJyk7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH1dKTtcblxuICAgIHJldHVybiBSZWNvcmRSVENFbmdpbmU7XG59KF9yZWNvcmRFbmdpbmUuUmVjb3JkRW5naW5lKTtcblxuLy8gZXhwb3NlIHBsdWdpblxuXG5cbnZpZGVvanMuUmVjb3JkUlRDRW5naW5lID0gUmVjb3JkUlRDRW5naW5lO1xuXG5Db21wb25lbnQucmVnaXN0ZXJDb21wb25lbnQoJ1JlY29yZFJUQ0VuZ2luZScsIFJlY29yZFJUQ0VuZ2luZSk7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IFJlY29yZFJUQ0VuZ2luZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIGxhbWVqcy1wbHVnaW4uanNcbiAqIEBzaW5jZSAxLjEuMFxuICovXG5cbnZhciBSZWNvcmRFbmdpbmUgPSB2aWRlb2pzLmdldENvbXBvbmVudCgnUmVjb3JkRW5naW5lJyk7XG5cbi8qKlxuICogQXVkaW8tb25seSBlbmdpbmUgZm9yIHRoZSBsYW1lanMgbGlicmFyeS5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLlJlY29yZEVuZ2luZVxuICovXG5cbnZhciBMYW1lanNFbmdpbmUgPSBmdW5jdGlvbiAoX1JlY29yZEVuZ2luZSkge1xuICAgIF9pbmhlcml0cyhMYW1lanNFbmdpbmUsIF9SZWNvcmRFbmdpbmUpO1xuXG4gICAgZnVuY3Rpb24gTGFtZWpzRW5naW5lKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGFtZWpzRW5naW5lKTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKExhbWVqc0VuZ2luZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKExhbWVqc0VuZ2luZSkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhMYW1lanNFbmdpbmUsIFt7XG4gICAgICAgIGtleTogJ3NldHVwJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0dXAgcmVjb3JkaW5nIGVuZ2luZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXR1cChzdHJlYW0sIG1lZGlhVHlwZSwgZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRTdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgICB0aGlzLm1lZGlhVHlwZSA9IG1lZGlhVHlwZTtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcbiAgICAgICAgICAgIHRoaXMuYXVkaW9UeXBlID0gJ2F1ZGlvL21wMyc7XG5cbiAgICAgICAgICAgIHZhciBjb25maWcgPSB7XG4gICAgICAgICAgICAgICAgZGVidWc6IHRoaXMuZGVidWcsXG4gICAgICAgICAgICAgICAgc2FtcGxlUmF0ZTogdGhpcy5zYW1wbGVSYXRlLFxuICAgICAgICAgICAgICAgIGJpdFJhdGU6IHRoaXMuYml0UmF0ZVxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgdGhpcy5hdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvU291cmNlTm9kZSA9IHRoaXMuYXVkaW9Db250ZXh0LmNyZWF0ZU1lZGlhU3RyZWFtU291cmNlKHRoaXMuaW5wdXRTdHJlYW0pO1xuICAgICAgICAgICAgdGhpcy5wcm9jZXNzb3IgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVTY3JpcHRQcm9jZXNzb3IoMTYzODQsIDEsIDEpO1xuXG4gICAgICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBXb3JrZXIodGhpcy5hdWRpb1dvcmtlclVSTCk7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5vbm1lc3NhZ2UgPSB0aGlzLm9uV29ya2VyTWVzc2FnZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5wb3N0TWVzc2FnZSh7IGNtZDogJ2luaXQnLCBjb25maWc6IGNvbmZpZyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdGFydCByZWNvcmRpbmcuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdGFydCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydCgpIHtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc29yLm9uYXVkaW9wcm9jZXNzID0gdGhpcy5vbkF1ZGlvUHJvY2Vzcy5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZU5vZGUuY29ubmVjdCh0aGlzLnByb2Nlc3Nvcik7XG4gICAgICAgICAgICB0aGlzLnByb2Nlc3Nvci5jb25uZWN0KHRoaXMuYXVkaW9Db250ZXh0LmRlc3RpbmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wIHJlY29yZGluZy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0b3AnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2VOb2RlLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc29yLmRpc2Nvbm5lY3QoKTtcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc29yLm9uYXVkaW9wcm9jZXNzID0gbnVsbDtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRTdHJlYW0uZ2V0QXVkaW9UcmFja3MoKS5mb3JFYWNoKGZ1bmN0aW9uICh0cmFjaykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0cmFjay5zdG9wKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0LmNsb3NlKCk7XG5cbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnBvc3RNZXNzYWdlKHsgY21kOiAnZmluaXNoJyB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlZCBhIG1lc3NhZ2UgZnJvbSB0aGUgd29ya2VyLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25Xb3JrZXJNZXNzYWdlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uV29ya2VyTWVzc2FnZShldikge1xuICAgICAgICAgICAgc3dpdGNoIChldi5kYXRhLmNtZCkge1xuICAgICAgICAgICAgICAgIGNhc2UgJ2VuZCc6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMub25TdG9wUmVjb3JkaW5nKG5ldyBCbG9iKGV2LmRhdGEuYnVmLCB7IHR5cGU6IHRoaXMuYXVkaW9UeXBlIH0pKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlICdlcnJvcic6XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyKCkudHJpZ2dlcignZXJyb3InLCBldi5kYXRhLmVycm9yKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAvLyBpbnZhbGlkIG1lc3NhZ2UgcmVjZWl2ZWRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIoKS50cmlnZ2VyKCdlcnJvcicsIGV2LmRhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb250aW51b3VzIGVuY29kaW5nIG9mIGF1ZGlvIGRhdGEuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvbkF1ZGlvUHJvY2VzcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvbkF1ZGlvUHJvY2Vzcyhldikge1xuICAgICAgICAgICAgLy8gc2VuZCBtaWNyb3Bob25lIGRhdGEgdG8gTEFNRSBmb3IgTVAzIGVuY29kaW5nIHdoaWxlIHJlY29yZGluZ1xuICAgICAgICAgICAgdmFyIGRhdGEgPSBldi5pbnB1dEJ1ZmZlci5nZXRDaGFubmVsRGF0YSgwKTtcblxuICAgICAgICAgICAgdGhpcy5lbmdpbmUucG9zdE1lc3NhZ2UoeyBjbWQ6ICdlbmNvZGUnLCBidWY6IGRhdGEgfSk7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTGFtZWpzRW5naW5lO1xufShSZWNvcmRFbmdpbmUpO1xuXG4vLyBleHBvc2UgcGx1Z2luXG5cblxudmlkZW9qcy5MYW1lanNFbmdpbmUgPSBMYW1lanNFbmdpbmU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IExhbWVqc0VuZ2luZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIGxpYnZvcmJpcy1wbHVnaW4uanNcbiAqIEBzaW5jZSAxLjEuMFxuICovXG5cbnZhciBSZWNvcmRFbmdpbmUgPSB2aWRlb2pzLmdldENvbXBvbmVudCgnUmVjb3JkRW5naW5lJyk7XG5cbi8qKlxuICogQXVkaW8tb25seSBlbmdpbmUgZm9yIHRoZSBsaWJ2b3JiaXMuanMgbGlicmFyeS5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLlJlY29yZFBsdWdpblxuICovXG5cbnZhciBMaWJWb3JiaXNFbmdpbmUgPSBmdW5jdGlvbiAoX1JlY29yZEVuZ2luZSkge1xuICAgIF9pbmhlcml0cyhMaWJWb3JiaXNFbmdpbmUsIF9SZWNvcmRFbmdpbmUpO1xuXG4gICAgZnVuY3Rpb24gTGliVm9yYmlzRW5naW5lKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgTGliVm9yYmlzRW5naW5lKTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKExpYlZvcmJpc0VuZ2luZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKExpYlZvcmJpc0VuZ2luZSkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhMaWJWb3JiaXNFbmdpbmUsIFt7XG4gICAgICAgIGtleTogJ3NldHVwJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0dXAgcmVjb3JkaW5nIGVuZ2luZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXR1cChzdHJlYW0sIG1lZGlhVHlwZSwgZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRTdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgICB0aGlzLm1lZGlhVHlwZSA9IG1lZGlhVHlwZTtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcblxuICAgICAgICAgICAgLy8gc2V0dXAgbGlidm9yYmlzLmpzXG4gICAgICAgICAgICB0aGlzLm9wdGlvbnMgPSB7XG4gICAgICAgICAgICAgICAgYXVkaW9CaXRzUGVyU2Vjb25kOiB0aGlzLnNhbXBsZVJhdGVcbiAgICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVjb3JkaW5nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc3RhcnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICB0aGlzLmNodW5rcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUgPSBuZXcgVm9yYmlzTWVkaWFSZWNvcmRlcih0aGlzLmlucHV0U3RyZWFtLCB0aGlzLm9wdGlvbnMpO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUub25kYXRhYXZhaWxhYmxlID0gdGhpcy5vbkRhdGEuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLm9uc3RvcCA9IHRoaXMub25SZWNvcmRpbmdBdmFpbGFibGUuYmluZCh0aGlzKTtcblxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuc3RhcnQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wIHJlY29yZGluZy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0b3AnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnN0b3AoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25EYXRhJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uRGF0YShldmVudCkge1xuICAgICAgICAgICAgdGhpcy5jaHVua3MucHVzaChldmVudC5kYXRhKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25SZWNvcmRpbmdBdmFpbGFibGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25SZWNvcmRpbmdBdmFpbGFibGUoKSB7XG4gICAgICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKHRoaXMuY2h1bmtzLCB7IHR5cGU6IHRoaXMuY2h1bmtzWzBdLnR5cGUgfSk7XG4gICAgICAgICAgICB0aGlzLmNodW5rcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5vblN0b3BSZWNvcmRpbmcoYmxvYik7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gTGliVm9yYmlzRW5naW5lO1xufShSZWNvcmRFbmdpbmUpO1xuXG4vLyBleHBvc2UgcGx1Z2luXG5cblxudmlkZW9qcy5MaWJWb3JiaXNFbmdpbmUgPSBMaWJWb3JiaXNFbmdpbmU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IExpYlZvcmJpc0VuZ2luZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIG9wdXMtcmVjb3JkZXItcGx1Z2luLmpzXG4gKiBAc2luY2UgMS4xLjBcbiAqL1xuXG52YXIgUmVjb3JkRW5naW5lID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ1JlY29yZEVuZ2luZScpO1xuXG4vKipcbiAqIEF1ZGlvLW9ubHkgZW5naW5lIGZvciB0aGUgb3B1cy1yZWNvcmRlciBsaWJyYXJ5LlxuICpcbiAqIEF1ZGlvIGlzIGVuY29kZWQgdXNpbmcgbGlib3B1cy5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLlJlY29yZEVuZ2luZVxuICovXG5cbnZhciBPcHVzUmVjb3JkZXJFbmdpbmUgPSBmdW5jdGlvbiAoX1JlY29yZEVuZ2luZSkge1xuICAgIF9pbmhlcml0cyhPcHVzUmVjb3JkZXJFbmdpbmUsIF9SZWNvcmRFbmdpbmUpO1xuXG4gICAgZnVuY3Rpb24gT3B1c1JlY29yZGVyRW5naW5lKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgT3B1c1JlY29yZGVyRW5naW5lKTtcblxuICAgICAgICByZXR1cm4gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4odGhpcywgKE9wdXNSZWNvcmRlckVuZ2luZS5fX3Byb3RvX18gfHwgT2JqZWN0LmdldFByb3RvdHlwZU9mKE9wdXNSZWNvcmRlckVuZ2luZSkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhPcHVzUmVjb3JkZXJFbmdpbmUsIFt7XG4gICAgICAgIGtleTogJ3NldHVwJyxcblxuICAgICAgICAvKipcbiAgICAgICAgICogU2V0dXAgcmVjb3JkaW5nIGVuZ2luZS5cbiAgICAgICAgICovXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXR1cChzdHJlYW0sIG1lZGlhVHlwZSwgZGVidWcpIHtcbiAgICAgICAgICAgIHRoaXMuaW5wdXRTdHJlYW0gPSBzdHJlYW07XG4gICAgICAgICAgICB0aGlzLm1lZGlhVHlwZSA9IG1lZGlhVHlwZTtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSBkZWJ1ZztcblxuICAgICAgICAgICAgLy8gYWxzbyBzdXBwb3J0cyAnYXVkaW8vd2F2JzsgYnV0IG1ha2Ugc3VyZSB0byB1c2Ugd2F2ZUVuY29kZXIgd29ya2VyXG4gICAgICAgICAgICAvLyBpbiB0aGF0IGNhc2VcbiAgICAgICAgICAgIHRoaXMuYXVkaW9UeXBlID0gJ2F1ZGlvL29nZyc7XG5cbiAgICAgICAgICAgIHRoaXMuZW5naW5lID0gbmV3IFJlY29yZGVyKHtcbiAgICAgICAgICAgICAgICBsZWF2ZVN0cmVhbU9wZW46IHRydWUsXG4gICAgICAgICAgICAgICAgbnVtYmVyT2ZDaGFubmVsczogdGhpcy5hdWRpb0NoYW5uZWxzLFxuICAgICAgICAgICAgICAgIGJ1ZmZlckxlbmd0aDogdGhpcy5idWZmZXJTaXplLFxuICAgICAgICAgICAgICAgIGVuY29kZXJTYW1wbGVSYXRlOiB0aGlzLnNhbXBsZVJhdGUsXG4gICAgICAgICAgICAgICAgZW5jb2RlclBhdGg6IHRoaXMuYXVkaW9Xb3JrZXJVUkxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUub25kYXRhYXZhaWxhYmxlID0gdGhpcy5vblJlY29yZGluZ0F2YWlsYWJsZS5iaW5kKHRoaXMpO1xuXG4gICAgICAgICAgICB0aGlzLmF1ZGlvQ29udGV4dCA9IG5ldyBBdWRpb0NvbnRleHQoKTtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9Tb3VyY2VOb2RlID0gdGhpcy5hdWRpb0NvbnRleHQuY3JlYXRlTWVkaWFTdHJlYW1Tb3VyY2UodGhpcy5pbnB1dFN0cmVhbSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVjb3JkaW5nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc3RhcnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuc3RhcnQodGhpcy5hdWRpb1NvdXJjZU5vZGUpLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIC8vIHJlY29yZGluZyBzdGFydGVkIG9rXG4gICAgICAgICAgICB9KS5jYXRjaChmdW5jdGlvbiAoZXJyKSB7XG4gICAgICAgICAgICAgICAgLy8gY2FuJ3Qgc3RhcnQgcGxheWJhY2tcbiAgICAgICAgICAgICAgICBfdGhpczIucGxheWVyKCkudHJpZ2dlcignZXJyb3InLCBlcnIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcCByZWNvcmRpbmcuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdG9wJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5zdG9wKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUGF1c2UgcmVjb3JkaW5nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncGF1c2UnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGF1c2UoKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5wYXVzZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc3VtZSByZWNvcmRpbmcuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZXN1bWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcmVzdW1lKCkge1xuICAgICAgICAgICAgdGhpcy5lbmdpbmUucmVzdW1lKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uUmVjb3JkaW5nQXZhaWxhYmxlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uUmVjb3JkaW5nQXZhaWxhYmxlKGRhdGEpIHtcbiAgICAgICAgICAgIC8vIE9wdXMgZm9ybWF0IHN0b3JlZCBpbiBhbiBPZ2cgY29udGFpbmVyXG4gICAgICAgICAgICB2YXIgYmxvYiA9IG5ldyBCbG9iKFtkYXRhXSwgeyB0eXBlOiB0aGlzLmF1ZGlvVHlwZSB9KTtcblxuICAgICAgICAgICAgdGhpcy5vblN0b3BSZWNvcmRpbmcoYmxvYik7XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gT3B1c1JlY29yZGVyRW5naW5lO1xufShSZWNvcmRFbmdpbmUpO1xuXG4vLyBleHBvc2UgcGx1Z2luXG5cblxudmlkZW9qcy5PcHVzUmVjb3JkZXJFbmdpbmUgPSBPcHVzUmVjb3JkZXJFbmdpbmU7XG5cbmV4cG9ydHMuZGVmYXVsdCA9IE9wdXNSZWNvcmRlckVuZ2luZTsiLCIndXNlIHN0cmljdCc7XG5cbk9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBcIl9fZXNNb2R1bGVcIiwge1xuICAgIHZhbHVlOiB0cnVlXG59KTtcblxudmFyIF9jcmVhdGVDbGFzcyA9IGZ1bmN0aW9uICgpIHsgZnVuY3Rpb24gZGVmaW5lUHJvcGVydGllcyh0YXJnZXQsIHByb3BzKSB7IGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcHMubGVuZ3RoOyBpKyspIHsgdmFyIGRlc2NyaXB0b3IgPSBwcm9wc1tpXTsgZGVzY3JpcHRvci5lbnVtZXJhYmxlID0gZGVzY3JpcHRvci5lbnVtZXJhYmxlIHx8IGZhbHNlOyBkZXNjcmlwdG9yLmNvbmZpZ3VyYWJsZSA9IHRydWU7IGlmIChcInZhbHVlXCIgaW4gZGVzY3JpcHRvcikgZGVzY3JpcHRvci53cml0YWJsZSA9IHRydWU7IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0YXJnZXQsIGRlc2NyaXB0b3Iua2V5LCBkZXNjcmlwdG9yKTsgfSB9IHJldHVybiBmdW5jdGlvbiAoQ29uc3RydWN0b3IsIHByb3RvUHJvcHMsIHN0YXRpY1Byb3BzKSB7IGlmIChwcm90b1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLnByb3RvdHlwZSwgcHJvdG9Qcm9wcyk7IGlmIChzdGF0aWNQcm9wcykgZGVmaW5lUHJvcGVydGllcyhDb25zdHJ1Y3Rvciwgc3RhdGljUHJvcHMpOyByZXR1cm4gQ29uc3RydWN0b3I7IH07IH0oKTtcblxuZnVuY3Rpb24gX2NsYXNzQ2FsbENoZWNrKGluc3RhbmNlLCBDb25zdHJ1Y3RvcikgeyBpZiAoIShpbnN0YW5jZSBpbnN0YW5jZW9mIENvbnN0cnVjdG9yKSkgeyB0aHJvdyBuZXcgVHlwZUVycm9yKFwiQ2Fubm90IGNhbGwgYSBjbGFzcyBhcyBhIGZ1bmN0aW9uXCIpOyB9IH1cblxuZnVuY3Rpb24gX3Bvc3NpYmxlQ29uc3RydWN0b3JSZXR1cm4oc2VsZiwgY2FsbCkgeyBpZiAoIXNlbGYpIHsgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwidGhpcyBoYXNuJ3QgYmVlbiBpbml0aWFsaXNlZCAtIHN1cGVyKCkgaGFzbid0IGJlZW4gY2FsbGVkXCIpOyB9IHJldHVybiBjYWxsICYmICh0eXBlb2YgY2FsbCA9PT0gXCJvYmplY3RcIiB8fCB0eXBlb2YgY2FsbCA9PT0gXCJmdW5jdGlvblwiKSA/IGNhbGwgOiBzZWxmOyB9XG5cbmZ1bmN0aW9uIF9pbmhlcml0cyhzdWJDbGFzcywgc3VwZXJDbGFzcykgeyBpZiAodHlwZW9mIHN1cGVyQ2xhc3MgIT09IFwiZnVuY3Rpb25cIiAmJiBzdXBlckNsYXNzICE9PSBudWxsKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJTdXBlciBleHByZXNzaW9uIG11c3QgZWl0aGVyIGJlIG51bGwgb3IgYSBmdW5jdGlvbiwgbm90IFwiICsgdHlwZW9mIHN1cGVyQ2xhc3MpOyB9IHN1YkNsYXNzLnByb3RvdHlwZSA9IE9iamVjdC5jcmVhdGUoc3VwZXJDbGFzcyAmJiBzdXBlckNsYXNzLnByb3RvdHlwZSwgeyBjb25zdHJ1Y3RvcjogeyB2YWx1ZTogc3ViQ2xhc3MsIGVudW1lcmFibGU6IGZhbHNlLCB3cml0YWJsZTogdHJ1ZSwgY29uZmlndXJhYmxlOiB0cnVlIH0gfSk7IGlmIChzdXBlckNsYXNzKSBPYmplY3Quc2V0UHJvdG90eXBlT2YgPyBPYmplY3Quc2V0UHJvdG90eXBlT2Yoc3ViQ2xhc3MsIHN1cGVyQ2xhc3MpIDogc3ViQ2xhc3MuX19wcm90b19fID0gc3VwZXJDbGFzczsgfVxuXG4vKipcbiAqIEBmaWxlIHJlY29yZGVyanMtcGx1Z2luLmpzXG4gKiBAc2luY2UgMS4xLjBcbiAqL1xuXG52YXIgUmVjb3JkRW5naW5lID0gdmlkZW9qcy5nZXRDb21wb25lbnQoJ1JlY29yZEVuZ2luZScpO1xuXG4vKipcbiAqIEF1ZGlvLW9ubHkgZW5naW5lIGZvciB0aGUgcmVjb3JkZXIuanMgbGlicmFyeS5cbiAqXG4gKiBAY2xhc3NcbiAqIEBhdWdtZW50cyB2aWRlb2pzLlJlY29yZEVuZ2luZVxuICovXG5cbnZhciBSZWNvcmRlcmpzRW5naW5lID0gZnVuY3Rpb24gKF9SZWNvcmRFbmdpbmUpIHtcbiAgICBfaW5oZXJpdHMoUmVjb3JkZXJqc0VuZ2luZSwgX1JlY29yZEVuZ2luZSk7XG5cbiAgICBmdW5jdGlvbiBSZWNvcmRlcmpzRW5naW5lKCkge1xuICAgICAgICBfY2xhc3NDYWxsQ2hlY2sodGhpcywgUmVjb3JkZXJqc0VuZ2luZSk7XG5cbiAgICAgICAgcmV0dXJuIF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChSZWNvcmRlcmpzRW5naW5lLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkZXJqc0VuZ2luZSkpLmFwcGx5KHRoaXMsIGFyZ3VtZW50cykpO1xuICAgIH1cblxuICAgIF9jcmVhdGVDbGFzcyhSZWNvcmRlcmpzRW5naW5lLCBbe1xuICAgICAgICBrZXk6ICdzZXR1cCcsXG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNldHVwIHJlY29yZGluZyBlbmdpbmUuXG4gICAgICAgICAqL1xuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0dXAoc3RyZWFtLCBtZWRpYVR5cGUsIGRlYnVnKSB7XG4gICAgICAgICAgICB0aGlzLmlucHV0U3RyZWFtID0gc3RyZWFtO1xuICAgICAgICAgICAgdGhpcy5tZWRpYVR5cGUgPSBtZWRpYVR5cGU7XG4gICAgICAgICAgICB0aGlzLmRlYnVnID0gZGVidWc7XG5cbiAgICAgICAgICAgIHRoaXMuYXVkaW9Db250ZXh0ID0gbmV3IEF1ZGlvQ29udGV4dCgpO1xuICAgICAgICAgICAgdGhpcy5hdWRpb1NvdXJjZU5vZGUgPSB0aGlzLmF1ZGlvQ29udGV4dC5jcmVhdGVNZWRpYVN0cmVhbVNvdXJjZSh0aGlzLmlucHV0U3RyZWFtKTtcblxuICAgICAgICAgICAgLy8gc2V0dXAgcmVjb3JkZXIuanNcbiAgICAgICAgICAgIHRoaXMuZW5naW5lID0gbmV3IFJlY29yZGVyKHRoaXMuYXVkaW9Tb3VyY2VOb2RlLCB7XG4gICAgICAgICAgICAgICAgYnVmZmVyTGVuOiB0aGlzLmJ1ZmZlclNpemUsXG4gICAgICAgICAgICAgICAgbnVtQ2hhbm5lbHM6IHRoaXMuYXVkaW9DaGFubmVsc1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVjb3JkaW5nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc3RhcnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5yZWNvcmQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdG9wIHJlY29yZGluZy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0b3AnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcCgpIHtcbiAgICAgICAgICAgIHRoaXMuZW5naW5lLnN0b3AoKTtcblxuICAgICAgICAgICAgdGhpcy5lbmdpbmUuZXhwb3J0V0FWKHRoaXMub25TdG9wUmVjb3JkaW5nLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5jbGVhcigpO1xuICAgICAgICB9XG4gICAgfV0pO1xuXG4gICAgcmV0dXJuIFJlY29yZGVyanNFbmdpbmU7XG59KFJlY29yZEVuZ2luZSk7XG5cbi8vIGV4cG9zZSBwbHVnaW5cblxuXG52aWRlb2pzLlJlY29yZGVyanNFbmdpbmUgPSBSZWNvcmRlcmpzRW5naW5lO1xuXG5leHBvcnRzLmRlZmF1bHQgPSBSZWNvcmRlcmpzRW5naW5lOyIsIid1c2Ugc3RyaWN0JztcblxuT2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFwiX19lc01vZHVsZVwiLCB7XG4gICAgdmFsdWU6IHRydWVcbn0pO1xuLyoqXG4gKiBAZmlsZSBicm93c2VyLXNoaW0uanNcbiAqIEBzaW5jZSAyLjAuMFxuICovXG5cbnZhciBzZXRTcmNPYmplY3QgPSBmdW5jdGlvbiBzZXRTcmNPYmplY3Qoc3RyZWFtLCBlbGVtZW50LCBpZ25vcmVDcmVhdGVPYmplY3RVUkwpIHtcbiAgICBpZiAoJ2NyZWF0ZU9iamVjdFVSTCcgaW4gVVJMICYmICFpZ25vcmVDcmVhdGVPYmplY3RVUkwpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsZW1lbnQuc3JjID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdHJlYW0pO1xuICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICBzZXRTcmNPYmplY3Qoc3RyZWFtLCBlbGVtZW50LCB0cnVlKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH0gZWxzZSBpZiAoJ3NyY09iamVjdCcgaW4gZWxlbWVudCkge1xuICAgICAgICBlbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICB9IGVsc2UgaWYgKCdtb3pTcmNPYmplY3QnIGluIGVsZW1lbnQpIHtcbiAgICAgICAgZWxlbWVudC5tb3pTcmNPYmplY3QgPSBzdHJlYW07XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY29uc29sZS5sb2coJ2NyZWF0ZU9iamVjdFVSTC9zcmNPYmplY3QgYm90aCBhcmUgbm90IHN1cHBvcnRlZC4nKTtcbiAgICB9XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBzZXRTcmNPYmplY3Q7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG5leHBvcnRzLmlzU2FmYXJpID0gZXhwb3J0cy5pc0Nocm9tZSA9IGV4cG9ydHMuaXNPcGVyYSA9IGV4cG9ydHMuaXNFZGdlID0gZXhwb3J0cy5kZXRlY3RCcm93c2VyID0gdW5kZWZpbmVkO1xuXG52YXIgX3dpbmRvdyA9IHJlcXVpcmUoJ2dsb2JhbC93aW5kb3cnKTtcblxudmFyIF93aW5kb3cyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfd2luZG93KTtcblxuZnVuY3Rpb24gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChvYmopIHsgcmV0dXJuIG9iaiAmJiBvYmouX19lc01vZHVsZSA/IG9iaiA6IHsgZGVmYXVsdDogb2JqIH07IH1cblxuLyoqXG4gKiBCcm93c2VyIGRldGVjdG9yLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcmV0dXJuIHtvYmplY3R9IHJlc3VsdCBjb250YWluaW5nIGJyb3dzZXIsIHZlcnNpb24gYW5kIG1pblZlcnNpb25cbiAqICAgICBwcm9wZXJ0aWVzLlxuICovXG52YXIgZGV0ZWN0QnJvd3NlciA9IGZ1bmN0aW9uIGRldGVjdEJyb3dzZXIoKSB7XG4gICAgLy8gcmV0dXJuZWQgcmVzdWx0IG9iamVjdFxuICAgIHZhciByZXN1bHQgPSB7fTtcbiAgICByZXN1bHQuYnJvd3NlciA9IG51bGw7XG4gICAgcmVzdWx0LnZlcnNpb24gPSBudWxsO1xuICAgIHJlc3VsdC5taW5WZXJzaW9uID0gbnVsbDtcblxuICAgIC8vIGZhaWwgZWFybHkgaWYgaXQncyBub3QgYSBicm93c2VyXG4gICAgaWYgKHR5cGVvZiBfd2luZG93Mi5kZWZhdWx0ID09PSAndW5kZWZpbmVkJyB8fCAhX3dpbmRvdzIuZGVmYXVsdC5uYXZpZ2F0b3IpIHtcbiAgICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgc3VwcG9ydGVkIGJyb3dzZXIuJztcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICAvLyBGaXJlZm94XG4gICAgaWYgKG5hdmlnYXRvci5tb3pHZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnZmlyZWZveCc7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCwgL0ZpcmVmb3hcXC8oXFxkKylcXC4vLCAxKTtcbiAgICAgICAgcmVzdWx0Lm1pblZlcnNpb24gPSAzMTtcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci53ZWJraXRHZXRVc2VyTWVkaWEpIHtcbiAgICAgICAgLy8gQ2hyb21lLCBDaHJvbWl1bSwgV2VidmlldywgT3BlcmFcbiAgICAgICAgaWYgKF93aW5kb3cyLmRlZmF1bHQud2Via2l0UlRDUGVlckNvbm5lY3Rpb24pIHtcbiAgICAgICAgICAgIHJlc3VsdC5icm93c2VyID0gJ2Nocm9tZSc7XG4gICAgICAgICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsIC9DaHJvbShlfGl1bSlcXC8oXFxkKylcXC4vLCAyKTtcbiAgICAgICAgICAgIHJlc3VsdC5taW5WZXJzaW9uID0gMzg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBTYWZhcmkgKGluIGFuIHVucHVibGlzaGVkIHZlcnNpb24pIG9yIHVua25vd24gd2Via2l0LWJhc2VkLlxuICAgICAgICAgICAgaWYgKG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL1ZlcnNpb25cXC8oXFxkKykuKFxcZCspLykpIHtcbiAgICAgICAgICAgICAgICByZXN1bHQuYnJvd3NlciA9ICdzYWZhcmknO1xuICAgICAgICAgICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCwgL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLywgMSk7XG4gICAgICAgICAgICAgICAgcmVzdWx0Lm1pblZlcnNpb24gPSAxMTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gdW5rbm93biB3ZWJraXQtYmFzZWQgYnJvd3Nlci5cbiAgICAgICAgICAgICAgICByZXN1bHQuYnJvd3NlciA9ICdVbnN1cHBvcnRlZCB3ZWJraXQtYmFzZWQgYnJvd3NlciAnICsgJ3dpdGggR1VNIHN1cHBvcnQgYnV0IG5vIFdlYlJUQyBzdXBwb3J0Lic7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBFZGdlXG4gICAgfSBlbHNlIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2goL0VkZ2VcXC8oXFxkKykuKFxcZCspJC8pKSB7XG4gICAgICAgIHJlc3VsdC5icm93c2VyID0gJ2VkZ2UnO1xuICAgICAgICByZXN1bHQudmVyc2lvbiA9IGV4dHJhY3RWZXJzaW9uKG5hdmlnYXRvci51c2VyQWdlbnQsIC9FZGdlXFwvKFxcZCspLihcXGQrKSQvLCAyKTtcbiAgICAgICAgcmVzdWx0Lm1pblZlcnNpb24gPSAxMDU0NztcbiAgICB9IGVsc2UgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLnVzZXJBZ2VudC5tYXRjaCgvQXBwbGVXZWJLaXRcXC8oXFxkKylcXC4vKSkge1xuICAgICAgICAvLyBTYWZhcmksIHdpdGggd2Via2l0R2V0VXNlck1lZGlhIHJlbW92ZWQuXG4gICAgICAgIHJlc3VsdC5icm93c2VyID0gJ3NhZmFyaSc7XG4gICAgICAgIHJlc3VsdC52ZXJzaW9uID0gZXh0cmFjdFZlcnNpb24obmF2aWdhdG9yLnVzZXJBZ2VudCwgL0FwcGxlV2ViS2l0XFwvKFxcZCspXFwuLywgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgLy8gZGVmYXVsdCBmYWxsdGhyb3VnaDogbm90IHN1cHBvcnRlZC5cbiAgICAgICAgcmVzdWx0LmJyb3dzZXIgPSAnTm90IGEgc3VwcG9ydGVkIGJyb3dzZXIuJztcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xufTtcblxuLyoqXG4gKiBFeHRyYWN0IGJyb3dzZXIgdmVyc2lvbiBvdXQgb2YgdGhlIHByb3ZpZGVkIHVzZXIgYWdlbnQgc3RyaW5nLlxuICpcbiAqIEBwcml2YXRlXG4gKiBAcGFyYW0geyFzdHJpbmd9IHVhc3RyaW5nIC0gdXNlckFnZW50IHN0cmluZy5cbiAqIEBwYXJhbSB7IXN0cmluZ30gZXhwciAtIFJlZ3VsYXIgZXhwcmVzc2lvbiB1c2VkIGFzIG1hdGNoIGNyaXRlcmlhLlxuICogQHBhcmFtIHshbnVtYmVyfSBwb3MgLSBwb3NpdGlvbiBpbiB0aGUgdmVyc2lvbiBzdHJpbmcgdG8gYmVcbiAqICAgICByZXR1cm5lZC5cbiAqIEByZXR1cm4geyFudW1iZXJ9IGJyb3dzZXIgdmVyc2lvbi5cbiAqL1xuLyoqXG4gKiBAZmlsZSBkZXRlY3QtYnJvd3Nlci5qc1xuICogQHNpbmNlIDIuMC4wXG4gKi9cblxudmFyIGV4dHJhY3RWZXJzaW9uID0gZnVuY3Rpb24gZXh0cmFjdFZlcnNpb24odWFzdHJpbmcsIGV4cHIsIHBvcykge1xuICAgIHZhciBtYXRjaCA9IHVhc3RyaW5nLm1hdGNoKGV4cHIpO1xuICAgIHJldHVybiBtYXRjaCAmJiBtYXRjaC5sZW5ndGggPj0gcG9zICYmIHBhcnNlSW50KG1hdGNoW3Bvc10sIDEwKTtcbn07XG5cbnZhciBpc0VkZ2UgPSBmdW5jdGlvbiBpc0VkZ2UoKSB7XG4gICAgcmV0dXJuIGRldGVjdEJyb3dzZXIoKS5icm93c2VyID09PSAnZWRnZSc7XG59O1xuXG52YXIgaXNTYWZhcmkgPSBmdW5jdGlvbiBpc1NhZmFyaSgpIHtcbiAgICByZXR1cm4gZGV0ZWN0QnJvd3NlcigpLmJyb3dzZXIgPT09ICdzYWZhcmknO1xufTtcblxudmFyIGlzT3BlcmEgPSBmdW5jdGlvbiBpc09wZXJhKCkge1xuICAgIHJldHVybiAhIV93aW5kb3cyLmRlZmF1bHQub3BlcmEgfHwgbmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdPUFIvJykgIT09IC0xO1xufTtcblxudmFyIGlzQ2hyb21lID0gZnVuY3Rpb24gaXNDaHJvbWUoKSB7XG4gICAgcmV0dXJuIGRldGVjdEJyb3dzZXIoKS5icm93c2VyID09PSAnY2hyb21lJztcbn07XG5cbmV4cG9ydHMuZGV0ZWN0QnJvd3NlciA9IGRldGVjdEJyb3dzZXI7XG5leHBvcnRzLmlzRWRnZSA9IGlzRWRnZTtcbmV4cG9ydHMuaXNPcGVyYSA9IGlzT3BlcmE7XG5leHBvcnRzLmlzQ2hyb21lID0gaXNDaHJvbWU7XG5leHBvcnRzLmlzU2FmYXJpID0gaXNTYWZhcmk7IiwiJ3VzZSBzdHJpY3QnO1xuXG5PYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgXCJfX2VzTW9kdWxlXCIsIHtcbiAgICB2YWx1ZTogdHJ1ZVxufSk7XG4vKipcbiAqIEBmaWxlIGZvcm1hdC10aW1lLmpzXG4gKiBAc2luY2UgMi4wLjBcbiAqL1xuXG4vKipcbiAqIEZvcm1hdCBzZWNvbmRzIGFzIGEgdGltZSBzdHJpbmcsIEg6TU06U1MsIE06U1Mgb3IgTTpTUzpNTU0uXG4gKlxuICogU3VwcGx5aW5nIGEgZ3VpZGUgKGluIHNlY29uZHMpIHdpbGwgZm9yY2UgYSBudW1iZXIgb2YgbGVhZGluZyB6ZXJvc1xuICogdG8gY292ZXIgdGhlIGxlbmd0aCBvZiB0aGUgZ3VpZGUuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IHNlY29uZHMgLSBOdW1iZXIgb2Ygc2Vjb25kcyB0byBiZSB0dXJuZWQgaW50byBhXG4gKiAgICAgc3RyaW5nLlxuICogQHBhcmFtIHtudW1iZXJ9IGd1aWRlIC0gTnVtYmVyIChpbiBzZWNvbmRzKSB0byBtb2RlbCB0aGUgc3RyaW5nXG4gKiAgICAgYWZ0ZXIuXG4gKiBAcGFyYW0ge251bWJlcn0gbXNEaXNwbGF5TWF4IC0gTnVtYmVyIChpbiBtaWxsaXNlY29uZHMpIHRvIG1vZGVsIHRoZSBzdHJpbmdcbiAqICAgICBhZnRlci5cbiAqIEByZXR1cm4ge3N0cmluZ30gVGltZSBmb3JtYXR0ZWQgYXMgSDpNTTpTUywgTTpTUyBvciBNOlNTOk1NTSwgZS5nLlxuICogICAgIDA6MDA6MTIuXG4gKiBAcHJpdmF0ZVxuICovXG52YXIgZm9ybWF0VGltZSA9IGZ1bmN0aW9uIGZvcm1hdFRpbWUoc2Vjb25kcywgZ3VpZGUsIG1zRGlzcGxheU1heCkge1xuICAgIC8vIERlZmF1bHQgdG8gdXNpbmcgc2Vjb25kcyBhcyBndWlkZVxuICAgIHNlY29uZHMgPSBzZWNvbmRzIDwgMCA/IDAgOiBzZWNvbmRzO1xuICAgIGd1aWRlID0gZ3VpZGUgfHwgc2Vjb25kcztcbiAgICB2YXIgcyA9IE1hdGguZmxvb3Ioc2Vjb25kcyAlIDYwKSxcbiAgICAgICAgbSA9IE1hdGguZmxvb3Ioc2Vjb25kcyAvIDYwICUgNjApLFxuICAgICAgICBoID0gTWF0aC5mbG9vcihzZWNvbmRzIC8gMzYwMCksXG4gICAgICAgIGdtID0gTWF0aC5mbG9vcihndWlkZSAvIDYwICUgNjApLFxuICAgICAgICBnaCA9IE1hdGguZmxvb3IoZ3VpZGUgLyAzNjAwKSxcbiAgICAgICAgbXMgPSBNYXRoLmZsb29yKChzZWNvbmRzIC0gcykgKiAxMDAwKTtcblxuICAgIC8vIGhhbmRsZSBpbnZhbGlkIHRpbWVzXG4gICAgaWYgKGlzTmFOKHNlY29uZHMpIHx8IHNlY29uZHMgPT09IEluZmluaXR5KSB7XG4gICAgICAgIC8vICctJyBpcyBmYWxzZSBmb3IgYWxsIHJlbGF0aW9uYWwgb3BlcmF0b3JzIChlLmcuIDwsID49KSBzbyB0aGlzXG4gICAgICAgIC8vIHNldHRpbmcgd2lsbCBhZGQgdGhlIG1pbmltdW0gbnVtYmVyIG9mIGZpZWxkcyBzcGVjaWZpZWQgYnkgdGhlXG4gICAgICAgIC8vIGd1aWRlXG4gICAgICAgIGggPSBtID0gcyA9IG1zID0gJy0nO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIHdlIG5lZWQgdG8gc2hvdyBtaWxsaXNlY29uZHNcbiAgICBpZiAoZ3VpZGUgPiAwICYmIGd1aWRlIDwgbXNEaXNwbGF5TWF4KSB7XG4gICAgICAgIGlmIChtcyA8IDEwMCkge1xuICAgICAgICAgICAgaWYgKG1zIDwgMTApIHtcbiAgICAgICAgICAgICAgICBtcyA9ICcwMCcgKyBtcztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgbXMgPSAnMCcgKyBtcztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBtcyA9ICc6JyArIG1zO1xuICAgIH0gZWxzZSB7XG4gICAgICAgIG1zID0gJyc7XG4gICAgfVxuXG4gICAgLy8gQ2hlY2sgaWYgd2UgbmVlZCB0byBzaG93IGhvdXJzXG4gICAgaCA9IGggPiAwIHx8IGdoID4gMCA/IGggKyAnOicgOiAnJztcblxuICAgIC8vIElmIGhvdXJzIGFyZSBzaG93aW5nLCB3ZSBtYXkgbmVlZCB0byBhZGQgYSBsZWFkaW5nIHplcm8uXG4gICAgLy8gQWx3YXlzIHNob3cgYXQgbGVhc3Qgb25lIGRpZ2l0IG9mIG1pbnV0ZXMuXG4gICAgbSA9ICgoaCB8fCBnbSA+PSAxMCkgJiYgbSA8IDEwID8gJzAnICsgbSA6IG0pICsgJzonO1xuXG4gICAgLy8gQ2hlY2sgaWYgbGVhZGluZyB6ZXJvIGlzIG5lZWQgZm9yIHNlY29uZHNcbiAgICBzID0gcyA8IDEwID8gJzAnICsgcyA6IHM7XG5cbiAgICByZXR1cm4gaCArIG0gKyBzICsgbXM7XG59O1xuXG5leHBvcnRzLmRlZmF1bHQgPSBmb3JtYXRUaW1lOyIsIid1c2Ugc3RyaWN0JztcblxudmFyIF90eXBlb2YgPSB0eXBlb2YgU3ltYm9sID09PSBcImZ1bmN0aW9uXCIgJiYgdHlwZW9mIFN5bWJvbC5pdGVyYXRvciA9PT0gXCJzeW1ib2xcIiA/IGZ1bmN0aW9uIChvYmopIHsgcmV0dXJuIHR5cGVvZiBvYmo7IH0gOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgdHlwZW9mIFN5bWJvbCA9PT0gXCJmdW5jdGlvblwiICYmIG9iai5jb25zdHJ1Y3RvciA9PT0gU3ltYm9sICYmIG9iaiAhPT0gU3ltYm9sLnByb3RvdHlwZSA/IFwic3ltYm9sXCIgOiB0eXBlb2Ygb2JqOyB9O1xuXG52YXIgX2NyZWF0ZUNsYXNzID0gZnVuY3Rpb24gKCkgeyBmdW5jdGlvbiBkZWZpbmVQcm9wZXJ0aWVzKHRhcmdldCwgcHJvcHMpIHsgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wcy5sZW5ndGg7IGkrKykgeyB2YXIgZGVzY3JpcHRvciA9IHByb3BzW2ldOyBkZXNjcmlwdG9yLmVudW1lcmFibGUgPSBkZXNjcmlwdG9yLmVudW1lcmFibGUgfHwgZmFsc2U7IGRlc2NyaXB0b3IuY29uZmlndXJhYmxlID0gdHJ1ZTsgaWYgKFwidmFsdWVcIiBpbiBkZXNjcmlwdG9yKSBkZXNjcmlwdG9yLndyaXRhYmxlID0gdHJ1ZTsgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRhcmdldCwgZGVzY3JpcHRvci5rZXksIGRlc2NyaXB0b3IpOyB9IH0gcmV0dXJuIGZ1bmN0aW9uIChDb25zdHJ1Y3RvciwgcHJvdG9Qcm9wcywgc3RhdGljUHJvcHMpIHsgaWYgKHByb3RvUHJvcHMpIGRlZmluZVByb3BlcnRpZXMoQ29uc3RydWN0b3IucHJvdG90eXBlLCBwcm90b1Byb3BzKTsgaWYgKHN0YXRpY1Byb3BzKSBkZWZpbmVQcm9wZXJ0aWVzKENvbnN0cnVjdG9yLCBzdGF0aWNQcm9wcyk7IHJldHVybiBDb25zdHJ1Y3RvcjsgfTsgfSgpO1xuXG52YXIgX2dldCA9IGZ1bmN0aW9uIGdldChvYmplY3QsIHByb3BlcnR5LCByZWNlaXZlcikgeyBpZiAob2JqZWN0ID09PSBudWxsKSBvYmplY3QgPSBGdW5jdGlvbi5wcm90b3R5cGU7IHZhciBkZXNjID0gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihvYmplY3QsIHByb3BlcnR5KTsgaWYgKGRlc2MgPT09IHVuZGVmaW5lZCkgeyB2YXIgcGFyZW50ID0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iamVjdCk7IGlmIChwYXJlbnQgPT09IG51bGwpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSBlbHNlIHsgcmV0dXJuIGdldChwYXJlbnQsIHByb3BlcnR5LCByZWNlaXZlcik7IH0gfSBlbHNlIGlmIChcInZhbHVlXCIgaW4gZGVzYykgeyByZXR1cm4gZGVzYy52YWx1ZTsgfSBlbHNlIHsgdmFyIGdldHRlciA9IGRlc2MuZ2V0OyBpZiAoZ2V0dGVyID09PSB1bmRlZmluZWQpIHsgcmV0dXJuIHVuZGVmaW5lZDsgfSByZXR1cm4gZ2V0dGVyLmNhbGwocmVjZWl2ZXIpOyB9IH07XG5cbnZhciBfYW5pbWF0aW9uRGlzcGxheSA9IHJlcXVpcmUoJy4vY29udHJvbHMvYW5pbWF0aW9uLWRpc3BsYXknKTtcblxudmFyIF9hbmltYXRpb25EaXNwbGF5MiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2FuaW1hdGlvbkRpc3BsYXkpO1xuXG52YXIgX3JlY29yZENhbnZhcyA9IHJlcXVpcmUoJy4vY29udHJvbHMvcmVjb3JkLWNhbnZhcycpO1xuXG52YXIgX3JlY29yZENhbnZhczIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWNvcmRDYW52YXMpO1xuXG52YXIgX2RldmljZUJ1dHRvbiA9IHJlcXVpcmUoJy4vY29udHJvbHMvZGV2aWNlLWJ1dHRvbicpO1xuXG52YXIgX2RldmljZUJ1dHRvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9kZXZpY2VCdXR0b24pO1xuXG52YXIgX2NhbWVyYUJ1dHRvbiA9IHJlcXVpcmUoJy4vY29udHJvbHMvY2FtZXJhLWJ1dHRvbicpO1xuXG52YXIgX2NhbWVyYUJ1dHRvbjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9jYW1lcmFCdXR0b24pO1xuXG52YXIgX3JlY29yZFRvZ2dsZSA9IHJlcXVpcmUoJy4vY29udHJvbHMvcmVjb3JkLXRvZ2dsZScpO1xuXG52YXIgX3JlY29yZFRvZ2dsZTIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWNvcmRUb2dnbGUpO1xuXG52YXIgX3JlY29yZEluZGljYXRvciA9IHJlcXVpcmUoJy4vY29udHJvbHMvcmVjb3JkLWluZGljYXRvcicpO1xuXG52YXIgX3JlY29yZEluZGljYXRvcjIgPSBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KF9yZWNvcmRJbmRpY2F0b3IpO1xuXG52YXIgX2RlZmF1bHRzID0gcmVxdWlyZSgnLi9kZWZhdWx0cycpO1xuXG52YXIgX2RlZmF1bHRzMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2RlZmF1bHRzKTtcblxudmFyIF9mb3JtYXRUaW1lID0gcmVxdWlyZSgnLi91dGlscy9mb3JtYXQtdGltZScpO1xuXG52YXIgX2Zvcm1hdFRpbWUyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfZm9ybWF0VGltZSk7XG5cbnZhciBfYnJvd3NlclNoaW0gPSByZXF1aXJlKCcuL3V0aWxzL2Jyb3dzZXItc2hpbScpO1xuXG52YXIgX2Jyb3dzZXJTaGltMiA9IF9pbnRlcm9wUmVxdWlyZURlZmF1bHQoX2Jyb3dzZXJTaGltKTtcblxudmFyIF9kZXRlY3RCcm93c2VyID0gcmVxdWlyZSgnLi91dGlscy9kZXRlY3QtYnJvd3NlcicpO1xuXG52YXIgX3JlY29yZFJ0YyA9IHJlcXVpcmUoJy4vZW5naW5lL3JlY29yZC1ydGMnKTtcblxudmFyIF9yZWNvcmRSdGMyID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfcmVjb3JkUnRjKTtcblxudmFyIF9yZWNvcmRFbmdpbmUgPSByZXF1aXJlKCcuL2VuZ2luZS9yZWNvcmQtZW5naW5lJyk7XG5cbnZhciBfcmVjb3JkTW9kZSA9IHJlcXVpcmUoJy4vZW5naW5lL3JlY29yZC1tb2RlJyk7XG5cbnZhciBfdmlkZW8gPSAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiA/IHdpbmRvd1sndmlkZW9qcyddIDogdHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiA/IGdsb2JhbFsndmlkZW9qcyddIDogbnVsbCk7XG5cbnZhciBfdmlkZW8yID0gX2ludGVyb3BSZXF1aXJlRGVmYXVsdChfdmlkZW8pO1xuXG5mdW5jdGlvbiBfaW50ZXJvcFJlcXVpcmVEZWZhdWx0KG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqIDogeyBkZWZhdWx0OiBvYmogfTsgfVxuXG5mdW5jdGlvbiBfY2xhc3NDYWxsQ2hlY2soaW5zdGFuY2UsIENvbnN0cnVjdG9yKSB7IGlmICghKGluc3RhbmNlIGluc3RhbmNlb2YgQ29uc3RydWN0b3IpKSB7IHRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY2FsbCBhIGNsYXNzIGFzIGEgZnVuY3Rpb25cIik7IH0gfVxuXG5mdW5jdGlvbiBfcG9zc2libGVDb25zdHJ1Y3RvclJldHVybihzZWxmLCBjYWxsKSB7IGlmICghc2VsZikgeyB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJ0aGlzIGhhc24ndCBiZWVuIGluaXRpYWxpc2VkIC0gc3VwZXIoKSBoYXNuJ3QgYmVlbiBjYWxsZWRcIik7IH0gcmV0dXJuIGNhbGwgJiYgKHR5cGVvZiBjYWxsID09PSBcIm9iamVjdFwiIHx8IHR5cGVvZiBjYWxsID09PSBcImZ1bmN0aW9uXCIpID8gY2FsbCA6IHNlbGY7IH1cblxuZnVuY3Rpb24gX2luaGVyaXRzKHN1YkNsYXNzLCBzdXBlckNsYXNzKSB7IGlmICh0eXBlb2Ygc3VwZXJDbGFzcyAhPT0gXCJmdW5jdGlvblwiICYmIHN1cGVyQ2xhc3MgIT09IG51bGwpIHsgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlN1cGVyIGV4cHJlc3Npb24gbXVzdCBlaXRoZXIgYmUgbnVsbCBvciBhIGZ1bmN0aW9uLCBub3QgXCIgKyB0eXBlb2Ygc3VwZXJDbGFzcyk7IH0gc3ViQ2xhc3MucHJvdG90eXBlID0gT2JqZWN0LmNyZWF0ZShzdXBlckNsYXNzICYmIHN1cGVyQ2xhc3MucHJvdG90eXBlLCB7IGNvbnN0cnVjdG9yOiB7IHZhbHVlOiBzdWJDbGFzcywgZW51bWVyYWJsZTogZmFsc2UsIHdyaXRhYmxlOiB0cnVlLCBjb25maWd1cmFibGU6IHRydWUgfSB9KTsgaWYgKHN1cGVyQ2xhc3MpIE9iamVjdC5zZXRQcm90b3R5cGVPZiA/IE9iamVjdC5zZXRQcm90b3R5cGVPZihzdWJDbGFzcywgc3VwZXJDbGFzcykgOiBzdWJDbGFzcy5fX3Byb3RvX18gPSBzdXBlckNsYXNzOyB9IC8qKlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICogQGZpbGUgdmlkZW9qcy5yZWNvcmQuanNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKiBUaGUgbWFpbiBmaWxlIGZvciB0aGUgdmlkZW9qcy1yZWNvcmQgcHJvamVjdC5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAqIE1JVCBsaWNlbnNlOiBodHRwczovL2dpdGh1Yi5jb20vY29sbGFiLXByb2plY3QvdmlkZW9qcy1yZWNvcmQvYmxvYi9tYXN0ZXIvTElDRU5TRVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICovXG5cbnZhciBQbHVnaW4gPSBfdmlkZW8yLmRlZmF1bHQuZ2V0UGx1Z2luKCdwbHVnaW4nKTtcbnZhciBQbGF5ZXIgPSBfdmlkZW8yLmRlZmF1bHQuZ2V0Q29tcG9uZW50KCdQbGF5ZXInKTtcblxudmFyIEFVVE8gPSAnYXV0byc7XG5cbi8vIG1vbmtleS1wYXRjaCBwbGF5ICgjMTUyKVxuUGxheWVyLnByb3RvdHlwZS5wbGF5ID0gZnVuY3Rpb24gcGxheSgpIHtcbiAgICB2YXIgcmV0dmFsID0gdGhpcy50ZWNoR2V0XygncGxheScpO1xuICAgIC8vIHNpbGVuY2UgZXJyb3JzICh1bmhhbmRsZWQgcHJvbWlzZSBmcm9tIHBsYXkpXG4gICAgaWYgKHJldHZhbCAhPT0gdW5kZWZpbmVkICYmIHR5cGVvZiByZXR2YWwudGhlbiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICByZXR2YWwudGhlbihudWxsLCBmdW5jdGlvbiAoZSkge30pO1xuICAgIH1cbiAgICByZXR1cm4gcmV0dmFsO1xufTtcblxuLyoqXG4gKiBSZWNvcmQgYXVkaW8vdmlkZW8vaW1hZ2VzIHVzaW5nIHRoZSBWaWRlby5qcyBwbGF5ZXIuXG4gKlxuICogQGNsYXNzXG4gKiBAYXVnbWVudHMgdmlkZW9qcy5QbHVnaW5cbiAqL1xuXG52YXIgUmVjb3JkID0gZnVuY3Rpb24gKF9QbHVnaW4pIHtcbiAgICBfaW5oZXJpdHMoUmVjb3JkLCBfUGx1Z2luKTtcblxuICAgIC8qKlxuICAgICAqIFRoZSBjb25zdHJ1Y3RvciBmdW5jdGlvbiBmb3IgdGhlIGNsYXNzLlxuICAgICAqXG4gICAgICogQHBhcmFtIHsodmlkZW9qcy5QbGF5ZXJ8T2JqZWN0KX0gcGxheWVyXG4gICAgICogQHBhcmFtIHtPYmplY3R9IG9wdGlvbnMgLSBQbGF5ZXIgb3B0aW9ucy5cbiAgICAgKi9cbiAgICBmdW5jdGlvbiBSZWNvcmQocGxheWVyLCBvcHRpb25zKSB7XG4gICAgICAgIF9jbGFzc0NhbGxDaGVjayh0aGlzLCBSZWNvcmQpO1xuXG4gICAgICAgIC8vIHNldHVwIHBsdWdpbiBvcHRpb25zXG4gICAgICAgIHZhciBfdGhpcyA9IF9wb3NzaWJsZUNvbnN0cnVjdG9yUmV0dXJuKHRoaXMsIChSZWNvcmQuX19wcm90b19fIHx8IE9iamVjdC5nZXRQcm90b3R5cGVPZihSZWNvcmQpKS5jYWxsKHRoaXMsIHBsYXllciwgb3B0aW9ucykpO1xuXG4gICAgICAgIF90aGlzLmxvYWRPcHRpb25zKCk7XG5cbiAgICAgICAgLy8gKHJlKXNldCByZWNvcmRlciBzdGF0ZVxuICAgICAgICBfdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICAgICAgLy8gYWRkIGRldmljZSBidXR0b24gd2l0aCBpY29uIGJhc2VkIG9uIHR5cGVcbiAgICAgICAgdmFyIGRldmljZUljb24gPSAnYXYtcGVybSc7XG4gICAgICAgIHN3aXRjaCAoX3RoaXMuZ2V0UmVjb3JkVHlwZSgpKSB7XG4gICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLklNQUdFX09OTFk6XG4gICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLlZJREVPX09OTFk6XG4gICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFOSU1BVElPTjpcbiAgICAgICAgICAgICAgICBkZXZpY2VJY29uID0gJ3ZpZGVvLXBlcm0nO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19PTkxZOlxuICAgICAgICAgICAgICAgIGRldmljZUljb24gPSAnYXVkaW8tcGVybSc7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgX2RldmljZUJ1dHRvbjIuZGVmYXVsdC5wcm90b3R5cGUuYnVpbGRDU1NDbGFzcyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIHVzZSBkeW5hbWljIGljb24gY2xhc3NcbiAgICAgICAgICAgIHJldHVybiAndmpzLWRldmljZS1idXR0b24gdmpzLWNvbnRyb2wgdmpzLWljb24tJyArIGRldmljZUljb247XG4gICAgICAgIH07XG4gICAgICAgIHBsYXllci5kZXZpY2VCdXR0b24gPSBuZXcgX2RldmljZUJ1dHRvbjIuZGVmYXVsdChwbGF5ZXIsIG9wdGlvbnMpO1xuICAgICAgICBwbGF5ZXIuYWRkQ2hpbGQocGxheWVyLmRldmljZUJ1dHRvbik7XG5cbiAgICAgICAgLy8gYWRkIGJsaW5raW5nIHJlY29yZCBpbmRpY2F0b3JcbiAgICAgICAgcGxheWVyLnJlY29yZEluZGljYXRvciA9IG5ldyBfcmVjb3JkSW5kaWNhdG9yMi5kZWZhdWx0KHBsYXllciwgb3B0aW9ucyk7XG4gICAgICAgIHBsYXllci5yZWNvcmRJbmRpY2F0b3IuaGlkZSgpO1xuICAgICAgICBwbGF5ZXIuYWRkQ2hpbGQocGxheWVyLnJlY29yZEluZGljYXRvcik7XG5cbiAgICAgICAgLy8gYWRkIGNhbnZhcyBmb3IgcmVjb3JkaW5nIGFuZCBkaXNwbGF5aW5nIGltYWdlXG4gICAgICAgIHBsYXllci5yZWNvcmRDYW52YXMgPSBuZXcgX3JlY29yZENhbnZhczIuZGVmYXVsdChwbGF5ZXIsIG9wdGlvbnMpO1xuICAgICAgICBwbGF5ZXIucmVjb3JkQ2FudmFzLmhpZGUoKTtcbiAgICAgICAgcGxheWVyLmFkZENoaWxkKHBsYXllci5yZWNvcmRDYW52YXMpO1xuXG4gICAgICAgIC8vIGFkZCBpbWFnZSBmb3IgYW5pbWF0aW9uIGRpc3BsYXlcbiAgICAgICAgcGxheWVyLmFuaW1hdGlvbkRpc3BsYXkgPSBuZXcgX2FuaW1hdGlvbkRpc3BsYXkyLmRlZmF1bHQocGxheWVyLCBvcHRpb25zKTtcbiAgICAgICAgcGxheWVyLmFuaW1hdGlvbkRpc3BsYXkuaGlkZSgpO1xuICAgICAgICBwbGF5ZXIuYWRkQ2hpbGQocGxheWVyLmFuaW1hdGlvbkRpc3BsYXkpO1xuXG4gICAgICAgIC8vIGFkZCBjYW1lcmEgYnV0dG9uXG4gICAgICAgIHBsYXllci5jYW1lcmFCdXR0b24gPSBuZXcgX2NhbWVyYUJ1dHRvbjIuZGVmYXVsdChwbGF5ZXIsIG9wdGlvbnMpO1xuICAgICAgICBwbGF5ZXIuY2FtZXJhQnV0dG9uLmhpZGUoKTtcblxuICAgICAgICAvLyBhZGQgcmVjb3JkIHRvZ2dsZVxuICAgICAgICBwbGF5ZXIucmVjb3JkVG9nZ2xlID0gbmV3IF9yZWNvcmRUb2dnbGUyLmRlZmF1bHQocGxheWVyLCBvcHRpb25zKTtcbiAgICAgICAgcGxheWVyLnJlY29yZFRvZ2dsZS5oaWRlKCk7XG5cbiAgICAgICAgLy8gd2FpdCB1bnRpbCBwbGF5ZXIgdWkgaXMgcmVhZHlcbiAgICAgICAgX3RoaXMucGxheWVyLm9uZSgncmVhZHknLCBfdGhpcy5zZXR1cFVJLmJpbmQoX3RoaXMpKTtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIFNldHVwIHBsdWdpbiBvcHRpb25zLlxuICAgICAqL1xuXG5cbiAgICBfY3JlYXRlQ2xhc3MoUmVjb3JkLCBbe1xuICAgICAgICBrZXk6ICdsb2FkT3B0aW9ucycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBsb2FkT3B0aW9ucygpIHtcbiAgICAgICAgICAgIHZhciByZWNvcmRPcHRpb25zID0gX3ZpZGVvMi5kZWZhdWx0Lm1lcmdlT3B0aW9ucyhfZGVmYXVsdHMyLmRlZmF1bHQsIHRoaXMucGxheWVyLm9wdGlvbnNfLnBsdWdpbnMucmVjb3JkKTtcblxuICAgICAgICAgICAgLy8gcmVjb3JkIHNldHRpbmdzXG4gICAgICAgICAgICB0aGlzLnJlY29yZEltYWdlID0gcmVjb3JkT3B0aW9ucy5pbWFnZTtcbiAgICAgICAgICAgIHRoaXMucmVjb3JkQXVkaW8gPSByZWNvcmRPcHRpb25zLmF1ZGlvO1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRWaWRlbyA9IHJlY29yZE9wdGlvbnMudmlkZW87XG4gICAgICAgICAgICB0aGlzLnJlY29yZEFuaW1hdGlvbiA9IHJlY29yZE9wdGlvbnMuYW5pbWF0aW9uO1xuICAgICAgICAgICAgdGhpcy5tYXhMZW5ndGggPSByZWNvcmRPcHRpb25zLm1heExlbmd0aDtcbiAgICAgICAgICAgIHRoaXMuZGVidWcgPSByZWNvcmRPcHRpb25zLmRlYnVnO1xuICAgICAgICAgICAgdGhpcy5yZWNvcmRUaW1lU2xpY2UgPSByZWNvcmRPcHRpb25zLnRpbWVTbGljZTtcblxuICAgICAgICAgICAgLy8gdmlkZW8vY2FudmFzIHNldHRpbmdzXG4gICAgICAgICAgICB0aGlzLnZpZGVvRnJhbWVXaWR0aCA9IHJlY29yZE9wdGlvbnMuZnJhbWVXaWR0aDtcbiAgICAgICAgICAgIHRoaXMudmlkZW9GcmFtZUhlaWdodCA9IHJlY29yZE9wdGlvbnMuZnJhbWVIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLnZpZGVvUmVjb3JkZXJUeXBlID0gcmVjb3JkT3B0aW9ucy52aWRlb1JlY29yZGVyVHlwZTtcbiAgICAgICAgICAgIHRoaXMudmlkZW9NaW1lVHlwZSA9IHJlY29yZE9wdGlvbnMudmlkZW9NaW1lVHlwZTtcblxuICAgICAgICAgICAgLy8gYXVkaW8gc2V0dGluZ3NcbiAgICAgICAgICAgIHRoaXMuYXVkaW9FbmdpbmUgPSByZWNvcmRPcHRpb25zLmF1ZGlvRW5naW5lO1xuICAgICAgICAgICAgdGhpcy5hdWRpb1JlY29yZGVyVHlwZSA9IHJlY29yZE9wdGlvbnMuYXVkaW9SZWNvcmRlclR5cGU7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvV29ya2VyVVJMID0gcmVjb3JkT3B0aW9ucy5hdWRpb1dvcmtlclVSTDtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9CdWZmZXJTaXplID0gcmVjb3JkT3B0aW9ucy5hdWRpb0J1ZmZlclNpemU7XG4gICAgICAgICAgICB0aGlzLmF1ZGlvU2FtcGxlUmF0ZSA9IHJlY29yZE9wdGlvbnMuYXVkaW9TYW1wbGVSYXRlO1xuICAgICAgICAgICAgdGhpcy5hdWRpb0JpdFJhdGUgPSByZWNvcmRPcHRpb25zLmF1ZGlvQml0UmF0ZTtcbiAgICAgICAgICAgIHRoaXMuYXVkaW9DaGFubmVscyA9IHJlY29yZE9wdGlvbnMuYXVkaW9DaGFubmVscztcbiAgICAgICAgICAgIHRoaXMuYXVkaW9NaW1lVHlwZSA9IHJlY29yZE9wdGlvbnMuYXVkaW9NaW1lVHlwZTtcblxuICAgICAgICAgICAgLy8gYW5pbWF0aW9uIHNldHRpbmdzXG4gICAgICAgICAgICB0aGlzLmFuaW1hdGlvbkZyYW1lUmF0ZSA9IHJlY29yZE9wdGlvbnMuYW5pbWF0aW9uRnJhbWVSYXRlO1xuICAgICAgICAgICAgdGhpcy5hbmltYXRpb25RdWFsaXR5ID0gcmVjb3JkT3B0aW9ucy5hbmltYXRpb25RdWFsaXR5O1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBsYXllciBVSSBpcyByZWFkeS5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldHVwVUknLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0dXBVSSgpIHtcbiAgICAgICAgICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG4gICAgICAgICAgICAvLyBpbnNlcnQgY3VzdG9tIGNvbnRyb2xzIG9uIGxlZnQtc2lkZSBvZiBjb250cm9sYmFyXG4gICAgICAgICAgICB0aGlzLnBsYXllci5jb250cm9sQmFyLmFkZENoaWxkKHRoaXMucGxheWVyLmNhbWVyYUJ1dHRvbik7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5jb250cm9sQmFyLmVsKCkuaW5zZXJ0QmVmb3JlKHRoaXMucGxheWVyLmNhbWVyYUJ1dHRvbi5lbCgpLCB0aGlzLnBsYXllci5jb250cm9sQmFyLmVsKCkuZmlyc3RDaGlsZCk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5jb250cm9sQmFyLmVsKCkuaW5zZXJ0QmVmb3JlKHRoaXMucGxheWVyLnJlY29yZFRvZ2dsZS5lbCgpLCB0aGlzLnBsYXllci5jb250cm9sQmFyLmVsKCkuZmlyc3RDaGlsZCk7XG5cbiAgICAgICAgICAgIC8vIGdldCByaWQgb2YgdW51c2VkIGNvbnRyb2xzXG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuY29udHJvbEJhci5yZW1haW5pbmdUaW1lRGlzcGxheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY29udHJvbEJhci5yZW1haW5pbmdUaW1lRGlzcGxheS5lbCgpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuY29udHJvbEJhci5saXZlRGlzcGxheSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY29udHJvbEJhci5saXZlRGlzcGxheS5lbCgpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGxvb3AgZmVhdHVyZSBpcyBuZXZlciB1c2VkIGluIHRoaXMgcGx1Z2luXG4gICAgICAgICAgICB0aGlzLnBsYXllci5sb29wKGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gdHdlYWsgcGxheWVyIFVJIGJhc2VkIG9uIHR5cGVcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXRSZWNvcmRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX09OTFk6XG4gICAgICAgICAgICAgICAgICAgIC8vIHJlZmVyZW5jZSB0byB2aWRlb2pzLXdhdmVzdXJmZXIgcGx1Z2luXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyID0gdGhpcy5wbGF5ZXIud2F2ZXN1cmZlcigpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuSU1BR0VfT05MWTpcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLlZJREVPX09OTFk6XG4gICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19WSURFTzpcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFOSU1BVElPTjpcbiAgICAgICAgICAgICAgICAgICAgLy8gY3VzdG9taXplIGNvbnRyb2xzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmJpZ1BsYXlCdXR0b24uaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGxvYWRlZG1ldGFkYXRhIHJlc2V0cyB0aGUgZHVyYXRpb25EaXNwbGF5IGZvciB0aGVcbiAgICAgICAgICAgICAgICAgICAgLy8gZmlyc3QgdGltZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5vbmUoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlzcGxheSBtYXggcmVjb3JkIHRpbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMi5zZXREdXJhdGlvbihfdGhpczIubWF4TGVuZ3RoKTtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlIG5hdGl2ZSBjb250cm9scyBkb24ndCB3b3JrIGZvciB0aGlzIFVJIHNvIGRpc2FibGVcbiAgICAgICAgICAgICAgICAgICAgLy8gdGhlbSBubyBtYXR0ZXIgd2hhdFxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIudXNpbmdOYXRpdmVDb250cm9sc18gPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci50ZWNoXy5lbF8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnRlY2hfLmVsXy5jb250cm9scyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gY2xpY2tpbmcgb3IgdGFwcGluZyB0aGUgcGxheWVyIHZpZGVvIGVsZW1lbnQgc2hvdWxkIG5vdCB0cnlcbiAgICAgICAgICAgICAgICAgICAgLy8gdG8gc3RhcnQgcGxheWJhY2tcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVtb3ZlVGVjaENvbnRyb2xzTGlzdGVuZXJzXygpO1xuXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5vcHRpb25zXy5jb250cm9scykge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcHJvZ3Jlc3MgY29udHJvbCBpc24ndCB1c2VkIGJ5IHRoaXMgcGx1Z2luXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5jb250cm9sQmFyLnByb2dyZXNzQ29udHJvbC5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXZlbnQgY29udHJvbGJhciBmYWRlb3V0XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5vbigndXNlcmluYWN0aXZlJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMyLnBsYXllci51c2VyQWN0aXZlKHRydWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHZpZGVvanMgYXV0b21hdGljYWxseSBoaWRlcyB0aGUgY29udHJvbHMgd2hlbiBubyB2YWxpZCAnc291cmNlJ1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZWxlbWVudCBpcyBpbmNsdWRlZCBpbiB0aGUgdmlkZW8gb3IgYXVkaW8gdGFnLiBEb24ndC4gRXZlciBhZ2Fpbi5cbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmNvbnRyb2xCYXIuc2hvdygpO1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY29udHJvbEJhci5lbCgpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIGRpc2FibGUgdGltZSBkaXNwbGF5IGV2ZW50cyB0aGF0IGNvbnN0YW50bHkgdHJ5IHRvIHJlc2V0IHRoZSBjdXJyZW50IHRpbWVcbiAgICAgICAgICAgIC8vIGFuZCBkdXJhdGlvbiB2YWx1ZXNcbiAgICAgICAgICAgIHRoaXMucGxheWVyLm9mZigndGltZXVwZGF0ZScpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIub2ZmKCdkdXJhdGlvbmNoYW5nZScpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIub2ZmKCdsb2FkZWRtZXRhZGF0YScpO1xuXG4gICAgICAgICAgICAvLyBkaXNwbGF5IG1heCByZWNvcmQgdGltZVxuICAgICAgICAgICAgdGhpcy5zZXREdXJhdGlvbih0aGlzLm1heExlbmd0aCk7XG5cbiAgICAgICAgICAgIC8vIGhpZGUgcGxheSBjb250cm9sXG4gICAgICAgICAgICB0aGlzLnBsYXllci5jb250cm9sQmFyLnBsYXlUb2dnbGUuaGlkZSgpO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEluZGljYXRlcyB3aGV0aGVyIHRoZSBwbHVnaW4gaXMgY3VycmVudGx5IHJlY29yZGluZyBvciBub3QuXG4gICAgICAgICAqXG4gICAgICAgICAqIEByZXR1cm4ge2Jvb2xlYW59IFBsdWdpbiBjdXJyZW50bHkgcmVjb3JkaW5nIG9yIG5vdC5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2lzUmVjb3JkaW5nJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlzUmVjb3JkaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlY29yZGluZztcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbmRpY2F0ZXMgd2hldGhlciB0aGUgcGx1Z2luIGlzIGN1cnJlbnRseSBwcm9jZXNzaW5nIHJlY29yZGVkIGRhdGFcbiAgICAgICAgICogb3Igbm90LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufSBQbHVnaW4gcHJvY2Vzc2luZyBvciBub3QuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdpc1Byb2Nlc3NpbmcnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gaXNQcm9jZXNzaW5nKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3Byb2Nlc3Npbmc7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW5kaWNhdGVzIHdoZXRoZXIgdGhlIHBsdWdpbiBpcyBkZXN0cm95ZWQgb3Igbm90LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcmV0dXJuIHtib29sZWFufSBQbHVnaW4gZGVzdHJveWVkIG9yIG5vdC5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2lzRGVzdHJveWVkJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGlzRGVzdHJveWVkKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucGxheWVyICYmIHRoaXMucGxheWVyLmNoaWxkcmVuKCkgPT09IG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogT3BlbiB0aGUgYnJvd3NlcidzIHJlY29yZGluZyBkZXZpY2Ugc2VsZWN0aW9uIGRpYWxvZy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldERldmljZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBnZXREZXZpY2UoKSB7XG4gICAgICAgICAgICAvLyBkZWZpbmUgZGV2aWNlIGNhbGxiYWNrcyBvbmNlXG4gICAgICAgICAgICBpZiAodGhpcy5kZXZpY2VSZWFkeUNhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmRldmljZVJlYWR5Q2FsbGJhY2sgPSB0aGlzLm9uRGV2aWNlUmVhZHkuYmluZCh0aGlzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh0aGlzLmRldmljZUVycm9yQ2FsbGJhY2sgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHRoaXMuZGV2aWNlRXJyb3JDYWxsYmFjayA9IHRoaXMub25EZXZpY2VFcnJvci5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHRoaXMuZW5naW5lU3RvcENhbGxiYWNrID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZVN0b3BDYWxsYmFjayA9IHRoaXMub25SZWNvcmRDb21wbGV0ZS5iaW5kKHRoaXMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gYXNrIHRoZSBicm93c2VyIHRvIGdpdmUgdGhlIHVzZXIgYWNjZXNzIHRvIHRoZSBtZWRpYSBkZXZpY2VcbiAgICAgICAgICAgIC8vIGFuZCBnZXQgYSBzdHJlYW0gcmVmZXJlbmNlIGluIHRoZSBjYWxsYmFjayBmdW5jdGlvblxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldFJlY29yZFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQVVESU9fT05MWTpcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgbWljcm9waG9uZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLm1lZGlhVHlwZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvOiB0aGlzLmF1ZGlvUmVjb3JkZXJUeXBlID09PSBBVVRPID8gdHJ1ZSA6IHRoaXMuYXVkaW9SZWNvcmRlclR5cGUsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogZmFsc2VcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgLy8gcmVtb3ZlIGV4aXN0aW5nIG1pY3JvcGhvbmUgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnN1cmZlci5taWNyb3Bob25lLnVuKCdkZXZpY2VSZWFkeScsIHRoaXMuZGV2aWNlUmVhZHlDYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnN1cmZlci5taWNyb3Bob25lLnVuKCdkZXZpY2VFcnJvcicsIHRoaXMuZGV2aWNlRXJyb3JDYWxsYmFjayk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgbmV3IG1pY3JvcGhvbmUgbGlzdGVuZXJzXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnN1cmZlci5taWNyb3Bob25lLm9uKCdkZXZpY2VSZWFkeScsIHRoaXMuZGV2aWNlUmVhZHlDYWxsYmFjayk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnN1cmZlci5taWNyb3Bob25lLm9uKCdkZXZpY2VFcnJvcicsIHRoaXMuZGV2aWNlRXJyb3JDYWxsYmFjayk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBleGlzdGluZyBwbGF5YmFjayBldmVudHNcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXJmZXIuc2V0dXBQbGF5YmFja0V2ZW50cyhmYWxzZSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gKHJlKXNldCBzdXJmZXIgbGl2ZU1vZGVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXJmZXIubGl2ZU1vZGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cmZlci5zdXJmZXIubWljcm9waG9uZS5wYXVzZWQgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBvcGVuIGJyb3dzZXIgZGV2aWNlIHNlbGVjdGlvbiBkaWFsb2dcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXJmZXIuc3VyZmVyLm1pY3JvcGhvbmUuc3RhcnQoKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLklNQUdFX09OTFk6XG4gICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5WSURFT19PTkxZOlxuICAgICAgICAgICAgICAgICAgICAvLyBzZXR1cCBjYW1lcmFcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYVR5cGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogdGhpcy52aWRlb1JlY29yZGVyVHlwZSA9PT0gQVVUTyA/IHRydWUgOiB0aGlzLnZpZGVvUmVjb3JkZXJUeXBlXG4gICAgICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvOiB0aGlzLmdldFJlY29yZFR5cGUoKSA9PT0gX3JlY29yZE1vZGUuSU1BR0VfT05MWSA/IHRoaXMucmVjb3JkSW1hZ2UgOiB0aGlzLnJlY29yZFZpZGVvXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4odGhpcy5vbkRldmljZVJlYWR5LmJpbmQodGhpcykpLmNhdGNoKHRoaXMub25EZXZpY2VFcnJvci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX1ZJREVPOlxuICAgICAgICAgICAgICAgICAgICAvLyBzZXR1cCBjYW1lcmEgYW5kIG1pY3JvcGhvbmVcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYVR5cGUgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogdGhpcy5hdWRpb1JlY29yZGVyVHlwZSA9PT0gQVVUTyA/IHRydWUgOiB0aGlzLmF1ZGlvUmVjb3JkZXJUeXBlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW86IHRoaXMudmlkZW9SZWNvcmRlclR5cGUgPT09IEFVVE8gPyB0cnVlIDogdGhpcy52aWRlb1JlY29yZGVyVHlwZVxuICAgICAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSh7XG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogdGhpcy5yZWNvcmRBdWRpbyxcbiAgICAgICAgICAgICAgICAgICAgICAgIHZpZGVvOiB0aGlzLnJlY29yZFZpZGVvXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4odGhpcy5vbkRldmljZVJlYWR5LmJpbmQodGhpcykpLmNhdGNoKHRoaXMub25EZXZpY2VFcnJvci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFOSU1BVElPTjpcbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgY2FtZXJhXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWVkaWFUeXBlID0ge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gYW5pbWF0ZWQgR0lGXG4gICAgICAgICAgICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICB2aWRlbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICAgICBnaWY6IHRydWVcbiAgICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXVkaW86IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgICAgdmlkZW86IHRoaXMucmVjb3JkQW5pbWF0aW9uXG4gICAgICAgICAgICAgICAgICAgIH0pLnRoZW4odGhpcy5vbkRldmljZVJlYWR5LmJpbmQodGhpcykpLmNhdGNoKHRoaXMub25EZXZpY2VFcnJvci5iaW5kKHRoaXMpKTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2tlZCB3aGVuIHRoZSBkZXZpY2UgaXMgcmVhZHkuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSBzdHJlYW06IExvY2FsTWVkaWFTdHJlYW0gaW5zdGFuY2UuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvbkRldmljZVJlYWR5JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIG9uRGV2aWNlUmVhZHkoc3RyZWFtKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXMzID0gdGhpcztcblxuICAgICAgICAgICAgdGhpcy5fZGV2aWNlQWN0aXZlID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gc3RvcmUgcmVmZXJlbmNlIHRvIHN0cmVhbSBmb3Igc3RvcHBpbmcgZXRjLlxuICAgICAgICAgICAgdGhpcy5zdHJlYW0gPSBzdHJlYW07XG5cbiAgICAgICAgICAgIC8vIGhpZGUgZGV2aWNlIHNlbGVjdGlvbiBidXR0b25cbiAgICAgICAgICAgIHRoaXMucGxheWVyLmRldmljZUJ1dHRvbi5oaWRlKCk7XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHRpbWUgKGUuZy4gd2hlbiBzdG9wRGV2aWNlIHdhcyB1c2VkKVxuICAgICAgICAgICAgdGhpcy5zZXREdXJhdGlvbih0aGlzLm1heExlbmd0aCk7XG4gICAgICAgICAgICB0aGlzLnNldEN1cnJlbnRUaW1lKDApO1xuXG4gICAgICAgICAgICAvLyBoaWRlIHBsYXkvcGF1c2UgY29udHJvbCAoZS5nLiB3aGVuIHN0b3BEZXZpY2Ugd2FzIHVzZWQpXG4gICAgICAgICAgICB0aGlzLnBsYXllci5jb250cm9sQmFyLnBsYXlUb2dnbGUuaGlkZSgpO1xuXG4gICAgICAgICAgICAvLyByZXNldCBwbGF5YmFjayBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHRoaXMub2ZmKHRoaXMucGxheWVyLCAndGltZXVwZGF0ZScsIHRoaXMucGxheWJhY2tUaW1lVXBkYXRlKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKHRoaXMucGxheWVyLCAnZW5kZWQnLCB0aGlzLnBsYXliYWNrVGltZVVwZGF0ZSk7XG5cbiAgICAgICAgICAgIC8vIHNldHVwIHJlY29yZGluZyBlbmdpbmVcbiAgICAgICAgICAgIGlmICh0aGlzLmdldFJlY29yZFR5cGUoKSAhPT0gX3JlY29yZE1vZGUuSU1BR0VfT05MWSkge1xuICAgICAgICAgICAgICAgIC8vIGN1cnJlbnRseSBsaWJ2b3JiaXMuanMsIHJlY29yZGVyLmpzLCBvcHVzLXJlY29yZGVyIGFuZCBsYW1lanNcbiAgICAgICAgICAgICAgICAvLyBhcmUgb25seSBzdXBwb3J0ZWQgaW4gYXVkaW8tb25seSBtb2RlXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVjb3JkVHlwZSgpICE9PSBfcmVjb3JkTW9kZS5BVURJT19PTkxZICYmICh0aGlzLmF1ZGlvRW5naW5lID09PSBfcmVjb3JkRW5naW5lLkxJQlZPUkJJU0pTIHx8IHRoaXMuYXVkaW9FbmdpbmUgPT09IF9yZWNvcmRFbmdpbmUuUkVDT1JERVJKUyB8fCB0aGlzLmF1ZGlvRW5naW5lID09PSBfcmVjb3JkRW5naW5lLkxBTUVKUyB8fCB0aGlzLmF1ZGlvRW5naW5lID09PSBfcmVjb3JkRW5naW5lLk9QVVNSRUNPUkRFUikpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdDdXJyZW50bHkgJyArIHRoaXMuYXVkaW9FbmdpbmUgKyAnIGlzIG9ubHkgc3VwcG9ydGVkIGluIGF1ZGlvLW9ubHkgbW9kZS4nKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBnZXQgcmVjb3JkZXIgY2xhc3NcbiAgICAgICAgICAgICAgICB2YXIgRW5naW5lQ2xhc3M7XG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmF1ZGlvRW5naW5lKSB7XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZEVuZ2luZS5SRUNPUkRSVEM6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWNvcmRSVEMuanMgKGRlZmF1bHQpXG4gICAgICAgICAgICAgICAgICAgICAgICBFbmdpbmVDbGFzcyA9IF92aWRlbzIuZGVmYXVsdC5SZWNvcmRSVENFbmdpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRFbmdpbmUuTElCVk9SQklTSlM6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBsaWJ2b3JiaXMuanNcbiAgICAgICAgICAgICAgICAgICAgICAgIEVuZ2luZUNsYXNzID0gX3ZpZGVvMi5kZWZhdWx0LkxpYlZvcmJpc0VuZ2luZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZEVuZ2luZS5SRUNPUkRFUkpTOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gcmVjb3JkZXIuanNcbiAgICAgICAgICAgICAgICAgICAgICAgIEVuZ2luZUNsYXNzID0gX3ZpZGVvMi5kZWZhdWx0LlJlY29yZGVyanNFbmdpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRFbmdpbmUuTEFNRUpTOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbGFtZWpzXG4gICAgICAgICAgICAgICAgICAgICAgICBFbmdpbmVDbGFzcyA9IF92aWRlbzIuZGVmYXVsdC5MYW1lanNFbmdpbmU7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRFbmdpbmUuT1BVU1JFQ09SREVSOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gb3B1cy1yZWNvcmRlclxuICAgICAgICAgICAgICAgICAgICAgICAgRW5naW5lQ2xhc3MgPSBfdmlkZW8yLmRlZmF1bHQuT3B1c1JlY29yZGVyRW5naW5lO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVua25vd24gZW5naW5lXG4gICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vua25vd24gYXVkaW9FbmdpbmU6ICcgKyB0aGlzLmF1ZGlvRW5naW5lKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29ubmVjdCBzdHJlYW0gdG8gcmVjb3JkaW5nIGVuZ2luZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZSA9IG5ldyBFbmdpbmVDbGFzcyh0aGlzLnBsYXllciwgdGhpcy5wbGF5ZXIub3B0aW9uc18pO1xuICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGVycik7XG4gICAgICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGxvYWQgJyArIHRoaXMuYXVkaW9FbmdpbmUgKyAnIHBsdWdpbicpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIGxpc3RlbiBmb3IgZXZlbnRzXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUub24oJ3JlY29yZENvbXBsZXRlJywgdGhpcy5lbmdpbmVTdG9wQ2FsbGJhY2spO1xuXG4gICAgICAgICAgICAgICAgLy8gYXVkaW8gc2V0dGluZ3NcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5idWZmZXJTaXplID0gdGhpcy5hdWRpb0J1ZmZlclNpemU7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuc2FtcGxlUmF0ZSA9IHRoaXMuYXVkaW9TYW1wbGVSYXRlO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLmJpdFJhdGUgPSB0aGlzLmF1ZGlvQml0UmF0ZTtcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5hdWRpb0NoYW5uZWxzID0gdGhpcy5hdWRpb0NoYW5uZWxzO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLmF1ZGlvV29ya2VyVVJMID0gdGhpcy5hdWRpb1dvcmtlclVSTDtcblxuICAgICAgICAgICAgICAgIC8vIG1pbWUgdHlwZVxuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLm1pbWVUeXBlID0ge1xuICAgICAgICAgICAgICAgICAgICB2aWRlbzogdGhpcy52aWRlb01pbWVUeXBlLFxuICAgICAgICAgICAgICAgICAgICBnaWY6ICdpbWFnZS9naWYnXG4gICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hdWRpb01pbWVUeXBlICE9PSBudWxsICYmIHRoaXMuYXVkaW9NaW1lVHlwZSAhPT0gQVVUTykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5taW1lVHlwZS5hdWRpbyA9IHRoaXMuYXVkaW9NaW1lVHlwZTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyB2aWRlby9jYW52YXMgc2V0dGluZ3NcbiAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS52aWRlbyA9IHtcbiAgICAgICAgICAgICAgICAgICAgd2lkdGg6IHRoaXMudmlkZW9GcmFtZVdpZHRoLFxuICAgICAgICAgICAgICAgICAgICBoZWlnaHQ6IHRoaXMudmlkZW9GcmFtZUhlaWdodFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuY2FudmFzID0ge1xuICAgICAgICAgICAgICAgICAgICB3aWR0aDogdGhpcy52aWRlb0ZyYW1lV2lkdGgsXG4gICAgICAgICAgICAgICAgICAgIGhlaWdodDogdGhpcy52aWRlb0ZyYW1lSGVpZ2h0XG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgIC8vIGFuaW1hdGVkIEdJRiBzZXR0aW5nc1xuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLnF1YWxpdHkgPSB0aGlzLmFuaW1hdGlvblF1YWxpdHk7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuZnJhbWVSYXRlID0gdGhpcy5hbmltYXRpb25GcmFtZVJhdGU7XG5cbiAgICAgICAgICAgICAgICAvLyB0aW1lU2xpY2VcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5yZWNvcmRUaW1lU2xpY2UgJiYgdGhpcy5yZWNvcmRUaW1lU2xpY2UgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLnRpbWVTbGljZSA9IHRoaXMucmVjb3JkVGltZVNsaWNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZ2luZS5vblRpbWVTdGFtcCA9IHRoaXMub25UaW1lU3RhbXAuYmluZCh0aGlzKTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAvLyBpbml0aWFsaXplIHJlY29yZGVyXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuc2V0dXAodGhpcy5zdHJlYW0sIHRoaXMubWVkaWFUeXBlLCB0aGlzLmRlYnVnKTtcblxuICAgICAgICAgICAgICAgIC8vIHNob3cgZWxlbWVudHMgdGhhdCBzaG91bGQgbmV2ZXIgYmUgaGlkZGVuIGluIGFuaW1hdGlvbixcbiAgICAgICAgICAgICAgICAvLyBhdWRpbyBhbmQvb3IgdmlkZW8gbW9kdXNcbiAgICAgICAgICAgICAgICB2YXIgdWlFbGVtZW50cyA9IFt0aGlzLnBsYXllci5jb250cm9sQmFyLmN1cnJlbnRUaW1lRGlzcGxheSwgdGhpcy5wbGF5ZXIuY29udHJvbEJhci50aW1lRGl2aWRlciwgdGhpcy5wbGF5ZXIuY29udHJvbEJhci5kdXJhdGlvbkRpc3BsYXldO1xuICAgICAgICAgICAgICAgIHVpRWxlbWVudHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZWxlbWVudCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmVsKCkuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG4gICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNob3coKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gc2hvdyByZWNvcmQgYnV0dG9uXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVjb3JkVG9nZ2xlLnNob3coKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gZGlzYWJsZSByZWNvcmQgaW5kaWNhdG9yXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVjb3JkSW5kaWNhdG9yLmRpc2FibGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHNldHVwIFVJIGZvciByZXRyeWluZyBzbmFwc2hvdCAoZS5nLiB3aGVuIHN0b3BEZXZpY2Ugd2FzXG4gICAgICAgICAgICAgICAgLy8gdXNlZClcbiAgICAgICAgICAgICAgICB0aGlzLnJldHJ5U25hcHNob3QoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IGFuZCBzaG93IGNhbWVyYSBidXR0b25cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5jYW1lcmFCdXR0b24ub25TdG9wKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY2FtZXJhQnV0dG9uLnNob3coKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gc2V0dXAgcHJldmlld1xuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVjb3JkVHlwZSgpICE9PSBfcmVjb3JkTW9kZS5BVURJT19PTkxZKSB7XG4gICAgICAgICAgICAgICAgLy8gc2hvdyBsaXZlIHByZXZpZXdcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhRWxlbWVudCA9IHRoaXMucGxheWVyLmVsKCkuZmlyc3RDaGlsZDtcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhRWxlbWVudC5jb250cm9scyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgLy8gbXV0ZSBpbmNvbWluZyBhdWRpbyBmb3IgZmVlZGJhY2sgbG9vcHNcbiAgICAgICAgICAgICAgICB0aGlzLm1lZGlhRWxlbWVudC5tdXRlZCA9IHRydWU7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHRoZSB2b2x1bWUgYmFyIHdoaWxlIGl0J3MgbXV0ZWRcbiAgICAgICAgICAgICAgICB0aGlzLmRpc3BsYXlWb2x1bWVDb250cm9sKGZhbHNlKTtcblxuICAgICAgICAgICAgICAgIC8vIGxvYWQgc3RyZWFtXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkKHRoaXMuc3RyZWFtKTtcblxuICAgICAgICAgICAgICAgIC8vIHN0cmVhbSBsb2FkaW5nIGlzIGFzeW5jLCBzbyB3ZSB3YWl0IHVudGlsIGl0J3MgcmVhZHkgdG8gcGxheVxuICAgICAgICAgICAgICAgIC8vIHRoZSBzdHJlYW1cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5vbmUoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCBzdHJlYW1cbiAgICAgICAgICAgICAgICAgICAgX3RoaXMzLm1lZGlhRWxlbWVudC5wbGF5KCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gZm9yd2FyZCB0byBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAgICAgX3RoaXMzLnBsYXllci50cmlnZ2VyKCdkZXZpY2VSZWFkeScpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAvLyBmb3J3YXJkIHRvIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnRyaWdnZXIoJ2RldmljZVJlYWR5Jyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogSW52b2tlZCB3aGVuIGFuIGRldmljZSBlcnJvciBvY2N1cnJlZC5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ29uRGV2aWNlRXJyb3InLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25EZXZpY2VFcnJvcihjb2RlKSB7XG4gICAgICAgICAgICB0aGlzLl9kZXZpY2VBY3RpdmUgPSBmYWxzZTtcblxuICAgICAgICAgICAgLy8gc3RvcmUgY29kZVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZGV2aWNlRXJyb3JDb2RlID0gY29kZTtcblxuICAgICAgICAgICAgLy8gZm9yd2FyZCBlcnJvciB0byBwbGF5ZXJcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnRyaWdnZXIoJ2RldmljZUVycm9yJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcmVjb3JkaW5nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc3RhcnQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RhcnQoKSB7XG4gICAgICAgICAgICB2YXIgX3RoaXM0ID0gdGhpcztcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzUHJvY2Vzc2luZygpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fcmVjb3JkaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIC8vIGhpZGUgcGxheS9wYXVzZSBjb250cm9sXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY29udHJvbEJhci5wbGF5VG9nZ2xlLmhpZGUoKTtcblxuICAgICAgICAgICAgICAgIC8vIHJlc2V0IHBsYXliYWNrIGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIHRoaXMub2ZmKHRoaXMucGxheWVyLCAndGltZXVwZGF0ZScsIHRoaXMucGxheWJhY2tUaW1lVXBkYXRlKTtcbiAgICAgICAgICAgICAgICB0aGlzLm9mZih0aGlzLnBsYXllciwgJ2VuZGVkJywgdGhpcy5wbGF5YmFja1RpbWVVcGRhdGUpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgcHJldmlld1xuICAgICAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXRSZWNvcmRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19PTkxZOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gZGlzYWJsZSBwbGF5YmFjayBldmVudHNcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnNldHVwUGxheWJhY2tFdmVudHMoZmFsc2UpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydC9yZXN1bWUgbGl2ZSBhdWRpbyB2aXN1YWxpemF0aW9uXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cmZlci5zdXJmZXIubWljcm9waG9uZS5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLmxpdmVNb2RlID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnN1cmZlci5taWNyb3Bob25lLnBsYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuVklERU9fT05MWTpcbiAgICAgICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19WSURFTzpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHByZXZpZXcgdmlkZW8gc3RyZWFtIGluIHZpZGVvIGVsZW1lbnRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnRWaWRlb1ByZXZpZXcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQU5JTUFUSU9OOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGlkZSB0aGUgZmlyc3QgZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnJlY29yZENhbnZhcy5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGhpZGUgdGhlIGFuaW1hdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9uRGlzcGxheS5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHNob3cgcHJldmlldyB2aWRlb1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGZvciBhbmltYXRpb25zLCBjYXB0dXJlIHRoZSBmaXJzdCBmcmFtZVxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdGhhdCBjYW4gYmUgZGlzcGxheWVkIGFzIHNvb24gYXMgcmVjb3JkaW5nXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBpcyBjb21wbGV0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jYXB0dXJlRnJhbWUoKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBzdGFydCB2aWRlbyBwcmV2aWV3ICoqYWZ0ZXIqKiBjYXB0dXJpbmcgZmlyc3QgZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczQuc3RhcnRWaWRlb1ByZXZpZXcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gc3RhcnQgcmVjb3JkaW5nXG4gICAgICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldFJlY29yZFR5cGUoKSkge1xuICAgICAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLklNQUdFX09OTFk6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjcmVhdGUgc25hcHNob3RcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY3JlYXRlU25hcHNob3QoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbm90aWZ5IFVJXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci50cmlnZ2VyKCdzdGFydFJlY29yZCcpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5WSURFT19PTkxZOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX1ZJREVPOlxuICAgICAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFOSU1BVElPTjpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHdhaXQgZm9yIG1lZGlhIHN0cmVhbSBvbiB2aWRlbyBlbGVtZW50IHRvIGFjdHVhbGx5IGxvYWRcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm9uZSgnbG9hZGVkbWV0YWRhdGEnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc3RhcnQgYWN0dWFsbHkgcmVjb3JkaW5nIHByb2Nlc3NcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczQuc3RhcnRSZWNvcmRpbmcoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFsbCByZXNvdXJjZXMgaGF2ZSBhbHJlYWR5IGxvYWRlZCwgc28gd2UgY2FuIHN0YXJ0XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyByZWNvcmRpbmcgcmlnaHQgYXdheVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydFJlY29yZGluZygpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdGFydCByZWNvcmRpbmcuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdGFydFJlY29yZGluZycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydFJlY29yZGluZygpIHtcbiAgICAgICAgICAgIC8vIHJlZ2lzdGVyIHN0YXJ0aW5nIHBvaW50XG4gICAgICAgICAgICB0aGlzLnBhdXNlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5wYXVzZVRpbWUgPSB0aGlzLnBhdXNlZFRpbWUgPSAwO1xuICAgICAgICAgICAgdGhpcy5zdGFydFRpbWUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgY291bnRkb3duXG4gICAgICAgICAgICB0aGlzLmNvdW50RG93biA9IHRoaXMucGxheWVyLnNldEludGVydmFsKHRoaXMub25Db3VudERvd24uYmluZCh0aGlzKSwgMTAwKTtcblxuICAgICAgICAgICAgLy8gY2xlYW51cCBwcmV2aW91cyByZWNvcmRpbmdcbiAgICAgICAgICAgIGlmICh0aGlzLmVuZ2luZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBzdGFydCByZWNvcmRpbmcgc3RyZWFtXG4gICAgICAgICAgICB0aGlzLmVuZ2luZS5zdGFydCgpO1xuXG4gICAgICAgICAgICAvLyBub3RpZnkgVUlcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnRyaWdnZXIoJ3N0YXJ0UmVjb3JkJyk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcCByZWNvcmRpbmcuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdG9wJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHN0b3AoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNQcm9jZXNzaW5nKCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yZWNvcmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9wcm9jZXNzaW5nID0gdHJ1ZTtcblxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmdldFJlY29yZFR5cGUoKSAhPT0gX3JlY29yZE1vZGUuSU1BR0VfT05MWSkge1xuICAgICAgICAgICAgICAgICAgICAvLyBub3RpZnkgVUlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIudHJpZ2dlcignc3RvcFJlY29yZCcpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3AgY291bnRkb3duXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmNsZWFySW50ZXJ2YWwodGhpcy5jb3VudERvd24pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3AgcmVjb3JkaW5nIHN0cmVhbSAocmVzdWx0IHdpbGwgYmUgYXZhaWxhYmxlIGFzeW5jKVxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmdpbmUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLnN0b3AoKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnBsYXllci5yZWNvcmRlZERhdGEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBsaXN0ZW5lcnMgdGhhdCBpbWFnZSBkYXRhIGlzIChhbHJlYWR5KSBhdmFpbGFibGVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnRyaWdnZXIoJ2ZpbmlzaFJlY29yZCcpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFN0b3AgZGV2aWNlKHMpIGFuZCByZWNvcmRpbmcgaWYgYWN0aXZlLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc3RvcERldmljZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdG9wRGV2aWNlKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaXNSZWNvcmRpbmcoKSkge1xuICAgICAgICAgICAgICAgIC8vIHN0b3Agc3RyZWFtIG9uY2UgcmVjb3JkZWQgZGF0YSBpcyBhdmFpbGFibGUsXG4gICAgICAgICAgICAgICAgLy8gb3RoZXJ3aXNlIGl0J2xsIGJyZWFrIHJlY29yZGluZ1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm9uZSgnZmluaXNoUmVjb3JkJywgdGhpcy5zdG9wU3RyZWFtLmJpbmQodGhpcykpO1xuXG4gICAgICAgICAgICAgICAgLy8gc3RvcCByZWNvcmRpbmdcbiAgICAgICAgICAgICAgICB0aGlzLnN0b3AoKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgLy8gc3RvcCBzdHJlYW0gbm93LCBzaW5jZSB0aGVyZSdzIG5vIHJlY29yZGVkIGRhdGEgYXZhaWxhYmxlXG4gICAgICAgICAgICAgICAgdGhpcy5zdG9wU3RyZWFtKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RvcCBzdHJlYW0gYW5kIGRldmljZS5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3N0b3BTdHJlYW0nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc3RvcFN0cmVhbSgpIHtcbiAgICAgICAgICAgIC8vIHN0b3Agc3RyZWFtIGFuZCBkZXZpY2VcbiAgICAgICAgICAgIGlmICh0aGlzLnN0cmVhbSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2RldmljZUFjdGl2ZSA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVjb3JkVHlwZSgpID09PSBfcmVjb3JkTW9kZS5BVURJT19PTkxZKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIG1ha2UgdGhlIG1pY3JvcGhvbmUgcGx1Z2luIHN0b3AgaXQncyBkZXZpY2VcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXJmZXIuc3VyZmVyLm1pY3JvcGhvbmUuc3RvcERldmljZSgpO1xuICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHRoaXMuc3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2goZnVuY3Rpb24gKHN0cmVhbSkge1xuICAgICAgICAgICAgICAgICAgICBzdHJlYW0uc3RvcCgpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFBhdXNlIHJlY29yZGluZy5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3BhdXNlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHBhdXNlKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2VUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSB0cnVlO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUucGF1c2UoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZXN1bWUgcmVjb3JkaW5nLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmVzdW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc3VtZSgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgIHRoaXMucGF1c2VkVGltZSArPSBuZXcgRGF0ZSgpLmdldFRpbWUoKSAtIHRoaXMucGF1c2VUaW1lO1xuXG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUucmVzdW1lKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5wYXVzZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBJbnZva2VkIHdoZW4gcmVjb3JkaW5nIGNvbXBsZXRlZCBhbmQgdGhlIHJlc3VsdGluZyBzdHJlYW0gaXNcbiAgICAgICAgICogYXZhaWxhYmxlLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25SZWNvcmRDb21wbGV0ZScsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvblJlY29yZENvbXBsZXRlKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNSA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHN0b3JlIHJlZmVyZW5jZSB0byByZWNvcmRlZCBzdHJlYW0gZGF0YVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVjb3JkZWREYXRhID0gdGhpcy5lbmdpbmUucmVjb3JkZWREYXRhO1xuXG4gICAgICAgICAgICAvLyBjaGFuZ2UgdGhlIHJlcGxheSBidXR0b24gYmFjayB0byBhIHBsYXkgYnV0dG9uXG4gICAgICAgICAgICB0aGlzLnBsYXllci5jb250cm9sQmFyLnBsYXlUb2dnbGUucmVtb3ZlQ2xhc3MoJ3Zqcy1lbmRlZCcpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY29udHJvbEJhci5wbGF5VG9nZ2xlLnNob3coKTtcblxuICAgICAgICAgICAgLy8gbm90aWZ5IGxpc3RlbmVycyB0aGF0IGRhdGEgaXMgYXZhaWxhYmxlXG4gICAgICAgICAgICB0aGlzLnBsYXllci50cmlnZ2VyKCdmaW5pc2hSZWNvcmQnKTtcblxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldFJlY29yZFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQVVESU9fT05MWTpcbiAgICAgICAgICAgICAgICAgICAgLy8gcGF1c2UgcGxheWVyIHNvIHVzZXIgY2FuIHN0YXJ0IHBsYXliYWNrXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnBhdXNlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2V0dXAgZXZlbnRzIGZvciBwbGF5YmFja1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cmZlci5zZXR1cFBsYXliYWNrRXZlbnRzKHRydWUpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGRpc3BsYXkgbG9hZGVyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmxvYWRpbmdTcGlubmVyLnNob3coKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyByZXN0b3JlIGludGVyYWN0aW9uIHdpdGggY29udHJvbHMgYWZ0ZXIgd2F2ZWZvcm1cbiAgICAgICAgICAgICAgICAgICAgLy8gcmVuZGVyaW5nIGlzIGNvbXBsZXRlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnN1cmZlci5vbmNlKCdyZWFkeScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNS5fcHJvY2Vzc2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB2aXN1YWxpemUgcmVjb3JkZWQgc3RyZWFtXG4gICAgICAgICAgICAgICAgICAgIHRoaXMubG9hZCh0aGlzLnBsYXllci5yZWNvcmRlZERhdGEpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuVklERU9fT05MWTpcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX1ZJREVPOlxuICAgICAgICAgICAgICAgICAgICAvLyBwYXVzaW5nIHRoZSBwbGF5ZXIgc28gd2UgY2FuIHZpc3VhbGl6ZSB0aGUgcmVjb3JkZWQgZGF0YVxuICAgICAgICAgICAgICAgICAgICAvLyB3aWxsIHRyaWdnZXIgYW4gYXN5bmMgdmlkZW8uanMgJ3BhdXNlJyBldmVudCB0aGF0IHdlXG4gICAgICAgICAgICAgICAgICAgIC8vIGhhdmUgdG8gd2FpdCBmb3IuXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLm9uZSgncGF1c2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB2aWRlbyBkYXRhIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczUuX3Byb2Nlc3NpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gaGlkZSBsb2FkZXJcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNS5wbGF5ZXIubG9hZGluZ1NwaW5uZXIuaGlkZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBzaG93IHN0cmVhbSB0b3RhbCBkdXJhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXM1LnNldER1cmF0aW9uKF90aGlzNS5zdHJlYW1EdXJhdGlvbik7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSB0aW1lIGR1cmluZyBwbGF5YmFjayBhbmQgYXQgZW5kXG4gICAgICAgICAgICAgICAgICAgICAgICBfdGhpczUub24oX3RoaXM1LnBsYXllciwgJ3RpbWV1cGRhdGUnLCBfdGhpczUucGxheWJhY2tUaW1lVXBkYXRlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNS5vbihfdGhpczUucGxheWVyLCAnZW5kZWQnLCBfdGhpczUucGxheWJhY2tUaW1lVXBkYXRlKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gdW5tdXRlIGxvY2FsIGF1ZGlvIGR1cmluZyBwbGF5YmFja1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKF90aGlzNS5nZXRSZWNvcmRUeXBlKCkgPT09IF9yZWNvcmRNb2RlLkFVRElPX1ZJREVPKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXM1Lm1lZGlhRWxlbWVudC5tdXRlZCA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyB0aGUgdm9sdW1lIGJhciB3aGVuIGl0J3MgdW5tdXRlZFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNS5kaXNwbGF5Vm9sdW1lQ29udHJvbCh0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gbG9hZCByZWNvcmRlZCBtZWRpYVxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCgwLCBfZGV0ZWN0QnJvd3Nlci5pc0Nocm9tZSkoKSAmJiBfdGhpczUuZ2V0UmVjb3JkVHlwZSgpID09PSBfcmVjb3JkTW9kZS5BVURJT19WSURFTykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIHVzZSB2aWRlbyBwcm9wZXJ0eSBvbiBDaHJvbWVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBfdGhpczUubG9hZChfdGhpczUucGxheWVyLnJlY29yZGVkRGF0YS52aWRlbyk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzNS5sb2FkKF90aGlzNS5wbGF5ZXIucmVjb3JkZWREYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gcGF1c2UgcGxheWVyIHNvIHVzZXIgY2FuIHN0YXJ0IHBsYXliYWNrXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnBhdXNlKCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BTklNQVRJT046XG4gICAgICAgICAgICAgICAgICAgIC8vIGFuaW1hdGlvbiBkYXRhIGlzIHJlYWR5XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NpbmcgPSBmYWxzZTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBoaWRlIGxvYWRlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5sb2FkaW5nU3Bpbm5lci5oaWRlKCk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gc2hvdyBhbmltYXRpb24gdG90YWwgZHVyYXRpb25cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXREdXJhdGlvbih0aGlzLnN0cmVhbUR1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyBoaWRlIHByZXZpZXcgdmlkZW9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5tZWRpYUVsZW1lbnQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcblxuICAgICAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSBmaXJzdCBmcmFtZVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZWNvcmRDYW52YXMuc2hvdygpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHBhdXNlIHBsYXllciBzbyB1c2VyIGNhbiBzdGFydCBwbGF5YmFja1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5wYXVzZSgpO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHNob3cgYW5pbWF0aW9uIG9uIHBsYXlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5vbih0aGlzLnBsYXllciwgJ3BsYXknLCB0aGlzLnNob3dBbmltYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIGhpZGUgYW5pbWF0aW9uIG9uIHBhdXNlXG4gICAgICAgICAgICAgICAgICAgIHRoaXMub24odGhpcy5wbGF5ZXIsICdwYXVzZScsIHRoaXMuaGlkZUFuaW1hdGlvbik7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEludm9rZWQgZHVyaW5nIHJlY29yZGluZyBhbmQgZGlzcGxheXMgdGhlIHJlbWFpbmluZyB0aW1lLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnb25Db3VudERvd24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gb25Db3VudERvd24oKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgdmFyIG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuICAgICAgICAgICAgICAgIHZhciBkdXJhdGlvbiA9IHRoaXMubWF4TGVuZ3RoO1xuICAgICAgICAgICAgICAgIHZhciBjdXJyZW50VGltZSA9IChub3cgLSAodGhpcy5zdGFydFRpbWUgKyB0aGlzLnBhdXNlZFRpbWUpKSAvIDEwMDA7XG5cbiAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbUR1cmF0aW9uID0gY3VycmVudFRpbWU7XG5cbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRpbWUgPj0gZHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gYXQgdGhlIGVuZFxuICAgICAgICAgICAgICAgICAgICBjdXJyZW50VGltZSA9IGR1cmF0aW9uO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIHN0b3AgcmVjb3JkaW5nXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIC8vIHVwZGF0ZSBkdXJhdGlvblxuICAgICAgICAgICAgICAgIHRoaXMuc2V0RHVyYXRpb24oZHVyYXRpb24pO1xuXG4gICAgICAgICAgICAgICAgLy8gdXBkYXRlIGN1cnJlbnQgdGltZVxuICAgICAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFRpbWUoY3VycmVudFRpbWUsIGR1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci50cmlnZ2VyKCdwcm9ncmVzc1JlY29yZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIEdldCB0aGUgY3VycmVudCB0aW1lIG9mIHRoZSByZWNvcmRlZCBzdHJlYW0gZHVyaW5nIHBsYXliYWNrLlxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIDAgaWYgbm8gcmVjb3JkaW5nIGlzIGF2YWlsYWJsZSAoeWV0KS5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2dldEN1cnJlbnRUaW1lJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldEN1cnJlbnRUaW1lKCkge1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRUaW1lID0gaXNOYU4odGhpcy5zdHJlYW1DdXJyZW50VGltZSkgPyAwIDogdGhpcy5zdHJlYW1DdXJyZW50VGltZTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuZ2V0UmVjb3JkVHlwZSgpID09PSBfcmVjb3JkTW9kZS5BVURJT19PTkxZKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRpbWUgPSB0aGlzLnN1cmZlci5nZXRDdXJyZW50VGltZSgpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gY3VycmVudFRpbWU7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlcyB0aGUgcGxheWVyJ3MgZWxlbWVudCBkaXNwbGF5aW5nIHRoZSBjdXJyZW50IHRpbWUuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbY3VycmVudFRpbWU9MF0gLSBDdXJyZW50IHBvc2l0aW9uIG9mIHRoZVxuICAgICAgICAgKiAgICBwbGF5aGVhZCAoaW4gc2Vjb25kcykuXG4gICAgICAgICAqIEBwYXJhbSB7bnVtYmVyfSBbZHVyYXRpb249MF0gLSBEdXJhdGlvbiBpbiBzZWNvbmRzLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2V0Q3VycmVudFRpbWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2V0Q3VycmVudFRpbWUoY3VycmVudFRpbWUsIGR1cmF0aW9uKSB7XG4gICAgICAgICAgICBjdXJyZW50VGltZSA9IGlzTmFOKGN1cnJlbnRUaW1lKSA/IDAgOiBjdXJyZW50VGltZTtcbiAgICAgICAgICAgIGR1cmF0aW9uID0gaXNOYU4oZHVyYXRpb24pID8gMCA6IGR1cmF0aW9uO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0UmVjb3JkVHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19PTkxZOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cmZlci5zZXRDdXJyZW50VGltZShjdXJyZW50VGltZSwgZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuVklERU9fT05MWTpcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX1ZJREVPOlxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQU5JTUFUSU9OOlxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN0cmVhbUN1cnJlbnRUaW1lID0gTWF0aC5taW4oY3VycmVudFRpbWUsIGR1cmF0aW9uKTtcblxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgY3VycmVudCB0aW1lIGRpc3BsYXkgY29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLmNvbnRyb2xCYXIuY3VycmVudFRpbWVEaXNwbGF5LmZvcm1hdHRlZFRpbWVfID0gdGhpcy5wbGF5ZXIuY29udHJvbEJhci5jdXJyZW50VGltZURpc3BsYXkuY29udGVudEVsKCkubGFzdENoaWxkLnRleHRDb250ZW50ID0gKDAsIF9mb3JtYXRUaW1lMi5kZWZhdWx0KSh0aGlzLnN0cmVhbUN1cnJlbnRUaW1lLCBkdXJhdGlvbiwgdGhpcy5tc0Rpc3BsYXlNYXgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBHZXQgdGhlIGxlbmd0aCBvZiB0aGUgcmVjb3JkZWQgc3RyZWFtIGluIHNlY29uZHMuXG4gICAgICAgICAqXG4gICAgICAgICAqIFJldHVybnMgMCBpZiBubyByZWNvcmRpbmcgaXMgYXZhaWxhYmxlICh5ZXQpLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZ2V0RHVyYXRpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gZ2V0RHVyYXRpb24oKSB7XG4gICAgICAgICAgICB2YXIgZHVyYXRpb24gPSBpc05hTih0aGlzLnN0cmVhbUR1cmF0aW9uKSA/IDAgOiB0aGlzLnN0cmVhbUR1cmF0aW9uO1xuXG4gICAgICAgICAgICByZXR1cm4gZHVyYXRpb247XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogVXBkYXRlcyB0aGUgcGxheWVyJ3MgZWxlbWVudCBkaXNwbGF5aW5nIHRoZSBkdXJhdGlvbiB0aW1lLlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcGFyYW0ge251bWJlcn0gW2R1cmF0aW9uPTBdIC0gRHVyYXRpb24gaW4gc2Vjb25kcy5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3NldER1cmF0aW9uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNldER1cmF0aW9uKGR1cmF0aW9uKSB7XG4gICAgICAgICAgICBkdXJhdGlvbiA9IGlzTmFOKGR1cmF0aW9uKSA/IDAgOiBkdXJhdGlvbjtcblxuICAgICAgICAgICAgc3dpdGNoICh0aGlzLmdldFJlY29yZFR5cGUoKSkge1xuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQVVESU9fT05MWTpcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zdXJmZXIuc2V0RHVyYXRpb24oZHVyYXRpb24pO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuVklERU9fT05MWTpcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX1ZJREVPOlxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQU5JTUFUSU9OOlxuICAgICAgICAgICAgICAgICAgICAvLyB1cGRhdGUgZHVyYXRpb24gZGlzcGxheSBjb21wb25lbnRcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuY29udHJvbEJhci5kdXJhdGlvbkRpc3BsYXkuZm9ybWF0dGVkVGltZV8gPSB0aGlzLnBsYXllci5jb250cm9sQmFyLmR1cmF0aW9uRGlzcGxheS5jb250ZW50RWwoKS5sYXN0Q2hpbGQudGV4dENvbnRlbnQgPSAoMCwgX2Zvcm1hdFRpbWUyLmRlZmF1bHQpKGR1cmF0aW9uLCBkdXJhdGlvbiwgdGhpcy5tc0Rpc3BsYXlNYXgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTdGFydCBsb2FkaW5nIGRhdGEuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7KHN0cmluZ3xibG9ifGZpbGUpfSB1cmwgLSBFaXRoZXIgdGhlIFVSTCBvZiB0aGUgbWVkaWEgZmlsZSxcbiAgICAgICAgICogICAgIGEgQmxvYiwgYSBGaWxlIG9iamVjdCBvciBNZWRpYVN0cmVhbS5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2xvYWQnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gbG9hZCh1cmwpIHtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXRSZWNvcmRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX09OTFk6XG4gICAgICAgICAgICAgICAgICAgIC8vIHZpc3VhbGl6ZSByZWNvcmRlZCBCbG9iIHN0cmVhbVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cmZlci5sb2FkKHVybCk7XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5JTUFHRV9PTkxZOlxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuVklERU9fT05MWTpcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX1ZJREVPOlxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQU5JTUFUSU9OOlxuICAgICAgICAgICAgICAgICAgICBpZiAodXJsIGluc3RhbmNlb2YgQmxvYiB8fCB1cmwgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBhc3NpZ24gYmxvYiB1c2luZyBjcmVhdGVPYmplY3RVUkxcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLCBfYnJvd3NlclNoaW0yLmRlZmF1bHQpKHVybCwgdGhpcy5tZWRpYUVsZW1lbnQsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGFzc2lnbiBzdHJlYW0gd2l0aG91dCBjcmVhdGVPYmplY3RVUkxcbiAgICAgICAgICAgICAgICAgICAgICAgICgwLCBfYnJvd3NlclNoaW0yLmRlZmF1bHQpKHVybCwgdGhpcy5tZWRpYUVsZW1lbnQsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFNob3cgc2F2ZSBhcyBkaWFsb2cgaW4gYnJvd3NlciBzbyB0aGUgdXNlciBjYW4gc3RvcmUgdGhlIHJlY29yZGVkIG1lZGlhXG4gICAgICAgICAqIGxvY2FsbHkuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7b2JqZWN0fSBuYW1lIC0gT2JqZWN0IHdpdGggb25lIG9yIG1vcmUgbmFtZXMgZm9yIHRoZSBwYXJ0aWN1bGFyXG4gICAgICAgICAqICAgICBibG9iKHMpIHlvdSB3YW50IHRvIHNhdmUuIEZpbGUgZXh0ZW5zaW9ucyBhcmUgYWRkZWQgYXV0b21hdGljYWxseS5cbiAgICAgICAgICogICAgIEZvciBleGFtcGxlOiB7J3ZpZGVvJzogJ25hbWUtb2YtdmlkZW8tZmlsZSd9LiBTdXBwb3J0ZWQga2V5cyBhcmVcbiAgICAgICAgICogICAgICdhdWRpbycsICd2aWRlbycgYW5kICdnaWYnLlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnc2F2ZUFzJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHNhdmVBcyhuYW1lKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbmdpbmUgJiYgbmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuc2F2ZUFzKG5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIERlc3Ryb3kgcGx1Z2luIG9ubHkuXG4gICAgICAgICAqXG4gICAgICAgICAqIFVzZSBgZGVzdHJveWAgdG8gcmVtb3ZlIHRoZSBwbHVnaW4gYW5kIHRoZSBwbGF5ZXIuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkaXNwb3NlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRpc3Bvc2UoKSB7XG4gICAgICAgICAgICAvLyBkaXNhYmxlIGNvbW1vbiBldmVudCBsaXN0ZW5lcnNcbiAgICAgICAgICAgIHRoaXMucGxheWVyLm9mZigncmVhZHknKTtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLm9mZigndXNlcmluYWN0aXZlJyk7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5vZmYoJ2xvYWRlZG1ldGFkYXRhJyk7XG5cbiAgICAgICAgICAgIC8vIHByZXZlbnQgY2FsbGJhY2tzIGlmIHJlY29yZGluZyBpcyBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgaWYgKHRoaXMuZW5naW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLm9mZigncmVjb3JkQ29tcGxldGUnLCB0aGlzLmVuZ2luZVN0b3BDYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN0b3AgcmVjb3JkaW5nIGFuZCBkZXZpY2VcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5zdG9wRGV2aWNlKCk7XG5cbiAgICAgICAgICAgIC8vIHN0b3AgY291bnRkb3duXG4gICAgICAgICAgICB0aGlzLnBsYXllci5jbGVhckludGVydmFsKHRoaXMuY291bnREb3duKTtcblxuICAgICAgICAgICAgLy8gZGlzcG9zZSB3YXZlc3VyZmVyLmpzXG4gICAgICAgICAgICBpZiAodGhpcy5nZXRSZWNvcmRUeXBlKCkgPT0gX3JlY29yZE1vZGUuQVVESU9fT05MWSkge1xuICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1cmZlcikge1xuICAgICAgICAgICAgICAgICAgICAvLyBhbHNvIGRpc3Bvc2VzIHBsYXllclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cmZlci5kZXN0cm95KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0aGlzLnJlc2V0U3RhdGUoKTtcblxuICAgICAgICAgICAgX2dldChSZWNvcmQucHJvdG90eXBlLl9fcHJvdG9fXyB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YoUmVjb3JkLnByb3RvdHlwZSksICdkaXNwb3NlJywgdGhpcykuY2FsbCh0aGlzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEZXN0cm95IHBsdWdpbiBhbmQgcGxheWVycyBhbmQgY2xlYW51cCByZXNvdXJjZXMuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkZXN0cm95JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGRlc3Ryb3koKSB7XG4gICAgICAgICAgICB0aGlzLnBsYXllci5kaXNwb3NlKCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogUmVzZXQgdGhlIHBsdWdpbi5cbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Jlc2V0JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNiA9IHRoaXM7XG5cbiAgICAgICAgICAgIC8vIHByZXZlbnQgY2FsbGJhY2tzIGlmIHJlY29yZGluZyBpcyBpbiBwcm9ncmVzc1xuICAgICAgICAgICAgaWYgKHRoaXMuZW5naW5lKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5lbmdpbmUuZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLm9mZigncmVjb3JkQ29tcGxldGUnLCB0aGlzLmVuZ2luZVN0b3BDYWxsYmFjayk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIHN0b3AgcmVjb3JkaW5nIGFuZCBkZXZpY2VcbiAgICAgICAgICAgIHRoaXMuc3RvcCgpO1xuICAgICAgICAgICAgdGhpcy5zdG9wRGV2aWNlKCk7XG5cbiAgICAgICAgICAgIC8vIHN0b3AgY291bnRkb3duXG4gICAgICAgICAgICB0aGlzLnBsYXllci5jbGVhckludGVydmFsKHRoaXMuY291bnREb3duKTtcblxuICAgICAgICAgICAgLy8gcmVzZXQgb3B0aW9uc1xuICAgICAgICAgICAgdGhpcy5sb2FkT3B0aW9ucygpO1xuXG4gICAgICAgICAgICAvLyByZXNldCByZWNvcmRlciBzdGF0ZVxuICAgICAgICAgICAgdGhpcy5yZXNldFN0YXRlKCk7XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHJlY29yZCB0aW1lXG4gICAgICAgICAgICB0aGlzLnNldER1cmF0aW9uKHRoaXMubWF4TGVuZ3RoKTtcbiAgICAgICAgICAgIHRoaXMuc2V0Q3VycmVudFRpbWUoMCk7XG5cbiAgICAgICAgICAgIC8vIHJlc2V0IHBsYXllclxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVzZXQoKTtcbiAgICAgICAgICAgIHN3aXRjaCAodGhpcy5nZXRSZWNvcmRUeXBlKCkpIHtcbiAgICAgICAgICAgICAgICBjYXNlIF9yZWNvcmRNb2RlLkFVRElPX09OTFk6XG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLnN1cmZlciAmJiB0aGlzLnN1cmZlci5zdXJmZXIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGVtcHR5IGxhc3QgZnJhbWVcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3VyZmVyLnN1cmZlci5lbXB0eSgpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5JTUFHRV9PTkxZOlxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQU5JTUFUSU9OOlxuICAgICAgICAgICAgICAgICAgICAvLyByZXNldCBVSVxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5yZWNvcmRDYW52YXMuaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5jYW1lcmFCdXR0b24uaGlkZSgpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gaGlkZSBwbGF5IGNvbnRyb2xcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmNvbnRyb2xCYXIucGxheVRvZ2dsZS5oaWRlKCk7XG5cbiAgICAgICAgICAgIC8vIHNob3cgZGV2aWNlIHNlbGVjdGlvbiBidXR0b25cbiAgICAgICAgICAgIHRoaXMucGxheWVyLmRldmljZUJ1dHRvbi5zaG93KCk7XG5cbiAgICAgICAgICAgIC8vIGhpZGUgcmVjb3JkIGJ1dHRvblxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVjb3JkVG9nZ2xlLmhpZGUoKTtcblxuICAgICAgICAgICAgLy8gbG9hZGVkbWV0YWRhdGEgcmVzZXRzIHRoZSBkdXJhdGlvbkRpc3BsYXkgZm9yIHRoZVxuICAgICAgICAgICAgLy8gZmlyc3QgdGltZVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIub25lKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAvLyBkaXNwbGF5IG1heCByZWNvcmQgdGltZVxuICAgICAgICAgICAgICAgIF90aGlzNi5zZXREdXJhdGlvbihfdGhpczYubWF4TGVuZ3RoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc2V0IHRoZSBwbHVnaW4gcmVjb3JkZXIgc3RhdGUuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdyZXNldFN0YXRlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIHJlc2V0U3RhdGUoKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWNvcmRpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX3Byb2Nlc3NpbmcgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2RldmljZUFjdGl2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5kZXZpY2VzID0gW107XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogR2V0IHJlY29yZGVyIHR5cGUuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdnZXRSZWNvcmRUeXBlJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGdldFJlY29yZFR5cGUoKSB7XG4gICAgICAgICAgICByZXR1cm4gKDAsIF9yZWNvcmRNb2RlLmdldFJlY29yZGVyTW9kZSkodGhpcy5yZWNvcmRJbWFnZSwgdGhpcy5yZWNvcmRBdWRpbywgdGhpcy5yZWNvcmRWaWRlbywgdGhpcy5yZWNvcmRBbmltYXRpb24pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENyZWF0ZSBhbmQgZGlzcGxheSBzbmFwc2hvdCBpbWFnZS5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ2NyZWF0ZVNuYXBzaG90JyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGNyZWF0ZVNuYXBzaG90KCkge1xuICAgICAgICAgICAgdmFyIF90aGlzNyA9IHRoaXM7XG5cbiAgICAgICAgICAgIHRoaXMuY2FwdHVyZUZyYW1lKCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgLy8gdHVybiB0aGUgY2FudmFzIGRhdGEgaW50byBiYXNlNjQgZGF0YSB3aXRoIGEgUE5HIGhlYWRlclxuICAgICAgICAgICAgICAgIF90aGlzNy5wbGF5ZXIucmVjb3JkZWREYXRhID0gcmVzdWx0LnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG5cbiAgICAgICAgICAgICAgICAvLyBoaWRlIHByZXZpZXcgdmlkZW9cbiAgICAgICAgICAgICAgICBfdGhpczcubWVkaWFFbGVtZW50LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG5cbiAgICAgICAgICAgICAgICAvLyBzaG93IHRoZSBzbmFwc2hvdFxuICAgICAgICAgICAgICAgIF90aGlzNy5wbGF5ZXIucmVjb3JkQ2FudmFzLnNob3coKTtcblxuICAgICAgICAgICAgICAgIC8vIHN0b3AgcmVjb3JkaW5nXG4gICAgICAgICAgICAgICAgX3RoaXM3LnN0b3AoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIFJlc2V0IFVJIGZvciByZXRyeWluZyBhIHNuYXBzaG90IGltYWdlLlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAncmV0cnlTbmFwc2hvdCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiByZXRyeVNuYXBzaG90KCkge1xuICAgICAgICAgICAgdGhpcy5fcHJvY2Vzc2luZyA9IGZhbHNlO1xuXG4gICAgICAgICAgICAvLyByZXRyeTogaGlkZSB0aGUgc25hcHNob3RcbiAgICAgICAgICAgIHRoaXMucGxheWVyLnJlY29yZENhbnZhcy5oaWRlKCk7XG5cbiAgICAgICAgICAgIC8vIHNob3cgcHJldmlldyB2aWRlb1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZWwoKS5maXJzdENoaWxkLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG5cbiAgICAgICAgLyoqXG4gICAgICAgICAqIENhcHR1cmUgZnJhbWUgZnJvbSBjYW1lcmEgYW5kIGNvcHkgZGF0YSB0byBjYW52YXMuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdjYXB0dXJlRnJhbWUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gY2FwdHVyZUZyYW1lKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzOCA9IHRoaXM7XG5cbiAgICAgICAgICAgIHZhciBkZXRlY3RlZCA9ICgwLCBfZGV0ZWN0QnJvd3Nlci5kZXRlY3RCcm93c2VyKSgpO1xuICAgICAgICAgICAgdmFyIHJlY29yZENhbnZhcyA9IHRoaXMucGxheWVyLnJlY29yZENhbnZhcy5lbCgpLmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgY2FudmFzIHNpemUgdG8gdGhlIGRpbWVuc2lvbnMgb2YgdGhlIGNhbWVyYSxcbiAgICAgICAgICAgIC8vIHdoaWNoIGFsc28gd2lwZXMgdGhlIGNvbnRlbnQgb2YgdGhlIGNhbnZhc1xuICAgICAgICAgICAgcmVjb3JkQ2FudmFzLndpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGgoKTtcbiAgICAgICAgICAgIHJlY29yZENhbnZhcy5oZWlnaHQgPSB0aGlzLnBsYXllci5oZWlnaHQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKGZ1bmN0aW9uIChyZXNvbHZlLCByZWplY3QpIHtcbiAgICAgICAgICAgICAgICAvLyBNZWRpYUNhcHR1cmUgaXMgb25seSBzdXBwb3J0ZWQgb246XG4gICAgICAgICAgICAgICAgLy8gLSBDaHJvbWUgNjAgYW5kIG5ld2VyIChzZWVcbiAgICAgICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vdzNjL21lZGlhY2FwdHVyZS1pbWFnZS9ibG9iL2doLXBhZ2VzL2ltcGxlbWVudGF0aW9uLXN0YXR1cy5tZClcbiAgICAgICAgICAgICAgICAvLyAtIEZpcmVmb3ggYmVoaW5kIGZsYWcgKGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTg4ODE3NylcbiAgICAgICAgICAgICAgICAvL1xuICAgICAgICAgICAgICAgIC8vIGltcG9ydGluZyBJbWFnZUNhcHR1cmUgY2FuIGZhaWwgd2hlbiBlbmFibGluZyBjaHJvbWUgZmxhZyBpcyBzdGlsbCByZXF1aXJlZC5cbiAgICAgICAgICAgICAgICAvLyBpZiBzbzsgaWdub3JlIGFuZCBjb250aW51ZVxuICAgICAgICAgICAgICAgIGlmIChkZXRlY3RlZC5icm93c2VyID09PSAnY2hyb21lJyAmJiBkZXRlY3RlZC52ZXJzaW9uID49IDYwICYmICh0eXBlb2YgSW1hZ2VDYXB0dXJlID09PSAndW5kZWZpbmVkJyA/ICd1bmRlZmluZWQnIDogX3R5cGVvZihJbWFnZUNhcHR1cmUpKSA9PT0gKHR5cGVvZiBGdW5jdGlvbiA9PT0gJ3VuZGVmaW5lZCcgPyAndW5kZWZpbmVkJyA6IF90eXBlb2YoRnVuY3Rpb24pKSkge1xuICAgICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHRyYWNrID0gX3RoaXM4LnN0cmVhbS5nZXRWaWRlb1RyYWNrcygpWzBdO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGltYWdlQ2FwdHVyZSA9IG5ldyBJbWFnZUNhcHR1cmUodHJhY2spO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBob3RvU2V0dGluZ3MgPSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaW1hZ2VXaWR0aDogcmVjb3JkQ2FudmFzLndpZHRoLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlSGVpZ2h0OiByZWNvcmRDYW52YXMuaGVpZ2h0XG4gICAgICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyB0YWtlIHBpY3R1cmVcbiAgICAgICAgICAgICAgICAgICAgICAgIGltYWdlQ2FwdHVyZS50YWtlUGhvdG8ocGhvdG9TZXR0aW5ncykudGhlbihmdW5jdGlvbiAoYmxvYikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBjcmVhdGVJbWFnZUJpdG1hcChibG9iKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24gKGltYWdlQml0bWFwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gZ2V0IGEgZnJhbWUgYW5kIGNvcHkgaXQgb250byB0aGUgY2FudmFzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXM4LmRyYXdDYW52YXMocmVjb3JkQ2FudmFzLCBpbWFnZUJpdG1hcCk7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBub3RpZnkgb3RoZXJzXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVzb2x2ZShyZWNvcmRDYW52YXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgICAgIH0gY2F0Y2ggKGVycikge31cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLy8gbm8gSW1hZ2VDYXB0dXJlIGF2YWlsYWJsZTogZG8gaXQgdGhlIG9sZHNrb29sIHdheVxuXG4gICAgICAgICAgICAgICAgLy8gZ2V0IGEgZnJhbWUgYW5kIGNvcHkgaXQgb250byB0aGUgY2FudmFzXG4gICAgICAgICAgICAgICAgX3RoaXM4LmRyYXdDYW52YXMocmVjb3JkQ2FudmFzLCBfdGhpczgubWVkaWFFbGVtZW50KTtcblxuICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBvdGhlcnNcbiAgICAgICAgICAgICAgICByZXNvbHZlKHJlY29yZENhbnZhcyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBEcmF3IGltYWdlIGZyYW1lIG9uIGNhbnZhcyBlbGVtZW50LlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZHJhd0NhbnZhcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkcmF3Q2FudmFzKGNhbnZhcywgZWxlbWVudCkge1xuICAgICAgICAgICAgY2FudmFzLmdldENvbnRleHQoJzJkJykuZHJhd0ltYWdlKGVsZW1lbnQsIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogU3RhcnQgcHJldmlldyBvZiB2aWRlbyBzdHJlYW0uXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzdGFydFZpZGVvUHJldmlldycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzdGFydFZpZGVvUHJldmlldygpIHtcbiAgICAgICAgICAgIC8vIGRpc2FibGUgcGxheWJhY2sgZXZlbnRzXG4gICAgICAgICAgICB0aGlzLm9mZigndGltZXVwZGF0ZScpO1xuICAgICAgICAgICAgdGhpcy5vZmYoJ2R1cmF0aW9uY2hhbmdlJyk7XG4gICAgICAgICAgICB0aGlzLm9mZignbG9hZGVkbWV0YWRhdGEnKTtcbiAgICAgICAgICAgIHRoaXMub2ZmKCdwbGF5Jyk7XG5cbiAgICAgICAgICAgIC8vIG11dGUgbG9jYWwgYXVkaW9cbiAgICAgICAgICAgIHRoaXMubWVkaWFFbGVtZW50Lm11dGVkID0gdHJ1ZTtcblxuICAgICAgICAgICAgLy8gaGlkZSB2b2x1bWUgY29udHJvbCB0byBwcmV2ZW50IGZlZWRiYWNrXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlWb2x1bWVDb250cm9sKGZhbHNlKTtcblxuICAgICAgICAgICAgLy8gc3RhcnQgb3IgcmVzdW1lIGxpdmUgcHJldmlld1xuICAgICAgICAgICAgdGhpcy5sb2FkKHRoaXMuc3RyZWFtKTtcbiAgICAgICAgICAgIHRoaXMubWVkaWFFbGVtZW50LnBsYXkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IGFuaW1hdGVkIEdJRi5cbiAgICAgICAgICogQHByaXZhdGVcbiAgICAgICAgICovXG5cbiAgICB9LCB7XG4gICAgICAgIGtleTogJ3Nob3dBbmltYXRpb24nLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gc2hvd0FuaW1hdGlvbigpIHtcbiAgICAgICAgICAgIHZhciBhbmltYXRpb25EaXNwbGF5ID0gdGhpcy5wbGF5ZXIuYW5pbWF0aW9uRGlzcGxheS5lbCgpLmZpcnN0Q2hpbGQ7XG5cbiAgICAgICAgICAgIC8vIHNldCB0aGUgaW1hZ2Ugc2l6ZSB0byB0aGUgZGltZW5zaW9ucyBvZiB0aGUgcmVjb3JkZWQgYW5pbWF0aW9uXG4gICAgICAgICAgICBhbmltYXRpb25EaXNwbGF5LndpZHRoID0gdGhpcy5wbGF5ZXIud2lkdGgoKTtcbiAgICAgICAgICAgIGFuaW1hdGlvbkRpc3BsYXkuaGVpZ2h0ID0gdGhpcy5wbGF5ZXIuaGVpZ2h0KCk7XG5cbiAgICAgICAgICAgIC8vIGhpZGUgdGhlIGZpcnN0IGZyYW1lXG4gICAgICAgICAgICB0aGlzLnBsYXllci5yZWNvcmRDYW52YXMuaGlkZSgpO1xuXG4gICAgICAgICAgICAvLyBzaG93IHRoZSBhbmltYXRpb25cbiAgICAgICAgICAgICgwLCBfYnJvd3NlclNoaW0yLmRlZmF1bHQpKHRoaXMucGxheWVyLnJlY29yZGVkRGF0YSwgYW5pbWF0aW9uRGlzcGxheSwgZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYW5pbWF0aW9uRGlzcGxheS5zaG93KCk7XG4gICAgICAgIH1cblxuICAgICAgICAvKipcbiAgICAgICAgICogSGlkZSBhbmltYXRlZCBHSUYuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdoaWRlQW5pbWF0aW9uJyxcbiAgICAgICAgdmFsdWU6IGZ1bmN0aW9uIGhpZGVBbmltYXRpb24oKSB7XG4gICAgICAgICAgICAvLyBzaG93IHRoZSBmaXJzdCBmcmFtZVxuICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVjb3JkQ2FudmFzLnNob3coKTtcblxuICAgICAgICAgICAgLy8gaGlkZSB0aGUgYW5pbWF0aW9uXG4gICAgICAgICAgICB0aGlzLnBsYXllci5hbmltYXRpb25EaXNwbGF5LmhpZGUoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBVcGRhdGUgdGltZSBkdXJpbmcgcGxheWJhY2suXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdwbGF5YmFja1RpbWVVcGRhdGUnLFxuICAgICAgICB2YWx1ZTogZnVuY3Rpb24gcGxheWJhY2tUaW1lVXBkYXRlKCkge1xuICAgICAgICAgICAgdGhpcy5zZXRDdXJyZW50VGltZSh0aGlzLnBsYXllci5jdXJyZW50VGltZSgpLCB0aGlzLnN0cmVhbUR1cmF0aW9uKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBSZWNlaXZlZCBuZXcgdGltZXN0YW1wICh3aGVuIHRpbWVTbGljZSBvcHRpb24gaXMgZW5hYmxlZCkuXG4gICAgICAgICAqIEBwcml2YXRlXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdvblRpbWVTdGFtcCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBvblRpbWVTdGFtcChjdXJyZW50LCBhbGwpIHtcbiAgICAgICAgICAgIHRoaXMucGxheWVyLmN1cnJlbnRUaW1lc3RhbXAgPSBjdXJyZW50O1xuICAgICAgICAgICAgdGhpcy5wbGF5ZXIuYWxsVGltZXN0YW1wcyA9IGFsbDtcblxuICAgICAgICAgICAgLy8gZ2V0IGJsb2IgKG9ubHkgZm9yIE1lZGlhU3RyZWFtUmVjb3JkZXIpXG4gICAgICAgICAgICB2YXIgaW50ZXJuYWw7XG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0UmVjb3JkVHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19PTkxZOlxuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbCA9IHRoaXMuZW5naW5lLmVuZ2luZS5hdWRpb1JlY29yZGVyO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgIGNhc2UgX3JlY29yZE1vZGUuQU5JTUFUSU9OOlxuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbCA9IHRoaXMuZW5naW5lLmVuZ2luZS5naWZSZWNvcmRlcjtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICBpbnRlcm5hbCA9IHRoaXMuZW5naW5lLmVuZ2luZS52aWRlb1JlY29yZGVyO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaW50ZXJuYWwgPSBpbnRlcm5hbC5nZXRJbnRlcm5hbFJlY29yZGVyKCk7XG4gICAgICAgICAgICBpZiAoaW50ZXJuYWwgaW5zdGFuY2VvZiBNZWRpYVN0cmVhbVJlY29yZGVyID09PSB0cnVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIucmVjb3JkZWREYXRhID0gaW50ZXJuYWwuZ2V0QXJyYXlPZkJsb2JzKCk7XG5cbiAgICAgICAgICAgICAgICAvLyBpbmplY3QgZmlsZSBpbmZvIGZvciBuZXdlc3QgYmxvYlxuICAgICAgICAgICAgICAgIHRoaXMuZW5naW5lLmFkZEZpbGVJbmZvKHRoaXMucGxheWVyLnJlY29yZGVkRGF0YVt0aGlzLnBsYXllci5yZWNvcmRlZERhdGEubGVuZ3RoIC0gMV0pO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBub3RpZnkgb3RoZXJzXG4gICAgICAgICAgICB0aGlzLnBsYXllci50cmlnZ2VyKCd0aW1lc3RhbXAnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDb2xsZWN0cyBpbmZvcm1hdGlvbiBhYm91dCB0aGUgbWVkaWEgaW5wdXQgYW5kIG91dHB1dCBkZXZpY2VzXG4gICAgICAgICAqIGF2YWlsYWJsZSBvbiB0aGUgc3lzdGVtLlxuICAgICAgICAgKlxuICAgICAgICAgKiBSZXR1cm5zIGFuIGFycmF5LlxuICAgICAgICAgKi9cblxuICAgIH0sIHtcbiAgICAgICAga2V5OiAnZW51bWVyYXRlRGV2aWNlcycsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBlbnVtZXJhdGVEZXZpY2VzKCkge1xuICAgICAgICAgICAgdmFyIF90aGlzOSA9IHRoaXM7XG5cbiAgICAgICAgICAgIGlmICghbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyB8fCAhbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5lbnVtZXJhdGVEZXZpY2VzKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIuZW51bWVyYXRlRXJyb3JDb2RlID0gJ2VudW1lcmF0ZURldmljZXMoKSBub3Qgc3VwcG9ydGVkLic7XG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5ZXIudHJpZ2dlcignZW51bWVyYXRlRXJyb3InKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIExpc3QgY2FtZXJhcyBhbmQgbWljcm9waG9uZXMuXG4gICAgICAgICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXModGhpcykudGhlbihmdW5jdGlvbiAoZGV2aWNlcykge1xuICAgICAgICAgICAgICAgIF90aGlzOS5kZXZpY2VzID0gW107XG4gICAgICAgICAgICAgICAgZGV2aWNlcy5mb3JFYWNoKGZ1bmN0aW9uIChkZXZpY2UpIHtcbiAgICAgICAgICAgICAgICAgICAgX3RoaXM5LmRldmljZXMucHVzaChkZXZpY2UpO1xuICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgLy8gbm90aWZ5IGxpc3RlbmVyc1xuICAgICAgICAgICAgICAgIF90aGlzOS5wbGF5ZXIudHJpZ2dlcignZW51bWVyYXRlUmVhZHknKTtcbiAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICBfdGhpczkucGxheWVyLmVudW1lcmF0ZUVycm9yQ29kZSA9IGVycjtcbiAgICAgICAgICAgICAgICBfdGhpczkucGxheWVyLnRyaWdnZXIoJ2VudW1lcmF0ZUVycm9yJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBDaGFuZ2UgdGhlIGF1ZGlvIG91dHB1dCBkZXZpY2UuXG4gICAgICAgICAqXG4gICAgICAgICAqIEBwYXJhbSB7c3RyaW5nfSBkZXZpY2VJZCAtIElkIG9mIGF1ZGlvIG91dHB1dCBkZXZpY2UuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdzZXRBdWRpb091dHB1dCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBzZXRBdWRpb091dHB1dChkZXZpY2VJZCkge1xuICAgICAgICAgICAgdmFyIF90aGlzMTAgPSB0aGlzO1xuXG4gICAgICAgICAgICB2YXIgZXJyb3JNZXNzYWdlID0gdm9pZCAwO1xuXG4gICAgICAgICAgICBzd2l0Y2ggKHRoaXMuZ2V0UmVjb3JkVHlwZSgpKSB7XG4gICAgICAgICAgICAgICAgY2FzZSBfcmVjb3JkTW9kZS5BVURJT19PTkxZOlxuICAgICAgICAgICAgICAgICAgICAvLyB1c2Ugd2F2ZXN1cmZlclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cmZlci5zdXJmZXIuc2V0U2lua0lkKGRldmljZUlkKS50aGVuKGZ1bmN0aW9uIChyZXN1bHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAgICAgICAgIF90aGlzMTAucGxheWVyLnRyaWdnZXIoJ2F1ZGlvT3V0cHV0UmVhZHknKTtcbiAgICAgICAgICAgICAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24gKGVycikge1xuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICB2YXIgZWxlbWVudCA9IHBsYXllci50ZWNoXy5lbF87XG4gICAgICAgICAgICAgICAgICAgIGlmIChkZXZpY2VJZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBlbGVtZW50LnNpbmtJZCAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbGVtZW50LnNldFNpbmtJZChkZXZpY2VJZCkudGhlbihmdW5jdGlvbiAocmVzdWx0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIG5vdGlmeSBsaXN0ZW5lcnNcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgX3RoaXMxMC5wbGF5ZXIudHJpZ2dlcignYXVkaW9PdXRwdXRSZWFkeScpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3JNZXNzYWdlID0gZXJyO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAnQnJvd3NlciBkb2VzIG5vdCBzdXBwb3J0IGF1ZGlvIG91dHB1dCBkZXZpY2Ugc2VsZWN0aW9uLic7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBlcnJvck1lc3NhZ2UgPSAnSW52YWxpZCBkZXZpY2VJZDogJyArIGRldmljZUlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBlcnJvciBpZiB3ZSBnZXQgaGVyZTogbm90aWZ5IGxpc3RlbmVyc1xuICAgICAgICAgICAgaWYgKGVycm9yTWVzc2FnZSkge1xuICAgICAgICAgICAgICAgIHRoaXMucGxheWVyLnRyaWdnZXIoJ2Vycm9yJywgZXJyb3JNZXNzYWdlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8qKlxuICAgICAgICAgKiBTaG93IG9yIGhpZGUgdGhlIHZvbHVtZSBtZW51LlxuICAgICAgICAgKlxuICAgICAgICAgKiBAcHJpdmF0ZVxuICAgICAgICAgKiBAcGFyYW0ge2Jvb2xlYW59IGRpc3BsYXkgLSBIaWRlL3Nob3cgdm9sdW1lIGNvbnRyb2wuXG4gICAgICAgICAqL1xuXG4gICAgfSwge1xuICAgICAgICBrZXk6ICdkaXNwbGF5Vm9sdW1lQ29udHJvbCcsXG4gICAgICAgIHZhbHVlOiBmdW5jdGlvbiBkaXNwbGF5Vm9sdW1lQ29udHJvbChkaXNwbGF5KSB7XG4gICAgICAgICAgICBpZiAodGhpcy5wbGF5ZXIuY29udHJvbEJhci52b2x1bWVQYW5lbCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgaWYgKGRpc3BsYXkgPT09IHRydWUpIHtcbiAgICAgICAgICAgICAgICAgICAgZGlzcGxheSA9ICdmbGV4JztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB0aGlzLnBsYXllci5jb250cm9sQmFyLnZvbHVtZVBhbmVsLmVsKCkuc3R5bGUuZGlzcGxheSA9IGRpc3BsYXk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9XSk7XG5cbiAgICByZXR1cm4gUmVjb3JkO1xufShQbHVnaW4pO1xuXG4vLyB2ZXJzaW9uIG5yIGdldHMgcmVwbGFjZWQgZHVyaW5nIGJ1aWxkXG5cblxuUmVjb3JkLlZFUlNJT04gPSAnZGV2JztcblxuLy8gcmVnaXN0ZXIgcGx1Z2luXG5fdmlkZW8yLmRlZmF1bHQuUmVjb3JkID0gUmVjb3JkO1xuX3ZpZGVvMi5kZWZhdWx0LnJlZ2lzdGVyUGx1Z2luKCdyZWNvcmQnLCBSZWNvcmQpO1xuXG4vLyBleHBvcnQgcGx1Z2luXG5tb2R1bGUuZXhwb3J0cyA9IHtcbiAgICBSZWNvcmQ6IFJlY29yZFxufTsiLCJ2YXIgd2luO1xuXG5pZiAodHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IHdpbmRvdztcbn0gZWxzZSBpZiAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgIHdpbiA9IGdsb2JhbDtcbn0gZWxzZSBpZiAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIpe1xuICAgIHdpbiA9IHNlbGY7XG59IGVsc2Uge1xuICAgIHdpbiA9IHt9O1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IHdpbjtcbiIsIi8qIGVzbGludC1kaXNhYmxlIG5vLXZhciAqL1xuLyogZXNsaW50LWVudiBxdW5pdCAqL1xudmFyIHEgPSB3aW5kb3cuUVVuaXQ7XG5cbnZhciB2ciA9IHJlcXVpcmUoJy4uL2VzNS92aWRlb2pzLnJlY29yZC5qcycpO1xuXG5xLm1vZHVsZSgnQnJvd3NlcmlmeSBSZXF1aXJlIHZpZGVvanMucmVjb3JkJyk7XG5xLnRlc3QoJ3ZpZGVvanMucmVjb3JkIHNob3VsZCBiZSByZXF1aXJhYmxlIGFuZCBidW5kbGVkIHZpYSBicm93c2VyaWZ5JywgZnVuY3Rpb24oYXNzZXJ0KSB7XG4gICAgYXNzZXJ0Lm9rKHZyLCAndmlkZW9qcy5yZWNvcmQgaXMgcmVxdWlyZWQgcHJvcGVybHknKTtcbn0pO1xuXG52YXIgbGFtZSA9IHJlcXVpcmUoJy4uL2VzNS9wbHVnaW5zL2xhbWVqcy1wbHVnaW4uanMnKTtcblxucS5tb2R1bGUoJ0Jyb3dzZXJpZnkgUmVxdWlyZSBsYW1lanMnKTtcbnEudGVzdCgnbGFtZWpzIHBsdWdpbiBzaG91bGQgYmUgcmVxdWlyYWJsZSBhbmQgYnVuZGxlZCB2aWEgYnJvd3NlcmlmeScsIGZ1bmN0aW9uKGFzc2VydCkge1xuICAgIGFzc2VydC5vayhsYW1lLCAndmlkZW9qcy5yZWNvcmQubGFtZWpzIGlzIHJlcXVpcmVkIHByb3Blcmx5Jyk7XG59KTtcblxuXG52YXIgbGlidm9yYmlzID0gcmVxdWlyZSgnLi4vZXM1L3BsdWdpbnMvbGlidm9yYmlzLXBsdWdpbi5qcycpO1xuXG5xLm1vZHVsZSgnQnJvd3NlcmlmeSBSZXF1aXJlIGxpYnZvcmJpcycpO1xucS50ZXN0KCdsaWJ2b3JiaXMgcGx1Z2luIHNob3VsZCBiZSByZXF1aXJhYmxlIGFuZCBidW5kbGVkIHZpYSBicm93c2VyaWZ5JywgZnVuY3Rpb24oYXNzZXJ0KSB7XG4gICAgYXNzZXJ0Lm9rKGxpYnZvcmJpcywgJ3ZpZGVvanMucmVjb3JkLmxpYnZvcmJpcyBpcyByZXF1aXJlZCBwcm9wZXJseScpO1xufSk7XG5cblxudmFyIG9wdXMgPSByZXF1aXJlKCcuLi9lczUvcGx1Z2lucy9vcHVzLXJlY29yZGVyLXBsdWdpbi5qcycpO1xuXG5xLm1vZHVsZSgnQnJvd3NlcmlmeSBSZXF1aXJlIG9wdXMtcmVjb3JkZXInKTtcbnEudGVzdCgnb3B1cy1yZWNvcmRlciBwbHVnaW4gc2hvdWxkIGJlIHJlcXVpcmFibGUgYW5kIGJ1bmRsZWQgdmlhIGJyb3dzZXJpZnknLCBmdW5jdGlvbihhc3NlcnQpIHtcbiAgICBhc3NlcnQub2sob3B1cywgJ3ZpZGVvanMucmVjb3JkLm9wdXMtcmVjb3JkZXIgaXMgcmVxdWlyZWQgcHJvcGVybHknKTtcbn0pO1xuXG5cbnZhciByZWNvcmRlcmpzID0gcmVxdWlyZSgnLi4vZXM1L3BsdWdpbnMvcmVjb3JkZXJqcy1wbHVnaW4uanMnKTtcblxucS5tb2R1bGUoJ0Jyb3dzZXJpZnkgUmVxdWlyZSByZWNvcmRlcmpzJyk7XG5xLnRlc3QoJ3JlY29yZGVyanMgcGx1Z2luIHNob3VsZCBiZSByZXF1aXJhYmxlIGFuZCBidW5kbGVkIHZpYSBicm93c2VyaWZ5JywgZnVuY3Rpb24oYXNzZXJ0KSB7XG4gICAgYXNzZXJ0Lm9rKHJlY29yZGVyanMsICd2aWRlb2pzLnJlY29yZC5yZWNvcmRlcmpzIGlzIHJlcXVpcmVkIHByb3Blcmx5Jyk7XG59KTtcbiJdfQ==
