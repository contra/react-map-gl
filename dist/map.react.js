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

var _mapboxGl = require('mapbox-gl');

var _mapboxGl2 = _interopRequireDefault(_mapboxGl);

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
      return _mapboxGl2.default.supported();
    }
  }]);

  function MapGL(props) {
    _classCallCheck(this, MapGL);

    var _this = _possibleConstructorReturn(this, (MapGL.__proto__ || Object.getPrototypeOf(MapGL)).call(this, props));

    _this.state = {
      isSupported: _mapboxGl2.default.supported(),
      isDragging: false,
      isHovering: false,
      startDragLngLat: null,
      startBearing: null,
      startPitch: null
    };
    _this._queryParams = {};
    _mapboxGl2.default.accessToken = props.mapboxApiAccessToken;

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

      var map = new _mapboxGl2.default.Map({
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
      _mapboxGl2.default.accessToken = newProps.mapboxApiAccessToken;
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

      var _unprojectFromTransfo = (0, _transform.unprojectFromTransform)(transform, new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))()),
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

      transform.setLocationAtPoint({ lng: lng, lat: lat }, new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))());
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
      var features = this._map.queryRenderedFeatures(new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))(), this._queryParams);
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
        var point = new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))();
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

      var point = new (Function.prototype.bind.apply(_mapboxGl.Point, [null].concat(_toConsumableArray(pos))))();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tYXAucmVhY3QuanMiXSwibmFtZXMiOlsibm9vcCIsIk1BWF9QSVRDSCIsIlBJVENIX01PVVNFX1RIUkVTSE9MRCIsIlBJVENIX0FDQ0VMIiwiUFJPUF9UWVBFUyIsImxhdGl0dWRlIiwibnVtYmVyIiwiaXNSZXF1aXJlZCIsImxvbmdpdHVkZSIsInpvb20iLCJtYXhab29tIiwibWFwU3R5bGUiLCJvbmVPZlR5cGUiLCJzdHJpbmciLCJpbnN0YW5jZU9mIiwiTWFwIiwibWFwYm94QXBpQWNjZXNzVG9rZW4iLCJvbkNoYW5nZVZpZXdwb3J0IiwiZnVuYyIsIndpZHRoIiwiaGVpZ2h0IiwiaXNEcmFnZ2luZyIsImJvb2wiLCJzdGFydERyYWdMbmdMYXQiLCJhcnJheSIsIm9uSG92ZXJGZWF0dXJlcyIsImlnbm9yZUVtcHR5RmVhdHVyZXMiLCJhdHRyaWJ1dGlvbkNvbnRyb2wiLCJvbkNsaWNrIiwib25DbGlja0ZlYXR1cmVzIiwiY2xpY2tSYWRpdXMiLCJwcmVzZXJ2ZURyYXdpbmdCdWZmZXIiLCJwcmV2ZW50U3R5bGVEaWZmaW5nIiwicGVyc3BlY3RpdmVFbmFibGVkIiwiYmVhcmluZyIsInBpdGNoIiwiYWx0aXR1ZGUiLCJvbkxvYWQiLCJERUZBVUxUX1BST1BTIiwiREVGQVVMVFMiLCJNQVBCT1hfQVBJX0FDQ0VTU19UT0tFTiIsIk1hcEdMIiwic3VwcG9ydGVkIiwicHJvcHMiLCJzdGF0ZSIsImlzU3VwcG9ydGVkIiwiaXNIb3ZlcmluZyIsInN0YXJ0QmVhcmluZyIsInN0YXJ0UGl0Y2giLCJfcXVlcnlQYXJhbXMiLCJhY2Nlc3NUb2tlbiIsImNvbXBvbmVudERpZE1vdW50IiwiY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyIsImNvbXBvbmVudERpZFVwZGF0ZSIsImlzTWFwIiwidG9KUyIsIm1hcCIsImNvbnRhaW5lciIsInJlZnMiLCJtYXBib3hNYXAiLCJjZW50ZXIiLCJzdHlsZSIsImludGVyYWN0aXZlIiwib25jZSIsImdldENhbnZhcyIsIl9tYXAiLCJfdXBkYXRlTWFwVmlld3BvcnQiLCJfY2FsbE9uQ2hhbmdlVmlld3BvcnQiLCJ0cmFuc2Zvcm0iLCJfdXBkYXRlUXVlcnlQYXJhbXMiLCJuZXdQcm9wcyIsIl91cGRhdGVTdGF0ZUZyb21Qcm9wcyIsIl91cGRhdGVNYXBTdHlsZSIsInNldFN0YXRlIiwiX3VwZGF0ZU1hcFNpemUiLCJyZW1vdmUiLCJpc0ludGVyYWN0aXZlIiwib25DbGlja0ZlYXR1cmUiLCJDVVJTT1IiLCJHUkFCQklORyIsIlBPSU5URVIiLCJHUkFCIiwib2xkUHJvcHMiLCJpbnRlcmFjdGl2ZUxheWVySWRzIiwibGVuZ3RoIiwibGF5ZXJzIiwidXBkYXRlIiwibmV3U291cmNlIiwic291cmNlIiwidHlwZSIsIm9sZFNvdXJjZSIsImdldFNvdXJjZSIsImlkIiwib2xkT3B0cyIsIndvcmtlck9wdGlvbnMiLCJtYXh6b29tIiwidW5kZWZpbmVkIiwiZ2VvanNvblZ0T3B0aW9ucyIsImJ1ZmZlciIsInRvbGVyYW5jZSIsImNsdXN0ZXIiLCJjbHVzdGVyUmFkaXVzIiwic3VwZXJjbHVzdGVyT3B0aW9ucyIsInJhZGl1cyIsImNsdXN0ZXJNYXhab29tIiwic2V0RGF0YSIsImRhdGEiLCJyZW1vdmVTb3VyY2UiLCJhZGRTb3VyY2UiLCJwcmV2U3R5bGUiLCJuZXh0U3R5bGUiLCJwcmV2S2V5c01hcCIsInN0eWxlS2V5c01hcCIsIm5leHRLZXlzTWFwIiwiZGVsZXRlIiwicHJvcHNPdGhlclRoYW5MYXllcnNPclNvdXJjZXNEaWZmZXIiLCJwcmV2S2V5c0xpc3QiLCJPYmplY3QiLCJrZXlzIiwibmV4dEtleXNMaXN0Iiwic29tZSIsImdldCIsImtleSIsInNldFN0eWxlIiwic291cmNlc0RpZmYiLCJsYXllcnNEaWZmIiwidXBkYXRlcyIsIm5vZGUiLCJsYXllciIsImVudGVyIiwiX3VwZGF0ZVNvdXJjZSIsImV4aXQiLCJleGl0aW5nIiwiZ2V0TGF5ZXIiLCJyZW1vdmVMYXllciIsImFkZExheWVyIiwiYmVmb3JlIiwib2xkTWFwU3R5bGUiLCJfc2V0RGlmZlN0eWxlIiwidmlld3BvcnRDaGFuZ2VkIiwianVtcFRvIiwic2l6ZUNoYW5nZWQiLCJyZXNpemUiLCJwb3MiLCJzdGFydFBvcyIsInhEZWx0YSIsInlEZWx0YSIsIk1hdGgiLCJhYnMiLCJzY2FsZSIsInkiLCJ5U2NhbGUiLCJtYXgiLCJtaW4iLCJvcHRzIiwibGF0IiwibG5nIiwiX29uTW91c2VEb3duIiwiX29uTW91c2VEcmFnIiwiX29uTW91c2VSb3RhdGUiLCJfb25Nb3VzZVVwIiwiX29uTW91c2VDbGljayIsInNldExvY2F0aW9uQXRQb2ludCIsIl9jYWxjdWxhdGVOZXdQaXRjaEFuZEJlYXJpbmciLCJmZWF0dXJlcyIsInF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyIsIm9wdCIsInBvaW50IiwibGF0TG9uZyIsInVucHJvamVjdCIsInNpemUiLCJiYm94IiwiYXJvdW5kIiwic2NhbGVab29tIiwiY2xhc3NOYW1lIiwiY3Vyc29yIiwiX2dldEN1cnNvciIsImNvbnRlbnQiLCJwb3NpdGlvbiIsImxlZnQiLCJ0b3AiLCJjaGlsZHJlbiIsIl9vbk1vdXNlTW92ZSIsIl9vblRvdWNoU3RhcnQiLCJfb25Ub3VjaERyYWciLCJfb25Ub3VjaFJvdGF0ZSIsIl9vblRvdWNoRW5kIiwiX29uVG91Y2hUYXAiLCJfb25ab29tIiwiX29uWm9vbUVuZCIsInByb3BUeXBlcyIsImRlZmF1bHRQcm9wcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztvREFBQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBQ0E7Ozs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7QUFDQTs7OztBQUNBOzs7O0FBRUE7Ozs7QUFDQTs7OztBQUVBOztBQUNBOzs7O0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBRUEsU0FBU0EsSUFBVCxHQUFnQixDQUFF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S0FBS3dCLEtBQUwsQ0FBV3hCLEtBRnBCO0FBR0VDLG9CQUFRLEtBQUt1QixLQUFMLENBQVd2QixNQUhyQjtBQUlFOEosc0JBQVU7QUFKWixZQURGO0FBUUlEO0FBUkosT0FERjtBQWFEOzs7OzZCQWxmTWEsUyxHQUFZMUwsVSxVQUNaMkwsWSxHQUFlekosYTs7a0JBUEhHLEsiLCJmaWxlIjoibWFwLnJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IChjKSAyMDE1IFViZXIgVGVjaG5vbG9naWVzLCBJbmMuXG5cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhIGNvcHlcbi8vIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlIFwiU29mdHdhcmVcIiksIHRvIGRlYWxcbi8vIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmcgd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHNcbi8vIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCwgZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGxcbi8vIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXQgcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpc1xuLy8gZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZSBmb2xsb3dpbmcgY29uZGl0aW9uczpcblxuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWQgaW5cbi8vIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuXG4vLyBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4vLyBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbi8vIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuLy8gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuLy8gTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbi8vIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbi8vIFRIRSBTT0ZUV0FSRS5cbmltcG9ydCBSZWFjdCwge1Byb3BUeXBlcywgQ29tcG9uZW50fSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgYXV0b2JpbmQgZnJvbSAnYXV0b2JpbmQtZGVjb3JhdG9yJztcbmltcG9ydCBwdXJlUmVuZGVyIGZyb20gJ3B1cmUtcmVuZGVyLWRlY29yYXRvcic7XG5cbmltcG9ydCBtYXBib3hnbCwge1BvaW50fSBmcm9tICdtYXBib3gtZ2wnO1xuaW1wb3J0IHtzZWxlY3R9IGZyb20gJ2QzLXNlbGVjdGlvbic7XG5pbXBvcnQgSW1tdXRhYmxlIGZyb20gJ2ltbXV0YWJsZSc7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5cbmltcG9ydCBNYXBJbnRlcmFjdGlvbnMgZnJvbSAnLi9tYXAtaW50ZXJhY3Rpb25zLnJlYWN0JztcbmltcG9ydCBjb25maWcgZnJvbSAnLi9jb25maWcnO1xuXG5pbXBvcnQge2dldEludGVyYWN0aXZlTGF5ZXJJZHN9IGZyb20gJy4vdXRpbHMvc3R5bGUtdXRpbHMnO1xuaW1wb3J0IGRpZmZTdHlsZXMgZnJvbSAnLi91dGlscy9kaWZmLXN0eWxlcyc7XG5pbXBvcnQge21vZCwgdW5wcm9qZWN0RnJvbVRyYW5zZm9ybSwgY2xvbmVUcmFuc2Zvcm19IGZyb20gJy4vdXRpbHMvdHJhbnNmb3JtJztcblxuZnVuY3Rpb24gbm9vcCgpIHt9XG5cbi8vIE5vdGU6IE1heCBwaXRjaCBpcyBhIGhhcmQgY29kZWQgdmFsdWUgKG5vdCBhIG5hbWVkIGNvbnN0YW50KSBpbiB0cmFuc2Zvcm0uanNcbmNvbnN0IE1BWF9QSVRDSCA9IDYwO1xuY29uc3QgUElUQ0hfTU9VU0VfVEhSRVNIT0xEID0gMjA7XG5jb25zdCBQSVRDSF9BQ0NFTCA9IDEuMjtcblxuY29uc3QgUFJPUF9UWVBFUyA9IHtcbiAgLyoqXG4gICAgKiBUaGUgbGF0aXR1ZGUgb2YgdGhlIGNlbnRlciBvZiB0aGUgbWFwLlxuICAgICovXG4gIGxhdGl0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgICogVGhlIGxvbmdpdHVkZSBvZiB0aGUgY2VudGVyIG9mIHRoZSBtYXAuXG4gICAgKi9cbiAgbG9uZ2l0dWRlOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgICogVGhlIHRpbGUgem9vbSBsZXZlbCBvZiB0aGUgbWFwLlxuICAgICovXG4gIHpvb206IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgLyoqXG4gICAgKiBUaGUgbWF4aW11bSB0aWxlIHpvb20gbGV2ZWwgb2YgdGhlIG1hcC4gRGVmYXVsdHMgdG8gMjAuXG4gICAgKiBJbmNyZWFzaW5nIHRoaXMgd2lsbCBhbGxvdyB5b3UgdG8gem9vbSBmdXJ0aGVyIGludG8gdGhlIG1hcCBidXQgc2hvdWxkXG4gICAgKiBvbmx5IGJlIHVzZWQgaWYgeW91IGtub3cgd2hhdCB5b3UgYXJlIGRvaW5nIHBhc3Qgem9vbSAyMC4gVGhlIGRlZmF1bHRcbiAgICAqIG1hcCBzdHlsZXMgd29uJ3QgcmVuZGVyIGFueXRoaW5nIHVzZWZ1bCBwYXN0IDIwLlxuICAgICovXG4gIG1heFpvb206IFByb3BUeXBlcy5udW1iZXIsXG4gIC8qKlxuICAgICogVGhlIE1hcGJveCBzdHlsZSB0aGUgY29tcG9uZW50IHNob3VsZCB1c2UuIENhbiBlaXRoZXIgYmUgYSBzdHJpbmcgdXJsXG4gICAgKiBvciBhIE1hcGJveEdMIHN0eWxlIEltbXV0YWJsZS5NYXAgb2JqZWN0LlxuICAgICovXG4gIG1hcFN0eWxlOiBQcm9wVHlwZXMub25lT2ZUeXBlKFtcbiAgICBQcm9wVHlwZXMuc3RyaW5nLFxuICAgIFByb3BUeXBlcy5pbnN0YW5jZU9mKEltbXV0YWJsZS5NYXApXG4gIF0pLFxuICAvKipcbiAgICAqIFRoZSBNYXBib3ggQVBJIGFjY2VzcyB0b2tlbiB0byBwcm92aWRlIHRvIG1hcGJveC1nbC1qcy4gVGhpcyBpcyByZXF1aXJlZFxuICAgICogd2hlbiB1c2luZyBNYXBib3ggcHJvdmlkZWQgdmVjdG9yIHRpbGVzIGFuZCBzdHlsZXMuXG4gICAgKi9cbiAgbWFwYm94QXBpQWNjZXNzVG9rZW46IFByb3BUeXBlcy5zdHJpbmcsXG4gIC8qKlxuICAgICogYG9uQ2hhbmdlVmlld3BvcnRgIGNhbGxiYWNrIGlzIGZpcmVkIHdoZW4gdGhlIHVzZXIgaW50ZXJhY3RlZCB3aXRoIHRoZVxuICAgICogbWFwLiBUaGUgb2JqZWN0IHBhc3NlZCB0byB0aGUgY2FsbGJhY2sgY29udGFpbnMgYGxhdGl0dWRlYCxcbiAgICAqIGBsb25naXR1ZGVgIGFuZCBgem9vbWAgYW5kIGFkZGl0aW9uYWwgc3RhdGUgaW5mb3JtYXRpb24uXG4gICAgKi9cbiAgb25DaGFuZ2VWaWV3cG9ydDogUHJvcFR5cGVzLmZ1bmMsXG4gIC8qKlxuICAgICogVGhlIHdpZHRoIG9mIHRoZSBtYXAuXG4gICAgKi9cbiAgd2lkdGg6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgLyoqXG4gICAgKiBUaGUgaGVpZ2h0IG9mIHRoZSBtYXAuXG4gICAgKi9cbiAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gIC8qKlxuICAgICogSXMgdGhlIGNvbXBvbmVudCBjdXJyZW50bHkgYmVpbmcgZHJhZ2dlZC4gVGhpcyBpcyB1c2VkIHRvIHNob3cvaGlkZSB0aGVcbiAgICAqIGRyYWcgY3Vyc29yLiBBbHNvIHVzZWQgYXMgYW4gb3B0aW1pemF0aW9uIGluIHNvbWUgb3ZlcmxheXMgYnkgcHJldmVudGluZ1xuICAgICogcmVuZGVyaW5nIHdoaWxlIGRyYWdnaW5nLlxuICAgICovXG4gIGlzRHJhZ2dpbmc6IFByb3BUeXBlcy5ib29sLFxuICAvKipcbiAgICAqIFJlcXVpcmVkIHRvIGNhbGN1bGF0ZSB0aGUgbW91c2UgcHJvamVjdGlvbiBhZnRlciB0aGUgZmlyc3QgY2xpY2sgZXZlbnRcbiAgICAqIGR1cmluZyBkcmFnZ2luZy4gV2hlcmUgdGhlIG1hcCBpcyBkZXBlbmRzIG9uIHdoZXJlIHlvdSBmaXJzdCBjbGlja2VkIG9uXG4gICAgKiB0aGUgbWFwLlxuICAgICovXG4gIHN0YXJ0RHJhZ0xuZ0xhdDogUHJvcFR5cGVzLmFycmF5LFxuICAvKipcbiAgICAqIENhbGxlZCB3aGVuIGEgZmVhdHVyZSBpcyBob3ZlcmVkIG92ZXIuIFVzZXMgTWFwYm94J3NcbiAgICAqIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyBBUEkgdG8gZmluZCBmZWF0dXJlcyB1bmRlciB0aGUgcG9pbnRlcjpcbiAgICAqIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jTWFwI3F1ZXJ5UmVuZGVyZWRGZWF0dXJlc1xuICAgICogVG8gcXVlcnkgb25seSBzb21lIG9mIHRoZSBsYXllcnMsIHNldCB0aGUgYGludGVyYWN0aXZlYCBwcm9wZXJ0eSBpbiB0aGVcbiAgICAqIGxheWVyIHN0eWxlIHRvIGB0cnVlYC4gU2VlIE1hcGJveCdzIHN0eWxlIHNwZWNcbiAgICAqIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLXN0eWxlLXNwZWMvI2xheWVyLWludGVyYWN0aXZlXG4gICAgKiBJZiBubyBpbnRlcmFjdGl2ZSBsYXllcnMgYXJlIGZvdW5kIChlLmcuIHVzaW5nIE1hcGJveCdzIGRlZmF1bHQgc3R5bGVzKSxcbiAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIHF1ZXJ5IGFsbCBsYXllcnMuXG4gICAgKiBAY2FsbGJhY2tcbiAgICAqIEBwYXJhbSB7YXJyYXl9IGZlYXR1cmVzIC0gVGhlIGFycmF5IG9mIGZlYXR1cmVzIHRoZSBtb3VzZSBpcyBvdmVyLlxuICAgICovXG4gIG9uSG92ZXJGZWF0dXJlczogUHJvcFR5cGVzLmZ1bmMsXG4gIC8qKlxuICAgICogRGVmYXVsdHMgdG8gVFJVRVxuICAgICogU2V0IHRvIGZhbHNlIHRvIGVuYWJsZSBvbkhvdmVyRmVhdHVyZXMgdG8gYmUgY2FsbGVkIHJlZ2FyZGxlc3MgaWZcbiAgICAqIHRoZXJlIGlzIGFuIGFjdHVhbCBmZWF0dXJlIGF0IHgsIHkuIFRoaXMgaXMgdXNlZnVsIHRvIGVtdWxhdGVcbiAgICAqIFwibW91c2Utb3V0XCIgYmVoYXZpb3JzIG9uIGZlYXR1cmVzLlxuICAgICovXG4gIGlnbm9yZUVtcHR5RmVhdHVyZXM6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgICogU2hvdyBhdHRyaWJ1dGlvbiBjb250cm9sIG9yIG5vdC5cbiAgICAqL1xuICBhdHRyaWJ1dGlvbkNvbnRyb2w6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgKiBDYWxsZWQgd2hlbiB0aGUgbWFwIGlzIGNsaWNrZWQuIFRoZSBoYW5kbGVyIGlzIGNhbGxlZCB3aXRoIHRoZSBjbGlja2VkXG4gICAqIGNvb3JkaW5hdGVzIChodHRwczovL3d3dy5tYXBib3guY29tL21hcGJveC1nbC1qcy9hcGkvI0xuZ0xhdCkgYW5kIHRoZVxuICAgKiBzY3JlZW4gY29vcmRpbmF0ZXMgKGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jUG9pbnRMaWtlKS5cbiAgICovXG4gIG9uQ2xpY2s6IFByb3BUeXBlcy5mdW5jLFxuXG4gIC8qKlxuICAgICogQ2FsbGVkIHdoZW4gYSBmZWF0dXJlIGlzIGNsaWNrZWQgb24uIFVzZXMgTWFwYm94J3NcbiAgICAqIHF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyBBUEkgdG8gZmluZCBmZWF0dXJlcyB1bmRlciB0aGUgcG9pbnRlcjpcbiAgICAqIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLWpzL2FwaS8jTWFwI3F1ZXJ5UmVuZGVyZWRGZWF0dXJlc1xuICAgICogVG8gcXVlcnkgb25seSBzb21lIG9mIHRoZSBsYXllcnMsIHNldCB0aGUgYGludGVyYWN0aXZlYCBwcm9wZXJ0eSBpbiB0aGVcbiAgICAqIGxheWVyIHN0eWxlIHRvIGB0cnVlYC4gU2VlIE1hcGJveCdzIHN0eWxlIHNwZWNcbiAgICAqIGh0dHBzOi8vd3d3Lm1hcGJveC5jb20vbWFwYm94LWdsLXN0eWxlLXNwZWMvI2xheWVyLWludGVyYWN0aXZlXG4gICAgKiBJZiBubyBpbnRlcmFjdGl2ZSBsYXllcnMgYXJlIGZvdW5kIChlLmcuIHVzaW5nIE1hcGJveCdzIGRlZmF1bHQgc3R5bGVzKSxcbiAgICAqIHdpbGwgZmFsbCBiYWNrIHRvIHF1ZXJ5IGFsbCBsYXllcnMuXG4gICAgKi9cbiAgb25DbGlja0ZlYXR1cmVzOiBQcm9wVHlwZXMuZnVuYyxcblxuICAvKipcbiAgICAqIFJhZGl1cyB0byBkZXRlY3QgZmVhdHVyZXMgYXJvdW5kIGEgY2xpY2tlZCBwb2ludC4gRGVmYXVsdHMgdG8gMTUuXG4gICAgKi9cbiAgY2xpY2tSYWRpdXM6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAgKiBQYXNzZWQgdG8gTWFwYm94IE1hcCBjb25zdHJ1Y3RvciB3aGljaCBwYXNzZXMgaXQgdG8gdGhlIGNhbnZhcyBjb250ZXh0LlxuICAgICogVGhpcyBpcyB1bnNlZnVsIHdoZW4geW91IHdhbnQgdG8gZXhwb3J0IHRoZSBjYW52YXMgYXMgYSBQTkcuXG4gICAgKi9cbiAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICAqIFRoZXJlIGFyZSBzdGlsbCBrbm93biBpc3N1ZXMgd2l0aCBzdHlsZSBkaWZmaW5nLiBBcyBhIHRlbXBvcmFyeSBzdG9wZ2FwLFxuICAgICogYWRkIHRoZSBvcHRpb24gdG8gcHJldmVudCBzdHlsZSBkaWZmaW5nLlxuICAgICovXG4gIHByZXZlbnRTdHlsZURpZmZpbmc6IFByb3BUeXBlcy5ib29sLFxuXG4gIC8qKlxuICAgICogRW5hYmxlcyBwZXJzcGVjdGl2ZSBjb250cm9sIGV2ZW50IGhhbmRsaW5nXG4gICAgKi9cbiAgcGVyc3BlY3RpdmVFbmFibGVkOiBQcm9wVHlwZXMuYm9vbCxcblxuICAvKipcbiAgICAqIFNwZWNpZnkgdGhlIGJlYXJpbmcgb2YgdGhlIHZpZXdwb3J0XG4gICAgKi9cbiAgYmVhcmluZzogUHJvcFR5cGVzLm51bWJlcixcblxuICAvKipcbiAgICAqIFNwZWNpZnkgdGhlIHBpdGNoIG9mIHRoZSB2aWV3cG9ydFxuICAgICovXG4gIHBpdGNoOiBQcm9wVHlwZXMubnVtYmVyLFxuXG4gIC8qKlxuICAgICogU3BlY2lmeSB0aGUgYWx0aXR1ZGUgb2YgdGhlIHZpZXdwb3J0IGNhbWVyYVxuICAgICogVW5pdDogbWFwIGhlaWdodHMsIGRlZmF1bHQgMS41XG4gICAgKiBOb24tcHVibGljIEFQSSwgc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9tYXBib3gvbWFwYm94LWdsLWpzL2lzc3Vlcy8xMTM3XG4gICAgKi9cbiAgYWx0aXR1ZGU6IFByb3BUeXBlcy5udW1iZXIsXG5cbiAgLyoqXG4gICAgKiBUaGUgbG9hZCBjYWxsYmFjayBpcyBjYWxsZWQgd2hlbiBhbGwgZGVwZW5kZW5jaWVzIGhhdmUgYmVlbiBsb2FkZWQgYW5kXG4gICAgKiB0aGUgbWFwIGlzIHJlYWR5LlxuICAgICovXG4gIG9uTG9hZDogUHJvcFR5cGVzLmZ1bmNcblxufTtcblxuY29uc3QgREVGQVVMVF9QUk9QUyA9IHtcbiAgbWFwU3R5bGU6ICdtYXBib3g6Ly9zdHlsZXMvbWFwYm94L2xpZ2h0LXY5JyxcbiAgb25DaGFuZ2VWaWV3cG9ydDogbnVsbCxcbiAgbWFwYm94QXBpQWNjZXNzVG9rZW46IGNvbmZpZy5ERUZBVUxUUy5NQVBCT1hfQVBJX0FDQ0VTU19UT0tFTixcbiAgcHJlc2VydmVEcmF3aW5nQnVmZmVyOiBmYWxzZSxcbiAgYXR0cmlidXRpb25Db250cm9sOiB0cnVlLFxuICBpZ25vcmVFbXB0eUZlYXR1cmVzOiB0cnVlLFxuICBiZWFyaW5nOiAwLFxuICBwaXRjaDogMCxcbiAgYWx0aXR1ZGU6IDEuNSxcbiAgY2xpY2tSYWRpdXM6IDE1LFxuICBtYXhab29tOiAyMFxufTtcblxuQHB1cmVSZW5kZXJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIE1hcEdMIGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgc3VwcG9ydGVkKCkge1xuICAgIHJldHVybiBtYXBib3hnbC5zdXBwb3J0ZWQoKTtcbiAgfVxuXG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBQUk9QX1RZUEVTO1xuICBzdGF0aWMgZGVmYXVsdFByb3BzID0gREVGQVVMVF9QUk9QUztcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgaXNTdXBwb3J0ZWQ6IG1hcGJveGdsLnN1cHBvcnRlZCgpLFxuICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICBpc0hvdmVyaW5nOiBmYWxzZSxcbiAgICAgIHN0YXJ0RHJhZ0xuZ0xhdDogbnVsbCxcbiAgICAgIHN0YXJ0QmVhcmluZzogbnVsbCxcbiAgICAgIHN0YXJ0UGl0Y2g6IG51bGxcbiAgICB9O1xuICAgIHRoaXMuX3F1ZXJ5UGFyYW1zID0ge307XG4gICAgbWFwYm94Z2wuYWNjZXNzVG9rZW4gPSBwcm9wcy5tYXBib3hBcGlBY2Nlc3NUb2tlbjtcblxuICAgIGlmICghdGhpcy5zdGF0ZS5pc1N1cHBvcnRlZCkge1xuICAgICAgdGhpcy5jb21wb25lbnREaWRNb3VudCA9IG5vb3A7XG4gICAgICB0aGlzLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMgPSBub29wO1xuICAgICAgdGhpcy5jb21wb25lbnREaWRVcGRhdGUgPSBub29wO1xuICAgIH1cbiAgfVxuXG4gIGNvbXBvbmVudERpZE1vdW50KCkge1xuICAgIGNvbnN0IG1hcFN0eWxlID0gSW1tdXRhYmxlLk1hcC5pc01hcCh0aGlzLnByb3BzLm1hcFN0eWxlKSA/XG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlLnRvSlMoKSA6XG4gICAgICB0aGlzLnByb3BzLm1hcFN0eWxlO1xuXG4gICAgY29uc3QgbWFwID0gbmV3IG1hcGJveGdsLk1hcCh7XG4gICAgICBjb250YWluZXI6IHRoaXMucmVmcy5tYXBib3hNYXAsXG4gICAgICBjZW50ZXI6IFt0aGlzLnByb3BzLmxvbmdpdHVkZSwgdGhpcy5wcm9wcy5sYXRpdHVkZV0sXG4gICAgICB6b29tOiB0aGlzLnByb3BzLnpvb20sXG4gICAgICBtYXhab29tOiB0aGlzLnByb3BzLm1heFpvb20sXG4gICAgICBwaXRjaDogdGhpcy5wcm9wcy5waXRjaCxcbiAgICAgIGJlYXJpbmc6IHRoaXMucHJvcHMuYmVhcmluZyxcbiAgICAgIHN0eWxlOiBtYXBTdHlsZSxcbiAgICAgIGludGVyYWN0aXZlOiBmYWxzZSxcbiAgICAgIHByZXNlcnZlRHJhd2luZ0J1ZmZlcjogdGhpcy5wcm9wcy5wcmVzZXJ2ZURyYXdpbmdCdWZmZXJcbiAgICAgIC8vIFRPRE8/XG4gICAgICAvLyBhdHRyaWJ1dGlvbkNvbnRyb2w6IHRoaXMucHJvcHMuYXR0cmlidXRpb25Db250cm9sXG4gICAgfSk7XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkxvYWQpIHtcbiAgICAgIG1hcC5vbmNlKCdsb2FkJywgKCkgPT4gdGhpcy5wcm9wcy5vbkxvYWQoKSk7XG4gICAgfVxuXG4gICAgc2VsZWN0KG1hcC5nZXRDYW52YXMoKSkuc3R5bGUoJ291dGxpbmUnLCAnbm9uZScpO1xuXG4gICAgdGhpcy5fbWFwID0gbWFwO1xuICAgIHRoaXMuX3VwZGF0ZU1hcFZpZXdwb3J0KHt9LCB0aGlzLnByb3BzKTtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydChtYXAudHJhbnNmb3JtKTtcbiAgICB0aGlzLl91cGRhdGVRdWVyeVBhcmFtcyhtYXBTdHlsZSk7XG4gIH1cblxuICAvLyBOZXcgcHJvcHMgYXJlIGNvbWluJyByb3VuZCB0aGUgY29ybmVyIVxuICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5ld1Byb3BzKSB7XG4gICAgdGhpcy5fdXBkYXRlU3RhdGVGcm9tUHJvcHModGhpcy5wcm9wcywgbmV3UHJvcHMpO1xuICAgIHRoaXMuX3VwZGF0ZU1hcFZpZXdwb3J0KHRoaXMucHJvcHMsIG5ld1Byb3BzKTtcbiAgICB0aGlzLl91cGRhdGVNYXBTdHlsZSh0aGlzLnByb3BzLCBuZXdQcm9wcyk7XG4gICAgLy8gU2F2ZSB3aWR0aC9oZWlnaHQgc28gdGhhdCB3ZSBjYW4gY2hlY2sgdGhlbSBpbiBjb21wb25lbnREaWRVcGRhdGVcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuICAgICAgaGVpZ2h0OiB0aGlzLnByb3BzLmhlaWdodFxuICAgIH0pO1xuICB9XG5cbiAgY29tcG9uZW50RGlkVXBkYXRlKCkge1xuICAgIC8vIG1hcC5yZXNpemUoKSByZWFkcyBzaXplIGZyb20gRE9NLCB3ZSBuZWVkIHRvIGNhbGwgYWZ0ZXIgcmVuZGVyXG4gICAgdGhpcy5fdXBkYXRlTWFwU2l6ZSh0aGlzLnN0YXRlLCB0aGlzLnByb3BzKTtcbiAgfVxuXG4gIGNvbXBvbmVudFdpbGxVbm1vdW50KCkge1xuICAgIGlmICh0aGlzLl9tYXApIHtcbiAgICAgIHRoaXMuX21hcC5yZW1vdmUoKTtcbiAgICB9XG4gIH1cblxuICAvLyBFeHRlcm5hbCBhcHBzIGNhbiBhY2Nlc3MgbWFwIHRoaXMgd2F5XG4gIF9nZXRNYXAoKSB7XG4gICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgfVxuXG4gIC8vIENhbGN1bGF0ZSBhIGN1cnNvciBzdHlsZVxuICBfZ2V0Q3Vyc29yKCkge1xuICAgIGNvbnN0IGlzSW50ZXJhY3RpdmUgPVxuICAgICAgdGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0IHx8XG4gICAgICB0aGlzLnByb3BzLm9uQ2xpY2tGZWF0dXJlIHx8XG4gICAgICB0aGlzLnByb3BzLm9uSG92ZXJGZWF0dXJlcztcbiAgICBpZiAoaXNJbnRlcmFjdGl2ZSkge1xuICAgICAgcmV0dXJuIHRoaXMucHJvcHMuaXNEcmFnZ2luZyA/XG4gICAgICAgIGNvbmZpZy5DVVJTT1IuR1JBQkJJTkcgOlxuICAgICAgICAodGhpcy5zdGF0ZS5pc0hvdmVyaW5nID8gY29uZmlnLkNVUlNPUi5QT0lOVEVSIDogY29uZmlnLkNVUlNPUi5HUkFCKTtcbiAgICB9XG4gICAgcmV0dXJuICdpbmhlcml0JztcbiAgfVxuXG4gIF91cGRhdGVTdGF0ZUZyb21Qcm9wcyhvbGRQcm9wcywgbmV3UHJvcHMpIHtcbiAgICBtYXBib3hnbC5hY2Nlc3NUb2tlbiA9IG5ld1Byb3BzLm1hcGJveEFwaUFjY2Vzc1Rva2VuO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgc3RhcnREcmFnTG5nTGF0OiBuZXdQcm9wcy5zdGFydERyYWdMbmdMYXRcbiAgICB9KTtcbiAgfVxuXG4gIC8vIEhvdmVyIGFuZCBjbGljayBvbmx5IHF1ZXJ5IGxheWVycyB3aG9zZSBpbnRlcmFjdGl2ZSBwcm9wZXJ0eSBpcyB0cnVlXG4gIC8vIElmIG5vIGludGVyYWN0aXZpdHkgaXMgc3BlY2lmaWVkLCBxdWVyeSBhbGwgbGF5ZXJzXG4gIF91cGRhdGVRdWVyeVBhcmFtcyhtYXBTdHlsZSkge1xuICAgIGNvbnN0IGludGVyYWN0aXZlTGF5ZXJJZHMgPSBnZXRJbnRlcmFjdGl2ZUxheWVySWRzKG1hcFN0eWxlKTtcbiAgICB0aGlzLl9xdWVyeVBhcmFtcyA9IGludGVyYWN0aXZlTGF5ZXJJZHMubGVuZ3RoID09PSAwID8ge30gOlxuICAgICAge2xheWVyczogaW50ZXJhY3RpdmVMYXllcklkc307XG4gIH1cblxuICAvLyBVcGRhdGUgYSBzb3VyY2UgaW4gdGhlIG1hcCBzdHlsZVxuICBfdXBkYXRlU291cmNlKG1hcCwgdXBkYXRlKSB7XG4gICAgY29uc3QgbmV3U291cmNlID0gdXBkYXRlLnNvdXJjZS50b0pTKCk7XG4gICAgaWYgKG5ld1NvdXJjZS50eXBlID09PSAnZ2VvanNvbicpIHtcbiAgICAgIGNvbnN0IG9sZFNvdXJjZSA9IG1hcC5nZXRTb3VyY2UodXBkYXRlLmlkKTtcbiAgICAgIGlmIChvbGRTb3VyY2UudHlwZSA9PT0gJ2dlb2pzb24nKSB7XG4gICAgICAgIC8vIHVwZGF0ZSBkYXRhIGlmIG5vIG90aGVyIEdlb0pTT05Tb3VyY2Ugb3B0aW9ucyB3ZXJlIGNoYW5nZWRcbiAgICAgICAgY29uc3Qgb2xkT3B0cyA9IG9sZFNvdXJjZS53b3JrZXJPcHRpb25zO1xuICAgICAgICBpZiAoXG4gICAgICAgICAgKG5ld1NvdXJjZS5tYXh6b29tID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS5tYXh6b29tID09PSBvbGRPcHRzLmdlb2pzb25WdE9wdGlvbnMubWF4Wm9vbSkgJiZcbiAgICAgICAgICAobmV3U291cmNlLmJ1ZmZlciA9PT0gdW5kZWZpbmVkIHx8XG4gICAgICAgICAgICBuZXdTb3VyY2UuYnVmZmVyID09PSBvbGRPcHRzLmdlb2pzb25WdE9wdGlvbnMuYnVmZmVyKSAmJlxuICAgICAgICAgIChuZXdTb3VyY2UudG9sZXJhbmNlID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS50b2xlcmFuY2UgPT09IG9sZE9wdHMuZ2VvanNvblZ0T3B0aW9ucy50b2xlcmFuY2UpICYmXG4gICAgICAgICAgKG5ld1NvdXJjZS5jbHVzdGVyID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS5jbHVzdGVyID09PSBvbGRPcHRzLmNsdXN0ZXIpICYmXG4gICAgICAgICAgKG5ld1NvdXJjZS5jbHVzdGVyUmFkaXVzID09PSB1bmRlZmluZWQgfHxcbiAgICAgICAgICAgIG5ld1NvdXJjZS5jbHVzdGVyUmFkaXVzID09PSBvbGRPcHRzLnN1cGVyY2x1c3Rlck9wdGlvbnMucmFkaXVzKSAmJlxuICAgICAgICAgIChuZXdTb3VyY2UuY2x1c3Rlck1heFpvb20gPT09IHVuZGVmaW5lZCB8fFxuICAgICAgICAgICAgbmV3U291cmNlLmNsdXN0ZXJNYXhab29tID09PSBvbGRPcHRzLnN1cGVyY2x1c3Rlck9wdGlvbnMubWF4Wm9vbSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgb2xkU291cmNlLnNldERhdGEobmV3U291cmNlLmRhdGEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIG1hcC5yZW1vdmVTb3VyY2UodXBkYXRlLmlkKTtcbiAgICBtYXAuYWRkU291cmNlKHVwZGF0ZS5pZCwgbmV3U291cmNlKTtcbiAgfVxuXG4gIC8vIEluZGl2aWR1YWxseSB1cGRhdGUgdGhlIG1hcHMgc291cmNlIGFuZCBsYXllcnMgdGhhdCBoYXZlIGNoYW5nZWQgaWYgYWxsXG4gIC8vIG90aGVyIHN0eWxlIHByb3BzIGhhdmVuJ3QgY2hhbmdlZC4gVGhpcyBwcmV2ZW50cyBmbGlja2luZyBvZiB0aGUgbWFwIHdoZW5cbiAgLy8gc3R5bGVzIG9ubHkgY2hhbmdlIHNvdXJjZXMgb3IgbGF5ZXJzLlxuICAvKiBlc2xpbnQtZGlzYWJsZSBtYXgtc3RhdGVtZW50cywgY29tcGxleGl0eSAqL1xuICBfc2V0RGlmZlN0eWxlKHByZXZTdHlsZSwgbmV4dFN0eWxlKSB7XG4gICAgY29uc3QgcHJldktleXNNYXAgPSBwcmV2U3R5bGUgJiYgc3R5bGVLZXlzTWFwKHByZXZTdHlsZSkgfHwge307XG4gICAgY29uc3QgbmV4dEtleXNNYXAgPSBzdHlsZUtleXNNYXAobmV4dFN0eWxlKTtcbiAgICBmdW5jdGlvbiBzdHlsZUtleXNNYXAoc3R5bGUpIHtcbiAgICAgIHJldHVybiBzdHlsZS5tYXAoKCkgPT4gdHJ1ZSkuZGVsZXRlKCdsYXllcnMnKS5kZWxldGUoJ3NvdXJjZXMnKS50b0pTKCk7XG4gICAgfVxuICAgIGZ1bmN0aW9uIHByb3BzT3RoZXJUaGFuTGF5ZXJzT3JTb3VyY2VzRGlmZmVyKCkge1xuICAgICAgY29uc3QgcHJldktleXNMaXN0ID0gT2JqZWN0LmtleXMocHJldktleXNNYXApO1xuICAgICAgY29uc3QgbmV4dEtleXNMaXN0ID0gT2JqZWN0LmtleXMobmV4dEtleXNNYXApO1xuICAgICAgaWYgKHByZXZLZXlzTGlzdC5sZW5ndGggIT09IG5leHRLZXlzTGlzdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICAvLyBgbmV4dFN0eWxlYCBhbmQgYHByZXZTdHlsZWAgc2hvdWxkIG5vdCBoYXZlIHRoZSBzYW1lIHNldCBvZiBwcm9wcy5cbiAgICAgIGlmIChuZXh0S2V5c0xpc3Quc29tZShcbiAgICAgICAga2V5ID0+IHByZXZTdHlsZS5nZXQoa2V5KSAhPT0gbmV4dFN0eWxlLmdldChrZXkpXG4gICAgICAgIC8vIEJ1dCB0aGUgdmFsdWUgb2Ygb25lIG9mIHRob3NlIHByb3BzIGlzIGRpZmZlcmVudC5cbiAgICAgICkpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgbWFwID0gdGhpcy5fbWFwO1xuXG4gICAgaWYgKCFwcmV2U3R5bGUgfHwgcHJvcHNPdGhlclRoYW5MYXllcnNPclNvdXJjZXNEaWZmZXIoKSkge1xuICAgICAgbWFwLnNldFN0eWxlKG5leHRTdHlsZS50b0pTKCkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHtzb3VyY2VzRGlmZiwgbGF5ZXJzRGlmZn0gPSBkaWZmU3R5bGVzKHByZXZTdHlsZSwgbmV4dFN0eWxlKTtcblxuICAgIC8vIFRPRE86IEl0J3MgcmF0aGVyIGRpZmZpY3VsdCB0byBkZXRlcm1pbmUgc3R5bGUgZGlmZmluZyBpbiB0aGUgcHJlc2VuY2VcbiAgICAvLyBvZiByZWZzLiBGb3Igbm93LCBpZiBhbnkgc3R5bGUgdXBkYXRlIGhhcyBhIHJlZiwgZmFsbGJhY2sgdG8gbm8gZGlmZmluZy5cbiAgICAvLyBXZSBjYW4gY29tZSBiYWNrIHRvIHRoaXMgY2FzZSBpZiB0aGVyZSdzIGEgc29saWQgdXNlY2FzZS5cbiAgICBpZiAobGF5ZXJzRGlmZi51cGRhdGVzLnNvbWUobm9kZSA9PiBub2RlLmxheWVyLmdldCgncmVmJykpKSB7XG4gICAgICBtYXAuc2V0U3R5bGUobmV4dFN0eWxlLnRvSlMoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBlbnRlciBvZiBzb3VyY2VzRGlmZi5lbnRlcikge1xuICAgICAgbWFwLmFkZFNvdXJjZShlbnRlci5pZCwgZW50ZXIuc291cmNlLnRvSlMoKSk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgdXBkYXRlIG9mIHNvdXJjZXNEaWZmLnVwZGF0ZSkge1xuICAgICAgdGhpcy5fdXBkYXRlU291cmNlKG1hcCwgdXBkYXRlKTtcbiAgICB9XG4gICAgZm9yIChjb25zdCBleGl0IG9mIHNvdXJjZXNEaWZmLmV4aXQpIHtcbiAgICAgIG1hcC5yZW1vdmVTb3VyY2UoZXhpdC5pZCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgZXhpdCBvZiBsYXllcnNEaWZmLmV4aXRpbmcpIHtcbiAgICAgIGlmIChtYXAuc3R5bGUuZ2V0TGF5ZXIoZXhpdC5pZCkpIHtcbiAgICAgICAgbWFwLnJlbW92ZUxheWVyKGV4aXQuaWQpO1xuICAgICAgfVxuICAgIH1cbiAgICBmb3IgKGNvbnN0IHVwZGF0ZSBvZiBsYXllcnNEaWZmLnVwZGF0ZXMpIHtcbiAgICAgIGlmICghdXBkYXRlLmVudGVyKSB7XG4gICAgICAgIC8vIFRoaXMgaXMgYW4gb2xkIGxheWVyIHRoYXQgbmVlZHMgdG8gYmUgdXBkYXRlZC4gUmVtb3ZlIHRoZSBvbGQgbGF5ZXJcbiAgICAgICAgLy8gd2l0aCB0aGUgc2FtZSBpZCBhbmQgYWRkIGl0IGJhY2sgYWdhaW4uXG4gICAgICAgIG1hcC5yZW1vdmVMYXllcih1cGRhdGUuaWQpO1xuICAgICAgfVxuICAgICAgbWFwLmFkZExheWVyKHVwZGF0ZS5sYXllci50b0pTKCksIHVwZGF0ZS5iZWZvcmUpO1xuICAgIH1cbiAgfVxuICAvKiBlc2xpbnQtZW5hYmxlIG1heC1zdGF0ZW1lbnRzLCBjb21wbGV4aXR5ICovXG5cbiAgX3VwZGF0ZU1hcFN0eWxlKG9sZFByb3BzLCBuZXdQcm9wcykge1xuICAgIGNvbnN0IG1hcFN0eWxlID0gbmV3UHJvcHMubWFwU3R5bGU7XG4gICAgY29uc3Qgb2xkTWFwU3R5bGUgPSBvbGRQcm9wcy5tYXBTdHlsZTtcbiAgICBpZiAobWFwU3R5bGUgIT09IG9sZE1hcFN0eWxlKSB7XG4gICAgICBpZiAoSW1tdXRhYmxlLk1hcC5pc01hcChtYXBTdHlsZSkpIHtcbiAgICAgICAgaWYgKHRoaXMucHJvcHMucHJldmVudFN0eWxlRGlmZmluZykge1xuICAgICAgICAgIHRoaXMuX21hcC5zZXRTdHlsZShtYXBTdHlsZS50b0pTKCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuX3NldERpZmZTdHlsZShvbGRNYXBTdHlsZSwgbWFwU3R5bGUpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9tYXAuc2V0U3R5bGUobWFwU3R5bGUpO1xuICAgICAgfVxuICAgICAgdGhpcy5fdXBkYXRlUXVlcnlQYXJhbXMobWFwU3R5bGUpO1xuICAgIH1cbiAgfVxuXG4gIF91cGRhdGVNYXBWaWV3cG9ydChvbGRQcm9wcywgbmV3UHJvcHMpIHtcbiAgICBjb25zdCB2aWV3cG9ydENoYW5nZWQgPVxuICAgICAgbmV3UHJvcHMubGF0aXR1ZGUgIT09IG9sZFByb3BzLmxhdGl0dWRlIHx8XG4gICAgICBuZXdQcm9wcy5sb25naXR1ZGUgIT09IG9sZFByb3BzLmxvbmdpdHVkZSB8fFxuICAgICAgbmV3UHJvcHMuem9vbSAhPT0gb2xkUHJvcHMuem9vbSB8fFxuICAgICAgbmV3UHJvcHMucGl0Y2ggIT09IG9sZFByb3BzLnBpdGNoIHx8XG4gICAgICBuZXdQcm9wcy56b29tICE9PSBvbGRQcm9wcy5iZWFyaW5nIHx8XG4gICAgICBuZXdQcm9wcy5hbHRpdHVkZSAhPT0gb2xkUHJvcHMuYWx0aXR1ZGU7XG5cbiAgICBpZiAodmlld3BvcnRDaGFuZ2VkKSB7XG4gICAgICB0aGlzLl9tYXAuanVtcFRvKHtcbiAgICAgICAgY2VudGVyOiBbbmV3UHJvcHMubG9uZ2l0dWRlLCBuZXdQcm9wcy5sYXRpdHVkZV0sXG4gICAgICAgIHpvb206IG5ld1Byb3BzLnpvb20sXG4gICAgICAgIGJlYXJpbmc6IG5ld1Byb3BzLmJlYXJpbmcsXG4gICAgICAgIHBpdGNoOiBuZXdQcm9wcy5waXRjaFxuICAgICAgfSk7XG5cbiAgICAgIC8vIFRPRE8gLSBqdW1wVG8gZG9lc24ndCBoYW5kbGUgYWx0aXR1ZGVcbiAgICAgIGlmIChuZXdQcm9wcy5hbHRpdHVkZSAhPT0gb2xkUHJvcHMuYWx0aXR1ZGUpIHtcbiAgICAgICAgdGhpcy5fbWFwLnRyYW5zZm9ybS5hbHRpdHVkZSA9IG5ld1Byb3BzLmFsdGl0dWRlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIE5vdGU6IG5lZWRzIHRvIGJlIGNhbGxlZCBhZnRlciByZW5kZXIgKGUuZy4gaW4gY29tcG9uZW50RGlkVXBkYXRlKVxuICBfdXBkYXRlTWFwU2l6ZShvbGRQcm9wcywgbmV3UHJvcHMpIHtcbiAgICBjb25zdCBzaXplQ2hhbmdlZCA9XG4gICAgICBvbGRQcm9wcy53aWR0aCAhPT0gbmV3UHJvcHMud2lkdGggfHwgb2xkUHJvcHMuaGVpZ2h0ICE9PSBuZXdQcm9wcy5oZWlnaHQ7XG5cbiAgICBpZiAoc2l6ZUNoYW5nZWQpIHtcbiAgICAgIHRoaXMuX21hcC5yZXNpemUoKTtcbiAgICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRoaXMuX21hcC50cmFuc2Zvcm0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIENhbGN1bGF0ZXMgYSBuZXcgcGl0Y2ggYW5kIGJlYXJpbmcgZnJvbSBhIHBvc2l0aW9uIChjb21pbmcgZnJvbSBhbiBldmVudClcbiAgX2NhbGN1bGF0ZU5ld1BpdGNoQW5kQmVhcmluZyh7cG9zLCBzdGFydFBvcywgc3RhcnRCZWFyaW5nLCBzdGFydFBpdGNofSkge1xuICAgIGNvbnN0IHhEZWx0YSA9IHBvc1swXSAtIHN0YXJ0UG9zWzBdO1xuICAgIGNvbnN0IGJlYXJpbmcgPSBzdGFydEJlYXJpbmcgKyAxODAgKiB4RGVsdGEgLyB0aGlzLnByb3BzLndpZHRoO1xuXG4gICAgbGV0IHBpdGNoID0gc3RhcnRQaXRjaDtcbiAgICBjb25zdCB5RGVsdGEgPSBwb3NbMV0gLSBzdGFydFBvc1sxXTtcbiAgICBpZiAoeURlbHRhID4gMCkge1xuICAgICAgLy8gRHJhZ2dpbmcgZG93bndhcmRzLCBncmFkdWFsbHkgZGVjcmVhc2UgcGl0Y2hcbiAgICAgIGlmIChNYXRoLmFicyh0aGlzLnByb3BzLmhlaWdodCAtIHN0YXJ0UG9zWzFdKSA+IFBJVENIX01PVVNFX1RIUkVTSE9MRCkge1xuICAgICAgICBjb25zdCBzY2FsZSA9IHlEZWx0YSAvICh0aGlzLnByb3BzLmhlaWdodCAtIHN0YXJ0UG9zWzFdKTtcbiAgICAgICAgcGl0Y2ggPSAoMSAtIHNjYWxlKSAqIFBJVENIX0FDQ0VMICogc3RhcnRQaXRjaDtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHlEZWx0YSA8IDApIHtcbiAgICAgIC8vIERyYWdnaW5nIHVwd2FyZHMsIGdyYWR1YWxseSBpbmNyZWFzZSBwaXRjaFxuICAgICAgaWYgKHN0YXJ0UG9zLnkgPiBQSVRDSF9NT1VTRV9USFJFU0hPTEQpIHtcbiAgICAgICAgLy8gTW92ZSBmcm9tIDAgdG8gMSBhcyB3ZSBkcmFnIHVwd2FyZHNcbiAgICAgICAgY29uc3QgeVNjYWxlID0gMSAtIHBvc1sxXSAvIHN0YXJ0UG9zWzFdO1xuICAgICAgICAvLyBHcmFkdWFsbHkgYWRkIHVudGlsIHdlIGhpdCBtYXggcGl0Y2hcbiAgICAgICAgcGl0Y2ggPSBzdGFydFBpdGNoICsgeVNjYWxlICogKE1BWF9QSVRDSCAtIHN0YXJ0UGl0Y2gpO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIGNvbnNvbGUuZGVidWcoc3RhcnRQaXRjaCwgcGl0Y2gpO1xuICAgIHJldHVybiB7XG4gICAgICBwaXRjaDogTWF0aC5tYXgoTWF0aC5taW4ocGl0Y2gsIE1BWF9QSVRDSCksIDApLFxuICAgICAgYmVhcmluZ1xuICAgIH07XG4gIH1cblxuICAgLy8gSGVscGVyIHRvIGNhbGwgcHJvcHMub25DaGFuZ2VWaWV3cG9ydFxuICBfY2FsbE9uQ2hhbmdlVmlld3BvcnQodHJhbnNmb3JtLCBvcHRzID0ge30pIHtcbiAgICBpZiAodGhpcy5wcm9wcy5vbkNoYW5nZVZpZXdwb3J0KSB7XG4gICAgICB0aGlzLnByb3BzLm9uQ2hhbmdlVmlld3BvcnQoe1xuICAgICAgICBsYXRpdHVkZTogdHJhbnNmb3JtLmNlbnRlci5sYXQsXG4gICAgICAgIGxvbmdpdHVkZTogbW9kKHRyYW5zZm9ybS5jZW50ZXIubG5nICsgMTgwLCAzNjApIC0gMTgwLFxuICAgICAgICB6b29tOiB0cmFuc2Zvcm0uem9vbSxcbiAgICAgICAgcGl0Y2g6IHRyYW5zZm9ybS5waXRjaCxcbiAgICAgICAgYmVhcmluZzogbW9kKHRyYW5zZm9ybS5iZWFyaW5nICsgMTgwLCAzNjApIC0gMTgwLFxuXG4gICAgICAgIGlzRHJhZ2dpbmc6IHRoaXMucHJvcHMuaXNEcmFnZ2luZyxcbiAgICAgICAgc3RhcnREcmFnTG5nTGF0OiB0aGlzLnByb3BzLnN0YXJ0RHJhZ0xuZ0xhdCxcbiAgICAgICAgc3RhcnRCZWFyaW5nOiB0aGlzLnByb3BzLnN0YXJ0QmVhcmluZyxcbiAgICAgICAgc3RhcnRQaXRjaDogdGhpcy5wcm9wcy5zdGFydFBpdGNoLFxuXG4gICAgICAgIC4uLm9wdHNcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Ub3VjaFN0YXJ0KG9wdHMpIHtcbiAgICB0aGlzLl9vbk1vdXNlRG93bihvcHRzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Ub3VjaERyYWcob3B0cykge1xuICAgIHRoaXMuX29uTW91c2VEcmFnKG9wdHMpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vblRvdWNoUm90YXRlKG9wdHMpIHtcbiAgICB0aGlzLl9vbk1vdXNlUm90YXRlKG9wdHMpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vblRvdWNoRW5kKG9wdHMpIHtcbiAgICB0aGlzLl9vbk1vdXNlVXAob3B0cyk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uVG91Y2hUYXAob3B0cykge1xuICAgIHRoaXMuX29uTW91c2VDbGljayhvcHRzKTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZURvd24oe3Bvc30pIHtcbiAgICBjb25zdCB7dHJhbnNmb3JtfSA9IHRoaXMuX21hcDtcbiAgICBjb25zdCB7bG5nLCBsYXR9ID0gdW5wcm9qZWN0RnJvbVRyYW5zZm9ybSh0cmFuc2Zvcm0sIG5ldyBQb2ludCguLi5wb3MpKTtcbiAgICB0aGlzLl9jYWxsT25DaGFuZ2VWaWV3cG9ydCh0cmFuc2Zvcm0sIHtcbiAgICAgIGlzRHJhZ2dpbmc6IHRydWUsXG4gICAgICBzdGFydERyYWdMbmdMYXQ6IFtsbmcsIGxhdF0sXG4gICAgICBzdGFydEJlYXJpbmc6IHRyYW5zZm9ybS5iZWFyaW5nLFxuICAgICAgc3RhcnRQaXRjaDogdHJhbnNmb3JtLnBpdGNoXG4gICAgfSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uTW91c2VEcmFnKHtwb3N9KSB7XG4gICAgaWYgKCF0aGlzLnByb3BzLm9uQ2hhbmdlVmlld3BvcnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyB0YWtlIHRoZSBzdGFydCBsbmdsYXQgYW5kIHB1dCBpdCB3aGVyZSB0aGUgbW91c2UgaXMgZG93bi5cbiAgICBhc3NlcnQodGhpcy5wcm9wcy5zdGFydERyYWdMbmdMYXQsICdgc3RhcnREcmFnTG5nTGF0YCBwcm9wIGlzIHJlcXVpcmVkICcgK1xuICAgICAgJ2ZvciBtb3VzZSBkcmFnIGJlaGF2aW9yIHRvIGNhbGN1bGF0ZSB3aGVyZSB0byBwb3NpdGlvbiB0aGUgbWFwLicpO1xuXG4gICAgY29uc3QgdHJhbnNmb3JtID0gY2xvbmVUcmFuc2Zvcm0odGhpcy5fbWFwLnRyYW5zZm9ybSk7XG4gICAgY29uc3QgW2xuZywgbGF0XSA9IHRoaXMucHJvcHMuc3RhcnREcmFnTG5nTGF0O1xuICAgIHRyYW5zZm9ybS5zZXRMb2NhdGlvbkF0UG9pbnQoe2xuZywgbGF0fSwgbmV3IFBvaW50KC4uLnBvcykpO1xuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRyYW5zZm9ybSwge2lzRHJhZ2dpbmc6IHRydWV9KTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZVJvdGF0ZSh7cG9zLCBzdGFydFBvc30pIHtcbiAgICBpZiAoIXRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydCB8fCAhdGhpcy5wcm9wcy5wZXJzcGVjdGl2ZUVuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7c3RhcnRCZWFyaW5nLCBzdGFydFBpdGNofSA9IHRoaXMucHJvcHM7XG4gICAgYXNzZXJ0KHR5cGVvZiBzdGFydEJlYXJpbmcgPT09ICdudW1iZXInLFxuICAgICAgJ2BzdGFydEJlYXJpbmdgIHByb3AgaXMgcmVxdWlyZWQgZm9yIG1vdXNlIHJvdGF0ZSBiZWhhdmlvcicpO1xuICAgIGFzc2VydCh0eXBlb2Ygc3RhcnRQaXRjaCA9PT0gJ251bWJlcicsXG4gICAgICAnYHN0YXJ0UGl0Y2hgIHByb3AgaXMgcmVxdWlyZWQgZm9yIG1vdXNlIHJvdGF0ZSBiZWhhdmlvcicpO1xuXG4gICAgY29uc3Qge3BpdGNoLCBiZWFyaW5nfSA9IHRoaXMuX2NhbGN1bGF0ZU5ld1BpdGNoQW5kQmVhcmluZyh7XG4gICAgICBwb3MsXG4gICAgICBzdGFydFBvcyxcbiAgICAgIHN0YXJ0QmVhcmluZyxcbiAgICAgIHN0YXJ0UGl0Y2hcbiAgICB9KTtcblxuICAgIGNvbnN0IHRyYW5zZm9ybSA9IGNsb25lVHJhbnNmb3JtKHRoaXMuX21hcC50cmFuc2Zvcm0pO1xuICAgIHRyYW5zZm9ybS5iZWFyaW5nID0gYmVhcmluZztcbiAgICB0cmFuc2Zvcm0ucGl0Y2ggPSBwaXRjaDtcblxuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRyYW5zZm9ybSwge2lzRHJhZ2dpbmc6IHRydWV9KTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25Nb3VzZU1vdmUoe3Bvc30pIHtcbiAgICBpZiAoIXRoaXMucHJvcHMub25Ib3ZlckZlYXR1cmVzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5fbWFwLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhuZXcgUG9pbnQoLi4ucG9zKSwgdGhpcy5fcXVlcnlQYXJhbXMpO1xuICAgIGlmICghZmVhdHVyZXMubGVuZ3RoICYmIHRoaXMucHJvcHMuaWdub3JlRW1wdHlGZWF0dXJlcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLnNldFN0YXRlKHtpc0hvdmVyaW5nOiBmZWF0dXJlcy5sZW5ndGggPiAwfSk7XG4gICAgdGhpcy5wcm9wcy5vbkhvdmVyRmVhdHVyZXMoZmVhdHVyZXMpO1xuICB9XG5cbiAgQGF1dG9iaW5kIF9vbk1vdXNlVXAob3B0KSB7XG4gICAgdGhpcy5fY2FsbE9uQ2hhbmdlVmlld3BvcnQodGhpcy5fbWFwLnRyYW5zZm9ybSwge1xuICAgICAgaXNEcmFnZ2luZzogZmFsc2UsXG4gICAgICBzdGFydERyYWdMbmdMYXQ6IG51bGwsXG4gICAgICBzdGFydEJlYXJpbmc6IG51bGwsXG4gICAgICBzdGFydFBpdGNoOiBudWxsXG4gICAgfSk7XG4gIH1cblxuICBAYXV0b2JpbmQgX29uTW91c2VDbGljayh7cG9zfSkge1xuICAgIGlmICghdGhpcy5wcm9wcy5vbkNsaWNrRmVhdHVyZXMgJiYgIXRoaXMucHJvcHMub25DbGljaykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnByb3BzLm9uQ2xpY2spIHtcbiAgICAgIGNvbnN0IHBvaW50ID0gbmV3IFBvaW50KC4uLnBvcyk7XG4gICAgICBjb25zdCBsYXRMb25nID0gdGhpcy5fbWFwLnVucHJvamVjdChwb2ludCk7XG4gICAgICAvLyBUT0RPIC0gRG8gd2UgcmVhbGx5IHdhbnQgdG8gZXhwb3NlIGEgbWFwYm94IFwiUG9pbnRcIiBpbiBvdXIgaW50ZXJmYWNlP1xuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrKGxhdExvbmcsIHBvaW50KTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wcm9wcy5vbkNsaWNrRmVhdHVyZXMpIHtcbiAgICAgIC8vIFJhZGl1cyBlbmFibGVzIHBvaW50IGZlYXR1cmVzLCBsaWtlIG1hcmtlciBzeW1ib2xzLCB0byBiZSBjbGlja2VkLlxuICAgICAgY29uc3Qgc2l6ZSA9IHRoaXMucHJvcHMuY2xpY2tSYWRpdXM7XG4gICAgICBjb25zdCBiYm94ID0gW1twb3NbMF0gLSBzaXplLCBwb3NbMV0gLSBzaXplXSwgW3Bvc1swXSArIHNpemUsIHBvc1sxXSArIHNpemVdXTtcbiAgICAgIGNvbnN0IGZlYXR1cmVzID0gdGhpcy5fbWFwLnF1ZXJ5UmVuZGVyZWRGZWF0dXJlcyhiYm94LCB0aGlzLl9xdWVyeVBhcmFtcyk7XG4gICAgICBpZiAoIWZlYXR1cmVzLmxlbmd0aCAmJiB0aGlzLnByb3BzLmlnbm9yZUVtcHR5RmVhdHVyZXMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5wcm9wcy5vbkNsaWNrRmVhdHVyZXMoZmVhdHVyZXMpO1xuICAgIH1cbiAgfVxuXG4gIEBhdXRvYmluZCBfb25ab29tKHtwb3MsIHNjYWxlfSkge1xuICAgIGNvbnN0IHBvaW50ID0gbmV3IFBvaW50KC4uLnBvcyk7XG4gICAgY29uc3QgdHJhbnNmb3JtID0gY2xvbmVUcmFuc2Zvcm0odGhpcy5fbWFwLnRyYW5zZm9ybSk7XG4gICAgY29uc3QgYXJvdW5kID0gdW5wcm9qZWN0RnJvbVRyYW5zZm9ybSh0cmFuc2Zvcm0sIHBvaW50KTtcbiAgICB0cmFuc2Zvcm0uem9vbSA9IHRyYW5zZm9ybS5zY2FsZVpvb20odGhpcy5fbWFwLnRyYW5zZm9ybS5zY2FsZSAqIHNjYWxlKTtcbiAgICB0cmFuc2Zvcm0uc2V0TG9jYXRpb25BdFBvaW50KGFyb3VuZCwgcG9pbnQpO1xuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRyYW5zZm9ybSwge2lzRHJhZ2dpbmc6IHRydWV9KTtcbiAgfVxuXG4gIEBhdXRvYmluZCBfb25ab29tRW5kKCkge1xuICAgIHRoaXMuX2NhbGxPbkNoYW5nZVZpZXdwb3J0KHRoaXMuX21hcC50cmFuc2Zvcm0sIHtpc0RyYWdnaW5nOiBmYWxzZX0pO1xuICB9XG5cbiAgcmVuZGVyKCkge1xuICAgIGNvbnN0IHtjbGFzc05hbWUsIHdpZHRoLCBoZWlnaHQsIHN0eWxlfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgbWFwU3R5bGUgPSB7XG4gICAgICAuLi5zdHlsZSxcbiAgICAgIHdpZHRoLFxuICAgICAgaGVpZ2h0LFxuICAgICAgY3Vyc29yOiB0aGlzLl9nZXRDdXJzb3IoKVxuICAgIH07XG5cbiAgICBsZXQgY29udGVudCA9IFtcbiAgICAgIDxkaXYga2V5PVwibWFwXCIgcmVmPVwibWFwYm94TWFwXCJcbiAgICAgICAgc3R5bGU9eyBtYXBTdHlsZSB9IGNsYXNzTmFtZT17IGNsYXNzTmFtZSB9Lz4sXG4gICAgICA8ZGl2IGtleT1cIm92ZXJsYXlzXCIgY2xhc3NOYW1lPVwib3ZlcmxheXNcIlxuICAgICAgICBzdHlsZT17IHtwb3NpdGlvbjogJ2Fic29sdXRlJywgbGVmdDogMCwgdG9wOiAwfSB9PlxuICAgICAgICB7IHRoaXMucHJvcHMuY2hpbGRyZW4gfVxuICAgICAgPC9kaXY+XG4gICAgXTtcblxuICAgIGlmICh0aGlzLnN0YXRlLmlzU3VwcG9ydGVkICYmIHRoaXMucHJvcHMub25DaGFuZ2VWaWV3cG9ydCkge1xuICAgICAgY29udGVudCA9IChcbiAgICAgICAgPE1hcEludGVyYWN0aW9uc1xuICAgICAgICAgIG9uTW91c2VEb3duID17IHRoaXMuX29uTW91c2VEb3duIH1cbiAgICAgICAgICBvbk1vdXNlRHJhZyA9eyB0aGlzLl9vbk1vdXNlRHJhZyB9XG4gICAgICAgICAgb25Nb3VzZVJvdGF0ZSA9eyB0aGlzLl9vbk1vdXNlUm90YXRlIH1cbiAgICAgICAgICBvbk1vdXNlVXAgPXsgdGhpcy5fb25Nb3VzZVVwIH1cbiAgICAgICAgICBvbk1vdXNlTW92ZSA9eyB0aGlzLl9vbk1vdXNlTW92ZSB9XG4gICAgICAgICAgb25Nb3VzZUNsaWNrID0geyB0aGlzLl9vbk1vdXNlQ2xpY2sgfVxuICAgICAgICAgIG9uVG91Y2hTdGFydCA9eyB0aGlzLl9vblRvdWNoU3RhcnQgfVxuICAgICAgICAgIG9uVG91Y2hEcmFnID17IHRoaXMuX29uVG91Y2hEcmFnIH1cbiAgICAgICAgICBvblRvdWNoUm90YXRlID17IHRoaXMuX29uVG91Y2hSb3RhdGUgfVxuICAgICAgICAgIG9uVG91Y2hFbmQgPXsgdGhpcy5fb25Ub3VjaEVuZCB9XG4gICAgICAgICAgb25Ub3VjaFRhcCA9IHsgdGhpcy5fb25Ub3VjaFRhcCB9XG4gICAgICAgICAgb25ab29tID17IHRoaXMuX29uWm9vbSB9XG4gICAgICAgICAgb25ab29tRW5kID17IHRoaXMuX29uWm9vbUVuZCB9XG4gICAgICAgICAgd2lkdGggPXsgdGhpcy5wcm9wcy53aWR0aCB9XG4gICAgICAgICAgaGVpZ2h0ID17IHRoaXMucHJvcHMuaGVpZ2h0IH0+XG5cbiAgICAgICAgICB7IGNvbnRlbnQgfVxuXG4gICAgICAgIDwvTWFwSW50ZXJhY3Rpb25zPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBzdHlsZT17IHtcbiAgICAgICAgICAuLi50aGlzLnByb3BzLnN0eWxlLFxuICAgICAgICAgIHdpZHRoOiB0aGlzLnByb3BzLndpZHRoLFxuICAgICAgICAgIGhlaWdodDogdGhpcy5wcm9wcy5oZWlnaHQsXG4gICAgICAgICAgcG9zaXRpb246ICdyZWxhdGl2ZSdcbiAgICAgICAgfSB9PlxuXG4gICAgICAgIHsgY29udGVudCB9XG5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cbiJdfQ==