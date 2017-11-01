(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('react'), require('viz-annotation/lib/Connector/type-curve'), require('viz-annotation/lib/Connector/type-elbow'), require('viz-annotation/lib/Connector/type-line'), require('viz-annotation/lib/Connector/end-dot'), require('prop-types'), require('viz-annotation/lib/Connector/end-arrow'), require('react-draggable'), require('viz-annotation/lib/Subject/badge'), require('viz-annotation/lib/Subject/circle'), require('viz-annotation/lib/Subject/rect'), require('viz-annotation/lib/Subject/threshold'), require('viz-annotation/lib/Subject/bracket'), require('viz-annotation/lib/Note/alignment'), require('viz-annotation/lib/Note/lineType-vertical'), require('viz-annotation/lib/Note/lineType-horizontal'), require('classnames')) :
	typeof define === 'function' && define.amd ? define(['react', 'viz-annotation/lib/Connector/type-curve', 'viz-annotation/lib/Connector/type-elbow', 'viz-annotation/lib/Connector/type-line', 'viz-annotation/lib/Connector/end-dot', 'prop-types', 'viz-annotation/lib/Connector/end-arrow', 'react-draggable', 'viz-annotation/lib/Subject/badge', 'viz-annotation/lib/Subject/circle', 'viz-annotation/lib/Subject/rect', 'viz-annotation/lib/Subject/threshold', 'viz-annotation/lib/Subject/bracket', 'viz-annotation/lib/Note/alignment', 'viz-annotation/lib/Note/lineType-vertical', 'viz-annotation/lib/Note/lineType-horizontal', 'classnames'], factory) :
	(factory(global.React,global.Curve,global.Elbow,global.Line,global.EndDot,global.PropTypes,global.EndArrow,global.reactDraggable,global.Badge,global.Circle,global.Rect,global.Threshold,global.Bracket,global.alignment,global.noteVertical,global.noteHorizontal,global.classnames));
}(this, (function (React,Curve,Elbow,Line,EndDot,PropTypes,EndArrow,reactDraggable,Badge,Circle,Rect,Threshold,Bracket,alignment,noteVertical,noteHorizontal,classnames) { 'use strict';

React = React && React.hasOwnProperty('default') ? React['default'] : React;
Curve = Curve && Curve.hasOwnProperty('default') ? Curve['default'] : Curve;
Elbow = Elbow && Elbow.hasOwnProperty('default') ? Elbow['default'] : Elbow;
Line = Line && Line.hasOwnProperty('default') ? Line['default'] : Line;
EndDot = EndDot && EndDot.hasOwnProperty('default') ? EndDot['default'] : EndDot;
PropTypes = PropTypes && PropTypes.hasOwnProperty('default') ? PropTypes['default'] : PropTypes;
EndArrow = EndArrow && EndArrow.hasOwnProperty('default') ? EndArrow['default'] : EndArrow;
Badge = Badge && Badge.hasOwnProperty('default') ? Badge['default'] : Badge;
Circle = Circle && Circle.hasOwnProperty('default') ? Circle['default'] : Circle;
Rect = Rect && Rect.hasOwnProperty('default') ? Rect['default'] : Rect;
Threshold = Threshold && Threshold.hasOwnProperty('default') ? Threshold['default'] : Threshold;
Bracket = Bracket && Bracket.hasOwnProperty('default') ? Bracket['default'] : Bracket;
alignment = alignment && alignment.hasOwnProperty('default') ? alignment['default'] : alignment;
noteVertical = noteVertical && noteVertical.hasOwnProperty('default') ? noteVertical['default'] : noteVertical;
noteHorizontal = noteHorizontal && noteHorizontal.hasOwnProperty('default') ? noteHorizontal['default'] : noteHorizontal;
classnames = classnames && classnames.hasOwnProperty('default') ? classnames['default'] : classnames;

var asyncGenerator = function () {
  function AwaitValue(value) {
    this.value = value;
  }

  function AsyncGenerator(gen) {
    var front, back;

    function send(key, arg) {
      return new Promise(function (resolve, reject) {
        var request = {
          key: key,
          arg: arg,
          resolve: resolve,
          reject: reject,
          next: null
        };

        if (back) {
          back = back.next = request;
        } else {
          front = back = request;
          resume(key, arg);
        }
      });
    }

    function resume(key, arg) {
      try {
        var result = gen[key](arg);
        var value = result.value;

        if (value instanceof AwaitValue) {
          Promise.resolve(value.value).then(function (arg) {
            resume("next", arg);
          }, function (arg) {
            resume("throw", arg);
          });
        } else {
          settle(result.done ? "return" : "normal", result.value);
        }
      } catch (err) {
        settle("throw", err);
      }
    }

    function settle(type, value) {
      switch (type) {
        case "return":
          front.resolve({
            value: value,
            done: true
          });
          break;

        case "throw":
          front.reject(value);
          break;

        default:
          front.resolve({
            value: value,
            done: false
          });
          break;
      }

      front = front.next;

      if (front) {
        resume(front.key, front.arg);
      } else {
        back = null;
      }
    }

    this._invoke = send;

    if (typeof gen.return !== "function") {
      this.return = undefined;
    }
  }

  if (typeof Symbol === "function" && Symbol.asyncIterator) {
    AsyncGenerator.prototype[Symbol.asyncIterator] = function () {
      return this;
    };
  }

  AsyncGenerator.prototype.next = function (arg) {
    return this._invoke("next", arg);
  };

  AsyncGenerator.prototype.throw = function (arg) {
    return this._invoke("throw", arg);
  };

  AsyncGenerator.prototype.return = function (arg) {
    return this._invoke("return", arg);
  };

  return {
    wrap: function (fn) {
      return function () {
        return new AsyncGenerator(fn.apply(this, arguments));
      };
    },
    await: function (value) {
      return new AwaitValue(value);
    }
  };
}();





var classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

var createClass = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();





var defineProperty = function (obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
};

var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};



var inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
};









var objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

var possibleConstructorReturn = function (self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return call && (typeof call === "object" || typeof call === "function") ? call : self;
};

var Connector = function (_React$Component) {
  inherits(Connector, _React$Component);

  function Connector() {
    classCallCheck(this, Connector);
    return possibleConstructorReturn(this, (Connector.__proto__ || Object.getPrototypeOf(Connector)).apply(this, arguments));
  }

  createClass(Connector, [{
    key: "getComponents",
    value: function getComponents() {}
  }, {
    key: "render",
    value: function render() {
      var _props = this.props,
          color = _props.color,
          dx = _props.dx,
          dy = _props.dy,
          customID = _props.customID;


      if (dx === 0 && dy === 0) {
        return React.createElement("g", { className: "annotation-connector" });
      }

      var d = this.getComponents(this.props) || [];
      var cleanedProps = Object.assign({}, this.props);
      delete cleanedProps.children;

      var childrenWithProps = React.Children.map(this.props.children, function (child) {
        return React.cloneElement(child, _extends({}, cleanedProps, child.props, {
          scale: cleanedProps.endScale || child.props.endScale,
          lineData: d.components[0].data
        }));
      });

      return React.createElement(
        "g",
        _extends({ className: "annotation-connector" }, this.props.gAttrs),
        d.components && d.components.map(function (c, i) {
          var attrs = {};
          if (!c) return null;
          Object.keys(c.attrs).forEach(function (k) {
            if (c.attrs[k] && k !== "text") {
              attrs[k.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
              })] = c.attrs[k];
            }
          });
          return React.createElement(
            c.type,
            _extends({
              mask: customID ? "url(#" + customID + ")" : undefined,
              key: i,
              className: c.className,
              fill: "none",
              stroke: color
            }, attrs),
            c.attrs.text
          );
        }),
        childrenWithProps
      );
    }
  }]);
  return Connector;
}(React.Component);

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var ConnectorCurve = function (_Connector) {
  inherits(ConnectorCurve, _Connector);

  function ConnectorCurve() {
    classCallCheck(this, ConnectorCurve);
    return possibleConstructorReturn(this, (ConnectorCurve.__proto__ || Object.getPrototypeOf(ConnectorCurve)).apply(this, arguments));
  }

  createClass(ConnectorCurve, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var curve = _ref.curve,
          points = _ref.points,
          x = _ref.x,
          y = _ref.y,
          dx = _ref.dx,
          dy = _ref.dy,
          radius = _ref.radius,
          outerRadius = _ref.outerRadius,
          width = _ref.width,
          height = _ref.height;

      return Curve({
        curve: curve,
        points: points,
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        radius: radius,
        outerRadius: outerRadius,
        width: width,
        height: height
      });
    }
  }]);
  return ConnectorCurve;
}(Connector);

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var ConnectorElbow = function (_Connector) {
  inherits(ConnectorElbow, _Connector);

  function ConnectorElbow() {
    classCallCheck(this, ConnectorElbow);
    return possibleConstructorReturn(this, (ConnectorElbow.__proto__ || Object.getPrototypeOf(ConnectorElbow)).apply(this, arguments));
  }

  createClass(ConnectorElbow, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var x = _ref.x,
          y = _ref.y,
          dy = _ref.dy,
          dx = _ref.dx,
          radius = _ref.radius,
          radiusPadding = _ref.radiusPadding,
          outerRadius = _ref.outerRadius,
          width = _ref.width,
          height = _ref.height;

      return Elbow({
        x: x,
        y: y,
        dx: dx,
        dy: dy,
        radius: radius,
        radiusPadding: radiusPadding,
        outerRadius: outerRadius,
        width: width,
        height: height
      });
    }
  }]);
  return ConnectorElbow;
}(Connector);

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var ConnectorLine = function (_Connector) {
  inherits(ConnectorLine, _Connector);

  function ConnectorLine() {
    classCallCheck(this, ConnectorLine);
    return possibleConstructorReturn(this, (ConnectorLine.__proto__ || Object.getPrototypeOf(ConnectorLine)).apply(this, arguments));
  }

  createClass(ConnectorLine, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var x = _ref.x,
          y = _ref.y,
          dy = _ref.dy,
          dx = _ref.dx,
          radius = _ref.radius,
          outerRadius = _ref.outerRadius,
          width = _ref.width,
          height = _ref.height;

      return Line({ x: x, y: y, dx: dx, dy: dy, radius: radius, outerRadius: outerRadius, width: width, height: height });
    }
  }]);
  return ConnectorLine;
}(Connector);

var ConnectorEnd = function (_React$Component) {
  inherits(ConnectorEnd, _React$Component);

  function ConnectorEnd() {
    classCallCheck(this, ConnectorEnd);
    return possibleConstructorReturn(this, (ConnectorEnd.__proto__ || Object.getPrototypeOf(ConnectorEnd)).apply(this, arguments));
  }

  createClass(ConnectorEnd, [{
    key: "getComponents",
    value: function getComponents() {}
  }, {
    key: "render",
    value: function render() {
      var color = this.props.color;

      var d = this.getComponents(this.props) || [];
      var c = d.components[0];

      return React.createElement(c.type, _extends({ className: c.className }, c.attrs, { fill: color }));
    }
  }]);
  return ConnectorEnd;
}(React.Component);

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var ConnectorEndDot = function (_ConnectorEnd) {
  inherits(ConnectorEndDot, _ConnectorEnd);

  function ConnectorEndDot() {
    classCallCheck(this, ConnectorEndDot);
    return possibleConstructorReturn(this, (ConnectorEndDot.__proto__ || Object.getPrototypeOf(ConnectorEndDot)).apply(this, arguments));
  }

  createClass(ConnectorEndDot, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var x = _ref.x,
          y = _ref.y,
          dy = _ref.dy,
          dx = _ref.dx,
          lineData = _ref.lineData,
          scale = _ref.scale;

      return EndDot({ x: x, y: y, dx: dx, dy: dy, lineData: lineData, scale: scale });
    }
  }]);
  return ConnectorEndDot;
}(ConnectorEnd);

ConnectorEndDot.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  scale: PropTypes.number,
  lineData: PropTypes.array
  //array of arrays of x,y coordinates for the connector line
};

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var ConnectorEndArrow = function (_ConnectorEnd) {
  inherits(ConnectorEndArrow, _ConnectorEnd);

  function ConnectorEndArrow() {
    classCallCheck(this, ConnectorEndArrow);
    return possibleConstructorReturn(this, (ConnectorEndArrow.__proto__ || Object.getPrototypeOf(ConnectorEndArrow)).apply(this, arguments));
  }

  createClass(ConnectorEndArrow, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var x = _ref.x,
          y = _ref.y,
          dy = _ref.dy,
          dx = _ref.dx,
          lineData = _ref.lineData,
          scale = _ref.scale;

      var start = lineData[1];
      var end = lineData[0];
      var distance = Math.sqrt(Math.pow(start[0] - end[0], 2) + Math.pow(start[1] - end[1], 2));
      if (distance < 5 && lineData[2]) {
        start = lineData[2];
      }

      return EndArrow({ x: x, y: y, dx: dx, dy: dy, start: start, end: end, scale: scale });
    }
  }]);
  return ConnectorEndArrow;
}(ConnectorEnd);

ConnectorEndArrow.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  scale: PropTypes.number,
  lineData: PropTypes.array
};

var Handle = function (_React$Component) {
  inherits(Handle, _React$Component);

  function Handle() {
    classCallCheck(this, Handle);
    return possibleConstructorReturn(this, (Handle.__proto__ || Object.getPrototypeOf(Handle)).apply(this, arguments));
  }

  createClass(Handle, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$x = _props.x,
          x = _props$x === undefined ? 0 : _props$x,
          _props$y = _props.y,
          y = _props$y === undefined ? 0 : _props$y,
          _props$r = _props.r,
          r = _props$r === undefined ? 10 : _props$r,
          handleStart = _props.handleStart,
          handleDrag = _props.handleDrag,
          handleStop = _props.handleStop,
          offsetParent = _props.offsetParent;


      return React.createElement(
        reactDraggable.DraggableCore,
        {
          handle: ".handle",
          defaultPosition: { x: 0, y: 0 },
          position: null,
          onStart: handleStart,
          onDrag: handleDrag,
          onStop: handleStop,
          offsetParent: offsetParent,
          defaultClassNameDragging: "dragging"
        },
        React.createElement("circle", {
          className: "handle",
          cx: x,
          cy: y,
          r: r,
          strokeDasharray: "5",
          stroke: "grey",
          fill: "white",
          fillOpacity: 0
        })
      );
    }
  }]);
  return Handle;
}(React.Component);

Handle.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  r: PropTypes.number,
  handleStart: PropTypes.func,
  handleStop: PropTypes.func,
  handleDrag: PropTypes.func
};

var Subject = function (_React$Component) {
  inherits(Subject, _React$Component);

  function Subject() {
    classCallCheck(this, Subject);
    return possibleConstructorReturn(this, (Subject.__proto__ || Object.getPrototypeOf(Subject)).apply(this, arguments));
  }

  createClass(Subject, [{
    key: "getComponents",
    value: function getComponents() {}
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          editMode = _props.editMode,
          color = _props.color;


      var d = this.getComponents(this.props) || {};

      var handles = void 0;
      if (editMode) {
        handles = [React.createElement(Handle, {
          key: "subject-handle",
          handleStart: this.props.dragStart,
          handleStop: this.props.dragEnd,
          handleDrag: this.props.dragSubject
        })];

        if (d.handles) {
          handles = handles.concat(d.handles.map(function (h, i) {
            return React.createElement(Handle, {
              key: "subjecthandle-" + i,
              handleStart: _this2.props.dragStart,
              handleStop: _this2.props.dragEnd,
              x: h.x,
              y: h.y,
              offsetParent: h.offsetParent && _this2.subject,
              handleDrag: function handleDrag(e, data) {
                _this2.props.dragSubjectSettings(e, d.handleFunction(h, data));
              }
            });
          }));
        }
      }

      return React.createElement(
        "g",
        _extends({
          className: "annotation-subject"
        }, this.props.gAttrs, {
          ref: function ref(subject) {
            _this2.subject = subject;
          }
        }),
        d.components && d.components.map(function (c, i) {
          var attrs = {};
          if (!c) return null;
          Object.keys(c.attrs).forEach(function (k) {
            if (c.attrs[k] && k !== "text") {
              attrs[k.replace(/-([a-z])/g, function (g) {
                return g[1].toUpperCase();
              })] = c.attrs[k];
            }
          });
          return React.createElement(
            c.type,
            _extends({
              key: i,
              className: c.className,
              fill: "none",
              stroke: color
            }, attrs),
            c.attrs.text
          );
        }),
        handles
      );
    }
  }]);
  return Subject;
}(React.Component);

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var SubjectBadge = function (_Subject) {
  inherits(SubjectBadge, _Subject);

  function SubjectBadge() {
    classCallCheck(this, SubjectBadge);
    return possibleConstructorReturn(this, (SubjectBadge.__proto__ || Object.getPrototypeOf(SubjectBadge)).apply(this, arguments));
  }

  createClass(SubjectBadge, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var leftRight = _ref.leftRight,
          topBottom = _ref.topBottom,
          text = _ref.text,
          editMode = _ref.editMode,
          color = _ref.color,
          radius = _ref.radius;

      var components = Badge({
        leftRight: leftRight,
        topBottom: topBottom,
        text: text,
        editMode: editMode,
        color: color,
        radius: radius
      });

      components.handleKeys = { leftRight: leftRight, topBottom: topBottom };
      components.handleFunction = function (h, data) {
        var lr = data.x < -radius * 2 ? "left" : data.x > radius * 2 ? "right" : undefined;
        var tb = data.y < -radius * 2 ? "top" : data.y > radius * 2 ? "bottom" : undefined;

        return {
          leftRight: lr,
          topBottom: tb
        };
      };

      return components;
    }
  }]);
  return SubjectBadge;
}(Subject);

SubjectBadge.propTypes = {
  leftRight: PropTypes.oneOf(["left", "right"]),
  topBottom: PropTypes.oneOf(["top", "bottom"]),
  text: PropTypes.string,
  color: PropTypes.string,
  editMode: PropTypes.bool
};

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var SubjectCircle = function (_Subject) {
  inherits(SubjectCircle, _Subject);

  function SubjectCircle() {
    classCallCheck(this, SubjectCircle);
    return possibleConstructorReturn(this, (SubjectCircle.__proto__ || Object.getPrototypeOf(SubjectCircle)).apply(this, arguments));
  }

  createClass(SubjectCircle, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var _ref$radius = _ref.radius,
          radius = _ref$radius === undefined ? 20 : _ref$radius,
          innerRadius = _ref.innerRadius,
          outerRadius = _ref.outerRadius,
          radiusPadding = _ref.radiusPadding,
          editMode = _ref.editMode;

      var components = Circle({
        radius: radius,
        radiusPadding: radiusPadding,
        innerRadius: innerRadius,
        outerRadius: outerRadius,
        editMode: editMode
      });

      components.handleKeys = { radius: radius, innerRadius: innerRadius, outerRadius: outerRadius };
      components.handleFunction = function (h, data) {
        return defineProperty({}, h.key, components.handleKeys[h.key] + data.deltaX * Math.sqrt(2));
      };
      return components;
    }
  }]);
  return SubjectCircle;
}(Subject);

SubjectCircle.propTypes = {
  radius: PropTypes.number,
  innerRadius: PropTypes.number,
  outerRadius: PropTypes.number,
  radiusPadding: PropTypes.number,
  editMode: PropTypes.bool
};

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var SubjectRect = function (_Subject) {
  inherits(SubjectRect, _Subject);

  function SubjectRect() {
    classCallCheck(this, SubjectRect);
    return possibleConstructorReturn(this, (SubjectRect.__proto__ || Object.getPrototypeOf(SubjectRect)).apply(this, arguments));
  }

  createClass(SubjectRect, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var _ref$width = _ref.width,
          width = _ref$width === undefined ? 100 : _ref$width,
          _ref$height = _ref.height,
          height = _ref$height === undefined ? 100 : _ref$height,
          editMode = _ref.editMode;

      var components = Rect({ width: width, height: height, editMode: editMode });
      components.handleKeys = { width: width, height: height };

      components.handleFunction = function (h, data) {
        return defineProperty({}, h.key, h.key === "width" ? width + data.deltaX : height + data.deltaY);
      };

      return components;
    }
  }]);
  return SubjectRect;
}(Subject);

SubjectRect.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  editMode: PropTypes.bool
};

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var SubjectThreshold = function (_Subject) {
  inherits(SubjectThreshold, _Subject);

  function SubjectThreshold() {
    classCallCheck(this, SubjectThreshold);
    return possibleConstructorReturn(this, (SubjectThreshold.__proto__ || Object.getPrototypeOf(SubjectThreshold)).apply(this, arguments));
  }

  createClass(SubjectThreshold, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var x1 = _ref.x1,
          x2 = _ref.x2,
          y1 = _ref.y1,
          y2 = _ref.y2,
          x = _ref.x,
          y = _ref.y,
          editMode = _ref.editMode;

      return Threshold({ x1: x1, x2: x2, y1: y1, y2: y2, x: x, y: y, editMode: editMode });
    }
  }]);
  return SubjectThreshold;
}(Subject);

SubjectThreshold.propTypes = {
  x: PropTypes.number,
  x1: PropTypes.number,
  x2: PropTypes.number,
  y: PropTypes.number,
  y1: PropTypes.number,
  y2: PropTypes.number,
  editMode: PropTypes.bool
};

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
var SubjectBracket = function (_Subject) {
  inherits(SubjectBracket, _Subject);

  function SubjectBracket() {
    classCallCheck(this, SubjectBracket);
    return possibleConstructorReturn(this, (SubjectBracket.__proto__ || Object.getPrototypeOf(SubjectBracket)).apply(this, arguments));
  }

  createClass(SubjectBracket, [{
    key: "getComponents",
    value: function getComponents(_ref) {
      var height = _ref.height,
          width = _ref.width,
          _ref$depth = _ref.depth,
          depth = _ref$depth === undefined ? 20 : _ref$depth,
          _ref$type = _ref.type,
          type = _ref$type === undefined ? "square" : _ref$type,
          editMode = _ref.editMode;

      var components = Bracket({ height: height, width: width, depth: depth, type: type, editMode: editMode });

      var handleKeys = { height: height, width: width, depth: depth };
      components.handleFunction = function (h, data) {
        if (h.key === "depth") {
          return {
            depth: depth + data["delta" + h.type]
          };
        } else {
          return defineProperty({}, h.key, handleKeys[h.key] + data[h.key === "width" ? "deltaX" : "deltaY"]);
        }
      };

      return components;
    }
  }]);
  return SubjectBracket;
}(Subject);

SubjectBracket.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  depth: PropTypes.number,
  editMode: PropTypes.bool
};

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */
// import Bracket from "./bracket"
var SubjectCustom = function (_Subject) {
  inherits(SubjectCustom, _Subject);

  function SubjectCustom() {
    classCallCheck(this, SubjectCustom);
    return possibleConstructorReturn(this, (SubjectCustom.__proto__ || Object.getPrototypeOf(SubjectCustom)).apply(this, arguments));
  }

  createClass(SubjectCustom, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          _props$custom = _props.custom,
          custom = _props$custom === undefined ? "M0,0" : _props$custom,
          customID = _props.customID,
          editMode = _props.editMode,
          transform = _props.transform;


      var handles = void 0;
      if (editMode) {
        handles = React.createElement(Handle, {
          handleStart: this.props.onDragStart,
          handleStop: this.props.onDragEnd,
          handleDrag: this.props.dragSubject
        });
      }

      return React.createElement(
        "g",
        { className: "annotation-subject" },
        React.createElement(
          "g",
          { transform: transform },
          typeof custom === "string" ? React.createElement("path", { d: custom, pointerEvents: "none" }) : React.createElement(
            "g",
            { pointerEvents: "none" },
            custom
          ),
          React.createElement(
            "mask",
            { id: customID, pointerEvents: "none" },
            React.createElement(
              "g",
              { transform: transform },
              React.createElement("rect", {
                x: "-100%",
                y: "-100%",
                height: "200%",
                width: "200%",
                fill: "white",
                pointerEvents: "none"
              }),
              typeof custom === "string" ? React.createElement("path", { d: custom, fill: "black", pointerEvents: "none" }) : React.createElement(
                "g",
                { fill: "black", pointerEvents: "none" },
                custom.map(function (c, i) {
                  return React.cloneElement(c, Object.assign({}, c.props, {
                    fill: "black",
                    opacity: 1,
                    key: "customSubject-" + i
                  }));
                })
              ),
              "}"
            )
          )
        ),
        handles
      );
    }
  }]);
  return SubjectCustom;
}(Subject);

SubjectCustom.propTypes = {
  editMode: PropTypes.bool
};

var getOuterBBox = function getOuterBBox() {
  for (var _len = arguments.length, domNodes = Array(_len), _key = 0; _key < _len; _key++) {
    domNodes[_key] = arguments[_key];
  }

  return [].concat(domNodes).reduce(function (p, c) {
    if (c) {
      var bbox = c.getBBox();
      p.x = Math.min(p.x, bbox.x);
      p.y = Math.min(p.y, bbox.y);
      p.width = Math.max(p.width, bbox.width);

      var yOffset = c && c.attributes && c.attributes.y;
      p.height = Math.max(p.height, (yOffset && parseFloat(yOffset.value) || 0) + bbox.height);
    }
    return p;
  }, { x: 0, y: 0, width: 0, height: 0 });
};

var Note = function (_React$Component) {
  inherits(Note, _React$Component);

  function Note(props) {
    classCallCheck(this, Note);

    var _this = possibleConstructorReturn(this, (Note.__proto__ || Object.getPrototypeOf(Note)).call(this, props));

    _this.state = {
      translateX: 0,
      translateY: 0,
      labelOffset: 0,
      changed: 0,
      bbox: { width: 0, height: 0, x: 0, y: 0 }
    };


    _this.updateText = _this.updateText.bind(_this);
    return _this;
  }

  createClass(Note, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      this.updateText(this.props);
    }
  }, {
    key: "componentWillReceiveProps",
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.title !== this.props.title || nextProps.label !== this.props.label || nextProps.wrap !== this.props.wrap) {
        this.updateText(nextProps);
      }
      if (nextProps.editMode && (nextProps.align === "dynamic" || !nextProps.align)) {
        this.updateText(nextProps);
      }
    }
  }, {
    key: "updateText",
    value: function updateText(_ref) {
      var _this2 = this;

      var orientation = _ref.orientation,
          padding = _ref.padding,
          align = _ref.align,
          lineType = _ref.lineType,
          label = _ref.label,
          title = _ref.title,
          wrap = _ref.wrap,
          wrapSplitter = _ref.wrapSplitter,
          dx = _ref.dx,
          dy = _ref.dy;

      var newState = {
        titleWrapped: null,
        labelWrapped: null
      };
      newState.changed = this.state.changed + 1;

      if (title) {
        newState.titleWrapped = this.refs.title && this.wrapText(this.refs.title, newState.changed, title, wrap, wrapSplitter);
      }
      if (label) newState.labelWrapped = this.refs.label && this.wrapText(this.refs.label, newState.changed, label, wrap, wrapSplitter);

      this.setState(newState, function () {
        var setLabel = function setLabel() {
          var bbox = getOuterBBox(_this2.refs.title, _this2.refs.label);
          var noteParams = {
            padding: padding,
            bbox: bbox,
            offset: { x: dx, y: dy },
            orientation: orientation,
            align: align
          };
          if (lineType === "vertical") noteParams.orientation = "leftRight";else if (lineType === "horizontal") noteParams.orientation = "topBottom";

          var _alignment = alignment(noteParams),
              x = _alignment.x,
              y = _alignment.y;

          _this2.setState({
            translateX: x,
            translateY: y,
            bbox: bbox
          });
        };

        _this2.setState({
          labelOffset: title && _this2.refs.title.getBBox().height || 0
        }, setLabel);
      });
    }
  }, {
    key: "wrapText",
    value: function wrapText(textRef, key, text, width, wrapSplitter) {
      var initialAttrs = {
        x: 0,
        dy: "1.2em"
      };

      var words = text.split(wrapSplitter || /[ \t\r\n]+/).reverse().filter(function (w) {
        return w !== "";
      });

      var word = void 0,
          line = [];

      var tspans = [];

      while (word = words.pop()) {
        line.push(word);
        textRef.lastChild.textContent = line.join(" ");

        var length = textRef.lastChild.getComputedTextLength();

        textRef.lastChild.textContent = "";

        if (length > width && line.length > 1) {
          line.pop();
          tspans.push(React.createElement(
            "tspan",
            _extends({ key: tspans.length + text }, initialAttrs),
            line.join(" ")
          ));
          line = [word];
        }
      }

      if (line.length !== 0) {
        tspans.push(React.createElement(
          "tspan",
          _extends({ key: tspans.length + text }, initialAttrs),
          line.join(" ")
        ));
      }

      return React.createElement(
        "tspan",
        _extends({}, initialAttrs, { key: key + text }),
        tspans
      );
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate(prevProps) {
      var _props = this.props,
          orientation = _props.orientation,
          padding = _props.padding,
          align = _props.align,
          dx = _props.dx,
          dy = _props.dy,
          lineType = _props.lineType;


      if (this.state.bbox.width && (prevProps.dx !== this.props.dx || prevProps.dy !== this.props.dy) && (this.refs.title || this.refs.label)) {
        var bbox = getOuterBBox(this.refs.title, this.refs.label);
        var noteParams = {
          padding: padding,
          bbox: bbox,
          offset: { x: dx, y: dy },
          orientation: orientation,
          align: align
        };

        if (lineType === "vertical") noteParams.orientation = "leftRight";else if (lineType === "horizontal") noteParams.orientation = "topBottom";

        var _alignment2 = alignment(noteParams),
            x = _alignment2.x,
            y = _alignment2.y;

        var updates = { bbox: bbox };
        if (this.state.translateX !== x) updates.translateX = x;
        if (this.state.translateY !== y) updates.translateY = y;
        if (updates.translateX !== undefined || updates.translateY !== undefined) {
          this.setState(updates);
        }
      } else if (this.state.align !== prevProps.align || this.props.orientation !== prevProps.orientation || this.props.padding !== prevProps.padding) {
        var _noteParams = {
          padding: padding,
          bbox: this.state.bbox,
          offset: { x: dx, y: dy },
          orientation: orientation,
          align: align
        };

        if (lineType === "vertical") _noteParams.orientation = "leftRight";else if (lineType === "horizontal") _noteParams.orientation = "topBottom";

        var _alignment3 = alignment(_noteParams),
            _x = _alignment3.x,
            _y = _alignment3.y;

        var _updates = {};
        if (this.state.translateX !== _x) _updates.translateX = _x;
        if (this.state.translateY !== _y) _updates.translateY = _y;
        if (_updates.translateX !== undefined || _updates.translateY !== undefined) {
          this.setState(_updates);
        }
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _props2 = this.props,
          dx = _props2.dx,
          dy = _props2.dy,
          title = _props2.title,
          label = _props2.label,
          align = _props2.align,
          editMode = _props2.editMode,
          lineType = _props2.lineType,
          color = _props2.color,
          titleColor = _props2.titleColor,
          labelColor = _props2.labelColor;


      var noteTitle = void 0,
          noteText = void 0,
          noteLineType = void 0;
      if (title) {
        noteTitle = React.createElement(
          "text",
          {
            ref: "title",
            className: "annotation-note-title",
            fontWeight: "bold",
            key: "title",
            fill: titleColor || color
          },
          this.state.titleWrapped || React.createElement(
            "tspan",
            { x: 0, dy: ".8em" },
            title
          )
        );
      }

      if (label) {
        noteText = React.createElement(
          "text",
          {
            ref: "label",
            className: "annotation-note-label",
            y: this.state.labelOffset * 1.1,
            key: "label",
            fill: labelColor || color
          },
          this.state.labelWrapped || React.createElement(
            "tspan",
            { x: 0, dy: ".8em" },
            label
          )
        );
      }

      if (lineType && this.state.bbox.width) {
        var noteParams = {
          bbox: this.state.bbox,
          align: align,
          offset: { x: dx, y: dy }
        };

        var noteComponent = (lineType === "vertical" && noteVertical(noteParams) || lineType === "horizontal" && noteHorizontal(noteParams)).components[0];

        noteLineType = React.createElement(noteComponent.type, _extends({
          className: noteComponent.className
        }, noteComponent.attrs, {
          stroke: color
        }));
      }

      var handle = void 0;

      if (editMode) {
        handle = React.createElement(Handle, {
          handleStart: this.props.dragStart,
          handleStop: this.props.dragEnd,
          handleDrag: this.props.dragNote
        });
      }

      return React.createElement(
        "g",
        _extends({
          transform: "translate(" + dx + ", " + dy + ")",
          className: "annotation-note"
        }, this.props.gProps),
        React.createElement(
          "g",
          {
            className: "annotation-note-content",
            transform: "translate(" + this.state.translateX + ",\n          " + this.state.translateY + ")",
            ref: "note"
          },
          React.createElement("rect", {
            className: "annotation-note-bg",
            width: this.state.bbox.width,
            height: this.state.bbox.height,
            stroke: "none",
            fill: "white",
            fillOpacity: "0"
          }),
          noteTitle,
          noteText
        ),
        noteLineType,
        handle
      );
    }
  }]);
  return Note;
}(React.Component);

Note.defaultProps = {
  wrap: 120,
  align: "dynamic",
  orientation: "topBottom",
  padding: 3
};

Note.propTypes = {
  dx: PropTypes.number,
  dy: PropTypes.number,
  title: PropTypes.string,
  label: PropTypes.string,
  orientation: PropTypes.oneOf(["leftRight", "topBottom"]),
  padding: PropTypes.number,
  align: PropTypes.oneOf(["left", "right", "middle", "top", "bottom", "dynamic"]),
  editMode: PropTypes.bool,
  lineType: PropTypes.oneOf(["vertical", "horizontal"]),
  color: PropTypes.string,
  titleColor: PropTypes.string,
  labelColor: PropTypes.string
};

/* eslint-disable no-unused-vars */
/* eslint-enable no-unused-vars */

function BracketNote(_ref) {
  var width = _ref.width,
      height = _ref.height,
      depth = _ref.depth,
      rest = objectWithoutProperties(_ref, ["width", "height", "depth"]);

  var dx = rest.dx,
      orientation = void 0,
      align = "middle",
      dy = rest.dy;

  if (height) {
    if (!dy) dy = height / 2;
    if (!dx) dx = depth;
    orientation = "leftRight";
  } else if (width) {
    if (!dx) dx = width / 2;
    if (!dy) dy = depth;
    orientation = "topBottom";
  }

  return React.createElement(Note, _extends({
    align: align,
    orientation: orientation,
    padding: 10
  }, rest, {
    editMode: false,
    dx: dx,
    dy: dy
  }));
}

var Annotation = function (_React$Component) {
  inherits(Annotation, _React$Component);

  function Annotation() {
    classCallCheck(this, Annotation);
    return possibleConstructorReturn(this, (Annotation.__proto__ || Object.getPrototypeOf(Annotation)).apply(this, arguments));
  }

  createClass(Annotation, [{
    key: "render",
    value: function render() {
      var _props = this.props,
          x = _props.x,
          y = _props.y,
          nx = _props.nx,
          ny = _props.ny;


      var cleanedProps = Object.assign({}, this.props);
      delete cleanedProps.children;

      if (nx !== undefined) cleanedProps.dx = nx - x;
      if (ny !== undefined) cleanedProps.dy = ny - y;

      var childrenWithProps = React.Children.toArray(this.props.children).map(function (child) {
        return React.cloneElement(child, _extends({}, cleanedProps, child.props));
      });

      return React.createElement(
        "g",
        {
          className: classnames("annotation", this.props.className),
          transform: "translate(" + x + ", " + y + ")"
        },
        childrenWithProps
      );
    }
  }]);
  return Annotation;
}(React.Component);

Annotation.defaultProps = {
  x: 0,
  y: 0,
  dx: 0,
  dy: 0,
  color: "grey"
};

Annotation.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  dx: PropTypes.number,
  dy: PropTypes.number,
  color: PropTypes.string,
  editMode: PropTypes.bool
};

var EditableAnnotation = function (_React$Component) {
  inherits(EditableAnnotation, _React$Component);

  function EditableAnnotation() {
    var _ref;

    var _temp, _this, _ret;

    classCallCheck(this, EditableAnnotation);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = possibleConstructorReturn(this, (_ref = EditableAnnotation.__proto__ || Object.getPrototypeOf(EditableAnnotation)).call.apply(_ref, [this].concat(args))), _this), _this.state = {
      x: 0,
      y: 0,
      dx: 0,
      dy: 0
    }, _temp), possibleConstructorReturn(_this, _ret);
  }

  createClass(EditableAnnotation, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.setState({
        x: this.props.x,
        y: this.props.y,
        dx: this.props.dx,
        dy: this.props.dy
      });
    }
  }, {
    key: "getData",
    value: function getData() {
      return Object.assign({}, this.props, this.state);
    }
  }, {
    key: "dragEnd",
    value: function dragEnd() {
      if (this.props.onDragEnd) {
        this.props.onDragEnd(this.getData());
      }
    }
  }, {
    key: "dragStart",
    value: function dragStart() {
      if (this.props.onDragStart) {
        this.props.onDragStart(this.getData());
      }
    }
  }, {
    key: "dragSubject",
    value: function dragSubject(event, data) {
      var _this2 = this;

      this.setState({
        x: this.state.x + data.deltaX,
        y: this.state.y + data.deltaY
      }, function () {
        if (_this2.props.onDrag) _this2.props.onDrag(_this2.getData());
      });
    }
  }, {
    key: "dragSubjectSettings",
    value: function dragSubjectSettings(event, data) {
      var _this3 = this;

      this.setState(data, function () {
        if (_this3.props.onDrag) _this3.props.onDrag(_this3.getData());
      });
    }
  }, {
    key: "dragNote",
    value: function dragNote(event, data) {
      var _this4 = this;

      this.setState({
        dx: this.state.dx + data.deltaX,
        dy: this.state.dy + data.deltaY
      }, function () {
        if (_this4.props.onDrag) _this4.props.onDrag(_this4.getData());
      });
    }
  }, {
    key: "render",
    value: function render() {
      var cleanedProps = Object.assign({}, this.props, _extends({}, this.state, {
        dragSubject: this.dragSubject.bind(this),
        dragNote: this.dragNote.bind(this),
        dragSubjectSettings: this.dragSubjectSettings.bind(this),
        dragEnd: this.dragEnd.bind(this),
        dragStart: this.dragStart.bind(this),
        editMode: true,
        className: classnames(this.props.className, "editable")
      }));

      return React.createElement(Annotation, cleanedProps);
    }
  }]);
  return EditableAnnotation;
}(React.Component);

var getAnnotationType = function getAnnotationType(editMode) {
  return editMode ? EditableAnnotation : Annotation;
};

var annotationMapper = function annotationMapper(props, Connector) {
  var NoteDefaultProps = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var Subject$$1 = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : Subject;
  var SubjectDefaultProps = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {};
  var NoteType = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : Note;
  var _props$disable = props.disable,
      disable = _props$disable === undefined ? [] : _props$disable,
      connector = props.connector,
      note = props.note,
      subject = props.subject,
      x = props.x,
      y = props.y,
      dx = props.dx,
      dy = props.dy,
      nx = props.nx,
      ny = props.ny,
      color = props.color,
      className = props.className,
      onDrag = props.onDrag,
      onDragStart = props.onDragStart,
      onDragEnd = props.onDragEnd,
      editMode = props.editMode;

  var CONNECTORS = {
    type: {
      curve: ConnectorCurve,
      line: ConnectorLine,
      elbow: ConnectorElbow
    },
    end: {
      dot: ConnectorEndDot,
      arrow: ConnectorEndArrow
    }
  };

  var ConnectorType = void 0,
      ConnectorEndType = void 0;
  if (disable.indexOf("connector") === -1) {
    ConnectorType = connector && CONNECTORS.type[connector.type] || Connector;
    ConnectorEndType = connector && CONNECTORS.end[connector.end];
  }

  var AnnotationType = getAnnotationType(props.editMode);
  return React.createElement(
    AnnotationType,
    _extends({
      x: x,
      y: y,
      dx: dx,
      dy: dy,
      nx: nx,
      ny: ny,
      color: color,
      className: className,
      onDrag: onDrag,
      onDragStart: onDragStart,
      onDragEnd: onDragEnd,
      editMode: editMode
    }, SubjectDefaultProps, subject),
    ConnectorType && React.createElement(
      ConnectorType,
      connector,
      ConnectorEndType && React.createElement(ConnectorEndType, null)
    ),
    note && disable.indexOf("note") === -1 && React.createElement(NoteType, _extends({}, NoteDefaultProps, note)),
    Subject$$1 && disable.indexOf("subject") === -1 && React.createElement(Subject$$1, null)
  );
};

function AnnotationLabel(props) {
  var className = classnames("label", props.className);
  return annotationMapper(_extends({}, props, { className: className }), ConnectorLine, {
    align: "middle"
  });
}

function AnnotationCallout(props) {
  var className = classnames("callout", props.className);
  return annotationMapper(_extends({}, props, { className: className }), ConnectorLine, {
    lineType: "horizontal"
  });
}

function AnnotationCalloutElbow(props) {
  var className = classnames("callout elbow", props.className);
  return annotationMapper(_extends({}, props, { className: className }), ConnectorElbow, {
    lineType: "horizontal"
  });
}

function AnnotationCalloutCurve(props) {
  var className = classnames("callout curve", props.className);
  return annotationMapper(_extends({}, props, { className: className }), ConnectorCurve, {
    lineType: "horizontal"
  });
}

function AnnotationCalloutCircle(props) {
  var className = classnames("callout circle", props.className);
  return annotationMapper(_extends({}, props, { className: className }), ConnectorElbow, { lineType: "horizontal" }, SubjectCircle, { radius: 20 });
}

function AnnotationCalloutRect(props) {
  var className = classnames("callout rect", props.className);
  return annotationMapper(_extends({}, props, { className: className }), ConnectorElbow, { lineType: "horizontal" }, SubjectRect, { width: 100, height: 100 });
}

function AnnotationXYThreshold(props) {
  var className = classnames("callout xythreshold", props.className);
  return annotationMapper(_extends({}, props, { className: className }), ConnectorElbow, { lineType: "horizontal" }, SubjectThreshold);
}

function AnnotationBadge(props) {
  var className = classnames("badge", props.className);
  return annotationMapper(_extends({ disable: ["connector", "note"] }, props, { className: className }), null, null, SubjectBadge);
}

function AnnotationBracket(props) {
  var className = classnames("bracket", props.className);
  return annotationMapper(_extends({ disable: ["connector"] }, props, { className: className }), null, null, SubjectBracket, { depth: 20 }, BracketNote);
}

function AnnotationCalloutCustom(props) {
  var className = classnames("callout custom", props.className);
  return annotationMapper(_extends({}, props, { className: className }), ConnectorElbow, { lineType: "horizontal" }, SubjectCustom);
}

// export individual components
var Annotations = {
  Connector: Connector,
  ConnectorCurve: ConnectorCurve,
  ConnectorElbow: ConnectorElbow,
  ConnectorLine: ConnectorLine,
  ConnectorEndDot: ConnectorEndDot,
  ConnectorEndArrow: ConnectorEndArrow,
  Subject: Subject,
  SubjectBadge: SubjectBadge,
  SubjectCircle: SubjectCircle,
  SubjectRect: SubjectRect,
  SubjectThreshold: SubjectThreshold,
  SubjectBracket: SubjectBracket,
  SubjectCustom: SubjectCustom,
  Note: Note,
  BracketNote: BracketNote,
  Annotation: Annotation,
  EditableAnnotation: EditableAnnotation,
  AnnotationLabel: AnnotationLabel,
  AnnotationCallout: AnnotationCallout,
  AnnotationCalloutCircle: AnnotationCalloutCircle,
  AnnotationCalloutCurve: AnnotationCalloutCurve,
  AnnotationCalloutElbow: AnnotationCalloutElbow,
  AnnotationCalloutRect: AnnotationCalloutRect,
  AnnotationXYThreshold: AnnotationXYThreshold,
  AnnotationBadge: AnnotationBadge,
  AnnotationBracket: AnnotationBracket,
  AnnotationCalloutCustom: AnnotationCalloutCustom
};

window.Annotations = Annotations;

})));
//# sourceMappingURL=bundle.js.map
