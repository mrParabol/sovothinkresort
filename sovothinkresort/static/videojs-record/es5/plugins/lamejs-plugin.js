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