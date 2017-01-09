'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _desc, _value, _class2, _class3, _temp; // Copyright (c) 2015 Uber Technologies, Inc.

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _autobindDecorator = require('autobind-decorator');

var _autobindDecorator2 = _interopRequireDefault(_autobindDecorator);

var _pureRenderDecorator = require('pure-render-decorator');

var _pureRenderDecorator2 = _interopRequireDefault(_pureRenderDecorator);

var _dist = require('mapbox-gl/dist');

var _dist2 = _interopRequireDefault(_dist);

var _d3Selection = require('d3-selection');

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

var _mapInteractions = require('./map-interactions.react');

var _mapInteractions2 = _interopRequireDefault(_mapInteractions);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _styleUtils = require('./utils/style-utils');

var _diffStyles2 = require('./utils/diff-styles');

var _diffStyles3 = _interopRequireDefault(_diffStyles2);

var _transform = require('./utils/transform');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}

function noop() {}

// Note: Max pitch is a hard coded value (not a named constant) in transform.js
var MAX_PITCH = 60;
var PITCH_MOUSE_THRESHOLD = 20;
var PITCH_ACCEL = 1.2;

var PROP_TYPES = {
  /**
    * The latitude of the center of the map.
    */
  latitude: _react.PropTypes.number.isRequired,
  /**
    * The longitude of the center of the map.
    */
  longitude: _react.PropTypes.number.isRequired,
  /**
    * The tile zoom level of the map.
    */
  zoom: _react.PropTypes.number.isRequired,
  /**
    * The maximum tile zoom level of the map. Defaults to 20.
    * Increasing this will allow you to zoom further into the map but should
    * only be used if you know what you are doing past zoom 20. The default
    * map styles won't render anything useful past 20.
    */
  maxZoom: _react.PropTypes.number,
  /**
    * The Mapbox style the component should use. Can either be a string url
    * or a MapboxGL style Immutable.Map object.
    */
  mapStyle: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.instanceOf(_immutable2.default.Map)]),
  /**
    * The Mapbox API access token to provide to mapbox-gl-js. This is required
    * when using Mapbox provided vector tiles and styles.
    */
  mapboxApiAccessToken: _react.PropTypes.string,
  /**
    * `onChangeViewport` callback is fired when the user interacted with the
    * map. The object passed to the callback contains `latitude`,
    * `longitude` and `zoom` and additional state information.
    */
  onChangeViewport: _react.PropTypes.func,
  /**
    * The width of the map.
    */
  width: _react.PropTypes.number.isRequired,
  /**
    * The height of the map.
    */
  height: _react.PropTypes.number.isRequired,
  /**
    * Is the component currently being dragged. This is used to show/hide the
    * drag cursor. Also used as an optimization in some overlays by preventing
    * rendering while dragging.
    */
  isDragging: _react.PropTypes.bool,
  /**
    * Required to calculate the mouse projection after the first click event
    * during dragging. Where the map is depends on where you first clicked on
    * the map.
    */
  startDragLngLat: _react.PropTypes.array,
  /**
    * Called when a feature is hovered over. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    * If no interactive layers are found (e.g. using Mapbox's default styles),
    * will fall back to query all layers.
    * @callback
    * @param {array} features - The array of features the mouse is over.
    */
  onHoverFeatures: _react.PropTypes.func,
  /**
    * Defaults to TRUE
    * Set to false to enable onHoverFeatures to be called regardless if
    * there is an actual feature at x, y. This is useful to emulate
    * "mouse-out" behaviors on features.
    */
  ignoreEmptyFeatures: _react.PropTypes.bool,

  /**
    * Show attribution control or not.
    */
  attributionControl: _react.PropTypes.bool,

  /**
   * Called when the map is clicked. The handler is called with the clicked
   * coordinates (https://www.mapbox.com/mapbox-gl-js/api/#LngLat) and the
   * screen coordinates (https://www.mapbox.com/mapbox-gl-js/api/#PointLike).
   */
  onClick: _react.PropTypes.func,

  /**
    * Called when a feature is clicked on. Uses Mapbox's
    * queryRenderedFeatures API to find features under the pointer:
    * https://www.mapbox.com/mapbox-gl-js/api/#Map#queryRenderedFeatures
    * To query only some of the layers, set the `interactive` property in the
    * layer style to `true`. See Mapbox's style spec
    * https://www.mapbox.com/mapbox-gl-style-spec/#layer-interactive
    * If no interactive layers are found (e.g. using Mapbox's default styles),
    * will fall back to query all layers.
    */
  onClickFeatures: _react.PropTypes.func,

  /**
    * Radius to detect features around a clicked point. Defaults to 15.
    */
  clickRadius: _react.PropTypes.number,

  /**
    * Passed to Mapbox Map constructor which passes it to the canvas context.
    * This is unseful when you want to export the canvas as a PNG.
    */
  preserveDrawingBuffer: _react.PropTypes.bool,

  /**
    * There are still known issues with style diffing. As a temporary stopgap,
    * add the option to prevent style diffing.
    */
  preventStyleDiffing: _react.PropTypes.bool,

  /**
    * Enables perspective control event handling
    */
  perspectiveEnabled: _react.PropTypes.bool,

  /**
    * Specify the bearing of the viewport
    */
  bearing: _react.PropTypes.number,

  /**
    * Specify the pitch of the viewport
    */
  pitch: _react.PropTypes.number,

  /**
    * Specify the altitude of the viewport camera
    * Unit: map heights, default 1.5
    * Non-public API, see https://github.com/mapbox/mapbox-gl-js/issues/1137
    */
  altitude: _react.PropTypes.number,

  /**
    * The load callback is called when all dependencies have been loaded and
    * the map is ready.
    */
  onLoad: _react.PropTypes.func

};

var DEFAULT_PROPS = {
  mapStyle: 'mapbox://styles/mapbox/light-v9',
  onChangeViewport: null,
  mapboxApiAccessToken: _config2.default.DEFAULTS.MAPBOX_API_ACCESS_TOKEN,
  preserveDrawingBuffer: false,
  attributionControl: true,
  ignoreEmptyFeatures: true,
  bearing: 0,
  pitch: 0,
  altitude: 1.5,
  clickRadius: 15,
  maxZoom: 20
};

