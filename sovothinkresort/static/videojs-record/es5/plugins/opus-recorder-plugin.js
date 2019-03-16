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