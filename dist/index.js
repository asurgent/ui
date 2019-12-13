(function(e, a) { for(var i in a) e[i] = a[i]; }(exports, /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 6);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = require("prop-types");

/***/ }),
/* 2 */
/***/ (function(module, exports) {

module.exports = require("styled-components");

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("react-dom");

/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = require("react-spinners-kit");

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var src_Form_namespaceObject = {};
__webpack_require__.r(src_Form_namespaceObject);
__webpack_require__.d(src_Form_namespaceObject, "Primary", function() { return src_Form_Form; });
__webpack_require__.d(src_Form_namespaceObject, "useFormBuilder", function() { return hooks_useFormBuilder; });
var src_Table_namespaceObject = {};
__webpack_require__.r(src_Table_namespaceObject);
__webpack_require__.d(src_Table_namespaceObject, "Api", function() { return Table_ApiSearchTable; });
__webpack_require__.d(src_Table_namespaceObject, "Primary", function() { return Table_Table; });
__webpack_require__.d(src_Table_namespaceObject, "sortDirection", function() { return helpers_sortDirection; });
__webpack_require__.d(src_Table_namespaceObject, "useTableProvider", function() { return hooks_useTableProvider; });
var Button_namespaceObject = {};
__webpack_require__.r(Button_namespaceObject);
__webpack_require__.d(Button_namespaceObject, "Primary", function() { return Button_Primary; });
__webpack_require__.d(Button_namespaceObject, "Secondary", function() { return Button_Secondary; });
__webpack_require__.d(Button_namespaceObject, "Hollow", function() { return Button_Hollow; });
__webpack_require__.d(Button_namespaceObject, "Plain", function() { return Button_Plain; });
__webpack_require__.d(Button_namespaceObject, "Reject", function() { return Button_Reject; });
var Block_namespaceObject = {};
__webpack_require__.r(Block_namespaceObject);
__webpack_require__.d(Block_namespaceObject, "Center", function() { return Center; });
__webpack_require__.d(Block_namespaceObject, "Left", function() { return Left; });
__webpack_require__.d(Block_namespaceObject, "Right", function() { return Right; });
__webpack_require__.d(Block_namespaceObject, "Bordered", function() { return Bordered; });
__webpack_require__.d(Block_namespaceObject, "Plain", function() { return Block_styled_Plain; });
__webpack_require__.d(Block_namespaceObject, "SpaceBetween", function() { return SpaceBetween; });
__webpack_require__.d(Block_namespaceObject, "Wrap", function() { return Wrap; });
__webpack_require__.d(Block_namespaceObject, "Emptystate", function() { return BlockEmptyState; });
var src_Modal_namespaceObject = {};
__webpack_require__.r(src_Modal_namespaceObject);
__webpack_require__.d(src_Modal_namespaceObject, "Primary", function() { return src_Modal_Modal; });
var src_Switch_namespaceObject = {};
__webpack_require__.r(src_Switch_namespaceObject);
__webpack_require__.d(src_Switch_namespaceObject, "Primary", function() { return src_Switch_Switch; });

// EXTERNAL MODULE: external "react"
var external_react_ = __webpack_require__(0);
var external_react_default = /*#__PURE__*/__webpack_require__.n(external_react_);

// EXTERNAL MODULE: external "prop-types"
var external_prop_types_ = __webpack_require__(1);
var external_prop_types_default = /*#__PURE__*/__webpack_require__.n(external_prop_types_);

// EXTERNAL MODULE: external "react-dom"
var external_react_dom_ = __webpack_require__(3);
var external_react_dom_default = /*#__PURE__*/__webpack_require__.n(external_react_dom_);

// EXTERNAL MODULE: external "styled-components"
var external_styled_components_ = __webpack_require__(2);
var external_styled_components_default = /*#__PURE__*/__webpack_require__.n(external_styled_components_);

// CONCATENATED MODULE: ./src/Tooltip/Tooltip.styled.js

var TooltipWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "Tooltipstyled__TooltipWrapper",
  componentId: "sc-18ca3f0-0"
})(["top:0;left:0;z-index:999;position:fixed;background-color:#161616;padding:.8rem;border-radius:3px;transform:translateX(-50%);color:#ffffff;display:none;@media screen and (min-width:", "){display:block;}"], function (prop) {
  return "".concat(prop.theme.breakPointTablet * 10, "px");
});
// CONCATENATED MODULE: ./src/Tooltip/Tooltip.js
function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }





var modalRoot = document.getElementById('tooltip-root');

var Tooltip_Tooltip =
/*#__PURE__*/
function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, Tooltip);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(Tooltip)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "state", {
      show: false,
      top: 0,
      left: 0,
      ref: Object(external_react_["createRef"])()
    });

    _defineProperty(_assertThisInitialized(_this), "showTooltip", function (_ref) {
      var currentTarget = _ref.currentTarget;

      if (currentTarget != null) {
        var _currentTarget$getBou = currentTarget.getBoundingClientRect(),
            x = _currentTarget$getBou.x,
            top = _currentTarget$getBou.top,
            height = _currentTarget$getBou.height,
            width = _currentTarget$getBou.width;

        var left = x + width / 2;

        _this.setState({
          show: true,
          left: left,
          top: top + height + 5
        });
      }
    });

    _defineProperty(_assertThisInitialized(_this), "hideTooltip", function () {
      _this.setState({
        show: false,
        left: 0,
        top: 0
      });
    });

    _defineProperty(_assertThisInitialized(_this), "renderChildren", function (children) {
      var ref = _this.state.ref;

      if (ref.current) {
        ref.current.addEventListener('mouseenter', _this.showTooltip);
        ref.current.addEventListener('mouseleave', _this.hideTooltip);
      }

      return external_react_default.a.Children.map(children, function (child) {
        return external_react_default.a.cloneElement(child, {
          onMouseEnter: _this.showTooltip,
          onMouseLeave: _this.hideTooltip,
          tooltipRef: ref
        });
      });
    });

    return _this;
  }

  _createClass(Tooltip, [{
    key: "render",
    value: function render() {
      var _this$props = this.props,
          tooltipMessage = _this$props.tip,
          children = _this$props.children;
      var _this$state = this.state,
          top = _this$state.top,
          left = _this$state.left,
          show = _this$state.show;
      return external_react_default.a.createElement(external_react_default.a.Fragment, null, tooltipMessage ? this.renderChildren(children) : children, show === true && tooltipMessage && external_react_dom_default.a.createPortal(external_react_default.a.createElement(TooltipWrapper, {
        style: {
          top: top,
          left: left
        }
      }, tooltipMessage), modalRoot));
    }
  }]);

  return Tooltip;
}(external_react_["Component"]); // Proptypes


Tooltip_Tooltip.propTypes = {
  children: external_prop_types_default.a.element,
  tip: external_prop_types_default.a.string
}; // Proptypes

Tooltip_Tooltip.defaultProps = {
  children: null,
  tip: ''
};
/* harmony default export */ var src_Tooltip_Tooltip = (Tooltip_Tooltip);
// CONCATENATED MODULE: ./src/Tooltip/index.js

/* harmony default export */ var src_Tooltip = (src_Tooltip_Tooltip);
// CONCATENATED MODULE: ./src/Form/Form.styled.js

var FormStyle = external_styled_components_default.a.form.withConfig({
  displayName: "Formstyled__FormStyle",
  componentId: "sc-1p6dju6-0"
})(["width:100%;position:relative;display:flex;flex-direction:column;"]);
var FormRow = external_styled_components_default.a.div.withConfig({
  displayName: "Formstyled__FormRow",
  componentId: "sc-1p6dju6-1"
})(["display:block;width:100%;"]);
// CONCATENATED MODULE: ./src/Form/types/Text.styled.js

var Main = external_styled_components_default.a.div.withConfig({
  displayName: "Textstyled__Main",
  componentId: "s5h5b4-0"
})(["width:100%;max-width:100%;display:flex;flex-direction:column;margin-bottom:1.6rem;"]);
var Wrapper = external_styled_components_default.a.div.withConfig({
  displayName: "Textstyled__Wrapper",
  componentId: "s5h5b4-1"
})(["margin:0;border:0.1rem solid;border-color:", ";border-radius:", ";padding:1.2rem;position:relative;box-sizing:border-box;min-height:4.7rem;input,textarea,select{width:100%;max-width:100%;border:none;outline:none;appearance:none;&:focus,&.hasValue{outline:none;}}textarea{resize:vertical;}"], function (_ref) {
  var theme = _ref.theme;
  return theme.gray200;
}, function (prop) {
  return prop.status === 'error' ? '5px 5px 0px 0px' : '5px';
});
var Text_styled_Label = external_styled_components_default.a.div.withConfig({
  displayName: "Textstyled__Label",
  componentId: "s5h5b4-2"
})(["flex:1;font-size:1.4rem;letter-spacing:.1rem;color:", ";text-transform:capitalize;"], function (_ref2) {
  var theme = _ref2.theme;
  return theme.gray700;
});
var Header = external_styled_components_default.a.div.withConfig({
  displayName: "Textstyled__Header",
  componentId: "s5h5b4-3"
})(["margin-bottom:.8rem;display:flex;"]);
var Icon = external_styled_components_default.a.i.withConfig({
  displayName: "Textstyled__Icon",
  componentId: "s5h5b4-4"
})(["width:1.6rem;text-align:right;color:", ";cursor:pointer;"], function (_ref3) {
  var theme = _ref3.theme;
  return theme.gray700;
});

var arrowSvg = function arrowSvg(theme) {
  return encodeURIComponent("\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"292.4\" height=\"292.4\">\n  <path\n    fill=\"".concat(theme.gray500, "\" \n    d=\"M287 69.4a17.6 17.6 0 0 0-13-5.4H18.4c-5 0-9.3 1.8-12.9 5.4A17.6 17.6 0 0 0 0 82.2c0 5 1.8 9.3 5.4 12.9l128 127.9c3.6 3.6 7.8 5.4 12.8 5.4s9.2-1.8 12.8-5.4L287 95c3.5-3.5 5.4-7.8 5.4-12.8 0-5-1.9-9.2-5.5-12.8z\"/>\n</svg>"));
};

var SelectWrapper = external_styled_components_default()(Wrapper).withConfig({
  displayName: "Textstyled__SelectWrapper",
  componentId: "s5h5b4-5"
})(["padding:0;background-image:url('data:image/svg+xml;charset=US-ASCII, ", "');background-repeat:no-repeat,repeat;background-position:right .7em top 50%,0 0;background-size:.65em auto,100%;select{padding:1.2rem 0 1.2rem 1.2rem;}"], function (_ref4) {
  var theme = _ref4.theme;
  return arrowSvg(theme);
});
// CONCATENATED MODULE: ./src/Form/types/Text.js
function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var propTyps = {
  value: external_prop_types_default.a.string,
  label: external_prop_types_default.a.string,
  name: external_prop_types_default.a.string.isRequired,
  tooltip: external_prop_types_default.a.string.isRequired,
  props: external_prop_types_default.a.instanceOf(Object)
};
var defaultProps = {
  value: '',
  label: '',
  props: {}
};
var Text = Object(external_react_["forwardRef"])(function (props, ref) {
  var label = props.label,
      name = props.name,
      tooltip = props.tooltip;

  var _useState = Object(external_react_["useState"])(''),
      _useState2 = _slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  Object(external_react_["useEffect"])(function () {
    setValue(props.value);
  }, [props.value]);
  return external_react_default.a.createElement(Main, null, external_react_default.a.createElement(Header, null, external_react_default.a.createElement(Text_styled_Label, null, label || name), tooltip && external_react_default.a.createElement(src_Tooltip, {
    tip: tooltip
  }, external_react_default.a.createElement(Icon, {
    className: "far fa-question-circle"
  }))), external_react_default.a.createElement(Wrapper, null, external_react_default.a.createElement("input", _extends({}, props.props, {
    type: "text",
    value: value,
    onChange: function onChange(_ref) {
      var target = _ref.target;
      return setValue(target.value);
    },
    name: name,
    ref: ref
  }))));
});
Text.defaultProps = defaultProps;
Text.propTypes = propTyps;
Text.displayName = '@asurgent.ui.Form.Input.Text';
/* harmony default export */ var types_Text = (Text);
// CONCATENATED MODULE: ./src/Form/types/TextArea.js
function TextArea_extends() { TextArea_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return TextArea_extends.apply(this, arguments); }

function TextArea_slicedToArray(arr, i) { return TextArea_arrayWithHoles(arr) || TextArea_iterableToArrayLimit(arr, i) || TextArea_nonIterableRest(); }

function TextArea_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function TextArea_iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function TextArea_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var TextArea_propTyps = {
  value: external_prop_types_default.a.string,
  label: external_prop_types_default.a.string,
  name: external_prop_types_default.a.string.isRequired,
  tooltip: external_prop_types_default.a.string.isRequired,
  props: external_prop_types_default.a.instanceOf(Object)
};
var TextArea_defaultProps = {
  value: '',
  label: '',
  props: {}
};
var TextArea = Object(external_react_["forwardRef"])(function (props, ref) {
  var label = props.label,
      name = props.name,
      tooltip = props.tooltip;

  var _useState = Object(external_react_["useState"])(''),
      _useState2 = TextArea_slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  Object(external_react_["useEffect"])(function () {
    setValue(props.value);
  }, [props.value]);
  return external_react_default.a.createElement(Main, null, external_react_default.a.createElement(Header, null, external_react_default.a.createElement(Text_styled_Label, null, label || name), tooltip && external_react_default.a.createElement(src_Tooltip, {
    tip: tooltip
  }, external_react_default.a.createElement(Icon, {
    className: "far fa-question-circle"
  }))), external_react_default.a.createElement(Wrapper, null, external_react_default.a.createElement("textarea", TextArea_extends({}, props.props, {
    type: "text",
    value: value,
    onChange: function onChange(_ref) {
      var target = _ref.target;
      return setValue(target.value);
    },
    name: name,
    ref: ref,
    autoComplete: "off"
  }))));
});
TextArea.defaultProps = TextArea_defaultProps;
TextArea.propTypes = TextArea_propTyps;
TextArea.displayName = '@asurgent.ui.Form.Input.TextArea';
/* harmony default export */ var types_TextArea = (TextArea);
// CONCATENATED MODULE: ./src/Form/types/Select.js
function Select_extends() { Select_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Select_extends.apply(this, arguments); }

function Select_slicedToArray(arr, i) { return Select_arrayWithHoles(arr) || Select_iterableToArrayLimit(arr, i) || Select_nonIterableRest(); }

function Select_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Select_iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Select_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var Select_propTyps = {
  value: external_prop_types_default.a.string,
  label: external_prop_types_default.a.string,
  name: external_prop_types_default.a.string.isRequired,
  tooltip: external_prop_types_default.a.string.isRequired,
  options: external_prop_types_default.a.arrayOf(external_prop_types_default.a.instanceOf(Object)).isRequired,
  props: external_prop_types_default.a.instanceOf(Object)
};
var Select_defaultProps = {
  value: '',
  label: '',
  props: {}
};
var Select = Object(external_react_["forwardRef"])(function (props, ref) {
  var label = props.label,
      name = props.name,
      tooltip = props.tooltip,
      options = props.options;

  var _useState = Object(external_react_["useState"])(''),
      _useState2 = Select_slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  Object(external_react_["useEffect"])(function () {
    setValue(props.value);
  }, [props.value]);
  return external_react_default.a.createElement(Main, null, external_react_default.a.createElement(Header, null, external_react_default.a.createElement(Text_styled_Label, null, label || name), tooltip && external_react_default.a.createElement(src_Tooltip, {
    tip: tooltip
  }, external_react_default.a.createElement(Icon, {
    className: "far fa-question-circle"
  }))), external_react_default.a.createElement(SelectWrapper, null, external_react_default.a.createElement("select", Select_extends({}, props.props, {
    type: "select",
    onChange: function onChange(_ref) {
      var target = _ref.target;
      return setValue(target.value);
    },
    value: value,
    name: name,
    ref: ref
  }), Array.isArray(options) && options.map(function (_ref2) {
    var optionValue = _ref2.value,
        optionLabel = _ref2.label,
        disabled = _ref2.disabled,
        disabledPreFix = _ref2.disabledPreFix,
        disabledPostFix = _ref2.disabledPostFix;
    return external_react_default.a.createElement("option", {
      key: value,
      value: optionValue,
      disabled: disabled
    }, disabled && disabledPreFix, optionLabel, disabled && disabledPostFix);
  }))));
});
Select.defaultProps = Select_defaultProps;
Select.propTypes = Select_propTyps;
Select.displayName = '@asurgent.ui.Form.Input.Select';
/* harmony default export */ var types_Select = (Select);
// CONCATENATED MODULE: ./src/Form/types/Label.js
function Label_slicedToArray(arr, i) { return Label_arrayWithHoles(arr) || Label_iterableToArrayLimit(arr, i) || Label_nonIterableRest(); }

function Label_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Label_iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Label_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }





var Label_propTyps = {
  value: external_prop_types_default.a.string,
  label: external_prop_types_default.a.string,
  name: external_prop_types_default.a.string.isRequired,
  tooltip: external_prop_types_default.a.string.isRequired
};
var Label_defaultProps = {
  value: '',
  label: ''
};

var Label_Label = function Label(props) {
  var label = props.label,
      name = props.name,
      tooltip = props.tooltip;

  var _useState = Object(external_react_["useState"])(''),
      _useState2 = Label_slicedToArray(_useState, 2),
      value = _useState2[0],
      setValue = _useState2[1];

  Object(external_react_["useEffect"])(function () {
    setValue(props.value);
  }, [props.value]);
  return external_react_default.a.createElement(Main, null, external_react_default.a.createElement(Header, null, external_react_default.a.createElement(Text_styled_Label, null, label || name), tooltip && external_react_default.a.createElement(src_Tooltip, {
    tip: tooltip
  }, external_react_default.a.createElement(Icon, {
    className: "far fa-question-circle"
  }))), external_react_default.a.createElement(Wrapper, {
    style: {
      opacity: '.4'
    }
  }, value));
};

Label_Label.defaultProps = Label_defaultProps;
Label_Label.propTypes = Label_propTyps;
Label_Label.displayName = '@asurgent.ui.Form.Label';
/* harmony default export */ var types_Label = (Label_Label);
// CONCATENATED MODULE: ./src/Form/helpers.js
function helpers_extends() { helpers_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return helpers_extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { helpers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function helpers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }






var withDelayTimer = function withDelayTimer(action) {
  var timeout = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var timer = setTimeout(function () {}, timeout);
  return function () {
    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    clearTimeout(timer);
    timer = setTimeout(function () {
      action.apply(void 0, args);
    }, timeout);
  };
};

var helpers_getInputComponent = function getInputComponent(type) {
  switch (type) {
    case 'text':
      return types_Text;

    case 'textarea':
      return types_TextArea;

    case 'select':
      return types_Select;

    case 'label':
      return types_Label;

    default:
      return types_Text;
  }
};

var helpers_generateReferences = function generateReferences(inputs) {
  var referenceList = Object.keys(inputs).reduce(function (acc, key) {
    // Ignore labels when generating refercens
    if (inputs[key].type === 'label') {
      return acc;
    }

    return _objectSpread(helpers_defineProperty({}, key, external_react_default.a.createRef()), acc);
  }, {});
  return referenceList;
};
var helpers_generateFieldComponents = function generateFieldComponents(inputs, referenceList) {
  var original = {};
  var fields = Object.keys(inputs).reduce(function (acc, key) {
    var _inputs$key = inputs[key],
        type = _inputs$key.type,
        value = _inputs$key.value,
        tooltip = _inputs$key.tooltip,
        label = _inputs$key.label,
        inputProps = _inputs$key.props;
    Object.assign(original, helpers_defineProperty({}, key, value));
    var RequestedComponent = helpers_getInputComponent(type);
    var Component = external_react_default.a.createElement(RequestedComponent, helpers_extends({
      ref: referenceList[key],
      name: key,
      value: value || '',
      tooltip: tooltip || '',
      label: label || value
    }, inputProps || {}));
    return Object.assign(acc, helpers_defineProperty({}, key, Component));
  }, {});
  return {
    fields: fields,
    original: original
  };
};
// CONCATENATED MODULE: ./src/Form/Form.js
function Form_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Form_typeof = function _typeof(obj) { return typeof obj; }; } else { Form_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Form_typeof(obj); }





var triggerTimer = withDelayTimer(function (values, name, onNewValue) {
  onNewValue(values, name);
}, 950);
var Form_propTyps = {
  form: external_prop_types_default.a.instanceOf(Object).isRequired,
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.element, external_prop_types_default.a.arrayOf(external_prop_types_default.a.element)]),
  onChange: external_prop_types_default.a.func,
  onSubmit: external_prop_types_default.a.func,
  onFocusChange: external_prop_types_default.a.func,
  onNewValue: external_prop_types_default.a.func
};
var Form_defaultProps = {
  children: null,
  onChange: function onChange() {},
  onSubmit: function onSubmit() {},
  onFocusChange: function onFocusChange() {},
  onNewValue: function onNewValue() {}
};

var Form_Form = function Form(props) {
  var form = props.form,
      children = props.children,
      onChange = props.onChange,
      onSubmit = props.onSubmit,
      onFocusChange = props.onFocusChange,
      onNewValue = props.onNewValue;

  if (!form || Form_typeof(form) !== 'object' || !form.inputFileds) {
    return null;
  }

  var inputFileds = form.inputFileds;

  var handleOnChange = function handleOnChange(event) {
    var name = event.target.name;

    var _form$getValues = form.getValues(),
        values = _form$getValues.values,
        dirty = _form$getValues.dirty;

    triggerTimer(values, dirty, onNewValue);
    onChange(values, dirty, name);
  };

  var handleBlur = function handleBlur(event) {
    var name = event.target.name;

    var _form$getValues2 = form.getValues(),
        values = _form$getValues2.values,
        dirty = _form$getValues2.dirty;

    onFocusChange(values, dirty, name);
  };

  var handleSubmit = function handleSubmit(event) {
    event.preventDefault();

    var _form$getValues3 = form.getValues(),
        values = _form$getValues3.values,
        dirty = _form$getValues3.dirty;

    onSubmit(values, dirty);
  };

  var onSubmitAction = function onSubmitAction() {
    return form.getValues();
  };

  return external_react_default.a.createElement(FormStyle, {
    onChange: handleOnChange,
    onSubmit: handleSubmit,
    onBlur: handleBlur
  }, typeof children === 'function' && children(inputFileds, onSubmitAction), typeof children !== 'function' && Object.keys(inputFileds).map(function (key) {
    return external_react_default.a.createElement(FormRow, {
      key: key
    }, inputFileds[key]);
  }));
};

Form_Form.defaultProps = Form_defaultProps;
Form_Form.propTypes = Form_propTyps;
Form_Form.displayName = '@asurgent.ui.Form';
/* harmony default export */ var src_Form_Form = (Form_Form);
// CONCATENATED MODULE: ./src/Form/hooks/useFormBuilder.js
function useFormBuilder_slicedToArray(arr, i) { return useFormBuilder_arrayWithHoles(arr) || useFormBuilder_iterableToArrayLimit(arr, i) || useFormBuilder_nonIterableRest(); }

function useFormBuilder_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function useFormBuilder_iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useFormBuilder_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function useFormBuilder_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function useFormBuilder_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { useFormBuilder_ownKeys(Object(source), true).forEach(function (key) { useFormBuilder_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { useFormBuilder_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function useFormBuilder_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function useFormBuilder_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { useFormBuilder_typeof = function _typeof(obj) { return typeof obj; }; } else { useFormBuilder_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return useFormBuilder_typeof(obj); }




var _updateValue = function updateValue(form, change) {
  if (useFormBuilder_typeof(change) === 'object') {
    var name = change.name,
        value = change.value;

    if (form[name]) {
      var copy = useFormBuilder_objectSpread({}, form);

      Object.assign(copy[name], {
        value: value
      });
      return copy;
    }
  }

  return false;
};

var _updateField = function updateField(form, change) {
  if (useFormBuilder_typeof(change) === 'object') {
    var name = change.name,
        value = change.value;

    if (form[name]) {
      var copy = useFormBuilder_objectSpread({}, form);

      Object.assign(copy[name], value);
      return copy;
    }
  }

  return false;
};

var _updateValues = function updateValues(form, list) {
  var copy = useFormBuilder_objectSpread({}, form);

  var changed = false;

  if (Array.isArray(list)) {
    list.forEach(function (_ref) {
      var name = _ref.name,
          value = _ref.value;

      if (copy[name]) {
        changed = true;
        Object.assign(copy[name], {
          value: value
        });
      }
    });
  }

  if (!changed) {
    return false;
  }

  return copy;
};

var _updateFields = function updateFields(form, list) {
  var copy = useFormBuilder_objectSpread({}, form);

  var changed = false;

  if (Array.isArray(list)) {
    list.forEach(function (_ref2) {
      var name = _ref2.name,
          rest = _objectWithoutProperties(_ref2, ["name"]);

      if (copy[name]) {
        changed = true;
        Object.assign(copy[name], rest);
      }
    });
  }

  if (!changed) {
    return false;
  }

  return copy;
};

var _getValues = function getValues(references, originalValues) {
  var dirty = false;
  var keys = Object.keys(references) || [];
  var values = keys.reduce(function (acc, key) {
    if (references[key] && references[key].current) {
      var value = references[key].current.value;

      if (value !== originalValues[key]) {
        dirty = true;
      }

      return useFormBuilder_objectSpread(useFormBuilder_defineProperty({}, key, value), acc);
    }

    return acc;
  }, {});
  return {
    values: values,
    dirty: dirty
  };
};

var useFormBuilder_useFormBuilder = function useFormBuilder(form) {
  var _useState = Object(external_react_["useState"])(form),
      _useState2 = useFormBuilder_slicedToArray(_useState, 2),
      formData = _useState2[0],
      setFormData = _useState2[1];

  var _useState3 = Object(external_react_["useState"])([]),
      _useState4 = useFormBuilder_slicedToArray(_useState3, 2),
      inputFileds = _useState4[0],
      setInputFields = _useState4[1];

  var _useState5 = Object(external_react_["useState"])({}),
      _useState6 = useFormBuilder_slicedToArray(_useState5, 2),
      references = _useState6[0],
      setReferences = _useState6[1];

  var _useState7 = Object(external_react_["useState"])({}),
      _useState8 = useFormBuilder_slicedToArray(_useState7, 2),
      originalValues = _useState8[0],
      setOriginalValues = _useState8[1];

  Object(external_react_["useEffect"])(function () {
    var referenceList = helpers_generateReferences(formData);

    var _generateFieldCompone = helpers_generateFieldComponents(formData, referenceList),
        fields = _generateFieldCompone.fields,
        original = _generateFieldCompone.original;

    setReferences(referenceList);
    setOriginalValues(original);
    setInputFields(fields);
  }, [formData]);
  return {
    updateValue: function updateValue(name, value) {
      var update = _updateValue(formData, {
        name: name,
        value: value
      });

      if (update) {
        setFormData(update);
      }
    },
    updateField: function updateField(name, value) {
      var update = _updateField(formData, {
        name: name,
        value: value
      });

      if (update) {
        setFormData(update);
      }
    },
    updateFields: function updateFields(list) {
      var update = _updateFields(formData, list);

      if (update) {
        setFormData(update);
      }
    },
    addField: function addField(key, field) {
      if (Object.prototype.hasOwnProperty.call(formData, key) === false) {
        var copy = useFormBuilder_objectSpread({}, formData, useFormBuilder_defineProperty({}, key, field));

        setFormData(copy);
      }
    },
    updateValues: function updateValues(list) {
      var update = _updateValues(formData, list);

      if (update) {
        setFormData(update);
      }
    },
    getValues: function getValues() {
      return _getValues(references, originalValues);
    },
    inputFileds: inputFileds
  };
};

/* harmony default export */ var hooks_useFormBuilder = (useFormBuilder_useFormBuilder);
// CONCATENATED MODULE: ./src/Form/index.js


// EXTERNAL MODULE: external "react-spinners-kit"
var external_react_spinners_kit_ = __webpack_require__(5);

// CONCATENATED MODULE: ./src/Table/Table.styled.js


var Arrow = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__Arrow",
  componentId: "sc-1b6vfmd-0"
})(["border:solid black;border-width:0 2px 2px 0;display:inline-block;padding:3px;transition-duration:0.5s;height:1rem;width:1rem;margin:0 .8rem;cursor:pointer;transform:", ";"], function (_ref) {
  var left = _ref.left;

  if (left) {
    return 'rotate(135deg)';
  }

  return 'rotate(-45deg)';
});
var Table_styled_Wrapper = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__Wrapper",
  componentId: "sc-1b6vfmd-1"
})(["width:100%;max-width:100%;min-width:100%;display:flex;flex-direction:column;"]);
var Pagination = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__Pagination",
  componentId: "sc-1b6vfmd-2"
})(["display:flex;align-items:center;justify-content:flex-end;margin-top:1.6rem;"]);
var Page = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__Page",
  componentId: "sc-1b6vfmd-3"
})(["display:flex;cursor:pointer;width:2.4rem;height:2.4rem;justify-content:center;align-items:center;margin-left:.8rem;font-size:1.2rem;font-weight:600;border:1px solid;border-color:", ";background:", ";color:", ";border-radius:2px;&:hover{border-color:", ";background:", ";}"], function (_ref2) {
  var theme = _ref2.theme,
      activePage = _ref2.activePage;
  return activePage ? theme.rgba(theme.blue400, 0.2) : 'transparent';
}, function (_ref3) {
  var theme = _ref3.theme,
      activePage = _ref3.activePage;
  return activePage ? theme.rgba(theme.blue400, 0.1) : theme.white;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.gray800;
}, function (_ref5) {
  var theme = _ref5.theme,
      clickable = _ref5.clickable;
  return clickable ? theme.rgba(theme.blue400, 0.3) : 'transparent';
}, function (_ref6) {
  var theme = _ref6.theme,
      clickable = _ref6.clickable;
  return clickable ? theme.rgba(theme.blue400, 0.2) : 'transparent';
});
var Base = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__Base",
  componentId: "sc-1b6vfmd-4"
})(["width:100%;max-width:100%;min-width:100%;overflow-x:auto;"]);
var Table_styled_Cell = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__Cell",
  componentId: "sc-1b6vfmd-5"
})(["grid-column:", ";display:flex;padding:.8rem;position:relative;overflow:hidden;"], function (_ref7) {
  var cardView = _ref7.cardView;
  return cardView ? '1/-1' : 'unset';
});
var TableCellContent = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__TableCellContent",
  componentId: "sc-1b6vfmd-6"
})(["margin:0;padding:0;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;height:4.8rem;display:flex;align-items:center;"]);
var Table_styled_Header = external_styled_components_default()(Table_styled_Cell).withConfig({
  displayName: "Tablestyled__Header",
  componentId: "sc-1b6vfmd-7"
})(["align-items:center;grid-column:unset;flex-direction:row;border-color:", ";"], function (_ref8) {
  var theme = _ref8.theme;
  return theme.gray300;
});
var HeaderContent = external_styled_components_default()(TableCellContent).withConfig({
  displayName: "Tablestyled__HeaderContent",
  componentId: "sc-1b6vfmd-8"
})(["cursor:pointer;font-weight:700;flex:1;"]);
var HeaderSort = external_styled_components_default()(Arrow).withConfig({
  displayName: "Tablestyled__HeaderSort",
  componentId: "sc-1b6vfmd-9"
})(["height:.8rem;width:.8rem;margin:0;transform:", ";border-color:", ";"], function (_ref9) {
  var direction = _ref9.direction;

  if (direction === helpers_sortDirection.asc) {
    return 'rotate(-135deg)';
  }

  return 'rotate(45deg)';
}, function (_ref10) {
  var active = _ref10.active,
      theme = _ref10.theme;
  return active ? theme.gray800 : theme.gray300;
});
var Loading = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__Loading",
  componentId: "sc-1b6vfmd-10"
})(["grid-column:1/-1;padding:1.6rem 0;display:flex;align-items:center;justify-content:center;"]);
var Content = external_styled_components_default.a.div.withConfig({
  displayName: "Tablestyled__Content",
  componentId: "sc-1b6vfmd-11"
})(["display:grid;width:fit-content;min-width:100%;grid-template-rows:auto;grid-template-columns:", ";", "{border-bottom:0px solid ", ";border-width:", ";&.even-row{background:", ";}}", "{border-width:1px;}"], function (_ref11) {
  var headerList = _ref11.headerList,
      equalSize = _ref11.equalSize;
  var columnSize = 'minmax(50px, 1fr)';
  var sizing = headerList.reduce(function (acc, _ref12) {
    var size = _ref12.size;

    if (equalSize) {
      acc.push(columnSize);
    } else {
      acc.push(size || columnSize);
    }

    return acc;
  }, []).join(' ').trim();
  return sizing;
}, Table_styled_Cell, function (_ref13) {
  var theme = _ref13.theme;
  return theme.gray200;
}, function (_ref14) {
  var striped = _ref14.striped;
  return striped ? '1px' : '0px';
}, function (_ref15) {
  var zebra = _ref15.zebra,
      theme = _ref15.theme;
  return zebra ? theme.blue50 : theme.white;
}, Table_styled_Header);
// CONCATENATED MODULE: ./src/Table/helpers.js
function Table_helpers_extends() { Table_helpers_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return Table_helpers_extends.apply(this, arguments); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function helpers_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function helpers_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { helpers_ownKeys(Object(source), true).forEach(function (key) { Table_helpers_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { helpers_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function Table_helpers_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function helpers_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { helpers_typeof = function _typeof(obj) { return typeof obj; }; } else { helpers_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return helpers_typeof(obj); }


var helpers_sortDirection = {
  asc: 1,
  desc: 0
};

var isObject = function isObject(item) {
  return item && helpers_typeof(item) === 'object' && !Array.isArray(item);
};

var mergeDeep = function mergeDeep(target, source) {
  var output = helpers_objectSpread({}, target);

  if (isObject(target) && isObject(source)) {
    Object.keys(source).forEach(function (key) {
      if (isObject(source[key])) {
        if (!(key in target)) {
          Object.assign(output, Table_helpers_defineProperty({}, key, source[key]));
        } else {
          output[key] = mergeDeep(target[key], source[key]);
        }
      } else {
        Object.assign(output, Table_helpers_defineProperty({}, key, source[key]));
      }
    });
  }

  return output;
};

var pageNumbersList = function pageNumbersList(currentPage, delta, totalPages) {
  var length = Math.max(0, Math.min(totalPages, delta));

  var pageItem = function pageItem(value) {
    var clickable = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    return {
      value: value,
      clickable: clickable
    };
  };

  var pageNumbers = function pageNumbers(num) {
    var lenghtModifer = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : length;
    return Array.from({
      length: lenghtModifer
    }, function (_, i) {
      return pageItem(num + i);
    });
  };

  if (currentPage < delta) {
    var _pages = pageNumbers(1);

    return [].concat(_toConsumableArray(_pages), [pageItem(totalPages)]);
  }

  if (totalPages < currentPage + delta - 1) {
    var val = totalPages - delta + 1;

    var _pages2 = pageNumbers(val);

    return [pageItem(1)].concat(_toConsumableArray(_pages2));
  }

  var padding = Math.round(delta / 2);
  var pageBase = currentPage - padding + 1;
  var pages = pageNumbers(pageBase, length - 1);
  return [pageItem(1)].concat(_toConsumableArray(pages), [pageItem(totalPages)]);
};

var pagination = function pagination(currentPage, totalPages, delta) {
  if (totalPages <= 1) {
    return [1];
  }

  var ELLIPSIS = '...';
  return pageNumbersList(currentPage, delta, totalPages).reduce(function (acc, page, index, origin) {
    acc.push(page);
    var nextItem = origin[index + 1];

    if (nextItem && nextItem.value - page.value > 1) {
      acc.push({
        value: ELLIPSIS,
        clickable: false
      });
    }

    return acc;
  }, []);
};

var tableColumnGenerator = function tableColumnGenerator(columnConfiguration, cellData, headerData) {
  var columnList = columnConfiguration(cellData); // Make sure the cell-size lenght match with number of
  // headers since the headers controll the grid sizing

  return Array.from({
    length: headerData.length
  }).map(function (_, i) {
    return {
      isEvenColumn: (i + 1) % 2 === 1,
      data: columnList[i] || ''
    };
  });
};

var helpers_extendCellObject = function extendCellObject(index, cellData, newCell, headerData, rowData) {
  var headerProps = headerData[index] ? headerData[index].props : {};
  var rowProps = rowData.props || {};
  var cellProps = cellData.props || {}; // Merge all passed props from header, row & cell
  // Priority is cell, row, header

  var baseProps = mergeDeep(rowProps, headerProps);
  var overrideProps = mergeDeep(baseProps, cellProps); // Try to figure out what's beeing passed and render accordingly

  if (helpers_typeof(cellData) === 'object' && Object.prototype.hasOwnProperty.call(cellData, 'value')) {
    Object.assign(newCell, {
      cell: cellData.value,
      props: overrideProps
    });
  } else if (typeof cellData === 'string') {
    Object.assign(newCell, {
      cell: cellData,
      props: overrideProps
    });
  } else if (external_react_default.a.isValidElement(cellData)) {
    Object.assign(newCell, {
      cell: cellData,
      props: overrideProps
    });
  } else {
    // If we don't match, still append an empty cell
    // so we get an even cell count for the row
    Object.assign(newCell, {
      cell: '',
      props: overrideProps
    });
  }
};

var tableRowCellGenerator = function tableRowCellGenerator(columnList, rowData, headerData) {
  return columnList.reduce(function (cellAcc, _ref, cellIndex) {
    var isEvenColumn = _ref.isEvenColumn,
        cell = _ref.data;
    var id = "".concat(rowData.id, "-cell-").concat(cellIndex);
    var newCell = {
      isEvenColumn: isEvenColumn,
      id: id
    };

    if (typeof cell === 'function') {
      var cellFnData = cell();
      helpers_extendCellObject(cellIndex, cellFnData, newCell, headerData, rowData);
    } else {
      helpers_extendCellObject(cellIndex, cell, newCell, headerData, rowData);
    }

    cellAcc.push(newCell);
    return cellAcc;
  }, []);
};

var helpers_generateCells = function generateCells(props, rowData, isEvenRow, components) {
  var columnConfiguration = props.columnConfiguration,
      headerData = props.headerData;
  var Cell = components.cell;
  var CellContent = components.content;
  var columnList = tableColumnGenerator(columnConfiguration, rowData, headerData);
  var cellsList = tableRowCellGenerator(columnList, rowData, headerData);
  return cellsList.map(function (cellData) {
    var id = cellData.id,
        cell = cellData.cell,
        isEvenColumn = cellData.isEvenColumn,
        cellProps = cellData.props;
    var classes = [isEvenRow ? 'odd-row' : 'even-row', isEvenColumn ? 'odd-column' : 'even-column'].join(' ');
    return external_react_default.a.createElement(Cell, Table_helpers_extends({}, cellProps, {
      key: id,
      className: classes
    }), external_react_default.a.createElement(CellContent, null, cell));
  });
};

var helpers_generateCard = function generateCard(props, columnData, isEvenRow, components) {
  var cardConfiguration = props.cardConfiguration;
  var content = cardConfiguration(columnData, isEvenRow);
  var CellComponent = components.cell;
  var element = external_react_default.a.createElement(CellComponent, {
    key: "".concat(columnData.id, "-card"),
    cardView: true,
    isEvenRow: true
  }, content);
  return element;
};

var generateRowId = function generateRowId(columnData, index) {
  if (!columnData.id) {
    var id = "row-id-".concat(new Date().getTime(), "-").concat(index);
    Object.assign(columnData, {
      id: id
    });
  }
};

var generateRows = function generateRows(props, components) {
  return props.rowData.reduce(function (acc, rowData, index) {
    generateRowId(rowData, index);
    var cardView = props.cardView;
    var isEvenRow = (index - 1) % 2;

    if (cardView && typeof props.cardConfiguration === 'function') {
      var card = helpers_generateCard(props, rowData, isEvenRow, components);
      acc.push(card);
    } else {
      var cells = helpers_generateCells(props, rowData, isEvenRow, components);
      acc.push(cells);
    }

    return acc;
  }, []);
};
// CONCATENATED MODULE: ./src/Table/Table.js
function Table_slicedToArray(arr, i) { return Table_arrayWithHoles(arr) || Table_iterableToArrayLimit(arr, i) || Table_nonIterableRest(); }

function Table_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Table_iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Table_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }








var propTypes = {
  pages: external_prop_types_default.a.number,
  activePage: external_prop_types_default.a.number,
  withHeader: external_prop_types_default.a.bool,
  withPagination: external_prop_types_default.a.bool,
  rowData: external_prop_types_default.a.arrayOf(external_prop_types_default.a.instanceOf(Object)).isRequired,
  headerData: external_prop_types_default.a.arrayOf(external_prop_types_default.a.shape({
    value: external_prop_types_default.a.string,
    sortKey: external_prop_types_default.a.string
  })),
  onPagination: external_prop_types_default.a.func,
  onSort: external_prop_types_default.a.func,
  tableRowConfiguration: external_prop_types_default.a.oneOfType([external_prop_types_default.a.func, external_prop_types_default.a.bool]),
  cardRowConfiguration: external_prop_types_default.a.oneOfType([external_prop_types_default.a.func, external_prop_types_default.a.bool]),
  cardView: external_prop_types_default.a.bool,
  equalSizeColumns: external_prop_types_default.a.bool,
  isLoading: external_prop_types_default.a.bool,
  emptystate: external_prop_types_default.a.string
};
var Table_defaultProps = {
  pages: 0,
  activePage: 0,
  cardView: false,
  withHeader: true,
  withPagination: true,
  headerData: [],
  cardRowConfiguration: false,
  tableRowConfiguration: false,
  equalSizeColumns: false,
  isLoading: false,
  emptystate: 'No items found',
  onPagination: function onPagination() {},
  onSort: function onSort() {}
};
var bodyComponents = {
  cell: Table_styled_Cell,
  content: TableCellContent
};
var PAGINATION_DELTA = 5;
var Table = Object(external_styled_components_["withTheme"])(function (props) {
  var rowData = props.rowData,
      headerData = props.headerData,
      cardView = props.cardView,
      tableRowConfiguration = props.tableRowConfiguration,
      cardRowConfiguration = props.cardRowConfiguration,
      sortDirection = props.sortDirection,
      activeSort = props.activeSort,
      theme = props.theme;

  var _useState = Object(external_react_["useState"])([]),
      _useState2 = Table_slicedToArray(_useState, 2),
      rows = _useState2[0],
      setRows = _useState2[1];

  Object(external_react_["useEffect"])(function () {
    var defaultRows = generateRows(props, bodyComponents);
    setRows(defaultRows);
  }, [rowData, cardView]);
  var pages = props.pages,
      zebra = props.zebra,
      striped = props.striped,
      activePage = props.activePage,
      withHeader = props.withHeader,
      withPagination = props.withPagination,
      equalSizeColumns = props.equalSizeColumns,
      isLoading = props.isLoading,
      emptystate = props.emptystate;

  var onPagination = function onPagination(requestedPage) {
    var page = Math.max(1, Math.min(pages, requestedPage));

    if (page !== activePage) {
      props.onPagination(page);
    }
  };

  var onSort = function onSort(sortKey) {
    if (sortKey === activeSort) {
      var newSort = sortDirection === helpers_sortDirection.asc ? helpers_sortDirection.desc : helpers_sortDirection.asc;
      props.onSort(sortKey, newSort);
    } else {
      props.onSort(sortKey, helpers_sortDirection.asc);
    }
  };

  var paginationList = pagination(activePage, pages, PAGINATION_DELTA);
  var noContent = rows.length === 0 && isLoading === false;
  return external_react_default.a.createElement(Table_styled_Wrapper, null, external_react_default.a.createElement(Base, null, external_react_default.a.createElement(Content, {
    headerList: headerData,
    equalSize: equalSizeColumns,
    zebra: zebra,
    striped: striped
  }, withHeader && headerData.map(function (_ref) {
    var value = _ref.value,
        sortKey = _ref.sortKey;
    return external_react_default.a.createElement(Table_styled_Header, {
      key: value,
      onClick: function onClick() {
        return onSort(sortKey);
      }
    }, external_react_default.a.createElement(HeaderContent, null, value), sortKey === activeSort && external_react_default.a.createElement(HeaderSort, {
      active: true,
      direction: sortDirection
    }), sortKey && sortKey !== activeSort && external_react_default.a.createElement(HeaderSort, null));
  }), noContent && external_react_default.a.createElement(Loading, null, emptystate), !isLoading && rows, isLoading && external_react_default.a.createElement(Loading, null, external_react_default.a.createElement(external_react_spinners_kit_["RingSpinner"], {
    color: theme.brandPrimaryColor,
    size: 32
  })))), withPagination && paginationList.length > 1 && external_react_default.a.createElement(Pagination, null, external_react_default.a.createElement(Arrow, {
    left: true,
    onClick: function onClick() {
      return onPagination(activePage - 1);
    }
  }), paginationList.map(function (_ref2, index) {
    var value = _ref2.value,
        clickable = _ref2.clickable;
    return external_react_default.a.createElement(Page, {
      key: "".concat(value, "-").concat(index),
      clickable: clickable,
      activePage: activePage === value,
      onClick: function onClick() {
        return clickable && onPagination(value);
      }
    }, value);
  }), external_react_default.a.createElement(Arrow, {
    right: true,
    onClick: function onClick() {
      return onPagination(activePage + 1);
    }
  })));
});
Table.propTypes = propTypes;
Table.defaultProps = Table_defaultProps;
/* harmony default export */ var Table_Table = (Table);
// CONCATENATED MODULE: ./src/Table/ApiSearchTable.js
function ApiSearchTable_extends() { ApiSearchTable_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return ApiSearchTable_extends.apply(this, arguments); }

function ApiSearchTable_objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = ApiSearchTable_objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function ApiSearchTable_objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }






var getEmptystate = function getEmptystate(provider, props) {
  var base = props.emptystate;
  var query = provider.getQuery();

  if (query) {
    return "".concat(base, " for : ").concat(query);
  }

  return base;
};

var searchForm = function searchForm(_ref) {
  var searchLabel = _ref.searchLabel;
  return {
    search: {
      type: 'text',
      label: searchLabel,
      value: ''
    }
  };
};

var ApiSearchTable_propTypes = {
  //   ...basePropsTypes,
  provider: external_prop_types_default.a.instanceOf(Object),
  withSearch: external_prop_types_default.a.bool,
  searchLabel: external_prop_types_default.a.string,
  emptystate: external_prop_types_default.a.string
};
var ApiSearchTable_defaultProps = {
  //   ...baseDefaultProps,
  provider: {},
  withSearch: true,
  searchLabel: 'Search',
  emptystate: 'No items found'
};

var ApiSearchTable_ApiSearchTable = function ApiSearchTable(props) {
  var onPagination = props.onPagination,
      activePage = props.activePage,
      pages = props.pages,
      rowData = props.rowData,
      emptystate = props.emptystate,
      rest = ApiSearchTable_objectWithoutProperties(props, ["onPagination", "activePage", "pages", "rowData", "emptystate"]);

  var formData = hooks_useFormBuilder(searchForm(props));
  var provider = props.provider,
      withSearch = props.withSearch;
  return external_react_default.a.createElement(external_react_default.a.Fragment, null, withSearch && external_react_default.a.createElement(src_Form_Form, {
    form: formData,
    onNewValue: function onNewValue(values) {
      provider.onSearch(values.search);
    }
  }), external_react_default.a.createElement(Table_Table, ApiSearchTable_extends({
    emptystate: getEmptystate(provider, props),
    isLoading: provider.isLoading,
    onPagination: function onPagination(requestedPage) {
      provider.onPaginate(requestedPage);
    },
    activePage: provider.getActivePage(),
    pages: provider.getPageCount(),
    rowData: provider.getRowData() // sortDirection={sortDirection.asc}
    // activeSort=""

  }, rest)));
};

ApiSearchTable_ApiSearchTable.propTypes = ApiSearchTable_propTypes;
ApiSearchTable_ApiSearchTable.defaultProps = ApiSearchTable_defaultProps;
/* harmony default export */ var Table_ApiSearchTable = (ApiSearchTable_ApiSearchTable);
// CONCATENATED MODULE: ./src/Table/hooks/useTableProvider.js
function useTableProvider_slicedToArray(arr, i) { return useTableProvider_arrayWithHoles(arr) || useTableProvider_iterableToArrayLimit(arr, i) || useTableProvider_nonIterableRest(); }

function useTableProvider_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function useTableProvider_iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function useTableProvider_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }


var tableDefaults = {
  result: [],
  page: 1,
  total_pages: 0
};

var generateApiBody = function generateApiBody(_ref) {
  var search = _ref.search,
      page = _ref.page,
      pageSize = _ref.pageSize;
  return {
    search_string: search,
    filter: '',
    facets: [],
    order_by: [],
    search_fields: [],
    page_size: pageSize,
    page: page
  };
};

var useTableProvider_useTableProvider = function useTableProvider() {
  var updateAction = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};

  var _useState = Object(external_react_["useState"])(tableDefaults),
      _useState2 = useTableProvider_slicedToArray(_useState, 2),
      tableData = _useState2[0],
      setTableData = _useState2[1];

  var _useState3 = Object(external_react_["useState"])(10),
      _useState4 = useTableProvider_slicedToArray(_useState3, 2),
      pageSize = _useState4[0],
      _setPageSize = _useState4[1];

  var _useState5 = Object(external_react_["useState"])(true),
      _useState6 = useTableProvider_slicedToArray(_useState5, 2),
      isLoading = _useState6[0],
      setIsLoading = _useState6[1];

  var _useState7 = Object(external_react_["useState"])(''),
      _useState8 = useTableProvider_slicedToArray(_useState7, 2),
      search = _useState8[0],
      setSearch = _useState8[1];

  var _useState9 = Object(external_react_["useState"])(tableData.page),
      _useState10 = useTableProvider_slicedToArray(_useState9, 2),
      page = _useState10[0],
      setPage = _useState10[1];

  var _useState11 = Object(external_react_["useState"])(false),
      _useState12 = useTableProvider_slicedToArray(_useState11, 2),
      isMounted = _useState12[0],
      setIsMounted = _useState12[1];

  Object(external_react_["useEffect"])(function () {
    if (isMounted) {
      var payload = generateApiBody({
        page: page,
        search: search,
        pageSize: pageSize
      });
      setIsLoading(true);
      updateAction(payload);
    }
  }, [isMounted, page]);
  Object(external_react_["useEffect"])(function () {
    if (isMounted) {
      var payload = generateApiBody({
        page: 1,
        search: search,
        pageSize: pageSize
      });
      setPage(1);
      setIsLoading(true);
      updateAction(payload);
    }
  }, [search]);
  return {
    onPaginate: function onPaginate(pageNumber) {
      setPage(pageNumber);
    },
    onSearch: function onSearch(query) {
      setSearch(query);
    },
    setPageSize: function setPageSize(size) {
      return _setPageSize(size);
    },
    getActivePage: function getActivePage() {
      return tableData.page;
    },
    getPageCount: function getPageCount() {
      return tableData.total_pages;
    },
    getRowData: function getRowData() {
      return tableData.result;
    },
    setResponse: function setResponse(response) {
      setIsLoading(false);
      setTableData(response);
    },
    getQuery: function getQuery() {
      return search;
    },
    parentReady: function parentReady() {
      setIsMounted(true);
    },
    isLoading: isLoading,
    tableData: tableData
  };
};

/* harmony default export */ var hooks_useTableProvider = (useTableProvider_useTableProvider);
// CONCATENATED MODULE: ./src/Table/index.js





// EXTERNAL MODULE: external "react-router-dom"
var external_react_router_dom_ = __webpack_require__(4);

// CONCATENATED MODULE: ./src/Button/Button.styled.js
 // Kinda wacky thing to do, but whatever.

var defaultStyle = function defaultStyle() {
  return "\n    position: relative;\n    display: flex;\n    align-items: center;\n    justify-content: center;\n    white-space: nowrap;\n    transition: 0.2s;\n    text-align: center;\n    padding: 0.9rem 1.6rem;\n    border-radius: 5px;\n    border: 1px solid transparent;\n    white-space: normal;\n    font-weight: bold;\n    letter-spacing: 0.12rem;\n    text-transform: uppercase;\n    text-decoration: none;    \n    font-size: 1.4rem;\n\n    &:before {\n        position: absolute;\n        background: hsla(255, 0%, 100%, 0);\n        z-index: 2;\n        display: block;\n        content: '';\n        top: -1px;\n        right: -1px;\n        bottom: -1px;\n        left: -1px;\n        border-radius: 5px;\n        transition: 0.2s;\n      }\n\n    &:hover {\n        cursor: pointer;\n\n        &:before {\n            background: hsla(255, 0%, 100%, 0.05);\n        }\n    }\n\n    &.disabled {\n        cursor: not-allowed;\n        opacity: 0.5;\n    }\n";
};

var LoaderSpacer = external_styled_components_default.a.span.withConfig({
  displayName: "Buttonstyled__LoaderSpacer",
  componentId: "sc-13s4ocg-0"
})(["margin-left:.4rem;"]);
var Plain = external_styled_components_default.a.div.withConfig({
  displayName: "Buttonstyled__Plain",
  componentId: "sc-13s4ocg-1"
})(["cursor:pointer;display:inline-block;border:none;outline:none;margin:0;padding:0;color:", ";text-decoration:underline;"], function (_ref) {
  var theme = _ref.theme;
  return theme.black;
});
var Primary = external_styled_components_default.a.div.withConfig({
  displayName: "Buttonstyled__Primary",
  componentId: "sc-13s4ocg-2"
})(["", " background:", ";color:", ";&:active,&:visited{color:", ";}"], function (props) {
  return defaultStyle(props);
}, function (_ref2) {
  var theme = _ref2.theme;
  return theme.brandPrimaryColor;
}, function (props) {
  return props.theme.white;
}, function (props) {
  return props.theme.white;
});
var Secondary = external_styled_components_default.a.div.withConfig({
  displayName: "Buttonstyled__Secondary",
  componentId: "sc-13s4ocg-3"
})(["", " background:", ";color:", ";&:active,&:visited{color:", ";}"], function (props) {
  return defaultStyle(props);
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.brandSecondaryColor;
}, function (props) {
  return props.theme.white;
}, function (props) {
  return props.theme.white;
});
var Reject = external_styled_components_default.a.div.withConfig({
  displayName: "Buttonstyled__Reject",
  componentId: "sc-13s4ocg-4"
})(["", " background:", ";color:", ";&:active,&:visited{color:", ";}"], function (props) {
  return defaultStyle(props);
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.ruby800;
}, function (props) {
  return props.theme.white;
}, function (props) {
  return props.theme.white;
});
var Hollow = external_styled_components_default.a.div.withConfig({
  displayName: "Buttonstyled__Hollow",
  componentId: "sc-13s4ocg-5"
})(["", " color:", ";background:", ";border-color:", ";&:active,&:visited{color:", ";}"], function (props) {
  return defaultStyle(props);
}, function (props) {
  return props.theme.brandPrimaryColor;
}, function (_ref5) {
  var theme = _ref5.theme;
  return theme.white;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.brandPrimaryColor;
}, function (props) {
  return props.theme.brandPrimaryColor;
});
// CONCATENATED MODULE: ./src/Button/helper.js
var isExternalLink = function isExternalLink(link) {
  return (link || '').toString().match(/^(http(s)?:\/\/)/);
};
var isInteralLink = function isInteralLink(link) {
  return (link || '').toString().match(/^(\/)/);
};
var isValidMail = function isValidMail(link) {
  return (link || '').toString().match(/^(.+@.+\.[a-zAZ]+)$/);
};
// CONCATENATED MODULE: ./src/Button/withButtonStyle.js
function withButtonStyle_ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function withButtonStyle_objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { withButtonStyle_ownKeys(Object(source), true).forEach(function (key) { withButtonStyle_defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { withButtonStyle_ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function withButtonStyle_defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }








var withButtonStyle_propTyps = {
  icon: external_prop_types_default.a.element,
  link: external_prop_types_default.a.string,
  onClick: external_prop_types_default.a.func,
  disabled: external_prop_types_default.a.bool,
  loading: external_prop_types_default.a.bool,
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.element, external_prop_types_default.a.arrayOf(external_prop_types_default.a.element)]),
  mailto: external_prop_types_default.a.string,
  history: external_prop_types_default.a.instanceOf(Object).isRequired,
  theme: external_prop_types_default.a.instanceOf(Object).isRequired
};
var withButtonStyle_defaultProps = {
  icon: null,
  link: '',
  onClick: function onClick() {},
  disabled: false,
  loading: false,
  children: null,
  mailto: ''
};

var withButtonStyle_withButtonStyle = function withButtonStyle(_ref) {
  var Component = _ref.style,
      isHollow = _ref.isHollow;

  var ProxyButton = function ProxyButton(props) {
    var icon = props.icon,
        link = props.link,
        onClick = props.onClick,
        disabled = props.disabled,
        loading = props.loading,
        children = props.children,
        mailto = props.mailto,
        history = props.history,
        theme = props.theme;
    var isValidLink = link && (isExternalLink(link) || isInteralLink(link));
    var isValidMailto = mailto && isValidMail(mailto);

    var handleClick = function handleClick(event) {
      if (!disabled) {
        if (onClick) {
          onClick(event);
        }

        if (isValidLink && isInteralLink(link)) {
          event.preventDefault();
          history.push(link);
        }
      } else {
        event.preventDefault();
        event.stopPropagation();
      }
    };

    var attrs = {
      className: disabled ? 'disabled' : null,
      onClick: handleClick
    };
    var content = external_react_default.a.createElement(external_react_default.a.Fragment, null, icon, children, loading && external_react_default.a.createElement(LoaderSpacer, null, external_react_default.a.createElement(external_react_spinners_kit_["RingSpinner"], {
      color: isHollow ? theme.brandPrimaryColor : theme.white,
      size: 15
    }))); // If we pass a link/mailto, convert component to a-tag

    if (isValidLink || isValidMailto) {
      var Link = Component.withComponent('a');

      var upddatedAttrs = withButtonStyle_objectSpread({}, attrs);

      if (isValidLink) {
        Object.assign(upddatedAttrs, {
          href: link
        });
      } else if (isValidMailto) {
        Object.assign(upddatedAttrs, {
          href: "mailto:".concat(mailto)
        });
      }

      if (isExternalLink(link)) {
        Object.assign(upddatedAttrs, {
          target: '_blank',
          rel: 'noopener noreferrer'
        });
      }

      return external_react_default.a.createElement(Link, upddatedAttrs, content);
    }

    return external_react_default.a.createElement(Component, attrs, content);
  };

  ProxyButton.defaultProps = withButtonStyle_defaultProps;
  ProxyButton.propTypes = withButtonStyle_propTyps;
  return Object(external_styled_components_["withTheme"])(Object(external_react_router_dom_["withRouter"])(ProxyButton));
};

/* harmony default export */ var Button_withButtonStyle = (withButtonStyle_withButtonStyle);
// CONCATENATED MODULE: ./src/Button/index.js


var Button_Primary = Button_withButtonStyle({
  style: Primary
});
var Button_Secondary = Button_withButtonStyle({
  style: Secondary
});
var Button_Hollow = Button_withButtonStyle({
  style: Hollow,
  isHollow: true
});
var Button_Plain = Button_withButtonStyle({
  style: Plain
});
var Button_Reject = Button_withButtonStyle({
  style: Reject
});

// CONCATENATED MODULE: ./src/Block/Block.styled.js

var base = external_styled_components_default.a.div.withConfig({
  displayName: "Blockstyled__base",
  componentId: "sc-1jvvl7w-0"
})(["width:100%;display:flex;flex-direction:column;margin:", ";padding:", ";background:", ";color:", ";"], function (_ref) {
  var withMargins = _ref.withMargins;
  return withMargins ? '1.6rem' : 0;
}, function (_ref2) {
  var withPadding = _ref2.withPadding;
  return withPadding ? '1.6rem' : 0;
}, function (_ref3) {
  var theme = _ref3.theme;
  return theme.white;
}, function (_ref4) {
  var theme = _ref4.theme;
  return theme.black;
});
var Left = external_styled_components_default()(base).withConfig({
  displayName: "Blockstyled__Left",
  componentId: "sc-1jvvl7w-1"
})(["align-items:flex-start;"]);
var Center = external_styled_components_default()(base).withConfig({
  displayName: "Blockstyled__Center",
  componentId: "sc-1jvvl7w-2"
})(["align-items:center;"]);
var Right = external_styled_components_default()(base).withConfig({
  displayName: "Blockstyled__Right",
  componentId: "sc-1jvvl7w-3"
})(["align-items:flex-end;"]);
var Block_styled_Plain = external_styled_components_default()(base).withConfig({
  displayName: "Blockstyled__Plain",
  componentId: "sc-1jvvl7w-4"
})(["align-items:flex-start;"]);
var Bordered = external_styled_components_default()(base).withConfig({
  displayName: "Blockstyled__Bordered",
  componentId: "sc-1jvvl7w-5"
})(["background:", ";filter:drop-shadow(0 1px 6px ", ");border-radius:5px;"], function (_ref5) {
  var theme = _ref5.theme;
  return theme.white;
}, function (_ref6) {
  var theme = _ref6.theme;
  return theme.rgba(theme.black, 0.2);
});
var SpaceBetween = external_styled_components_default()(base).withConfig({
  displayName: "Blockstyled__SpaceBetween",
  componentId: "sc-1jvvl7w-6"
})(["justify-content:space-between;flex-direction:row;align-items:unset;"]);
var Wrap = external_styled_components_default()(base).withConfig({
  displayName: "Blockstyled__Wrap",
  componentId: "sc-1jvvl7w-7"
})(["    flex-wrap:wrap;flex-direction:unset;"]);
var Block_styled_Emptystate = external_styled_components_default()(base).withConfig({
  displayName: "Blockstyled__Emptystate",
  componentId: "sc-1jvvl7w-8"
})(["justify-content:center;align-items:center;flex-direction:column;"]);
// CONCATENATED MODULE: ./src/icons/IconNoTickets.js
function IconNoTickets_extends() { IconNoTickets_extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return IconNoTickets_extends.apply(this, arguments); }



var IconNoTickets_NoTicketsImage = function NoTicketsImage(props) {
  return external_react_default.a.createElement("svg", IconNoTickets_extends({
    viewBox: "0 0 2000 2000",
    height: props.height,
    width: props.width,
    version: 1
  }, props, {
    xmlns: "http://www.w3.org/2000/svg"
  }), external_react_default.a.createElement("path", {
    fill: "#fff",
    d: "M0 0H2000V2000H0z",
    "data-name": "Layer 2"
  }), external_react_default.a.createElement("circle", {
    cx: "982.06",
    cy: "1035.22",
    r: "696.67",
    fill: "#f9f3e6"
  }), external_react_default.a.createElement("circle", {
    cx: "982.06",
    cy: "1035.22",
    r: "589.44",
    fill: "#efe0bd"
  }), external_react_default.a.createElement("circle", {
    cx: "982.06",
    cy: "1035.22",
    r: "485.55",
    fill: "#e1c687"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M691.2 469.17a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.14a9 9 0 019-9.01z"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M653.12 507.25a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.14a9 9 0 01-9.01-9z"
  }), external_react_default.a.createElement("path", {
    fill: "#fff",
    d: "M646.66 949.17a5.57 5.57 0 015.57 5.57v36a5.57 5.57 0 01-5.57 5.57 5.57 5.57 0 01-5.57-5.57v-36a5.57 5.57 0 015.57-5.57z"
  }), external_react_default.a.createElement("path", {
    fill: "#fff",
    d: "M623.12 972.72a5.57 5.57 0 015.57-5.57h35.95a5.57 5.57 0 015.57 5.57 5.57 5.57 0 01-5.57 5.57h-35.95a5.57 5.57 0 01-5.57-5.57zM641.09 684.91a5.57 5.57 0 015.57 5.57v35.95a5.57 5.57 0 01-5.57 5.57 5.57 5.57 0 01-5.57-5.57v-35.95a5.57 5.57 0 015.57-5.57z"
  }), external_react_default.a.createElement("path", {
    fill: "#fff",
    d: "M617.55 708.46a5.57 5.57 0 015.57-5.57h36a5.57 5.57 0 015.57 5.57 5.57 5.57 0 01-5.57 5.57h-36a5.57 5.57 0 01-5.57-5.57z"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M1384.08 407.7a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.14a9 9 0 019-9.01z"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M1346 445.79a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9H1355a9 9 0 01-9-9z"
  }), external_react_default.a.createElement("path", {
    fill: "#fff",
    d: "M476.36 1135.87a9 9 0 019 9V1203a9 9 0 01-9 9 9 9 0 01-9-9v-58.15a9 9 0 019-8.98z"
  }), external_react_default.a.createElement("path", {
    fill: "#fff",
    d: "M438.27 1174a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.14a9 9 0 01-9.01-9z"
  }), external_react_default.a.createElement("path", {
    fill: "#e8d3a2",
    d: "M1853.84 898.55a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.14a9 9 0 019-9.01z"
  }), external_react_default.a.createElement("path", {
    fill: "#e8d3a2",
    d: "M1815.76 936.63a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.15a9 9 0 01-9-9z"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M1505.69 1167.22a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.15a9 9 0 019-9z"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M1467.61 1205.3a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.15a9 9 0 01-9-9z"
  }), external_react_default.a.createElement("circle", {
    cx: "1549.11",
    cy: "1242.24",
    r: "10.79",
    fill: "#cd9f35"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M252.29 980.34a9 9 0 019 9v58.15a9 9 0 01-9 9 9 9 0 01-9-9v-58.14a9 9 0 019-9.01z"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M214.21 1018.42a9 9 0 019-9h58.15a9 9 0 019 9 9 9 0 01-9 9h-58.14a9 9 0 01-9.01-9z"
  }), external_react_default.a.createElement("circle", {
    cx: "295.71",
    cy: "1055.36",
    r: "10.79",
    fill: "#cd9f35"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M1533.81 743.88a5 5 0 015 5v32.58a5 5 0 01-5 5 5 5 0 01-5-5v-32.53a5 5 0 015-5.05z"
  }), external_react_default.a.createElement("path", {
    fill: "#cd9f35",
    d: "M1512.46 765.21a5 5 0 015-5.05h32.58a5 5 0 015.05 5.05 5 5 0 01-5.05 5h-32.58a5 5 0 01-5-5z"
  }), external_react_default.a.createElement("circle", {
    cx: "1558.13",
    cy: "785.92",
    r: "6.05",
    fill: "#cd9f35"
  }), external_react_default.a.createElement("path", {
    fill: "#fff",
    d: "M1238.23 649.77a5.16 5.16 0 015.17 5.17v33.34a5.16 5.16 0 01-5.17 5.17 5.16 5.16 0 01-5.17-5.17v-33.34a5.16 5.16 0 015.17-5.17z"
  }), external_react_default.a.createElement("path", {
    fill: "#fff",
    d: "M1216.38 671.61a5.16 5.16 0 015.17-5.16h33.34a5.16 5.16 0 015.17 5.16 5.16 5.16 0 01-5.17 5.17h-33.34a5.16 5.16 0 01-5.17-5.17z"
  }), external_react_default.a.createElement("circle", {
    cx: "1263.13",
    cy: "692.8",
    r: "6.19",
    fill: "#fff"
  }), external_react_default.a.createElement("rect", {
    width: "473.6",
    height: "368.55",
    x: "587.55",
    y: "957.62",
    fill: "#cd9f35",
    stroke: "#000",
    strokeMiterlimit: "10",
    strokeWidth: "19.84",
    rx: "50"
  }), external_react_default.a.createElement("rect", {
    width: "473.6",
    height: "368.55",
    x: "894.35",
    y: "734.89",
    fill: "#cd9f35",
    stroke: "#000",
    strokeMiterlimit: "10",
    strokeWidth: "19.84",
    rx: "50"
  }), external_react_default.a.createElement("circle", {
    cx: "849.34",
    cy: "1540.26",
    r: "40.81",
    fill: "none",
    stroke: "#cd9f35",
    strokeMiterlimit: "10",
    strokeWidth: "19.84"
  }), external_react_default.a.createElement("circle", {
    cx: "1197.41",
    cy: "1366.99",
    r: "40.81",
    fill: "none",
    stroke: "#f9f3e6",
    strokeMiterlimit: "10",
    strokeWidth: "14.17"
  }), external_react_default.a.createElement("circle", {
    cx: "1156.6",
    cy: "288.23",
    r: "40.81",
    fill: "none",
    stroke: "#cd9f35",
    strokeMiterlimit: "10",
    strokeWidth: "19.84"
  }), external_react_default.a.createElement("circle", {
    cx: "883.27",
    cy: "538.59",
    r: "29.74",
    fill: "none",
    stroke: "#cd9f35",
    strokeMiterlimit: "10",
    strokeWidth: "19.84"
  }), external_react_default.a.createElement("circle", {
    cx: "392.62",
    cy: "655.18",
    r: "29.74",
    fill: "none",
    stroke: "#e8d3a2",
    strokeMiterlimit: "10",
    strokeWidth: "14.17"
  }), external_react_default.a.createElement("circle", {
    cx: "1533.8",
    cy: "1679.61",
    r: "29.74",
    fill: "none",
    stroke: "#cd9f35",
    strokeMiterlimit: "10",
    strokeWidth: "19.84"
  }), external_react_default.a.createElement("path", {
    d: "M1132.46 966.49h1a14.11 14.11 0 0114.11 14.11 14.11 14.11 0 01-14.11 14.11h-1a14.11 14.11 0 01-14.11-14.11 14.11 14.11 0 0114.11-14.11zM1167.13 849.85q-14.6-10.54-36.67-10.55-16.79 0-28.32 7.43-17.72 11.26-19.33 37.82a14.86 14.86 0 00-.1 1.63 14.11 14.11 0 0014.11 14.11h.11c7.78-.06 13.91-6.66 14-14.44a29 29 0 014.73-15.3q4.72-7.51 16-7.52 11.5 0 15.84 6.11a22.86 22.86 0 014.33 13.52 19.73 19.73 0 01-3.89 11.82 25.11 25.11 0 01-5.65 5.76l-7.11 5.57q-10.52 8.21-13 14.5t-3.18 22.77a13.2 13.2 0 0026.4 0q.11-7.79 1.27-11.49a21 21 0 017.5-10.25l6.91-5.38q10.53-8.19 14.22-13.47 6.33-8.7 6.33-21.39.11-20.7-14.5-31.25zM824.86 1187.08h1a14.11 14.11 0 0114.14 14.11 14.11 14.11 0 01-14.11 14.11h-1a14.11 14.11 0 01-14.11-14.11 14.11 14.11 0 0114.08-14.11zM825.35 1056.56a15.29 15.29 0 00-15.28 15.29v36.48l8.1 67.13h14.55l7.91-67.13v-36.48a15.29 15.29 0 00-15.28-15.29z"
  }));
};

/* harmony default export */ var IconNoTickets = (IconNoTickets_NoTicketsImage);
// CONCATENATED MODULE: ./src/Block/BlockEmptyState.js




var BlockEmptyState_propTyps = {
  title: external_prop_types_default.a.string.isRequired,
  description: external_prop_types_default.a.string.isRequired
};

var BlockEmptyState_Emptystate = function Emptystate(_ref) {
  var title = _ref.title,
      description = _ref.description;
  return external_react_default.a.createElement(Block_styled_Emptystate, null, external_react_default.a.createElement(IconNoTickets, {
    width: "21.2rem",
    height: "21.2rem"
  }), external_react_default.a.createElement("h4", null, title), external_react_default.a.createElement("p", null, description));
};

BlockEmptyState_Emptystate.propTypes = BlockEmptyState_propTyps;
/* harmony default export */ var BlockEmptyState = (BlockEmptyState_Emptystate);
// CONCATENATED MODULE: ./src/Block/index.js



// CONCATENATED MODULE: ./src/Modal/Modal.styled.js

var Modal_styled_Modal = external_styled_components_default.a.div.withConfig({
  displayName: "Modalstyled__Modal",
  componentId: "g56u6t-0"
})(["width:50%;height:auto;min-height:200px;max-height:80vh;padding:3.2rem 0;border-radius:5px;position:relative;overflow:hidden;background:", ";display:flex;flex-direction:column;"], function (_ref) {
  var theme = _ref.theme;
  return theme.white;
});
var ModalTitle = external_styled_components_default.a.h2.withConfig({
  displayName: "Modalstyled__ModalTitle",
  componentId: "g56u6t-1"
})(["width:auto;max-width:100%;overflow:hidden;height:5.2rem;font-size:2.8rem;line-height:2.8rem;margin:0 3.2rem;margin-bottom:1.6rem;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;"]);
var Modal_styled_Content = external_styled_components_default.a.div.withConfig({
  displayName: "Modalstyled__Content",
  componentId: "g56u6t-2"
})(["flex:1;display:flex;flex-direction:column;overflow-y:auto;padding:0 3.2rem;"]);
var Close = external_styled_components_default.a.div.withConfig({
  displayName: "Modalstyled__Close",
  componentId: "g56u6t-3"
})(["width:40px;height:40px;padding:.4em;position:absolute;display:flex;right:.4rem;top:.4rem;justify-content:center;align-items:center;cursor:pointer;i{font-size:2rem;}"]);
var Overlay = external_styled_components_default.a.div.withConfig({
  displayName: "Modalstyled__Overlay",
  componentId: "g56u6t-4"
})(["top:0;left:0;z-index:999;position:fixed;height:-webkit-fill-available-;background:rgba(0,0,0,0.3);overflow:hidden;height:100vh;width:100vw;display:flex;justify-content:center;align-items:center;"]);
// CONCATENATED MODULE: ./src/Modal/helpers.js
var fixateBodyScroll = function fixateBodyScroll(windowRef) {
  if (windowRef) {
    var _window = window,
        _document = _window.document;
    var body = _document.body;
    var scrollY = (window.pageYOffset || _document.scrollTop) - (_document.clientTop || 0);
    body.style.position = 'fixed';
    body.style.top = "-".concat(scrollY, "px");
  }
};
var releaseBodyScroll = function releaseBodyScroll(windowRef) {
  if (windowRef) {
    var _window2 = window,
        _document2 = _window2.document;
    var body = _document2.body;
    var scrollY = body.style.top;
    body.style.position = '';
    body.style.top = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  }
};
var helpers_modalRoot = document.getElementById('modal-root');
// CONCATENATED MODULE: ./src/Modal/Modal.js
function Modal_typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { Modal_typeof = function _typeof(obj) { return typeof obj; }; } else { Modal_typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return Modal_typeof(obj); }

function Modal_classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function Modal_defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function Modal_createClass(Constructor, protoProps, staticProps) { if (protoProps) Modal_defineProperties(Constructor.prototype, protoProps); if (staticProps) Modal_defineProperties(Constructor, staticProps); return Constructor; }

function Modal_possibleConstructorReturn(self, call) { if (call && (Modal_typeof(call) === "object" || typeof call === "function")) { return call; } return Modal_assertThisInitialized(self); }

function Modal_assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function Modal_getPrototypeOf(o) { Modal_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return Modal_getPrototypeOf(o); }

function Modal_inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) Modal_setPrototypeOf(subClass, superClass); }

function Modal_setPrototypeOf(o, p) { Modal_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return Modal_setPrototypeOf(o, p); }






var Modal_propTypes = {
  title: external_prop_types_default.a.string,
  onClose: external_prop_types_default.a.func,
  withoutHeader: external_prop_types_default.a.bool,
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.element, external_prop_types_default.a.arrayOf(external_prop_types_default.a.element)])
};
var Modal_defaultProps = {
  title: '',
  withoutHeader: false,
  onClose: function onClose() {},
  children: null
};

var Modal_Modal =
/*#__PURE__*/
function (_Component) {
  Modal_inherits(Modal, _Component);

  function Modal() {
    Modal_classCallCheck(this, Modal);

    return Modal_possibleConstructorReturn(this, Modal_getPrototypeOf(Modal).apply(this, arguments));
  }

  Modal_createClass(Modal, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      fixateBodyScroll(window);
    }
  }, {
    key: "componentWillUnmount",
    value: function componentWillUnmount() {
      releaseBodyScroll(window);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props = this.props,
          children = _this$props.children,
          title = _this$props.title,
          onClose = _this$props.onClose,
          withoutHeader = _this$props.withoutHeader;
      return external_react_dom_default.a.createPortal(external_react_default.a.createElement(Overlay, null, external_react_default.a.createElement(Modal_styled_Modal, null, !withoutHeader && external_react_default.a.createElement(Close, {
        onClick: onClose
      }, external_react_default.a.createElement("i", {
        className: "fa fa-times",
        "aria-hidden": "true"
      })), external_react_default.a.createElement(ModalTitle, null, title), external_react_default.a.createElement(Modal_styled_Content, null, children))), helpers_modalRoot);
    }
  }]);

  return Modal;
}(external_react_["Component"]);

Modal_Modal.propTypes = Modal_propTypes;
Modal_Modal.defaultProps = Modal_defaultProps;
Modal_Modal.displayName = '@asurgent.ui.Modal';
/* harmony default export */ var src_Modal_Modal = (Modal_Modal);
// CONCATENATED MODULE: ./src/Modal/index.js

// CONCATENATED MODULE: ./src/Switch/Switch.styled.js

var SwitchWrapper = external_styled_components_default.a.div.withConfig({
  displayName: "Switchstyled__SwitchWrapper",
  componentId: "krc608-0"
})(["cursor:pointer;display:flex;position:relative;width:", "rem;height:", "rem;border-radius:", "rem;padding:", "rem;background-color:", ";animation-duration:.25s;box-sizing:content-box;animation-name:", ";@keyframes toggleOn{from{background-color:", ";}to{background-color:", ";}}@keyframes toggleOff{from{background-color:", ";}to{background-color:", ";}}"], function (_ref) {
  var size = _ref.size,
      borderSize = _ref.borderSize;
  return size - borderSize;
}, function (_ref2) {
  var size = _ref2.size,
      borderSize = _ref2.borderSize;
  return size / 2 - borderSize;
}, function (_ref3) {
  var size = _ref3.size;
  return size / 2;
}, function (_ref4) {
  var borderSize = _ref4.borderSize;
  return borderSize;
}, function (_ref5) {
  var value = _ref5.value,
      theme = _ref5.theme;
  return value ? theme.blue900 : theme.blue100;
}, function (_ref6) {
  var value = _ref6.value;
  return value ? 'toggleOn' : 'toggleOff';
}, function (_ref7) {
  var theme = _ref7.theme;
  return theme.blue100;
}, function (_ref8) {
  var theme = _ref8.theme;
  return theme.blue900;
}, function (_ref9) {
  var theme = _ref9.theme;
  return theme.blue900;
}, function (_ref10) {
  var theme = _ref10.theme;
  return theme.blue100;
});
var Toggle = external_styled_components_default.a.div.withConfig({
  displayName: "Switchstyled__Toggle",
  componentId: "krc608-1"
})(["position:absolute;height:", ";width:", ";background-color:", ";border-radius:100%;transform:", ";transition:transform .25s;"], function (_ref11) {
  var borderSize = _ref11.borderSize;
  return "calc(100% - ".concat(borderSize * 2, "rem)");
}, function (_ref12) {
  var borderSize = _ref12.borderSize;
  return "calc(50% - ".concat(borderSize, "rem)");
}, function (_ref13) {
  var theme = _ref13.theme;
  return theme.white;
}, function (_ref14) {
  var value = _ref14.value;
  return value ? 'translateX(100%)' : 'translateX(0)';
});
var Switch_styled_Label = external_styled_components_default.a.span.withConfig({
  displayName: "Switchstyled__Label",
  componentId: "krc608-2"
})(["font-size:1.2rem;margin-bottom:.4rem;"]);
// CONCATENATED MODULE: ./src/Switch/Switch.js
function Switch_slicedToArray(arr, i) { return Switch_arrayWithHoles(arr) || Switch_iterableToArrayLimit(arr, i) || Switch_nonIterableRest(); }

function Switch_nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function Switch_iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function Switch_arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }




var defaultSize = 4.8;
var borderSize = 0.2;
var Switch_propTypes = {
  value: external_prop_types_default.a.bool,
  onToggle: external_prop_types_default.a.func,
  tooltipRef: external_prop_types_default.a.oneOfType([external_prop_types_default.a.func, external_prop_types_default.a.shape({
    current: external_prop_types_default.a.instanceOf(Element)
  })]),
  children: external_prop_types_default.a.oneOfType([external_prop_types_default.a.element, external_prop_types_default.a.arrayOf(external_prop_types_default.a.element)])
};
var Switch_defaultProps = {
  value: false,
  tooltipRef: function tooltipRef() {},
  onToggle: function onToggle() {},
  children: null
};

var Switch_Switch = function Switch(_ref) {
  var value = _ref.value,
      onToggle = _ref.onToggle,
      children = _ref.children,
      tooltipRef = _ref.tooltipRef;

  var _useState = Object(external_react_["useState"])(false),
      _useState2 = Switch_slicedToArray(_useState, 2),
      internatlValue = _useState2[0],
      setInternatlValue = _useState2[1];

  Object(external_react_["useEffect"])(function () {
    setInternatlValue(value);
  }, [value]);

  var onClick = function onClick() {
    if (onToggle && typeof onToggle === 'function') {
      onToggle(!internatlValue);
    }

    setInternatlValue(!internatlValue);
  };

  var renderChildren = function renderChildren() {
    if (typeof children === 'function') {
      return children(internatlValue);
    }

    return children;
  };

  return external_react_default.a.createElement(external_react_default.a.Fragment, null, children && external_react_default.a.createElement(Switch_styled_Label, null, renderChildren()), external_react_default.a.createElement(SwitchWrapper, {
    ref: tooltipRef,
    onClick: onClick,
    value: internatlValue,
    size: defaultSize,
    borderSize: borderSize
  }, external_react_default.a.createElement(Toggle, {
    value: internatlValue,
    borderSize: borderSize
  })));
};

Switch_Switch.propTypes = Switch_propTypes;
Switch_Switch.defaultProps = Switch_defaultProps;
Switch_Switch.displayName = '@asurgent.ui.Switch';
/* harmony default export */ var src_Switch_Switch = (Switch_Switch);
// CONCATENATED MODULE: ./src/Switch/index.js

// CONCATENATED MODULE: ./src/index.js
/* concated harmony reexport Button */__webpack_require__.d(__webpack_exports__, "Button", function() { return Button_namespaceObject; });
/* concated harmony reexport Block */__webpack_require__.d(__webpack_exports__, "Block", function() { return Block_namespaceObject; });
/* concated harmony reexport Form */__webpack_require__.d(__webpack_exports__, "Form", function() { return src_Form_namespaceObject; });
/* concated harmony reexport Modal */__webpack_require__.d(__webpack_exports__, "Modal", function() { return src_Modal_namespaceObject; });
/* concated harmony reexport Switch */__webpack_require__.d(__webpack_exports__, "Switch", function() { return src_Switch_namespaceObject; });
/* concated harmony reexport Tooltip */__webpack_require__.d(__webpack_exports__, "Tooltip", function() { return src_Tooltip; });
/* concated harmony reexport Table */__webpack_require__.d(__webpack_exports__, "Table", function() { return src_Table_namespaceObject; });









/***/ })
/******/ ])));