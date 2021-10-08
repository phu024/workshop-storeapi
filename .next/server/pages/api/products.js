"use strict";
(() => {
var exports = {};
exports.id = "pages/api/products";
exports.ids = ["pages/api/products"];
exports.modules = {

/***/ "./lib/db.js":
/*!*******************!*\
  !*** ./lib/db.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "db": () => (/* binding */ db),
/* harmony export */   "query": () => (/* binding */ query)
/* harmony export */ });
/* harmony import */ var serverless_mysql__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! serverless-mysql */ "serverless-mysql");
/* harmony import */ var serverless_mysql__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(serverless_mysql__WEBPACK_IMPORTED_MODULE_0__);

const db = serverless_mysql__WEBPACK_IMPORTED_MODULE_0___default()({
  config: {
    host: "localhost",
    database: "storeapi",
    user: "root",
    password: "",
    port: 3306
  }
});
async function query(query, parma) {
  try {
    const results = await db.query(query, parma);
    await db.end();
    return {
      status: {
        code: 200,
        message: 'OK'
      },
      data: results
    };
  } catch (e) {
    console.log(e);
    return {
      status: {
        code: 400,
        message: 'Bad Request'
      }
    };
  }
}

/***/ }),

/***/ "./pages/api/products/index.js":
/*!*************************************!*\
  !*** ./pages/api/products/index.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/db */ "./lib/db.js");

async function handler(req, res) {
  if (req.method == "GET") {
    const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("SELECT * FROM product");
    res.status(results.status.code).json(results);
  }
}

/***/ }),

/***/ "serverless-mysql":
/*!***********************************!*\
  !*** external "serverless-mysql" ***!
  \***********************************/
