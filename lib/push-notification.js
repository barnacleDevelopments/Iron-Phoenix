"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeFirebase = void 0;

var _firebase = _interopRequireDefault(require("firebase"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var initializeFirebase = function initializeFirebase() {
  _firebase["default"].initializeApp({
    messagingSenderId: "your messagingSenderId"
  });
};

exports.initializeFirebase = initializeFirebase;