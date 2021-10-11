"use strict";
(() => {
var exports = {};
exports.id = "pages/api/auth";
exports.ids = ["pages/api/auth"];
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

/***/ "./pages/api/auth/index.js":
/*!*********************************!*\
  !*** ./pages/api/auth/index.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ handler)
/* harmony export */ });
/* harmony import */ var _lib_db__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../lib/db */ "./lib/db.js");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_1__);


const secretKEY = "MySecretKey";
async function handler(req, res) {
  if (req.method == "POST") {
    const {
      email,
      password
    } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        status: {
          code: 400,
          message: 'Missing email and password'
        }
      });
    }

    const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("SELECT * FROM user WHERE email=? AND password=?", [email, password]);
    console.log(results);
    const data = results.data[0];
    console.log(data);

    if (data) {
      const payload = {
        id: data.id,
        email: data.email,
        name: data.name,
        role: data.role
      };
      jsonwebtoken__WEBPACK_IMPORTED_MODULE_1___default().sign(payload, secretKEY, {
        expiresIn: "1d"
      }, (err, token) => {
        return res.status(200).json({
          status: {
            code: 200,
            message: "Authorized",
            data: payload,
            token
          }
        });
      });
    } else {
      res.status(401).json({
        status: {
          code: 401,
          message: "UnAuthorized"
        }
      });
    }
  } else {
    res.status(405).json({
      status: {
        code: 405,
        message: "Method Not Allowed"
      }
    });
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
var __webpack_exports__ = (__webpack_exec__("./pages/api/auth/index.js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QSxJQUFJLEVBQUUsR0FBUjtBQUFhQyxZQUFBQSxPQUFPLEVBQUUsWUFBdEI7QUFBb0NDLFlBQUFBLElBQUksRUFBRWEsT0FBMUM7QUFBbURPLFlBQUFBO0FBQW5EO0FBQVYsU0FBckIsQ0FBUDtBQUNILE9BRkQ7QUFHSCxLQVZELE1BVU87QUFDSFosTUFBQUEsR0FBRyxDQUFDWCxNQUFKLENBQVcsR0FBWCxFQUFnQmUsSUFBaEIsQ0FBcUI7QUFBRWYsUUFBQUEsTUFBTSxFQUFFO0FBQUVDLFVBQUFBLElBQUksRUFBRSxHQUFSO0FBQWFDLFVBQUFBLE9BQU8sRUFBRTtBQUF0QjtBQUFWLE9BQXJCO0FBQ0g7QUFDSixHQXRCRCxNQXNCTztBQUNIUyxJQUFBQSxHQUFHLENBQUNYLE1BQUosQ0FBVyxHQUFYLEVBQWdCZSxJQUFoQixDQUFxQjtBQUFFZixNQUFBQSxNQUFNLEVBQUU7QUFBRUMsUUFBQUEsSUFBSSxFQUFFLEdBQVI7QUFBYUMsUUFBQUEsT0FBTyxFQUFFO0FBQXRCO0FBQVYsS0FBckI7QUFDSDtBQUNKOzs7Ozs7Ozs7O0FDN0JEOzs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWIvZGIuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2F1dGgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwianNvbndlYnRva2VuXCIiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwic2VydmVybGVzcy1teXNxbFwiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBteXNxbCBmcm9tIFwic2VydmVybGVzcy1teXNxbFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRiID0gbXlzcWwoe1xyXG4gICAgY29uZmlnOiB7XHJcbiAgICAgICAgaG9zdDogXCJsb2NhbGhvc3RcIixcclxuICAgICAgICBkYXRhYmFzZTogXCJzdG9yZWFwaVwiLFxyXG4gICAgICAgIHVzZXI6IFwicm9vdFwiLFxyXG4gICAgICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgICAgIHBvcnQ6IDMzMDZcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcXVlcnkocXVlcnksIHBhcm1hKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBkYi5xdWVyeShxdWVyeSwgcGFybWEpO1xyXG4gICAgICAgIGF3YWl0IGRiLmVuZCgpO1xyXG4gICAgICAgIHJldHVybiB7IHN0YXR1czogeyBjb2RlOiAyMDAsIG1lc3NhZ2U6ICdPSycgfSwgZGF0YTogcmVzdWx0cyB9O1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIHJldHVybiB7IHN0YXR1czogeyBjb2RlOiA0MDAsIG1lc3NhZ2U6ICdCYWQgUmVxdWVzdCcgfSB9O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgZGIsIHF1ZXJ5IH0gZnJvbSBcIi4uLy4uLy4uL2xpYi9kYlwiO1xyXG5pbXBvcnQgSnd0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuY29uc3Qgc2VjcmV0S0VZID0gXCJNeVNlY3JldEtleVwiXHJcbmV4cG9ydCBkZWZhdWx0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZXIocmVxLCByZXMpIHtcclxuICAgIGlmIChyZXEubWV0aG9kID09IFwiUE9TVFwiKSB7XHJcbiAgICAgICAgY29uc3QgeyBlbWFpbCwgcGFzc3dvcmQgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgIGlmICghZW1haWwgfHwgIXBhc3N3b3JkKSB7XHJcbiAgICAgICAgICAgIHJldHVybiByZXMuc3RhdHVzKDQwMCkuanNvbih7IHN0YXR1czogeyBjb2RlOiA0MDAsIG1lc3NhZ2U6ICdNaXNzaW5nIGVtYWlsIGFuZCBwYXNzd29yZCcgfSB9KVxyXG4gICAgICAgIH1cclxuICAgICAgICBjb25zdCByZXN1bHRzID0gYXdhaXQgcXVlcnkoXCJTRUxFQ1QgKiBGUk9NIHVzZXIgV0hFUkUgZW1haWw9PyBBTkQgcGFzc3dvcmQ9P1wiLCBbZW1haWwsIHBhc3N3b3JkXSk7XHJcbiAgICAgICAgY29uc29sZS5sb2cocmVzdWx0cyk7XHJcbiAgICAgICAgY29uc3QgZGF0YSA9IHJlc3VsdHMuZGF0YVswXTtcclxuICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBjb25zdCBwYXlsb2FkID0ge1xyXG4gICAgICAgICAgICAgICAgaWQ6IGRhdGEuaWQsXHJcbiAgICAgICAgICAgICAgICBlbWFpbDogZGF0YS5lbWFpbCxcclxuICAgICAgICAgICAgICAgIG5hbWU6IGRhdGEubmFtZSxcclxuICAgICAgICAgICAgICAgIHJvbGU6IGRhdGEucm9sZVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIEp3dC5zaWduKHBheWxvYWQsIHNlY3JldEtFWSwgeyBleHBpcmVzSW46IFwiMWRcIiB9LCAoZXJyLCB0b2tlbikgPT4ge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHJlcy5zdGF0dXMoMjAwKS5qc29uKHsgc3RhdHVzOiB7IGNvZGU6IDIwMCwgbWVzc2FnZTogXCJBdXRob3JpemVkXCIsIGRhdGE6IHBheWxvYWQsIHRva2VuIH0gfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IHN0YXR1czogeyBjb2RlOiA0MDEsIG1lc3NhZ2U6IFwiVW5BdXRob3JpemVkXCIgfSB9KVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmVzLnN0YXR1cyg0MDUpLmpzb24oeyBzdGF0dXM6IHsgY29kZTogNDA1LCBtZXNzYWdlOiBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiIH0gfSlcclxuICAgIH1cclxufSIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcImpzb253ZWJ0b2tlblwiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJzZXJ2ZXJsZXNzLW15c3FsXCIpOyJdLCJuYW1lcyI6WyJteXNxbCIsImRiIiwiY29uZmlnIiwiaG9zdCIsImRhdGFiYXNlIiwidXNlciIsInBhc3N3b3JkIiwicG9ydCIsInF1ZXJ5IiwicGFybWEiLCJyZXN1bHRzIiwiZW5kIiwic3RhdHVzIiwiY29kZSIsIm1lc3NhZ2UiLCJkYXRhIiwiZSIsImNvbnNvbGUiLCJsb2ciLCJKd3QiLCJzZWNyZXRLRVkiLCJoYW5kbGVyIiwicmVxIiwicmVzIiwibWV0aG9kIiwiZW1haWwiLCJib2R5IiwianNvbiIsInBheWxvYWQiLCJpZCIsIm5hbWUiLCJyb2xlIiwic2lnbiIsImV4cGlyZXNJbiIsImVyciIsInRva2VuIl0sInNvdXJjZVJvb3QiOiIifQ==