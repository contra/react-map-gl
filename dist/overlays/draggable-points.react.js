'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _desc, _value, _class, _class2, _temp; // Copyright (c) 2015 Uber Technologies, Inc.

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

var _immutable = require('immutable');

var _immutable2 = _interopRequireDefault(_immutable);

var _svgTransform = require('svg-transform');

var _svgTransform2 = _interopRequireDefault(_svgTransform);

var _document = require('global/document');

var _document2 = _interopRequireDefault(_document);

var _config = require('../config');

var _config2 = _interopRequireDefault(_config);

var _viewportMercatorProject = require('viewport-mercator-project');

var _viewportMercatorProject2 = _interopRequireDefault(_viewportMercatorProject);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

function mouse(container, event) {
  var rect = container.getBoundingClientRect();
  var x = event.clientX - rect.left - container.clientLeft;
  var y = event.clientY - rect.top - container.clientTop;
  return [x, y];
}

var DraggablePointsOverlay = (_class = (_temp = _class2 = function (_Component) {
  _inherits(DraggablePointsOverlay, _Component);

  function DraggablePointsOverlay(props) {
    _classCallCheck(this, DraggablePointsOverlay);

    var _this = _possibleConstructorReturn(this, (DraggablePointsOverlay.__proto__ || Object.getPrototypeOf(DraggablePointsOverlay)).call(this, props));

    _this.state = {
      draggedPointKey: null
    };
    return _this;
  }

  _createClass(DraggablePointsOverlay, [{
    key: '_onDragStart',
    value: function _onDragStart(point, event) {
      event.stopPropagation();
      _document2.default.addEventListener('mousemove', this._onDrag, false);
      _document2.default.addEventListener('mouseup', this._onDragEnd, false);
      this.setState({ draggedPointKey: this.props.keyAccessor(point) });
    }
  }, {
    key: '_onDrag',
    value: function _onDrag(event) {
      event.stopPropagation();
      var pixel = mouse(this.refs.container, event);
      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      var lngLat = mercator.unproject(pixel);
      var key = this.state.draggedPointKey;
      this.props.onUpdatePoint({ key: key, location: lngLat });
    }
  }, {
    key: '_onDragEnd',
    value: function _onDragEnd(event) {
      event.stopPropagation();
      _document2.default.removeEventListener('mousemove', this._onDrag, false);
      _document2.default.removeEventListener('mouseup', this._onDragEnd, false);
      this.setState({ draggedPoint: null });
    }
  }, {
    key: '_addPoint',
    value: function _addPoint(event) {
      event.stopPropagation();
      event.preventDefault();
      var pixel = mouse(this.refs.container, event);
      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      this.props.onAddPoint(mercator.unproject(pixel));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          points = _props.points,
          width = _props.width,
          height = _props.height,
          isDragging = _props.isDragging,
          style = _props.style;

      var mercator = (0, _viewportMercatorProject2.default)(this.props);
      return _react2.default.createElement(
        'svg',
        {
          ref: 'container',
          width: width,
          height: height,
          style: _extends({
            pointerEvents: 'all',
            position: 'absolute',
            left: 0,
            top: 0,
            cursor: isDragging ? _config2.default.CURSOR.GRABBING : _config2.default.CURSOR.GRAB
          }, style),
          onContextMenu: this._addPoint },
        _react2.default.createElement(
          'g',
          { style: { cursor: 'pointer' } },
          points.map(function (point, index) {
            var pixel = mercator.project(_this2.props.lngLatAccessor(point));
            return _react2.default.createElement(
              'g',
              {
                key: index,
                style: { pointerEvents: 'all' },
                transform: (0, _svgTransform2.default)([{ translate: pixel }]),
                onMouseDown: _this2._onDragStart.bind(_this2, point) },
              _this2.props.renderPoint.call(_this2, point, pixel)
            );
          })
        )
      );
    }
  }]);

  return DraggablePointsOverlay;
}(_react.Component), _class2.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  latitude: _react.PropTypes.number.isRequired,
  longitude: _react.PropTypes.number.isRequired,
  zoom: _react.PropTypes.number.isRequired,
  points: _react.PropTypes.instanceOf(_immutable2.default.List).isRequired,
  isDragging: _react.PropTypes.bool.isRequired,
  keyAccessor: _react.PropTypes.func.isRequired,
  lngLatAccessor: _react.PropTypes.func.isRequired,
  onAddPoint: _react.PropTypes.func.isRequired,
  onUpdatePoint: _react.PropTypes.func.isRequired,
  renderPoint: _react.PropTypes.func.isRequired
}, _class2.defaultProps = {
  keyAccessor: function keyAccessor(point) {
    return point.get('id');
  },
  lngLatAccessor: function lngLatAccessor(point) {
    return point.get('location').toArray();
  },
  onAddPoint: noop,
  onUpdatePoint: noop,
  renderPoint: noop,
  isDragging: false
}, _temp), (_applyDecoratedDescriptor(_class.prototype, '_onDragStart', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDragStart'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onDrag', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDrag'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_onDragEnd', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_onDragEnd'), _class.prototype), _applyDecoratedDescriptor(_class.prototype, '_addPoint', [_autobindDecorator2.default], Object.getOwnPropertyDescriptor(_class.prototype, '_addPoint'), _class.prototype)), _class);
exports.default = DraggablePointsOverlay;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy9vdmVybGF5cy9kcmFnZ2FibGUtcG9pbnRzLnJlYWN0LmpzIl0sIm5hbWVzIjpbIm5vb3AiLCJtb3VzZSIsImNvbnRhaW5lciIsImV2ZW50IiwicmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsIngiLCJjbGllbnRYIiwibGVmdCIsImNsaWVudExlZnQiLCJ5IiwiY2xpZW50WSIsInRvcCIsImNsaWVudFRvcCIsIkRyYWdnYWJsZVBvaW50c092ZXJsYXkiLCJwcm9wcyIsInN0YXRlIiwiZHJhZ2dlZFBvaW50S2V5IiwicG9pbnQiLCJzdG9wUHJvcGFnYXRpb24iLCJhZGRFdmVudExpc3RlbmVyIiwiX29uRHJhZyIsIl9vbkRyYWdFbmQiLCJzZXRTdGF0ZSIsImtleUFjY2Vzc29yIiwicGl4ZWwiLCJyZWZzIiwibWVyY2F0b3IiLCJsbmdMYXQiLCJ1bnByb2plY3QiLCJrZXkiLCJvblVwZGF0ZVBvaW50IiwibG9jYXRpb24iLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiZHJhZ2dlZFBvaW50IiwicHJldmVudERlZmF1bHQiLCJvbkFkZFBvaW50IiwicG9pbnRzIiwid2lkdGgiLCJoZWlnaHQiLCJpc0RyYWdnaW5nIiwic3R5bGUiLCJwb2ludGVyRXZlbnRzIiwicG9zaXRpb24iLCJjdXJzb3IiLCJDVVJTT1IiLCJHUkFCQklORyIsIkdSQUIiLCJfYWRkUG9pbnQiLCJtYXAiLCJpbmRleCIsInByb2plY3QiLCJsbmdMYXRBY2Nlc3NvciIsInRyYW5zbGF0ZSIsIl9vbkRyYWdTdGFydCIsImJpbmQiLCJyZW5kZXJQb2ludCIsImNhbGwiLCJwcm9wVHlwZXMiLCJudW1iZXIiLCJpc1JlcXVpcmVkIiwibGF0aXR1ZGUiLCJsb25naXR1ZGUiLCJ6b29tIiwiaW5zdGFuY2VPZiIsIkxpc3QiLCJib29sIiwiZnVuYyIsImRlZmF1bHRQcm9wcyIsImdldCIsInRvQXJyYXkiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OzJDQUFBOztBQUVBO0FBQ0E7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LENBQWlCQyxVQUxOO0FBTWpCdkIsVUFBUSxpQkFBVTJCLFVBQVYsQ0FBcUIsb0JBQVVDLElBQS9CLEVBQXFDTCxVQU41QjtBQU9qQnBCLGNBQVksaUJBQVUwQixJQUFWLENBQWVOLFVBUFY7QUFRakJwQyxlQUFhLGlCQUFVMkMsSUFBVixDQUFlUCxVQVJYO0FBU2pCUixrQkFBZ0IsaUJBQVVlLElBQVYsQ0FBZVAsVUFUZDtBQVVqQnhCLGNBQVksaUJBQVUrQixJQUFWLENBQWVQLFVBVlY7QUFXakI3QixpQkFBZSxpQkFBVW9DLElBQVYsQ0FBZVAsVUFYYjtBQVlqQkosZUFBYSxpQkFBVVcsSUFBVixDQUFlUDtBQVpYLEMsVUFlWlEsWSxHQUFlO0FBQ3BCNUMsZUFBYTtBQUFBLFdBQVNOLE1BQU1tRCxHQUFOLENBQVUsSUFBVixDQUFUO0FBQUEsR0FETztBQUVwQmpCLGtCQUFnQjtBQUFBLFdBQVNsQyxNQUFNbUQsR0FBTixDQUFVLFVBQVYsRUFBc0JDLE9BQXRCLEVBQVQ7QUFBQSxHQUZJO0FBR3BCbEMsY0FBWXBDLElBSFE7QUFJcEIrQixpQkFBZS9CLElBSks7QUFLcEJ3RCxlQUFheEQsSUFMTztBQU1wQndDLGNBQVk7QUFOUSxDO2tCQWpCSDFCLHNCIiwiZmlsZSI6ImRyYWdnYWJsZS1wb2ludHMucmVhY3QuanMiLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgKGMpIDIwMTUgVWJlciBUZWNobm9sb2dpZXMsIEluYy5cblxuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuLy8gb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuLy8gaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuLy8gdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuLy8gY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4vLyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZCBpblxuLy8gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG5cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1MgT1Jcbi8vIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZLFxuLy8gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4vLyBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLCBEQU1BR0VTIE9SIE9USEVSXG4vLyBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLFxuLy8gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuLy8gVEhFIFNPRlRXQVJFLlxuXG5pbXBvcnQgUmVhY3QsIHtQcm9wVHlwZXMsIENvbXBvbmVudH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGF1dG9iaW5kIGZyb20gJ2F1dG9iaW5kLWRlY29yYXRvcic7XG5cbmltcG9ydCBJbW11dGFibGUgZnJvbSAnaW1tdXRhYmxlJztcblxuaW1wb3J0IHRyYW5zZm9ybSBmcm9tICdzdmctdHJhbnNmb3JtJztcbmltcG9ydCBkb2N1bWVudCBmcm9tICdnbG9iYWwvZG9jdW1lbnQnO1xuaW1wb3J0IGNvbmZpZyBmcm9tICcuLi9jb25maWcnO1xuaW1wb3J0IFZpZXdwb3J0TWVyY2F0b3IgZnJvbSAndmlld3BvcnQtbWVyY2F0b3ItcHJvamVjdCc7XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5mdW5jdGlvbiBtb3VzZShjb250YWluZXIsIGV2ZW50KSB7XG4gIGNvbnN0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHggPSBldmVudC5jbGllbnRYIC0gcmVjdC5sZWZ0IC0gY29udGFpbmVyLmNsaWVudExlZnQ7XG4gIGNvbnN0IHkgPSBldmVudC5jbGllbnRZIC0gcmVjdC50b3AgLSBjb250YWluZXIuY2xpZW50VG9wO1xuICByZXR1cm4gW3gsIHldO1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBEcmFnZ2FibGVQb2ludHNPdmVybGF5IGV4dGVuZHMgQ29tcG9uZW50IHtcblxuICBzdGF0aWMgcHJvcFR5cGVzID0ge1xuICAgIHdpZHRoOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgaGVpZ2h0OiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgbGF0aXR1ZGU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICBsb25naXR1ZGU6IFByb3BUeXBlcy5udW1iZXIuaXNSZXF1aXJlZCxcbiAgICB6b29tOiBQcm9wVHlwZXMubnVtYmVyLmlzUmVxdWlyZWQsXG4gICAgcG9pbnRzOiBQcm9wVHlwZXMuaW5zdGFuY2VPZihJbW11dGFibGUuTGlzdCkuaXNSZXF1aXJlZCxcbiAgICBpc0RyYWdnaW5nOiBQcm9wVHlwZXMuYm9vbC5pc1JlcXVpcmVkLFxuICAgIGtleUFjY2Vzc29yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIGxuZ0xhdEFjY2Vzc29yOiBQcm9wVHlwZXMuZnVuYy5pc1JlcXVpcmVkLFxuICAgIG9uQWRkUG9pbnQ6IFByb3BUeXBlcy5mdW5jLmlzUmVxdWlyZWQsXG4gICAgb25VcGRhdGVQb2ludDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZCxcbiAgICByZW5kZXJQb2ludDogUHJvcFR5cGVzLmZ1bmMuaXNSZXF1aXJlZFxuICB9O1xuXG4gIHN0YXRpYyBkZWZhdWx0UHJvcHMgPSB7XG4gICAga2V5QWNjZXNzb3I6IHBvaW50ID0+IHBvaW50LmdldCgnaWQnKSxcbiAgICBsbmdMYXRBY2Nlc3NvcjogcG9pbnQgPT4gcG9pbnQuZ2V0KCdsb2NhdGlvbicpLnRvQXJyYXkoKSxcbiAgICBvbkFkZFBvaW50OiBub29wLFxuICAgIG9uVXBkYXRlUG9pbnQ6IG5vb3AsXG4gICAgcmVuZGVyUG9pbnQ6IG5vb3AsXG4gICAgaXNEcmFnZ2luZzogZmFsc2VcbiAgfTtcblxuICBjb25zdHJ1Y3Rvcihwcm9wcykge1xuICAgIHN1cGVyKHByb3BzKTtcbiAgICB0aGlzLnN0YXRlID0ge1xuICAgICAgZHJhZ2dlZFBvaW50S2V5OiBudWxsXG4gICAgfTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBfb25EcmFnU3RhcnQocG9pbnQsIGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uRHJhZ0VuZCwgZmFsc2UpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdnZWRQb2ludEtleTogdGhpcy5wcm9wcy5rZXlBY2Nlc3Nvcihwb2ludCl9KTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBfb25EcmFnKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgY29uc3QgcGl4ZWwgPSBtb3VzZSh0aGlzLnJlZnMuY29udGFpbmVyLCBldmVudCk7XG4gICAgY29uc3QgbWVyY2F0b3IgPSBWaWV3cG9ydE1lcmNhdG9yKHRoaXMucHJvcHMpO1xuICAgIGNvbnN0IGxuZ0xhdCA9IG1lcmNhdG9yLnVucHJvamVjdChwaXhlbCk7XG4gICAgY29uc3Qga2V5ID0gdGhpcy5zdGF0ZS5kcmFnZ2VkUG9pbnRLZXk7XG4gICAgdGhpcy5wcm9wcy5vblVwZGF0ZVBvaW50KHtrZXksIGxvY2F0aW9uOiBsbmdMYXR9KTtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBfb25EcmFnRW5kKGV2ZW50KSB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5fb25EcmFnLCBmYWxzZSk7XG4gICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMuX29uRHJhZ0VuZCwgZmFsc2UpO1xuICAgIHRoaXMuc2V0U3RhdGUoe2RyYWdnZWRQb2ludDogbnVsbH0pO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIF9hZGRQb2ludChldmVudCkge1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgY29uc3QgcGl4ZWwgPSBtb3VzZSh0aGlzLnJlZnMuY29udGFpbmVyLCBldmVudCk7XG4gICAgY29uc3QgbWVyY2F0b3IgPSBWaWV3cG9ydE1lcmNhdG9yKHRoaXMucHJvcHMpO1xuICAgIHRoaXMucHJvcHMub25BZGRQb2ludChtZXJjYXRvci51bnByb2plY3QocGl4ZWwpKTtcbiAgfVxuXG4gIHJlbmRlcigpIHtcbiAgICBjb25zdCB7cG9pbnRzLCB3aWR0aCwgaGVpZ2h0LCBpc0RyYWdnaW5nLCBzdHlsZX0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IG1lcmNhdG9yID0gVmlld3BvcnRNZXJjYXRvcih0aGlzLnByb3BzKTtcbiAgICByZXR1cm4gKFxuICAgICAgPHN2Z1xuICAgICAgICByZWY9XCJjb250YWluZXJcIlxuICAgICAgICB3aWR0aD17IHdpZHRoIH1cbiAgICAgICAgaGVpZ2h0PXsgaGVpZ2h0IH1cbiAgICAgICAgc3R5bGU9eyB7XG4gICAgICAgICAgcG9pbnRlckV2ZW50czogJ2FsbCcsXG4gICAgICAgICAgcG9zaXRpb246ICdhYnNvbHV0ZScsXG4gICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICB0b3A6IDAsXG4gICAgICAgICAgY3Vyc29yOiBpc0RyYWdnaW5nID8gY29uZmlnLkNVUlNPUi5HUkFCQklORyA6IGNvbmZpZy5DVVJTT1IuR1JBQixcbiAgICAgICAgICAuLi5zdHlsZVxuICAgICAgICB9IH1cbiAgICAgICAgb25Db250ZXh0TWVudT17IHRoaXMuX2FkZFBvaW50IH0+XG5cbiAgICAgICAgPGcgc3R5bGU9eyB7Y3Vyc29yOiAncG9pbnRlcid9IH0+XG4gICAgICAgICAge1xuICAgICAgICAgICAgcG9pbnRzLm1hcCgocG9pbnQsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHBpeGVsID0gbWVyY2F0b3IucHJvamVjdCh0aGlzLnByb3BzLmxuZ0xhdEFjY2Vzc29yKHBvaW50KSk7XG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPGdcbiAgICAgICAgICAgICAgICAgIGtleT17IGluZGV4IH1cbiAgICAgICAgICAgICAgICAgIHN0eWxlPXsge3BvaW50ZXJFdmVudHM6ICdhbGwnfSB9XG4gICAgICAgICAgICAgICAgICB0cmFuc2Zvcm09eyB0cmFuc2Zvcm0oW3t0cmFuc2xhdGU6IHBpeGVsfV0pIH1cbiAgICAgICAgICAgICAgICAgIG9uTW91c2VEb3duPXsgdGhpcy5fb25EcmFnU3RhcnQuYmluZCh0aGlzLCBwb2ludCkgfT5cbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wcm9wcy5yZW5kZXJQb2ludC5jYWxsKHRoaXMsIHBvaW50LCBwaXhlbClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICA8L2c+XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgPC9nPlxuICAgICAgPC9zdmc+XG4gICAgKTtcbiAgfVxufVxuIl19