"use strict";
(() => {
var exports = {};
exports.id = "pages/api/carts";
exports.ids = ["pages/api/carts"];
exports.modules = {

/***/ "./lib/auth.js":
/*!*********************!*\
  !*** ./lib/auth.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "checkapiKey": () => (/* binding */ checkapiKey),
/* harmony export */   "verifyToken": () => (/* binding */ verifyToken)
/* harmony export */ });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);

const APIKEY = "3d7d052a031e864ee9c1b04b5a4d0f11";
const secretKEY = "MySecretKey";
function checkapiKey(apikey) {
  if (apikey == APIKEY) {
    return true;
  } else {
    return false;
  }
}
function verifyToken(token) {
  const jwtToken = token.split(' ')[1];

  try {
    return jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default().verify(jwtToken, secretKEY);
  } catch {
    return false;
  }
}

/***/ }),

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

/***/ "./pages/api/carts/index.js":
/*!**********************************!*\
  !*** ./pages/api/carts/index.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/db */ "./lib/db.js");
/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../lib/auth */ "./lib/auth.js");


async function handler(req, res) {
  if (req.method == "GET") {
    const {
      authorization
    } = req.headers;
    const verifiedToken = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(authorization);

    if (verifiedToken && verifiedToken.role === "admin") {
      const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("SELECT * FROM cart");
      res.status(results.status.code).json(results);
    } else {
      res.status(401).json({
        status: {
          code: 401,
          message: 'Unauthorized'
        }
      });
    }
  } else if (req.method == "POST") {
    const {
      authorization
    } = req.headers;
    const verifiedToken = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(authorization);

    if (verifiedToken) {
      const {
        products
      } = req.body;
      const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("INSERT INTO cart(userid,products) VALUE(?,?)", [verifiedToken.id, JSON.stringify(products)]);
      res.status(204).json(results);
    } else {
      res.status(401).json({
        status: {
          code: 401,
          message: 'Unauthorized'
        }
      });
    }
  }
}

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/***/ ((module) => {

module.exports = require("jsonwebtoken");

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
var __webpack_exports__ = (__webpack_exec__("./pages/api/carts/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFNO0FBQUVDLE1BQUFBO0FBQUYsUUFBb0JILEdBQUcsQ0FBQ0ksT0FBOUI7QUFDQSxVQUFNQyxhQUFhLEdBQUc5QixzREFBVyxDQUFDNEIsYUFBRCxDQUFqQzs7QUFDQSxRQUFJRSxhQUFKLEVBQW1CO0FBQ2YsWUFBTTtBQUFFRyxRQUFBQTtBQUFGLFVBQWVSLEdBQUcsQ0FBQ1MsSUFBekI7QUFDQSxZQUFNbkIsT0FBTyxHQUFHLE1BQU1GLDhDQUFLLENBQUMsOENBQUQsRUFBaUQsQ0FBQ2lCLGFBQWEsQ0FBQ0ssRUFBZixFQUFtQkMsSUFBSSxDQUFDQyxTQUFMLENBQWVKLFFBQWYsQ0FBbkIsQ0FBakQsQ0FBM0I7QUFDQVAsTUFBQUEsR0FBRyxDQUFDVCxNQUFKLENBQVcsR0FBWCxFQUFnQmUsSUFBaEIsQ0FBcUJqQixPQUFyQjtBQUNILEtBSkQsTUFJTztBQUNIVyxNQUFBQSxHQUFHLENBQUNULE1BQUosQ0FBVyxHQUFYLEVBQWdCZSxJQUFoQixDQUFxQjtBQUFFZixRQUFBQSxNQUFNLEVBQUU7QUFBRUMsVUFBQUEsSUFBSSxFQUFFLEdBQVI7QUFBYUMsVUFBQUEsT0FBTyxFQUFFO0FBQXRCO0FBQVYsT0FBckI7QUFDSDtBQUVKO0FBQ0o7Ozs7Ozs7Ozs7QUMxQkQ7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2xpYi9hdXRoLmpzIiwid2VicGFjazovLy8uL2xpYi9kYi5qcyIsIndlYnBhY2s6Ly8vLi9wYWdlcy9hcGkvY2FydHMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VydmVybGVzcy1teXNxbFwiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBqd3QgZnJvbSBcImpzb253ZWJ0b2tlblwiO1xyXG5cclxuY29uc3QgQVBJS0VZID0gXCIzZDdkMDUyYTAzMWU4NjRlZTljMWIwNGI1YTRkMGYxMVwiXHJcbmNvbnN0IHNlY3JldEtFWSA9IFwiTXlTZWNyZXRLZXlcIlxyXG5cclxuZXhwb3J0IGZ1bmN0aW9uIGNoZWNrYXBpS2V5KGFwaWtleSkge1xyXG4gICAgaWYgKGFwaWtleSA9PSBBUElLRVkpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufVxyXG5leHBvcnQgZnVuY3Rpb24gdmVyaWZ5VG9rZW4odG9rZW4pIHtcclxuICAgIGNvbnN0IGp3dFRva2VuID0gdG9rZW4uc3BsaXQoJyAnKVsxXTtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgcmV0dXJuIGp3dC52ZXJpZnkoand0VG9rZW4sIHNlY3JldEtFWSlcclxuICAgIH0gY2F0Y2gge1xyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59IiwiaW1wb3J0IG15c3FsIGZyb20gXCJzZXJ2ZXJsZXNzLW15c3FsXCI7XHJcblxyXG5leHBvcnQgY29uc3QgZGIgPSBteXNxbCh7XHJcbiAgICBjb25maWc6IHtcclxuICAgICAgICBob3N0OiBcImxvY2FsaG9zdFwiLFxyXG4gICAgICAgIGRhdGFiYXNlOiBcInN0b3JlYXBpXCIsXHJcbiAgICAgICAgdXNlcjogXCJyb290XCIsXHJcbiAgICAgICAgcGFzc3dvcmQ6IFwiXCIsXHJcbiAgICAgICAgcG9ydDogMzMwNlxyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBxdWVyeShxdWVyeSwgcGFybWEpIHtcclxuICAgIHRyeSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IGRiLnF1ZXJ5KHF1ZXJ5LCBwYXJtYSk7XHJcbiAgICAgICAgYXdhaXQgZGIuZW5kKCk7XHJcbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiB7IGNvZGU6IDIwMCwgbWVzc2FnZTogJ09LJyB9LCBkYXRhOiByZXN1bHRzIH07XHJcbiAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coZSk7XHJcbiAgICAgICAgcmV0dXJuIHsgc3RhdHVzOiB7IGNvZGU6IDQwMCwgbWVzc2FnZTogJ0JhZCBSZXF1ZXN0JyB9IH07XHJcbiAgICB9XHJcbn0iLCJpbXBvcnQgeyBxdWVyeSB9IGZyb20gXCIuLi8uLi8uLi9saWIvZGJcIjtcclxuaW1wb3J0IHsgdmVyaWZ5VG9rZW4gfSBmcm9tIFwiLi4vLi4vLi4vbGliL2F1dGhcIjtcclxuXHJcblxyXG5leHBvcnQgZGVmYXVsdCBhc3luYyBmdW5jdGlvbiBoYW5kbGVyKHJlcSwgcmVzKSB7XHJcbiAgICBpZiAocmVxLm1ldGhvZCA9PSBcIkdFVFwiKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRob3JpemF0aW9uIH0gPSByZXEuaGVhZGVycztcclxuICAgICAgICBjb25zdCB2ZXJpZmllZFRva2VuID0gdmVyaWZ5VG9rZW4oYXV0aG9yaXphdGlvbik7XHJcbiAgICAgICAgaWYgKHZlcmlmaWVkVG9rZW4gJiYgdmVyaWZpZWRUb2tlbi5yb2xlID09PSBcImFkbWluXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHF1ZXJ5KFwiU0VMRUNUICogRlJPTSBjYXJ0XCIpXHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMocmVzdWx0cy5zdGF0dXMuY29kZSkuanNvbihyZXN1bHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IHN0YXR1czogeyBjb2RlOiA0MDEsIG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0gfSlcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2UgaWYgKHJlcS5tZXRob2QgPT0gXCJQT1NUXCIpIHtcclxuICAgICAgICBjb25zdCB7IGF1dGhvcml6YXRpb24gfSA9IHJlcS5oZWFkZXJzO1xyXG4gICAgICAgIGNvbnN0IHZlcmlmaWVkVG9rZW4gPSB2ZXJpZnlUb2tlbihhdXRob3JpemF0aW9uKTtcclxuICAgICAgICBpZiAodmVyaWZpZWRUb2tlbikge1xyXG4gICAgICAgICAgICBjb25zdCB7IHByb2R1Y3RzIH0gPSByZXEuYm9keTtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHF1ZXJ5KFwiSU5TRVJUIElOVE8gY2FydCh1c2VyaWQscHJvZHVjdHMpIFZBTFVFKD8sPylcIiwgW3ZlcmlmaWVkVG9rZW4uaWQsIEpTT04uc3RyaW5naWZ5KHByb2R1Y3RzKV0pXHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoMjA0KS5qc29uKHJlc3VsdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgc3RhdHVzOiB7IGNvZGU6IDQwMSwgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCcgfSB9KVxyXG4gICAgICAgIH1cclxuXHJcbiAgICB9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VydmVybGVzcy1teXNxbFwiKTsiXSwibmFtZXMiOlsiand0IiwiQVBJS0VZIiwic2VjcmV0S0VZIiwiY2hlY2thcGlLZXkiLCJhcGlrZXkiLCJ2ZXJpZnlUb2tlbiIsInRva2VuIiwiand0VG9rZW4iLCJzcGxpdCIsInZlcmlmeSIsIm15c3FsIiwiZGIiLCJjb25maWciLCJob3N0IiwiZGF0YWJhc2UiLCJ1c2VyIiwicGFzc3dvcmQiLCJwb3J0IiwicXVlcnkiLCJwYXJtYSIsInJlc3VsdHMiLCJlbmQiLCJzdGF0dXMiLCJjb2RlIiwibWVzc2FnZSIsImRhdGEiLCJlIiwiY29uc29sZSIsImxvZyIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJhdXRob3JpemF0aW9uIiwiaGVhZGVycyIsInZlcmlmaWVkVG9rZW4iLCJyb2xlIiwianNvbiIsInByb2R1Y3RzIiwiYm9keSIsImlkIiwiSlNPTiIsInN0cmluZ2lmeSJdLCJzb3VyY2VSb290IjoiIn0=