/***/ ((module) => {

module.exports = require("serverless-mysql");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/products/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZXMvYXBpL3Byb2R1Y3RzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFFTyxNQUFNQyxFQUFFLEdBQUdELHVEQUFLLENBQUM7QUFDcEJFLEVBQUFBLE1BQU0sRUFBRTtBQUNKQyxJQUFBQSxJQUFJLEVBQUUsV0FERjtBQUVKQyxJQUFBQSxRQUFRLEVBQUUsVUFGTjtBQUdKQyxJQUFBQSxJQUFJLEVBQUUsTUFIRjtBQUlKQyxJQUFBQSxRQUFRLEVBQUUsRUFKTjtBQUtKQyxJQUFBQSxJQUFJLEVBQUU7QUFMRjtBQURZLENBQUQsQ0FBaEI7QUFVQSxlQUFlQyxLQUFmLENBQXFCQSxLQUFyQixFQUE0QkMsS0FBNUIsRUFBbUM7QUFDdEMsTUFBSTtBQUNBLFVBQU1DLE9BQU8sR0FBRyxNQUFNVCxFQUFFLENBQUNPLEtBQUgsQ0FBU0EsS0FBVCxFQUFnQkMsS0FBaEIsQ0FBdEI7QUFDQSxVQUFNUixFQUFFLENBQUNVLEdBQUgsRUFBTjtBQUNBLFdBQU87QUFBRUMsTUFBQUEsTUFBTSxFQUFFO0FBQUVDLFFBQUFBLElBQUksRUFBRSxHQUFSO0FBQWFDLFFBQUFBLE9BQU8sRUFBRTtBQUF0QixPQUFWO0FBQXdDQyxNQUFBQSxJQUFJLEVBQUVMO0FBQTlDLEtBQVA7QUFDSCxHQUpELENBSUUsT0FBT00sQ0FBUCxFQUFVO0FBQ1JDLElBQUFBLE9BQU8sQ0FBQ0MsR0FBUixDQUFZRixDQUFaO0FBQ0EsV0FBTztBQUFFSixNQUFBQSxNQUFNLEVBQUU7QUFBRUMsUUFBQUEsSUFBSSxFQUFFLEdBQVI7QUFBYUMsUUFBQUEsT0FBTyxFQUFFO0FBQXRCO0FBQVYsS0FBUDtBQUNIO0FBQ0o7Ozs7Ozs7Ozs7Ozs7OztBQ3JCRDtBQUVlLGVBQWVLLE9BQWYsQ0FBdUJDLEdBQXZCLEVBQTRCQyxHQUE1QixFQUFpQztBQUM1QyxNQUFJRCxHQUFHLENBQUNFLE1BQUosSUFBYyxLQUFsQixFQUF5QjtBQUNyQixVQUFNWixPQUFPLEdBQUcsTUFBTUYsOENBQUssQ0FBQyx1QkFBRCxDQUEzQjtBQUNBYSxJQUFBQSxHQUFHLENBQUNULE1BQUosQ0FBV0YsT0FBTyxDQUFDRSxNQUFSLENBQWVDLElBQTFCLEVBQWdDVSxJQUFoQyxDQUFxQ2IsT0FBckM7QUFDSDtBQUNKOzs7Ozs7Ozs7O0FDUEQiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWIvZGIuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL3Byb2R1Y3RzL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcnZlcmxlc3MtbXlzcWxcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbXlzcWwgZnJvbSBcInNlcnZlcmxlc3MtbXlzcWxcIjtcclxuXHJcbmV4cG9ydCBjb25zdCBkYiA9IG15c3FsKHtcclxuICAgIGNvbmZpZzoge1xyXG4gICAgICAgIGhvc3Q6IFwibG9jYWxob3N0XCIsXHJcbiAgICAgICAgZGF0YWJhc2U6IFwic3RvcmVhcGlcIixcclxuICAgICAgICB1c2VyOiBcInJvb3RcIixcclxuICAgICAgICBwYXNzd29yZDogXCJcIixcclxuICAgICAgICBwb3J0OiAzMzA2XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHF1ZXJ5KHF1ZXJ5LCBwYXJtYSkge1xyXG4gICAgdHJ5IHtcclxuICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgZGIucXVlcnkocXVlcnksIHBhcm1hKTtcclxuICAgICAgICBhd2FpdCBkYi5lbmQoKTtcclxuICAgICAgICByZXR1cm4geyBzdGF0dXM6IHsgY29kZTogMjAwLCBtZXNzYWdlOiAnT0snIH0sIGRhdGE6IHJlc3VsdHMgfTtcclxuICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICBjb25zb2xlLmxvZyhlKTtcclxuICAgICAgICByZXR1cm4geyBzdGF0dXM6IHsgY29kZTogNDAwLCBtZXNzYWdlOiAnQmFkIFJlcXVlc3QnIH0gfTtcclxuICAgIH1cclxufSIsImltcG9ydCB7IHF1ZXJ5IH0gZnJvbSBcIi4uLy4uLy4uL2xpYi9kYlwiO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gICAgaWYgKHJlcS5tZXRob2QgPT0gXCJHRVRcIikge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBxdWVyeShcIlNFTEVDVCAqIEZST00gcHJvZHVjdFwiKVxyXG4gICAgICAgIHJlcy5zdGF0dXMocmVzdWx0cy5zdGF0dXMuY29kZSkuanNvbihyZXN1bHRzKTtcclxuICAgIH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcInNlcnZlcmxlc3MtbXlzcWxcIik7Il0sIm5hbWVzIjpbIm15c3FsIiwiZGIiLCJjb25maWciLCJob3N0IiwiZGF0YWJhc2UiLCJ1c2VyIiwicGFzc3dvcmQiLCJwb3J0IiwicXVlcnkiLCJwYXJtYSIsInJlc3VsdHMiLCJlbmQiLCJzdGF0dXMiLCJjb2RlIiwibWVzc2FnZSIsImRhdGEiLCJlIiwiY29uc29sZSIsImxvZyIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJqc29uIl0sInNvdXJjZVJvb3QiOiIifQ==