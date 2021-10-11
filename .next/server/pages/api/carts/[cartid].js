"use strict";
(() => {
var exports = {};
exports.id = "pages/api/carts/[cartid]";
exports.ids = ["pages/api/carts/[cartid]"];
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

/***/ "./pages/api/carts/[cartid].js":
/*!*************************************!*\
  !*** ./pages/api/carts/[cartid].js ***!
  \*************************************/
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
    const {
      cartid
    } = req.query;
    console.log(req.headers);
    const verifiedToken = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(authorization);

    if (verifiedToken && verifiedToken.role === "admin") {
      const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("SELECT * FROM cart WHERE id=?", cartid);
      res.status(results.status.code).json(results);
    } else if (verifiedToken && verifiedToken.role === "user") {
      const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("SELECT * FROM cart WHERE id=? AND userid=?", [cartid, verifiedToken.id]);
      res.status(results.status.code).json(results);
    } else {
      res.status(401).json({
        status: {
          code: 401,
          message: 'Unauthorized'
        }
      });
    }
  } else if (req.method == "PUT") {
    const {
      authorization
    } = req.headers;
    const {
      cartid
    } = req.query;
    const {
      products
    } = req.body;
    console.log(req.headers);
    const verifiedToken = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(authorization);

    if (verifiedToken && verifiedToken.role === "admin") {
      const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("UPDATE cart SET products=? WHERE id=?", [JSON.stringify(products), cartid]);
      res.status(results.status.code).json(results);
    } else if (verifiedToken && verifiedToken.role === "user") {
      const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("UPDATE cart SET products=? WHERE id=? AND userid=?", [JSON.stringify(products), cartid, verifiedToken.id]);
      res.status(results.status.code).json(results);
    } else {
      res.status(401).json({
        status: {
          code: 401,
          message: 'Unauthorized'
        }
      });
    }
  } else if (req.method == "DELETE") {
    const {
      authorization
    } = req.headers;
    const {
      cartid
    } = req.query;
    console.log(req.headers);
    const verifiedToken = (0,_lib_auth__WEBPACK_IMPORTED_MODULE_1__.verifyToken)(authorization);

    if (verifiedToken && verifiedToken.role === "admin") {
      const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("DELETE FROM cart WHERE id=?", cartid);
      res.status(results.status.code).json(results);
    } else if (verifiedToken && verifiedToken.role === "user") {
      const results = await (0,_lib_db__WEBPACK_IMPORTED_MODULE_0__.query)("DELETE FROM cart WHERE id=? AND userid=?", [cartid, verifiedToken.id]);
      res.status(results.status.code).json(results);
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
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/api/carts/[cartid].js"));
module.exports = __webpack_exports__;

})();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QyxDQUFxQ2xCLE9BQXJDO0FBQ0gsS0FIRCxNQUdPLElBQUlnQixhQUFhLElBQUlBLGFBQWEsQ0FBQ0MsSUFBZCxLQUF1QixNQUE1QyxFQUFvRDtBQUN2RCxZQUFNakIsT0FBTyxHQUFHLE1BQU1GLDhDQUFLLENBQUMsMENBQUQsRUFBNkMsQ0FBQ2lCLE1BQUQsRUFBU0MsYUFBYSxDQUFDRyxFQUF2QixDQUE3QyxDQUEzQjtBQUNBUixNQUFBQSxHQUFHLENBQUNULE1BQUosQ0FBV0YsT0FBTyxDQUFDRSxNQUFSLENBQWVDLElBQTFCLEVBQWdDZSxJQUFoQyxDQUFxQ2xCLE9BQXJDO0FBQ0gsS0FITSxNQUdBO0FBQ0hXLE1BQUFBLEdBQUcsQ0FBQ1QsTUFBSixDQUFXLEdBQVgsRUFBZ0JnQixJQUFoQixDQUFxQjtBQUFFaEIsUUFBQUEsTUFBTSxFQUFFO0FBQUVDLFVBQUFBLElBQUksRUFBRSxHQUFSO0FBQWFDLFVBQUFBLE9BQU8sRUFBRTtBQUF0QjtBQUFWLE9BQXJCO0FBQ0g7QUFDSjtBQUNKOzs7Ozs7Ozs7O0FDakREOzs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9saWIvYXV0aC5qcyIsIndlYnBhY2s6Ly8vLi9saWIvZGIuanMiLCJ3ZWJwYWNrOi8vLy4vcGFnZXMvYXBpL2NhcnRzL1tjYXJ0aWRdLmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImpzb253ZWJ0b2tlblwiIiwid2VicGFjazovLy9leHRlcm5hbCBcInNlcnZlcmxlc3MtbXlzcWxcIiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgand0IGZyb20gXCJqc29ud2VidG9rZW5cIjtcclxuXHJcbmNvbnN0IEFQSUtFWSA9IFwiM2Q3ZDA1MmEwMzFlODY0ZWU5YzFiMDRiNWE0ZDBmMTFcIlxyXG5jb25zdCBzZWNyZXRLRVkgPSBcIk15U2VjcmV0S2V5XCJcclxuXHJcbmV4cG9ydCBmdW5jdGlvbiBjaGVja2FwaUtleShhcGlrZXkpIHtcclxuICAgIGlmIChhcGlrZXkgPT0gQVBJS0VZKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGZ1bmN0aW9uIHZlcmlmeVRva2VuKHRva2VuKSB7XHJcbiAgICBjb25zdCBqd3RUb2tlbiA9IHRva2VuLnNwbGl0KCcgJylbMV07XHJcbiAgICB0cnkge1xyXG4gICAgICAgIHJldHVybiBqd3QudmVyaWZ5KGp3dFRva2VuLCBzZWNyZXRLRVkpXHJcbiAgICB9IGNhdGNoIHtcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufSIsImltcG9ydCBteXNxbCBmcm9tIFwic2VydmVybGVzcy1teXNxbFwiO1xyXG5cclxuZXhwb3J0IGNvbnN0IGRiID0gbXlzcWwoe1xyXG4gICAgY29uZmlnOiB7XHJcbiAgICAgICAgaG9zdDogXCJsb2NhbGhvc3RcIixcclxuICAgICAgICBkYXRhYmFzZTogXCJzdG9yZWFwaVwiLFxyXG4gICAgICAgIHVzZXI6IFwicm9vdFwiLFxyXG4gICAgICAgIHBhc3N3b3JkOiBcIlwiLFxyXG4gICAgICAgIHBvcnQ6IDMzMDZcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcXVlcnkocXVlcnksIHBhcm1hKSB7XHJcbiAgICB0cnkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBkYi5xdWVyeShxdWVyeSwgcGFybWEpO1xyXG4gICAgICAgIGF3YWl0IGRiLmVuZCgpO1xyXG4gICAgICAgIHJldHVybiB7IHN0YXR1czogeyBjb2RlOiAyMDAsIG1lc3NhZ2U6ICdPSycgfSwgZGF0YTogcmVzdWx0cyB9O1xyXG4gICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKGUpO1xyXG4gICAgICAgIHJldHVybiB7IHN0YXR1czogeyBjb2RlOiA0MDAsIG1lc3NhZ2U6ICdCYWQgUmVxdWVzdCcgfSB9O1xyXG4gICAgfVxyXG59IiwiaW1wb3J0IHsgcXVlcnkgfSBmcm9tIFwiLi4vLi4vLi4vbGliL2RiXCI7XHJcbmltcG9ydCB7IHZlcmlmeVRva2VuIH0gZnJvbSBcIi4uLy4uLy4uL2xpYi9hdXRoXCI7XHJcblxyXG5cclxuZXhwb3J0IGRlZmF1bHQgYXN5bmMgZnVuY3Rpb24gaGFuZGxlcihyZXEsIHJlcykge1xyXG4gICAgaWYgKHJlcS5tZXRob2QgPT0gXCJHRVRcIikge1xyXG4gICAgICAgIGNvbnN0IHsgYXV0aG9yaXphdGlvbiB9ID0gcmVxLmhlYWRlcnM7XHJcbiAgICAgICAgY29uc3QgeyBjYXJ0aWQgfSA9IHJlcS5xdWVyeTtcclxuICAgICAgICBjb25zb2xlLmxvZyhyZXEuaGVhZGVycyk7XHJcbiAgICAgICAgY29uc3QgdmVyaWZpZWRUb2tlbiA9IHZlcmlmeVRva2VuKGF1dGhvcml6YXRpb24pO1xyXG4gICAgICAgIGlmICh2ZXJpZmllZFRva2VuICYmIHZlcmlmaWVkVG9rZW4ucm9sZSA9PT0gXCJhZG1pblwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBxdWVyeShcIlNFTEVDVCAqIEZST00gY2FydCBXSEVSRSBpZD0/XCIsIGNhcnRpZClcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhyZXN1bHRzLnN0YXR1cy5jb2RlKS5qc29uKHJlc3VsdHMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmVyaWZpZWRUb2tlbiAmJiB2ZXJpZmllZFRva2VuLnJvbGUgPT09IFwidXNlclwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBxdWVyeShcIlNFTEVDVCAqIEZST00gY2FydCBXSEVSRSBpZD0/IEFORCB1c2VyaWQ9P1wiLCBbY2FydGlkLCB2ZXJpZmllZFRva2VuLmlkXSlcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhyZXN1bHRzLnN0YXR1cy5jb2RlKS5qc29uKHJlc3VsdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgc3RhdHVzOiB7IGNvZGU6IDQwMSwgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCcgfSB9KVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAocmVxLm1ldGhvZCA9PSBcIlBVVFwiKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRob3JpemF0aW9uIH0gPSByZXEuaGVhZGVycztcclxuICAgICAgICBjb25zdCB7IGNhcnRpZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICAgIGNvbnN0IHsgcHJvZHVjdHMgfSA9IHJlcS5ib2R5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcS5oZWFkZXJzKTtcclxuICAgICAgICBjb25zdCB2ZXJpZmllZFRva2VuID0gdmVyaWZ5VG9rZW4oYXV0aG9yaXphdGlvbik7XHJcbiAgICAgICAgaWYgKHZlcmlmaWVkVG9rZW4gJiYgdmVyaWZpZWRUb2tlbi5yb2xlID09PSBcImFkbWluXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHF1ZXJ5KFwiVVBEQVRFIGNhcnQgU0VUIHByb2R1Y3RzPT8gV0hFUkUgaWQ9P1wiLCBbSlNPTi5zdHJpbmdpZnkocHJvZHVjdHMpLCBjYXJ0aWRdKVxyXG4gICAgICAgICAgICByZXMuc3RhdHVzKHJlc3VsdHMuc3RhdHVzLmNvZGUpLmpzb24ocmVzdWx0cyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh2ZXJpZmllZFRva2VuICYmIHZlcmlmaWVkVG9rZW4ucm9sZSA9PT0gXCJ1c2VyXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHF1ZXJ5KFwiVVBEQVRFIGNhcnQgU0VUIHByb2R1Y3RzPT8gV0hFUkUgaWQ9PyBBTkQgdXNlcmlkPT9cIiwgW0pTT04uc3RyaW5naWZ5KHByb2R1Y3RzKSwgY2FydGlkLCB2ZXJpZmllZFRva2VuLmlkXSlcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhyZXN1bHRzLnN0YXR1cy5jb2RlKS5qc29uKHJlc3VsdHMpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMoNDAxKS5qc29uKHsgc3RhdHVzOiB7IGNvZGU6IDQwMSwgbWVzc2FnZTogJ1VuYXV0aG9yaXplZCcgfSB9KVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSBpZiAocmVxLm1ldGhvZCA9PSBcIkRFTEVURVwiKSB7XHJcbiAgICAgICAgY29uc3QgeyBhdXRob3JpemF0aW9uIH0gPSByZXEuaGVhZGVycztcclxuICAgICAgICBjb25zdCB7IGNhcnRpZCB9ID0gcmVxLnF1ZXJ5O1xyXG4gICAgICAgIGNvbnNvbGUubG9nKHJlcS5oZWFkZXJzKTtcclxuICAgICAgICBjb25zdCB2ZXJpZmllZFRva2VuID0gdmVyaWZ5VG9rZW4oYXV0aG9yaXphdGlvbik7XHJcbiAgICAgICAgaWYgKHZlcmlmaWVkVG9rZW4gJiYgdmVyaWZpZWRUb2tlbi5yb2xlID09PSBcImFkbWluXCIpIHtcclxuICAgICAgICAgICAgY29uc3QgcmVzdWx0cyA9IGF3YWl0IHF1ZXJ5KFwiREVMRVRFIEZST00gY2FydCBXSEVSRSBpZD0/XCIsIGNhcnRpZClcclxuICAgICAgICAgICAgcmVzLnN0YXR1cyhyZXN1bHRzLnN0YXR1cy5jb2RlKS5qc29uKHJlc3VsdHMpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodmVyaWZpZWRUb2tlbiAmJiB2ZXJpZmllZFRva2VuLnJvbGUgPT09IFwidXNlclwiKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJlc3VsdHMgPSBhd2FpdCBxdWVyeShcIkRFTEVURSBGUk9NIGNhcnQgV0hFUkUgaWQ9PyBBTkQgdXNlcmlkPT9cIiwgW2NhcnRpZCwgdmVyaWZpZWRUb2tlbi5pZF0pXHJcbiAgICAgICAgICAgIHJlcy5zdGF0dXMocmVzdWx0cy5zdGF0dXMuY29kZSkuanNvbihyZXN1bHRzKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICByZXMuc3RhdHVzKDQwMSkuanNvbih7IHN0YXR1czogeyBjb2RlOiA0MDEsIG1lc3NhZ2U6ICdVbmF1dGhvcml6ZWQnIH0gfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJqc29ud2VidG9rZW5cIik7IiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwic2VydmVybGVzcy1teXNxbFwiKTsiXSwibmFtZXMiOlsiand0IiwiQVBJS0VZIiwic2VjcmV0S0VZIiwiY2hlY2thcGlLZXkiLCJhcGlrZXkiLCJ2ZXJpZnlUb2tlbiIsInRva2VuIiwiand0VG9rZW4iLCJzcGxpdCIsInZlcmlmeSIsIm15c3FsIiwiZGIiLCJjb25maWciLCJob3N0IiwiZGF0YWJhc2UiLCJ1c2VyIiwicGFzc3dvcmQiLCJwb3J0IiwicXVlcnkiLCJwYXJtYSIsInJlc3VsdHMiLCJlbmQiLCJzdGF0dXMiLCJjb2RlIiwibWVzc2FnZSIsImRhdGEiLCJlIiwiY29uc29sZSIsImxvZyIsImhhbmRsZXIiLCJyZXEiLCJyZXMiLCJtZXRob2QiLCJhdXRob3JpemF0aW9uIiwiaGVhZGVycyIsImNhcnRpZCIsInZlcmlmaWVkVG9rZW4iLCJyb2xlIiwianNvbiIsImlkIiwicHJvZHVjdHMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSJdLCJzb3VyY2VSb290IjoiIn0=