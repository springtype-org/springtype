FuseBox.pkg("tslib", {}, function(___scope___){
___scope___.file("tslib.es6.js", function(exports, require, module){
var extendStatics = function (d, b) {
  extendStatics = Object.setPrototypeOf || ({
    __proto__: []
  }) instanceof Array && (function (d, b) {
    d.__proto__ = b;
  }) || (function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  });
  return extendStatics(d, b);
};
function __extends(d, b) {
  extendStatics(d, b);
  function __() {
    this.constructor = d;
  }
  d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
module.exports.__extends = __extends;
var __assign = function () {
  __assign = Object.assign || (function __assign(t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];
      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }
    return t;
  });
  return __assign.apply(this, arguments);
};
module.exports.__assign = __assign;
function __rest(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0) t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function") for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
    if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i])) t[p[i]] = s[p[i]];
  }
  return t;
}
module.exports.__rest = __rest;
function __decorate(decorators, target, key, desc) {
  var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
  if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc); else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  return (c > 3 && r && Object.defineProperty(target, key, r), r);
}
module.exports.__decorate = __decorate;
function __param(paramIndex, decorator) {
  return function (target, key) {
    decorator(target, key, paramIndex);
  };
}
module.exports.__param = __param;
function __metadata(metadataKey, metadataValue) {
  if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
}
module.exports.__metadata = __metadata;
function __awaiter(thisArg, _arguments, P, generator) {
  return new (P || (P = Promise))(function (resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : new P(function (resolve) {
        resolve(result.value);
      }).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
}
module.exports.__awaiter = __awaiter;
function __generator(thisArg, body) {
  var _ = {
    label: 0,
    sent: function () {
      if (t[0] & 1) throw t[1];
      return t[1];
    },
    trys: [],
    ops: []
  }, f, y, t, g;
  return (g = {
    next: verb(0),
    "throw": verb(1),
    "return": verb(2)
  }, typeof Symbol === "function" && (g[Symbol.iterator] = function () {
    return this;
  }), g);
  function verb(n) {
    return function (v) {
      return step([n, v]);
    };
  }
  function step(op) {
    if (f) throw new TypeError("Generator is already executing.");
    while (_) try {
      if ((f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)) return t;
      if ((y = 0, t)) op = [op[0] & 2, t.value];
      switch (op[0]) {
        case 0:
        case 1:
          t = op;
          break;
        case 4:
          _.label++;
          return {
            value: op[1],
            done: false
          };
        case 5:
          _.label++;
          y = op[1];
          op = [0];
          continue;
        case 7:
          op = _.ops.pop();
          _.trys.pop();
          continue;
        default:
          if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
            _ = 0;
            continue;
          }
          if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
            _.label = op[1];
            break;
          }
          if (op[0] === 6 && _.label < t[1]) {
            _.label = t[1];
            t = op;
            break;
          }
          if (t && _.label < t[2]) {
            _.label = t[2];
            _.ops.push(op);
            break;
          }
          if (t[2]) _.ops.pop();
          _.trys.pop();
          continue;
      }
      op = body.call(thisArg, _);
    } catch (e) {
      op = [6, e];
      y = 0;
    } finally {
      f = t = 0;
    }
    if (op[0] & 5) throw op[1];
    return {
      value: op[0] ? op[1] : void 0,
      done: true
    };
  }
}
module.exports.__generator = __generator;
function __exportStar(m, exports) {
  for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
module.exports.__exportStar = __exportStar;
function __values(o) {
  var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
  if (m) return m.call(o);
  return {
    next: function () {
      if (o && i >= o.length) o = void 0;
      return {
        value: o && o[i++],
        done: !o
      };
    }
  };
}
module.exports.__values = __values;
function __read(o, n) {
  var m = typeof Symbol === "function" && o[Symbol.iterator];
  if (!m) return o;
  var i = m.call(o), r, ar = [], e;
  try {
    while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
  } catch (error) {
    e = {
      error: error
    };
  } finally {
    try {
      if (r && !r.done && (m = i["return"])) m.call(i);
    } finally {
      if (e) throw e.error;
    }
  }
  return ar;
}
module.exports.__read = __read;
function __spread() {
  for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
  return ar;
}
module.exports.__spread = __spread;
function __spreadArrays() {
  for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
  for (var r = Array(s), k = 0, i = 0; i < il; i++) for (var a = arguments[i], j = 0, jl = a.length; j < jl; (j++, k++)) r[k] = a[j];
  return r;
}
module.exports.__spreadArrays = __spreadArrays;
;
function __await(v) {
  return this instanceof __await ? (this.v = v, this) : new __await(v);
}
module.exports.__await = __await;
function __asyncGenerator(thisArg, _arguments, generator) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var g = generator.apply(thisArg, _arguments || []), i, q = [];
  return (i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    if (g[n]) i[n] = function (v) {
      return new Promise(function (a, b) {
        q.push([n, v, a, b]) > 1 || resume(n, v);
      });
    };
  }
  function resume(n, v) {
    try {
      step(g[n](v));
    } catch (e) {
      settle(q[0][3], e);
    }
  }
  function step(r) {
    r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
  }
  function fulfill(value) {
    resume("next", value);
  }
  function reject(value) {
    resume("throw", value);
  }
  function settle(f, v) {
    if ((f(v), q.shift(), q.length)) resume(q[0][0], q[0][1]);
  }
}
module.exports.__asyncGenerator = __asyncGenerator;
function __asyncDelegator(o) {
  var i, p;
  return (i = {}, verb("next"), verb("throw", function (e) {
    throw e;
  }), verb("return"), i[Symbol.iterator] = function () {
    return this;
  }, i);
  function verb(n, f) {
    i[n] = o[n] ? function (v) {
      return (p = !p) ? {
        value: __await(o[n](v)),
        done: n === "return"
      } : f ? f(v) : v;
    } : f;
  }
}
module.exports.__asyncDelegator = __asyncDelegator;
function __asyncValues(o) {
  if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
  var m = o[Symbol.asyncIterator], i;
  return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () {
    return this;
  }, i);
  function verb(n) {
    i[n] = o[n] && (function (v) {
      return new Promise(function (resolve, reject) {
        (v = o[n](v), settle(resolve, reject, v.done, v.value));
      });
    });
  }
  function settle(resolve, reject, d, v) {
    Promise.resolve(v).then(function (v) {
      resolve({
        value: v,
        done: d
      });
    }, reject);
  }
}
module.exports.__asyncValues = __asyncValues;
function __makeTemplateObject(cooked, raw) {
  if (Object.defineProperty) {
    Object.defineProperty(cooked, "raw", {
      value: raw
    });
  } else {
    cooked.raw = raw;
  }
  return cooked;
}
module.exports.__makeTemplateObject = __makeTemplateObject;
;
function __importStar(mod) {
  if (mod && mod.__esModule) return mod;
  var result = {};
  if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
  result.default = mod;
  return result;
}
module.exports.__importStar = __importStar;
function __importDefault(mod) {
  return mod && mod.__esModule ? mod : {
    default: mod
  };
}
module.exports.__importDefault = __importDefault;

});
	___scope___.entry = "tslib.es6.js";
})
FuseBox.pkg("process", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  if (typeof __process_env__ !== "undefined") {
    Object.assign(global.process.env, __process_env__);
  }
  module.exports = global.process;
} else {
  if (typeof Object.assign != "function") {
    Object.assign = function (target, varArgs) {
      "use strict";
      if (target == null) {
        throw new TypeError("Cannot convert undefined or null to object");
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        if (nextSource != null) {
          for (var nextKey in nextSource) {
            if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
              to[nextKey] = nextSource[nextKey];
            }
          }
        }
      }
      return to;
    };
  }
  var productionEnv = false;
  var process = module.exports = {};
  var queue = [];
  var draining = false;
  var currentQueue;
  var queueIndex = -1;
  function cleanUpNextTick() {
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
    var timeout = setTimeout(cleanUpNextTick);
    draining = true;
    var len = queue.length;
    while (len) {
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
    clearTimeout(timeout);
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
      setTimeout(drainQueue, 0);
    }
  };
  function Item(fun, array) {
    this.fun = fun;
    this.array = array;
  }
  Item.prototype.run = function () {
    this.fun.apply(null, this.array);
  };
  process.title = "browser";
  process.browser = true;
  process.env = FuseBox.processEnv;
  if (typeof __process_env__ !== "undefined") {
    Object.assign(process.env, __process_env__);
  }
  process.argv = [];
  process.version = "";
  process.versions = {};
  function noop() {}
  process.on = noop;
  process.addListener = noop;
  process.once = noop;
  process.off = noop;
  process.removeListener = noop;
  process.removeAllListeners = noop;
  process.emit = noop;
  process.binding = function (name) {
    throw new Error("process.binding is not supported");
  };
  process.cwd = function () {
    return "/";
  };
  process.chdir = function (dir) {
    throw new Error("process.chdir is not supported");
  };
  process.umask = function () {
    return 0;
  };
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("reflect-metadata", {}, function(___scope___){
___scope___.file("Reflect.js", function(exports, require, module){
var process = require("process");
var buffer = require("buffer").Buffer;
var Reflect;
(function (Reflect) {
  (function (factory) {
    var root = typeof global === "object" ? global : typeof self === "object" ? self : typeof this === "object" ? this : Function("return this;")();
    var exporter = makeExporter(Reflect);
    if (typeof root.Reflect === "undefined") {
      root.Reflect = Reflect;
    } else {
      exporter = makeExporter(root.Reflect, exporter);
    }
    factory(exporter);
    function makeExporter(target, previous) {
      return function (key, value) {
        if (typeof target[key] !== "function") {
          Object.defineProperty(target, key, {
            configurable: true,
            writable: true,
            value: value
          });
        }
        if (previous) previous(key, value);
      };
    }
  })(function (exporter) {
    var hasOwn = Object.prototype.hasOwnProperty;
    var supportsSymbol = typeof Symbol === "function";
    var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
    var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
    var supportsCreate = typeof Object.create === "function";
    var supportsProto = ({
      __proto__: []
    }) instanceof Array;
    var downLevel = !supportsCreate && !supportsProto;
    var HashMap = {
      create: supportsCreate ? function () {
        return MakeDictionary(Object.create(null));
      } : supportsProto ? function () {
        return MakeDictionary({
          __proto__: null
        });
      } : function () {
        return MakeDictionary({});
      },
      has: downLevel ? function (map, key) {
        return hasOwn.call(map, key);
      } : function (map, key) {
        return (key in map);
      },
      get: downLevel ? function (map, key) {
        return hasOwn.call(map, key) ? map[key] : undefined;
      } : function (map, key) {
        return map[key];
      }
    };
    var functionPrototype = Object.getPrototypeOf(Function);
    var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
    var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
    var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
    var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
    var Metadata = new _WeakMap();
    function decorate(decorators, target, propertyKey, attributes) {
      if (!IsUndefined(propertyKey)) {
        if (!IsArray(decorators)) throw new TypeError();
        if (!IsObject(target)) throw new TypeError();
        if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes)) throw new TypeError();
        if (IsNull(attributes)) attributes = undefined;
        propertyKey = ToPropertyKey(propertyKey);
        return DecorateProperty(decorators, target, propertyKey, attributes);
      } else {
        if (!IsArray(decorators)) throw new TypeError();
        if (!IsConstructor(target)) throw new TypeError();
        return DecorateConstructor(decorators, target);
      }
    }
    exporter("decorate", decorate);
    function metadata(metadataKey, metadataValue) {
      function decorator(target, propertyKey) {
        if (!IsObject(target)) throw new TypeError();
        if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey)) throw new TypeError();
        OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
      }
      return decorator;
    }
    exporter("metadata", metadata);
    function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
    }
    exporter("defineMetadata", defineMetadata);
    function hasMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasMetadata", hasMetadata);
    function hasOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("hasOwnMetadata", hasOwnMetadata);
    function getMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetMetadata(metadataKey, target, propertyKey);
    }
    exporter("getMetadata", getMetadata);
    function getOwnMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
    }
    exporter("getOwnMetadata", getOwnMetadata);
    function getMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryMetadataKeys(target, propertyKey);
    }
    exporter("getMetadataKeys", getMetadataKeys);
    function getOwnMetadataKeys(target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      return OrdinaryOwnMetadataKeys(target, propertyKey);
    }
    exporter("getOwnMetadataKeys", getOwnMetadataKeys);
    function deleteMetadata(metadataKey, target, propertyKey) {
      if (!IsObject(target)) throw new TypeError();
      if (!IsUndefined(propertyKey)) propertyKey = ToPropertyKey(propertyKey);
      var metadataMap = GetOrCreateMetadataMap(target, propertyKey, false);
      if (IsUndefined(metadataMap)) return false;
      if (!metadataMap.delete(metadataKey)) return false;
      if (metadataMap.size > 0) return true;
      var targetMetadata = Metadata.get(target);
      targetMetadata.delete(propertyKey);
      if (targetMetadata.size > 0) return true;
      Metadata.delete(target);
      return true;
    }
    exporter("deleteMetadata", deleteMetadata);
    function DecorateConstructor(decorators, target) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsConstructor(decorated)) throw new TypeError();
          target = decorated;
        }
      }
      return target;
    }
    function DecorateProperty(decorators, target, propertyKey, descriptor) {
      for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        var decorated = decorator(target, propertyKey, descriptor);
        if (!IsUndefined(decorated) && !IsNull(decorated)) {
          if (!IsObject(decorated)) throw new TypeError();
          descriptor = decorated;
        }
      }
      return descriptor;
    }
    function GetOrCreateMetadataMap(O, P, Create) {
      var targetMetadata = Metadata.get(O);
      if (IsUndefined(targetMetadata)) {
        if (!Create) return undefined;
        targetMetadata = new _Map();
        Metadata.set(O, targetMetadata);
      }
      var metadataMap = targetMetadata.get(P);
      if (IsUndefined(metadataMap)) {
        if (!Create) return undefined;
        metadataMap = new _Map();
        targetMetadata.set(P, metadataMap);
      }
      return metadataMap;
    }
    function OrdinaryHasMetadata(MetadataKey, O, P) {
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return true;
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) return OrdinaryHasMetadata(MetadataKey, parent, P);
      return false;
    }
    function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap)) return false;
      return ToBoolean(metadataMap.has(MetadataKey));
    }
    function OrdinaryGetMetadata(MetadataKey, O, P) {
      var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
      if (hasOwn) return OrdinaryGetOwnMetadata(MetadataKey, O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (!IsNull(parent)) return OrdinaryGetMetadata(MetadataKey, parent, P);
      return undefined;
    }
    function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap)) return undefined;
      return metadataMap.get(MetadataKey);
    }
    function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
      var metadataMap = GetOrCreateMetadataMap(O, P, true);
      metadataMap.set(MetadataKey, MetadataValue);
    }
    function OrdinaryMetadataKeys(O, P) {
      var ownKeys = OrdinaryOwnMetadataKeys(O, P);
      var parent = OrdinaryGetPrototypeOf(O);
      if (parent === null) return ownKeys;
      var parentKeys = OrdinaryMetadataKeys(parent, P);
      if (parentKeys.length <= 0) return ownKeys;
      if (ownKeys.length <= 0) return parentKeys;
      var set = new _Set();
      var keys = [];
      for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
        var key = ownKeys_1[_i];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
        var key = parentKeys_1[_a];
        var hasKey = set.has(key);
        if (!hasKey) {
          set.add(key);
          keys.push(key);
        }
      }
      return keys;
    }
    function OrdinaryOwnMetadataKeys(O, P) {
      var keys = [];
      var metadataMap = GetOrCreateMetadataMap(O, P, false);
      if (IsUndefined(metadataMap)) return keys;
      var keysObj = metadataMap.keys();
      var iterator = GetIterator(keysObj);
      var k = 0;
      while (true) {
        var next = IteratorStep(iterator);
        if (!next) {
          keys.length = k;
          return keys;
        }
        var nextValue = IteratorValue(next);
        try {
          keys[k] = nextValue;
        } catch (e) {
          try {
            IteratorClose(iterator);
          } finally {
            throw e;
          }
        }
        k++;
      }
    }
    function Type(x) {
      if (x === null) return 1;
      switch (typeof x) {
        case "undefined":
          return 0;
        case "boolean":
          return 2;
        case "string":
          return 3;
        case "symbol":
          return 4;
        case "number":
          return 5;
        case "object":
          return x === null ? 1 : 6;
        default:
          return 6;
      }
    }
    function IsUndefined(x) {
      return x === undefined;
    }
    function IsNull(x) {
      return x === null;
    }
    function IsSymbol(x) {
      return typeof x === "symbol";
    }
    function IsObject(x) {
      return typeof x === "object" ? x !== null : typeof x === "function";
    }
    function ToPrimitive(input, PreferredType) {
      switch (Type(input)) {
        case 0:
          return input;
        case 1:
          return input;
        case 2:
          return input;
        case 3:
          return input;
        case 4:
          return input;
        case 5:
          return input;
      }
      var hint = PreferredType === 3 ? "string" : PreferredType === 5 ? "number" : "default";
      var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
      if (exoticToPrim !== undefined) {
        var result = exoticToPrim.call(input, hint);
        if (IsObject(result)) throw new TypeError();
        return result;
      }
      return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
    }
    function OrdinaryToPrimitive(O, hint) {
      if (hint === "string") {
        var toString_1 = O.toString;
        if (IsCallable(toString_1)) {
          var result = toString_1.call(O);
          if (!IsObject(result)) return result;
        }
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result)) return result;
        }
      } else {
        var valueOf = O.valueOf;
        if (IsCallable(valueOf)) {
          var result = valueOf.call(O);
          if (!IsObject(result)) return result;
        }
        var toString_2 = O.toString;
        if (IsCallable(toString_2)) {
          var result = toString_2.call(O);
          if (!IsObject(result)) return result;
        }
      }
      throw new TypeError();
    }
    function ToBoolean(argument) {
      return !!argument;
    }
    function ToString(argument) {
      return "" + argument;
    }
    function ToPropertyKey(argument) {
      var key = ToPrimitive(argument, 3);
      if (IsSymbol(key)) return key;
      return ToString(key);
    }
    function IsArray(argument) {
      return Array.isArray ? Array.isArray(argument) : argument instanceof Object ? argument instanceof Array : Object.prototype.toString.call(argument) === "[object Array]";
    }
    function IsCallable(argument) {
      return typeof argument === "function";
    }
    function IsConstructor(argument) {
      return typeof argument === "function";
    }
    function IsPropertyKey(argument) {
      switch (Type(argument)) {
        case 3:
          return true;
        case 4:
          return true;
        default:
          return false;
      }
    }
    function GetMethod(V, P) {
      var func = V[P];
      if (func === undefined || func === null) return undefined;
      if (!IsCallable(func)) throw new TypeError();
      return func;
    }
    function GetIterator(obj) {
      var method = GetMethod(obj, iteratorSymbol);
      if (!IsCallable(method)) throw new TypeError();
      var iterator = method.call(obj);
      if (!IsObject(iterator)) throw new TypeError();
      return iterator;
    }
    function IteratorValue(iterResult) {
      return iterResult.value;
    }
    function IteratorStep(iterator) {
      var result = iterator.next();
      return result.done ? false : result;
    }
    function IteratorClose(iterator) {
      var f = iterator["return"];
      if (f) f.call(iterator);
    }
    function OrdinaryGetPrototypeOf(O) {
      var proto = Object.getPrototypeOf(O);
      if (typeof O !== "function" || O === functionPrototype) return proto;
      if (proto !== functionPrototype) return proto;
      var prototype = O.prototype;
      var prototypeProto = prototype && Object.getPrototypeOf(prototype);
      if (prototypeProto == null || prototypeProto === Object.prototype) return proto;
      var constructor = prototypeProto.constructor;
      if (typeof constructor !== "function") return proto;
      if (constructor === O) return proto;
      return constructor;
    }
    function CreateMapPolyfill() {
      var cacheSentinel = {};
      var arraySentinel = [];
      var MapIterator = (function () {
        function MapIterator(keys, values, selector) {
          this._index = 0;
          this._keys = keys;
          this._values = values;
          this._selector = selector;
        }
        MapIterator.prototype["@@iterator"] = function () {
          return this;
        };
        MapIterator.prototype[iteratorSymbol] = function () {
          return this;
        };
        MapIterator.prototype.next = function () {
          var index = this._index;
          if (index >= 0 && index < this._keys.length) {
            var result = this._selector(this._keys[index], this._values[index]);
            if (index + 1 >= this._keys.length) {
              this._index = -1;
              this._keys = arraySentinel;
              this._values = arraySentinel;
            } else {
              this._index++;
            }
            return {
              value: result,
              done: false
            };
          }
          return {
            value: undefined,
            done: true
          };
        };
        MapIterator.prototype.throw = function (error) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }
          throw error;
        };
        MapIterator.prototype.return = function (value) {
          if (this._index >= 0) {
            this._index = -1;
            this._keys = arraySentinel;
            this._values = arraySentinel;
          }
          return {
            value: value,
            done: true
          };
        };
        return MapIterator;
      })();
      return (function () {
        function Map() {
          this._keys = [];
          this._values = [];
          this._cacheKey = cacheSentinel;
          this._cacheIndex = -2;
        }
        Object.defineProperty(Map.prototype, "size", {
          get: function () {
            return this._keys.length;
          },
          enumerable: true,
          configurable: true
        });
        Map.prototype.has = function (key) {
          return this._find(key, false) >= 0;
        };
        Map.prototype.get = function (key) {
          var index = this._find(key, false);
          return index >= 0 ? this._values[index] : undefined;
        };
        Map.prototype.set = function (key, value) {
          var index = this._find(key, true);
          this._values[index] = value;
          return this;
        };
        Map.prototype.delete = function (key) {
          var index = this._find(key, false);
          if (index >= 0) {
            var size = this._keys.length;
            for (var i = index + 1; i < size; i++) {
              this._keys[i - 1] = this._keys[i];
              this._values[i - 1] = this._values[i];
            }
            this._keys.length--;
            this._values.length--;
            if (key === this._cacheKey) {
              this._cacheKey = cacheSentinel;
              this._cacheIndex = -2;
            }
            return true;
          }
          return false;
        };
        Map.prototype.clear = function () {
          this._keys.length = 0;
          this._values.length = 0;
          this._cacheKey = cacheSentinel;
          this._cacheIndex = -2;
        };
        Map.prototype.keys = function () {
          return new MapIterator(this._keys, this._values, getKey);
        };
        Map.prototype.values = function () {
          return new MapIterator(this._keys, this._values, getValue);
        };
        Map.prototype.entries = function () {
          return new MapIterator(this._keys, this._values, getEntry);
        };
        Map.prototype["@@iterator"] = function () {
          return this.entries();
        };
        Map.prototype[iteratorSymbol] = function () {
          return this.entries();
        };
        Map.prototype._find = function (key, insert) {
          if (this._cacheKey !== key) {
            this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
          }
          if (this._cacheIndex < 0 && insert) {
            this._cacheIndex = this._keys.length;
            this._keys.push(key);
            this._values.push(undefined);
          }
          return this._cacheIndex;
        };
        return Map;
      })();
      function getKey(key, _) {
        return key;
      }
      function getValue(_, value) {
        return value;
      }
      function getEntry(key, value) {
        return [key, value];
      }
    }
    function CreateSetPolyfill() {
      return (function () {
        function Set() {
          this._map = new _Map();
        }
        Object.defineProperty(Set.prototype, "size", {
          get: function () {
            return this._map.size;
          },
          enumerable: true,
          configurable: true
        });
        Set.prototype.has = function (value) {
          return this._map.has(value);
        };
        Set.prototype.add = function (value) {
          return (this._map.set(value, value), this);
        };
        Set.prototype.delete = function (value) {
          return this._map.delete(value);
        };
        Set.prototype.clear = function () {
          this._map.clear();
        };
        Set.prototype.keys = function () {
          return this._map.keys();
        };
        Set.prototype.values = function () {
          return this._map.values();
        };
        Set.prototype.entries = function () {
          return this._map.entries();
        };
        Set.prototype["@@iterator"] = function () {
          return this.keys();
        };
        Set.prototype[iteratorSymbol] = function () {
          return this.keys();
        };
        return Set;
      })();
    }
    function CreateWeakMapPolyfill() {
      var UUID_SIZE = 16;
      var keys = HashMap.create();
      var rootKey = CreateUniqueKey();
      return (function () {
        function WeakMap() {
          this._key = CreateUniqueKey();
        }
        WeakMap.prototype.has = function (target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== undefined ? HashMap.has(table, this._key) : false;
        };
        WeakMap.prototype.get = function (target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== undefined ? HashMap.get(table, this._key) : undefined;
        };
        WeakMap.prototype.set = function (target, value) {
          var table = GetOrCreateWeakMapTable(target, true);
          table[this._key] = value;
          return this;
        };
        WeakMap.prototype.delete = function (target) {
          var table = GetOrCreateWeakMapTable(target, false);
          return table !== undefined ? delete table[this._key] : false;
        };
        WeakMap.prototype.clear = function () {
          this._key = CreateUniqueKey();
        };
        return WeakMap;
      })();
      function CreateUniqueKey() {
        var key;
        do key = "@@WeakMap@@" + CreateUUID(); while (HashMap.has(keys, key));
        keys[key] = true;
        return key;
      }
      function GetOrCreateWeakMapTable(target, create) {
        if (!hasOwn.call(target, rootKey)) {
          if (!create) return undefined;
          Object.defineProperty(target, rootKey, {
            value: HashMap.create()
          });
        }
        return target[rootKey];
      }
      function FillRandomBytes(buffer, size) {
        for (var i = 0; i < size; ++i) buffer[i] = Math.random() * 255 | 0;
        return buffer;
      }
      function GenRandomBytes(size) {
        if (typeof Uint8Array === "function") {
          if (typeof crypto !== "undefined") return crypto.getRandomValues(new Uint8Array(size));
          if (typeof msCrypto !== "undefined") return msCrypto.getRandomValues(new Uint8Array(size));
          return FillRandomBytes(new Uint8Array(size), size);
        }
        return FillRandomBytes(new Array(size), size);
      }
      function CreateUUID() {
        var data = GenRandomBytes(UUID_SIZE);
        data[6] = data[6] & 79 | 64;
        data[8] = data[8] & 191 | 128;
        var result = "";
        for (var offset = 0; offset < UUID_SIZE; ++offset) {
          var byte = data[offset];
          if (offset === 4 || offset === 6 || offset === 8) result += "-";
          if (byte < 16) result += "0";
          result += byte.toString(16).toLowerCase();
        }
        return result;
      }
    }
    function MakeDictionary(obj) {
      obj.__ = undefined;
      delete obj.__;
      return obj;
    }
  });
})(Reflect || (Reflect = {}));

});
	___scope___.entry = "Reflect.js";
})
FuseBox.pkg("buffer", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  module.exports = global.require("buffer");
} else {
  "use strict";
  var base64 = require("base64-js");
  var ieee754 = require("ieee754");
  exports.Buffer = Buffer;
  exports.FuseShim = true;
  exports.SlowBuffer = SlowBuffer;
  exports.INSPECT_MAX_BYTES = 50;
  var K_MAX_LENGTH = 2147483647;
  exports.kMaxLength = K_MAX_LENGTH;
  Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();
  if (!Buffer.TYPED_ARRAY_SUPPORT) {
    console.error("This browser lacks typed array (Uint8Array) support which is required by " + "`buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
  }
  function typedArraySupport() {
    try {
      var arr = new Uint8Array(1);
      arr.__proto__ = {
        __proto__: Uint8Array.prototype,
        foo: function () {
          return 42;
        }
      };
      return arr.foo() === 42;
    } catch (e) {
      return false;
    }
  }
  function createBuffer(length) {
    if (length > K_MAX_LENGTH) {
      throw new RangeError("Invalid typed array length");
    }
    var buf = new Uint8Array(length);
    buf.__proto__ = Buffer.prototype;
    return buf;
  }
  function Buffer(arg, encodingOrOffset, length) {
    if (typeof arg === "number") {
      if (typeof encodingOrOffset === "string") {
        throw new Error("If encoding is specified then the first argument must be a string");
      }
      return allocUnsafe(arg);
    }
    return from(arg, encodingOrOffset, length);
  }
  if (typeof Symbol !== "undefined" && Symbol.species && Buffer[Symbol.species] === Buffer) {
    Object.defineProperty(Buffer, Symbol.species, {
      value: null,
      configurable: true,
      enumerable: false,
      writable: false
    });
  }
  Buffer.poolSize = 8192;
  function from(value, encodingOrOffset, length) {
    if (typeof value === "number") {
      throw new TypeError("\"value\" argument must not be a number");
    }
    if (typeof ArrayBuffer !== "undefined" && value instanceof ArrayBuffer) {
      return fromArrayBuffer(value, encodingOrOffset, length);
    }
    if (typeof value === "string") {
      return fromString(value, encodingOrOffset);
    }
    return fromObject(value);
  }
  Buffer.from = function (value, encodingOrOffset, length) {
    return from(value, encodingOrOffset, length);
  };
  Buffer.prototype.__proto__ = Uint8Array.prototype;
  Buffer.__proto__ = Uint8Array;
  function assertSize(size) {
    if (typeof size !== "number") {
      throw new TypeError("\"size\" argument must be a number");
    } else if (size < 0) {
      throw new RangeError("\"size\" argument must not be negative");
    }
  }
  function alloc(size, fill, encoding) {
    assertSize(size);
    if (size <= 0) {
      return createBuffer(size);
    }
    if (fill !== undefined) {
      return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
    }
    return createBuffer(size);
  }
  Buffer.alloc = function (size, fill, encoding) {
    return alloc(size, fill, encoding);
  };
  function allocUnsafe(size) {
    assertSize(size);
    return createBuffer(size < 0 ? 0 : checked(size) | 0);
  }
  Buffer.allocUnsafe = function (size) {
    return allocUnsafe(size);
  };
  Buffer.allocUnsafeSlow = function (size) {
    return allocUnsafe(size);
  };
  function fromString(string, encoding) {
    if (typeof encoding !== "string" || encoding === "") {
      encoding = "utf8";
    }
    if (!Buffer.isEncoding(encoding)) {
      throw new TypeError("\"encoding\" must be a valid string encoding");
    }
    var length = byteLength(string, encoding) | 0;
    var buf = createBuffer(length);
    var actual = buf.write(string, encoding);
    if (actual !== length) {
      buf = buf.slice(0, actual);
    }
    return buf;
  }
  function fromArrayLike(array) {
    var length = array.length < 0 ? 0 : checked(array.length) | 0;
    var buf = createBuffer(length);
    for (var i = 0; i < length; i += 1) {
      buf[i] = array[i] & 255;
    }
    return buf;
  }
  function fromArrayBuffer(array, byteOffset, length) {
    array.byteLength;
    if (byteOffset < 0 || array.byteLength < byteOffset) {
      throw new RangeError("'offset' is out of bounds");
    }
    if (array.byteLength < byteOffset + (length || 0)) {
      throw new RangeError("'length' is out of bounds");
    }
    var buf;
    if (byteOffset === undefined && length === undefined) {
      buf = new Uint8Array(array);
    } else if (length === undefined) {
      buf = new Uint8Array(array, byteOffset);
    } else {
      buf = new Uint8Array(array, byteOffset, length);
    }
    buf.__proto__ = Buffer.prototype;
    return buf;
  }
  function fromObject(obj) {
    if (Buffer.isBuffer(obj)) {
      var len = checked(obj.length) | 0;
      var buf = createBuffer(len);
      if (buf.length === 0) {
        return buf;
      }
      obj.copy(buf, 0, 0, len);
      return buf;
    }
    if (obj) {
      if (typeof ArrayBuffer !== "undefined" && obj.buffer instanceof ArrayBuffer || ("length" in obj)) {
        if (typeof obj.length !== "number" || isnan(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    throw new TypeError("First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object.");
  }
  function checked(length) {
    if (length >= K_MAX_LENGTH) {
      throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
    }
    return length | 0;
  }
  function SlowBuffer(length) {
    if (+length != length) {
      length = 0;
    }
    return Buffer.alloc(+length);
  }
  Buffer.isBuffer = function isBuffer(b) {
    return !!(b != null && b._isBuffer);
  };
  Buffer.compare = function compare(a, b) {
    if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
      throw new TypeError("Arguments must be Buffers");
    }
    if (a === b) return 0;
    var x = a.length;
    var y = b.length;
    for (var i = 0, len = Math.min(x, y); i < len; ++i) {
      if (a[i] !== b[i]) {
        x = a[i];
        y = b[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  Buffer.isEncoding = function isEncoding(encoding) {
    switch (String(encoding).toLowerCase()) {
      case "hex":
      case "utf8":
      case "utf-8":
      case "ascii":
      case "latin1":
      case "binary":
      case "base64":
      case "ucs2":
      case "ucs-2":
      case "utf16le":
      case "utf-16le":
        return true;
      default:
        return false;
    }
  };
  Buffer.concat = function concat(list, length) {
    if (!Array.isArray(list)) {
      throw new TypeError("\"list\" argument must be an Array of Buffers");
    }
    if (list.length === 0) {
      return Buffer.alloc(0);
    }
    var i;
    if (length === undefined) {
      length = 0;
      for (i = 0; i < list.length; ++i) {
        length += list[i].length;
      }
    }
    var buffer = Buffer.allocUnsafe(length);
    var pos = 0;
    for (i = 0; i < list.length; ++i) {
      var buf = list[i];
      if (!Buffer.isBuffer(buf)) {
        throw new TypeError("\"list\" argument must be an Array of Buffers");
      }
      buf.copy(buffer, pos);
      pos += buf.length;
    }
    return buffer;
  };
  function byteLength(string, encoding) {
    if (Buffer.isBuffer(string)) {
      return string.length;
    }
    if (typeof ArrayBuffer !== "undefined" && typeof ArrayBuffer.isView === "function" && (ArrayBuffer.isView(string) || string instanceof ArrayBuffer)) {
      return string.byteLength;
    }
    if (typeof string !== "string") {
      string = "" + string;
    }
    var len = string.length;
    if (len === 0) return 0;
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "ascii":
        case "latin1":
        case "binary":
          return len;
        case "utf8":
        case "utf-8":
        case undefined:
          return utf8ToBytes(string).length;
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return len * 2;
        case "hex":
          return len >>> 1;
        case "base64":
          return base64ToBytes(string).length;
        default:
          if (loweredCase) return utf8ToBytes(string).length;
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.byteLength = byteLength;
  function slowToString(encoding, start, end) {
    var loweredCase = false;
    if (start === undefined || start < 0) {
      start = 0;
    }
    if (start > this.length) {
      return "";
    }
    if (end === undefined || end > this.length) {
      end = this.length;
    }
    if (end <= 0) {
      return "";
    }
    end >>>= 0;
    start >>>= 0;
    if (end <= start) {
      return "";
    }
    if (!encoding) encoding = "utf8";
    while (true) {
      switch (encoding) {
        case "hex":
          return hexSlice(this, start, end);
        case "utf8":
        case "utf-8":
          return utf8Slice(this, start, end);
        case "ascii":
          return asciiSlice(this, start, end);
        case "latin1":
        case "binary":
          return latin1Slice(this, start, end);
        case "base64":
          return base64Slice(this, start, end);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return utf16leSlice(this, start, end);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = (encoding + "").toLowerCase();
          loweredCase = true;
      }
    }
  }
  Buffer.prototype._isBuffer = true;
  function swap(b, n, m) {
    var i = b[n];
    b[n] = b[m];
    b[m] = i;
  }
  Buffer.prototype.swap16 = function swap16() {
    var len = this.length;
    if (len % 2 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 16-bits");
    }
    for (var i = 0; i < len; i += 2) {
      swap(this, i, i + 1);
    }
    return this;
  };
  Buffer.prototype.swap32 = function swap32() {
    var len = this.length;
    if (len % 4 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 32-bits");
    }
    for (var i = 0; i < len; i += 4) {
      swap(this, i, i + 3);
      swap(this, i + 1, i + 2);
    }
    return this;
  };
  Buffer.prototype.swap64 = function swap64() {
    var len = this.length;
    if (len % 8 !== 0) {
      throw new RangeError("Buffer size must be a multiple of 64-bits");
    }
    for (var i = 0; i < len; i += 8) {
      swap(this, i, i + 7);
      swap(this, i + 1, i + 6);
      swap(this, i + 2, i + 5);
      swap(this, i + 3, i + 4);
    }
    return this;
  };
  Buffer.prototype.toString = function toString() {
    var length = this.length;
    if (length === 0) return "";
    if (arguments.length === 0) return utf8Slice(this, 0, length);
    return slowToString.apply(this, arguments);
  };
  Buffer.prototype.equals = function equals(b) {
    if (!Buffer.isBuffer(b)) throw new TypeError("Argument must be a Buffer");
    if (this === b) return true;
    return Buffer.compare(this, b) === 0;
  };
  Buffer.prototype.inspect = function inspect() {
    var str = "";
    var max = exports.INSPECT_MAX_BYTES;
    if (this.length > 0) {
      str = this.toString("hex", 0, max).match(/.{2}/g).join(" ");
      if (this.length > max) str += " ... ";
    }
    return "<Buffer " + str + ">";
  };
  Buffer.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
    if (!Buffer.isBuffer(target)) {
      throw new TypeError("Argument must be a Buffer");
    }
    if (start === undefined) {
      start = 0;
    }
    if (end === undefined) {
      end = target ? target.length : 0;
    }
    if (thisStart === undefined) {
      thisStart = 0;
    }
    if (thisEnd === undefined) {
      thisEnd = this.length;
    }
    if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
      throw new RangeError("out of range index");
    }
    if (thisStart >= thisEnd && start >= end) {
      return 0;
    }
    if (thisStart >= thisEnd) {
      return -1;
    }
    if (start >= end) {
      return 1;
    }
    start >>>= 0;
    end >>>= 0;
    thisStart >>>= 0;
    thisEnd >>>= 0;
    if (this === target) return 0;
    var x = thisEnd - thisStart;
    var y = end - start;
    var len = Math.min(x, y);
    var thisCopy = this.slice(thisStart, thisEnd);
    var targetCopy = target.slice(start, end);
    for (var i = 0; i < len; ++i) {
      if (thisCopy[i] !== targetCopy[i]) {
        x = thisCopy[i];
        y = targetCopy[i];
        break;
      }
    }
    if (x < y) return -1;
    if (y < x) return 1;
    return 0;
  };
  function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
    if (buffer.length === 0) return -1;
    if (typeof byteOffset === "string") {
      encoding = byteOffset;
      byteOffset = 0;
    } else if (byteOffset > 2147483647) {
      byteOffset = 2147483647;
    } else if (byteOffset < -2147483648) {
      byteOffset = -2147483648;
    }
    byteOffset = +byteOffset;
    if (isNaN(byteOffset)) {
      byteOffset = dir ? 0 : buffer.length - 1;
    }
    if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
    if (byteOffset >= buffer.length) {
      if (dir) return -1; else byteOffset = buffer.length - 1;
    } else if (byteOffset < 0) {
      if (dir) byteOffset = 0; else return -1;
    }
    if (typeof val === "string") {
      val = Buffer.from(val, encoding);
    }
    if (Buffer.isBuffer(val)) {
      if (val.length === 0) {
        return -1;
      }
      return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
    } else if (typeof val === "number") {
      val = val & 255;
      if (typeof Uint8Array.prototype.indexOf === "function") {
        if (dir) {
          return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
        } else {
          return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
        }
      }
      return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
    }
    throw new TypeError("val must be string, number or Buffer");
  }
  function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
    var indexSize = 1;
    var arrLength = arr.length;
    var valLength = val.length;
    if (encoding !== undefined) {
      encoding = String(encoding).toLowerCase();
      if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
        if (arr.length < 2 || val.length < 2) {
          return -1;
        }
        indexSize = 2;
        arrLength /= 2;
        valLength /= 2;
        byteOffset /= 2;
      }
    }
    function read(buf, i) {
      if (indexSize === 1) {
        return buf[i];
      } else {
        return buf.readUInt16BE(i * indexSize);
      }
    }
    var i;
    if (dir) {
      var foundIndex = -1;
      for (i = byteOffset; i < arrLength; i++) {
        if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
          if (foundIndex === -1) foundIndex = i;
          if (i - foundIndex + 1 === valLength) return foundIndex * indexSize;
        } else {
          if (foundIndex !== -1) i -= i - foundIndex;
          foundIndex = -1;
        }
      }
    } else {
      if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
      for (i = byteOffset; i >= 0; i--) {
        var found = true;
        for (var j = 0; j < valLength; j++) {
          if (read(arr, i + j) !== read(val, j)) {
            found = false;
            break;
          }
        }
        if (found) return i;
      }
    }
    return -1;
  }
  Buffer.prototype.includes = function includes(val, byteOffset, encoding) {
    return this.indexOf(val, byteOffset, encoding) !== -1;
  };
  Buffer.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
  };
  Buffer.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
    return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
  };
  function hexWrite(buf, string, offset, length) {
    offset = Number(offset) || 0;
    var remaining = buf.length - offset;
    if (!length) {
      length = remaining;
    } else {
      length = Number(length);
      if (length > remaining) {
        length = remaining;
      }
    }
    var strLen = string.length;
    if (strLen % 2 !== 0) throw new TypeError("Invalid hex string");
    if (length > strLen / 2) {
      length = strLen / 2;
    }
    for (var i = 0; i < length; ++i) {
      var parsed = parseInt(string.substr(i * 2, 2), 16);
      if (isNaN(parsed)) return i;
      buf[offset + i] = parsed;
    }
    return i;
  }
  function utf8Write(buf, string, offset, length) {
    return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length);
  }
  function asciiWrite(buf, string, offset, length) {
    return blitBuffer(asciiToBytes(string), buf, offset, length);
  }
  function latin1Write(buf, string, offset, length) {
    return asciiWrite(buf, string, offset, length);
  }
  function base64Write(buf, string, offset, length) {
    return blitBuffer(base64ToBytes(string), buf, offset, length);
  }
  function ucs2Write(buf, string, offset, length) {
    return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length);
  }
  Buffer.prototype.write = function write(string, offset, length, encoding) {
    if (offset === undefined) {
      encoding = "utf8";
      length = this.length;
      offset = 0;
    } else if (length === undefined && typeof offset === "string") {
      encoding = offset;
      length = this.length;
      offset = 0;
    } else if (isFinite(offset)) {
      offset = offset >>> 0;
      if (isFinite(length)) {
        length = length >>> 0;
        if (encoding === undefined) encoding = "utf8";
      } else {
        encoding = length;
        length = undefined;
      }
    } else {
      throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
    }
    var remaining = this.length - offset;
    if (length === undefined || length > remaining) length = remaining;
    if (string.length > 0 && (length < 0 || offset < 0) || offset > this.length) {
      throw new RangeError("Attempt to write outside buffer bounds");
    }
    if (!encoding) encoding = "utf8";
    var loweredCase = false;
    for (; ; ) {
      switch (encoding) {
        case "hex":
          return hexWrite(this, string, offset, length);
        case "utf8":
        case "utf-8":
          return utf8Write(this, string, offset, length);
        case "ascii":
          return asciiWrite(this, string, offset, length);
        case "latin1":
        case "binary":
          return latin1Write(this, string, offset, length);
        case "base64":
          return base64Write(this, string, offset, length);
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return ucs2Write(this, string, offset, length);
        default:
          if (loweredCase) throw new TypeError("Unknown encoding: " + encoding);
          encoding = ("" + encoding).toLowerCase();
          loweredCase = true;
      }
    }
  };
  Buffer.prototype.toJSON = function toJSON() {
    return {
      type: "Buffer",
      data: Array.prototype.slice.call(this._arr || this, 0)
    };
  };
  function base64Slice(buf, start, end) {
    if (start === 0 && end === buf.length) {
      return base64.fromByteArray(buf);
    } else {
      return base64.fromByteArray(buf.slice(start, end));
    }
  }
  function utf8Slice(buf, start, end) {
    end = Math.min(buf.length, end);
    var res = [];
    var i = start;
    while (i < end) {
      var firstByte = buf[i];
      var codePoint = null;
      var bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
      if (i + bytesPerSequence <= end) {
        var secondByte, thirdByte, fourthByte, tempCodePoint;
        switch (bytesPerSequence) {
          case 1:
            if (firstByte < 128) {
              codePoint = firstByte;
            }
            break;
          case 2:
            secondByte = buf[i + 1];
            if ((secondByte & 192) === 128) {
              tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
              if (tempCodePoint > 127) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 3:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
              if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                codePoint = tempCodePoint;
              }
            }
            break;
          case 4:
            secondByte = buf[i + 1];
            thirdByte = buf[i + 2];
            fourthByte = buf[i + 3];
            if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
              tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
              if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                codePoint = tempCodePoint;
              }
            }
        }
      }
      if (codePoint === null) {
        codePoint = 65533;
        bytesPerSequence = 1;
      } else if (codePoint > 65535) {
        codePoint -= 65536;
        res.push(codePoint >>> 10 & 1023 | 55296);
        codePoint = 56320 | codePoint & 1023;
      }
      res.push(codePoint);
      i += bytesPerSequence;
    }
    return decodeCodePointsArray(res);
  }
  var MAX_ARGUMENTS_LENGTH = 4096;
  function decodeCodePointsArray(codePoints) {
    var len = codePoints.length;
    if (len <= MAX_ARGUMENTS_LENGTH) {
      return String.fromCharCode.apply(String, codePoints);
    }
    var res = "";
    var i = 0;
    while (i < len) {
      res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
    }
    return res;
  }
  function asciiSlice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i] & 127);
    }
    return ret;
  }
  function latin1Slice(buf, start, end) {
    var ret = "";
    end = Math.min(buf.length, end);
    for (var i = start; i < end; ++i) {
      ret += String.fromCharCode(buf[i]);
    }
    return ret;
  }
  function hexSlice(buf, start, end) {
    var len = buf.length;
    if (!start || start < 0) start = 0;
    if (!end || end < 0 || end > len) end = len;
    var out = "";
    for (var i = start; i < end; ++i) {
      out += toHex(buf[i]);
    }
    return out;
  }
  function utf16leSlice(buf, start, end) {
    var bytes = buf.slice(start, end);
    var res = "";
    for (var i = 0; i < bytes.length; i += 2) {
      res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
    }
    return res;
  }
  Buffer.prototype.slice = function slice(start, end) {
    var len = this.length;
    start = ~~start;
    end = end === undefined ? len : ~~end;
    if (start < 0) {
      start += len;
      if (start < 0) start = 0;
    } else if (start > len) {
      start = len;
    }
    if (end < 0) {
      end += len;
      if (end < 0) end = 0;
    } else if (end > len) {
      end = len;
    }
    if (end < start) end = start;
    var newBuf = this.subarray(start, end);
    newBuf.__proto__ = Buffer.prototype;
    return newBuf;
  };
  function checkOffset(offset, ext, length) {
    if (offset % 1 !== 0 || offset < 0) throw new RangeError("offset is not uint");
    if (offset + ext > length) throw new RangeError("Trying to access beyond buffer length");
  }
  Buffer.prototype.readUIntLE = function readUIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    return val;
  };
  Buffer.prototype.readUIntBE = function readUIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      checkOffset(offset, byteLength, this.length);
    }
    var val = this[offset + --byteLength];
    var mul = 1;
    while (byteLength > 0 && (mul *= 256)) {
      val += this[offset + --byteLength] * mul;
    }
    return val;
  };
  Buffer.prototype.readUInt8 = function readUInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    return this[offset];
  };
  Buffer.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] | this[offset + 1] << 8;
  };
  Buffer.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    return this[offset] << 8 | this[offset + 1];
  };
  Buffer.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
  };
  Buffer.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
  };
  Buffer.prototype.readIntLE = function readIntLE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var val = this[offset];
    var mul = 1;
    var i = 0;
    while (++i < byteLength && (mul *= 256)) {
      val += this[offset + i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
  };
  Buffer.prototype.readIntBE = function readIntBE(offset, byteLength, noAssert) {
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) checkOffset(offset, byteLength, this.length);
    var i = byteLength;
    var mul = 1;
    var val = this[offset + --i];
    while (i > 0 && (mul *= 256)) {
      val += this[offset + --i] * mul;
    }
    mul *= 128;
    if (val >= mul) val -= Math.pow(2, 8 * byteLength);
    return val;
  };
  Buffer.prototype.readInt8 = function readInt8(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 1, this.length);
    if (!(this[offset] & 128)) return this[offset];
    return (255 - this[offset] + 1) * -1;
  };
  Buffer.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset] | this[offset + 1] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 2, this.length);
    var val = this[offset + 1] | this[offset] << 8;
    return val & 32768 ? val | 4294901760 : val;
  };
  Buffer.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
  };
  Buffer.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
  };
  Buffer.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, true, 23, 4);
  };
  Buffer.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 4, this.length);
    return ieee754.read(this, offset, false, 23, 4);
  };
  Buffer.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, true, 52, 8);
  };
  Buffer.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
    offset = offset >>> 0;
    if (!noAssert) checkOffset(offset, 8, this.length);
    return ieee754.read(this, offset, false, 52, 8);
  };
  function checkInt(buf, value, offset, ext, max, min) {
    if (!Buffer.isBuffer(buf)) throw new TypeError("\"buffer\" argument must be a Buffer instance");
    if (value > max || value < min) throw new RangeError("\"value\" argument is out of bounds");
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
  }
  Buffer.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    var mul = 1;
    var i = 0;
    this[offset] = value & 255;
    while (++i < byteLength && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    byteLength = byteLength >>> 0;
    if (!noAssert) {
      var maxBytes = Math.pow(2, 8 * byteLength) - 1;
      checkInt(this, value, offset, byteLength, maxBytes, 0);
    }
    var i = byteLength - 1;
    var mul = 1;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      this[offset + i] = value / mul & 255;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 255, 0);
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 65535, 0);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset + 3] = value >>> 24;
    this[offset + 2] = value >>> 16;
    this[offset + 1] = value >>> 8;
    this[offset] = value & 255;
    return offset + 4;
  };
  Buffer.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 4294967295, 0);
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  Buffer.prototype.writeIntLE = function writeIntLE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = 0;
    var mul = 1;
    var sub = 0;
    this[offset] = value & 255;
    while (++i < byteLength && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeIntBE = function writeIntBE(value, offset, byteLength, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      var limit = Math.pow(2, 8 * byteLength - 1);
      checkInt(this, value, offset, byteLength, limit - 1, -limit);
    }
    var i = byteLength - 1;
    var mul = 1;
    var sub = 0;
    this[offset + i] = value & 255;
    while (--i >= 0 && (mul *= 256)) {
      if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
        sub = 1;
      }
      this[offset + i] = (value / mul >> 0) - sub & 255;
    }
    return offset + byteLength;
  };
  Buffer.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 1, 127, -128);
    if (value < 0) value = 255 + value + 1;
    this[offset] = value & 255;
    return offset + 1;
  };
  Buffer.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    return offset + 2;
  };
  Buffer.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 2, 32767, -32768);
    this[offset] = value >>> 8;
    this[offset + 1] = value & 255;
    return offset + 2;
  };
  Buffer.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    this[offset] = value & 255;
    this[offset + 1] = value >>> 8;
    this[offset + 2] = value >>> 16;
    this[offset + 3] = value >>> 24;
    return offset + 4;
  };
  Buffer.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) checkInt(this, value, offset, 4, 2147483647, -2147483648);
    if (value < 0) value = 4294967295 + value + 1;
    this[offset] = value >>> 24;
    this[offset + 1] = value >>> 16;
    this[offset + 2] = value >>> 8;
    this[offset + 3] = value & 255;
    return offset + 4;
  };
  function checkIEEE754(buf, value, offset, ext, max, min) {
    if (offset + ext > buf.length) throw new RangeError("Index out of range");
    if (offset < 0) throw new RangeError("Index out of range");
  }
  function writeFloat(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38, -3.4028234663852886e+38);
    }
    ieee754.write(buf, value, offset, littleEndian, 23, 4);
    return offset + 4;
  }
  Buffer.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
    return writeFloat(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
    return writeFloat(this, value, offset, false, noAssert);
  };
  function writeDouble(buf, value, offset, littleEndian, noAssert) {
    value = +value;
    offset = offset >>> 0;
    if (!noAssert) {
      checkIEEE754(buf, value, offset, 8, 1.7976931348623157e+308, -1.7976931348623157e+308);
    }
    ieee754.write(buf, value, offset, littleEndian, 52, 8);
    return offset + 8;
  }
  Buffer.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
    return writeDouble(this, value, offset, true, noAssert);
  };
  Buffer.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
    return writeDouble(this, value, offset, false, noAssert);
  };
  Buffer.prototype.copy = function copy(target, targetStart, start, end) {
    if (!start) start = 0;
    if (!end && end !== 0) end = this.length;
    if (targetStart >= target.length) targetStart = target.length;
    if (!targetStart) targetStart = 0;
    if (end > 0 && end < start) end = start;
    if (end === start) return 0;
    if (target.length === 0 || this.length === 0) return 0;
    if (targetStart < 0) {
      throw new RangeError("targetStart out of bounds");
    }
    if (start < 0 || start >= this.length) throw new RangeError("sourceStart out of bounds");
    if (end < 0) throw new RangeError("sourceEnd out of bounds");
    if (end > this.length) end = this.length;
    if (target.length - targetStart < end - start) {
      end = target.length - targetStart + start;
    }
    var len = end - start;
    var i;
    if (this === target && start < targetStart && targetStart < end) {
      for (i = len - 1; i >= 0; --i) {
        target[i + targetStart] = this[i + start];
      }
    } else if (len < 1000) {
      for (i = 0; i < len; ++i) {
        target[i + targetStart] = this[i + start];
      }
    } else {
      Uint8Array.prototype.set.call(target, this.subarray(start, start + len), targetStart);
    }
    return len;
  };
  Buffer.prototype.fill = function fill(val, start, end, encoding) {
    if (typeof val === "string") {
      if (typeof start === "string") {
        encoding = start;
        start = 0;
        end = this.length;
      } else if (typeof end === "string") {
        encoding = end;
        end = this.length;
      }
      if (val.length === 1) {
        var code = val.charCodeAt(0);
        if (code < 256) {
          val = code;
        }
      }
      if (encoding !== undefined && typeof encoding !== "string") {
        throw new TypeError("encoding must be a string");
      }
      if (typeof encoding === "string" && !Buffer.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
    } else if (typeof val === "number") {
      val = val & 255;
    }
    if (start < 0 || this.length < start || this.length < end) {
      throw new RangeError("Out of range index");
    }
    if (end <= start) {
      return this;
    }
    start = start >>> 0;
    end = end === undefined ? this.length : end >>> 0;
    if (!val) val = 0;
    var i;
    if (typeof val === "number") {
      for (i = start; i < end; ++i) {
        this[i] = val;
      }
    } else {
      var bytes = Buffer.isBuffer(val) ? val : new Buffer(val, encoding);
      var len = bytes.length;
      for (i = 0; i < end - start; ++i) {
        this[i + start] = bytes[i % len];
      }
    }
    return this;
  };
  var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
  function base64clean(str) {
    str = stringtrim(str).replace(INVALID_BASE64_RE, "");
    if (str.length < 2) return "";
    while (str.length % 4 !== 0) {
      str = str + "=";
    }
    return str;
  }
  function stringtrim(str) {
    if (str.trim) return str.trim();
    return str.replace(/^\s+|\s+$/g, "");
  }
  function toHex(n) {
    if (n < 16) return "0" + n.toString(16);
    return n.toString(16);
  }
  function utf8ToBytes(string, units) {
    units = units || Infinity;
    var codePoint;
    var length = string.length;
    var leadSurrogate = null;
    var bytes = [];
    for (var i = 0; i < length; ++i) {
      codePoint = string.charCodeAt(i);
      if (codePoint > 55295 && codePoint < 57344) {
        if (!leadSurrogate) {
          if (codePoint > 56319) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          } else if (i + 1 === length) {
            if ((units -= 3) > -1) bytes.push(239, 191, 189);
            continue;
          }
          leadSurrogate = codePoint;
          continue;
        }
        if (codePoint < 56320) {
          if ((units -= 3) > -1) bytes.push(239, 191, 189);
          leadSurrogate = codePoint;
          continue;
        }
        codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
      } else if (leadSurrogate) {
        if ((units -= 3) > -1) bytes.push(239, 191, 189);
      }
      leadSurrogate = null;
      if (codePoint < 128) {
        if ((units -= 1) < 0) break;
        bytes.push(codePoint);
      } else if (codePoint < 2048) {
        if ((units -= 2) < 0) break;
        bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
      } else if (codePoint < 65536) {
        if ((units -= 3) < 0) break;
        bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else if (codePoint < 1114112) {
        if ((units -= 4) < 0) break;
        bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
      } else {
        throw new Error("Invalid code point");
      }
    }
    return bytes;
  }
  function asciiToBytes(str) {
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      byteArray.push(str.charCodeAt(i) & 255);
    }
    return byteArray;
  }
  function utf16leToBytes(str, units) {
    var c, hi, lo;
    var byteArray = [];
    for (var i = 0; i < str.length; ++i) {
      if ((units -= 2) < 0) break;
      c = str.charCodeAt(i);
      hi = c >> 8;
      lo = c % 256;
      byteArray.push(lo);
      byteArray.push(hi);
    }
    return byteArray;
  }
  function base64ToBytes(str) {
    return base64.toByteArray(base64clean(str));
  }
  function blitBuffer(src, dst, offset, length) {
    for (var i = 0; i < length; ++i) {
      if (i + offset >= dst.length || i >= src.length) break;
      dst[i + offset] = src[i];
    }
    return i;
  }
  function isnan(val) {
    return val !== val;
  }
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("date-fns", {}, function(___scope___){
___scope___.file("locale/en/index.js", function(exports, require, module){
var buildDistanceInWordsLocale = require("./build_distance_in_words_locale/index.js");
var buildFormatLocale = require("./build_format_locale/index.js");
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
};

});
___scope___.file("locale/en/build_distance_in_words_locale/index.js", function(exports, require, module){
function buildDistanceInWordsLocale() {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      one: "less than a second",
      other: "less than {{count}} seconds"
    },
    xSeconds: {
      one: "1 second",
      other: "{{count}} seconds"
    },
    halfAMinute: "half a minute",
    lessThanXMinutes: {
      one: "less than a minute",
      other: "less than {{count}} minutes"
    },
    xMinutes: {
      one: "1 minute",
      other: "{{count}} minutes"
    },
    aboutXHours: {
      one: "about 1 hour",
      other: "about {{count}} hours"
    },
    xHours: {
      one: "1 hour",
      other: "{{count}} hours"
    },
    xDays: {
      one: "1 day",
      other: "{{count}} days"
    },
    aboutXMonths: {
      one: "about 1 month",
      other: "about {{count}} months"
    },
    xMonths: {
      one: "1 month",
      other: "{{count}} months"
    },
    aboutXYears: {
      one: "about 1 year",
      other: "about {{count}} years"
    },
    xYears: {
      one: "1 year",
      other: "{{count}} years"
    },
    overXYears: {
      one: "over 1 year",
      other: "over {{count}} years"
    },
    almostXYears: {
      one: "almost 1 year",
      other: "almost {{count}} years"
    }
  };
  function localize(token, count, options) {
    options = options || ({});
    var result;
    if (typeof distanceInWordsLocale[token] === "string") {
      result = distanceInWordsLocale[token];
    } else if (count === 1) {
      result = distanceInWordsLocale[token].one;
    } else {
      result = distanceInWordsLocale[token].other.replace("{{count}}", count);
    }
    if (options.addSuffix) {
      if (options.comparison > 0) {
        return "in " + result;
      } else {
        return result + " ago";
      }
    }
    return result;
  }
  return {
    localize: localize
  };
}
module.exports = buildDistanceInWordsLocale;

});
___scope___.file("locale/en/build_format_locale/index.js", function(exports, require, module){
var buildFormattingTokensRegExp = require("../../_lib/build_formatting_tokens_reg_exp/index.js");
function buildFormatLocale() {
  var months3char = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  var monthsFull = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var weekdays2char = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  var weekdays3char = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  var weekdaysFull = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var meridiemUppercase = ["AM", "PM"];
  var meridiemLowercase = ["am", "pm"];
  var meridiemFull = ["a.m.", "p.m."];
  var formatters = {
    "MMM": function (date) {
      return months3char[date.getMonth()];
    },
    "MMMM": function (date) {
      return monthsFull[date.getMonth()];
    },
    "dd": function (date) {
      return weekdays2char[date.getDay()];
    },
    "ddd": function (date) {
      return weekdays3char[date.getDay()];
    },
    "dddd": function (date) {
      return weekdaysFull[date.getDay()];
    },
    "A": function (date) {
      return date.getHours() / 12 >= 1 ? meridiemUppercase[1] : meridiemUppercase[0];
    },
    "a": function (date) {
      return date.getHours() / 12 >= 1 ? meridiemLowercase[1] : meridiemLowercase[0];
    },
    "aa": function (date) {
      return date.getHours() / 12 >= 1 ? meridiemFull[1] : meridiemFull[0];
    }
  };
  var ordinalFormatters = ["M", "D", "DDD", "d", "Q", "W"];
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + "o"] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date));
    };
  });
  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  };
}
function ordinal(number) {
  var rem100 = number % 100;
  if (rem100 > 20 || rem100 < 10) {
    switch (rem100 % 10) {
      case 1:
        return number + "st";
      case 2:
        return number + "nd";
      case 3:
        return number + "rd";
    }
  }
  return number + "th";
}
module.exports = buildFormatLocale;

});
___scope___.file("locale/_lib/build_formatting_tokens_reg_exp/index.js", function(exports, require, module){
var commonFormatterKeys = ["M", "MM", "Q", "D", "DD", "DDD", "DDDD", "d", "E", "W", "WW", "YY", "YYYY", "GG", "GGGG", "H", "HH", "h", "hh", "m", "mm", "s", "ss", "S", "SS", "SSS", "Z", "ZZ", "X", "x"];
function buildFormattingTokensRegExp(formatters) {
  var formatterKeys = [];
  for (var key in formatters) {
    if (formatters.hasOwnProperty(key)) {
      formatterKeys.push(key);
    }
  }
  var formattingTokens = commonFormatterKeys.concat(formatterKeys).sort().reverse();
  var formattingTokensRegExp = new RegExp("(\\[[^\\[]*\\])|(\\\\)?" + "(" + formattingTokens.join("|") + "|.)", "g");
  return formattingTokensRegExp;
}
module.exports = buildFormattingTokensRegExp;

});
___scope___.file("locale/de/index.js", function(exports, require, module){
var buildDistanceInWordsLocale = require("./build_distance_in_words_locale/index.js");
var buildFormatLocale = require("./build_format_locale/index.js");
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
};

});
___scope___.file("locale/de/build_distance_in_words_locale/index.js", function(exports, require, module){
function buildDistanceInWordsLocale() {
  var distanceInWordsLocale = {
    lessThanXSeconds: {
      standalone: {
        one: "weniger als eine Sekunde",
        other: "weniger als {{count}} Sekunden"
      },
      withPreposition: {
        one: "weniger als einer Sekunde",
        other: "weniger als {{count}} Sekunden"
      }
    },
    xSeconds: {
      standalone: {
        one: "eine Sekunde",
        other: "{{count}} Sekunden"
      },
      withPreposition: {
        one: "einer Sekunde",
        other: "{{count}} Sekunden"
      }
    },
    halfAMinute: {
      standalone: "eine halbe Minute",
      withPreposition: "einer halben Minute"
    },
    lessThanXMinutes: {
      standalone: {
        one: "weniger als eine Minute",
        other: "weniger als {{count}} Minuten"
      },
      withPreposition: {
        one: "weniger als einer Minute",
        other: "weniger als {{count}} Minuten"
      }
    },
    xMinutes: {
      standalone: {
        one: "eine Minute",
        other: "{{count}} Minuten"
      },
      withPreposition: {
        one: "einer Minute",
        other: "{{count}} Minuten"
      }
    },
    aboutXHours: {
      standalone: {
        one: "etwa eine Stunde",
        other: "etwa {{count}} Stunden"
      },
      withPreposition: {
        one: "etwa einer Stunde",
        other: "etwa {{count}} Stunden"
      }
    },
    xHours: {
      standalone: {
        one: "eine Stunde",
        other: "{{count}} Stunden"
      },
      withPreposition: {
        one: "einer Stunde",
        other: "{{count}} Stunden"
      }
    },
    xDays: {
      standalone: {
        one: "ein Tag",
        other: "{{count}} Tage"
      },
      withPreposition: {
        one: "einem Tag",
        other: "{{count}} Tagen"
      }
    },
    aboutXMonths: {
      standalone: {
        one: "etwa ein Monat",
        other: "etwa {{count}} Monate"
      },
      withPreposition: {
        one: "etwa einem Monat",
        other: "etwa {{count}} Monaten"
      }
    },
    xMonths: {
      standalone: {
        one: "ein Monat",
        other: "{{count}} Monate"
      },
      withPreposition: {
        one: "einem Monat",
        other: "{{count}} Monaten"
      }
    },
    aboutXYears: {
      standalone: {
        one: "etwa ein Jahr",
        other: "etwa {{count}} Jahre"
      },
      withPreposition: {
        one: "etwa einem Jahr",
        other: "etwa {{count}} Jahren"
      }
    },
    xYears: {
      standalone: {
        one: "ein Jahr",
        other: "{{count}} Jahre"
      },
      withPreposition: {
        one: "einem Jahr",
        other: "{{count}} Jahren"
      }
    },
    overXYears: {
      standalone: {
        one: "mehr als ein Jahr",
        other: "mehr als {{count}} Jahre"
      },
      withPreposition: {
        one: "mehr als einem Jahr",
        other: "mehr als {{count}} Jahren"
      }
    },
    almostXYears: {
      standalone: {
        one: "fast ein Jahr",
        other: "fast {{count}} Jahre"
      },
      withPreposition: {
        one: "fast einem Jahr",
        other: "fast {{count}} Jahren"
      }
    }
  };
  function localize(token, count, options) {
    options = options || ({});
    var usageGroup = options.addSuffix ? distanceInWordsLocale[token].withPreposition : distanceInWordsLocale[token].standalone;
    var result;
    if (typeof usageGroup === "string") {
      result = usageGroup;
    } else if (count === 1) {
      result = usageGroup.one;
    } else {
      result = usageGroup.other.replace("{{count}}", count);
    }
    if (options.addSuffix) {
      if (options.comparison > 0) {
        return "in " + result;
      } else {
        return "vor " + result;
      }
    }
    return result;
  }
  return {
    localize: localize
  };
}
module.exports = buildDistanceInWordsLocale;

});
___scope___.file("locale/de/build_format_locale/index.js", function(exports, require, module){
var buildFormattingTokensRegExp = require("../../_lib/build_formatting_tokens_reg_exp/index.js");
function buildFormatLocale() {
  var months3char = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
  var monthsFull = ["Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"];
  var weekdays2char = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"];
  var weekdays3char = ["Son", "Mon", "Die", "Mit", "Don", "Fre", "Sam"];
  var weekdaysFull = ["Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"];
  var meridiemUppercase = ["AM", "PM"];
  var meridiemLowercase = ["am", "pm"];
  var meridiemFull = ["a.m.", "p.m."];
  var formatters = {
    "MMM": function (date) {
      return months3char[date.getMonth()];
    },
    "MMMM": function (date) {
      return monthsFull[date.getMonth()];
    },
    "dd": function (date) {
      return weekdays2char[date.getDay()];
    },
    "ddd": function (date) {
      return weekdays3char[date.getDay()];
    },
    "dddd": function (date) {
      return weekdaysFull[date.getDay()];
    },
    "A": function (date) {
      return date.getHours() / 12 >= 1 ? meridiemUppercase[1] : meridiemUppercase[0];
    },
    "a": function (date) {
      return date.getHours() / 12 >= 1 ? meridiemLowercase[1] : meridiemLowercase[0];
    },
    "aa": function (date) {
      return date.getHours() / 12 >= 1 ? meridiemFull[1] : meridiemFull[0];
    }
  };
  var ordinalFormatters = ["M", "D", "DDD", "d", "Q", "W"];
  ordinalFormatters.forEach(function (formatterToken) {
    formatters[formatterToken + "o"] = function (date, formatters) {
      return ordinal(formatters[formatterToken](date));
    };
  });
  return {
    formatters: formatters,
    formattingTokensRegExp: buildFormattingTokensRegExp(formatters)
  };
}
function ordinal(number) {
  return number + ".";
}
module.exports = buildFormatLocale;

});
___scope___.file("index.js", function(exports, require, module){
module.exports = {
  addDays: require("./add_days/index.js"),
  addHours: require("./add_hours/index.js"),
  addISOYears: require("./add_iso_years/index.js"),
  addMilliseconds: require("./add_milliseconds/index.js"),
  addMinutes: require("./add_minutes/index.js"),
  addMonths: require("./add_months/index.js"),
  addQuarters: require("./add_quarters/index.js"),
  addSeconds: require("./add_seconds/index.js"),
  addWeeks: require("./add_weeks/index.js"),
  addYears: require("./add_years/index.js"),
  areRangesOverlapping: require("./are_ranges_overlapping/index.js"),
  closestIndexTo: require("./closest_index_to/index.js"),
  closestTo: require("./closest_to/index.js"),
  compareAsc: require("./compare_asc/index.js"),
  compareDesc: require("./compare_desc/index.js"),
  differenceInCalendarDays: require("./difference_in_calendar_days/index.js"),
  differenceInCalendarISOWeeks: require("./difference_in_calendar_iso_weeks/index.js"),
  differenceInCalendarISOYears: require("./difference_in_calendar_iso_years/index.js"),
  differenceInCalendarMonths: require("./difference_in_calendar_months/index.js"),
  differenceInCalendarQuarters: require("./difference_in_calendar_quarters/index.js"),
  differenceInCalendarWeeks: require("./difference_in_calendar_weeks/index.js"),
  differenceInCalendarYears: require("./difference_in_calendar_years/index.js"),
  differenceInDays: require("./difference_in_days/index.js"),
  differenceInHours: require("./difference_in_hours/index.js"),
  differenceInISOYears: require("./difference_in_iso_years/index.js"),
  differenceInMilliseconds: require("./difference_in_milliseconds/index.js"),
  differenceInMinutes: require("./difference_in_minutes/index.js"),
  differenceInMonths: require("./difference_in_months/index.js"),
  differenceInQuarters: require("./difference_in_quarters/index.js"),
  differenceInSeconds: require("./difference_in_seconds/index.js"),
  differenceInWeeks: require("./difference_in_weeks/index.js"),
  differenceInYears: require("./difference_in_years/index.js"),
  distanceInWords: require("./distance_in_words/index.js"),
  distanceInWordsStrict: require("./distance_in_words_strict/index.js"),
  distanceInWordsToNow: require("./distance_in_words_to_now/index.js"),
  eachDay: require("./each_day/index.js"),
  endOfDay: require("./end_of_day/index.js"),
  endOfHour: require("./end_of_hour/index.js"),
  endOfISOWeek: require("./end_of_iso_week/index.js"),
  endOfISOYear: require("./end_of_iso_year/index.js"),
  endOfMinute: require("./end_of_minute/index.js"),
  endOfMonth: require("./end_of_month/index.js"),
  endOfQuarter: require("./end_of_quarter/index.js"),
  endOfSecond: require("./end_of_second/index.js"),
  endOfToday: require("./end_of_today/index.js"),
  endOfTomorrow: require("./end_of_tomorrow/index.js"),
  endOfWeek: require("./end_of_week/index.js"),
  endOfYear: require("./end_of_year/index.js"),
  endOfYesterday: require("./end_of_yesterday/index.js"),
  format: require("./format/index.js"),
  getDate: require("./get_date/index.js"),
  getDay: require("./get_day/index.js"),
  getDayOfYear: require("./get_day_of_year/index.js"),
  getDaysInMonth: require("./get_days_in_month/index.js"),
  getDaysInYear: require("./get_days_in_year/index.js"),
  getHours: require("./get_hours/index.js"),
  getISODay: require("./get_iso_day/index.js"),
  getISOWeek: require("./get_iso_week/index.js"),
  getISOWeeksInYear: require("./get_iso_weeks_in_year/index.js"),
  getISOYear: require("./get_iso_year/index.js"),
  getMilliseconds: require("./get_milliseconds/index.js"),
  getMinutes: require("./get_minutes/index.js"),
  getMonth: require("./get_month/index.js"),
  getOverlappingDaysInRanges: require("./get_overlapping_days_in_ranges/index.js"),
  getQuarter: require("./get_quarter/index.js"),
  getSeconds: require("./get_seconds/index.js"),
  getTime: require("./get_time/index.js"),
  getYear: require("./get_year/index.js"),
  isAfter: require("./is_after/index.js"),
  isBefore: require("./is_before/index.js"),
  isDate: require("./is_date/index.js"),
  isEqual: require("./is_equal/index.js"),
  isFirstDayOfMonth: require("./is_first_day_of_month/index.js"),
  isFriday: require("./is_friday/index.js"),
  isFuture: require("./is_future/index.js"),
  isLastDayOfMonth: require("./is_last_day_of_month/index.js"),
  isLeapYear: require("./is_leap_year/index.js"),
  isMonday: require("./is_monday/index.js"),
  isPast: require("./is_past/index.js"),
  isSameDay: require("./is_same_day/index.js"),
  isSameHour: require("./is_same_hour/index.js"),
  isSameISOWeek: require("./is_same_iso_week/index.js"),
  isSameISOYear: require("./is_same_iso_year/index.js"),
  isSameMinute: require("./is_same_minute/index.js"),
  isSameMonth: require("./is_same_month/index.js"),
  isSameQuarter: require("./is_same_quarter/index.js"),
  isSameSecond: require("./is_same_second/index.js"),
  isSameWeek: require("./is_same_week/index.js"),
  isSameYear: require("./is_same_year/index.js"),
  isSaturday: require("./is_saturday/index.js"),
  isSunday: require("./is_sunday/index.js"),
  isThisHour: require("./is_this_hour/index.js"),
  isThisISOWeek: require("./is_this_iso_week/index.js"),
  isThisISOYear: require("./is_this_iso_year/index.js"),
  isThisMinute: require("./is_this_minute/index.js"),
  isThisMonth: require("./is_this_month/index.js"),
  isThisQuarter: require("./is_this_quarter/index.js"),
  isThisSecond: require("./is_this_second/index.js"),
  isThisWeek: require("./is_this_week/index.js"),
  isThisYear: require("./is_this_year/index.js"),
  isThursday: require("./is_thursday/index.js"),
  isToday: require("./is_today/index.js"),
  isTomorrow: require("./is_tomorrow/index.js"),
  isTuesday: require("./is_tuesday/index.js"),
  isValid: require("./is_valid/index.js"),
  isWednesday: require("./is_wednesday/index.js"),
  isWeekend: require("./is_weekend/index.js"),
  isWithinRange: require("./is_within_range/index.js"),
  isYesterday: require("./is_yesterday/index.js"),
  lastDayOfISOWeek: require("./last_day_of_iso_week/index.js"),
  lastDayOfISOYear: require("./last_day_of_iso_year/index.js"),
  lastDayOfMonth: require("./last_day_of_month/index.js"),
  lastDayOfQuarter: require("./last_day_of_quarter/index.js"),
  lastDayOfWeek: require("./last_day_of_week/index.js"),
  lastDayOfYear: require("./last_day_of_year/index.js"),
  max: require("./max/index.js"),
  min: require("./min/index.js"),
  parse: require("./parse/index.js"),
  setDate: require("./set_date/index.js"),
  setDay: require("./set_day/index.js"),
  setDayOfYear: require("./set_day_of_year/index.js"),
  setHours: require("./set_hours/index.js"),
  setISODay: require("./set_iso_day/index.js"),
  setISOWeek: require("./set_iso_week/index.js"),
  setISOYear: require("./set_iso_year/index.js"),
  setMilliseconds: require("./set_milliseconds/index.js"),
  setMinutes: require("./set_minutes/index.js"),
  setMonth: require("./set_month/index.js"),
  setQuarter: require("./set_quarter/index.js"),
  setSeconds: require("./set_seconds/index.js"),
  setYear: require("./set_year/index.js"),
  startOfDay: require("./start_of_day/index.js"),
  startOfHour: require("./start_of_hour/index.js"),
  startOfISOWeek: require("./start_of_iso_week/index.js"),
  startOfISOYear: require("./start_of_iso_year/index.js"),
  startOfMinute: require("./start_of_minute/index.js"),
  startOfMonth: require("./start_of_month/index.js"),
  startOfQuarter: require("./start_of_quarter/index.js"),
  startOfSecond: require("./start_of_second/index.js"),
  startOfToday: require("./start_of_today/index.js"),
  startOfTomorrow: require("./start_of_tomorrow/index.js"),
  startOfWeek: require("./start_of_week/index.js"),
  startOfYear: require("./start_of_year/index.js"),
  startOfYesterday: require("./start_of_yesterday/index.js"),
  subDays: require("./sub_days/index.js"),
  subHours: require("./sub_hours/index.js"),
  subISOYears: require("./sub_iso_years/index.js"),
  subMilliseconds: require("./sub_milliseconds/index.js"),
  subMinutes: require("./sub_minutes/index.js"),
  subMonths: require("./sub_months/index.js"),
  subQuarters: require("./sub_quarters/index.js"),
  subSeconds: require("./sub_seconds/index.js"),
  subWeeks: require("./sub_weeks/index.js"),
  subYears: require("./sub_years/index.js")
};

});
___scope___.file("add_days/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function addDays(dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate);
  var amount = Number(dirtyAmount);
  date.setDate(date.getDate() + amount);
  return date;
}
module.exports = addDays;

});
___scope___.file("add_hours/index.js", function(exports, require, module){
var addMilliseconds = require("../add_milliseconds/index.js");
var MILLISECONDS_IN_HOUR = 3600000;
function addHours(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_HOUR);
}
module.exports = addHours;

});
___scope___.file("add_iso_years/index.js", function(exports, require, module){
var getISOYear = require("../get_iso_year/index.js");
var setISOYear = require("../set_iso_year/index.js");
function addISOYears(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return setISOYear(dirtyDate, getISOYear(dirtyDate) + amount);
}
module.exports = addISOYears;

});
___scope___.file("add_milliseconds/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function addMilliseconds(dirtyDate, dirtyAmount) {
  var timestamp = parse(dirtyDate).getTime();
  var amount = Number(dirtyAmount);
  return new Date(timestamp + amount);
}
module.exports = addMilliseconds;

});
___scope___.file("add_minutes/index.js", function(exports, require, module){
var addMilliseconds = require("../add_milliseconds/index.js");
var MILLISECONDS_IN_MINUTE = 60000;
function addMinutes(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * MILLISECONDS_IN_MINUTE);
}
module.exports = addMinutes;

});
___scope___.file("add_months/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var getDaysInMonth = require("../get_days_in_month/index.js");
function addMonths(dirtyDate, dirtyAmount) {
  var date = parse(dirtyDate);
  var amount = Number(dirtyAmount);
  var desiredMonth = date.getMonth() + amount;
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(date.getFullYear(), desiredMonth, 1);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  date.setMonth(desiredMonth, Math.min(daysInMonth, date.getDate()));
  return date;
}
module.exports = addMonths;

});
___scope___.file("add_quarters/index.js", function(exports, require, module){
var addMonths = require("../add_months/index.js");
function addQuarters(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  var months = amount * 3;
  return addMonths(dirtyDate, months);
}
module.exports = addQuarters;

});
___scope___.file("add_seconds/index.js", function(exports, require, module){
var addMilliseconds = require("../add_milliseconds/index.js");
function addSeconds(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMilliseconds(dirtyDate, amount * 1000);
}
module.exports = addSeconds;

});
___scope___.file("add_weeks/index.js", function(exports, require, module){
var addDays = require("../add_days/index.js");
function addWeeks(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  var days = amount * 7;
  return addDays(dirtyDate, days);
}
module.exports = addWeeks;

});
___scope___.file("add_years/index.js", function(exports, require, module){
var addMonths = require("../add_months/index.js");
function addYears(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMonths(dirtyDate, amount * 12);
}
module.exports = addYears;

});
___scope___.file("are_ranges_overlapping/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function areRangesOverlapping(dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
  var initialStartTime = parse(dirtyInitialRangeStartDate).getTime();
  var initialEndTime = parse(dirtyInitialRangeEndDate).getTime();
  var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime();
  var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime();
  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error("The start of the range cannot be after the end of the range");
  }
  return initialStartTime < comparedEndTime && comparedStartTime < initialEndTime;
}
module.exports = areRangesOverlapping;

});
___scope___.file("closest_index_to/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function closestIndexTo(dirtyDateToCompare, dirtyDatesArray) {
  if (!(dirtyDatesArray instanceof Array)) {
    throw new TypeError(toString.call(dirtyDatesArray) + " is not an instance of Array");
  }
  var dateToCompare = parse(dirtyDateToCompare);
  var timeToCompare = dateToCompare.getTime();
  var result;
  var minDistance;
  dirtyDatesArray.forEach(function (dirtyDate, index) {
    var currentDate = parse(dirtyDate);
    var distance = Math.abs(timeToCompare - currentDate.getTime());
    if (result === undefined || distance < minDistance) {
      result = index;
      minDistance = distance;
    }
  });
  return result;
}
module.exports = closestIndexTo;

});
___scope___.file("closest_to/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function closestTo(dirtyDateToCompare, dirtyDatesArray) {
  if (!(dirtyDatesArray instanceof Array)) {
    throw new TypeError(toString.call(dirtyDatesArray) + " is not an instance of Array");
  }
  var dateToCompare = parse(dirtyDateToCompare);
  var timeToCompare = dateToCompare.getTime();
  var result;
  var minDistance;
  dirtyDatesArray.forEach(function (dirtyDate) {
    var currentDate = parse(dirtyDate);
    var distance = Math.abs(timeToCompare - currentDate.getTime());
    if (result === undefined || distance < minDistance) {
      result = currentDate;
      minDistance = distance;
    }
  });
  return result;
}
module.exports = closestTo;

});
___scope___.file("compare_asc/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function compareAsc(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var timeLeft = dateLeft.getTime();
  var dateRight = parse(dirtyDateRight);
  var timeRight = dateRight.getTime();
  if (timeLeft < timeRight) {
    return -1;
  } else if (timeLeft > timeRight) {
    return 1;
  } else {
    return 0;
  }
}
module.exports = compareAsc;

});
___scope___.file("compare_desc/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function compareDesc(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var timeLeft = dateLeft.getTime();
  var dateRight = parse(dirtyDateRight);
  var timeRight = dateRight.getTime();
  if (timeLeft > timeRight) {
    return -1;
  } else if (timeLeft < timeRight) {
    return 1;
  } else {
    return 0;
  }
}
module.exports = compareDesc;

});
___scope___.file("difference_in_calendar_days/index.js", function(exports, require, module){
var startOfDay = require("../start_of_day/index.js");
var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_DAY = 86400000;
function differenceInCalendarDays(dirtyDateLeft, dirtyDateRight) {
  var startOfDayLeft = startOfDay(dirtyDateLeft);
  var startOfDayRight = startOfDay(dirtyDateRight);
  var timestampLeft = startOfDayLeft.getTime() - startOfDayLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfDayRight.getTime() - startOfDayRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_DAY);
}
module.exports = differenceInCalendarDays;

});
___scope___.file("difference_in_calendar_iso_weeks/index.js", function(exports, require, module){
var startOfISOWeek = require("../start_of_iso_week/index.js");
var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_WEEK = 604800000;
function differenceInCalendarISOWeeks(dirtyDateLeft, dirtyDateRight) {
  var startOfISOWeekLeft = startOfISOWeek(dirtyDateLeft);
  var startOfISOWeekRight = startOfISOWeek(dirtyDateRight);
  var timestampLeft = startOfISOWeekLeft.getTime() - startOfISOWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfISOWeekRight.getTime() - startOfISOWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK);
}
module.exports = differenceInCalendarISOWeeks;

});
___scope___.file("difference_in_calendar_iso_years/index.js", function(exports, require, module){
var getISOYear = require("../get_iso_year/index.js");
function differenceInCalendarISOYears(dirtyDateLeft, dirtyDateRight) {
  return getISOYear(dirtyDateLeft) - getISOYear(dirtyDateRight);
}
module.exports = differenceInCalendarISOYears;

});
___scope___.file("difference_in_calendar_months/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function differenceInCalendarMonths(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var monthDiff = dateLeft.getMonth() - dateRight.getMonth();
  return yearDiff * 12 + monthDiff;
}
module.exports = differenceInCalendarMonths;

});
___scope___.file("difference_in_calendar_quarters/index.js", function(exports, require, module){
var getQuarter = require("../get_quarter/index.js");
var parse = require("../parse/index.js");
function differenceInCalendarQuarters(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  var yearDiff = dateLeft.getFullYear() - dateRight.getFullYear();
  var quarterDiff = getQuarter(dateLeft) - getQuarter(dateRight);
  return yearDiff * 4 + quarterDiff;
}
module.exports = differenceInCalendarQuarters;

});
___scope___.file("difference_in_calendar_weeks/index.js", function(exports, require, module){
var startOfWeek = require("../start_of_week/index.js");
var MILLISECONDS_IN_MINUTE = 60000;
var MILLISECONDS_IN_WEEK = 604800000;
function differenceInCalendarWeeks(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  var startOfWeekLeft = startOfWeek(dirtyDateLeft, dirtyOptions);
  var startOfWeekRight = startOfWeek(dirtyDateRight, dirtyOptions);
  var timestampLeft = startOfWeekLeft.getTime() - startOfWeekLeft.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  var timestampRight = startOfWeekRight.getTime() - startOfWeekRight.getTimezoneOffset() * MILLISECONDS_IN_MINUTE;
  return Math.round((timestampLeft - timestampRight) / MILLISECONDS_IN_WEEK);
}
module.exports = differenceInCalendarWeeks;

});
___scope___.file("difference_in_calendar_years/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function differenceInCalendarYears(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  return dateLeft.getFullYear() - dateRight.getFullYear();
}
module.exports = differenceInCalendarYears;

});
___scope___.file("difference_in_days/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var differenceInCalendarDays = require("../difference_in_calendar_days/index.js");
var compareAsc = require("../compare_asc/index.js");
function differenceInDays(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarDays(dateLeft, dateRight));
  dateLeft.setDate(dateLeft.getDate() - sign * difference);
  var isLastDayNotFull = compareAsc(dateLeft, dateRight) === -sign;
  return sign * (difference - isLastDayNotFull);
}
module.exports = differenceInDays;

});
___scope___.file("difference_in_hours/index.js", function(exports, require, module){
var differenceInMilliseconds = require("../difference_in_milliseconds/index.js");
var MILLISECONDS_IN_HOUR = 3600000;
function differenceInHours(dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_HOUR;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}
module.exports = differenceInHours;

});
___scope___.file("difference_in_iso_years/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var differenceInCalendarISOYears = require("../difference_in_calendar_iso_years/index.js");
var compareAsc = require("../compare_asc/index.js");
var subISOYears = require("../sub_iso_years/index.js");
function differenceInISOYears(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarISOYears(dateLeft, dateRight));
  dateLeft = subISOYears(dateLeft, sign * difference);
  var isLastISOYearNotFull = compareAsc(dateLeft, dateRight) === -sign;
  return sign * (difference - isLastISOYearNotFull);
}
module.exports = differenceInISOYears;

});
___scope___.file("difference_in_milliseconds/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  return dateLeft.getTime() - dateRight.getTime();
}
module.exports = differenceInMilliseconds;

});
___scope___.file("difference_in_minutes/index.js", function(exports, require, module){
var differenceInMilliseconds = require("../difference_in_milliseconds/index.js");
var MILLISECONDS_IN_MINUTE = 60000;
function differenceInMinutes(dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / MILLISECONDS_IN_MINUTE;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}
module.exports = differenceInMinutes;

});
___scope___.file("difference_in_months/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var differenceInCalendarMonths = require("../difference_in_calendar_months/index.js");
var compareAsc = require("../compare_asc/index.js");
function differenceInMonths(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarMonths(dateLeft, dateRight));
  dateLeft.setMonth(dateLeft.getMonth() - sign * difference);
  var isLastMonthNotFull = compareAsc(dateLeft, dateRight) === -sign;
  return sign * (difference - isLastMonthNotFull);
}
module.exports = differenceInMonths;

});
___scope___.file("difference_in_quarters/index.js", function(exports, require, module){
var differenceInMonths = require("../difference_in_months/index.js");
function differenceInQuarters(dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMonths(dirtyDateLeft, dirtyDateRight) / 3;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}
module.exports = differenceInQuarters;

});
___scope___.file("difference_in_seconds/index.js", function(exports, require, module){
var differenceInMilliseconds = require("../difference_in_milliseconds/index.js");
function differenceInSeconds(dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInMilliseconds(dirtyDateLeft, dirtyDateRight) / 1000;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}
module.exports = differenceInSeconds;

});
___scope___.file("difference_in_weeks/index.js", function(exports, require, module){
var differenceInDays = require("../difference_in_days/index.js");
function differenceInWeeks(dirtyDateLeft, dirtyDateRight) {
  var diff = differenceInDays(dirtyDateLeft, dirtyDateRight) / 7;
  return diff > 0 ? Math.floor(diff) : Math.ceil(diff);
}
module.exports = differenceInWeeks;

});
___scope___.file("difference_in_years/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var differenceInCalendarYears = require("../difference_in_calendar_years/index.js");
var compareAsc = require("../compare_asc/index.js");
function differenceInYears(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  var sign = compareAsc(dateLeft, dateRight);
  var difference = Math.abs(differenceInCalendarYears(dateLeft, dateRight));
  dateLeft.setFullYear(dateLeft.getFullYear() - sign * difference);
  var isLastYearNotFull = compareAsc(dateLeft, dateRight) === -sign;
  return sign * (difference - isLastYearNotFull);
}
module.exports = differenceInYears;

});
___scope___.file("distance_in_words/index.js", function(exports, require, module){
var compareDesc = require("../compare_desc/index.js");
var parse = require("../parse/index.js");
var differenceInSeconds = require("../difference_in_seconds/index.js");
var differenceInMonths = require("../difference_in_months/index.js");
var enLocale = require("../locale/en/index.js");
var MINUTES_IN_DAY = 1440;
var MINUTES_IN_ALMOST_TWO_DAYS = 2520;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_TWO_MONTHS = 86400;
function distanceInWords(dirtyDateToCompare, dirtyDate, dirtyOptions) {
  var options = dirtyOptions || ({});
  var comparison = compareDesc(dirtyDateToCompare, dirtyDate);
  var locale = options.locale;
  var localize = enLocale.distanceInWords.localize;
  if (locale && locale.distanceInWords && locale.distanceInWords.localize) {
    localize = locale.distanceInWords.localize;
  }
  var localizeOptions = {
    addSuffix: Boolean(options.addSuffix),
    comparison: comparison
  };
  var dateLeft, dateRight;
  if (comparison > 0) {
    dateLeft = parse(dirtyDateToCompare);
    dateRight = parse(dirtyDate);
  } else {
    dateLeft = parse(dirtyDate);
    dateRight = parse(dirtyDateToCompare);
  }
  var seconds = differenceInSeconds(dateRight, dateLeft);
  var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset();
  var minutes = Math.round(seconds / 60) - offset;
  var months;
  if (minutes < 2) {
    if (options.includeSeconds) {
      if (seconds < 5) {
        return localize("lessThanXSeconds", 5, localizeOptions);
      } else if (seconds < 10) {
        return localize("lessThanXSeconds", 10, localizeOptions);
      } else if (seconds < 20) {
        return localize("lessThanXSeconds", 20, localizeOptions);
      } else if (seconds < 40) {
        return localize("halfAMinute", null, localizeOptions);
      } else if (seconds < 60) {
        return localize("lessThanXMinutes", 1, localizeOptions);
      } else {
        return localize("xMinutes", 1, localizeOptions);
      }
    } else {
      if (minutes === 0) {
        return localize("lessThanXMinutes", 1, localizeOptions);
      } else {
        return localize("xMinutes", minutes, localizeOptions);
      }
    }
  } else if (minutes < 45) {
    return localize("xMinutes", minutes, localizeOptions);
  } else if (minutes < 90) {
    return localize("aboutXHours", 1, localizeOptions);
  } else if (minutes < MINUTES_IN_DAY) {
    var hours = Math.round(minutes / 60);
    return localize("aboutXHours", hours, localizeOptions);
  } else if (minutes < MINUTES_IN_ALMOST_TWO_DAYS) {
    return localize("xDays", 1, localizeOptions);
  } else if (minutes < MINUTES_IN_MONTH) {
    var days = Math.round(minutes / MINUTES_IN_DAY);
    return localize("xDays", days, localizeOptions);
  } else if (minutes < MINUTES_IN_TWO_MONTHS) {
    months = Math.round(minutes / MINUTES_IN_MONTH);
    return localize("aboutXMonths", months, localizeOptions);
  }
  months = differenceInMonths(dateRight, dateLeft);
  if (months < 12) {
    var nearestMonth = Math.round(minutes / MINUTES_IN_MONTH);
    return localize("xMonths", nearestMonth, localizeOptions);
  } else {
    var monthsSinceStartOfYear = months % 12;
    var years = Math.floor(months / 12);
    if (monthsSinceStartOfYear < 3) {
      return localize("aboutXYears", years, localizeOptions);
    } else if (monthsSinceStartOfYear < 9) {
      return localize("overXYears", years, localizeOptions);
    } else {
      return localize("almostXYears", years + 1, localizeOptions);
    }
  }
}
module.exports = distanceInWords;

});
___scope___.file("locale/en/index.js", function(exports, require, module){
var buildDistanceInWordsLocale = require("./build_distance_in_words_locale/index.js");
var buildFormatLocale = require("./build_format_locale/index.js");
module.exports = {
  distanceInWords: buildDistanceInWordsLocale(),
  format: buildFormatLocale()
};

});
___scope___.file("distance_in_words_strict/index.js", function(exports, require, module){
var compareDesc = require("../compare_desc/index.js");
var parse = require("../parse/index.js");
var differenceInSeconds = require("../difference_in_seconds/index.js");
var enLocale = require("../locale/en/index.js");
var MINUTES_IN_DAY = 1440;
var MINUTES_IN_MONTH = 43200;
var MINUTES_IN_YEAR = 525600;
function distanceInWordsStrict(dirtyDateToCompare, dirtyDate, dirtyOptions) {
  var options = dirtyOptions || ({});
  var comparison = compareDesc(dirtyDateToCompare, dirtyDate);
  var locale = options.locale;
  var localize = enLocale.distanceInWords.localize;
  if (locale && locale.distanceInWords && locale.distanceInWords.localize) {
    localize = locale.distanceInWords.localize;
  }
  var localizeOptions = {
    addSuffix: Boolean(options.addSuffix),
    comparison: comparison
  };
  var dateLeft, dateRight;
  if (comparison > 0) {
    dateLeft = parse(dirtyDateToCompare);
    dateRight = parse(dirtyDate);
  } else {
    dateLeft = parse(dirtyDate);
    dateRight = parse(dirtyDateToCompare);
  }
  var unit;
  var mathPartial = Math[options.partialMethod ? String(options.partialMethod) : "floor"];
  var seconds = differenceInSeconds(dateRight, dateLeft);
  var offset = dateRight.getTimezoneOffset() - dateLeft.getTimezoneOffset();
  var minutes = mathPartial(seconds / 60) - offset;
  var hours, days, months, years;
  if (options.unit) {
    unit = String(options.unit);
  } else {
    if (minutes < 1) {
      unit = "s";
    } else if (minutes < 60) {
      unit = "m";
    } else if (minutes < MINUTES_IN_DAY) {
      unit = "h";
    } else if (minutes < MINUTES_IN_MONTH) {
      unit = "d";
    } else if (minutes < MINUTES_IN_YEAR) {
      unit = "M";
    } else {
      unit = "Y";
    }
  }
  if (unit === "s") {
    return localize("xSeconds", seconds, localizeOptions);
  } else if (unit === "m") {
    return localize("xMinutes", minutes, localizeOptions);
  } else if (unit === "h") {
    hours = mathPartial(minutes / 60);
    return localize("xHours", hours, localizeOptions);
  } else if (unit === "d") {
    days = mathPartial(minutes / MINUTES_IN_DAY);
    return localize("xDays", days, localizeOptions);
  } else if (unit === "M") {
    months = mathPartial(minutes / MINUTES_IN_MONTH);
    return localize("xMonths", months, localizeOptions);
  } else if (unit === "Y") {
    years = mathPartial(minutes / MINUTES_IN_YEAR);
    return localize("xYears", years, localizeOptions);
  }
  throw new Error("Unknown unit: " + unit);
}
module.exports = distanceInWordsStrict;

});
___scope___.file("distance_in_words_to_now/index.js", function(exports, require, module){
var distanceInWords = require("../distance_in_words/index.js");
function distanceInWordsToNow(dirtyDate, dirtyOptions) {
  return distanceInWords(Date.now(), dirtyDate, dirtyOptions);
}
module.exports = distanceInWordsToNow;

});
___scope___.file("each_day/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function eachDay(dirtyStartDate, dirtyEndDate, dirtyStep) {
  var startDate = parse(dirtyStartDate);
  var endDate = parse(dirtyEndDate);
  var step = dirtyStep !== undefined ? dirtyStep : 1;
  var endTime = endDate.getTime();
  if (startDate.getTime() > endTime) {
    throw new Error("The first date cannot be after the second date");
  }
  var dates = [];
  var currentDate = startDate;
  currentDate.setHours(0, 0, 0, 0);
  while (currentDate.getTime() <= endTime) {
    dates.push(parse(currentDate));
    currentDate.setDate(currentDate.getDate() + step);
  }
  return dates;
}
module.exports = eachDay;

});
___scope___.file("end_of_day/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function endOfDay(dirtyDate) {
  var date = parse(dirtyDate);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = endOfDay;

});
___scope___.file("end_of_hour/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function endOfHour(dirtyDate) {
  var date = parse(dirtyDate);
  date.setMinutes(59, 59, 999);
  return date;
}
module.exports = endOfHour;

});
___scope___.file("end_of_iso_week/index.js", function(exports, require, module){
var endOfWeek = require("../end_of_week/index.js");
function endOfISOWeek(dirtyDate) {
  return endOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}
module.exports = endOfISOWeek;

});
___scope___.file("end_of_iso_year/index.js", function(exports, require, module){
var getISOYear = require("../get_iso_year/index.js");
var startOfISOWeek = require("../start_of_iso_week/index.js");
function endOfISOYear(dirtyDate) {
  var year = getISOYear(dirtyDate);
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuaryOfNextYear);
  date.setMilliseconds(date.getMilliseconds() - 1);
  return date;
}
module.exports = endOfISOYear;

});
___scope___.file("end_of_minute/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function endOfMinute(dirtyDate) {
  var date = parse(dirtyDate);
  date.setSeconds(59, 999);
  return date;
}
module.exports = endOfMinute;

});
___scope___.file("end_of_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function endOfMonth(dirtyDate) {
  var date = parse(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = endOfMonth;

});
___scope___.file("end_of_quarter/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function endOfQuarter(dirtyDate) {
  var date = parse(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = endOfQuarter;

});
___scope___.file("end_of_second/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function endOfSecond(dirtyDate) {
  var date = parse(dirtyDate);
  date.setMilliseconds(999);
  return date;
}
module.exports = endOfSecond;

});
___scope___.file("end_of_today/index.js", function(exports, require, module){
var endOfDay = require("../end_of_day/index.js");
function endOfToday() {
  return endOfDay(new Date());
}
module.exports = endOfToday;

});
___scope___.file("end_of_tomorrow/index.js", function(exports, require, module){
function endOfTomorrow() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = endOfTomorrow;

});
___scope___.file("end_of_week/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function endOfWeek(dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? Number(dirtyOptions.weekStartsOn) || 0 : 0;
  var date = parse(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setDate(date.getDate() + diff);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = endOfWeek;

});
___scope___.file("end_of_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function endOfYear(dirtyDate) {
  var date = parse(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = endOfYear;

});
___scope___.file("end_of_yesterday/index.js", function(exports, require, module){
function endOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(23, 59, 59, 999);
  return date;
}
module.exports = endOfYesterday;

});
___scope___.file("format/index.js", function(exports, require, module){
var getDayOfYear = require("../get_day_of_year/index.js");
var getISOWeek = require("../get_iso_week/index.js");
var getISOYear = require("../get_iso_year/index.js");
var parse = require("../parse/index.js");
var isValid = require("../is_valid/index.js");
var enLocale = require("../locale/en/index.js");
function format(dirtyDate, dirtyFormatStr, dirtyOptions) {
  var formatStr = dirtyFormatStr ? String(dirtyFormatStr) : "YYYY-MM-DDTHH:mm:ss.SSSZ";
  var options = dirtyOptions || ({});
  var locale = options.locale;
  var localeFormatters = enLocale.format.formatters;
  var formattingTokensRegExp = enLocale.format.formattingTokensRegExp;
  if (locale && locale.format && locale.format.formatters) {
    localeFormatters = locale.format.formatters;
    if (locale.format.formattingTokensRegExp) {
      formattingTokensRegExp = locale.format.formattingTokensRegExp;
    }
  }
  var date = parse(dirtyDate);
  if (!isValid(date)) {
    return "Invalid Date";
  }
  var formatFn = buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp);
  return formatFn(date);
}
var formatters = {
  "M": function (date) {
    return date.getMonth() + 1;
  },
  "MM": function (date) {
    return addLeadingZeros(date.getMonth() + 1, 2);
  },
  "Q": function (date) {
    return Math.ceil((date.getMonth() + 1) / 3);
  },
  "D": function (date) {
    return date.getDate();
  },
  "DD": function (date) {
    return addLeadingZeros(date.getDate(), 2);
  },
  "DDD": function (date) {
    return getDayOfYear(date);
  },
  "DDDD": function (date) {
    return addLeadingZeros(getDayOfYear(date), 3);
  },
  "d": function (date) {
    return date.getDay();
  },
  "E": function (date) {
    return date.getDay() || 7;
  },
  "W": function (date) {
    return getISOWeek(date);
  },
  "WW": function (date) {
    return addLeadingZeros(getISOWeek(date), 2);
  },
  "YY": function (date) {
    return addLeadingZeros(date.getFullYear(), 4).substr(2);
  },
  "YYYY": function (date) {
    return addLeadingZeros(date.getFullYear(), 4);
  },
  "GG": function (date) {
    return String(getISOYear(date)).substr(2);
  },
  "GGGG": function (date) {
    return getISOYear(date);
  },
  "H": function (date) {
    return date.getHours();
  },
  "HH": function (date) {
    return addLeadingZeros(date.getHours(), 2);
  },
  "h": function (date) {
    var hours = date.getHours();
    if (hours === 0) {
      return 12;
    } else if (hours > 12) {
      return hours % 12;
    } else {
      return hours;
    }
  },
  "hh": function (date) {
    return addLeadingZeros(formatters["h"](date), 2);
  },
  "m": function (date) {
    return date.getMinutes();
  },
  "mm": function (date) {
    return addLeadingZeros(date.getMinutes(), 2);
  },
  "s": function (date) {
    return date.getSeconds();
  },
  "ss": function (date) {
    return addLeadingZeros(date.getSeconds(), 2);
  },
  "S": function (date) {
    return Math.floor(date.getMilliseconds() / 100);
  },
  "SS": function (date) {
    return addLeadingZeros(Math.floor(date.getMilliseconds() / 10), 2);
  },
  "SSS": function (date) {
    return addLeadingZeros(date.getMilliseconds(), 3);
  },
  "Z": function (date) {
    return formatTimezone(date.getTimezoneOffset(), ":");
  },
  "ZZ": function (date) {
    return formatTimezone(date.getTimezoneOffset());
  },
  "X": function (date) {
    return Math.floor(date.getTime() / 1000);
  },
  "x": function (date) {
    return date.getTime();
  }
};
function buildFormatFn(formatStr, localeFormatters, formattingTokensRegExp) {
  var array = formatStr.match(formattingTokensRegExp);
  var length = array.length;
  var i;
  var formatter;
  for (i = 0; i < length; i++) {
    formatter = localeFormatters[array[i]] || formatters[array[i]];
    if (formatter) {
      array[i] = formatter;
    } else {
      array[i] = removeFormattingTokens(array[i]);
    }
  }
  return function (date) {
    var output = "";
    for (var i = 0; i < length; i++) {
      if (array[i] instanceof Function) {
        output += array[i](date, formatters);
      } else {
        output += array[i];
      }
    }
    return output;
  };
}
function removeFormattingTokens(input) {
  if (input.match(/\[[\s\S]/)) {
    return input.replace(/^\[|]$/g, "");
  }
  return input.replace(/\\/g, "");
}
function formatTimezone(offset, delimeter) {
  delimeter = delimeter || "";
  var sign = offset > 0 ? "-" : "+";
  var absOffset = Math.abs(offset);
  var hours = Math.floor(absOffset / 60);
  var minutes = absOffset % 60;
  return sign + addLeadingZeros(hours, 2) + delimeter + addLeadingZeros(minutes, 2);
}
function addLeadingZeros(number, targetLength) {
  var output = Math.abs(number).toString();
  while (output.length < targetLength) {
    output = "0" + output;
  }
  return output;
}
module.exports = format;

});
___scope___.file("get_date/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getDate(dirtyDate) {
  var date = parse(dirtyDate);
  var dayOfMonth = date.getDate();
  return dayOfMonth;
}
module.exports = getDate;

});
___scope___.file("get_day/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getDay(dirtyDate) {
  var date = parse(dirtyDate);
  var day = date.getDay();
  return day;
}
module.exports = getDay;

});
___scope___.file("get_day_of_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var startOfYear = require("../start_of_year/index.js");
var differenceInCalendarDays = require("../difference_in_calendar_days/index.js");
function getDayOfYear(dirtyDate) {
  var date = parse(dirtyDate);
  var diff = differenceInCalendarDays(date, startOfYear(date));
  var dayOfYear = diff + 1;
  return dayOfYear;
}
module.exports = getDayOfYear;

});
___scope___.file("get_days_in_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getDaysInMonth(dirtyDate) {
  var date = parse(dirtyDate);
  var year = date.getFullYear();
  var monthIndex = date.getMonth();
  var lastDayOfMonth = new Date(0);
  lastDayOfMonth.setFullYear(year, monthIndex + 1, 0);
  lastDayOfMonth.setHours(0, 0, 0, 0);
  return lastDayOfMonth.getDate();
}
module.exports = getDaysInMonth;

});
___scope___.file("get_days_in_year/index.js", function(exports, require, module){
var isLeapYear = require("../is_leap_year/index.js");
function getDaysInYear(dirtyDate) {
  return isLeapYear(dirtyDate) ? 366 : 365;
}
module.exports = getDaysInYear;

});
___scope___.file("get_hours/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getHours(dirtyDate) {
  var date = parse(dirtyDate);
  var hours = date.getHours();
  return hours;
}
module.exports = getHours;

});
___scope___.file("get_iso_day/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getISODay(dirtyDate) {
  var date = parse(dirtyDate);
  var day = date.getDay();
  if (day === 0) {
    day = 7;
  }
  return day;
}
module.exports = getISODay;

});
___scope___.file("get_iso_week/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var startOfISOWeek = require("../start_of_iso_week/index.js");
var startOfISOYear = require("../start_of_iso_year/index.js");
var MILLISECONDS_IN_WEEK = 604800000;
function getISOWeek(dirtyDate) {
  var date = parse(dirtyDate);
  var diff = startOfISOWeek(date).getTime() - startOfISOYear(date).getTime();
  return Math.round(diff / MILLISECONDS_IN_WEEK) + 1;
}
module.exports = getISOWeek;

});
___scope___.file("get_iso_weeks_in_year/index.js", function(exports, require, module){
var startOfISOYear = require("../start_of_iso_year/index.js");
var addWeeks = require("../add_weeks/index.js");
var MILLISECONDS_IN_WEEK = 604800000;
function getISOWeeksInYear(dirtyDate) {
  var thisYear = startOfISOYear(dirtyDate);
  var nextYear = startOfISOYear(addWeeks(thisYear, 60));
  var diff = nextYear.valueOf() - thisYear.valueOf();
  return Math.round(diff / MILLISECONDS_IN_WEEK);
}
module.exports = getISOWeeksInYear;

});
___scope___.file("get_iso_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var startOfISOWeek = require("../start_of_iso_week/index.js");
function getISOYear(dirtyDate) {
  var date = parse(dirtyDate);
  var year = date.getFullYear();
  var fourthOfJanuaryOfNextYear = new Date(0);
  fourthOfJanuaryOfNextYear.setFullYear(year + 1, 0, 4);
  fourthOfJanuaryOfNextYear.setHours(0, 0, 0, 0);
  var startOfNextYear = startOfISOWeek(fourthOfJanuaryOfNextYear);
  var fourthOfJanuaryOfThisYear = new Date(0);
  fourthOfJanuaryOfThisYear.setFullYear(year, 0, 4);
  fourthOfJanuaryOfThisYear.setHours(0, 0, 0, 0);
  var startOfThisYear = startOfISOWeek(fourthOfJanuaryOfThisYear);
  if (date.getTime() >= startOfNextYear.getTime()) {
    return year + 1;
  } else if (date.getTime() >= startOfThisYear.getTime()) {
    return year;
  } else {
    return year - 1;
  }
}
module.exports = getISOYear;

});
___scope___.file("get_milliseconds/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getMilliseconds(dirtyDate) {
  var date = parse(dirtyDate);
  var milliseconds = date.getMilliseconds();
  return milliseconds;
}
module.exports = getMilliseconds;

});
___scope___.file("get_minutes/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getMinutes(dirtyDate) {
  var date = parse(dirtyDate);
  var minutes = date.getMinutes();
  return minutes;
}
module.exports = getMinutes;

});
___scope___.file("get_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getMonth(dirtyDate) {
  var date = parse(dirtyDate);
  var month = date.getMonth();
  return month;
}
module.exports = getMonth;

});
___scope___.file("get_overlapping_days_in_ranges/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var MILLISECONDS_IN_DAY = 24 * 60 * 60 * 1000;
function getOverlappingDaysInRanges(dirtyInitialRangeStartDate, dirtyInitialRangeEndDate, dirtyComparedRangeStartDate, dirtyComparedRangeEndDate) {
  var initialStartTime = parse(dirtyInitialRangeStartDate).getTime();
  var initialEndTime = parse(dirtyInitialRangeEndDate).getTime();
  var comparedStartTime = parse(dirtyComparedRangeStartDate).getTime();
  var comparedEndTime = parse(dirtyComparedRangeEndDate).getTime();
  if (initialStartTime > initialEndTime || comparedStartTime > comparedEndTime) {
    throw new Error("The start of the range cannot be after the end of the range");
  }
  var isOverlapping = initialStartTime < comparedEndTime && comparedStartTime < initialEndTime;
  if (!isOverlapping) {
    return 0;
  }
  var overlapStartDate = comparedStartTime < initialStartTime ? initialStartTime : comparedStartTime;
  var overlapEndDate = comparedEndTime > initialEndTime ? initialEndTime : comparedEndTime;
  var differenceInMs = overlapEndDate - overlapStartDate;
  return Math.ceil(differenceInMs / MILLISECONDS_IN_DAY);
}
module.exports = getOverlappingDaysInRanges;

});
___scope___.file("get_quarter/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getQuarter(dirtyDate) {
  var date = parse(dirtyDate);
  var quarter = Math.floor(date.getMonth() / 3) + 1;
  return quarter;
}
module.exports = getQuarter;

});
___scope___.file("get_seconds/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getSeconds(dirtyDate) {
  var date = parse(dirtyDate);
  var seconds = date.getSeconds();
  return seconds;
}
module.exports = getSeconds;

});
___scope___.file("get_time/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getTime(dirtyDate) {
  var date = parse(dirtyDate);
  var timestamp = date.getTime();
  return timestamp;
}
module.exports = getTime;

});
___scope___.file("get_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function getYear(dirtyDate) {
  var date = parse(dirtyDate);
  var year = date.getFullYear();
  return year;
}
module.exports = getYear;

});
___scope___.file("is_after/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isAfter(dirtyDate, dirtyDateToCompare) {
  var date = parse(dirtyDate);
  var dateToCompare = parse(dirtyDateToCompare);
  return date.getTime() > dateToCompare.getTime();
}
module.exports = isAfter;

});
___scope___.file("is_before/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isBefore(dirtyDate, dirtyDateToCompare) {
  var date = parse(dirtyDate);
  var dateToCompare = parse(dirtyDateToCompare);
  return date.getTime() < dateToCompare.getTime();
}
module.exports = isBefore;

});
___scope___.file("is_date/index.js", function(exports, require, module){
function isDate(argument) {
  return argument instanceof Date;
}
module.exports = isDate;

});
___scope___.file("is_equal/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isEqual(dirtyLeftDate, dirtyRightDate) {
  var dateLeft = parse(dirtyLeftDate);
  var dateRight = parse(dirtyRightDate);
  return dateLeft.getTime() === dateRight.getTime();
}
module.exports = isEqual;

});
___scope___.file("is_first_day_of_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isFirstDayOfMonth(dirtyDate) {
  return parse(dirtyDate).getDate() === 1;
}
module.exports = isFirstDayOfMonth;

});
___scope___.file("is_friday/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isFriday(dirtyDate) {
  return parse(dirtyDate).getDay() === 5;
}
module.exports = isFriday;

});
___scope___.file("is_future/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isFuture(dirtyDate) {
  return parse(dirtyDate).getTime() > new Date().getTime();
}
module.exports = isFuture;

});
___scope___.file("is_last_day_of_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var endOfDay = require("../end_of_day/index.js");
var endOfMonth = require("../end_of_month/index.js");
function isLastDayOfMonth(dirtyDate) {
  var date = parse(dirtyDate);
  return endOfDay(date).getTime() === endOfMonth(date).getTime();
}
module.exports = isLastDayOfMonth;

});
___scope___.file("is_leap_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isLeapYear(dirtyDate) {
  var date = parse(dirtyDate);
  var year = date.getFullYear();
  return year % 400 === 0 || year % 4 === 0 && year % 100 !== 0;
}
module.exports = isLeapYear;

});
___scope___.file("is_monday/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isMonday(dirtyDate) {
  return parse(dirtyDate).getDay() === 1;
}
module.exports = isMonday;

});
___scope___.file("is_past/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isPast(dirtyDate) {
  return parse(dirtyDate).getTime() < new Date().getTime();
}
module.exports = isPast;

});
___scope___.file("is_same_day/index.js", function(exports, require, module){
var startOfDay = require("../start_of_day/index.js");
function isSameDay(dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfDay = startOfDay(dirtyDateLeft);
  var dateRightStartOfDay = startOfDay(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}
module.exports = isSameDay;

});
___scope___.file("is_same_hour/index.js", function(exports, require, module){
var startOfHour = require("../start_of_hour/index.js");
function isSameHour(dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfHour = startOfHour(dirtyDateLeft);
  var dateRightStartOfHour = startOfHour(dirtyDateRight);
  return dateLeftStartOfHour.getTime() === dateRightStartOfHour.getTime();
}
module.exports = isSameHour;

});
___scope___.file("is_same_iso_week/index.js", function(exports, require, module){
var isSameWeek = require("../is_same_week/index.js");
function isSameISOWeek(dirtyDateLeft, dirtyDateRight) {
  return isSameWeek(dirtyDateLeft, dirtyDateRight, {
    weekStartsOn: 1
  });
}
module.exports = isSameISOWeek;

});
___scope___.file("is_same_iso_year/index.js", function(exports, require, module){
var startOfISOYear = require("../start_of_iso_year/index.js");
function isSameISOYear(dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfYear = startOfISOYear(dirtyDateLeft);
  var dateRightStartOfYear = startOfISOYear(dirtyDateRight);
  return dateLeftStartOfYear.getTime() === dateRightStartOfYear.getTime();
}
module.exports = isSameISOYear;

});
___scope___.file("is_same_minute/index.js", function(exports, require, module){
var startOfMinute = require("../start_of_minute/index.js");
function isSameMinute(dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfMinute = startOfMinute(dirtyDateLeft);
  var dateRightStartOfMinute = startOfMinute(dirtyDateRight);
  return dateLeftStartOfMinute.getTime() === dateRightStartOfMinute.getTime();
}
module.exports = isSameMinute;

});
___scope___.file("is_same_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isSameMonth(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear() && dateLeft.getMonth() === dateRight.getMonth();
}
module.exports = isSameMonth;

});
___scope___.file("is_same_quarter/index.js", function(exports, require, module){
var startOfQuarter = require("../start_of_quarter/index.js");
function isSameQuarter(dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfQuarter = startOfQuarter(dirtyDateLeft);
  var dateRightStartOfQuarter = startOfQuarter(dirtyDateRight);
  return dateLeftStartOfQuarter.getTime() === dateRightStartOfQuarter.getTime();
}
module.exports = isSameQuarter;

});
___scope___.file("is_same_second/index.js", function(exports, require, module){
var startOfSecond = require("../start_of_second/index.js");
function isSameSecond(dirtyDateLeft, dirtyDateRight) {
  var dateLeftStartOfSecond = startOfSecond(dirtyDateLeft);
  var dateRightStartOfSecond = startOfSecond(dirtyDateRight);
  return dateLeftStartOfSecond.getTime() === dateRightStartOfSecond.getTime();
}
module.exports = isSameSecond;

});
___scope___.file("is_same_week/index.js", function(exports, require, module){
var startOfWeek = require("../start_of_week/index.js");
function isSameWeek(dirtyDateLeft, dirtyDateRight, dirtyOptions) {
  var dateLeftStartOfWeek = startOfWeek(dirtyDateLeft, dirtyOptions);
  var dateRightStartOfWeek = startOfWeek(dirtyDateRight, dirtyOptions);
  return dateLeftStartOfWeek.getTime() === dateRightStartOfWeek.getTime();
}
module.exports = isSameWeek;

});
___scope___.file("is_same_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isSameYear(dirtyDateLeft, dirtyDateRight) {
  var dateLeft = parse(dirtyDateLeft);
  var dateRight = parse(dirtyDateRight);
  return dateLeft.getFullYear() === dateRight.getFullYear();
}
module.exports = isSameYear;

});
___scope___.file("is_saturday/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isSaturday(dirtyDate) {
  return parse(dirtyDate).getDay() === 6;
}
module.exports = isSaturday;

});
___scope___.file("is_sunday/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isSunday(dirtyDate) {
  return parse(dirtyDate).getDay() === 0;
}
module.exports = isSunday;

});
___scope___.file("is_this_hour/index.js", function(exports, require, module){
var isSameHour = require("../is_same_hour/index.js");
function isThisHour(dirtyDate) {
  return isSameHour(new Date(), dirtyDate);
}
module.exports = isThisHour;

});
___scope___.file("is_this_iso_week/index.js", function(exports, require, module){
var isSameISOWeek = require("../is_same_iso_week/index.js");
function isThisISOWeek(dirtyDate) {
  return isSameISOWeek(new Date(), dirtyDate);
}
module.exports = isThisISOWeek;

});
___scope___.file("is_this_iso_year/index.js", function(exports, require, module){
var isSameISOYear = require("../is_same_iso_year/index.js");
function isThisISOYear(dirtyDate) {
  return isSameISOYear(new Date(), dirtyDate);
}
module.exports = isThisISOYear;

});
___scope___.file("is_this_minute/index.js", function(exports, require, module){
var isSameMinute = require("../is_same_minute/index.js");
function isThisMinute(dirtyDate) {
  return isSameMinute(new Date(), dirtyDate);
}
module.exports = isThisMinute;

});
___scope___.file("is_this_month/index.js", function(exports, require, module){
var isSameMonth = require("../is_same_month/index.js");
function isThisMonth(dirtyDate) {
  return isSameMonth(new Date(), dirtyDate);
}
module.exports = isThisMonth;

});
___scope___.file("is_this_quarter/index.js", function(exports, require, module){
var isSameQuarter = require("../is_same_quarter/index.js");
function isThisQuarter(dirtyDate) {
  return isSameQuarter(new Date(), dirtyDate);
}
module.exports = isThisQuarter;

});
___scope___.file("is_this_second/index.js", function(exports, require, module){
var isSameSecond = require("../is_same_second/index.js");
function isThisSecond(dirtyDate) {
  return isSameSecond(new Date(), dirtyDate);
}
module.exports = isThisSecond;

});
___scope___.file("is_this_week/index.js", function(exports, require, module){
var isSameWeek = require("../is_same_week/index.js");
function isThisWeek(dirtyDate, dirtyOptions) {
  return isSameWeek(new Date(), dirtyDate, dirtyOptions);
}
module.exports = isThisWeek;

});
___scope___.file("is_this_year/index.js", function(exports, require, module){
var isSameYear = require("../is_same_year/index.js");
function isThisYear(dirtyDate) {
  return isSameYear(new Date(), dirtyDate);
}
module.exports = isThisYear;

});
___scope___.file("is_thursday/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isThursday(dirtyDate) {
  return parse(dirtyDate).getDay() === 4;
}
module.exports = isThursday;

});
___scope___.file("is_today/index.js", function(exports, require, module){
var startOfDay = require("../start_of_day/index.js");
function isToday(dirtyDate) {
  return startOfDay(dirtyDate).getTime() === startOfDay(new Date()).getTime();
}
module.exports = isToday;

});
___scope___.file("is_tomorrow/index.js", function(exports, require, module){
var startOfDay = require("../start_of_day/index.js");
function isTomorrow(dirtyDate) {
  var tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return startOfDay(dirtyDate).getTime() === startOfDay(tomorrow).getTime();
}
module.exports = isTomorrow;

});
___scope___.file("is_tuesday/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isTuesday(dirtyDate) {
  return parse(dirtyDate).getDay() === 2;
}
module.exports = isTuesday;

});
___scope___.file("is_valid/index.js", function(exports, require, module){
var isDate = require("../is_date/index.js");
function isValid(dirtyDate) {
  if (isDate(dirtyDate)) {
    return !isNaN(dirtyDate);
  } else {
    throw new TypeError(toString.call(dirtyDate) + " is not an instance of Date");
  }
}
module.exports = isValid;

});
___scope___.file("is_wednesday/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isWednesday(dirtyDate) {
  return parse(dirtyDate).getDay() === 3;
}
module.exports = isWednesday;

});
___scope___.file("is_weekend/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isWeekend(dirtyDate) {
  var date = parse(dirtyDate);
  var day = date.getDay();
  return day === 0 || day === 6;
}
module.exports = isWeekend;

});
___scope___.file("is_within_range/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function isWithinRange(dirtyDate, dirtyStartDate, dirtyEndDate) {
  var time = parse(dirtyDate).getTime();
  var startTime = parse(dirtyStartDate).getTime();
  var endTime = parse(dirtyEndDate).getTime();
  if (startTime > endTime) {
    throw new Error("The start of the range cannot be after the end of the range");
  }
  return time >= startTime && time <= endTime;
}
module.exports = isWithinRange;

});
___scope___.file("is_yesterday/index.js", function(exports, require, module){
var startOfDay = require("../start_of_day/index.js");
function isYesterday(dirtyDate) {
  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  return startOfDay(dirtyDate).getTime() === startOfDay(yesterday).getTime();
}
module.exports = isYesterday;

});
___scope___.file("last_day_of_iso_week/index.js", function(exports, require, module){
var lastDayOfWeek = require("../last_day_of_week/index.js");
function lastDayOfISOWeek(dirtyDate) {
  return lastDayOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}
module.exports = lastDayOfISOWeek;

});
___scope___.file("last_day_of_iso_year/index.js", function(exports, require, module){
var getISOYear = require("../get_iso_year/index.js");
var startOfISOWeek = require("../start_of_iso_week/index.js");
function lastDayOfISOYear(dirtyDate) {
  var year = getISOYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year + 1, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  date.setDate(date.getDate() - 1);
  return date;
}
module.exports = lastDayOfISOYear;

});
___scope___.file("last_day_of_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function lastDayOfMonth(dirtyDate) {
  var date = parse(dirtyDate);
  var month = date.getMonth();
  date.setFullYear(date.getFullYear(), month + 1, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = lastDayOfMonth;

});
___scope___.file("last_day_of_quarter/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function lastDayOfQuarter(dirtyDate) {
  var date = parse(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3 + 3;
  date.setMonth(month, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = lastDayOfQuarter;

});
___scope___.file("last_day_of_week/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function lastDayOfWeek(dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? Number(dirtyOptions.weekStartsOn) || 0 : 0;
  var date = parse(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + diff);
  return date;
}
module.exports = lastDayOfWeek;

});
___scope___.file("last_day_of_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function lastDayOfYear(dirtyDate) {
  var date = parse(dirtyDate);
  var year = date.getFullYear();
  date.setFullYear(year + 1, 0, 0);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = lastDayOfYear;

});
___scope___.file("max/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function max() {
  var dirtyDates = Array.prototype.slice.call(arguments);
  var dates = dirtyDates.map(function (dirtyDate) {
    return parse(dirtyDate);
  });
  var latestTimestamp = Math.max.apply(null, dates);
  return new Date(latestTimestamp);
}
module.exports = max;

});
___scope___.file("min/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function min() {
  var dirtyDates = Array.prototype.slice.call(arguments);
  var dates = dirtyDates.map(function (dirtyDate) {
    return parse(dirtyDate);
  });
  var earliestTimestamp = Math.min.apply(null, dates);
  return new Date(earliestTimestamp);
}
module.exports = min;

});
___scope___.file("parse/index.js", function(exports, require, module){
var getTimezoneOffsetInMilliseconds = require("../_lib/getTimezoneOffsetInMilliseconds/index.js");
var isDate = require("../is_date/index.js");
var MILLISECONDS_IN_HOUR = 3600000;
var MILLISECONDS_IN_MINUTE = 60000;
var DEFAULT_ADDITIONAL_DIGITS = 2;
var parseTokenDateTimeDelimeter = /[T ]/;
var parseTokenPlainTime = /:/;
var parseTokenYY = /^(\d{2})$/;
var parseTokensYYY = [/^([+-]\d{2})$/, /^([+-]\d{3})$/, /^([+-]\d{4})$/];
var parseTokenYYYY = /^(\d{4})/;
var parseTokensYYYYY = [/^([+-]\d{4})/, /^([+-]\d{5})/, /^([+-]\d{6})/];
var parseTokenMM = /^-(\d{2})$/;
var parseTokenDDD = /^-?(\d{3})$/;
var parseTokenMMDD = /^-?(\d{2})-?(\d{2})$/;
var parseTokenWww = /^-?W(\d{2})$/;
var parseTokenWwwD = /^-?W(\d{2})-?(\d{1})$/;
var parseTokenHH = /^(\d{2}([.,]\d*)?)$/;
var parseTokenHHMM = /^(\d{2}):?(\d{2}([.,]\d*)?)$/;
var parseTokenHHMMSS = /^(\d{2}):?(\d{2}):?(\d{2}([.,]\d*)?)$/;
var parseTokenTimezone = /([Z+-].*)$/;
var parseTokenTimezoneZ = /^(Z)$/;
var parseTokenTimezoneHH = /^([+-])(\d{2})$/;
var parseTokenTimezoneHHMM = /^([+-])(\d{2}):?(\d{2})$/;
function parse(argument, dirtyOptions) {
  if (isDate(argument)) {
    return new Date(argument.getTime());
  } else if (typeof argument !== "string") {
    return new Date(argument);
  }
  var options = dirtyOptions || ({});
  var additionalDigits = options.additionalDigits;
  if (additionalDigits == null) {
    additionalDigits = DEFAULT_ADDITIONAL_DIGITS;
  } else {
    additionalDigits = Number(additionalDigits);
  }
  var dateStrings = splitDateString(argument);
  var parseYearResult = parseYear(dateStrings.date, additionalDigits);
  var year = parseYearResult.year;
  var restDateString = parseYearResult.restDateString;
  var date = parseDate(restDateString, year);
  if (date) {
    var timestamp = date.getTime();
    var time = 0;
    var offset;
    if (dateStrings.time) {
      time = parseTime(dateStrings.time);
    }
    if (dateStrings.timezone) {
      offset = parseTimezone(dateStrings.timezone) * MILLISECONDS_IN_MINUTE;
    } else {
      var fullTime = timestamp + time;
      var fullTimeDate = new Date(fullTime);
      offset = getTimezoneOffsetInMilliseconds(fullTimeDate);
      var fullTimeDateNextDay = new Date(fullTime);
      fullTimeDateNextDay.setDate(fullTimeDate.getDate() + 1);
      var offsetDiff = getTimezoneOffsetInMilliseconds(fullTimeDateNextDay) - getTimezoneOffsetInMilliseconds(fullTimeDate);
      if (offsetDiff > 0) {
        offset += offsetDiff;
      }
    }
    return new Date(timestamp + time + offset);
  } else {
    return new Date(argument);
  }
}
function splitDateString(dateString) {
  var dateStrings = {};
  var array = dateString.split(parseTokenDateTimeDelimeter);
  var timeString;
  if (parseTokenPlainTime.test(array[0])) {
    dateStrings.date = null;
    timeString = array[0];
  } else {
    dateStrings.date = array[0];
    timeString = array[1];
  }
  if (timeString) {
    var token = parseTokenTimezone.exec(timeString);
    if (token) {
      dateStrings.time = timeString.replace(token[1], "");
      dateStrings.timezone = token[1];
    } else {
      dateStrings.time = timeString;
    }
  }
  return dateStrings;
}
function parseYear(dateString, additionalDigits) {
  var parseTokenYYY = parseTokensYYY[additionalDigits];
  var parseTokenYYYYY = parseTokensYYYYY[additionalDigits];
  var token;
  token = parseTokenYYYY.exec(dateString) || parseTokenYYYYY.exec(dateString);
  if (token) {
    var yearString = token[1];
    return {
      year: parseInt(yearString, 10),
      restDateString: dateString.slice(yearString.length)
    };
  }
  token = parseTokenYY.exec(dateString) || parseTokenYYY.exec(dateString);
  if (token) {
    var centuryString = token[1];
    return {
      year: parseInt(centuryString, 10) * 100,
      restDateString: dateString.slice(centuryString.length)
    };
  }
  return {
    year: null
  };
}
function parseDate(dateString, year) {
  if (year === null) {
    return null;
  }
  var token;
  var date;
  var month;
  var week;
  if (dateString.length === 0) {
    date = new Date(0);
    date.setUTCFullYear(year);
    return date;
  }
  token = parseTokenMM.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    date.setUTCFullYear(year, month);
    return date;
  }
  token = parseTokenDDD.exec(dateString);
  if (token) {
    date = new Date(0);
    var dayOfYear = parseInt(token[1], 10);
    date.setUTCFullYear(year, 0, dayOfYear);
    return date;
  }
  token = parseTokenMMDD.exec(dateString);
  if (token) {
    date = new Date(0);
    month = parseInt(token[1], 10) - 1;
    var day = parseInt(token[2], 10);
    date.setUTCFullYear(year, month, day);
    return date;
  }
  token = parseTokenWww.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    return dayOfISOYear(year, week);
  }
  token = parseTokenWwwD.exec(dateString);
  if (token) {
    week = parseInt(token[1], 10) - 1;
    var dayOfWeek = parseInt(token[2], 10) - 1;
    return dayOfISOYear(year, week, dayOfWeek);
  }
  return null;
}
function parseTime(timeString) {
  var token;
  var hours;
  var minutes;
  token = parseTokenHH.exec(timeString);
  if (token) {
    hours = parseFloat(token[1].replace(",", "."));
    return hours % 24 * MILLISECONDS_IN_HOUR;
  }
  token = parseTokenHHMM.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseFloat(token[2].replace(",", "."));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE;
  }
  token = parseTokenHHMMSS.exec(timeString);
  if (token) {
    hours = parseInt(token[1], 10);
    minutes = parseInt(token[2], 10);
    var seconds = parseFloat(token[3].replace(",", "."));
    return hours % 24 * MILLISECONDS_IN_HOUR + minutes * MILLISECONDS_IN_MINUTE + seconds * 1000;
  }
  return null;
}
function parseTimezone(timezoneString) {
  var token;
  var absoluteOffset;
  token = parseTokenTimezoneZ.exec(timezoneString);
  if (token) {
    return 0;
  }
  token = parseTokenTimezoneHH.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60;
    return token[1] === "+" ? -absoluteOffset : absoluteOffset;
  }
  token = parseTokenTimezoneHHMM.exec(timezoneString);
  if (token) {
    absoluteOffset = parseInt(token[2], 10) * 60 + parseInt(token[3], 10);
    return token[1] === "+" ? -absoluteOffset : absoluteOffset;
  }
  return 0;
}
function dayOfISOYear(isoYear, week, day) {
  week = week || 0;
  day = day || 0;
  var date = new Date(0);
  date.setUTCFullYear(isoYear, 0, 4);
  var fourthOfJanuaryDay = date.getUTCDay() || 7;
  var diff = week * 7 + day + 1 - fourthOfJanuaryDay;
  date.setUTCDate(date.getUTCDate() + diff);
  return date;
}
module.exports = parse;

});
___scope___.file("_lib/getTimezoneOffsetInMilliseconds/index.js", function(exports, require, module){
var MILLISECONDS_IN_MINUTE = 60000;
module.exports = function getTimezoneOffsetInMilliseconds(dirtyDate) {
  var date = new Date(dirtyDate.getTime());
  var baseTimezoneOffset = date.getTimezoneOffset();
  date.setSeconds(0, 0);
  var millisecondsPartOfTimezoneOffset = date.getTime() % MILLISECONDS_IN_MINUTE;
  return baseTimezoneOffset * MILLISECONDS_IN_MINUTE + millisecondsPartOfTimezoneOffset;
};

});
___scope___.file("set_date/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function setDate(dirtyDate, dirtyDayOfMonth) {
  var date = parse(dirtyDate);
  var dayOfMonth = Number(dirtyDayOfMonth);
  date.setDate(dayOfMonth);
  return date;
}
module.exports = setDate;

});
___scope___.file("set_day/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var addDays = require("../add_days/index.js");
function setDay(dirtyDate, dirtyDay, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? Number(dirtyOptions.weekStartsOn) || 0 : 0;
  var date = parse(dirtyDate);
  var day = Number(dirtyDay);
  var currentDay = date.getDay();
  var remainder = day % 7;
  var dayIndex = (remainder + 7) % 7;
  var diff = (dayIndex < weekStartsOn ? 7 : 0) + day - currentDay;
  return addDays(date, diff);
}
module.exports = setDay;

});
___scope___.file("set_day_of_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function setDayOfYear(dirtyDate, dirtyDayOfYear) {
  var date = parse(dirtyDate);
  var dayOfYear = Number(dirtyDayOfYear);
  date.setMonth(0);
  date.setDate(dayOfYear);
  return date;
}
module.exports = setDayOfYear;

});
___scope___.file("set_hours/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function setHours(dirtyDate, dirtyHours) {
  var date = parse(dirtyDate);
  var hours = Number(dirtyHours);
  date.setHours(hours);
  return date;
}
module.exports = setHours;

});
___scope___.file("set_iso_day/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var addDays = require("../add_days/index.js");
var getISODay = require("../get_iso_day/index.js");
function setISODay(dirtyDate, dirtyDay) {
  var date = parse(dirtyDate);
  var day = Number(dirtyDay);
  var currentDay = getISODay(date);
  var diff = day - currentDay;
  return addDays(date, diff);
}
module.exports = setISODay;

});
___scope___.file("set_iso_week/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var getISOWeek = require("../get_iso_week/index.js");
function setISOWeek(dirtyDate, dirtyISOWeek) {
  var date = parse(dirtyDate);
  var isoWeek = Number(dirtyISOWeek);
  var diff = getISOWeek(date) - isoWeek;
  date.setDate(date.getDate() - diff * 7);
  return date;
}
module.exports = setISOWeek;

});
___scope___.file("set_iso_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var startOfISOYear = require("../start_of_iso_year/index.js");
var differenceInCalendarDays = require("../difference_in_calendar_days/index.js");
function setISOYear(dirtyDate, dirtyISOYear) {
  var date = parse(dirtyDate);
  var isoYear = Number(dirtyISOYear);
  var diff = differenceInCalendarDays(date, startOfISOYear(date));
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(isoYear, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  date = startOfISOYear(fourthOfJanuary);
  date.setDate(date.getDate() + diff);
  return date;
}
module.exports = setISOYear;

});
___scope___.file("set_milliseconds/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function setMilliseconds(dirtyDate, dirtyMilliseconds) {
  var date = parse(dirtyDate);
  var milliseconds = Number(dirtyMilliseconds);
  date.setMilliseconds(milliseconds);
  return date;
}
module.exports = setMilliseconds;

});
___scope___.file("set_minutes/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function setMinutes(dirtyDate, dirtyMinutes) {
  var date = parse(dirtyDate);
  var minutes = Number(dirtyMinutes);
  date.setMinutes(minutes);
  return date;
}
module.exports = setMinutes;

});
___scope___.file("set_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var getDaysInMonth = require("../get_days_in_month/index.js");
function setMonth(dirtyDate, dirtyMonth) {
  var date = parse(dirtyDate);
  var month = Number(dirtyMonth);
  var year = date.getFullYear();
  var day = date.getDate();
  var dateWithDesiredMonth = new Date(0);
  dateWithDesiredMonth.setFullYear(year, month, 15);
  dateWithDesiredMonth.setHours(0, 0, 0, 0);
  var daysInMonth = getDaysInMonth(dateWithDesiredMonth);
  date.setMonth(month, Math.min(day, daysInMonth));
  return date;
}
module.exports = setMonth;

});
___scope___.file("set_quarter/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
var setMonth = require("../set_month/index.js");
function setQuarter(dirtyDate, dirtyQuarter) {
  var date = parse(dirtyDate);
  var quarter = Number(dirtyQuarter);
  var oldQuarter = Math.floor(date.getMonth() / 3) + 1;
  var diff = quarter - oldQuarter;
  return setMonth(date, date.getMonth() + diff * 3);
}
module.exports = setQuarter;

});
___scope___.file("set_seconds/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function setSeconds(dirtyDate, dirtySeconds) {
  var date = parse(dirtyDate);
  var seconds = Number(dirtySeconds);
  date.setSeconds(seconds);
  return date;
}
module.exports = setSeconds;

});
___scope___.file("set_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function setYear(dirtyDate, dirtyYear) {
  var date = parse(dirtyDate);
  var year = Number(dirtyYear);
  date.setFullYear(year);
  return date;
}
module.exports = setYear;

});
___scope___.file("start_of_day/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function startOfDay(dirtyDate) {
  var date = parse(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = startOfDay;

});
___scope___.file("start_of_hour/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function startOfHour(dirtyDate) {
  var date = parse(dirtyDate);
  date.setMinutes(0, 0, 0);
  return date;
}
module.exports = startOfHour;

});
___scope___.file("start_of_iso_week/index.js", function(exports, require, module){
var startOfWeek = require("../start_of_week/index.js");
function startOfISOWeek(dirtyDate) {
  return startOfWeek(dirtyDate, {
    weekStartsOn: 1
  });
}
module.exports = startOfISOWeek;

});
___scope___.file("start_of_iso_year/index.js", function(exports, require, module){
var getISOYear = require("../get_iso_year/index.js");
var startOfISOWeek = require("../start_of_iso_week/index.js");
function startOfISOYear(dirtyDate) {
  var year = getISOYear(dirtyDate);
  var fourthOfJanuary = new Date(0);
  fourthOfJanuary.setFullYear(year, 0, 4);
  fourthOfJanuary.setHours(0, 0, 0, 0);
  var date = startOfISOWeek(fourthOfJanuary);
  return date;
}
module.exports = startOfISOYear;

});
___scope___.file("start_of_minute/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function startOfMinute(dirtyDate) {
  var date = parse(dirtyDate);
  date.setSeconds(0, 0);
  return date;
}
module.exports = startOfMinute;

});
___scope___.file("start_of_month/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function startOfMonth(dirtyDate) {
  var date = parse(dirtyDate);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = startOfMonth;

});
___scope___.file("start_of_quarter/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function startOfQuarter(dirtyDate) {
  var date = parse(dirtyDate);
  var currentMonth = date.getMonth();
  var month = currentMonth - currentMonth % 3;
  date.setMonth(month, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = startOfQuarter;

});
___scope___.file("start_of_second/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function startOfSecond(dirtyDate) {
  var date = parse(dirtyDate);
  date.setMilliseconds(0);
  return date;
}
module.exports = startOfSecond;

});
___scope___.file("start_of_today/index.js", function(exports, require, module){
var startOfDay = require("../start_of_day/index.js");
function startOfToday() {
  return startOfDay(new Date());
}
module.exports = startOfToday;

});
___scope___.file("start_of_tomorrow/index.js", function(exports, require, module){
function startOfTomorrow() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day + 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = startOfTomorrow;

});
___scope___.file("start_of_week/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function startOfWeek(dirtyDate, dirtyOptions) {
  var weekStartsOn = dirtyOptions ? Number(dirtyOptions.weekStartsOn) || 0 : 0;
  var date = parse(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = startOfWeek;

});
___scope___.file("start_of_year/index.js", function(exports, require, module){
var parse = require("../parse/index.js");
function startOfYear(dirtyDate) {
  var cleanDate = parse(dirtyDate);
  var date = new Date(0);
  date.setFullYear(cleanDate.getFullYear(), 0, 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = startOfYear;

});
___scope___.file("start_of_yesterday/index.js", function(exports, require, module){
function startOfYesterday() {
  var now = new Date();
  var year = now.getFullYear();
  var month = now.getMonth();
  var day = now.getDate();
  var date = new Date(0);
  date.setFullYear(year, month, day - 1);
  date.setHours(0, 0, 0, 0);
  return date;
}
module.exports = startOfYesterday;

});
___scope___.file("sub_days/index.js", function(exports, require, module){
var addDays = require("../add_days/index.js");
function subDays(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addDays(dirtyDate, -amount);
}
module.exports = subDays;

});
___scope___.file("sub_hours/index.js", function(exports, require, module){
var addHours = require("../add_hours/index.js");
function subHours(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addHours(dirtyDate, -amount);
}
module.exports = subHours;

});
___scope___.file("sub_iso_years/index.js", function(exports, require, module){
var addISOYears = require("../add_iso_years/index.js");
function subISOYears(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addISOYears(dirtyDate, -amount);
}
module.exports = subISOYears;

});
___scope___.file("sub_milliseconds/index.js", function(exports, require, module){
var addMilliseconds = require("../add_milliseconds/index.js");
function subMilliseconds(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMilliseconds(dirtyDate, -amount);
}
module.exports = subMilliseconds;

});
___scope___.file("sub_minutes/index.js", function(exports, require, module){
var addMinutes = require("../add_minutes/index.js");
function subMinutes(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMinutes(dirtyDate, -amount);
}
module.exports = subMinutes;

});
___scope___.file("sub_months/index.js", function(exports, require, module){
var addMonths = require("../add_months/index.js");
function subMonths(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addMonths(dirtyDate, -amount);
}
module.exports = subMonths;

});
___scope___.file("sub_quarters/index.js", function(exports, require, module){
var addQuarters = require("../add_quarters/index.js");
function subQuarters(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addQuarters(dirtyDate, -amount);
}
module.exports = subQuarters;

});
___scope___.file("sub_seconds/index.js", function(exports, require, module){
var addSeconds = require("../add_seconds/index.js");
function subSeconds(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addSeconds(dirtyDate, -amount);
}
module.exports = subSeconds;

});
___scope___.file("sub_weeks/index.js", function(exports, require, module){
var addWeeks = require("../add_weeks/index.js");
function subWeeks(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addWeeks(dirtyDate, -amount);
}
module.exports = subWeeks;

});
___scope___.file("sub_years/index.js", function(exports, require, module){
var addYears = require("../add_years/index.js");
function subYears(dirtyDate, dirtyAmount) {
  var amount = Number(dirtyAmount);
  return addYears(dirtyDate, -amount);
}
module.exports = subYears;

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("i18next", {}, function(___scope___){
___scope___.file("dist/esm/i18next.js", function(exports, require, module){
const __req1__ = require("@babel/runtime/helpers/esm/typeof");
const __req2__ = require("@babel/runtime/helpers/esm/objectSpread");
const __req3__ = require("@babel/runtime/helpers/esm/classCallCheck");
const __req4__ = require("@babel/runtime/helpers/esm/createClass");
const __req5__ = require("@babel/runtime/helpers/esm/possibleConstructorReturn");
const __req6__ = require("@babel/runtime/helpers/esm/getPrototypeOf");
const __req7__ = require("@babel/runtime/helpers/esm/assertThisInitialized");
const __req8__ = require("@babel/runtime/helpers/esm/inherits");
const __req9__ = require("@babel/runtime/helpers/esm/toConsumableArray");
const __req10__ = require("@babel/runtime/helpers/esm/slicedToArray");
var consoleLogger = {
  type: "logger",
  log: function log(args) {
    this.output("log", args);
  },
  warn: function warn(args) {
    this.output("warn", args);
  },
  error: function error(args) {
    this.output("error", args);
  },
  output: function output(type, args) {
    var _console;
    if (console && console[type]) (_console = console)[type].apply(_console, __req9__.default(args));
  }
};
var Logger = (function () {
  function Logger(concreteLogger) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    __req3__.default(this, Logger);
    this.init(concreteLogger, options);
  }
  __req4__.default(Logger, [{
    key: "init",
    value: function init(concreteLogger) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.prefix = options.prefix || "i18next:";
      this.logger = concreteLogger || consoleLogger;
      this.options = options;
      this.debug = options.debug;
    }
  }, {
    key: "setDebug",
    value: function setDebug(bool) {
      this.debug = bool;
    }
  }, {
    key: "log",
    value: function log() {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return this.forward(args, "log", "", true);
    }
  }, {
    key: "warn",
    value: function warn() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }
      return this.forward(args, "warn", "", true);
    }
  }, {
    key: "error",
    value: function error() {
      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }
      return this.forward(args, "error", "");
    }
  }, {
    key: "deprecate",
    value: function deprecate() {
      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }
      return this.forward(args, "warn", "WARNING DEPRECATED: ", true);
    }
  }, {
    key: "forward",
    value: function forward(args, lvl, prefix, debugOnly) {
      if (debugOnly && !this.debug) return null;
      if (typeof args[0] === "string") args[0] = ("").concat(prefix).concat(this.prefix, " ").concat(args[0]);
      return this.logger[lvl](args);
    }
  }, {
    key: "create",
    value: function create(moduleName) {
      return new Logger(this.logger, __req2__.default({}, {
        prefix: ("").concat(this.prefix, ":").concat(moduleName, ":")
      }, this.options));
    }
  }]);
  return Logger;
})();
var baseLogger = new Logger();
var EventEmitter = (function () {
  function EventEmitter() {
    __req3__.default(this, EventEmitter);
    this.observers = {};
  }
  __req4__.default(EventEmitter, [{
    key: "on",
    value: function on(events, listener) {
      var _this = this;
      events.split(" ").forEach(function (event) {
        _this.observers[event] = _this.observers[event] || [];
        _this.observers[event].push(listener);
      });
      return this;
    }
  }, {
    key: "off",
    value: function off(event, listener) {
      var _this2 = this;
      if (!this.observers[event]) {
        return;
      }
      this.observers[event].forEach(function () {
        if (!listener) {
          delete _this2.observers[event];
        } else {
          var index = _this2.observers[event].indexOf(listener);
          if (index > -1) {
            _this2.observers[event].splice(index, 1);
          }
        }
      });
    }
  }, {
    key: "emit",
    value: function emit(event) {
      for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
        args[_key - 1] = arguments[_key];
      }
      if (this.observers[event]) {
        var cloned = [].concat(this.observers[event]);
        cloned.forEach(function (observer) {
          observer.apply(void 0, args);
        });
      }
      if (this.observers["*"]) {
        var _cloned = [].concat(this.observers["*"]);
        _cloned.forEach(function (observer) {
          observer.apply(observer, [event].concat(args));
        });
      }
    }
  }]);
  return EventEmitter;
})();
function defer() {
  var res;
  var rej;
  var promise = new Promise(function (resolve, reject) {
    res = resolve;
    rej = reject;
  });
  promise.resolve = res;
  promise.reject = rej;
  return promise;
}
function makeString(object) {
  if (object == null) return "";
  return "" + object;
}
function copy(a, s, t) {
  a.forEach(function (m) {
    if (s[m]) t[m] = s[m];
  });
}
function getLastOfPath(object, path, Empty) {
  function cleanKey(key) {
    return key && key.indexOf("###") > -1 ? key.replace(/###/g, ".") : key;
  }
  function canNotTraverseDeeper() {
    return !object || typeof object === "string";
  }
  var stack = typeof path !== "string" ? [].concat(path) : path.split(".");
  while (stack.length > 1) {
    if (canNotTraverseDeeper()) return {};
    var key = cleanKey(stack.shift());
    if (!object[key] && Empty) object[key] = new Empty();
    object = object[key];
  }
  if (canNotTraverseDeeper()) return {};
  return {
    obj: object,
    k: cleanKey(stack.shift())
  };
}
function setPath(object, path, newValue) {
  var _getLastOfPath = getLastOfPath(object, path, Object), obj = _getLastOfPath.obj, k = _getLastOfPath.k;
  obj[k] = newValue;
}
function pushPath(object, path, newValue, concat) {
  var _getLastOfPath2 = getLastOfPath(object, path, Object), obj = _getLastOfPath2.obj, k = _getLastOfPath2.k;
  obj[k] = obj[k] || [];
  if (concat) obj[k] = obj[k].concat(newValue);
  if (!concat) obj[k].push(newValue);
}
function getPath(object, path) {
  var _getLastOfPath3 = getLastOfPath(object, path), obj = _getLastOfPath3.obj, k = _getLastOfPath3.k;
  if (!obj) return undefined;
  return obj[k];
}
function deepExtend(target, source, overwrite) {
  for (var prop in source) {
    if ((prop in target)) {
      if (typeof target[prop] === "string" || target[prop] instanceof String || typeof source[prop] === "string" || source[prop] instanceof String) {
        if (overwrite) target[prop] = source[prop];
      } else {
        deepExtend(target[prop], source[prop], overwrite);
      }
    } else {
      target[prop] = source[prop];
    }
  }
  return target;
}
function regexEscape(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
var _entityMap = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  "\"": "&quot;",
  "'": "&#39;",
  "/": "&#x2F;"
};
function escape(data) {
  if (typeof data === "string") {
    return data.replace(/[&<>"'\/]/g, function (s) {
      return _entityMap[s];
    });
  }
  return data;
}
var ResourceStore = (function (_EventEmitter) {
  __req8__.default(ResourceStore, _EventEmitter);
  function ResourceStore(data) {
    var _this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
      ns: ["translation"],
      defaultNS: "translation"
    };
    __req3__.default(this, ResourceStore);
    _this = __req5__.default(this, __req6__.default(ResourceStore).call(this));
    EventEmitter.call(__req7__.default(_this));
    _this.data = data || ({});
    _this.options = options;
    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = ".";
    }
    return _this;
  }
  __req4__.default(ResourceStore, [{
    key: "addNamespaces",
    value: function addNamespaces(ns) {
      if (this.options.ns.indexOf(ns) < 0) {
        this.options.ns.push(ns);
      }
    }
  }, {
    key: "removeNamespaces",
    value: function removeNamespaces(ns) {
      var index = this.options.ns.indexOf(ns);
      if (index > -1) {
        this.options.ns.splice(index, 1);
      }
    }
  }, {
    key: "getResource",
    value: function getResource(lng, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var path = [lng, ns];
      if (key && typeof key !== "string") path = path.concat(key);
      if (key && typeof key === "string") path = path.concat(keySeparator ? key.split(keySeparator) : key);
      if (lng.indexOf(".") > -1) {
        path = lng.split(".");
      }
      return getPath(this.data, path);
    }
  }, {
    key: "addResource",
    value: function addResource(lng, ns, key, value) {
      var options = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : {
        silent: false
      };
      var keySeparator = this.options.keySeparator;
      if (keySeparator === undefined) keySeparator = ".";
      var path = [lng, ns];
      if (key) path = path.concat(keySeparator ? key.split(keySeparator) : key);
      if (lng.indexOf(".") > -1) {
        path = lng.split(".");
        value = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      setPath(this.data, path, value);
      if (!options.silent) this.emit("added", lng, ns, key, value);
    }
  }, {
    key: "addResources",
    value: function addResources(lng, ns, resources) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {
        silent: false
      };
      for (var m in resources) {
        if (typeof resources[m] === "string" || Object.prototype.toString.apply(resources[m]) === "[object Array]") this.addResource(lng, ns, m, resources[m], {
          silent: true
        });
      }
      if (!options.silent) this.emit("added", lng, ns, resources);
    }
  }, {
    key: "addResourceBundle",
    value: function addResourceBundle(lng, ns, resources, deep, overwrite) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {
        silent: false
      };
      var path = [lng, ns];
      if (lng.indexOf(".") > -1) {
        path = lng.split(".");
        deep = resources;
        resources = ns;
        ns = path[1];
      }
      this.addNamespaces(ns);
      var pack = getPath(this.data, path) || ({});
      if (deep) {
        deepExtend(pack, resources, overwrite);
      } else {
        pack = __req2__.default({}, pack, resources);
      }
      setPath(this.data, path, pack);
      if (!options.silent) this.emit("added", lng, ns, resources);
    }
  }, {
    key: "removeResourceBundle",
    value: function removeResourceBundle(lng, ns) {
      if (this.hasResourceBundle(lng, ns)) {
        delete this.data[lng][ns];
      }
      this.removeNamespaces(ns);
      this.emit("removed", lng, ns);
    }
  }, {
    key: "hasResourceBundle",
    value: function hasResourceBundle(lng, ns) {
      return this.getResource(lng, ns) !== undefined;
    }
  }, {
    key: "getResourceBundle",
    value: function getResourceBundle(lng, ns) {
      if (!ns) ns = this.options.defaultNS;
      if (this.options.compatibilityAPI === "v1") return __req2__.default({}, {}, this.getResource(lng, ns));
      return this.getResource(lng, ns);
    }
  }, {
    key: "getDataByLanguage",
    value: function getDataByLanguage(lng) {
      return this.data[lng];
    }
  }, {
    key: "toJSON",
    value: function toJSON() {
      return this.data;
    }
  }]);
  return ResourceStore;
})(EventEmitter);
var postProcessor = {
  processors: {},
  addPostProcessor: function addPostProcessor(module) {
    this.processors[module.name] = module;
  },
  handle: function handle(processors, value, key, options, translator) {
    var _this = this;
    processors.forEach(function (processor) {
      if (_this.processors[processor]) value = _this.processors[processor].process(value, key, options, translator);
    });
    return value;
  }
};
var Translator = (function (_EventEmitter) {
  __req8__.default(Translator, _EventEmitter);
  function Translator(services) {
    var _this;
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    __req3__.default(this, Translator);
    _this = __req5__.default(this, __req6__.default(Translator).call(this));
    EventEmitter.call(__req7__.default(_this));
    copy(["resourceStore", "languageUtils", "pluralResolver", "interpolator", "backendConnector", "i18nFormat"], services, __req7__.default(_this));
    _this.options = options;
    if (_this.options.keySeparator === undefined) {
      _this.options.keySeparator = ".";
    }
    _this.logger = baseLogger.create("translator");
    return _this;
  }
  __req4__.default(Translator, [{
    key: "changeLanguage",
    value: function changeLanguage(lng) {
      if (lng) this.language = lng;
    }
  }, {
    key: "exists",
    value: function exists(key) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        interpolation: {}
      };
      var resolved = this.resolve(key, options);
      return resolved && resolved.res !== undefined;
    }
  }, {
    key: "extractFromKey",
    value: function extractFromKey(key, options) {
      var nsSeparator = options.nsSeparator || this.options.nsSeparator;
      if (nsSeparator === undefined) nsSeparator = ":";
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var namespaces = options.ns || this.options.defaultNS;
      if (nsSeparator && key.indexOf(nsSeparator) > -1) {
        var parts = key.split(nsSeparator);
        if (nsSeparator !== keySeparator || nsSeparator === keySeparator && this.options.ns.indexOf(parts[0]) > -1) namespaces = parts.shift();
        key = parts.join(keySeparator);
      }
      if (typeof namespaces === "string") namespaces = [namespaces];
      return {
        key: key,
        namespaces: namespaces
      };
    }
  }, {
    key: "translate",
    value: function translate(keys, options) {
      var _this2 = this;
      if (__req1__.default(options) !== "object" && this.options.overloadTranslationOptionHandler) {
        options = this.options.overloadTranslationOptionHandler(arguments);
      }
      if (!options) options = {};
      if (keys === undefined || keys === null) return "";
      if (!Array.isArray(keys)) keys = [String(keys)];
      var keySeparator = options.keySeparator !== undefined ? options.keySeparator : this.options.keySeparator;
      var _this$extractFromKey = this.extractFromKey(keys[keys.length - 1], options), key = _this$extractFromKey.key, namespaces = _this$extractFromKey.namespaces;
      var namespace = namespaces[namespaces.length - 1];
      var lng = options.lng || this.language;
      var appendNamespaceToCIMode = options.appendNamespaceToCIMode || this.options.appendNamespaceToCIMode;
      if (lng && lng.toLowerCase() === "cimode") {
        if (appendNamespaceToCIMode) {
          var nsSeparator = options.nsSeparator || this.options.nsSeparator;
          return namespace + nsSeparator + key;
        }
        return key;
      }
      var resolved = this.resolve(keys, options);
      var res = resolved && resolved.res;
      var resUsedKey = resolved && resolved.usedKey || key;
      var resExactUsedKey = resolved && resolved.exactUsedKey || key;
      var resType = Object.prototype.toString.apply(res);
      var noObject = ["[object Number]", "[object Function]", "[object RegExp]"];
      var joinArrays = options.joinArrays !== undefined ? options.joinArrays : this.options.joinArrays;
      var handleAsObjectInI18nFormat = !this.i18nFormat || this.i18nFormat.handleAsObject;
      var handleAsObject = typeof res !== "string" && typeof res !== "boolean" && typeof res !== "number";
      if (handleAsObjectInI18nFormat && res && handleAsObject && noObject.indexOf(resType) < 0 && !(typeof joinArrays === "string" && resType === "[object Array]")) {
        if (!options.returnObjects && !this.options.returnObjects) {
          this.logger.warn("accessing an object - but returnObjects options is not enabled!");
          return this.options.returnedObjectHandler ? this.options.returnedObjectHandler(resUsedKey, res, options) : ("key '").concat(key, " (").concat(this.language, ")' returned an object instead of string.");
        }
        if (keySeparator) {
          var resTypeIsArray = resType === "[object Array]";
          var copy$$1 = resTypeIsArray ? [] : {};
          var newKeyToUse = resTypeIsArray ? resExactUsedKey : resUsedKey;
          for (var m in res) {
            if (Object.prototype.hasOwnProperty.call(res, m)) {
              var deepKey = ("").concat(newKeyToUse).concat(keySeparator).concat(m);
              copy$$1[m] = this.translate(deepKey, __req2__.default({}, options, {
                joinArrays: false,
                ns: namespaces
              }));
              if (copy$$1[m] === deepKey) copy$$1[m] = res[m];
            }
          }
          res = copy$$1;
        }
      } else if (handleAsObjectInI18nFormat && typeof joinArrays === "string" && resType === "[object Array]") {
        res = res.join(joinArrays);
        if (res) res = this.extendTranslation(res, keys, options);
      } else {
        var usedDefault = false;
        var usedKey = false;
        if (!this.isValidLookup(res) && options.defaultValue !== undefined) {
          usedDefault = true;
          if (options.count !== undefined) {
            var suffix = this.pluralResolver.getSuffix(lng, options.count);
            res = options[("defaultValue").concat(suffix)];
          }
          if (!res) res = options.defaultValue;
        }
        if (!this.isValidLookup(res)) {
          usedKey = true;
          res = key;
        }
        var updateMissing = options.defaultValue && options.defaultValue !== res && this.options.updateMissing;
        if (usedKey || usedDefault || updateMissing) {
          this.logger.log(updateMissing ? "updateKey" : "missingKey", lng, namespace, key, updateMissing ? options.defaultValue : res);
          var lngs = [];
          var fallbackLngs = this.languageUtils.getFallbackCodes(this.options.fallbackLng, options.lng || this.language);
          if (this.options.saveMissingTo === "fallback" && fallbackLngs && fallbackLngs[0]) {
            for (var i = 0; i < fallbackLngs.length; i++) {
              lngs.push(fallbackLngs[i]);
            }
          } else if (this.options.saveMissingTo === "all") {
            lngs = this.languageUtils.toResolveHierarchy(options.lng || this.language);
          } else {
            lngs.push(options.lng || this.language);
          }
          var send = function send(l, k) {
            if (_this2.options.missingKeyHandler) {
              _this2.options.missingKeyHandler(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
            } else if (_this2.backendConnector && _this2.backendConnector.saveMissing) {
              _this2.backendConnector.saveMissing(l, namespace, k, updateMissing ? options.defaultValue : res, updateMissing, options);
            }
            _this2.emit("missingKey", l, namespace, k, res);
          };
          if (this.options.saveMissing) {
            var needsPluralHandling = options.count !== undefined && typeof options.count !== "string";
            if (this.options.saveMissingPlurals && needsPluralHandling) {
              lngs.forEach(function (l) {
                var plurals = _this2.pluralResolver.getPluralFormsOfKey(l, key);
                plurals.forEach(function (p) {
                  return send([l], p);
                });
              });
            } else {
              send(lngs, key);
            }
          }
        }
        res = this.extendTranslation(res, keys, options, resolved);
        if (usedKey && res === key && this.options.appendNamespaceToMissingKey) res = ("").concat(namespace, ":").concat(key);
        if (usedKey && this.options.parseMissingKeyHandler) res = this.options.parseMissingKeyHandler(res);
      }
      return res;
    }
  }, {
    key: "extendTranslation",
    value: function extendTranslation(res, key, options, resolved) {
      var _this3 = this;
      if (this.i18nFormat && this.i18nFormat.parse) {
        res = this.i18nFormat.parse(res, options, resolved.usedLng, resolved.usedNS, resolved.usedKey, {
          resolved: resolved
        });
      } else if (!options.skipInterpolation) {
        if (options.interpolation) this.interpolator.init(__req2__.default({}, options, {
          interpolation: __req2__.default({}, this.options.interpolation, options.interpolation)
        }));
        var data = options.replace && typeof options.replace !== "string" ? options.replace : options;
        if (this.options.interpolation.defaultVariables) data = __req2__.default({}, this.options.interpolation.defaultVariables, data);
        res = this.interpolator.interpolate(res, data, options.lng || this.language, options);
        if (options.nest !== false) res = this.interpolator.nest(res, function () {
          return _this3.translate.apply(_this3, arguments);
        }, options);
        if (options.interpolation) this.interpolator.reset();
      }
      var postProcess = options.postProcess || this.options.postProcess;
      var postProcessorNames = typeof postProcess === "string" ? [postProcess] : postProcess;
      if (res !== undefined && res !== null && postProcessorNames && postProcessorNames.length && options.applyPostProcessor !== false) {
        res = postProcessor.handle(postProcessorNames, res, key, options, this);
      }
      return res;
    }
  }, {
    key: "resolve",
    value: function resolve(keys) {
      var _this4 = this;
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var found;
      var usedKey;
      var exactUsedKey;
      var usedLng;
      var usedNS;
      if (typeof keys === "string") keys = [keys];
      keys.forEach(function (k) {
        if (_this4.isValidLookup(found)) return;
        var extracted = _this4.extractFromKey(k, options);
        var key = extracted.key;
        usedKey = key;
        var namespaces = extracted.namespaces;
        if (_this4.options.fallbackNS) namespaces = namespaces.concat(_this4.options.fallbackNS);
        var needsPluralHandling = options.count !== undefined && typeof options.count !== "string";
        var needsContextHandling = options.context !== undefined && typeof options.context === "string" && options.context !== "";
        var codes = options.lngs ? options.lngs : _this4.languageUtils.toResolveHierarchy(options.lng || _this4.language, options.fallbackLng);
        namespaces.forEach(function (ns) {
          if (_this4.isValidLookup(found)) return;
          usedNS = ns;
          codes.forEach(function (code) {
            if (_this4.isValidLookup(found)) return;
            usedLng = code;
            var finalKey = key;
            var finalKeys = [finalKey];
            if (_this4.i18nFormat && _this4.i18nFormat.addLookupKeys) {
              _this4.i18nFormat.addLookupKeys(finalKeys, key, code, ns, options);
            } else {
              var pluralSuffix;
              if (needsPluralHandling) pluralSuffix = _this4.pluralResolver.getSuffix(code, options.count);
              if (needsPluralHandling && needsContextHandling) finalKeys.push(finalKey + pluralSuffix);
              if (needsContextHandling) finalKeys.push(finalKey += ("").concat(_this4.options.contextSeparator).concat(options.context));
              if (needsPluralHandling) finalKeys.push(finalKey += pluralSuffix);
            }
            var possibleKey;
            while (possibleKey = finalKeys.pop()) {
              if (!_this4.isValidLookup(found)) {
                exactUsedKey = possibleKey;
                found = _this4.getResource(code, ns, possibleKey, options);
              }
            }
          });
        });
      });
      return {
        res: found,
        usedKey: usedKey,
        exactUsedKey: exactUsedKey,
        usedLng: usedLng,
        usedNS: usedNS
      };
    }
  }, {
    key: "isValidLookup",
    value: function isValidLookup(res) {
      return res !== undefined && !(!this.options.returnNull && res === null) && !(!this.options.returnEmptyString && res === "");
    }
  }, {
    key: "getResource",
    value: function getResource(code, ns, key) {
      var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
      if (this.i18nFormat && this.i18nFormat.getResource) return this.i18nFormat.getResource(code, ns, key, options);
      return this.resourceStore.getResource(code, ns, key, options);
    }
  }]);
  return Translator;
})(EventEmitter);
function capitalize(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
var LanguageUtil = (function () {
  function LanguageUtil(options) {
    __req3__.default(this, LanguageUtil);
    this.options = options;
    this.whitelist = this.options.whitelist || false;
    this.logger = baseLogger.create("languageUtils");
  }
  __req4__.default(LanguageUtil, [{
    key: "getScriptPartFromCode",
    value: function getScriptPartFromCode(code) {
      if (!code || code.indexOf("-") < 0) return null;
      var p = code.split("-");
      if (p.length === 2) return null;
      p.pop();
      return this.formatLanguageCode(p.join("-"));
    }
  }, {
    key: "getLanguagePartFromCode",
    value: function getLanguagePartFromCode(code) {
      if (!code || code.indexOf("-") < 0) return code;
      var p = code.split("-");
      return this.formatLanguageCode(p[0]);
    }
  }, {
    key: "formatLanguageCode",
    value: function formatLanguageCode(code) {
      if (typeof code === "string" && code.indexOf("-") > -1) {
        var specialCases = ["hans", "hant", "latn", "cyrl", "cans", "mong", "arab"];
        var p = code.split("-");
        if (this.options.lowerCaseLng) {
          p = p.map(function (part) {
            return part.toLowerCase();
          });
        } else if (p.length === 2) {
          p[0] = p[0].toLowerCase();
          p[1] = p[1].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
        } else if (p.length === 3) {
          p[0] = p[0].toLowerCase();
          if (p[1].length === 2) p[1] = p[1].toUpperCase();
          if (p[0] !== "sgn" && p[2].length === 2) p[2] = p[2].toUpperCase();
          if (specialCases.indexOf(p[1].toLowerCase()) > -1) p[1] = capitalize(p[1].toLowerCase());
          if (specialCases.indexOf(p[2].toLowerCase()) > -1) p[2] = capitalize(p[2].toLowerCase());
        }
        return p.join("-");
      }
      return this.options.cleanCode || this.options.lowerCaseLng ? code.toLowerCase() : code;
    }
  }, {
    key: "isWhitelisted",
    value: function isWhitelisted(code) {
      if (this.options.load === "languageOnly" || this.options.nonExplicitWhitelist) {
        code = this.getLanguagePartFromCode(code);
      }
      return !this.whitelist || !this.whitelist.length || this.whitelist.indexOf(code) > -1;
    }
  }, {
    key: "getFallbackCodes",
    value: function getFallbackCodes(fallbacks, code) {
      if (!fallbacks) return [];
      if (typeof fallbacks === "string") fallbacks = [fallbacks];
      if (Object.prototype.toString.apply(fallbacks) === "[object Array]") return fallbacks;
      if (!code) return fallbacks["default"] || [];
      var found = fallbacks[code];
      if (!found) found = fallbacks[this.getScriptPartFromCode(code)];
      if (!found) found = fallbacks[this.formatLanguageCode(code)];
      if (!found) found = fallbacks["default"];
      return found || [];
    }
  }, {
    key: "toResolveHierarchy",
    value: function toResolveHierarchy(code, fallbackCode) {
      var _this = this;
      var fallbackCodes = this.getFallbackCodes(fallbackCode || this.options.fallbackLng || [], code);
      var codes = [];
      var addCode = function addCode(c) {
        if (!c) return;
        if (_this.isWhitelisted(c)) {
          codes.push(c);
        } else {
          _this.logger.warn(("rejecting non-whitelisted language code: ").concat(c));
        }
      };
      if (typeof code === "string" && code.indexOf("-") > -1) {
        if (this.options.load !== "languageOnly") addCode(this.formatLanguageCode(code));
        if (this.options.load !== "languageOnly" && this.options.load !== "currentOnly") addCode(this.getScriptPartFromCode(code));
        if (this.options.load !== "currentOnly") addCode(this.getLanguagePartFromCode(code));
      } else if (typeof code === "string") {
        addCode(this.formatLanguageCode(code));
      }
      fallbackCodes.forEach(function (fc) {
        if (codes.indexOf(fc) < 0) addCode(_this.formatLanguageCode(fc));
      });
      return codes;
    }
  }]);
  return LanguageUtil;
})();
var sets = [{
  lngs: ["ach", "ak", "am", "arn", "br", "fil", "gun", "ln", "mfe", "mg", "mi", "oc", "pt", "pt-BR", "tg", "ti", "tr", "uz", "wa"],
  nr: [1, 2],
  fc: 1
}, {
  lngs: ["af", "an", "ast", "az", "bg", "bn", "ca", "da", "de", "dev", "el", "en", "eo", "es", "et", "eu", "fi", "fo", "fur", "fy", "gl", "gu", "ha", "hi", "hu", "hy", "ia", "it", "kn", "ku", "lb", "mai", "ml", "mn", "mr", "nah", "nap", "nb", "ne", "nl", "nn", "no", "nso", "pa", "pap", "pms", "ps", "pt-PT", "rm", "sco", "se", "si", "so", "son", "sq", "sv", "sw", "ta", "te", "tk", "ur", "yo"],
  nr: [1, 2],
  fc: 2
}, {
  lngs: ["ay", "bo", "cgg", "fa", "id", "ja", "jbo", "ka", "kk", "km", "ko", "ky", "lo", "ms", "sah", "su", "th", "tt", "ug", "vi", "wo", "zh"],
  nr: [1],
  fc: 3
}, {
  lngs: ["be", "bs", "cnr", "dz", "hr", "ru", "sr", "uk"],
  nr: [1, 2, 5],
  fc: 4
}, {
  lngs: ["ar"],
  nr: [0, 1, 2, 3, 11, 100],
  fc: 5
}, {
  lngs: ["cs", "sk"],
  nr: [1, 2, 5],
  fc: 6
}, {
  lngs: ["csb", "pl"],
  nr: [1, 2, 5],
  fc: 7
}, {
  lngs: ["cy"],
  nr: [1, 2, 3, 8],
  fc: 8
}, {
  lngs: ["fr"],
  nr: [1, 2],
  fc: 9
}, {
  lngs: ["ga"],
  nr: [1, 2, 3, 7, 11],
  fc: 10
}, {
  lngs: ["gd"],
  nr: [1, 2, 3, 20],
  fc: 11
}, {
  lngs: ["is"],
  nr: [1, 2],
  fc: 12
}, {
  lngs: ["jv"],
  nr: [0, 1],
  fc: 13
}, {
  lngs: ["kw"],
  nr: [1, 2, 3, 4],
  fc: 14
}, {
  lngs: ["lt"],
  nr: [1, 2, 10],
  fc: 15
}, {
  lngs: ["lv"],
  nr: [1, 2, 0],
  fc: 16
}, {
  lngs: ["mk"],
  nr: [1, 2],
  fc: 17
}, {
  lngs: ["mnk"],
  nr: [0, 1, 2],
  fc: 18
}, {
  lngs: ["mt"],
  nr: [1, 2, 11, 20],
  fc: 19
}, {
  lngs: ["or"],
  nr: [2, 1],
  fc: 2
}, {
  lngs: ["ro"],
  nr: [1, 2, 20],
  fc: 20
}, {
  lngs: ["sl"],
  nr: [5, 1, 2, 3],
  fc: 21
}, {
  lngs: ["he"],
  nr: [1, 2, 20, 21],
  fc: 22
}];
var _rulesPluralsTypes = {
  1: function _(n) {
    return Number(n > 1);
  },
  2: function _(n) {
    return Number(n != 1);
  },
  3: function _(n) {
    return 0;
  },
  4: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  5: function _(n) {
    return Number(n === 0 ? 0 : n == 1 ? 1 : n == 2 ? 2 : n % 100 >= 3 && n % 100 <= 10 ? 3 : n % 100 >= 11 ? 4 : 5);
  },
  6: function _(n) {
    return Number(n == 1 ? 0 : n >= 2 && n <= 4 ? 1 : 2);
  },
  7: function _(n) {
    return Number(n == 1 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  8: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n != 8 && n != 11 ? 2 : 3);
  },
  9: function _(n) {
    return Number(n >= 2);
  },
  10: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n < 7 ? 2 : n < 11 ? 3 : 4);
  },
  11: function _(n) {
    return Number(n == 1 || n == 11 ? 0 : n == 2 || n == 12 ? 1 : n > 2 && n < 20 ? 2 : 3);
  },
  12: function _(n) {
    return Number(n % 10 != 1 || n % 100 == 11);
  },
  13: function _(n) {
    return Number(n !== 0);
  },
  14: function _(n) {
    return Number(n == 1 ? 0 : n == 2 ? 1 : n == 3 ? 2 : 3);
  },
  15: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2);
  },
  16: function _(n) {
    return Number(n % 10 == 1 && n % 100 != 11 ? 0 : n !== 0 ? 1 : 2);
  },
  17: function _(n) {
    return Number(n == 1 || n % 10 == 1 ? 0 : 1);
  },
  18: function _(n) {
    return Number(n == 0 ? 0 : n == 1 ? 1 : 2);
  },
  19: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 1 && n % 100 < 11 ? 1 : n % 100 > 10 && n % 100 < 20 ? 2 : 3);
  },
  20: function _(n) {
    return Number(n == 1 ? 0 : n === 0 || n % 100 > 0 && n % 100 < 20 ? 1 : 2);
  },
  21: function _(n) {
    return Number(n % 100 == 1 ? 1 : n % 100 == 2 ? 2 : n % 100 == 3 || n % 100 == 4 ? 3 : 0);
  },
  22: function _(n) {
    return Number(n === 1 ? 0 : n === 2 ? 1 : (n < 0 || n > 10) && n % 10 == 0 ? 2 : 3);
  }
};
function createRules() {
  var rules = {};
  sets.forEach(function (set) {
    set.lngs.forEach(function (l) {
      rules[l] = {
        numbers: set.nr,
        plurals: _rulesPluralsTypes[set.fc]
      };
    });
  });
  return rules;
}
var PluralResolver = (function () {
  function PluralResolver(languageUtils) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    __req3__.default(this, PluralResolver);
    this.languageUtils = languageUtils;
    this.options = options;
    this.logger = baseLogger.create("pluralResolver");
    this.rules = createRules();
  }
  __req4__.default(PluralResolver, [{
    key: "addRule",
    value: function addRule(lng, obj) {
      this.rules[lng] = obj;
    }
  }, {
    key: "getRule",
    value: function getRule(code) {
      return this.rules[code] || this.rules[this.languageUtils.getLanguagePartFromCode(code)];
    }
  }, {
    key: "needsPlural",
    value: function needsPlural(code) {
      var rule = this.getRule(code);
      return rule && rule.numbers.length > 1;
    }
  }, {
    key: "getPluralFormsOfKey",
    value: function getPluralFormsOfKey(code, key) {
      var _this = this;
      var ret = [];
      var rule = this.getRule(code);
      if (!rule) return ret;
      rule.numbers.forEach(function (n) {
        var suffix = _this.getSuffix(code, n);
        ret.push(("").concat(key).concat(suffix));
      });
      return ret;
    }
  }, {
    key: "getSuffix",
    value: function getSuffix(code, count) {
      var _this2 = this;
      var rule = this.getRule(code);
      if (rule) {
        var idx = rule.noAbs ? rule.plurals(count) : rule.plurals(Math.abs(count));
        var suffix = rule.numbers[idx];
        if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          if (suffix === 2) {
            suffix = "plural";
          } else if (suffix === 1) {
            suffix = "";
          }
        }
        var returnSuffix = function returnSuffix() {
          return _this2.options.prepend && suffix.toString() ? _this2.options.prepend + suffix.toString() : suffix.toString();
        };
        if (this.options.compatibilityJSON === "v1") {
          if (suffix === 1) return "";
          if (typeof suffix === "number") return ("_plural_").concat(suffix.toString());
          return returnSuffix();
        } else if (this.options.compatibilityJSON === "v2") {
          return returnSuffix();
        } else if (this.options.simplifyPluralSuffix && rule.numbers.length === 2 && rule.numbers[0] === 1) {
          return returnSuffix();
        }
        return this.options.prepend && idx.toString() ? this.options.prepend + idx.toString() : idx.toString();
      }
      this.logger.warn(("no plural rule found for: ").concat(code));
      return "";
    }
  }]);
  return PluralResolver;
})();
var Interpolator = (function () {
  function Interpolator() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    __req3__.default(this, Interpolator);
    this.logger = baseLogger.create("interpolator");
    this.init(options, true);
  }
  __req4__.default(Interpolator, [{
    key: "init",
    value: function init() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var reset = arguments.length > 1 ? arguments[1] : undefined;
      if (reset) {
        this.options = options;
        this.format = options.interpolation && options.interpolation.format || (function (value) {
          return value;
        });
      }
      if (!options.interpolation) options.interpolation = {
        escapeValue: true
      };
      var iOpts = options.interpolation;
      this.escape = iOpts.escape !== undefined ? iOpts.escape : escape;
      this.escapeValue = iOpts.escapeValue !== undefined ? iOpts.escapeValue : true;
      this.useRawValueToEscape = iOpts.useRawValueToEscape !== undefined ? iOpts.useRawValueToEscape : false;
      this.prefix = iOpts.prefix ? regexEscape(iOpts.prefix) : iOpts.prefixEscaped || "{{";
      this.suffix = iOpts.suffix ? regexEscape(iOpts.suffix) : iOpts.suffixEscaped || "}}";
      this.formatSeparator = iOpts.formatSeparator ? iOpts.formatSeparator : iOpts.formatSeparator || ",";
      this.unescapePrefix = iOpts.unescapeSuffix ? "" : iOpts.unescapePrefix || "-";
      this.unescapeSuffix = this.unescapePrefix ? "" : iOpts.unescapeSuffix || "";
      this.nestingPrefix = iOpts.nestingPrefix ? regexEscape(iOpts.nestingPrefix) : iOpts.nestingPrefixEscaped || regexEscape("$t(");
      this.nestingSuffix = iOpts.nestingSuffix ? regexEscape(iOpts.nestingSuffix) : iOpts.nestingSuffixEscaped || regexEscape(")");
      this.maxReplaces = iOpts.maxReplaces ? iOpts.maxReplaces : 1000;
      this.resetRegExp();
    }
  }, {
    key: "reset",
    value: function reset() {
      if (this.options) this.init(this.options);
    }
  }, {
    key: "resetRegExp",
    value: function resetRegExp() {
      var regexpStr = ("").concat(this.prefix, "(.+?)").concat(this.suffix);
      this.regexp = new RegExp(regexpStr, "g");
      var regexpUnescapeStr = ("").concat(this.prefix).concat(this.unescapePrefix, "(.+?)").concat(this.unescapeSuffix).concat(this.suffix);
      this.regexpUnescape = new RegExp(regexpUnescapeStr, "g");
      var nestingRegexpStr = ("").concat(this.nestingPrefix, "(.+?)").concat(this.nestingSuffix);
      this.nestingRegexp = new RegExp(nestingRegexpStr, "g");
    }
  }, {
    key: "interpolate",
    value: function interpolate(str, data, lng, options) {
      var _this = this;
      var match;
      var value;
      var replaces;
      function regexSafe(val) {
        return val.replace(/\$/g, "$$$$");
      }
      var handleFormat = function handleFormat(key) {
        if (key.indexOf(_this.formatSeparator) < 0) return getPath(data, key);
        var p = key.split(_this.formatSeparator);
        var k = p.shift().trim();
        var f = p.join(_this.formatSeparator).trim();
        return _this.format(getPath(data, k), f, lng);
      };
      this.resetRegExp();
      var missingInterpolationHandler = options && options.missingInterpolationHandler || this.options.missingInterpolationHandler;
      replaces = 0;
      while (match = this.regexpUnescape.exec(str)) {
        value = handleFormat(match[1].trim());
        if (value === undefined) {
          if (typeof missingInterpolationHandler === "function") {
            var temp = missingInterpolationHandler(str, match, options);
            value = typeof temp === "string" ? temp : "";
          } else {
            this.logger.warn(("missed to pass in variable ").concat(match[1], " for interpolating ").concat(str));
            value = "";
          }
        }
        str = str.replace(match[0], regexSafe(value));
        this.regexpUnescape.lastIndex = 0;
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
      replaces = 0;
      while (match = this.regexp.exec(str)) {
        value = handleFormat(match[1].trim());
        if (value === undefined) {
          if (typeof missingInterpolationHandler === "function") {
            var _temp = missingInterpolationHandler(str, match, options);
            value = typeof _temp === "string" ? _temp : "";
          } else {
            this.logger.warn(("missed to pass in variable ").concat(match[1], " for interpolating ").concat(str));
            value = "";
          }
        } else if (typeof value !== "string" && !this.useRawValueToEscape) {
          value = makeString(value);
        }
        value = this.escapeValue ? regexSafe(this.escape(value)) : regexSafe(value);
        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
        replaces++;
        if (replaces >= this.maxReplaces) {
          break;
        }
      }
      return str;
    }
  }, {
    key: "nest",
    value: function nest(str, fc) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var match;
      var value;
      var clonedOptions = __req2__.default({}, options);
      clonedOptions.applyPostProcessor = false;
      function handleHasOptions(key, inheritedOptions) {
        if (key.indexOf(",") < 0) return key;
        var p = key.split(",");
        key = p.shift();
        var optionsString = p.join(",");
        optionsString = this.interpolate(optionsString, clonedOptions);
        optionsString = optionsString.replace(/'/g, "\"");
        try {
          clonedOptions = JSON.parse(optionsString);
          if (inheritedOptions) clonedOptions = __req2__.default({}, inheritedOptions, clonedOptions);
        } catch (e) {
          this.logger.error(("failed parsing options string in nesting for key ").concat(key), e);
        }
        return key;
      }
      while (match = this.nestingRegexp.exec(str)) {
        value = fc(handleHasOptions.call(this, match[1].trim(), clonedOptions), clonedOptions);
        if (value && match[0] === str && typeof value !== "string") return value;
        if (typeof value !== "string") value = makeString(value);
        if (!value) {
          this.logger.warn(("missed to resolve ").concat(match[1], " for nesting ").concat(str));
          value = "";
        }
        str = str.replace(match[0], value);
        this.regexp.lastIndex = 0;
      }
      return str;
    }
  }]);
  return Interpolator;
})();
function remove(arr, what) {
  var found = arr.indexOf(what);
  while (found !== -1) {
    arr.splice(found, 1);
    found = arr.indexOf(what);
  }
}
var Connector = (function (_EventEmitter) {
  __req8__.default(Connector, _EventEmitter);
  function Connector(backend, store, services) {
    var _this;
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    __req3__.default(this, Connector);
    _this = __req5__.default(this, __req6__.default(Connector).call(this));
    EventEmitter.call(__req7__.default(_this));
    _this.backend = backend;
    _this.store = store;
    _this.languageUtils = services.languageUtils;
    _this.options = options;
    _this.logger = baseLogger.create("backendConnector");
    _this.state = {};
    _this.queue = [];
    if (_this.backend && _this.backend.init) {
      _this.backend.init(services, options.backend, options);
    }
    return _this;
  }
  __req4__.default(Connector, [{
    key: "queueLoad",
    value: function queueLoad(languages, namespaces, options, callback) {
      var _this2 = this;
      var toLoad = [];
      var pending = [];
      var toLoadLanguages = [];
      var toLoadNamespaces = [];
      languages.forEach(function (lng) {
        var hasAllNamespaces = true;
        namespaces.forEach(function (ns) {
          var name = ("").concat(lng, "|").concat(ns);
          if (!options.reload && _this2.store.hasResourceBundle(lng, ns)) {
            _this2.state[name] = 2;
          } else if (_this2.state[name] < 0) ; else if (_this2.state[name] === 1) {
            if (pending.indexOf(name) < 0) pending.push(name);
          } else {
            _this2.state[name] = 1;
            hasAllNamespaces = false;
            if (pending.indexOf(name) < 0) pending.push(name);
            if (toLoad.indexOf(name) < 0) toLoad.push(name);
            if (toLoadNamespaces.indexOf(ns) < 0) toLoadNamespaces.push(ns);
          }
        });
        if (!hasAllNamespaces) toLoadLanguages.push(lng);
      });
      if (toLoad.length || pending.length) {
        this.queue.push({
          pending: pending,
          loaded: {},
          errors: [],
          callback: callback
        });
      }
      return {
        toLoad: toLoad,
        pending: pending,
        toLoadLanguages: toLoadLanguages,
        toLoadNamespaces: toLoadNamespaces
      };
    }
  }, {
    key: "loaded",
    value: function loaded(name, err, data) {
      var _name$split = name.split("|"), _name$split2 = __req10__.default(_name$split, 2), lng = _name$split2[0], ns = _name$split2[1];
      if (err) this.emit("failedLoading", lng, ns, err);
      if (data) {
        this.store.addResourceBundle(lng, ns, data);
      }
      this.state[name] = err ? -1 : 2;
      var loaded = {};
      this.queue.forEach(function (q) {
        pushPath(q.loaded, [lng], ns);
        remove(q.pending, name);
        if (err) q.errors.push(err);
        if (q.pending.length === 0 && !q.done) {
          Object.keys(q.loaded).forEach(function (l) {
            if (!loaded[l]) loaded[l] = [];
            if (q.loaded[l].length) {
              q.loaded[l].forEach(function (ns) {
                if (loaded[l].indexOf(ns) < 0) loaded[l].push(ns);
              });
            }
          });
          q.done = true;
          if (q.errors.length) {
            q.callback(q.errors);
          } else {
            q.callback();
          }
        }
      });
      this.emit("loaded", loaded);
      this.queue = this.queue.filter(function (q) {
        return !q.done;
      });
    }
  }, {
    key: "read",
    value: function read(lng, ns, fcName) {
      var _this3 = this;
      var tried = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var wait = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 250;
      var callback = arguments.length > 5 ? arguments[5] : undefined;
      if (!lng.length) return callback(null, {});
      return this.backend[fcName](lng, ns, function (err, data) {
        if (err && data && tried < 5) {
          setTimeout(function () {
            _this3.read.call(_this3, lng, ns, fcName, tried + 1, wait * 2, callback);
          }, wait);
          return;
        }
        callback(err, data);
      });
    }
  }, {
    key: "prepareLoading",
    value: function prepareLoading(languages, namespaces) {
      var _this4 = this;
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = arguments.length > 3 ? arguments[3] : undefined;
      if (!this.backend) {
        this.logger.warn("No backend was added via i18next.use. Will not load resources.");
        return callback && callback();
      }
      if (typeof languages === "string") languages = this.languageUtils.toResolveHierarchy(languages);
      if (typeof namespaces === "string") namespaces = [namespaces];
      var toLoad = this.queueLoad(languages, namespaces, options, callback);
      if (!toLoad.toLoad.length) {
        if (!toLoad.pending.length) callback();
        return null;
      }
      toLoad.toLoad.forEach(function (name) {
        _this4.loadOne(name);
      });
    }
  }, {
    key: "load",
    value: function load(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {}, callback);
    }
  }, {
    key: "reload",
    value: function reload(languages, namespaces, callback) {
      this.prepareLoading(languages, namespaces, {
        reload: true
      }, callback);
    }
  }, {
    key: "loadOne",
    value: function loadOne(name) {
      var _this5 = this;
      var prefix = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "";
      var _name$split3 = name.split("|"), _name$split4 = __req10__.default(_name$split3, 2), lng = _name$split4[0], ns = _name$split4[1];
      this.read(lng, ns, "read", null, null, function (err, data) {
        if (err) _this5.logger.warn(("").concat(prefix, "loading namespace ").concat(ns, " for language ").concat(lng, " failed"), err);
        if (!err && data) _this5.logger.log(("").concat(prefix, "loaded namespace ").concat(ns, " for language ").concat(lng), data);
        _this5.loaded(name, err, data);
      });
    }
  }, {
    key: "saveMissing",
    value: function saveMissing(languages, namespace, key, fallbackValue, isUpdate) {
      var options = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : {};
      if (this.backend && this.backend.create) {
        this.backend.create(languages, namespace, key, fallbackValue, null, __req2__.default({}, options, {
          isUpdate: isUpdate
        }));
      }
      if (!languages || !languages[0]) return;
      this.store.addResource(languages[0], namespace, key, fallbackValue);
    }
  }]);
  return Connector;
})(EventEmitter);
function get() {
  return {
    debug: false,
    initImmediate: true,
    ns: ["translation"],
    defaultNS: ["translation"],
    fallbackLng: ["dev"],
    fallbackNS: false,
    whitelist: false,
    nonExplicitWhitelist: false,
    load: "all",
    preload: false,
    simplifyPluralSuffix: true,
    keySeparator: ".",
    nsSeparator: ":",
    pluralSeparator: "_",
    contextSeparator: "_",
    partialBundledLanguages: false,
    saveMissing: false,
    updateMissing: false,
    saveMissingTo: "fallback",
    saveMissingPlurals: true,
    missingKeyHandler: false,
    missingInterpolationHandler: false,
    postProcess: false,
    returnNull: true,
    returnEmptyString: true,
    returnObjects: false,
    joinArrays: false,
    returnedObjectHandler: false,
    parseMissingKeyHandler: false,
    appendNamespaceToMissingKey: false,
    appendNamespaceToCIMode: false,
    overloadTranslationOptionHandler: function handle(args) {
      var ret = {};
      if (__req1__.default(args[1]) === "object") ret = args[1];
      if (typeof args[1] === "string") ret.defaultValue = args[1];
      if (typeof args[2] === "string") ret.tDescription = args[2];
      if (__req1__.default(args[2]) === "object" || __req1__.default(args[3]) === "object") {
        var options = args[3] || args[2];
        Object.keys(options).forEach(function (key) {
          ret[key] = options[key];
        });
      }
      return ret;
    },
    interpolation: {
      escapeValue: true,
      format: function format(value, _format, lng) {
        return value;
      },
      prefix: "{{",
      suffix: "}}",
      formatSeparator: ",",
      unescapePrefix: "-",
      nestingPrefix: "$t(",
      nestingSuffix: ")",
      maxReplaces: 1000
    }
  };
}
function transformOptions(options) {
  if (typeof options.ns === "string") options.ns = [options.ns];
  if (typeof options.fallbackLng === "string") options.fallbackLng = [options.fallbackLng];
  if (typeof options.fallbackNS === "string") options.fallbackNS = [options.fallbackNS];
  if (options.whitelist && options.whitelist.indexOf("cimode") < 0) {
    options.whitelist = options.whitelist.concat(["cimode"]);
  }
  return options;
}
function noop() {}
var I18n = (function (_EventEmitter) {
  __req8__.default(I18n, _EventEmitter);
  function I18n() {
    var _this;
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var callback = arguments.length > 1 ? arguments[1] : undefined;
    __req3__.default(this, I18n);
    _this = __req5__.default(this, __req6__.default(I18n).call(this));
    EventEmitter.call(__req7__.default(_this));
    _this.options = transformOptions(options);
    _this.services = {};
    _this.logger = baseLogger;
    _this.modules = {
      external: []
    };
    if (callback && !_this.isInitialized && !options.isClone) {
      if (!_this.options.initImmediate) {
        _this.init(options, callback);
        return __req5__.default(_this, __req7__.default(_this));
      }
      setTimeout(function () {
        _this.init(options, callback);
      }, 0);
    }
    return _this;
  }
  __req4__.default(I18n, [{
    key: "init",
    value: function init() {
      var _this2 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      if (typeof options === "function") {
        callback = options;
        options = {};
      }
      this.options = __req2__.default({}, get(), this.options, transformOptions(options));
      this.format = this.options.interpolation.format;
      if (!callback) callback = noop;
      function createClassOnDemand(ClassOrObject) {
        if (!ClassOrObject) return null;
        if (typeof ClassOrObject === "function") return new ClassOrObject();
        return ClassOrObject;
      }
      if (!this.options.isClone) {
        if (this.modules.logger) {
          baseLogger.init(createClassOnDemand(this.modules.logger), this.options);
        } else {
          baseLogger.init(null, this.options);
        }
        var lu = new LanguageUtil(this.options);
        this.store = new ResourceStore(this.options.resources, this.options);
        var s = this.services;
        s.logger = baseLogger;
        s.resourceStore = this.store;
        s.languageUtils = lu;
        s.pluralResolver = new PluralResolver(lu, {
          prepend: this.options.pluralSeparator,
          compatibilityJSON: this.options.compatibilityJSON,
          simplifyPluralSuffix: this.options.simplifyPluralSuffix
        });
        s.interpolator = new Interpolator(this.options);
        s.backendConnector = new Connector(createClassOnDemand(this.modules.backend), s.resourceStore, s, this.options);
        s.backendConnector.on("*", function (event) {
          for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
            args[_key - 1] = arguments[_key];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
        if (this.modules.languageDetector) {
          s.languageDetector = createClassOnDemand(this.modules.languageDetector);
          s.languageDetector.init(s, this.options.detection, this.options);
        }
        if (this.modules.i18nFormat) {
          s.i18nFormat = createClassOnDemand(this.modules.i18nFormat);
          if (s.i18nFormat.init) s.i18nFormat.init(this);
        }
        this.translator = new Translator(this.services, this.options);
        this.translator.on("*", function (event) {
          for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
            args[_key2 - 1] = arguments[_key2];
          }
          _this2.emit.apply(_this2, [event].concat(args));
        });
        this.modules.external.forEach(function (m) {
          if (m.init) m.init(_this2);
        });
      }
      var storeApi = ["getResource", "addResource", "addResources", "addResourceBundle", "removeResourceBundle", "hasResourceBundle", "getResourceBundle", "getDataByLanguage"];
      storeApi.forEach(function (fcName) {
        _this2[fcName] = function () {
          var _this2$store;
          return (_this2$store = _this2.store)[fcName].apply(_this2$store, arguments);
        };
      });
      var deferred = defer();
      var load = function load() {
        _this2.changeLanguage(_this2.options.lng, function (err, t) {
          _this2.isInitialized = true;
          _this2.logger.log("initialized", _this2.options);
          _this2.emit("initialized", _this2.options);
          deferred.resolve(t);
          callback(err, t);
        });
      };
      if (this.options.resources || !this.options.initImmediate) {
        load();
      } else {
        setTimeout(load, 0);
      }
      return deferred;
    }
  }, {
    key: "loadResources",
    value: function loadResources() {
      var _this3 = this;
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : noop;
      if (!this.options.resources || this.options.partialBundledLanguages) {
        if (this.language && this.language.toLowerCase() === "cimode") return callback();
        var toLoad = [];
        var append = function append(lng) {
          if (!lng) return;
          var lngs = _this3.services.languageUtils.toResolveHierarchy(lng);
          lngs.forEach(function (l) {
            if (toLoad.indexOf(l) < 0) toLoad.push(l);
          });
        };
        if (!this.language) {
          var fallbacks = this.services.languageUtils.getFallbackCodes(this.options.fallbackLng);
          fallbacks.forEach(function (l) {
            return append(l);
          });
        } else {
          append(this.language);
        }
        if (this.options.preload) {
          this.options.preload.forEach(function (l) {
            return append(l);
          });
        }
        this.services.backendConnector.load(toLoad, this.options.ns, callback);
      } else {
        callback(null);
      }
    }
  }, {
    key: "reloadResources",
    value: function reloadResources(lngs, ns, callback) {
      var deferred = defer();
      if (!lngs) lngs = this.languages;
      if (!ns) ns = this.options.ns;
      if (!callback) callback = noop;
      this.services.backendConnector.reload(lngs, ns, function (err) {
        deferred.resolve();
        callback(err);
      });
      return deferred;
    }
  }, {
    key: "use",
    value: function use(module) {
      if (module.type === "backend") {
        this.modules.backend = module;
      }
      if (module.type === "logger" || module.log && module.warn && module.error) {
        this.modules.logger = module;
      }
      if (module.type === "languageDetector") {
        this.modules.languageDetector = module;
      }
      if (module.type === "i18nFormat") {
        this.modules.i18nFormat = module;
      }
      if (module.type === "postProcessor") {
        postProcessor.addPostProcessor(module);
      }
      if (module.type === "3rdParty") {
        this.modules.external.push(module);
      }
      return this;
    }
  }, {
    key: "changeLanguage",
    value: function changeLanguage(lng, callback) {
      var _this4 = this;
      var deferred = defer();
      this.emit("languageChanging", lng);
      var done = function done(err, l) {
        _this4.translator.changeLanguage(l);
        if (l) {
          _this4.emit("languageChanged", l);
          _this4.logger.log("languageChanged", l);
        }
        deferred.resolve(function () {
          return _this4.t.apply(_this4, arguments);
        });
        if (callback) callback(err, function () {
          return _this4.t.apply(_this4, arguments);
        });
      };
      var setLng = function setLng(l) {
        if (l) {
          _this4.language = l;
          _this4.languages = _this4.services.languageUtils.toResolveHierarchy(l);
          if (!_this4.translator.language) _this4.translator.changeLanguage(l);
          if (_this4.services.languageDetector) _this4.services.languageDetector.cacheUserLanguage(l);
        }
        _this4.loadResources(function (err) {
          done(err, l);
        });
      };
      if (!lng && this.services.languageDetector && !this.services.languageDetector.async) {
        setLng(this.services.languageDetector.detect());
      } else if (!lng && this.services.languageDetector && this.services.languageDetector.async) {
        this.services.languageDetector.detect(setLng);
      } else {
        setLng(lng);
      }
      return deferred;
    }
  }, {
    key: "getFixedT",
    value: function getFixedT(lng, ns) {
      var _this5 = this;
      var fixedT = function fixedT(key, opts) {
        var options = __req2__.default({}, opts);
        if (__req1__.default(opts) !== "object") {
          for (var _len3 = arguments.length, rest = new Array(_len3 > 2 ? _len3 - 2 : 0), _key3 = 2; _key3 < _len3; _key3++) {
            rest[_key3 - 2] = arguments[_key3];
          }
          options = _this5.options.overloadTranslationOptionHandler([key, opts].concat(rest));
        }
        options.lng = options.lng || fixedT.lng;
        options.lngs = options.lngs || fixedT.lngs;
        options.ns = options.ns || fixedT.ns;
        return _this5.t(key, options);
      };
      if (typeof lng === "string") {
        fixedT.lng = lng;
      } else {
        fixedT.lngs = lng;
      }
      fixedT.ns = ns;
      return fixedT;
    }
  }, {
    key: "t",
    value: function t() {
      var _this$translator;
      return this.translator && (_this$translator = this.translator).translate.apply(_this$translator, arguments);
    }
  }, {
    key: "exists",
    value: function exists() {
      var _this$translator2;
      return this.translator && (_this$translator2 = this.translator).exists.apply(_this$translator2, arguments);
    }
  }, {
    key: "setDefaultNamespace",
    value: function setDefaultNamespace(ns) {
      this.options.defaultNS = ns;
    }
  }, {
    key: "loadNamespaces",
    value: function loadNamespaces(ns, callback) {
      var _this6 = this;
      var deferred = defer();
      if (!this.options.ns) {
        callback && callback();
        return Promise.resolve();
      }
      if (typeof ns === "string") ns = [ns];
      ns.forEach(function (n) {
        if (_this6.options.ns.indexOf(n) < 0) _this6.options.ns.push(n);
      });
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "loadLanguages",
    value: function loadLanguages(lngs, callback) {
      var deferred = defer();
      if (typeof lngs === "string") lngs = [lngs];
      var preloaded = this.options.preload || [];
      var newLngs = lngs.filter(function (lng) {
        return preloaded.indexOf(lng) < 0;
      });
      if (!newLngs.length) {
        if (callback) callback();
        return Promise.resolve();
      }
      this.options.preload = preloaded.concat(newLngs);
      this.loadResources(function (err) {
        deferred.resolve();
        if (callback) callback(err);
      });
      return deferred;
    }
  }, {
    key: "dir",
    value: function dir(lng) {
      if (!lng) lng = this.languages && this.languages.length > 0 ? this.languages[0] : this.language;
      if (!lng) return "rtl";
      var rtlLngs = ["ar", "shu", "sqr", "ssh", "xaa", "yhd", "yud", "aao", "abh", "abv", "acm", "acq", "acw", "acx", "acy", "adf", "ads", "aeb", "aec", "afb", "ajp", "apc", "apd", "arb", "arq", "ars", "ary", "arz", "auz", "avl", "ayh", "ayl", "ayn", "ayp", "bbz", "pga", "he", "iw", "ps", "pbt", "pbu", "pst", "prp", "prd", "ur", "ydd", "yds", "yih", "ji", "yi", "hbo", "men", "xmn", "fa", "jpr", "peo", "pes", "prs", "dv", "sam"];
      return rtlLngs.indexOf(this.services.languageUtils.getLanguagePartFromCode(lng)) >= 0 ? "rtl" : "ltr";
    }
  }, {
    key: "createInstance",
    value: function createInstance() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 ? arguments[1] : undefined;
      return new I18n(options, callback);
    }
  }, {
    key: "cloneInstance",
    value: function cloneInstance() {
      var _this7 = this;
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
      var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : noop;
      var mergedOptions = __req2__.default({}, this.options, options, {
        isClone: true
      });
      var clone = new I18n(mergedOptions);
      var membersToCopy = ["store", "services", "language"];
      membersToCopy.forEach(function (m) {
        clone[m] = _this7[m];
      });
      clone.translator = new Translator(clone.services, clone.options);
      clone.translator.on("*", function (event) {
        for (var _len4 = arguments.length, args = new Array(_len4 > 1 ? _len4 - 1 : 0), _key4 = 1; _key4 < _len4; _key4++) {
          args[_key4 - 1] = arguments[_key4];
        }
        clone.emit.apply(clone, [event].concat(args));
      });
      clone.init(mergedOptions, callback);
      clone.translator.options = clone.options;
      return clone;
    }
  }]);
  return I18n;
})(EventEmitter);
var i18next = new I18n();
module.exports.default = i18next;

});
	___scope___.entry = "dist/esm/i18next.js";
})
FuseBox.pkg("i18next-browser-languagedetector", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var main = require("./dist/commonjs/index.js").default;
module.exports = main;
module.exports.default = main;

});
___scope___.file("dist/commonjs/index.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _createClass = (function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if (("value" in descriptor)) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }
  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
})();
var _utils = require("./utils.js");
var utils = _interopRequireWildcard(_utils);
var _cookie = require("./browserLookups/cookie.js");
var _cookie2 = _interopRequireDefault(_cookie);
var _querystring = require("./browserLookups/querystring.js");
var _querystring2 = _interopRequireDefault(_querystring);
var _localStorage = require("./browserLookups/localStorage.js");
var _localStorage2 = _interopRequireDefault(_localStorage);
var _navigator = require("./browserLookups/navigator.js");
var _navigator2 = _interopRequireDefault(_navigator);
var _htmlTag = require("./browserLookups/htmlTag.js");
var _htmlTag2 = _interopRequireDefault(_htmlTag);
var _path = require("./browserLookups/path.js");
var _path2 = _interopRequireDefault(_path);
var _subdomain = require("./browserLookups/subdomain.js");
var _subdomain2 = _interopRequireDefault(_subdomain);
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    default: obj
  };
}
function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function getDefaults() {
  return {
    order: ["querystring", "cookie", "localStorage", "navigator", "htmlTag"],
    lookupQuerystring: "lng",
    lookupCookie: "i18next",
    lookupLocalStorage: "i18nextLng",
    caches: ["localStorage"],
    excludeCacheFor: ["cimode"]
  };
}
var Browser = (function () {
  function Browser(services) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    _classCallCheck(this, Browser);
    this.type = "languageDetector";
    this.detectors = {};
    this.init(services, options);
  }
  _createClass(Browser, [{
    key: "init",
    value: function init(services) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var i18nOptions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      this.services = services;
      this.options = utils.defaults(options, this.options || ({}), getDefaults());
      if (this.options.lookupFromUrlIndex) this.options.lookupFromPathIndex = this.options.lookupFromUrlIndex;
      this.i18nOptions = i18nOptions;
      this.addDetector(_cookie2.default);
      this.addDetector(_querystring2.default);
      this.addDetector(_localStorage2.default);
      this.addDetector(_navigator2.default);
      this.addDetector(_htmlTag2.default);
      this.addDetector(_path2.default);
      this.addDetector(_subdomain2.default);
    }
  }, {
    key: "addDetector",
    value: function addDetector(detector) {
      this.detectors[detector.name] = detector;
    }
  }, {
    key: "detect",
    value: function detect(detectionOrder) {
      var _this = this;
      if (!detectionOrder) detectionOrder = this.options.order;
      var detected = [];
      detectionOrder.forEach(function (detectorName) {
        if (_this.detectors[detectorName]) {
          var lookup = _this.detectors[detectorName].lookup(_this.options);
          if (lookup && typeof lookup === "string") lookup = [lookup];
          if (lookup) detected = detected.concat(lookup);
        }
      });
      var found = void 0;
      detected.forEach(function (lng) {
        if (found) return;
        var cleanedLng = _this.services.languageUtils.formatLanguageCode(lng);
        if (_this.services.languageUtils.isWhitelisted(cleanedLng)) found = cleanedLng;
      });
      if (!found) {
        var fallbacks = this.i18nOptions.fallbackLng;
        if (typeof fallbacks === "string") fallbacks = [fallbacks];
        if (!fallbacks) fallbacks = [];
        if (Object.prototype.toString.apply(fallbacks) === "[object Array]") {
          found = fallbacks[0];
        } else {
          found = fallbacks[0] || fallbacks.default && fallbacks.default[0];
        }
      }
      ;
      return found;
    }
  }, {
    key: "cacheUserLanguage",
    value: function cacheUserLanguage(lng, caches) {
      var _this2 = this;
      if (!caches) caches = this.options.caches;
      if (!caches) return;
      if (this.options.excludeCacheFor && this.options.excludeCacheFor.indexOf(lng) > -1) return;
      caches.forEach(function (cacheName) {
        if (_this2.detectors[cacheName]) _this2.detectors[cacheName].cacheUserLanguage(lng, _this2.options);
      });
    }
  }]);
  return Browser;
})();
Browser.type = "languageDetector";
exports.default = Browser;

});
___scope___.file("dist/commonjs/utils.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = defaults;
exports.extend = extend;
var arr = [];
var each = arr.forEach;
var slice = arr.slice;
function defaults(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        if (obj[prop] === undefined) obj[prop] = source[prop];
      }
    }
  });
  return obj;
}
function extend(obj) {
  each.call(slice.call(arguments, 1), function (source) {
    if (source) {
      for (var prop in source) {
        obj[prop] = source[prop];
      }
    }
  });
  return obj;
}

});
___scope___.file("dist/commonjs/browserLookups/cookie.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var cookie = {
  create: function create(name, value, minutes, domain) {
    var expires = void 0;
    if (minutes) {
      var date = new Date();
      date.setTime(date.getTime() + minutes * 60 * 1000);
      expires = "; expires=" + date.toGMTString();
    } else expires = "";
    domain = domain ? "domain=" + domain + ";" : "";
    document.cookie = name + "=" + value + expires + ";" + domain + "path=/";
  },
  read: function read(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") {
        c = c.substring(1, c.length);
      }
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  },
  remove: function remove(name) {
    this.create(name, "", -1);
  }
};
exports.default = {
  name: "cookie",
  lookup: function lookup(options) {
    var found = void 0;
    if (options.lookupCookie && typeof document !== "undefined") {
      var c = cookie.read(options.lookupCookie);
      if (c) found = c;
    }
    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(lng, options) {
    if (options.lookupCookie && typeof document !== "undefined") {
      cookie.create(options.lookupCookie, lng, options.cookieMinutes, options.cookieDomain);
    }
  }
};

});
___scope___.file("dist/commonjs/browserLookups/querystring.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "querystring",
  lookup: function lookup(options) {
    var found = void 0;
    if (typeof window !== "undefined") {
      var query = window.location.search.substring(1);
      var params = query.split("&");
      for (var i = 0; i < params.length; i++) {
        var pos = params[i].indexOf("=");
        if (pos > 0) {
          var key = params[i].substring(0, pos);
          if (key === options.lookupQuerystring) {
            found = params[i].substring(pos + 1);
          }
        }
      }
    }
    return found;
  }
};

});
___scope___.file("dist/commonjs/browserLookups/localStorage.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
var hasLocalStorageSupport = void 0;
try {
  hasLocalStorageSupport = window !== "undefined" && window.localStorage !== null;
  var testKey = "i18next.translate.boo";
  window.localStorage.setItem(testKey, "foo");
  window.localStorage.removeItem(testKey);
} catch (e) {
  hasLocalStorageSupport = false;
}
exports.default = {
  name: "localStorage",
  lookup: function lookup(options) {
    var found = void 0;
    if (options.lookupLocalStorage && hasLocalStorageSupport) {
      var lng = window.localStorage.getItem(options.lookupLocalStorage);
      if (lng) found = lng;
    }
    return found;
  },
  cacheUserLanguage: function cacheUserLanguage(lng, options) {
    if (options.lookupLocalStorage && hasLocalStorageSupport) {
      window.localStorage.setItem(options.lookupLocalStorage, lng);
    }
  }
};

});
___scope___.file("dist/commonjs/browserLookups/navigator.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "navigator",
  lookup: function lookup(options) {
    var found = [];
    if (typeof navigator !== "undefined") {
      if (navigator.languages) {
        for (var i = 0; i < navigator.languages.length; i++) {
          found.push(navigator.languages[i]);
        }
      }
      if (navigator.userLanguage) {
        found.push(navigator.userLanguage);
      }
      if (navigator.language) {
        found.push(navigator.language);
      }
    }
    return found.length > 0 ? found : undefined;
  }
};

});
___scope___.file("dist/commonjs/browserLookups/htmlTag.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "htmlTag",
  lookup: function lookup(options) {
    var found = void 0;
    var htmlTag = options.htmlTag || (typeof document !== "undefined" ? document.documentElement : null);
    if (htmlTag && typeof htmlTag.getAttribute === "function") {
      found = htmlTag.getAttribute("lang");
    }
    return found;
  }
};

});
___scope___.file("dist/commonjs/browserLookups/path.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "path",
  lookup: function lookup(options) {
    var found = void 0;
    if (typeof window !== "undefined") {
      var language = window.location.pathname.match(/\/([a-zA-Z-]*)/g);
      if (language instanceof Array) {
        if (typeof options.lookupFromPathIndex === "number") {
          if (typeof language[options.lookupFromPathIndex] !== "string") {
            return undefined;
          }
          found = language[options.lookupFromPathIndex].replace("/", "");
        } else {
          found = language[0].replace("/", "");
        }
      }
    }
    return found;
  }
};

});
___scope___.file("dist/commonjs/browserLookups/subdomain.js", function(exports, require, module){
"use strict";
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = {
  name: "subdomain",
  lookup: function lookup(options) {
    var found = void 0;
    if (typeof window !== "undefined") {
      var language = window.location.href.match(/(?:http[s]*\:\/\/)*(.*?)\.(?=[^\/]*\..{2,5})/gi);
      if (language instanceof Array) {
        if (typeof options.lookupFromSubdomainIndex === "number") {
          found = language[options.lookupFromSubdomainIndex].replace("http://", "").replace("https://", "").replace(".", "");
        } else {
          found = language[0].replace("http://", "").replace("https://", "").replace(".", "");
        }
      }
    }
    return found;
  }
};

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("events", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
if (FuseBox.isServer) {
  module.exports = global.require("events");
} else {
  function EventEmitter() {
    this._events = this._events || ({});
    this._maxListeners = this._maxListeners || undefined;
  }
  module.exports = EventEmitter;
  EventEmitter.EventEmitter = EventEmitter;
  EventEmitter.prototype._events = undefined;
  EventEmitter.prototype._maxListeners = undefined;
  EventEmitter.defaultMaxListeners = 10;
  EventEmitter.prototype.setMaxListeners = function (n) {
    if (!isNumber(n) || n < 0 || isNaN(n)) throw TypeError("n must be a positive number");
    this._maxListeners = n;
    return this;
  };
  EventEmitter.prototype.emit = function (type) {
    var er, handler, len, args, i, listeners;
    if (!this._events) this._events = {};
    if (type === "error") {
      if (!this._events.error || isObject(this._events.error) && !this._events.error.length) {
        er = arguments[1];
        if (er instanceof Error) {
          throw er;
        }
        throw TypeError("Uncaught, unspecified \"error\" event.");
      }
    }
    handler = this._events[type];
    if (isUndefined(handler)) return false;
    if (isFunction(handler)) {
      switch (arguments.length) {
        case 1:
          handler.call(this);
          break;
        case 2:
          handler.call(this, arguments[1]);
          break;
        case 3:
          handler.call(this, arguments[1], arguments[2]);
          break;
        default:
          args = Array.prototype.slice.call(arguments, 1);
          handler.apply(this, args);
      }
    } else if (isObject(handler)) {
      args = Array.prototype.slice.call(arguments, 1);
      listeners = handler.slice();
      len = listeners.length;
      for (i = 0; i < len; i++) listeners[i].apply(this, args);
    }
    return true;
  };
  EventEmitter.prototype.addListener = function (type, listener) {
    var m;
    if (!isFunction(listener)) throw TypeError("listener must be a function");
    if (!this._events) this._events = {};
    if (this._events.newListener) this.emit("newListener", type, isFunction(listener.listener) ? listener.listener : listener);
    if (!this._events[type]) this._events[type] = listener; else if (isObject(this._events[type])) this._events[type].push(listener); else this._events[type] = [this._events[type], listener];
    if (isObject(this._events[type]) && !this._events[type].warned) {
      if (!isUndefined(this._maxListeners)) {
        m = this._maxListeners;
      } else {
        m = EventEmitter.defaultMaxListeners;
      }
      if (m && m > 0 && this._events[type].length > m) {
        this._events[type].warned = true;
        console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[type].length);
        if (typeof console.trace === "function") {
          console.trace();
        }
      }
    }
    return this;
  };
  EventEmitter.prototype.on = EventEmitter.prototype.addListener;
  EventEmitter.prototype.once = function (type, listener) {
    if (!isFunction(listener)) throw TypeError("listener must be a function");
    var fired = false;
    function g() {
      this.removeListener(type, g);
      if (!fired) {
        fired = true;
        listener.apply(this, arguments);
      }
    }
    g.listener = listener;
    this.on(type, g);
    return this;
  };
  EventEmitter.prototype.removeListener = function (type, listener) {
    var list, position, length, i;
    if (!isFunction(listener)) throw TypeError("listener must be a function");
    if (!this._events || !this._events[type]) return this;
    list = this._events[type];
    length = list.length;
    position = -1;
    if (list === listener || isFunction(list.listener) && list.listener === listener) {
      delete this._events[type];
      if (this._events.removeListener) this.emit("removeListener", type, listener);
    } else if (isObject(list)) {
      for (i = length; i-- > 0; ) {
        if (list[i] === listener || list[i].listener && list[i].listener === listener) {
          position = i;
          break;
        }
      }
      if (position < 0) return this;
      if (list.length === 1) {
        list.length = 0;
        delete this._events[type];
      } else {
        list.splice(position, 1);
      }
      if (this._events.removeListener) this.emit("removeListener", type, listener);
    }
    return this;
  };
  EventEmitter.prototype.removeAllListeners = function (type) {
    var key, listeners;
    if (!this._events) return this;
    if (!this._events.removeListener) {
      if (arguments.length === 0) this._events = {}; else if (this._events[type]) delete this._events[type];
      return this;
    }
    if (arguments.length === 0) {
      for (key in this._events) {
        if (key === "removeListener") continue;
        this.removeAllListeners(key);
      }
      this.removeAllListeners("removeListener");
      this._events = {};
      return this;
    }
    listeners = this._events[type];
    if (isFunction(listeners)) {
      this.removeListener(type, listeners);
    } else if (listeners) {
      while (listeners.length) this.removeListener(type, listeners[listeners.length - 1]);
    }
    delete this._events[type];
    return this;
  };
  EventEmitter.prototype.listeners = function (type) {
    var ret;
    if (!this._events || !this._events[type]) ret = []; else if (isFunction(this._events[type])) ret = [this._events[type]]; else ret = this._events[type].slice();
    return ret;
  };
  EventEmitter.prototype.listenerCount = function (type) {
    if (this._events) {
      var evlistener = this._events[type];
      if (isFunction(evlistener)) return 1; else if (evlistener) return evlistener.length;
    }
    return 0;
  };
  EventEmitter.listenerCount = function (emitter, type) {
    return emitter.listenerCount(type);
  };
  function isFunction(arg) {
    return typeof arg === "function";
  }
  function isNumber(arg) {
    return typeof arg === "number";
  }
  function isObject(arg) {
    return typeof arg === "object" && arg !== null;
  }
  function isUndefined(arg) {
    return arg === void 0;
  }
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("base64-js", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
"use strict";
exports.byteLength = byteLength;
exports.toByteArray = toByteArray;
exports.fromByteArray = fromByteArray;
var lookup = [];
var revLookup = [];
var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
var code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
for (var i = 0, len = code.length; i < len; ++i) {
  lookup[i] = code[i];
  revLookup[code.charCodeAt(i)] = i;
}
revLookup[("-").charCodeAt(0)] = 62;
revLookup[("_").charCodeAt(0)] = 63;
function getLens(b64) {
  var len = b64.length;
  if (len % 4 > 0) {
    throw new Error("Invalid string. Length must be a multiple of 4");
  }
  var validLen = b64.indexOf("=");
  if (validLen === -1) validLen = len;
  var placeHoldersLen = validLen === len ? 0 : 4 - validLen % 4;
  return [validLen, placeHoldersLen];
}
function byteLength(b64) {
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function _byteLength(b64, validLen, placeHoldersLen) {
  return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
}
function toByteArray(b64) {
  var tmp;
  var lens = getLens(b64);
  var validLen = lens[0];
  var placeHoldersLen = lens[1];
  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
  var curByte = 0;
  var len = placeHoldersLen > 0 ? validLen - 4 : validLen;
  var i;
  for (i = 0; i < len; i += 4) {
    tmp = revLookup[b64.charCodeAt(i)] << 18 | revLookup[b64.charCodeAt(i + 1)] << 12 | revLookup[b64.charCodeAt(i + 2)] << 6 | revLookup[b64.charCodeAt(i + 3)];
    arr[curByte++] = tmp >> 16 & 255;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 2) {
    tmp = revLookup[b64.charCodeAt(i)] << 2 | revLookup[b64.charCodeAt(i + 1)] >> 4;
    arr[curByte++] = tmp & 255;
  }
  if (placeHoldersLen === 1) {
    tmp = revLookup[b64.charCodeAt(i)] << 10 | revLookup[b64.charCodeAt(i + 1)] << 4 | revLookup[b64.charCodeAt(i + 2)] >> 2;
    arr[curByte++] = tmp >> 8 & 255;
    arr[curByte++] = tmp & 255;
  }
  return arr;
}
function tripletToBase64(num) {
  return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
}
function encodeChunk(uint8, start, end) {
  var tmp;
  var output = [];
  for (var i = start; i < end; i += 3) {
    tmp = (uint8[i] << 16 & 16711680) + (uint8[i + 1] << 8 & 65280) + (uint8[i + 2] & 255);
    output.push(tripletToBase64(tmp));
  }
  return output.join("");
}
function fromByteArray(uint8) {
  var tmp;
  var len = uint8.length;
  var extraBytes = len % 3;
  var parts = [];
  var maxChunkLength = 16383;
  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
    parts.push(encodeChunk(uint8, i, i + maxChunkLength > len2 ? len2 : i + maxChunkLength));
  }
  if (extraBytes === 1) {
    tmp = uint8[len - 1];
    parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
  } else if (extraBytes === 2) {
    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
    parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
  }
  return parts.join("");
}

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("ieee754", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var buffer = require("buffer").Buffer;
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
  var e, m;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = -7;
  var i = isLE ? nBytes - 1 : 0;
  var d = isLE ? -1 : 1;
  var s = buffer[offset + i];
  i += d;
  e = s & (1 << -nBits) - 1;
  s >>= -nBits;
  nBits += eLen;
  for (; nBits > 0; (e = e * 256 + buffer[offset + i], i += d, nBits -= 8)) {}
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; (m = m * 256 + buffer[offset + i], i += d, nBits -= 8)) {}
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : (s ? -1 : 1) * Infinity;
  } else {
    m = m + Math.pow(2, mLen);
    e = e - eBias;
  }
  return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
};
exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
  var e, m, c;
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
  var i = isLE ? 0 : nBytes - 1;
  var d = isLE ? 1 : -1;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  value = Math.abs(value);
  if (isNaN(value) || value === Infinity) {
    m = isNaN(value) ? 1 : 0;
    e = eMax;
  } else {
    e = Math.floor(Math.log(value) / Math.LN2);
    if (value * (c = Math.pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * Math.pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * Math.pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; (buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8)) {}
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; (buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8)) {}
  buffer[offset + i - d] |= s * 128;
};

});
	___scope___.entry = "index.js";
})
FuseBox.pkg("@babel/runtime", {}, function(___scope___){
___scope___.file("helpers/esm/typeof.js", function(exports, require, module){
function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof2(obj);
}
function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }
  return _typeof(obj);
}
module.exports.default = _typeof;

});
___scope___.file("helpers/esm/objectSpread.js", function(exports, require, module){
const __req1__ = require("./defineProperty");
function _objectSpread(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    var ownKeys = Object.keys(source);
    if (typeof Object.getOwnPropertySymbols === "function") {
      ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) {
        return Object.getOwnPropertyDescriptor(source, sym).enumerable;
      }));
    }
    ownKeys.forEach(function (key) {
      __req1__.default(target, key, source[key]);
    });
  }
  return target;
}
module.exports.default = _objectSpread;

});
___scope___.file("helpers/esm/defineProperty.js", function(exports, require, module){
function _defineProperty(obj, key, value) {
  if ((key in obj)) {
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
}
module.exports.default = _defineProperty;

});
___scope___.file("helpers/esm/classCallCheck.js", function(exports, require, module){
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
module.exports.default = _classCallCheck;

});
___scope___.file("helpers/esm/createClass.js", function(exports, require, module){
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if (("value" in descriptor)) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}
function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
module.exports.default = _createClass;

});
___scope___.file("helpers/esm/possibleConstructorReturn.js", function(exports, require, module){
const __req1__ = require("../../helpers/esm/typeof");
const __req2__ = require("./assertThisInitialized");
function _possibleConstructorReturn(self, call) {
  if (call && (__req1__.default(call) === "object" || typeof call === "function")) {
    return call;
  }
  return __req2__.default(self);
}
module.exports.default = _possibleConstructorReturn;

});
___scope___.file("helpers/esm/typeof.js", function(exports, require, module){
function _typeof2(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return typeof obj;
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }
  return _typeof2(obj);
}
function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }
  return _typeof(obj);
}
module.exports.default = _typeof;

});
___scope___.file("helpers/esm/assertThisInitialized.js", function(exports, require, module){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports.default = _assertThisInitialized;

});
___scope___.file("helpers/esm/getPrototypeOf.js", function(exports, require, module){
function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
module.exports.default = _getPrototypeOf;

});
___scope___.file("helpers/esm/assertThisInitialized.js", function(exports, require, module){
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return self;
}
module.exports.default = _assertThisInitialized;

});
___scope___.file("helpers/esm/inherits.js", function(exports, require, module){
const __req1__ = require("./setPrototypeOf");
function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }
  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) __req1__.default(subClass, superClass);
}
module.exports.default = _inherits;

});
___scope___.file("helpers/esm/setPrototypeOf.js", function(exports, require, module){
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || (function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  });
  return _setPrototypeOf(o, p);
}
module.exports.default = _setPrototypeOf;

});
___scope___.file("helpers/esm/toConsumableArray.js", function(exports, require, module){
const __req1__ = require("./arrayWithoutHoles");
const __req2__ = require("./iterableToArray");
const __req3__ = require("./nonIterableSpread");
function _toConsumableArray(arr) {
  return __req1__.default(arr) || __req2__.default(arr) || __req3__.default();
}
module.exports.default = _toConsumableArray;

});
___scope___.file("helpers/esm/arrayWithoutHoles.js", function(exports, require, module){
function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) {
      arr2[i] = arr[i];
    }
    return arr2;
  }
}
module.exports.default = _arrayWithoutHoles;

});
___scope___.file("helpers/esm/iterableToArray.js", function(exports, require, module){
function _iterableToArray(iter) {
  if ((Symbol.iterator in Object(iter)) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
}
module.exports.default = _iterableToArray;

});
___scope___.file("helpers/esm/nonIterableSpread.js", function(exports, require, module){
function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance");
}
module.exports.default = _nonIterableSpread;

});
___scope___.file("helpers/esm/slicedToArray.js", function(exports, require, module){
const __req1__ = require("./arrayWithHoles");
const __req2__ = require("./iterableToArrayLimit");
const __req3__ = require("./nonIterableRest");
function _slicedToArray(arr, i) {
  return __req1__.default(arr) || __req2__.default(arr, i) || __req3__.default();
}
module.exports.default = _slicedToArray;

});
___scope___.file("helpers/esm/arrayWithHoles.js", function(exports, require, module){
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
module.exports.default = _arrayWithHoles;

});
___scope___.file("helpers/esm/iterableToArrayLimit.js", function(exports, require, module){
function _iterableToArrayLimit(arr, i) {
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;
  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}
module.exports.default = _iterableToArrayLimit;

});
___scope___.file("helpers/esm/nonIterableRest.js", function(exports, require, module){
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance");
}
module.exports.default = _nonIterableRest;

});
})