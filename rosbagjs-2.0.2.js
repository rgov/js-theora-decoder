(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["rosbag"] = factory();
	else
		root["rosbag"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/web/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/base64-js/index.js":
/*!*****************************************!*\
  !*** ./node_modules/base64-js/index.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array

var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i]
  revLookup[code.charCodeAt(i)] = i
}

// Support decoding URL-safe base64 strings, as Node.js does.
// See: https://en.wikipedia.org/wiki/Base64#URL_applications
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63

function getLens (b64) {
  var len = b64.length

  if (len % 4 > 0) {
    throw new Error('Invalid string. Length must be a multiple of 4')
  }

  // Trim off extra bytes after placeholder bytes are found
  // See: https://github.com/beatgammit/base64-js/issues/42
  var validLen = b64.indexOf('=')
  if (validLen === -1) validLen = len

  var placeHoldersLen = validLen === len
    ? 0
    : 4 - (validLen % 4)

  return [validLen, placeHoldersLen]
}

// base64 is 4/3 + up to two characters of the original data
function byteLength (b64) {
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function _byteLength (b64, validLen, placeHoldersLen) {
  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
}

function toByteArray (b64) {
  var tmp
  var lens = getLens(b64)
  var validLen = lens[0]
  var placeHoldersLen = lens[1]

  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen))

  var curByte = 0

  // if there are placeholders, only get up to the last complete 4 chars
  var len = placeHoldersLen > 0
    ? validLen - 4
    : validLen

  for (var i = 0; i < len; i += 4) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 18) |
      (revLookup[b64.charCodeAt(i + 1)] << 12) |
      (revLookup[b64.charCodeAt(i + 2)] << 6) |
      revLookup[b64.charCodeAt(i + 3)]
    arr[curByte++] = (tmp >> 16) & 0xFF
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 2) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 2) |
      (revLookup[b64.charCodeAt(i + 1)] >> 4)
    arr[curByte++] = tmp & 0xFF
  }

  if (placeHoldersLen === 1) {
    tmp =
      (revLookup[b64.charCodeAt(i)] << 10) |
      (revLookup[b64.charCodeAt(i + 1)] << 4) |
      (revLookup[b64.charCodeAt(i + 2)] >> 2)
    arr[curByte++] = (tmp >> 8) & 0xFF
    arr[curByte++] = tmp & 0xFF
  }

  return arr
}

function tripletToBase64 (num) {
  return lookup[num >> 18 & 0x3F] +
    lookup[num >> 12 & 0x3F] +
    lookup[num >> 6 & 0x3F] +
    lookup[num & 0x3F]
}

function encodeChunk (uint8, start, end) {
  var tmp
  var output = []
  for (var i = start; i < end; i += 3) {
    tmp =
      ((uint8[i] << 16) & 0xFF0000) +
      ((uint8[i + 1] << 8) & 0xFF00) +
      (uint8[i + 2] & 0xFF)
    output.push(tripletToBase64(tmp))
  }
  return output.join('')
}

function fromByteArray (uint8) {
  var tmp
  var len = uint8.length
  var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
  var parts = []
  var maxChunkLength = 16383 // must be multiple of 3

  // go through the array every three bytes, we'll deal with trailing stuff later
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(
      uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)
    ))
  }

  // pad the end with zeros, but make sure to not forget the extra bytes
  if (extraBytes === 1) {
    tmp = uint8[len - 1]
    parts.push(
      lookup[tmp >> 2] +
      lookup[(tmp << 4) & 0x3F] +
      '=='
    )
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1]
    parts.push(
      lookup[tmp >> 10] +
      lookup[(tmp >> 4) & 0x3F] +
      lookup[(tmp << 2) & 0x3F] +
      '='
    )
  }

  return parts.join('')
}


/***/ }),

/***/ "./node_modules/heap/index.js":
/*!************************************!*\
  !*** ./node_modules/heap/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./lib/heap */ "./node_modules/heap/lib/heap.js");


/***/ }),

/***/ "./node_modules/heap/lib/heap.js":
/*!***************************************!*\
  !*** ./node_modules/heap/lib/heap.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0
(function() {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;


  /*
  Default comparison function to be used
   */

  defaultCmp = function(x, y) {
    if (x < y) {
      return -1;
    }
    if (x > y) {
      return 1;
    }
    return 0;
  };


  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */

  insort = function(a, x, lo, hi, cmp) {
    var mid;
    if (lo == null) {
      lo = 0;
    }
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }
    if (hi == null) {
      hi = a.length;
    }
    while (lo < hi) {
      mid = floor((lo + hi) / 2);
      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return ([].splice.apply(a, [lo, lo - lo].concat(x)), x);
  };


  /*
  Push item onto heap, maintaining the heap invariant.
   */

  heappush = function(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }
    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };


  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */

  heappop = function(array, cmp) {
    var lastelt, returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    lastelt = array.pop();
    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;
      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }
    return returnitem;
  };


  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */

  heapreplace = function(array, item, cmp) {
    var returnitem;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    returnitem = array[0];
    array[0] = item;
    _siftup(array, 0, cmp);
    return returnitem;
  };


  /*
  Fast version of a heappush followed by a heappop.
   */

  heappushpop = function(array, item, cmp) {
    var _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];
      _siftup(array, 0, cmp);
    }
    return item;
  };


  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */

  heapify = function(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    _ref1 = (function() {
      _results1 = [];
      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--){ _results1.push(_j); }
      return _results1;
    }).apply(this).reverse();
    _results = [];
    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];
      _results.push(_siftup(array, i, cmp));
    }
    return _results;
  };


  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */

  updateItem = function(array, item, cmp) {
    var pos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    pos = array.indexOf(item);
    if (pos === -1) {
      return;
    }
    _siftdown(array, 0, pos, cmp);
    return _siftup(array, pos, cmp);
  };


  /*
  Find the n largest elements in a dataset.
   */

  nlargest = function(array, n, cmp) {
    var elem, result, _i, _len, _ref;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    result = array.slice(0, n);
    if (!result.length) {
      return result;
    }
    heapify(result, cmp);
    _ref = array.slice(n);
    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }
    return result.sort(cmp).reverse();
  };


  /*
  Find the n smallest elements in a dataset.
   */

  nsmallest = function(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);
      if (!result.length) {
        return result;
      }
      los = result[result.length - 1];
      _ref = array.slice(n);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];
        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }
      return result;
    }
    heapify(array, cmp);
    _results = [];
    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }
    return _results;
  };

  _siftdown = function(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    newitem = array[pos];
    while (pos > startpos) {
      parentpos = (pos - 1) >> 1;
      parent = array[parentpos];
      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }
      break;
    }
    return array[pos] = newitem;
  };

  _siftup = function(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;
    if (cmp == null) {
      cmp = defaultCmp;
    }
    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;
    while (childpos < endpos) {
      rightpos = childpos + 1;
      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }
      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }
    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = (function() {
    Heap.push = heappush;

    Heap.pop = heappop;

    Heap.replace = heapreplace;

    Heap.pushpop = heappushpop;

    Heap.heapify = heapify;

    Heap.updateItem = updateItem;

    Heap.nlargest = nlargest;

    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function(x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function() {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function() {
      return this.nodes[0];
    };

    Heap.prototype.contains = function(x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function(x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function(x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function() {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function(x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function() {
      return this.nodes = [];
    };

    Heap.prototype.empty = function() {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function() {
      return this.nodes.length;
    };

    Heap.prototype.clone = function() {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function() {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;

    Heap.prototype.top = Heap.prototype.peek;

    Heap.prototype.front = Heap.prototype.peek;

    Heap.prototype.has = Heap.prototype.contains;

    Heap.prototype.copy = Heap.prototype.clone;

    return Heap;

  })();

  (function(root, factory) {
    if (true) {
      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(this, function() {
    return Heap;
  });

}).call(this);


/***/ }),

/***/ "./node_modules/ieee754/index.js":
/*!***************************************!*\
  !*** ./node_modules/ieee754/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var nBits = -7
  var i = isLE ? (nBytes - 1) : 0
  var d = isLE ? -1 : 1
  var s = buffer[offset + i]

  i += d

  e = s & ((1 << (-nBits)) - 1)
  s >>= (-nBits)
  nBits += eLen
  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  m = e & ((1 << (-nBits)) - 1)
  e >>= (-nBits)
  nBits += mLen
  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

  if (e === 0) {
    e = 1 - eBias
  } else if (e === eMax) {
    return m ? NaN : ((s ? -1 : 1) * Infinity)
  } else {
    m = m + Math.pow(2, mLen)
    e = e - eBias
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}

exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c
  var eLen = (nBytes * 8) - mLen - 1
  var eMax = (1 << eLen) - 1
  var eBias = eMax >> 1
  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
  var i = isLE ? 0 : (nBytes - 1)
  var d = isLE ? 1 : -1
  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0

  value = Math.abs(value)

  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0
    e = eMax
  } else {
    e = Math.floor(Math.log(value) / Math.LN2)
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--
      c *= 2
    }
    if (e + eBias >= 1) {
      value += rt / c
    } else {
      value += rt * Math.pow(2, 1 - eBias)
    }
    if (value * c >= 2) {
      e++
      c /= 2
    }

    if (e + eBias >= eMax) {
      m = 0
      e = eMax
    } else if (e + eBias >= 1) {
      m = ((value * c) - 1) * Math.pow(2, mLen)
      e = e + eBias
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
      e = 0
    }
  }

  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

  e = (e << mLen) | m
  eLen += mLen
  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

  buffer[offset + i - d] |= s * 128
}


/***/ }),

/***/ "./node_modules/int53/index.js":
/*!*************************************!*\
  !*** ./node_modules/int53/index.js ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var int53 = {}

var MAX_UINT32 = 0x00000000FFFFFFFF
var MAX_INT53 =  0x001FFFFFFFFFFFFF

function onesComplement(number) {
	number = ~number
	if (number < 0) {
		number = (number & 0x7FFFFFFF) + 0x80000000
	}
	return number
}

function uintHighLow(number) {
	console.assert(number > -1 && number <= MAX_INT53, "number out of range")
	console.assert(Math.floor(number) === number, "number must be an integer")
	var high = 0
	var signbit = number & 0xFFFFFFFF
	var low = signbit < 0 ? (number & 0x7FFFFFFF) + 0x80000000 : signbit
	if (number > MAX_UINT32) {
		high = (number - low) / (MAX_UINT32 + 1)
	}
	return [high, low]
}

function intHighLow(number) {
	if (number > -1) {
		return uintHighLow(number)
	}
	var hl = uintHighLow(-number)
	var high = onesComplement(hl[0])
	var low = onesComplement(hl[1])
	if (low === MAX_UINT32) {
		high += 1
		low = 0
	}
	else {
		low += 1
	}
	return [high, low]
}

function toDouble(high, low, signed) {
	if (signed && (high & 0x80000000) !== 0) {
		high = onesComplement(high)
		low = onesComplement(low)
		console.assert(high < 0x00200000, "number too small")
		return -((high * (MAX_UINT32 + 1)) + low + 1)
	}
	else { //positive
		console.assert(high < 0x00200000, "number too large")
		return (high * (MAX_UINT32 + 1)) + low
	}
}

int53.readInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	return toDouble(high, low, true)
}

int53.readInt64LE = function (buffer, offset) {
	offset = offset || 0
	var low = buffer.readUInt32LE(offset)
	var high = buffer.readUInt32LE(offset + 4)
	return toDouble(high, low, true)
}

int53.readUInt64BE = function (buffer, offset) {
	offset = offset || 0
	var high = buffer.readUInt32BE(offset)
	var low = buffer.readUInt32BE(offset + 4)
	return toDouble(high, low, false)
}

int53.readUInt64LE = function (buffer, offset) {
	offset = offset || 0
	var low = buffer.readUInt32LE(offset)
	var high = buffer.readUInt32LE(offset + 4)
	return toDouble(high, low, false)
}

int53.writeInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = intHighLow(number)
	buffer.writeUInt32BE(hl[0], offset)
	buffer.writeUInt32BE(hl[1], offset + 4)
}

int53.writeInt64LE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = intHighLow(number)
	buffer.writeUInt32LE(hl[1], offset)
	buffer.writeUInt32LE(hl[0], offset + 4)
}

int53.writeUInt64BE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = uintHighLow(number)
	buffer.writeUInt32BE(hl[0], offset)
	buffer.writeUInt32BE(hl[1], offset + 4)
}

int53.writeUInt64LE = function (number, buffer, offset) {
	offset = offset || 0
	var hl = uintHighLow(number)
	buffer.writeUInt32LE(hl[1], offset)
	buffer.writeUInt32LE(hl[0], offset + 4)
}

module.exports = int53


/***/ }),

/***/ "./node_modules/isarray/index.js":
/*!***************************************!*\
  !*** ./node_modules/isarray/index.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = Array.isArray || function (arr) {
  return toString.call(arr) == '[object Array]';
};


/***/ }),

/***/ "./node_modules/node-libs-browser/node_modules/buffer/index.js":
/*!*********************************************************************!*\
  !*** ./node_modules/node-libs-browser/node_modules/buffer/index.js ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
 * @license  MIT
 */
/* eslint-disable no-proto */



var base64 = __webpack_require__(/*! base64-js */ "./node_modules/base64-js/index.js")
var ieee754 = __webpack_require__(/*! ieee754 */ "./node_modules/ieee754/index.js")
var isArray = __webpack_require__(/*! isarray */ "./node_modules/isarray/index.js")

exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50

/**
 * If `Buffer.TYPED_ARRAY_SUPPORT`:
 *   === true    Use Uint8Array implementation (fastest)
 *   === false   Use Object implementation (most compatible, even IE6)
 *
 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
 * Opera 11.6+, iOS 4.2+.
 *
 * Due to various browser bugs, sometimes the Object implementation will be used even
 * when the browser supports typed arrays.
 *
 * Note:
 *
 *   - Firefox 4-29 lacks support for adding new properties to `Uint8Array` instances,
 *     See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438.
 *
 *   - Chrome 9-10 is missing the `TypedArray.prototype.subarray` function.
 *
 *   - IE10 has a broken `TypedArray.prototype.subarray` function which returns arrays of
 *     incorrect length in some situations.

 * We detect these buggy browsers and set `Buffer.TYPED_ARRAY_SUPPORT` to `false` so they
 * get the Object implementation, which is slower but behaves correctly.
 */
Buffer.TYPED_ARRAY_SUPPORT = global.TYPED_ARRAY_SUPPORT !== undefined
  ? global.TYPED_ARRAY_SUPPORT
  : typedArraySupport()

/*
 * Export kMaxLength after typed array support is determined.
 */
exports.kMaxLength = kMaxLength()

function typedArraySupport () {
  try {
    var arr = new Uint8Array(1)
    arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () { return 42 }}
    return arr.foo() === 42 && // typed array instances can be augmented
        typeof arr.subarray === 'function' && // chrome 9-10 lack `subarray`
        arr.subarray(1, 1).byteLength === 0 // ie10 has broken `subarray`
  } catch (e) {
    return false
  }
}

function kMaxLength () {
  return Buffer.TYPED_ARRAY_SUPPORT
    ? 0x7fffffff
    : 0x3fffffff
}

function createBuffer (that, length) {
  if (kMaxLength() < length) {
    throw new RangeError('Invalid typed array length')
  }
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = new Uint8Array(length)
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    if (that === null) {
      that = new Buffer(length)
    }
    that.length = length
  }

  return that
}

/**
 * The Buffer constructor returns instances of `Uint8Array` that have their
 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
 * returns a single octet.
 *
 * The `Uint8Array` prototype remains unmodified.
 */

function Buffer (arg, encodingOrOffset, length) {
  if (!Buffer.TYPED_ARRAY_SUPPORT && !(this instanceof Buffer)) {
    return new Buffer(arg, encodingOrOffset, length)
  }

  // Common case.
  if (typeof arg === 'number') {
    if (typeof encodingOrOffset === 'string') {
      throw new Error(
        'If encoding is specified then the first argument must be a string'
      )
    }
    return allocUnsafe(this, arg)
  }
  return from(this, arg, encodingOrOffset, length)
}

Buffer.poolSize = 8192 // not used by this implementation

// TODO: Legacy, not needed anymore. Remove in next major version.
Buffer._augment = function (arr) {
  arr.__proto__ = Buffer.prototype
  return arr
}

function from (that, value, encodingOrOffset, length) {
  if (typeof value === 'number') {
    throw new TypeError('"value" argument must not be a number')
  }

  if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
    return fromArrayBuffer(that, value, encodingOrOffset, length)
  }

  if (typeof value === 'string') {
    return fromString(that, value, encodingOrOffset)
  }

  return fromObject(that, value)
}

/**
 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
 * if value is a number.
 * Buffer.from(str[, encoding])
 * Buffer.from(array)
 * Buffer.from(buffer)
 * Buffer.from(arrayBuffer[, byteOffset[, length]])
 **/
Buffer.from = function (value, encodingOrOffset, length) {
  return from(null, value, encodingOrOffset, length)
}

if (Buffer.TYPED_ARRAY_SUPPORT) {
  Buffer.prototype.__proto__ = Uint8Array.prototype
  Buffer.__proto__ = Uint8Array
  if (typeof Symbol !== 'undefined' && Symbol.species &&
      Buffer[Symbol.species] === Buffer) {
    // Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true
    })
  }
}

function assertSize (size) {
  if (typeof size !== 'number') {
    throw new TypeError('"size" argument must be a number')
  } else if (size < 0) {
    throw new RangeError('"size" argument must not be negative')
  }
}

function alloc (that, size, fill, encoding) {
  assertSize(size)
  if (size <= 0) {
    return createBuffer(that, size)
  }
  if (fill !== undefined) {
    // Only pay attention to encoding if it's a string. This
    // prevents accidentally sending in a number that would
    // be interpretted as a start offset.
    return typeof encoding === 'string'
      ? createBuffer(that, size).fill(fill, encoding)
      : createBuffer(that, size).fill(fill)
  }
  return createBuffer(that, size)
}

/**
 * Creates a new filled Buffer instance.
 * alloc(size[, fill[, encoding]])
 **/
Buffer.alloc = function (size, fill, encoding) {
  return alloc(null, size, fill, encoding)
}

function allocUnsafe (that, size) {
  assertSize(size)
  that = createBuffer(that, size < 0 ? 0 : checked(size) | 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    for (var i = 0; i < size; ++i) {
      that[i] = 0
    }
  }
  return that
}

/**
 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
 * */
Buffer.allocUnsafe = function (size) {
  return allocUnsafe(null, size)
}
/**
 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
 */
Buffer.allocUnsafeSlow = function (size) {
  return allocUnsafe(null, size)
}

function fromString (that, string, encoding) {
  if (typeof encoding !== 'string' || encoding === '') {
    encoding = 'utf8'
  }

  if (!Buffer.isEncoding(encoding)) {
    throw new TypeError('"encoding" must be a valid string encoding')
  }

  var length = byteLength(string, encoding) | 0
  that = createBuffer(that, length)

  var actual = that.write(string, encoding)

  if (actual !== length) {
    // Writing a hex string, for example, that contains invalid characters will
    // cause everything after the first invalid character to be ignored. (e.g.
    // 'abxxcd' will be treated as 'ab')
    that = that.slice(0, actual)
  }

  return that
}

function fromArrayLike (that, array) {
  var length = array.length < 0 ? 0 : checked(array.length) | 0
  that = createBuffer(that, length)
  for (var i = 0; i < length; i += 1) {
    that[i] = array[i] & 255
  }
  return that
}

function fromArrayBuffer (that, array, byteOffset, length) {
  array.byteLength // this throws if `array` is not a valid ArrayBuffer

  if (byteOffset < 0 || array.byteLength < byteOffset) {
    throw new RangeError('\'offset\' is out of bounds')
  }

  if (array.byteLength < byteOffset + (length || 0)) {
    throw new RangeError('\'length\' is out of bounds')
  }

  if (byteOffset === undefined && length === undefined) {
    array = new Uint8Array(array)
  } else if (length === undefined) {
    array = new Uint8Array(array, byteOffset)
  } else {
    array = new Uint8Array(array, byteOffset, length)
  }

  if (Buffer.TYPED_ARRAY_SUPPORT) {
    // Return an augmented `Uint8Array` instance, for best performance
    that = array
    that.__proto__ = Buffer.prototype
  } else {
    // Fallback: Return an object instance of the Buffer class
    that = fromArrayLike(that, array)
  }
  return that
}

function fromObject (that, obj) {
  if (Buffer.isBuffer(obj)) {
    var len = checked(obj.length) | 0
    that = createBuffer(that, len)

    if (that.length === 0) {
      return that
    }

    obj.copy(that, 0, 0, len)
    return that
  }

  if (obj) {
    if ((typeof ArrayBuffer !== 'undefined' &&
        obj.buffer instanceof ArrayBuffer) || 'length' in obj) {
      if (typeof obj.length !== 'number' || isnan(obj.length)) {
        return createBuffer(that, 0)
      }
      return fromArrayLike(that, obj)
    }

    if (obj.type === 'Buffer' && isArray(obj.data)) {
      return fromArrayLike(that, obj.data)
    }
  }

  throw new TypeError('First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.')
}

function checked (length) {
  // Note: cannot use `length < kMaxLength()` here because that fails when
  // length is NaN (which is otherwise coerced to zero.)
  if (length >= kMaxLength()) {
    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
                         'size: 0x' + kMaxLength().toString(16) + ' bytes')
  }
  return length | 0
}

function SlowBuffer (length) {
  if (+length != length) { // eslint-disable-line eqeqeq
    length = 0
  }
  return Buffer.alloc(+length)
}

Buffer.isBuffer = function isBuffer (b) {
  return !!(b != null && b._isBuffer)
}

Buffer.compare = function compare (a, b) {
  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
    throw new TypeError('Arguments must be Buffers')
  }

  if (a === b) return 0

  var x = a.length
  var y = b.length

  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
    if (a[i] !== b[i]) {
      x = a[i]
      y = b[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

Buffer.isEncoding = function isEncoding (encoding) {
  switch (String(encoding).toLowerCase()) {
    case 'hex':
    case 'utf8':
    case 'utf-8':
    case 'ascii':
    case 'latin1':
    case 'binary':
    case 'base64':
    case 'ucs2':
    case 'ucs-2':
    case 'utf16le':
    case 'utf-16le':
      return true
    default:
      return false
  }
}

Buffer.concat = function concat (list, length) {
  if (!isArray(list)) {
    throw new TypeError('"list" argument must be an Array of Buffers')
  }

  if (list.length === 0) {
    return Buffer.alloc(0)
  }

  var i
  if (length === undefined) {
    length = 0
    for (i = 0; i < list.length; ++i) {
      length += list[i].length
    }
  }

  var buffer = Buffer.allocUnsafe(length)
  var pos = 0
  for (i = 0; i < list.length; ++i) {
    var buf = list[i]
    if (!Buffer.isBuffer(buf)) {
      throw new TypeError('"list" argument must be an Array of Buffers')
    }
    buf.copy(buffer, pos)
    pos += buf.length
  }
  return buffer
}

function byteLength (string, encoding) {
  if (Buffer.isBuffer(string)) {
    return string.length
  }
  if (typeof ArrayBuffer !== 'undefined' && typeof ArrayBuffer.isView === 'function' &&
      (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
    return string.byteLength
  }
  if (typeof string !== 'string') {
    string = '' + string
  }

  var len = string.length
  if (len === 0) return 0

  // Use a for loop to avoid recursion
  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'ascii':
      case 'latin1':
      case 'binary':
        return len
      case 'utf8':
      case 'utf-8':
      case undefined:
        return utf8ToBytes(string).length
      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return len * 2
      case 'hex':
        return len >>> 1
      case 'base64':
        return base64ToBytes(string).length
      default:
        if (loweredCase) return utf8ToBytes(string).length // assume utf8
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}
Buffer.byteLength = byteLength

function slowToString (encoding, start, end) {
  var loweredCase = false

  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
  // property of a typed array.

  // This behaves neither like String nor Uint8Array in that we set start/end
  // to their upper/lower bounds if the value passed is out of range.
  // undefined is handled specially as per ECMA-262 6th Edition,
  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
  if (start === undefined || start < 0) {
    start = 0
  }
  // Return early if start > this.length. Done here to prevent potential uint32
  // coercion fail below.
  if (start > this.length) {
    return ''
  }

  if (end === undefined || end > this.length) {
    end = this.length
  }

  if (end <= 0) {
    return ''
  }

  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
  end >>>= 0
  start >>>= 0

  if (end <= start) {
    return ''
  }

  if (!encoding) encoding = 'utf8'

  while (true) {
    switch (encoding) {
      case 'hex':
        return hexSlice(this, start, end)

      case 'utf8':
      case 'utf-8':
        return utf8Slice(this, start, end)

      case 'ascii':
        return asciiSlice(this, start, end)

      case 'latin1':
      case 'binary':
        return latin1Slice(this, start, end)

      case 'base64':
        return base64Slice(this, start, end)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return utf16leSlice(this, start, end)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = (encoding + '').toLowerCase()
        loweredCase = true
    }
  }
}

// The property is used by `Buffer.isBuffer` and `is-buffer` (in Safari 5-7) to detect
// Buffer instances.
Buffer.prototype._isBuffer = true

function swap (b, n, m) {
  var i = b[n]
  b[n] = b[m]
  b[m] = i
}

Buffer.prototype.swap16 = function swap16 () {
  var len = this.length
  if (len % 2 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 16-bits')
  }
  for (var i = 0; i < len; i += 2) {
    swap(this, i, i + 1)
  }
  return this
}

Buffer.prototype.swap32 = function swap32 () {
  var len = this.length
  if (len % 4 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 32-bits')
  }
  for (var i = 0; i < len; i += 4) {
    swap(this, i, i + 3)
    swap(this, i + 1, i + 2)
  }
  return this
}

Buffer.prototype.swap64 = function swap64 () {
  var len = this.length
  if (len % 8 !== 0) {
    throw new RangeError('Buffer size must be a multiple of 64-bits')
  }
  for (var i = 0; i < len; i += 8) {
    swap(this, i, i + 7)
    swap(this, i + 1, i + 6)
    swap(this, i + 2, i + 5)
    swap(this, i + 3, i + 4)
  }
  return this
}

Buffer.prototype.toString = function toString () {
  var length = this.length | 0
  if (length === 0) return ''
  if (arguments.length === 0) return utf8Slice(this, 0, length)
  return slowToString.apply(this, arguments)
}

Buffer.prototype.equals = function equals (b) {
  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
  if (this === b) return true
  return Buffer.compare(this, b) === 0
}

Buffer.prototype.inspect = function inspect () {
  var str = ''
  var max = exports.INSPECT_MAX_BYTES
  if (this.length > 0) {
    str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
    if (this.length > max) str += ' ... '
  }
  return '<Buffer ' + str + '>'
}

Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
  if (!Buffer.isBuffer(target)) {
    throw new TypeError('Argument must be a Buffer')
  }

  if (start === undefined) {
    start = 0
  }
  if (end === undefined) {
    end = target ? target.length : 0
  }
  if (thisStart === undefined) {
    thisStart = 0
  }
  if (thisEnd === undefined) {
    thisEnd = this.length
  }

  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
    throw new RangeError('out of range index')
  }

  if (thisStart >= thisEnd && start >= end) {
    return 0
  }
  if (thisStart >= thisEnd) {
    return -1
  }
  if (start >= end) {
    return 1
  }

  start >>>= 0
  end >>>= 0
  thisStart >>>= 0
  thisEnd >>>= 0

  if (this === target) return 0

  var x = thisEnd - thisStart
  var y = end - start
  var len = Math.min(x, y)

  var thisCopy = this.slice(thisStart, thisEnd)
  var targetCopy = target.slice(start, end)

  for (var i = 0; i < len; ++i) {
    if (thisCopy[i] !== targetCopy[i]) {
      x = thisCopy[i]
      y = targetCopy[i]
      break
    }
  }

  if (x < y) return -1
  if (y < x) return 1
  return 0
}

// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//
// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
  // Empty buffer means no match
  if (buffer.length === 0) return -1

  // Normalize byteOffset
  if (typeof byteOffset === 'string') {
    encoding = byteOffset
    byteOffset = 0
  } else if (byteOffset > 0x7fffffff) {
    byteOffset = 0x7fffffff
  } else if (byteOffset < -0x80000000) {
    byteOffset = -0x80000000
  }
  byteOffset = +byteOffset  // Coerce to Number.
  if (isNaN(byteOffset)) {
    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
    byteOffset = dir ? 0 : (buffer.length - 1)
  }

  // Normalize byteOffset: negative offsets start from the end of the buffer
  if (byteOffset < 0) byteOffset = buffer.length + byteOffset
  if (byteOffset >= buffer.length) {
    if (dir) return -1
    else byteOffset = buffer.length - 1
  } else if (byteOffset < 0) {
    if (dir) byteOffset = 0
    else return -1
  }

  // Normalize val
  if (typeof val === 'string') {
    val = Buffer.from(val, encoding)
  }

  // Finally, search either indexOf (if dir is true) or lastIndexOf
  if (Buffer.isBuffer(val)) {
    // Special case: looking for empty string/buffer always fails
    if (val.length === 0) {
      return -1
    }
    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
  } else if (typeof val === 'number') {
    val = val & 0xFF // Search for a byte value [0-255]
    if (Buffer.TYPED_ARRAY_SUPPORT &&
        typeof Uint8Array.prototype.indexOf === 'function') {
      if (dir) {
        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
      } else {
        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
      }
    }
    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
  }

  throw new TypeError('val must be string, number or Buffer')
}

function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
  var indexSize = 1
  var arrLength = arr.length
  var valLength = val.length

  if (encoding !== undefined) {
    encoding = String(encoding).toLowerCase()
    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
        encoding === 'utf16le' || encoding === 'utf-16le') {
      if (arr.length < 2 || val.length < 2) {
        return -1
      }
      indexSize = 2
      arrLength /= 2
      valLength /= 2
      byteOffset /= 2
    }
  }

  function read (buf, i) {
    if (indexSize === 1) {
      return buf[i]
    } else {
      return buf.readUInt16BE(i * indexSize)
    }
  }

  var i
  if (dir) {
    var foundIndex = -1
    for (i = byteOffset; i < arrLength; i++) {
      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
        if (foundIndex === -1) foundIndex = i
        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
      } else {
        if (foundIndex !== -1) i -= i - foundIndex
        foundIndex = -1
      }
    }
  } else {
    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
    for (i = byteOffset; i >= 0; i--) {
      var found = true
      for (var j = 0; j < valLength; j++) {
        if (read(arr, i + j) !== read(val, j)) {
          found = false
          break
        }
      }
      if (found) return i
    }
  }

  return -1
}

Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
  return this.indexOf(val, byteOffset, encoding) !== -1
}

Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}

Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}

function hexWrite (buf, string, offset, length) {
  offset = Number(offset) || 0
  var remaining = buf.length - offset
  if (!length) {
    length = remaining
  } else {
    length = Number(length)
    if (length > remaining) {
      length = remaining
    }
  }

  // must be an even number of digits
  var strLen = string.length
  if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')

  if (length > strLen / 2) {
    length = strLen / 2
  }
  for (var i = 0; i < length; ++i) {
    var parsed = parseInt(string.substr(i * 2, 2), 16)
    if (isNaN(parsed)) return i
    buf[offset + i] = parsed
  }
  return i
}

function utf8Write (buf, string, offset, length) {
  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
}

function asciiWrite (buf, string, offset, length) {
  return blitBuffer(asciiToBytes(string), buf, offset, length)
}

function latin1Write (buf, string, offset, length) {
  return asciiWrite(buf, string, offset, length)
}

function base64Write (buf, string, offset, length) {
  return blitBuffer(base64ToBytes(string), buf, offset, length)
}

function ucs2Write (buf, string, offset, length) {
  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
}

Buffer.prototype.write = function write (string, offset, length, encoding) {
  // Buffer#write(string)
  if (offset === undefined) {
    encoding = 'utf8'
    length = this.length
    offset = 0
  // Buffer#write(string, encoding)
  } else if (length === undefined && typeof offset === 'string') {
    encoding = offset
    length = this.length
    offset = 0
  // Buffer#write(string, offset[, length][, encoding])
  } else if (isFinite(offset)) {
    offset = offset | 0
    if (isFinite(length)) {
      length = length | 0
      if (encoding === undefined) encoding = 'utf8'
    } else {
      encoding = length
      length = undefined
    }
  // legacy write(string, encoding, offset, length) - remove in v0.13
  } else {
    throw new Error(
      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
    )
  }

  var remaining = this.length - offset
  if (length === undefined || length > remaining) length = remaining

  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
    throw new RangeError('Attempt to write outside buffer bounds')
  }

  if (!encoding) encoding = 'utf8'

  var loweredCase = false
  for (;;) {
    switch (encoding) {
      case 'hex':
        return hexWrite(this, string, offset, length)

      case 'utf8':
      case 'utf-8':
        return utf8Write(this, string, offset, length)

      case 'ascii':
        return asciiWrite(this, string, offset, length)

      case 'latin1':
      case 'binary':
        return latin1Write(this, string, offset, length)

      case 'base64':
        // Warning: maxLength not taken into account in base64Write
        return base64Write(this, string, offset, length)

      case 'ucs2':
      case 'ucs-2':
      case 'utf16le':
      case 'utf-16le':
        return ucs2Write(this, string, offset, length)

      default:
        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
        encoding = ('' + encoding).toLowerCase()
        loweredCase = true
    }
  }
}

Buffer.prototype.toJSON = function toJSON () {
  return {
    type: 'Buffer',
    data: Array.prototype.slice.call(this._arr || this, 0)
  }
}

function base64Slice (buf, start, end) {
  if (start === 0 && end === buf.length) {
    return base64.fromByteArray(buf)
  } else {
    return base64.fromByteArray(buf.slice(start, end))
  }
}

function utf8Slice (buf, start, end) {
  end = Math.min(buf.length, end)
  var res = []

  var i = start
  while (i < end) {
    var firstByte = buf[i]
    var codePoint = null
    var bytesPerSequence = (firstByte > 0xEF) ? 4
      : (firstByte > 0xDF) ? 3
      : (firstByte > 0xBF) ? 2
      : 1

    if (i + bytesPerSequence <= end) {
      var secondByte, thirdByte, fourthByte, tempCodePoint

      switch (bytesPerSequence) {
        case 1:
          if (firstByte < 0x80) {
            codePoint = firstByte
          }
          break
        case 2:
          secondByte = buf[i + 1]
          if ((secondByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
            if (tempCodePoint > 0x7F) {
              codePoint = tempCodePoint
            }
          }
          break
        case 3:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F)
            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
              codePoint = tempCodePoint
            }
          }
          break
        case 4:
          secondByte = buf[i + 1]
          thirdByte = buf[i + 2]
          fourthByte = buf[i + 3]
          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
              codePoint = tempCodePoint
            }
          }
      }
    }

    if (codePoint === null) {
      // we did not generate a valid codePoint so insert a
      // replacement char (U+FFFD) and advance only 1 byte
      codePoint = 0xFFFD
      bytesPerSequence = 1
    } else if (codePoint > 0xFFFF) {
      // encode to utf16 (surrogate pair dance)
      codePoint -= 0x10000
      res.push(codePoint >>> 10 & 0x3FF | 0xD800)
      codePoint = 0xDC00 | codePoint & 0x3FF
    }

    res.push(codePoint)
    i += bytesPerSequence
  }

  return decodeCodePointsArray(res)
}

// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000

function decodeCodePointsArray (codePoints) {
  var len = codePoints.length
  if (len <= MAX_ARGUMENTS_LENGTH) {
    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
  }

  // Decode in chunks to avoid "call stack size exceeded".
  var res = ''
  var i = 0
  while (i < len) {
    res += String.fromCharCode.apply(
      String,
      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
    )
  }
  return res
}

function asciiSlice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i] & 0x7F)
  }
  return ret
}

function latin1Slice (buf, start, end) {
  var ret = ''
  end = Math.min(buf.length, end)

  for (var i = start; i < end; ++i) {
    ret += String.fromCharCode(buf[i])
  }
  return ret
}

function hexSlice (buf, start, end) {
  var len = buf.length

  if (!start || start < 0) start = 0
  if (!end || end < 0 || end > len) end = len

  var out = ''
  for (var i = start; i < end; ++i) {
    out += toHex(buf[i])
  }
  return out
}

function utf16leSlice (buf, start, end) {
  var bytes = buf.slice(start, end)
  var res = ''
  for (var i = 0; i < bytes.length; i += 2) {
    res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256)
  }
  return res
}

Buffer.prototype.slice = function slice (start, end) {
  var len = this.length
  start = ~~start
  end = end === undefined ? len : ~~end

  if (start < 0) {
    start += len
    if (start < 0) start = 0
  } else if (start > len) {
    start = len
  }

  if (end < 0) {
    end += len
    if (end < 0) end = 0
  } else if (end > len) {
    end = len
  }

  if (end < start) end = start

  var newBuf
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    newBuf = this.subarray(start, end)
    newBuf.__proto__ = Buffer.prototype
  } else {
    var sliceLen = end - start
    newBuf = new Buffer(sliceLen, undefined)
    for (var i = 0; i < sliceLen; ++i) {
      newBuf[i] = this[i + start]
    }
  }

  return newBuf
}

/*
 * Need to make sure that buffer isn't trying to write out of bounds.
 */
function checkOffset (offset, ext, length) {
  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
}

Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }

  return val
}

Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    checkOffset(offset, byteLength, this.length)
  }

  var val = this[offset + --byteLength]
  var mul = 1
  while (byteLength > 0 && (mul *= 0x100)) {
    val += this[offset + --byteLength] * mul
  }

  return val
}

Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  return this[offset]
}

Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return this[offset] | (this[offset + 1] << 8)
}

Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  return (this[offset] << 8) | this[offset + 1]
}

Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return ((this[offset]) |
      (this[offset + 1] << 8) |
      (this[offset + 2] << 16)) +
      (this[offset + 3] * 0x1000000)
}

Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] * 0x1000000) +
    ((this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    this[offset + 3])
}

Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var val = this[offset]
  var mul = 1
  var i = 0
  while (++i < byteLength && (mul *= 0x100)) {
    val += this[offset + i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) checkOffset(offset, byteLength, this.length)

  var i = byteLength
  var mul = 1
  var val = this[offset + --i]
  while (i > 0 && (mul *= 0x100)) {
    val += this[offset + --i] * mul
  }
  mul *= 0x80

  if (val >= mul) val -= Math.pow(2, 8 * byteLength)

  return val
}

Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 1, this.length)
  if (!(this[offset] & 0x80)) return (this[offset])
  return ((0xff - this[offset] + 1) * -1)
}

Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset] | (this[offset + 1] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 2, this.length)
  var val = this[offset + 1] | (this[offset] << 8)
  return (val & 0x8000) ? val | 0xFFFF0000 : val
}

Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset]) |
    (this[offset + 1] << 8) |
    (this[offset + 2] << 16) |
    (this[offset + 3] << 24)
}

Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)

  return (this[offset] << 24) |
    (this[offset + 1] << 16) |
    (this[offset + 2] << 8) |
    (this[offset + 3])
}

Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, true, 23, 4)
}

Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 4, this.length)
  return ieee754.read(this, offset, false, 23, 4)
}

Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, true, 52, 8)
}

Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
  if (!noAssert) checkOffset(offset, 8, this.length)
  return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
}

Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var mul = 1
  var i = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  byteLength = byteLength | 0
  if (!noAssert) {
    var maxBytes = Math.pow(2, 8 * byteLength) - 1
    checkInt(this, value, offset, byteLength, maxBytes, 0)
  }

  var i = byteLength - 1
  var mul = 1
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    this[offset + i] = (value / mul) & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  this[offset] = (value & 0xff)
  return offset + 1
}

function objectWriteUInt16 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 2); i < j; ++i) {
    buf[offset + i] = (value & (0xff << (8 * (littleEndian ? i : 1 - i)))) >>>
      (littleEndian ? i : 1 - i) * 8
  }
}

Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

function objectWriteUInt32 (buf, value, offset, littleEndian) {
  if (value < 0) value = 0xffffffff + value + 1
  for (var i = 0, j = Math.min(buf.length - offset, 4); i < j; ++i) {
    buf[offset + i] = (value >>> (littleEndian ? i : 3 - i) * 8) & 0xff
  }
}

Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset + 3] = (value >>> 24)
    this[offset + 2] = (value >>> 16)
    this[offset + 1] = (value >>> 8)
    this[offset] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = 0
  var mul = 1
  var sub = 0
  this[offset] = value & 0xFF
  while (++i < byteLength && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) {
    var limit = Math.pow(2, 8 * byteLength - 1)

    checkInt(this, value, offset, byteLength, limit - 1, -limit)
  }

  var i = byteLength - 1
  var mul = 1
  var sub = 0
  this[offset + i] = value & 0xFF
  while (--i >= 0 && (mul *= 0x100)) {
    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
      sub = 1
    }
    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
  }

  return offset + byteLength
}

Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
  if (!Buffer.TYPED_ARRAY_SUPPORT) value = Math.floor(value)
  if (value < 0) value = 0xff + value + 1
  this[offset] = (value & 0xff)
  return offset + 1
}

Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
  } else {
    objectWriteUInt16(this, value, offset, true)
  }
  return offset + 2
}

Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 8)
    this[offset + 1] = (value & 0xff)
  } else {
    objectWriteUInt16(this, value, offset, false)
  }
  return offset + 2
}

Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value & 0xff)
    this[offset + 1] = (value >>> 8)
    this[offset + 2] = (value >>> 16)
    this[offset + 3] = (value >>> 24)
  } else {
    objectWriteUInt32(this, value, offset, true)
  }
  return offset + 4
}

Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
  value = +value
  offset = offset | 0
  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
  if (value < 0) value = 0xffffffff + value + 1
  if (Buffer.TYPED_ARRAY_SUPPORT) {
    this[offset] = (value >>> 24)
    this[offset + 1] = (value >>> 16)
    this[offset + 2] = (value >>> 8)
    this[offset + 3] = (value & 0xff)
  } else {
    objectWriteUInt32(this, value, offset, false)
  }
  return offset + 4
}

function checkIEEE754 (buf, value, offset, ext, max, min) {
  if (offset + ext > buf.length) throw new RangeError('Index out of range')
  if (offset < 0) throw new RangeError('Index out of range')
}

function writeFloat (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38)
  }
  ieee754.write(buf, value, offset, littleEndian, 23, 4)
  return offset + 4
}

Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
  return writeFloat(this, value, offset, true, noAssert)
}

Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
  return writeFloat(this, value, offset, false, noAssert)
}

function writeDouble (buf, value, offset, littleEndian, noAssert) {
  if (!noAssert) {
    checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308, -1.7976931348623157E+308)
  }
  ieee754.write(buf, value, offset, littleEndian, 52, 8)
  return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
  return writeDouble(this, value, offset, true, noAssert)
}

Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
  return writeDouble(this, value, offset, false, noAssert)
}

// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
  if (!start) start = 0
  if (!end && end !== 0) end = this.length
  if (targetStart >= target.length) targetStart = target.length
  if (!targetStart) targetStart = 0
  if (end > 0 && end < start) end = start

  // Copy 0 bytes; we're done
  if (end === start) return 0
  if (target.length === 0 || this.length === 0) return 0

  // Fatal error conditions
  if (targetStart < 0) {
    throw new RangeError('targetStart out of bounds')
  }
  if (start < 0 || start >= this.length) throw new RangeError('sourceStart out of bounds')
  if (end < 0) throw new RangeError('sourceEnd out of bounds')

  // Are we oob?
  if (end > this.length) end = this.length
  if (target.length - targetStart < end - start) {
    end = target.length - targetStart + start
  }

  var len = end - start
  var i

  if (this === target && start < targetStart && targetStart < end) {
    // descending copy from end
    for (i = len - 1; i >= 0; --i) {
      target[i + targetStart] = this[i + start]
    }
  } else if (len < 1000 || !Buffer.TYPED_ARRAY_SUPPORT) {
    // ascending copy from start
    for (i = 0; i < len; ++i) {
      target[i + targetStart] = this[i + start]
    }
  } else {
    Uint8Array.prototype.set.call(
      target,
      this.subarray(start, start + len),
      targetStart
    )
  }

  return len
}

// Usage:
//    buffer.fill(number[, offset[, end]])
//    buffer.fill(buffer[, offset[, end]])
//    buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
  // Handle string cases:
  if (typeof val === 'string') {
    if (typeof start === 'string') {
      encoding = start
      start = 0
      end = this.length
    } else if (typeof end === 'string') {
      encoding = end
      end = this.length
    }
    if (val.length === 1) {
      var code = val.charCodeAt(0)
      if (code < 256) {
        val = code
      }
    }
    if (encoding !== undefined && typeof encoding !== 'string') {
      throw new TypeError('encoding must be a string')
    }
    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
      throw new TypeError('Unknown encoding: ' + encoding)
    }
  } else if (typeof val === 'number') {
    val = val & 255
  }

  // Invalid ranges are not set to a default, so can range check early.
  if (start < 0 || this.length < start || this.length < end) {
    throw new RangeError('Out of range index')
  }

  if (end <= start) {
    return this
  }

  start = start >>> 0
  end = end === undefined ? this.length : end >>> 0

  if (!val) val = 0

  var i
  if (typeof val === 'number') {
    for (i = start; i < end; ++i) {
      this[i] = val
    }
  } else {
    var bytes = Buffer.isBuffer(val)
      ? val
      : utf8ToBytes(new Buffer(val, encoding).toString())
    var len = bytes.length
    for (i = 0; i < end - start; ++i) {
      this[i + start] = bytes[i % len]
    }
  }

  return this
}

// HELPER FUNCTIONS
// ================

var INVALID_BASE64_RE = /[^+\/0-9A-Za-z-_]/g

function base64clean (str) {
  // Node strips out invalid characters like \n and \t from the string, base64-js does not
  str = stringtrim(str).replace(INVALID_BASE64_RE, '')
  // Node converts strings with length < 2 to ''
  if (str.length < 2) return ''
  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
  while (str.length % 4 !== 0) {
    str = str + '='
  }
  return str
}

function stringtrim (str) {
  if (str.trim) return str.trim()
  return str.replace(/^\s+|\s+$/g, '')
}

function toHex (n) {
  if (n < 16) return '0' + n.toString(16)
  return n.toString(16)
}

function utf8ToBytes (string, units) {
  units = units || Infinity
  var codePoint
  var length = string.length
  var leadSurrogate = null
  var bytes = []

  for (var i = 0; i < length; ++i) {
    codePoint = string.charCodeAt(i)

    // is surrogate component
    if (codePoint > 0xD7FF && codePoint < 0xE000) {
      // last char was a lead
      if (!leadSurrogate) {
        // no lead yet
        if (codePoint > 0xDBFF) {
          // unexpected trail
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        } else if (i + 1 === length) {
          // unpaired lead
          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
          continue
        }

        // valid lead
        leadSurrogate = codePoint

        continue
      }

      // 2 leads in a row
      if (codePoint < 0xDC00) {
        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
        leadSurrogate = codePoint
        continue
      }

      // valid surrogate pair
      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
    } else if (leadSurrogate) {
      // valid bmp char, but last char was a lead
      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
    }

    leadSurrogate = null

    // encode utf8
    if (codePoint < 0x80) {
      if ((units -= 1) < 0) break
      bytes.push(codePoint)
    } else if (codePoint < 0x800) {
      if ((units -= 2) < 0) break
      bytes.push(
        codePoint >> 0x6 | 0xC0,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x10000) {
      if ((units -= 3) < 0) break
      bytes.push(
        codePoint >> 0xC | 0xE0,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else if (codePoint < 0x110000) {
      if ((units -= 4) < 0) break
      bytes.push(
        codePoint >> 0x12 | 0xF0,
        codePoint >> 0xC & 0x3F | 0x80,
        codePoint >> 0x6 & 0x3F | 0x80,
        codePoint & 0x3F | 0x80
      )
    } else {
      throw new Error('Invalid code point')
    }
  }

  return bytes
}

function asciiToBytes (str) {
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    // Node's code seems to be doing this and not & 0x7F..
    byteArray.push(str.charCodeAt(i) & 0xFF)
  }
  return byteArray
}

function utf16leToBytes (str, units) {
  var c, hi, lo
  var byteArray = []
  for (var i = 0; i < str.length; ++i) {
    if ((units -= 2) < 0) break

    c = str.charCodeAt(i)
    hi = c >> 8
    lo = c % 256
    byteArray.push(lo)
    byteArray.push(hi)
  }

  return byteArray
}

function base64ToBytes (str) {
  return base64.toByteArray(base64clean(str))
}

function blitBuffer (src, dst, offset, length) {
  for (var i = 0; i < length; ++i) {
    if ((i + offset >= dst.length) || (i >= src.length)) break
    dst[i + offset] = src[i]
  }
  return i
}

function isnan (val) {
  return val !== val // eslint-disable-line no-self-compare
}

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/setimmediate/setImmediate.js":
/*!***************************************************!*\
  !*** ./node_modules/setimmediate/setImmediate.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global, process) {(function (global, undefined) {
    "use strict";

    if (global.setImmediate) {
        return;
    }

    var nextHandle = 1; // Spec says greater than zero
    var tasksByHandle = {};
    var currentlyRunningATask = false;
    var doc = global.document;
    var registerImmediate;

    function setImmediate(callback) {
      // Callback can either be a function or a string
      if (typeof callback !== "function") {
        callback = new Function("" + callback);
      }
      // Copy function arguments
      var args = new Array(arguments.length - 1);
      for (var i = 0; i < args.length; i++) {
          args[i] = arguments[i + 1];
      }
      // Store and register the task
      var task = { callback: callback, args: args };
      tasksByHandle[nextHandle] = task;
      registerImmediate(nextHandle);
      return nextHandle++;
    }

    function clearImmediate(handle) {
        delete tasksByHandle[handle];
    }

    function run(task) {
        var callback = task.callback;
        var args = task.args;
        switch (args.length) {
        case 0:
            callback();
            break;
        case 1:
            callback(args[0]);
            break;
        case 2:
            callback(args[0], args[1]);
            break;
        case 3:
            callback(args[0], args[1], args[2]);
            break;
        default:
            callback.apply(undefined, args);
            break;
        }
    }

    function runIfPresent(handle) {
        // From the spec: "Wait until any invocations of this algorithm started before this one have completed."
        // So if we're currently running a task, we'll need to delay this invocation.
        if (currentlyRunningATask) {
            // Delay by doing a setTimeout. setImmediate was tried instead, but in Firefox 7 it generated a
            // "too much recursion" error.
            setTimeout(runIfPresent, 0, handle);
        } else {
            var task = tasksByHandle[handle];
            if (task) {
                currentlyRunningATask = true;
                try {
                    run(task);
                } finally {
                    clearImmediate(handle);
                    currentlyRunningATask = false;
                }
            }
        }
    }

    function installNextTickImplementation() {
        registerImmediate = function(handle) {
            process.nextTick(function () { runIfPresent(handle); });
        };
    }

    function canUsePostMessage() {
        // The test against `importScripts` prevents this implementation from being installed inside a web worker,
        // where `global.postMessage` means something completely different and can't be used for this purpose.
        if (global.postMessage && !global.importScripts) {
            var postMessageIsAsynchronous = true;
            var oldOnMessage = global.onmessage;
            global.onmessage = function() {
                postMessageIsAsynchronous = false;
            };
            global.postMessage("", "*");
            global.onmessage = oldOnMessage;
            return postMessageIsAsynchronous;
        }
    }

    function installPostMessageImplementation() {
        // Installs an event handler on `global` for the `message` event: see
        // * https://developer.mozilla.org/en/DOM/window.postMessage
        // * http://www.whatwg.org/specs/web-apps/current-work/multipage/comms.html#crossDocumentMessages

        var messagePrefix = "setImmediate$" + Math.random() + "$";
        var onGlobalMessage = function(event) {
            if (event.source === global &&
                typeof event.data === "string" &&
                event.data.indexOf(messagePrefix) === 0) {
                runIfPresent(+event.data.slice(messagePrefix.length));
            }
        };

        if (global.addEventListener) {
            global.addEventListener("message", onGlobalMessage, false);
        } else {
            global.attachEvent("onmessage", onGlobalMessage);
        }

        registerImmediate = function(handle) {
            global.postMessage(messagePrefix + handle, "*");
        };
    }

    function installMessageChannelImplementation() {
        var channel = new MessageChannel();
        channel.port1.onmessage = function(event) {
            var handle = event.data;
            runIfPresent(handle);
        };

        registerImmediate = function(handle) {
            channel.port2.postMessage(handle);
        };
    }

    function installReadyStateChangeImplementation() {
        var html = doc.documentElement;
        registerImmediate = function(handle) {
            // Create a <script> element; its readystatechange event will be fired asynchronously once it is inserted
            // into the document. Do so, thus queuing up the task. Remember to clean up once it's been called.
            var script = doc.createElement("script");
            script.onreadystatechange = function () {
                runIfPresent(handle);
                script.onreadystatechange = null;
                html.removeChild(script);
                script = null;
            };
            html.appendChild(script);
        };
    }

    function installSetTimeoutImplementation() {
        registerImmediate = function(handle) {
            setTimeout(runIfPresent, 0, handle);
        };
    }

    // If supported, we should attach to the prototype of global, since that is where setTimeout et al. live.
    var attachTo = Object.getPrototypeOf && Object.getPrototypeOf(global);
    attachTo = attachTo && attachTo.setTimeout ? attachTo : global;

    // Don't get fooled by e.g. browserify environments.
    if ({}.toString.call(global.process) === "[object process]") {
        // For Node.js before 0.9
        installNextTickImplementation();

    } else if (canUsePostMessage()) {
        // For non-IE10 modern browsers
        installPostMessageImplementation();

    } else if (global.MessageChannel) {
        // For web workers, where supported
        installMessageChannelImplementation();

    } else if (doc && "onreadystatechange" in doc.createElement("script")) {
        // For IE 6–8
        installReadyStateChangeImplementation();

    } else {
        // For older browsers
        installSetTimeoutImplementation();
    }

    attachTo.setImmediate = setImmediate;
    attachTo.clearImmediate = clearImmediate;
}(typeof self === "undefined" ? typeof global === "undefined" ? this : global : self));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js"), __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/timers-browserify/main.js":
/*!************************************************!*\
  !*** ./node_modules/timers-browserify/main.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var scope = (typeof global !== "undefined" && global) ||
            (typeof self !== "undefined" && self) ||
            window;
var apply = Function.prototype.apply;

// DOM APIs, for completeness

exports.setTimeout = function() {
  return new Timeout(apply.call(setTimeout, scope, arguments), clearTimeout);
};
exports.setInterval = function() {
  return new Timeout(apply.call(setInterval, scope, arguments), clearInterval);
};
exports.clearTimeout =
exports.clearInterval = function(timeout) {
  if (timeout) {
    timeout.close();
  }
};

function Timeout(id, clearFn) {
  this._id = id;
  this._clearFn = clearFn;
}
Timeout.prototype.unref = Timeout.prototype.ref = function() {};
Timeout.prototype.close = function() {
  this._clearFn.call(scope, this._id);
};

// Does not start the time, just sets up the members needed.
exports.enroll = function(item, msecs) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = msecs;
};

exports.unenroll = function(item) {
  clearTimeout(item._idleTimeoutId);
  item._idleTimeout = -1;
};

exports._unrefActive = exports.active = function(item) {
  clearTimeout(item._idleTimeoutId);

  var msecs = item._idleTimeout;
  if (msecs >= 0) {
    item._idleTimeoutId = setTimeout(function onTimeout() {
      if (item._onTimeout)
        item._onTimeout();
    }, msecs);
  }
};

// setimmediate attaches itself to the global object
__webpack_require__(/*! setimmediate */ "./node_modules/setimmediate/setImmediate.js");
// On some exotic environments, it's not clear which object `setimmediate` was
// able to install onto.  Search each possibility in the same order as the
// `setimmediate` library.
exports.setImmediate = (typeof self !== "undefined" && self.setImmediate) ||
                       (typeof global !== "undefined" && global.setImmediate) ||
                       (this && this.setImmediate);
exports.clearImmediate = (typeof self !== "undefined" && self.clearImmediate) ||
                         (typeof global !== "undefined" && global.clearImmediate) ||
                         (this && this.clearImmediate);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/BagReader.js":
/*!**************************!*\
  !*** ./src/BagReader.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BagReader; });
/* harmony import */ var _header__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./header */ "./src/header.js");
/* harmony import */ var _nmerge__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./nmerge */ "./src/nmerge.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./record */ "./src/record.js");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




const HEADER_READAHEAD = 4096;
const HEADER_OFFSET = 13; // BagReader is a lower level interface for reading specific sections & chunks
// from a rosbag file - generally it is consumed through the Bag class, but
// can be useful to use directly for efficiently accessing raw pieces from
// within the bag

class BagReader {
  constructor(filelike) {
    _defineProperty(this, "_lastReadResult", void 0);

    _defineProperty(this, "_file", void 0);

    _defineProperty(this, "_lastChunkInfo", void 0);

    this._file = filelike;
    this._lastChunkInfo = undefined;
  }

  verifyBagHeader(callback, next) {
    this._file.read(0, HEADER_OFFSET, (error, buffer) => {
      if (error || !buffer) {
        return callback(error || new Error("Missing both error and buffer"));
      }

      if (this._file.size() < HEADER_OFFSET) {
        return callback(new Error("Missing file header."));
      }

      if (buffer.toString() !== "#ROSBAG V2.0\n") {
        return callback(new Error("Cannot identify bag format."));
      }

      next();
    });
  } // reads the header block from the rosbag file
  // generally you call this first
  // because you need the header information to call readConnectionsAndChunkInfo


  readHeader(callback) {
    this.verifyBagHeader(callback, () => {
      return this._file.read(HEADER_OFFSET, HEADER_READAHEAD, (error, buffer) => {
        if (error || !buffer) {
          return callback(error || new Error("Missing both error and buffer"));
        }

        const read = buffer.length;

        if (read < 8) {
          return callback(new Error(`Record at position ${HEADER_OFFSET} is truncated.`));
        }

        const headerLength = buffer.readInt32LE(0);

        if (read < headerLength + 8) {
          return callback(new Error(`Record at position ${HEADER_OFFSET} header too large: ${headerLength}.`));
        }

        const header = this.readRecordFromBuffer(buffer, HEADER_OFFSET, _record__WEBPACK_IMPORTED_MODULE_2__["BagHeader"]);
        return callback(null, header);
      });
    });
  } // promisified version of readHeader


  readHeaderAsync() {
    return new Promise((resolve, reject) => this.readHeader((err, header) => err || !header ? reject(err) : resolve(header)));
  } // reads connection and chunk information from the bag
  // you'll generally call this after reading the header so you can get
  // connection metadata and chunkInfos which allow you to seek to individual
  // chunks & read them


  readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, callback) {
    this._file.read(fileOffset, this._file.size() - fileOffset, (err, buffer) => {
      if (err || !buffer) {
        return callback(err || new Error("Missing both error and buffer"));
      }

      if (connectionCount === 0) {
        return callback(null, {
          connections: [],
          chunkInfos: []
        });
      }

      const connections = this.readRecordsFromBuffer(buffer, connectionCount, fileOffset, _record__WEBPACK_IMPORTED_MODULE_2__["Connection"]);
      const connectionBlockLength = connections[connectionCount - 1].end - connections[0].offset;
      const chunkInfos = this.readRecordsFromBuffer(buffer.slice(connectionBlockLength), chunkCount, fileOffset + connectionBlockLength, _record__WEBPACK_IMPORTED_MODULE_2__["ChunkInfo"]);

      if (chunkCount > 0) {
        for (let i = 0; i < chunkCount - 1; i++) {
          chunkInfos[i].nextChunk = chunkInfos[i + 1];
        }

        chunkInfos[chunkCount - 1].nextChunk = null;
      }

      return callback(null, {
        connections,
        chunkInfos
      });
    });
  } // promisified version of readConnectionsAndChunkInfo


  readConnectionsAndChunkInfoAsync(fileOffset, connectionCount, chunkCount) {
    return new Promise((resolve, reject) => {
      this.readConnectionsAndChunkInfo(fileOffset, connectionCount, chunkCount, (err, result) => err || !result ? reject(err) : resolve(result));
    });
  } // read individual raw messages from the bag at a given chunk
  // filters to a specific set of connection ids, start time, & end time
  // generally the records will be of type MessageData


  readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, callback) {
    const start = startTime || {
      sec: 0,
      nsec: 0
    };
    const end = endTime || {
      sec: Number.MAX_VALUE,
      nsec: Number.MAX_VALUE
    };
    const conns = connections || chunkInfo.connections.map(connection => {
      return connection.conn;
    });
    this.readChunk(chunkInfo, decompress, (error, result) => {
      if (error || !result) {
        return callback(error || new Error("Missing both error and result"));
      }

      const chunk = result.chunk;
      const indices = {};
      result.indices.forEach(index => {
        indices[index.conn] = index;
      });
      const presentConnections = conns.filter(conn => {
        return indices[conn] !== undefined;
      });
      const iterables = presentConnections.map(conn => {
        // $FlowFixMe https://github.com/facebook/flow/issues/1163
        return indices[conn].indices[Symbol.iterator]();
      });
      const iter = Object(_nmerge__WEBPACK_IMPORTED_MODULE_1__["default"])((a, b) => _TimeUtil__WEBPACK_IMPORTED_MODULE_3__["compare"](a.time, b.time), ...iterables);
      const entries = [];
      let item = iter.next();

      while (!item.done) {
        const {
          value
        } = item;
        item = iter.next();

        if (!value || _TimeUtil__WEBPACK_IMPORTED_MODULE_3__["isGreaterThan"](start, value.time)) {
          continue;
        }

        if (_TimeUtil__WEBPACK_IMPORTED_MODULE_3__["isGreaterThan"](value.time, end)) {
          break;
        }

        entries.push(value);
      }

      const messages = entries.map(entry => {
        return this.readRecordFromBuffer(chunk.data.slice(entry.offset), chunk.dataOffset, _record__WEBPACK_IMPORTED_MODULE_2__["MessageData"]);
      });
      return callback(null, messages);
    });
  } // promisified version of readChunkMessages


  readChunkMessagesAsync(chunkInfo, connections, startTime, endTime, decompress) {
    return new Promise((resolve, reject) => {
      this.readChunkMessages(chunkInfo, connections, startTime, endTime, decompress, (err, messages) => err || !messages ? reject(err) : resolve(messages));
    });
  } // reads a single chunk record && its index records given a chunkInfo


  readChunk(chunkInfo, decompress, callback) {
    // if we're reading the same chunk a second time return the cached version
    // to avoid doing decompression on the same chunk multiple times which is
    // expensive
    if (chunkInfo === this._lastChunkInfo && this._lastReadResult) {
      // always callback async, even if we have the result
      // https://oren.github.io/blog/zalgo.html
      const lastReadResult = this._lastReadResult;
      return setImmediate(() => callback(null, lastReadResult));
    }

    const {
      nextChunk
    } = chunkInfo;
    const readLength = nextChunk ? nextChunk.chunkPosition - chunkInfo.chunkPosition : this._file.size() - chunkInfo.chunkPosition;

    this._file.read(chunkInfo.chunkPosition, readLength, (err, buffer) => {
      if (err || !buffer) {
        return callback(err || new Error("Missing both error and buffer"));
      }

      const chunk = this.readRecordFromBuffer(buffer, chunkInfo.chunkPosition, _record__WEBPACK_IMPORTED_MODULE_2__["Chunk"]);
      const {
        compression
      } = chunk;

      if (compression !== "none") {
        const decompressFn = decompress[compression];

        if (!decompressFn) {
          return callback(new Error(`Unsupported compression type ${chunk.compression}`));
        }

        const result = decompressFn(chunk.data, chunk.size);
        chunk.data = result;
      }

      const indices = this.readRecordsFromBuffer(buffer.slice(chunk.length), chunkInfo.count, chunkInfo.chunkPosition + chunk.length, _record__WEBPACK_IMPORTED_MODULE_2__["IndexData"]);
      this._lastChunkInfo = chunkInfo;
      this._lastReadResult = {
        chunk,
        indices
      };
      return callback(null, this._lastReadResult);
    });
  } // reads count records from a buffer starting at fileOffset


  readRecordsFromBuffer(buffer, count, fileOffset, cls) {
    const records = [];
    let bufferOffset = 0;

    for (let i = 0; i < count; i++) {
      const record = this.readRecordFromBuffer(buffer.slice(bufferOffset), fileOffset + bufferOffset, cls);
      bufferOffset += record.end - record.offset;
      records.push(record);
    }

    return records;
  } // read an individual record from a buffer


  readRecordFromBuffer(buffer, fileOffset, cls) {
    const headerLength = buffer.readInt32LE(0);
    const record = Object(_header__WEBPACK_IMPORTED_MODULE_0__["parseHeader"])(buffer.slice(4, 4 + headerLength), cls);
    const dataOffset = 4 + headerLength + 4;
    const dataLength = buffer.readInt32LE(4 + headerLength);
    const data = buffer.slice(dataOffset, dataOffset + dataLength);
    record.parseData(data);
    record.offset = fileOffset;
    record.dataOffset = record.offset + 4 + headerLength + 4;
    record.end = record.dataOffset + dataLength;
    record.length = record.end - record.offset;
    return record;
  }

}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ }),

/***/ "./src/MessageReader.js":
/*!******************************!*\
  !*** ./src/MessageReader.js ***!
  \******************************/
/*! exports provided: MessageReader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return MessageReader; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




// this has hard-coded buffer reading functions for each
// of the standard message types http://docs.ros.org/api/std_msgs/html/index-msg.html
// eventually custom types decompose into these standard types
class StandardTypeReader {
  constructor(buffer) {
    _defineProperty(this, "buffer", void 0);

    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "view", void 0);

    this.buffer = buffer;
    this.offset = 0;
    this.view = new DataView(buffer.buffer, buffer.byteOffset);
  }

  string() {
    const len = this.int32();
    const codePoints = new Uint8Array(this.buffer.buffer, this.buffer.byteOffset + this.offset, len);
    this.offset += len; // if the string is relatively short we can use apply
    // but very long strings can cause a stack overflow due to too many arguments
    // in those cases revert to a slower itterative string building approach

    if (codePoints.length < 1000) {
      return String.fromCharCode.apply(null, codePoints);
    }

    let data = "";

    for (let i = 0; i < len; i++) {
      data += String.fromCharCode(codePoints[i]);
    }

    return data;
  }

  bool() {
    return this.uint8() !== 0;
  }

  int8() {
    return this.view.getInt8(this.offset++);
  }

  uint8() {
    return this.view.getUint8(this.offset++);
  }

  typedArray(len, arrayType) {
    const arrayLength = len == null ? this.uint32() : len;
    const data = new arrayType(this.view.buffer, this.offset + this.view.byteOffset, arrayLength);
    this.offset += arrayLength;
    return data;
  }

  int16() {
    const result = this.view.getInt16(this.offset, true);
    this.offset += 2;
    return result;
  }

  uint16() {
    const result = this.view.getUint16(this.offset, true);
    this.offset += 2;
    return result;
  }

  int32() {
    const result = this.view.getInt32(this.offset, true);
    this.offset += 4;
    return result;
  }

  uint32() {
    const result = this.view.getUint32(this.offset, true);
    this.offset += 4;
    return result;
  }

  float32() {
    const result = this.view.getFloat32(this.offset, true);
    this.offset += 4;
    return result;
  }

  float64() {
    const result = this.view.getFloat64(this.offset, true);
    this.offset += 8;
    return result;
  }

  int64() {
    const offset = this.offset;
    this.offset += 8;
    return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readInt64LE(this.buffer, offset);
  }

  uint64() {
    const offset = this.offset;
    this.offset += 8;
    return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readUInt64LE(this.buffer, offset);
  }

  time() {
    const offset = this.offset;
    this.offset += 8;
    return Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(this.buffer, offset);
  }

  duration() {
    const offset = this.offset;
    this.offset += 8;
    return Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(this.buffer, offset);
  }

}

const findTypeByName = (types, name = "") => {
  let foundName = ""; // track name separately in a non-null variable to appease Flow

  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;

    if (typeName.endsWith(nameEnd)) {
      foundName = typeName;
      return true;
    }

    return false;
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
  }

  return { ...matches[0],
    name: foundName
  };
};

const constructorBody = type => {
  return type.definitions.filter(def => !def.isConstant).map(def => {
    return `this.${def.name} = undefined`;
  }).join(";\n");
};

const friendlyName = name => name.replace("/", "_");

const createParser = types => {
  const unnamedTypes = types.filter(type => !type.name);

  if (unnamedTypes.length !== 1) {
    throw new Error("multiple unnamed types");
  }

  const [unnamedType] = unnamedTypes;
  const namedTypes = types.filter(type => !!type.name);
  let js = `
  var Record = function () {
    ${constructorBody(unnamedType)}
  };\n`;
  namedTypes.forEach(t => {
    js += `
Record.${friendlyName(t.name)} = function() {
  ${constructorBody(t)}
};\n`;
  });
  let stack = 0;

  const getReaderLines = (type, fieldName = "record") => {
    let readerLines = [];
    type.definitions.forEach(def => {
      if (def.isConstant) {
        return;
      }

      if (def.isArray) {
        if (def.type === "uint8" || def.type === "int8") {
          const arrayType = def.type === "uint8" ? "Uint8Array" : "Int8Array";
          readerLines.push(`${fieldName}.${def.name} = reader.typedArray(${String(def.arrayLength)}, ${arrayType});`);
          return;
        } // because we might have nested arrays
        // we need to incrementally number varaibles so they aren't
        // stomped on by other variables in the function


        stack++; // name for the length field in the for-loop

        const lenField = `length_${stack}`; // name for a child collection

        const childName = `cplx_${stack}`; // name to the itterator in the for-loop

        const incName = `${childName}_inc_${stack}`; // set a variable pointing to the parsed fixed array length
        // or read the byte indicating the dynamic length

        readerLines.push(`var ${lenField} = ${def.arrayLength ? def.arrayLength : "reader.uint32();"}`); // only allocate an array if there is a length - skips empty allocations

        const arrayName = `${fieldName}.${def.name}`; // allocate the new array to a fixed length since we know it ahead of time

        readerLines.push(`${arrayName} = new Array(${lenField})`); // start the for-loop

        readerLines.push(`for (var ${incName} = 0; ${incName} < ${lenField}; ${incName}++) {`); // if the sub type is complex we need to allocate it and parse its values

        if (def.isComplex) {
          const defType = findTypeByName(types, def.type);
          readerLines.push(`var ${childName} = new Record.${friendlyName(defType.name)}();`); // recursively generate the parse instructions for the sub-type

          readerLines = readerLines.concat(getReaderLines(defType, `${childName}`));
          readerLines.push(`${arrayName}[${incName}] = ${childName}`);
        } else {
          // if the subtype is not complex its a simple low-level reader operation
          readerLines.push(`${arrayName}[${incName}] = reader.${def.type}();`);
        }

        readerLines.push("}"); // close the for-loop
      } else if (def.isComplex) {
        const defType = findTypeByName(types, def.type);
        readerLines.push(`${fieldName}.${def.name} = new Record.${friendlyName(defType.name)}();`);
        readerLines = readerLines.concat(getReaderLines(defType, `${fieldName}.${def.name}`));
      } else {
        readerLines.push(`${fieldName}.${def.name} = reader.${def.type}();`);
      }
    });
    return readerLines;
  };

  const lines = getReaderLines(unnamedType).join("\n");
  const readerFn = `
  return function read(reader) {
    var record = new Record();
    ${lines}
    return record;
  };`;
  js += readerFn;

  let _read;

  try {
    _read = eval(`(function buildReader() { ${js} })()`);
  } catch (e) {
    console.error("error building parser:", js); // eslint-disable-line

    throw e;
  }

  return function (buffer) {
    const reader = new StandardTypeReader(buffer);
    return _read(reader);
  };
};

class MessageReader {
  // takes a multi-line string message definition and returns
  // a message reader which can be used to read messages based
  // on the message definition
  constructor(messageDefinition) {
    _defineProperty(this, "reader", void 0);

    const definitions = Object(_parseMessageDefinition__WEBPACK_IMPORTED_MODULE_2__["parseMessageDefinition"])(messageDefinition);
    this.reader = createParser(definitions);
  }

  readMessage(buffer) {
    return this.reader(buffer);
  }

}

/***/ }),

/***/ "./src/ReadResult.js":
/*!***************************!*\
  !*** ./src/ReadResult.js ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return ReadResult; });
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// represents a result passed to the callback from the high-level call:
// bag.readMessages({ opts: any }, callback: (ReadResult) => void) => Promise<void>
class ReadResult {
  constructor(topic, message, timestamp, data, chunkOffset, totalChunks) {
    _defineProperty(this, "topic", void 0);

    _defineProperty(this, "message", void 0);

    _defineProperty(this, "timestamp", void 0);

    _defineProperty(this, "data", void 0);

    _defineProperty(this, "chunkOffset", void 0);

    _defineProperty(this, "totalChunks", void 0);

    // string: the topic the message was on
    this.topic = topic; // any: the parsed body of the message based on connection.messageDefinition

    this.message = message; // time: the timestamp of the message

    this.timestamp = timestamp; // buffer: raw buffer data of the message

    this.data = data; // the offset of the currently read chunk

    this.chunkOffset = chunkOffset; // the total number of chunks in the read operation

    this.totalChunks = totalChunks;
  }

}

/***/ }),

/***/ "./src/TimeUtil.js":
/*!*************************!*\
  !*** ./src/TimeUtil.js ***!
  \*************************/
/*! exports provided: fromDate, toDate, compare, isLessThan, isGreaterThan, areSame, add */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "fromDate", function() { return fromDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "toDate", function() { return toDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compare", function() { return compare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isLessThan", function() { return isLessThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isGreaterThan", function() { return isGreaterThan; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "areSame", function() { return areSame; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "add", function() { return add; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
function fromDate(date) {
  const sec = Math.floor(date.getTime() / 1000);
  const nsec = date.getMilliseconds() * 1e6;
  return {
    sec,
    nsec
  };
}
function toDate(time) {
  return new Date(time.sec * 1e3 + time.nsec / 1e6);
} // compare two times, returning a negative value if the right is greater
// or a positive value if the left is greater or 0 if the times are equal
// useful to supply to Array.prototype.sort

function compare(left, right) {
  const secDiff = left.sec - right.sec;
  return secDiff || left.nsec - right.nsec;
} // returns true if the left time is less than the right time, otherwise false

function isLessThan(left, right) {
  return this.compare(left, right) < 0;
} // returns true if the left time is greater than the right time, otherwise false

function isGreaterThan(left, right) {
  return this.compare(left, right) > 0;
} // returns true if both times have the same number of seconds and nanoseconds

function areSame(left, right) {
  return left.sec === right.sec && left.nsec === right.nsec;
}

function toString(time) {
  return `{${time.sec}, ${time.nsec}}`;
} // computes the sum of two times or durations and returns a new time
// throws an exception if the resulting time is negative


function add(left, right) {
  const durationNanos = left.nsec + right.nsec;
  const secsFromNanos = Math.floor(durationNanos / 1e9);
  const newSecs = left.sec + right.sec + secsFromNanos;
  const remainingDurationNanos = durationNanos % 1e9; // use Math.abs here to prevent -0 when there is exactly 1 second of negative nanoseconds passed in

  const newNanos = Math.abs(Math.sign(remainingDurationNanos) === -1 ? 1e9 + remainingDurationNanos : remainingDurationNanos);
  const result = {
    sec: newSecs,
    nsec: newNanos
  };

  if (result.sec < 0 || result.nsec < 0) {
    throw new Error(`Invalid time: ${toString(result)} produced from TimeUtil.add(${toString(left)}, ${toString(right)}})`);
  }

  return result;
}

/***/ }),

/***/ "./src/bag.js":
/*!********************!*\
  !*** ./src/bag.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Bag; });
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.js");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
/* harmony import */ var _ReadResult__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ReadResult */ "./src/ReadResult.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./record */ "./src/record.js");
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.





// the high level rosbag interface
// create a new bag by calling:
// `const bag = await Bag.open('./path-to-file.bag')` in node or
// `const bag = await Bag.open(files[0])` in the browser
//
// after that you can consume messages by calling
// `await bag.readMessages({ topics: ['/foo'] },
//    (result) => console.log(result.topic, result.message))`
class Bag {
  // you can optionally create a bag manually passing in a bagReader instance
  constructor(bagReader) {
    _defineProperty(this, "reader", void 0);

    _defineProperty(this, "header", void 0);

    _defineProperty(this, "connections", void 0);

    _defineProperty(this, "chunkInfos", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "endTime", void 0);

    this.reader = bagReader;
  } // eslint-disable-next-line no-unused-vars


  // if the bag is manually created with the constructor, you must call `await open()` on the bag
  // generally this is called for you if you're using `const bag = await Bag.open()`
  async open() {
    this.header = await this.reader.readHeaderAsync();
    const {
      connectionCount,
      chunkCount,
      indexPosition
    } = this.header;
    const result = await this.reader.readConnectionsAndChunkInfoAsync(indexPosition, connectionCount, chunkCount);
    this.connections = {};
    result.connections.forEach(connection => {
      this.connections[connection.conn] = connection;
    });
    this.chunkInfos = result.chunkInfos;

    if (chunkCount > 0) {
      this.startTime = this.chunkInfos[0].startTime;
      this.endTime = this.chunkInfos[chunkCount - 1].endTime;
    }
  }

  async readMessages(opts, callback) {
    const connections = this.connections;
    const startTime = opts.startTime || {
      sec: 0,
      nsec: 0
    };
    const endTime = opts.endTime || {
      sec: Number.MAX_VALUE,
      nsec: Number.MAX_VALUE
    };
    const topics = opts.topics || Object.keys(connections).map(id => {
      return connections[id].topic;
    });
    const filteredConnections = Object.keys(connections).filter(id => {
      return topics.indexOf(connections[id].topic) !== -1;
    }).map(id => +id);
    const {
      decompress = {}
    } = opts; // filter chunks to those which fall within the time range we're attempting to read

    const chunkInfos = this.chunkInfos.filter(info => {
      return _TimeUtil__WEBPACK_IMPORTED_MODULE_4__["compare"](info.startTime, endTime) <= 0 && _TimeUtil__WEBPACK_IMPORTED_MODULE_4__["compare"](startTime, info.endTime) <= 0;
    });

    function parseMsg(msg, chunkOffset) {
      const connection = connections[msg.conn];
      const {
        topic
      } = connection;
      const {
        data,
        time: timestamp
      } = msg;
      let message = null;

      if (!opts.noParse) {
        // lazily create a reader for this connection if it doesn't exist
        connection.reader = connection.reader || new _MessageReader__WEBPACK_IMPORTED_MODULE_1__["MessageReader"](connection.messageDefinition);
        message = connection.reader.readMessage(data);
      }

      return new _ReadResult__WEBPACK_IMPORTED_MODULE_2__["default"](topic, message, timestamp, data, chunkOffset, chunkInfos.length);
    }

    for (let i = 0; i < chunkInfos.length; i++) {
      const info = chunkInfos[i];
      const messages = await this.reader.readChunkMessagesAsync(info, filteredConnections, startTime, endTime, decompress);
      messages.forEach(msg => callback(parseMsg(msg, i)));
    }
  }

}

_defineProperty(Bag, "open", file => {
  throw new Error("This method should have been overridden based on the environment. Make sure you are correctly importing the node or web version of Bag.");
});

/***/ }),

/***/ "./src/fields.js":
/*!***********************!*\
  !*** ./src/fields.js ***!
  \***********************/
/*! exports provided: extractFields, extractTime */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractFields", function() { return extractFields; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "extractTime", function() { return extractTime; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
// reads through a buffer and extracts { [key: string]: value: string }
// pairs - the buffer is expected to have length prefixed utf8 strings
// with a '=' separating the key and value
function extractFields(buffer) {
  if (buffer.length < 4) {
    throw new Error("Header fields are truncated.");
  }

  let i = 0;
  const fields = {};

  while (i < buffer.length) {
    const length = buffer.readInt32LE(i);
    i += 4;

    if (i + length > buffer.length) {
      throw new Error("Header fields are corrupt.");
    }

    const field = buffer.slice(i, i + length);
    const index = field.indexOf("=");

    if (index === -1) {
      throw new Error("Header field is missing equals sign.");
    }

    fields[field.slice(0, index).toString()] = field.slice(index + 1);
    i += length;
  }

  return fields;
} // reads a Time object out of a buffer at the given offset

function extractTime(buffer, offset) {
  const sec = buffer.readUInt32LE(offset);
  const nsec = buffer.readUInt32LE(offset + 4);
  return {
    sec,
    nsec
  };
}

/***/ }),

/***/ "./src/header.js":
/*!***********************!*\
  !*** ./src/header.js ***!
  \***********************/
/*! exports provided: parseHeader */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseHeader", function() { return parseHeader; });
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _record__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./record */ "./src/record.js");
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.

 // given a buffer parses out the record within the buffer
// based on the opcode type bit

function parseHeader(buffer, cls) {
  const fields = Object(_fields__WEBPACK_IMPORTED_MODULE_0__["extractFields"])(buffer);

  if (fields.op === undefined) {
    throw new Error("Header is missing 'op' field.");
  }

  const opcode = fields.op.readUInt8(0);

  if (opcode !== cls.opcode) {
    throw new Error(`Expected ${cls.name} (${cls.opcode}) but found ${opcode}`);
  }

  return new cls(fields);
}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! exports provided: Time, TimeUtil, MessageReader, rosPrimitiveTypes, parseMessageDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _TimeUtil__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./TimeUtil */ "./src/TimeUtil.js");
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _TimeUtil__WEBPACK_IMPORTED_MODULE_0__; });
/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./bag */ "./src/bag.js");
/* empty/unused harmony star reexport *//* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BagReader */ "./src/BagReader.js");
/* empty/unused harmony star reexport *//* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _MessageReader__WEBPACK_IMPORTED_MODULE_3__["MessageReader"]; });

/* harmony import */ var _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./parseMessageDefinition */ "./src/parseMessageDefinition.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__["rosPrimitiveTypes"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _parseMessageDefinition__WEBPACK_IMPORTED_MODULE_4__["parseMessageDefinition"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_5__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Time", function() { return _types__WEBPACK_IMPORTED_MODULE_5__["Time"]; });

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.








/***/ }),

/***/ "./src/nmerge.js":
/*!***********************!*\
  !*** ./src/nmerge.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! heap */ "./node_modules/heap/index.js");
/* harmony import */ var heap__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(heap__WEBPACK_IMPORTED_MODULE_0__);
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.


function nmerge(key, ...iterables) {
  const heap = new heap__WEBPACK_IMPORTED_MODULE_0___default.a((a, b) => {
    return key(a.value, b.value);
  });

  for (let i = 0; i < iterables.length; i++) {
    const {
      value,
      done
    } = iterables[i].next();

    if (!done) {
      heap.push({
        i,
        value
      });
    }
  }

  return {
    next: () => {
      if (heap.empty()) {
        return {
          done: true
        };
      }

      const {
        i
      } = heap.front();
      const next = iterables[i].next();

      if (next.done) {
        return {
          value: heap.pop().value,
          done: false
        };
      }

      return {
        value: heap.replace({
          i,
          value: next.value
        }).value,
        done: false
      };
    }
  };
}

/* harmony default export */ __webpack_exports__["default"] = (nmerge);

/***/ }),

/***/ "./src/parseMessageDefinition.js":
/*!***************************************!*\
  !*** ./src/parseMessageDefinition.js ***!
  \***************************************/
/*! exports provided: rosPrimitiveTypes, parseMessageDefinition */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return rosPrimitiveTypes; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return parseMessageDefinition; });
// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.
const rosPrimitiveTypes = new Set(["string", "bool", "int8", "uint8", "int16", "uint16", "int32", "uint32", "float32", "float64", "int64", "uint64", "time", "duration"]);

function normalizeType(type) {
  // Normalize deprecated aliases.
  let normalizedType = type;

  if (type === "char") {
    normalizedType = "uint8";
  }

  if (type === "byte") {
    normalizedType = "int8";
  }

  return normalizedType;
} // represents a single line in a message definition type
// e.g. 'string name' 'CustomType[] foo' 'string[3] names'


function newArrayDefinition(type, name, arrayLength) {
  const normalizedType = normalizeType(type);
  return {
    type: normalizedType,
    name,
    isArray: true,
    arrayLength: arrayLength === null ? undefined : arrayLength,
    isComplex: !rosPrimitiveTypes.has(normalizedType)
  };
}

function newDefinition(type, name) {
  const normalizedType = normalizeType(type);
  return {
    type: normalizedType,
    name,
    isArray: false,
    isComplex: !rosPrimitiveTypes.has(normalizedType)
  };
}

const buildType = lines => {
  const definitions = [];
  let complexTypeName;
  lines.forEach(line => {
    // remove comments and extra whitespace from each line
    const splits = line.replace(/#.*/gi, "").split(" ").filter(word => word);

    if (!splits[1]) {
      return;
    } // consume comments


    const type = splits[0].trim();
    const name = splits[1].trim();

    if (type === "MSG:") {
      complexTypeName = name;
    } else if (name.indexOf("=") > -1 || splits.indexOf("=") > -1) {
      // constant type parsing
      const matches = line.match(/(\S+)\s*=\s*(.*)\s*/);

      if (!matches) {
        throw new Error("Malformed line: " + line);
      }

      let value = matches[2];

      if (type !== "string") {
        try {
          value = JSON.parse(value.replace(/\s*#.*/g, ""));
        } catch (error) {
          // eslint-disable-next-line no-console
          console.warn(`Error in this constant definition: ${line}`);
          throw error;
        }

        if (type === "bool") {
          value = Boolean(value);
        }
      }

      if (type.includes("int") && value > Number.MAX_SAFE_INTEGER || value < Number.MIN_SAFE_INTEGER) {
        // eslint-disable-next-line no-console
        console.warn(`Found integer constant outside safe integer range: ${line}`);
      }

      definitions.push({
        type: normalizeType(type),
        name: matches[1],
        isConstant: true,
        value
      });
    } else if (type.indexOf("]") === type.length - 1) {
      // array type parsing
      const typeSplits = type.split("[");
      const baseType = typeSplits[0];
      const len = typeSplits[1].replace("]", "");
      definitions.push(newArrayDefinition(baseType, name, len ? parseInt(len, 10) : undefined));
    } else {
      definitions.push(newDefinition(type, name));
    }
  });
  return {
    name: complexTypeName,
    definitions
  };
};

const findTypeByName = (types, name) => {
  const matches = types.filter(type => {
    const typeName = type.name || ""; // if the search is empty, return unnamed types

    if (!name) {
      return !typeName;
    } // return if the search is in the type name
    // or matches exactly if a fully-qualified name match is passed to us


    const nameEnd = name.indexOf("/") > -1 ? name : `/${name}`;
    return typeName.endsWith(nameEnd);
  });

  if (matches.length !== 1) {
    throw new Error(`Expected 1 top level type definition for '${name}' but found ${matches.length}`);
  }

  return matches[0];
}; // Given a raw message definition string, parse it into an object representation.
// Example return value:
// [{
//   name: undefined,
//   definitions: [
//     {
//       arrayLength: undefined,
//       isArray: false,
//       isComplex: false,
//       name: "name",
//       type: "string",
//     }, ...
//   ],
// }, ... ]
//
// See unit tests for more examples.


function parseMessageDefinition(messageDefinition) {
  // read all the lines and remove empties
  const allLines = messageDefinition.split("\n").map(line => line.trim()).filter(line => line);
  let definitionLines = [];
  const types = []; // group lines into individual definitions

  allLines.forEach(line => {
    // skip comment lines
    if (line.indexOf("#") === 0) {
      return;
    } // definitions are split by equal signs


    if (line.indexOf("==") === 0) {
      types.push(buildType(definitionLines));
      definitionLines = [];
    } else {
      definitionLines.push(line);
    }
  });
  types.push(buildType(definitionLines)); // Fix up complex type names

  types.forEach(({
    definitions
  }) => {
    definitions.forEach(definition => {
      if (definition.isComplex) {
        const foundName = findTypeByName(types, definition.type).name;

        if (foundName === undefined) {
          throw new Error(`Missing type definition for ${definition.type}`);
        }

        definition.type = foundName;
      }
    });
  });
  return types;
}

/***/ }),

/***/ "./src/record.js":
/*!***********************!*\
  !*** ./src/record.js ***!
  \***********************/
/*! exports provided: Record, BagHeader, Chunk, Connection, MessageData, IndexData, ChunkInfo */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Record", function() { return Record; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BagHeader", function() { return BagHeader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Chunk", function() { return Chunk; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Connection", function() { return Connection; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MessageData", function() { return MessageData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IndexData", function() { return IndexData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ChunkInfo", function() { return ChunkInfo; });
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! int53 */ "./node_modules/int53/index.js");
/* harmony import */ var int53__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(int53__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _fields__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./fields */ "./src/fields.js");
/* harmony import */ var _MessageReader__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./MessageReader */ "./src/MessageReader.js");
function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.




const readUInt64LE = buffer => {
  return int53__WEBPACK_IMPORTED_MODULE_0___default.a.readUInt64LE(buffer, 0);
};

class Record {
  constructor(_fields) {
    _defineProperty(this, "offset", void 0);

    _defineProperty(this, "dataOffset", void 0);

    _defineProperty(this, "end", void 0);

    _defineProperty(this, "length", void 0);
  }

  parseData(_buffer) {}

}
class BagHeader extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "indexPosition", void 0);

    _defineProperty(this, "connectionCount", void 0);

    _defineProperty(this, "chunkCount", void 0);

    this.indexPosition = readUInt64LE(fields.index_pos);
    this.connectionCount = fields.conn_count.readInt32LE(0);
    this.chunkCount = fields.chunk_count.readInt32LE(0);
  }

}

_defineProperty(BagHeader, "opcode", 3);

class Chunk extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "compression", void 0);

    _defineProperty(this, "size", void 0);

    _defineProperty(this, "data", void 0);

    this.compression = fields.compression.toString();
    this.size = fields.size.readUInt32LE(0);
  }

  parseData(buffer) {
    this.data = buffer;
  }

}

_defineProperty(Chunk, "opcode", 5);

const getField = (fields, key) => {
  if (fields[key] === undefined) {
    throw new Error(`Connection header is missing ${key}.`);
  }

  return fields[key].toString();
};

class Connection extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "topic", void 0);

    _defineProperty(this, "type", void 0);

    _defineProperty(this, "md5sum", void 0);

    _defineProperty(this, "messageDefinition", void 0);

    _defineProperty(this, "callerid", void 0);

    _defineProperty(this, "latching", void 0);

    _defineProperty(this, "reader", void 0);

    this.conn = fields.conn.readUInt32LE(0);
    this.topic = fields.topic.toString();
    this.type = undefined;
    this.md5sum = undefined;
    this.messageDefinition = "";
  }

  parseData(buffer) {
    const fields = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractFields"])(buffer);
    this.type = getField(fields, "type");
    this.md5sum = getField(fields, "md5sum");
    this.messageDefinition = getField(fields, "message_definition");

    if (fields.callerid !== undefined) {
      this.callerid = fields.callerid.toString();
    }

    if (fields.latching !== undefined) {
      this.latching = fields.latching.toString() === "1";
    }
  }

}

_defineProperty(Connection, "opcode", 7);

class MessageData extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "time", void 0);

    _defineProperty(this, "data", void 0);

    this.conn = fields.conn.readUInt32LE(0);
    this.time = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.time, 0);
  }

  parseData(buffer) {
    this.data = buffer;
  }

}

_defineProperty(MessageData, "opcode", 2);

class IndexData extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "ver", void 0);

    _defineProperty(this, "conn", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "indices", void 0);

    this.ver = fields.ver.readUInt32LE(0);
    this.conn = fields.conn.readUInt32LE(0);
    this.count = fields.count.readUInt32LE(0);
  }

  parseData(buffer) {
    this.indices = [];

    for (let i = 0; i < this.count; i++) {
      this.indices.push({
        time: Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(buffer, i * 12),
        offset: buffer.readUInt32LE(i * 12 + 8)
      });
    }
  }

}

_defineProperty(IndexData, "opcode", 4);

class ChunkInfo extends Record {
  constructor(fields) {
    super(fields);

    _defineProperty(this, "ver", void 0);

    _defineProperty(this, "chunkPosition", void 0);

    _defineProperty(this, "startTime", void 0);

    _defineProperty(this, "endTime", void 0);

    _defineProperty(this, "count", void 0);

    _defineProperty(this, "connections", void 0);

    _defineProperty(this, "nextChunk", void 0);

    this.ver = fields.ver.readUInt32LE(0);
    this.chunkPosition = readUInt64LE(fields.chunk_pos);
    this.startTime = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.start_time, 0);
    this.endTime = Object(_fields__WEBPACK_IMPORTED_MODULE_1__["extractTime"])(fields.end_time, 0);
    this.count = fields.count.readUInt32LE(0);
  }

  parseData(buffer) {
    this.connections = [];

    for (let i = 0; i < this.count; i++) {
      this.connections.push({
        conn: buffer.readUInt32LE(i * 8),
        count: buffer.readUInt32LE(i * 8 + 4)
      });
    }
  }

}

_defineProperty(ChunkInfo, "opcode", 6);

/***/ }),

/***/ "./src/types.js":
/*!**********************!*\
  !*** ./src/types.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/web/index.js":
/*!**************************!*\
  !*** ./src/web/index.js ***!
  \**************************/
/*! exports provided: Reader, Time, TimeUtil, BagReader, MessageReader, open, parseMessageDefinition, rosPrimitiveTypes, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(setImmediate) {/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Reader", function() { return Reader; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "open", function() { return open; });
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! buffer */ "./node_modules/node-libs-browser/node_modules/buffer/index.js");
/* harmony import */ var buffer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(buffer__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../index */ "./src/index.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "TimeUtil", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["TimeUtil"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "MessageReader", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["MessageReader"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "parseMessageDefinition", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["parseMessageDefinition"]; });

/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "rosPrimitiveTypes", function() { return _index__WEBPACK_IMPORTED_MODULE_1__["rosPrimitiveTypes"]; });

/* harmony import */ var _bag__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../bag */ "./src/bag.js");
/* harmony import */ var _BagReader__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../BagReader */ "./src/BagReader.js");
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "BagReader", function() { return _BagReader__WEBPACK_IMPORTED_MODULE_3__["default"]; });

/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../types */ "./src/types.js");
/* harmony import */ var _types__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_types__WEBPACK_IMPORTED_MODULE_4__);
/* harmony reexport (safe) */ __webpack_require__.d(__webpack_exports__, "Time", function() { return _types__WEBPACK_IMPORTED_MODULE_4__["Time"]; });

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// Copyright (c) 2018-present, GM Cruise LLC
// This source code is licensed under the Apache License, Version 2.0,
// found in the LICENSE file in the root directory of this source tree.
// You may not use this file except in compliance with the License.



 // browser reader for Blob|File objects

class Reader {
  constructor(blob) {
    _defineProperty(this, "_blob", void 0);

    _defineProperty(this, "_size", void 0);

    this._blob = blob;
    this._size = blob.size;
  } // read length (bytes) starting from offset (bytes)
  // callback(err, buffer)


  read(offset, length, cb) {
    const reader = new FileReader();

    reader.onload = function () {
      // $FlowFixMe - flow doesn't allow null
      reader.onload = null; // $FlowFixMe - flow doesn't allow null

      reader.onerror = null;
      setImmediate(cb, null, buffer__WEBPACK_IMPORTED_MODULE_0__["Buffer"].from(reader.result));
    };

    reader.onerror = function () {
      // $FlowFixMe - flow doesn't allow null
      reader.onload = null; // $FlowFixMe - flow doesn't allow null

      reader.onerror = null;
      setImmediate(cb, new Error(reader.error));
    };

    reader.readAsArrayBuffer(this._blob.slice(offset, offset + length));
  } // return the size of the file


  size() {
    return this._size;
  }

}

const open = async file => {
  if (!(file instanceof Blob)) {
    throw new Error("Expected file to be a File or Blob. Make sure you are correctly importing the node or web version of Bag.");
  }

  const bag = new _bag__WEBPACK_IMPORTED_MODULE_2__["default"](new _BagReader__WEBPACK_IMPORTED_MODULE_3__["default"](new Reader(file)));
  await bag.open();
  return bag;
};

_bag__WEBPACK_IMPORTED_MODULE_2__["default"].open = open;


/* harmony default export */ __webpack_exports__["default"] = (_bag__WEBPACK_IMPORTED_MODULE_2__["default"]);
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../node_modules/timers-browserify/main.js */ "./node_modules/timers-browserify/main.js").setImmediate))

/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9yb3NiYWcvd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovL3Jvc2JhZy93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvYmFzZTY0LWpzL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9oZWFwL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9oZWFwL2xpYi9oZWFwLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9pZWVlNzU0L2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9pbnQ1My9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvaXNhcnJheS9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvbm9kZS1saWJzLWJyb3dzZXIvbm9kZV9tb2R1bGVzL2J1ZmZlci9pbmRleC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9ub2RlX21vZHVsZXMvcHJvY2Vzcy9icm93c2VyLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy9zZXRpbW1lZGlhdGUvc2V0SW1tZWRpYXRlLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL25vZGVfbW9kdWxlcy90aW1lcnMtYnJvd3NlcmlmeS9tYWluLmpzIiwid2VicGFjazovL3Jvc2JhZy8od2VicGFjaykvYnVpbGRpbi9nbG9iYWwuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL0JhZ1JlYWRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvTWVzc2FnZVJlYWRlci5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvUmVhZFJlc3VsdC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvVGltZVV0aWwuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2JhZy5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvZmllbGRzLmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9oZWFkZXIuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL2luZGV4LmpzIiwid2VicGFjazovL3Jvc2JhZy8uL3NyYy9ubWVyZ2UuanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL3BhcnNlTWVzc2FnZURlZmluaXRpb24uanMiLCJ3ZWJwYWNrOi8vcm9zYmFnLy4vc3JjL3JlY29yZC5qcyIsIndlYnBhY2s6Ly9yb3NiYWcvLi9zcmMvd2ViL2luZGV4LmpzIl0sIm5hbWVzIjpbIkhFQURFUl9SRUFEQUhFQUQiLCJIRUFERVJfT0ZGU0VUIiwiQmFnUmVhZGVyIiwiY29uc3RydWN0b3IiLCJmaWxlbGlrZSIsIl9maWxlIiwiX2xhc3RDaHVua0luZm8iLCJ1bmRlZmluZWQiLCJ2ZXJpZnlCYWdIZWFkZXIiLCJjYWxsYmFjayIsIm5leHQiLCJyZWFkIiwiZXJyb3IiLCJidWZmZXIiLCJFcnJvciIsInNpemUiLCJ0b1N0cmluZyIsInJlYWRIZWFkZXIiLCJsZW5ndGgiLCJoZWFkZXJMZW5ndGgiLCJyZWFkSW50MzJMRSIsImhlYWRlciIsInJlYWRSZWNvcmRGcm9tQnVmZmVyIiwiQmFnSGVhZGVyIiwicmVhZEhlYWRlckFzeW5jIiwiUHJvbWlzZSIsInJlc29sdmUiLCJyZWplY3QiLCJlcnIiLCJyZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm8iLCJmaWxlT2Zmc2V0IiwiY29ubmVjdGlvbkNvdW50IiwiY2h1bmtDb3VudCIsImNvbm5lY3Rpb25zIiwiY2h1bmtJbmZvcyIsInJlYWRSZWNvcmRzRnJvbUJ1ZmZlciIsIkNvbm5lY3Rpb24iLCJjb25uZWN0aW9uQmxvY2tMZW5ndGgiLCJlbmQiLCJvZmZzZXQiLCJzbGljZSIsIkNodW5rSW5mbyIsImkiLCJuZXh0Q2h1bmsiLCJyZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9Bc3luYyIsInJlc3VsdCIsInJlYWRDaHVua01lc3NhZ2VzIiwiY2h1bmtJbmZvIiwic3RhcnRUaW1lIiwiZW5kVGltZSIsImRlY29tcHJlc3MiLCJzdGFydCIsInNlYyIsIm5zZWMiLCJOdW1iZXIiLCJNQVhfVkFMVUUiLCJjb25ucyIsIm1hcCIsImNvbm5lY3Rpb24iLCJjb25uIiwicmVhZENodW5rIiwiY2h1bmsiLCJpbmRpY2VzIiwiZm9yRWFjaCIsImluZGV4IiwicHJlc2VudENvbm5lY3Rpb25zIiwiZmlsdGVyIiwiaXRlcmFibGVzIiwiU3ltYm9sIiwiaXRlcmF0b3IiLCJpdGVyIiwibm1lcmdlIiwiYSIsImIiLCJUaW1lVXRpbCIsInRpbWUiLCJlbnRyaWVzIiwiaXRlbSIsImRvbmUiLCJ2YWx1ZSIsInB1c2giLCJtZXNzYWdlcyIsImVudHJ5IiwiZGF0YSIsImRhdGFPZmZzZXQiLCJNZXNzYWdlRGF0YSIsInJlYWRDaHVua01lc3NhZ2VzQXN5bmMiLCJfbGFzdFJlYWRSZXN1bHQiLCJsYXN0UmVhZFJlc3VsdCIsInNldEltbWVkaWF0ZSIsInJlYWRMZW5ndGgiLCJjaHVua1Bvc2l0aW9uIiwiQ2h1bmsiLCJjb21wcmVzc2lvbiIsImRlY29tcHJlc3NGbiIsImNvdW50IiwiSW5kZXhEYXRhIiwiY2xzIiwicmVjb3JkcyIsImJ1ZmZlck9mZnNldCIsInJlY29yZCIsInBhcnNlSGVhZGVyIiwiZGF0YUxlbmd0aCIsInBhcnNlRGF0YSIsIlN0YW5kYXJkVHlwZVJlYWRlciIsInZpZXciLCJEYXRhVmlldyIsImJ5dGVPZmZzZXQiLCJzdHJpbmciLCJsZW4iLCJpbnQzMiIsImNvZGVQb2ludHMiLCJVaW50OEFycmF5IiwiU3RyaW5nIiwiZnJvbUNoYXJDb2RlIiwiYXBwbHkiLCJib29sIiwidWludDgiLCJpbnQ4IiwiZ2V0SW50OCIsImdldFVpbnQ4IiwidHlwZWRBcnJheSIsImFycmF5VHlwZSIsImFycmF5TGVuZ3RoIiwidWludDMyIiwiaW50MTYiLCJnZXRJbnQxNiIsInVpbnQxNiIsImdldFVpbnQxNiIsImdldEludDMyIiwiZ2V0VWludDMyIiwiZmxvYXQzMiIsImdldEZsb2F0MzIiLCJmbG9hdDY0IiwiZ2V0RmxvYXQ2NCIsImludDY0IiwiaW50NTMiLCJyZWFkSW50NjRMRSIsInVpbnQ2NCIsInJlYWRVSW50NjRMRSIsImV4dHJhY3RUaW1lIiwiZHVyYXRpb24iLCJmaW5kVHlwZUJ5TmFtZSIsInR5cGVzIiwibmFtZSIsImZvdW5kTmFtZSIsIm1hdGNoZXMiLCJ0eXBlIiwidHlwZU5hbWUiLCJuYW1lRW5kIiwiaW5kZXhPZiIsImVuZHNXaXRoIiwiY29uc3RydWN0b3JCb2R5IiwiZGVmaW5pdGlvbnMiLCJkZWYiLCJpc0NvbnN0YW50Iiwiam9pbiIsImZyaWVuZGx5TmFtZSIsInJlcGxhY2UiLCJjcmVhdGVQYXJzZXIiLCJ1bm5hbWVkVHlwZXMiLCJ1bm5hbWVkVHlwZSIsIm5hbWVkVHlwZXMiLCJqcyIsInQiLCJzdGFjayIsImdldFJlYWRlckxpbmVzIiwiZmllbGROYW1lIiwicmVhZGVyTGluZXMiLCJpc0FycmF5IiwibGVuRmllbGQiLCJjaGlsZE5hbWUiLCJpbmNOYW1lIiwiYXJyYXlOYW1lIiwiaXNDb21wbGV4IiwiZGVmVHlwZSIsImNvbmNhdCIsImxpbmVzIiwicmVhZGVyRm4iLCJfcmVhZCIsImV2YWwiLCJlIiwiY29uc29sZSIsInJlYWRlciIsIk1lc3NhZ2VSZWFkZXIiLCJtZXNzYWdlRGVmaW5pdGlvbiIsInBhcnNlTWVzc2FnZURlZmluaXRpb24iLCJyZWFkTWVzc2FnZSIsIlJlYWRSZXN1bHQiLCJ0b3BpYyIsIm1lc3NhZ2UiLCJ0aW1lc3RhbXAiLCJjaHVua09mZnNldCIsInRvdGFsQ2h1bmtzIiwiZnJvbURhdGUiLCJkYXRlIiwiTWF0aCIsImZsb29yIiwiZ2V0VGltZSIsImdldE1pbGxpc2Vjb25kcyIsInRvRGF0ZSIsIkRhdGUiLCJjb21wYXJlIiwibGVmdCIsInJpZ2h0Iiwic2VjRGlmZiIsImlzTGVzc1RoYW4iLCJpc0dyZWF0ZXJUaGFuIiwiYXJlU2FtZSIsImFkZCIsImR1cmF0aW9uTmFub3MiLCJzZWNzRnJvbU5hbm9zIiwibmV3U2VjcyIsInJlbWFpbmluZ0R1cmF0aW9uTmFub3MiLCJuZXdOYW5vcyIsImFicyIsInNpZ24iLCJCYWciLCJiYWdSZWFkZXIiLCJvcGVuIiwiaW5kZXhQb3NpdGlvbiIsInJlYWRNZXNzYWdlcyIsIm9wdHMiLCJ0b3BpY3MiLCJPYmplY3QiLCJrZXlzIiwiaWQiLCJmaWx0ZXJlZENvbm5lY3Rpb25zIiwiaW5mbyIsInBhcnNlTXNnIiwibXNnIiwibm9QYXJzZSIsImZpbGUiLCJleHRyYWN0RmllbGRzIiwiZmllbGRzIiwiZmllbGQiLCJyZWFkVUludDMyTEUiLCJvcCIsIm9wY29kZSIsInJlYWRVSW50OCIsImtleSIsImhlYXAiLCJIZWFwIiwiZW1wdHkiLCJmcm9udCIsInBvcCIsInJvc1ByaW1pdGl2ZVR5cGVzIiwiU2V0Iiwibm9ybWFsaXplVHlwZSIsIm5vcm1hbGl6ZWRUeXBlIiwibmV3QXJyYXlEZWZpbml0aW9uIiwiaGFzIiwibmV3RGVmaW5pdGlvbiIsImJ1aWxkVHlwZSIsImNvbXBsZXhUeXBlTmFtZSIsImxpbmUiLCJzcGxpdHMiLCJzcGxpdCIsIndvcmQiLCJ0cmltIiwibWF0Y2giLCJKU09OIiwicGFyc2UiLCJ3YXJuIiwiQm9vbGVhbiIsImluY2x1ZGVzIiwiTUFYX1NBRkVfSU5URUdFUiIsIk1JTl9TQUZFX0lOVEVHRVIiLCJ0eXBlU3BsaXRzIiwiYmFzZVR5cGUiLCJwYXJzZUludCIsImFsbExpbmVzIiwiZGVmaW5pdGlvbkxpbmVzIiwiZGVmaW5pdGlvbiIsIlJlY29yZCIsIl9maWVsZHMiLCJfYnVmZmVyIiwiaW5kZXhfcG9zIiwiY29ubl9jb3VudCIsImNodW5rX2NvdW50IiwiZ2V0RmllbGQiLCJtZDVzdW0iLCJjYWxsZXJpZCIsImxhdGNoaW5nIiwidmVyIiwiY2h1bmtfcG9zIiwic3RhcnRfdGltZSIsImVuZF90aW1lIiwiUmVhZGVyIiwiYmxvYiIsIl9ibG9iIiwiX3NpemUiLCJjYiIsIkZpbGVSZWFkZXIiLCJvbmxvYWQiLCJvbmVycm9yIiwiQnVmZmVyIiwiZnJvbSIsInJlYWRBc0FycmF5QnVmZmVyIiwiQmxvYiIsImJhZyJdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGtEQUEwQyxnQ0FBZ0M7QUFDMUU7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxnRUFBd0Qsa0JBQWtCO0FBQzFFO0FBQ0EseURBQWlELGNBQWM7QUFDL0Q7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlEQUF5QyxpQ0FBaUM7QUFDMUUsd0hBQWdILG1CQUFtQixFQUFFO0FBQ3JJO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsbUNBQTJCLDBCQUEwQixFQUFFO0FBQ3ZELHlDQUFpQyxlQUFlO0FBQ2hEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLDhEQUFzRCwrREFBK0Q7O0FBRXJIO0FBQ0E7OztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7QUNsRlk7O0FBRVo7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLGtDQUFrQyxTQUFTO0FBQzNDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxpQkFBaUIsU0FBUztBQUMxQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSwwQ0FBMEMsVUFBVTtBQUNwRDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7O0FDdEpBLGlCQUFpQixtQkFBTyxDQUFDLG1EQUFZOzs7Ozs7Ozs7Ozs7QUNBckM7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFD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QSxxQkFBcUIsbURBQW1EO0FBQ3hFO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUIsVUFBVTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLEdBQUc7QUFDSDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsMEJBQTBCO0FBQzFCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBLHVDQUF1QyxTQUFTO0FBQ2hEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGVBQWUsaUJBQWlCO0FBQ2hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixTQUFTO0FBQzFCO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0RBQWdELEVBQUU7QUFDbEQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUEsaUJBQWlCLFNBQVM7QUFDMUI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHlDQUF5QztBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGVBQWU7QUFDdkM7QUFDQTtBQUNBO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0Esd0JBQXdCLFFBQVE7QUFDaEM7QUFDQSxxQkFBcUIsZUFBZTtBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEscUJBQXFCLFNBQVM7QUFDOUI7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHFCQUFxQixTQUFTO0FBQzlCO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQixrQkFBa0I7QUFDbkM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBLG1CQUFtQixjQUFjO0FBQ2pDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1REFBdUQsT0FBTztBQUM5RDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdURBQXVELE9BQU87QUFDOUQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCO0FBQ2xCO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLFFBQVE7QUFDN0I7QUFDQTtBQUNBLEdBQUc7QUFDSDtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLG1CQUFtQixTQUFTO0FBQzVCO0FBQ0E7QUFDQSxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxlQUFlLGlCQUFpQjtBQUNoQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBLGlCQUFpQixZQUFZO0FBQzdCOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxpQkFBaUIsZ0JBQWdCO0FBQ2pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsaUJBQWlCLGdCQUFnQjtBQUNqQzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxpQkFBaUIsWUFBWTtBQUM3QjtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7OztBQzV2REE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBLFNBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7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QUE2QjtBQUMzQixVQUFNLElBQUk3UixLQUFKLENBQ0osMkdBREksQ0FBTjtBQUdEOztBQUNELFFBQU04UixHQUFHLEdBQUcsSUFBSW5GLDRDQUFKLENBQVEsSUFBSXZOLGtEQUFKLENBQWMsSUFBSThSLE1BQUosQ0FBV3hELElBQVgsQ0FBZCxDQUFSLENBQVo7QUFDQSxRQUFNb0UsR0FBRyxDQUFDakYsSUFBSixFQUFOO0FBQ0EsU0FBT2lGLEdBQVA7QUFDRCxDQVREOztBQVVBbkYsNENBQUcsQ0FBQ0UsSUFBSixHQUFXQSxJQUFYO0FBRUE7QUFDQTtBQUNlRiwyR0FBZixFIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW10sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wicm9zYmFnXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcInJvc2JhZ1wiXSA9IGZhY3RvcnkoKTtcbn0pKHR5cGVvZiBzZWxmICE9PSAndW5kZWZpbmVkJyA/IHNlbGYgOiB0aGlzLCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy93ZWIvaW5kZXguanNcIik7XG4iLCIndXNlIHN0cmljdCdcblxuZXhwb3J0cy5ieXRlTGVuZ3RoID0gYnl0ZUxlbmd0aFxuZXhwb3J0cy50b0J5dGVBcnJheSA9IHRvQnl0ZUFycmF5XG5leHBvcnRzLmZyb21CeXRlQXJyYXkgPSBmcm9tQnl0ZUFycmF5XG5cbnZhciBsb29rdXAgPSBbXVxudmFyIHJldkxvb2t1cCA9IFtdXG52YXIgQXJyID0gdHlwZW9mIFVpbnQ4QXJyYXkgIT09ICd1bmRlZmluZWQnID8gVWludDhBcnJheSA6IEFycmF5XG5cbnZhciBjb2RlID0gJ0FCQ0RFRkdISUpLTE1OT1BRUlNUVVZXWFlaYWJjZGVmZ2hpamtsbW5vcHFyc3R1dnd4eXowMTIzNDU2Nzg5Ky8nXG5mb3IgKHZhciBpID0gMCwgbGVuID0gY29kZS5sZW5ndGg7IGkgPCBsZW47ICsraSkge1xuICBsb29rdXBbaV0gPSBjb2RlW2ldXG4gIHJldkxvb2t1cFtjb2RlLmNoYXJDb2RlQXQoaSldID0gaVxufVxuXG4vLyBTdXBwb3J0IGRlY29kaW5nIFVSTC1zYWZlIGJhc2U2NCBzdHJpbmdzLCBhcyBOb2RlLmpzIGRvZXMuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0Jhc2U2NCNVUkxfYXBwbGljYXRpb25zXG5yZXZMb29rdXBbJy0nLmNoYXJDb2RlQXQoMCldID0gNjJcbnJldkxvb2t1cFsnXycuY2hhckNvZGVBdCgwKV0gPSA2M1xuXG5mdW5jdGlvbiBnZXRMZW5zIChiNjQpIHtcbiAgdmFyIGxlbiA9IGI2NC5sZW5ndGhcblxuICBpZiAobGVuICUgNCA+IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgc3RyaW5nLiBMZW5ndGggbXVzdCBiZSBhIG11bHRpcGxlIG9mIDQnKVxuICB9XG5cbiAgLy8gVHJpbSBvZmYgZXh0cmEgYnl0ZXMgYWZ0ZXIgcGxhY2Vob2xkZXIgYnl0ZXMgYXJlIGZvdW5kXG4gIC8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2JlYXRnYW1taXQvYmFzZTY0LWpzL2lzc3Vlcy80MlxuICB2YXIgdmFsaWRMZW4gPSBiNjQuaW5kZXhPZignPScpXG4gIGlmICh2YWxpZExlbiA9PT0gLTEpIHZhbGlkTGVuID0gbGVuXG5cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IHZhbGlkTGVuID09PSBsZW5cbiAgICA/IDBcbiAgICA6IDQgLSAodmFsaWRMZW4gJSA0KVxuXG4gIHJldHVybiBbdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbl1cbn1cblxuLy8gYmFzZTY0IGlzIDQvMyArIHVwIHRvIHR3byBjaGFyYWN0ZXJzIG9mIHRoZSBvcmlnaW5hbCBkYXRhXG5mdW5jdGlvbiBieXRlTGVuZ3RoIChiNjQpIHtcbiAgdmFyIGxlbnMgPSBnZXRMZW5zKGI2NClcbiAgdmFyIHZhbGlkTGVuID0gbGVuc1swXVxuICB2YXIgcGxhY2VIb2xkZXJzTGVuID0gbGVuc1sxXVxuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gX2J5dGVMZW5ndGggKGI2NCwgdmFsaWRMZW4sIHBsYWNlSG9sZGVyc0xlbikge1xuICByZXR1cm4gKCh2YWxpZExlbiArIHBsYWNlSG9sZGVyc0xlbikgKiAzIC8gNCkgLSBwbGFjZUhvbGRlcnNMZW5cbn1cblxuZnVuY3Rpb24gdG9CeXRlQXJyYXkgKGI2NCkge1xuICB2YXIgdG1wXG4gIHZhciBsZW5zID0gZ2V0TGVucyhiNjQpXG4gIHZhciB2YWxpZExlbiA9IGxlbnNbMF1cbiAgdmFyIHBsYWNlSG9sZGVyc0xlbiA9IGxlbnNbMV1cblxuICB2YXIgYXJyID0gbmV3IEFycihfYnl0ZUxlbmd0aChiNjQsIHZhbGlkTGVuLCBwbGFjZUhvbGRlcnNMZW4pKVxuXG4gIHZhciBjdXJCeXRlID0gMFxuXG4gIC8vIGlmIHRoZXJlIGFyZSBwbGFjZWhvbGRlcnMsIG9ubHkgZ2V0IHVwIHRvIHRoZSBsYXN0IGNvbXBsZXRlIDQgY2hhcnNcbiAgdmFyIGxlbiA9IHBsYWNlSG9sZGVyc0xlbiA+IDBcbiAgICA/IHZhbGlkTGVuIC0gNFxuICAgIDogdmFsaWRMZW5cblxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgdG1wID1cbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSldIDw8IDE4KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPDwgMTIpIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDIpXSA8PCA2KSB8XG4gICAgICByZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDMpXVxuICAgIGFycltjdXJCeXRlKytdID0gKHRtcCA+PiAxNikgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSAodG1wID4+IDgpICYgMHhGRlxuICAgIGFycltjdXJCeXRlKytdID0gdG1wICYgMHhGRlxuICB9XG5cbiAgaWYgKHBsYWNlSG9sZGVyc0xlbiA9PT0gMikge1xuICAgIHRtcCA9XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkpXSA8PCAyKSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAxKV0gPj4gNClcbiAgICBhcnJbY3VyQnl0ZSsrXSA9IHRtcCAmIDB4RkZcbiAgfVxuXG4gIGlmIChwbGFjZUhvbGRlcnNMZW4gPT09IDEpIHtcbiAgICB0bXAgPVxuICAgICAgKHJldkxvb2t1cFtiNjQuY2hhckNvZGVBdChpKV0gPDwgMTApIHxcbiAgICAgIChyZXZMb29rdXBbYjY0LmNoYXJDb2RlQXQoaSArIDEpXSA8PCA0KSB8XG4gICAgICAocmV2TG9va3VwW2I2NC5jaGFyQ29kZUF0KGkgKyAyKV0gPj4gMilcbiAgICBhcnJbY3VyQnl0ZSsrXSA9ICh0bXAgPj4gOCkgJiAweEZGXG4gICAgYXJyW2N1ckJ5dGUrK10gPSB0bXAgJiAweEZGXG4gIH1cblxuICByZXR1cm4gYXJyXG59XG5cbmZ1bmN0aW9uIHRyaXBsZXRUb0Jhc2U2NCAobnVtKSB7XG4gIHJldHVybiBsb29rdXBbbnVtID4+IDE4ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gPj4gMTIgJiAweDNGXSArXG4gICAgbG9va3VwW251bSA+PiA2ICYgMHgzRl0gK1xuICAgIGxvb2t1cFtudW0gJiAweDNGXVxufVxuXG5mdW5jdGlvbiBlbmNvZGVDaHVuayAodWludDgsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHRtcFxuICB2YXIgb3V0cHV0ID0gW11cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyBpICs9IDMpIHtcbiAgICB0bXAgPVxuICAgICAgKCh1aW50OFtpXSA8PCAxNikgJiAweEZGMDAwMCkgK1xuICAgICAgKCh1aW50OFtpICsgMV0gPDwgOCkgJiAweEZGMDApICtcbiAgICAgICh1aW50OFtpICsgMl0gJiAweEZGKVxuICAgIG91dHB1dC5wdXNoKHRyaXBsZXRUb0Jhc2U2NCh0bXApKVxuICB9XG4gIHJldHVybiBvdXRwdXQuam9pbignJylcbn1cblxuZnVuY3Rpb24gZnJvbUJ5dGVBcnJheSAodWludDgpIHtcbiAgdmFyIHRtcFxuICB2YXIgbGVuID0gdWludDgubGVuZ3RoXG4gIHZhciBleHRyYUJ5dGVzID0gbGVuICUgMyAvLyBpZiB3ZSBoYXZlIDEgYnl0ZSBsZWZ0LCBwYWQgMiBieXRlc1xuICB2YXIgcGFydHMgPSBbXVxuICB2YXIgbWF4Q2h1bmtMZW5ndGggPSAxNjM4MyAvLyBtdXN0IGJlIG11bHRpcGxlIG9mIDNcblxuICAvLyBnbyB0aHJvdWdoIHRoZSBhcnJheSBldmVyeSB0aHJlZSBieXRlcywgd2UnbGwgZGVhbCB3aXRoIHRyYWlsaW5nIHN0dWZmIGxhdGVyXG4gIGZvciAodmFyIGkgPSAwLCBsZW4yID0gbGVuIC0gZXh0cmFCeXRlczsgaSA8IGxlbjI7IGkgKz0gbWF4Q2h1bmtMZW5ndGgpIHtcbiAgICBwYXJ0cy5wdXNoKGVuY29kZUNodW5rKFxuICAgICAgdWludDgsIGksIChpICsgbWF4Q2h1bmtMZW5ndGgpID4gbGVuMiA/IGxlbjIgOiAoaSArIG1heENodW5rTGVuZ3RoKVxuICAgICkpXG4gIH1cblxuICAvLyBwYWQgdGhlIGVuZCB3aXRoIHplcm9zLCBidXQgbWFrZSBzdXJlIHRvIG5vdCBmb3JnZXQgdGhlIGV4dHJhIGJ5dGVzXG4gIGlmIChleHRyYUJ5dGVzID09PSAxKSB7XG4gICAgdG1wID0gdWludDhbbGVuIC0gMV1cbiAgICBwYXJ0cy5wdXNoKFxuICAgICAgbG9va3VwW3RtcCA+PiAyXSArXG4gICAgICBsb29rdXBbKHRtcCA8PCA0KSAmIDB4M0ZdICtcbiAgICAgICc9PSdcbiAgICApXG4gIH0gZWxzZSBpZiAoZXh0cmFCeXRlcyA9PT0gMikge1xuICAgIHRtcCA9ICh1aW50OFtsZW4gLSAyXSA8PCA4KSArIHVpbnQ4W2xlbiAtIDFdXG4gICAgcGFydHMucHVzaChcbiAgICAgIGxvb2t1cFt0bXAgPj4gMTBdICtcbiAgICAgIGxvb2t1cFsodG1wID4+IDQpICYgMHgzRl0gK1xuICAgICAgbG9va3VwWyh0bXAgPDwgMikgJiAweDNGXSArXG4gICAgICAnPSdcbiAgICApXG4gIH1cblxuICByZXR1cm4gcGFydHMuam9pbignJylcbn1cbiIsIm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZSgnLi9saWIvaGVhcCcpO1xuIiwiLy8gR2VuZXJhdGVkIGJ5IENvZmZlZVNjcmlwdCAxLjguMFxuKGZ1bmN0aW9uKCkge1xuICB2YXIgSGVhcCwgZGVmYXVsdENtcCwgZmxvb3IsIGhlYXBpZnksIGhlYXBwb3AsIGhlYXBwdXNoLCBoZWFwcHVzaHBvcCwgaGVhcHJlcGxhY2UsIGluc29ydCwgbWluLCBubGFyZ2VzdCwgbnNtYWxsZXN0LCB1cGRhdGVJdGVtLCBfc2lmdGRvd24sIF9zaWZ0dXA7XG5cbiAgZmxvb3IgPSBNYXRoLmZsb29yLCBtaW4gPSBNYXRoLm1pbjtcblxuXG4gIC8qXG4gIERlZmF1bHQgY29tcGFyaXNvbiBmdW5jdGlvbiB0byBiZSB1c2VkXG4gICAqL1xuXG4gIGRlZmF1bHRDbXAgPSBmdW5jdGlvbih4LCB5KSB7XG4gICAgaWYgKHggPCB5KSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmICh4ID4geSkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIHJldHVybiAwO1xuICB9O1xuXG5cbiAgLypcbiAgSW5zZXJ0IGl0ZW0geCBpbiBsaXN0IGEsIGFuZCBrZWVwIGl0IHNvcnRlZCBhc3N1bWluZyBhIGlzIHNvcnRlZC5cbiAgXG4gIElmIHggaXMgYWxyZWFkeSBpbiBhLCBpbnNlcnQgaXQgdG8gdGhlIHJpZ2h0IG9mIHRoZSByaWdodG1vc3QgeC5cbiAgXG4gIE9wdGlvbmFsIGFyZ3MgbG8gKGRlZmF1bHQgMCkgYW5kIGhpIChkZWZhdWx0IGEubGVuZ3RoKSBib3VuZCB0aGUgc2xpY2VcbiAgb2YgYSB0byBiZSBzZWFyY2hlZC5cbiAgICovXG5cbiAgaW5zb3J0ID0gZnVuY3Rpb24oYSwgeCwgbG8sIGhpLCBjbXApIHtcbiAgICB2YXIgbWlkO1xuICAgIGlmIChsbyA9PSBudWxsKSB7XG4gICAgICBsbyA9IDA7XG4gICAgfVxuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgaWYgKGxvIDwgMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdsbyBtdXN0IGJlIG5vbi1uZWdhdGl2ZScpO1xuICAgIH1cbiAgICBpZiAoaGkgPT0gbnVsbCkge1xuICAgICAgaGkgPSBhLmxlbmd0aDtcbiAgICB9XG4gICAgd2hpbGUgKGxvIDwgaGkpIHtcbiAgICAgIG1pZCA9IGZsb29yKChsbyArIGhpKSAvIDIpO1xuICAgICAgaWYgKGNtcCh4LCBhW21pZF0pIDwgMCkge1xuICAgICAgICBoaSA9IG1pZDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvID0gbWlkICsgMTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIChbXS5zcGxpY2UuYXBwbHkoYSwgW2xvLCBsbyAtIGxvXS5jb25jYXQoeCkpLCB4KTtcbiAgfTtcblxuXG4gIC8qXG4gIFB1c2ggaXRlbSBvbnRvIGhlYXAsIG1haW50YWluaW5nIHRoZSBoZWFwIGludmFyaWFudC5cbiAgICovXG5cbiAgaGVhcHB1c2ggPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgY21wKSB7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBhcnJheS5wdXNoKGl0ZW0pO1xuICAgIHJldHVybiBfc2lmdGRvd24oYXJyYXksIDAsIGFycmF5Lmxlbmd0aCAtIDEsIGNtcCk7XG4gIH07XG5cblxuICAvKlxuICBQb3AgdGhlIHNtYWxsZXN0IGl0ZW0gb2ZmIHRoZSBoZWFwLCBtYWludGFpbmluZyB0aGUgaGVhcCBpbnZhcmlhbnQuXG4gICAqL1xuXG4gIGhlYXBwb3AgPSBmdW5jdGlvbihhcnJheSwgY21wKSB7XG4gICAgdmFyIGxhc3RlbHQsIHJldHVybml0ZW07XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBsYXN0ZWx0ID0gYXJyYXkucG9wKCk7XG4gICAgaWYgKGFycmF5Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuaXRlbSA9IGFycmF5WzBdO1xuICAgICAgYXJyYXlbMF0gPSBsYXN0ZWx0O1xuICAgICAgX3NpZnR1cChhcnJheSwgMCwgY21wKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuaXRlbSA9IGxhc3RlbHQ7XG4gICAgfVxuICAgIHJldHVybiByZXR1cm5pdGVtO1xuICB9O1xuXG5cbiAgLypcbiAgUG9wIGFuZCByZXR1cm4gdGhlIGN1cnJlbnQgc21hbGxlc3QgdmFsdWUsIGFuZCBhZGQgdGhlIG5ldyBpdGVtLlxuICBcbiAgVGhpcyBpcyBtb3JlIGVmZmljaWVudCB0aGFuIGhlYXBwb3AoKSBmb2xsb3dlZCBieSBoZWFwcHVzaCgpLCBhbmQgY2FuIGJlXG4gIG1vcmUgYXBwcm9wcmlhdGUgd2hlbiB1c2luZyBhIGZpeGVkIHNpemUgaGVhcC4gTm90ZSB0aGF0IHRoZSB2YWx1ZVxuICByZXR1cm5lZCBtYXkgYmUgbGFyZ2VyIHRoYW4gaXRlbSEgVGhhdCBjb25zdHJhaW5zIHJlYXNvbmFibGUgdXNlIG9mXG4gIHRoaXMgcm91dGluZSB1bmxlc3Mgd3JpdHRlbiBhcyBwYXJ0IG9mIGEgY29uZGl0aW9uYWwgcmVwbGFjZW1lbnQ6XG4gICAgICBpZiBpdGVtID4gYXJyYXlbMF1cbiAgICAgICAgaXRlbSA9IGhlYXByZXBsYWNlKGFycmF5LCBpdGVtKVxuICAgKi9cblxuICBoZWFwcmVwbGFjZSA9IGZ1bmN0aW9uKGFycmF5LCBpdGVtLCBjbXApIHtcbiAgICB2YXIgcmV0dXJuaXRlbTtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIHJldHVybml0ZW0gPSBhcnJheVswXTtcbiAgICBhcnJheVswXSA9IGl0ZW07XG4gICAgX3NpZnR1cChhcnJheSwgMCwgY21wKTtcbiAgICByZXR1cm4gcmV0dXJuaXRlbTtcbiAgfTtcblxuXG4gIC8qXG4gIEZhc3QgdmVyc2lvbiBvZiBhIGhlYXBwdXNoIGZvbGxvd2VkIGJ5IGEgaGVhcHBvcC5cbiAgICovXG5cbiAgaGVhcHB1c2hwb3AgPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgY21wKSB7XG4gICAgdmFyIF9yZWY7XG4gICAgaWYgKGNtcCA9PSBudWxsKSB7XG4gICAgICBjbXAgPSBkZWZhdWx0Q21wO1xuICAgIH1cbiAgICBpZiAoYXJyYXkubGVuZ3RoICYmIGNtcChhcnJheVswXSwgaXRlbSkgPCAwKSB7XG4gICAgICBfcmVmID0gW2FycmF5WzBdLCBpdGVtXSwgaXRlbSA9IF9yZWZbMF0sIGFycmF5WzBdID0gX3JlZlsxXTtcbiAgICAgIF9zaWZ0dXAoYXJyYXksIDAsIGNtcCk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtO1xuICB9O1xuXG5cbiAgLypcbiAgVHJhbnNmb3JtIGxpc3QgaW50byBhIGhlYXAsIGluLXBsYWNlLCBpbiBPKGFycmF5Lmxlbmd0aCkgdGltZS5cbiAgICovXG5cbiAgaGVhcGlmeSA9IGZ1bmN0aW9uKGFycmF5LCBjbXApIHtcbiAgICB2YXIgaSwgX2ksIF9qLCBfbGVuLCBfcmVmLCBfcmVmMSwgX3Jlc3VsdHMsIF9yZXN1bHRzMTtcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIF9yZWYxID0gKGZ1bmN0aW9uKCkge1xuICAgICAgX3Jlc3VsdHMxID0gW107XG4gICAgICBmb3IgKHZhciBfaiA9IDAsIF9yZWYgPSBmbG9vcihhcnJheS5sZW5ndGggLyAyKTsgMCA8PSBfcmVmID8gX2ogPCBfcmVmIDogX2ogPiBfcmVmOyAwIDw9IF9yZWYgPyBfaisrIDogX2otLSl7IF9yZXN1bHRzMS5wdXNoKF9qKTsgfVxuICAgICAgcmV0dXJuIF9yZXN1bHRzMTtcbiAgICB9KS5hcHBseSh0aGlzKS5yZXZlcnNlKCk7XG4gICAgX3Jlc3VsdHMgPSBbXTtcbiAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYxLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBpID0gX3JlZjFbX2ldO1xuICAgICAgX3Jlc3VsdHMucHVzaChfc2lmdHVwKGFycmF5LCBpLCBjbXApKTtcbiAgICB9XG4gICAgcmV0dXJuIF9yZXN1bHRzO1xuICB9O1xuXG5cbiAgLypcbiAgVXBkYXRlIHRoZSBwb3NpdGlvbiBvZiB0aGUgZ2l2ZW4gaXRlbSBpbiB0aGUgaGVhcC5cbiAgVGhpcyBmdW5jdGlvbiBzaG91bGQgYmUgY2FsbGVkIGV2ZXJ5IHRpbWUgdGhlIGl0ZW0gaXMgYmVpbmcgbW9kaWZpZWQuXG4gICAqL1xuXG4gIHVwZGF0ZUl0ZW0gPSBmdW5jdGlvbihhcnJheSwgaXRlbSwgY21wKSB7XG4gICAgdmFyIHBvcztcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIHBvcyA9IGFycmF5LmluZGV4T2YoaXRlbSk7XG4gICAgaWYgKHBvcyA9PT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgX3NpZnRkb3duKGFycmF5LCAwLCBwb3MsIGNtcCk7XG4gICAgcmV0dXJuIF9zaWZ0dXAoYXJyYXksIHBvcywgY21wKTtcbiAgfTtcblxuXG4gIC8qXG4gIEZpbmQgdGhlIG4gbGFyZ2VzdCBlbGVtZW50cyBpbiBhIGRhdGFzZXQuXG4gICAqL1xuXG4gIG5sYXJnZXN0ID0gZnVuY3Rpb24oYXJyYXksIG4sIGNtcCkge1xuICAgIHZhciBlbGVtLCByZXN1bHQsIF9pLCBfbGVuLCBfcmVmO1xuICAgIGlmIChjbXAgPT0gbnVsbCkge1xuICAgICAgY21wID0gZGVmYXVsdENtcDtcbiAgICB9XG4gICAgcmVzdWx0ID0gYXJyYXkuc2xpY2UoMCwgbik7XG4gICAgaWYgKCFyZXN1bHQubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cbiAgICBoZWFwaWZ5KHJlc3VsdCwgY21wKTtcbiAgICBfcmVmID0gYXJyYXkuc2xpY2Uobik7XG4gICAgZm9yIChfaSA9IDAsIF9sZW4gPSBfcmVmLmxlbmd0aDsgX2kgPCBfbGVuOyBfaSsrKSB7XG4gICAgICBlbGVtID0gX3JlZltfaV07XG4gICAgICBoZWFwcHVzaHBvcChyZXN1bHQsIGVsZW0sIGNtcCk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQuc29ydChjbXApLnJldmVyc2UoKTtcbiAgfTtcblxuXG4gIC8qXG4gIEZpbmQgdGhlIG4gc21hbGxlc3QgZWxlbWVudHMgaW4gYSBkYXRhc2V0LlxuICAgKi9cblxuICBuc21hbGxlc3QgPSBmdW5jdGlvbihhcnJheSwgbiwgY21wKSB7XG4gICAgdmFyIGVsZW0sIGksIGxvcywgcmVzdWx0LCBfaSwgX2osIF9sZW4sIF9yZWYsIF9yZWYxLCBfcmVzdWx0cztcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGlmIChuICogMTAgPD0gYXJyYXkubGVuZ3RoKSB7XG4gICAgICByZXN1bHQgPSBhcnJheS5zbGljZSgwLCBuKS5zb3J0KGNtcCk7XG4gICAgICBpZiAoIXJlc3VsdC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cbiAgICAgIGxvcyA9IHJlc3VsdFtyZXN1bHQubGVuZ3RoIC0gMV07XG4gICAgICBfcmVmID0gYXJyYXkuc2xpY2Uobik7XG4gICAgICBmb3IgKF9pID0gMCwgX2xlbiA9IF9yZWYubGVuZ3RoOyBfaSA8IF9sZW47IF9pKyspIHtcbiAgICAgICAgZWxlbSA9IF9yZWZbX2ldO1xuICAgICAgICBpZiAoY21wKGVsZW0sIGxvcykgPCAwKSB7XG4gICAgICAgICAgaW5zb3J0KHJlc3VsdCwgZWxlbSwgMCwgbnVsbCwgY21wKTtcbiAgICAgICAgICByZXN1bHQucG9wKCk7XG4gICAgICAgICAgbG9zID0gcmVzdWx0W3Jlc3VsdC5sZW5ndGggLSAxXTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG4gICAgaGVhcGlmeShhcnJheSwgY21wKTtcbiAgICBfcmVzdWx0cyA9IFtdO1xuICAgIGZvciAoaSA9IF9qID0gMCwgX3JlZjEgPSBtaW4obiwgYXJyYXkubGVuZ3RoKTsgMCA8PSBfcmVmMSA/IF9qIDwgX3JlZjEgOiBfaiA+IF9yZWYxOyBpID0gMCA8PSBfcmVmMSA/ICsrX2ogOiAtLV9qKSB7XG4gICAgICBfcmVzdWx0cy5wdXNoKGhlYXBwb3AoYXJyYXksIGNtcCkpO1xuICAgIH1cbiAgICByZXR1cm4gX3Jlc3VsdHM7XG4gIH07XG5cbiAgX3NpZnRkb3duID0gZnVuY3Rpb24oYXJyYXksIHN0YXJ0cG9zLCBwb3MsIGNtcCkge1xuICAgIHZhciBuZXdpdGVtLCBwYXJlbnQsIHBhcmVudHBvcztcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIG5ld2l0ZW0gPSBhcnJheVtwb3NdO1xuICAgIHdoaWxlIChwb3MgPiBzdGFydHBvcykge1xuICAgICAgcGFyZW50cG9zID0gKHBvcyAtIDEpID4+IDE7XG4gICAgICBwYXJlbnQgPSBhcnJheVtwYXJlbnRwb3NdO1xuICAgICAgaWYgKGNtcChuZXdpdGVtLCBwYXJlbnQpIDwgMCkge1xuICAgICAgICBhcnJheVtwb3NdID0gcGFyZW50O1xuICAgICAgICBwb3MgPSBwYXJlbnRwb3M7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBhcnJheVtwb3NdID0gbmV3aXRlbTtcbiAgfTtcblxuICBfc2lmdHVwID0gZnVuY3Rpb24oYXJyYXksIHBvcywgY21wKSB7XG4gICAgdmFyIGNoaWxkcG9zLCBlbmRwb3MsIG5ld2l0ZW0sIHJpZ2h0cG9zLCBzdGFydHBvcztcbiAgICBpZiAoY21wID09IG51bGwpIHtcbiAgICAgIGNtcCA9IGRlZmF1bHRDbXA7XG4gICAgfVxuICAgIGVuZHBvcyA9IGFycmF5Lmxlbmd0aDtcbiAgICBzdGFydHBvcyA9IHBvcztcbiAgICBuZXdpdGVtID0gYXJyYXlbcG9zXTtcbiAgICBjaGlsZHBvcyA9IDIgKiBwb3MgKyAxO1xuICAgIHdoaWxlIChjaGlsZHBvcyA8IGVuZHBvcykge1xuICAgICAgcmlnaHRwb3MgPSBjaGlsZHBvcyArIDE7XG4gICAgICBpZiAocmlnaHRwb3MgPCBlbmRwb3MgJiYgIShjbXAoYXJyYXlbY2hpbGRwb3NdLCBhcnJheVtyaWdodHBvc10pIDwgMCkpIHtcbiAgICAgICAgY2hpbGRwb3MgPSByaWdodHBvcztcbiAgICAgIH1cbiAgICAgIGFycmF5W3Bvc10gPSBhcnJheVtjaGlsZHBvc107XG4gICAgICBwb3MgPSBjaGlsZHBvcztcbiAgICAgIGNoaWxkcG9zID0gMiAqIHBvcyArIDE7XG4gICAgfVxuICAgIGFycmF5W3Bvc10gPSBuZXdpdGVtO1xuICAgIHJldHVybiBfc2lmdGRvd24oYXJyYXksIHN0YXJ0cG9zLCBwb3MsIGNtcCk7XG4gIH07XG5cbiAgSGVhcCA9IChmdW5jdGlvbigpIHtcbiAgICBIZWFwLnB1c2ggPSBoZWFwcHVzaDtcblxuICAgIEhlYXAucG9wID0gaGVhcHBvcDtcblxuICAgIEhlYXAucmVwbGFjZSA9IGhlYXByZXBsYWNlO1xuXG4gICAgSGVhcC5wdXNocG9wID0gaGVhcHB1c2hwb3A7XG5cbiAgICBIZWFwLmhlYXBpZnkgPSBoZWFwaWZ5O1xuXG4gICAgSGVhcC51cGRhdGVJdGVtID0gdXBkYXRlSXRlbTtcblxuICAgIEhlYXAubmxhcmdlc3QgPSBubGFyZ2VzdDtcblxuICAgIEhlYXAubnNtYWxsZXN0ID0gbnNtYWxsZXN0O1xuXG4gICAgZnVuY3Rpb24gSGVhcChjbXApIHtcbiAgICAgIHRoaXMuY21wID0gY21wICE9IG51bGwgPyBjbXAgOiBkZWZhdWx0Q21wO1xuICAgICAgdGhpcy5ub2RlcyA9IFtdO1xuICAgIH1cblxuICAgIEhlYXAucHJvdG90eXBlLnB1c2ggPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gaGVhcHB1c2godGhpcy5ub2RlcywgeCwgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5wb3AgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiBoZWFwcG9wKHRoaXMubm9kZXMsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUucGVlayA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXNbMF07XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLmNvbnRhaW5zID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMuaW5kZXhPZih4KSAhPT0gLTE7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnJlcGxhY2UgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gaGVhcHJlcGxhY2UodGhpcy5ub2RlcywgeCwgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5wdXNocG9wID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIGhlYXBwdXNocG9wKHRoaXMubm9kZXMsIHgsIHRoaXMuY21wKTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuaGVhcGlmeSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIGhlYXBpZnkodGhpcy5ub2RlcywgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS51cGRhdGVJdGVtID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIHVwZGF0ZUl0ZW0odGhpcy5ub2RlcywgeCwgdGhpcy5jbXApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMgPSBbXTtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuZW1wdHkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzLmxlbmd0aCA9PT0gMDtcbiAgICB9O1xuXG4gICAgSGVhcC5wcm90b3R5cGUuc2l6ZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuIHRoaXMubm9kZXMubGVuZ3RoO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5jbG9uZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgdmFyIGhlYXA7XG4gICAgICBoZWFwID0gbmV3IEhlYXAoKTtcbiAgICAgIGhlYXAubm9kZXMgPSB0aGlzLm5vZGVzLnNsaWNlKDApO1xuICAgICAgcmV0dXJuIGhlYXA7XG4gICAgfTtcblxuICAgIEhlYXAucHJvdG90eXBlLnRvQXJyYXkgPSBmdW5jdGlvbigpIHtcbiAgICAgIHJldHVybiB0aGlzLm5vZGVzLnNsaWNlKDApO1xuICAgIH07XG5cbiAgICBIZWFwLnByb3RvdHlwZS5pbnNlcnQgPSBIZWFwLnByb3RvdHlwZS5wdXNoO1xuXG4gICAgSGVhcC5wcm90b3R5cGUudG9wID0gSGVhcC5wcm90b3R5cGUucGVlaztcblxuICAgIEhlYXAucHJvdG90eXBlLmZyb250ID0gSGVhcC5wcm90b3R5cGUucGVlaztcblxuICAgIEhlYXAucHJvdG90eXBlLmhhcyA9IEhlYXAucHJvdG90eXBlLmNvbnRhaW5zO1xuXG4gICAgSGVhcC5wcm90b3R5cGUuY29weSA9IEhlYXAucHJvdG90eXBlLmNsb25lO1xuXG4gICAgcmV0dXJuIEhlYXA7XG5cbiAgfSkoKTtcblxuICAoZnVuY3Rpb24ocm9vdCwgZmFjdG9yeSkge1xuICAgIGlmICh0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpIHtcbiAgICAgIHJldHVybiBkZWZpbmUoW10sIGZhY3RvcnkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKSB7XG4gICAgICByZXR1cm4gbW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiByb290LkhlYXAgPSBmYWN0b3J5KCk7XG4gICAgfVxuICB9KSh0aGlzLCBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gSGVhcDtcbiAgfSk7XG5cbn0pLmNhbGwodGhpcyk7XG4iLCJleHBvcnRzLnJlYWQgPSBmdW5jdGlvbiAoYnVmZmVyLCBvZmZzZXQsIGlzTEUsIG1MZW4sIG5CeXRlcykge1xuICB2YXIgZSwgbVxuICB2YXIgZUxlbiA9IChuQnl0ZXMgKiA4KSAtIG1MZW4gLSAxXG4gIHZhciBlTWF4ID0gKDEgPDwgZUxlbikgLSAxXG4gIHZhciBlQmlhcyA9IGVNYXggPj4gMVxuICB2YXIgbkJpdHMgPSAtN1xuICB2YXIgaSA9IGlzTEUgPyAobkJ5dGVzIC0gMSkgOiAwXG4gIHZhciBkID0gaXNMRSA/IC0xIDogMVxuICB2YXIgcyA9IGJ1ZmZlcltvZmZzZXQgKyBpXVxuXG4gIGkgKz0gZFxuXG4gIGUgPSBzICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIHMgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IGVMZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgZSA9IChlICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIG0gPSBlICYgKCgxIDw8ICgtbkJpdHMpKSAtIDEpXG4gIGUgPj49ICgtbkJpdHMpXG4gIG5CaXRzICs9IG1MZW5cbiAgZm9yICg7IG5CaXRzID4gMDsgbSA9IChtICogMjU2KSArIGJ1ZmZlcltvZmZzZXQgKyBpXSwgaSArPSBkLCBuQml0cyAtPSA4KSB7fVxuXG4gIGlmIChlID09PSAwKSB7XG4gICAgZSA9IDEgLSBlQmlhc1xuICB9IGVsc2UgaWYgKGUgPT09IGVNYXgpIHtcbiAgICByZXR1cm4gbSA/IE5hTiA6ICgocyA/IC0xIDogMSkgKiBJbmZpbml0eSlcbiAgfSBlbHNlIHtcbiAgICBtID0gbSArIE1hdGgucG93KDIsIG1MZW4pXG4gICAgZSA9IGUgLSBlQmlhc1xuICB9XG4gIHJldHVybiAocyA/IC0xIDogMSkgKiBtICogTWF0aC5wb3coMiwgZSAtIG1MZW4pXG59XG5cbmV4cG9ydHMud3JpdGUgPSBmdW5jdGlvbiAoYnVmZmVyLCB2YWx1ZSwgb2Zmc2V0LCBpc0xFLCBtTGVuLCBuQnl0ZXMpIHtcbiAgdmFyIGUsIG0sIGNcbiAgdmFyIGVMZW4gPSAobkJ5dGVzICogOCkgLSBtTGVuIC0gMVxuICB2YXIgZU1heCA9ICgxIDw8IGVMZW4pIC0gMVxuICB2YXIgZUJpYXMgPSBlTWF4ID4+IDFcbiAgdmFyIHJ0ID0gKG1MZW4gPT09IDIzID8gTWF0aC5wb3coMiwgLTI0KSAtIE1hdGgucG93KDIsIC03NykgOiAwKVxuICB2YXIgaSA9IGlzTEUgPyAwIDogKG5CeXRlcyAtIDEpXG4gIHZhciBkID0gaXNMRSA/IDEgOiAtMVxuICB2YXIgcyA9IHZhbHVlIDwgMCB8fCAodmFsdWUgPT09IDAgJiYgMSAvIHZhbHVlIDwgMCkgPyAxIDogMFxuXG4gIHZhbHVlID0gTWF0aC5hYnModmFsdWUpXG5cbiAgaWYgKGlzTmFOKHZhbHVlKSB8fCB2YWx1ZSA9PT0gSW5maW5pdHkpIHtcbiAgICBtID0gaXNOYU4odmFsdWUpID8gMSA6IDBcbiAgICBlID0gZU1heFxuICB9IGVsc2Uge1xuICAgIGUgPSBNYXRoLmZsb29yKE1hdGgubG9nKHZhbHVlKSAvIE1hdGguTE4yKVxuICAgIGlmICh2YWx1ZSAqIChjID0gTWF0aC5wb3coMiwgLWUpKSA8IDEpIHtcbiAgICAgIGUtLVxuICAgICAgYyAqPSAyXG4gICAgfVxuICAgIGlmIChlICsgZUJpYXMgPj0gMSkge1xuICAgICAgdmFsdWUgKz0gcnQgLyBjXG4gICAgfSBlbHNlIHtcbiAgICAgIHZhbHVlICs9IHJ0ICogTWF0aC5wb3coMiwgMSAtIGVCaWFzKVxuICAgIH1cbiAgICBpZiAodmFsdWUgKiBjID49IDIpIHtcbiAgICAgIGUrK1xuICAgICAgYyAvPSAyXG4gICAgfVxuXG4gICAgaWYgKGUgKyBlQmlhcyA+PSBlTWF4KSB7XG4gICAgICBtID0gMFxuICAgICAgZSA9IGVNYXhcbiAgICB9IGVsc2UgaWYgKGUgKyBlQmlhcyA+PSAxKSB7XG4gICAgICBtID0gKCh2YWx1ZSAqIGMpIC0gMSkgKiBNYXRoLnBvdygyLCBtTGVuKVxuICAgICAgZSA9IGUgKyBlQmlhc1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gdmFsdWUgKiBNYXRoLnBvdygyLCBlQmlhcyAtIDEpICogTWF0aC5wb3coMiwgbUxlbilcbiAgICAgIGUgPSAwXG4gICAgfVxuICB9XG5cbiAgZm9yICg7IG1MZW4gPj0gODsgYnVmZmVyW29mZnNldCArIGldID0gbSAmIDB4ZmYsIGkgKz0gZCwgbSAvPSAyNTYsIG1MZW4gLT0gOCkge31cblxuICBlID0gKGUgPDwgbUxlbikgfCBtXG4gIGVMZW4gKz0gbUxlblxuICBmb3IgKDsgZUxlbiA+IDA7IGJ1ZmZlcltvZmZzZXQgKyBpXSA9IGUgJiAweGZmLCBpICs9IGQsIGUgLz0gMjU2LCBlTGVuIC09IDgpIHt9XG5cbiAgYnVmZmVyW29mZnNldCArIGkgLSBkXSB8PSBzICogMTI4XG59XG4iLCJ2YXIgaW50NTMgPSB7fVxuXG52YXIgTUFYX1VJTlQzMiA9IDB4MDAwMDAwMDBGRkZGRkZGRlxudmFyIE1BWF9JTlQ1MyA9ICAweDAwMUZGRkZGRkZGRkZGRkZcblxuZnVuY3Rpb24gb25lc0NvbXBsZW1lbnQobnVtYmVyKSB7XG5cdG51bWJlciA9IH5udW1iZXJcblx0aWYgKG51bWJlciA8IDApIHtcblx0XHRudW1iZXIgPSAobnVtYmVyICYgMHg3RkZGRkZGRikgKyAweDgwMDAwMDAwXG5cdH1cblx0cmV0dXJuIG51bWJlclxufVxuXG5mdW5jdGlvbiB1aW50SGlnaExvdyhudW1iZXIpIHtcblx0Y29uc29sZS5hc3NlcnQobnVtYmVyID4gLTEgJiYgbnVtYmVyIDw9IE1BWF9JTlQ1MywgXCJudW1iZXIgb3V0IG9mIHJhbmdlXCIpXG5cdGNvbnNvbGUuYXNzZXJ0KE1hdGguZmxvb3IobnVtYmVyKSA9PT0gbnVtYmVyLCBcIm51bWJlciBtdXN0IGJlIGFuIGludGVnZXJcIilcblx0dmFyIGhpZ2ggPSAwXG5cdHZhciBzaWduYml0ID0gbnVtYmVyICYgMHhGRkZGRkZGRlxuXHR2YXIgbG93ID0gc2lnbmJpdCA8IDAgPyAobnVtYmVyICYgMHg3RkZGRkZGRikgKyAweDgwMDAwMDAwIDogc2lnbmJpdFxuXHRpZiAobnVtYmVyID4gTUFYX1VJTlQzMikge1xuXHRcdGhpZ2ggPSAobnVtYmVyIC0gbG93KSAvIChNQVhfVUlOVDMyICsgMSlcblx0fVxuXHRyZXR1cm4gW2hpZ2gsIGxvd11cbn1cblxuZnVuY3Rpb24gaW50SGlnaExvdyhudW1iZXIpIHtcblx0aWYgKG51bWJlciA+IC0xKSB7XG5cdFx0cmV0dXJuIHVpbnRIaWdoTG93KG51bWJlcilcblx0fVxuXHR2YXIgaGwgPSB1aW50SGlnaExvdygtbnVtYmVyKVxuXHR2YXIgaGlnaCA9IG9uZXNDb21wbGVtZW50KGhsWzBdKVxuXHR2YXIgbG93ID0gb25lc0NvbXBsZW1lbnQoaGxbMV0pXG5cdGlmIChsb3cgPT09IE1BWF9VSU5UMzIpIHtcblx0XHRoaWdoICs9IDFcblx0XHRsb3cgPSAwXG5cdH1cblx0ZWxzZSB7XG5cdFx0bG93ICs9IDFcblx0fVxuXHRyZXR1cm4gW2hpZ2gsIGxvd11cbn1cblxuZnVuY3Rpb24gdG9Eb3VibGUoaGlnaCwgbG93LCBzaWduZWQpIHtcblx0aWYgKHNpZ25lZCAmJiAoaGlnaCAmIDB4ODAwMDAwMDApICE9PSAwKSB7XG5cdFx0aGlnaCA9IG9uZXNDb21wbGVtZW50KGhpZ2gpXG5cdFx0bG93ID0gb25lc0NvbXBsZW1lbnQobG93KVxuXHRcdGNvbnNvbGUuYXNzZXJ0KGhpZ2ggPCAweDAwMjAwMDAwLCBcIm51bWJlciB0b28gc21hbGxcIilcblx0XHRyZXR1cm4gLSgoaGlnaCAqIChNQVhfVUlOVDMyICsgMSkpICsgbG93ICsgMSlcblx0fVxuXHRlbHNlIHsgLy9wb3NpdGl2ZVxuXHRcdGNvbnNvbGUuYXNzZXJ0KGhpZ2ggPCAweDAwMjAwMDAwLCBcIm51bWJlciB0b28gbGFyZ2VcIilcblx0XHRyZXR1cm4gKGhpZ2ggKiAoTUFYX1VJTlQzMiArIDEpKSArIGxvd1xuXHR9XG59XG5cbmludDUzLnJlYWRJbnQ2NEJFID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0KSB7XG5cdG9mZnNldCA9IG9mZnNldCB8fCAwXG5cdHZhciBoaWdoID0gYnVmZmVyLnJlYWRVSW50MzJCRShvZmZzZXQpXG5cdHZhciBsb3cgPSBidWZmZXIucmVhZFVJbnQzMkJFKG9mZnNldCArIDQpXG5cdHJldHVybiB0b0RvdWJsZShoaWdoLCBsb3csIHRydWUpXG59XG5cbmludDUzLnJlYWRJbnQ2NExFID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0KSB7XG5cdG9mZnNldCA9IG9mZnNldCB8fCAwXG5cdHZhciBsb3cgPSBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldClcblx0dmFyIGhpZ2ggPSBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldCArIDQpXG5cdHJldHVybiB0b0RvdWJsZShoaWdoLCBsb3csIHRydWUpXG59XG5cbmludDUzLnJlYWRVSW50NjRCRSA9IGZ1bmN0aW9uIChidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGlnaCA9IGJ1ZmZlci5yZWFkVUludDMyQkUob2Zmc2V0KVxuXHR2YXIgbG93ID0gYnVmZmVyLnJlYWRVSW50MzJCRShvZmZzZXQgKyA0KVxuXHRyZXR1cm4gdG9Eb3VibGUoaGlnaCwgbG93LCBmYWxzZSlcbn1cblxuaW50NTMucmVhZFVJbnQ2NExFID0gZnVuY3Rpb24gKGJ1ZmZlciwgb2Zmc2V0KSB7XG5cdG9mZnNldCA9IG9mZnNldCB8fCAwXG5cdHZhciBsb3cgPSBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldClcblx0dmFyIGhpZ2ggPSBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldCArIDQpXG5cdHJldHVybiB0b0RvdWJsZShoaWdoLCBsb3csIGZhbHNlKVxufVxuXG5pbnQ1My53cml0ZUludDY0QkUgPSBmdW5jdGlvbiAobnVtYmVyLCBidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGwgPSBpbnRIaWdoTG93KG51bWJlcilcblx0YnVmZmVyLndyaXRlVUludDMyQkUoaGxbMF0sIG9mZnNldClcblx0YnVmZmVyLndyaXRlVUludDMyQkUoaGxbMV0sIG9mZnNldCArIDQpXG59XG5cbmludDUzLndyaXRlSW50NjRMRSA9IGZ1bmN0aW9uIChudW1iZXIsIGJ1ZmZlciwgb2Zmc2V0KSB7XG5cdG9mZnNldCA9IG9mZnNldCB8fCAwXG5cdHZhciBobCA9IGludEhpZ2hMb3cobnVtYmVyKVxuXHRidWZmZXIud3JpdGVVSW50MzJMRShobFsxXSwgb2Zmc2V0KVxuXHRidWZmZXIud3JpdGVVSW50MzJMRShobFswXSwgb2Zmc2V0ICsgNClcbn1cblxuaW50NTMud3JpdGVVSW50NjRCRSA9IGZ1bmN0aW9uIChudW1iZXIsIGJ1ZmZlciwgb2Zmc2V0KSB7XG5cdG9mZnNldCA9IG9mZnNldCB8fCAwXG5cdHZhciBobCA9IHVpbnRIaWdoTG93KG51bWJlcilcblx0YnVmZmVyLndyaXRlVUludDMyQkUoaGxbMF0sIG9mZnNldClcblx0YnVmZmVyLndyaXRlVUludDMyQkUoaGxbMV0sIG9mZnNldCArIDQpXG59XG5cbmludDUzLndyaXRlVUludDY0TEUgPSBmdW5jdGlvbiAobnVtYmVyLCBidWZmZXIsIG9mZnNldCkge1xuXHRvZmZzZXQgPSBvZmZzZXQgfHwgMFxuXHR2YXIgaGwgPSB1aW50SGlnaExvdyhudW1iZXIpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkxFKGhsWzFdLCBvZmZzZXQpXG5cdGJ1ZmZlci53cml0ZVVJbnQzMkxFKGhsWzBdLCBvZmZzZXQgKyA0KVxufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGludDUzXG4iLCJ2YXIgdG9TdHJpbmcgPSB7fS50b1N0cmluZztcblxubW9kdWxlLmV4cG9ydHMgPSBBcnJheS5pc0FycmF5IHx8IGZ1bmN0aW9uIChhcnIpIHtcbiAgcmV0dXJuIHRvU3RyaW5nLmNhbGwoYXJyKSA9PSAnW29iamVjdCBBcnJheV0nO1xufTtcbiIsIi8qIVxuICogVGhlIGJ1ZmZlciBtb2R1bGUgZnJvbSBub2RlLmpzLCBmb3IgdGhlIGJyb3dzZXIuXG4gKlxuICogQGF1dGhvciAgIEZlcm9zcyBBYm91a2hhZGlqZWggPGZlcm9zc0BmZXJvc3Mub3JnPiA8aHR0cDovL2Zlcm9zcy5vcmc+XG4gKiBAbGljZW5zZSAgTUlUXG4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXByb3RvICovXG5cbid1c2Ugc3RyaWN0J1xuXG52YXIgYmFzZTY0ID0gcmVxdWlyZSgnYmFzZTY0LWpzJylcbnZhciBpZWVlNzU0ID0gcmVxdWlyZSgnaWVlZTc1NCcpXG52YXIgaXNBcnJheSA9IHJlcXVpcmUoJ2lzYXJyYXknKVxuXG5leHBvcnRzLkJ1ZmZlciA9IEJ1ZmZlclxuZXhwb3J0cy5TbG93QnVmZmVyID0gU2xvd0J1ZmZlclxuZXhwb3J0cy5JTlNQRUNUX01BWF9CWVRFUyA9IDUwXG5cbi8qKlxuICogSWYgYEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUYDpcbiAqICAgPT09IHRydWUgICAgVXNlIFVpbnQ4QXJyYXkgaW1wbGVtZW50YXRpb24gKGZhc3Rlc3QpXG4gKiAgID09PSBmYWxzZSAgIFVzZSBPYmplY3QgaW1wbGVtZW50YXRpb24gKG1vc3QgY29tcGF0aWJsZSwgZXZlbiBJRTYpXG4gKlxuICogQnJvd3NlcnMgdGhhdCBzdXBwb3J0IHR5cGVkIGFycmF5cyBhcmUgSUUgMTArLCBGaXJlZm94IDQrLCBDaHJvbWUgNyssIFNhZmFyaSA1LjErLFxuICogT3BlcmEgMTEuNissIGlPUyA0LjIrLlxuICpcbiAqIER1ZSB0byB2YXJpb3VzIGJyb3dzZXIgYnVncywgc29tZXRpbWVzIHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24gd2lsbCBiZSB1c2VkIGV2ZW5cbiAqIHdoZW4gdGhlIGJyb3dzZXIgc3VwcG9ydHMgdHlwZWQgYXJyYXlzLlxuICpcbiAqIE5vdGU6XG4gKlxuICogICAtIEZpcmVmb3ggNC0yOSBsYWNrcyBzdXBwb3J0IGZvciBhZGRpbmcgbmV3IHByb3BlcnRpZXMgdG8gYFVpbnQ4QXJyYXlgIGluc3RhbmNlcyxcbiAqICAgICBTZWU6IGh0dHBzOi8vYnVnemlsbGEubW96aWxsYS5vcmcvc2hvd19idWcuY2dpP2lkPTY5NTQzOC5cbiAqXG4gKiAgIC0gQ2hyb21lIDktMTAgaXMgbWlzc2luZyB0aGUgYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbi5cbiAqXG4gKiAgIC0gSUUxMCBoYXMgYSBicm9rZW4gYFR5cGVkQXJyYXkucHJvdG90eXBlLnN1YmFycmF5YCBmdW5jdGlvbiB3aGljaCByZXR1cm5zIGFycmF5cyBvZlxuICogICAgIGluY29ycmVjdCBsZW5ndGggaW4gc29tZSBzaXR1YXRpb25zLlxuXG4gKiBXZSBkZXRlY3QgdGhlc2UgYnVnZ3kgYnJvd3NlcnMgYW5kIHNldCBgQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlRgIHRvIGBmYWxzZWAgc28gdGhleVxuICogZ2V0IHRoZSBPYmplY3QgaW1wbGVtZW50YXRpb24sIHdoaWNoIGlzIHNsb3dlciBidXQgYmVoYXZlcyBjb3JyZWN0bHkuXG4gKi9cbkJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUID0gZ2xvYmFsLlRZUEVEX0FSUkFZX1NVUFBPUlQgIT09IHVuZGVmaW5lZFxuICA/IGdsb2JhbC5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gIDogdHlwZWRBcnJheVN1cHBvcnQoKVxuXG4vKlxuICogRXhwb3J0IGtNYXhMZW5ndGggYWZ0ZXIgdHlwZWQgYXJyYXkgc3VwcG9ydCBpcyBkZXRlcm1pbmVkLlxuICovXG5leHBvcnRzLmtNYXhMZW5ndGggPSBrTWF4TGVuZ3RoKClcblxuZnVuY3Rpb24gdHlwZWRBcnJheVN1cHBvcnQgKCkge1xuICB0cnkge1xuICAgIHZhciBhcnIgPSBuZXcgVWludDhBcnJheSgxKVxuICAgIGFyci5fX3Byb3RvX18gPSB7X19wcm90b19fOiBVaW50OEFycmF5LnByb3RvdHlwZSwgZm9vOiBmdW5jdGlvbiAoKSB7IHJldHVybiA0MiB9fVxuICAgIHJldHVybiBhcnIuZm9vKCkgPT09IDQyICYmIC8vIHR5cGVkIGFycmF5IGluc3RhbmNlcyBjYW4gYmUgYXVnbWVudGVkXG4gICAgICAgIHR5cGVvZiBhcnIuc3ViYXJyYXkgPT09ICdmdW5jdGlvbicgJiYgLy8gY2hyb21lIDktMTAgbGFjayBgc3ViYXJyYXlgXG4gICAgICAgIGFyci5zdWJhcnJheSgxLCAxKS5ieXRlTGVuZ3RoID09PSAwIC8vIGllMTAgaGFzIGJyb2tlbiBgc3ViYXJyYXlgXG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gZmFsc2VcbiAgfVxufVxuXG5mdW5jdGlvbiBrTWF4TGVuZ3RoICgpIHtcbiAgcmV0dXJuIEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUXG4gICAgPyAweDdmZmZmZmZmXG4gICAgOiAweDNmZmZmZmZmXG59XG5cbmZ1bmN0aW9uIGNyZWF0ZUJ1ZmZlciAodGhhdCwgbGVuZ3RoKSB7XG4gIGlmIChrTWF4TGVuZ3RoKCkgPCBsZW5ndGgpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW52YWxpZCB0eXBlZCBhcnJheSBsZW5ndGgnKVxuICB9XG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBuZXcgVWludDhBcnJheShsZW5ndGgpXG4gICAgdGhhdC5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgLy8gRmFsbGJhY2s6IFJldHVybiBhbiBvYmplY3QgaW5zdGFuY2Ugb2YgdGhlIEJ1ZmZlciBjbGFzc1xuICAgIGlmICh0aGF0ID09PSBudWxsKSB7XG4gICAgICB0aGF0ID0gbmV3IEJ1ZmZlcihsZW5ndGgpXG4gICAgfVxuICAgIHRoYXQubGVuZ3RoID0gbGVuZ3RoXG4gIH1cblxuICByZXR1cm4gdGhhdFxufVxuXG4vKipcbiAqIFRoZSBCdWZmZXIgY29uc3RydWN0b3IgcmV0dXJucyBpbnN0YW5jZXMgb2YgYFVpbnQ4QXJyYXlgIHRoYXQgaGF2ZSB0aGVpclxuICogcHJvdG90eXBlIGNoYW5nZWQgdG8gYEJ1ZmZlci5wcm90b3R5cGVgLiBGdXJ0aGVybW9yZSwgYEJ1ZmZlcmAgaXMgYSBzdWJjbGFzcyBvZlxuICogYFVpbnQ4QXJyYXlgLCBzbyB0aGUgcmV0dXJuZWQgaW5zdGFuY2VzIHdpbGwgaGF2ZSBhbGwgdGhlIG5vZGUgYEJ1ZmZlcmAgbWV0aG9kc1xuICogYW5kIHRoZSBgVWludDhBcnJheWAgbWV0aG9kcy4gU3F1YXJlIGJyYWNrZXQgbm90YXRpb24gd29ya3MgYXMgZXhwZWN0ZWQgLS0gaXRcbiAqIHJldHVybnMgYSBzaW5nbGUgb2N0ZXQuXG4gKlxuICogVGhlIGBVaW50OEFycmF5YCBwcm90b3R5cGUgcmVtYWlucyB1bm1vZGlmaWVkLlxuICovXG5cbmZ1bmN0aW9uIEJ1ZmZlciAoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgaWYgKCFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCAmJiAhKHRoaXMgaW5zdGFuY2VvZiBCdWZmZXIpKSB7XG4gICAgcmV0dXJuIG5ldyBCdWZmZXIoYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICAvLyBDb21tb24gY2FzZS5cbiAgaWYgKHR5cGVvZiBhcmcgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZ09yT2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnSWYgZW5jb2RpbmcgaXMgc3BlY2lmaWVkIHRoZW4gdGhlIGZpcnN0IGFyZ3VtZW50IG11c3QgYmUgYSBzdHJpbmcnXG4gICAgICApXG4gICAgfVxuICAgIHJldHVybiBhbGxvY1Vuc2FmZSh0aGlzLCBhcmcpXG4gIH1cbiAgcmV0dXJuIGZyb20odGhpcywgYXJnLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG59XG5cbkJ1ZmZlci5wb29sU2l6ZSA9IDgxOTIgLy8gbm90IHVzZWQgYnkgdGhpcyBpbXBsZW1lbnRhdGlvblxuXG4vLyBUT0RPOiBMZWdhY3ksIG5vdCBuZWVkZWQgYW55bW9yZS4gUmVtb3ZlIGluIG5leHQgbWFqb3IgdmVyc2lvbi5cbkJ1ZmZlci5fYXVnbWVudCA9IGZ1bmN0aW9uIChhcnIpIHtcbiAgYXJyLl9fcHJvdG9fXyA9IEJ1ZmZlci5wcm90b3R5cGVcbiAgcmV0dXJuIGFyclxufVxuXG5mdW5jdGlvbiBmcm9tICh0aGF0LCB2YWx1ZSwgZW5jb2RpbmdPck9mZnNldCwgbGVuZ3RoKSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJ2YWx1ZVwiIGFyZ3VtZW50IG11c3Qgbm90IGJlIGEgbnVtYmVyJylcbiAgfVxuXG4gIGlmICh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpIHtcbiAgICByZXR1cm4gZnJvbUFycmF5QnVmZmVyKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpXG4gIH1cblxuICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgIHJldHVybiBmcm9tU3RyaW5nKHRoYXQsIHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0KVxuICB9XG5cbiAgcmV0dXJuIGZyb21PYmplY3QodGhhdCwgdmFsdWUpXG59XG5cbi8qKlxuICogRnVuY3Rpb25hbGx5IGVxdWl2YWxlbnQgdG8gQnVmZmVyKGFyZywgZW5jb2RpbmcpIGJ1dCB0aHJvd3MgYSBUeXBlRXJyb3JcbiAqIGlmIHZhbHVlIGlzIGEgbnVtYmVyLlxuICogQnVmZmVyLmZyb20oc3RyWywgZW5jb2RpbmddKVxuICogQnVmZmVyLmZyb20oYXJyYXkpXG4gKiBCdWZmZXIuZnJvbShidWZmZXIpXG4gKiBCdWZmZXIuZnJvbShhcnJheUJ1ZmZlclssIGJ5dGVPZmZzZXRbLCBsZW5ndGhdXSlcbiAqKi9cbkJ1ZmZlci5mcm9tID0gZnVuY3Rpb24gKHZhbHVlLCBlbmNvZGluZ09yT2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGZyb20obnVsbCwgdmFsdWUsIGVuY29kaW5nT3JPZmZzZXQsIGxlbmd0aClcbn1cblxuaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gIEJ1ZmZlci5wcm90b3R5cGUuX19wcm90b19fID0gVWludDhBcnJheS5wcm90b3R5cGVcbiAgQnVmZmVyLl9fcHJvdG9fXyA9IFVpbnQ4QXJyYXlcbiAgaWYgKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC5zcGVjaWVzICYmXG4gICAgICBCdWZmZXJbU3ltYm9sLnNwZWNpZXNdID09PSBCdWZmZXIpIHtcbiAgICAvLyBGaXggc3ViYXJyYXkoKSBpbiBFUzIwMTYuIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2Zlcm9zcy9idWZmZXIvcHVsbC85N1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCdWZmZXIsIFN5bWJvbC5zcGVjaWVzLCB7XG4gICAgICB2YWx1ZTogbnVsbCxcbiAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pXG4gIH1cbn1cblxuZnVuY3Rpb24gYXNzZXJ0U2l6ZSAoc2l6ZSkge1xuICBpZiAodHlwZW9mIHNpemUgIT09ICdudW1iZXInKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBiZSBhIG51bWJlcicpXG4gIH0gZWxzZSBpZiAoc2l6ZSA8IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXCJzaXplXCIgYXJndW1lbnQgbXVzdCBub3QgYmUgbmVnYXRpdmUnKVxuICB9XG59XG5cbmZ1bmN0aW9uIGFsbG9jICh0aGF0LCBzaXplLCBmaWxsLCBlbmNvZGluZykge1xuICBhc3NlcnRTaXplKHNpemUpXG4gIGlmIChzaXplIDw9IDApIHtcbiAgICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG4gIH1cbiAgaWYgKGZpbGwgIT09IHVuZGVmaW5lZCkge1xuICAgIC8vIE9ubHkgcGF5IGF0dGVudGlvbiB0byBlbmNvZGluZyBpZiBpdCdzIGEgc3RyaW5nLiBUaGlzXG4gICAgLy8gcHJldmVudHMgYWNjaWRlbnRhbGx5IHNlbmRpbmcgaW4gYSBudW1iZXIgdGhhdCB3b3VsZFxuICAgIC8vIGJlIGludGVycHJldHRlZCBhcyBhIHN0YXJ0IG9mZnNldC5cbiAgICByZXR1cm4gdHlwZW9mIGVuY29kaW5nID09PSAnc3RyaW5nJ1xuICAgICAgPyBjcmVhdGVCdWZmZXIodGhhdCwgc2l6ZSkuZmlsbChmaWxsLCBlbmNvZGluZylcbiAgICAgIDogY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpLmZpbGwoZmlsbClcbiAgfVxuICByZXR1cm4gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUpXG59XG5cbi8qKlxuICogQ3JlYXRlcyBhIG5ldyBmaWxsZWQgQnVmZmVyIGluc3RhbmNlLlxuICogYWxsb2Moc2l6ZVssIGZpbGxbLCBlbmNvZGluZ11dKVxuICoqL1xuQnVmZmVyLmFsbG9jID0gZnVuY3Rpb24gKHNpemUsIGZpbGwsIGVuY29kaW5nKSB7XG4gIHJldHVybiBhbGxvYyhudWxsLCBzaXplLCBmaWxsLCBlbmNvZGluZylcbn1cblxuZnVuY3Rpb24gYWxsb2NVbnNhZmUgKHRoYXQsIHNpemUpIHtcbiAgYXNzZXJ0U2l6ZShzaXplKVxuICB0aGF0ID0gY3JlYXRlQnVmZmVyKHRoYXQsIHNpemUgPCAwID8gMCA6IGNoZWNrZWQoc2l6ZSkgfCAwKVxuICBpZiAoIUJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzaXplOyArK2kpIHtcbiAgICAgIHRoYXRbaV0gPSAwXG4gICAgfVxuICB9XG4gIHJldHVybiB0aGF0XG59XG5cbi8qKlxuICogRXF1aXZhbGVudCB0byBCdWZmZXIobnVtKSwgYnkgZGVmYXVsdCBjcmVhdGVzIGEgbm9uLXplcm8tZmlsbGVkIEJ1ZmZlciBpbnN0YW5jZS5cbiAqICovXG5CdWZmZXIuYWxsb2NVbnNhZmUgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cbi8qKlxuICogRXF1aXZhbGVudCB0byBTbG93QnVmZmVyKG51bSksIGJ5IGRlZmF1bHQgY3JlYXRlcyBhIG5vbi16ZXJvLWZpbGxlZCBCdWZmZXIgaW5zdGFuY2UuXG4gKi9cbkJ1ZmZlci5hbGxvY1Vuc2FmZVNsb3cgPSBmdW5jdGlvbiAoc2l6ZSkge1xuICByZXR1cm4gYWxsb2NVbnNhZmUobnVsbCwgc2l6ZSlcbn1cblxuZnVuY3Rpb24gZnJvbVN0cmluZyAodGhhdCwgc3RyaW5nLCBlbmNvZGluZykge1xuICBpZiAodHlwZW9mIGVuY29kaW5nICE9PSAnc3RyaW5nJyB8fCBlbmNvZGluZyA9PT0gJycpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICB9XG5cbiAgaWYgKCFCdWZmZXIuaXNFbmNvZGluZyhlbmNvZGluZykpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdcImVuY29kaW5nXCIgbXVzdCBiZSBhIHZhbGlkIHN0cmluZyBlbmNvZGluZycpXG4gIH1cblxuICB2YXIgbGVuZ3RoID0gYnl0ZUxlbmd0aChzdHJpbmcsIGVuY29kaW5nKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG5cbiAgdmFyIGFjdHVhbCA9IHRoYXQud3JpdGUoc3RyaW5nLCBlbmNvZGluZylcblxuICBpZiAoYWN0dWFsICE9PSBsZW5ndGgpIHtcbiAgICAvLyBXcml0aW5nIGEgaGV4IHN0cmluZywgZm9yIGV4YW1wbGUsIHRoYXQgY29udGFpbnMgaW52YWxpZCBjaGFyYWN0ZXJzIHdpbGxcbiAgICAvLyBjYXVzZSBldmVyeXRoaW5nIGFmdGVyIHRoZSBmaXJzdCBpbnZhbGlkIGNoYXJhY3RlciB0byBiZSBpZ25vcmVkLiAoZS5nLlxuICAgIC8vICdhYnh4Y2QnIHdpbGwgYmUgdHJlYXRlZCBhcyAnYWInKVxuICAgIHRoYXQgPSB0aGF0LnNsaWNlKDAsIGFjdHVhbClcbiAgfVxuXG4gIHJldHVybiB0aGF0XG59XG5cbmZ1bmN0aW9uIGZyb21BcnJheUxpa2UgKHRoYXQsIGFycmF5KSB7XG4gIHZhciBsZW5ndGggPSBhcnJheS5sZW5ndGggPCAwID8gMCA6IGNoZWNrZWQoYXJyYXkubGVuZ3RoKSB8IDBcbiAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW5ndGgpXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpICs9IDEpIHtcbiAgICB0aGF0W2ldID0gYXJyYXlbaV0gJiAyNTVcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tQXJyYXlCdWZmZXIgKHRoYXQsIGFycmF5LCBieXRlT2Zmc2V0LCBsZW5ndGgpIHtcbiAgYXJyYXkuYnl0ZUxlbmd0aCAvLyB0aGlzIHRocm93cyBpZiBgYXJyYXlgIGlzIG5vdCBhIHZhbGlkIEFycmF5QnVmZmVyXG5cbiAgaWYgKGJ5dGVPZmZzZXQgPCAwIHx8IGFycmF5LmJ5dGVMZW5ndGggPCBieXRlT2Zmc2V0KSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1xcJ29mZnNldFxcJyBpcyBvdXQgb2YgYm91bmRzJylcbiAgfVxuXG4gIGlmIChhcnJheS5ieXRlTGVuZ3RoIDwgYnl0ZU9mZnNldCArIChsZW5ndGggfHwgMCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignXFwnbGVuZ3RoXFwnIGlzIG91dCBvZiBib3VuZHMnKVxuICB9XG5cbiAgaWYgKGJ5dGVPZmZzZXQgPT09IHVuZGVmaW5lZCAmJiBsZW5ndGggPT09IHVuZGVmaW5lZCkge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXkpXG4gIH0gZWxzZSBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IG5ldyBVaW50OEFycmF5KGFycmF5LCBieXRlT2Zmc2V0KVxuICB9IGVsc2Uge1xuICAgIGFycmF5ID0gbmV3IFVpbnQ4QXJyYXkoYXJyYXksIGJ5dGVPZmZzZXQsIGxlbmd0aClcbiAgfVxuXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIFJldHVybiBhbiBhdWdtZW50ZWQgYFVpbnQ4QXJyYXlgIGluc3RhbmNlLCBmb3IgYmVzdCBwZXJmb3JtYW5jZVxuICAgIHRoYXQgPSBhcnJheVxuICAgIHRoYXQuX19wcm90b19fID0gQnVmZmVyLnByb3RvdHlwZVxuICB9IGVsc2Uge1xuICAgIC8vIEZhbGxiYWNrOiBSZXR1cm4gYW4gb2JqZWN0IGluc3RhbmNlIG9mIHRoZSBCdWZmZXIgY2xhc3NcbiAgICB0aGF0ID0gZnJvbUFycmF5TGlrZSh0aGF0LCBhcnJheSlcbiAgfVxuICByZXR1cm4gdGhhdFxufVxuXG5mdW5jdGlvbiBmcm9tT2JqZWN0ICh0aGF0LCBvYmopIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihvYmopKSB7XG4gICAgdmFyIGxlbiA9IGNoZWNrZWQob2JqLmxlbmd0aCkgfCAwXG4gICAgdGhhdCA9IGNyZWF0ZUJ1ZmZlcih0aGF0LCBsZW4pXG5cbiAgICBpZiAodGhhdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiB0aGF0XG4gICAgfVxuXG4gICAgb2JqLmNvcHkodGhhdCwgMCwgMCwgbGVuKVxuICAgIHJldHVybiB0aGF0XG4gIH1cblxuICBpZiAob2JqKSB7XG4gICAgaWYgKCh0eXBlb2YgQXJyYXlCdWZmZXIgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgIG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcikgfHwgJ2xlbmd0aCcgaW4gb2JqKSB7XG4gICAgICBpZiAodHlwZW9mIG9iai5sZW5ndGggIT09ICdudW1iZXInIHx8IGlzbmFuKG9iai5sZW5ndGgpKSB7XG4gICAgICAgIHJldHVybiBjcmVhdGVCdWZmZXIodGhhdCwgMClcbiAgICAgIH1cbiAgICAgIHJldHVybiBmcm9tQXJyYXlMaWtlKHRoYXQsIG9iailcbiAgICB9XG5cbiAgICBpZiAob2JqLnR5cGUgPT09ICdCdWZmZXInICYmIGlzQXJyYXkob2JqLmRhdGEpKSB7XG4gICAgICByZXR1cm4gZnJvbUFycmF5TGlrZSh0aGF0LCBvYmouZGF0YSlcbiAgICB9XG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCdGaXJzdCBhcmd1bWVudCBtdXN0IGJlIGEgc3RyaW5nLCBCdWZmZXIsIEFycmF5QnVmZmVyLCBBcnJheSwgb3IgYXJyYXktbGlrZSBvYmplY3QuJylcbn1cblxuZnVuY3Rpb24gY2hlY2tlZCAobGVuZ3RoKSB7XG4gIC8vIE5vdGU6IGNhbm5vdCB1c2UgYGxlbmd0aCA8IGtNYXhMZW5ndGgoKWAgaGVyZSBiZWNhdXNlIHRoYXQgZmFpbHMgd2hlblxuICAvLyBsZW5ndGggaXMgTmFOICh3aGljaCBpcyBvdGhlcndpc2UgY29lcmNlZCB0byB6ZXJvLilcbiAgaWYgKGxlbmd0aCA+PSBrTWF4TGVuZ3RoKCkpIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQXR0ZW1wdCB0byBhbGxvY2F0ZSBCdWZmZXIgbGFyZ2VyIHRoYW4gbWF4aW11bSAnICtcbiAgICAgICAgICAgICAgICAgICAgICAgICAnc2l6ZTogMHgnICsga01heExlbmd0aCgpLnRvU3RyaW5nKDE2KSArICcgYnl0ZXMnKVxuICB9XG4gIHJldHVybiBsZW5ndGggfCAwXG59XG5cbmZ1bmN0aW9uIFNsb3dCdWZmZXIgKGxlbmd0aCkge1xuICBpZiAoK2xlbmd0aCAhPSBsZW5ndGgpIHsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcWVxZXFcbiAgICBsZW5ndGggPSAwXG4gIH1cbiAgcmV0dXJuIEJ1ZmZlci5hbGxvYygrbGVuZ3RoKVxufVxuXG5CdWZmZXIuaXNCdWZmZXIgPSBmdW5jdGlvbiBpc0J1ZmZlciAoYikge1xuICByZXR1cm4gISEoYiAhPSBudWxsICYmIGIuX2lzQnVmZmVyKVxufVxuXG5CdWZmZXIuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKGEsIGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYSkgfHwgIUJ1ZmZlci5pc0J1ZmZlcihiKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50cyBtdXN0IGJlIEJ1ZmZlcnMnKVxuICB9XG5cbiAgaWYgKGEgPT09IGIpIHJldHVybiAwXG5cbiAgdmFyIHggPSBhLmxlbmd0aFxuICB2YXIgeSA9IGIubGVuZ3RoXG5cbiAgZm9yICh2YXIgaSA9IDAsIGxlbiA9IE1hdGgubWluKHgsIHkpOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAoYVtpXSAhPT0gYltpXSkge1xuICAgICAgeCA9IGFbaV1cbiAgICAgIHkgPSBiW2ldXG4gICAgICBicmVha1xuICAgIH1cbiAgfVxuXG4gIGlmICh4IDwgeSkgcmV0dXJuIC0xXG4gIGlmICh5IDwgeCkgcmV0dXJuIDFcbiAgcmV0dXJuIDBcbn1cblxuQnVmZmVyLmlzRW5jb2RpbmcgPSBmdW5jdGlvbiBpc0VuY29kaW5nIChlbmNvZGluZykge1xuICBzd2l0Y2ggKFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKSkge1xuICAgIGNhc2UgJ2hleCc6XG4gICAgY2FzZSAndXRmOCc6XG4gICAgY2FzZSAndXRmLTgnOlxuICAgIGNhc2UgJ2FzY2lpJzpcbiAgICBjYXNlICdsYXRpbjEnOlxuICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgY2FzZSAnYmFzZTY0JzpcbiAgICBjYXNlICd1Y3MyJzpcbiAgICBjYXNlICd1Y3MtMic6XG4gICAgY2FzZSAndXRmMTZsZSc6XG4gICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgcmV0dXJuIHRydWVcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIGZhbHNlXG4gIH1cbn1cblxuQnVmZmVyLmNvbmNhdCA9IGZ1bmN0aW9uIGNvbmNhdCAobGlzdCwgbGVuZ3RoKSB7XG4gIGlmICghaXNBcnJheShsaXN0KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wibGlzdFwiIGFyZ3VtZW50IG11c3QgYmUgYW4gQXJyYXkgb2YgQnVmZmVycycpXG4gIH1cblxuICBpZiAobGlzdC5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gQnVmZmVyLmFsbG9jKDApXG4gIH1cblxuICB2YXIgaVxuICBpZiAobGVuZ3RoID09PSB1bmRlZmluZWQpIHtcbiAgICBsZW5ndGggPSAwXG4gICAgZm9yIChpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyArK2kpIHtcbiAgICAgIGxlbmd0aCArPSBsaXN0W2ldLmxlbmd0aFxuICAgIH1cbiAgfVxuXG4gIHZhciBidWZmZXIgPSBCdWZmZXIuYWxsb2NVbnNhZmUobGVuZ3RoKVxuICB2YXIgcG9zID0gMFxuICBmb3IgKGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7ICsraSkge1xuICAgIHZhciBidWYgPSBsaXN0W2ldXG4gICAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYnVmKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignXCJsaXN0XCIgYXJndW1lbnQgbXVzdCBiZSBhbiBBcnJheSBvZiBCdWZmZXJzJylcbiAgICB9XG4gICAgYnVmLmNvcHkoYnVmZmVyLCBwb3MpXG4gICAgcG9zICs9IGJ1Zi5sZW5ndGhcbiAgfVxuICByZXR1cm4gYnVmZmVyXG59XG5cbmZ1bmN0aW9uIGJ5dGVMZW5ndGggKHN0cmluZywgZW5jb2RpbmcpIHtcbiAgaWYgKEJ1ZmZlci5pc0J1ZmZlcihzdHJpbmcpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5sZW5ndGhcbiAgfVxuICBpZiAodHlwZW9mIEFycmF5QnVmZmVyICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSAnZnVuY3Rpb24nICYmXG4gICAgICAoQXJyYXlCdWZmZXIuaXNWaWV3KHN0cmluZykgfHwgc3RyaW5nIGluc3RhbmNlb2YgQXJyYXlCdWZmZXIpKSB7XG4gICAgcmV0dXJuIHN0cmluZy5ieXRlTGVuZ3RoXG4gIH1cbiAgaWYgKHR5cGVvZiBzdHJpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgc3RyaW5nID0gJycgKyBzdHJpbmdcbiAgfVxuXG4gIHZhciBsZW4gPSBzdHJpbmcubGVuZ3RoXG4gIGlmIChsZW4gPT09IDApIHJldHVybiAwXG5cbiAgLy8gVXNlIGEgZm9yIGxvb3AgdG8gYXZvaWQgcmVjdXJzaW9uXG4gIHZhciBsb3dlcmVkQ2FzZSA9IGZhbHNlXG4gIGZvciAoOzspIHtcbiAgICBzd2l0Y2ggKGVuY29kaW5nKSB7XG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICBjYXNlICdsYXRpbjEnOlxuICAgICAgY2FzZSAnYmluYXJ5JzpcbiAgICAgICAgcmV0dXJuIGxlblxuICAgICAgY2FzZSAndXRmOCc6XG4gICAgICBjYXNlICd1dGYtOCc6XG4gICAgICBjYXNlIHVuZGVmaW5lZDpcbiAgICAgICAgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoXG4gICAgICBjYXNlICd1Y3MyJzpcbiAgICAgIGNhc2UgJ3Vjcy0yJzpcbiAgICAgIGNhc2UgJ3V0ZjE2bGUnOlxuICAgICAgY2FzZSAndXRmLTE2bGUnOlxuICAgICAgICByZXR1cm4gbGVuICogMlxuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGxlbiA+Pj4gMVxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgcmV0dXJuIGJhc2U2NFRvQnl0ZXMoc3RyaW5nKS5sZW5ndGhcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGlmIChsb3dlcmVkQ2FzZSkgcmV0dXJuIHV0ZjhUb0J5dGVzKHN0cmluZykubGVuZ3RoIC8vIGFzc3VtZSB1dGY4XG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5CdWZmZXIuYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGhcblxuZnVuY3Rpb24gc2xvd1RvU3RyaW5nIChlbmNvZGluZywgc3RhcnQsIGVuZCkge1xuICB2YXIgbG93ZXJlZENhc2UgPSBmYWxzZVxuXG4gIC8vIE5vIG5lZWQgdG8gdmVyaWZ5IHRoYXQgXCJ0aGlzLmxlbmd0aCA8PSBNQVhfVUlOVDMyXCIgc2luY2UgaXQncyBhIHJlYWQtb25seVxuICAvLyBwcm9wZXJ0eSBvZiBhIHR5cGVkIGFycmF5LlxuXG4gIC8vIFRoaXMgYmVoYXZlcyBuZWl0aGVyIGxpa2UgU3RyaW5nIG5vciBVaW50OEFycmF5IGluIHRoYXQgd2Ugc2V0IHN0YXJ0L2VuZFxuICAvLyB0byB0aGVpciB1cHBlci9sb3dlciBib3VuZHMgaWYgdGhlIHZhbHVlIHBhc3NlZCBpcyBvdXQgb2YgcmFuZ2UuXG4gIC8vIHVuZGVmaW5lZCBpcyBoYW5kbGVkIHNwZWNpYWxseSBhcyBwZXIgRUNNQS0yNjIgNnRoIEVkaXRpb24sXG4gIC8vIFNlY3Rpb24gMTMuMy4zLjcgUnVudGltZSBTZW1hbnRpY3M6IEtleWVkQmluZGluZ0luaXRpYWxpemF0aW9uLlxuICBpZiAoc3RhcnQgPT09IHVuZGVmaW5lZCB8fCBzdGFydCA8IDApIHtcbiAgICBzdGFydCA9IDBcbiAgfVxuICAvLyBSZXR1cm4gZWFybHkgaWYgc3RhcnQgPiB0aGlzLmxlbmd0aC4gRG9uZSBoZXJlIHRvIHByZXZlbnQgcG90ZW50aWFsIHVpbnQzMlxuICAvLyBjb2VyY2lvbiBmYWlsIGJlbG93LlxuICBpZiAoc3RhcnQgPiB0aGlzLmxlbmd0aCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkIHx8IGVuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgZW5kID0gdGhpcy5sZW5ndGhcbiAgfVxuXG4gIGlmIChlbmQgPD0gMCkge1xuICAgIHJldHVybiAnJ1xuICB9XG5cbiAgLy8gRm9yY2UgY29lcnNpb24gdG8gdWludDMyLiBUaGlzIHdpbGwgYWxzbyBjb2VyY2UgZmFsc2V5L05hTiB2YWx1ZXMgdG8gMC5cbiAgZW5kID4+Pj0gMFxuICBzdGFydCA+Pj49IDBcblxuICBpZiAoZW5kIDw9IHN0YXJ0KSB7XG4gICAgcmV0dXJuICcnXG4gIH1cblxuICBpZiAoIWVuY29kaW5nKSBlbmNvZGluZyA9ICd1dGY4J1xuXG4gIHdoaWxlICh0cnVlKSB7XG4gICAgc3dpdGNoIChlbmNvZGluZykge1xuICAgICAgY2FzZSAnaGV4JzpcbiAgICAgICAgcmV0dXJuIGhleFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ3V0ZjgnOlxuICAgICAgY2FzZSAndXRmLTgnOlxuICAgICAgICByZXR1cm4gdXRmOFNsaWNlKHRoaXMsIHN0YXJ0LCBlbmQpXG5cbiAgICAgIGNhc2UgJ2FzY2lpJzpcbiAgICAgICAgcmV0dXJuIGFzY2lpU2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAnbGF0aW4xJzpcbiAgICAgIGNhc2UgJ2JpbmFyeSc6XG4gICAgICAgIHJldHVybiBsYXRpbjFTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBjYXNlICdiYXNlNjQnOlxuICAgICAgICByZXR1cm4gYmFzZTY0U2xpY2UodGhpcywgc3RhcnQsIGVuZClcblxuICAgICAgY2FzZSAndWNzMic6XG4gICAgICBjYXNlICd1Y3MtMic6XG4gICAgICBjYXNlICd1dGYxNmxlJzpcbiAgICAgIGNhc2UgJ3V0Zi0xNmxlJzpcbiAgICAgICAgcmV0dXJuIHV0ZjE2bGVTbGljZSh0aGlzLCBzdGFydCwgZW5kKVxuXG4gICAgICBkZWZhdWx0OlxuICAgICAgICBpZiAobG93ZXJlZENhc2UpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1Vua25vd24gZW5jb2Rpbmc6ICcgKyBlbmNvZGluZylcbiAgICAgICAgZW5jb2RpbmcgPSAoZW5jb2RpbmcgKyAnJykudG9Mb3dlckNhc2UoKVxuICAgICAgICBsb3dlcmVkQ2FzZSA9IHRydWVcbiAgICB9XG4gIH1cbn1cblxuLy8gVGhlIHByb3BlcnR5IGlzIHVzZWQgYnkgYEJ1ZmZlci5pc0J1ZmZlcmAgYW5kIGBpcy1idWZmZXJgIChpbiBTYWZhcmkgNS03KSB0byBkZXRlY3Rcbi8vIEJ1ZmZlciBpbnN0YW5jZXMuXG5CdWZmZXIucHJvdG90eXBlLl9pc0J1ZmZlciA9IHRydWVcblxuZnVuY3Rpb24gc3dhcCAoYiwgbiwgbSkge1xuICB2YXIgaSA9IGJbbl1cbiAgYltuXSA9IGJbbV1cbiAgYlttXSA9IGlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zd2FwMTYgPSBmdW5jdGlvbiBzd2FwMTYgKCkge1xuICB2YXIgbGVuID0gdGhpcy5sZW5ndGhcbiAgaWYgKGxlbiAlIDIgIT09IDApIHtcbiAgICB0aHJvdyBuZXcgUmFuZ2VFcnJvcignQnVmZmVyIHNpemUgbXVzdCBiZSBhIG11bHRpcGxlIG9mIDE2LWJpdHMnKVxuICB9XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyBpICs9IDIpIHtcbiAgICBzd2FwKHRoaXMsIGksIGkgKyAxKVxuICB9XG4gIHJldHVybiB0aGlzXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuc3dhcDMyID0gZnVuY3Rpb24gc3dhcDMyICgpIHtcbiAgdmFyIGxlbiA9IHRoaXMubGVuZ3RoXG4gIGlmIChsZW4gJSA0ICE9PSAwKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0J1ZmZlciBzaXplIG11c3QgYmUgYSBtdWx0aXBsZSBvZiAzMi1iaXRzJylcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbjsgaSArPSA0KSB7XG4gICAgc3dhcCh0aGlzLCBpLCBpICsgMylcbiAgICBzd2FwKHRoaXMsIGkgKyAxLCBpICsgMilcbiAgfVxuICByZXR1cm4gdGhpc1xufVxuXG5CdWZmZXIucHJvdG90eXBlLnN3YXA2NCA9IGZ1bmN0aW9uIHN3YXA2NCAoKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBpZiAobGVuICUgOCAhPT0gMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdCdWZmZXIgc2l6ZSBtdXN0IGJlIGEgbXVsdGlwbGUgb2YgNjQtYml0cycpXG4gIH1cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW47IGkgKz0gOCkge1xuICAgIHN3YXAodGhpcywgaSwgaSArIDcpXG4gICAgc3dhcCh0aGlzLCBpICsgMSwgaSArIDYpXG4gICAgc3dhcCh0aGlzLCBpICsgMiwgaSArIDUpXG4gICAgc3dhcCh0aGlzLCBpICsgMywgaSArIDQpXG4gIH1cbiAgcmV0dXJuIHRoaXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nICgpIHtcbiAgdmFyIGxlbmd0aCA9IHRoaXMubGVuZ3RoIHwgMFxuICBpZiAobGVuZ3RoID09PSAwKSByZXR1cm4gJydcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHJldHVybiB1dGY4U2xpY2UodGhpcywgMCwgbGVuZ3RoKVxuICByZXR1cm4gc2xvd1RvU3RyaW5nLmFwcGx5KHRoaXMsIGFyZ3VtZW50cylcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5lcXVhbHMgPSBmdW5jdGlvbiBlcXVhbHMgKGIpIHtcbiAgaWYgKCFCdWZmZXIuaXNCdWZmZXIoYikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ0FyZ3VtZW50IG11c3QgYmUgYSBCdWZmZXInKVxuICBpZiAodGhpcyA9PT0gYikgcmV0dXJuIHRydWVcbiAgcmV0dXJuIEJ1ZmZlci5jb21wYXJlKHRoaXMsIGIpID09PSAwXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuaW5zcGVjdCA9IGZ1bmN0aW9uIGluc3BlY3QgKCkge1xuICB2YXIgc3RyID0gJydcbiAgdmFyIG1heCA9IGV4cG9ydHMuSU5TUEVDVF9NQVhfQllURVNcbiAgaWYgKHRoaXMubGVuZ3RoID4gMCkge1xuICAgIHN0ciA9IHRoaXMudG9TdHJpbmcoJ2hleCcsIDAsIG1heCkubWF0Y2goLy57Mn0vZykuam9pbignICcpXG4gICAgaWYgKHRoaXMubGVuZ3RoID4gbWF4KSBzdHIgKz0gJyAuLi4gJ1xuICB9XG4gIHJldHVybiAnPEJ1ZmZlciAnICsgc3RyICsgJz4nXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUuY29tcGFyZSA9IGZ1bmN0aW9uIGNvbXBhcmUgKHRhcmdldCwgc3RhcnQsIGVuZCwgdGhpc1N0YXJ0LCB0aGlzRW5kKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKHRhcmdldCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdBcmd1bWVudCBtdXN0IGJlIGEgQnVmZmVyJylcbiAgfVxuXG4gIGlmIChzdGFydCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgc3RhcnQgPSAwXG4gIH1cbiAgaWYgKGVuZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgZW5kID0gdGFyZ2V0ID8gdGFyZ2V0Lmxlbmd0aCA6IDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID09PSB1bmRlZmluZWQpIHtcbiAgICB0aGlzU3RhcnQgPSAwXG4gIH1cbiAgaWYgKHRoaXNFbmQgPT09IHVuZGVmaW5lZCkge1xuICAgIHRoaXNFbmQgPSB0aGlzLmxlbmd0aFxuICB9XG5cbiAgaWYgKHN0YXJ0IDwgMCB8fCBlbmQgPiB0YXJnZXQubGVuZ3RoIHx8IHRoaXNTdGFydCA8IDAgfHwgdGhpc0VuZCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ291dCBvZiByYW5nZSBpbmRleCcpXG4gIH1cblxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQgJiYgc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDBcbiAgfVxuICBpZiAodGhpc1N0YXJ0ID49IHRoaXNFbmQpIHtcbiAgICByZXR1cm4gLTFcbiAgfVxuICBpZiAoc3RhcnQgPj0gZW5kKSB7XG4gICAgcmV0dXJuIDFcbiAgfVxuXG4gIHN0YXJ0ID4+Pj0gMFxuICBlbmQgPj4+PSAwXG4gIHRoaXNTdGFydCA+Pj49IDBcbiAgdGhpc0VuZCA+Pj49IDBcblxuICBpZiAodGhpcyA9PT0gdGFyZ2V0KSByZXR1cm4gMFxuXG4gIHZhciB4ID0gdGhpc0VuZCAtIHRoaXNTdGFydFxuICB2YXIgeSA9IGVuZCAtIHN0YXJ0XG4gIHZhciBsZW4gPSBNYXRoLm1pbih4LCB5KVxuXG4gIHZhciB0aGlzQ29weSA9IHRoaXMuc2xpY2UodGhpc1N0YXJ0LCB0aGlzRW5kKVxuICB2YXIgdGFyZ2V0Q29weSA9IHRhcmdldC5zbGljZShzdGFydCwgZW5kKVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICBpZiAodGhpc0NvcHlbaV0gIT09IHRhcmdldENvcHlbaV0pIHtcbiAgICAgIHggPSB0aGlzQ29weVtpXVxuICAgICAgeSA9IHRhcmdldENvcHlbaV1cbiAgICAgIGJyZWFrXG4gICAgfVxuICB9XG5cbiAgaWYgKHggPCB5KSByZXR1cm4gLTFcbiAgaWYgKHkgPCB4KSByZXR1cm4gMVxuICByZXR1cm4gMFxufVxuXG4vLyBGaW5kcyBlaXRoZXIgdGhlIGZpcnN0IGluZGV4IG9mIGB2YWxgIGluIGBidWZmZXJgIGF0IG9mZnNldCA+PSBgYnl0ZU9mZnNldGAsXG4vLyBPUiB0aGUgbGFzdCBpbmRleCBvZiBgdmFsYCBpbiBgYnVmZmVyYCBhdCBvZmZzZXQgPD0gYGJ5dGVPZmZzZXRgLlxuLy9cbi8vIEFyZ3VtZW50czpcbi8vIC0gYnVmZmVyIC0gYSBCdWZmZXIgdG8gc2VhcmNoXG4vLyAtIHZhbCAtIGEgc3RyaW5nLCBCdWZmZXIsIG9yIG51bWJlclxuLy8gLSBieXRlT2Zmc2V0IC0gYW4gaW5kZXggaW50byBgYnVmZmVyYDsgd2lsbCBiZSBjbGFtcGVkIHRvIGFuIGludDMyXG4vLyAtIGVuY29kaW5nIC0gYW4gb3B0aW9uYWwgZW5jb2RpbmcsIHJlbGV2YW50IGlzIHZhbCBpcyBhIHN0cmluZ1xuLy8gLSBkaXIgLSB0cnVlIGZvciBpbmRleE9mLCBmYWxzZSBmb3IgbGFzdEluZGV4T2ZcbmZ1bmN0aW9uIGJpZGlyZWN0aW9uYWxJbmRleE9mIChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcsIGRpcikge1xuICAvLyBFbXB0eSBidWZmZXIgbWVhbnMgbm8gbWF0Y2hcbiAgaWYgKGJ1ZmZlci5sZW5ndGggPT09IDApIHJldHVybiAtMVxuXG4gIC8vIE5vcm1hbGl6ZSBieXRlT2Zmc2V0XG4gIGlmICh0eXBlb2YgYnl0ZU9mZnNldCA9PT0gJ3N0cmluZycpIHtcbiAgICBlbmNvZGluZyA9IGJ5dGVPZmZzZXRcbiAgICBieXRlT2Zmc2V0ID0gMFxuICB9IGVsc2UgaWYgKGJ5dGVPZmZzZXQgPiAweDdmZmZmZmZmKSB7XG4gICAgYnl0ZU9mZnNldCA9IDB4N2ZmZmZmZmZcbiAgfSBlbHNlIGlmIChieXRlT2Zmc2V0IDwgLTB4ODAwMDAwMDApIHtcbiAgICBieXRlT2Zmc2V0ID0gLTB4ODAwMDAwMDBcbiAgfVxuICBieXRlT2Zmc2V0ID0gK2J5dGVPZmZzZXQgIC8vIENvZXJjZSB0byBOdW1iZXIuXG4gIGlmIChpc05hTihieXRlT2Zmc2V0KSkge1xuICAgIC8vIGJ5dGVPZmZzZXQ6IGl0IGl0J3MgdW5kZWZpbmVkLCBudWxsLCBOYU4sIFwiZm9vXCIsIGV0Yywgc2VhcmNoIHdob2xlIGJ1ZmZlclxuICAgIGJ5dGVPZmZzZXQgPSBkaXIgPyAwIDogKGJ1ZmZlci5sZW5ndGggLSAxKVxuICB9XG5cbiAgLy8gTm9ybWFsaXplIGJ5dGVPZmZzZXQ6IG5lZ2F0aXZlIG9mZnNldHMgc3RhcnQgZnJvbSB0aGUgZW5kIG9mIHRoZSBidWZmZXJcbiAgaWYgKGJ5dGVPZmZzZXQgPCAwKSBieXRlT2Zmc2V0ID0gYnVmZmVyLmxlbmd0aCArIGJ5dGVPZmZzZXRcbiAgaWYgKGJ5dGVPZmZzZXQgPj0gYnVmZmVyLmxlbmd0aCkge1xuICAgIGlmIChkaXIpIHJldHVybiAtMVxuICAgIGVsc2UgYnl0ZU9mZnNldCA9IGJ1ZmZlci5sZW5ndGggLSAxXG4gIH0gZWxzZSBpZiAoYnl0ZU9mZnNldCA8IDApIHtcbiAgICBpZiAoZGlyKSBieXRlT2Zmc2V0ID0gMFxuICAgIGVsc2UgcmV0dXJuIC0xXG4gIH1cblxuICAvLyBOb3JtYWxpemUgdmFsXG4gIGlmICh0eXBlb2YgdmFsID09PSAnc3RyaW5nJykge1xuICAgIHZhbCA9IEJ1ZmZlci5mcm9tKHZhbCwgZW5jb2RpbmcpXG4gIH1cblxuICAvLyBGaW5hbGx5LCBzZWFyY2ggZWl0aGVyIGluZGV4T2YgKGlmIGRpciBpcyB0cnVlKSBvciBsYXN0SW5kZXhPZlxuICBpZiAoQnVmZmVyLmlzQnVmZmVyKHZhbCkpIHtcbiAgICAvLyBTcGVjaWFsIGNhc2U6IGxvb2tpbmcgZm9yIGVtcHR5IHN0cmluZy9idWZmZXIgYWx3YXlzIGZhaWxzXG4gICAgaWYgKHZhbC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiAtMVxuICAgIH1cbiAgICByZXR1cm4gYXJyYXlJbmRleE9mKGJ1ZmZlciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKVxuICB9IGVsc2UgaWYgKHR5cGVvZiB2YWwgPT09ICdudW1iZXInKSB7XG4gICAgdmFsID0gdmFsICYgMHhGRiAvLyBTZWFyY2ggZm9yIGEgYnl0ZSB2YWx1ZSBbMC0yNTVdXG4gICAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUICYmXG4gICAgICAgIHR5cGVvZiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICBpZiAoZGlyKSB7XG4gICAgICAgIHJldHVybiBVaW50OEFycmF5LnByb3RvdHlwZS5pbmRleE9mLmNhbGwoYnVmZmVyLCB2YWwsIGJ5dGVPZmZzZXQpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gVWludDhBcnJheS5wcm90b3R5cGUubGFzdEluZGV4T2YuY2FsbChidWZmZXIsIHZhbCwgYnl0ZU9mZnNldClcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGFycmF5SW5kZXhPZihidWZmZXIsIFsgdmFsIF0sIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBkaXIpXG4gIH1cblxuICB0aHJvdyBuZXcgVHlwZUVycm9yKCd2YWwgbXVzdCBiZSBzdHJpbmcsIG51bWJlciBvciBCdWZmZXInKVxufVxuXG5mdW5jdGlvbiBhcnJheUluZGV4T2YgKGFyciwgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgZGlyKSB7XG4gIHZhciBpbmRleFNpemUgPSAxXG4gIHZhciBhcnJMZW5ndGggPSBhcnIubGVuZ3RoXG4gIHZhciB2YWxMZW5ndGggPSB2YWwubGVuZ3RoXG5cbiAgaWYgKGVuY29kaW5nICE9PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9IFN0cmluZyhlbmNvZGluZykudG9Mb3dlckNhc2UoKVxuICAgIGlmIChlbmNvZGluZyA9PT0gJ3VjczInIHx8IGVuY29kaW5nID09PSAndWNzLTInIHx8XG4gICAgICAgIGVuY29kaW5nID09PSAndXRmMTZsZScgfHwgZW5jb2RpbmcgPT09ICd1dGYtMTZsZScpIHtcbiAgICAgIGlmIChhcnIubGVuZ3RoIDwgMiB8fCB2YWwubGVuZ3RoIDwgMikge1xuICAgICAgICByZXR1cm4gLTFcbiAgICAgIH1cbiAgICAgIGluZGV4U2l6ZSA9IDJcbiAgICAgIGFyckxlbmd0aCAvPSAyXG4gICAgICB2YWxMZW5ndGggLz0gMlxuICAgICAgYnl0ZU9mZnNldCAvPSAyXG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gcmVhZCAoYnVmLCBpKSB7XG4gICAgaWYgKGluZGV4U2l6ZSA9PT0gMSkge1xuICAgICAgcmV0dXJuIGJ1ZltpXVxuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gYnVmLnJlYWRVSW50MTZCRShpICogaW5kZXhTaXplKVxuICAgIH1cbiAgfVxuXG4gIHZhciBpXG4gIGlmIChkaXIpIHtcbiAgICB2YXIgZm91bmRJbmRleCA9IC0xXG4gICAgZm9yIChpID0gYnl0ZU9mZnNldDsgaSA8IGFyckxlbmd0aDsgaSsrKSB7XG4gICAgICBpZiAocmVhZChhcnIsIGkpID09PSByZWFkKHZhbCwgZm91bmRJbmRleCA9PT0gLTEgPyAwIDogaSAtIGZvdW5kSW5kZXgpKSB7XG4gICAgICAgIGlmIChmb3VuZEluZGV4ID09PSAtMSkgZm91bmRJbmRleCA9IGlcbiAgICAgICAgaWYgKGkgLSBmb3VuZEluZGV4ICsgMSA9PT0gdmFsTGVuZ3RoKSByZXR1cm4gZm91bmRJbmRleCAqIGluZGV4U2l6ZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGZvdW5kSW5kZXggIT09IC0xKSBpIC09IGkgLSBmb3VuZEluZGV4XG4gICAgICAgIGZvdW5kSW5kZXggPSAtMVxuICAgICAgfVxuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBpZiAoYnl0ZU9mZnNldCArIHZhbExlbmd0aCA+IGFyckxlbmd0aCkgYnl0ZU9mZnNldCA9IGFyckxlbmd0aCAtIHZhbExlbmd0aFxuICAgIGZvciAoaSA9IGJ5dGVPZmZzZXQ7IGkgPj0gMDsgaS0tKSB7XG4gICAgICB2YXIgZm91bmQgPSB0cnVlXG4gICAgICBmb3IgKHZhciBqID0gMDsgaiA8IHZhbExlbmd0aDsgaisrKSB7XG4gICAgICAgIGlmIChyZWFkKGFyciwgaSArIGopICE9PSByZWFkKHZhbCwgaikpIHtcbiAgICAgICAgICBmb3VuZCA9IGZhbHNlXG4gICAgICAgICAgYnJlYWtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgaWYgKGZvdW5kKSByZXR1cm4gaVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAtMVxufVxuXG5CdWZmZXIucHJvdG90eXBlLmluY2x1ZGVzID0gZnVuY3Rpb24gaW5jbHVkZXMgKHZhbCwgYnl0ZU9mZnNldCwgZW5jb2RpbmcpIHtcbiAgcmV0dXJuIHRoaXMuaW5kZXhPZih2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSAhPT0gLTFcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5pbmRleE9mID0gZnVuY3Rpb24gaW5kZXhPZiAodmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZykge1xuICByZXR1cm4gYmlkaXJlY3Rpb25hbEluZGV4T2YodGhpcywgdmFsLCBieXRlT2Zmc2V0LCBlbmNvZGluZywgdHJ1ZSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5sYXN0SW5kZXhPZiA9IGZ1bmN0aW9uIGxhc3RJbmRleE9mICh2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nKSB7XG4gIHJldHVybiBiaWRpcmVjdGlvbmFsSW5kZXhPZih0aGlzLCB2YWwsIGJ5dGVPZmZzZXQsIGVuY29kaW5nLCBmYWxzZSlcbn1cblxuZnVuY3Rpb24gaGV4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICBvZmZzZXQgPSBOdW1iZXIob2Zmc2V0KSB8fCAwXG4gIHZhciByZW1haW5pbmcgPSBidWYubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmICghbGVuZ3RoKSB7XG4gICAgbGVuZ3RoID0gcmVtYWluaW5nXG4gIH0gZWxzZSB7XG4gICAgbGVuZ3RoID0gTnVtYmVyKGxlbmd0aClcbiAgICBpZiAobGVuZ3RoID4gcmVtYWluaW5nKSB7XG4gICAgICBsZW5ndGggPSByZW1haW5pbmdcbiAgICB9XG4gIH1cblxuICAvLyBtdXN0IGJlIGFuIGV2ZW4gbnVtYmVyIG9mIGRpZ2l0c1xuICB2YXIgc3RyTGVuID0gc3RyaW5nLmxlbmd0aFxuICBpZiAoc3RyTGVuICUgMiAhPT0gMCkgdGhyb3cgbmV3IFR5cGVFcnJvcignSW52YWxpZCBoZXggc3RyaW5nJylcblxuICBpZiAobGVuZ3RoID4gc3RyTGVuIC8gMikge1xuICAgIGxlbmd0aCA9IHN0ckxlbiAvIDJcbiAgfVxuICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgKytpKSB7XG4gICAgdmFyIHBhcnNlZCA9IHBhcnNlSW50KHN0cmluZy5zdWJzdHIoaSAqIDIsIDIpLCAxNilcbiAgICBpZiAoaXNOYU4ocGFyc2VkKSkgcmV0dXJuIGlcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSBwYXJzZWRcbiAgfVxuICByZXR1cm4gaVxufVxuXG5mdW5jdGlvbiB1dGY4V3JpdGUgKGJ1Ziwgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aCkge1xuICByZXR1cm4gYmxpdEJ1ZmZlcih1dGY4VG9CeXRlcyhzdHJpbmcsIGJ1Zi5sZW5ndGggLSBvZmZzZXQpLCBidWYsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBhc2NpaVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIoYXNjaWlUb0J5dGVzKHN0cmluZyksIGJ1Ziwgb2Zmc2V0LCBsZW5ndGgpXG59XG5cbmZ1bmN0aW9uIGxhdGluMVdyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGFzY2lpV3JpdGUoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxufVxuXG5mdW5jdGlvbiBiYXNlNjRXcml0ZSAoYnVmLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIHJldHVybiBibGl0QnVmZmVyKGJhc2U2NFRvQnl0ZXMoc3RyaW5nKSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuZnVuY3Rpb24gdWNzMldyaXRlIChidWYsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpIHtcbiAgcmV0dXJuIGJsaXRCdWZmZXIodXRmMTZsZVRvQnl0ZXMoc3RyaW5nLCBidWYubGVuZ3RoIC0gb2Zmc2V0KSwgYnVmLCBvZmZzZXQsIGxlbmd0aClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZSA9IGZ1bmN0aW9uIHdyaXRlIChzdHJpbmcsIG9mZnNldCwgbGVuZ3RoLCBlbmNvZGluZykge1xuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nKVxuICBpZiAob2Zmc2V0ID09PSB1bmRlZmluZWQpIHtcbiAgICBlbmNvZGluZyA9ICd1dGY4J1xuICAgIGxlbmd0aCA9IHRoaXMubGVuZ3RoXG4gICAgb2Zmc2V0ID0gMFxuICAvLyBCdWZmZXIjd3JpdGUoc3RyaW5nLCBlbmNvZGluZylcbiAgfSBlbHNlIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCAmJiB0eXBlb2Ygb2Zmc2V0ID09PSAnc3RyaW5nJykge1xuICAgIGVuY29kaW5nID0gb2Zmc2V0XG4gICAgbGVuZ3RoID0gdGhpcy5sZW5ndGhcbiAgICBvZmZzZXQgPSAwXG4gIC8vIEJ1ZmZlciN3cml0ZShzdHJpbmcsIG9mZnNldFssIGxlbmd0aF1bLCBlbmNvZGluZ10pXG4gIH0gZWxzZSBpZiAoaXNGaW5pdGUob2Zmc2V0KSkge1xuICAgIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgICBpZiAoaXNGaW5pdGUobGVuZ3RoKSkge1xuICAgICAgbGVuZ3RoID0gbGVuZ3RoIHwgMFxuICAgICAgaWYgKGVuY29kaW5nID09PSB1bmRlZmluZWQpIGVuY29kaW5nID0gJ3V0ZjgnXG4gICAgfSBlbHNlIHtcbiAgICAgIGVuY29kaW5nID0gbGVuZ3RoXG4gICAgICBsZW5ndGggPSB1bmRlZmluZWRcbiAgICB9XG4gIC8vIGxlZ2FjeSB3cml0ZShzdHJpbmcsIGVuY29kaW5nLCBvZmZzZXQsIGxlbmd0aCkgLSByZW1vdmUgaW4gdjAuMTNcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnQnVmZmVyLndyaXRlKHN0cmluZywgZW5jb2RpbmcsIG9mZnNldFssIGxlbmd0aF0pIGlzIG5vIGxvbmdlciBzdXBwb3J0ZWQnXG4gICAgKVxuICB9XG5cbiAgdmFyIHJlbWFpbmluZyA9IHRoaXMubGVuZ3RoIC0gb2Zmc2V0XG4gIGlmIChsZW5ndGggPT09IHVuZGVmaW5lZCB8fCBsZW5ndGggPiByZW1haW5pbmcpIGxlbmd0aCA9IHJlbWFpbmluZ1xuXG4gIGlmICgoc3RyaW5nLmxlbmd0aCA+IDAgJiYgKGxlbmd0aCA8IDAgfHwgb2Zmc2V0IDwgMCkpIHx8IG9mZnNldCA+IHRoaXMubGVuZ3RoKSB7XG4gICAgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ0F0dGVtcHQgdG8gd3JpdGUgb3V0c2lkZSBidWZmZXIgYm91bmRzJylcbiAgfVxuXG4gIGlmICghZW5jb2RpbmcpIGVuY29kaW5nID0gJ3V0ZjgnXG5cbiAgdmFyIGxvd2VyZWRDYXNlID0gZmFsc2VcbiAgZm9yICg7Oykge1xuICAgIHN3aXRjaCAoZW5jb2RpbmcpIHtcbiAgICAgIGNhc2UgJ2hleCc6XG4gICAgICAgIHJldHVybiBoZXhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICd1dGY4JzpcbiAgICAgIGNhc2UgJ3V0Zi04JzpcbiAgICAgICAgcmV0dXJuIHV0ZjhXcml0ZSh0aGlzLCBzdHJpbmcsIG9mZnNldCwgbGVuZ3RoKVxuXG4gICAgICBjYXNlICdhc2NpaSc6XG4gICAgICAgIHJldHVybiBhc2NpaVdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ2xhdGluMSc6XG4gICAgICBjYXNlICdiaW5hcnknOlxuICAgICAgICByZXR1cm4gbGF0aW4xV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgY2FzZSAnYmFzZTY0JzpcbiAgICAgICAgLy8gV2FybmluZzogbWF4TGVuZ3RoIG5vdCB0YWtlbiBpbnRvIGFjY291bnQgaW4gYmFzZTY0V3JpdGVcbiAgICAgICAgcmV0dXJuIGJhc2U2NFdyaXRlKHRoaXMsIHN0cmluZywgb2Zmc2V0LCBsZW5ndGgpXG5cbiAgICAgIGNhc2UgJ3VjczInOlxuICAgICAgY2FzZSAndWNzLTInOlxuICAgICAgY2FzZSAndXRmMTZsZSc6XG4gICAgICBjYXNlICd1dGYtMTZsZSc6XG4gICAgICAgIHJldHVybiB1Y3MyV3JpdGUodGhpcywgc3RyaW5nLCBvZmZzZXQsIGxlbmd0aClcblxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgaWYgKGxvd2VyZWRDYXNlKSB0aHJvdyBuZXcgVHlwZUVycm9yKCdVbmtub3duIGVuY29kaW5nOiAnICsgZW5jb2RpbmcpXG4gICAgICAgIGVuY29kaW5nID0gKCcnICsgZW5jb2RpbmcpLnRvTG93ZXJDYXNlKClcbiAgICAgICAgbG93ZXJlZENhc2UgPSB0cnVlXG4gICAgfVxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUudG9KU09OID0gZnVuY3Rpb24gdG9KU09OICgpIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQnVmZmVyJyxcbiAgICBkYXRhOiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0aGlzLl9hcnIgfHwgdGhpcywgMClcbiAgfVxufVxuXG5mdW5jdGlvbiBiYXNlNjRTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIGlmIChzdGFydCA9PT0gMCAmJiBlbmQgPT09IGJ1Zi5sZW5ndGgpIHtcbiAgICByZXR1cm4gYmFzZTY0LmZyb21CeXRlQXJyYXkoYnVmKVxuICB9IGVsc2Uge1xuICAgIHJldHVybiBiYXNlNjQuZnJvbUJ5dGVBcnJheShidWYuc2xpY2Uoc3RhcnQsIGVuZCkpXG4gIH1cbn1cblxuZnVuY3Rpb24gdXRmOFNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgZW5kID0gTWF0aC5taW4oYnVmLmxlbmd0aCwgZW5kKVxuICB2YXIgcmVzID0gW11cblxuICB2YXIgaSA9IHN0YXJ0XG4gIHdoaWxlIChpIDwgZW5kKSB7XG4gICAgdmFyIGZpcnN0Qnl0ZSA9IGJ1ZltpXVxuICAgIHZhciBjb2RlUG9pbnQgPSBudWxsXG4gICAgdmFyIGJ5dGVzUGVyU2VxdWVuY2UgPSAoZmlyc3RCeXRlID4gMHhFRikgPyA0XG4gICAgICA6IChmaXJzdEJ5dGUgPiAweERGKSA/IDNcbiAgICAgIDogKGZpcnN0Qnl0ZSA+IDB4QkYpID8gMlxuICAgICAgOiAxXG5cbiAgICBpZiAoaSArIGJ5dGVzUGVyU2VxdWVuY2UgPD0gZW5kKSB7XG4gICAgICB2YXIgc2Vjb25kQnl0ZSwgdGhpcmRCeXRlLCBmb3VydGhCeXRlLCB0ZW1wQ29kZVBvaW50XG5cbiAgICAgIHN3aXRjaCAoYnl0ZXNQZXJTZXF1ZW5jZSkge1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgaWYgKGZpcnN0Qnl0ZSA8IDB4ODApIHtcbiAgICAgICAgICAgIGNvZGVQb2ludCA9IGZpcnN0Qnl0ZVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweDFGKSA8PCAweDYgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4N0YpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgaWYgKChzZWNvbmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKHRoaXJkQnl0ZSAmIDB4QzApID09PSAweDgwKSB7XG4gICAgICAgICAgICB0ZW1wQ29kZVBvaW50ID0gKGZpcnN0Qnl0ZSAmIDB4RikgPDwgMHhDIHwgKHNlY29uZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAodGhpcmRCeXRlICYgMHgzRilcbiAgICAgICAgICAgIGlmICh0ZW1wQ29kZVBvaW50ID4gMHg3RkYgJiYgKHRlbXBDb2RlUG9pbnQgPCAweEQ4MDAgfHwgdGVtcENvZGVQb2ludCA+IDB4REZGRikpIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBicmVha1xuICAgICAgICBjYXNlIDQ6XG4gICAgICAgICAgc2Vjb25kQnl0ZSA9IGJ1ZltpICsgMV1cbiAgICAgICAgICB0aGlyZEJ5dGUgPSBidWZbaSArIDJdXG4gICAgICAgICAgZm91cnRoQnl0ZSA9IGJ1ZltpICsgM11cbiAgICAgICAgICBpZiAoKHNlY29uZEJ5dGUgJiAweEMwKSA9PT0gMHg4MCAmJiAodGhpcmRCeXRlICYgMHhDMCkgPT09IDB4ODAgJiYgKGZvdXJ0aEJ5dGUgJiAweEMwKSA9PT0gMHg4MCkge1xuICAgICAgICAgICAgdGVtcENvZGVQb2ludCA9IChmaXJzdEJ5dGUgJiAweEYpIDw8IDB4MTIgfCAoc2Vjb25kQnl0ZSAmIDB4M0YpIDw8IDB4QyB8ICh0aGlyZEJ5dGUgJiAweDNGKSA8PCAweDYgfCAoZm91cnRoQnl0ZSAmIDB4M0YpXG4gICAgICAgICAgICBpZiAodGVtcENvZGVQb2ludCA+IDB4RkZGRiAmJiB0ZW1wQ29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgICAgICAgICAgY29kZVBvaW50ID0gdGVtcENvZGVQb2ludFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoY29kZVBvaW50ID09PSBudWxsKSB7XG4gICAgICAvLyB3ZSBkaWQgbm90IGdlbmVyYXRlIGEgdmFsaWQgY29kZVBvaW50IHNvIGluc2VydCBhXG4gICAgICAvLyByZXBsYWNlbWVudCBjaGFyIChVK0ZGRkQpIGFuZCBhZHZhbmNlIG9ubHkgMSBieXRlXG4gICAgICBjb2RlUG9pbnQgPSAweEZGRkRcbiAgICAgIGJ5dGVzUGVyU2VxdWVuY2UgPSAxXG4gICAgfSBlbHNlIGlmIChjb2RlUG9pbnQgPiAweEZGRkYpIHtcbiAgICAgIC8vIGVuY29kZSB0byB1dGYxNiAoc3Vycm9nYXRlIHBhaXIgZGFuY2UpXG4gICAgICBjb2RlUG9pbnQgLT0gMHgxMDAwMFxuICAgICAgcmVzLnB1c2goY29kZVBvaW50ID4+PiAxMCAmIDB4M0ZGIHwgMHhEODAwKVxuICAgICAgY29kZVBvaW50ID0gMHhEQzAwIHwgY29kZVBvaW50ICYgMHgzRkZcbiAgICB9XG5cbiAgICByZXMucHVzaChjb2RlUG9pbnQpXG4gICAgaSArPSBieXRlc1BlclNlcXVlbmNlXG4gIH1cblxuICByZXR1cm4gZGVjb2RlQ29kZVBvaW50c0FycmF5KHJlcylcbn1cblxuLy8gQmFzZWQgb24gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL2EvMjI3NDcyNzIvNjgwNzQyLCB0aGUgYnJvd3NlciB3aXRoXG4vLyB0aGUgbG93ZXN0IGxpbWl0IGlzIENocm9tZSwgd2l0aCAweDEwMDAwIGFyZ3MuXG4vLyBXZSBnbyAxIG1hZ25pdHVkZSBsZXNzLCBmb3Igc2FmZXR5XG52YXIgTUFYX0FSR1VNRU5UU19MRU5HVEggPSAweDEwMDBcblxuZnVuY3Rpb24gZGVjb2RlQ29kZVBvaW50c0FycmF5IChjb2RlUG9pbnRzKSB7XG4gIHZhciBsZW4gPSBjb2RlUG9pbnRzLmxlbmd0aFxuICBpZiAobGVuIDw9IE1BWF9BUkdVTUVOVFNfTEVOR1RIKSB7XG4gICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUuYXBwbHkoU3RyaW5nLCBjb2RlUG9pbnRzKSAvLyBhdm9pZCBleHRyYSBzbGljZSgpXG4gIH1cblxuICAvLyBEZWNvZGUgaW4gY2h1bmtzIHRvIGF2b2lkIFwiY2FsbCBzdGFjayBzaXplIGV4Y2VlZGVkXCIuXG4gIHZhciByZXMgPSAnJ1xuICB2YXIgaSA9IDBcbiAgd2hpbGUgKGkgPCBsZW4pIHtcbiAgICByZXMgKz0gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShcbiAgICAgIFN0cmluZyxcbiAgICAgIGNvZGVQb2ludHMuc2xpY2UoaSwgaSArPSBNQVhfQVJHVU1FTlRTX0xFTkdUSClcbiAgICApXG4gIH1cbiAgcmV0dXJuIHJlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVNsaWNlIChidWYsIHN0YXJ0LCBlbmQpIHtcbiAgdmFyIHJldCA9ICcnXG4gIGVuZCA9IE1hdGgubWluKGJ1Zi5sZW5ndGgsIGVuZClcblxuICBmb3IgKHZhciBpID0gc3RhcnQ7IGkgPCBlbmQ7ICsraSkge1xuICAgIHJldCArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ1ZltpXSAmIDB4N0YpXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBsYXRpbjFTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciByZXQgPSAnJ1xuICBlbmQgPSBNYXRoLm1pbihidWYubGVuZ3RoLCBlbmQpXG5cbiAgZm9yICh2YXIgaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICByZXQgKz0gU3RyaW5nLmZyb21DaGFyQ29kZShidWZbaV0pXG4gIH1cbiAgcmV0dXJuIHJldFxufVxuXG5mdW5jdGlvbiBoZXhTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSBidWYubGVuZ3RoXG5cbiAgaWYgKCFzdGFydCB8fCBzdGFydCA8IDApIHN0YXJ0ID0gMFxuICBpZiAoIWVuZCB8fCBlbmQgPCAwIHx8IGVuZCA+IGxlbikgZW5kID0gbGVuXG5cbiAgdmFyIG91dCA9ICcnXG4gIGZvciAodmFyIGkgPSBzdGFydDsgaSA8IGVuZDsgKytpKSB7XG4gICAgb3V0ICs9IHRvSGV4KGJ1ZltpXSlcbiAgfVxuICByZXR1cm4gb3V0XG59XG5cbmZ1bmN0aW9uIHV0ZjE2bGVTbGljZSAoYnVmLCBzdGFydCwgZW5kKSB7XG4gIHZhciBieXRlcyA9IGJ1Zi5zbGljZShzdGFydCwgZW5kKVxuICB2YXIgcmVzID0gJydcbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBieXRlcy5sZW5ndGg7IGkgKz0gMikge1xuICAgIHJlcyArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGJ5dGVzW2ldICsgYnl0ZXNbaSArIDFdICogMjU2KVxuICB9XG4gIHJldHVybiByZXNcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5zbGljZSA9IGZ1bmN0aW9uIHNsaWNlIChzdGFydCwgZW5kKSB7XG4gIHZhciBsZW4gPSB0aGlzLmxlbmd0aFxuICBzdGFydCA9IH5+c3RhcnRcbiAgZW5kID0gZW5kID09PSB1bmRlZmluZWQgPyBsZW4gOiB+fmVuZFxuXG4gIGlmIChzdGFydCA8IDApIHtcbiAgICBzdGFydCArPSBsZW5cbiAgICBpZiAoc3RhcnQgPCAwKSBzdGFydCA9IDBcbiAgfSBlbHNlIGlmIChzdGFydCA+IGxlbikge1xuICAgIHN0YXJ0ID0gbGVuXG4gIH1cblxuICBpZiAoZW5kIDwgMCkge1xuICAgIGVuZCArPSBsZW5cbiAgICBpZiAoZW5kIDwgMCkgZW5kID0gMFxuICB9IGVsc2UgaWYgKGVuZCA+IGxlbikge1xuICAgIGVuZCA9IGxlblxuICB9XG5cbiAgaWYgKGVuZCA8IHN0YXJ0KSBlbmQgPSBzdGFydFxuXG4gIHZhciBuZXdCdWZcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgbmV3QnVmID0gdGhpcy5zdWJhcnJheShzdGFydCwgZW5kKVxuICAgIG5ld0J1Zi5fX3Byb3RvX18gPSBCdWZmZXIucHJvdG90eXBlXG4gIH0gZWxzZSB7XG4gICAgdmFyIHNsaWNlTGVuID0gZW5kIC0gc3RhcnRcbiAgICBuZXdCdWYgPSBuZXcgQnVmZmVyKHNsaWNlTGVuLCB1bmRlZmluZWQpXG4gICAgZm9yICh2YXIgaSA9IDA7IGkgPCBzbGljZUxlbjsgKytpKSB7XG4gICAgICBuZXdCdWZbaV0gPSB0aGlzW2kgKyBzdGFydF1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gbmV3QnVmXG59XG5cbi8qXG4gKiBOZWVkIHRvIG1ha2Ugc3VyZSB0aGF0IGJ1ZmZlciBpc24ndCB0cnlpbmcgdG8gd3JpdGUgb3V0IG9mIGJvdW5kcy5cbiAqL1xuZnVuY3Rpb24gY2hlY2tPZmZzZXQgKG9mZnNldCwgZXh0LCBsZW5ndGgpIHtcbiAgaWYgKChvZmZzZXQgJSAxKSAhPT0gMCB8fCBvZmZzZXQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignb2Zmc2V0IGlzIG5vdCB1aW50JylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGxlbmd0aCkgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1RyeWluZyB0byBhY2Nlc3MgYmV5b25kIGJ1ZmZlciBsZW5ndGgnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50TEUgPSBmdW5jdGlvbiByZWFkVUludExFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgYnl0ZUxlbmd0aCwgdGhpcy5sZW5ndGgpXG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0XVxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgd2hpbGUgKCsraSA8IGJ5dGVMZW5ndGggJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyBpXSAqIG11bFxuICB9XG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50QkUgPSBmdW5jdGlvbiByZWFkVUludEJFIChvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuICB9XG5cbiAgdmFyIHZhbCA9IHRoaXNbb2Zmc2V0ICsgLS1ieXRlTGVuZ3RoXVxuICB2YXIgbXVsID0gMVxuICB3aGlsZSAoYnl0ZUxlbmd0aCA+IDAgJiYgKG11bCAqPSAweDEwMCkpIHtcbiAgICB2YWwgKz0gdGhpc1tvZmZzZXQgKyAtLWJ5dGVMZW5ndGhdICogbXVsXG4gIH1cblxuICByZXR1cm4gdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQ4ID0gZnVuY3Rpb24gcmVhZFVJbnQ4IChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMSwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiB0aGlzW29mZnNldF1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDE2TEUgPSBmdW5jdGlvbiByZWFkVUludDE2TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAyLCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIHRoaXNbb2Zmc2V0XSB8ICh0aGlzW29mZnNldCArIDFdIDw8IDgpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZFVJbnQxNkJFID0gZnVuY3Rpb24gcmVhZFVJbnQxNkJFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHJldHVybiAodGhpc1tvZmZzZXRdIDw8IDgpIHwgdGhpc1tvZmZzZXQgKyAxXVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRVSW50MzJMRSA9IGZ1bmN0aW9uIHJlYWRVSW50MzJMRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDQsIHRoaXMubGVuZ3RoKVxuXG4gIHJldHVybiAoKHRoaXNbb2Zmc2V0XSkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMV0gPDwgOCkgfFxuICAgICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgMTYpKSArXG4gICAgICAodGhpc1tvZmZzZXQgKyAzXSAqIDB4MTAwMDAwMClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkVUludDMyQkUgPSBmdW5jdGlvbiByZWFkVUludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSAqIDB4MTAwMDAwMCkgK1xuICAgICgodGhpc1tvZmZzZXQgKyAxXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDJdIDw8IDgpIHxcbiAgICB0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRMRSA9IGZ1bmN0aW9uIHJlYWRJbnRMRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF1cbiAgdmFyIG11bCA9IDFcbiAgdmFyIGkgPSAwXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdmFsICs9IHRoaXNbb2Zmc2V0ICsgaV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnRCRSA9IGZ1bmN0aW9uIHJlYWRJbnRCRSAob2Zmc2V0LCBieXRlTGVuZ3RoLCBub0Fzc2VydCkge1xuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGJ5dGVMZW5ndGggPSBieXRlTGVuZ3RoIHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIGJ5dGVMZW5ndGgsIHRoaXMubGVuZ3RoKVxuXG4gIHZhciBpID0gYnl0ZUxlbmd0aFxuICB2YXIgbXVsID0gMVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAtLWldXG4gIHdoaWxlIChpID4gMCAmJiAobXVsICo9IDB4MTAwKSkge1xuICAgIHZhbCArPSB0aGlzW29mZnNldCArIC0taV0gKiBtdWxcbiAgfVxuICBtdWwgKj0gMHg4MFxuXG4gIGlmICh2YWwgPj0gbXVsKSB2YWwgLT0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGgpXG5cbiAgcmV0dXJuIHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQ4ID0gZnVuY3Rpb24gcmVhZEludDggKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCAxLCB0aGlzLmxlbmd0aClcbiAgaWYgKCEodGhpc1tvZmZzZXRdICYgMHg4MCkpIHJldHVybiAodGhpc1tvZmZzZXRdKVxuICByZXR1cm4gKCgweGZmIC0gdGhpc1tvZmZzZXRdICsgMSkgKiAtMSlcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkSW50MTZMRSA9IGZ1bmN0aW9uIHJlYWRJbnQxNkxFIChvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrT2Zmc2V0KG9mZnNldCwgMiwgdGhpcy5sZW5ndGgpXG4gIHZhciB2YWwgPSB0aGlzW29mZnNldF0gfCAodGhpc1tvZmZzZXQgKyAxXSA8PCA4KVxuICByZXR1cm4gKHZhbCAmIDB4ODAwMCkgPyB2YWwgfCAweEZGRkYwMDAwIDogdmFsXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUucmVhZEludDE2QkUgPSBmdW5jdGlvbiByZWFkSW50MTZCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDIsIHRoaXMubGVuZ3RoKVxuICB2YXIgdmFsID0gdGhpc1tvZmZzZXQgKyAxXSB8ICh0aGlzW29mZnNldF0gPDwgOClcbiAgcmV0dXJuICh2YWwgJiAweDgwMDApID8gdmFsIHwgMHhGRkZGMDAwMCA6IHZhbFxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkxFID0gZnVuY3Rpb24gcmVhZEludDMyTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDgpIHxcbiAgICAodGhpc1tvZmZzZXQgKyAyXSA8PCAxNikgfFxuICAgICh0aGlzW29mZnNldCArIDNdIDw8IDI0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRJbnQzMkJFID0gZnVuY3Rpb24gcmVhZEludDMyQkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcblxuICByZXR1cm4gKHRoaXNbb2Zmc2V0XSA8PCAyNCkgfFxuICAgICh0aGlzW29mZnNldCArIDFdIDw8IDE2KSB8XG4gICAgKHRoaXNbb2Zmc2V0ICsgMl0gPDwgOCkgfFxuICAgICh0aGlzW29mZnNldCArIDNdKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdExFID0gZnVuY3Rpb24gcmVhZEZsb2F0TEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDIzLCA0KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWRGbG9hdEJFID0gZnVuY3Rpb24gcmVhZEZsb2F0QkUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA0LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIGZhbHNlLCAyMywgNClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS5yZWFkRG91YmxlTEUgPSBmdW5jdGlvbiByZWFkRG91YmxlTEUgKG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tPZmZzZXQob2Zmc2V0LCA4LCB0aGlzLmxlbmd0aClcbiAgcmV0dXJuIGllZWU3NTQucmVhZCh0aGlzLCBvZmZzZXQsIHRydWUsIDUyLCA4KVxufVxuXG5CdWZmZXIucHJvdG90eXBlLnJlYWREb3VibGVCRSA9IGZ1bmN0aW9uIHJlYWREb3VibGVCRSAob2Zmc2V0LCBub0Fzc2VydCkge1xuICBpZiAoIW5vQXNzZXJ0KSBjaGVja09mZnNldChvZmZzZXQsIDgsIHRoaXMubGVuZ3RoKVxuICByZXR1cm4gaWVlZTc1NC5yZWFkKHRoaXMsIG9mZnNldCwgZmFsc2UsIDUyLCA4KVxufVxuXG5mdW5jdGlvbiBjaGVja0ludCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmICghQnVmZmVyLmlzQnVmZmVyKGJ1ZikpIHRocm93IG5ldyBUeXBlRXJyb3IoJ1wiYnVmZmVyXCIgYXJndW1lbnQgbXVzdCBiZSBhIEJ1ZmZlciBpbnN0YW5jZScpXG4gIGlmICh2YWx1ZSA+IG1heCB8fCB2YWx1ZSA8IG1pbikgdGhyb3cgbmV3IFJhbmdlRXJyb3IoJ1widmFsdWVcIiBhcmd1bWVudCBpcyBvdXQgb2YgYm91bmRzJylcbiAgaWYgKG9mZnNldCArIGV4dCA+IGJ1Zi5sZW5ndGgpIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludExFID0gZnVuY3Rpb24gd3JpdGVVSW50TEUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgbXVsID0gMVxuICB2YXIgaSA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludEJFID0gZnVuY3Rpb24gd3JpdGVVSW50QkUgKHZhbHVlLCBvZmZzZXQsIGJ5dGVMZW5ndGgsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgYnl0ZUxlbmd0aCA9IGJ5dGVMZW5ndGggfCAwXG4gIGlmICghbm9Bc3NlcnQpIHtcbiAgICB2YXIgbWF4Qnl0ZXMgPSBNYXRoLnBvdygyLCA4ICogYnl0ZUxlbmd0aCkgLSAxXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbWF4Qnl0ZXMsIDApXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICh2YWx1ZSAvIG11bCkgJiAweEZGXG4gIH1cblxuICByZXR1cm4gb2Zmc2V0ICsgYnl0ZUxlbmd0aFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlVUludDggPSBmdW5jdGlvbiB3cml0ZVVJbnQ4ICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDEsIDB4ZmYsIDApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgcmV0dXJuIG9mZnNldCArIDFcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MTYgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmICsgdmFsdWUgKyAxXG4gIGZvciAodmFyIGkgPSAwLCBqID0gTWF0aC5taW4oYnVmLmxlbmd0aCAtIG9mZnNldCwgMik7IGkgPCBqOyArK2kpIHtcbiAgICBidWZbb2Zmc2V0ICsgaV0gPSAodmFsdWUgJiAoMHhmZiA8PCAoOCAqIChsaXR0bGVFbmRpYW4gPyBpIDogMSAtIGkpKSkpID4+PlxuICAgICAgKGxpdHRsZUVuZGlhbiA/IGkgOiAxIC0gaSkgKiA4XG4gIH1cbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVVSW50MTZMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCAyLCAweGZmZmYsIDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQxNih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyAyXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MTZCRSA9IGZ1bmN0aW9uIHdyaXRlVUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHhmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuZnVuY3Rpb24gb2JqZWN0V3JpdGVVSW50MzIgKGJ1ZiwgdmFsdWUsIG9mZnNldCwgbGl0dGxlRW5kaWFuKSB7XG4gIGlmICh2YWx1ZSA8IDApIHZhbHVlID0gMHhmZmZmZmZmZiArIHZhbHVlICsgMVxuICBmb3IgKHZhciBpID0gMCwgaiA9IE1hdGgubWluKGJ1Zi5sZW5ndGggLSBvZmZzZXQsIDQpOyBpIDwgajsgKytpKSB7XG4gICAgYnVmW29mZnNldCArIGldID0gKHZhbHVlID4+PiAobGl0dGxlRW5kaWFuID8gaSA6IDMgLSBpKSAqIDgpICYgMHhmZlxuICB9XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVVSW50MzJMRSA9IGZ1bmN0aW9uIHdyaXRlVUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHhmZmZmZmZmZiwgMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSA+Pj4gMjQpXG4gICAgdGhpc1tvZmZzZXQgKyAyXSA9ICh2YWx1ZSA+Pj4gMTYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZVVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVVSW50MzJCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSBjaGVja0ludCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCA0LCAweGZmZmZmZmZmLCAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDI0KVxuICAgIHRoaXNbb2Zmc2V0ICsgMV0gPSAodmFsdWUgPj4+IDE2KVxuICAgIHRoaXNbb2Zmc2V0ICsgMl0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAzXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MzIodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDRcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludExFID0gZnVuY3Rpb24gd3JpdGVJbnRMRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IDBcbiAgdmFyIG11bCA9IDFcbiAgdmFyIHN1YiA9IDBcbiAgdGhpc1tvZmZzZXRdID0gdmFsdWUgJiAweEZGXG4gIHdoaWxlICgrK2kgPCBieXRlTGVuZ3RoICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpIC0gMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludEJFID0gZnVuY3Rpb24gd3JpdGVJbnRCRSAodmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbm9Bc3NlcnQpIHtcbiAgdmFsdWUgPSArdmFsdWVcbiAgb2Zmc2V0ID0gb2Zmc2V0IHwgMFxuICBpZiAoIW5vQXNzZXJ0KSB7XG4gICAgdmFyIGxpbWl0ID0gTWF0aC5wb3coMiwgOCAqIGJ5dGVMZW5ndGggLSAxKVxuXG4gICAgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgYnl0ZUxlbmd0aCwgbGltaXQgLSAxLCAtbGltaXQpXG4gIH1cblxuICB2YXIgaSA9IGJ5dGVMZW5ndGggLSAxXG4gIHZhciBtdWwgPSAxXG4gIHZhciBzdWIgPSAwXG4gIHRoaXNbb2Zmc2V0ICsgaV0gPSB2YWx1ZSAmIDB4RkZcbiAgd2hpbGUgKC0taSA+PSAwICYmIChtdWwgKj0gMHgxMDApKSB7XG4gICAgaWYgKHZhbHVlIDwgMCAmJiBzdWIgPT09IDAgJiYgdGhpc1tvZmZzZXQgKyBpICsgMV0gIT09IDApIHtcbiAgICAgIHN1YiA9IDFcbiAgICB9XG4gICAgdGhpc1tvZmZzZXQgKyBpXSA9ICgodmFsdWUgLyBtdWwpID4+IDApIC0gc3ViICYgMHhGRlxuICB9XG5cbiAgcmV0dXJuIG9mZnNldCArIGJ5dGVMZW5ndGhcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDggPSBmdW5jdGlvbiB3cml0ZUludDggKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMSwgMHg3ZiwgLTB4ODApXG4gIGlmICghQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHZhbHVlID0gTWF0aC5mbG9vcih2YWx1ZSlcbiAgaWYgKHZhbHVlIDwgMCkgdmFsdWUgPSAweGZmICsgdmFsdWUgKyAxXG4gIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIHJldHVybiBvZmZzZXQgKyAxXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQxNkxFID0gZnVuY3Rpb24gd3JpdGVJbnQxNkxFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDIsIDB4N2ZmZiwgLTB4ODAwMClcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlICYgMHhmZilcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiA4KVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDE2KHRoaXMsIHZhbHVlLCBvZmZzZXQsIHRydWUpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDE2QkUgPSBmdW5jdGlvbiB3cml0ZUludDE2QkUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgMiwgMHg3ZmZmLCAtMHg4MDAwKVxuICBpZiAoQnVmZmVyLlRZUEVEX0FSUkFZX1NVUFBPUlQpIHtcbiAgICB0aGlzW29mZnNldF0gPSAodmFsdWUgPj4+IDgpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSAmIDB4ZmYpXG4gIH0gZWxzZSB7XG4gICAgb2JqZWN0V3JpdGVVSW50MTYodGhpcywgdmFsdWUsIG9mZnNldCwgZmFsc2UpXG4gIH1cbiAgcmV0dXJuIG9mZnNldCArIDJcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZUludDMyTEUgPSBmdW5jdGlvbiB3cml0ZUludDMyTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHZhbHVlID0gK3ZhbHVlXG4gIG9mZnNldCA9IG9mZnNldCB8IDBcbiAgaWYgKCFub0Fzc2VydCkgY2hlY2tJbnQodGhpcywgdmFsdWUsIG9mZnNldCwgNCwgMHg3ZmZmZmZmZiwgLTB4ODAwMDAwMDApXG4gIGlmIChCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIHRoaXNbb2Zmc2V0XSA9ICh2YWx1ZSAmIDB4ZmYpXG4gICAgdGhpc1tvZmZzZXQgKyAxXSA9ICh2YWx1ZSA+Pj4gOClcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDNdID0gKHZhbHVlID4+PiAyNClcbiAgfSBlbHNlIHtcbiAgICBvYmplY3RXcml0ZVVJbnQzMih0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVJbnQzMkJFID0gZnVuY3Rpb24gd3JpdGVJbnQzMkJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICB2YWx1ZSA9ICt2YWx1ZVxuICBvZmZzZXQgPSBvZmZzZXQgfCAwXG4gIGlmICghbm9Bc3NlcnQpIGNoZWNrSW50KHRoaXMsIHZhbHVlLCBvZmZzZXQsIDQsIDB4N2ZmZmZmZmYsIC0weDgwMDAwMDAwKVxuICBpZiAodmFsdWUgPCAwKSB2YWx1ZSA9IDB4ZmZmZmZmZmYgKyB2YWx1ZSArIDFcbiAgaWYgKEJ1ZmZlci5UWVBFRF9BUlJBWV9TVVBQT1JUKSB7XG4gICAgdGhpc1tvZmZzZXRdID0gKHZhbHVlID4+PiAyNClcbiAgICB0aGlzW29mZnNldCArIDFdID0gKHZhbHVlID4+PiAxNilcbiAgICB0aGlzW29mZnNldCArIDJdID0gKHZhbHVlID4+PiA4KVxuICAgIHRoaXNbb2Zmc2V0ICsgM10gPSAodmFsdWUgJiAweGZmKVxuICB9IGVsc2Uge1xuICAgIG9iamVjdFdyaXRlVUludDMyKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlKVxuICB9XG4gIHJldHVybiBvZmZzZXQgKyA0XG59XG5cbmZ1bmN0aW9uIGNoZWNrSUVFRTc1NCAoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBleHQsIG1heCwgbWluKSB7XG4gIGlmIChvZmZzZXQgKyBleHQgPiBidWYubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignSW5kZXggb3V0IG9mIHJhbmdlJylcbiAgaWYgKG9mZnNldCA8IDApIHRocm93IG5ldyBSYW5nZUVycm9yKCdJbmRleCBvdXQgb2YgcmFuZ2UnKVxufVxuXG5mdW5jdGlvbiB3cml0ZUZsb2F0IChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDQsIDMuNDAyODIzNDY2Mzg1Mjg4NmUrMzgsIC0zLjQwMjgyMzQ2NjM4NTI4ODZlKzM4KVxuICB9XG4gIGllZWU3NTQud3JpdGUoYnVmLCB2YWx1ZSwgb2Zmc2V0LCBsaXR0bGVFbmRpYW4sIDIzLCA0KVxuICByZXR1cm4gb2Zmc2V0ICsgNFxufVxuXG5CdWZmZXIucHJvdG90eXBlLndyaXRlRmxvYXRMRSA9IGZ1bmN0aW9uIHdyaXRlRmxvYXRMRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRmxvYXQodGhpcywgdmFsdWUsIG9mZnNldCwgdHJ1ZSwgbm9Bc3NlcnQpXG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVGbG9hdEJFID0gZnVuY3Rpb24gd3JpdGVGbG9hdEJFICh2YWx1ZSwgb2Zmc2V0LCBub0Fzc2VydCkge1xuICByZXR1cm4gd3JpdGVGbG9hdCh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCBmYWxzZSwgbm9Bc3NlcnQpXG59XG5cbmZ1bmN0aW9uIHdyaXRlRG91YmxlIChidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgbm9Bc3NlcnQpIHtcbiAgaWYgKCFub0Fzc2VydCkge1xuICAgIGNoZWNrSUVFRTc1NChidWYsIHZhbHVlLCBvZmZzZXQsIDgsIDEuNzk3NjkzMTM0ODYyMzE1N0UrMzA4LCAtMS43OTc2OTMxMzQ4NjIzMTU3RSszMDgpXG4gIH1cbiAgaWVlZTc1NC53cml0ZShidWYsIHZhbHVlLCBvZmZzZXQsIGxpdHRsZUVuZGlhbiwgNTIsIDgpXG4gIHJldHVybiBvZmZzZXQgKyA4XG59XG5cbkJ1ZmZlci5wcm90b3R5cGUud3JpdGVEb3VibGVMRSA9IGZ1bmN0aW9uIHdyaXRlRG91YmxlTEUgKHZhbHVlLCBvZmZzZXQsIG5vQXNzZXJ0KSB7XG4gIHJldHVybiB3cml0ZURvdWJsZSh0aGlzLCB2YWx1ZSwgb2Zmc2V0LCB0cnVlLCBub0Fzc2VydClcbn1cblxuQnVmZmVyLnByb3RvdHlwZS53cml0ZURvdWJsZUJFID0gZnVuY3Rpb24gd3JpdGVEb3VibGVCRSAodmFsdWUsIG9mZnNldCwgbm9Bc3NlcnQpIHtcbiAgcmV0dXJuIHdyaXRlRG91YmxlKHRoaXMsIHZhbHVlLCBvZmZzZXQsIGZhbHNlLCBub0Fzc2VydClcbn1cblxuLy8gY29weSh0YXJnZXRCdWZmZXIsIHRhcmdldFN0YXJ0PTAsIHNvdXJjZVN0YXJ0PTAsIHNvdXJjZUVuZD1idWZmZXIubGVuZ3RoKVxuQnVmZmVyLnByb3RvdHlwZS5jb3B5ID0gZnVuY3Rpb24gY29weSAodGFyZ2V0LCB0YXJnZXRTdGFydCwgc3RhcnQsIGVuZCkge1xuICBpZiAoIXN0YXJ0KSBzdGFydCA9IDBcbiAgaWYgKCFlbmQgJiYgZW5kICE9PSAwKSBlbmQgPSB0aGlzLmxlbmd0aFxuICBpZiAodGFyZ2V0U3RhcnQgPj0gdGFyZ2V0Lmxlbmd0aCkgdGFyZ2V0U3RhcnQgPSB0YXJnZXQubGVuZ3RoXG4gIGlmICghdGFyZ2V0U3RhcnQpIHRhcmdldFN0YXJ0ID0gMFxuICBpZiAoZW5kID4gMCAmJiBlbmQgPCBzdGFydCkgZW5kID0gc3RhcnRcblxuICAvLyBDb3B5IDAgYnl0ZXM7IHdlJ3JlIGRvbmVcbiAgaWYgKGVuZCA9PT0gc3RhcnQpIHJldHVybiAwXG4gIGlmICh0YXJnZXQubGVuZ3RoID09PSAwIHx8IHRoaXMubGVuZ3RoID09PSAwKSByZXR1cm4gMFxuXG4gIC8vIEZhdGFsIGVycm9yIGNvbmRpdGlvbnNcbiAgaWYgKHRhcmdldFN0YXJ0IDwgMCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCd0YXJnZXRTdGFydCBvdXQgb2YgYm91bmRzJylcbiAgfVxuICBpZiAoc3RhcnQgPCAwIHx8IHN0YXJ0ID49IHRoaXMubGVuZ3RoKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlU3RhcnQgb3V0IG9mIGJvdW5kcycpXG4gIGlmIChlbmQgPCAwKSB0aHJvdyBuZXcgUmFuZ2VFcnJvcignc291cmNlRW5kIG91dCBvZiBib3VuZHMnKVxuXG4gIC8vIEFyZSB3ZSBvb2I/XG4gIGlmIChlbmQgPiB0aGlzLmxlbmd0aCkgZW5kID0gdGhpcy5sZW5ndGhcbiAgaWYgKHRhcmdldC5sZW5ndGggLSB0YXJnZXRTdGFydCA8IGVuZCAtIHN0YXJ0KSB7XG4gICAgZW5kID0gdGFyZ2V0Lmxlbmd0aCAtIHRhcmdldFN0YXJ0ICsgc3RhcnRcbiAgfVxuXG4gIHZhciBsZW4gPSBlbmQgLSBzdGFydFxuICB2YXIgaVxuXG4gIGlmICh0aGlzID09PSB0YXJnZXQgJiYgc3RhcnQgPCB0YXJnZXRTdGFydCAmJiB0YXJnZXRTdGFydCA8IGVuZCkge1xuICAgIC8vIGRlc2NlbmRpbmcgY29weSBmcm9tIGVuZFxuICAgIGZvciAoaSA9IGxlbiAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgICB0YXJnZXRbaSArIHRhcmdldFN0YXJ0XSA9IHRoaXNbaSArIHN0YXJ0XVxuICAgIH1cbiAgfSBlbHNlIGlmIChsZW4gPCAxMDAwIHx8ICFCdWZmZXIuVFlQRURfQVJSQVlfU1VQUE9SVCkge1xuICAgIC8vIGFzY2VuZGluZyBjb3B5IGZyb20gc3RhcnRcbiAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyArK2kpIHtcbiAgICAgIHRhcmdldFtpICsgdGFyZ2V0U3RhcnRdID0gdGhpc1tpICsgc3RhcnRdXG4gICAgfVxuICB9IGVsc2Uge1xuICAgIFVpbnQ4QXJyYXkucHJvdG90eXBlLnNldC5jYWxsKFxuICAgICAgdGFyZ2V0LFxuICAgICAgdGhpcy5zdWJhcnJheShzdGFydCwgc3RhcnQgKyBsZW4pLFxuICAgICAgdGFyZ2V0U3RhcnRcbiAgICApXG4gIH1cblxuICByZXR1cm4gbGVuXG59XG5cbi8vIFVzYWdlOlxuLy8gICAgYnVmZmVyLmZpbGwobnVtYmVyWywgb2Zmc2V0WywgZW5kXV0pXG4vLyAgICBidWZmZXIuZmlsbChidWZmZXJbLCBvZmZzZXRbLCBlbmRdXSlcbi8vICAgIGJ1ZmZlci5maWxsKHN0cmluZ1ssIG9mZnNldFssIGVuZF1dWywgZW5jb2RpbmddKVxuQnVmZmVyLnByb3RvdHlwZS5maWxsID0gZnVuY3Rpb24gZmlsbCAodmFsLCBzdGFydCwgZW5kLCBlbmNvZGluZykge1xuICAvLyBIYW5kbGUgc3RyaW5nIGNhc2VzOlxuICBpZiAodHlwZW9mIHZhbCA9PT0gJ3N0cmluZycpIHtcbiAgICBpZiAodHlwZW9mIHN0YXJ0ID09PSAnc3RyaW5nJykge1xuICAgICAgZW5jb2RpbmcgPSBzdGFydFxuICAgICAgc3RhcnQgPSAwXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH0gZWxzZSBpZiAodHlwZW9mIGVuZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGVuY29kaW5nID0gZW5kXG4gICAgICBlbmQgPSB0aGlzLmxlbmd0aFxuICAgIH1cbiAgICBpZiAodmFsLmxlbmd0aCA9PT0gMSkge1xuICAgICAgdmFyIGNvZGUgPSB2YWwuY2hhckNvZGVBdCgwKVxuICAgICAgaWYgKGNvZGUgPCAyNTYpIHtcbiAgICAgICAgdmFsID0gY29kZVxuICAgICAgfVxuICAgIH1cbiAgICBpZiAoZW5jb2RpbmcgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgZW5jb2RpbmcgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKCdlbmNvZGluZyBtdXN0IGJlIGEgc3RyaW5nJylcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBlbmNvZGluZyA9PT0gJ3N0cmluZycgJiYgIUJ1ZmZlci5pc0VuY29kaW5nKGVuY29kaW5nKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignVW5rbm93biBlbmNvZGluZzogJyArIGVuY29kaW5nKVxuICAgIH1cbiAgfSBlbHNlIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIHZhbCA9IHZhbCAmIDI1NVxuICB9XG5cbiAgLy8gSW52YWxpZCByYW5nZXMgYXJlIG5vdCBzZXQgdG8gYSBkZWZhdWx0LCBzbyBjYW4gcmFuZ2UgY2hlY2sgZWFybHkuXG4gIGlmIChzdGFydCA8IDAgfHwgdGhpcy5sZW5ndGggPCBzdGFydCB8fCB0aGlzLmxlbmd0aCA8IGVuZCkge1xuICAgIHRocm93IG5ldyBSYW5nZUVycm9yKCdPdXQgb2YgcmFuZ2UgaW5kZXgnKVxuICB9XG5cbiAgaWYgKGVuZCA8PSBzdGFydCkge1xuICAgIHJldHVybiB0aGlzXG4gIH1cblxuICBzdGFydCA9IHN0YXJ0ID4+PiAwXG4gIGVuZCA9IGVuZCA9PT0gdW5kZWZpbmVkID8gdGhpcy5sZW5ndGggOiBlbmQgPj4+IDBcblxuICBpZiAoIXZhbCkgdmFsID0gMFxuXG4gIHZhciBpXG4gIGlmICh0eXBlb2YgdmFsID09PSAnbnVtYmVyJykge1xuICAgIGZvciAoaSA9IHN0YXJ0OyBpIDwgZW5kOyArK2kpIHtcbiAgICAgIHRoaXNbaV0gPSB2YWxcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgdmFyIGJ5dGVzID0gQnVmZmVyLmlzQnVmZmVyKHZhbClcbiAgICAgID8gdmFsXG4gICAgICA6IHV0ZjhUb0J5dGVzKG5ldyBCdWZmZXIodmFsLCBlbmNvZGluZykudG9TdHJpbmcoKSlcbiAgICB2YXIgbGVuID0gYnl0ZXMubGVuZ3RoXG4gICAgZm9yIChpID0gMDsgaSA8IGVuZCAtIHN0YXJ0OyArK2kpIHtcbiAgICAgIHRoaXNbaSArIHN0YXJ0XSA9IGJ5dGVzW2kgJSBsZW5dXG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXNcbn1cblxuLy8gSEVMUEVSIEZVTkNUSU9OU1xuLy8gPT09PT09PT09PT09PT09PVxuXG52YXIgSU5WQUxJRF9CQVNFNjRfUkUgPSAvW14rXFwvMC05QS1aYS16LV9dL2dcblxuZnVuY3Rpb24gYmFzZTY0Y2xlYW4gKHN0cikge1xuICAvLyBOb2RlIHN0cmlwcyBvdXQgaW52YWxpZCBjaGFyYWN0ZXJzIGxpa2UgXFxuIGFuZCBcXHQgZnJvbSB0aGUgc3RyaW5nLCBiYXNlNjQtanMgZG9lcyBub3RcbiAgc3RyID0gc3RyaW5ndHJpbShzdHIpLnJlcGxhY2UoSU5WQUxJRF9CQVNFNjRfUkUsICcnKVxuICAvLyBOb2RlIGNvbnZlcnRzIHN0cmluZ3Mgd2l0aCBsZW5ndGggPCAyIHRvICcnXG4gIGlmIChzdHIubGVuZ3RoIDwgMikgcmV0dXJuICcnXG4gIC8vIE5vZGUgYWxsb3dzIGZvciBub24tcGFkZGVkIGJhc2U2NCBzdHJpbmdzIChtaXNzaW5nIHRyYWlsaW5nID09PSksIGJhc2U2NC1qcyBkb2VzIG5vdFxuICB3aGlsZSAoc3RyLmxlbmd0aCAlIDQgIT09IDApIHtcbiAgICBzdHIgPSBzdHIgKyAnPSdcbiAgfVxuICByZXR1cm4gc3RyXG59XG5cbmZ1bmN0aW9uIHN0cmluZ3RyaW0gKHN0cikge1xuICBpZiAoc3RyLnRyaW0pIHJldHVybiBzdHIudHJpbSgpXG4gIHJldHVybiBzdHIucmVwbGFjZSgvXlxccyt8XFxzKyQvZywgJycpXG59XG5cbmZ1bmN0aW9uIHRvSGV4IChuKSB7XG4gIGlmIChuIDwgMTYpIHJldHVybiAnMCcgKyBuLnRvU3RyaW5nKDE2KVxuICByZXR1cm4gbi50b1N0cmluZygxNilcbn1cblxuZnVuY3Rpb24gdXRmOFRvQnl0ZXMgKHN0cmluZywgdW5pdHMpIHtcbiAgdW5pdHMgPSB1bml0cyB8fCBJbmZpbml0eVxuICB2YXIgY29kZVBvaW50XG4gIHZhciBsZW5ndGggPSBzdHJpbmcubGVuZ3RoXG4gIHZhciBsZWFkU3Vycm9nYXRlID0gbnVsbFxuICB2YXIgYnl0ZXMgPSBbXVxuXG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBjb2RlUG9pbnQgPSBzdHJpbmcuY2hhckNvZGVBdChpKVxuXG4gICAgLy8gaXMgc3Vycm9nYXRlIGNvbXBvbmVudFxuICAgIGlmIChjb2RlUG9pbnQgPiAweEQ3RkYgJiYgY29kZVBvaW50IDwgMHhFMDAwKSB7XG4gICAgICAvLyBsYXN0IGNoYXIgd2FzIGEgbGVhZFxuICAgICAgaWYgKCFsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAgIC8vIG5vIGxlYWQgeWV0XG4gICAgICAgIGlmIChjb2RlUG9pbnQgPiAweERCRkYpIHtcbiAgICAgICAgICAvLyB1bmV4cGVjdGVkIHRyYWlsXG4gICAgICAgICAgaWYgKCh1bml0cyAtPSAzKSA+IC0xKSBieXRlcy5wdXNoKDB4RUYsIDB4QkYsIDB4QkQpXG4gICAgICAgICAgY29udGludWVcbiAgICAgICAgfSBlbHNlIGlmIChpICsgMSA9PT0gbGVuZ3RoKSB7XG4gICAgICAgICAgLy8gdW5wYWlyZWQgbGVhZFxuICAgICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICAgIGNvbnRpbnVlXG4gICAgICAgIH1cblxuICAgICAgICAvLyB2YWxpZCBsZWFkXG4gICAgICAgIGxlYWRTdXJyb2dhdGUgPSBjb2RlUG9pbnRcblxuICAgICAgICBjb250aW51ZVxuICAgICAgfVxuXG4gICAgICAvLyAyIGxlYWRzIGluIGEgcm93XG4gICAgICBpZiAoY29kZVBvaW50IDwgMHhEQzAwKSB7XG4gICAgICAgIGlmICgodW5pdHMgLT0gMykgPiAtMSkgYnl0ZXMucHVzaCgweEVGLCAweEJGLCAweEJEKVxuICAgICAgICBsZWFkU3Vycm9nYXRlID0gY29kZVBvaW50XG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIC8vIHZhbGlkIHN1cnJvZ2F0ZSBwYWlyXG4gICAgICBjb2RlUG9pbnQgPSAobGVhZFN1cnJvZ2F0ZSAtIDB4RDgwMCA8PCAxMCB8IGNvZGVQb2ludCAtIDB4REMwMCkgKyAweDEwMDAwXG4gICAgfSBlbHNlIGlmIChsZWFkU3Vycm9nYXRlKSB7XG4gICAgICAvLyB2YWxpZCBibXAgY2hhciwgYnV0IGxhc3QgY2hhciB3YXMgYSBsZWFkXG4gICAgICBpZiAoKHVuaXRzIC09IDMpID4gLTEpIGJ5dGVzLnB1c2goMHhFRiwgMHhCRiwgMHhCRClcbiAgICB9XG5cbiAgICBsZWFkU3Vycm9nYXRlID0gbnVsbFxuXG4gICAgLy8gZW5jb2RlIHV0ZjhcbiAgICBpZiAoY29kZVBvaW50IDwgMHg4MCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAxKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKGNvZGVQb2ludClcbiAgICB9IGVsc2UgaWYgKGNvZGVQb2ludCA8IDB4ODAwKSB7XG4gICAgICBpZiAoKHVuaXRzIC09IDIpIDwgMCkgYnJlYWtcbiAgICAgIGJ5dGVzLnB1c2goXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgfCAweEMwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMDAwMCkge1xuICAgICAgaWYgKCh1bml0cyAtPSAzKSA8IDApIGJyZWFrXG4gICAgICBieXRlcy5wdXNoKFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDIHwgMHhFMCxcbiAgICAgICAgY29kZVBvaW50ID4+IDB4NiAmIDB4M0YgfCAweDgwLFxuICAgICAgICBjb2RlUG9pbnQgJiAweDNGIHwgMHg4MFxuICAgICAgKVxuICAgIH0gZWxzZSBpZiAoY29kZVBvaW50IDwgMHgxMTAwMDApIHtcbiAgICAgIGlmICgodW5pdHMgLT0gNCkgPCAwKSBicmVha1xuICAgICAgYnl0ZXMucHVzaChcbiAgICAgICAgY29kZVBvaW50ID4+IDB4MTIgfCAweEYwLFxuICAgICAgICBjb2RlUG9pbnQgPj4gMHhDICYgMHgzRiB8IDB4ODAsXG4gICAgICAgIGNvZGVQb2ludCA+PiAweDYgJiAweDNGIHwgMHg4MCxcbiAgICAgICAgY29kZVBvaW50ICYgMHgzRiB8IDB4ODBcbiAgICAgIClcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGNvZGUgcG9pbnQnKVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBieXRlc1xufVxuXG5mdW5jdGlvbiBhc2NpaVRvQnl0ZXMgKHN0cikge1xuICB2YXIgYnl0ZUFycmF5ID0gW11cbiAgZm9yICh2YXIgaSA9IDA7IGkgPCBzdHIubGVuZ3RoOyArK2kpIHtcbiAgICAvLyBOb2RlJ3MgY29kZSBzZWVtcyB0byBiZSBkb2luZyB0aGlzIGFuZCBub3QgJiAweDdGLi5cbiAgICBieXRlQXJyYXkucHVzaChzdHIuY2hhckNvZGVBdChpKSAmIDB4RkYpXG4gIH1cbiAgcmV0dXJuIGJ5dGVBcnJheVxufVxuXG5mdW5jdGlvbiB1dGYxNmxlVG9CeXRlcyAoc3RyLCB1bml0cykge1xuICB2YXIgYywgaGksIGxvXG4gIHZhciBieXRlQXJyYXkgPSBbXVxuICBmb3IgKHZhciBpID0gMDsgaSA8IHN0ci5sZW5ndGg7ICsraSkge1xuICAgIGlmICgodW5pdHMgLT0gMikgPCAwKSBicmVha1xuXG4gICAgYyA9IHN0ci5jaGFyQ29kZUF0KGkpXG4gICAgaGkgPSBjID4+IDhcbiAgICBsbyA9IGMgJSAyNTZcbiAgICBieXRlQXJyYXkucHVzaChsbylcbiAgICBieXRlQXJyYXkucHVzaChoaSlcbiAgfVxuXG4gIHJldHVybiBieXRlQXJyYXlcbn1cblxuZnVuY3Rpb24gYmFzZTY0VG9CeXRlcyAoc3RyKSB7XG4gIHJldHVybiBiYXNlNjQudG9CeXRlQXJyYXkoYmFzZTY0Y2xlYW4oc3RyKSlcbn1cblxuZnVuY3Rpb24gYmxpdEJ1ZmZlciAoc3JjLCBkc3QsIG9mZnNldCwgbGVuZ3RoKSB7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyArK2kpIHtcbiAgICBpZiAoKGkgKyBvZmZzZXQgPj0gZHN0Lmxlbmd0aCkgfHwgKGkgPj0gc3JjLmxlbmd0aCkpIGJyZWFrXG4gICAgZHN0W2kgKyBvZmZzZXRdID0gc3JjW2ldXG4gIH1cbiAgcmV0dXJuIGlcbn1cblxuZnVuY3Rpb24gaXNuYW4gKHZhbCkge1xuICByZXR1cm4gdmFsICE9PSB2YWwgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1zZWxmLWNvbXBhcmVcbn1cbiIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIoZnVuY3Rpb24gKGdsb2JhbCwgdW5kZWZpbmVkKSB7XG4gICAgXCJ1c2Ugc3RyaWN0XCI7XG5cbiAgICBpZiAoZ2xvYmFsLnNldEltbWVkaWF0ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdmFyIG5leHRIYW5kbGUgPSAxOyAvLyBTcGVjIHNheXMgZ3JlYXRlciB0aGFuIHplcm9cbiAgICB2YXIgdGFza3NCeUhhbmRsZSA9IHt9O1xuICAgIHZhciBjdXJyZW50bHlSdW5uaW5nQVRhc2sgPSBmYWxzZTtcbiAgICB2YXIgZG9jID0gZ2xvYmFsLmRvY3VtZW50O1xuICAgIHZhciByZWdpc3RlckltbWVkaWF0ZTtcblxuICAgIGZ1bmN0aW9uIHNldEltbWVkaWF0ZShjYWxsYmFjaykge1xuICAgICAgLy8gQ2FsbGJhY2sgY2FuIGVpdGhlciBiZSBhIGZ1bmN0aW9uIG9yIGEgc3RyaW5nXG4gICAgICBpZiAodHlwZW9mIGNhbGxiYWNrICE9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICAgICAgY2FsbGJhY2sgPSBuZXcgRnVuY3Rpb24oXCJcIiArIGNhbGxiYWNrKTtcbiAgICAgIH1cbiAgICAgIC8vIENvcHkgZnVuY3Rpb24gYXJndW1lbnRzXG4gICAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGFyZ3MubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBhcmdzW2ldID0gYXJndW1lbnRzW2kgKyAxXTtcbiAgICAgIH1cbiAgICAgIC8vIFN0b3JlIGFuZCByZWdpc3RlciB0aGUgdGFza1xuICAgICAgdmFyIHRhc2sgPSB7IGNhbGxiYWNrOiBjYWxsYmFjaywgYXJnczogYXJncyB9O1xuICAgICAgdGFza3NCeUhhbmRsZVtuZXh0SGFuZGxlXSA9IHRhc2s7XG4gICAgICByZWdpc3RlckltbWVkaWF0ZShuZXh0SGFuZGxlKTtcbiAgICAgIHJldHVybiBuZXh0SGFuZGxlKys7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2xlYXJJbW1lZGlhdGUoaGFuZGxlKSB7XG4gICAgICAgIGRlbGV0ZSB0YXNrc0J5SGFuZGxlW2hhbmRsZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuKHRhc2spIHtcbiAgICAgICAgdmFyIGNhbGxiYWNrID0gdGFzay5jYWxsYmFjaztcbiAgICAgICAgdmFyIGFyZ3MgPSB0YXNrLmFyZ3M7XG4gICAgICAgIHN3aXRjaCAoYXJncy5sZW5ndGgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgICAgY2FsbGJhY2soKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDE6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDI6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICBjYWxsYmFjayhhcmdzWzBdLCBhcmdzWzFdLCBhcmdzWzJdKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgY2FsbGJhY2suYXBwbHkodW5kZWZpbmVkLCBhcmdzKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuSWZQcmVzZW50KGhhbmRsZSkge1xuICAgICAgICAvLyBGcm9tIHRoZSBzcGVjOiBcIldhaXQgdW50aWwgYW55IGludm9jYXRpb25zIG9mIHRoaXMgYWxnb3JpdGhtIHN0YXJ0ZWQgYmVmb3JlIHRoaXMgb25lIGhhdmUgY29tcGxldGVkLlwiXG4gICAgICAgIC8vIFNvIGlmIHdlJ3JlIGN1cnJlbnRseSBydW5uaW5nIGEgdGFzaywgd2UnbGwgbmVlZCB0byBkZWxheSB0aGlzIGludm9jYXRpb24uXG4gICAgICAgIGlmIChjdXJyZW50bHlSdW5uaW5nQVRhc2spIHtcbiAgICAgICAgICAgIC8vIERlbGF5IGJ5IGRvaW5nIGEgc2V0VGltZW91dC4gc2V0SW1tZWRpYXRlIHdhcyB0cmllZCBpbnN0ZWFkLCBidXQgaW4gRmlyZWZveCA3IGl0IGdlbmVyYXRlZCBhXG4gICAgICAgICAgICAvLyBcInRvbyBtdWNoIHJlY3Vyc2lvblwiIGVycm9yLlxuICAgICAgICAgICAgc2V0VGltZW91dChydW5JZlByZXNlbnQsIDAsIGhhbmRsZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB2YXIgdGFzayA9IHRhc2tzQnlIYW5kbGVbaGFuZGxlXTtcbiAgICAgICAgICAgIGlmICh0YXNrKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBydW4odGFzayk7XG4gICAgICAgICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgICAgICAgICAgY2xlYXJJbW1lZGlhdGUoaGFuZGxlKTtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudGx5UnVubmluZ0FUYXNrID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gaW5zdGFsbE5leHRUaWNrSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBwcm9jZXNzLm5leHRUaWNrKGZ1bmN0aW9uICgpIHsgcnVuSWZQcmVzZW50KGhhbmRsZSk7IH0pO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNhblVzZVBvc3RNZXNzYWdlKCkge1xuICAgICAgICAvLyBUaGUgdGVzdCBhZ2FpbnN0IGBpbXBvcnRTY3JpcHRzYCBwcmV2ZW50cyB0aGlzIGltcGxlbWVudGF0aW9uIGZyb20gYmVpbmcgaW5zdGFsbGVkIGluc2lkZSBhIHdlYiB3b3JrZXIsXG4gICAgICAgIC8vIHdoZXJlIGBnbG9iYWwucG9zdE1lc3NhZ2VgIG1lYW5zIHNvbWV0aGluZyBjb21wbGV0ZWx5IGRpZmZlcmVudCBhbmQgY2FuJ3QgYmUgdXNlZCBmb3IgdGhpcyBwdXJwb3NlLlxuICAgICAgICBpZiAoZ2xvYmFsLnBvc3RNZXNzYWdlICYmICFnbG9iYWwuaW1wb3J0U2NyaXB0cykge1xuICAgICAgICAgICAgdmFyIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXMgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIG9sZE9uTWVzc2FnZSA9IGdsb2JhbC5vbm1lc3NhZ2U7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgcG9zdE1lc3NhZ2VJc0FzeW5jaHJvbm91cyA9IGZhbHNlO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGdsb2JhbC5wb3N0TWVzc2FnZShcIlwiLCBcIipcIik7XG4gICAgICAgICAgICBnbG9iYWwub25tZXNzYWdlID0gb2xkT25NZXNzYWdlO1xuICAgICAgICAgICAgcmV0dXJuIHBvc3RNZXNzYWdlSXNBc3luY2hyb25vdXM7XG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgLy8gSW5zdGFsbHMgYW4gZXZlbnQgaGFuZGxlciBvbiBgZ2xvYmFsYCBmb3IgdGhlIGBtZXNzYWdlYCBldmVudDogc2VlXG4gICAgICAgIC8vICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4vRE9NL3dpbmRvdy5wb3N0TWVzc2FnZVxuICAgICAgICAvLyAqIGh0dHA6Ly93d3cud2hhdHdnLm9yZy9zcGVjcy93ZWItYXBwcy9jdXJyZW50LXdvcmsvbXVsdGlwYWdlL2NvbW1zLmh0bWwjY3Jvc3NEb2N1bWVudE1lc3NhZ2VzXG5cbiAgICAgICAgdmFyIG1lc3NhZ2VQcmVmaXggPSBcInNldEltbWVkaWF0ZSRcIiArIE1hdGgucmFuZG9tKCkgKyBcIiRcIjtcbiAgICAgICAgdmFyIG9uR2xvYmFsTWVzc2FnZSA9IGZ1bmN0aW9uKGV2ZW50KSB7XG4gICAgICAgICAgICBpZiAoZXZlbnQuc291cmNlID09PSBnbG9iYWwgJiZcbiAgICAgICAgICAgICAgICB0eXBlb2YgZXZlbnQuZGF0YSA9PT0gXCJzdHJpbmdcIiAmJlxuICAgICAgICAgICAgICAgIGV2ZW50LmRhdGEuaW5kZXhPZihtZXNzYWdlUHJlZml4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJ1bklmUHJlc2VudCgrZXZlbnQuZGF0YS5zbGljZShtZXNzYWdlUHJlZml4Lmxlbmd0aCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIGlmIChnbG9iYWwuYWRkRXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgZ2xvYmFsLmFkZEV2ZW50TGlzdGVuZXIoXCJtZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSwgZmFsc2UpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZ2xvYmFsLmF0dGFjaEV2ZW50KFwib25tZXNzYWdlXCIsIG9uR2xvYmFsTWVzc2FnZSk7XG4gICAgICAgIH1cblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgZ2xvYmFsLnBvc3RNZXNzYWdlKG1lc3NhZ2VQcmVmaXggKyBoYW5kbGUsIFwiKlwiKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBpbnN0YWxsTWVzc2FnZUNoYW5uZWxJbXBsZW1lbnRhdGlvbigpIHtcbiAgICAgICAgdmFyIGNoYW5uZWwgPSBuZXcgTWVzc2FnZUNoYW5uZWwoKTtcbiAgICAgICAgY2hhbm5lbC5wb3J0MS5vbm1lc3NhZ2UgPSBmdW5jdGlvbihldmVudCkge1xuICAgICAgICAgICAgdmFyIGhhbmRsZSA9IGV2ZW50LmRhdGE7XG4gICAgICAgICAgICBydW5JZlByZXNlbnQoaGFuZGxlKTtcbiAgICAgICAgfTtcblxuICAgICAgICByZWdpc3RlckltbWVkaWF0ZSA9IGZ1bmN0aW9uKGhhbmRsZSkge1xuICAgICAgICAgICAgY2hhbm5lbC5wb3J0Mi5wb3N0TWVzc2FnZShoYW5kbGUpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHZhciBodG1sID0gZG9jLmRvY3VtZW50RWxlbWVudDtcbiAgICAgICAgcmVnaXN0ZXJJbW1lZGlhdGUgPSBmdW5jdGlvbihoYW5kbGUpIHtcbiAgICAgICAgICAgIC8vIENyZWF0ZSBhIDxzY3JpcHQ+IGVsZW1lbnQ7IGl0cyByZWFkeXN0YXRlY2hhbmdlIGV2ZW50IHdpbGwgYmUgZmlyZWQgYXN5bmNocm9ub3VzbHkgb25jZSBpdCBpcyBpbnNlcnRlZFxuICAgICAgICAgICAgLy8gaW50byB0aGUgZG9jdW1lbnQuIERvIHNvLCB0aHVzIHF1ZXVpbmcgdXAgdGhlIHRhc2suIFJlbWVtYmVyIHRvIGNsZWFuIHVwIG9uY2UgaXQncyBiZWVuIGNhbGxlZC5cbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2MuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKTtcbiAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcnVuSWZQcmVzZW50KGhhbmRsZSk7XG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgaHRtbC5yZW1vdmVDaGlsZChzY3JpcHQpO1xuICAgICAgICAgICAgICAgIHNjcmlwdCA9IG51bGw7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgaHRtbC5hcHBlbmRDaGlsZChzY3JpcHQpO1xuICAgICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGluc3RhbGxTZXRUaW1lb3V0SW1wbGVtZW50YXRpb24oKSB7XG4gICAgICAgIHJlZ2lzdGVySW1tZWRpYXRlID0gZnVuY3Rpb24oaGFuZGxlKSB7XG4gICAgICAgICAgICBzZXRUaW1lb3V0KHJ1bklmUHJlc2VudCwgMCwgaGFuZGxlKTtcbiAgICAgICAgfTtcbiAgICB9XG5cbiAgICAvLyBJZiBzdXBwb3J0ZWQsIHdlIHNob3VsZCBhdHRhY2ggdG8gdGhlIHByb3RvdHlwZSBvZiBnbG9iYWwsIHNpbmNlIHRoYXQgaXMgd2hlcmUgc2V0VGltZW91dCBldCBhbC4gbGl2ZS5cbiAgICB2YXIgYXR0YWNoVG8gPSBPYmplY3QuZ2V0UHJvdG90eXBlT2YgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKGdsb2JhbCk7XG4gICAgYXR0YWNoVG8gPSBhdHRhY2hUbyAmJiBhdHRhY2hUby5zZXRUaW1lb3V0ID8gYXR0YWNoVG8gOiBnbG9iYWw7XG5cbiAgICAvLyBEb24ndCBnZXQgZm9vbGVkIGJ5IGUuZy4gYnJvd3NlcmlmeSBlbnZpcm9ubWVudHMuXG4gICAgaWYgKHt9LnRvU3RyaW5nLmNhbGwoZ2xvYmFsLnByb2Nlc3MpID09PSBcIltvYmplY3QgcHJvY2Vzc11cIikge1xuICAgICAgICAvLyBGb3IgTm9kZS5qcyBiZWZvcmUgMC45XG4gICAgICAgIGluc3RhbGxOZXh0VGlja0ltcGxlbWVudGF0aW9uKCk7XG5cbiAgICB9IGVsc2UgaWYgKGNhblVzZVBvc3RNZXNzYWdlKCkpIHtcbiAgICAgICAgLy8gRm9yIG5vbi1JRTEwIG1vZGVybiBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsUG9zdE1lc3NhZ2VJbXBsZW1lbnRhdGlvbigpO1xuXG4gICAgfSBlbHNlIGlmIChnbG9iYWwuTWVzc2FnZUNoYW5uZWwpIHtcbiAgICAgICAgLy8gRm9yIHdlYiB3b3JrZXJzLCB3aGVyZSBzdXBwb3J0ZWRcbiAgICAgICAgaW5zdGFsbE1lc3NhZ2VDaGFubmVsSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSBpZiAoZG9jICYmIFwib25yZWFkeXN0YXRlY2hhbmdlXCIgaW4gZG9jLmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIikpIHtcbiAgICAgICAgLy8gRm9yIElFIDbigJM4XG4gICAgICAgIGluc3RhbGxSZWFkeVN0YXRlQ2hhbmdlSW1wbGVtZW50YXRpb24oKTtcblxuICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEZvciBvbGRlciBicm93c2Vyc1xuICAgICAgICBpbnN0YWxsU2V0VGltZW91dEltcGxlbWVudGF0aW9uKCk7XG4gICAgfVxuXG4gICAgYXR0YWNoVG8uc2V0SW1tZWRpYXRlID0gc2V0SW1tZWRpYXRlO1xuICAgIGF0dGFjaFRvLmNsZWFySW1tZWRpYXRlID0gY2xlYXJJbW1lZGlhdGU7XG59KHR5cGVvZiBzZWxmID09PSBcInVuZGVmaW5lZFwiID8gdHlwZW9mIGdsb2JhbCA9PT0gXCJ1bmRlZmluZWRcIiA/IHRoaXMgOiBnbG9iYWwgOiBzZWxmKSk7XG4iLCJ2YXIgc2NvcGUgPSAodHlwZW9mIGdsb2JhbCAhPT0gXCJ1bmRlZmluZWRcIiAmJiBnbG9iYWwpIHx8XG4gICAgICAgICAgICAodHlwZW9mIHNlbGYgIT09IFwidW5kZWZpbmVkXCIgJiYgc2VsZikgfHxcbiAgICAgICAgICAgIHdpbmRvdztcbnZhciBhcHBseSA9IEZ1bmN0aW9uLnByb3RvdHlwZS5hcHBseTtcblxuLy8gRE9NIEFQSXMsIGZvciBjb21wbGV0ZW5lc3NcblxuZXhwb3J0cy5zZXRUaW1lb3V0ID0gZnVuY3Rpb24oKSB7XG4gIHJldHVybiBuZXcgVGltZW91dChhcHBseS5jYWxsKHNldFRpbWVvdXQsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhclRpbWVvdXQpO1xufTtcbmV4cG9ydHMuc2V0SW50ZXJ2YWwgPSBmdW5jdGlvbigpIHtcbiAgcmV0dXJuIG5ldyBUaW1lb3V0KGFwcGx5LmNhbGwoc2V0SW50ZXJ2YWwsIHNjb3BlLCBhcmd1bWVudHMpLCBjbGVhckludGVydmFsKTtcbn07XG5leHBvcnRzLmNsZWFyVGltZW91dCA9XG5leHBvcnRzLmNsZWFySW50ZXJ2YWwgPSBmdW5jdGlvbih0aW1lb3V0KSB7XG4gIGlmICh0aW1lb3V0KSB7XG4gICAgdGltZW91dC5jbG9zZSgpO1xuICB9XG59O1xuXG5mdW5jdGlvbiBUaW1lb3V0KGlkLCBjbGVhckZuKSB7XG4gIHRoaXMuX2lkID0gaWQ7XG4gIHRoaXMuX2NsZWFyRm4gPSBjbGVhckZuO1xufVxuVGltZW91dC5wcm90b3R5cGUudW5yZWYgPSBUaW1lb3V0LnByb3RvdHlwZS5yZWYgPSBmdW5jdGlvbigpIHt9O1xuVGltZW91dC5wcm90b3R5cGUuY2xvc2UgPSBmdW5jdGlvbigpIHtcbiAgdGhpcy5fY2xlYXJGbi5jYWxsKHNjb3BlLCB0aGlzLl9pZCk7XG59O1xuXG4vLyBEb2VzIG5vdCBzdGFydCB0aGUgdGltZSwganVzdCBzZXRzIHVwIHRoZSBtZW1iZXJzIG5lZWRlZC5cbmV4cG9ydHMuZW5yb2xsID0gZnVuY3Rpb24oaXRlbSwgbXNlY3MpIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IG1zZWNzO1xufTtcblxuZXhwb3J0cy51bmVucm9sbCA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuICBpdGVtLl9pZGxlVGltZW91dCA9IC0xO1xufTtcblxuZXhwb3J0cy5fdW5yZWZBY3RpdmUgPSBleHBvcnRzLmFjdGl2ZSA9IGZ1bmN0aW9uKGl0ZW0pIHtcbiAgY2xlYXJUaW1lb3V0KGl0ZW0uX2lkbGVUaW1lb3V0SWQpO1xuXG4gIHZhciBtc2VjcyA9IGl0ZW0uX2lkbGVUaW1lb3V0O1xuICBpZiAobXNlY3MgPj0gMCkge1xuICAgIGl0ZW0uX2lkbGVUaW1lb3V0SWQgPSBzZXRUaW1lb3V0KGZ1bmN0aW9uIG9uVGltZW91dCgpIHtcbiAgICAgIGlmIChpdGVtLl9vblRpbWVvdXQpXG4gICAgICAgIGl0ZW0uX29uVGltZW91dCgpO1xuICAgIH0sIG1zZWNzKTtcbiAgfVxufTtcblxuLy8gc2V0aW1tZWRpYXRlIGF0dGFjaGVzIGl0c2VsZiB0byB0aGUgZ2xvYmFsIG9iamVjdFxucmVxdWlyZShcInNldGltbWVkaWF0ZVwiKTtcbi8vIE9uIHNvbWUgZXhvdGljIGVudmlyb25tZW50cywgaXQncyBub3QgY2xlYXIgd2hpY2ggb2JqZWN0IGBzZXRpbW1lZGlhdGVgIHdhc1xuLy8gYWJsZSB0byBpbnN0YWxsIG9udG8uICBTZWFyY2ggZWFjaCBwb3NzaWJpbGl0eSBpbiB0aGUgc2FtZSBvcmRlciBhcyB0aGVcbi8vIGBzZXRpbW1lZGlhdGVgIGxpYnJhcnkuXG5leHBvcnRzLnNldEltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHR5cGVvZiBnbG9iYWwgIT09IFwidW5kZWZpbmVkXCIgJiYgZ2xvYmFsLnNldEltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgKHRoaXMgJiYgdGhpcy5zZXRJbW1lZGlhdGUpO1xuZXhwb3J0cy5jbGVhckltbWVkaWF0ZSA9ICh0eXBlb2Ygc2VsZiAhPT0gXCJ1bmRlZmluZWRcIiAmJiBzZWxmLmNsZWFySW1tZWRpYXRlKSB8fFxuICAgICAgICAgICAgICAgICAgICAgICAgICh0eXBlb2YgZ2xvYmFsICE9PSBcInVuZGVmaW5lZFwiICYmIGdsb2JhbC5jbGVhckltbWVkaWF0ZSkgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAodGhpcyAmJiB0aGlzLmNsZWFySW1tZWRpYXRlKTtcbiIsInZhciBnO1xyXG5cclxuLy8gVGhpcyB3b3JrcyBpbiBub24tc3RyaWN0IG1vZGVcclxuZyA9IChmdW5jdGlvbigpIHtcclxuXHRyZXR1cm4gdGhpcztcclxufSkoKTtcclxuXHJcbnRyeSB7XHJcblx0Ly8gVGhpcyB3b3JrcyBpZiBldmFsIGlzIGFsbG93ZWQgKHNlZSBDU1ApXHJcblx0ZyA9IGcgfHwgRnVuY3Rpb24oXCJyZXR1cm4gdGhpc1wiKSgpIHx8ICgxLCBldmFsKShcInRoaXNcIik7XHJcbn0gY2F0Y2ggKGUpIHtcclxuXHQvLyBUaGlzIHdvcmtzIGlmIHRoZSB3aW5kb3cgcmVmZXJlbmNlIGlzIGF2YWlsYWJsZVxyXG5cdGlmICh0eXBlb2Ygd2luZG93ID09PSBcIm9iamVjdFwiKSBnID0gd2luZG93O1xyXG59XHJcblxyXG4vLyBnIGNhbiBzdGlsbCBiZSB1bmRlZmluZWQsIGJ1dCBub3RoaW5nIHRvIGRvIGFib3V0IGl0Li4uXHJcbi8vIFdlIHJldHVybiB1bmRlZmluZWQsIGluc3RlYWQgb2Ygbm90aGluZyBoZXJlLCBzbyBpdCdzXHJcbi8vIGVhc2llciB0byBoYW5kbGUgdGhpcyBjYXNlLiBpZighZ2xvYmFsKSB7IC4uLn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZztcclxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBUaW1lLCBDYWxsYmFjayB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbmltcG9ydCB7IHBhcnNlSGVhZGVyIH0gZnJvbSBcIi4vaGVhZGVyXCI7XG5pbXBvcnQgbm1lcmdlIGZyb20gXCIuL25tZXJnZVwiO1xuaW1wb3J0IHsgUmVjb3JkLCBCYWdIZWFkZXIsIENodW5rLCBDaHVua0luZm8sIENvbm5lY3Rpb24sIEluZGV4RGF0YSwgTWVzc2FnZURhdGEgfSBmcm9tIFwiLi9yZWNvcmRcIjtcbmltcG9ydCAqIGFzIFRpbWVVdGlsIGZyb20gXCIuL1RpbWVVdGlsXCI7XG5cbmludGVyZmFjZSBDaHVua1JlYWRSZXN1bHQge1xuICBjaHVuazogQ2h1bms7XG4gIGluZGljZXM6IEluZGV4RGF0YVtdO1xufVxuXG5pbnRlcmZhY2UgRmlsZWxpa2Uge1xuICByZWFkKG9mZnNldDogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgY2FsbGJhY2s6IENhbGxiYWNrPEJ1ZmZlcj4pOiB2b2lkO1xuICBzaXplKCk6IG51bWJlcjtcbn1cblxuZXhwb3J0IHR5cGUgRGVjb21wcmVzcyA9IHtcbiAgW2NvbXByZXNzaW9uOiBzdHJpbmddOiAoYnVmZmVyOiBCdWZmZXIsIHNpemU6IG51bWJlcikgPT4gQnVmZmVyLFxufTtcblxuY29uc3QgSEVBREVSX1JFQURBSEVBRCA9IDQwOTY7XG5jb25zdCBIRUFERVJfT0ZGU0VUID0gMTM7XG5cbi8vIEJhZ1JlYWRlciBpcyBhIGxvd2VyIGxldmVsIGludGVyZmFjZSBmb3IgcmVhZGluZyBzcGVjaWZpYyBzZWN0aW9ucyAmIGNodW5rc1xuLy8gZnJvbSBhIHJvc2JhZyBmaWxlIC0gZ2VuZXJhbGx5IGl0IGlzIGNvbnN1bWVkIHRocm91Z2ggdGhlIEJhZyBjbGFzcywgYnV0XG4vLyBjYW4gYmUgdXNlZnVsIHRvIHVzZSBkaXJlY3RseSBmb3IgZWZmaWNpZW50bHkgYWNjZXNzaW5nIHJhdyBwaWVjZXMgZnJvbVxuLy8gd2l0aGluIHRoZSBiYWdcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEJhZ1JlYWRlciB7XG4gIF9sYXN0UmVhZFJlc3VsdDogQ2h1bmtSZWFkUmVzdWx0O1xuICBfZmlsZTogRmlsZWxpa2U7XG4gIF9sYXN0Q2h1bmtJbmZvOiA/Q2h1bmtJbmZvO1xuXG4gIGNvbnN0cnVjdG9yKGZpbGVsaWtlOiBGaWxlbGlrZSkge1xuICAgIHRoaXMuX2ZpbGUgPSBmaWxlbGlrZTtcbiAgICB0aGlzLl9sYXN0Q2h1bmtJbmZvID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgdmVyaWZ5QmFnSGVhZGVyKGNhbGxiYWNrOiBDYWxsYmFjazxCYWdIZWFkZXI+LCBuZXh0OiAoKSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fZmlsZS5yZWFkKDAsIEhFQURFUl9PRkZTRVQsIChlcnJvcjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcbiAgICAgIGlmIChlcnJvciB8fCAhYnVmZmVyKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhlcnJvciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLl9maWxlLnNpemUoKSA8IEhFQURFUl9PRkZTRVQpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihcIk1pc3NpbmcgZmlsZSBoZWFkZXIuXCIpKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGJ1ZmZlci50b1N0cmluZygpICE9PSBcIiNST1NCQUcgVjIuMFxcblwiKSB7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoXCJDYW5ub3QgaWRlbnRpZnkgYmFnIGZvcm1hdC5cIikpO1xuICAgICAgfVxuICAgICAgbmV4dCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVhZHMgdGhlIGhlYWRlciBibG9jayBmcm9tIHRoZSByb3NiYWcgZmlsZVxuICAvLyBnZW5lcmFsbHkgeW91IGNhbGwgdGhpcyBmaXJzdFxuICAvLyBiZWNhdXNlIHlvdSBuZWVkIHRoZSBoZWFkZXIgaW5mb3JtYXRpb24gdG8gY2FsbCByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9cbiAgcmVhZEhlYWRlcihjYWxsYmFjazogQ2FsbGJhY2s8QmFnSGVhZGVyPikge1xuICAgIHRoaXMudmVyaWZ5QmFnSGVhZGVyKGNhbGxiYWNrLCAoKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fZmlsZS5yZWFkKEhFQURFUl9PRkZTRVQsIEhFQURFUl9SRUFEQUhFQUQsIChlcnJvcjogRXJyb3IgfCBudWxsLCBidWZmZXI/OiBCdWZmZXIpID0+IHtcbiAgICAgICAgaWYgKGVycm9yIHx8ICFidWZmZXIpIHtcbiAgICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCBidWZmZXJcIikpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcmVhZCA9IGJ1ZmZlci5sZW5ndGg7XG4gICAgICAgIGlmIChyZWFkIDwgOCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoYFJlY29yZCBhdCBwb3NpdGlvbiAke0hFQURFUl9PRkZTRVR9IGlzIHRydW5jYXRlZC5gKSk7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBoZWFkZXJMZW5ndGggPSBidWZmZXIucmVhZEludDMyTEUoMCk7XG4gICAgICAgIGlmIChyZWFkIDwgaGVhZGVyTGVuZ3RoICsgOCkge1xuICAgICAgICAgIHJldHVybiBjYWxsYmFjayhuZXcgRXJyb3IoYFJlY29yZCBhdCBwb3NpdGlvbiAke0hFQURFUl9PRkZTRVR9IGhlYWRlciB0b28gbGFyZ2U6ICR7aGVhZGVyTGVuZ3RofS5gKSk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaGVhZGVyID0gdGhpcy5yZWFkUmVjb3JkRnJvbUJ1ZmZlcihidWZmZXIsIEhFQURFUl9PRkZTRVQsIEJhZ0hlYWRlcik7XG4gICAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBoZWFkZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBwcm9taXNpZmllZCB2ZXJzaW9uIG9mIHJlYWRIZWFkZXJcbiAgcmVhZEhlYWRlckFzeW5jKCk6IFByb21pc2U8QmFnSGVhZGVyPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+XG4gICAgICB0aGlzLnJlYWRIZWFkZXIoKGVycjogRXJyb3IgfCBudWxsLCBoZWFkZXI/OiBCYWdIZWFkZXIpID0+IChlcnIgfHwgIWhlYWRlciA/IHJlamVjdChlcnIpIDogcmVzb2x2ZShoZWFkZXIpKSlcbiAgICApO1xuICB9XG5cbiAgLy8gcmVhZHMgY29ubmVjdGlvbiBhbmQgY2h1bmsgaW5mb3JtYXRpb24gZnJvbSB0aGUgYmFnXG4gIC8vIHlvdSdsbCBnZW5lcmFsbHkgY2FsbCB0aGlzIGFmdGVyIHJlYWRpbmcgdGhlIGhlYWRlciBzbyB5b3UgY2FuIGdldFxuICAvLyBjb25uZWN0aW9uIG1ldGFkYXRhIGFuZCBjaHVua0luZm9zIHdoaWNoIGFsbG93IHlvdSB0byBzZWVrIHRvIGluZGl2aWR1YWxcbiAgLy8gY2h1bmtzICYgcmVhZCB0aGVtXG4gIHJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mbyhcbiAgICBmaWxlT2Zmc2V0OiBudW1iZXIsXG4gICAgY29ubmVjdGlvbkNvdW50OiBudW1iZXIsXG4gICAgY2h1bmtDb3VudDogbnVtYmVyLFxuICAgIGNhbGxiYWNrOiBDYWxsYmFjazx7IGNvbm5lY3Rpb25zOiBDb25uZWN0aW9uW10sIGNodW5rSW5mb3M6IENodW5rSW5mb1tdIH0+XG4gICkge1xuICAgIHRoaXMuX2ZpbGUucmVhZChmaWxlT2Zmc2V0LCB0aGlzLl9maWxlLnNpemUoKSAtIGZpbGVPZmZzZXQsIChlcnI6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XG4gICAgICBpZiAoZXJyIHx8ICFidWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChjb25uZWN0aW9uQ291bnQgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG51bGwsIHsgY29ubmVjdGlvbnM6IFtdLCBjaHVua0luZm9zOiBbXSB9KTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29ubmVjdGlvbnMgPSB0aGlzLnJlYWRSZWNvcmRzRnJvbUJ1ZmZlcihidWZmZXIsIGNvbm5lY3Rpb25Db3VudCwgZmlsZU9mZnNldCwgQ29ubmVjdGlvbik7XG4gICAgICBjb25zdCBjb25uZWN0aW9uQmxvY2tMZW5ndGggPSBjb25uZWN0aW9uc1tjb25uZWN0aW9uQ291bnQgLSAxXS5lbmQgLSBjb25uZWN0aW9uc1swXS5vZmZzZXQ7XG4gICAgICBjb25zdCBjaHVua0luZm9zID0gdGhpcy5yZWFkUmVjb3Jkc0Zyb21CdWZmZXIoXG4gICAgICAgIGJ1ZmZlci5zbGljZShjb25uZWN0aW9uQmxvY2tMZW5ndGgpLFxuICAgICAgICBjaHVua0NvdW50LFxuICAgICAgICBmaWxlT2Zmc2V0ICsgY29ubmVjdGlvbkJsb2NrTGVuZ3RoLFxuICAgICAgICBDaHVua0luZm9cbiAgICAgICk7XG5cbiAgICAgIGlmIChjaHVua0NvdW50ID4gMCkge1xuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rQ291bnQgLSAxOyBpKyspIHtcbiAgICAgICAgICBjaHVua0luZm9zW2ldLm5leHRDaHVuayA9IGNodW5rSW5mb3NbaSArIDFdO1xuICAgICAgICB9XG4gICAgICAgIGNodW5rSW5mb3NbY2h1bmtDb3VudCAtIDFdLm5leHRDaHVuayA9IG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB7IGNvbm5lY3Rpb25zLCBjaHVua0luZm9zIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcHJvbWlzaWZpZWQgdmVyc2lvbiBvZiByZWFkQ29ubmVjdGlvbnNBbmRDaHVua0luZm9cbiAgcmVhZENvbm5lY3Rpb25zQW5kQ2h1bmtJbmZvQXN5bmMoXG4gICAgZmlsZU9mZnNldDogbnVtYmVyLFxuICAgIGNvbm5lY3Rpb25Db3VudDogbnVtYmVyLFxuICAgIGNodW5rQ291bnQ6IG51bWJlclxuICApOiBQcm9taXNlPHsgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSwgY2h1bmtJbmZvczogQ2h1bmtJbmZvW10gfT4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLnJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mbyhcbiAgICAgICAgZmlsZU9mZnNldCxcbiAgICAgICAgY29ubmVjdGlvbkNvdW50LFxuICAgICAgICBjaHVua0NvdW50LFxuICAgICAgICAoZXJyOiBFcnJvciB8IG51bGwsIHJlc3VsdD86IHsgY29ubmVjdGlvbnM6IENvbm5lY3Rpb25bXSwgY2h1bmtJbmZvczogQ2h1bmtJbmZvW10gfSkgPT5cbiAgICAgICAgICBlcnIgfHwgIXJlc3VsdCA/IHJlamVjdChlcnIpIDogcmVzb2x2ZShyZXN1bHQpXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gcmVhZCBpbmRpdmlkdWFsIHJhdyBtZXNzYWdlcyBmcm9tIHRoZSBiYWcgYXQgYSBnaXZlbiBjaHVua1xuICAvLyBmaWx0ZXJzIHRvIGEgc3BlY2lmaWMgc2V0IG9mIGNvbm5lY3Rpb24gaWRzLCBzdGFydCB0aW1lLCAmIGVuZCB0aW1lXG4gIC8vIGdlbmVyYWxseSB0aGUgcmVjb3JkcyB3aWxsIGJlIG9mIHR5cGUgTWVzc2FnZURhdGFcbiAgcmVhZENodW5rTWVzc2FnZXMoXG4gICAgY2h1bmtJbmZvOiBDaHVua0luZm8sXG4gICAgY29ubmVjdGlvbnM6IG51bWJlcltdLFxuICAgIHN0YXJ0VGltZTogVGltZSB8IG51bGwsXG4gICAgZW5kVGltZTogVGltZSB8IG51bGwsXG4gICAgZGVjb21wcmVzczogRGVjb21wcmVzcyxcbiAgICBjYWxsYmFjazogQ2FsbGJhY2s8TWVzc2FnZURhdGFbXT5cbiAgKSB7XG4gICAgY29uc3Qgc3RhcnQgPSBzdGFydFRpbWUgfHwgeyBzZWM6IDAsIG5zZWM6IDAgfTtcbiAgICBjb25zdCBlbmQgPSBlbmRUaW1lIHx8IHsgc2VjOiBOdW1iZXIuTUFYX1ZBTFVFLCBuc2VjOiBOdW1iZXIuTUFYX1ZBTFVFIH07XG4gICAgY29uc3QgY29ubnMgPVxuICAgICAgY29ubmVjdGlvbnMgfHxcbiAgICAgIGNodW5rSW5mby5jb25uZWN0aW9ucy5tYXAoKGNvbm5lY3Rpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIGNvbm5lY3Rpb24uY29ubjtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5yZWFkQ2h1bmsoY2h1bmtJbmZvLCBkZWNvbXByZXNzLCAoZXJyb3I6IEVycm9yIHwgbnVsbCwgcmVzdWx0PzogQ2h1bmtSZWFkUmVzdWx0KSA9PiB7XG4gICAgICBpZiAoZXJyb3IgfHwgIXJlc3VsdCkge1xuICAgICAgICByZXR1cm4gY2FsbGJhY2soZXJyb3IgfHwgbmV3IEVycm9yKFwiTWlzc2luZyBib3RoIGVycm9yIGFuZCByZXN1bHRcIikpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaHVuayA9IHJlc3VsdC5jaHVuaztcbiAgICAgIGNvbnN0IGluZGljZXM6IHsgW2Nvbm46IG51bWJlcl06IEluZGV4RGF0YSB9ID0ge307XG4gICAgICByZXN1bHQuaW5kaWNlcy5mb3JFYWNoKChpbmRleCkgPT4ge1xuICAgICAgICBpbmRpY2VzW2luZGV4LmNvbm5dID0gaW5kZXg7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHByZXNlbnRDb25uZWN0aW9ucyA9IGNvbm5zLmZpbHRlcigoY29ubikgPT4ge1xuICAgICAgICByZXR1cm4gaW5kaWNlc1tjb25uXSAhPT0gdW5kZWZpbmVkO1xuICAgICAgfSk7XG4gICAgICBjb25zdCBpdGVyYWJsZXMgPSBwcmVzZW50Q29ubmVjdGlvbnMubWFwKChjb25uKSA9PiB7XG4gICAgICAgIC8vICRGbG93Rml4TWUgaHR0cHM6Ly9naXRodWIuY29tL2ZhY2Vib29rL2Zsb3cvaXNzdWVzLzExNjNcbiAgICAgICAgcmV0dXJuIGluZGljZXNbY29ubl0uaW5kaWNlc1tTeW1ib2wuaXRlcmF0b3JdKCk7XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGl0ZXIgPSBubWVyZ2UoKGEsIGIpID0+IFRpbWVVdGlsLmNvbXBhcmUoYS50aW1lLCBiLnRpbWUpLCAuLi5pdGVyYWJsZXMpO1xuXG4gICAgICBjb25zdCBlbnRyaWVzID0gW107XG4gICAgICBsZXQgaXRlbSA9IGl0ZXIubmV4dCgpO1xuICAgICAgd2hpbGUgKCFpdGVtLmRvbmUpIHtcbiAgICAgICAgY29uc3QgeyB2YWx1ZSB9ID0gaXRlbTtcbiAgICAgICAgaXRlbSA9IGl0ZXIubmV4dCgpO1xuICAgICAgICBpZiAoIXZhbHVlIHx8IFRpbWVVdGlsLmlzR3JlYXRlclRoYW4oc3RhcnQsIHZhbHVlLnRpbWUpKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKFRpbWVVdGlsLmlzR3JlYXRlclRoYW4odmFsdWUudGltZSwgZW5kKSkge1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGVudHJpZXMucHVzaCh2YWx1ZSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gZW50cmllcy5tYXAoKGVudHJ5KSA9PiB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlYWRSZWNvcmRGcm9tQnVmZmVyKGNodW5rLmRhdGEuc2xpY2UoZW50cnkub2Zmc2V0KSwgY2h1bmsuZGF0YU9mZnNldCwgTWVzc2FnZURhdGEpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCBtZXNzYWdlcyk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBwcm9taXNpZmllZCB2ZXJzaW9uIG9mIHJlYWRDaHVua01lc3NhZ2VzXG4gIHJlYWRDaHVua01lc3NhZ2VzQXN5bmMoXG4gICAgY2h1bmtJbmZvOiBDaHVua0luZm8sXG4gICAgY29ubmVjdGlvbnM6IG51bWJlcltdLFxuICAgIHN0YXJ0VGltZTogVGltZSxcbiAgICBlbmRUaW1lOiBUaW1lLFxuICAgIGRlY29tcHJlc3M6IERlY29tcHJlc3NcbiAgKTogUHJvbWlzZTxNZXNzYWdlRGF0YVtdPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMucmVhZENodW5rTWVzc2FnZXMoXG4gICAgICAgIGNodW5rSW5mbyxcbiAgICAgICAgY29ubmVjdGlvbnMsXG4gICAgICAgIHN0YXJ0VGltZSxcbiAgICAgICAgZW5kVGltZSxcbiAgICAgICAgZGVjb21wcmVzcyxcbiAgICAgICAgKGVycjogRXJyb3IgfCBudWxsLCBtZXNzYWdlcz86IE1lc3NhZ2VEYXRhW10pID0+IChlcnIgfHwgIW1lc3NhZ2VzID8gcmVqZWN0KGVycikgOiByZXNvbHZlKG1lc3NhZ2VzKSlcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZWFkcyBhIHNpbmdsZSBjaHVuayByZWNvcmQgJiYgaXRzIGluZGV4IHJlY29yZHMgZ2l2ZW4gYSBjaHVua0luZm9cbiAgcmVhZENodW5rKGNodW5rSW5mbzogQ2h1bmtJbmZvLCBkZWNvbXByZXNzOiBEZWNvbXByZXNzLCBjYWxsYmFjazogQ2FsbGJhY2s8Q2h1bmtSZWFkUmVzdWx0Pikge1xuICAgIC8vIGlmIHdlJ3JlIHJlYWRpbmcgdGhlIHNhbWUgY2h1bmsgYSBzZWNvbmQgdGltZSByZXR1cm4gdGhlIGNhY2hlZCB2ZXJzaW9uXG4gICAgLy8gdG8gYXZvaWQgZG9pbmcgZGVjb21wcmVzc2lvbiBvbiB0aGUgc2FtZSBjaHVuayBtdWx0aXBsZSB0aW1lcyB3aGljaCBpc1xuICAgIC8vIGV4cGVuc2l2ZVxuICAgIGlmIChjaHVua0luZm8gPT09IHRoaXMuX2xhc3RDaHVua0luZm8gJiYgdGhpcy5fbGFzdFJlYWRSZXN1bHQpIHtcbiAgICAgIC8vIGFsd2F5cyBjYWxsYmFjayBhc3luYywgZXZlbiBpZiB3ZSBoYXZlIHRoZSByZXN1bHRcbiAgICAgIC8vIGh0dHBzOi8vb3Jlbi5naXRodWIuaW8vYmxvZy96YWxnby5odG1sXG4gICAgICBjb25zdCBsYXN0UmVhZFJlc3VsdCA9IHRoaXMuX2xhc3RSZWFkUmVzdWx0O1xuICAgICAgcmV0dXJuIHNldEltbWVkaWF0ZSgoKSA9PiBjYWxsYmFjayhudWxsLCBsYXN0UmVhZFJlc3VsdCkpO1xuICAgIH1cbiAgICBjb25zdCB7IG5leHRDaHVuayB9ID0gY2h1bmtJbmZvO1xuXG4gICAgY29uc3QgcmVhZExlbmd0aCA9IG5leHRDaHVua1xuICAgICAgPyBuZXh0Q2h1bmsuY2h1bmtQb3NpdGlvbiAtIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uXG4gICAgICA6IHRoaXMuX2ZpbGUuc2l6ZSgpIC0gY2h1bmtJbmZvLmNodW5rUG9zaXRpb247XG5cbiAgICB0aGlzLl9maWxlLnJlYWQoY2h1bmtJbmZvLmNodW5rUG9zaXRpb24sIHJlYWRMZW5ndGgsIChlcnI6IEVycm9yIHwgbnVsbCwgYnVmZmVyPzogQnVmZmVyKSA9PiB7XG4gICAgICBpZiAoZXJyIHx8ICFidWZmZXIpIHtcbiAgICAgICAgcmV0dXJuIGNhbGxiYWNrKGVyciB8fCBuZXcgRXJyb3IoXCJNaXNzaW5nIGJvdGggZXJyb3IgYW5kIGJ1ZmZlclwiKSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNodW5rID0gdGhpcy5yZWFkUmVjb3JkRnJvbUJ1ZmZlcihidWZmZXIsIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uLCBDaHVuayk7XG4gICAgICBjb25zdCB7IGNvbXByZXNzaW9uIH0gPSBjaHVuaztcbiAgICAgIGlmIChjb21wcmVzc2lvbiAhPT0gXCJub25lXCIpIHtcbiAgICAgICAgY29uc3QgZGVjb21wcmVzc0ZuID0gZGVjb21wcmVzc1tjb21wcmVzc2lvbl07XG4gICAgICAgIGlmICghZGVjb21wcmVzc0ZuKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgY29tcHJlc3Npb24gdHlwZSAke2NodW5rLmNvbXByZXNzaW9ufWApKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByZXN1bHQgPSBkZWNvbXByZXNzRm4oY2h1bmsuZGF0YSwgY2h1bmsuc2l6ZSk7XG4gICAgICAgIGNodW5rLmRhdGEgPSByZXN1bHQ7XG4gICAgICB9XG4gICAgICBjb25zdCBpbmRpY2VzID0gdGhpcy5yZWFkUmVjb3Jkc0Zyb21CdWZmZXIoXG4gICAgICAgIGJ1ZmZlci5zbGljZShjaHVuay5sZW5ndGgpLFxuICAgICAgICBjaHVua0luZm8uY291bnQsXG4gICAgICAgIGNodW5rSW5mby5jaHVua1Bvc2l0aW9uICsgY2h1bmsubGVuZ3RoLFxuICAgICAgICBJbmRleERhdGFcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuX2xhc3RDaHVua0luZm8gPSBjaHVua0luZm87XG4gICAgICB0aGlzLl9sYXN0UmVhZFJlc3VsdCA9IHsgY2h1bmssIGluZGljZXMgfTtcbiAgICAgIHJldHVybiBjYWxsYmFjayhudWxsLCB0aGlzLl9sYXN0UmVhZFJlc3VsdCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyByZWFkcyBjb3VudCByZWNvcmRzIGZyb20gYSBidWZmZXIgc3RhcnRpbmcgYXQgZmlsZU9mZnNldFxuICByZWFkUmVjb3Jkc0Zyb21CdWZmZXI8VDogUmVjb3JkPihcbiAgICBidWZmZXI6IEJ1ZmZlcixcbiAgICBjb3VudDogbnVtYmVyLFxuICAgIGZpbGVPZmZzZXQ6IG51bWJlcixcbiAgICBjbHM6IENsYXNzPFQ+ICYgeyBvcGNvZGU6IG51bWJlciB9XG4gICk6IFRbXSB7XG4gICAgY29uc3QgcmVjb3JkcyA9IFtdO1xuICAgIGxldCBidWZmZXJPZmZzZXQgPSAwO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgY291bnQ7IGkrKykge1xuICAgICAgY29uc3QgcmVjb3JkID0gdGhpcy5yZWFkUmVjb3JkRnJvbUJ1ZmZlcihidWZmZXIuc2xpY2UoYnVmZmVyT2Zmc2V0KSwgZmlsZU9mZnNldCArIGJ1ZmZlck9mZnNldCwgY2xzKTtcbiAgICAgIGJ1ZmZlck9mZnNldCArPSByZWNvcmQuZW5kIC0gcmVjb3JkLm9mZnNldDtcbiAgICAgIHJlY29yZHMucHVzaChyZWNvcmQpO1xuICAgIH1cbiAgICByZXR1cm4gcmVjb3JkcztcbiAgfVxuXG4gIC8vIHJlYWQgYW4gaW5kaXZpZHVhbCByZWNvcmQgZnJvbSBhIGJ1ZmZlclxuICByZWFkUmVjb3JkRnJvbUJ1ZmZlcjxUOiBSZWNvcmQ+KGJ1ZmZlcjogQnVmZmVyLCBmaWxlT2Zmc2V0OiBudW1iZXIsIGNsczogQ2xhc3M8VD4gJiB7IG9wY29kZTogbnVtYmVyIH0pOiBUIHtcbiAgICBjb25zdCBoZWFkZXJMZW5ndGggPSBidWZmZXIucmVhZEludDMyTEUoMCk7XG4gICAgY29uc3QgcmVjb3JkID0gcGFyc2VIZWFkZXIoYnVmZmVyLnNsaWNlKDQsIDQgKyBoZWFkZXJMZW5ndGgpLCBjbHMpO1xuXG4gICAgY29uc3QgZGF0YU9mZnNldCA9IDQgKyBoZWFkZXJMZW5ndGggKyA0O1xuICAgIGNvbnN0IGRhdGFMZW5ndGggPSBidWZmZXIucmVhZEludDMyTEUoNCArIGhlYWRlckxlbmd0aCk7XG4gICAgY29uc3QgZGF0YSA9IGJ1ZmZlci5zbGljZShkYXRhT2Zmc2V0LCBkYXRhT2Zmc2V0ICsgZGF0YUxlbmd0aCk7XG5cbiAgICByZWNvcmQucGFyc2VEYXRhKGRhdGEpO1xuXG4gICAgcmVjb3JkLm9mZnNldCA9IGZpbGVPZmZzZXQ7XG4gICAgcmVjb3JkLmRhdGFPZmZzZXQgPSByZWNvcmQub2Zmc2V0ICsgNCArIGhlYWRlckxlbmd0aCArIDQ7XG4gICAgcmVjb3JkLmVuZCA9IHJlY29yZC5kYXRhT2Zmc2V0ICsgZGF0YUxlbmd0aDtcbiAgICByZWNvcmQubGVuZ3RoID0gcmVjb3JkLmVuZCAtIHJlY29yZC5vZmZzZXQ7XG5cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgR00gQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgaW50NTMgZnJvbSBcImludDUzXCI7XG5pbXBvcnQgeyBleHRyYWN0VGltZSB9IGZyb20gXCIuL2ZpZWxkc1wiO1xuaW1wb3J0IHsgcGFyc2VNZXNzYWdlRGVmaW5pdGlvbiwgdHlwZSBSb3NNc2dEZWZpbml0aW9uLCB0eXBlIE5hbWVkUm9zTXNnRGVmaW5pdGlvbiB9IGZyb20gXCIuL3BhcnNlTWVzc2FnZURlZmluaXRpb25cIjtcblxudHlwZSBUeXBlZEFycmF5Q29uc3RydWN0b3IgPSAoXG4gIGJ1ZmZlcjogQXJyYXlCdWZmZXIsXG4gIGJ5dGVPZmZzZXQ6IG51bWJlcixcbiAgbGVuZ3RoOiBudW1iZXJcbikgPT5cbiAgfCBJbnQ4QXJyYXlcbiAgfCBVaW50OEFycmF5XG4gIHwgSW50MTZBcnJheVxuICB8IFVpbnQxNkFycmF5XG4gIHwgSW50MzJBcnJheVxuICB8IFVpbnQzMkFycmF5XG4gIHwgVWludDhDbGFtcGVkQXJyYXlcbiAgfCBGbG9hdDMyQXJyYXlcbiAgfCBGbG9hdDY0QXJyYXk7XG5cbi8vIHRoaXMgaGFzIGhhcmQtY29kZWQgYnVmZmVyIHJlYWRpbmcgZnVuY3Rpb25zIGZvciBlYWNoXG4vLyBvZiB0aGUgc3RhbmRhcmQgbWVzc2FnZSB0eXBlcyBodHRwOi8vZG9jcy5yb3Mub3JnL2FwaS9zdGRfbXNncy9odG1sL2luZGV4LW1zZy5odG1sXG4vLyBldmVudHVhbGx5IGN1c3RvbSB0eXBlcyBkZWNvbXBvc2UgaW50byB0aGVzZSBzdGFuZGFyZCB0eXBlc1xuY2xhc3MgU3RhbmRhcmRUeXBlUmVhZGVyIHtcbiAgYnVmZmVyOiBCdWZmZXI7XG4gIG9mZnNldDogbnVtYmVyO1xuICB2aWV3OiBEYXRhVmlldztcblxuICBjb25zdHJ1Y3RvcihidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuYnVmZmVyID0gYnVmZmVyO1xuICAgIHRoaXMub2Zmc2V0ID0gMDtcbiAgICB0aGlzLnZpZXcgPSBuZXcgRGF0YVZpZXcoYnVmZmVyLmJ1ZmZlciwgYnVmZmVyLmJ5dGVPZmZzZXQpO1xuICB9XG5cbiAgc3RyaW5nKCkge1xuICAgIGNvbnN0IGxlbiA9IHRoaXMuaW50MzIoKTtcbiAgICBjb25zdCBjb2RlUG9pbnRzID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5idWZmZXIuYnVmZmVyLCB0aGlzLmJ1ZmZlci5ieXRlT2Zmc2V0ICsgdGhpcy5vZmZzZXQsIGxlbik7XG4gICAgdGhpcy5vZmZzZXQgKz0gbGVuO1xuICAgIC8vIGlmIHRoZSBzdHJpbmcgaXMgcmVsYXRpdmVseSBzaG9ydCB3ZSBjYW4gdXNlIGFwcGx5XG4gICAgLy8gYnV0IHZlcnkgbG9uZyBzdHJpbmdzIGNhbiBjYXVzZSBhIHN0YWNrIG92ZXJmbG93IGR1ZSB0byB0b28gbWFueSBhcmd1bWVudHNcbiAgICAvLyBpbiB0aG9zZSBjYXNlcyByZXZlcnQgdG8gYSBzbG93ZXIgaXR0ZXJhdGl2ZSBzdHJpbmcgYnVpbGRpbmcgYXBwcm9hY2hcbiAgICBpZiAoY29kZVBvaW50cy5sZW5ndGggPCAxMDAwKSB7XG4gICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZS5hcHBseShudWxsLCBjb2RlUG9pbnRzKTtcbiAgICB9XG5cbiAgICBsZXQgZGF0YSA9IFwiXCI7XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsZW47IGkrKykge1xuICAgICAgZGF0YSArPSBTdHJpbmcuZnJvbUNoYXJDb2RlKGNvZGVQb2ludHNbaV0pO1xuICAgIH1cbiAgICByZXR1cm4gZGF0YTtcbiAgfVxuXG4gIGJvb2woKSB7XG4gICAgcmV0dXJuIHRoaXMudWludDgoKSAhPT0gMDtcbiAgfVxuXG4gIGludDgoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRJbnQ4KHRoaXMub2Zmc2V0KyspO1xuICB9XG5cbiAgdWludDgoKSB7XG4gICAgcmV0dXJuIHRoaXMudmlldy5nZXRVaW50OCh0aGlzLm9mZnNldCsrKTtcbiAgfVxuXG4gIHR5cGVkQXJyYXkobGVuOiA/bnVtYmVyLCBhcnJheVR5cGU6IFR5cGVkQXJyYXlDb25zdHJ1Y3Rvcikge1xuICAgIGNvbnN0IGFycmF5TGVuZ3RoID0gbGVuID09IG51bGwgPyB0aGlzLnVpbnQzMigpIDogbGVuO1xuICAgIGNvbnN0IGRhdGEgPSBuZXcgYXJyYXlUeXBlKHRoaXMudmlldy5idWZmZXIsIHRoaXMub2Zmc2V0ICsgdGhpcy52aWV3LmJ5dGVPZmZzZXQsIGFycmF5TGVuZ3RoKTtcbiAgICB0aGlzLm9mZnNldCArPSBhcnJheUxlbmd0aDtcblxuICAgIHJldHVybiBkYXRhO1xuICB9XG5cbiAgaW50MTYoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldEludDE2KHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSAyO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB1aW50MTYoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldFVpbnQxNih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gMjtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaW50MzIoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldEludDMyKHRoaXMub2Zmc2V0LCB0cnVlKTtcbiAgICB0aGlzLm9mZnNldCArPSA0O1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICB1aW50MzIoKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy52aWV3LmdldFVpbnQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZmxvYXQzMigpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0RmxvYXQzMih0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gNDtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgZmxvYXQ2NCgpIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLnZpZXcuZ2V0RmxvYXQ2NCh0aGlzLm9mZnNldCwgdHJ1ZSk7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgaW50NjQoKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gaW50NTMucmVhZEludDY0TEUodGhpcy5idWZmZXIsIG9mZnNldCk7XG4gIH1cblxuICB1aW50NjQoKSB7XG4gICAgY29uc3Qgb2Zmc2V0ID0gdGhpcy5vZmZzZXQ7XG4gICAgdGhpcy5vZmZzZXQgKz0gODtcbiAgICByZXR1cm4gaW50NTMucmVhZFVJbnQ2NExFKHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICB9XG5cbiAgdGltZSgpIHtcbiAgICBjb25zdCBvZmZzZXQgPSB0aGlzLm9mZnNldDtcbiAgICB0aGlzLm9mZnNldCArPSA4O1xuICAgIHJldHVybiBleHRyYWN0VGltZSh0aGlzLmJ1ZmZlciwgb2Zmc2V0KTtcbiAgfVxuXG4gIGR1cmF0aW9uKCkge1xuICAgIGNvbnN0IG9mZnNldCA9IHRoaXMub2Zmc2V0O1xuICAgIHRoaXMub2Zmc2V0ICs9IDg7XG4gICAgcmV0dXJuIGV4dHJhY3RUaW1lKHRoaXMuYnVmZmVyLCBvZmZzZXQpO1xuICB9XG59XG5cbmNvbnN0IGZpbmRUeXBlQnlOYW1lID0gKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10sIG5hbWUgPSBcIlwiKTogTmFtZWRSb3NNc2dEZWZpbml0aW9uID0+IHtcbiAgbGV0IGZvdW5kTmFtZSA9IFwiXCI7IC8vIHRyYWNrIG5hbWUgc2VwYXJhdGVseSBpbiBhIG5vbi1udWxsIHZhcmlhYmxlIHRvIGFwcGVhc2UgRmxvd1xuICBjb25zdCBtYXRjaGVzID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiB7XG4gICAgY29uc3QgdHlwZU5hbWUgPSB0eXBlLm5hbWUgfHwgXCJcIjtcbiAgICAvLyBpZiB0aGUgc2VhcmNoIGlzIGVtcHR5LCByZXR1cm4gdW5uYW1lZCB0eXBlc1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICF0eXBlTmFtZTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGlmIHRoZSBzZWFyY2ggaXMgaW4gdGhlIHR5cGUgbmFtZVxuICAgIC8vIG9yIG1hdGNoZXMgZXhhY3RseSBpZiBhIGZ1bGx5LXF1YWxpZmllZCBuYW1lIG1hdGNoIGlzIHBhc3NlZCB0byB1c1xuICAgIGNvbnN0IG5hbWVFbmQgPSBuYW1lLmluZGV4T2YoXCIvXCIpID4gLTEgPyBuYW1lIDogYC8ke25hbWV9YDtcbiAgICBpZiAodHlwZU5hbWUuZW5kc1dpdGgobmFtZUVuZCkpIHtcbiAgICAgIGZvdW5kTmFtZSA9IHR5cGVOYW1lO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG4gIGlmIChtYXRjaGVzLmxlbmd0aCAhPT0gMSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgMSB0b3AgbGV2ZWwgdHlwZSBkZWZpbml0aW9uIGZvciAnJHtuYW1lfScgYnV0IGZvdW5kICR7bWF0Y2hlcy5sZW5ndGh9YCk7XG4gIH1cbiAgcmV0dXJuIHsgLi4ubWF0Y2hlc1swXSwgbmFtZTogZm91bmROYW1lIH07XG59O1xuXG5jb25zdCBjb25zdHJ1Y3RvckJvZHkgPSAodHlwZTogJFJlYWRPbmx5PFJvc01zZ0RlZmluaXRpb24+KSA9PiB7XG4gIHJldHVybiB0eXBlLmRlZmluaXRpb25zXG4gICAgLmZpbHRlcigoZGVmKSA9PiAhZGVmLmlzQ29uc3RhbnQpXG4gICAgLm1hcCgoZGVmKSA9PiB7XG4gICAgICByZXR1cm4gYHRoaXMuJHtkZWYubmFtZX0gPSB1bmRlZmluZWRgO1xuICAgIH0pXG4gICAgLmpvaW4oXCI7XFxuXCIpO1xufTtcblxuY29uc3QgZnJpZW5kbHlOYW1lID0gKG5hbWU6IHN0cmluZykgPT4gbmFtZS5yZXBsYWNlKFwiL1wiLCBcIl9cIik7XG5cbmNvbnN0IGNyZWF0ZVBhcnNlciA9ICh0eXBlczogUm9zTXNnRGVmaW5pdGlvbltdKSA9PiB7XG4gIGNvbnN0IHVubmFtZWRUeXBlcyA9IHR5cGVzLmZpbHRlcigodHlwZSkgPT4gIXR5cGUubmFtZSk7XG4gIGlmICh1bm5hbWVkVHlwZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwibXVsdGlwbGUgdW5uYW1lZCB0eXBlc1wiKTtcbiAgfVxuXG4gIGNvbnN0IFt1bm5hbWVkVHlwZV0gPSB1bm5hbWVkVHlwZXM7XG5cbiAgY29uc3QgbmFtZWRUeXBlczogTmFtZWRSb3NNc2dEZWZpbml0aW9uW10gPSAodHlwZXMuZmlsdGVyKCh0eXBlKSA9PiAhIXR5cGUubmFtZSk6IGFueVtdKTtcblxuICBsZXQganMgPSBgXG4gIHZhciBSZWNvcmQgPSBmdW5jdGlvbiAoKSB7XG4gICAgJHtjb25zdHJ1Y3RvckJvZHkodW5uYW1lZFR5cGUpfVxuICB9O1xcbmA7XG5cbiAgbmFtZWRUeXBlcy5mb3JFYWNoKCh0KSA9PiB7XG4gICAganMgKz0gYFxuUmVjb3JkLiR7ZnJpZW5kbHlOYW1lKHQubmFtZSl9ID0gZnVuY3Rpb24oKSB7XG4gICR7Y29uc3RydWN0b3JCb2R5KHQpfVxufTtcXG5gO1xuICB9KTtcblxuICBsZXQgc3RhY2sgPSAwO1xuICBjb25zdCBnZXRSZWFkZXJMaW5lcyA9ICh0eXBlOiBSb3NNc2dEZWZpbml0aW9uIHwgTmFtZWRSb3NNc2dEZWZpbml0aW9uLCBmaWVsZE5hbWUgPSBcInJlY29yZFwiKSA9PiB7XG4gICAgbGV0IHJlYWRlckxpbmVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIHR5cGUuZGVmaW5pdGlvbnMuZm9yRWFjaCgoZGVmKSA9PiB7XG4gICAgICBpZiAoZGVmLmlzQ29uc3RhbnQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGRlZi5pc0FycmF5KSB7XG4gICAgICAgIGlmIChkZWYudHlwZSA9PT0gXCJ1aW50OFwiIHx8IGRlZi50eXBlID09PSBcImludDhcIikge1xuICAgICAgICAgIGNvbnN0IGFycmF5VHlwZSA9IGRlZi50eXBlID09PSBcInVpbnQ4XCIgPyBcIlVpbnQ4QXJyYXlcIiA6IFwiSW50OEFycmF5XCI7XG4gICAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHtmaWVsZE5hbWV9LiR7ZGVmLm5hbWV9ID0gcmVhZGVyLnR5cGVkQXJyYXkoJHtTdHJpbmcoZGVmLmFycmF5TGVuZ3RoKX0sICR7YXJyYXlUeXBlfSk7YCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIC8vIGJlY2F1c2Ugd2UgbWlnaHQgaGF2ZSBuZXN0ZWQgYXJyYXlzXG4gICAgICAgIC8vIHdlIG5lZWQgdG8gaW5jcmVtZW50YWxseSBudW1iZXIgdmFyYWlibGVzIHNvIHRoZXkgYXJlbid0XG4gICAgICAgIC8vIHN0b21wZWQgb24gYnkgb3RoZXIgdmFyaWFibGVzIGluIHRoZSBmdW5jdGlvblxuICAgICAgICBzdGFjaysrO1xuXG4gICAgICAgIC8vIG5hbWUgZm9yIHRoZSBsZW5ndGggZmllbGQgaW4gdGhlIGZvci1sb29wXG4gICAgICAgIGNvbnN0IGxlbkZpZWxkID0gYGxlbmd0aF8ke3N0YWNrfWA7XG4gICAgICAgIC8vIG5hbWUgZm9yIGEgY2hpbGQgY29sbGVjdGlvblxuICAgICAgICBjb25zdCBjaGlsZE5hbWUgPSBgY3BseF8ke3N0YWNrfWA7XG4gICAgICAgIC8vIG5hbWUgdG8gdGhlIGl0dGVyYXRvciBpbiB0aGUgZm9yLWxvb3BcbiAgICAgICAgY29uc3QgaW5jTmFtZSA9IGAke2NoaWxkTmFtZX1faW5jXyR7c3RhY2t9YDtcblxuICAgICAgICAvLyBzZXQgYSB2YXJpYWJsZSBwb2ludGluZyB0byB0aGUgcGFyc2VkIGZpeGVkIGFycmF5IGxlbmd0aFxuICAgICAgICAvLyBvciByZWFkIHRoZSBieXRlIGluZGljYXRpbmcgdGhlIGR5bmFtaWMgbGVuZ3RoXG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goYHZhciAke2xlbkZpZWxkfSA9ICR7ZGVmLmFycmF5TGVuZ3RoID8gZGVmLmFycmF5TGVuZ3RoIDogXCJyZWFkZXIudWludDMyKCk7XCJ9YCk7XG5cbiAgICAgICAgLy8gb25seSBhbGxvY2F0ZSBhbiBhcnJheSBpZiB0aGVyZSBpcyBhIGxlbmd0aCAtIHNraXBzIGVtcHR5IGFsbG9jYXRpb25zXG4gICAgICAgIGNvbnN0IGFycmF5TmFtZSA9IGAke2ZpZWxkTmFtZX0uJHtkZWYubmFtZX1gO1xuXG4gICAgICAgIC8vIGFsbG9jYXRlIHRoZSBuZXcgYXJyYXkgdG8gYSBmaXhlZCBsZW5ndGggc2luY2Ugd2Uga25vdyBpdCBhaGVhZCBvZiB0aW1lXG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goYCR7YXJyYXlOYW1lfSA9IG5ldyBBcnJheSgke2xlbkZpZWxkfSlgKTtcbiAgICAgICAgLy8gc3RhcnQgdGhlIGZvci1sb29wXG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goYGZvciAodmFyICR7aW5jTmFtZX0gPSAwOyAke2luY05hbWV9IDwgJHtsZW5GaWVsZH07ICR7aW5jTmFtZX0rKykge2ApO1xuICAgICAgICAvLyBpZiB0aGUgc3ViIHR5cGUgaXMgY29tcGxleCB3ZSBuZWVkIHRvIGFsbG9jYXRlIGl0IGFuZCBwYXJzZSBpdHMgdmFsdWVzXG4gICAgICAgIGlmIChkZWYuaXNDb21wbGV4KSB7XG4gICAgICAgICAgY29uc3QgZGVmVHlwZSA9IGZpbmRUeXBlQnlOYW1lKHR5cGVzLCBkZWYudHlwZSk7XG4gICAgICAgICAgcmVhZGVyTGluZXMucHVzaChgdmFyICR7Y2hpbGROYW1lfSA9IG5ldyBSZWNvcmQuJHtmcmllbmRseU5hbWUoZGVmVHlwZS5uYW1lKX0oKTtgKTtcbiAgICAgICAgICAvLyByZWN1cnNpdmVseSBnZW5lcmF0ZSB0aGUgcGFyc2UgaW5zdHJ1Y3Rpb25zIGZvciB0aGUgc3ViLXR5cGVcbiAgICAgICAgICByZWFkZXJMaW5lcyA9IHJlYWRlckxpbmVzLmNvbmNhdChnZXRSZWFkZXJMaW5lcyhkZWZUeXBlLCBgJHtjaGlsZE5hbWV9YCkpO1xuICAgICAgICAgIHJlYWRlckxpbmVzLnB1c2goYCR7YXJyYXlOYW1lfVske2luY05hbWV9XSA9ICR7Y2hpbGROYW1lfWApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIC8vIGlmIHRoZSBzdWJ0eXBlIGlzIG5vdCBjb21wbGV4IGl0cyBhIHNpbXBsZSBsb3ctbGV2ZWwgcmVhZGVyIG9wZXJhdGlvblxuICAgICAgICAgIHJlYWRlckxpbmVzLnB1c2goYCR7YXJyYXlOYW1lfVske2luY05hbWV9XSA9IHJlYWRlci4ke2RlZi50eXBlfSgpO2ApO1xuICAgICAgICB9XG4gICAgICAgIHJlYWRlckxpbmVzLnB1c2goXCJ9XCIpOyAvLyBjbG9zZSB0aGUgZm9yLWxvb3BcbiAgICAgIH0gZWxzZSBpZiAoZGVmLmlzQ29tcGxleCkge1xuICAgICAgICBjb25zdCBkZWZUeXBlID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZi50eXBlKTtcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHtmaWVsZE5hbWV9LiR7ZGVmLm5hbWV9ID0gbmV3IFJlY29yZC4ke2ZyaWVuZGx5TmFtZShkZWZUeXBlLm5hbWUpfSgpO2ApO1xuICAgICAgICByZWFkZXJMaW5lcyA9IHJlYWRlckxpbmVzLmNvbmNhdChnZXRSZWFkZXJMaW5lcyhkZWZUeXBlLCBgJHtmaWVsZE5hbWV9LiR7ZGVmLm5hbWV9YCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmVhZGVyTGluZXMucHVzaChgJHtmaWVsZE5hbWV9LiR7ZGVmLm5hbWV9ID0gcmVhZGVyLiR7ZGVmLnR5cGV9KCk7YCk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIHJlYWRlckxpbmVzO1xuICB9O1xuXG4gIGNvbnN0IGxpbmVzID0gZ2V0UmVhZGVyTGluZXModW5uYW1lZFR5cGUpLmpvaW4oXCJcXG5cIik7XG4gIGNvbnN0IHJlYWRlckZuID0gYFxuICByZXR1cm4gZnVuY3Rpb24gcmVhZChyZWFkZXIpIHtcbiAgICB2YXIgcmVjb3JkID0gbmV3IFJlY29yZCgpO1xuICAgICR7bGluZXN9XG4gICAgcmV0dXJuIHJlY29yZDtcbiAgfTtgO1xuXG4gIGpzICs9IHJlYWRlckZuO1xuXG4gIGxldCBfcmVhZDogKHJlYWRlcjogU3RhbmRhcmRUeXBlUmVhZGVyKSA9PiBhbnk7XG4gIHRyeSB7XG4gICAgX3JlYWQgPSBldmFsKGAoZnVuY3Rpb24gYnVpbGRSZWFkZXIoKSB7ICR7anN9IH0pKClgKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUuZXJyb3IoXCJlcnJvciBidWlsZGluZyBwYXJzZXI6XCIsIGpzKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuICAgIHRocm93IGU7XG4gIH1cblxuICByZXR1cm4gZnVuY3Rpb24oYnVmZmVyOiBCdWZmZXIpIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgU3RhbmRhcmRUeXBlUmVhZGVyKGJ1ZmZlcik7XG4gICAgcmV0dXJuIF9yZWFkKHJlYWRlcik7XG4gIH07XG59O1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZVJlYWRlciB7XG4gIHJlYWRlcjogKGJ1ZmZlcjogQnVmZmVyKSA9PiBhbnk7XG5cbiAgLy8gdGFrZXMgYSBtdWx0aS1saW5lIHN0cmluZyBtZXNzYWdlIGRlZmluaXRpb24gYW5kIHJldHVybnNcbiAgLy8gYSBtZXNzYWdlIHJlYWRlciB3aGljaCBjYW4gYmUgdXNlZCB0byByZWFkIG1lc3NhZ2VzIGJhc2VkXG4gIC8vIG9uIHRoZSBtZXNzYWdlIGRlZmluaXRpb25cbiAgY29uc3RydWN0b3IobWVzc2FnZURlZmluaXRpb246IHN0cmluZykge1xuICAgIGNvbnN0IGRlZmluaXRpb25zID0gcGFyc2VNZXNzYWdlRGVmaW5pdGlvbihtZXNzYWdlRGVmaW5pdGlvbik7XG4gICAgdGhpcy5yZWFkZXIgPSBjcmVhdGVQYXJzZXIoZGVmaW5pdGlvbnMpO1xuICB9XG5cbiAgcmVhZE1lc3NhZ2UoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICByZXR1cm4gdGhpcy5yZWFkZXIoYnVmZmVyKTtcbiAgfVxufVxuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IHR5cGUgeyBUaW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuLy8gcmVwcmVzZW50cyBhIHJlc3VsdCBwYXNzZWQgdG8gdGhlIGNhbGxiYWNrIGZyb20gdGhlIGhpZ2gtbGV2ZWwgY2FsbDpcbi8vIGJhZy5yZWFkTWVzc2FnZXMoeyBvcHRzOiBhbnkgfSwgY2FsbGJhY2s6IChSZWFkUmVzdWx0KSA9PiB2b2lkKSA9PiBQcm9taXNlPHZvaWQ+XG5leHBvcnQgZGVmYXVsdCBjbGFzcyBSZWFkUmVzdWx0PFQ+IHtcbiAgdG9waWM6IHN0cmluZztcbiAgbWVzc2FnZTogVDtcbiAgdGltZXN0YW1wOiBUaW1lO1xuICBkYXRhOiBCdWZmZXI7XG4gIGNodW5rT2Zmc2V0OiBudW1iZXI7XG4gIHRvdGFsQ2h1bmtzOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IodG9waWM6IHN0cmluZywgbWVzc2FnZTogVCwgdGltZXN0YW1wOiBUaW1lLCBkYXRhOiBCdWZmZXIsIGNodW5rT2Zmc2V0OiBudW1iZXIsIHRvdGFsQ2h1bmtzOiBudW1iZXIpIHtcbiAgICAvLyBzdHJpbmc6IHRoZSB0b3BpYyB0aGUgbWVzc2FnZSB3YXMgb25cbiAgICB0aGlzLnRvcGljID0gdG9waWM7XG5cbiAgICAvLyBhbnk6IHRoZSBwYXJzZWQgYm9keSBvZiB0aGUgbWVzc2FnZSBiYXNlZCBvbiBjb25uZWN0aW9uLm1lc3NhZ2VEZWZpbml0aW9uXG4gICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcblxuICAgIC8vIHRpbWU6IHRoZSB0aW1lc3RhbXAgb2YgdGhlIG1lc3NhZ2VcbiAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcblxuICAgIC8vIGJ1ZmZlcjogcmF3IGJ1ZmZlciBkYXRhIG9mIHRoZSBtZXNzYWdlXG4gICAgdGhpcy5kYXRhID0gZGF0YTtcblxuICAgIC8vIHRoZSBvZmZzZXQgb2YgdGhlIGN1cnJlbnRseSByZWFkIGNodW5rXG4gICAgdGhpcy5jaHVua09mZnNldCA9IGNodW5rT2Zmc2V0O1xuXG4gICAgLy8gdGhlIHRvdGFsIG51bWJlciBvZiBjaHVua3MgaW4gdGhlIHJlYWQgb3BlcmF0aW9uXG4gICAgdGhpcy50b3RhbENodW5rcyA9IHRvdGFsQ2h1bmtzO1xuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgR00gQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gZnJvbURhdGUoZGF0ZTogRGF0ZSkge1xuICBjb25zdCBzZWMgPSBNYXRoLmZsb29yKGRhdGUuZ2V0VGltZSgpIC8gMTAwMCk7XG4gIGNvbnN0IG5zZWMgPSBkYXRlLmdldE1pbGxpc2Vjb25kcygpICogMWU2O1xuICByZXR1cm4geyBzZWMsIG5zZWMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHRvRGF0ZSh0aW1lOiBUaW1lKSB7XG4gIHJldHVybiBuZXcgRGF0ZSh0aW1lLnNlYyAqIDFlMyArIHRpbWUubnNlYyAvIDFlNik7XG59XG5cbi8vIGNvbXBhcmUgdHdvIHRpbWVzLCByZXR1cm5pbmcgYSBuZWdhdGl2ZSB2YWx1ZSBpZiB0aGUgcmlnaHQgaXMgZ3JlYXRlclxuLy8gb3IgYSBwb3NpdGl2ZSB2YWx1ZSBpZiB0aGUgbGVmdCBpcyBncmVhdGVyIG9yIDAgaWYgdGhlIHRpbWVzIGFyZSBlcXVhbFxuLy8gdXNlZnVsIHRvIHN1cHBseSB0byBBcnJheS5wcm90b3R5cGUuc29ydFxuZXhwb3J0IGZ1bmN0aW9uIGNvbXBhcmUobGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgY29uc3Qgc2VjRGlmZiA9IGxlZnQuc2VjIC0gcmlnaHQuc2VjO1xuICByZXR1cm4gc2VjRGlmZiB8fCBsZWZ0Lm5zZWMgLSByaWdodC5uc2VjO1xufVxuXG4vLyByZXR1cm5zIHRydWUgaWYgdGhlIGxlZnQgdGltZSBpcyBsZXNzIHRoYW4gdGhlIHJpZ2h0IHRpbWUsIG90aGVyd2lzZSBmYWxzZVxuZXhwb3J0IGZ1bmN0aW9uIGlzTGVzc1RoYW4obGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgcmV0dXJuIHRoaXMuY29tcGFyZShsZWZ0LCByaWdodCkgPCAwO1xufVxuXG4vLyByZXR1cm5zIHRydWUgaWYgdGhlIGxlZnQgdGltZSBpcyBncmVhdGVyIHRoYW4gdGhlIHJpZ2h0IHRpbWUsIG90aGVyd2lzZSBmYWxzZVxuZXhwb3J0IGZ1bmN0aW9uIGlzR3JlYXRlclRoYW4obGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgcmV0dXJuIHRoaXMuY29tcGFyZShsZWZ0LCByaWdodCkgPiAwO1xufVxuXG4vLyByZXR1cm5zIHRydWUgaWYgYm90aCB0aW1lcyBoYXZlIHRoZSBzYW1lIG51bWJlciBvZiBzZWNvbmRzIGFuZCBuYW5vc2Vjb25kc1xuZXhwb3J0IGZ1bmN0aW9uIGFyZVNhbWUobGVmdDogVGltZSwgcmlnaHQ6IFRpbWUpIHtcbiAgcmV0dXJuIGxlZnQuc2VjID09PSByaWdodC5zZWMgJiYgbGVmdC5uc2VjID09PSByaWdodC5uc2VjO1xufVxuXG5mdW5jdGlvbiB0b1N0cmluZyh0aW1lOiBUaW1lKSB7XG4gIHJldHVybiBgeyR7dGltZS5zZWN9LCAke3RpbWUubnNlY319YDtcbn1cblxuLy8gY29tcHV0ZXMgdGhlIHN1bSBvZiB0d28gdGltZXMgb3IgZHVyYXRpb25zIGFuZCByZXR1cm5zIGEgbmV3IHRpbWVcbi8vIHRocm93cyBhbiBleGNlcHRpb24gaWYgdGhlIHJlc3VsdGluZyB0aW1lIGlzIG5lZ2F0aXZlXG5leHBvcnQgZnVuY3Rpb24gYWRkKGxlZnQ6IFRpbWUsIHJpZ2h0OiBUaW1lKSB7XG4gIGNvbnN0IGR1cmF0aW9uTmFub3MgPSBsZWZ0Lm5zZWMgKyByaWdodC5uc2VjO1xuICBjb25zdCBzZWNzRnJvbU5hbm9zID0gTWF0aC5mbG9vcihkdXJhdGlvbk5hbm9zIC8gMWU5KTtcbiAgY29uc3QgbmV3U2VjcyA9IGxlZnQuc2VjICsgcmlnaHQuc2VjICsgc2Vjc0Zyb21OYW5vcztcbiAgY29uc3QgcmVtYWluaW5nRHVyYXRpb25OYW5vcyA9IGR1cmF0aW9uTmFub3MgJSAxZTk7XG4gIC8vIHVzZSBNYXRoLmFicyBoZXJlIHRvIHByZXZlbnQgLTAgd2hlbiB0aGVyZSBpcyBleGFjdGx5IDEgc2Vjb25kIG9mIG5lZ2F0aXZlIG5hbm9zZWNvbmRzIHBhc3NlZCBpblxuICBjb25zdCBuZXdOYW5vcyA9IE1hdGguYWJzKFxuICAgIE1hdGguc2lnbihyZW1haW5pbmdEdXJhdGlvbk5hbm9zKSA9PT0gLTEgPyAxZTkgKyByZW1haW5pbmdEdXJhdGlvbk5hbm9zIDogcmVtYWluaW5nRHVyYXRpb25OYW5vc1xuICApO1xuICBjb25zdCByZXN1bHQgPSB7IHNlYzogbmV3U2VjcywgbnNlYzogbmV3TmFub3MgfTtcbiAgaWYgKHJlc3VsdC5zZWMgPCAwIHx8IHJlc3VsdC5uc2VjIDwgMCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBJbnZhbGlkIHRpbWU6ICR7dG9TdHJpbmcocmVzdWx0KX0gcHJvZHVjZWQgZnJvbSBUaW1lVXRpbC5hZGQoJHt0b1N0cmluZyhsZWZ0KX0sICR7dG9TdHJpbmcocmlnaHQpfX0pYFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCBCYWdSZWFkZXIsIHsgdHlwZSBEZWNvbXByZXNzIH0gZnJvbSBcIi4vQmFnUmVhZGVyXCI7XG5pbXBvcnQgeyBNZXNzYWdlUmVhZGVyIH0gZnJvbSBcIi4vTWVzc2FnZVJlYWRlclwiO1xuaW1wb3J0IFJlYWRSZXN1bHQgZnJvbSBcIi4vUmVhZFJlc3VsdFwiO1xuaW1wb3J0IHsgQmFnSGVhZGVyLCBDaHVua0luZm8sIENvbm5lY3Rpb24sIE1lc3NhZ2VEYXRhIH0gZnJvbSBcIi4vcmVjb3JkXCI7XG5pbXBvcnQgdHlwZSB7IFRpbWUgfSBmcm9tIFwiLi90eXBlc1wiO1xuaW1wb3J0ICogYXMgVGltZVV0aWwgZnJvbSBcIi4vVGltZVV0aWxcIjtcblxuZXhwb3J0IHR5cGUgUmVhZE9wdGlvbnMgPSB7fFxuICBkZWNvbXByZXNzPzogRGVjb21wcmVzcyxcbiAgbm9QYXJzZT86IGJvb2xlYW4sXG4gIHRvcGljcz86IHN0cmluZ1tdLFxuICBzdGFydFRpbWU/OiBUaW1lLFxuICBlbmRUaW1lPzogVGltZSxcbnx9O1xuXG4vLyB0aGUgaGlnaCBsZXZlbCByb3NiYWcgaW50ZXJmYWNlXG4vLyBjcmVhdGUgYSBuZXcgYmFnIGJ5IGNhbGxpbmc6XG4vLyBgY29uc3QgYmFnID0gYXdhaXQgQmFnLm9wZW4oJy4vcGF0aC10by1maWxlLmJhZycpYCBpbiBub2RlIG9yXG4vLyBgY29uc3QgYmFnID0gYXdhaXQgQmFnLm9wZW4oZmlsZXNbMF0pYCBpbiB0aGUgYnJvd3NlclxuLy9cbi8vIGFmdGVyIHRoYXQgeW91IGNhbiBjb25zdW1lIG1lc3NhZ2VzIGJ5IGNhbGxpbmdcbi8vIGBhd2FpdCBiYWcucmVhZE1lc3NhZ2VzKHsgdG9waWNzOiBbJy9mb28nXSB9LFxuLy8gICAgKHJlc3VsdCkgPT4gY29uc29sZS5sb2cocmVzdWx0LnRvcGljLCByZXN1bHQubWVzc2FnZSkpYFxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQmFnIHtcbiAgcmVhZGVyOiBCYWdSZWFkZXI7XG4gIGhlYWRlcjogQmFnSGVhZGVyO1xuICBjb25uZWN0aW9uczogeyBbY29ubjogbnVtYmVyXTogQ29ubmVjdGlvbiB9O1xuICBjaHVua0luZm9zOiBDaHVua0luZm9bXTtcbiAgc3RhcnRUaW1lOiA/VGltZTtcbiAgZW5kVGltZTogP1RpbWU7XG5cbiAgLy8geW91IGNhbiBvcHRpb25hbGx5IGNyZWF0ZSBhIGJhZyBtYW51YWxseSBwYXNzaW5nIGluIGEgYmFnUmVhZGVyIGluc3RhbmNlXG4gIGNvbnN0cnVjdG9yKGJhZ1JlYWRlcjogQmFnUmVhZGVyKSB7XG4gICAgdGhpcy5yZWFkZXIgPSBiYWdSZWFkZXI7XG4gIH1cblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW51c2VkLXZhcnNcbiAgc3RhdGljIG9wZW4gPSAoZmlsZTogRmlsZSB8IHN0cmluZykgPT4ge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIFwiVGhpcyBtZXRob2Qgc2hvdWxkIGhhdmUgYmVlbiBvdmVycmlkZGVuIGJhc2VkIG9uIHRoZSBlbnZpcm9ubWVudC4gTWFrZSBzdXJlIHlvdSBhcmUgY29ycmVjdGx5IGltcG9ydGluZyB0aGUgbm9kZSBvciB3ZWIgdmVyc2lvbiBvZiBCYWcuXCJcbiAgICApO1xuICB9O1xuXG4gIC8vIGlmIHRoZSBiYWcgaXMgbWFudWFsbHkgY3JlYXRlZCB3aXRoIHRoZSBjb25zdHJ1Y3RvciwgeW91IG11c3QgY2FsbCBgYXdhaXQgb3BlbigpYCBvbiB0aGUgYmFnXG4gIC8vIGdlbmVyYWxseSB0aGlzIGlzIGNhbGxlZCBmb3IgeW91IGlmIHlvdSdyZSB1c2luZyBgY29uc3QgYmFnID0gYXdhaXQgQmFnLm9wZW4oKWBcbiAgYXN5bmMgb3BlbigpIHtcbiAgICB0aGlzLmhlYWRlciA9IGF3YWl0IHRoaXMucmVhZGVyLnJlYWRIZWFkZXJBc3luYygpO1xuICAgIGNvbnN0IHsgY29ubmVjdGlvbkNvdW50LCBjaHVua0NvdW50LCBpbmRleFBvc2l0aW9uIH0gPSB0aGlzLmhlYWRlcjtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucmVhZGVyLnJlYWRDb25uZWN0aW9uc0FuZENodW5rSW5mb0FzeW5jKGluZGV4UG9zaXRpb24sIGNvbm5lY3Rpb25Db3VudCwgY2h1bmtDb3VudCk7XG5cbiAgICB0aGlzLmNvbm5lY3Rpb25zID0ge307XG5cbiAgICByZXN1bHQuY29ubmVjdGlvbnMuZm9yRWFjaCgoY29ubmVjdGlvbikgPT4ge1xuICAgICAgdGhpcy5jb25uZWN0aW9uc1tjb25uZWN0aW9uLmNvbm5dID0gY29ubmVjdGlvbjtcbiAgICB9KTtcblxuICAgIHRoaXMuY2h1bmtJbmZvcyA9IHJlc3VsdC5jaHVua0luZm9zO1xuXG4gICAgaWYgKGNodW5rQ291bnQgPiAwKSB7XG4gICAgICB0aGlzLnN0YXJ0VGltZSA9IHRoaXMuY2h1bmtJbmZvc1swXS5zdGFydFRpbWU7XG4gICAgICB0aGlzLmVuZFRpbWUgPSB0aGlzLmNodW5rSW5mb3NbY2h1bmtDb3VudCAtIDFdLmVuZFRpbWU7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVhZE1lc3NhZ2VzKG9wdHM6IFJlYWRPcHRpb25zLCBjYWxsYmFjazogKG1zZzogUmVhZFJlc3VsdDxhbnk+KSA9PiB2b2lkKSB7XG4gICAgY29uc3QgY29ubmVjdGlvbnMgPSB0aGlzLmNvbm5lY3Rpb25zO1xuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gb3B0cy5zdGFydFRpbWUgfHwgeyBzZWM6IDAsIG5zZWM6IDAgfTtcbiAgICBjb25zdCBlbmRUaW1lID0gb3B0cy5lbmRUaW1lIHx8IHsgc2VjOiBOdW1iZXIuTUFYX1ZBTFVFLCBuc2VjOiBOdW1iZXIuTUFYX1ZBTFVFIH07XG4gICAgY29uc3QgdG9waWNzID1cbiAgICAgIG9wdHMudG9waWNzIHx8XG4gICAgICBPYmplY3Qua2V5cyhjb25uZWN0aW9ucykubWFwKChpZDogYW55KSA9PiB7XG4gICAgICAgIHJldHVybiBjb25uZWN0aW9uc1tpZF0udG9waWM7XG4gICAgICB9KTtcblxuICAgIGNvbnN0IGZpbHRlcmVkQ29ubmVjdGlvbnMgPSBPYmplY3Qua2V5cyhjb25uZWN0aW9ucylcbiAgICAgIC5maWx0ZXIoKGlkOiBhbnkpID0+IHtcbiAgICAgICAgcmV0dXJuIHRvcGljcy5pbmRleE9mKGNvbm5lY3Rpb25zW2lkXS50b3BpYykgIT09IC0xO1xuICAgICAgfSlcbiAgICAgIC5tYXAoKGlkKSA9PiAraWQpO1xuXG4gICAgY29uc3QgeyBkZWNvbXByZXNzID0ge30gfSA9IG9wdHM7XG5cbiAgICAvLyBmaWx0ZXIgY2h1bmtzIHRvIHRob3NlIHdoaWNoIGZhbGwgd2l0aGluIHRoZSB0aW1lIHJhbmdlIHdlJ3JlIGF0dGVtcHRpbmcgdG8gcmVhZFxuICAgIGNvbnN0IGNodW5rSW5mb3MgPSB0aGlzLmNodW5rSW5mb3MuZmlsdGVyKChpbmZvKSA9PiB7XG4gICAgICByZXR1cm4gVGltZVV0aWwuY29tcGFyZShpbmZvLnN0YXJ0VGltZSwgZW5kVGltZSkgPD0gMCAmJiBUaW1lVXRpbC5jb21wYXJlKHN0YXJ0VGltZSwgaW5mby5lbmRUaW1lKSA8PSAwO1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gcGFyc2VNc2cobXNnOiBNZXNzYWdlRGF0YSwgY2h1bmtPZmZzZXQ6IG51bWJlcik6IFJlYWRSZXN1bHQ8YW55PiB7XG4gICAgICBjb25zdCBjb25uZWN0aW9uID0gY29ubmVjdGlvbnNbbXNnLmNvbm5dO1xuICAgICAgY29uc3QgeyB0b3BpYyB9ID0gY29ubmVjdGlvbjtcbiAgICAgIGNvbnN0IHsgZGF0YSwgdGltZTogdGltZXN0YW1wIH0gPSBtc2c7XG4gICAgICBsZXQgbWVzc2FnZSA9IG51bGw7XG4gICAgICBpZiAoIW9wdHMubm9QYXJzZSkge1xuICAgICAgICAvLyBsYXppbHkgY3JlYXRlIGEgcmVhZGVyIGZvciB0aGlzIGNvbm5lY3Rpb24gaWYgaXQgZG9lc24ndCBleGlzdFxuICAgICAgICBjb25uZWN0aW9uLnJlYWRlciA9IGNvbm5lY3Rpb24ucmVhZGVyIHx8IG5ldyBNZXNzYWdlUmVhZGVyKGNvbm5lY3Rpb24ubWVzc2FnZURlZmluaXRpb24pO1xuICAgICAgICBtZXNzYWdlID0gY29ubmVjdGlvbi5yZWFkZXIucmVhZE1lc3NhZ2UoZGF0YSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IFJlYWRSZXN1bHQodG9waWMsIG1lc3NhZ2UsIHRpbWVzdGFtcCwgZGF0YSwgY2h1bmtPZmZzZXQsIGNodW5rSW5mb3MubGVuZ3RoKTtcbiAgICB9XG5cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNodW5rSW5mb3MubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGluZm8gPSBjaHVua0luZm9zW2ldO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCB0aGlzLnJlYWRlci5yZWFkQ2h1bmtNZXNzYWdlc0FzeW5jKFxuICAgICAgICBpbmZvLFxuICAgICAgICBmaWx0ZXJlZENvbm5lY3Rpb25zLFxuICAgICAgICBzdGFydFRpbWUsXG4gICAgICAgIGVuZFRpbWUsXG4gICAgICAgIGRlY29tcHJlc3NcbiAgICAgICk7XG4gICAgICBtZXNzYWdlcy5mb3JFYWNoKChtc2cpID0+IGNhbGxiYWNrKHBhcnNlTXNnKG1zZywgaSkpKTtcbiAgICB9XG4gIH1cbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB0eXBlIHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5cbi8vIHJlYWRzIHRocm91Z2ggYSBidWZmZXIgYW5kIGV4dHJhY3RzIHsgW2tleTogc3RyaW5nXTogdmFsdWU6IHN0cmluZyB9XG4vLyBwYWlycyAtIHRoZSBidWZmZXIgaXMgZXhwZWN0ZWQgdG8gaGF2ZSBsZW5ndGggcHJlZml4ZWQgdXRmOCBzdHJpbmdzXG4vLyB3aXRoIGEgJz0nIHNlcGFyYXRpbmcgdGhlIGtleSBhbmQgdmFsdWVcbmV4cG9ydCBmdW5jdGlvbiBleHRyYWN0RmllbGRzKGJ1ZmZlcjogQnVmZmVyKSB7XG4gIGlmIChidWZmZXIubGVuZ3RoIDwgNCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlciBmaWVsZHMgYXJlIHRydW5jYXRlZC5cIik7XG4gIH1cblxuICBsZXQgaSA9IDA7XG4gIGNvbnN0IGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSA9IHt9O1xuXG4gIHdoaWxlIChpIDwgYnVmZmVyLmxlbmd0aCkge1xuICAgIGNvbnN0IGxlbmd0aCA9IGJ1ZmZlci5yZWFkSW50MzJMRShpKTtcbiAgICBpICs9IDQ7XG5cbiAgICBpZiAoaSArIGxlbmd0aCA+IGJ1ZmZlci5sZW5ndGgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkhlYWRlciBmaWVsZHMgYXJlIGNvcnJ1cHQuXCIpO1xuICAgIH1cblxuICAgIGNvbnN0IGZpZWxkID0gYnVmZmVyLnNsaWNlKGksIGkgKyBsZW5ndGgpO1xuICAgIGNvbnN0IGluZGV4ID0gZmllbGQuaW5kZXhPZihcIj1cIik7XG4gICAgaWYgKGluZGV4ID09PSAtMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGZpZWxkIGlzIG1pc3NpbmcgZXF1YWxzIHNpZ24uXCIpO1xuICAgIH1cblxuICAgIGZpZWxkc1tmaWVsZC5zbGljZSgwLCBpbmRleCkudG9TdHJpbmcoKV0gPSBmaWVsZC5zbGljZShpbmRleCArIDEpO1xuICAgIGkgKz0gbGVuZ3RoO1xuICB9XG5cbiAgcmV0dXJuIGZpZWxkcztcbn1cblxuLy8gcmVhZHMgYSBUaW1lIG9iamVjdCBvdXQgb2YgYSBidWZmZXIgYXQgdGhlIGdpdmVuIG9mZnNldFxuZXhwb3J0IGZ1bmN0aW9uIGV4dHJhY3RUaW1lKGJ1ZmZlcjogQnVmZmVyLCBvZmZzZXQ6IG51bWJlcik6IFRpbWUge1xuICBjb25zdCBzZWMgPSBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldCk7XG4gIGNvbnN0IG5zZWMgPSBidWZmZXIucmVhZFVJbnQzMkxFKG9mZnNldCArIDQpO1xuICByZXR1cm4geyBzZWMsIG5zZWMgfTtcbn1cbiIsIi8vIENvcHlyaWdodCAoYykgMjAxOC1wcmVzZW50LCBHTSBDcnVpc2UgTExDXG5cbi8vIFRoaXMgc291cmNlIGNvZGUgaXMgbGljZW5zZWQgdW5kZXIgdGhlIEFwYWNoZSBMaWNlbnNlLCBWZXJzaW9uIDIuMCxcbi8vIGZvdW5kIGluIHRoZSBMSUNFTlNFIGZpbGUgaW4gdGhlIHJvb3QgZGlyZWN0b3J5IG9mIHRoaXMgc291cmNlIHRyZWUuXG4vLyBZb3UgbWF5IG5vdCB1c2UgdGhpcyBmaWxlIGV4Y2VwdCBpbiBjb21wbGlhbmNlIHdpdGggdGhlIExpY2Vuc2UuXG5cbi8vIEBmbG93XG5cbmltcG9ydCB7IGV4dHJhY3RGaWVsZHMgfSBmcm9tIFwiLi9maWVsZHNcIjtcbmltcG9ydCB7IFJlY29yZCB9IGZyb20gXCIuL3JlY29yZFwiO1xuXG4vLyBnaXZlbiBhIGJ1ZmZlciBwYXJzZXMgb3V0IHRoZSByZWNvcmQgd2l0aGluIHRoZSBidWZmZXJcbi8vIGJhc2VkIG9uIHRoZSBvcGNvZGUgdHlwZSBiaXRcbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUhlYWRlcjxUOiBSZWNvcmQ+KGJ1ZmZlcjogQnVmZmVyLCBjbHM6IENsYXNzPFQ+ICYgeyBvcGNvZGU6IG51bWJlciB9KTogVCB7XG4gIGNvbnN0IGZpZWxkcyA9IGV4dHJhY3RGaWVsZHMoYnVmZmVyKTtcbiAgaWYgKGZpZWxkcy5vcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiSGVhZGVyIGlzIG1pc3NpbmcgJ29wJyBmaWVsZC5cIik7XG4gIH1cbiAgY29uc3Qgb3Bjb2RlID0gZmllbGRzLm9wLnJlYWRVSW50OCgwKTtcbiAgaWYgKG9wY29kZSAhPT0gY2xzLm9wY29kZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihgRXhwZWN0ZWQgJHtjbHMubmFtZX0gKCR7Y2xzLm9wY29kZX0pIGJ1dCBmb3VuZCAke29wY29kZX1gKTtcbiAgfVxuXG4gIHJldHVybiBuZXcgY2xzKGZpZWxkcyk7XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgR00gQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgKiBhcyBUaW1lVXRpbCBmcm9tIFwiLi9UaW1lVXRpbFwiO1xuXG5leHBvcnQgKiBmcm9tIFwiLi9iYWdcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0JhZ1JlYWRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vTWVzc2FnZVJlYWRlclwiO1xuZXhwb3J0ICogZnJvbSBcIi4vcGFyc2VNZXNzYWdlRGVmaW5pdGlvblwiO1xuZXhwb3J0IHsgVGltZSB9IGZyb20gXCIuL3R5cGVzXCI7XG5leHBvcnQgeyBUaW1lVXRpbCB9O1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuaW1wb3J0IEhlYXAgZnJvbSBcImhlYXBcIjtcblxuZnVuY3Rpb24gbm1lcmdlPFQ+KGtleTogKGE6IFQsIGI6IFQpID0+IG51bWJlciwgLi4uaXRlcmFibGVzOiBBcnJheTxJdGVyYXRvcjxUPj4pIHtcbiAgY29uc3QgaGVhcDogSGVhcDx7IGk6IG51bWJlciwgdmFsdWU6IFQgfT4gPSBuZXcgSGVhcCgoYSwgYikgPT4ge1xuICAgIHJldHVybiBrZXkoYS52YWx1ZSwgYi52YWx1ZSk7XG4gIH0pO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZXJhYmxlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IHsgdmFsdWUsIGRvbmUgfSA9IGl0ZXJhYmxlc1tpXS5uZXh0KCk7XG4gICAgaWYgKCFkb25lKSB7XG4gICAgICBoZWFwLnB1c2goeyBpLCB2YWx1ZSB9KTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5leHQ6ICgpID0+IHtcbiAgICAgIGlmIChoZWFwLmVtcHR5KCkpIHtcbiAgICAgICAgcmV0dXJuIHsgZG9uZTogdHJ1ZSB9O1xuICAgICAgfVxuICAgICAgY29uc3QgeyBpIH0gPSBoZWFwLmZyb250KCk7XG4gICAgICBjb25zdCBuZXh0ID0gaXRlcmFibGVzW2ldLm5leHQoKTtcbiAgICAgIGlmIChuZXh0LmRvbmUpIHtcbiAgICAgICAgcmV0dXJuIHsgdmFsdWU6IGhlYXAucG9wKCkudmFsdWUsIGRvbmU6IGZhbHNlIH07XG4gICAgICB9XG4gICAgICByZXR1cm4geyB2YWx1ZTogaGVhcC5yZXBsYWNlKHsgaSwgdmFsdWU6IG5leHQudmFsdWUgfSkudmFsdWUsIGRvbmU6IGZhbHNlIH07XG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgbm1lcmdlO1xuIiwiLy8gQ29weXJpZ2h0IChjKSAyMDE4LXByZXNlbnQsIEdNIENydWlzZSBMTENcblxuLy8gVGhpcyBzb3VyY2UgY29kZSBpcyBsaWNlbnNlZCB1bmRlciB0aGUgQXBhY2hlIExpY2Vuc2UsIFZlcnNpb24gMi4wLFxuLy8gZm91bmQgaW4gdGhlIExJQ0VOU0UgZmlsZSBpbiB0aGUgcm9vdCBkaXJlY3Rvcnkgb2YgdGhpcyBzb3VyY2UgdHJlZS5cbi8vIFlvdSBtYXkgbm90IHVzZSB0aGlzIGZpbGUgZXhjZXB0IGluIGNvbXBsaWFuY2Ugd2l0aCB0aGUgTGljZW5zZS5cblxuLy8gQGZsb3dcblxuLy8gU2V0IG9mIGJ1aWx0LWluIHJvcyB0eXBlcy4gU2VlIGh0dHA6Ly93aWtpLnJvcy5vcmcvbXNnI0ZpZWxkX1R5cGVzXG5leHBvcnQgY29uc3Qgcm9zUHJpbWl0aXZlVHlwZXM6IFNldDxzdHJpbmc+ID0gbmV3IFNldChbXG4gIFwic3RyaW5nXCIsXG4gIFwiYm9vbFwiLFxuICBcImludDhcIixcbiAgXCJ1aW50OFwiLFxuICBcImludDE2XCIsXG4gIFwidWludDE2XCIsXG4gIFwiaW50MzJcIixcbiAgXCJ1aW50MzJcIixcbiAgXCJmbG9hdDMyXCIsXG4gIFwiZmxvYXQ2NFwiLFxuICBcImludDY0XCIsXG4gIFwidWludDY0XCIsXG4gIFwidGltZVwiLFxuICBcImR1cmF0aW9uXCIsXG5dKTtcblxuZnVuY3Rpb24gbm9ybWFsaXplVHlwZSh0eXBlOiBzdHJpbmcpIHtcbiAgLy8gTm9ybWFsaXplIGRlcHJlY2F0ZWQgYWxpYXNlcy5cbiAgbGV0IG5vcm1hbGl6ZWRUeXBlID0gdHlwZTtcbiAgaWYgKHR5cGUgPT09IFwiY2hhclwiKSB7XG4gICAgbm9ybWFsaXplZFR5cGUgPSBcInVpbnQ4XCI7XG4gIH1cbiAgaWYgKHR5cGUgPT09IFwiYnl0ZVwiKSB7XG4gICAgbm9ybWFsaXplZFR5cGUgPSBcImludDhcIjtcbiAgfVxuICByZXR1cm4gbm9ybWFsaXplZFR5cGU7XG59XG5cbi8vIHJlcHJlc2VudHMgYSBzaW5nbGUgbGluZSBpbiBhIG1lc3NhZ2UgZGVmaW5pdGlvbiB0eXBlXG4vLyBlLmcuICdzdHJpbmcgbmFtZScgJ0N1c3RvbVR5cGVbXSBmb28nICdzdHJpbmdbM10gbmFtZXMnXG5mdW5jdGlvbiBuZXdBcnJheURlZmluaXRpb24odHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIGFycmF5TGVuZ3RoOiA/bnVtYmVyKTogUm9zTXNnRmllbGQge1xuICBjb25zdCBub3JtYWxpemVkVHlwZSA9IG5vcm1hbGl6ZVR5cGUodHlwZSk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogbm9ybWFsaXplZFR5cGUsXG4gICAgbmFtZSxcbiAgICBpc0FycmF5OiB0cnVlLFxuICAgIGFycmF5TGVuZ3RoOiBhcnJheUxlbmd0aCA9PT0gbnVsbCA/IHVuZGVmaW5lZCA6IGFycmF5TGVuZ3RoLFxuICAgIGlzQ29tcGxleDogIXJvc1ByaW1pdGl2ZVR5cGVzLmhhcyhub3JtYWxpemVkVHlwZSksXG4gIH07XG59XG5mdW5jdGlvbiBuZXdEZWZpbml0aW9uKHR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nKTogUm9zTXNnRmllbGQge1xuICBjb25zdCBub3JtYWxpemVkVHlwZSA9IG5vcm1hbGl6ZVR5cGUodHlwZSk7XG4gIHJldHVybiB7XG4gICAgdHlwZTogbm9ybWFsaXplZFR5cGUsXG4gICAgbmFtZSxcbiAgICBpc0FycmF5OiBmYWxzZSxcbiAgICBpc0NvbXBsZXg6ICFyb3NQcmltaXRpdmVUeXBlcy5oYXMobm9ybWFsaXplZFR5cGUpLFxuICB9O1xufVxuXG5leHBvcnQgdHlwZSBSb3NNc2dGaWVsZCA9XG4gIHwge3xcbiAgICAgIHR5cGU6IHN0cmluZyxcbiAgICAgIG5hbWU6IHN0cmluZyxcbiAgICAgIGlzQ29uc3RhbnQ/OiBib29sZWFuLFxuICAgICAgaXNDb21wbGV4PzogYm9vbGVhbixcbiAgICAgIHZhbHVlPzogbWl4ZWQsXG4gICAgICBpc0FycmF5PzogZmFsc2UsXG4gICAgICBhcnJheUxlbmd0aD86IHZvaWQsXG4gICAgfH1cbiAgfCB7fFxuICAgICAgdHlwZTogc3RyaW5nLFxuICAgICAgbmFtZTogc3RyaW5nLFxuICAgICAgaXNDb25zdGFudD86IGJvb2xlYW4sXG4gICAgICBpc0NvbXBsZXg/OiBib29sZWFuLFxuICAgICAgdmFsdWU/OiBtaXhlZCxcbiAgICAgIGlzQXJyYXk6IHRydWUsXG4gICAgICBhcnJheUxlbmd0aDogP251bWJlcixcbiAgICB8fTtcblxuZXhwb3J0IHR5cGUgUm9zTXNnRGVmaW5pdGlvbiA9IHt8XG4gIG5hbWU/OiBzdHJpbmcsXG4gIGRlZmluaXRpb25zOiBSb3NNc2dGaWVsZFtdLFxufH07XG5leHBvcnQgdHlwZSBOYW1lZFJvc01zZ0RlZmluaXRpb24gPSB7fFxuICBuYW1lOiBzdHJpbmcsXG4gIGRlZmluaXRpb25zOiBSb3NNc2dGaWVsZFtdLFxufH07XG5cbmNvbnN0IGJ1aWxkVHlwZSA9IChsaW5lczogc3RyaW5nW10pOiBSb3NNc2dEZWZpbml0aW9uID0+IHtcbiAgY29uc3QgZGVmaW5pdGlvbnM6IFJvc01zZ0ZpZWxkW10gPSBbXTtcbiAgbGV0IGNvbXBsZXhUeXBlTmFtZTogP3N0cmluZztcbiAgbGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgIC8vIHJlbW92ZSBjb21tZW50cyBhbmQgZXh0cmEgd2hpdGVzcGFjZSBmcm9tIGVhY2ggbGluZVxuICAgIGNvbnN0IHNwbGl0cyA9IGxpbmVcbiAgICAgIC5yZXBsYWNlKC8jLiovZ2ksIFwiXCIpXG4gICAgICAuc3BsaXQoXCIgXCIpXG4gICAgICAuZmlsdGVyKCh3b3JkKSA9PiB3b3JkKTtcbiAgICBpZiAoIXNwbGl0c1sxXSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICAvLyBjb25zdW1lIGNvbW1lbnRzXG4gICAgY29uc3QgdHlwZSA9IHNwbGl0c1swXS50cmltKCk7XG4gICAgY29uc3QgbmFtZSA9IHNwbGl0c1sxXS50cmltKCk7XG4gICAgaWYgKHR5cGUgPT09IFwiTVNHOlwiKSB7XG4gICAgICBjb21wbGV4VHlwZU5hbWUgPSBuYW1lO1xuICAgIH0gZWxzZSBpZiAobmFtZS5pbmRleE9mKFwiPVwiKSA+IC0xIHx8IHNwbGl0cy5pbmRleE9mKFwiPVwiKSA+IC0xKSB7XG4gICAgICAvLyBjb25zdGFudCB0eXBlIHBhcnNpbmdcbiAgICAgIGNvbnN0IG1hdGNoZXMgPSBsaW5lLm1hdGNoKC8oXFxTKylcXHMqPVxccyooLiopXFxzKi8pO1xuICAgICAgaWYgKCFtYXRjaGVzKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcIk1hbGZvcm1lZCBsaW5lOiBcIiArIGxpbmUpO1xuICAgICAgfVxuICAgICAgbGV0IHZhbHVlOiBhbnkgPSBtYXRjaGVzWzJdO1xuICAgICAgaWYgKHR5cGUgIT09IFwic3RyaW5nXCIpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2YWx1ZSA9IEpTT04ucGFyc2UodmFsdWUucmVwbGFjZSgvXFxzKiMuKi9nLCBcIlwiKSk7XG4gICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgICBjb25zb2xlLndhcm4oYEVycm9yIGluIHRoaXMgY29uc3RhbnQgZGVmaW5pdGlvbjogJHtsaW5lfWApO1xuICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICB9XG4gICAgICAgIGlmICh0eXBlID09PSBcImJvb2xcIikge1xuICAgICAgICAgIHZhbHVlID0gQm9vbGVhbih2YWx1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICgodHlwZS5pbmNsdWRlcyhcImludFwiKSAmJiB2YWx1ZSA+IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB8fCB2YWx1ZSA8IE51bWJlci5NSU5fU0FGRV9JTlRFR0VSKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1jb25zb2xlXG4gICAgICAgIGNvbnNvbGUud2FybihgRm91bmQgaW50ZWdlciBjb25zdGFudCBvdXRzaWRlIHNhZmUgaW50ZWdlciByYW5nZTogJHtsaW5lfWApO1xuICAgICAgfVxuICAgICAgZGVmaW5pdGlvbnMucHVzaCh7XG4gICAgICAgIHR5cGU6IG5vcm1hbGl6ZVR5cGUodHlwZSksXG4gICAgICAgIG5hbWU6IG1hdGNoZXNbMV0sXG4gICAgICAgIGlzQ29uc3RhbnQ6IHRydWUsXG4gICAgICAgIHZhbHVlLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmICh0eXBlLmluZGV4T2YoXCJdXCIpID09PSB0eXBlLmxlbmd0aCAtIDEpIHtcbiAgICAgIC8vIGFycmF5IHR5cGUgcGFyc2luZ1xuICAgICAgY29uc3QgdHlwZVNwbGl0cyA9IHR5cGUuc3BsaXQoXCJbXCIpO1xuICAgICAgY29uc3QgYmFzZVR5cGUgPSB0eXBlU3BsaXRzWzBdO1xuICAgICAgY29uc3QgbGVuID0gdHlwZVNwbGl0c1sxXS5yZXBsYWNlKFwiXVwiLCBcIlwiKTtcbiAgICAgIGRlZmluaXRpb25zLnB1c2gobmV3QXJyYXlEZWZpbml0aW9uKGJhc2VUeXBlLCBuYW1lLCBsZW4gPyBwYXJzZUludChsZW4sIDEwKSA6IHVuZGVmaW5lZCkpO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWZpbml0aW9ucy5wdXNoKG5ld0RlZmluaXRpb24odHlwZSwgbmFtZSkpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiB7IG5hbWU6IGNvbXBsZXhUeXBlTmFtZSwgZGVmaW5pdGlvbnMgfTtcbn07XG5cbmNvbnN0IGZpbmRUeXBlQnlOYW1lID0gKHR5cGVzOiBSb3NNc2dEZWZpbml0aW9uW10sIG5hbWU6IHN0cmluZyk6IFJvc01zZ0RlZmluaXRpb24gPT4ge1xuICBjb25zdCBtYXRjaGVzID0gdHlwZXMuZmlsdGVyKCh0eXBlKSA9PiB7XG4gICAgY29uc3QgdHlwZU5hbWUgPSB0eXBlLm5hbWUgfHwgXCJcIjtcbiAgICAvLyBpZiB0aGUgc2VhcmNoIGlzIGVtcHR5LCByZXR1cm4gdW5uYW1lZCB0eXBlc1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuICF0eXBlTmFtZTtcbiAgICB9XG4gICAgLy8gcmV0dXJuIGlmIHRoZSBzZWFyY2ggaXMgaW4gdGhlIHR5cGUgbmFtZVxuICAgIC8vIG9yIG1hdGNoZXMgZXhhY3RseSBpZiBhIGZ1bGx5LXF1YWxpZmllZCBuYW1lIG1hdGNoIGlzIHBhc3NlZCB0byB1c1xuICAgIGNvbnN0IG5hbWVFbmQgPSBuYW1lLmluZGV4T2YoXCIvXCIpID4gLTEgPyBuYW1lIDogYC8ke25hbWV9YDtcbiAgICByZXR1cm4gdHlwZU5hbWUuZW5kc1dpdGgobmFtZUVuZCk7XG4gIH0pO1xuICBpZiAobWF0Y2hlcy5sZW5ndGggIT09IDEpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYEV4cGVjdGVkIDEgdG9wIGxldmVsIHR5cGUgZGVmaW5pdGlvbiBmb3IgJyR7bmFtZX0nIGJ1dCBmb3VuZCAke21hdGNoZXMubGVuZ3RofWApO1xuICB9XG4gIHJldHVybiBtYXRjaGVzWzBdO1xufTtcblxuLy8gR2l2ZW4gYSByYXcgbWVzc2FnZSBkZWZpbml0aW9uIHN0cmluZywgcGFyc2UgaXQgaW50byBhbiBvYmplY3QgcmVwcmVzZW50YXRpb24uXG4vLyBFeGFtcGxlIHJldHVybiB2YWx1ZTpcbi8vIFt7XG4vLyAgIG5hbWU6IHVuZGVmaW5lZCxcbi8vICAgZGVmaW5pdGlvbnM6IFtcbi8vICAgICB7XG4vLyAgICAgICBhcnJheUxlbmd0aDogdW5kZWZpbmVkLFxuLy8gICAgICAgaXNBcnJheTogZmFsc2UsXG4vLyAgICAgICBpc0NvbXBsZXg6IGZhbHNlLFxuLy8gICAgICAgbmFtZTogXCJuYW1lXCIsXG4vLyAgICAgICB0eXBlOiBcInN0cmluZ1wiLFxuLy8gICAgIH0sIC4uLlxuLy8gICBdLFxuLy8gfSwgLi4uIF1cbi8vXG4vLyBTZWUgdW5pdCB0ZXN0cyBmb3IgbW9yZSBleGFtcGxlcy5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uKG1lc3NhZ2VEZWZpbml0aW9uOiBzdHJpbmcpIHtcbiAgLy8gcmVhZCBhbGwgdGhlIGxpbmVzIGFuZCByZW1vdmUgZW1wdGllc1xuICBjb25zdCBhbGxMaW5lcyA9IG1lc3NhZ2VEZWZpbml0aW9uXG4gICAgLnNwbGl0KFwiXFxuXCIpXG4gICAgLm1hcCgobGluZSkgPT4gbGluZS50cmltKCkpXG4gICAgLmZpbHRlcigobGluZSkgPT4gbGluZSk7XG5cbiAgbGV0IGRlZmluaXRpb25MaW5lczogc3RyaW5nW10gPSBbXTtcbiAgY29uc3QgdHlwZXM6IFJvc01zZ0RlZmluaXRpb25bXSA9IFtdO1xuICAvLyBncm91cCBsaW5lcyBpbnRvIGluZGl2aWR1YWwgZGVmaW5pdGlvbnNcbiAgYWxsTGluZXMuZm9yRWFjaCgobGluZSkgPT4ge1xuICAgIC8vIHNraXAgY29tbWVudCBsaW5lc1xuICAgIGlmIChsaW5lLmluZGV4T2YoXCIjXCIpID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIC8vIGRlZmluaXRpb25zIGFyZSBzcGxpdCBieSBlcXVhbCBzaWduc1xuICAgIGlmIChsaW5lLmluZGV4T2YoXCI9PVwiKSA9PT0gMCkge1xuICAgICAgdHlwZXMucHVzaChidWlsZFR5cGUoZGVmaW5pdGlvbkxpbmVzKSk7XG4gICAgICBkZWZpbml0aW9uTGluZXMgPSBbXTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGVmaW5pdGlvbkxpbmVzLnB1c2gobGluZSk7XG4gICAgfVxuICB9KTtcbiAgdHlwZXMucHVzaChidWlsZFR5cGUoZGVmaW5pdGlvbkxpbmVzKSk7XG5cbiAgLy8gRml4IHVwIGNvbXBsZXggdHlwZSBuYW1lc1xuICB0eXBlcy5mb3JFYWNoKCh7IGRlZmluaXRpb25zIH0pID0+IHtcbiAgICBkZWZpbml0aW9ucy5mb3JFYWNoKChkZWZpbml0aW9uKSA9PiB7XG4gICAgICBpZiAoZGVmaW5pdGlvbi5pc0NvbXBsZXgpIHtcbiAgICAgICAgY29uc3QgZm91bmROYW1lID0gZmluZFR5cGVCeU5hbWUodHlwZXMsIGRlZmluaXRpb24udHlwZSkubmFtZTtcbiAgICAgICAgaWYgKGZvdW5kTmFtZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIHR5cGUgZGVmaW5pdGlvbiBmb3IgJHtkZWZpbml0aW9uLnR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgICAgZGVmaW5pdGlvbi50eXBlID0gZm91bmROYW1lO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICByZXR1cm4gdHlwZXM7XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgR00gQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgaW50NTMgZnJvbSBcImludDUzXCI7XG5cbmltcG9ydCB7IGV4dHJhY3RGaWVsZHMsIGV4dHJhY3RUaW1lIH0gZnJvbSBcIi4vZmllbGRzXCI7XG5pbXBvcnQgeyBNZXNzYWdlUmVhZGVyIH0gZnJvbSBcIi4vTWVzc2FnZVJlYWRlclwiO1xuaW1wb3J0IHR5cGUgeyBUaW1lIH0gZnJvbSBcIi4vdHlwZXNcIjtcblxuY29uc3QgcmVhZFVJbnQ2NExFID0gKGJ1ZmZlcjogQnVmZmVyKSA9PiB7XG4gIHJldHVybiBpbnQ1My5yZWFkVUludDY0TEUoYnVmZmVyLCAwKTtcbn07XG5cbmV4cG9ydCBjbGFzcyBSZWNvcmQge1xuICBvZmZzZXQ6IG51bWJlcjtcbiAgZGF0YU9mZnNldDogbnVtYmVyO1xuICBlbmQ6IG51bWJlcjtcbiAgbGVuZ3RoOiBudW1iZXI7XG5cbiAgY29uc3RydWN0b3IoX2ZpZWxkczogeyBba2V5OiBzdHJpbmddOiBhbnkgfSkge31cblxuICBwYXJzZURhdGEoX2J1ZmZlcjogQnVmZmVyKSB7fVxufVxuXG5leHBvcnQgY2xhc3MgQmFnSGVhZGVyIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDM7XG4gIGluZGV4UG9zaXRpb246IG51bWJlcjtcbiAgY29ubmVjdGlvbkNvdW50OiBudW1iZXI7XG4gIGNodW5rQ291bnQ6IG51bWJlcjtcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMuaW5kZXhQb3NpdGlvbiA9IHJlYWRVSW50NjRMRShmaWVsZHMuaW5kZXhfcG9zKTtcbiAgICB0aGlzLmNvbm5lY3Rpb25Db3VudCA9IGZpZWxkcy5jb25uX2NvdW50LnJlYWRJbnQzMkxFKDApO1xuICAgIHRoaXMuY2h1bmtDb3VudCA9IGZpZWxkcy5jaHVua19jb3VudC5yZWFkSW50MzJMRSgwKTtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgQ2h1bmsgZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gNTtcbiAgY29tcHJlc3Npb246IHN0cmluZztcbiAgc2l6ZTogbnVtYmVyO1xuICBkYXRhOiBCdWZmZXI7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLmNvbXByZXNzaW9uID0gZmllbGRzLmNvbXByZXNzaW9uLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5zaXplID0gZmllbGRzLnNpemUucmVhZFVJbnQzMkxFKDApO1xuICB9XG5cbiAgcGFyc2VEYXRhKGJ1ZmZlcjogQnVmZmVyKSB7XG4gICAgdGhpcy5kYXRhID0gYnVmZmVyO1xuICB9XG59XG5cbmNvbnN0IGdldEZpZWxkID0gKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSwga2V5OiBzdHJpbmcpID0+IHtcbiAgaWYgKGZpZWxkc1trZXldID09PSB1bmRlZmluZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYENvbm5lY3Rpb24gaGVhZGVyIGlzIG1pc3NpbmcgJHtrZXl9LmApO1xuICB9XG4gIHJldHVybiBmaWVsZHNba2V5XS50b1N0cmluZygpO1xufTtcblxuZXhwb3J0IGNsYXNzIENvbm5lY3Rpb24gZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gNztcbiAgY29ubjogbnVtYmVyO1xuICB0b3BpYzogc3RyaW5nO1xuICB0eXBlOiA/c3RyaW5nO1xuICBtZDVzdW06ID9zdHJpbmc7XG4gIG1lc3NhZ2VEZWZpbml0aW9uOiBzdHJpbmc7XG4gIGNhbGxlcmlkOiA/c3RyaW5nO1xuICBsYXRjaGluZzogP2Jvb2xlYW47XG4gIHJlYWRlcjogP01lc3NhZ2VSZWFkZXI7XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLmNvbm4gPSBmaWVsZHMuY29ubi5yZWFkVUludDMyTEUoMCk7XG4gICAgdGhpcy50b3BpYyA9IGZpZWxkcy50b3BpYy50b1N0cmluZygpO1xuICAgIHRoaXMudHlwZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1kNXN1bSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLm1lc3NhZ2VEZWZpbml0aW9uID0gXCJcIjtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIGNvbnN0IGZpZWxkcyA9IGV4dHJhY3RGaWVsZHMoYnVmZmVyKTtcbiAgICB0aGlzLnR5cGUgPSBnZXRGaWVsZChmaWVsZHMsIFwidHlwZVwiKTtcbiAgICB0aGlzLm1kNXN1bSA9IGdldEZpZWxkKGZpZWxkcywgXCJtZDVzdW1cIik7XG4gICAgdGhpcy5tZXNzYWdlRGVmaW5pdGlvbiA9IGdldEZpZWxkKGZpZWxkcywgXCJtZXNzYWdlX2RlZmluaXRpb25cIik7XG4gICAgaWYgKGZpZWxkcy5jYWxsZXJpZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLmNhbGxlcmlkID0gZmllbGRzLmNhbGxlcmlkLnRvU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChmaWVsZHMubGF0Y2hpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5sYXRjaGluZyA9IGZpZWxkcy5sYXRjaGluZy50b1N0cmluZygpID09PSBcIjFcIjtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNsYXNzIE1lc3NhZ2VEYXRhIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDI7XG4gIGNvbm46IG51bWJlcjtcbiAgdGltZTogVGltZTtcbiAgZGF0YTogQnVmZmVyO1xuXG4gIGNvbnN0cnVjdG9yKGZpZWxkczogeyBba2V5OiBzdHJpbmddOiBCdWZmZXIgfSkge1xuICAgIHN1cGVyKGZpZWxkcyk7XG4gICAgdGhpcy5jb25uID0gZmllbGRzLmNvbm4ucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMudGltZSA9IGV4dHJhY3RUaW1lKGZpZWxkcy50aW1lLCAwKTtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuZGF0YSA9IGJ1ZmZlcjtcbiAgfVxufVxuXG5leHBvcnQgY2xhc3MgSW5kZXhEYXRhIGV4dGVuZHMgUmVjb3JkIHtcbiAgc3RhdGljIG9wY29kZSA9IDQ7XG4gIHZlcjogbnVtYmVyO1xuICBjb25uOiBudW1iZXI7XG4gIGNvdW50OiBudW1iZXI7XG4gIGluZGljZXM6IEFycmF5PHsgdGltZTogVGltZSwgb2Zmc2V0OiBudW1iZXIgfT47XG5cbiAgY29uc3RydWN0b3IoZmllbGRzOiB7IFtrZXk6IHN0cmluZ106IEJ1ZmZlciB9KSB7XG4gICAgc3VwZXIoZmllbGRzKTtcbiAgICB0aGlzLnZlciA9IGZpZWxkcy52ZXIucmVhZFVJbnQzMkxFKDApO1xuICAgIHRoaXMuY29ubiA9IGZpZWxkcy5jb25uLnJlYWRVSW50MzJMRSgwKTtcbiAgICB0aGlzLmNvdW50ID0gZmllbGRzLmNvdW50LnJlYWRVSW50MzJMRSgwKTtcbiAgfVxuXG4gIHBhcnNlRGF0YShidWZmZXI6IEJ1ZmZlcikge1xuICAgIHRoaXMuaW5kaWNlcyA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgdGhpcy5jb3VudDsgaSsrKSB7XG4gICAgICB0aGlzLmluZGljZXMucHVzaCh7XG4gICAgICAgIHRpbWU6IGV4dHJhY3RUaW1lKGJ1ZmZlciwgaSAqIDEyKSxcbiAgICAgICAgb2Zmc2V0OiBidWZmZXIucmVhZFVJbnQzMkxFKGkgKiAxMiArIDgpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjbGFzcyBDaHVua0luZm8gZXh0ZW5kcyBSZWNvcmQge1xuICBzdGF0aWMgb3Bjb2RlID0gNjtcbiAgdmVyOiBudW1iZXI7XG4gIGNodW5rUG9zaXRpb246IG51bWJlcjtcbiAgc3RhcnRUaW1lOiBUaW1lO1xuICBlbmRUaW1lOiBUaW1lO1xuICBjb3VudDogbnVtYmVyO1xuICBjb25uZWN0aW9uczogQXJyYXk8eyBjb25uOiBudW1iZXIsIGNvdW50OiBudW1iZXIgfT47XG4gIG5leHRDaHVuazogP0NodW5rSW5mbztcblxuICBjb25zdHJ1Y3RvcihmaWVsZHM6IHsgW2tleTogc3RyaW5nXTogQnVmZmVyIH0pIHtcbiAgICBzdXBlcihmaWVsZHMpO1xuICAgIHRoaXMudmVyID0gZmllbGRzLnZlci5yZWFkVUludDMyTEUoMCk7XG4gICAgdGhpcy5jaHVua1Bvc2l0aW9uID0gcmVhZFVJbnQ2NExFKGZpZWxkcy5jaHVua19wb3MpO1xuICAgIHRoaXMuc3RhcnRUaW1lID0gZXh0cmFjdFRpbWUoZmllbGRzLnN0YXJ0X3RpbWUsIDApO1xuICAgIHRoaXMuZW5kVGltZSA9IGV4dHJhY3RUaW1lKGZpZWxkcy5lbmRfdGltZSwgMCk7XG4gICAgdGhpcy5jb3VudCA9IGZpZWxkcy5jb3VudC5yZWFkVUludDMyTEUoMCk7XG4gIH1cblxuICBwYXJzZURhdGEoYnVmZmVyOiBCdWZmZXIpIHtcbiAgICB0aGlzLmNvbm5lY3Rpb25zID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCB0aGlzLmNvdW50OyBpKyspIHtcbiAgICAgIHRoaXMuY29ubmVjdGlvbnMucHVzaCh7XG4gICAgICAgIGNvbm46IGJ1ZmZlci5yZWFkVUludDMyTEUoaSAqIDgpLFxuICAgICAgICBjb3VudDogYnVmZmVyLnJlYWRVSW50MzJMRShpICogOCArIDQpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iLCIvLyBDb3B5cmlnaHQgKGMpIDIwMTgtcHJlc2VudCwgR00gQ3J1aXNlIExMQ1xuXG4vLyBUaGlzIHNvdXJjZSBjb2RlIGlzIGxpY2Vuc2VkIHVuZGVyIHRoZSBBcGFjaGUgTGljZW5zZSwgVmVyc2lvbiAyLjAsXG4vLyBmb3VuZCBpbiB0aGUgTElDRU5TRSBmaWxlIGluIHRoZSByb290IGRpcmVjdG9yeSBvZiB0aGlzIHNvdXJjZSB0cmVlLlxuLy8gWW91IG1heSBub3QgdXNlIHRoaXMgZmlsZSBleGNlcHQgaW4gY29tcGxpYW5jZSB3aXRoIHRoZSBMaWNlbnNlLlxuXG4vLyBAZmxvd1xuXG5pbXBvcnQgeyBCdWZmZXIgfSBmcm9tIFwiYnVmZmVyXCI7XG5pbXBvcnQgeyBNZXNzYWdlUmVhZGVyLCBwYXJzZU1lc3NhZ2VEZWZpbml0aW9uLCByb3NQcmltaXRpdmVUeXBlcywgVGltZVV0aWwgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCB7IHR5cGUgQ2FsbGJhY2sgfSBmcm9tIFwiLi4vdHlwZXNcIjtcbmltcG9ydCBCYWcgZnJvbSBcIi4uL2JhZ1wiO1xuaW1wb3J0IEJhZ1JlYWRlciBmcm9tIFwiLi4vQmFnUmVhZGVyXCI7XG5cbi8vIGJyb3dzZXIgcmVhZGVyIGZvciBCbG9ifEZpbGUgb2JqZWN0c1xuZXhwb3J0IGNsYXNzIFJlYWRlciB7XG4gIF9ibG9iOiBCbG9iO1xuICBfc2l6ZTogbnVtYmVyO1xuXG4gIGNvbnN0cnVjdG9yKGJsb2I6IEJsb2IpIHtcbiAgICB0aGlzLl9ibG9iID0gYmxvYjtcbiAgICB0aGlzLl9zaXplID0gYmxvYi5zaXplO1xuICB9XG5cbiAgLy8gcmVhZCBsZW5ndGggKGJ5dGVzKSBzdGFydGluZyBmcm9tIG9mZnNldCAoYnl0ZXMpXG4gIC8vIGNhbGxiYWNrKGVyciwgYnVmZmVyKVxuICByZWFkKG9mZnNldDogbnVtYmVyLCBsZW5ndGg6IG51bWJlciwgY2I6IENhbGxiYWNrPEJ1ZmZlcj4pIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIHJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vICRGbG93Rml4TWUgLSBmbG93IGRvZXNuJ3QgYWxsb3cgbnVsbFxuICAgICAgcmVhZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAvLyAkRmxvd0ZpeE1lIC0gZmxvdyBkb2Vzbid0IGFsbG93IG51bGxcbiAgICAgIHJlYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgIHNldEltbWVkaWF0ZShjYiwgbnVsbCwgQnVmZmVyLmZyb20ocmVhZGVyLnJlc3VsdCkpO1xuICAgIH07XG4gICAgcmVhZGVyLm9uZXJyb3IgPSBmdW5jdGlvbigpIHtcbiAgICAgIC8vICRGbG93Rml4TWUgLSBmbG93IGRvZXNuJ3QgYWxsb3cgbnVsbFxuICAgICAgcmVhZGVyLm9ubG9hZCA9IG51bGw7XG4gICAgICAvLyAkRmxvd0ZpeE1lIC0gZmxvdyBkb2Vzbid0IGFsbG93IG51bGxcbiAgICAgIHJlYWRlci5vbmVycm9yID0gbnVsbDtcbiAgICAgIHNldEltbWVkaWF0ZShjYiwgbmV3IEVycm9yKHJlYWRlci5lcnJvcikpO1xuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0FycmF5QnVmZmVyKHRoaXMuX2Jsb2Iuc2xpY2Uob2Zmc2V0LCBvZmZzZXQgKyBsZW5ndGgpKTtcbiAgfVxuXG4gIC8vIHJldHVybiB0aGUgc2l6ZSBvZiB0aGUgZmlsZVxuICBzaXplKCkge1xuICAgIHJldHVybiB0aGlzLl9zaXplO1xuICB9XG59XG5cbmNvbnN0IG9wZW4gPSBhc3luYyAoZmlsZTogRmlsZSB8IHN0cmluZykgPT4ge1xuICBpZiAoIShmaWxlIGluc3RhbmNlb2YgQmxvYikpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBcIkV4cGVjdGVkIGZpbGUgdG8gYmUgYSBGaWxlIG9yIEJsb2IuIE1ha2Ugc3VyZSB5b3UgYXJlIGNvcnJlY3RseSBpbXBvcnRpbmcgdGhlIG5vZGUgb3Igd2ViIHZlcnNpb24gb2YgQmFnLlwiXG4gICAgKTtcbiAgfVxuICBjb25zdCBiYWcgPSBuZXcgQmFnKG5ldyBCYWdSZWFkZXIobmV3IFJlYWRlcihmaWxlKSkpO1xuICBhd2FpdCBiYWcub3BlbigpO1xuICByZXR1cm4gYmFnO1xufTtcbkJhZy5vcGVuID0gb3BlbjtcblxuZXhwb3J0IHsgVGltZSB9IGZyb20gXCIuLi90eXBlc1wiO1xuZXhwb3J0IHsgVGltZVV0aWwsIEJhZ1JlYWRlciwgTWVzc2FnZVJlYWRlciwgb3BlbiwgcGFyc2VNZXNzYWdlRGVmaW5pdGlvbiwgcm9zUHJpbWl0aXZlVHlwZXMgfTtcbmV4cG9ydCBkZWZhdWx0IEJhZztcbiJdLCJzb3VyY2VSb290IjoiIn0=