var MapGL = (0, _pureRenderDecorator2.default)(_class = (_class2 = (_temp = _class3 = function (_Component) {
  _inherits(MapGL, _Component);

  _createClass(MapGL, null, [{
    key: 'supported',
    value: function supported() {
      return _dist2.default.supported();
    }
  }]);

  function MapGL(props) {
    _classCallCheck(this, MapGL);

    var _this = _possibleConstructorReturn(this, (MapGL.__proto__ || Object.getPrototypeOf(MapGL)).call(this, props));

    _this.state = {
      isSupported: _dist2.default.supported(),
      isDragging: false,
      isHovering: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    };
    _this._queryParams = {};
    _dist2.default.accessToken = props.mapboxApiAccessToken;

    if (!_this.state.isSupported) {
      _this.componentDidMount = noop;
      _this.componentWillReceiveProps = noop;
      _this.componentDidUpdate = noop;
    }
    return _this;
  }

  _createClass(MapGL, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var mapStyle = _immutable2.default.Map.isMap(this.props.mapStyle) ? this.props.mapStyle.toJS() : this.props.mapStyle;

      var map = new _dist2.default.Map({
        container: this.refs.mapboxMap,
        center: [this.props.longitude, this.props.latitude],
        zoom: this.props.zoom,
        maxZoom: this.props.maxZoom,
        pitch: this.props.pitch,
        bearing: this.props.bearing,
        style: mapStyle,
        interactive: false,
        preserveDrawingBuffer: this.props.preserveDrawingBuffer
        // TODO?
        // attributionControl: this.props.attributionControl
      });

      if (this.props.onLoad) {
        map.once('load', function () {
          return _this2.props.onLoad();
        });
      }

      (0, _d3Selection.select)(map.getCanvas()).style('outline', 'none');

      this._map = map;
      this._updateMapViewport({}, this.props);
      this._callOnChangeViewport(map.transform);
      this._updateQueryParams(mapStyle);
    }

    // New props are comin' round the corner!

  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(newProps) {
      this._updateStateFromProps(this.props, newProps);
      this._updateMapViewport(this.props, newProps);
      this._updateMapStyle(this.props, newProps);
      // Save width/height so that we can check them in componentDidUpdate
      this.setState({
        width: this.props.width,
        height: this.props.height
      });
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      // map.resize() reads size from DOM, we need to call after render
      this._updateMapSize(this.state, this.props);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._map) {
        this._map.remove();
      }
    }

    // External apps can access map this way

  }, {
    key: '_getMap',
    value: function _getMap() {
      return this._map;
    }

    // Calculate a cursor style

  }, {
    key: '_getCursor',
    value: function _getCursor() {
      var isInteractive = this.props.onChangeViewport || this.props.onClickFeature || this.props.onHoverFeatures;
      if (isInteractive) {
        return this.props.isDragging ? _config2.default.CURSOR.GRABBING : this.state.isHovering ? _config2.default.CURSOR.POINTER : _config2.default.CURSOR.GRAB;
      }
      return 'inherit';
    }
  }, {
    key: '_updateStateFromProps',
    value: function _updateStateFromProps(oldProps, newProps) {
      _dist2.default.accessToken = newProps.mapboxApiAccessToken;
      this.setState({
        startDragLngLat: newProps.startDragLngLat
      });
    }

    // Hover and click only query layers whose interactive property is true
    // If no interactivity is specified, query all layers

  }, {
    key: '_updateQueryParams',
    value: function _updateQueryParams(mapStyle) {
      var interactiveLayerIds = (0, _styleUtils.getInteractiveLayerIds)(mapStyle);
      this._queryParams = interactiveLayerIds.length === 0 ? {} : { layers: interactiveLayerIds };
    }

    // Update a source in the map style

  }, {
    key: '_updateSource',
    value: function _updateSource(map, update) {
      var newSource = update.source.toJS();
      if (newSource.type === 'geojson') {
        var oldSource = map.getSource(update.id);
        if (oldSource.type === 'geojson') {
          // update data if no other GeoJSONSource options were changed
          var oldOpts = oldSource.workerOptions;
          if ((newSource.maxzoom === undefined || newSource.maxzoom === oldOpts.geojsonVtOptions.maxZoom) && (newSource.buffer === undefined || newSource.buffer === oldOpts.geojsonVtOptions.buffer) && (newSource.tolerance === undefined || newSource.tolerance === oldOpts.geojsonVtOptions.tolerance) && (newSource.cluster === undefined || newSource.cluster === oldOpts.cluster) && (newSource.clusterRadius === undefined || newSource.clusterRadius === oldOpts.superclusterOptions.radius) && (newSource.clusterMaxZoom === undefined || newSource.clusterMaxZoom === oldOpts.superclusterOptions.maxZoom)) {
            oldSource.setData(newSource.data);
            return;
          }
        }
      }

      map.removeSource(update.id);
      map.addSource(update.id, newSource);
    }

    // Individually update the maps source and layers that have changed if all
    // other style props haven't changed. This prevents flicking of the map when
    // styles only change sources or layers.
    /* eslint-disable max-statements, complexity */

  }, {
    key: '_setDiffStyle',
    value: function _setDiffStyle(prevStyle, nextStyle) {
      var prevKeysMap = prevStyle && styleKeysMap(prevStyle) || {};
      var nextKeysMap = styleKeysMap(nextStyle);
      function styleKeysMap(style) {
        return style.map(function () {
          return true;
        }).delete('layers').delete('sources').toJS();
      }
      function propsOtherThanLayersOrSourcesDiffer() {
        var prevKeysList = Object.keys(prevKeysMap);
        var nextKeysList = Object.keys(nextKeysMap);
        if (prevKeysList.length !== nextKeysList.length) {
          return true;
        }
        // `nextStyle` and `prevStyle` should not have the same set of props.
        if (nextKeysList.some(function (key) {
          return prevStyle.get(key) !== nextStyle.get(key);
        }
        // But the value of one of those props is different.
        )) {
          return true;
        }
        return false;
      }

      var map = this._map;

      if (!prevStyle || propsOtherThanLayersOrSourcesDiffer()) {
        map.setStyle(nextStyle.toJS());
        return;
      }

      var _diffStyles = (0, _diffStyles3.default)(prevStyle, nextStyle),
          sourcesDiff = _diffStyles.sourcesDiff,
          layersDiff = _diffStyles.layersDiff;

      // TODO: It's rather difficult to determine style diffing in the presence
      // of refs. For now, if any style update has a ref, fallback to no diffing.
      // We can come back to this case if there's a solid usecase.


      if (layersDiff.updates.some(function (node) {
        return node.layer.get('ref');
      })) {
        map.setStyle(nextStyle.toJS());
        return;
      }

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = sourcesDiff.enter[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var enter = _step.value;

          map.addSource(enter.id, enter.source.toJS());
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = sourcesDiff.update[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var update = _step2.value;

          this._updateSource(map, update);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = sourcesDiff.exit[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          var exit = _step3.value;

          map.removeSource(exit.id);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3.return) {
            _iterator3.return();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }

      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (var _iterator4 = layersDiff.exiting[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
          var _exit = _step4.value;

          if (map.style.getLayer(_exit.id)) {
            map.removeLayer(_exit.id);
          }
        }
      } catch (err) {
        _didIteratorError4 = true;
        _iteratorError4 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion4 && _iterator4.return) {
            _iterator4.return();
          }
        } finally {
          if (_didIteratorError4) {
            throw _iteratorError4;
          }
        }
      }

      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (var _iterator5 = layersDiff.updates[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
          var _update = _step5.value;

          if (!_update.enter) {
            // This is an old layer that needs to be updated. Remove the old layer
            // with the same id and add it back again.
            map.removeLayer(_update.id);
          }
          map.addLayer(_update.layer.toJS(), _update.before);
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5.return) {
            _iterator5.return();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }
    }
    /* eslint-enable max-statements, complexity */

  }, {
    key: '_updateMapStyle',
    value: function _updateMapStyle(oldProps, newProps) {
      var mapStyle = newProps.mapStyle;
      var oldMapStyle = oldProps.mapStyle;
      if (mapStyle !== oldMapStyle) {
        if (_immutable2.default.Map.isMap(mapStyle)) {
          if (this.props.preventStyleDiffing) {
            this._map.setStyle(mapStyle.toJS());
          } else {
            this._setDiffStyle(oldMapStyle, mapStyle);
          }
        } else {
          this._map.setStyle(mapStyle);
        }
        this._updateQueryParams(mapStyle);
      }
    }
  }, {
    key: '_updateMapViewport',
    value: function _updateMapViewport(oldProps, newProps) {
      var viewportChanged = newProps.latitude !== oldProps.latitude || newProps.longitude !== oldProps.longitude || newProps.zoom !== oldProps.zoom || newProps.pitch !== oldProps.pitch || newProps.zoom !== oldProps.bearing || newProps.altitude !== oldProps.altitude;

      if (viewportChanged) {
        this._map.jumpTo({
          center: [newProps.longitude, newProps.latitude],
          zoom: newProps.zoom,
          bearing: newProps.bearing,
          pitch: newProps.pitch
        });

        // TODO - jumpTo doesn't handle altitude
        if (newProps.altitude !== oldProps.altitude) {
          this._map.transform.altitude = newProps.altitude;
        }
      }
    }

    // Note: needs to be called after render (e.g. in componentDidUpdate)

  }, {
    key: '_updateMapSize',
    value: function _updateMapSize(oldProps, newProps) {
      var sizeChanged = oldProps.width !== newProps.width || oldProps.height !== newProps.height;

      if (sizeChanged) {
        this._map.resize();
        this._callOnChangeViewport(this._map.transform);
      }
    }

    // Calculates a new pitch and bearing from a position (coming from an event)

  }, {
    key: '_calculateNewPitchAndBearing',
    value: function _calculateNewPitchAndBearing(_ref) {
      var pos = _ref.pos,
          startPos = _ref.startPos,
          startBearing = _ref.startBearing,
          startPitch = _ref.startPitch;

      var xDelta = pos[0] - startPos[0];
      var bearing = startBearing + 180 * xDelta / this.props.width;

      var pitch = startPitch;
      var yDelta = pos[1] - startPos[1];
      if (yDelta > 0) {
        // Dragging downwards, gradually decrease pitch
        if (Math.abs(this.props.height - startPos[1]) > PITCH_MOUSE_THRESHOLD) {
          var scale = yDelta / (this.props.height - startPos[1]);
          pitch = (1 - scale) * PITCH_ACCEL * startPitch;
        }
      } else if (yDelta < 0) {
        // Dragging upwards, gradually increase pitch
        if (startPos.y > PITCH_MOUSE_THRESHOLD) {
          // Move from 0 to 1 as we drag upwards
          var yScale = 1 - pos[1] / startPos[1];
          // Gradually add until we hit max pitch
          pitch = startPitch + yScale * (MAX_PITCH - startPitch);
        }
      }

      // console.debug(startPitch, pitch);
      return {
        pitch: Math.max(Math.min(pitch, MAX_PITCH), 0),
        bearing: bearing
      };
    }

    // Helper to call props.onChangeViewport

  }, {
    key: '_callOnChangeViewport',
    value: function _callOnChangeViewport(transform) {
      var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (this.props.onChangeViewport) {
        this.props.onChangeViewport(_extends({
          latitude: transform.center.lat,
          longitude: (0, _transform.mod)(transform.center.lng + 180, 360) - 180,
          zoom: transform.zoom,
          pitch: transform.pitch,
          bearing: (0, _transform.mod)(transform.bearing + 180, 360) - 180,

          isDragging: this.props.isDragging,
          startDragLngLat: this.props.startDragLngLat,
          startBearing: this.props.startBearing,
          startPitch: this.props.startPitch

        }, opts));
      }
    }
  }, {
    key: '_onTouchStart',
    value: function _onTouchStart(opts) {
      this._onMouseDown(opts);
    }
  }, {
    key: '_onTouchDrag',
    value: function _onTouchDrag(opts) {
      this._onMouseDrag(opts);
    }
  }, {
    key: '_onTouchRotate',
    value: function _onTouchRotate(opts) {
      this._onMouseRotate(opts);
    }
  }, {
    key: '_onTouchEnd',
    value: function _onTouchEnd(opts) {
      this._onMouseUp(opts);
    }
  }, {
    key: '_onTouchTap',
    value: function _onTouchTap(opts) {
      this._onMouseClick(opts);
    }
  }, {
    key: '_onMouseDown',
    value: function _onMouseDown(_ref2) {
      var pos = _ref2.pos;
      var transform = this._map.transform;

      var _unprojectFromTransfo = (0, _transform.unprojectFromTransform)(transform, new (Function.prototype.bind.apply(_dist.Point, [null].concat(_toConsumableArray(pos))))()),
          lng = _unprojectFromTransfo.lng,
          lat = _unprojectFromTransfo.lat;

      this._callOnChangeViewport(transform, {
        isDragging: true,
        startDragLngLat: [lng, lat],
        startBearing: transform.bearing,
        startPitch: transform.pitch
      });
    }
  }, {
    key: '_onMouseDrag',
    value: function _onMouseDrag(_ref3) {
      var pos = _ref3.pos;

      if (!this.props.onChangeViewport) {
        return;
      }

      // take the start lnglat and put it where the mouse is down.
      (0, _assert2.default)(this.props.startDragLngLat, '`startDragLngLat` prop is required ' + 'for mouse drag behavior to calculate where to position the map.');

      var transform = (0, _transform.cloneTransform)(this._map.transform);

      var _props$startDragLngLa = _slicedToArray(this.props.startDragLngLat, 2),
          lng = _props$startDragLngLa[0],
          lat = _props$startDragLngLa[1];

      transform.setLocationAtPoint({ lng: lng, lat: lat }, new (Function.prototype.bind.apply(_dist.Point, [null].concat(_toConsumableArray(pos))))());
      this._callOnChangeViewport(transform, { isDragging: true });
    }
  }, {
    key: '_onMouseRotate',
    value: function _onMouseRotate(_ref4) {
      var pos = _ref4.pos,
          startPos = _ref4.startPos;

      if (!this.props.onChangeViewport || !this.props.perspectiveEnabled) {
        return;
      }

      var _props = this.props,
          startBearing = _props.startBearing,
          startPitch = _props.startPitch;

      (0, _assert2.default)(typeof startBearing === 'number', '`startBearing` prop is required for mouse rotate behavior');
      (0, _assert2.default)(typeof startPitch === 'number', '`startPitch` prop is required for mouse rotate behavior');

      var _calculateNewPitchAnd = this._calculateNewPitchAndBearing({
        pos: pos,
        startPos: startPos,
        startBearing: startBearing,
        startPitch: startPitch
      }),
          pitch = _calculateNewPitchAnd.pitch,
          bearing = _calculateNewPitchAnd.bearing;

      var transform = (0, _transform.cloneTransform)(this._map.transform);
      transform.bearing = bearing;
      transform.pitch = pitch;

      this._callOnChangeViewport(transform, { isDragging: true });
    }
  }, {
    key: '_onMouseMove',
    value: function _onMouseMove(_ref5) {
      var pos = _ref5.pos;

      if (!this.props.onHoverFeatures) {
        return;
      }
      var features = this._map.queryRenderedFeatures(new (Function.prototype.bind.apply(_dist.Point, [null].concat(_toConsumableArray(pos))))(), this._queryParams);
      if (!features.length && this.props.ignoreEmptyFeatures) {
        return;
      }
      this.setState({ isHovering: features.length > 0 });
      this.props.onHoverFeatures(features);
    }
  }, {
    key: '_onMouseUp',
    value: function _onMouseUp(opt) {
      this._callOnChangeViewport(this._map.transform, {
        isDragging: false,
        startDragLngLat: null,
        startBearing: null,
        startPitch: null
      });
    }
  }, {
    key: '_onMouseClick',
    value: function _onMouseClick(_ref6) {
      var pos = _ref6.pos;

      if (!this.props.onClickFeatures && !this.props.onClick) {
        return;
      }

      if (this.props.onClick) {
        var point = new (Function.prototype.bind.apply(_dist.Point, [null].concat(_toConsumableArray(pos))))();
        var latLong = this._map.unproject(point);
        // TODO - Do we really want to expose a mapbox "Point" in our interface?
        this.props.onClick(latLong, point);
      }

      if (this.props.onClickFeatures) {
        // Radius enables point features, like marker symbols, to be clicked.
        var size = this.props.clickRadius;
        var bbox = [[pos[0] - size, pos[1] - size], [pos[0] + size, pos[1] + size]];
        var features = this._map.queryRenderedFeatures(bbox, this._queryParams);
        if (!features.length && this.props.ignoreEmptyFeatures) {
          return;
        }
        this.props.onClickFeatures(features);
      }
    }
  }, {
    key: '_onZoom',
    value: function _onZoom(_ref7) {
      var pos = _ref7.pos,
          scale = _ref7.scale;

      var point = new (Function.prototype.bind.apply(_dist.Point, [null].concat(_toConsumableArray(pos))))();
      var transform = (0, _transform.cloneTransform)(this._map.transform);
      var around = (0, _transform.unprojectFromTransform)(transform, point);
      transform.zoom = transform.scaleZoom(this._map.transform.scale * scale);
      transform.setLocationAtPoint(around, point);
      this._callOnChangeViewport(transform, { isDragging: true });
    }
  }, {
    key: '_onZoomEnd',
    value: function _onZoomEnd() {
      this._callOnChangeViewport(this._map.transform, { isDragging: false });
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props,
          className = _props2.className,
          width = _props2.width,
          height = _props2.height,
          style = _props2.style;

      var mapStyle = _extends({}, style, {
        width: width,
        height: height,
        cursor: this._getCursor()
      });

      var content = [_react2.default.createElement('div', { key: 'map', ref: 'mapboxMap',
        style: mapStyle, className: className }), _react2.default.createElement(
        'div',
        { key: 'overlays', className: 'overlays',
          style: { position: 'absolute', left: 0, top: 0 } },
        this.props.children
      )];

      if (this.state.isSupported && this.props.onChangeViewport) {
        content = _react2.default.createElement(
          _mapInteractions2.default,
          {
            onMouseDown: this._onMouseDown,
            onMouseDrag: this._onMouseDrag,
            onMouseRotate: this._onMouseRotate,
            onMouseUp: this._onMouseUp,
            onMouseMove: this._onMouseMove,
            onMouseClick: this._onMouseClick,
            onTouchStart: this._onTouchStart,
            onTouchDrag: this._onTouchDrag,
            onTouchRotate: this._onTouchRotate,
            onTouchEnd: this._onTouchEnd,
            onTouchTap: this._onTouchTap,
            onZoom: this._onZoom,
            onZoomEnd: this._onZoomEnd,
            width: this.props.width,
            height: this.props.height },
          content
        );
      }

      return _react2.default.createElement(
        'div',
        {
          style: _extends({}, this.props.style, {
            width: this.props.width,
            height: this.props.height,
            position: 'relative'
          }) },
        content
      );
    }
  }]);

  return MapGL;
}(_react.Component), _class3.propTypes = PROP_TYPES, _class3.defaultProps = DEFAULT_PROPS, _temp), (_applyDecoratedDescriptor(_class2.prototype, '_onTouchStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchStart'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchDrag'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchRotate', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchRotate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchEnd'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onTouchTap', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onTouchTap'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseDown', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseDown'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseDrag'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseRotate', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseRotate'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseMove', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseMove'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseUp', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseUp'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onMouseClick', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onMouseClick'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onZoom', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onZoom'), _class2.prototype), _applyDecoratedDescriptor(_class2.prototype, '_onZoomEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class2.prototype, '_onZoomEnd'), _class2.prototype)), _class2)) || _class;

exports.default = MapGL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXAucmVhY3QuanMiXSwibmFtZXMiOlsibm9vcCIsIk1BWF9QSVRDSCIsIlBJVENIX01PVVNFX1RIUkVTSE9MRCIsIlBJVENIX0FDQ0VMIiwiUFJPUF9UWVBFUyIsImxhdGl0dWRlIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImxvbmdpdHVkZSIsInpvb20iLCJtYXhab29tIiwibWFwU3R5bGUiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJpbnN0YW5jZU9mIiwiTWFwIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJvbkNoYW5nZVZpZXdwb3J0IiwiZnVuYyIsIndpZHRoIiwiaGVpZ2h0IiwiaXNEcmFnZ2luZyIsImJvb2wiLCJzdGFydERyYWdMbmdMYXQiLCJhcnJheSIsIm9uSG92ZXJGZWF0dXJlcyIsImlnbm9yZUVtcHR5RmVhdHVyZXMiLCJhdHRyaWJ1dGlvbkNvbnRyb2wiLCJvbkNsaWNrIiwib25DbGlja0ZlYXR1cmVzIiwiY2xpY2tSYWRpdXMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJwcmV2ZW50U3R5bGVEaWZmaW5nIiwicGVyc3BlY3RpdmVFbmFibGVkIiwiYmVhcmluZyIsInBpdGNoIiwiYWx0aXR1ZGUiLCJvbkxvYWQiLCJERUZBVUxUX1BST1BTIiwiREVGQVVMVFMiLCJNQVBCT1hfQVBJX0FDQ0VTU19UT0tFTiIsIk1hcEdMIiwic3VwcG9ydGVkIiwicHJvcHMiLCJzdGF0ZSIsImlzU3VwcG9ydGVkIiwiaXNIb3ZlcmluZyIsInN0YXJ0QmVhcmluZyIsInN0YXJ0UGl0Y2giLCJfcXVlcnlQYXJhbXMiLCJhY2Nlc3NUb2tlbiIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImNvbXBvbmVudERpZFVwZGF0ZSIsImlzTWFwIiwidG9KUyIsIm1hcCIsImNvbnRhaW5lciIsInJlZnMiLCJtYXBib3hNYXAiLCJjZW50ZXIiLCJzdHlsZSIsImludGVyYWN0aXZlIiwib25jZSIsImdldENhbnZhcyIsIl9tYXAiLCJfdXBkYXRlTWFwVmlld3BvcnQiLCJfY2FsbE9uQ2hhbmdlVmlld3BvcnQiLCJ0cmFuc2Zvcm0iLCJfdXBkYXRlUXVlcnlQYXJhbXMiLCJuZXdQcm9wcyIsIl91cGRhdGVTdGF0ZUZyb21Qcm9wcyIsIl91cGRhdGVNYXBTdHlsZSIsInNldFN0YXRlIiwiX3VwZGF0ZU1hcFNpemUiLCJyZW1vdmUiLCJpc0ludGVyYWN0aXZlIiwib25DbGlja0ZlYXR1cmUiLCJDVVJTT1IiLCJHUkFCQklORyIsIlBPSU5URVIiLCJHUkFCIiwib2xkUHJvcHMiLCJpbnRlcmFjdGl2ZUxheWVySWRzIiwibGVuZ3RoIiwibGF5ZXJzIiwidXBkYXRlIiwibmV3U291cmNlIiwic291cmNlIiwidHlwZSIsIm9sZFNvdXJjZSIsImdldFNvdXJjZSIsImlkIiwib2xkT3B0cyIsIndvcmtlck9wdGlvbnMiLCJtYXh6b29tIiwidW5kZWZpbmVkIiwiZ2VvanNvblZ0T3B0aW9ucyIsImJ1ZmZlciIsInRvbGVyYW5jZSIsImNsdXN0ZXIiLCJjbHVzdGVyUmFkaXVzIiwic3VwZXJjbHVzdGVyT3B0aW9ucyIsInJhZGl1cyIsImNsdXN0ZXJNYXhab29tIiwic2V0RGF0YSIsImRhdGEiLCJyZW1vdmVTb3VyY2UiLCJhZGRTb3VyY2UiLCJwcmV2U3R5bGUiLCJuZXh0U3R5bGUiLCJwcmV2S2V5c01hcCIsInN0eWxlS2V5c01hcCIsIm5leHRLZXlzTWFwIiwiZGVsZXRlIiwicHJvcHNPdGhlclRoYW5MYXllcnNPclNvdXJjZXNEaWZmZXIiLCJwcmV2S2V5c0xpc3QiLCJPYmplY3QiLCJrZXlzIiwibmV4dEtleXNMaXN0Iiwic29tZSIsImdldCIsImtleSIsInNldFN0eWxlIiwic291cmNlc0RpZmYiLCJsYXllcnNEaWZmIiwidXBkYXRlcyIsIm5vZGUiLCJsYXllciIsImVudGVyIiwiX3VwZGF0ZVNvdXJjZSIsImV4aXQiLCJleGl0aW5nIiwiZ2V0TGF5ZXIiLCJyZW1vdmVMYXllciIsImFkZExheWVyIiwiYmVmb3JlIiwib2xkTWFwU3R5bGUiLCJfc2V0RGlmZlN0eWxlIiwidmlld3BvcnRDaGFuZ2VkIiwianVtcFRvIiwic2l6ZUNoYW5nZWQiLCJyZXNpemUiLCJwb3MiLCJzdGFydFBvcyIsInhEZWx0YSIsInlEZWx0YSIsIk1hdGgiLCJhYnMiLCJzY2FsZSIsInkiLCJ5U2NhbGUiLCJtYXgiLCJtaW4iLCJvcHRzIiwibGF0IiwibG5nIiwiX29uTW91c2VEb3duIiwiX29uTW91c2VEcmFnIiwiX29uTW91c2VSb3RhdGUiLCJfb25Nb3VzZVVwIiwiX29uTW91c2VDbGljayIsInNldExvY2F0aW9uQXRQb2ludCIsIl9jYWxjdWxhdGVOZXdQaXRjaEFuZEJlYXJpbmciLCJmZWF0dXJlcyIsInF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyIsIm9wdCIsInBvaW50IiwibGF0TG9uZyIsInVucHJvamVjdCIsInNpemUiLCJiYm94IiwiYXJvdW5kIiwic2NhbGVab29tIiwiY2xhc3NOYW1lIiwiY3Vyc29yIiwiX2dldEN1cnNvciIsImNvbnRlbnQiLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJjaGlsZHJlbiIsIl9vbk1vdXNlTW92ZSIsIl9vblRvdWNoU3RhcnQiLCJfb25Ub3VjaERyYWciLCJfb25Ub3VjaFJvdGF0ZSIsIl9vblRvdWNoRW5kIiwiX29uVG91Y2hUYXAiLCJfb25ab29tIiwiX29uWm9vbUVuZCIsInByb3BUeXBlcyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztvREFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxHQUFnQixDQUFF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S3dCLEtBQUwsQ0FBV3hCLEtBRnBCO0FBR0VDLG9CQUFRLEtBQUt1QixLQUFMLENBQVd2QixNQUhyQjtBQUlFOEosc0JBQVU7QUFKWixZQURGO0FBUUlEO0FBUkosT0FERjtBQWFEOzs7OzZCQWxmTWEsUyxHQUFZMUwsVSxVQUNaMkwsWSxHQUFlekosYTs7a0JBUEhHLEsiLCJmaWxlIjoibWFwLnJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE1IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG5cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXV0b2JpbmQgZnJvbSAnYXV0b2JpbmQtZGVjb3JhdG9yJztcbmltcG9ydCBwdXJlUmVuZGVyIGZyb20gJ3B1cmUtcmVuZGVyLWRlY29yYXRvcic7XG5cbmltcG9ydCBtYXBib3hnbCwge1BvaW50fSBmcm9tICdtYXBib3gtZ2wvZGlzdCc7XG5pbXBvcnQge3NlbGVjdH0gZnJvbSAnZDMtc2VsZWN0aW9uJztcbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcbmltcG9ydCBhc3NlcnQgZnJvbSAnYXNzZXJ0JztcblxuaW1wb3J0IE1hcEludGVyYWN0aW9ucyBmcm9tICcuL21hcC1pbnRlcmFjdGlvbnMucmVhY3QnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuL2NvbmZpZyc7XG5cbmltcG9ydCB7Z2V0SW50ZXJhY3RpdmVMYXllcklkc30gZnJvbSAnLi91dGlscy9zdHlsZS11dGlscyc7XG5pbXBvcnQgZGlmZlN0eWxlcyBmcm9tICcuL3V0aWxzL2RpZmYtc3R5bGVzJztcbmltcG9ydCB7bW9kLCB1bnByb2plY3RGcm9tVHJhbnNmb3JtLCBjbG9uZVRyYW5zZm9ybX0gZnJvbSAnLi91dGlscy90cmFuc2Zvcm0nO1xuXG5mdW5jdGlvbiBub29wKCkge31cblxuLy8gTm90ZTogTWF4IHBpdGNoIGlzIGEgaGFyZCBjb2RlZCB2YWx1ZSAobm90IGEgbmFtZWQgY29uc3RhbnQpIGluIHRyYW5zZm9ybS5qc1xuY29uc3QgTUFYX1BJVENIID0gNjA7XG5jb25zdCBQSVRDSF9NT1VTRV9USFJFU0hPTEQgPSAyMDtcbmNvbnN0IFBJVENIX0FDQ0VMID0gMS4yO1xuXG5jb25zdCBQUk9QX1RZUEVTID0ge1xuICAvKipcbiAgICAqIFRoZSBsYXRpdHVkZSBvZiB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgKi9cbiAgbGF0aXR1ZGU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgLyoqXG4gICAgKiBUaGUgbG9uZ2l0dWRlIG9mIHRoZSBjZW50ZXIgb2YgdGhlIG1hcC5cbiAgICAqL1xuICBsb25naXR1ZGU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgLyoqXG4gICAgKiBUaGUgdGlsZSB6b29tIGxldmVsIG9mIHRoZSBtYXAuXG4gICAgKi9cbiAgem9vbTogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAvKipcbiAgICAqIFRoZSBtYXhpbXVtIHRpbGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLiBEZWZhdWx0cyB0byAyMC5cbiAgICAqIEluY3JlYXNpbmcgdGhpcyB3aWxsIGFsbG93IHlvdSB0byB6b29tIGZ1cnRoZXIgaW50byB0aGUgbWFwIGJ1dCBzaG91bGRcbiAgICAqIG9ubHkgYmUgdXNlZCBpZiB5b3Uga25vdyB3aGF0IHlvdSBhcmUgZG9pbmcgcGFzdCB6b29tIDIwLiBUaGUgZGVmYXVsdFxuICAgICogbWFwIHN0eWxlcyB3b24ndCByZW5kZXIgYW55dGhpbmcgdXNlZnVsIHBhc3QgMjAuXG4gICAgKi9cbiAgbWF4Wm9vbTogUHJvcFR5cGVzLm51bWJlcixcbiAgLyoqXG4gICAgKiBUaGUgTWFwYm94IHN0eWxlIHRoZSBjb21wb25lbnQgc2hvdWxkIHVzZS4gQ2FuIGVpdGhlciBiZSBhIHN0cmluZyB1cmxcbiAgICAqIG9yIGEgTWFwYm94R0wgc3R5bGUgSW1tdXRhYmxlLk1hcCBvYmplY3QuXG4gICAgKi9cbiAgbWFwU3R5bGU6IFByb3BUeXBlcy5vbmVPZlR5cGUoW1xuICAgIFByb3BUeXBlcy5zdHJpbmcsXG4gICAgUHJvcFR5cGVzLmluc3RhbmNlT2YoSW1tdXRhYmxlLk1hcClcbiAgXSksXG4gIC8qKlxuICAgICogVGhlIE1hcGJveCBBUEkgYWNjZXNzIHRva2VuIHRvIHByb3ZpZGUgdG8gbWFwYm94LWdsLWpzLiBUaGlzIGlzIHJlcXVpcmVkXG4gICAgKiB3aGVuIHVzaW5nIE1hcGJveCBwcm92aWRlZCB2ZWN0b3IgdGlsZXMgYW5kIHN0eWxlcy5cbiAgICAqL1xuICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogUHJvcFR5cGVzLnN0cmluZyxcbiAgLyoqXG4gICAgKiBgb25DaGFuZ2VWaWV3cG9ydGAgY2FsbGJhY2sgaXMgZmlyZWQgd2hlbiB0aGUgdXNlciBpbnRlcmFjdGVkIHdpdGggdGhlXG4gICAgKiBtYXAuIFRoZSBvYmplY3QgcGFzc2VkIHRvIHRoZSBjYWxsYmFjayBjb250YWlucyBgbGF0aXR1ZGVgLFxuICAgICogYGxvbmdpdHVkZWAgYW5kIGB6b29tYCBhbmQgYWRkaXRpb25hbCBzdGF0ZSBpbmZvcm1hdGlvbi5cbiAgICAqL1xuICBvbkNoYW5nZVZpZXdwb3J0OiBQcm9wVHlwZXMuZnVuYyxcbiAgLyoqXG4gICAgKiBUaGUgd2lkdGggb2YgdGhlIG1hcC5cbiAgICAqL1xuICB3aWR0aDogUHJvcFR5cGVzLm51bWJlci5pc1JlcXVpcmVkLFxuICAvKipcbiAgICAqIFRoZSBoZWlnaHQgb2YgdGhlIG1hcC5cbiAgICAqL1xuICBoZWlnaHQ6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgLyoqXG4gICAgKiBJcyB0aGUgY29tcG9uZW50IGN1cnJlbnRseSBiZWluZyBkcmFnZ2VkLiBUaGlzIGlzIHVzZWQgdG8gc2hvdy9oaWRlIHRoZVxuICAgICogZHJhZyBjdXJzb3IuIEFsc28gdXNlZCBhcyBhbiBvcHRpbWl6YXRpb24gaW4gc29tZSBvdmVybGF5cyBieSBwcmV2ZW50aW5nXG4gICAgKiByZW5kZXJpbmcgd2hpbGUgZHJhZ2dpbmcuXG4gICAgKi9cbiAgaXNEcmFnZ2luZzogUHJvcFR5cGVzLmJvb2wsXG4gIC8qKlxuICAgICogUmVxdWlyZWQgdG8gY2FsY3VsYXRlIHRoZSBtb3VzZSBwcm9qZWN0aW9uIGFmdGVyIHRoZSBmaXJzdCBjbGljayBldmVudFxuICAgICogZHVyaW5nIGRyYWdnaW5nLiBXaGVyZSB0aGUgbWFwIGlzIGRlcGVuZHMgb24gd2hlcmUgeW91IGZpcnN0IGNsaWNrZWQgb25cbiAgICAqIHRoZSBtYXAuXG4gICAgKi9cbiAgc3RhcnREcmFnTG5nTGF0OiBQcm9wVHlwZXMuYXJyYXksXG4gIC8qKlxuICAgICogQ2FsbGVkIHdoZW4gYSBmZWF0dXJlIGlzIGhvdmVyZWQgb3Zlci4gVXNlcyBNYXBib3gnc1xuICAgICogcXVlcnlSZW5kZXJlZEZlYXR1cmVzIEFQSSB0byBmaW5kIGZlYXR1cmVzIHVuZGVyIHRoZSBwb2ludGVyOlxuICAgICogaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNNYXAjcXVlcnlSZW5kZXJlZEZlYXR1cmVzXG4gICAgKiBUbyBxdWVyeSBvbmx5IHNvbWUgb2YgdGhlIGxheWVycywgc2V0IHRoZSBgaW50ZXJhY3RpdmVgIHByb3BlcnR5IGluIHRoZVxuICAgICogbGF5ZXIgc3R5bGUgdG8gYHRydWVgLiBTZWUgTWFwYm94J3Mgc3R5bGUgc3BlY1xuICAgICogaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXBib3gtZ2wtc3R5bGUtc3BlYy8jbGF5ZXItaW50ZXJhY3RpdmVcbiAgICAqIElmIG5vIGludGVyYWN0aXZlIGxheWVycyBhcmUgZm91bmQgKGUuZy4gdXNpbmcgTWFwYm94J3MgZGVmYXVsdCBzdHlsZXMpLFxuICAgICogd2lsbCBmYWxsIGJhY2sgdG8gcXVlcnkgYWxsIGxheWVycy5cbiAgICAqIEBjYWxsYmFja1xuICAgICogQHBhcmFtIHthcnJheX0gZmVhdHVyZXMgLSBUaGUgYXJyYXkgb2YgZmVhdHVyZXMgdGhlIG1vdXNlIGlzIG92ZXIuXG4gICAgKi9cbiAgb25Ib3ZlckZlYXR1cmVzOiBQcm9wVHlwZXMuZnVuYyxcbiAgLyoqXG4gICAgKiBEZWZhdWx0cyB0byBUUlVFXG4gICAgKiBTZXQgdG8gZmFsc2UgdG8gZW5hYmxlIG9uSG92ZXJGZWF0dXJlcyB0byBiZSBjYWxsZWQgcmVnYXJkbGVzcyBpZlxuICAgICogdGhlcmUgaXMgYW4gYWN0dWFsIGZlYXR1cmUgYXQgeCwgeS4gVGhpcyBpcyB1c2VmdWwgdG8gZW11bGF0ZVxuICAgICogXCJtb3VzZS1vdXRcIiBiZWhhdmlvcnMgb24gZmVhdHVyZXMuXG4gICAgKi9cbiAgaWdub3JlRW1wdHlGZWF0dXJlczogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAgKiBTaG93IGF0dHJpYnV0aW9uIGNvbnRyb2wgb3Igbm90LlxuICAgICovXG4gIGF0dHJpYnV0aW9uQ29udHJvbDogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAqIENhbGxlZCB3aGVuIHRoZSBtYXAgaXMgY2xpY2tlZC4gVGhlIGhhbmRsZXIgaXMgY2FsbGVkIHdpdGggdGhlIGNsaWNrZWRcbiAgICogY29vcmRpbmF0ZXMgKGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jTG5nTGF0KSBhbmQgdGhlXG4gICAqIHNjcmVlbiBjb29yZGluYXRlcyAoaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNQb2ludExpa2UpLlxuICAgKi9cbiAgb25DbGljazogUHJvcFR5cGVzLmZ1bmMsXG5cbiAgLyoqXG4gICAgKiBDYWxsZWQgd2hlbiBhIGZlYXR1cmUgaXMgY2xpY2tlZCBvbi4gVXNlcyBNYXBib3gnc1xuICAgICogcXVlcnlSZW5kZXJlZEZlYXR1cmVzIEFQSSB0byBmaW5kIGZlYXR1cmVzIHVuZGVyIHRoZSBwb2ludGVyOlxuICAgICogaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXBib3gtZ2wtanMvYXBpLyNNYXAjcXVlcnlSZW5kZXJlZEZlYXR1cmVzXG4gICAgKiBUbyBxdWVyeSBvbmx5IHNvbWUgb2YgdGhlIGxheWVycywgc2V0IHRoZSBgaW50ZXJhY3RpdmVgIHByb3BlcnR5IGluIHRoZVxuICAgICogbGF5ZXIgc3R5bGUgdG8gYHRydWVgLiBTZWUgTWFwYm94J3Mgc3R5bGUgc3BlY1xuICAgICogaHR0cHM6Ly93d3cubWFwYm94LmNvbS9tYXBib3gtZ2wtc3R5bGUtc3BlYy8jbGF5ZXItaW50ZXJhY3RpdmVcbiAgICAqIElmIG5vIGludGVyYWN0aXZlIGxheWVycyBhcmUgZm91bmQgKGUuZy4gdXNpbmcgTWFwYm94J3MgZGVmYXVsdCBzdHlsZXMpLFxuICAgICogd2lsbCBmYWxsIGJhY2sgdG8gcXVlcnkgYWxsIGxheWVycy5cbiAgICAqL1xuICBvbkNsaWNrRmVhdHVyZXM6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgICogUmFkaXVzIHRvIGRldGVjdCBmZWF0dXJlcyBhcm91bmQgYSBjbGlja2VkIHBvaW50LiBEZWZhdWx0cyB0byAxNS5cbiAgICAqL1xuICBjbGlja1JhZGl1czogUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICAqIFBhc3NlZCB0byBNYXBib3ggTWFwIGNvbnN0cnVjdG9yIHdoaWNoIHBhc3NlcyBpdCB0byB0aGUgY2FudmFzIGNvbnRleHQuXG4gICAgKiBUaGlzIGlzIHVuc2VmdWwgd2hlbiB5b3Ugd2FudCB0byBleHBvcnQgdGhlIGNhbnZhcyBhcyBhIFBORy5cbiAgICAqL1xuICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgICogVGhlcmUgYXJlIHN0aWxsIGtub3duIGlzc3VlcyB3aXRoIHN0eWxlIGRpZmZpbmcuIEFzIGEgdGVtcG9yYXJ5IHN0b3BnYXAsXG4gICAgKiBhZGQgdGhlIG9wdGlvbiB0byBwcmV2ZW50IHN0eWxlIGRpZmZpbmcuXG4gICAgKi9cbiAgcHJldmVudFN0eWxlRGlmZmluZzogUHJvcFR5cGVzLmJvb2wsXG5cbiAgLyoqXG4gICAgKiBFbmFibGVzIHBlcnNwZWN0aXZlIGNvbnRyb2wgZXZlbnQgaGFuZGxpbmdcbiAgICAqL1xuICBwZXJzcGVjdGl2ZUVuYWJsZWQ6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgICogU3BlY2lmeSB0aGUgYmVhcmluZyBvZiB0aGUgdmlld3BvcnRcbiAgICAqL1xuICBiZWFyaW5nOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgICogU3BlY2lmeSB0aGUgcGl0Y2ggb2YgdGhlIHZpZXdwb3J0XG4gICAgKi9cbiAgcGl0Y2g6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAgKiBTcGVjaWZ5IHRoZSBhbHRpdHVkZSBvZiB0aGUgdmlld3BvcnQgY2FtZXJhXG4gICAgKiBVbml0OiBtYXAgaGVpZ2h0cywgZGVmYXVsdCAxLjVcbiAgICAqIE5vbi1wdWJsaWMgQVBJLCBzZWUgaHR0cHM6Ly9naXRodWIuY29tL21hcGJveC9tYXBib3gtZ2wtanMvaXNzdWVzLzExMzdcbiAgICAqL1xuICBhbHRpdHVkZTogUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICAqIFRoZSBsb2FkIGNhbGxiYWNrIGlzIGNhbGxlZCB3aGVuIGFsbCBkZXBlbmRlbmNpZXMgaGF2ZSBiZWVuIGxvYWRlZCBhbmRcbiAgICAqIHRoZSBtYXAgaXMgcmVhZHkuXG4gICAgKi9cbiAgb25Mb2FkOiBQcm9wVHlwZXMuZnVuY1xuXG59O1xuXG5jb25zdCBERUZBVUxUX1BST1BTID0ge1xuICBtYXBTdHlsZTogJ21hcGJveDovL3N0eWxlcy9tYXBib3gvbGlnaHQtdjknLFxuICBvbkNoYW5nZVZpZXdwb3J0OiBudWxsLFxuICBtYXBib3hBcGlBY2Nlc3NUb2tlbjogY29uZmlnLkRFRkFVTFRTLk1BUEJPWF9BUElfQUNDRVNTX1RPS0VOLFxuICBwcmVzZXJ2ZURyYXdpbmdCdWZmZXI6IGZhbHNlLFxuICBhdHRyaWJ1dGlvbkNvbnRyb2w6IHRydWUsXG4gIGlnbm9yZUVtcHR5RmVhdHVyZXM6IHRydWUsXG4gIGJlYXJpbmc6IDAsXG4gIHBpdGNoOiAwLFxuICBhbHRpdHVkZTogMS41LFxuICBjbGlja1JhZGl1czogMTUsXG4gIG1heFpvb206IDIwXG59O1xuXG5AcHVyZVJlbmRlclxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgTWFwR0wgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gIHN0YXRpYyBzdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuIG1hcGJveGdsLnN1cHBvcnRlZCgpO1xuICB9XG5cbiAgc3RhdGljIHByb3BUeXBlcyA9IFBST1BfVFlQRVM7XG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSBERUZBVUxUX1BST1BTO1xuXG4gIGNvbnN0cnVjdG9yKHByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuICAgIHRoaXMuc3RhdGUgPSB7XG4gICAgICBpc1N1cHBvcnRlZDogbWFwYm94Z2wuc3VwcG9ydGVkKCksXG4gICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICAgIGlzSG92ZXJpbmc6IGZhbHNlLFxuICAgICAgc3RhcnREcmFnTG5nTGF0OiBudWxsLFxuICAgICAgc3RhcnRCZWFyaW5nOiBudWxsLFxuICAgICAgc3RhcnRQaXRjaDogbnVsbFxuICAgIH07XG4gICAgdGhpcy5fcXVlcnlQYXJhbXMgPSB7fTtcbiAgICBtYXBib3hnbC5hY2Nlc3NUb2tlbiA9IHByb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VuO1xuXG4gICAgaWYgKCF0aGlzLnN0YXRlLmlzU3VwcG9ydGVkKSB7XG4gICAgICB0aGlzLmNvbXBvbmVudERpZE1vdW50ID0gbm9vcDtcbiAgICAgIHRoaXMuY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyA9IG5vb3A7XG4gICAgICB0aGlzLmNvbXBvbmVudERpZFVwZGF0ZSA9IG5vb3A7XG4gICAgfVxuICB9XG5cbiAgY29tcG9uZW50RGlkTW91bnQoKSB7XG4gICAgY29uc3QgbWFwU3R5bGUgPSBJbW11dGFibGUuTWFwLmlzTWFwKHRoaXMucHJvcHMubWFwU3R5bGUpID9cbiAgICAgIHRoaXMucHJvcHMubWFwU3R5bGUudG9KUygpIDpcbiAgICAgIHRoaXMucHJvcHMubWFwU3R5bGU7XG5cbiAgICBjb25zdCBtYXAgPSBuZXcgbWFwYm94Z2wuTWFwKHtcbiAgICAgIGNvbnRhaW5lcjogdGhpcy5yZWZzLm1hcGJveE1hcCxcbiAgICAgIGNlbnRlcjogW3RoaXMucHJvcHMubG9uZ2l0dWRlLCB0aGlzLnByb3BzLmxhdGl0dWRlXSxcbiAgICAgIHpvb206IHRoaXMucHJvcHMuem9vbSxcbiAgICAgIG1heFpvb206IHRoaXMucHJvcHMubWF4Wm9vbSxcbiAgICAgIHBpdGNoOiB0aGlzLnByb3BzLnBpdGNoLFxuICAgICAgYmVhcmluZzogdGhpcy5wcm9wcy5iZWFyaW5nLFxuICAgICAgc3R5bGU6IG1hcFN0eWxlLFxuICAgICAgaW50ZXJhY3RpdmU6IGZhbHNlLFxuICAgICAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiB0aGlzLnByb3BzLnByZXNlcnZlRHJhd2luZ0J1ZmZlclxuICAgICAgLy8gVE9ETz9cbiAgICAgIC8vIGF0dHJpYnV0aW9uQ29udHJvbDogdGhpcy5wcm9wcy5hdHRyaWJ1dGlvbkNvbnRyb2xcbiAgICB9KTtcblxuICAgIGlmICh0aGlzLnByb3BzLm9uTG9hZCkge1xuICAgICAgbWFwLm9uY2UoJ2xvYWQnLCAoKSA9PiB0aGlzLnByb3BzLm9uTG9hZCgpKTtcbiAgICB9XG5cbiAgICBzZWxlY3QobWFwLmdldENhbnZhcygpKS5zdHlsZSgnb3V0bGluZScsICdub25lJyk7XG5cbiAgICB0aGlzLl9tYXAgPSBtYXA7XG4gICAgdGhpcy5fdXBkYXRlTWFwVmlld3BvcnQoe30sIHRoaXMucHJvcHMpO1xuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KG1hcC50cmFuc2Zvcm0pO1xuICAgIHRoaXMuX3VwZGF0ZVF1ZXJ5UGFyYW1zKG1hcFN0eWxlKTtcbiAgfVxuXG4gIC8vIE5ldyBwcm9wcyBhcmUgY29taW4nIHJvdW5kIHRoZSBjb3JuZXIhXG4gIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV3UHJvcHMpIHtcbiAgICB0aGlzLl91cGRhdGVTdGF0ZUZyb21Qcm9wcyh0aGlzLnByb3BzLCBuZXdQcm9wcyk7XG4gICAgdGhpcy5fdXBkYXRlTWFwVmlld3BvcnQodGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIHRoaXMuX3VwZGF0ZU1hcFN0eWxlKHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICAvLyBTYXZlIHdpZHRoL2hlaWdodCBzbyB0aGF0IHdlIGNhbiBjaGVjayB0aGVtIGluIGNvbXBvbmVudERpZFVwZGF0ZVxuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXG4gICAgICBoZWlnaHQ6IHRoaXMucHJvcHMuaGVpZ2h0XG4gICAgfSk7XG4gIH1cblxuICBjb21wb25lbnREaWRVcGRhdGUoKSB7XG4gICAgLy8gbWFwLnJlc2l6ZSgpIHJlYWRzIHNpemUgZnJvbSBET00sIHdlIG5lZWQgdG8gY2FsbCBhZnRlciByZW5kZXJcbiAgICB0aGlzLl91cGRhdGVNYXBTaXplKHRoaXMuc3RhdGUsIHRoaXMucHJvcHMpO1xuICB9XG5cbiAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XG4gICAgaWYgKHRoaXMuX21hcCkge1xuICAgICAgdGhpcy5fbWFwLnJlbW92ZSgpO1xuICAgIH1cbiAgfVxuXG4gIC8vIEV4dGVybmFsIGFwcHMgY2FuIGFjY2VzcyBtYXAgdGhpcyB3YXlcbiAgX2dldE1hcCgpIHtcbiAgICByZXR1cm4gdGhpcy5fbWFwO1xuICB9XG5cbiAgLy8gQ2FsY3VsYXRlIGEgY3Vyc29yIHN0eWxlXG4gIF9nZXRDdXJzb3IoKSB7XG4gICAgY29uc3QgaXNJbnRlcmFjdGl2ZSA9XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlVmlld3BvcnQgfHxcbiAgICAgIHRoaXMucHJvcHMub25DbGlja0ZlYXR1cmUgfHxcbiAgICAgIHRoaXMucHJvcHMub25Ib3ZlckZlYXR1cmVzO1xuICAgIGlmIChpc0ludGVyYWN0aXZlKSB7XG4gICAgICByZXR1cm4gdGhpcy5wcm9wcy5pc0RyYWdnaW5nID9cbiAgICAgICAgY29uZmlnLkNVUlNPUi5HUkFCQklORyA6XG4gICAgICAgICh0aGlzLnN0YXRlLmlzSG92ZXJpbmcgPyBjb25maWcuQ1VSU09SLlBPSU5URVIgOiBjb25maWcuQ1VSU09SLkdSQUIpO1xuICAgIH1cbiAgICByZXR1cm4gJ2luaGVyaXQnO1xuICB9XG5cbiAgX3VwZGF0ZVN0YXRlRnJvbVByb3BzKG9sZFByb3BzLCBuZXdQcm9wcykge1xuICAgIG1hcGJveGdsLmFjY2Vzc1Rva2VuID0gbmV3UHJvcHMubWFwYm94QXBpQWNjZXNzVG9rZW47XG4gICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICBzdGFydERyYWdMbmdMYXQ6IG5ld1Byb3BzLnN0YXJ0RHJhZ0xuZ0xhdFxuICAgIH0pO1xuICB9XG5cbiAgLy8gSG92ZXIgYW5kIGNsaWNrIG9ubHkgcXVlcnkgbGF5ZXJzIHdob3NlIGludGVyYWN0aXZlIHByb3BlcnR5IGlzIHRydWVcbiAgLy8gSWYgbm8gaW50ZXJhY3Rpdml0eSBpcyBzcGVjaWZpZWQsIHF1ZXJ5IGFsbCBsYXllcnNcbiAgX3VwZGF0ZVF1ZXJ5UGFyYW1zKG1hcFN0eWxlKSB7XG4gICAgY29uc3QgaW50ZXJhY3RpdmVMYXllcklkcyA9IGdldEludGVyYWN0aXZlTGF5ZXJJZHMobWFwU3R5bGUpO1xuICAgIHRoaXMuX3F1ZXJ5UGFyYW1zID0gaW50ZXJhY3RpdmVMYXllcklkcy5sZW5ndGggPT09IDAgPyB7fSA6XG4gICAgICB7bGF5ZXJzOiBpbnRlcmFjdGl2ZUxheWVySWRzfTtcbiAgfVxuXG4gIC8vIFVwZGF0ZSBhIHNvdXJjZSBpbiB0aGUgbWFwIHN0eWxlXG4gIF91cGRhdGVTb3VyY2UobWFwLCB1cGRhdGUpIHtcbiAgICBjb25zdCBuZXdTb3VyY2UgPSB1cGRhdGUuc291cmNlLnRvSlMoKTtcbiAgICBpZiAobmV3U291cmNlLnR5cGUgPT09ICdnZW9qc29uJykge1xuICAgICAgY29uc3Qgb2xkU291cmNlID0gbWFwLmdldFNvdXJjZSh1cGRhdGUuaWQpO1xuICAgICAgaWYgKG9sZFNvdXJjZS50eXBlID09PSAnZ2VvanNvbicpIHtcbiAgICAgICAgLy8gdXBkYXRlIGRhdGEgaWYgbm8gb3RoZXIgR2VvSlNPTlNvdXJjZSBvcHRpb25zIHdlcmUgY2hhbmdlZFxuICAgICAgICBjb25zdCBvbGRPcHRzID0gb2xkU291cmNlLndvcmtlck9wdGlvbnM7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAobmV3U291cmNlLm1heHpvb20gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLm1heHpvb20gPT09IG9sZE9wdHMuZ2VvanNvblZ0T3B0aW9ucy5tYXhab29tKSAmJlxuICAgICAgICAgIChuZXdTb3VyY2UuYnVmZmVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS5idWZmZXIgPT09IG9sZE9wdHMuZ2VvanNvblZ0T3B0aW9ucy5idWZmZXIpICYmXG4gICAgICAgICAgKG5ld1NvdXJjZS50b2xlcmFuY2UgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLnRvbGVyYW5jZSA9PT0gb2xkT3B0cy5nZW9qc29uVnRPcHRpb25zLnRvbGVyYW5jZSkgJiZcbiAgICAgICAgICAobmV3U291cmNlLmNsdXN0ZXIgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLmNsdXN0ZXIgPT09IG9sZE9wdHMuY2x1c3RlcikgJiZcbiAgICAgICAgICAobmV3U291cmNlLmNsdXN0ZXJSYWRpdXMgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLmNsdXN0ZXJSYWRpdXMgPT09IG9sZE9wdHMuc3VwZXJjbHVzdGVyT3B0aW9ucy5yYWRpdXMpICYmXG4gICAgICAgICAgKG5ld1NvdXJjZS5jbHVzdGVyTWF4Wm9vbSA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBuZXdTb3VyY2UuY2x1c3Rlck1heFpvb20gPT09IG9sZE9wdHMuc3VwZXJjbHVzdGVyT3B0aW9ucy5tYXhab29tKVxuICAgICAgICApIHtcbiAgICAgICAgICBvbGRTb3VyY2Uuc2V0RGF0YShuZXdTb3VyY2UuZGF0YSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWFwLnJlbW92ZVNvdXJjZSh1cGRhdGUuaWQpO1xuICAgIG1hcC5hZGRTb3VyY2UodXBkYXRlLmlkLCBuZXdTb3VyY2UpO1xuICB9XG5cbiAgLy8gSW5kaXZpZHVhbGx5IHVwZGF0ZSB0aGUgbWFwcyBzb3VyY2UgYW5kIGxheWVycyB0aGF0IGhhdmUgY2hhbmdlZCBpZiBhbGxcbiAgLy8gb3RoZXIgc3R5bGUgcHJvcHMgaGF2ZW4ndCBjaGFuZ2VkLiBUaGlzIHByZXZlbnRzIGZsaWNraW5nIG9mIHRoZSBtYXAgd2hlblxuICAvLyBzdHlsZXMgb25seSBjaGFuZ2Ugc291cmNlcyBvciBsYXllcnMuXG4gIC8qIGVzbGludC1kaXNhYmxlIG1heC1zdGF0ZW1lbnRzLCBjb21wbGV4aXR5ICovXG4gIF9zZXREaWZmU3R5bGUocHJldlN0eWxlLCBuZXh0U3R5bGUpIHtcbiAgICBjb25zdCBwcmV2S2V5c01hcCA9IHByZXZTdHlsZSAmJiBzdHlsZUtleXNNYXAocHJldlN0eWxlKSB8fCB7fTtcbiAgICBjb25zdCBuZXh0S2V5c01hcCA9IHN0eWxlS2V5c01hcChuZXh0U3R5bGUpO1xuICAgIGZ1bmN0aW9uIHN0eWxlS2V5c01hcChzdHlsZSkge1xuICAgICAgcmV0dXJuIHN0eWxlLm1hcCgoKSA9PiB0cnVlKS5kZWxldGUoJ2xheWVycycpLmRlbGV0ZSgnc291cmNlcycpLnRvSlMoKTtcbiAgICB9XG4gICAgZnVuY3Rpb24gcHJvcHNPdGhlclRoYW5MYXllcnNPclNvdXJjZXNEaWZmZXIoKSB7XG4gICAgICBjb25zdCBwcmV2S2V5c0xpc3QgPSBPYmplY3Qua2V5cyhwcmV2S2V5c01hcCk7XG4gICAgICBjb25zdCBuZXh0S2V5c0xpc3QgPSBPYmplY3Qua2V5cyhuZXh0S2V5c01hcCk7XG4gICAgICBpZiAocHJldktleXNMaXN0Lmxlbmd0aCAhPT0gbmV4dEtleXNMaXN0Lmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIC8vIGBuZXh0U3R5bGVgIGFuZCBgcHJldlN0eWxlYCBzaG91bGQgbm90IGhhdmUgdGhlIHNhbWUgc2V0IG9mIHByb3BzLlxuICAgICAgaWYgKG5leHRLZXlzTGlzdC5zb21lKFxuICAgICAgICBrZXkgPT4gcHJldlN0eWxlLmdldChrZXkpICE9PSBuZXh0U3R5bGUuZ2V0KGtleSlcbiAgICAgICAgLy8gQnV0IHRoZSB2YWx1ZSBvZiBvbmUgb2YgdGhvc2UgcHJvcHMgaXMgZGlmZmVyZW50LlxuICAgICAgKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXAgPSB0aGlzLl9tYXA7XG5cbiAgICBpZiAoIXByZXZTdHlsZSB8fCBwcm9wc090aGVyVGhhbkxheWVyc09yU291cmNlc0RpZmZlcigpKSB7XG4gICAgICBtYXAuc2V0U3R5bGUobmV4dFN0eWxlLnRvSlMoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge3NvdXJjZXNEaWZmLCBsYXllcnNEaWZmfSA9IGRpZmZTdHlsZXMocHJldlN0eWxlLCBuZXh0U3R5bGUpO1xuXG4gICAgLy8gVE9ETzogSXQncyByYXRoZXIgZGlmZmljdWx0IHRvIGRldGVybWluZSBzdHlsZSBkaWZmaW5nIGluIHRoZSBwcmVzZW5jZVxuICAgIC8vIG9mIHJlZnMuIEZvciBub3csIGlmIGFueSBzdHlsZSB1cGRhdGUgaGFzIGEgcmVmLCBmYWxsYmFjayB0byBubyBkaWZmaW5nLlxuICAgIC8vIFdlIGNhbiBjb21lIGJhY2sgdG8gdGhpcyBjYXNlIGlmIHRoZXJlJ3MgYSBzb2xpZCB1c2VjYXNlLlxuICAgIGlmIChsYXllcnNEaWZmLnVwZGF0ZXMuc29tZShub2RlID0+IG5vZGUubGF5ZXIuZ2V0KCdyZWYnKSkpIHtcbiAgICAgIG1hcC5zZXRTdHlsZShuZXh0U3R5bGUudG9KUygpKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGVudGVyIG9mIHNvdXJjZXNEaWZmLmVudGVyKSB7XG4gICAgICBtYXAuYWRkU291cmNlKGVudGVyLmlkLCBlbnRlci5zb3VyY2UudG9KUygpKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCB1cGRhdGUgb2Ygc291cmNlc0RpZmYudXBkYXRlKSB7XG4gICAgICB0aGlzLl91cGRhdGVTb3VyY2UobWFwLCB1cGRhdGUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGV4aXQgb2Ygc291cmNlc0RpZmYuZXhpdCkge1xuICAgICAgbWFwLnJlbW92ZVNvdXJjZShleGl0LmlkKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBleGl0IG9mIGxheWVyc0RpZmYuZXhpdGluZykge1xuICAgICAgaWYgKG1hcC5zdHlsZS5nZXRMYXllcihleGl0LmlkKSkge1xuICAgICAgICBtYXAucmVtb3ZlTGF5ZXIoZXhpdC5pZCk7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAoY29uc3QgdXBkYXRlIG9mIGxheWVyc0RpZmYudXBkYXRlcykge1xuICAgICAgaWYgKCF1cGRhdGUuZW50ZXIpIHtcbiAgICAgICAgLy8gVGhpcyBpcyBhbiBvbGQgbGF5ZXIgdGhhdCBuZWVkcyB0byBiZSB1cGRhdGVkLiBSZW1vdmUgdGhlIG9sZCBsYXllclxuICAgICAgICAvLyB3aXRoIHRoZSBzYW1lIGlkIGFuZCBhZGQgaXQgYmFjayBhZ2Fpbi5cbiAgICAgICAgbWFwLnJlbW92ZUxheWVyKHVwZGF0ZS5pZCk7XG4gICAgICB9XG4gICAgICBtYXAuYWRkTGF5ZXIodXBkYXRlLmxheWVyLnRvSlMoKSwgdXBkYXRlLmJlZm9yZSk7XG4gICAgfVxuICB9XG4gIC8qIGVzbGludC1lbmFibGUgbWF4LXN0YXRlbWVudHMsIGNvbXBsZXhpdHkgKi9cblxuICBfdXBkYXRlTWFwU3R5bGUob2xkUHJvcHMsIG5ld1Byb3BzKSB7XG4gICAgY29uc3QgbWFwU3R5bGUgPSBuZXdQcm9wcy5tYXBTdHlsZTtcbiAgICBjb25zdCBvbGRNYXBTdHlsZSA9IG9sZFByb3BzLm1hcFN0eWxlO1xuICAgIGlmIChtYXBTdHlsZSAhPT0gb2xkTWFwU3R5bGUpIHtcbiAgICAgIGlmIChJbW11dGFibGUuTWFwLmlzTWFwKG1hcFN0eWxlKSkge1xuICAgICAgICBpZiAodGhpcy5wcm9wcy5wcmV2ZW50U3R5bGVEaWZmaW5nKSB7XG4gICAgICAgICAgdGhpcy5fbWFwLnNldFN0eWxlKG1hcFN0eWxlLnRvSlMoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5fc2V0RGlmZlN0eWxlKG9sZE1hcFN0eWxlLCBtYXBTdHlsZSk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX21hcC5zZXRTdHlsZShtYXBTdHlsZSk7XG4gICAgICB9XG4gICAgICB0aGlzLl91cGRhdGVRdWVyeVBhcmFtcyhtYXBTdHlsZSk7XG4gICAgfVxuICB9XG5cbiAgX3VwZGF0ZU1hcFZpZXdwb3J0KG9sZFByb3BzLCBuZXdQcm9wcykge1xuICAgIGNvbnN0IHZpZXdwb3J0Q2hhbmdlZCA9XG4gICAgICBuZXdQcm9wcy5sYXRpdHVkZSAhPT0gb2xkUHJvcHMubGF0aXR1ZGUgfHxcbiAgICAgIG5ld1Byb3BzLmxvbmdpdHVkZSAhPT0gb2xkUHJvcHMubG9uZ2l0dWRlIHx8XG4gICAgICBuZXdQcm9wcy56b29tICE9PSBvbGRQcm9wcy56b29tIHx8XG4gICAgICBuZXdQcm9wcy5waXRjaCAhPT0gb2xkUHJvcHMucGl0Y2ggfHxcbiAgICAgIG5ld1Byb3BzLnpvb20gIT09IG9sZFByb3BzLmJlYXJpbmcgfHxcbiAgICAgIG5ld1Byb3BzLmFsdGl0dWRlICE9PSBvbGRQcm9wcy5hbHRpdHVkZTtcblxuICAgIGlmICh2aWV3cG9ydENoYW5nZWQpIHtcbiAgICAgIHRoaXMuX21hcC5qdW1wVG8oe1xuICAgICAgICBjZW50ZXI6IFtuZXdQcm9wcy5sb25naXR1ZGUsIG5ld1Byb3BzLmxhdGl0dWRlXSxcbiAgICAgICAgem9vbTogbmV3UHJvcHMuem9vbSxcbiAgICAgICAgYmVhcmluZzogbmV3UHJvcHMuYmVhcmluZyxcbiAgICAgICAgcGl0Y2g6IG5ld1Byb3BzLnBpdGNoXG4gICAgICB9KTtcblxuICAgICAgLy8gVE9ETyAtIGp1bXBUbyBkb2Vzbid0IGhhbmRsZSBhbHRpdHVkZVxuICAgICAgaWYgKG5ld1Byb3BzLmFsdGl0dWRlICE9PSBvbGRQcm9wcy5hbHRpdHVkZSkge1xuICAgICAgICB0aGlzLl9tYXAudHJhbnNmb3JtLmFsdGl0dWRlID0gbmV3UHJvcHMuYWx0aXR1ZGU7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gTm90ZTogbmVlZHMgdG8gYmUgY2FsbGVkIGFmdGVyIHJlbmRlciAoZS5nLiBpbiBjb21wb25lbnREaWRVcGRhdGUpXG4gIF91cGRhdGVNYXBTaXplKG9sZFByb3BzLCBuZXdQcm9wcykge1xuICAgIGNvbnN0IHNpemVDaGFuZ2VkID1cbiAgICAgIG9sZFByb3BzLndpZHRoICE9PSBuZXdQcm9wcy53aWR0aCB8fCBvbGRQcm9wcy5oZWlnaHQgIT09IG5ld1Byb3BzLmhlaWdodDtcblxuICAgIGlmIChzaXplQ2hhbmdlZCkge1xuICAgICAgdGhpcy5fbWFwLnJlc2l6ZSgpO1xuICAgICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodGhpcy5fbWFwLnRyYW5zZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsY3VsYXRlcyBhIG5ldyBwaXRjaCBhbmQgYmVhcmluZyBmcm9tIGEgcG9zaXRpb24gKGNvbWluZyBmcm9tIGFuIGV2ZW50KVxuICBfY2FsY3VsYXRlTmV3UGl0Y2hBbmRCZWFyaW5nKHtwb3MsIHN0YXJ0UG9zLCBzdGFydEJlYXJpbmcsIHN0YXJ0UGl0Y2h9KSB7XG4gICAgY29uc3QgeERlbHRhID0gcG9zWzBdIC0gc3RhcnRQb3NbMF07XG4gICAgY29uc3QgYmVhcmluZyA9IHN0YXJ0QmVhcmluZyArIDE4MCAqIHhEZWx0YSAvIHRoaXMucHJvcHMud2lkdGg7XG5cbiAgICBsZXQgcGl0Y2ggPSBzdGFydFBpdGNoO1xuICAgIGNvbnN0IHlEZWx0YSA9IHBvc1sxXSAtIHN0YXJ0UG9zWzFdO1xuICAgIGlmICh5RGVsdGEgPiAwKSB7XG4gICAgICAvLyBEcmFnZ2luZyBkb3dud2FyZHMsIGdyYWR1YWxseSBkZWNyZWFzZSBwaXRjaFxuICAgICAgaWYgKE1hdGguYWJzKHRoaXMucHJvcHMuaGVpZ2h0IC0gc3RhcnRQb3NbMV0pID4gUElUQ0hfTU9VU0VfVEhSRVNIT0xEKSB7XG4gICAgICAgIGNvbnN0IHNjYWxlID0geURlbHRhIC8gKHRoaXMucHJvcHMuaGVpZ2h0IC0gc3RhcnRQb3NbMV0pO1xuICAgICAgICBwaXRjaCA9ICgxIC0gc2NhbGUpICogUElUQ0hfQUNDRUwgKiBzdGFydFBpdGNoO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoeURlbHRhIDwgMCkge1xuICAgICAgLy8gRHJhZ2dpbmcgdXB3YXJkcywgZ3JhZHVhbGx5IGluY3JlYXNlIHBpdGNoXG4gICAgICBpZiAoc3RhcnRQb3MueSA+IFBJVENIX01PVVNFX1RIUkVTSE9MRCkge1xuICAgICAgICAvLyBNb3ZlIGZyb20gMCB0byAxIGFzIHdlIGRyYWcgdXB3YXJkc1xuICAgICAgICBjb25zdCB5U2NhbGUgPSAxIC0gcG9zWzFdIC8gc3RhcnRQb3NbMV07XG4gICAgICAgIC8vIEdyYWR1YWxseSBhZGQgdW50aWwgd2UgaGl0IG1heCBwaXRjaFxuICAgICAgICBwaXRjaCA9IHN0YXJ0UGl0Y2ggKyB5U2NhbGUgKiAoTUFYX1BJVENIIC0gc3RhcnRQaXRjaCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gY29uc29sZS5kZWJ1ZyhzdGFydFBpdGNoLCBwaXRjaCk7XG4gICAgcmV0dXJuIHtcbiAgICAgIHBpdGNoOiBNYXRoLm1heChNYXRoLm1pbihwaXRjaCwgTUFYX1BJVENIKSwgMCksXG4gICAgICBiZWFyaW5nXG4gICAgfTtcbiAgfVxuXG4gICAvLyBIZWxwZXIgdG8gY2FsbCBwcm9wcy5vbkNoYW5nZVZpZXdwb3J0XG4gIF9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0cmFuc2Zvcm0sIG9wdHMgPSB7fSkge1xuICAgIGlmICh0aGlzLnByb3BzLm9uQ2hhbmdlVmlld3BvcnQpIHtcbiAgICAgIHRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydCh7XG4gICAgICAgIGxhdGl0dWRlOiB0cmFuc2Zvcm0uY2VudGVyLmxhdCxcbiAgICAgICAgbG9uZ2l0dWRlOiBtb2QodHJhbnNmb3JtLmNlbnRlci5sbmcgKyAxODAsIDM2MCkgLSAxODAsXG4gICAgICAgIHpvb206IHRyYW5zZm9ybS56b29tLFxuICAgICAgICBwaXRjaDogdHJhbnNmb3JtLnBpdGNoLFxuICAgICAgICBiZWFyaW5nOiBtb2QodHJhbnNmb3JtLmJlYXJpbmcgKyAxODAsIDM2MCkgLSAxODAsXG5cbiAgICAgICAgaXNEcmFnZ2luZzogdGhpcy5wcm9wcy5pc0RyYWdnaW5nLFxuICAgICAgICBzdGFydERyYWdMbmdMYXQ6IHRoaXMucHJvcHMuc3RhcnREcmFnTG5nTGF0LFxuICAgICAgICBzdGFydEJlYXJpbmc6IHRoaXMucHJvcHMuc3RhcnRCZWFyaW5nLFxuICAgICAgICBzdGFydFBpdGNoOiB0aGlzLnByb3BzLnN0YXJ0UGl0Y2gsXG5cbiAgICAgICAgLi4ub3B0c1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgQGF1dG9iaW5kIF9vblRvdWNoU3RhcnQob3B0cykge1xuICAgIHRoaXMuX29uTW91c2VEb3duKG9wdHMpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vblRvdWNoRHJhZyhvcHRzKSB7XG4gICAgdGhpcy5fb25Nb3VzZURyYWcob3B0cyk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uVG91Y2hSb3RhdGUob3B0cykge1xuICAgIHRoaXMuX29uTW91c2VSb3RhdGUob3B0cyk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uVG91Y2hFbmQob3B0cykge1xuICAgIHRoaXMuX29uTW91c2VVcChvcHRzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Ub3VjaFRhcChvcHRzKSB7XG4gICAgdGhpcy5fb25Nb3VzZUNsaWNrKG9wdHMpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vbk1vdXNlRG93bih7cG9zfSkge1xuICAgIGNvbnN0IHt0cmFuc2Zvcm19ID0gdGhpcy5fbWFwO1xuICAgIGNvbnN0IHtsbmcsIGxhdH0gPSB1bnByb2plY3RGcm9tVHJhbnNmb3JtKHRyYW5zZm9ybSwgbmV3IFBvaW50KC4uLnBvcykpO1xuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRyYW5zZm9ybSwge1xuICAgICAgaXNEcmFnZ2luZzogdHJ1ZSxcbiAgICAgIHN0YXJ0RHJhZ0xuZ0xhdDogW2xuZywgbGF0XSxcbiAgICAgIHN0YXJ0QmVhcmluZzogdHJhbnNmb3JtLmJlYXJpbmcsXG4gICAgICBzdGFydFBpdGNoOiB0cmFuc2Zvcm0ucGl0Y2hcbiAgICB9KTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZURyYWcoe3Bvc30pIHtcbiAgICBpZiAoIXRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIHRha2UgdGhlIHN0YXJ0IGxuZ2xhdCBhbmQgcHV0IGl0IHdoZXJlIHRoZSBtb3VzZSBpcyBkb3duLlxuICAgIGFzc2VydCh0aGlzLnByb3BzLnN0YXJ0RHJhZ0xuZ0xhdCwgJ2BzdGFydERyYWdMbmdMYXRgIHByb3AgaXMgcmVxdWlyZWQgJyArXG4gICAgICAnZm9yIG1vdXNlIGRyYWcgYmVoYXZpb3IgdG8gY2FsY3VsYXRlIHdoZXJlIHRvIHBvc2l0aW9uIHRoZSBtYXAuJyk7XG5cbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBjbG9uZVRyYW5zZm9ybSh0aGlzLl9tYXAudHJhbnNmb3JtKTtcbiAgICBjb25zdCBbbG5nLCBsYXRdID0gdGhpcy5wcm9wcy5zdGFydERyYWdMbmdMYXQ7XG4gICAgdHJhbnNmb3JtLnNldExvY2F0aW9uQXRQb2ludCh7bG5nLCBsYXR9LCBuZXcgUG9pbnQoLi4ucG9zKSk7XG4gICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodHJhbnNmb3JtLCB7aXNEcmFnZ2luZzogdHJ1ZX0pO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vbk1vdXNlUm90YXRlKHtwb3MsIHN0YXJ0UG9zfSkge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0IHx8ICF0aGlzLnByb3BzLnBlcnNwZWN0aXZlRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHtzdGFydEJlYXJpbmcsIHN0YXJ0UGl0Y2h9ID0gdGhpcy5wcm9wcztcbiAgICBhc3NlcnQodHlwZW9mIHN0YXJ0QmVhcmluZyA9PT0gJ251bWJlcicsXG4gICAgICAnYHN0YXJ0QmVhcmluZ2AgcHJvcCBpcyByZXF1aXJlZCBmb3IgbW91c2Ugcm90YXRlIGJlaGF2aW9yJyk7XG4gICAgYXNzZXJ0KHR5cGVvZiBzdGFydFBpdGNoID09PSAnbnVtYmVyJyxcbiAgICAgICdgc3RhcnRQaXRjaGAgcHJvcCBpcyByZXF1aXJlZCBmb3IgbW91c2Ugcm90YXRlIGJlaGF2aW9yJyk7XG5cbiAgICBjb25zdCB7cGl0Y2gsIGJlYXJpbmd9ID0gdGhpcy5fY2FsY3VsYXRlTmV3UGl0Y2hBbmRCZWFyaW5nKHtcbiAgICAgIHBvcyxcbiAgICAgIHN0YXJ0UG9zLFxuICAgICAgc3RhcnRCZWFyaW5nLFxuICAgICAgc3RhcnRQaXRjaFxuICAgIH0pO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtID0gY2xvbmVUcmFuc2Zvcm0odGhpcy5fbWFwLnRyYW5zZm9ybSk7XG4gICAgdHJhbnNmb3JtLmJlYXJpbmcgPSBiZWFyaW5nO1xuICAgIHRyYW5zZm9ybS5waXRjaCA9IHBpdGNoO1xuXG4gICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodHJhbnNmb3JtLCB7aXNEcmFnZ2luZzogdHJ1ZX0pO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vbk1vdXNlTW92ZSh7cG9zfSkge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkhvdmVyRmVhdHVyZXMpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLl9tYXAucXVlcnlSZW5kZXJlZEZlYXR1cmVzKG5ldyBQb2ludCguLi5wb3MpLCB0aGlzLl9xdWVyeVBhcmFtcyk7XG4gICAgaWYgKCFmZWF0dXJlcy5sZW5ndGggJiYgdGhpcy5wcm9wcy5pZ25vcmVFbXB0eUZlYXR1cmVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2V0U3RhdGUoe2lzSG92ZXJpbmc6IGZlYXR1cmVzLmxlbmd0aCA+IDB9KTtcbiAgICB0aGlzLnByb3BzLm9uSG92ZXJGZWF0dXJlcyhmZWF0dXJlcyk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uTW91c2VVcChvcHQpIHtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0aGlzLl9tYXAudHJhbnNmb3JtLCB7XG4gICAgICBpc0RyYWdnaW5nOiBmYWxzZSxcbiAgICAgIHN0YXJ0RHJhZ0xuZ0xhdDogbnVsbCxcbiAgICAgIHN0YXJ0QmVhcmluZzogbnVsbCxcbiAgICAgIHN0YXJ0UGl0Y2g6IG51bGxcbiAgICB9KTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZUNsaWNrKHtwb3N9KSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm9uQ2xpY2tGZWF0dXJlcyAmJiAhdGhpcy5wcm9wcy5vbkNsaWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgY29uc3QgcG9pbnQgPSBuZXcgUG9pbnQoLi4ucG9zKTtcbiAgICAgIGNvbnN0IGxhdExvbmcgPSB0aGlzLl9tYXAudW5wcm9qZWN0KHBvaW50KTtcbiAgICAgIC8vIFRPRE8gLSBEbyB3ZSByZWFsbHkgd2FudCB0byBleHBvc2UgYSBtYXBib3ggXCJQb2ludFwiIGluIG91ciBpbnRlcmZhY2U/XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2sobGF0TG9uZywgcG9pbnQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2tGZWF0dXJlcykge1xuICAgICAgLy8gUmFkaXVzIGVuYWJsZXMgcG9pbnQgZmVhdHVyZXMsIGxpa2UgbWFya2VyIHN5bWJvbHMsIHRvIGJlIGNsaWNrZWQuXG4gICAgICBjb25zdCBzaXplID0gdGhpcy5wcm9wcy5jbGlja1JhZGl1cztcbiAgICAgIGNvbnN0IGJib3ggPSBbW3Bvc1swXSAtIHNpemUsIHBvc1sxXSAtIHNpemVdLCBbcG9zWzBdICsgc2l6ZSwgcG9zWzFdICsgc2l6ZV1dO1xuICAgICAgY29uc3QgZmVhdHVyZXMgPSB0aGlzLl9tYXAucXVlcnlSZW5kZXJlZEZlYXR1cmVzKGJib3gsIHRoaXMuX3F1ZXJ5UGFyYW1zKTtcbiAgICAgIGlmICghZmVhdHVyZXMubGVuZ3RoICYmIHRoaXMucHJvcHMuaWdub3JlRW1wdHlGZWF0dXJlcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2tGZWF0dXJlcyhmZWF0dXJlcyk7XG4gICAgfVxuICB9XG5cbiAgQGF1dG9iaW5kIF9vblpvb20oe3Bvcywgc2NhbGV9KSB7XG4gICAgY29uc3QgcG9pbnQgPSBuZXcgUG9pbnQoLi4ucG9zKTtcbiAgICBjb25zdCB0cmFuc2Zvcm0gPSBjbG9uZVRyYW5zZm9ybSh0aGlzLl9tYXAudHJhbnNmb3JtKTtcbiAgICBjb25zdCBhcm91bmQgPSB1bnByb2plY3RGcm9tVHJhbnNmb3JtKHRyYW5zZm9ybSwgcG9pbnQpO1xuICAgIHRyYW5zZm9ybS56b29tID0gdHJhbnNmb3JtLnNjYWxlWm9vbSh0aGlzLl9tYXAudHJhbnNmb3JtLnNjYWxlICogc2NhbGUpO1xuICAgIHRyYW5zZm9ybS5zZXRMb2NhdGlvbkF0UG9pbnQoYXJvdW5kLCBwb2ludCk7XG4gICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodHJhbnNmb3JtLCB7aXNEcmFnZ2luZzogdHJ1ZX0pO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vblpvb21FbmQoKSB7XG4gICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodGhpcy5fbWFwLnRyYW5zZm9ybSwge2lzRHJhZ2dpbmc6IGZhbHNlfSk7XG4gIH1cblxuICByZW5kZXIoKSB7XG4gICAgY29uc3Qge2NsYXNzTmFtZSwgd2lkdGgsIGhlaWdodCwgc3R5bGV9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBtYXBTdHlsZSA9IHtcbiAgICAgIC4uLnN0eWxlLFxuICAgICAgd2lkdGgsXG4gICAgICBoZWlnaHQsXG4gICAgICBjdXJzb3I6IHRoaXMuX2dldEN1cnNvcigpXG4gICAgfTtcblxuICAgIGxldCBjb250ZW50ID0gW1xuICAgICAgPGRpdiBrZXk9XCJtYXBcIiByZWY9XCJtYXBib3hNYXBcIlxuICAgICAgICBzdHlsZT17IG1hcFN0eWxlIH0gY2xhc3NOYW1lPXsgY2xhc3NOYW1lIH0vPixcbiAgICAgIDxkaXYga2V5PVwib3ZlcmxheXNcIiBjbGFzc05hbWU9XCJvdmVybGF5c1wiXG4gICAgICAgIHN0eWxlPXsge3Bvc2l0aW9uOiAnYWJzb2x1dGUnLCBsZWZ0OiAwLCB0b3A6IDB9IH0+XG4gICAgICAgIHsgdGhpcy5wcm9wcy5jaGlsZHJlbiB9XG4gICAgICA8L2Rpdj5cbiAgICBdO1xuXG4gICAgaWYgKHRoaXMuc3RhdGUuaXNTdXBwb3J0ZWQgJiYgdGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0KSB7XG4gICAgICBjb250ZW50ID0gKFxuICAgICAgICA8TWFwSW50ZXJhY3Rpb25zXG4gICAgICAgICAgb25Nb3VzZURvd24gPXsgdGhpcy5fb25Nb3VzZURvd24gfVxuICAgICAgICAgIG9uTW91c2VEcmFnID17IHRoaXMuX29uTW91c2VEcmFnIH1cbiAgICAgICAgICBvbk1vdXNlUm90YXRlID17IHRoaXMuX29uTW91c2VSb3RhdGUgfVxuICAgICAgICAgIG9uTW91c2VVcCA9eyB0aGlzLl9vbk1vdXNlVXAgfVxuICAgICAgICAgIG9uTW91c2VNb3ZlID17IHRoaXMuX29uTW91c2VNb3ZlIH1cbiAgICAgICAgICBvbk1vdXNlQ2xpY2sgPSB7IHRoaXMuX29uTW91c2VDbGljayB9XG4gICAgICAgICAgb25Ub3VjaFN0YXJ0ID17IHRoaXMuX29uVG91Y2hTdGFydCB9XG4gICAgICAgICAgb25Ub3VjaERyYWcgPXsgdGhpcy5fb25Ub3VjaERyYWcgfVxuICAgICAgICAgIG9uVG91Y2hSb3RhdGUgPXsgdGhpcy5fb25Ub3VjaFJvdGF0ZSB9XG4gICAgICAgICAgb25Ub3VjaEVuZCA9eyB0aGlzLl9vblRvdWNoRW5kIH1cbiAgICAgICAgICBvblRvdWNoVGFwID0geyB0aGlzLl9vblRvdWNoVGFwIH1cbiAgICAgICAgICBvblpvb20gPXsgdGhpcy5fb25ab29tIH1cbiAgICAgICAgICBvblpvb21FbmQgPXsgdGhpcy5fb25ab29tRW5kIH1cbiAgICAgICAgICB3aWR0aCA9eyB0aGlzLnByb3BzLndpZHRoIH1cbiAgICAgICAgICBoZWlnaHQgPXsgdGhpcy5wcm9wcy5oZWlnaHQgfT5cblxuICAgICAgICAgIHsgY29udGVudCB9XG5cbiAgICAgICAgPC9NYXBJbnRlcmFjdGlvbnM+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIHN0eWxlPXsge1xuICAgICAgICAgIC4uLnRoaXMucHJvcHMuc3R5bGUsXG4gICAgICAgICAgd2lkdGg6IHRoaXMucHJvcHMud2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodCxcbiAgICAgICAgICBwb3NpdGlvbjogJ3JlbGF0aXZlJ1xuICAgICAgICB9IH0+XG5cbiAgICAgICAgeyBjb250ZW50IH1cblxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl19