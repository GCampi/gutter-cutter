var that = this;
function __skpm_run (key, context) {
  that.context = context;

var exports =
/******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/guttercutter.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/guttercutter.js":
/*!*****************************!*\
  !*** ./src/guttercutter.js ***!
  \*****************************/
/*! exports provided: createVerticalGuides, createHorizontalGuides, removeAllGuides */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createVerticalGuides", function() { return createVerticalGuides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "createHorizontalGuides", function() { return createHorizontalGuides; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeAllGuides", function() { return removeAllGuides; });
var sketch = __webpack_require__(/*! sketch/dom */ "sketch/dom");

var async = __webpack_require__(/*! sketch/async */ "sketch/async");

var DataSupplier = __webpack_require__(/*! sketch/data-supplier */ "sketch/data-supplier");

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var Document = __webpack_require__(/*! sketch/dom */ "sketch/dom").Document;

var Page = __webpack_require__(/*! sketch/dom */ "sketch/dom").Page;

var api = __webpack_require__(/*! sketch */ "sketch");

var Rectangle = __webpack_require__(/*! sketch/dom */ "sketch/dom").Rectangle;

function createVerticalGuides(context) {
  superMainFunc(context, "vertical");
}
function createHorizontalGuides(context) {
  superMainFunc(context, "horizontal");
}
function removeAllGuides(context) {
  superMainFunc(context, "remove");
}
var innerGutter = 0;
var outerGutter = 0;
var numberOfColumns = 0;
var numberOfRows = 0;
var document = undefined;
var selection = undefined;
var layer = undefined;

function superMainFunc(context, whatWeDo) {
  document = Document.getSelectedDocument();

  if (document === undefined) {
    UI.message("Document is undefined");
    return;
  }

  selection = document.selectedLayers;

  if (selection === undefined || selection.isEmpty) {
    UI.message("You must select a layer");
    return;
  }

  if (selection.length > 1) {
    UI.message("You must select one layer only");
    return;
  }

  layer = selection.layers[0];
  /* Using the Context */

  var doc = context.document;
  var current_wrapper = doc.currentPage().currentArtboard() || doc.currentPage();
  var vertical_guides = current_wrapper.horizontalRulerData();
  var horizontal_guides = current_wrapper.verticalRulerData();
  /*  */

  if (whatWeDo == "vertical") {
    createVerticalGuides();
  } else if (whatWeDo == "horizontal") {
    createHorizontalGuides();
  } else if (whatWeDo == "remove") {
    removeAllGuides();
  }

  function getGutterValues(n) {
    if (n > 1) {
      var _innerGutter = Number(UI.getStringFromUser("Enter the desired inner gutter", 0));

      if (Number.isNaN(_innerGutter)) {
        UI.message("This is not a valid value!");
        return;
      }

      innerGutter = parseInt(_innerGutter);
    }

    var _outerGutter = Number(UI.getStringFromUser("Enter the desired outer gutter", 0));

    if (Number.isNaN(_outerGutter)) {
      UI.message("This is not a valid value!");
      return;
    }

    outerGutter = parseInt(_outerGutter);
  }

  function createVerticalGuides() {
    // Get the number of columns
    var _numberOfColumns = Number(UI.getStringFromUser("Enter the number of columns", 1));

    if (Number.isNaN(_numberOfColumns) || parseInt(_numberOfColumns) === 0) {
      UI.message("This is not a valid value!");
      return;
    }

    numberOfColumns = parseInt(_numberOfColumns); // get the gutter values

    getGutterValues(numberOfColumns); // create the rect to split

    var rect = new Rectangle(layer.frame);
    var innerRect = new Rectangle(rect.x + outerGutter, rect.y, rect.width - outerGutter * 2, rect.height); // add guides at the beginning and at the end of the object

    vertical_guides.addGuideWithValue(rect.x);
    vertical_guides.addGuideWithValue(rect.x + rect.width); // add outer gutter

    if (outerGutter > 0) {
      vertical_guides.addGuideWithValue(innerRect.x);
      vertical_guides.addGuideWithValue(innerRect.x + innerRect.width);
    } // add internal guides


    if (numberOfColumns > 1) {
      var gutterSum = innerGutter * (numberOfColumns - 1);
      var columnSize = (innerRect.width - gutterSum) / numberOfColumns;
      var sliceSize = columnSize + innerGutter;

      for (var i = 1; i < numberOfColumns; i++) {
        vertical_guides.addGuideWithValue(innerRect.x + sliceSize * (i - 1) + columnSize);

        if (innerGutter > 0) {
          vertical_guides.addGuideWithValue(innerRect.x + sliceSize * (i - 1) + sliceSize);
        }
      }
    }
  }

  function createHorizontalGuides() {
    // Get the number of rows
    var _numberOfRows = Number(UI.getStringFromUser("Enter the number of rows", 1));

    if (Number.isNaN(_numberOfRows) || parseInt(_numberOfRows) === 0) {
      UI.message("This is not a valid value!");
      return;
    }

    numberOfRows = parseInt(_numberOfRows); // get the gutter values

    getGutterValues(numberOfRows); // create the rect to split

    var rect = new Rectangle(layer.frame);
    var innerRect = new Rectangle(rect.x, rect.y + outerGutter, rect.width, rect.height - outerGutter * 2); // add guides at the beginning and at the end of the object

    horizontal_guides.addGuideWithValue(rect.y);
    horizontal_guides.addGuideWithValue(rect.y + rect.height); // add outer gutter

    if (outerGutter > 0) {
      horizontal_guides.addGuideWithValue(innerRect.y);
      horizontal_guides.addGuideWithValue(innerRect.y + innerRect.height);
    } // add internal guides


    if (numberOfRows > 1) {
      var gutterSum = innerGutter * (numberOfRows - 1);
      var rowSize = (innerRect.height - gutterSum) / numberOfRows;
      var sliceSize = rowSize + innerGutter;

      for (var i = 1; i < numberOfRows; i++) {
        horizontal_guides.addGuideWithValue(innerRect.y + sliceSize * (i - 1) + rowSize);

        if (innerGutter > 0) {
          horizontal_guides.addGuideWithValue(innerRect.y + sliceSize * (i - 1) + sliceSize);
        }
      }
    }
  }

  function removeAllGuides() {
    // @todo Remove only the guides are inside the selected layer
    var countVertical = vertical_guides.numberOfGuides();
    var countHorizontal = horizontal_guides.numberOfGuides();
    var guidesTotal = countVertical + countHorizontal;
    var verticalGuidesToAdd = Array();
    var horizontalGuidesToAdd = Array();

    for (var i = 0; i < countVertical; i++) {
      var guideX = vertical_guides.guideAtIndex(i);

      if (guideX < layer.frame.x || guideX > layer.frame.x + layer.frame.width) {
        // the guide is outside my box I will add it later
        verticalGuidesToAdd.push(guideX);
      }
    }

    for (var i = 0; i < countHorizontal; i++) {
      var guideY = horizontal_guides.guideAtIndex(i);

      if (guideY < layer.frame.y || guideY > layer.frame.y + layer.frame.height) {
        // the guide is outside my box I will add it later
        horizontalGuidesToAdd.push(guideY);
      }
    } // remove all the guides


    while (countVertical > 0) {
      vertical_guides.removeGuideAtIndex(0);
      countVertical = vertical_guides.numberOfGuides();
    }

    while (countHorizontal > 0) {
      horizontal_guides.removeGuideAtIndex(0);
      countHorizontal = horizontal_guides.numberOfGuides();
    } // re-add the outer guides


    for (var i = 0; i < verticalGuidesToAdd.length; i++) {
      vertical_guides.addGuideWithValue(verticalGuidesToAdd[i]);
    }

    for (var i = 0; i < horizontalGuidesToAdd.length; i++) {
      horizontal_guides.addGuideWithValue(horizontalGuidesToAdd[i]);
    }
  }
}

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/async":
/*!*******************************!*\
  !*** external "sketch/async" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/async");

/***/ }),

/***/ "sketch/data-supplier":
/*!***************************************!*\
  !*** external "sketch/data-supplier" ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/data-supplier");

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

/***/ })

/******/ });
  if (key === 'default' && typeof exports === 'function') {
    exports(context);
  } else {
    exports[key](context);
  }
}
that['createVerticalGuides'] = __skpm_run.bind(this, 'createVerticalGuides');
that['onRun'] = __skpm_run.bind(this, 'default');
that['createHorizontalGuides'] = __skpm_run.bind(this, 'createHorizontalGuides');
that['removeAllGuides'] = __skpm_run.bind(this, 'removeAllGuides')

//# sourceMappingURL=guttercutter.js.map