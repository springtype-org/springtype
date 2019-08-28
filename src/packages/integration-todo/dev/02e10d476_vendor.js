FuseBox.pkg("materialize-css", {}, function(___scope___){
___scope___.file("dist/js/materialize.js", function(exports, require, module){
var _get = function get(object, property, receiver) {
  if (object === null) object = Function.prototype;
  var desc = Object.getOwnPropertyDescriptor(object, property);
  if (desc === undefined) {
    var parent = Object.getPrototypeOf(object);
    if (parent === null) {
      return undefined;
    } else {
      return get(parent, property, receiver);
    }
  } else if (("value" in desc)) {
    return desc.value;
  } else {
    var getter = desc.get;
    if (getter === undefined) {
      return undefined;
    }
    return getter.call(receiver);
  }
};
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
function _possibleConstructorReturn(self, call) {
  if (!self) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }
  return call && (typeof call === "object" || typeof call === "function") ? call : self;
}
function _inherits(subClass, superClass) {
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
}
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
(function (factory) {
  window.cash = factory();
})(function () {
  var doc = document, win = window, ArrayProto = Array.prototype, slice = ArrayProto.slice, filter = ArrayProto.filter, push = ArrayProto.push;
  var noop = function () {}, isFunction = function (item) {
    return typeof item === typeof noop && item.call;
  }, isString = function (item) {
    return typeof item === typeof "";
  };
  var idMatch = /^#[\w-]*$/, classMatch = /^\.[\w-]*$/, htmlMatch = /<.+>/, singlet = /^\w+$/;
  function find(selector, context) {
    context = context || doc;
    var elems = classMatch.test(selector) ? context.getElementsByClassName(selector.slice(1)) : singlet.test(selector) ? context.getElementsByTagName(selector) : context.querySelectorAll(selector);
    return elems;
  }
  var frag;
  function parseHTML(str) {
    if (!frag) {
      frag = doc.implementation.createHTMLDocument(null);
      var base = frag.createElement("base");
      base.href = doc.location.href;
      frag.head.appendChild(base);
    }
    frag.body.innerHTML = str;
    return frag.body.childNodes;
  }
  function onReady(fn) {
    if (doc.readyState !== "loading") {
      fn();
    } else {
      doc.addEventListener("DOMContentLoaded", fn);
    }
  }
  function Init(selector, context) {
    if (!selector) {
      return this;
    }
    if (selector.cash && selector !== win) {
      return selector;
    }
    var elems = selector, i = 0, length;
    if (isString(selector)) {
      elems = idMatch.test(selector) ? doc.getElementById(selector.slice(1)) : htmlMatch.test(selector) ? parseHTML(selector) : find(selector, context);
    } else if (isFunction(selector)) {
      onReady(selector);
      return this;
    }
    if (!elems) {
      return this;
    }
    if (elems.nodeType || elems === win) {
      this[0] = elems;
      this.length = 1;
    } else {
      length = this.length = elems.length;
      for (; i < length; i++) {
        this[i] = elems[i];
      }
    }
    return this;
  }
  function cash(selector, context) {
    return new Init(selector, context);
  }
  var fn = cash.fn = cash.prototype = Init.prototype = {
    cash: true,
    length: 0,
    push: push,
    splice: ArrayProto.splice,
    map: ArrayProto.map,
    init: Init
  };
  Object.defineProperty(fn, "constructor", {
    value: cash
  });
  cash.parseHTML = parseHTML;
  cash.noop = noop;
  cash.isFunction = isFunction;
  cash.isString = isString;
  cash.extend = fn.extend = function (target) {
    target = target || ({});
    var args = slice.call(arguments), length = args.length, i = 1;
    if (args.length === 1) {
      target = this;
      i = 0;
    }
    for (; i < length; i++) {
      if (!args[i]) {
        continue;
      }
      for (var key in args[i]) {
        if (args[i].hasOwnProperty(key)) {
          target[key] = args[i][key];
        }
      }
    }
    return target;
  };
  function each(collection, callback) {
    var l = collection.length, i = 0;
    for (; i < l; i++) {
      if (callback.call(collection[i], collection[i], i, collection) === false) {
        break;
      }
    }
  }
  function matches(el, selector) {
    var m = el && (el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector || el.oMatchesSelector);
    return !!m && m.call(el, selector);
  }
  function getCompareFunction(selector) {
    return isString(selector) ? matches : selector.cash ? function (el) {
      return selector.is(el);
    } : function (el, selector) {
      return el === selector;
    };
  }
  function unique(collection) {
    return cash(slice.call(collection).filter(function (item, index, self) {
      return self.indexOf(item) === index;
    }));
  }
  cash.extend({
    merge: function (first, second) {
      var len = +second.length, i = first.length, j = 0;
      for (; j < len; (i++, j++)) {
        first[i] = second[j];
      }
      first.length = i;
      return first;
    },
    each: each,
    matches: matches,
    unique: unique,
    isArray: Array.isArray,
    isNumeric: function (n) {
      return !isNaN(parseFloat(n)) && isFinite(n);
    }
  });
  var uid = cash.uid = "_cash" + Date.now();
  function getDataCache(node) {
    return node[uid] = node[uid] || ({});
  }
  function setData(node, key, value) {
    return getDataCache(node)[key] = value;
  }
  function getData(node, key) {
    var c = getDataCache(node);
    if (c[key] === undefined) {
      c[key] = node.dataset ? node.dataset[key] : cash(node).attr("data-" + key);
    }
    return c[key];
  }
  function removeData(node, key) {
    var c = getDataCache(node);
    if (c) {
      delete c[key];
    } else if (node.dataset) {
      delete node.dataset[key];
    } else {
      cash(node).removeAttr("data-" + name);
    }
  }
  fn.extend({
    data: function (name, value) {
      if (isString(name)) {
        return value === undefined ? getData(this[0], name) : this.each(function (v) {
          return setData(v, name, value);
        });
      }
      for (var key in name) {
        this.data(key, name[key]);
      }
      return this;
    },
    removeData: function (key) {
      return this.each(function (v) {
        return removeData(v, key);
      });
    }
  });
  var notWhiteMatch = /\S+/g;
  function getClasses(c) {
    return isString(c) && c.match(notWhiteMatch);
  }
  function hasClass(v, c) {
    return v.classList ? v.classList.contains(c) : new RegExp("(^| )" + c + "( |$)", "gi").test(v.className);
  }
  function addClass(v, c, spacedName) {
    if (v.classList) {
      v.classList.add(c);
    } else if (spacedName.indexOf(" " + c + " ")) {
      v.className += " " + c;
    }
  }
  function removeClass(v, c) {
    if (v.classList) {
      v.classList.remove(c);
    } else {
      v.className = v.className.replace(c, "");
    }
  }
  fn.extend({
    addClass: function (c) {
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          addClass(v, c, spacedName);
        });
      }) : this;
    },
    attr: function (name, value) {
      if (!name) {
        return undefined;
      }
      if (isString(name)) {
        if (value === undefined) {
          return this[0] ? this[0].getAttribute ? this[0].getAttribute(name) : this[0][name] : undefined;
        }
        return this.each(function (v) {
          if (v.setAttribute) {
            v.setAttribute(name, value);
          } else {
            v[name] = value;
          }
        });
      }
      for (var key in name) {
        this.attr(key, name[key]);
      }
      return this;
    },
    hasClass: function (c) {
      var check = false, classes = getClasses(c);
      if (classes && classes.length) {
        this.each(function (v) {
          check = hasClass(v, classes[0]);
          return !check;
        });
      }
      return check;
    },
    prop: function (name, value) {
      if (isString(name)) {
        return value === undefined ? this[0][name] : this.each(function (v) {
          v[name] = value;
        });
      }
      for (var key in name) {
        this.prop(key, name[key]);
      }
      return this;
    },
    removeAttr: function (name) {
      return this.each(function (v) {
        if (v.removeAttribute) {
          v.removeAttribute(name);
        } else {
          delete v[name];
        }
      });
    },
    removeClass: function (c) {
      if (!arguments.length) {
        return this.attr("class", "");
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        each(classes, function (c) {
          removeClass(v, c);
        });
      }) : this;
    },
    removeProp: function (name) {
      return this.each(function (v) {
        delete v[name];
      });
    },
    toggleClass: function (c, state) {
      if (state !== undefined) {
        return this[state ? "addClass" : "removeClass"](c);
      }
      var classes = getClasses(c);
      return classes ? this.each(function (v) {
        var spacedName = " " + v.className + " ";
        each(classes, function (c) {
          if (hasClass(v, c)) {
            removeClass(v, c);
          } else {
            addClass(v, c, spacedName);
          }
        });
      }) : this;
    }
  });
  fn.extend({
    add: function (selector, context) {
      return unique(cash.merge(this, cash(selector, context)));
    },
    each: function (callback) {
      each(this, callback);
      return this;
    },
    eq: function (index) {
      return cash(this.get(index));
    },
    filter: function (selector) {
      if (!selector) {
        return this;
      }
      var comparator = isFunction(selector) ? selector : getCompareFunction(selector);
      return cash(filter.call(this, function (e) {
        return comparator(e, selector);
      }));
    },
    first: function () {
      return this.eq(0);
    },
    get: function (index) {
      if (index === undefined) {
        return slice.call(this);
      }
      return index < 0 ? this[index + this.length] : this[index];
    },
    index: function (elem) {
      var child = elem ? cash(elem)[0] : this[0], collection = elem ? this : cash(child).parent().children();
      return slice.call(collection).indexOf(child);
    },
    last: function () {
      return this.eq(-1);
    }
  });
  var camelCase = (function () {
    var camelRegex = /(?:^\w|[A-Z]|\b\w)/g, whiteSpace = /[\s-_]+/g;
    return function (str) {
      return str.replace(camelRegex, function (letter, index) {
        return letter[index === 0 ? "toLowerCase" : "toUpperCase"]();
      }).replace(whiteSpace, "");
    };
  })();
  var getPrefixedProp = (function () {
    var cache = {}, doc = document, div = doc.createElement("div"), style = div.style;
    return function (prop) {
      prop = camelCase(prop);
      if (cache[prop]) {
        return cache[prop];
      }
      var ucProp = prop.charAt(0).toUpperCase() + prop.slice(1), prefixes = ["webkit", "moz", "ms", "o"], props = (prop + " " + prefixes.join(ucProp + " ") + ucProp).split(" ");
      each(props, function (p) {
        if ((p in style)) {
          cache[p] = prop = cache[prop] = p;
          return false;
        }
      });
      return cache[prop];
    };
  })();
  cash.prefixedProp = getPrefixedProp;
  cash.camelCase = camelCase;
  fn.extend({
    css: function (prop, value) {
      if (isString(prop)) {
        prop = getPrefixedProp(prop);
        return arguments.length > 1 ? this.each(function (v) {
          return v.style[prop] = value;
        }) : win.getComputedStyle(this[0])[prop];
      }
      for (var key in prop) {
        this.css(key, prop[key]);
      }
      return this;
    }
  });
  function compute(el, prop) {
    return parseInt(win.getComputedStyle(el[0], null)[prop], 10) || 0;
  }
  each(["Width", "Height"], function (v) {
    var lower = v.toLowerCase();
    fn[lower] = function () {
      return this[0].getBoundingClientRect()[lower];
    };
    fn["inner" + v] = function () {
      return this[0]["client" + v];
    };
    fn["outer" + v] = function (margins) {
      return this[0]["offset" + v] + (margins ? compute(this, "margin" + (v === "Width" ? "Left" : "Top")) + compute(this, "margin" + (v === "Width" ? "Right" : "Bottom")) : 0);
    };
  });
  function registerEvent(node, eventName, callback) {
    var eventCache = getData(node, "_cashEvents") || setData(node, "_cashEvents", {});
    eventCache[eventName] = eventCache[eventName] || [];
    eventCache[eventName].push(callback);
    node.addEventListener(eventName, callback);
  }
  function removeEvent(node, eventName, callback) {
    var events = getData(node, "_cashEvents"), eventCache = events && events[eventName], index;
    if (!eventCache) {
      return;
    }
    if (callback) {
      node.removeEventListener(eventName, callback);
      index = eventCache.indexOf(callback);
      if (index >= 0) {
        eventCache.splice(index, 1);
      }
    } else {
      each(eventCache, function (event) {
        node.removeEventListener(eventName, event);
      });
      eventCache = [];
    }
  }
  fn.extend({
    off: function (eventName, callback) {
      return this.each(function (v) {
        return removeEvent(v, eventName, callback);
      });
    },
    on: function (eventName, delegate, callback, runOnce) {
      var originalCallback;
      if (!isString(eventName)) {
        for (var key in eventName) {
          this.on(key, delegate, eventName[key]);
        }
        return this;
      }
      if (isFunction(delegate)) {
        callback = delegate;
        delegate = null;
      }
      if (eventName === "ready") {
        onReady(callback);
        return this;
      }
      if (delegate) {
        originalCallback = callback;
        callback = function (e) {
          var t = e.target;
          while (!matches(t, delegate)) {
            if (t === this || t === null) {
              return t = false;
            }
            t = t.parentNode;
          }
          if (t) {
            originalCallback.call(t, e);
          }
        };
      }
      return this.each(function (v) {
        var finalCallback = callback;
        if (runOnce) {
          finalCallback = function () {
            callback.apply(this, arguments);
            removeEvent(v, eventName, finalCallback);
          };
        }
        registerEvent(v, eventName, finalCallback);
      });
    },
    one: function (eventName, delegate, callback) {
      return this.on(eventName, delegate, callback, true);
    },
    ready: onReady,
    trigger: function (eventName, data) {
      if (document.createEvent) {
        var evt = document.createEvent("HTMLEvents");
        evt.initEvent(eventName, true, false);
        evt = this.extend(evt, data);
        return this.each(function (v) {
          return v.dispatchEvent(evt);
        });
      }
    }
  });
  function encode(name, value) {
    return "&" + encodeURIComponent(name) + "=" + encodeURIComponent(value).replace(/%20/g, "+");
  }
  function getSelectMultiple_(el) {
    var values = [];
    each(el.options, function (o) {
      if (o.selected) {
        values.push(o.value);
      }
    });
    return values.length ? values : null;
  }
  function getSelectSingle_(el) {
    var selectedIndex = el.selectedIndex;
    return selectedIndex >= 0 ? el.options[selectedIndex].value : null;
  }
  function getValue(el) {
    var type = el.type;
    if (!type) {
      return null;
    }
    switch (type.toLowerCase()) {
      case "select-one":
        return getSelectSingle_(el);
      case "select-multiple":
        return getSelectMultiple_(el);
      case "radio":
        return el.checked ? el.value : null;
      case "checkbox":
        return el.checked ? el.value : null;
      default:
        return el.value ? el.value : null;
    }
  }
  fn.extend({
    serialize: function () {
      var query = "";
      each(this[0].elements || this, function (el) {
        if (el.disabled || el.tagName === "FIELDSET") {
          return;
        }
        var name = el.name;
        switch (el.type.toLowerCase()) {
          case "file":
          case "reset":
          case "submit":
          case "button":
            break;
          case "select-multiple":
            var values = getValue(el);
            if (values !== null) {
              each(values, function (value) {
                query += encode(name, value);
              });
            }
            break;
          default:
            var value = getValue(el);
            if (value !== null) {
              query += encode(name, value);
            }
        }
      });
      return query.substr(1);
    },
    val: function (value) {
      if (value === undefined) {
        return getValue(this[0]);
      }
      return this.each(function (v) {
        return v.value = value;
      });
    }
  });
  function insertElement(el, child, prepend) {
    if (prepend) {
      var first = el.childNodes[0];
      el.insertBefore(child, first);
    } else {
      el.appendChild(child);
    }
  }
  function insertContent(parent, child, prepend) {
    var str = isString(child);
    if (!str && child.length) {
      each(child, function (v) {
        return insertContent(parent, v, prepend);
      });
      return;
    }
    each(parent, str ? function (v) {
      return v.insertAdjacentHTML(prepend ? "afterbegin" : "beforeend", child);
    } : function (v, i) {
      return insertElement(v, i === 0 ? child : child.cloneNode(true), prepend);
    });
  }
  fn.extend({
    after: function (selector) {
      cash(selector).insertAfter(this);
      return this;
    },
    append: function (content) {
      insertContent(this, content);
      return this;
    },
    appendTo: function (parent) {
      insertContent(cash(parent), this);
      return this;
    },
    before: function (selector) {
      cash(selector).insertBefore(this);
      return this;
    },
    clone: function () {
      return cash(this.map(function (v) {
        return v.cloneNode(true);
      }));
    },
    empty: function () {
      this.html("");
      return this;
    },
    html: function (content) {
      if (content === undefined) {
        return this[0].innerHTML;
      }
      var source = content.nodeType ? content[0].outerHTML : content;
      return this.each(function (v) {
        return v.innerHTML = source;
      });
    },
    insertAfter: function (selector) {
      var _this = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode, sibling = el.nextSibling;
        _this.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), sibling);
        });
      });
      return this;
    },
    insertBefore: function (selector) {
      var _this2 = this;
      cash(selector).each(function (el, i) {
        var parent = el.parentNode;
        _this2.each(function (v) {
          parent.insertBefore(i === 0 ? v : v.cloneNode(true), el);
        });
      });
      return this;
    },
    prepend: function (content) {
      insertContent(this, content, true);
      return this;
    },
    prependTo: function (parent) {
      insertContent(cash(parent), this, true);
      return this;
    },
    remove: function () {
      return this.each(function (v) {
        if (!!v.parentNode) {
          return v.parentNode.removeChild(v);
        }
      });
    },
    text: function (content) {
      if (content === undefined) {
        return this[0].textContent;
      }
      return this.each(function (v) {
        return v.textContent = content;
      });
    }
  });
  var docEl = doc.documentElement;
  fn.extend({
    position: function () {
      var el = this[0];
      return {
        left: el.offsetLeft,
        top: el.offsetTop
      };
    },
    offset: function () {
      var rect = this[0].getBoundingClientRect();
      return {
        top: rect.top + win.pageYOffset - docEl.clientTop,
        left: rect.left + win.pageXOffset - docEl.clientLeft
      };
    },
    offsetParent: function () {
      return cash(this[0].offsetParent);
    }
  });
  fn.extend({
    children: function (selector) {
      var elems = [];
      this.each(function (el) {
        push.apply(elems, el.children);
      });
      elems = unique(elems);
      return !selector ? elems : elems.filter(function (v) {
        return matches(v, selector);
      });
    },
    closest: function (selector) {
      if (!selector || this.length < 1) {
        return cash();
      }
      if (this.is(selector)) {
        return this.filter(selector);
      }
      return this.parent().closest(selector);
    },
    is: function (selector) {
      if (!selector) {
        return false;
      }
      var match = false, comparator = getCompareFunction(selector);
      this.each(function (el) {
        match = comparator(el, selector);
        return !match;
      });
      return match;
    },
    find: function (selector) {
      if (!selector || selector.nodeType) {
        return cash(selector && this.has(selector).length ? selector : null);
      }
      var elems = [];
      this.each(function (el) {
        push.apply(elems, find(selector, el));
      });
      return unique(elems);
    },
    has: function (selector) {
      var comparator = isString(selector) ? function (el) {
        return find(selector, el).length !== 0;
      } : function (el) {
        return el.contains(selector);
      };
      return this.filter(comparator);
    },
    next: function () {
      return cash(this[0].nextElementSibling);
    },
    not: function (selector) {
      if (!selector) {
        return this;
      }
      var comparator = getCompareFunction(selector);
      return this.filter(function (el) {
        return !comparator(el, selector);
      });
    },
    parent: function () {
      var result = [];
      this.each(function (item) {
        if (item && item.parentNode) {
          result.push(item.parentNode);
        }
      });
      return unique(result);
    },
    parents: function (selector) {
      var last, result = [];
      this.each(function (item) {
        last = item;
        while (last && last.parentNode && last !== doc.body.parentNode) {
          last = last.parentNode;
          if (!selector || selector && matches(last, selector)) {
            result.push(last);
          }
        }
      });
      return unique(result);
    },
    prev: function () {
      return cash(this[0].previousElementSibling);
    },
    siblings: function (selector) {
      var collection = this.parent().children(selector), el = this[0];
      return collection.filter(function (i) {
        return i !== el;
      });
    }
  });
  return cash;
});
;
var Component = (function () {
  function Component(classDef, el, options) {
    _classCallCheck(this, Component);
    if (!(el instanceof Element)) {
      console.error(Error(el + " is not an HTML Element"));
    }
    var ins = classDef.getInstance(el);
    if (!!ins) {
      ins.destroy();
    }
    this.el = el;
    this.$el = cash(el);
  }
  _createClass(Component, null, [{
    key: "init",
    value: function init(classDef, els, options) {
      var instances = null;
      if (els instanceof Element) {
        instances = new classDef(els, options);
      } else if (!!els && (els.jquery || els.cash || els instanceof NodeList)) {
        var instancesArr = [];
        for (var i = 0; i < els.length; i++) {
          instancesArr.push(new classDef(els[i], options));
        }
        instances = instancesArr;
      }
      return instances;
    }
  }]);
  return Component;
})();
;
(function (window) {
  if (window.Package) {
    M = {};
  } else {
    window.M = {};
  }
  M.jQueryLoaded = !!window.jQuery;
})(window);
if (typeof define === "function" && define.amd) {
  define("M", [], function () {
    return M;
  });
} else if (typeof exports !== "undefined" && !exports.nodeType) {
  if (typeof module !== "undefined" && !module.nodeType && module.exports) {
    exports = module.exports = M;
  }
  exports.default = M;
}
M.version = "1.0.0";
M.keys = {
  TAB: 9,
  ENTER: 13,
  ESC: 27,
  ARROW_UP: 38,
  ARROW_DOWN: 40
};
M.tabPressed = false;
M.keyDown = false;
var docHandleKeydown = function (e) {
  M.keyDown = true;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = true;
  }
};
var docHandleKeyup = function (e) {
  M.keyDown = false;
  if (e.which === M.keys.TAB || e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) {
    M.tabPressed = false;
  }
};
var docHandleFocus = function (e) {
  if (M.keyDown) {
    document.body.classList.add("keyboard-focused");
  }
};
var docHandleBlur = function (e) {
  document.body.classList.remove("keyboard-focused");
};
document.addEventListener("keydown", docHandleKeydown, true);
document.addEventListener("keyup", docHandleKeyup, true);
document.addEventListener("focus", docHandleFocus, true);
document.addEventListener("blur", docHandleBlur, true);
M.initializeJqueryWrapper = function (plugin, pluginName, classRef) {
  jQuery.fn[pluginName] = function (methodOrOptions) {
    if (plugin.prototype[methodOrOptions]) {
      var params = Array.prototype.slice.call(arguments, 1);
      if (methodOrOptions.slice(0, 3) === "get") {
        var instance = this.first()[0][classRef];
        return instance[methodOrOptions].apply(instance, params);
      }
      return this.each(function () {
        var instance = this[classRef];
        instance[methodOrOptions].apply(instance, params);
      });
    } else if (typeof methodOrOptions === "object" || !methodOrOptions) {
      plugin.init(this, arguments[0]);
      return this;
    }
    jQuery.error("Method " + methodOrOptions + " does not exist on jQuery." + pluginName);
  };
};
M.AutoInit = function (context) {
  var root = !!context ? context : document.body;
  var registry = {
    Autocomplete: root.querySelectorAll(".autocomplete:not(.no-autoinit)"),
    Carousel: root.querySelectorAll(".carousel:not(.no-autoinit)"),
    Chips: root.querySelectorAll(".chips:not(.no-autoinit)"),
    Collapsible: root.querySelectorAll(".collapsible:not(.no-autoinit)"),
    Datepicker: root.querySelectorAll(".datepicker:not(.no-autoinit)"),
    Dropdown: root.querySelectorAll(".dropdown-trigger:not(.no-autoinit)"),
    Materialbox: root.querySelectorAll(".materialboxed:not(.no-autoinit)"),
    Modal: root.querySelectorAll(".modal:not(.no-autoinit)"),
    Parallax: root.querySelectorAll(".parallax:not(.no-autoinit)"),
    Pushpin: root.querySelectorAll(".pushpin:not(.no-autoinit)"),
    ScrollSpy: root.querySelectorAll(".scrollspy:not(.no-autoinit)"),
    FormSelect: root.querySelectorAll("select:not(.no-autoinit)"),
    Sidenav: root.querySelectorAll(".sidenav:not(.no-autoinit)"),
    Tabs: root.querySelectorAll(".tabs:not(.no-autoinit)"),
    TapTarget: root.querySelectorAll(".tap-target:not(.no-autoinit)"),
    Timepicker: root.querySelectorAll(".timepicker:not(.no-autoinit)"),
    Tooltip: root.querySelectorAll(".tooltipped:not(.no-autoinit)"),
    FloatingActionButton: root.querySelectorAll(".fixed-action-btn:not(.no-autoinit)")
  };
  for (var pluginName in registry) {
    var plugin = M[pluginName];
    plugin.init(registry[pluginName]);
  }
};
M.objectSelectorString = function (obj) {
  var tagStr = obj.prop("tagName") || "";
  var idStr = obj.attr("id") || "";
  var classStr = obj.attr("class") || "";
  return (tagStr + idStr + classStr).replace(/\s/g, "");
};
M.guid = (function () {
  function s4() {
    return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1);
  }
  return function () {
    return s4() + s4() + "-" + s4() + "-" + s4() + "-" + s4() + "-" + s4() + s4() + s4();
  };
})();
M.escapeHash = function (hash) {
  return hash.replace(/(:|\.|\[|\]|,|=|\/)/g, "\\$1");
};
M.elementOrParentIsFixed = function (element) {
  var $element = $(element);
  var $checkElements = $element.add($element.parents());
  var isFixed = false;
  $checkElements.each(function () {
    if ($(this).css("position") === "fixed") {
      isFixed = true;
      return false;
    }
  });
  return isFixed;
};
M.checkWithinContainer = function (container, bounding, offset) {
  var edges = {
    top: false,
    right: false,
    bottom: false,
    left: false
  };
  var containerRect = container.getBoundingClientRect();
  var containerBottom = container === document.body ? Math.max(containerRect.bottom, window.innerHeight) : containerRect.bottom;
  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;
  var scrolledX = bounding.left - scrollLeft;
  var scrolledY = bounding.top - scrollTop;
  if (scrolledX < containerRect.left + offset || scrolledX < offset) {
    edges.left = true;
  }
  if (scrolledX + bounding.width > containerRect.right - offset || scrolledX + bounding.width > window.innerWidth - offset) {
    edges.right = true;
  }
  if (scrolledY < containerRect.top + offset || scrolledY < offset) {
    edges.top = true;
  }
  if (scrolledY + bounding.height > containerBottom - offset || scrolledY + bounding.height > window.innerHeight - offset) {
    edges.bottom = true;
  }
  return edges;
};
M.checkPossibleAlignments = function (el, container, bounding, offset) {
  var canAlign = {
    top: true,
    right: true,
    bottom: true,
    left: true,
    spaceOnTop: null,
    spaceOnRight: null,
    spaceOnBottom: null,
    spaceOnLeft: null
  };
  var containerAllowsOverflow = getComputedStyle(container).overflow === "visible";
  var containerRect = container.getBoundingClientRect();
  var containerHeight = Math.min(containerRect.height, window.innerHeight);
  var containerWidth = Math.min(containerRect.width, window.innerWidth);
  var elOffsetRect = el.getBoundingClientRect();
  var scrollLeft = container.scrollLeft;
  var scrollTop = container.scrollTop;
  var scrolledX = bounding.left - scrollLeft;
  var scrolledYTopEdge = bounding.top - scrollTop;
  var scrolledYBottomEdge = bounding.top + elOffsetRect.height - scrollTop;
  canAlign.spaceOnRight = !containerAllowsOverflow ? containerWidth - (scrolledX + bounding.width) : window.innerWidth - (elOffsetRect.left + bounding.width);
  if (canAlign.spaceOnRight < 0) {
    canAlign.left = false;
  }
  canAlign.spaceOnLeft = !containerAllowsOverflow ? scrolledX - bounding.width + elOffsetRect.width : elOffsetRect.right - bounding.width;
  if (canAlign.spaceOnLeft < 0) {
    canAlign.right = false;
  }
  canAlign.spaceOnBottom = !containerAllowsOverflow ? containerHeight - (scrolledYTopEdge + bounding.height + offset) : window.innerHeight - (elOffsetRect.top + bounding.height + offset);
  if (canAlign.spaceOnBottom < 0) {
    canAlign.top = false;
  }
  canAlign.spaceOnTop = !containerAllowsOverflow ? scrolledYBottomEdge - (bounding.height - offset) : elOffsetRect.bottom - (bounding.height + offset);
  if (canAlign.spaceOnTop < 0) {
    canAlign.bottom = false;
  }
  return canAlign;
};
M.getOverflowParent = function (element) {
  if (element == null) {
    return null;
  }
  if (element === document.body || getComputedStyle(element).overflow !== "visible") {
    return element;
  }
  return M.getOverflowParent(element.parentElement);
};
M.getIdFromTrigger = function (trigger) {
  var id = trigger.getAttribute("data-target");
  if (!id) {
    id = trigger.getAttribute("href");
    if (id) {
      id = id.slice(1);
    } else {
      id = "";
    }
  }
  return id;
};
M.getDocumentScrollTop = function () {
  return window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
};
M.getDocumentScrollLeft = function () {
  return window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0;
};
var getTime = Date.now || (function () {
  return new Date().getTime();
});
M.throttle = function (func, wait, options) {
  var context = void 0, args = void 0, result = void 0;
  var timeout = null;
  var previous = 0;
  options || (options = {});
  var later = function () {
    previous = options.leading === false ? 0 : getTime();
    timeout = null;
    result = func.apply(context, args);
    context = args = null;
  };
  return function () {
    var now = getTime();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0) {
      clearTimeout(timeout);
      timeout = null;
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };
};
;
var $jscomp = {
  scope: {}
};
$jscomp.defineProperty = "function" == typeof Object.defineProperties ? Object.defineProperty : function (e, r, p) {
  if (p.get || p.set) throw new TypeError("ES3 does not support getters and setters.");
  e != Array.prototype && e != Object.prototype && (e[r] = p.value);
};
$jscomp.getGlobal = function (e) {
  return "undefined" != typeof window && window === e ? e : "undefined" != typeof global && null != global ? global : e;
};
$jscomp.global = $jscomp.getGlobal(this);
$jscomp.SYMBOL_PREFIX = "jscomp_symbol_";
$jscomp.initSymbol = function () {
  $jscomp.initSymbol = function () {};
  $jscomp.global.Symbol || ($jscomp.global.Symbol = $jscomp.Symbol);
};
$jscomp.symbolCounter_ = 0;
$jscomp.Symbol = function (e) {
  return $jscomp.SYMBOL_PREFIX + (e || "") + $jscomp.symbolCounter_++;
};
$jscomp.initSymbolIterator = function () {
  $jscomp.initSymbol();
  var e = $jscomp.global.Symbol.iterator;
  e || (e = $jscomp.global.Symbol.iterator = $jscomp.global.Symbol("iterator"));
  "function" != typeof Array.prototype[e] && $jscomp.defineProperty(Array.prototype, e, {
    configurable: !0,
    writable: !0,
    value: function () {
      return $jscomp.arrayIterator(this);
    }
  });
  $jscomp.initSymbolIterator = function () {};
};
$jscomp.arrayIterator = function (e) {
  var r = 0;
  return $jscomp.iteratorPrototype(function () {
    return r < e.length ? {
      done: !1,
      value: e[r++]
    } : {
      done: !0
    };
  });
};
$jscomp.iteratorPrototype = function (e) {
  $jscomp.initSymbolIterator();
  e = {
    next: e
  };
  e[$jscomp.global.Symbol.iterator] = function () {
    return this;
  };
  return e;
};
$jscomp.array = $jscomp.array || ({});
$jscomp.iteratorFromArray = function (e, r) {
  $jscomp.initSymbolIterator();
  e instanceof String && (e += "");
  var p = 0, m = {
    next: function () {
      if (p < e.length) {
        var u = p++;
        return {
          value: r(u, e[u]),
          done: !1
        };
      }
      m.next = function () {
        return {
          done: !0,
          value: void 0
        };
      };
      return m.next();
    }
  };
  m[Symbol.iterator] = function () {
    return m;
  };
  return m;
};
$jscomp.polyfill = function (e, r, p, m) {
  if (r) {
    p = $jscomp.global;
    e = e.split(".");
    for (m = 0; m < e.length - 1; m++) {
      var u = e[m];
      (u in p) || (p[u] = {});
      p = p[u];
    }
    e = e[e.length - 1];
    m = p[e];
    r = r(m);
    r != m && null != r && $jscomp.defineProperty(p, e, {
      configurable: !0,
      writable: !0,
      value: r
    });
  }
};
$jscomp.polyfill("Array.prototype.keys", function (e) {
  return e ? e : function () {
    return $jscomp.iteratorFromArray(this, function (e) {
      return e;
    });
  };
}, "es6-impl", "es3");
var $jscomp$this = this;
(function (r) {
  M.anime = r();
})(function () {
  function e(a) {
    if (!h.col(a)) try {
      return document.querySelectorAll(a);
    } catch (c) {}
  }
  function r(a, c) {
    for (var d = a.length, b = 2 <= arguments.length ? arguments[1] : void 0, f = [], n = 0; n < d; n++) {
      if ((n in a)) {
        var k = a[n];
        c.call(b, k, n, a) && f.push(k);
      }
    }
    return f;
  }
  function p(a) {
    return a.reduce(function (a, d) {
      return a.concat(h.arr(d) ? p(d) : d);
    }, []);
  }
  function m(a) {
    if (h.arr(a)) return a;
    h.str(a) && (a = e(a) || a);
    return a instanceof NodeList || a instanceof HTMLCollection ? [].slice.call(a) : [a];
  }
  function u(a, c) {
    return a.some(function (a) {
      return a === c;
    });
  }
  function C(a) {
    var c = {}, d;
    for (d in a) {
      c[d] = a[d];
    }
    return c;
  }
  function D(a, c) {
    var d = C(a), b;
    for (b in a) {
      d[b] = c.hasOwnProperty(b) ? c[b] : a[b];
    }
    return d;
  }
  function z(a, c) {
    var d = C(a), b;
    for (b in c) {
      d[b] = h.und(a[b]) ? c[b] : a[b];
    }
    return d;
  }
  function T(a) {
    a = a.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (a, c, d, k) {
      return c + c + d + d + k + k;
    });
    var c = (/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i).exec(a);
    a = parseInt(c[1], 16);
    var d = parseInt(c[2], 16), c = parseInt(c[3], 16);
    return "rgba(" + a + "," + d + "," + c + ",1)";
  }
  function U(a) {
    function c(a, c, b) {
      0 > b && (b += 1);
      1 < b && --b;
      return b < 1 / 6 ? a + 6 * (c - a) * b : 0.5 > b ? c : b < 2 / 3 ? a + (c - a) * (2 / 3 - b) * 6 : a;
    }
    var d = (/hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g).exec(a) || (/hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g).exec(a);
    a = parseInt(d[1]) / 360;
    var b = parseInt(d[2]) / 100, f = parseInt(d[3]) / 100, d = d[4] || 1;
    if (0 == b) f = b = a = f; else {
      var n = 0.5 > f ? f * (1 + b) : f + b - f * b, k = 2 * f - n, f = c(k, n, a + 1 / 3), b = c(k, n, a);
      a = c(k, n, a - 1 / 3);
    }
    return "rgba(" + 255 * f + "," + 255 * b + "," + 255 * a + "," + d + ")";
  }
  function y(a) {
    if (a = (/([\+\-]?[0-9#\.]+)(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/).exec(a)) return a[2];
  }
  function V(a) {
    if (-1 < a.indexOf("translate") || "perspective" === a) return "px";
    if (-1 < a.indexOf("rotate") || -1 < a.indexOf("skew")) return "deg";
  }
  function I(a, c) {
    return h.fnc(a) ? a(c.target, c.id, c.total) : a;
  }
  function E(a, c) {
    if ((c in a.style)) return getComputedStyle(a).getPropertyValue(c.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase()) || "0";
  }
  function J(a, c) {
    if (h.dom(a) && u(W, c)) return "transform";
    if (h.dom(a) && (a.getAttribute(c) || h.svg(a) && a[c])) return "attribute";
    if (h.dom(a) && "transform" !== c && E(a, c)) return "css";
    if (null != a[c]) return "object";
  }
  function X(a, c) {
    var d = V(c), d = -1 < c.indexOf("scale") ? 1 : 0 + d;
    a = a.style.transform;
    if (!a) return d;
    for (var b = [], f = [], n = [], k = /(\w+)\((.+?)\)/g; b = k.exec(a); ) {
      (f.push(b[1]), n.push(b[2]));
    }
    a = r(n, function (a, b) {
      return f[b] === c;
    });
    return a.length ? a[0] : d;
  }
  function K(a, c) {
    switch (J(a, c)) {
      case "transform":
        return X(a, c);
      case "css":
        return E(a, c);
      case "attribute":
        return a.getAttribute(c);
    }
    return a[c] || 0;
  }
  function L(a, c) {
    var d = (/^(\*=|\+=|-=)/).exec(a);
    if (!d) return a;
    var b = y(a) || 0;
    c = parseFloat(c);
    a = parseFloat(a.replace(d[0], ""));
    switch (d[0][0]) {
      case "+":
        return c + a + b;
      case "-":
        return c - a + b;
      case "*":
        return c * a + b;
    }
  }
  function F(a, c) {
    return Math.sqrt(Math.pow(c.x - a.x, 2) + Math.pow(c.y - a.y, 2));
  }
  function M(a) {
    a = a.points;
    for (var c = 0, d, b = 0; b < a.numberOfItems; b++) {
      var f = a.getItem(b);
      0 < b && (c += F(d, f));
      d = f;
    }
    return c;
  }
  function N(a) {
    if (a.getTotalLength) return a.getTotalLength();
    switch (a.tagName.toLowerCase()) {
      case "circle":
        return 2 * Math.PI * a.getAttribute("r");
      case "rect":
        return 2 * a.getAttribute("width") + 2 * a.getAttribute("height");
      case "line":
        return F({
          x: a.getAttribute("x1"),
          y: a.getAttribute("y1")
        }, {
          x: a.getAttribute("x2"),
          y: a.getAttribute("y2")
        });
      case "polyline":
        return M(a);
      case "polygon":
        var c = a.points;
        return M(a) + F(c.getItem(c.numberOfItems - 1), c.getItem(0));
    }
  }
  function Y(a, c) {
    function d(b) {
      b = void 0 === b ? 0 : b;
      return a.el.getPointAtLength(1 <= c + b ? c + b : 0);
    }
    var b = d(), f = d(-1), n = d(1);
    switch (a.property) {
      case "x":
        return b.x;
      case "y":
        return b.y;
      case "angle":
        return 180 * Math.atan2(n.y - f.y, n.x - f.x) / Math.PI;
    }
  }
  function O(a, c) {
    var d = /-?\d*\.?\d+/g, b;
    b = h.pth(a) ? a.totalLength : a;
    if (h.col(b)) {
      if (h.rgb(b)) {
        var f = (/rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g).exec(b);
        b = f ? "rgba(" + f[1] + ",1)" : b;
      } else b = h.hex(b) ? T(b) : h.hsl(b) ? U(b) : void 0;
    } else (f = (f = y(b)) ? b.substr(0, b.length - f.length) : b, b = c && !(/\s/g).test(b) ? f + c : f);
    b += "";
    return {
      original: b,
      numbers: b.match(d) ? b.match(d).map(Number) : [0],
      strings: h.str(a) || c ? b.split(d) : []
    };
  }
  function P(a) {
    a = a ? p(h.arr(a) ? a.map(m) : m(a)) : [];
    return r(a, function (a, d, b) {
      return b.indexOf(a) === d;
    });
  }
  function Z(a) {
    var c = P(a);
    return c.map(function (a, b) {
      return {
        target: a,
        id: b,
        total: c.length
      };
    });
  }
  function aa(a, c) {
    var d = C(c);
    if (h.arr(a)) {
      var b = a.length;
      2 !== b || h.obj(a[0]) ? h.fnc(c.duration) || (d.duration = c.duration / b) : a = {
        value: a
      };
    }
    return m(a).map(function (a, b) {
      b = b ? 0 : c.delay;
      a = h.obj(a) && !h.pth(a) ? a : {
        value: a
      };
      h.und(a.delay) && (a.delay = b);
      return a;
    }).map(function (a) {
      return z(a, d);
    });
  }
  function ba(a, c) {
    var d = {}, b;
    for (b in a) {
      var f = I(a[b], c);
      h.arr(f) && (f = f.map(function (a) {
        return I(a, c);
      }), 1 === f.length && (f = f[0]));
      d[b] = f;
    }
    d.duration = parseFloat(d.duration);
    d.delay = parseFloat(d.delay);
    return d;
  }
  function ca(a) {
    return h.arr(a) ? A.apply(this, a) : Q[a];
  }
  function da(a, c) {
    var d;
    return a.tweens.map(function (b) {
      b = ba(b, c);
      var f = b.value, e = K(c.target, a.name), k = d ? d.to.original : e, k = h.arr(f) ? f[0] : k, w = L(h.arr(f) ? f[1] : f, k), e = y(w) || y(k) || y(e);
      b.from = O(k, e);
      b.to = O(w, e);
      b.start = d ? d.end : a.offset;
      b.end = b.start + b.delay + b.duration;
      b.easing = ca(b.easing);
      b.elasticity = (1000 - Math.min(Math.max(b.elasticity, 1), 999)) / 1000;
      b.isPath = h.pth(f);
      b.isColor = h.col(b.from.original);
      b.isColor && (b.round = 1);
      return d = b;
    });
  }
  function ea(a, c) {
    return r(p(a.map(function (a) {
      return c.map(function (b) {
        var c = J(a.target, b.name);
        if (c) {
          var d = da(b, a);
          b = {
            type: c,
            property: b.name,
            animatable: a,
            tweens: d,
            duration: d[d.length - 1].end,
            delay: d[0].delay
          };
        } else b = void 0;
        return b;
      });
    })), function (a) {
      return !h.und(a);
    });
  }
  function R(a, c, d, b) {
    var f = "delay" === a;
    return c.length ? (f ? Math.min : Math.max).apply(Math, c.map(function (b) {
      return b[a];
    })) : f ? b.delay : d.offset + b.delay + b.duration;
  }
  function fa(a) {
    var c = D(ga, a), d = D(S, a), b = Z(a.targets), f = [], e = z(c, d), k;
    for (k in a) {
      e.hasOwnProperty(k) || "targets" === k || f.push({
        name: k,
        offset: e.offset,
        tweens: aa(a[k], d)
      });
    }
    a = ea(b, f);
    return z(c, {
      children: [],
      animatables: b,
      animations: a,
      duration: R("duration", a, c, d),
      delay: R("delay", a, c, d)
    });
  }
  function q(a) {
    function c() {
      return window.Promise && new Promise(function (a) {
        return p = a;
      });
    }
    function d(a) {
      return g.reversed ? g.duration - a : a;
    }
    function b(a) {
      for (var b = 0, c = {}, d = g.animations, f = d.length; b < f; ) {
        var e = d[b], k = e.animatable, h = e.tweens, n = h.length - 1, l = h[n];
        n && (l = r(h, function (b) {
          return a < b.end;
        })[0] || l);
        for (var h = Math.min(Math.max(a - l.start - l.delay, 0), l.duration) / l.duration, w = isNaN(h) ? 1 : l.easing(h, l.elasticity), h = l.to.strings, p = l.round, n = [], m = void 0, m = l.to.numbers.length, t = 0; t < m; t++) {
          var x = void 0, x = l.to.numbers[t], q = l.from.numbers[t], x = l.isPath ? Y(l.value, w * x) : q + w * (x - q);
          p && (l.isColor && 2 < t || (x = Math.round(x * p) / p));
          n.push(x);
        }
        if (l = h.length) for ((m = h[0], w = 0); w < l; w++) {
          (p = h[w + 1], t = n[w], isNaN(t) || (m = p ? m + (t + p) : m + (t + " ")));
        } else m = n[0];
        ha[e.type](k.target, e.property, m, c, k.id);
        e.currentValue = m;
        b++;
      }
      if (b = Object.keys(c).length) for (d = 0; d < b; d++) {
        (H || (H = E(document.body, "transform") ? "transform" : "-webkit-transform"), g.animatables[d].target.style[H] = c[d].join(" "));
      }
      g.currentTime = a;
      g.progress = a / g.duration * 100;
    }
    function f(a) {
      if (g[a]) g[a](g);
    }
    function e() {
      g.remaining && !0 !== g.remaining && g.remaining--;
    }
    function k(a) {
      var k = g.duration, n = g.offset, w = n + g.delay, r = g.currentTime, x = g.reversed, q = d(a);
      if (g.children.length) {
        var u = g.children, v = u.length;
        if (q >= g.currentTime) for (var G = 0; G < v; G++) {
          u[G].seek(q);
        } else for (; v--; ) {
          u[v].seek(q);
        }
      }
      if (q >= w || !k) (g.began || (g.began = !0, f("begin")), f("run"));
      if (q > n && q < k) b(q); else if ((q <= n && 0 !== r && (b(0), x && e()), q >= k && r !== k || !k)) (b(k), x || e());
      f("update");
      a >= k && (g.remaining ? (t = h, "alternate" === g.direction && (g.reversed = !g.reversed)) : (g.pause(), g.completed || (g.completed = !0, f("complete"), ("Promise" in window) && (p(), m = c()))), l = 0);
    }
    a = void 0 === a ? {} : a;
    var h, t, l = 0, p = null, m = c(), g = fa(a);
    g.reset = function () {
      var a = g.direction, c = g.loop;
      g.currentTime = 0;
      g.progress = 0;
      g.paused = !0;
      g.began = !1;
      g.completed = !1;
      g.reversed = "reverse" === a;
      g.remaining = "alternate" === a && 1 === c ? 2 : c;
      b(0);
      for (a = g.children.length; a--; ) {
        g.children[a].reset();
      }
    };
    g.tick = function (a) {
      h = a;
      t || (t = h);
      k((l + h - t) * q.speed);
    };
    g.seek = function (a) {
      k(d(a));
    };
    g.pause = function () {
      var a = v.indexOf(g);
      -1 < a && v.splice(a, 1);
      g.paused = !0;
    };
    g.play = function () {
      g.paused && (g.paused = !1, t = 0, l = d(g.currentTime), v.push(g), B || ia());
    };
    g.reverse = function () {
      g.reversed = !g.reversed;
      t = 0;
      l = d(g.currentTime);
    };
    g.restart = function () {
      g.pause();
      g.reset();
      g.play();
    };
    g.finished = m;
    g.reset();
    g.autoplay && g.play();
    return g;
  }
  var ga = {
    update: void 0,
    begin: void 0,
    run: void 0,
    complete: void 0,
    loop: 1,
    direction: "normal",
    autoplay: !0,
    offset: 0
  }, S = {
    duration: 1000,
    delay: 0,
    easing: "easeOutElastic",
    elasticity: 500,
    round: 0
  }, W = ("translateX translateY translateZ rotate rotateX rotateY rotateZ scale scaleX scaleY scaleZ skewX skewY perspective").split(" "), H, h = {
    arr: function (a) {
      return Array.isArray(a);
    },
    obj: function (a) {
      return -1 < Object.prototype.toString.call(a).indexOf("Object");
    },
    pth: function (a) {
      return h.obj(a) && a.hasOwnProperty("totalLength");
    },
    svg: function (a) {
      return a instanceof SVGElement;
    },
    dom: function (a) {
      return a.nodeType || h.svg(a);
    },
    str: function (a) {
      return "string" === typeof a;
    },
    fnc: function (a) {
      return "function" === typeof a;
    },
    und: function (a) {
      return "undefined" === typeof a;
    },
    hex: function (a) {
      return (/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i).test(a);
    },
    rgb: function (a) {
      return (/^rgb/).test(a);
    },
    hsl: function (a) {
      return (/^hsl/).test(a);
    },
    col: function (a) {
      return h.hex(a) || h.rgb(a) || h.hsl(a);
    }
  }, A = (function () {
    function a(a, d, b) {
      return (((1 - 3 * b + 3 * d) * a + (3 * b - 6 * d)) * a + 3 * d) * a;
    }
    return function (c, d, b, f) {
      if (0 <= c && 1 >= c && 0 <= b && 1 >= b) {
        var e = new Float32Array(11);
        if (c !== d || b !== f) for (var k = 0; 11 > k; ++k) {
          e[k] = a(0.1 * k, c, b);
        }
        return function (k) {
          if (c === d && b === f) return k;
          if (0 === k) return 0;
          if (1 === k) return 1;
          for (var h = 0, l = 1; 10 !== l && e[l] <= k; ++l) {
            h += 0.1;
          }
          --l;
          var l = h + (k - e[l]) / (e[l + 1] - e[l]) * 0.1, n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
          if (0.001 <= n) {
            for (h = 0; 4 > h; ++h) {
              n = 3 * (1 - 3 * b + 3 * c) * l * l + 2 * (3 * b - 6 * c) * l + 3 * c;
              if (0 === n) break;
              var m = a(l, c, b) - k, l = l - m / n;
            }
            k = l;
          } else if (0 === n) k = l; else {
            var l = h, h = h + 0.1, g = 0;
            do {
              (m = l + (h - l) / 2, n = a(m, c, b) - k, 0 < n ? h = m : l = m);
            } while (1e-7 < Math.abs(n) && 10 > ++g);
            k = m;
          }
          return a(k, d, f);
        };
      }
    };
  })(), Q = (function () {
    function a(a, b) {
      return 0 === a || 1 === a ? a : -Math.pow(2, 10 * (a - 1)) * Math.sin(2 * (a - 1 - b / (2 * Math.PI) * Math.asin(1)) * Math.PI / b);
    }
    var c = ("Quad Cubic Quart Quint Sine Expo Circ Back Elastic").split(" "), d = {
      In: [[0.55, 0.085, 0.68, 0.53], [0.55, 0.055, 0.675, 0.19], [0.895, 0.03, 0.685, 0.22], [0.755, 0.05, 0.855, 0.06], [0.47, 0, 0.745, 0.715], [0.95, 0.05, 0.795, 0.035], [0.6, 0.04, 0.98, 0.335], [0.6, -0.28, 0.735, 0.045], a],
      Out: [[0.25, 0.46, 0.45, 0.94], [0.215, 0.61, 0.355, 1], [0.165, 0.84, 0.44, 1], [0.23, 1, 0.32, 1], [0.39, 0.575, 0.565, 1], [0.19, 1, 0.22, 1], [0.075, 0.82, 0.165, 1], [0.175, 0.885, 0.32, 1.275], function (b, c) {
        return 1 - a(1 - b, c);
      }],
      InOut: [[0.455, 0.03, 0.515, 0.955], [0.645, 0.045, 0.355, 1], [0.77, 0, 0.175, 1], [0.86, 0, 0.07, 1], [0.445, 0.05, 0.55, 0.95], [1, 0, 0, 1], [0.785, 0.135, 0.15, 0.86], [0.68, -0.55, 0.265, 1.55], function (b, c) {
        return 0.5 > b ? a(2 * b, c) / 2 : 1 - a(-2 * b + 2, c) / 2;
      }]
    }, b = {
      linear: A(0.25, 0.25, 0.75, 0.75)
    }, f = {}, e;
    for (e in d) {
      (f.type = e, d[f.type].forEach((function (a) {
        return function (d, f) {
          b["ease" + a.type + c[f]] = h.fnc(d) ? d : A.apply($jscomp$this, d);
        };
      })(f)), f = {
        type: f.type
      });
    }
    return b;
  })(), ha = {
    css: function (a, c, d) {
      return a.style[c] = d;
    },
    attribute: function (a, c, d) {
      return a.setAttribute(c, d);
    },
    object: function (a, c, d) {
      return a[c] = d;
    },
    transform: function (a, c, d, b, f) {
      b[f] || (b[f] = []);
      b[f].push(c + "(" + d + ")");
    }
  }, v = [], B = 0, ia = (function () {
    function a() {
      B = requestAnimationFrame(c);
    }
    function c(c) {
      var b = v.length;
      if (b) {
        for (var d = 0; d < b; ) {
          (v[d] && v[d].tick(c), d++);
        }
        a();
      } else (cancelAnimationFrame(B), B = 0);
    }
    return a;
  })();
  q.version = "2.2.0";
  q.speed = 1;
  q.running = v;
  q.remove = function (a) {
    a = P(a);
    for (var c = v.length; c--; ) {
      for (var d = v[c], b = d.animations, f = b.length; f--; ) {
        u(a, b[f].animatable.target) && (b.splice(f, 1), b.length || d.pause());
      }
    }
  };
  q.getValue = K;
  q.path = function (a, c) {
    var d = h.str(a) ? e(a)[0] : a, b = c || 100;
    return function (a) {
      return {
        el: d,
        property: a,
        totalLength: N(d) * (b / 100)
      };
    };
  };
  q.setDashoffset = function (a) {
    var c = N(a);
    a.setAttribute("stroke-dasharray", c);
    return c;
  };
  q.bezier = A;
  q.easings = Q;
  q.timeline = function (a) {
    var c = q(a);
    c.pause();
    c.duration = 0;
    c.add = function (d) {
      c.children.forEach(function (a) {
        a.began = !0;
        a.completed = !0;
      });
      m(d).forEach(function (b) {
        var d = z(b, D(S, a || ({})));
        d.targets = d.targets || a.targets;
        b = c.duration;
        var e = d.offset;
        d.autoplay = !1;
        d.direction = c.direction;
        d.offset = h.und(e) ? b : L(e, b);
        c.began = !0;
        c.completed = !0;
        c.seek(d.offset);
        d = q(d);
        d.began = !0;
        d.completed = !0;
        d.duration > b && (c.duration = d.duration);
        c.children.push(d);
      });
      c.seek(0);
      c.reset();
      c.autoplay && c.restart();
      return c;
    };
    return c;
  };
  q.random = function (a, c) {
    return Math.floor(Math.random() * (c - a + 1)) + a;
  };
  return q;
});
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    accordion: true,
    onOpenStart: undefined,
    onOpenEnd: undefined,
    onCloseStart: undefined,
    onCloseEnd: undefined,
    inDuration: 300,
    outDuration: 300
  };
  var Collapsible = (function (_Component) {
    _inherits(Collapsible, _Component);
    function Collapsible(el, options) {
      _classCallCheck(this, Collapsible);
      var _this3 = _possibleConstructorReturn(this, (Collapsible.__proto__ || Object.getPrototypeOf(Collapsible)).call(this, Collapsible, el, options));
      _this3.el.M_Collapsible = _this3;
      _this3.options = $.extend({}, Collapsible.defaults, options);
      _this3.$headers = _this3.$el.children("li").children(".collapsible-header");
      _this3.$headers.attr("tabindex", 0);
      _this3._setupEventHandlers();
      var $activeBodies = _this3.$el.children("li.active").children(".collapsible-body");
      if (_this3.options.accordion) {
        $activeBodies.first().css("display", "block");
      } else {
        $activeBodies.css("display", "block");
      }
      return _this3;
    }
    _createClass(Collapsible, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Collapsible = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this4 = this;
        this._handleCollapsibleClickBound = this._handleCollapsibleClick.bind(this);
        this._handleCollapsibleKeydownBound = this._handleCollapsibleKeydown.bind(this);
        this.el.addEventListener("click", this._handleCollapsibleClickBound);
        this.$headers.each(function (header) {
          header.addEventListener("keydown", _this4._handleCollapsibleKeydownBound);
        });
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this5 = this;
        this.el.removeEventListener("click", this._handleCollapsibleClickBound);
        this.$headers.each(function (header) {
          header.removeEventListener("keydown", _this5._handleCollapsibleKeydownBound);
        });
      }
    }, {
      key: "_handleCollapsibleClick",
      value: function _handleCollapsibleClick(e) {
        var $header = $(e.target).closest(".collapsible-header");
        if (e.target && $header.length) {
          var $collapsible = $header.closest(".collapsible");
          if ($collapsible[0] === this.el) {
            var $collapsibleLi = $header.closest("li");
            var $collapsibleLis = $collapsible.children("li");
            var isActive = $collapsibleLi[0].classList.contains("active");
            var index = $collapsibleLis.index($collapsibleLi);
            if (isActive) {
              this.close(index);
            } else {
              this.open(index);
            }
          }
        }
      }
    }, {
      key: "_handleCollapsibleKeydown",
      value: function _handleCollapsibleKeydown(e) {
        if (e.keyCode === 13) {
          this._handleCollapsibleClickBound(e);
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn(index) {
        var _this6 = this;
        var $collapsibleLi = this.$el.children("li").eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children(".collapsible-body");
          anim.remove($body[0]);
          $body.css({
            display: "block",
            overflow: "hidden",
            height: 0,
            paddingTop: "",
            paddingBottom: ""
          });
          var pTop = $body.css("padding-top");
          var pBottom = $body.css("padding-bottom");
          var finalHeight = $body[0].scrollHeight;
          $body.css({
            paddingTop: 0,
            paddingBottom: 0
          });
          anim({
            targets: $body[0],
            height: finalHeight,
            paddingTop: pTop,
            paddingBottom: pBottom,
            duration: this.options.inDuration,
            easing: "easeInOutCubic",
            complete: function (anim) {
              $body.css({
                overflow: "",
                paddingTop: "",
                paddingBottom: "",
                height: ""
              });
              if (typeof _this6.options.onOpenEnd === "function") {
                _this6.options.onOpenEnd.call(_this6, $collapsibleLi[0]);
              }
            }
          });
        }
      }
    }, {
      key: "_animateOut",
      value: function _animateOut(index) {
        var _this7 = this;
        var $collapsibleLi = this.$el.children("li").eq(index);
        if ($collapsibleLi.length) {
          var $body = $collapsibleLi.children(".collapsible-body");
          anim.remove($body[0]);
          $body.css("overflow", "hidden");
          anim({
            targets: $body[0],
            height: 0,
            paddingTop: 0,
            paddingBottom: 0,
            duration: this.options.outDuration,
            easing: "easeInOutCubic",
            complete: function () {
              $body.css({
                height: "",
                overflow: "",
                padding: "",
                display: ""
              });
              if (typeof _this7.options.onCloseEnd === "function") {
                _this7.options.onCloseEnd.call(_this7, $collapsibleLi[0]);
              }
            }
          });
        }
      }
    }, {
      key: "open",
      value: function open(index) {
        var _this8 = this;
        var $collapsibleLi = this.$el.children("li").eq(index);
        if ($collapsibleLi.length && !$collapsibleLi[0].classList.contains("active")) {
          if (typeof this.options.onOpenStart === "function") {
            this.options.onOpenStart.call(this, $collapsibleLi[0]);
          }
          if (this.options.accordion) {
            var $collapsibleLis = this.$el.children("li");
            var $activeLis = this.$el.children("li.active");
            $activeLis.each(function (el) {
              var index = $collapsibleLis.index($(el));
              _this8.close(index);
            });
          }
          $collapsibleLi[0].classList.add("active");
          this._animateIn(index);
        }
      }
    }, {
      key: "close",
      value: function close(index) {
        var $collapsibleLi = this.$el.children("li").eq(index);
        if ($collapsibleLi.length && $collapsibleLi[0].classList.contains("active")) {
          if (typeof this.options.onCloseStart === "function") {
            this.options.onCloseStart.call(this, $collapsibleLi[0]);
          }
          $collapsibleLi[0].classList.remove("active");
          this._animateOut(index);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Collapsible.__proto__ || Object.getPrototypeOf(Collapsible), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Collapsible;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Collapsible;
  })(Component);
  M.Collapsible = Collapsible;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Collapsible, "collapsible", "M_Collapsible");
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    alignment: "left",
    autoFocus: true,
    constrainWidth: true,
    container: null,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onItemClick: null
  };
  var Dropdown = (function (_Component2) {
    _inherits(Dropdown, _Component2);
    function Dropdown(el, options) {
      _classCallCheck(this, Dropdown);
      var _this9 = _possibleConstructorReturn(this, (Dropdown.__proto__ || Object.getPrototypeOf(Dropdown)).call(this, Dropdown, el, options));
      _this9.el.M_Dropdown = _this9;
      Dropdown._dropdowns.push(_this9);
      _this9.id = M.getIdFromTrigger(el);
      _this9.dropdownEl = document.getElementById(_this9.id);
      _this9.$dropdownEl = $(_this9.dropdownEl);
      _this9.options = $.extend({}, Dropdown.defaults, options);
      _this9.isOpen = false;
      _this9.isScrollable = false;
      _this9.isTouchMoving = false;
      _this9.focusedIndex = -1;
      _this9.filterQuery = [];
      if (!!_this9.options.container) {
        $(_this9.options.container).append(_this9.dropdownEl);
      } else {
        _this9.$el.after(_this9.dropdownEl);
      }
      _this9._makeDropdownFocusable();
      _this9._resetFilterQueryBound = _this9._resetFilterQuery.bind(_this9);
      _this9._handleDocumentClickBound = _this9._handleDocumentClick.bind(_this9);
      _this9._handleDocumentTouchmoveBound = _this9._handleDocumentTouchmove.bind(_this9);
      _this9._handleDropdownClickBound = _this9._handleDropdownClick.bind(_this9);
      _this9._handleDropdownKeydownBound = _this9._handleDropdownKeydown.bind(_this9);
      _this9._handleTriggerKeydownBound = _this9._handleTriggerKeydown.bind(_this9);
      _this9._setupEventHandlers();
      return _this9;
    }
    _createClass(Dropdown, [{
      key: "destroy",
      value: function destroy() {
        this._resetDropdownStyles();
        this._removeEventHandlers();
        Dropdown._dropdowns.splice(Dropdown._dropdowns.indexOf(this), 1);
        this.el.M_Dropdown = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this.el.addEventListener("keydown", this._handleTriggerKeydownBound);
        this.dropdownEl.addEventListener("click", this._handleDropdownClickBound);
        if (this.options.hover) {
          this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
          this.el.addEventListener("mouseenter", this._handleMouseEnterBound);
          this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
          this.el.addEventListener("mouseleave", this._handleMouseLeaveBound);
          this.dropdownEl.addEventListener("mouseleave", this._handleMouseLeaveBound);
        } else {
          this._handleClickBound = this._handleClick.bind(this);
          this.el.addEventListener("click", this._handleClickBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("keydown", this._handleTriggerKeydownBound);
        this.dropdownEl.removeEventListener("click", this._handleDropdownClickBound);
        if (this.options.hover) {
          this.el.removeEventListener("mouseenter", this._handleMouseEnterBound);
          this.el.removeEventListener("mouseleave", this._handleMouseLeaveBound);
          this.dropdownEl.removeEventListener("mouseleave", this._handleMouseLeaveBound);
        } else {
          this.el.removeEventListener("click", this._handleClickBound);
        }
      }
    }, {
      key: "_setupTemporaryEventHandlers",
      value: function _setupTemporaryEventHandlers() {
        document.body.addEventListener("click", this._handleDocumentClickBound, true);
        document.body.addEventListener("touchend", this._handleDocumentClickBound);
        document.body.addEventListener("touchmove", this._handleDocumentTouchmoveBound);
        this.dropdownEl.addEventListener("keydown", this._handleDropdownKeydownBound);
      }
    }, {
      key: "_removeTemporaryEventHandlers",
      value: function _removeTemporaryEventHandlers() {
        document.body.removeEventListener("click", this._handleDocumentClickBound, true);
        document.body.removeEventListener("touchend", this._handleDocumentClickBound);
        document.body.removeEventListener("touchmove", this._handleDocumentTouchmoveBound);
        this.dropdownEl.removeEventListener("keydown", this._handleDropdownKeydownBound);
      }
    }, {
      key: "_handleClick",
      value: function _handleClick(e) {
        e.preventDefault();
        this.open();
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.open();
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave(e) {
        var toEl = e.toElement || e.relatedTarget;
        var leaveToDropdownContent = !!$(toEl).closest(".dropdown-content").length;
        var leaveToActiveDropdownTrigger = false;
        var $closestTrigger = $(toEl).closest(".dropdown-trigger");
        if ($closestTrigger.length && !!$closestTrigger[0].M_Dropdown && $closestTrigger[0].M_Dropdown.isOpen) {
          leaveToActiveDropdownTrigger = true;
        }
        if (!leaveToActiveDropdownTrigger && !leaveToDropdownContent) {
          this.close();
        }
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        var _this10 = this;
        var $target = $(e.target);
        if (this.options.closeOnClick && $target.closest(".dropdown-content").length && !this.isTouchMoving) {
          setTimeout(function () {
            _this10.close();
          }, 0);
        } else if ($target.closest(".dropdown-trigger").length || !$target.closest(".dropdown-content").length) {
          setTimeout(function () {
            _this10.close();
          }, 0);
        }
        this.isTouchMoving = false;
      }
    }, {
      key: "_handleTriggerKeydown",
      value: function _handleTriggerKeydown(e) {
        if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ENTER) && !this.isOpen) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleDocumentTouchmove",
      value: function _handleDocumentTouchmove(e) {
        var $target = $(e.target);
        if ($target.closest(".dropdown-content").length) {
          this.isTouchMoving = true;
        }
      }
    }, {
      key: "_handleDropdownClick",
      value: function _handleDropdownClick(e) {
        if (typeof this.options.onItemClick === "function") {
          var itemEl = $(e.target).closest("li")[0];
          this.options.onItemClick.call(this, itemEl);
        }
      }
    }, {
      key: "_handleDropdownKeydown",
      value: function _handleDropdownKeydown(e) {
        if (e.which === M.keys.TAB) {
          e.preventDefault();
          this.close();
        } else if ((e.which === M.keys.ARROW_DOWN || e.which === M.keys.ARROW_UP) && this.isOpen) {
          e.preventDefault();
          var direction = e.which === M.keys.ARROW_DOWN ? 1 : -1;
          var newFocusedIndex = this.focusedIndex;
          var foundNewIndex = false;
          do {
            newFocusedIndex = newFocusedIndex + direction;
            if (!!this.dropdownEl.children[newFocusedIndex] && this.dropdownEl.children[newFocusedIndex].tabIndex !== -1) {
              foundNewIndex = true;
              break;
            }
          } while (newFocusedIndex < this.dropdownEl.children.length && newFocusedIndex >= 0);
          if (foundNewIndex) {
            this.focusedIndex = newFocusedIndex;
            this._focusFocusedItem();
          }
        } else if (e.which === M.keys.ENTER && this.isOpen) {
          var focusedElement = this.dropdownEl.children[this.focusedIndex];
          var $activatableElement = $(focusedElement).find("a, button").first();
          if (!!$activatableElement.length) {
            $activatableElement[0].click();
          } else if (!!focusedElement) {
            focusedElement.click();
          }
        } else if (e.which === M.keys.ESC && this.isOpen) {
          e.preventDefault();
          this.close();
        }
        var letter = String.fromCharCode(e.which).toLowerCase(), nonLetters = [9, 13, 27, 38, 40];
        if (letter && nonLetters.indexOf(e.which) === -1) {
          this.filterQuery.push(letter);
          var string = this.filterQuery.join(""), newOptionEl = $(this.dropdownEl).find("li").filter(function (el) {
            return $(el).text().toLowerCase().indexOf(string) === 0;
          })[0];
          if (newOptionEl) {
            this.focusedIndex = $(newOptionEl).index();
            this._focusFocusedItem();
          }
        }
        this.filterTimeout = setTimeout(this._resetFilterQueryBound, 1000);
      }
    }, {
      key: "_resetFilterQuery",
      value: function _resetFilterQuery() {
        this.filterQuery = [];
      }
    }, {
      key: "_resetDropdownStyles",
      value: function _resetDropdownStyles() {
        this.$dropdownEl.css({
          display: "",
          width: "",
          height: "",
          left: "",
          top: "",
          "transform-origin": "",
          transform: "",
          opacity: ""
        });
      }
    }, {
      key: "_makeDropdownFocusable",
      value: function _makeDropdownFocusable() {
        this.dropdownEl.tabIndex = 0;
        $(this.dropdownEl).children().each(function (el) {
          if (!el.getAttribute("tabindex")) {
            el.setAttribute("tabindex", 0);
          }
        });
      }
    }, {
      key: "_focusFocusedItem",
      value: function _focusFocusedItem() {
        if (this.focusedIndex >= 0 && this.focusedIndex < this.dropdownEl.children.length && this.options.autoFocus) {
          this.dropdownEl.children[this.focusedIndex].focus();
        }
      }
    }, {
      key: "_getDropdownPosition",
      value: function _getDropdownPosition() {
        var offsetParentBRect = this.el.offsetParent.getBoundingClientRect();
        var triggerBRect = this.el.getBoundingClientRect();
        var dropdownBRect = this.dropdownEl.getBoundingClientRect();
        var idealHeight = dropdownBRect.height;
        var idealWidth = dropdownBRect.width;
        var idealXPos = triggerBRect.left - dropdownBRect.left;
        var idealYPos = triggerBRect.top - dropdownBRect.top;
        var dropdownBounds = {
          left: idealXPos,
          top: idealYPos,
          height: idealHeight,
          width: idealWidth
        };
        var closestOverflowParent = !!this.dropdownEl.offsetParent ? this.dropdownEl.offsetParent : this.dropdownEl.parentNode;
        var alignments = M.checkPossibleAlignments(this.el, closestOverflowParent, dropdownBounds, this.options.coverTrigger ? 0 : triggerBRect.height);
        var verticalAlignment = "top";
        var horizontalAlignment = this.options.alignment;
        idealYPos += this.options.coverTrigger ? 0 : triggerBRect.height;
        this.isScrollable = false;
        if (!alignments.top) {
          if (alignments.bottom) {
            verticalAlignment = "bottom";
          } else {
            this.isScrollable = true;
            if (alignments.spaceOnTop > alignments.spaceOnBottom) {
              verticalAlignment = "bottom";
              idealHeight += alignments.spaceOnTop;
              idealYPos -= alignments.spaceOnTop;
            } else {
              idealHeight += alignments.spaceOnBottom;
            }
          }
        }
        if (!alignments[horizontalAlignment]) {
          var oppositeAlignment = horizontalAlignment === "left" ? "right" : "left";
          if (alignments[oppositeAlignment]) {
            horizontalAlignment = oppositeAlignment;
          } else {
            if (alignments.spaceOnLeft > alignments.spaceOnRight) {
              horizontalAlignment = "right";
              idealWidth += alignments.spaceOnLeft;
              idealXPos -= alignments.spaceOnLeft;
            } else {
              horizontalAlignment = "left";
              idealWidth += alignments.spaceOnRight;
            }
          }
        }
        if (verticalAlignment === "bottom") {
          idealYPos = idealYPos - dropdownBRect.height + (this.options.coverTrigger ? triggerBRect.height : 0);
        }
        if (horizontalAlignment === "right") {
          idealXPos = idealXPos - dropdownBRect.width + triggerBRect.width;
        }
        return {
          x: idealXPos,
          y: idealYPos,
          verticalAlignment: verticalAlignment,
          horizontalAlignment: horizontalAlignment,
          height: idealHeight,
          width: idealWidth
        };
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this11 = this;
        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: [0, 1],
            easing: "easeOutQuad"
          },
          scaleX: [0.3, 1],
          scaleY: [0.3, 1],
          duration: this.options.inDuration,
          easing: "easeOutQuint",
          complete: function (anim) {
            if (_this11.options.autoFocus) {
              _this11.dropdownEl.focus();
            }
            if (typeof _this11.options.onOpenEnd === "function") {
              _this11.options.onOpenEnd.call(_this11, _this11.el);
            }
          }
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this12 = this;
        anim.remove(this.dropdownEl);
        anim({
          targets: this.dropdownEl,
          opacity: {
            value: 0,
            easing: "easeOutQuint"
          },
          scaleX: 0.3,
          scaleY: 0.3,
          duration: this.options.outDuration,
          easing: "easeOutQuint",
          complete: function (anim) {
            _this12._resetDropdownStyles();
            if (typeof _this12.options.onCloseEnd === "function") {
              _this12.options.onCloseEnd.call(_this12, _this12.el);
            }
          }
        });
      }
    }, {
      key: "_placeDropdown",
      value: function _placeDropdown() {
        var idealWidth = this.options.constrainWidth ? this.el.getBoundingClientRect().width : this.dropdownEl.getBoundingClientRect().width;
        this.dropdownEl.style.width = idealWidth + "px";
        var positionInfo = this._getDropdownPosition();
        this.dropdownEl.style.left = positionInfo.x + "px";
        this.dropdownEl.style.top = positionInfo.y + "px";
        this.dropdownEl.style.height = positionInfo.height + "px";
        this.dropdownEl.style.width = positionInfo.width + "px";
        this.dropdownEl.style.transformOrigin = (positionInfo.horizontalAlignment === "left" ? "0" : "100%") + " " + (positionInfo.verticalAlignment === "top" ? "0" : "100%");
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        if (typeof this.options.onOpenStart === "function") {
          this.options.onOpenStart.call(this, this.el);
        }
        this._resetDropdownStyles();
        this.dropdownEl.style.display = "block";
        this._placeDropdown();
        this._animateIn();
        this._setupTemporaryEventHandlers();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.focusedIndex = -1;
        if (typeof this.options.onCloseStart === "function") {
          this.options.onCloseStart.call(this, this.el);
        }
        this._animateOut();
        this._removeTemporaryEventHandlers();
        if (this.options.autoFocus) {
          this.el.focus();
        }
      }
    }, {
      key: "recalculateDimensions",
      value: function recalculateDimensions() {
        if (this.isOpen) {
          this.$dropdownEl.css({
            width: "",
            height: "",
            left: "",
            top: "",
            "transform-origin": ""
          });
          this._placeDropdown();
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Dropdown.__proto__ || Object.getPrototypeOf(Dropdown), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Dropdown;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Dropdown;
  })(Component);
  Dropdown._dropdowns = [];
  M.Dropdown = Dropdown;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Dropdown, "dropdown", "M_Dropdown");
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    opacity: 0.5,
    inDuration: 250,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true,
    dismissible: true,
    startingTop: "4%",
    endingTop: "10%"
  };
  var Modal = (function (_Component3) {
    _inherits(Modal, _Component3);
    function Modal(el, options) {
      _classCallCheck(this, Modal);
      var _this13 = _possibleConstructorReturn(this, (Modal.__proto__ || Object.getPrototypeOf(Modal)).call(this, Modal, el, options));
      _this13.el.M_Modal = _this13;
      _this13.options = $.extend({}, Modal.defaults, options);
      _this13.isOpen = false;
      _this13.id = _this13.$el.attr("id");
      _this13._openingTrigger = undefined;
      _this13.$overlay = $("<div class=\"modal-overlay\"></div>");
      _this13.el.tabIndex = 0;
      _this13._nthModalOpened = 0;
      Modal._count++;
      _this13._setupEventHandlers();
      return _this13;
    }
    _createClass(Modal, [{
      key: "destroy",
      value: function destroy() {
        Modal._count--;
        this._removeEventHandlers();
        this.el.removeAttribute("style");
        this.$overlay.remove();
        this.el.M_Modal = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleOverlayClickBound = this._handleOverlayClick.bind(this);
        this._handleModalCloseClickBound = this._handleModalCloseClick.bind(this);
        if (Modal._count === 1) {
          document.body.addEventListener("click", this._handleTriggerClick);
        }
        this.$overlay[0].addEventListener("click", this._handleOverlayClickBound);
        this.el.addEventListener("click", this._handleModalCloseClickBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Modal._count === 0) {
          document.body.removeEventListener("click", this._handleTriggerClick);
        }
        this.$overlay[0].removeEventListener("click", this._handleOverlayClickBound);
        this.el.removeEventListener("click", this._handleModalCloseClickBound);
      }
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest(".modal-trigger");
        if ($trigger.length) {
          var modalId = M.getIdFromTrigger($trigger[0]);
          var modalInstance = document.getElementById(modalId).M_Modal;
          if (modalInstance) {
            modalInstance.open($trigger);
          }
          e.preventDefault();
        }
      }
    }, {
      key: "_handleOverlayClick",
      value: function _handleOverlayClick() {
        if (this.options.dismissible) {
          this.close();
        }
      }
    }, {
      key: "_handleModalCloseClick",
      value: function _handleModalCloseClick(e) {
        var $closeTrigger = $(e.target).closest(".modal-close");
        if ($closeTrigger.length) {
          this.close();
        }
      }
    }, {
      key: "_handleKeydown",
      value: function _handleKeydown(e) {
        if (e.keyCode === 27 && this.options.dismissible) {
          this.close();
        }
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus(e) {
        if (!this.el.contains(e.target) && this._nthModalOpened === Modal._modalsOpen) {
          this.el.focus();
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        var _this14 = this;
        $.extend(this.el.style, {
          display: "block",
          opacity: 0
        });
        $.extend(this.$overlay[0].style, {
          display: "block",
          opacity: 0
        });
        anim({
          targets: this.$overlay[0],
          opacity: this.options.opacity,
          duration: this.options.inDuration,
          easing: "easeOutQuad"
        });
        var enterAnimOptions = {
          targets: this.el,
          duration: this.options.inDuration,
          easing: "easeOutCubic",
          complete: function () {
            if (typeof _this14.options.onOpenEnd === "function") {
              _this14.options.onOpenEnd.call(_this14, _this14.el, _this14._openingTrigger);
            }
          }
        };
        if (this.el.classList.contains("bottom-sheet")) {
          $.extend(enterAnimOptions, {
            bottom: 0,
            opacity: 1
          });
          anim(enterAnimOptions);
        } else {
          $.extend(enterAnimOptions, {
            top: [this.options.startingTop, this.options.endingTop],
            opacity: 1,
            scaleX: [0.8, 1],
            scaleY: [0.8, 1]
          });
          anim(enterAnimOptions);
        }
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        var _this15 = this;
        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: "easeOutQuart"
        });
        var exitAnimOptions = {
          targets: this.el,
          duration: this.options.outDuration,
          easing: "easeOutCubic",
          complete: function () {
            _this15.el.style.display = "none";
            _this15.$overlay.remove();
            if (typeof _this15.options.onCloseEnd === "function") {
              _this15.options.onCloseEnd.call(_this15, _this15.el);
            }
          }
        };
        if (this.el.classList.contains("bottom-sheet")) {
          $.extend(exitAnimOptions, {
            bottom: "-100%",
            opacity: 0
          });
          anim(exitAnimOptions);
        } else {
          $.extend(exitAnimOptions, {
            top: [this.options.endingTop, this.options.startingTop],
            opacity: 0,
            scaleX: 0.8,
            scaleY: 0.8
          });
          anim(exitAnimOptions);
        }
      }
    }, {
      key: "open",
      value: function open($trigger) {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        Modal._modalsOpen++;
        this._nthModalOpened = Modal._modalsOpen;
        this.$overlay[0].style.zIndex = 1000 + Modal._modalsOpen * 2;
        this.el.style.zIndex = 1000 + Modal._modalsOpen * 2 + 1;
        this._openingTrigger = !!$trigger ? $trigger[0] : undefined;
        if (typeof this.options.onOpenStart === "function") {
          this.options.onOpenStart.call(this, this.el, this._openingTrigger);
        }
        if (this.options.preventScrolling) {
          document.body.style.overflow = "hidden";
        }
        this.el.classList.add("open");
        this.el.insertAdjacentElement("afterend", this.$overlay[0]);
        if (this.options.dismissible) {
          this._handleKeydownBound = this._handleKeydown.bind(this);
          this._handleFocusBound = this._handleFocus.bind(this);
          document.addEventListener("keydown", this._handleKeydownBound);
          document.addEventListener("focus", this._handleFocusBound, true);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateIn();
        this.el.focus();
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        Modal._modalsOpen--;
        this._nthModalOpened = 0;
        if (typeof this.options.onCloseStart === "function") {
          this.options.onCloseStart.call(this, this.el);
        }
        this.el.classList.remove("open");
        if (Modal._modalsOpen === 0) {
          document.body.style.overflow = "";
        }
        if (this.options.dismissible) {
          document.removeEventListener("keydown", this._handleKeydownBound);
          document.removeEventListener("focus", this._handleFocusBound, true);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        this._animateOut();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Modal.__proto__ || Object.getPrototypeOf(Modal), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Modal;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Modal;
  })(Component);
  Modal._modalsOpen = 0;
  Modal._count = 0;
  M.Modal = Modal;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Modal, "modal", "M_Modal");
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    inDuration: 275,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  };
  var Materialbox = (function (_Component4) {
    _inherits(Materialbox, _Component4);
    function Materialbox(el, options) {
      _classCallCheck(this, Materialbox);
      var _this16 = _possibleConstructorReturn(this, (Materialbox.__proto__ || Object.getPrototypeOf(Materialbox)).call(this, Materialbox, el, options));
      _this16.el.M_Materialbox = _this16;
      _this16.options = $.extend({}, Materialbox.defaults, options);
      _this16.overlayActive = false;
      _this16.doneAnimating = true;
      _this16.placeholder = $("<div></div>").addClass("material-placeholder");
      _this16.originalWidth = 0;
      _this16.originalHeight = 0;
      _this16.originInlineStyles = _this16.$el.attr("style");
      _this16.caption = _this16.el.getAttribute("data-caption") || "";
      _this16.$el.before(_this16.placeholder);
      _this16.placeholder.append(_this16.$el);
      _this16._setupEventHandlers();
      return _this16;
    }
    _createClass(Materialbox, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Materialbox = undefined;
        $(this.placeholder).after(this.el).remove();
        this.$el.removeAttr("style");
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMaterialboxClickBound = this._handleMaterialboxClick.bind(this);
        this.el.addEventListener("click", this._handleMaterialboxClickBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleMaterialboxClickBound);
      }
    }, {
      key: "_handleMaterialboxClick",
      value: function _handleMaterialboxClick(e) {
        if (this.doneAnimating === false || this.overlayActive && this.doneAnimating) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        if (this.overlayActive) {
          this.close();
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (this.overlayActive) {
          this.close();
        }
      }
    }, {
      key: "_handleWindowEscape",
      value: function _handleWindowEscape(e) {
        if (e.keyCode === 27 && this.doneAnimating && this.overlayActive) {
          this.close();
        }
      }
    }, {
      key: "_makeAncestorsOverflowVisible",
      value: function _makeAncestorsOverflowVisible() {
        this.ancestorsChanged = $();
        var ancestor = this.placeholder[0].parentNode;
        while (ancestor !== null && !$(ancestor).is(document)) {
          var curr = $(ancestor);
          if (curr.css("overflow") !== "visible") {
            curr.css("overflow", "visible");
            if (this.ancestorsChanged === undefined) {
              this.ancestorsChanged = curr;
            } else {
              this.ancestorsChanged = this.ancestorsChanged.add(curr);
            }
          }
          ancestor = ancestor.parentNode;
        }
      }
    }, {
      key: "_animateImageIn",
      value: function _animateImageIn() {
        var _this17 = this;
        var animOptions = {
          targets: this.el,
          height: [this.originalHeight, this.newHeight],
          width: [this.originalWidth, this.newWidth],
          left: M.getDocumentScrollLeft() + this.windowWidth / 2 - this.placeholder.offset().left - this.newWidth / 2,
          top: M.getDocumentScrollTop() + this.windowHeight / 2 - this.placeholder.offset().top - this.newHeight / 2,
          duration: this.options.inDuration,
          easing: "easeOutQuad",
          complete: function () {
            _this17.doneAnimating = true;
            if (typeof _this17.options.onOpenEnd === "function") {
              _this17.options.onOpenEnd.call(_this17, _this17.el);
            }
          }
        };
        this.maxWidth = this.$el.css("max-width");
        this.maxHeight = this.$el.css("max-height");
        if (this.maxWidth !== "none") {
          animOptions.maxWidth = this.newWidth;
        }
        if (this.maxHeight !== "none") {
          animOptions.maxHeight = this.newHeight;
        }
        anim(animOptions);
      }
    }, {
      key: "_animateImageOut",
      value: function _animateImageOut() {
        var _this18 = this;
        var animOptions = {
          targets: this.el,
          width: this.originalWidth,
          height: this.originalHeight,
          left: 0,
          top: 0,
          duration: this.options.outDuration,
          easing: "easeOutQuad",
          complete: function () {
            _this18.placeholder.css({
              height: "",
              width: "",
              position: "",
              top: "",
              left: ""
            });
            if (_this18.attrWidth) {
              _this18.$el.attr("width", _this18.attrWidth);
            }
            if (_this18.attrHeight) {
              _this18.$el.attr("height", _this18.attrHeight);
            }
            _this18.$el.removeAttr("style");
            _this18.originInlineStyles && _this18.$el.attr("style", _this18.originInlineStyles);
            _this18.$el.removeClass("active");
            _this18.doneAnimating = true;
            if (_this18.ancestorsChanged.length) {
              _this18.ancestorsChanged.css("overflow", "");
            }
            if (typeof _this18.options.onCloseEnd === "function") {
              _this18.options.onCloseEnd.call(_this18, _this18.el);
            }
          }
        };
        anim(animOptions);
      }
    }, {
      key: "_updateVars",
      value: function _updateVars() {
        this.windowWidth = window.innerWidth;
        this.windowHeight = window.innerHeight;
        this.caption = this.el.getAttribute("data-caption") || "";
      }
    }, {
      key: "open",
      value: function open() {
        var _this19 = this;
        this._updateVars();
        this.originalWidth = this.el.getBoundingClientRect().width;
        this.originalHeight = this.el.getBoundingClientRect().height;
        this.doneAnimating = false;
        this.$el.addClass("active");
        this.overlayActive = true;
        if (typeof this.options.onOpenStart === "function") {
          this.options.onOpenStart.call(this, this.el);
        }
        this.placeholder.css({
          width: this.placeholder[0].getBoundingClientRect().width + "px",
          height: this.placeholder[0].getBoundingClientRect().height + "px",
          position: "relative",
          top: 0,
          left: 0
        });
        this._makeAncestorsOverflowVisible();
        this.$el.css({
          position: "absolute",
          "z-index": 1000,
          "will-change": "left, top, width, height"
        });
        this.attrWidth = this.$el.attr("width");
        this.attrHeight = this.$el.attr("height");
        if (this.attrWidth) {
          this.$el.css("width", this.attrWidth + "px");
          this.$el.removeAttr("width");
        }
        if (this.attrHeight) {
          this.$el.css("width", this.attrHeight + "px");
          this.$el.removeAttr("height");
        }
        this.$overlay = $("<div id=\"materialbox-overlay\"></div>").css({
          opacity: 0
        }).one("click", function () {
          if (_this19.doneAnimating) {
            _this19.close();
          }
        });
        this.$el.before(this.$overlay);
        var overlayOffset = this.$overlay[0].getBoundingClientRect();
        this.$overlay.css({
          width: this.windowWidth + "px",
          height: this.windowHeight + "px",
          left: -1 * overlayOffset.left + "px",
          top: -1 * overlayOffset.top + "px"
        });
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        anim({
          targets: this.$overlay[0],
          opacity: 1,
          duration: this.options.inDuration,
          easing: "easeOutQuad"
        });
        if (this.caption !== "") {
          if (this.$photocaption) {
            anim.remove(this.$photoCaption[0]);
          }
          this.$photoCaption = $("<div class=\"materialbox-caption\"></div>");
          this.$photoCaption.text(this.caption);
          $("body").append(this.$photoCaption);
          this.$photoCaption.css({
            display: "inline"
          });
          anim({
            targets: this.$photoCaption[0],
            opacity: 1,
            duration: this.options.inDuration,
            easing: "easeOutQuad"
          });
        }
        var ratio = 0;
        var widthPercent = this.originalWidth / this.windowWidth;
        var heightPercent = this.originalHeight / this.windowHeight;
        this.newWidth = 0;
        this.newHeight = 0;
        if (widthPercent > heightPercent) {
          ratio = this.originalHeight / this.originalWidth;
          this.newWidth = this.windowWidth * 0.9;
          this.newHeight = this.windowWidth * 0.9 * ratio;
        } else {
          ratio = this.originalWidth / this.originalHeight;
          this.newWidth = this.windowHeight * 0.9 * ratio;
          this.newHeight = this.windowHeight * 0.9;
        }
        this._animateImageIn();
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        this._handleWindowEscapeBound = this._handleWindowEscape.bind(this);
        window.addEventListener("scroll", this._handleWindowScrollBound);
        window.addEventListener("resize", this._handleWindowResizeBound);
        window.addEventListener("keyup", this._handleWindowEscapeBound);
      }
    }, {
      key: "close",
      value: function close() {
        var _this20 = this;
        this._updateVars();
        this.doneAnimating = false;
        if (typeof this.options.onCloseStart === "function") {
          this.options.onCloseStart.call(this, this.el);
        }
        anim.remove(this.el);
        anim.remove(this.$overlay[0]);
        if (this.caption !== "") {
          anim.remove(this.$photoCaption[0]);
        }
        window.removeEventListener("scroll", this._handleWindowScrollBound);
        window.removeEventListener("resize", this._handleWindowResizeBound);
        window.removeEventListener("keyup", this._handleWindowEscapeBound);
        anim({
          targets: this.$overlay[0],
          opacity: 0,
          duration: this.options.outDuration,
          easing: "easeOutQuad",
          complete: function () {
            _this20.overlayActive = false;
            _this20.$overlay.remove();
          }
        });
        this._animateImageOut();
        if (this.caption !== "") {
          anim({
            targets: this.$photoCaption[0],
            opacity: 0,
            duration: this.options.outDuration,
            easing: "easeOutQuad",
            complete: function () {
              _this20.$photoCaption.remove();
            }
          });
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Materialbox.__proto__ || Object.getPrototypeOf(Materialbox), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Materialbox;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Materialbox;
  })(Component);
  M.Materialbox = Materialbox;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Materialbox, "materialbox", "M_Materialbox");
  }
})(cash, M.anime);
;
(function ($) {
  "use strict";
  var _defaults = {
    responsiveThreshold: 0
  };
  var Parallax = (function (_Component5) {
    _inherits(Parallax, _Component5);
    function Parallax(el, options) {
      _classCallCheck(this, Parallax);
      var _this21 = _possibleConstructorReturn(this, (Parallax.__proto__ || Object.getPrototypeOf(Parallax)).call(this, Parallax, el, options));
      _this21.el.M_Parallax = _this21;
      _this21.options = $.extend({}, Parallax.defaults, options);
      _this21._enabled = window.innerWidth > _this21.options.responsiveThreshold;
      _this21.$img = _this21.$el.find("img").first();
      _this21.$img.each(function () {
        var el = this;
        if (el.complete) $(el).trigger("load");
      });
      _this21._updateParallax();
      _this21._setupEventHandlers();
      _this21._setupStyles();
      Parallax._parallaxes.push(_this21);
      return _this21;
    }
    _createClass(Parallax, [{
      key: "destroy",
      value: function destroy() {
        Parallax._parallaxes.splice(Parallax._parallaxes.indexOf(this), 1);
        this.$img[0].style.transform = "";
        this._removeEventHandlers();
        this.$el[0].M_Parallax = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleImageLoadBound = this._handleImageLoad.bind(this);
        this.$img[0].addEventListener("load", this._handleImageLoadBound);
        if (Parallax._parallaxes.length === 0) {
          Parallax._handleScrollThrottled = M.throttle(Parallax._handleScroll, 5);
          window.addEventListener("scroll", Parallax._handleScrollThrottled);
          Parallax._handleWindowResizeThrottled = M.throttle(Parallax._handleWindowResize, 5);
          window.addEventListener("resize", Parallax._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.$img[0].removeEventListener("load", this._handleImageLoadBound);
        if (Parallax._parallaxes.length === 0) {
          window.removeEventListener("scroll", Parallax._handleScrollThrottled);
          window.removeEventListener("resize", Parallax._handleWindowResizeThrottled);
        }
      }
    }, {
      key: "_setupStyles",
      value: function _setupStyles() {
        this.$img[0].style.opacity = 1;
      }
    }, {
      key: "_handleImageLoad",
      value: function _handleImageLoad() {
        this._updateParallax();
      }
    }, {
      key: "_updateParallax",
      value: function _updateParallax() {
        var containerHeight = this.$el.height() > 0 ? this.el.parentNode.offsetHeight : 500;
        var imgHeight = this.$img[0].offsetHeight;
        var parallaxDist = imgHeight - containerHeight;
        var bottom = this.$el.offset().top + containerHeight;
        var top = this.$el.offset().top;
        var scrollTop = M.getDocumentScrollTop();
        var windowHeight = window.innerHeight;
        var windowBottom = scrollTop + windowHeight;
        var percentScrolled = (windowBottom - top) / (containerHeight + windowHeight);
        var parallax = parallaxDist * percentScrolled;
        if (!this._enabled) {
          this.$img[0].style.transform = "";
        } else if (bottom > scrollTop && top < scrollTop + windowHeight) {
          this.$img[0].style.transform = "translate3D(-50%, " + parallax + "px, 0)";
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Parallax.__proto__ || Object.getPrototypeOf(Parallax), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Parallax;
      }
    }, {
      key: "_handleScroll",
      value: function _handleScroll() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._updateParallax.call(parallaxInstance);
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        for (var i = 0; i < Parallax._parallaxes.length; i++) {
          var parallaxInstance = Parallax._parallaxes[i];
          parallaxInstance._enabled = window.innerWidth > parallaxInstance.options.responsiveThreshold;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Parallax;
  })(Component);
  Parallax._parallaxes = [];
  M.Parallax = Parallax;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Parallax, "parallax", "M_Parallax");
  }
})(cash);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    duration: 300,
    onShow: null,
    swipeable: false,
    responsiveThreshold: Infinity
  };
  var Tabs = (function (_Component6) {
    _inherits(Tabs, _Component6);
    function Tabs(el, options) {
      _classCallCheck(this, Tabs);
      var _this22 = _possibleConstructorReturn(this, (Tabs.__proto__ || Object.getPrototypeOf(Tabs)).call(this, Tabs, el, options));
      _this22.el.M_Tabs = _this22;
      _this22.options = $.extend({}, Tabs.defaults, options);
      _this22.$tabLinks = _this22.$el.children("li.tab").children("a");
      _this22.index = 0;
      _this22._setupActiveTabLink();
      if (_this22.options.swipeable) {
        _this22._setupSwipeableTabs();
      } else {
        _this22._setupNormalTabs();
      }
      _this22._setTabsAndTabWidth();
      _this22._createIndicator();
      _this22._setupEventHandlers();
      return _this22;
    }
    _createClass(Tabs, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this._indicator.parentNode.removeChild(this._indicator);
        if (this.options.swipeable) {
          this._teardownSwipeableTabs();
        } else {
          this._teardownNormalTabs();
        }
        this.$el[0].M_Tabs = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleWindowResizeBound = this._handleWindowResize.bind(this);
        window.addEventListener("resize", this._handleWindowResizeBound);
        this._handleTabClickBound = this._handleTabClick.bind(this);
        this.el.addEventListener("click", this._handleTabClickBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        window.removeEventListener("resize", this._handleWindowResizeBound);
        this.el.removeEventListener("click", this._handleTabClickBound);
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        this._setTabsAndTabWidth();
        if (this.tabWidth !== 0 && this.tabsWidth !== 0) {
          this._indicator.style.left = this._calcLeftPos(this.$activeTabLink) + "px";
          this._indicator.style.right = this._calcRightPos(this.$activeTabLink) + "px";
        }
      }
    }, {
      key: "_handleTabClick",
      value: function _handleTabClick(e) {
        var _this23 = this;
        var tab = $(e.target).closest("li.tab");
        var tabLink = $(e.target).closest("a");
        if (!tabLink.length || !tabLink.parent().hasClass("tab")) {
          return;
        }
        if (tab.hasClass("disabled")) {
          e.preventDefault();
          return;
        }
        if (!!tabLink.attr("target")) {
          return;
        }
        this.$activeTabLink.removeClass("active");
        var $oldContent = this.$content;
        this.$activeTabLink = tabLink;
        this.$content = $(M.escapeHash(tabLink[0].hash));
        this.$tabLinks = this.$el.children("li.tab").children("a");
        this.$activeTabLink.addClass("active");
        var prevIndex = this.index;
        this.index = Math.max(this.$tabLinks.index(tabLink), 0);
        if (this.options.swipeable) {
          if (this._tabsCarousel) {
            this._tabsCarousel.set(this.index, function () {
              if (typeof _this23.options.onShow === "function") {
                _this23.options.onShow.call(_this23, _this23.$content[0]);
              }
            });
          }
        } else {
          if (this.$content.length) {
            this.$content[0].style.display = "block";
            this.$content.addClass("active");
            if (typeof this.options.onShow === "function") {
              this.options.onShow.call(this, this.$content[0]);
            }
            if ($oldContent.length && !$oldContent.is(this.$content)) {
              $oldContent[0].style.display = "none";
              $oldContent.removeClass("active");
            }
          }
        }
        this._setTabsAndTabWidth();
        this._animateIndicator(prevIndex);
        e.preventDefault();
      }
    }, {
      key: "_createIndicator",
      value: function _createIndicator() {
        var _this24 = this;
        var indicator = document.createElement("li");
        indicator.classList.add("indicator");
        this.el.appendChild(indicator);
        this._indicator = indicator;
        setTimeout(function () {
          _this24._indicator.style.left = _this24._calcLeftPos(_this24.$activeTabLink) + "px";
          _this24._indicator.style.right = _this24._calcRightPos(_this24.$activeTabLink) + "px";
        }, 0);
      }
    }, {
      key: "_setupActiveTabLink",
      value: function _setupActiveTabLink() {
        this.$activeTabLink = $(this.$tabLinks.filter("[href=\"" + location.hash + "\"]"));
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children("li.tab").children("a.active").first();
        }
        if (this.$activeTabLink.length === 0) {
          this.$activeTabLink = this.$el.children("li.tab").children("a").first();
        }
        this.$tabLinks.removeClass("active");
        this.$activeTabLink[0].classList.add("active");
        this.index = Math.max(this.$tabLinks.index(this.$activeTabLink), 0);
        if (this.$activeTabLink.length) {
          this.$content = $(M.escapeHash(this.$activeTabLink[0].hash));
          this.$content.addClass("active");
        }
      }
    }, {
      key: "_setupSwipeableTabs",
      value: function _setupSwipeableTabs() {
        var _this25 = this;
        if (window.innerWidth > this.options.responsiveThreshold) {
          this.options.swipeable = false;
        }
        var $tabsContent = $();
        this.$tabLinks.each(function (link) {
          var $currContent = $(M.escapeHash(link.hash));
          $currContent.addClass("carousel-item");
          $tabsContent = $tabsContent.add($currContent);
        });
        var $tabsWrapper = $("<div class=\"tabs-content carousel carousel-slider\"></div>");
        $tabsContent.first().before($tabsWrapper);
        $tabsWrapper.append($tabsContent);
        $tabsContent[0].style.display = "";
        var activeTabIndex = this.$activeTabLink.closest(".tab").index();
        this._tabsCarousel = M.Carousel.init($tabsWrapper[0], {
          fullWidth: true,
          noWrap: true,
          onCycleTo: function (item) {
            var prevIndex = _this25.index;
            _this25.index = $(item).index();
            _this25.$activeTabLink.removeClass("active");
            _this25.$activeTabLink = _this25.$tabLinks.eq(_this25.index);
            _this25.$activeTabLink.addClass("active");
            _this25._animateIndicator(prevIndex);
            if (typeof _this25.options.onShow === "function") {
              _this25.options.onShow.call(_this25, _this25.$content[0]);
            }
          }
        });
        this._tabsCarousel.set(activeTabIndex);
      }
    }, {
      key: "_teardownSwipeableTabs",
      value: function _teardownSwipeableTabs() {
        var $tabsWrapper = this._tabsCarousel.$el;
        this._tabsCarousel.destroy();
        $tabsWrapper.after($tabsWrapper.children());
        $tabsWrapper.remove();
      }
    }, {
      key: "_setupNormalTabs",
      value: function _setupNormalTabs() {
        this.$tabLinks.not(this.$activeTabLink).each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = "none";
            }
          }
        });
      }
    }, {
      key: "_teardownNormalTabs",
      value: function _teardownNormalTabs() {
        this.$tabLinks.each(function (link) {
          if (!!link.hash) {
            var $currContent = $(M.escapeHash(link.hash));
            if ($currContent.length) {
              $currContent[0].style.display = "";
            }
          }
        });
      }
    }, {
      key: "_setTabsAndTabWidth",
      value: function _setTabsAndTabWidth() {
        this.tabsWidth = this.$el.width();
        this.tabWidth = Math.max(this.tabsWidth, this.el.scrollWidth) / this.$tabLinks.length;
      }
    }, {
      key: "_calcRightPos",
      value: function _calcRightPos(el) {
        return Math.ceil(this.tabsWidth - el.position().left - el[0].getBoundingClientRect().width);
      }
    }, {
      key: "_calcLeftPos",
      value: function _calcLeftPos(el) {
        return Math.floor(el.position().left);
      }
    }, {
      key: "updateTabIndicator",
      value: function updateTabIndicator() {
        this._setTabsAndTabWidth();
        this._animateIndicator(this.index);
      }
    }, {
      key: "_animateIndicator",
      value: function _animateIndicator(prevIndex) {
        var leftDelay = 0, rightDelay = 0;
        if (this.index - prevIndex >= 0) {
          leftDelay = 90;
        } else {
          rightDelay = 90;
        }
        var animOptions = {
          targets: this._indicator,
          left: {
            value: this._calcLeftPos(this.$activeTabLink),
            delay: leftDelay
          },
          right: {
            value: this._calcRightPos(this.$activeTabLink),
            delay: rightDelay
          },
          duration: this.options.duration,
          easing: "easeOutQuad"
        };
        anim.remove(this._indicator);
        anim(animOptions);
      }
    }, {
      key: "select",
      value: function select(tabId) {
        var tab = this.$tabLinks.filter("[href=\"#" + tabId + "\"]");
        if (tab.length) {
          tab.trigger("click");
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tabs.__proto__ || Object.getPrototypeOf(Tabs), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tabs;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Tabs;
  })(Component);
  M.Tabs = Tabs;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tabs, "tabs", "M_Tabs");
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    exitDelay: 200,
    enterDelay: 0,
    html: null,
    margin: 5,
    inDuration: 250,
    outDuration: 200,
    position: "bottom",
    transitionMovement: 10
  };
  var Tooltip = (function (_Component7) {
    _inherits(Tooltip, _Component7);
    function Tooltip(el, options) {
      _classCallCheck(this, Tooltip);
      var _this26 = _possibleConstructorReturn(this, (Tooltip.__proto__ || Object.getPrototypeOf(Tooltip)).call(this, Tooltip, el, options));
      _this26.el.M_Tooltip = _this26;
      _this26.options = $.extend({}, Tooltip.defaults, options);
      _this26.isOpen = false;
      _this26.isHovered = false;
      _this26.isFocused = false;
      _this26._appendTooltipEl();
      _this26._setupEventHandlers();
      return _this26;
    }
    _createClass(Tooltip, [{
      key: "destroy",
      value: function destroy() {
        $(this.tooltipEl).remove();
        this._removeEventHandlers();
        this.el.M_Tooltip = undefined;
      }
    }, {
      key: "_appendTooltipEl",
      value: function _appendTooltipEl() {
        var tooltipEl = document.createElement("div");
        tooltipEl.classList.add("material-tooltip");
        this.tooltipEl = tooltipEl;
        var tooltipContentEl = document.createElement("div");
        tooltipContentEl.classList.add("tooltip-content");
        tooltipContentEl.innerHTML = this.options.html;
        tooltipEl.appendChild(tooltipContentEl);
        document.body.appendChild(tooltipEl);
      }
    }, {
      key: "_updateTooltipContent",
      value: function _updateTooltipContent() {
        this.tooltipEl.querySelector(".tooltip-content").innerHTML = this.options.html;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleMouseEnterBound = this._handleMouseEnter.bind(this);
        this._handleMouseLeaveBound = this._handleMouseLeave.bind(this);
        this._handleFocusBound = this._handleFocus.bind(this);
        this._handleBlurBound = this._handleBlur.bind(this);
        this.el.addEventListener("mouseenter", this._handleMouseEnterBound);
        this.el.addEventListener("mouseleave", this._handleMouseLeaveBound);
        this.el.addEventListener("focus", this._handleFocusBound, true);
        this.el.addEventListener("blur", this._handleBlurBound, true);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("mouseenter", this._handleMouseEnterBound);
        this.el.removeEventListener("mouseleave", this._handleMouseLeaveBound);
        this.el.removeEventListener("focus", this._handleFocusBound, true);
        this.el.removeEventListener("blur", this._handleBlurBound, true);
      }
    }, {
      key: "open",
      value: function open(isManual) {
        if (this.isOpen) {
          return;
        }
        isManual = isManual === undefined ? true : undefined;
        this.isOpen = true;
        this.options = $.extend({}, this.options, this._getAttributeOptions());
        this._updateTooltipContent();
        this._setEnterDelayTimeout(isManual);
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isHovered = false;
        this.isFocused = false;
        this.isOpen = false;
        this._setExitDelayTimeout();
      }
    }, {
      key: "_setExitDelayTimeout",
      value: function _setExitDelayTimeout() {
        var _this27 = this;
        clearTimeout(this._exitDelayTimeout);
        this._exitDelayTimeout = setTimeout(function () {
          if (_this27.isHovered || _this27.isFocused) {
            return;
          }
          _this27._animateOut();
        }, this.options.exitDelay);
      }
    }, {
      key: "_setEnterDelayTimeout",
      value: function _setEnterDelayTimeout(isManual) {
        var _this28 = this;
        clearTimeout(this._enterDelayTimeout);
        this._enterDelayTimeout = setTimeout(function () {
          if (!_this28.isHovered && !_this28.isFocused && !isManual) {
            return;
          }
          _this28._animateIn();
        }, this.options.enterDelay);
      }
    }, {
      key: "_positionTooltip",
      value: function _positionTooltip() {
        var origin = this.el, tooltip = this.tooltipEl, originHeight = origin.offsetHeight, originWidth = origin.offsetWidth, tooltipHeight = tooltip.offsetHeight, tooltipWidth = tooltip.offsetWidth, newCoordinates = void 0, margin = this.options.margin, targetTop = void 0, targetLeft = void 0;
        (this.xMovement = 0, this.yMovement = 0);
        targetTop = origin.getBoundingClientRect().top + M.getDocumentScrollTop();
        targetLeft = origin.getBoundingClientRect().left + M.getDocumentScrollLeft();
        if (this.options.position === "top") {
          targetTop += -tooltipHeight - margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = -this.options.transitionMovement;
        } else if (this.options.position === "right") {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += originWidth + margin;
          this.xMovement = this.options.transitionMovement;
        } else if (this.options.position === "left") {
          targetTop += originHeight / 2 - tooltipHeight / 2;
          targetLeft += -tooltipWidth - margin;
          this.xMovement = -this.options.transitionMovement;
        } else {
          targetTop += originHeight + margin;
          targetLeft += originWidth / 2 - tooltipWidth / 2;
          this.yMovement = this.options.transitionMovement;
        }
        newCoordinates = this._repositionWithinScreen(targetLeft, targetTop, tooltipWidth, tooltipHeight);
        $(tooltip).css({
          top: newCoordinates.y + "px",
          left: newCoordinates.x + "px"
        });
      }
    }, {
      key: "_repositionWithinScreen",
      value: function _repositionWithinScreen(x, y, width, height) {
        var scrollLeft = M.getDocumentScrollLeft();
        var scrollTop = M.getDocumentScrollTop();
        var newX = x - scrollLeft;
        var newY = y - scrollTop;
        var bounding = {
          left: newX,
          top: newY,
          width: width,
          height: height
        };
        var offset = this.options.margin + this.options.transitionMovement;
        var edges = M.checkWithinContainer(document.body, bounding, offset);
        if (edges.left) {
          newX = offset;
        } else if (edges.right) {
          newX -= newX + width - window.innerWidth;
        }
        if (edges.top) {
          newY = offset;
        } else if (edges.bottom) {
          newY -= newY + height - window.innerHeight;
        }
        return {
          x: newX + scrollLeft,
          y: newY + scrollTop
        };
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._positionTooltip();
        this.tooltipEl.style.visibility = "visible";
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 1,
          translateX: this.xMovement,
          translateY: this.yMovement,
          duration: this.options.inDuration,
          easing: "easeOutCubic"
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        anim.remove(this.tooltipEl);
        anim({
          targets: this.tooltipEl,
          opacity: 0,
          translateX: 0,
          translateY: 0,
          duration: this.options.outDuration,
          easing: "easeOutCubic"
        });
      }
    }, {
      key: "_handleMouseEnter",
      value: function _handleMouseEnter() {
        this.isHovered = true;
        this.isFocused = false;
        this.open(false);
      }
    }, {
      key: "_handleMouseLeave",
      value: function _handleMouseLeave() {
        this.isHovered = false;
        this.isFocused = false;
        this.close();
      }
    }, {
      key: "_handleFocus",
      value: function _handleFocus() {
        if (M.tabPressed) {
          this.isFocused = true;
          this.open(false);
        }
      }
    }, {
      key: "_handleBlur",
      value: function _handleBlur() {
        this.isFocused = false;
        this.close();
      }
    }, {
      key: "_getAttributeOptions",
      value: function _getAttributeOptions() {
        var attributeOptions = {};
        var tooltipTextOption = this.el.getAttribute("data-tooltip");
        var positionOption = this.el.getAttribute("data-position");
        if (tooltipTextOption) {
          attributeOptions.html = tooltipTextOption;
        }
        if (positionOption) {
          attributeOptions.position = positionOption;
        }
        return attributeOptions;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Tooltip.__proto__ || Object.getPrototypeOf(Tooltip), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Tooltip;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Tooltip;
  })(Component);
  M.Tooltip = Tooltip;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Tooltip, "tooltip", "M_Tooltip");
  }
})(cash, M.anime);
;
;
(function (window) {
  "use strict";
  var Waves = Waves || ({});
  var $$ = document.querySelectorAll.bind(document);
  function isWindow(obj) {
    return obj !== null && obj === obj.window;
  }
  function getWindow(elem) {
    return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
  }
  function offset(elem) {
    var docElem, win, box = {
      top: 0,
      left: 0
    }, doc = elem && elem.ownerDocument;
    docElem = doc.documentElement;
    if (typeof elem.getBoundingClientRect !== typeof undefined) {
      box = elem.getBoundingClientRect();
    }
    win = getWindow(doc);
    return {
      top: box.top + win.pageYOffset - docElem.clientTop,
      left: box.left + win.pageXOffset - docElem.clientLeft
    };
  }
  function convertStyle(obj) {
    var style = "";
    for (var a in obj) {
      if (obj.hasOwnProperty(a)) {
        style += a + ":" + obj[a] + ";";
      }
    }
    return style;
  }
  var Effect = {
    duration: 750,
    show: function (e, element) {
      if (e.button === 2) {
        return false;
      }
      var el = element || this;
      var ripple = document.createElement("div");
      ripple.className = "waves-ripple";
      el.appendChild(ripple);
      var pos = offset(el);
      var relativeY = e.pageY - pos.top;
      var relativeX = e.pageX - pos.left;
      var scale = "scale(" + el.clientWidth / 100 * 10 + ")";
      if (("touches" in e)) {
        relativeY = e.touches[0].pageY - pos.top;
        relativeX = e.touches[0].pageX - pos.left;
      }
      ripple.setAttribute("data-hold", Date.now());
      ripple.setAttribute("data-scale", scale);
      ripple.setAttribute("data-x", relativeX);
      ripple.setAttribute("data-y", relativeY);
      var rippleStyle = {
        "top": relativeY + "px",
        "left": relativeX + "px"
      };
      ripple.className = ripple.className + " waves-notransition";
      ripple.setAttribute("style", convertStyle(rippleStyle));
      ripple.className = ripple.className.replace("waves-notransition", "");
      rippleStyle["-webkit-transform"] = scale;
      rippleStyle["-moz-transform"] = scale;
      rippleStyle["-ms-transform"] = scale;
      rippleStyle["-o-transform"] = scale;
      rippleStyle.transform = scale;
      rippleStyle.opacity = "1";
      rippleStyle["-webkit-transition-duration"] = Effect.duration + "ms";
      rippleStyle["-moz-transition-duration"] = Effect.duration + "ms";
      rippleStyle["-o-transition-duration"] = Effect.duration + "ms";
      rippleStyle["transition-duration"] = Effect.duration + "ms";
      rippleStyle["-webkit-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["-moz-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["-o-transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      rippleStyle["transition-timing-function"] = "cubic-bezier(0.250, 0.460, 0.450, 0.940)";
      ripple.setAttribute("style", convertStyle(rippleStyle));
    },
    hide: function (e) {
      TouchHandler.touchup(e);
      var el = this;
      var width = el.clientWidth * 1.4;
      var ripple = null;
      var ripples = el.getElementsByClassName("waves-ripple");
      if (ripples.length > 0) {
        ripple = ripples[ripples.length - 1];
      } else {
        return false;
      }
      var relativeX = ripple.getAttribute("data-x");
      var relativeY = ripple.getAttribute("data-y");
      var scale = ripple.getAttribute("data-scale");
      var diff = Date.now() - Number(ripple.getAttribute("data-hold"));
      var delay = 350 - diff;
      if (delay < 0) {
        delay = 0;
      }
      setTimeout(function () {
        var style = {
          "top": relativeY + "px",
          "left": relativeX + "px",
          "opacity": "0",
          "-webkit-transition-duration": Effect.duration + "ms",
          "-moz-transition-duration": Effect.duration + "ms",
          "-o-transition-duration": Effect.duration + "ms",
          "transition-duration": Effect.duration + "ms",
          "-webkit-transform": scale,
          "-moz-transform": scale,
          "-ms-transform": scale,
          "-o-transform": scale,
          "transform": scale
        };
        ripple.setAttribute("style", convertStyle(style));
        setTimeout(function () {
          try {
            el.removeChild(ripple);
          } catch (e) {
            return false;
          }
        }, Effect.duration);
      }, delay);
    },
    wrapInput: function (elements) {
      for (var a = 0; a < elements.length; a++) {
        var el = elements[a];
        if (el.tagName.toLowerCase() === "input") {
          var parent = el.parentNode;
          if (parent.tagName.toLowerCase() === "i" && parent.className.indexOf("waves-effect") !== -1) {
            continue;
          }
          var wrapper = document.createElement("i");
          wrapper.className = el.className + " waves-input-wrapper";
          var elementStyle = el.getAttribute("style");
          if (!elementStyle) {
            elementStyle = "";
          }
          wrapper.setAttribute("style", elementStyle);
          el.className = "waves-button-input";
          el.removeAttribute("style");
          parent.replaceChild(wrapper, el);
          wrapper.appendChild(el);
        }
      }
    }
  };
  var TouchHandler = {
    touches: 0,
    allowEvent: function (e) {
      var allow = true;
      if (e.type === "touchstart") {
        TouchHandler.touches += 1;
      } else if (e.type === "touchend" || e.type === "touchcancel") {
        setTimeout(function () {
          if (TouchHandler.touches > 0) {
            TouchHandler.touches -= 1;
          }
        }, 500);
      } else if (e.type === "mousedown" && TouchHandler.touches > 0) {
        allow = false;
      }
      return allow;
    },
    touchup: function (e) {
      TouchHandler.allowEvent(e);
    }
  };
  function getWavesEffectElement(e) {
    if (TouchHandler.allowEvent(e) === false) {
      return null;
    }
    var element = null;
    var target = e.target || e.srcElement;
    while (target.parentNode !== null) {
      if (!(target instanceof SVGElement) && target.className.indexOf("waves-effect") !== -1) {
        element = target;
        break;
      }
      target = target.parentNode;
    }
    return element;
  }
  function showEffect(e) {
    var element = getWavesEffectElement(e);
    if (element !== null) {
      Effect.show(e, element);
      if (("ontouchstart" in window)) {
        element.addEventListener("touchend", Effect.hide, false);
        element.addEventListener("touchcancel", Effect.hide, false);
      }
      element.addEventListener("mouseup", Effect.hide, false);
      element.addEventListener("mouseleave", Effect.hide, false);
      element.addEventListener("dragend", Effect.hide, false);
    }
  }
  Waves.displayEffect = function (options) {
    options = options || ({});
    if (("duration" in options)) {
      Effect.duration = options.duration;
    }
    Effect.wrapInput($$(".waves-effect"));
    if (("ontouchstart" in window)) {
      document.body.addEventListener("touchstart", showEffect, false);
    }
    document.body.addEventListener("mousedown", showEffect, false);
  };
  Waves.attach = function (element) {
    if (element.tagName.toLowerCase() === "input") {
      Effect.wrapInput([element]);
      element = element.parentNode;
    }
    if (("ontouchstart" in window)) {
      element.addEventListener("touchstart", showEffect, false);
    }
    element.addEventListener("mousedown", showEffect, false);
  };
  window.Waves = Waves;
  document.addEventListener("DOMContentLoaded", function () {
    Waves.displayEffect();
  }, false);
})(window);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    html: "",
    displayLength: 4000,
    inDuration: 300,
    outDuration: 375,
    classes: "",
    completeCallback: null,
    activationPercent: 0.8
  };
  var Toast = (function () {
    function Toast(options) {
      _classCallCheck(this, Toast);
      this.options = $.extend({}, Toast.defaults, options);
      this.message = this.options.html;
      this.panning = false;
      this.timeRemaining = this.options.displayLength;
      if (Toast._toasts.length === 0) {
        Toast._createContainer();
      }
      Toast._toasts.push(this);
      var toastElement = this._createToast();
      toastElement.M_Toast = this;
      this.el = toastElement;
      this.$el = $(toastElement);
      this._animateIn();
      this._setTimer();
    }
    _createClass(Toast, [{
      key: "_createToast",
      value: function _createToast() {
        var toast = document.createElement("div");
        toast.classList.add("toast");
        if (!!this.options.classes.length) {
          $(toast).addClass(this.options.classes);
        }
        if (typeof HTMLElement === "object" ? this.message instanceof HTMLElement : this.message && typeof this.message === "object" && this.message !== null && this.message.nodeType === 1 && typeof this.message.nodeName === "string") {
          toast.appendChild(this.message);
        } else if (!!this.message.jquery) {
          $(toast).append(this.message[0]);
        } else {
          toast.innerHTML = this.message;
        }
        Toast._container.appendChild(toast);
        return toast;
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        anim({
          targets: this.el,
          top: 0,
          opacity: 1,
          duration: this.options.inDuration,
          easing: "easeOutCubic"
        });
      }
    }, {
      key: "_setTimer",
      value: function _setTimer() {
        var _this29 = this;
        if (this.timeRemaining !== Infinity) {
          this.counterInterval = setInterval(function () {
            if (!_this29.panning) {
              _this29.timeRemaining -= 20;
            }
            if (_this29.timeRemaining <= 0) {
              _this29.dismiss();
            }
          }, 20);
        }
      }
    }, {
      key: "dismiss",
      value: function dismiss() {
        var _this30 = this;
        window.clearInterval(this.counterInterval);
        var activationDistance = this.el.offsetWidth * this.options.activationPercent;
        if (this.wasSwiped) {
          this.el.style.transition = "transform .05s, opacity .05s";
          this.el.style.transform = "translateX(" + activationDistance + "px)";
          this.el.style.opacity = 0;
        }
        anim({
          targets: this.el,
          opacity: 0,
          marginTop: -40,
          duration: this.options.outDuration,
          easing: "easeOutExpo",
          complete: function () {
            if (typeof _this30.options.completeCallback === "function") {
              _this30.options.completeCallback();
            }
            _this30.$el.remove();
            Toast._toasts.splice(Toast._toasts.indexOf(_this30), 1);
            if (Toast._toasts.length === 0) {
              Toast._removeContainer();
            }
          }
        });
      }
    }], [{
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Toast;
      }
    }, {
      key: "_createContainer",
      value: function _createContainer() {
        var container = document.createElement("div");
        container.setAttribute("id", "toast-container");
        container.addEventListener("touchstart", Toast._onDragStart);
        container.addEventListener("touchmove", Toast._onDragMove);
        container.addEventListener("touchend", Toast._onDragEnd);
        container.addEventListener("mousedown", Toast._onDragStart);
        document.addEventListener("mousemove", Toast._onDragMove);
        document.addEventListener("mouseup", Toast._onDragEnd);
        document.body.appendChild(container);
        Toast._container = container;
      }
    }, {
      key: "_removeContainer",
      value: function _removeContainer() {
        document.removeEventListener("mousemove", Toast._onDragMove);
        document.removeEventListener("mouseup", Toast._onDragEnd);
        $(Toast._container).remove();
        Toast._container = null;
      }
    }, {
      key: "_onDragStart",
      value: function _onDragStart(e) {
        if (e.target && $(e.target).closest(".toast").length) {
          var $toast = $(e.target).closest(".toast");
          var toast = $toast[0].M_Toast;
          toast.panning = true;
          Toast._draggedToast = toast;
          toast.el.classList.add("panning");
          toast.el.style.transition = "";
          toast.startingXPos = Toast._xPos(e);
          toast.time = Date.now();
          toast.xPos = Toast._xPos(e);
        }
      }
    }, {
      key: "_onDragMove",
      value: function _onDragMove(e) {
        if (!!Toast._draggedToast) {
          e.preventDefault();
          var toast = Toast._draggedToast;
          toast.deltaX = Math.abs(toast.xPos - Toast._xPos(e));
          toast.xPos = Toast._xPos(e);
          toast.velocityX = toast.deltaX / (Date.now() - toast.time);
          toast.time = Date.now();
          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          toast.el.style.transform = "translateX(" + totalDeltaX + "px)";
          toast.el.style.opacity = 1 - Math.abs(totalDeltaX / activationDistance);
        }
      }
    }, {
      key: "_onDragEnd",
      value: function _onDragEnd() {
        if (!!Toast._draggedToast) {
          var toast = Toast._draggedToast;
          toast.panning = false;
          toast.el.classList.remove("panning");
          var totalDeltaX = toast.xPos - toast.startingXPos;
          var activationDistance = toast.el.offsetWidth * toast.options.activationPercent;
          var shouldBeDismissed = Math.abs(totalDeltaX) > activationDistance || toast.velocityX > 1;
          if (shouldBeDismissed) {
            toast.wasSwiped = true;
            toast.dismiss();
          } else {
            toast.el.style.transition = "transform .2s, opacity .2s";
            toast.el.style.transform = "";
            toast.el.style.opacity = "";
          }
          Toast._draggedToast = null;
        }
      }
    }, {
      key: "_xPos",
      value: function _xPos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        return e.clientX;
      }
    }, {
      key: "dismissAll",
      value: function dismissAll() {
        for (var toastIndex in Toast._toasts) {
          Toast._toasts[toastIndex].dismiss();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Toast;
  })();
  Toast._toasts = [];
  Toast._container = null;
  Toast._draggedToast = null;
  M.Toast = Toast;
  M.toast = function (options) {
    return new Toast(options);
  };
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    edge: "left",
    draggable: true,
    inDuration: 250,
    outDuration: 200,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    preventScrolling: true
  };
  var Sidenav = (function (_Component8) {
    _inherits(Sidenav, _Component8);
    function Sidenav(el, options) {
      _classCallCheck(this, Sidenav);
      var _this31 = _possibleConstructorReturn(this, (Sidenav.__proto__ || Object.getPrototypeOf(Sidenav)).call(this, Sidenav, el, options));
      _this31.el.M_Sidenav = _this31;
      _this31.id = _this31.$el.attr("id");
      _this31.options = $.extend({}, Sidenav.defaults, options);
      _this31.isOpen = false;
      _this31.isFixed = _this31.el.classList.contains("sidenav-fixed");
      _this31.isDragged = false;
      _this31.lastWindowWidth = window.innerWidth;
      _this31.lastWindowHeight = window.innerHeight;
      _this31._createOverlay();
      _this31._createDragTarget();
      _this31._setupEventHandlers();
      _this31._setupClasses();
      _this31._setupFixed();
      Sidenav._sidenavs.push(_this31);
      return _this31;
    }
    _createClass(Sidenav, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this._enableBodyScrolling();
        this._overlay.parentNode.removeChild(this._overlay);
        this.dragTarget.parentNode.removeChild(this.dragTarget);
        this.el.M_Sidenav = undefined;
        this.el.style.transform = "";
        var index = Sidenav._sidenavs.indexOf(this);
        if (index >= 0) {
          Sidenav._sidenavs.splice(index, 1);
        }
      }
    }, {
      key: "_createOverlay",
      value: function _createOverlay() {
        var overlay = document.createElement("div");
        this._closeBound = this.close.bind(this);
        overlay.classList.add("sidenav-overlay");
        overlay.addEventListener("click", this._closeBound);
        document.body.appendChild(overlay);
        this._overlay = overlay;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        if (Sidenav._sidenavs.length === 0) {
          document.body.addEventListener("click", this._handleTriggerClick);
        }
        this._handleDragTargetDragBound = this._handleDragTargetDrag.bind(this);
        this._handleDragTargetReleaseBound = this._handleDragTargetRelease.bind(this);
        this._handleCloseDragBound = this._handleCloseDrag.bind(this);
        this._handleCloseReleaseBound = this._handleCloseRelease.bind(this);
        this._handleCloseTriggerClickBound = this._handleCloseTriggerClick.bind(this);
        this.dragTarget.addEventListener("touchmove", this._handleDragTargetDragBound);
        this.dragTarget.addEventListener("touchend", this._handleDragTargetReleaseBound);
        this._overlay.addEventListener("touchmove", this._handleCloseDragBound);
        this._overlay.addEventListener("touchend", this._handleCloseReleaseBound);
        this.el.addEventListener("touchmove", this._handleCloseDragBound);
        this.el.addEventListener("touchend", this._handleCloseReleaseBound);
        this.el.addEventListener("click", this._handleCloseTriggerClickBound);
        if (this.isFixed) {
          this._handleWindowResizeBound = this._handleWindowResize.bind(this);
          window.addEventListener("resize", this._handleWindowResizeBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (Sidenav._sidenavs.length === 1) {
          document.body.removeEventListener("click", this._handleTriggerClick);
        }
        this.dragTarget.removeEventListener("touchmove", this._handleDragTargetDragBound);
        this.dragTarget.removeEventListener("touchend", this._handleDragTargetReleaseBound);
        this._overlay.removeEventListener("touchmove", this._handleCloseDragBound);
        this._overlay.removeEventListener("touchend", this._handleCloseReleaseBound);
        this.el.removeEventListener("touchmove", this._handleCloseDragBound);
        this.el.removeEventListener("touchend", this._handleCloseReleaseBound);
        this.el.removeEventListener("click", this._handleCloseTriggerClickBound);
        if (this.isFixed) {
          window.removeEventListener("resize", this._handleWindowResizeBound);
        }
      }
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target).closest(".sidenav-trigger");
        if (e.target && $trigger.length) {
          var sidenavId = M.getIdFromTrigger($trigger[0]);
          var sidenavInstance = document.getElementById(sidenavId).M_Sidenav;
          if (sidenavInstance) {
            sidenavInstance.open($trigger);
          }
          e.preventDefault();
        }
      }
    }, {
      key: "_startDrag",
      value: function _startDrag(e) {
        var clientX = e.targetTouches[0].clientX;
        this.isDragged = true;
        this._startingXpos = clientX;
        this._xPos = this._startingXpos;
        this._time = Date.now();
        this._width = this.el.getBoundingClientRect().width;
        this._overlay.style.display = "block";
        this._initialScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this._verticallyScrolling = false;
        anim.remove(this.el);
        anim.remove(this._overlay);
      }
    }, {
      key: "_dragMoveUpdate",
      value: function _dragMoveUpdate(e) {
        var clientX = e.targetTouches[0].clientX;
        var currentScrollTop = this.isOpen ? this.el.scrollTop : M.getDocumentScrollTop();
        this.deltaX = Math.abs(this._xPos - clientX);
        this._xPos = clientX;
        this.velocityX = this.deltaX / (Date.now() - this._time);
        this._time = Date.now();
        if (this._initialScrollTop !== currentScrollTop) {
          this._verticallyScrolling = true;
        }
      }
    }, {
      key: "_handleDragTargetDrag",
      value: function _handleDragTargetDrag(e) {
        if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
          return;
        }
        if (!this.isDragged) {
          this._startDrag(e);
        }
        this._dragMoveUpdate(e);
        var totalDeltaX = this._xPos - this._startingXpos;
        var dragDirection = totalDeltaX > 0 ? "right" : "left";
        totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
        if (this.options.edge === dragDirection) {
          totalDeltaX = 0;
        }
        var transformX = totalDeltaX;
        var transformPrefix = "translateX(-100%)";
        if (this.options.edge === "right") {
          transformPrefix = "translateX(100%)";
          transformX = -transformX;
        }
        this.percentOpen = Math.min(1, totalDeltaX / this._width);
        this.el.style.transform = transformPrefix + " translateX(" + transformX + "px)";
        this._overlay.style.opacity = this.percentOpen;
      }
    }, {
      key: "_handleDragTargetRelease",
      value: function _handleDragTargetRelease() {
        if (this.isDragged) {
          if (this.percentOpen > 0.2) {
            this.open();
          } else {
            this._animateOut();
          }
          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }
    }, {
      key: "_handleCloseDrag",
      value: function _handleCloseDrag(e) {
        if (this.isOpen) {
          if (!this.options.draggable || this._isCurrentlyFixed() || this._verticallyScrolling) {
            return;
          }
          if (!this.isDragged) {
            this._startDrag(e);
          }
          this._dragMoveUpdate(e);
          var totalDeltaX = this._xPos - this._startingXpos;
          var dragDirection = totalDeltaX > 0 ? "right" : "left";
          totalDeltaX = Math.min(this._width, Math.abs(totalDeltaX));
          if (this.options.edge !== dragDirection) {
            totalDeltaX = 0;
          }
          var transformX = -totalDeltaX;
          if (this.options.edge === "right") {
            transformX = -transformX;
          }
          this.percentOpen = Math.min(1, 1 - totalDeltaX / this._width);
          this.el.style.transform = "translateX(" + transformX + "px)";
          this._overlay.style.opacity = this.percentOpen;
        }
      }
    }, {
      key: "_handleCloseRelease",
      value: function _handleCloseRelease() {
        if (this.isOpen && this.isDragged) {
          if (this.percentOpen > 0.8) {
            this._animateIn();
          } else {
            this.close();
          }
          this.isDragged = false;
          this._verticallyScrolling = false;
        }
      }
    }, {
      key: "_handleCloseTriggerClick",
      value: function _handleCloseTriggerClick(e) {
        var $closeTrigger = $(e.target).closest(".sidenav-close");
        if ($closeTrigger.length && !this._isCurrentlyFixed()) {
          this.close();
        }
      }
    }, {
      key: "_handleWindowResize",
      value: function _handleWindowResize() {
        if (this.lastWindowWidth !== window.innerWidth) {
          if (window.innerWidth > 992) {
            this.open();
          } else {
            this.close();
          }
        }
        this.lastWindowWidth = window.innerWidth;
        this.lastWindowHeight = window.innerHeight;
      }
    }, {
      key: "_setupClasses",
      value: function _setupClasses() {
        if (this.options.edge === "right") {
          this.el.classList.add("right-aligned");
          this.dragTarget.classList.add("right-aligned");
        }
      }
    }, {
      key: "_removeClasses",
      value: function _removeClasses() {
        this.el.classList.remove("right-aligned");
        this.dragTarget.classList.remove("right-aligned");
      }
    }, {
      key: "_setupFixed",
      value: function _setupFixed() {
        if (this._isCurrentlyFixed()) {
          this.open();
        }
      }
    }, {
      key: "_isCurrentlyFixed",
      value: function _isCurrentlyFixed() {
        return this.isFixed && window.innerWidth > 992;
      }
    }, {
      key: "_createDragTarget",
      value: function _createDragTarget() {
        var dragTarget = document.createElement("div");
        dragTarget.classList.add("drag-target");
        document.body.appendChild(dragTarget);
        this.dragTarget = dragTarget;
      }
    }, {
      key: "_preventBodyScrolling",
      value: function _preventBodyScrolling() {
        var body = document.body;
        body.style.overflow = "hidden";
      }
    }, {
      key: "_enableBodyScrolling",
      value: function _enableBodyScrolling() {
        var body = document.body;
        body.style.overflow = "";
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen === true) {
          return;
        }
        this.isOpen = true;
        if (typeof this.options.onOpenStart === "function") {
          this.options.onOpenStart.call(this, this.el);
        }
        if (this._isCurrentlyFixed()) {
          anim.remove(this.el);
          anim({
            targets: this.el,
            translateX: 0,
            duration: 0,
            easing: "easeOutQuad"
          });
          this._enableBodyScrolling();
          this._overlay.style.display = "none";
        } else {
          if (this.options.preventScrolling) {
            this._preventBodyScrolling();
          }
          if (!this.isDragged || this.percentOpen != 1) {
            this._animateIn();
          }
        }
      }
    }, {
      key: "close",
      value: function close() {
        if (this.isOpen === false) {
          return;
        }
        this.isOpen = false;
        if (typeof this.options.onCloseStart === "function") {
          this.options.onCloseStart.call(this, this.el);
        }
        if (this._isCurrentlyFixed()) {
          var transformX = this.options.edge === "left" ? "-105%" : "105%";
          this.el.style.transform = "translateX(" + transformX + ")";
        } else {
          this._enableBodyScrolling();
          if (!this.isDragged || this.percentOpen != 0) {
            this._animateOut();
          } else {
            this._overlay.style.display = "none";
          }
        }
      }
    }, {
      key: "_animateIn",
      value: function _animateIn() {
        this._animateSidenavIn();
        this._animateOverlayIn();
      }
    }, {
      key: "_animateSidenavIn",
      value: function _animateSidenavIn() {
        var _this32 = this;
        var slideOutPercent = this.options.edge === "left" ? -1 : 1;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === "left" ? slideOutPercent + this.percentOpen : slideOutPercent - this.percentOpen;
        }
        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", 0],
          duration: this.options.inDuration,
          easing: "easeOutQuad",
          complete: function () {
            if (typeof _this32.options.onOpenEnd === "function") {
              _this32.options.onOpenEnd.call(_this32, _this32.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayIn",
      value: function _animateOverlayIn() {
        var start = 0;
        if (this.isDragged) {
          start = this.percentOpen;
        } else {
          $(this._overlay).css({
            display: "block"
          });
        }
        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: [start, 1],
          duration: this.options.inDuration,
          easing: "easeOutQuad"
        });
      }
    }, {
      key: "_animateOut",
      value: function _animateOut() {
        this._animateSidenavOut();
        this._animateOverlayOut();
      }
    }, {
      key: "_animateSidenavOut",
      value: function _animateSidenavOut() {
        var _this33 = this;
        var endPercent = this.options.edge === "left" ? -1 : 1;
        var slideOutPercent = 0;
        if (this.isDragged) {
          slideOutPercent = this.options.edge === "left" ? endPercent + this.percentOpen : endPercent - this.percentOpen;
        }
        anim.remove(this.el);
        anim({
          targets: this.el,
          translateX: [slideOutPercent * 100 + "%", endPercent * 105 + "%"],
          duration: this.options.outDuration,
          easing: "easeOutQuad",
          complete: function () {
            if (typeof _this33.options.onCloseEnd === "function") {
              _this33.options.onCloseEnd.call(_this33, _this33.el);
            }
          }
        });
      }
    }, {
      key: "_animateOverlayOut",
      value: function _animateOverlayOut() {
        var _this34 = this;
        anim.remove(this._overlay);
        anim({
          targets: this._overlay,
          opacity: 0,
          duration: this.options.outDuration,
          easing: "easeOutQuad",
          complete: function () {
            $(_this34._overlay).css("display", "none");
          }
        });
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Sidenav.__proto__ || Object.getPrototypeOf(Sidenav), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Sidenav;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Sidenav;
  })(Component);
  Sidenav._sidenavs = [];
  M.Sidenav = Sidenav;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Sidenav, "sidenav", "M_Sidenav");
  }
})(cash, M.anime);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    throttle: 100,
    scrollOffset: 200,
    activeClass: "active",
    getActiveElement: function (id) {
      return "a[href=\"#" + id + "\"]";
    }
  };
  var ScrollSpy = (function (_Component9) {
    _inherits(ScrollSpy, _Component9);
    function ScrollSpy(el, options) {
      _classCallCheck(this, ScrollSpy);
      var _this35 = _possibleConstructorReturn(this, (ScrollSpy.__proto__ || Object.getPrototypeOf(ScrollSpy)).call(this, ScrollSpy, el, options));
      _this35.el.M_ScrollSpy = _this35;
      _this35.options = $.extend({}, ScrollSpy.defaults, options);
      ScrollSpy._elements.push(_this35);
      ScrollSpy._count++;
      ScrollSpy._increment++;
      _this35.tickId = -1;
      _this35.id = ScrollSpy._increment;
      _this35._setupEventHandlers();
      _this35._handleWindowScroll();
      return _this35;
    }
    _createClass(ScrollSpy, [{
      key: "destroy",
      value: function destroy() {
        ScrollSpy._elements.splice(ScrollSpy._elements.indexOf(this), 1);
        ScrollSpy._elementsInView.splice(ScrollSpy._elementsInView.indexOf(this), 1);
        ScrollSpy._visibleElements.splice(ScrollSpy._visibleElements.indexOf(this.$el), 1);
        ScrollSpy._count--;
        this._removeEventHandlers();
        $(this.options.getActiveElement(this.$el.attr("id"))).removeClass(this.options.activeClass);
        this.el.M_ScrollSpy = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var throttledResize = M.throttle(this._handleWindowScroll, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        this._handleWindowScrollBound = this._handleWindowScroll.bind(this);
        if (ScrollSpy._count === 1) {
          window.addEventListener("scroll", this._handleWindowScrollBound);
          window.addEventListener("resize", this._handleThrottledResizeBound);
          document.body.addEventListener("click", this._handleTriggerClick);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (ScrollSpy._count === 0) {
          window.removeEventListener("scroll", this._handleWindowScrollBound);
          window.removeEventListener("resize", this._handleThrottledResizeBound);
          document.body.removeEventListener("click", this._handleTriggerClick);
        }
      }
    }, {
      key: "_handleTriggerClick",
      value: function _handleTriggerClick(e) {
        var $trigger = $(e.target);
        for (var i = ScrollSpy._elements.length - 1; i >= 0; i--) {
          var scrollspy = ScrollSpy._elements[i];
          if ($trigger.is("a[href=\"#" + scrollspy.$el.attr("id") + "\"]")) {
            e.preventDefault();
            var offset = scrollspy.$el.offset().top + 1;
            anim({
              targets: [document.documentElement, document.body],
              scrollTop: offset - scrollspy.options.scrollOffset,
              duration: 400,
              easing: "easeOutCubic"
            });
            break;
          }
        }
      }
    }, {
      key: "_handleWindowScroll",
      value: function _handleWindowScroll() {
        ScrollSpy._ticks++;
        var top = M.getDocumentScrollTop(), left = M.getDocumentScrollLeft(), right = left + window.innerWidth, bottom = top + window.innerHeight;
        var intersections = ScrollSpy._findElements(top, right, bottom, left);
        for (var i = 0; i < intersections.length; i++) {
          var scrollspy = intersections[i];
          var lastTick = scrollspy.tickId;
          if (lastTick < 0) {
            scrollspy._enter();
          }
          scrollspy.tickId = ScrollSpy._ticks;
        }
        for (var _i = 0; _i < ScrollSpy._elementsInView.length; _i++) {
          var _scrollspy = ScrollSpy._elementsInView[_i];
          var _lastTick = _scrollspy.tickId;
          if (_lastTick >= 0 && _lastTick !== ScrollSpy._ticks) {
            _scrollspy._exit();
            _scrollspy.tickId = -1;
          }
        }
        ScrollSpy._elementsInView = intersections;
      }
    }, {
      key: "_enter",
      value: function _enter() {
        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });
        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr("id"))).removeClass(this.options.activeClass);
          if (ScrollSpy._visibleElements[0][0].M_ScrollSpy && this.id < ScrollSpy._visibleElements[0][0].M_ScrollSpy.id) {
            ScrollSpy._visibleElements.unshift(this.$el);
          } else {
            ScrollSpy._visibleElements.push(this.$el);
          }
        } else {
          ScrollSpy._visibleElements.push(this.$el);
        }
        $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr("id"))).addClass(this.options.activeClass);
      }
    }, {
      key: "_exit",
      value: function _exit() {
        var _this36 = this;
        ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (value) {
          return value.height() != 0;
        });
        if (ScrollSpy._visibleElements[0]) {
          $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr("id"))).removeClass(this.options.activeClass);
          ScrollSpy._visibleElements = ScrollSpy._visibleElements.filter(function (el) {
            return el.attr("id") != _this36.$el.attr("id");
          });
          if (ScrollSpy._visibleElements[0]) {
            $(this.options.getActiveElement(ScrollSpy._visibleElements[0].attr("id"))).addClass(this.options.activeClass);
          }
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(ScrollSpy.__proto__ || Object.getPrototypeOf(ScrollSpy), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_ScrollSpy;
      }
    }, {
      key: "_findElements",
      value: function _findElements(top, right, bottom, left) {
        var hits = [];
        for (var i = 0; i < ScrollSpy._elements.length; i++) {
          var scrollspy = ScrollSpy._elements[i];
          var currTop = top + scrollspy.options.scrollOffset || 200;
          if (scrollspy.$el.height() > 0) {
            var elTop = scrollspy.$el.offset().top, elLeft = scrollspy.$el.offset().left, elRight = elLeft + scrollspy.$el.width(), elBottom = elTop + scrollspy.$el.height();
            var isIntersect = !(elLeft > right || elRight < left || elTop > bottom || elBottom < currTop);
            if (isIntersect) {
              hits.push(scrollspy);
            }
          }
        }
        return hits;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return ScrollSpy;
  })(Component);
  ScrollSpy._elements = [];
  ScrollSpy._elementsInView = [];
  ScrollSpy._visibleElements = [];
  ScrollSpy._count = 0;
  ScrollSpy._increment = 0;
  ScrollSpy._ticks = 0;
  M.ScrollSpy = ScrollSpy;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(ScrollSpy, "scrollSpy", "M_ScrollSpy");
  }
})(cash, M.anime);
;
(function ($) {
  "use strict";
  var _defaults = {
    data: {},
    limit: Infinity,
    onAutocomplete: null,
    minLength: 1,
    sortFunction: function (a, b, inputString) {
      return a.indexOf(inputString) - b.indexOf(inputString);
    }
  };
  var Autocomplete = (function (_Component10) {
    _inherits(Autocomplete, _Component10);
    function Autocomplete(el, options) {
      _classCallCheck(this, Autocomplete);
      var _this37 = _possibleConstructorReturn(this, (Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete)).call(this, Autocomplete, el, options));
      _this37.el.M_Autocomplete = _this37;
      _this37.options = $.extend({}, Autocomplete.defaults, options);
      _this37.isOpen = false;
      _this37.count = 0;
      _this37.activeIndex = -1;
      _this37.oldVal;
      _this37.$inputField = _this37.$el.closest(".input-field");
      _this37.$active = $();
      _this37._mousedown = false;
      _this37._setupDropdown();
      _this37._setupEventHandlers();
      return _this37;
    }
    _createClass(Autocomplete, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_Autocomplete = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this._handleInputKeyupAndFocusBound = this._handleInputKeyupAndFocus.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleContainerMousedownAndTouchstartBound = this._handleContainerMousedownAndTouchstart.bind(this);
        this._handleContainerMouseupAndTouchendBound = this._handleContainerMouseupAndTouchend.bind(this);
        this.el.addEventListener("blur", this._handleInputBlurBound);
        this.el.addEventListener("keyup", this._handleInputKeyupAndFocusBound);
        this.el.addEventListener("focus", this._handleInputKeyupAndFocusBound);
        this.el.addEventListener("keydown", this._handleInputKeydownBound);
        this.el.addEventListener("click", this._handleInputClickBound);
        this.container.addEventListener("mousedown", this._handleContainerMousedownAndTouchstartBound);
        this.container.addEventListener("mouseup", this._handleContainerMouseupAndTouchendBound);
        if (typeof window.ontouchstart !== "undefined") {
          this.container.addEventListener("touchstart", this._handleContainerMousedownAndTouchstartBound);
          this.container.addEventListener("touchend", this._handleContainerMouseupAndTouchendBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("blur", this._handleInputBlurBound);
        this.el.removeEventListener("keyup", this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener("focus", this._handleInputKeyupAndFocusBound);
        this.el.removeEventListener("keydown", this._handleInputKeydownBound);
        this.el.removeEventListener("click", this._handleInputClickBound);
        this.container.removeEventListener("mousedown", this._handleContainerMousedownAndTouchstartBound);
        this.container.removeEventListener("mouseup", this._handleContainerMouseupAndTouchendBound);
        if (typeof window.ontouchstart !== "undefined") {
          this.container.removeEventListener("touchstart", this._handleContainerMousedownAndTouchstartBound);
          this.container.removeEventListener("touchend", this._handleContainerMouseupAndTouchendBound);
        }
      }
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this38 = this;
        this.container = document.createElement("ul");
        this.container.id = "autocomplete-options-" + M.guid();
        $(this.container).addClass("autocomplete-content dropdown-content");
        this.$inputField.append(this.container);
        this.el.setAttribute("data-target", this.container.id);
        this.dropdown = M.Dropdown.init(this.el, {
          autoFocus: false,
          closeOnClick: false,
          coverTrigger: false,
          onItemClick: function (itemEl) {
            _this38.selectOption($(itemEl));
          }
        });
        this.el.removeEventListener("click", this.dropdown._handleClickBound);
      }
    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        this.container.parentNode.removeChild(this.container);
      }
    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        if (!this._mousedown) {
          this.close();
          this._resetAutocomplete();
        }
      }
    }, {
      key: "_handleInputKeyupAndFocus",
      value: function _handleInputKeyupAndFocus(e) {
        if (e.type === "keyup") {
          Autocomplete._keydown = false;
        }
        this.count = 0;
        var val = this.el.value.toLowerCase();
        if (e.keyCode === 13 || e.keyCode === 38 || e.keyCode === 40) {
          return;
        }
        if (this.oldVal !== val && (M.tabPressed || e.type !== "focus")) {
          this.open();
        }
        this.oldVal = val;
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Autocomplete._keydown = true;
        var keyCode = e.keyCode, liElement = void 0, numItems = $(this.container).children("li").length;
        if (keyCode === M.keys.ENTER && this.activeIndex >= 0) {
          liElement = $(this.container).children("li").eq(this.activeIndex);
          if (liElement.length) {
            this.selectOption(liElement);
            e.preventDefault();
          }
          return;
        }
        if (keyCode === M.keys.ARROW_UP || keyCode === M.keys.ARROW_DOWN) {
          e.preventDefault();
          if (keyCode === M.keys.ARROW_UP && this.activeIndex > 0) {
            this.activeIndex--;
          }
          if (keyCode === M.keys.ARROW_DOWN && this.activeIndex < numItems - 1) {
            this.activeIndex++;
          }
          this.$active.removeClass("active");
          if (this.activeIndex >= 0) {
            this.$active = $(this.container).children("li").eq(this.activeIndex);
            this.$active.addClass("active");
          }
        }
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick(e) {
        this.open();
      }
    }, {
      key: "_handleContainerMousedownAndTouchstart",
      value: function _handleContainerMousedownAndTouchstart(e) {
        this._mousedown = true;
      }
    }, {
      key: "_handleContainerMouseupAndTouchend",
      value: function _handleContainerMouseupAndTouchend(e) {
        this._mousedown = false;
      }
    }, {
      key: "_highlight",
      value: function _highlight(string, $el) {
        var img = $el.find("img");
        var matchStart = $el.text().toLowerCase().indexOf("" + string.toLowerCase() + ""), matchEnd = matchStart + string.length - 1, beforeMatch = $el.text().slice(0, matchStart), matchText = $el.text().slice(matchStart, matchEnd + 1), afterMatch = $el.text().slice(matchEnd + 1);
        $el.html("<span>" + beforeMatch + "<span class='highlight'>" + matchText + "</span>" + afterMatch + "</span>");
        if (img.length) {
          $el.prepend(img);
        }
      }
    }, {
      key: "_resetCurrentElement",
      value: function _resetCurrentElement() {
        this.activeIndex = -1;
        this.$active.removeClass("active");
      }
    }, {
      key: "_resetAutocomplete",
      value: function _resetAutocomplete() {
        $(this.container).empty();
        this._resetCurrentElement();
        this.oldVal = null;
        this.isOpen = false;
        this._mousedown = false;
      }
    }, {
      key: "selectOption",
      value: function selectOption(el) {
        var text = el.text().trim();
        this.el.value = text;
        this.$el.trigger("change");
        this._resetAutocomplete();
        this.close();
        if (typeof this.options.onAutocomplete === "function") {
          this.options.onAutocomplete.call(this, text);
        }
      }
    }, {
      key: "_renderDropdown",
      value: function _renderDropdown(data, val) {
        var _this39 = this;
        this._resetAutocomplete();
        var matchingData = [];
        for (var key in data) {
          if (data.hasOwnProperty(key) && key.toLowerCase().indexOf(val) !== -1) {
            if (this.count >= this.options.limit) {
              break;
            }
            var entry = {
              data: data[key],
              key: key
            };
            matchingData.push(entry);
            this.count++;
          }
        }
        if (this.options.sortFunction) {
          var sortFunctionBound = function (a, b) {
            return _this39.options.sortFunction(a.key.toLowerCase(), b.key.toLowerCase(), val.toLowerCase());
          };
          matchingData.sort(sortFunctionBound);
        }
        for (var i = 0; i < matchingData.length; i++) {
          var _entry = matchingData[i];
          var $autocompleteOption = $("<li></li>");
          if (!!_entry.data) {
            $autocompleteOption.append("<img src=\"" + _entry.data + "\" class=\"right circle\"><span>" + _entry.key + "</span>");
          } else {
            $autocompleteOption.append("<span>" + _entry.key + "</span>");
          }
          $(this.container).append($autocompleteOption);
          this._highlight(val, $autocompleteOption);
        }
      }
    }, {
      key: "open",
      value: function open() {
        var val = this.el.value.toLowerCase();
        this._resetAutocomplete();
        if (val.length >= this.options.minLength) {
          this.isOpen = true;
          this._renderDropdown(this.options.data, val);
        }
        if (!this.dropdown.isOpen) {
          this.dropdown.open();
        } else {
          this.dropdown.recalculateDimensions();
        }
      }
    }, {
      key: "close",
      value: function close() {
        this.dropdown.close();
      }
    }, {
      key: "updateData",
      value: function updateData(data) {
        var val = this.el.value.toLowerCase();
        this.options.data = data;
        if (this.isOpen) {
          this._renderDropdown(data, val);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Autocomplete.__proto__ || Object.getPrototypeOf(Autocomplete), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Autocomplete;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Autocomplete;
  })(Component);
  Autocomplete._keydown = false;
  M.Autocomplete = Autocomplete;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Autocomplete, "autocomplete", "M_Autocomplete");
  }
})(cash);
;
(function ($) {
  M.updateTextFields = function () {
    var input_selector = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea";
    $(input_selector).each(function (element, index) {
      var $this = $(this);
      if (element.value.length > 0 || $(element).is(":focus") || element.autofocus || $this.attr("placeholder") !== null) {
        $this.siblings("label").addClass("active");
      } else if (element.validity) {
        $this.siblings("label").toggleClass("active", element.validity.badInput === true);
      } else {
        $this.siblings("label").removeClass("active");
      }
    });
  };
  M.validate_field = function (object) {
    var hasLength = object.attr("data-length") !== null;
    var lenAttr = parseInt(object.attr("data-length"));
    var len = object[0].value.length;
    if (len === 0 && object[0].validity.badInput === false && !object.is(":required")) {
      if (object.hasClass("validate")) {
        object.removeClass("valid");
        object.removeClass("invalid");
      }
    } else {
      if (object.hasClass("validate")) {
        if (object.is(":valid") && hasLength && len <= lenAttr || object.is(":valid") && !hasLength) {
          object.removeClass("invalid");
          object.addClass("valid");
        } else {
          object.removeClass("valid");
          object.addClass("invalid");
        }
      }
    }
  };
  M.textareaAutoResize = function ($textarea) {
    if ($textarea instanceof Element) {
      $textarea = $($textarea);
    }
    if (!$textarea.length) {
      console.error("No textarea element found");
      return;
    }
    var hiddenDiv = $(".hiddendiv").first();
    if (!hiddenDiv.length) {
      hiddenDiv = $("<div class=\"hiddendiv common\"></div>");
      $("body").append(hiddenDiv);
    }
    var fontFamily = $textarea.css("font-family");
    var fontSize = $textarea.css("font-size");
    var lineHeight = $textarea.css("line-height");
    var paddingTop = $textarea.css("padding-top");
    var paddingRight = $textarea.css("padding-right");
    var paddingBottom = $textarea.css("padding-bottom");
    var paddingLeft = $textarea.css("padding-left");
    if (fontSize) {
      hiddenDiv.css("font-size", fontSize);
    }
    if (fontFamily) {
      hiddenDiv.css("font-family", fontFamily);
    }
    if (lineHeight) {
      hiddenDiv.css("line-height", lineHeight);
    }
    if (paddingTop) {
      hiddenDiv.css("padding-top", paddingTop);
    }
    if (paddingRight) {
      hiddenDiv.css("padding-right", paddingRight);
    }
    if (paddingBottom) {
      hiddenDiv.css("padding-bottom", paddingBottom);
    }
    if (paddingLeft) {
      hiddenDiv.css("padding-left", paddingLeft);
    }
    if (!$textarea.data("original-height")) {
      $textarea.data("original-height", $textarea.height());
    }
    if ($textarea.attr("wrap") === "off") {
      hiddenDiv.css("overflow-wrap", "normal").css("white-space", "pre");
    }
    hiddenDiv.text($textarea[0].value + "\n");
    var content = hiddenDiv.html().replace(/\n/g, "<br>");
    hiddenDiv.html(content);
    if ($textarea[0].offsetWidth > 0 && $textarea[0].offsetHeight > 0) {
      hiddenDiv.css("width", $textarea.width() + "px");
    } else {
      hiddenDiv.css("width", window.innerWidth / 2 + "px");
    }
    if ($textarea.data("original-height") <= hiddenDiv.innerHeight()) {
      $textarea.css("height", hiddenDiv.innerHeight() + "px");
    } else if ($textarea[0].value.length < $textarea.data("previous-length")) {
      $textarea.css("height", $textarea.data("original-height") + "px");
    }
    $textarea.data("previous-length", $textarea[0].value.length);
  };
  $(document).ready(function () {
    var input_selector = "input[type=text], input[type=password], input[type=email], input[type=url], input[type=tel], input[type=number], input[type=search], input[type=date], input[type=time], textarea";
    $(document).on("change", input_selector, function () {
      if (this.value.length !== 0 || $(this).attr("placeholder") !== null) {
        $(this).siblings("label").addClass("active");
      }
      M.validate_field($(this));
    });
    $(document).ready(function () {
      M.updateTextFields();
    });
    $(document).on("reset", function (e) {
      var formReset = $(e.target);
      if (formReset.is("form")) {
        formReset.find(input_selector).removeClass("valid").removeClass("invalid");
        formReset.find(input_selector).each(function (e) {
          if (this.value.length) {
            $(this).siblings("label").removeClass("active");
          }
        });
        setTimeout(function () {
          formReset.find("select").each(function () {
            if (this.M_FormSelect) {
              $(this).trigger("change");
            }
          });
        }, 0);
      }
    });
    document.addEventListener("focus", function (e) {
      if ($(e.target).is(input_selector)) {
        $(e.target).siblings("label, .prefix").addClass("active");
      }
    }, true);
    document.addEventListener("blur", function (e) {
      var $inputElement = $(e.target);
      if ($inputElement.is(input_selector)) {
        var selector = ".prefix";
        if ($inputElement[0].value.length === 0 && $inputElement[0].validity.badInput !== true && $inputElement.attr("placeholder") === null) {
          selector += ", label";
        }
        $inputElement.siblings(selector).removeClass("active");
        M.validate_field($inputElement);
      }
    }, true);
    var radio_checkbox = "input[type=radio], input[type=checkbox]";
    $(document).on("keyup", radio_checkbox, function (e) {
      if (e.which === M.keys.TAB) {
        $(this).addClass("tabbed");
        var $this = $(this);
        $this.one("blur", function (e) {
          $(this).removeClass("tabbed");
        });
        return;
      }
    });
    var text_area_selector = ".materialize-textarea";
    $(text_area_selector).each(function () {
      var $textarea = $(this);
      $textarea.data("original-height", $textarea.height());
      $textarea.data("previous-length", this.value.length);
      M.textareaAutoResize($textarea);
    });
    $(document).on("keyup", text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    $(document).on("keydown", text_area_selector, function () {
      M.textareaAutoResize($(this));
    });
    $(document).on("change", ".file-field input[type=\"file\"]", function () {
      var file_field = $(this).closest(".file-field");
      var path_input = file_field.find("input.file-path");
      var files = $(this)[0].files;
      var file_names = [];
      for (var i = 0; i < files.length; i++) {
        file_names.push(files[i].name);
      }
      path_input[0].value = file_names.join(", ");
      path_input.trigger("change");
    });
  });
})(cash);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    indicators: true,
    height: 400,
    duration: 500,
    interval: 6000
  };
  var Slider = (function (_Component11) {
    _inherits(Slider, _Component11);
    function Slider(el, options) {
      _classCallCheck(this, Slider);
      var _this40 = _possibleConstructorReturn(this, (Slider.__proto__ || Object.getPrototypeOf(Slider)).call(this, Slider, el, options));
      _this40.el.M_Slider = _this40;
      _this40.options = $.extend({}, Slider.defaults, options);
      _this40.$slider = _this40.$el.find(".slides");
      _this40.$slides = _this40.$slider.children("li");
      _this40.activeIndex = _this40.$slides.filter(function (item) {
        return $(item).hasClass("active");
      }).first().index();
      if (_this40.activeIndex != -1) {
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);
      }
      _this40._setSliderHeight();
      _this40.$slides.find(".caption").each(function (el) {
        _this40._animateCaptionIn(el, 0);
      });
      _this40.$slides.find("img").each(function (el) {
        var placeholderBase64 = "data:image/gif;base64,R0lGODlhAQABAIABAP///wAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==";
        if ($(el).attr("src") !== placeholderBase64) {
          $(el).css("background-image", "url(\"" + $(el).attr("src") + "\")");
          $(el).attr("src", placeholderBase64);
        }
      });
      _this40._setupIndicators();
      if (_this40.$active) {
        _this40.$active.css("display", "block");
      } else {
        _this40.$slides.first().addClass("active");
        anim({
          targets: _this40.$slides.first()[0],
          opacity: 1,
          duration: _this40.options.duration,
          easing: "easeOutQuad"
        });
        _this40.activeIndex = 0;
        _this40.$active = _this40.$slides.eq(_this40.activeIndex);
        if (_this40.options.indicators) {
          _this40.$indicators.eq(_this40.activeIndex).addClass("active");
        }
      }
      _this40.$active.find("img").each(function (el) {
        anim({
          targets: _this40.$active.find(".caption")[0],
          opacity: 1,
          translateX: 0,
          translateY: 0,
          duration: _this40.options.duration,
          easing: "easeOutQuad"
        });
      });
      _this40._setupEventHandlers();
      _this40.start();
      return _this40;
    }
    _createClass(Slider, [{
      key: "destroy",
      value: function destroy() {
        this.pause();
        this._removeIndicators();
        this._removeEventHandlers();
        this.el.M_Slider = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this41 = this;
        this._handleIntervalBound = this._handleInterval.bind(this);
        this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.addEventListener("click", _this41._handleIndicatorClickBound);
          });
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this42 = this;
        if (this.options.indicators) {
          this.$indicators.each(function (el) {
            el.removeEventListener("click", _this42._handleIndicatorClickBound);
          });
        }
      }
    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        var currIndex = $(e.target).index();
        this.set(currIndex);
      }
    }, {
      key: "_handleInterval",
      value: function _handleInterval() {
        var newActiveIndex = this.$slider.find(".active").index();
        if (this.$slides.length === newActiveIndex + 1) newActiveIndex = 0; else newActiveIndex += 1;
        this.set(newActiveIndex);
      }
    }, {
      key: "_animateCaptionIn",
      value: function _animateCaptionIn(caption, duration) {
        var animOptions = {
          targets: caption,
          opacity: 0,
          duration: duration,
          easing: "easeOutQuad"
        };
        if ($(caption).hasClass("center-align")) {
          animOptions.translateY = -100;
        } else if ($(caption).hasClass("right-align")) {
          animOptions.translateX = 100;
        } else if ($(caption).hasClass("left-align")) {
          animOptions.translateX = -100;
        }
        anim(animOptions);
      }
    }, {
      key: "_setSliderHeight",
      value: function _setSliderHeight() {
        if (!this.$el.hasClass("fullscreen")) {
          if (this.options.indicators) {
            this.$el.css("height", this.options.height + 40 + "px");
          } else {
            this.$el.css("height", this.options.height + "px");
          }
          this.$slider.css("height", this.options.height + "px");
        }
      }
    }, {
      key: "_setupIndicators",
      value: function _setupIndicators() {
        var _this43 = this;
        if (this.options.indicators) {
          this.$indicators = $("<ul class=\"indicators\"></ul>");
          this.$slides.each(function (el, index) {
            var $indicator = $("<li class=\"indicator-item\"></li>");
            _this43.$indicators.append($indicator[0]);
          });
          this.$el.append(this.$indicators[0]);
          this.$indicators = this.$indicators.children("li.indicator-item");
        }
      }
    }, {
      key: "_removeIndicators",
      value: function _removeIndicators() {
        this.$el.find("ul.indicators").remove();
      }
    }, {
      key: "set",
      value: function set(index) {
        var _this44 = this;
        if (index >= this.$slides.length) index = 0; else if (index < 0) index = this.$slides.length - 1;
        if (this.activeIndex != index) {
          this.$active = this.$slides.eq(this.activeIndex);
          var $caption = this.$active.find(".caption");
          this.$active.removeClass("active");
          anim({
            targets: this.$active[0],
            opacity: 0,
            duration: this.options.duration,
            easing: "easeOutQuad",
            complete: function () {
              _this44.$slides.not(".active").each(function (el) {
                anim({
                  targets: el,
                  opacity: 0,
                  translateX: 0,
                  translateY: 0,
                  duration: 0,
                  easing: "easeOutQuad"
                });
              });
            }
          });
          this._animateCaptionIn($caption[0], this.options.duration);
          if (this.options.indicators) {
            this.$indicators.eq(this.activeIndex).removeClass("active");
            this.$indicators.eq(index).addClass("active");
          }
          anim({
            targets: this.$slides.eq(index)[0],
            opacity: 1,
            duration: this.options.duration,
            easing: "easeOutQuad"
          });
          anim({
            targets: this.$slides.eq(index).find(".caption")[0],
            opacity: 1,
            translateX: 0,
            translateY: 0,
            duration: this.options.duration,
            delay: this.options.duration,
            easing: "easeOutQuad"
          });
          this.$slides.eq(index).addClass("active");
          this.activeIndex = index;
          this.start();
        }
      }
    }, {
      key: "pause",
      value: function pause() {
        clearInterval(this.interval);
      }
    }, {
      key: "start",
      value: function start() {
        clearInterval(this.interval);
        this.interval = setInterval(this._handleIntervalBound, this.options.duration + this.options.interval);
      }
    }, {
      key: "next",
      value: function next() {
        var newIndex = this.activeIndex + 1;
        if (newIndex >= this.$slides.length) newIndex = 0; else if (newIndex < 0) newIndex = this.$slides.length - 1;
        this.set(newIndex);
      }
    }, {
      key: "prev",
      value: function prev() {
        var newIndex = this.activeIndex - 1;
        if (newIndex >= this.$slides.length) newIndex = 0; else if (newIndex < 0) newIndex = this.$slides.length - 1;
        this.set(newIndex);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Slider.__proto__ || Object.getPrototypeOf(Slider), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Slider;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Slider;
  })(Component);
  M.Slider = Slider;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Slider, "slider", "M_Slider");
  }
})(cash, M.anime);
;
(function ($, anim) {
  $(document).on("click", ".card", function (e) {
    if ($(this).children(".card-reveal").length) {
      var $card = $(e.target).closest(".card");
      if ($card.data("initialOverflow") === undefined) {
        $card.data("initialOverflow", $card.css("overflow") === undefined ? "" : $card.css("overflow"));
      }
      var $cardReveal = $(this).find(".card-reveal");
      if ($(e.target).is($(".card-reveal .card-title")) || $(e.target).is($(".card-reveal .card-title i"))) {
        anim({
          targets: $cardReveal[0],
          translateY: 0,
          duration: 225,
          easing: "easeInOutQuad",
          complete: function (anim) {
            var el = anim.animatables[0].target;
            $(el).css({
              display: "none"
            });
            $card.css("overflow", $card.data("initialOverflow"));
          }
        });
      } else if ($(e.target).is($(".card .activator")) || $(e.target).is($(".card .activator i"))) {
        $card.css("overflow", "hidden");
        $cardReveal.css({
          display: "block"
        });
        anim({
          targets: $cardReveal[0],
          translateY: "-100%",
          duration: 300,
          easing: "easeInOutQuad"
        });
      }
    }
  });
})(cash, M.anime);
;
(function ($) {
  "use strict";
  var _defaults = {
    data: [],
    placeholder: "",
    secondaryPlaceholder: "",
    autocompleteOptions: {},
    limit: Infinity,
    onChipAdd: null,
    onChipSelect: null,
    onChipDelete: null
  };
  var Chips = (function (_Component12) {
    _inherits(Chips, _Component12);
    function Chips(el, options) {
      _classCallCheck(this, Chips);
      var _this45 = _possibleConstructorReturn(this, (Chips.__proto__ || Object.getPrototypeOf(Chips)).call(this, Chips, el, options));
      _this45.el.M_Chips = _this45;
      _this45.options = $.extend({}, Chips.defaults, options);
      _this45.$el.addClass("chips input-field");
      _this45.chipsData = [];
      _this45.$chips = $();
      _this45._setupInput();
      _this45.hasAutocomplete = Object.keys(_this45.options.autocompleteOptions).length > 0;
      if (!_this45.$input.attr("id")) {
        _this45.$input.attr("id", M.guid());
      }
      if (_this45.options.data.length) {
        _this45.chipsData = _this45.options.data;
        _this45._renderChips(_this45.chipsData);
      }
      if (_this45.hasAutocomplete) {
        _this45._setupAutocomplete();
      }
      _this45._setPlaceholder();
      _this45._setupLabel();
      _this45._setupEventHandlers();
      return _this45;
    }
    _createClass(Chips, [{
      key: "getData",
      value: function getData() {
        return this.chipsData;
      }
    }, {
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.$chips.remove();
        this.el.M_Chips = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleChipClickBound = this._handleChipClick.bind(this);
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputFocusBound = this._handleInputFocus.bind(this);
        this._handleInputBlurBound = this._handleInputBlur.bind(this);
        this.el.addEventListener("click", this._handleChipClickBound);
        document.addEventListener("keydown", Chips._handleChipsKeydown);
        document.addEventListener("keyup", Chips._handleChipsKeyup);
        this.el.addEventListener("blur", Chips._handleChipsBlur, true);
        this.$input[0].addEventListener("focus", this._handleInputFocusBound);
        this.$input[0].addEventListener("blur", this._handleInputBlurBound);
        this.$input[0].addEventListener("keydown", this._handleInputKeydownBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleChipClickBound);
        document.removeEventListener("keydown", Chips._handleChipsKeydown);
        document.removeEventListener("keyup", Chips._handleChipsKeyup);
        this.el.removeEventListener("blur", Chips._handleChipsBlur, true);
        this.$input[0].removeEventListener("focus", this._handleInputFocusBound);
        this.$input[0].removeEventListener("blur", this._handleInputBlurBound);
        this.$input[0].removeEventListener("keydown", this._handleInputKeydownBound);
      }
    }, {
      key: "_handleChipClick",
      value: function _handleChipClick(e) {
        var $chip = $(e.target).closest(".chip");
        var clickedClose = $(e.target).is(".close");
        if ($chip.length) {
          var index = $chip.index();
          if (clickedClose) {
            this.deleteChip(index);
            this.$input[0].focus();
          } else {
            this.selectChip(index);
          }
        } else {
          this.$input[0].focus();
        }
      }
    }, {
      key: "_handleInputFocus",
      value: function _handleInputFocus() {
        this.$el.addClass("focus");
      }
    }, {
      key: "_handleInputBlur",
      value: function _handleInputBlur() {
        this.$el.removeClass("focus");
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        Chips._keydown = true;
        if (e.keyCode === 13) {
          if (this.hasAutocomplete && this.autocomplete && this.autocomplete.isOpen) {
            return;
          }
          e.preventDefault();
          this.addChip({
            tag: this.$input[0].value
          });
          this.$input[0].value = "";
        } else if ((e.keyCode === 8 || e.keyCode === 37) && this.$input[0].value === "" && this.chipsData.length) {
          e.preventDefault();
          this.selectChip(this.chipsData.length - 1);
        }
      }
    }, {
      key: "_renderChip",
      value: function _renderChip(chip) {
        if (!chip.tag) {
          return;
        }
        var renderedChip = document.createElement("div");
        var closeIcon = document.createElement("i");
        renderedChip.classList.add("chip");
        renderedChip.textContent = chip.tag;
        renderedChip.setAttribute("tabindex", 0);
        $(closeIcon).addClass("material-icons close");
        closeIcon.textContent = "close";
        if (chip.image) {
          var img = document.createElement("img");
          img.setAttribute("src", chip.image);
          renderedChip.insertBefore(img, renderedChip.firstChild);
        }
        renderedChip.appendChild(closeIcon);
        return renderedChip;
      }
    }, {
      key: "_renderChips",
      value: function _renderChips() {
        this.$chips.remove();
        for (var i = 0; i < this.chipsData.length; i++) {
          var chipEl = this._renderChip(this.chipsData[i]);
          this.$el.append(chipEl);
          this.$chips.add(chipEl);
        }
        this.$el.append(this.$input[0]);
      }
    }, {
      key: "_setupAutocomplete",
      value: function _setupAutocomplete() {
        var _this46 = this;
        this.options.autocompleteOptions.onAutocomplete = function (val) {
          _this46.addChip({
            tag: val
          });
          _this46.$input[0].value = "";
          _this46.$input[0].focus();
        };
        this.autocomplete = M.Autocomplete.init(this.$input[0], this.options.autocompleteOptions);
      }
    }, {
      key: "_setupInput",
      value: function _setupInput() {
        this.$input = this.$el.find("input");
        if (!this.$input.length) {
          this.$input = $("<input></input>");
          this.$el.append(this.$input);
        }
        this.$input.addClass("input");
      }
    }, {
      key: "_setupLabel",
      value: function _setupLabel() {
        this.$label = this.$el.find("label");
        if (this.$label.length) {
          this.$label.setAttribute("for", this.$input.attr("id"));
        }
      }
    }, {
      key: "_setPlaceholder",
      value: function _setPlaceholder() {
        if (this.chipsData !== undefined && !this.chipsData.length && this.options.placeholder) {
          $(this.$input).prop("placeholder", this.options.placeholder);
        } else if ((this.chipsData === undefined || !!this.chipsData.length) && this.options.secondaryPlaceholder) {
          $(this.$input).prop("placeholder", this.options.secondaryPlaceholder);
        }
      }
    }, {
      key: "_isValid",
      value: function _isValid(chip) {
        if (chip.hasOwnProperty("tag") && chip.tag !== "") {
          var exists = false;
          for (var i = 0; i < this.chipsData.length; i++) {
            if (this.chipsData[i].tag === chip.tag) {
              exists = true;
              break;
            }
          }
          return !exists;
        }
        return false;
      }
    }, {
      key: "addChip",
      value: function addChip(chip) {
        if (!this._isValid(chip) || this.chipsData.length >= this.options.limit) {
          return;
        }
        var renderedChip = this._renderChip(chip);
        this.$chips.add(renderedChip);
        this.chipsData.push(chip);
        $(this.$input).before(renderedChip);
        this._setPlaceholder();
        if (typeof this.options.onChipAdd === "function") {
          this.options.onChipAdd.call(this, this.$el, renderedChip);
        }
      }
    }, {
      key: "deleteChip",
      value: function deleteChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this.$chips.eq(chipIndex).remove();
        this.$chips = this.$chips.filter(function (el) {
          return $(el).index() >= 0;
        });
        this.chipsData.splice(chipIndex, 1);
        this._setPlaceholder();
        if (typeof this.options.onChipDelete === "function") {
          this.options.onChipDelete.call(this, this.$el, $chip[0]);
        }
      }
    }, {
      key: "selectChip",
      value: function selectChip(chipIndex) {
        var $chip = this.$chips.eq(chipIndex);
        this._selectedChip = $chip;
        $chip[0].focus();
        if (typeof this.options.onChipSelect === "function") {
          this.options.onChipSelect.call(this, this.$el, $chip[0]);
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Chips.__proto__ || Object.getPrototypeOf(Chips), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Chips;
      }
    }, {
      key: "_handleChipsKeydown",
      value: function _handleChipsKeydown(e) {
        Chips._keydown = true;
        var $chips = $(e.target).closest(".chips");
        var chipsKeydown = e.target && $chips.length;
        if ($(e.target).is("input, textarea") || !chipsKeydown) {
          return;
        }
        var currChips = $chips[0].M_Chips;
        if (e.keyCode === 8 || e.keyCode === 46) {
          e.preventDefault();
          var selectIndex = currChips.chipsData.length;
          if (currChips._selectedChip) {
            var index = currChips._selectedChip.index();
            currChips.deleteChip(index);
            currChips._selectedChip = null;
            selectIndex = Math.max(index - 1, 0);
          }
          if (currChips.chipsData.length) {
            currChips.selectChip(selectIndex);
          }
        } else if (e.keyCode === 37) {
          if (currChips._selectedChip) {
            var _selectIndex = currChips._selectedChip.index() - 1;
            if (_selectIndex < 0) {
              return;
            }
            currChips.selectChip(_selectIndex);
          }
        } else if (e.keyCode === 39) {
          if (currChips._selectedChip) {
            var _selectIndex2 = currChips._selectedChip.index() + 1;
            if (_selectIndex2 >= currChips.chipsData.length) {
              currChips.$input[0].focus();
            } else {
              currChips.selectChip(_selectIndex2);
            }
          }
        }
      }
    }, {
      key: "_handleChipsKeyup",
      value: function _handleChipsKeyup(e) {
        Chips._keydown = false;
      }
    }, {
      key: "_handleChipsBlur",
      value: function _handleChipsBlur(e) {
        if (!Chips._keydown) {
          var $chips = $(e.target).closest(".chips");
          var currChips = $chips[0].M_Chips;
          currChips._selectedChip = null;
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Chips;
  })(Component);
  Chips._keydown = false;
  M.Chips = Chips;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Chips, "chips", "M_Chips");
  }
  $(document).ready(function () {
    $(document.body).on("click", ".chip .close", function () {
      var $chips = $(this).closest(".chips");
      if ($chips.length && $chips[0].M_Chips) {
        return;
      }
      $(this).closest(".chip").remove();
    });
  });
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    top: 0,
    bottom: Infinity,
    offset: 0,
    onPositionChange: null
  };
  var Pushpin = (function (_Component13) {
    _inherits(Pushpin, _Component13);
    function Pushpin(el, options) {
      _classCallCheck(this, Pushpin);
      var _this47 = _possibleConstructorReturn(this, (Pushpin.__proto__ || Object.getPrototypeOf(Pushpin)).call(this, Pushpin, el, options));
      _this47.el.M_Pushpin = _this47;
      _this47.options = $.extend({}, Pushpin.defaults, options);
      _this47.originalOffset = _this47.el.offsetTop;
      Pushpin._pushpins.push(_this47);
      _this47._setupEventHandlers();
      _this47._updatePosition();
      return _this47;
    }
    _createClass(Pushpin, [{
      key: "destroy",
      value: function destroy() {
        this.el.style.top = null;
        this._removePinClasses();
        this._removeEventHandlers();
        var index = Pushpin._pushpins.indexOf(this);
        Pushpin._pushpins.splice(index, 1);
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        document.addEventListener("scroll", Pushpin._updateElements);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        document.removeEventListener("scroll", Pushpin._updateElements);
      }
    }, {
      key: "_updatePosition",
      value: function _updatePosition() {
        var scrolled = M.getDocumentScrollTop() + this.options.offset;
        if (this.options.top <= scrolled && this.options.bottom >= scrolled && !this.el.classList.contains("pinned")) {
          this._removePinClasses();
          this.el.style.top = this.options.offset + "px";
          this.el.classList.add("pinned");
          if (typeof this.options.onPositionChange === "function") {
            this.options.onPositionChange.call(this, "pinned");
          }
        }
        if (scrolled < this.options.top && !this.el.classList.contains("pin-top")) {
          this._removePinClasses();
          this.el.style.top = 0;
          this.el.classList.add("pin-top");
          if (typeof this.options.onPositionChange === "function") {
            this.options.onPositionChange.call(this, "pin-top");
          }
        }
        if (scrolled > this.options.bottom && !this.el.classList.contains("pin-bottom")) {
          this._removePinClasses();
          this.el.classList.add("pin-bottom");
          this.el.style.top = this.options.bottom - this.originalOffset + "px";
          if (typeof this.options.onPositionChange === "function") {
            this.options.onPositionChange.call(this, "pin-bottom");
          }
        }
      }
    }, {
      key: "_removePinClasses",
      value: function _removePinClasses() {
        this.el.classList.remove("pin-top");
        this.el.classList.remove("pinned");
        this.el.classList.remove("pin-bottom");
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Pushpin.__proto__ || Object.getPrototypeOf(Pushpin), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Pushpin;
      }
    }, {
      key: "_updateElements",
      value: function _updateElements() {
        for (var elIndex in Pushpin._pushpins) {
          var pInstance = Pushpin._pushpins[elIndex];
          pInstance._updatePosition();
        }
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Pushpin;
  })(Component);
  Pushpin._pushpins = [];
  M.Pushpin = Pushpin;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Pushpin, "pushpin", "M_Pushpin");
  }
})(cash);
;
(function ($, anim) {
  "use strict";
  var _defaults = {
    direction: "top",
    hoverEnabled: true,
    toolbarEnabled: false
  };
  $.fn.reverse = [].reverse;
  var FloatingActionButton = (function (_Component14) {
    _inherits(FloatingActionButton, _Component14);
    function FloatingActionButton(el, options) {
      _classCallCheck(this, FloatingActionButton);
      var _this48 = _possibleConstructorReturn(this, (FloatingActionButton.__proto__ || Object.getPrototypeOf(FloatingActionButton)).call(this, FloatingActionButton, el, options));
      _this48.el.M_FloatingActionButton = _this48;
      _this48.options = $.extend({}, FloatingActionButton.defaults, options);
      _this48.isOpen = false;
      _this48.$anchor = _this48.$el.children("a").first();
      _this48.$menu = _this48.$el.children("ul").first();
      _this48.$floatingBtns = _this48.$el.find("ul .btn-floating");
      _this48.$floatingBtnsReverse = _this48.$el.find("ul .btn-floating").reverse();
      _this48.offsetY = 0;
      _this48.offsetX = 0;
      _this48.$el.addClass("direction-" + _this48.options.direction);
      if (_this48.options.direction === "top") {
        _this48.offsetY = 40;
      } else if (_this48.options.direction === "right") {
        _this48.offsetX = -40;
      } else if (_this48.options.direction === "bottom") {
        _this48.offsetY = -40;
      } else {
        _this48.offsetX = 40;
      }
      _this48._setupEventHandlers();
      return _this48;
    }
    _createClass(FloatingActionButton, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_FloatingActionButton = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleFABClickBound = this._handleFABClick.bind(this);
        this._handleOpenBound = this.open.bind(this);
        this._handleCloseBound = this.close.bind(this);
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.addEventListener("mouseenter", this._handleOpenBound);
          this.el.addEventListener("mouseleave", this._handleCloseBound);
        } else {
          this.el.addEventListener("click", this._handleFABClickBound);
        }
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        if (this.options.hoverEnabled && !this.options.toolbarEnabled) {
          this.el.removeEventListener("mouseenter", this._handleOpenBound);
          this.el.removeEventListener("mouseleave", this._handleCloseBound);
        } else {
          this.el.removeEventListener("click", this._handleFABClickBound);
        }
      }
    }, {
      key: "_handleFABClick",
      value: function _handleFABClick() {
        if (this.isOpen) {
          this.close();
        } else {
          this.open();
        }
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest(this.$menu).length) {
          this.close();
        }
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        if (this.options.toolbarEnabled) {
          this._animateInToolbar();
        } else {
          this._animateInFAB();
        }
        this.isOpen = true;
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        if (this.options.toolbarEnabled) {
          window.removeEventListener("scroll", this._handleCloseBound, true);
          document.body.removeEventListener("click", this._handleDocumentClickBound, true);
          this._animateOutToolbar();
        } else {
          this._animateOutFAB();
        }
        this.isOpen = false;
      }
    }, {
      key: "_animateInFAB",
      value: function _animateInFAB() {
        var _this49 = this;
        this.$el.addClass("active");
        var time = 0;
        this.$floatingBtnsReverse.each(function (el) {
          anim({
            targets: el,
            opacity: 1,
            scale: [0.4, 1],
            translateY: [_this49.offsetY, 0],
            translateX: [_this49.offsetX, 0],
            duration: 275,
            delay: time,
            easing: "easeInOutQuad"
          });
          time += 40;
        });
      }
    }, {
      key: "_animateOutFAB",
      value: function _animateOutFAB() {
        var _this50 = this;
        this.$floatingBtnsReverse.each(function (el) {
          anim.remove(el);
          anim({
            targets: el,
            opacity: 0,
            scale: 0.4,
            translateY: _this50.offsetY,
            translateX: _this50.offsetX,
            duration: 175,
            easing: "easeOutQuad",
            complete: function () {
              _this50.$el.removeClass("active");
            }
          });
        });
      }
    }, {
      key: "_animateInToolbar",
      value: function _animateInToolbar() {
        var _this51 = this;
        var scaleFactor = void 0;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var btnRect = this.el.getBoundingClientRect();
        var backdrop = $("<div class=\"fab-backdrop\"></div>");
        var fabColor = this.$anchor.css("background-color");
        this.$anchor.append(backdrop);
        this.offsetX = btnRect.left - windowWidth / 2 + btnRect.width / 2;
        this.offsetY = windowHeight - btnRect.bottom;
        scaleFactor = windowWidth / backdrop[0].clientWidth;
        this.btnBottom = btnRect.bottom;
        this.btnLeft = btnRect.left;
        this.btnWidth = btnRect.width;
        this.$el.addClass("active");
        this.$el.css({
          "text-align": "center",
          width: "100%",
          bottom: 0,
          left: 0,
          transform: "translateX(" + this.offsetX + "px)",
          transition: "none"
        });
        this.$anchor.css({
          transform: "translateY(" + -this.offsetY + "px)",
          transition: "none"
        });
        backdrop.css({
          "background-color": fabColor
        });
        setTimeout(function () {
          _this51.$el.css({
            transform: "",
            transition: "transform .2s cubic-bezier(0.550, 0.085, 0.680, 0.530), background-color 0s linear .2s"
          });
          _this51.$anchor.css({
            overflow: "visible",
            transform: "",
            transition: "transform .2s"
          });
          setTimeout(function () {
            _this51.$el.css({
              overflow: "hidden",
              "background-color": fabColor
            });
            backdrop.css({
              transform: "scale(" + scaleFactor + ")",
              transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
            });
            _this51.$menu.children("li").children("a").css({
              opacity: 1
            });
            _this51._handleDocumentClickBound = _this51._handleDocumentClick.bind(_this51);
            window.addEventListener("scroll", _this51._handleCloseBound, true);
            document.body.addEventListener("click", _this51._handleDocumentClickBound, true);
          }, 100);
        }, 0);
      }
    }, {
      key: "_animateOutToolbar",
      value: function _animateOutToolbar() {
        var _this52 = this;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var backdrop = this.$el.find(".fab-backdrop");
        var fabColor = this.$anchor.css("background-color");
        this.offsetX = this.btnLeft - windowWidth / 2 + this.btnWidth / 2;
        this.offsetY = windowHeight - this.btnBottom;
        this.$el.removeClass("active");
        this.$el.css({
          "background-color": "transparent",
          transition: "none"
        });
        this.$anchor.css({
          transition: "none"
        });
        backdrop.css({
          transform: "scale(0)",
          "background-color": fabColor
        });
        this.$menu.children("li").children("a").css({
          opacity: ""
        });
        setTimeout(function () {
          backdrop.remove();
          _this52.$el.css({
            "text-align": "",
            width: "",
            bottom: "",
            left: "",
            overflow: "",
            "background-color": "",
            transform: "translate3d(" + -_this52.offsetX + "px,0,0)"
          });
          _this52.$anchor.css({
            overflow: "",
            transform: "translate3d(0," + _this52.offsetY + "px,0)"
          });
          setTimeout(function () {
            _this52.$el.css({
              transform: "translate3d(0,0,0)",
              transition: "transform .2s"
            });
            _this52.$anchor.css({
              transform: "translate3d(0,0,0)",
              transition: "transform .2s cubic-bezier(0.550, 0.055, 0.675, 0.190)"
            });
          }, 20);
        }, 200);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FloatingActionButton.__proto__ || Object.getPrototypeOf(FloatingActionButton), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FloatingActionButton;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return FloatingActionButton;
  })(Component);
  M.FloatingActionButton = FloatingActionButton;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FloatingActionButton, "floatingActionButton", "M_FloatingActionButton");
  }
})(cash, M.anime);
;
(function ($) {
  "use strict";
  var _defaults = {
    autoClose: false,
    format: "mmm dd, yyyy",
    parse: null,
    defaultDate: null,
    setDefaultDate: false,
    disableWeekends: false,
    disableDayFn: null,
    firstDay: 0,
    minDate: null,
    maxDate: null,
    yearRange: 10,
    minYear: 0,
    maxYear: 9999,
    minMonth: undefined,
    maxMonth: undefined,
    startRange: null,
    endRange: null,
    isRTL: false,
    showMonthAfterYear: false,
    showDaysInNextAndPreviousMonths: false,
    container: null,
    showClearBtn: false,
    i18n: {
      cancel: "Cancel",
      clear: "Clear",
      done: "Ok",
      previousMonth: "‹",
      nextMonth: "›",
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
      weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      weekdaysAbbrev: ["S", "M", "T", "W", "T", "F", "S"]
    },
    events: [],
    onSelect: null,
    onOpen: null,
    onClose: null,
    onDraw: null
  };
  var Datepicker = (function (_Component15) {
    _inherits(Datepicker, _Component15);
    function Datepicker(el, options) {
      _classCallCheck(this, Datepicker);
      var _this53 = _possibleConstructorReturn(this, (Datepicker.__proto__ || Object.getPrototypeOf(Datepicker)).call(this, Datepicker, el, options));
      _this53.el.M_Datepicker = _this53;
      _this53.options = $.extend({}, Datepicker.defaults, options);
      if (!!options && options.hasOwnProperty("i18n") && typeof options.i18n === "object") {
        _this53.options.i18n = $.extend({}, Datepicker.defaults.i18n, options.i18n);
      }
      if (_this53.options.minDate) _this53.options.minDate.setHours(0, 0, 0, 0);
      if (_this53.options.maxDate) _this53.options.maxDate.setHours(0, 0, 0, 0);
      _this53.id = M.guid();
      _this53._setupVariables();
      _this53._insertHTMLIntoDOM();
      _this53._setupModal();
      _this53._setupEventHandlers();
      if (!_this53.options.defaultDate) {
        _this53.options.defaultDate = new Date(Date.parse(_this53.el.value));
      }
      var defDate = _this53.options.defaultDate;
      if (Datepicker._isDate(defDate)) {
        if (_this53.options.setDefaultDate) {
          _this53.setDate(defDate, true);
          _this53.setInputValue();
        } else {
          _this53.gotoDate(defDate);
        }
      } else {
        _this53.gotoDate(new Date());
      }
      _this53.isOpen = false;
      return _this53;
    }
    _createClass(Datepicker, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.destroySelects();
        this.el.M_Datepicker = undefined;
      }
    }, {
      key: "destroySelects",
      value: function destroySelects() {
        var oldYearSelect = this.calendarEl.querySelector(".orig-select-year");
        if (oldYearSelect) {
          M.FormSelect.getInstance(oldYearSelect).destroy();
        }
        var oldMonthSelect = this.calendarEl.querySelector(".orig-select-month");
        if (oldMonthSelect) {
          M.FormSelect.getInstance(oldMonthSelect).destroy();
        }
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        if (this.options.showClearBtn) {
          $(this.clearBtn).css({
            visibility: ""
          });
          this.clearBtn.innerHTML = this.options.i18n.clear;
        }
        this.doneBtn.innerHTML = this.options.i18n.done;
        this.cancelBtn.innerHTML = this.options.i18n.cancel;
        if (this.options.container) {
          this.$modalEl.appendTo(this.options.container);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this54 = this;
        this.modalEl.id = "modal-" + this.id;
        this.modal = M.Modal.init(this.modalEl, {
          onCloseEnd: function () {
            _this54.isOpen = false;
          }
        });
      }
    }, {
      key: "toString",
      value: function toString(format) {
        var _this55 = this;
        format = format || this.options.format;
        if (!Datepicker._isDate(this.date)) {
          return "";
        }
        var formatArray = format.split(/(d{1,4}|m{1,4}|y{4}|yy|!.)/g);
        var formattedDate = formatArray.map(function (label) {
          if (_this55.formats[label]) {
            return _this55.formats[label]();
          }
          return label;
        }).join("");
        return formattedDate;
      }
    }, {
      key: "setDate",
      value: function setDate(date, preventOnSelect) {
        if (!date) {
          this.date = null;
          this._renderDateDisplay();
          return this.draw();
        }
        if (typeof date === "string") {
          date = new Date(Date.parse(date));
        }
        if (!Datepicker._isDate(date)) {
          return;
        }
        var min = this.options.minDate, max = this.options.maxDate;
        if (Datepicker._isDate(min) && date < min) {
          date = min;
        } else if (Datepicker._isDate(max) && date > max) {
          date = max;
        }
        this.date = new Date(date.getTime());
        this._renderDateDisplay();
        Datepicker._setToStartOfDay(this.date);
        this.gotoDate(this.date);
        if (!preventOnSelect && typeof this.options.onSelect === "function") {
          this.options.onSelect.call(this, this.date);
        }
      }
    }, {
      key: "setInputValue",
      value: function setInputValue() {
        this.el.value = this.toString();
        this.$el.trigger("change", {
          firedBy: this
        });
      }
    }, {
      key: "_renderDateDisplay",
      value: function _renderDateDisplay() {
        var displayDate = Datepicker._isDate(this.date) ? this.date : new Date();
        var i18n = this.options.i18n;
        var day = i18n.weekdaysShort[displayDate.getDay()];
        var month = i18n.monthsShort[displayDate.getMonth()];
        var date = displayDate.getDate();
        this.yearTextEl.innerHTML = displayDate.getFullYear();
        this.dateTextEl.innerHTML = day + ", " + month + " " + date;
      }
    }, {
      key: "gotoDate",
      value: function gotoDate(date) {
        var newCalendar = true;
        if (!Datepicker._isDate(date)) {
          return;
        }
        if (this.calendars) {
          var firstVisibleDate = new Date(this.calendars[0].year, this.calendars[0].month, 1), lastVisibleDate = new Date(this.calendars[this.calendars.length - 1].year, this.calendars[this.calendars.length - 1].month, 1), visibleDate = date.getTime();
          lastVisibleDate.setMonth(lastVisibleDate.getMonth() + 1);
          lastVisibleDate.setDate(lastVisibleDate.getDate() - 1);
          newCalendar = visibleDate < firstVisibleDate.getTime() || lastVisibleDate.getTime() < visibleDate;
        }
        if (newCalendar) {
          this.calendars = [{
            month: date.getMonth(),
            year: date.getFullYear()
          }];
        }
        this.adjustCalendars();
      }
    }, {
      key: "adjustCalendars",
      value: function adjustCalendars() {
        this.calendars[0] = this.adjustCalendar(this.calendars[0]);
        this.draw();
      }
    }, {
      key: "adjustCalendar",
      value: function adjustCalendar(calendar) {
        if (calendar.month < 0) {
          calendar.year -= Math.ceil(Math.abs(calendar.month) / 12);
          calendar.month += 12;
        }
        if (calendar.month > 11) {
          calendar.year += Math.floor(Math.abs(calendar.month) / 12);
          calendar.month -= 12;
        }
        return calendar;
      }
    }, {
      key: "nextMonth",
      value: function nextMonth() {
        this.calendars[0].month++;
        this.adjustCalendars();
      }
    }, {
      key: "prevMonth",
      value: function prevMonth() {
        this.calendars[0].month--;
        this.adjustCalendars();
      }
    }, {
      key: "render",
      value: function render(year, month, randId) {
        var opts = this.options, now = new Date(), days = Datepicker._getDaysInMonth(year, month), before = new Date(year, month, 1).getDay(), data = [], row = [];
        Datepicker._setToStartOfDay(now);
        if (opts.firstDay > 0) {
          before -= opts.firstDay;
          if (before < 0) {
            before += 7;
          }
        }
        var previousMonth = month === 0 ? 11 : month - 1, nextMonth = month === 11 ? 0 : month + 1, yearOfPreviousMonth = month === 0 ? year - 1 : year, yearOfNextMonth = month === 11 ? year + 1 : year, daysInPreviousMonth = Datepicker._getDaysInMonth(yearOfPreviousMonth, previousMonth);
        var cells = days + before, after = cells;
        while (after > 7) {
          after -= 7;
        }
        cells += 7 - after;
        var isWeekSelected = false;
        for (var i = 0, r = 0; i < cells; i++) {
          var day = new Date(year, month, 1 + (i - before)), isSelected = Datepicker._isDate(this.date) ? Datepicker._compareDates(day, this.date) : false, isToday = Datepicker._compareDates(day, now), hasEvent = opts.events.indexOf(day.toDateString()) !== -1 ? true : false, isEmpty = i < before || i >= days + before, dayNumber = 1 + (i - before), monthNumber = month, yearNumber = year, isStartRange = opts.startRange && Datepicker._compareDates(opts.startRange, day), isEndRange = opts.endRange && Datepicker._compareDates(opts.endRange, day), isInRange = opts.startRange && opts.endRange && opts.startRange < day && day < opts.endRange, isDisabled = opts.minDate && day < opts.minDate || opts.maxDate && day > opts.maxDate || opts.disableWeekends && Datepicker._isWeekend(day) || opts.disableDayFn && opts.disableDayFn(day);
          if (isEmpty) {
            if (i < before) {
              dayNumber = daysInPreviousMonth + dayNumber;
              monthNumber = previousMonth;
              yearNumber = yearOfPreviousMonth;
            } else {
              dayNumber = dayNumber - days;
              monthNumber = nextMonth;
              yearNumber = yearOfNextMonth;
            }
          }
          var dayConfig = {
            day: dayNumber,
            month: monthNumber,
            year: yearNumber,
            hasEvent: hasEvent,
            isSelected: isSelected,
            isToday: isToday,
            isDisabled: isDisabled,
            isEmpty: isEmpty,
            isStartRange: isStartRange,
            isEndRange: isEndRange,
            isInRange: isInRange,
            showDaysInNextAndPreviousMonths: opts.showDaysInNextAndPreviousMonths
          };
          row.push(this.renderDay(dayConfig));
          if (++r === 7) {
            data.push(this.renderRow(row, opts.isRTL, isWeekSelected));
            row = [];
            r = 0;
            isWeekSelected = false;
          }
        }
        return this.renderTable(opts, data, randId);
      }
    }, {
      key: "renderDay",
      value: function renderDay(opts) {
        var arr = [];
        var ariaSelected = "false";
        if (opts.isEmpty) {
          if (opts.showDaysInNextAndPreviousMonths) {
            arr.push("is-outside-current-month");
            arr.push("is-selection-disabled");
          } else {
            return "<td class=\"is-empty\"></td>";
          }
        }
        if (opts.isDisabled) {
          arr.push("is-disabled");
        }
        if (opts.isToday) {
          arr.push("is-today");
        }
        if (opts.isSelected) {
          arr.push("is-selected");
          ariaSelected = "true";
        }
        if (opts.hasEvent) {
          arr.push("has-event");
        }
        if (opts.isInRange) {
          arr.push("is-inrange");
        }
        if (opts.isStartRange) {
          arr.push("is-startrange");
        }
        if (opts.isEndRange) {
          arr.push("is-endrange");
        }
        return "<td data-day=\"" + opts.day + "\" class=\"" + arr.join(" ") + "\" aria-selected=\"" + ariaSelected + "\">" + ("<button class=\"datepicker-day-button\" type=\"button\" data-year=\"" + opts.year + "\" data-month=\"" + opts.month + "\" data-day=\"" + opts.day + "\">" + opts.day + "</button>") + "</td>";
      }
    }, {
      key: "renderRow",
      value: function renderRow(days, isRTL, isRowSelected) {
        return "<tr class=\"datepicker-row" + (isRowSelected ? " is-selected" : "") + "\">" + (isRTL ? days.reverse() : days).join("") + "</tr>";
      }
    }, {
      key: "renderTable",
      value: function renderTable(opts, data, randId) {
        return "<div class=\"datepicker-table-wrapper\"><table cellpadding=\"0\" cellspacing=\"0\" class=\"datepicker-table\" role=\"grid\" aria-labelledby=\"" + randId + "\">" + this.renderHead(opts) + this.renderBody(data) + "</table></div>";
      }
    }, {
      key: "renderHead",
      value: function renderHead(opts) {
        var i = void 0, arr = [];
        for (i = 0; i < 7; i++) {
          arr.push("<th scope=\"col\"><abbr title=\"" + this.renderDayName(opts, i) + "\">" + this.renderDayName(opts, i, true) + "</abbr></th>");
        }
        return "<thead><tr>" + (opts.isRTL ? arr.reverse() : arr).join("") + "</tr></thead>";
      }
    }, {
      key: "renderBody",
      value: function renderBody(rows) {
        return "<tbody>" + rows.join("") + "</tbody>";
      }
    }, {
      key: "renderTitle",
      value: function renderTitle(instance, c, year, month, refYear, randId) {
        var i = void 0, j = void 0, arr = void 0, opts = this.options, isMinYear = year === opts.minYear, isMaxYear = year === opts.maxYear, html = "<div id=\"" + randId + "\" class=\"datepicker-controls\" role=\"heading\" aria-live=\"assertive\">", monthHtml = void 0, yearHtml = void 0, prev = true, next = true;
        for ((arr = [], i = 0); i < 12; i++) {
          arr.push("<option value=\"" + (year === refYear ? i - c : 12 + i - c) + "\"" + (i === month ? " selected=\"selected\"" : "") + (isMinYear && i < opts.minMonth || isMaxYear && i > opts.maxMonth ? "disabled=\"disabled\"" : "") + ">" + opts.i18n.months[i] + "</option>");
        }
        monthHtml = "<select class=\"datepicker-select orig-select-month\" tabindex=\"-1\">" + arr.join("") + "</select>";
        if ($.isArray(opts.yearRange)) {
          i = opts.yearRange[0];
          j = opts.yearRange[1] + 1;
        } else {
          i = year - opts.yearRange;
          j = 1 + year + opts.yearRange;
        }
        for (arr = []; i < j && i <= opts.maxYear; i++) {
          if (i >= opts.minYear) {
            arr.push("<option value=\"" + i + "\" " + (i === year ? "selected=\"selected\"" : "") + ">" + i + "</option>");
          }
        }
        yearHtml = "<select class=\"datepicker-select orig-select-year\" tabindex=\"-1\">" + arr.join("") + "</select>";
        var leftArrow = "<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M15.41 16.09l-4.58-4.59 4.58-4.59L14 5.5l-6 6 6 6z\"/><path d=\"M0-.5h24v24H0z\" fill=\"none\"/></svg>";
        html += "<button class=\"month-prev" + (prev ? "" : " is-disabled") + "\" type=\"button\">" + leftArrow + "</button>";
        html += "<div class=\"selects-container\">";
        if (opts.showMonthAfterYear) {
          html += yearHtml + monthHtml;
        } else {
          html += monthHtml + yearHtml;
        }
        html += "</div>";
        if (isMinYear && (month === 0 || opts.minMonth >= month)) {
          prev = false;
        }
        if (isMaxYear && (month === 11 || opts.maxMonth <= month)) {
          next = false;
        }
        var rightArrow = "<svg fill=\"#000000\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M8.59 16.34l4.58-4.59-4.58-4.59L10 5.75l6 6-6 6z\"/><path d=\"M0-.25h24v24H0z\" fill=\"none\"/></svg>";
        html += "<button class=\"month-next" + (next ? "" : " is-disabled") + "\" type=\"button\">" + rightArrow + "</button>";
        return html += "</div>";
      }
    }, {
      key: "draw",
      value: function draw(force) {
        if (!this.isOpen && !force) {
          return;
        }
        var opts = this.options, minYear = opts.minYear, maxYear = opts.maxYear, minMonth = opts.minMonth, maxMonth = opts.maxMonth, html = "", randId = void 0;
        if (this._y <= minYear) {
          this._y = minYear;
          if (!isNaN(minMonth) && this._m < minMonth) {
            this._m = minMonth;
          }
        }
        if (this._y >= maxYear) {
          this._y = maxYear;
          if (!isNaN(maxMonth) && this._m > maxMonth) {
            this._m = maxMonth;
          }
        }
        randId = "datepicker-title-" + Math.random().toString(36).replace(/[^a-z]+/g, "").substr(0, 2);
        for (var c = 0; c < 1; c++) {
          this._renderDateDisplay();
          html += this.renderTitle(this, c, this.calendars[c].year, this.calendars[c].month, this.calendars[0].year, randId) + this.render(this.calendars[c].year, this.calendars[c].month, randId);
        }
        this.destroySelects();
        this.calendarEl.innerHTML = html;
        var yearSelect = this.calendarEl.querySelector(".orig-select-year");
        var monthSelect = this.calendarEl.querySelector(".orig-select-month");
        M.FormSelect.init(yearSelect, {
          classes: "select-year",
          dropdownOptions: {
            container: document.body,
            constrainWidth: false
          }
        });
        M.FormSelect.init(monthSelect, {
          classes: "select-month",
          dropdownOptions: {
            container: document.body,
            constrainWidth: false
          }
        });
        yearSelect.addEventListener("change", this._handleYearChange.bind(this));
        monthSelect.addEventListener("change", this._handleMonthChange.bind(this));
        if (typeof this.options.onDraw === "function") {
          this.options.onDraw(this);
        }
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleInputChangeBound = this._handleInputChange.bind(this);
        this._handleCalendarClickBound = this._handleCalendarClick.bind(this);
        this._finishSelectionBound = this._finishSelection.bind(this);
        this._handleMonthChange = this._handleMonthChange.bind(this);
        this._closeBound = this.close.bind(this);
        this.el.addEventListener("click", this._handleInputClickBound);
        this.el.addEventListener("keydown", this._handleInputKeydownBound);
        this.el.addEventListener("change", this._handleInputChangeBound);
        this.calendarEl.addEventListener("click", this._handleCalendarClickBound);
        this.doneBtn.addEventListener("click", this._finishSelectionBound);
        this.cancelBtn.addEventListener("click", this._closeBound);
        if (this.options.showClearBtn) {
          this._handleClearClickBound = this._handleClearClick.bind(this);
          this.clearBtn.addEventListener("click", this._handleClearClickBound);
        }
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        var _this56 = this;
        this.$modalEl = $(Datepicker._template);
        this.modalEl = this.$modalEl[0];
        this.calendarEl = this.modalEl.querySelector(".datepicker-calendar");
        this.yearTextEl = this.modalEl.querySelector(".year-text");
        this.dateTextEl = this.modalEl.querySelector(".date-text");
        if (this.options.showClearBtn) {
          this.clearBtn = this.modalEl.querySelector(".datepicker-clear");
        }
        this.doneBtn = this.modalEl.querySelector(".datepicker-done");
        this.cancelBtn = this.modalEl.querySelector(".datepicker-cancel");
        this.formats = {
          d: function () {
            return _this56.date.getDate();
          },
          dd: function () {
            var d = _this56.date.getDate();
            return (d < 10 ? "0" : "") + d;
          },
          ddd: function () {
            return _this56.options.i18n.weekdaysShort[_this56.date.getDay()];
          },
          dddd: function () {
            return _this56.options.i18n.weekdays[_this56.date.getDay()];
          },
          m: function () {
            return _this56.date.getMonth() + 1;
          },
          mm: function () {
            var m = _this56.date.getMonth() + 1;
            return (m < 10 ? "0" : "") + m;
          },
          mmm: function () {
            return _this56.options.i18n.monthsShort[_this56.date.getMonth()];
          },
          mmmm: function () {
            return _this56.options.i18n.months[_this56.date.getMonth()];
          },
          yy: function () {
            return ("" + _this56.date.getFullYear()).slice(2);
          },
          yyyy: function () {
            return _this56.date.getFullYear();
          }
        };
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleInputClickBound);
        this.el.removeEventListener("keydown", this._handleInputKeydownBound);
        this.el.removeEventListener("change", this._handleInputChangeBound);
        this.calendarEl.removeEventListener("click", this._handleCalendarClickBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleCalendarClick",
      value: function _handleCalendarClick(e) {
        if (!this.isOpen) {
          return;
        }
        var $target = $(e.target);
        if (!$target.hasClass("is-disabled")) {
          if ($target.hasClass("datepicker-day-button") && !$target.hasClass("is-empty") && !$target.parent().hasClass("is-disabled")) {
            this.setDate(new Date(e.target.getAttribute("data-year"), e.target.getAttribute("data-month"), e.target.getAttribute("data-day")));
            if (this.options.autoClose) {
              this._finishSelection();
            }
          } else if ($target.closest(".month-prev").length) {
            this.prevMonth();
          } else if ($target.closest(".month-next").length) {
            this.nextMonth();
          }
        }
      }
    }, {
      key: "_handleClearClick",
      value: function _handleClearClick() {
        this.date = null;
        this.setInputValue();
        this.close();
      }
    }, {
      key: "_handleMonthChange",
      value: function _handleMonthChange(e) {
        this.gotoMonth(e.target.value);
      }
    }, {
      key: "_handleYearChange",
      value: function _handleYearChange(e) {
        this.gotoYear(e.target.value);
      }
    }, {
      key: "gotoMonth",
      value: function gotoMonth(month) {
        if (!isNaN(month)) {
          this.calendars[0].month = parseInt(month, 10);
          this.adjustCalendars();
        }
      }
    }, {
      key: "gotoYear",
      value: function gotoYear(year) {
        if (!isNaN(year)) {
          this.calendars[0].year = parseInt(year, 10);
          this.adjustCalendars();
        }
      }
    }, {
      key: "_handleInputChange",
      value: function _handleInputChange(e) {
        var date = void 0;
        if (e.firedBy === this) {
          return;
        }
        if (this.options.parse) {
          date = this.options.parse(this.el.value, this.options.format);
        } else {
          date = new Date(Date.parse(this.el.value));
        }
        if (Datepicker._isDate(date)) {
          this.setDate(date);
        }
      }
    }, {
      key: "renderDayName",
      value: function renderDayName(opts, day, abbr) {
        day += opts.firstDay;
        while (day >= 7) {
          day -= 7;
        }
        return abbr ? opts.i18n.weekdaysAbbrev[day] : opts.i18n.weekdays[day];
      }
    }, {
      key: "_finishSelection",
      value: function _finishSelection() {
        this.setInputValue();
        this.close();
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        if (typeof this.options.onOpen === "function") {
          this.options.onOpen.call(this);
        }
        this.draw();
        this.modal.open();
        return this;
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        if (typeof this.options.onClose === "function") {
          this.options.onClose.call(this);
        }
        this.modal.close();
        return this;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Datepicker.__proto__ || Object.getPrototypeOf(Datepicker), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_isDate",
      value: function _isDate(obj) {
        return (/Date/).test(Object.prototype.toString.call(obj)) && !isNaN(obj.getTime());
      }
    }, {
      key: "_isWeekend",
      value: function _isWeekend(date) {
        var day = date.getDay();
        return day === 0 || day === 6;
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }
    }, {
      key: "_getDaysInMonth",
      value: function _getDaysInMonth(year, month) {
        return [31, Datepicker._isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
      }
    }, {
      key: "_isLeapYear",
      value: function _isLeapYear(year) {
        return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
      }
    }, {
      key: "_compareDates",
      value: function _compareDates(a, b) {
        return a.getTime() === b.getTime();
      }
    }, {
      key: "_setToStartOfDay",
      value: function _setToStartOfDay(date) {
        if (Datepicker._isDate(date)) date.setHours(0, 0, 0, 0);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Datepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Datepicker;
  })(Component);
  Datepicker._template = ["<div class= \"modal datepicker-modal\">", "<div class=\"modal-content datepicker-container\">", "<div class=\"datepicker-date-display\">", "<span class=\"year-text\"></span>", "<span class=\"date-text\"></span>", "</div>", "<div class=\"datepicker-calendar-container\">", "<div class=\"datepicker-calendar\"></div>", "<div class=\"datepicker-footer\">", "<button class=\"btn-flat datepicker-clear waves-effect\" style=\"visibility: hidden;\" type=\"button\"></button>", "<div class=\"confirmation-btns\">", "<button class=\"btn-flat datepicker-cancel waves-effect\" type=\"button\"></button>", "<button class=\"btn-flat datepicker-done waves-effect\" type=\"button\"></button>", "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
  M.Datepicker = Datepicker;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Datepicker, "datepicker", "M_Datepicker");
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    dialRadius: 135,
    outerRadius: 105,
    innerRadius: 70,
    tickRadius: 20,
    duration: 350,
    container: null,
    defaultTime: "now",
    fromNow: 0,
    showClearBtn: false,
    i18n: {
      cancel: "Cancel",
      clear: "Clear",
      done: "Ok"
    },
    autoClose: false,
    twelveHour: true,
    vibrate: true,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null,
    onSelect: null
  };
  var Timepicker = (function (_Component16) {
    _inherits(Timepicker, _Component16);
    function Timepicker(el, options) {
      _classCallCheck(this, Timepicker);
      var _this57 = _possibleConstructorReturn(this, (Timepicker.__proto__ || Object.getPrototypeOf(Timepicker)).call(this, Timepicker, el, options));
      _this57.el.M_Timepicker = _this57;
      _this57.options = $.extend({}, Timepicker.defaults, options);
      _this57.id = M.guid();
      _this57._insertHTMLIntoDOM();
      _this57._setupModal();
      _this57._setupVariables();
      _this57._setupEventHandlers();
      _this57._clockSetup();
      _this57._pickerSetup();
      return _this57;
    }
    _createClass(Timepicker, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.modal.destroy();
        $(this.modalEl).remove();
        this.el.M_Timepicker = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleInputKeydownBound = this._handleInputKeydown.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        this._handleClockClickStartBound = this._handleClockClickStart.bind(this);
        this._handleDocumentClickMoveBound = this._handleDocumentClickMove.bind(this);
        this._handleDocumentClickEndBound = this._handleDocumentClickEnd.bind(this);
        this.el.addEventListener("click", this._handleInputClickBound);
        this.el.addEventListener("keydown", this._handleInputKeydownBound);
        this.plate.addEventListener("mousedown", this._handleClockClickStartBound);
        this.plate.addEventListener("touchstart", this._handleClockClickStartBound);
        $(this.spanHours).on("click", this.showView.bind(this, "hours"));
        $(this.spanMinutes).on("click", this.showView.bind(this, "minutes"));
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleInputClickBound);
        this.el.removeEventListener("keydown", this._handleInputKeydownBound);
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        this.open();
      }
    }, {
      key: "_handleInputKeydown",
      value: function _handleInputKeydown(e) {
        if (e.which === M.keys.ENTER) {
          e.preventDefault();
          this.open();
        }
      }
    }, {
      key: "_handleClockClickStart",
      value: function _handleClockClickStart(e) {
        e.preventDefault();
        var clockPlateBR = this.plate.getBoundingClientRect();
        var offset = {
          x: clockPlateBR.left,
          y: clockPlateBR.top
        };
        this.x0 = offset.x + this.options.dialRadius;
        this.y0 = offset.y + this.options.dialRadius;
        this.moved = false;
        var clickPos = Timepicker._Pos(e);
        this.dx = clickPos.x - this.x0;
        this.dy = clickPos.y - this.y0;
        this.setHand(this.dx, this.dy, false);
        document.addEventListener("mousemove", this._handleDocumentClickMoveBound);
        document.addEventListener("touchmove", this._handleDocumentClickMoveBound);
        document.addEventListener("mouseup", this._handleDocumentClickEndBound);
        document.addEventListener("touchend", this._handleDocumentClickEndBound);
      }
    }, {
      key: "_handleDocumentClickMove",
      value: function _handleDocumentClickMove(e) {
        e.preventDefault();
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        this.moved = true;
        this.setHand(x, y, false, true);
      }
    }, {
      key: "_handleDocumentClickEnd",
      value: function _handleDocumentClickEnd(e) {
        var _this58 = this;
        e.preventDefault();
        document.removeEventListener("mouseup", this._handleDocumentClickEndBound);
        document.removeEventListener("touchend", this._handleDocumentClickEndBound);
        var clickPos = Timepicker._Pos(e);
        var x = clickPos.x - this.x0;
        var y = clickPos.y - this.y0;
        if (this.moved && x === this.dx && y === this.dy) {
          this.setHand(x, y);
        }
        if (this.currentView === "hours") {
          this.showView("minutes", this.options.duration / 2);
        } else if (this.options.autoClose) {
          $(this.minutesView).addClass("timepicker-dial-out");
          setTimeout(function () {
            _this58.done();
          }, this.options.duration / 2);
        }
        if (typeof this.options.onSelect === "function") {
          this.options.onSelect.call(this, this.hours, this.minutes);
        }
        document.removeEventListener("mousemove", this._handleDocumentClickMoveBound);
        document.removeEventListener("touchmove", this._handleDocumentClickMoveBound);
      }
    }, {
      key: "_insertHTMLIntoDOM",
      value: function _insertHTMLIntoDOM() {
        this.$modalEl = $(Timepicker._template);
        this.modalEl = this.$modalEl[0];
        this.modalEl.id = "modal-" + this.id;
        var containerEl = document.querySelector(this.options.container);
        if (this.options.container && !!containerEl) {
          this.$modalEl.appendTo(containerEl);
        } else {
          this.$modalEl.insertBefore(this.el);
        }
      }
    }, {
      key: "_setupModal",
      value: function _setupModal() {
        var _this59 = this;
        this.modal = M.Modal.init(this.modalEl, {
          onOpenStart: this.options.onOpenStart,
          onOpenEnd: this.options.onOpenEnd,
          onCloseStart: this.options.onCloseStart,
          onCloseEnd: function () {
            if (typeof _this59.options.onCloseEnd === "function") {
              _this59.options.onCloseEnd.call(_this59);
            }
            _this59.isOpen = false;
          }
        });
      }
    }, {
      key: "_setupVariables",
      value: function _setupVariables() {
        this.currentView = "hours";
        this.vibrate = navigator.vibrate ? "vibrate" : navigator.webkitVibrate ? "webkitVibrate" : null;
        this._canvas = this.modalEl.querySelector(".timepicker-canvas");
        this.plate = this.modalEl.querySelector(".timepicker-plate");
        this.hoursView = this.modalEl.querySelector(".timepicker-hours");
        this.minutesView = this.modalEl.querySelector(".timepicker-minutes");
        this.spanHours = this.modalEl.querySelector(".timepicker-span-hours");
        this.spanMinutes = this.modalEl.querySelector(".timepicker-span-minutes");
        this.spanAmPm = this.modalEl.querySelector(".timepicker-span-am-pm");
        this.footer = this.modalEl.querySelector(".timepicker-footer");
        this.amOrPm = "PM";
      }
    }, {
      key: "_pickerSetup",
      value: function _pickerSetup() {
        var $clearBtn = $("<button class=\"btn-flat timepicker-clear waves-effect\" style=\"visibility: hidden;\" type=\"button\" tabindex=\"" + (this.options.twelveHour ? "3" : "1") + "\">" + this.options.i18n.clear + "</button>").appendTo(this.footer).on("click", this.clear.bind(this));
        if (this.options.showClearBtn) {
          $clearBtn.css({
            visibility: ""
          });
        }
        var confirmationBtnsContainer = $("<div class=\"confirmation-btns\"></div>");
        $("<button class=\"btn-flat timepicker-close waves-effect\" type=\"button\" tabindex=\"" + (this.options.twelveHour ? "3" : "1") + "\">" + this.options.i18n.cancel + "</button>").appendTo(confirmationBtnsContainer).on("click", this.close.bind(this));
        $("<button class=\"btn-flat timepicker-close waves-effect\" type=\"button\" tabindex=\"" + (this.options.twelveHour ? "3" : "1") + "\">" + this.options.i18n.done + "</button>").appendTo(confirmationBtnsContainer).on("click", this.done.bind(this));
        confirmationBtnsContainer.appendTo(this.footer);
      }
    }, {
      key: "_clockSetup",
      value: function _clockSetup() {
        if (this.options.twelveHour) {
          this.$amBtn = $("<div class=\"am-btn\">AM</div>");
          this.$pmBtn = $("<div class=\"pm-btn\">PM</div>");
          this.$amBtn.on("click", this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
          this.$pmBtn.on("click", this._handleAmPmClick.bind(this)).appendTo(this.spanAmPm);
        }
        this._buildHoursView();
        this._buildMinutesView();
        this._buildSVGClock();
      }
    }, {
      key: "_buildSVGClock",
      value: function _buildSVGClock() {
        var dialRadius = this.options.dialRadius;
        var tickRadius = this.options.tickRadius;
        var diameter = dialRadius * 2;
        var svg = Timepicker._createSVGEl("svg");
        svg.setAttribute("class", "timepicker-svg");
        svg.setAttribute("width", diameter);
        svg.setAttribute("height", diameter);
        var g = Timepicker._createSVGEl("g");
        g.setAttribute("transform", "translate(" + dialRadius + "," + dialRadius + ")");
        var bearing = Timepicker._createSVGEl("circle");
        bearing.setAttribute("class", "timepicker-canvas-bearing");
        bearing.setAttribute("cx", 0);
        bearing.setAttribute("cy", 0);
        bearing.setAttribute("r", 4);
        var hand = Timepicker._createSVGEl("line");
        hand.setAttribute("x1", 0);
        hand.setAttribute("y1", 0);
        var bg = Timepicker._createSVGEl("circle");
        bg.setAttribute("class", "timepicker-canvas-bg");
        bg.setAttribute("r", tickRadius);
        g.appendChild(hand);
        g.appendChild(bg);
        g.appendChild(bearing);
        svg.appendChild(g);
        this._canvas.appendChild(svg);
        this.hand = hand;
        this.bg = bg;
        this.bearing = bearing;
        this.g = g;
      }
    }, {
      key: "_buildHoursView",
      value: function _buildHoursView() {
        var $tick = $("<div class=\"timepicker-tick\"></div>");
        if (this.options.twelveHour) {
          for (var i = 1; i < 13; i += 1) {
            var tick = $tick.clone();
            var radian = i / 6 * Math.PI;
            var radius = this.options.outerRadius;
            tick.css({
              left: this.options.dialRadius + Math.sin(radian) * radius - this.options.tickRadius + "px",
              top: this.options.dialRadius - Math.cos(radian) * radius - this.options.tickRadius + "px"
            });
            tick.html(i === 0 ? "00" : i);
            this.hoursView.appendChild(tick[0]);
          }
        } else {
          for (var _i2 = 0; _i2 < 24; _i2 += 1) {
            var _tick = $tick.clone();
            var _radian = _i2 / 6 * Math.PI;
            var inner = _i2 > 0 && _i2 < 13;
            var _radius = inner ? this.options.innerRadius : this.options.outerRadius;
            _tick.css({
              left: this.options.dialRadius + Math.sin(_radian) * _radius - this.options.tickRadius + "px",
              top: this.options.dialRadius - Math.cos(_radian) * _radius - this.options.tickRadius + "px"
            });
            _tick.html(_i2 === 0 ? "00" : _i2);
            this.hoursView.appendChild(_tick[0]);
          }
        }
      }
    }, {
      key: "_buildMinutesView",
      value: function _buildMinutesView() {
        var $tick = $("<div class=\"timepicker-tick\"></div>");
        for (var i = 0; i < 60; i += 5) {
          var tick = $tick.clone();
          var radian = i / 30 * Math.PI;
          tick.css({
            left: this.options.dialRadius + Math.sin(radian) * this.options.outerRadius - this.options.tickRadius + "px",
            top: this.options.dialRadius - Math.cos(radian) * this.options.outerRadius - this.options.tickRadius + "px"
          });
          tick.html(Timepicker._addLeadingZero(i));
          this.minutesView.appendChild(tick[0]);
        }
      }
    }, {
      key: "_handleAmPmClick",
      value: function _handleAmPmClick(e) {
        var $btnClicked = $(e.target);
        this.amOrPm = $btnClicked.hasClass("am-btn") ? "AM" : "PM";
        this._updateAmPmView();
      }
    }, {
      key: "_updateAmPmView",
      value: function _updateAmPmView() {
        if (this.options.twelveHour) {
          this.$amBtn.toggleClass("text-primary", this.amOrPm === "AM");
          this.$pmBtn.toggleClass("text-primary", this.amOrPm === "PM");
        }
      }
    }, {
      key: "_updateTimeFromInput",
      value: function _updateTimeFromInput() {
        var value = ((this.el.value || this.options.defaultTime || "") + "").split(":");
        if (this.options.twelveHour && !(typeof value[1] === "undefined")) {
          if (value[1].toUpperCase().indexOf("AM") > 0) {
            this.amOrPm = "AM";
          } else {
            this.amOrPm = "PM";
          }
          value[1] = value[1].replace("AM", "").replace("PM", "");
        }
        if (value[0] === "now") {
          var now = new Date(+new Date() + this.options.fromNow);
          value = [now.getHours(), now.getMinutes()];
          if (this.options.twelveHour) {
            this.amOrPm = value[0] >= 12 && value[0] < 24 ? "PM" : "AM";
          }
        }
        this.hours = +value[0] || 0;
        this.minutes = +value[1] || 0;
        this.spanHours.innerHTML = this.hours;
        this.spanMinutes.innerHTML = Timepicker._addLeadingZero(this.minutes);
        this._updateAmPmView();
      }
    }, {
      key: "showView",
      value: function showView(view, delay) {
        if (view === "minutes" && $(this.hoursView).css("visibility") === "visible") {}
        var isHours = view === "hours", nextView = isHours ? this.hoursView : this.minutesView, hideView = isHours ? this.minutesView : this.hoursView;
        this.currentView = view;
        $(this.spanHours).toggleClass("text-primary", isHours);
        $(this.spanMinutes).toggleClass("text-primary", !isHours);
        hideView.classList.add("timepicker-dial-out");
        $(nextView).css("visibility", "visible").removeClass("timepicker-dial-out");
        this.resetClock(delay);
        clearTimeout(this.toggleViewTimer);
        this.toggleViewTimer = setTimeout(function () {
          $(hideView).css("visibility", "hidden");
        }, this.options.duration);
      }
    }, {
      key: "resetClock",
      value: function resetClock(delay) {
        var view = this.currentView, value = this[view], isHours = view === "hours", unit = Math.PI / (isHours ? 6 : 30), radian = value * unit, radius = isHours && value > 0 && value < 13 ? this.options.innerRadius : this.options.outerRadius, x = Math.sin(radian) * radius, y = -Math.cos(radian) * radius, self = this;
        if (delay) {
          $(this.canvas).addClass("timepicker-canvas-out");
          setTimeout(function () {
            $(self.canvas).removeClass("timepicker-canvas-out");
            self.setHand(x, y);
          }, delay);
        } else {
          this.setHand(x, y);
        }
      }
    }, {
      key: "setHand",
      value: function setHand(x, y, roundBy5) {
        var _this60 = this;
        var radian = Math.atan2(x, -y), isHours = this.currentView === "hours", unit = Math.PI / (isHours || roundBy5 ? 6 : 30), z = Math.sqrt(x * x + y * y), inner = isHours && z < (this.options.outerRadius + this.options.innerRadius) / 2, radius = inner ? this.options.innerRadius : this.options.outerRadius;
        if (this.options.twelveHour) {
          radius = this.options.outerRadius;
        }
        if (radian < 0) {
          radian = Math.PI * 2 + radian;
        }
        var value = Math.round(radian / unit);
        radian = value * unit;
        if (this.options.twelveHour) {
          if (isHours) {
            if (value === 0) value = 12;
          } else {
            if (roundBy5) value *= 5;
            if (value === 60) value = 0;
          }
        } else {
          if (isHours) {
            if (value === 12) {
              value = 0;
            }
            value = inner ? value === 0 ? 12 : value : value === 0 ? 0 : value + 12;
          } else {
            if (roundBy5) {
              value *= 5;
            }
            if (value === 60) {
              value = 0;
            }
          }
        }
        if (this[this.currentView] !== value) {
          if (this.vibrate && this.options.vibrate) {
            if (!this.vibrateTimer) {
              navigator[this.vibrate](10);
              this.vibrateTimer = setTimeout(function () {
                _this60.vibrateTimer = null;
              }, 100);
            }
          }
        }
        this[this.currentView] = value;
        if (isHours) {
          this["spanHours"].innerHTML = value;
        } else {
          this["spanMinutes"].innerHTML = Timepicker._addLeadingZero(value);
        }
        var cx1 = Math.sin(radian) * (radius - this.options.tickRadius), cy1 = -Math.cos(radian) * (radius - this.options.tickRadius), cx2 = Math.sin(radian) * radius, cy2 = -Math.cos(radian) * radius;
        this.hand.setAttribute("x2", cx1);
        this.hand.setAttribute("y2", cy1);
        this.bg.setAttribute("cx", cx2);
        this.bg.setAttribute("cy", cy2);
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        this.isOpen = true;
        this._updateTimeFromInput();
        this.showView("hours");
        this.modal.open();
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        this.isOpen = false;
        this.modal.close();
      }
    }, {
      key: "done",
      value: function done(e, clearValue) {
        var last = this.el.value;
        var value = clearValue ? "" : Timepicker._addLeadingZero(this.hours) + ":" + Timepicker._addLeadingZero(this.minutes);
        this.time = value;
        if (!clearValue && this.options.twelveHour) {
          value = value + " " + this.amOrPm;
        }
        this.el.value = value;
        if (value !== last) {
          this.$el.trigger("change");
        }
        this.close();
        this.el.focus();
      }
    }, {
      key: "clear",
      value: function clear() {
        this.done(null, true);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Timepicker.__proto__ || Object.getPrototypeOf(Timepicker), "init", this).call(this, this, els, options);
      }
    }, {
      key: "_addLeadingZero",
      value: function _addLeadingZero(num) {
        return (num < 10 ? "0" : "") + num;
      }
    }, {
      key: "_createSVGEl",
      value: function _createSVGEl(name) {
        var svgNS = "http://www.w3.org/2000/svg";
        return document.createElementNS(svgNS, name);
      }
    }, {
      key: "_Pos",
      value: function _Pos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return {
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY
          };
        }
        return {
          x: e.clientX,
          y: e.clientY
        };
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Timepicker;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Timepicker;
  })(Component);
  Timepicker._template = ["<div class= \"modal timepicker-modal\">", "<div class=\"modal-content timepicker-container\">", "<div class=\"timepicker-digital-display\">", "<div class=\"timepicker-text-container\">", "<div class=\"timepicker-display-column\">", "<span class=\"timepicker-span-hours text-primary\"></span>", ":", "<span class=\"timepicker-span-minutes\"></span>", "</div>", "<div class=\"timepicker-display-column timepicker-display-am-pm\">", "<div class=\"timepicker-span-am-pm\"></div>", "</div>", "</div>", "</div>", "<div class=\"timepicker-analog-display\">", "<div class=\"timepicker-plate\">", "<div class=\"timepicker-canvas\"></div>", "<div class=\"timepicker-dial timepicker-hours\"></div>", "<div class=\"timepicker-dial timepicker-minutes timepicker-dial-out\"></div>", "</div>", "<div class=\"timepicker-footer\"></div>", "</div>", "</div>", "</div>"].join("");
  M.Timepicker = Timepicker;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Timepicker, "timepicker", "M_Timepicker");
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {};
  var CharacterCounter = (function (_Component17) {
    _inherits(CharacterCounter, _Component17);
    function CharacterCounter(el, options) {
      _classCallCheck(this, CharacterCounter);
      var _this61 = _possibleConstructorReturn(this, (CharacterCounter.__proto__ || Object.getPrototypeOf(CharacterCounter)).call(this, CharacterCounter, el, options));
      _this61.el.M_CharacterCounter = _this61;
      _this61.options = $.extend({}, CharacterCounter.defaults, options);
      _this61.isInvalid = false;
      _this61.isValidLength = false;
      _this61._setupCounter();
      _this61._setupEventHandlers();
      return _this61;
    }
    _createClass(CharacterCounter, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.el.CharacterCounter = undefined;
        this._removeCounter();
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleUpdateCounterBound = this.updateCounter.bind(this);
        this.el.addEventListener("focus", this._handleUpdateCounterBound, true);
        this.el.addEventListener("input", this._handleUpdateCounterBound, true);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("focus", this._handleUpdateCounterBound, true);
        this.el.removeEventListener("input", this._handleUpdateCounterBound, true);
      }
    }, {
      key: "_setupCounter",
      value: function _setupCounter() {
        this.counterEl = document.createElement("span");
        $(this.counterEl).addClass("character-counter").css({
          float: "right",
          "font-size": "12px",
          height: 1
        });
        this.$el.parent().append(this.counterEl);
      }
    }, {
      key: "_removeCounter",
      value: function _removeCounter() {
        $(this.counterEl).remove();
      }
    }, {
      key: "updateCounter",
      value: function updateCounter() {
        var maxLength = +this.$el.attr("data-length"), actualLength = this.el.value.length;
        this.isValidLength = actualLength <= maxLength;
        var counterString = actualLength;
        if (maxLength) {
          counterString += "/" + maxLength;
          this._validateInput();
        }
        $(this.counterEl).html(counterString);
      }
    }, {
      key: "_validateInput",
      value: function _validateInput() {
        if (this.isValidLength && this.isInvalid) {
          this.isInvalid = false;
          this.$el.removeClass("invalid");
        } else if (!this.isValidLength && !this.isInvalid) {
          this.isInvalid = true;
          this.$el.removeClass("valid");
          this.$el.addClass("invalid");
        }
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(CharacterCounter.__proto__ || Object.getPrototypeOf(CharacterCounter), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_CharacterCounter;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return CharacterCounter;
  })(Component);
  M.CharacterCounter = CharacterCounter;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(CharacterCounter, "characterCounter", "M_CharacterCounter");
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    duration: 200,
    dist: -100,
    shift: 0,
    padding: 0,
    numVisible: 5,
    fullWidth: false,
    indicators: false,
    noWrap: false,
    onCycleTo: null
  };
  var Carousel = (function (_Component18) {
    _inherits(Carousel, _Component18);
    function Carousel(el, options) {
      _classCallCheck(this, Carousel);
      var _this62 = _possibleConstructorReturn(this, (Carousel.__proto__ || Object.getPrototypeOf(Carousel)).call(this, Carousel, el, options));
      _this62.el.M_Carousel = _this62;
      _this62.options = $.extend({}, Carousel.defaults, options);
      _this62.hasMultipleSlides = _this62.$el.find(".carousel-item").length > 1;
      _this62.showIndicators = _this62.options.indicators && _this62.hasMultipleSlides;
      _this62.noWrap = _this62.options.noWrap || !_this62.hasMultipleSlides;
      _this62.pressed = false;
      _this62.dragged = false;
      _this62.offset = _this62.target = 0;
      _this62.images = [];
      _this62.itemWidth = _this62.$el.find(".carousel-item").first().innerWidth();
      _this62.itemHeight = _this62.$el.find(".carousel-item").first().innerHeight();
      _this62.dim = _this62.itemWidth * 2 + _this62.options.padding || 1;
      _this62._autoScrollBound = _this62._autoScroll.bind(_this62);
      _this62._trackBound = _this62._track.bind(_this62);
      if (_this62.options.fullWidth) {
        _this62.options.dist = 0;
        _this62._setCarouselHeight();
        if (_this62.showIndicators) {
          _this62.$el.find(".carousel-fixed-item").addClass("with-indicators");
        }
      }
      _this62.$indicators = $("<ul class=\"indicators\"></ul>");
      _this62.$el.find(".carousel-item").each(function (el, i) {
        _this62.images.push(el);
        if (_this62.showIndicators) {
          var $indicator = $("<li class=\"indicator-item\"></li>");
          if (i === 0) {
            $indicator[0].classList.add("active");
          }
          _this62.$indicators.append($indicator);
        }
      });
      if (_this62.showIndicators) {
        _this62.$el.append(_this62.$indicators);
      }
      _this62.count = _this62.images.length;
      _this62.options.numVisible = Math.min(_this62.count, _this62.options.numVisible);
      _this62.xform = "transform";
      ["webkit", "Moz", "O", "ms"].every(function (prefix) {
        var e = prefix + "Transform";
        if (typeof document.body.style[e] !== "undefined") {
          _this62.xform = e;
          return false;
        }
        return true;
      });
      _this62._setupEventHandlers();
      _this62._scroll(_this62.offset);
      return _this62;
    }
    _createClass(Carousel, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.el.M_Carousel = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this63 = this;
        this._handleCarouselTapBound = this._handleCarouselTap.bind(this);
        this._handleCarouselDragBound = this._handleCarouselDrag.bind(this);
        this._handleCarouselReleaseBound = this._handleCarouselRelease.bind(this);
        this._handleCarouselClickBound = this._handleCarouselClick.bind(this);
        if (typeof window.ontouchstart !== "undefined") {
          this.el.addEventListener("touchstart", this._handleCarouselTapBound);
          this.el.addEventListener("touchmove", this._handleCarouselDragBound);
          this.el.addEventListener("touchend", this._handleCarouselReleaseBound);
        }
        this.el.addEventListener("mousedown", this._handleCarouselTapBound);
        this.el.addEventListener("mousemove", this._handleCarouselDragBound);
        this.el.addEventListener("mouseup", this._handleCarouselReleaseBound);
        this.el.addEventListener("mouseleave", this._handleCarouselReleaseBound);
        this.el.addEventListener("click", this._handleCarouselClickBound);
        if (this.showIndicators && this.$indicators) {
          this._handleIndicatorClickBound = this._handleIndicatorClick.bind(this);
          this.$indicators.find(".indicator-item").each(function (el, i) {
            el.addEventListener("click", _this63._handleIndicatorClickBound);
          });
        }
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        window.addEventListener("resize", this._handleThrottledResizeBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this64 = this;
        if (typeof window.ontouchstart !== "undefined") {
          this.el.removeEventListener("touchstart", this._handleCarouselTapBound);
          this.el.removeEventListener("touchmove", this._handleCarouselDragBound);
          this.el.removeEventListener("touchend", this._handleCarouselReleaseBound);
        }
        this.el.removeEventListener("mousedown", this._handleCarouselTapBound);
        this.el.removeEventListener("mousemove", this._handleCarouselDragBound);
        this.el.removeEventListener("mouseup", this._handleCarouselReleaseBound);
        this.el.removeEventListener("mouseleave", this._handleCarouselReleaseBound);
        this.el.removeEventListener("click", this._handleCarouselClickBound);
        if (this.showIndicators && this.$indicators) {
          this.$indicators.find(".indicator-item").each(function (el, i) {
            el.removeEventListener("click", _this64._handleIndicatorClickBound);
          });
        }
        window.removeEventListener("resize", this._handleThrottledResizeBound);
      }
    }, {
      key: "_handleCarouselTap",
      value: function _handleCarouselTap(e) {
        if (e.type === "mousedown" && $(e.target).is("img")) {
          e.preventDefault();
        }
        this.pressed = true;
        this.dragged = false;
        this.verticalDragged = false;
        this.reference = this._xpos(e);
        this.referenceY = this._ypos(e);
        this.velocity = this.amplitude = 0;
        this.frame = this.offset;
        this.timestamp = Date.now();
        clearInterval(this.ticker);
        this.ticker = setInterval(this._trackBound, 100);
      }
    }, {
      key: "_handleCarouselDrag",
      value: function _handleCarouselDrag(e) {
        var x = void 0, y = void 0, delta = void 0, deltaY = void 0;
        if (this.pressed) {
          x = this._xpos(e);
          y = this._ypos(e);
          delta = this.reference - x;
          deltaY = Math.abs(this.referenceY - y);
          if (deltaY < 30 && !this.verticalDragged) {
            if (delta > 2 || delta < -2) {
              this.dragged = true;
              this.reference = x;
              this._scroll(this.offset + delta);
            }
          } else if (this.dragged) {
            e.preventDefault();
            e.stopPropagation();
            return false;
          } else {
            this.verticalDragged = true;
          }
        }
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        }
      }
    }, {
      key: "_handleCarouselRelease",
      value: function _handleCarouselRelease(e) {
        if (this.pressed) {
          this.pressed = false;
        } else {
          return;
        }
        clearInterval(this.ticker);
        this.target = this.offset;
        if (this.velocity > 10 || this.velocity < -10) {
          this.amplitude = 0.9 * this.velocity;
          this.target = this.offset + this.amplitude;
        }
        this.target = Math.round(this.target / this.dim) * this.dim;
        if (this.noWrap) {
          if (this.target >= this.dim * (this.count - 1)) {
            this.target = this.dim * (this.count - 1);
          } else if (this.target < 0) {
            this.target = 0;
          }
        }
        this.amplitude = this.target - this.offset;
        this.timestamp = Date.now();
        requestAnimationFrame(this._autoScrollBound);
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
        }
        return false;
      }
    }, {
      key: "_handleCarouselClick",
      value: function _handleCarouselClick(e) {
        if (this.dragged) {
          e.preventDefault();
          e.stopPropagation();
          return false;
        } else if (!this.options.fullWidth) {
          var clickedIndex = $(e.target).closest(".carousel-item").index();
          var diff = this._wrap(this.center) - clickedIndex;
          if (diff !== 0) {
            e.preventDefault();
            e.stopPropagation();
          }
          this._cycleTo(clickedIndex);
        }
      }
    }, {
      key: "_handleIndicatorClick",
      value: function _handleIndicatorClick(e) {
        e.stopPropagation();
        var indicator = $(e.target).closest(".indicator-item");
        if (indicator.length) {
          this._cycleTo(indicator.index());
        }
      }
    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        if (this.options.fullWidth) {
          this.itemWidth = this.$el.find(".carousel-item").first().innerWidth();
          this.imageHeight = this.$el.find(".carousel-item.active").height();
          this.dim = this.itemWidth * 2 + this.options.padding;
          this.offset = this.center * 2 * this.itemWidth;
          this.target = this.offset;
          this._setCarouselHeight(true);
        } else {
          this._scroll();
        }
      }
    }, {
      key: "_setCarouselHeight",
      value: function _setCarouselHeight(imageOnly) {
        var _this65 = this;
        var firstSlide = this.$el.find(".carousel-item.active").length ? this.$el.find(".carousel-item.active").first() : this.$el.find(".carousel-item").first();
        var firstImage = firstSlide.find("img").first();
        if (firstImage.length) {
          if (firstImage[0].complete) {
            var imageHeight = firstImage.height();
            if (imageHeight > 0) {
              this.$el.css("height", imageHeight + "px");
            } else {
              var naturalWidth = firstImage[0].naturalWidth;
              var naturalHeight = firstImage[0].naturalHeight;
              var adjustedHeight = this.$el.width() / naturalWidth * naturalHeight;
              this.$el.css("height", adjustedHeight + "px");
            }
          } else {
            firstImage.one("load", function (el, i) {
              _this65.$el.css("height", el.offsetHeight + "px");
            });
          }
        } else if (!imageOnly) {
          var slideHeight = firstSlide.height();
          this.$el.css("height", slideHeight + "px");
        }
      }
    }, {
      key: "_xpos",
      value: function _xpos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientX;
        }
        return e.clientX;
      }
    }, {
      key: "_ypos",
      value: function _ypos(e) {
        if (e.targetTouches && e.targetTouches.length >= 1) {
          return e.targetTouches[0].clientY;
        }
        return e.clientY;
      }
    }, {
      key: "_wrap",
      value: function _wrap(x) {
        return x >= this.count ? x % this.count : x < 0 ? this._wrap(this.count + x % this.count) : x;
      }
    }, {
      key: "_track",
      value: function _track() {
        var now = void 0, elapsed = void 0, delta = void 0, v = void 0;
        now = Date.now();
        elapsed = now - this.timestamp;
        this.timestamp = now;
        delta = this.offset - this.frame;
        this.frame = this.offset;
        v = 1000 * delta / (1 + elapsed);
        this.velocity = 0.8 * v + 0.2 * this.velocity;
      }
    }, {
      key: "_autoScroll",
      value: function _autoScroll() {
        var elapsed = void 0, delta = void 0;
        if (this.amplitude) {
          elapsed = Date.now() - this.timestamp;
          delta = this.amplitude * Math.exp(-elapsed / this.options.duration);
          if (delta > 2 || delta < -2) {
            this._scroll(this.target - delta);
            requestAnimationFrame(this._autoScrollBound);
          } else {
            this._scroll(this.target);
          }
        }
      }
    }, {
      key: "_scroll",
      value: function _scroll(x) {
        var _this66 = this;
        if (!this.$el.hasClass("scrolling")) {
          this.el.classList.add("scrolling");
        }
        if (this.scrollingTimeout != null) {
          window.clearTimeout(this.scrollingTimeout);
        }
        this.scrollingTimeout = window.setTimeout(function () {
          _this66.$el.removeClass("scrolling");
        }, this.options.duration);
        var i = void 0, half = void 0, delta = void 0, dir = void 0, tween = void 0, el = void 0, alignment = void 0, zTranslation = void 0, tweenedOpacity = void 0, centerTweenedOpacity = void 0;
        var lastCenter = this.center;
        var numVisibleOffset = 1 / this.options.numVisible;
        this.offset = typeof x === "number" ? x : this.offset;
        this.center = Math.floor((this.offset + this.dim / 2) / this.dim);
        delta = this.offset - this.center * this.dim;
        dir = delta < 0 ? 1 : -1;
        tween = -dir * delta * 2 / this.dim;
        half = this.count >> 1;
        if (this.options.fullWidth) {
          alignment = "translateX(0)";
          centerTweenedOpacity = 1;
        } else {
          alignment = "translateX(" + (this.el.clientWidth - this.itemWidth) / 2 + "px) ";
          alignment += "translateY(" + (this.el.clientHeight - this.itemHeight) / 2 + "px)";
          centerTweenedOpacity = 1 - numVisibleOffset * tween;
        }
        if (this.showIndicators) {
          var diff = this.center % this.count;
          var activeIndicator = this.$indicators.find(".indicator-item.active");
          if (activeIndicator.index() !== diff) {
            activeIndicator.removeClass("active");
            this.$indicators.find(".indicator-item").eq(diff)[0].classList.add("active");
          }
        }
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          if (!$(el).hasClass("active")) {
            this.$el.find(".carousel-item").removeClass("active");
            el.classList.add("active");
          }
          var transformString = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween * i + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, transformString);
        }
        for (i = 1; i <= half; ++i) {
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta < 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 + tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 + tween * dir);
          }
          if (!this.noWrap || this.center + i < this.count) {
            el = this.images[this._wrap(this.center + i)];
            var _transformString = alignment + " translateX(" + (this.options.shift + (this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString);
          }
          if (this.options.fullWidth) {
            zTranslation = this.options.dist;
            tweenedOpacity = i === half && delta > 0 ? 1 - tween : 1;
          } else {
            zTranslation = this.options.dist * (i * 2 - tween * dir);
            tweenedOpacity = 1 - numVisibleOffset * (i * 2 - tween * dir);
          }
          if (!this.noWrap || this.center - i >= 0) {
            el = this.images[this._wrap(this.center - i)];
            var _transformString2 = alignment + " translateX(" + (-this.options.shift + (-this.dim * i - delta) / 2) + "px) translateZ(" + zTranslation + "px)";
            this._updateItemStyle(el, tweenedOpacity, -i, _transformString2);
          }
        }
        if (!this.noWrap || this.center >= 0 && this.center < this.count) {
          el = this.images[this._wrap(this.center)];
          var _transformString3 = alignment + " translateX(" + -delta / 2 + "px) translateX(" + dir * this.options.shift * tween + "px) translateZ(" + this.options.dist * tween + "px)";
          this._updateItemStyle(el, centerTweenedOpacity, 0, _transformString3);
        }
        var $currItem = this.$el.find(".carousel-item").eq(this._wrap(this.center));
        if (lastCenter !== this.center && typeof this.options.onCycleTo === "function") {
          this.options.onCycleTo.call(this, $currItem[0], this.dragged);
        }
        if (typeof this.oneTimeCallback === "function") {
          this.oneTimeCallback.call(this, $currItem[0], this.dragged);
          this.oneTimeCallback = null;
        }
      }
    }, {
      key: "_updateItemStyle",
      value: function _updateItemStyle(el, opacity, zIndex, transform) {
        el.style[this.xform] = transform;
        el.style.zIndex = zIndex;
        el.style.opacity = opacity;
        el.style.visibility = "visible";
      }
    }, {
      key: "_cycleTo",
      value: function _cycleTo(n, callback) {
        var diff = this.center % this.count - n;
        if (!this.noWrap) {
          if (diff < 0) {
            if (Math.abs(diff + this.count) < Math.abs(diff)) {
              diff += this.count;
            }
          } else if (diff > 0) {
            if (Math.abs(diff - this.count) < diff) {
              diff -= this.count;
            }
          }
        }
        this.target = this.dim * Math.round(this.offset / this.dim);
        if (diff < 0) {
          this.target += this.dim * Math.abs(diff);
        } else if (diff > 0) {
          this.target -= this.dim * diff;
        }
        if (typeof callback === "function") {
          this.oneTimeCallback = callback;
        }
        if (this.offset !== this.target) {
          this.amplitude = this.target - this.offset;
          this.timestamp = Date.now();
          requestAnimationFrame(this._autoScrollBound);
        }
      }
    }, {
      key: "next",
      value: function next(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }
        var index = this.center + n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }
          index = this._wrap(index);
        }
        this._cycleTo(index);
      }
    }, {
      key: "prev",
      value: function prev(n) {
        if (n === undefined || isNaN(n)) {
          n = 1;
        }
        var index = this.center - n;
        if (index >= this.count || index < 0) {
          if (this.noWrap) {
            return;
          }
          index = this._wrap(index);
        }
        this._cycleTo(index);
      }
    }, {
      key: "set",
      value: function set(n, callback) {
        if (n === undefined || isNaN(n)) {
          n = 0;
        }
        if (n > this.count || n < 0) {
          if (this.noWrap) {
            return;
          }
          n = this._wrap(n);
        }
        this._cycleTo(n, callback);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Carousel.__proto__ || Object.getPrototypeOf(Carousel), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Carousel;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Carousel;
  })(Component);
  M.Carousel = Carousel;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Carousel, "carousel", "M_Carousel");
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    onOpen: undefined,
    onClose: undefined
  };
  var TapTarget = (function (_Component19) {
    _inherits(TapTarget, _Component19);
    function TapTarget(el, options) {
      _classCallCheck(this, TapTarget);
      var _this67 = _possibleConstructorReturn(this, (TapTarget.__proto__ || Object.getPrototypeOf(TapTarget)).call(this, TapTarget, el, options));
      _this67.el.M_TapTarget = _this67;
      _this67.options = $.extend({}, TapTarget.defaults, options);
      _this67.isOpen = false;
      _this67.$origin = $("#" + _this67.$el.attr("data-target"));
      _this67._setup();
      _this67._calculatePositioning();
      _this67._setupEventHandlers();
      return _this67;
    }
    _createClass(TapTarget, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this.el.TapTarget = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleDocumentClickBound = this._handleDocumentClick.bind(this);
        this._handleTargetClickBound = this._handleTargetClick.bind(this);
        this._handleOriginClickBound = this._handleOriginClick.bind(this);
        this.el.addEventListener("click", this._handleTargetClickBound);
        this.originEl.addEventListener("click", this._handleOriginClickBound);
        var throttledResize = M.throttle(this._handleResize, 200);
        this._handleThrottledResizeBound = throttledResize.bind(this);
        window.addEventListener("resize", this._handleThrottledResizeBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("click", this._handleTargetClickBound);
        this.originEl.removeEventListener("click", this._handleOriginClickBound);
        window.removeEventListener("resize", this._handleThrottledResizeBound);
      }
    }, {
      key: "_handleTargetClick",
      value: function _handleTargetClick(e) {
        this.open();
      }
    }, {
      key: "_handleOriginClick",
      value: function _handleOriginClick(e) {
        this.close();
      }
    }, {
      key: "_handleResize",
      value: function _handleResize(e) {
        this._calculatePositioning();
      }
    }, {
      key: "_handleDocumentClick",
      value: function _handleDocumentClick(e) {
        if (!$(e.target).closest(".tap-target-wrapper").length) {
          this.close();
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }, {
      key: "_setup",
      value: function _setup() {
        this.wrapper = this.$el.parent()[0];
        this.waveEl = $(this.wrapper).find(".tap-target-wave")[0];
        this.originEl = $(this.wrapper).find(".tap-target-origin")[0];
        this.contentEl = this.$el.find(".tap-target-content")[0];
        if (!$(this.wrapper).hasClass(".tap-target-wrapper")) {
          this.wrapper = document.createElement("div");
          this.wrapper.classList.add("tap-target-wrapper");
          this.$el.before($(this.wrapper));
          this.wrapper.append(this.el);
        }
        if (!this.contentEl) {
          this.contentEl = document.createElement("div");
          this.contentEl.classList.add("tap-target-content");
          this.$el.append(this.contentEl);
        }
        if (!this.waveEl) {
          this.waveEl = document.createElement("div");
          this.waveEl.classList.add("tap-target-wave");
          if (!this.originEl) {
            this.originEl = this.$origin.clone(true, true);
            this.originEl.addClass("tap-target-origin");
            this.originEl.removeAttr("id");
            this.originEl.removeAttr("style");
            this.originEl = this.originEl[0];
            this.waveEl.append(this.originEl);
          }
          this.wrapper.append(this.waveEl);
        }
      }
    }, {
      key: "_calculatePositioning",
      value: function _calculatePositioning() {
        var isFixed = this.$origin.css("position") === "fixed";
        if (!isFixed) {
          var parents = this.$origin.parents();
          for (var i = 0; i < parents.length; i++) {
            isFixed = $(parents[i]).css("position") == "fixed";
            if (isFixed) {
              break;
            }
          }
        }
        var originWidth = this.$origin.outerWidth();
        var originHeight = this.$origin.outerHeight();
        var originTop = isFixed ? this.$origin.offset().top - M.getDocumentScrollTop() : this.$origin.offset().top;
        var originLeft = isFixed ? this.$origin.offset().left - M.getDocumentScrollLeft() : this.$origin.offset().left;
        var windowWidth = window.innerWidth;
        var windowHeight = window.innerHeight;
        var centerX = windowWidth / 2;
        var centerY = windowHeight / 2;
        var isLeft = originLeft <= centerX;
        var isRight = originLeft > centerX;
        var isTop = originTop <= centerY;
        var isBottom = originTop > centerY;
        var isCenterX = originLeft >= windowWidth * 0.25 && originLeft <= windowWidth * 0.75;
        var tapTargetWidth = this.$el.outerWidth();
        var tapTargetHeight = this.$el.outerHeight();
        var tapTargetTop = originTop + originHeight / 2 - tapTargetHeight / 2;
        var tapTargetLeft = originLeft + originWidth / 2 - tapTargetWidth / 2;
        var tapTargetPosition = isFixed ? "fixed" : "absolute";
        var tapTargetTextWidth = isCenterX ? tapTargetWidth : tapTargetWidth / 2 + originWidth;
        var tapTargetTextHeight = tapTargetHeight / 2;
        var tapTargetTextTop = isTop ? tapTargetHeight / 2 : 0;
        var tapTargetTextBottom = 0;
        var tapTargetTextLeft = isLeft && !isCenterX ? tapTargetWidth / 2 - originWidth : 0;
        var tapTargetTextRight = 0;
        var tapTargetTextPadding = originWidth;
        var tapTargetTextAlign = isBottom ? "bottom" : "top";
        var tapTargetWaveWidth = originWidth > originHeight ? originWidth * 2 : originWidth * 2;
        var tapTargetWaveHeight = tapTargetWaveWidth;
        var tapTargetWaveTop = tapTargetHeight / 2 - tapTargetWaveHeight / 2;
        var tapTargetWaveLeft = tapTargetWidth / 2 - tapTargetWaveWidth / 2;
        var tapTargetWrapperCssObj = {};
        tapTargetWrapperCssObj.top = isTop ? tapTargetTop + "px" : "";
        tapTargetWrapperCssObj.right = isRight ? windowWidth - tapTargetLeft - tapTargetWidth + "px" : "";
        tapTargetWrapperCssObj.bottom = isBottom ? windowHeight - tapTargetTop - tapTargetHeight + "px" : "";
        tapTargetWrapperCssObj.left = isLeft ? tapTargetLeft + "px" : "";
        tapTargetWrapperCssObj.position = tapTargetPosition;
        $(this.wrapper).css(tapTargetWrapperCssObj);
        $(this.contentEl).css({
          width: tapTargetTextWidth + "px",
          height: tapTargetTextHeight + "px",
          top: tapTargetTextTop + "px",
          right: tapTargetTextRight + "px",
          bottom: tapTargetTextBottom + "px",
          left: tapTargetTextLeft + "px",
          padding: tapTargetTextPadding + "px",
          verticalAlign: tapTargetTextAlign
        });
        $(this.waveEl).css({
          top: tapTargetWaveTop + "px",
          left: tapTargetWaveLeft + "px",
          width: tapTargetWaveWidth + "px",
          height: tapTargetWaveHeight + "px"
        });
      }
    }, {
      key: "open",
      value: function open() {
        if (this.isOpen) {
          return;
        }
        if (typeof this.options.onOpen === "function") {
          this.options.onOpen.call(this, this.$origin[0]);
        }
        this.isOpen = true;
        this.wrapper.classList.add("open");
        document.body.addEventListener("click", this._handleDocumentClickBound, true);
        document.body.addEventListener("touchend", this._handleDocumentClickBound);
      }
    }, {
      key: "close",
      value: function close() {
        if (!this.isOpen) {
          return;
        }
        if (typeof this.options.onClose === "function") {
          this.options.onClose.call(this, this.$origin[0]);
        }
        this.isOpen = false;
        this.wrapper.classList.remove("open");
        document.body.removeEventListener("click", this._handleDocumentClickBound, true);
        document.body.removeEventListener("touchend", this._handleDocumentClickBound);
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(TapTarget.__proto__ || Object.getPrototypeOf(TapTarget), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_TapTarget;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return TapTarget;
  })(Component);
  M.TapTarget = TapTarget;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(TapTarget, "tapTarget", "M_TapTarget");
  }
})(cash);
;
(function ($) {
  "use strict";
  var _defaults = {
    classes: "",
    dropdownOptions: {}
  };
  var FormSelect = (function (_Component20) {
    _inherits(FormSelect, _Component20);
    function FormSelect(el, options) {
      _classCallCheck(this, FormSelect);
      var _this68 = _possibleConstructorReturn(this, (FormSelect.__proto__ || Object.getPrototypeOf(FormSelect)).call(this, FormSelect, el, options));
      if (_this68.$el.hasClass("browser-default")) {
        return _possibleConstructorReturn(_this68);
      }
      _this68.el.M_FormSelect = _this68;
      _this68.options = $.extend({}, FormSelect.defaults, options);
      _this68.isMultiple = _this68.$el.prop("multiple");
      _this68.el.tabIndex = -1;
      _this68._keysSelected = {};
      _this68._valueDict = {};
      _this68._setupDropdown();
      _this68._setupEventHandlers();
      return _this68;
    }
    _createClass(FormSelect, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this._removeDropdown();
        this.el.M_FormSelect = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        var _this69 = this;
        this._handleSelectChangeBound = this._handleSelectChange.bind(this);
        this._handleOptionClickBound = this._handleOptionClick.bind(this);
        this._handleInputClickBound = this._handleInputClick.bind(this);
        $(this.dropdownOptions).find("li:not(.optgroup)").each(function (el) {
          el.addEventListener("click", _this69._handleOptionClickBound);
        });
        this.el.addEventListener("change", this._handleSelectChangeBound);
        this.input.addEventListener("click", this._handleInputClickBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        var _this70 = this;
        $(this.dropdownOptions).find("li:not(.optgroup)").each(function (el) {
          el.removeEventListener("click", _this70._handleOptionClickBound);
        });
        this.el.removeEventListener("change", this._handleSelectChangeBound);
        this.input.removeEventListener("click", this._handleInputClickBound);
      }
    }, {
      key: "_handleSelectChange",
      value: function _handleSelectChange(e) {
        this._setValueToInput();
      }
    }, {
      key: "_handleOptionClick",
      value: function _handleOptionClick(e) {
        e.preventDefault();
        var option = $(e.target).closest("li")[0];
        var key = option.id;
        if (!$(option).hasClass("disabled") && !$(option).hasClass("optgroup") && key.length) {
          var selected = true;
          if (this.isMultiple) {
            var placeholderOption = $(this.dropdownOptions).find("li.disabled.selected");
            if (placeholderOption.length) {
              placeholderOption.removeClass("selected");
              placeholderOption.find("input[type=\"checkbox\"]").prop("checked", false);
              this._toggleEntryFromArray(placeholderOption[0].id);
            }
            selected = this._toggleEntryFromArray(key);
          } else {
            $(this.dropdownOptions).find("li").removeClass("selected");
            $(option).toggleClass("selected", selected);
          }
          var prevSelected = $(this._valueDict[key].el).prop("selected");
          if (prevSelected !== selected) {
            $(this._valueDict[key].el).prop("selected", selected);
            this.$el.trigger("change");
          }
        }
        e.stopPropagation();
      }
    }, {
      key: "_handleInputClick",
      value: function _handleInputClick() {
        if (this.dropdown && this.dropdown.isOpen) {
          this._setValueToInput();
          this._setSelectedStates();
        }
      }
    }, {
      key: "_setupDropdown",
      value: function _setupDropdown() {
        var _this71 = this;
        this.wrapper = document.createElement("div");
        $(this.wrapper).addClass("select-wrapper " + this.options.classes);
        this.$el.before($(this.wrapper));
        this.wrapper.appendChild(this.el);
        if (this.el.disabled) {
          this.wrapper.classList.add("disabled");
        }
        this.$selectOptions = this.$el.children("option, optgroup");
        this.dropdownOptions = document.createElement("ul");
        this.dropdownOptions.id = "select-options-" + M.guid();
        $(this.dropdownOptions).addClass("dropdown-content select-dropdown " + (this.isMultiple ? "multiple-select-dropdown" : ""));
        if (this.$selectOptions.length) {
          this.$selectOptions.each(function (el) {
            if ($(el).is("option")) {
              var optionEl = void 0;
              if (_this71.isMultiple) {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el, "multiple");
              } else {
                optionEl = _this71._appendOptionWithIcon(_this71.$el, el);
              }
              _this71._addOptionToValueDict(el, optionEl);
            } else if ($(el).is("optgroup")) {
              var selectOptions = $(el).children("option");
              $(_this71.dropdownOptions).append($("<li class=\"optgroup\"><span>" + el.getAttribute("label") + "</span></li>")[0]);
              selectOptions.each(function (el) {
                var optionEl = _this71._appendOptionWithIcon(_this71.$el, el, "optgroup-option");
                _this71._addOptionToValueDict(el, optionEl);
              });
            }
          });
        }
        this.$el.after(this.dropdownOptions);
        this.input = document.createElement("input");
        $(this.input).addClass("select-dropdown dropdown-trigger");
        this.input.setAttribute("type", "text");
        this.input.setAttribute("readonly", "true");
        this.input.setAttribute("data-target", this.dropdownOptions.id);
        if (this.el.disabled) {
          $(this.input).prop("disabled", "true");
        }
        this.$el.before(this.input);
        this._setValueToInput();
        var dropdownIcon = $("<svg class=\"caret\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>");
        this.$el.before(dropdownIcon[0]);
        if (!this.el.disabled) {
          var dropdownOptions = $.extend({}, this.options.dropdownOptions);
          dropdownOptions.onOpenEnd = function (el) {
            var selectedOption = $(_this71.dropdownOptions).find(".selected").first();
            if (selectedOption.length) {
              M.keyDown = true;
              _this71.dropdown.focusedIndex = selectedOption.index();
              _this71.dropdown._focusFocusedItem();
              M.keyDown = false;
              if (_this71.dropdown.isScrollable) {
                var scrollOffset = selectedOption[0].getBoundingClientRect().top - _this71.dropdownOptions.getBoundingClientRect().top;
                scrollOffset -= _this71.dropdownOptions.clientHeight / 2;
                _this71.dropdownOptions.scrollTop = scrollOffset;
              }
            }
          };
          if (this.isMultiple) {
            dropdownOptions.closeOnClick = false;
          }
          this.dropdown = M.Dropdown.init(this.input, dropdownOptions);
        }
        this._setSelectedStates();
      }
    }, {
      key: "_addOptionToValueDict",
      value: function _addOptionToValueDict(el, optionEl) {
        var index = Object.keys(this._valueDict).length;
        var key = this.dropdownOptions.id + index;
        var obj = {};
        optionEl.id = key;
        obj.el = el;
        obj.optionEl = optionEl;
        this._valueDict[key] = obj;
      }
    }, {
      key: "_removeDropdown",
      value: function _removeDropdown() {
        $(this.wrapper).find(".caret").remove();
        $(this.input).remove();
        $(this.dropdownOptions).remove();
        $(this.wrapper).before(this.$el);
        $(this.wrapper).remove();
      }
    }, {
      key: "_appendOptionWithIcon",
      value: function _appendOptionWithIcon(select, option, type) {
        var disabledClass = option.disabled ? "disabled " : "";
        var optgroupClass = type === "optgroup-option" ? "optgroup-option " : "";
        var multipleCheckbox = this.isMultiple ? "<label><input type=\"checkbox\"" + disabledClass + "\"/><span>" + option.innerHTML + "</span></label>" : option.innerHTML;
        var liEl = $("<li></li>");
        var spanEl = $("<span></span>");
        spanEl.html(multipleCheckbox);
        liEl.addClass(disabledClass + " " + optgroupClass);
        liEl.append(spanEl);
        var iconUrl = option.getAttribute("data-icon");
        if (!!iconUrl) {
          var imgEl = $("<img alt=\"\" src=\"" + iconUrl + "\">");
          liEl.prepend(imgEl);
        }
        $(this.dropdownOptions).append(liEl[0]);
        return liEl[0];
      }
    }, {
      key: "_toggleEntryFromArray",
      value: function _toggleEntryFromArray(key) {
        var notAdded = !this._keysSelected.hasOwnProperty(key);
        var $optionLi = $(this._valueDict[key].optionEl);
        if (notAdded) {
          this._keysSelected[key] = true;
        } else {
          delete this._keysSelected[key];
        }
        $optionLi.toggleClass("selected", notAdded);
        $optionLi.find("input[type=\"checkbox\"]").prop("checked", notAdded);
        $optionLi.prop("selected", notAdded);
        return notAdded;
      }
    }, {
      key: "_setValueToInput",
      value: function _setValueToInput() {
        var values = [];
        var options = this.$el.find("option");
        options.each(function (el) {
          if ($(el).prop("selected")) {
            var text = $(el).text();
            values.push(text);
          }
        });
        if (!values.length) {
          var firstDisabled = this.$el.find("option:disabled").eq(0);
          if (firstDisabled.length && firstDisabled[0].value === "") {
            values.push(firstDisabled.text());
          }
        }
        this.input.value = values.join(", ");
      }
    }, {
      key: "_setSelectedStates",
      value: function _setSelectedStates() {
        this._keysSelected = {};
        for (var key in this._valueDict) {
          var option = this._valueDict[key];
          var optionIsSelected = $(option.el).prop("selected");
          $(option.optionEl).find("input[type=\"checkbox\"]").prop("checked", optionIsSelected);
          if (optionIsSelected) {
            this._activateOption($(this.dropdownOptions), $(option.optionEl));
            this._keysSelected[key] = true;
          } else {
            $(option.optionEl).removeClass("selected");
          }
        }
      }
    }, {
      key: "_activateOption",
      value: function _activateOption(collection, newOption) {
        if (newOption) {
          if (!this.isMultiple) {
            collection.find("li.selected").removeClass("selected");
          }
          var option = $(newOption);
          option.addClass("selected");
        }
      }
    }, {
      key: "getSelectedValues",
      value: function getSelectedValues() {
        var selectedValues = [];
        for (var key in this._keysSelected) {
          selectedValues.push(this._valueDict[key].el.value);
        }
        return selectedValues;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(FormSelect.__proto__ || Object.getPrototypeOf(FormSelect), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_FormSelect;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return FormSelect;
  })(Component);
  M.FormSelect = FormSelect;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(FormSelect, "formSelect", "M_FormSelect");
  }
})(cash);
;
(function ($, anim) {
  "use strict";
  var _defaults = {};
  var Range = (function (_Component21) {
    _inherits(Range, _Component21);
    function Range(el, options) {
      _classCallCheck(this, Range);
      var _this72 = _possibleConstructorReturn(this, (Range.__proto__ || Object.getPrototypeOf(Range)).call(this, Range, el, options));
      _this72.el.M_Range = _this72;
      _this72.options = $.extend({}, Range.defaults, options);
      _this72._mousedown = false;
      _this72._setupThumb();
      _this72._setupEventHandlers();
      return _this72;
    }
    _createClass(Range, [{
      key: "destroy",
      value: function destroy() {
        this._removeEventHandlers();
        this._removeThumb();
        this.el.M_Range = undefined;
      }
    }, {
      key: "_setupEventHandlers",
      value: function _setupEventHandlers() {
        this._handleRangeChangeBound = this._handleRangeChange.bind(this);
        this._handleRangeMousedownTouchstartBound = this._handleRangeMousedownTouchstart.bind(this);
        this._handleRangeInputMousemoveTouchmoveBound = this._handleRangeInputMousemoveTouchmove.bind(this);
        this._handleRangeMouseupTouchendBound = this._handleRangeMouseupTouchend.bind(this);
        this._handleRangeBlurMouseoutTouchleaveBound = this._handleRangeBlurMouseoutTouchleave.bind(this);
        this.el.addEventListener("change", this._handleRangeChangeBound);
        this.el.addEventListener("mousedown", this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener("touchstart", this._handleRangeMousedownTouchstartBound);
        this.el.addEventListener("input", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener("mousemove", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener("touchmove", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.addEventListener("mouseup", this._handleRangeMouseupTouchendBound);
        this.el.addEventListener("touchend", this._handleRangeMouseupTouchendBound);
        this.el.addEventListener("blur", this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener("mouseout", this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.addEventListener("touchleave", this._handleRangeBlurMouseoutTouchleaveBound);
      }
    }, {
      key: "_removeEventHandlers",
      value: function _removeEventHandlers() {
        this.el.removeEventListener("change", this._handleRangeChangeBound);
        this.el.removeEventListener("mousedown", this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener("touchstart", this._handleRangeMousedownTouchstartBound);
        this.el.removeEventListener("input", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener("mousemove", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener("touchmove", this._handleRangeInputMousemoveTouchmoveBound);
        this.el.removeEventListener("mouseup", this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener("touchend", this._handleRangeMouseupTouchendBound);
        this.el.removeEventListener("blur", this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener("mouseout", this._handleRangeBlurMouseoutTouchleaveBound);
        this.el.removeEventListener("touchleave", this._handleRangeBlurMouseoutTouchleaveBound);
      }
    }, {
      key: "_handleRangeChange",
      value: function _handleRangeChange() {
        $(this.value).html(this.$el.val());
        if (!$(this.thumb).hasClass("active")) {
          this._showRangeBubble();
        }
        var offsetLeft = this._calcRangeOffset();
        $(this.thumb).addClass("active").css("left", offsetLeft + "px");
      }
    }, {
      key: "_handleRangeMousedownTouchstart",
      value: function _handleRangeMousedownTouchstart(e) {
        $(this.value).html(this.$el.val());
        this._mousedown = true;
        this.$el.addClass("active");
        if (!$(this.thumb).hasClass("active")) {
          this._showRangeBubble();
        }
        if (e.type !== "input") {
          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass("active").css("left", offsetLeft + "px");
        }
      }
    }, {
      key: "_handleRangeInputMousemoveTouchmove",
      value: function _handleRangeInputMousemoveTouchmove() {
        if (this._mousedown) {
          if (!$(this.thumb).hasClass("active")) {
            this._showRangeBubble();
          }
          var offsetLeft = this._calcRangeOffset();
          $(this.thumb).addClass("active").css("left", offsetLeft + "px");
          $(this.value).html(this.$el.val());
        }
      }
    }, {
      key: "_handleRangeMouseupTouchend",
      value: function _handleRangeMouseupTouchend() {
        this._mousedown = false;
        this.$el.removeClass("active");
      }
    }, {
      key: "_handleRangeBlurMouseoutTouchleave",
      value: function _handleRangeBlurMouseoutTouchleave() {
        if (!this._mousedown) {
          var paddingLeft = parseInt(this.$el.css("padding-left"));
          var marginLeft = 7 + paddingLeft + "px";
          if ($(this.thumb).hasClass("active")) {
            anim.remove(this.thumb);
            anim({
              targets: this.thumb,
              height: 0,
              width: 0,
              top: 10,
              easing: "easeOutQuad",
              marginLeft: marginLeft,
              duration: 100
            });
          }
          $(this.thumb).removeClass("active");
        }
      }
    }, {
      key: "_setupThumb",
      value: function _setupThumb() {
        this.thumb = document.createElement("span");
        this.value = document.createElement("span");
        $(this.thumb).addClass("thumb");
        $(this.value).addClass("value");
        $(this.thumb).append(this.value);
        this.$el.after(this.thumb);
      }
    }, {
      key: "_removeThumb",
      value: function _removeThumb() {
        $(this.thumb).remove();
      }
    }, {
      key: "_showRangeBubble",
      value: function _showRangeBubble() {
        var paddingLeft = parseInt($(this.thumb).parent().css("padding-left"));
        var marginLeft = -7 + paddingLeft + "px";
        anim.remove(this.thumb);
        anim({
          targets: this.thumb,
          height: 30,
          width: 30,
          top: -30,
          marginLeft: marginLeft,
          duration: 300,
          easing: "easeOutQuint"
        });
      }
    }, {
      key: "_calcRangeOffset",
      value: function _calcRangeOffset() {
        var width = this.$el.width() - 15;
        var max = parseFloat(this.$el.attr("max")) || 100;
        var min = parseFloat(this.$el.attr("min")) || 0;
        var percent = (parseFloat(this.$el.val()) - min) / (max - min);
        return percent * width;
      }
    }], [{
      key: "init",
      value: function init(els, options) {
        return _get(Range.__proto__ || Object.getPrototypeOf(Range), "init", this).call(this, this, els, options);
      }
    }, {
      key: "getInstance",
      value: function getInstance(el) {
        var domElem = !!el.jquery ? el[0] : el;
        return domElem.M_Range;
      }
    }, {
      key: "defaults",
      get: function () {
        return _defaults;
      }
    }]);
    return Range;
  })(Component);
  M.Range = Range;
  if (M.jQueryLoaded) {
    M.initializeJqueryWrapper(Range, "range", "M_Range");
  }
  Range.init($("input[type=range]"));
})(cash, M.anime);

});
	___scope___.entry = "dist/js/materialize.js";
})
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
FuseBox.pkg("fuse-box-css", {}, function(___scope___){
___scope___.file("index.js", function(exports, require, module){
var __filename = "index.js";
var runningInBrowser = FuseBox.isBrowser || FuseBox.target === "electron";
var cssHandler = function (__filename, contents) {
  if (runningInBrowser) {
    var styleId = __filename.replace(/[\.\/]+/g, "-");
    if (styleId.charAt(0) === "-") styleId = styleId.substring(1);
    var exists = document.getElementById(styleId);
    if (!exists) {
      var s = document.createElement(contents ? "style" : "link");
      s.id = styleId;
      s.type = "text/css";
      if (contents) {
        s.innerHTML = contents;
      } else {
        s.rel = "stylesheet";
        s.href = __filename;
      }
      document.getElementsByTagName("head")[0].appendChild(s);
    } else {
      if (contents) {
        exists.innerHTML = contents;
      }
    }
  }
};
module.exports = cssHandler;

});
	___scope___.entry = "index.js";
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
FuseBox.pkg("@rematch/core", {}, function(___scope___){
___scope___.file("dist/umd/rematch.js", function(exports, require, module){
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t((e = e || self).Rematch = {});
})(this, function (e) {
  "use strict";
  var l = function () {
    return (l = Object.assign || (function (e) {
      for (var t, r = 1, n = arguments.length; r < n; r++) for (var o in t = arguments[r]) Object.prototype.hasOwnProperty.call(t, o) && (e[o] = t[o]);
      return e;
    })).apply(this, arguments);
  };
  function o(i, a, c, u) {
    return new (c || (c = Promise))(function (e, t) {
      function r(e) {
        try {
          o(u.next(e));
        } catch (e) {
          t(e);
        }
      }
      function n(e) {
        try {
          o(u.throw(e));
        } catch (e) {
          t(e);
        }
      }
      function o(t) {
        t.done ? e(t.value) : new c(function (e) {
          e(t.value);
        }).then(r, n);
      }
      o((u = u.apply(i, a || [])).next());
    });
  }
  function i(r, n) {
    var o, i, a, e, c = {
      label: 0,
      sent: function () {
        if (1 & a[0]) throw a[1];
        return a[1];
      },
      trys: [],
      ops: []
    };
    return (e = {
      next: t(0),
      throw: t(1),
      return: t(2)
    }, "function" == typeof Symbol && (e[Symbol.iterator] = function () {
      return this;
    }), e);
    function t(t) {
      return function (e) {
        return (function (t) {
          if (o) throw new TypeError("Generator is already executing.");
          for (; c; ) try {
            if ((o = 1, i && (a = 2 & t[0] ? i.return : t[0] ? i.throw || ((a = i.return) && a.call(i), 0) : i.next) && !(a = a.call(i, t[1])).done)) return a;
            switch ((i = 0, a && (t = [2 & t[0], a.value]), t[0])) {
              case 0:
              case 1:
                a = t;
                break;
              case 4:
                return (c.label++, {
                  value: t[1],
                  done: !1
                });
              case 5:
                (c.label++, i = t[1], t = [0]);
                continue;
              case 7:
                (t = c.ops.pop(), c.trys.pop());
                continue;
              default:
                if (!(a = 0 < (a = c.trys).length && a[a.length - 1]) && (6 === t[0] || 2 === t[0])) {
                  c = 0;
                  continue;
                }
                if (3 === t[0] && (!a || a[0] < t[1] && t[1] < a[3])) {
                  c.label = t[1];
                  break;
                }
                if (6 === t[0] && c.label < a[1]) {
                  (c.label = a[1], a = t);
                  break;
                }
                if (a && c.label < a[2]) {
                  (c.label = a[2], c.ops.push(t));
                  break;
                }
                (a[2] && c.ops.pop(), c.trys.pop());
                continue;
            }
            t = n.call(r, c);
          } catch (e) {
            (t = [6, e], i = 0);
          } finally {
            o = a = 0;
          }
          if (5 & t[0]) throw t[1];
          return {
            value: t[0] ? t[1] : void 0,
            done: !0
          };
        })([t, e]);
      };
    }
  }
  var t, a = function (e) {}, r = {
    exposed: {
      storeDispatch: function (e, t) {
        console.warn("Warning: store not yet loaded");
      },
      storeGetState: function () {
        console.warn("Warning: store not yet loaded");
      },
      dispatch: function (e) {
        return this.storeDispatch(e);
      },
      createDispatcher: function (r, n) {
        var e = this;
        return function (payload, meta) {
          return o(e, void 0, Promise, function () {
            var t;
            return i(this, function (e) {
              return (t = {
                type: r + "/" + n
              }, void 0 !== payload && (t.payload = payload), void 0 !== meta && (t.meta = meta), [2, this.dispatch(t)]);
            });
          });
        };
      }
    },
    onStoreCreated: function (e) {
      return (this.storeDispatch = e.dispatch, this.storeGetState = e.getState, {
        dispatch: this.dispatch
      });
    },
    onModel: function (e) {
      if ((this.dispatch[e.name] = {}, e.reducers)) for (var t = 0, r = Object.keys(e.reducers); t < r.length; t++) {
        var n = r[t];
        (this.validate([[!!n.match(/\/.+\//), "Invalid reducer name (" + e.name + "/" + n + ")"], ["function" != typeof e.reducers[n], "Invalid reducer (" + e.name + "/" + n + "). Must be a function"]]), this.dispatch[e.name][n] = this.createDispatcher.call(this, e.name, n));
      }
    }
  }, n = {
    exposed: {
      effects: {}
    },
    onModel: function (e) {
      if (e.effects) for (var t = "function" == typeof e.effects ? e.effects(this.dispatch) : e.effects, r = 0, n = Object.keys(t); r < n.length; r++) {
        var o = n[r];
        (this.validate([[!!o.match(/\//), "Invalid effect name (" + e.name + "/" + o + ")"], ["function" != typeof t[o], "Invalid effect (" + e.name + "/" + o + "). Must be a function"]]), this.effects[e.name + "/" + o] = t[o].bind(this.dispatch[e.name]), this.dispatch[e.name][o] = this.createDispatcher.call(this, e.name, o), this.dispatch[e.name][o].isEffect = !0);
      }
    },
    middleware: function (n) {
      var e = this;
      return function (r) {
        return function (t) {
          return o(e, void 0, void 0, function () {
            return i(this, function (e) {
              switch (e.label) {
                case 0:
                  return (t.type in this.effects) ? [4, r(t)] : [3, 2];
                case 1:
                  return (e.sent(), [2, this.effects[t.type](t.payload, n.getState(), t.meta)]);
                case 2:
                  return [2, r(t)];
              }
            });
          });
        };
      };
    }
  };
  t = "undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof module ? module : Function("return this")();
  var c, u, h = ("function" == typeof (u = t.Symbol) ? u.observable ? c = u.observable : (c = u("observable"), u.observable = c) : c = "@@observable", c), s = function () {
    return Math.random().toString(36).substring(7).split("").join(".");
  }, p = {
    INIT: "@@redux/INIT" + s(),
    REPLACE: "@@redux/REPLACE" + s(),
    PROBE_UNKNOWN_ACTION: function () {
      return "@@redux/PROBE_UNKNOWN_ACTION" + s();
    }
  };
  function y(e, t, r) {
    var n;
    if ("function" == typeof t && "function" == typeof r || "function" == typeof r && "function" == typeof arguments[3]) throw Error("It looks like you are passing several store enhancers to createStore(). This is not supported. Instead, compose them together to a single function");
    if (("function" == typeof t && void 0 === r && (r = t, t = void 0), void 0 !== r)) {
      if ("function" != typeof r) throw Error("Expected the enhancer to be a function.");
      return r(y)(e, t);
    }
    if ("function" != typeof e) throw Error("Expected the reducer to be a function.");
    var o = e, i = t, a = [], c = a, u = !1;
    function s() {
      c === a && (c = a.slice());
    }
    function d() {
      if (u) throw Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
      return i;
    }
    function f(t) {
      if ("function" != typeof t) throw Error("Expected the listener to be a function.");
      if (u) throw Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
      var r = !0;
      return (s(), c.push(t), function () {
        if (r) {
          if (u) throw Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
          (r = !1, s());
          var e = c.indexOf(t);
          c.splice(e, 1);
        }
      });
    }
    function l(e) {
      if (!(function (e) {
        if ("object" != typeof e || null === e) return !1;
        for (var t = e; null !== Object.getPrototypeOf(t); ) t = Object.getPrototypeOf(t);
        return Object.getPrototypeOf(e) === t;
      })(e)) throw Error("Actions must be plain objects. Use custom middleware for async actions.");
      if (void 0 === e.type) throw Error("Actions may not have an undefined \"type\" property. Have you misspelled a constant?");
      if (u) throw Error("Reducers may not dispatch actions.");
      try {
        (u = !0, i = o(i, e));
      } finally {
        u = !1;
      }
      for (var t = a = c, r = 0; r < t.length; r++) {
        (0, t[r])();
      }
      return e;
    }
    return (l({
      type: p.INIT
    }), (n = {
      dispatch: l,
      subscribe: f,
      getState: d,
      replaceReducer: function (e) {
        if ("function" != typeof e) throw Error("Expected the nextReducer to be a function.");
        (o = e, l({
          type: p.REPLACE
        }));
      }
    })[h] = function () {
      var e, r = f;
      return ((e = {
        subscribe: function (e) {
          if ("object" != typeof e || null === e) throw new TypeError("Expected the observer to be an object.");
          function t() {
            e.next && e.next(d());
          }
          return (t(), {
            unsubscribe: r(t)
          });
        }
      })[h] = function () {
        return this;
      }, e);
    }, n);
  }
  function b(e) {
    for (var t = Object.keys(e), f = {}, r = 0; r < t.length; r++) {
      var n = t[r];
      "function" == typeof e[n] && (f[n] = e[n]);
    }
    var l, o, h = Object.keys(f);
    try {
      Object.keys(o = f).forEach(function (e) {
        var t = o[e];
        if (void 0 === t(void 0, {
          type: p.INIT
        })) throw Error("Reducer \"" + e + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
        if (void 0 === t(void 0, {
          type: p.PROBE_UNKNOWN_ACTION()
        })) throw Error("Reducer \"" + e + "\" returned undefined when probed with a random type. Don't try to handle " + p.INIT + " or other actions in \"redux/*\" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.");
      });
    } catch (e) {
      l = e;
    }
    return function (e, t) {
      if ((void 0 === e && (e = {}), l)) throw l;
      for (var r, n, o = !1, i = {}, a = 0; a < h.length; a++) {
        var c = h[a], u = e[c], s = (0, f[c])(u, t);
        if (void 0 === s) {
          var d = (void 0, "Given " + ((n = (r = t) && r.type) && "action \"" + n + "\"" || "an action") + ", reducer \"" + c + "\" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.");
          throw Error(d);
        }
        (i[c] = s, o = o || s !== u);
      }
      return o ? i : e;
    };
  }
  function d(e, t) {
    return function () {
      return t(e.apply(this, arguments));
    };
  }
  function f() {
    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
    return 0 === t.length ? function (e) {
      return e;
    } : 1 === t.length ? t[0] : t.reduce(function (e, t) {
      return function () {
        return e(t.apply(void 0, arguments));
      };
    });
  }
  function v() {
    for (var e = arguments.length, i = Array(e), t = 0; t < e; t++) i[t] = arguments[t];
    return function (o) {
      return function () {
        var e = o.apply(void 0, arguments), t = function () {
          throw Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
        }, r = {
          getState: e.getState,
          dispatch: function () {
            return t.apply(void 0, arguments);
          }
        }, n = i.map(function (e) {
          return e(r);
        });
        return (function (o) {
          for (var e = 1; e < arguments.length; e++) {
            var i = null != arguments[e] ? arguments[e] : {}, t = Object.keys(i);
            ("function" == typeof Object.getOwnPropertySymbols && (t = t.concat(Object.getOwnPropertySymbols(i).filter(function (e) {
              return Object.getOwnPropertyDescriptor(i, e).enumerable;
            }))), t.forEach(function (e) {
              var t, r, n;
              (n = i[r = e], (r in (t = o)) ? Object.defineProperty(t, r, {
                value: n,
                enumerable: !0,
                configurable: !0,
                writable: !0
              }) : t[r] = n);
            }));
          }
          return o;
        })({}, e, {
          dispatch: t = f.apply(void 0, n)(e.dispatch)
        });
      };
    };
  }
  var m = Object.freeze({
    createStore: y,
    combineReducers: b,
    bindActionCreators: function (e, t) {
      if ("function" == typeof e) return d(e, t);
      if ("object" != typeof e || null === e) throw Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : typeof e) + ". Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
      for (var r = Object.keys(e), n = {}, o = 0; o < r.length; o++) {
        var i = r[o], a = e[i];
        "function" == typeof a && (n[i] = d(a, t));
      }
      return n;
    },
    applyMiddleware: v,
    compose: f,
    __DO_NOT_USE__ActionTypes: p
  }), g = function (e) {
    void 0 === e && (e = {});
    var t = e.disabled, r = (function (e, t) {
      var r = {};
      for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && t.indexOf(n) < 0 && (r[n] = e[n]);
      if (null != e && "function" == typeof Object.getOwnPropertySymbols) {
        var o = 0;
        for (n = Object.getOwnPropertySymbols(e); o < n.length; o++) t.indexOf(n[o]) < 0 && (r[n[o]] = e[n[o]]);
      }
      return r;
    })(e, ["disabled"]);
    return !t && "object" == typeof window && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__(r) : f;
  };
  var w = [r, n], x = (function () {
    function e(e) {
      var t = this;
      (this.plugins = [], this.config = e, this.pluginFactory = {
        config: e,
        validate: a,
        create: function (e) {
          e.onInit && e.onInit.call(this);
          var t = {};
          if (e.exposed) for (var r = 0, n = Object.keys(e.exposed); r < n.length; r++) {
            var o = n[r];
            this[o] = "function" == typeof e.exposed[o] ? e.exposed[o].bind(this) : Object.create(e.exposed[o]);
          }
          for (var i = 0, a = ["onModel", "middleware", "onStoreCreated"]; i < a.length; i++) {
            var c = a[i];
            e[c] && (t[c] = e[c].bind(this));
          }
          return t;
        }
      });
      for (var r = 0, n = w.concat(this.config.plugins); r < n.length; r++) {
        this.plugins.push(this.pluginFactory.create(n[r]));
      }
      this.forEachPlugin("middleware", function (e) {
        t.config.redux.middlewares.push(e);
      });
    }
    return (e.prototype.forEachPlugin = function (e, t) {
      for (var r = 0, n = this.plugins; r < n.length; r++) {
        var o = n[r];
        o[e] && t(o[e]);
      }
    }, e.prototype.getModels = function (t) {
      return Object.keys(t).map(function (e) {
        return l({
          name: e
        }, t[e], {
          reducers: t[e].reducers || ({})
        });
      });
    }, e.prototype.addModel = function (t) {
      this.forEachPlugin("onModel", function (e) {
        return e(t);
      });
    }, e.prototype.init = function () {
      var t = this;
      this.models = this.getModels(this.config.models);
      for (var e = 0, r = this.models; e < r.length; e++) {
        this.addModel(r[e]);
      }
      var n = (function (e) {
        var u = this, t = e.redux, r = e.models, n = t.combineReducers || b, o = t.createStore || y, i = void 0 !== t.initialState ? t.initialState : {};
        (this.reducers = t.reducers, this.mergeReducers = function (e) {
          return (void 0 === e && (e = {}), u.reducers = l({}, u.reducers, e), Object.keys(u.reducers).length ? n(u.reducers) : function (e) {
            return e;
          });
        }, this.createModelReducer = function (r) {
          for (var n = r.baseReducer, o = {}, e = 0, t = Object.keys(r.reducers || ({})); e < t.length; e++) {
            var i = t[e], a = -1 < i.indexOf("/") ? i : r.name + "/" + i;
            o[a] = r.reducers[i];
          }
          var c = function (e, t) {
            return (void 0 === e && (e = r.state), "function" == typeof o[t.type] ? o[t.type](e, t.payload, t.meta) : e);
          };
          u.reducers[r.name] = n ? function (e, t) {
            return c(n(e, t), t);
          } : c;
        });
        for (var a = 0, c = r; a < c.length; a++) this.createModelReducer(c[a]);
        this.createRootReducer = function (r) {
          void 0 === r && (r = {});
          var n = u.mergeReducers();
          return Object.keys(r).length ? function (e, t) {
            return n(r[t.type] ? (0, r[t.type])(e, t) : e, t);
          } : n;
        };
        var s = this.createRootReducer(t.rootReducers), d = v.apply(m, t.middlewares), f = g(t.devtoolOptions).apply(void 0, t.enhancers.concat([d]));
        return (this.store = o(s, i, f), this);
      }).call(this, {
        redux: this.config.redux,
        models: this.models
      }), o = l({
        name: this.config.name
      }, n.store, {
        model: function (e) {
          (t.addModel(e), n.mergeReducers(n.createModelReducer(e)), n.store.replaceReducer(n.createRootReducer(t.config.redux.rootReducers)), n.store.dispatch({
            type: "@@redux/REPLACE "
          }));
        }
      });
      return (this.forEachPlugin("onStoreCreated", function (e) {
        var t = e(o);
        t && Object.keys(t || ({})).forEach(function (e) {
          o[e] = t[e];
        });
      }), o);
    }, e);
  })(), O = function (e) {
    console.warn(e);
  }, E = function (e, t) {
    return t ? l({}, t, e || ({})) : e || ({});
  };
  var S = 0, j = function (e) {
    void 0 === e && (e = {});
    var t = e.name || "" + S;
    S += 1;
    var r = (function (e) {
      for (var t = l({
        name: e.name,
        models: {},
        plugins: []
      }, e, {
        redux: l({
          reducers: {},
          rootReducers: {},
          enhancers: [],
          middlewares: []
        }, e.redux, {
          devtoolOptions: l({
            name: e.name
          }, e.redux && e.redux.devtoolOptions ? e.redux.devtoolOptions : {})
        })
      }), r = 0, n = t.plugins; r < n.length; r++) {
        var o = n[r];
        if (o.config) {
          var i = E(t.models, o.config.models);
          (t.models = i, t.plugins = t.plugins.concat(o.config.plugins || []), o.config.redux && (t.redux.initialState = E(t.redux.initialState, o.config.redux.initialState), t.redux.reducers = E(t.redux.reducers, o.config.redux.reducers), t.redux.rootReducers = E(t.redux.rootReducers, o.config.redux.reducers), t.redux.enhancers = t.redux.enhancers.concat(o.config.redux.enhancers || []), t.redux.middlewares = t.redux.middlewares.concat(o.config.redux.middlewares || []), t.redux.combineReducers = t.redux.combineReducers || o.config.redux.combineReducers, t.redux.createStore = t.redux.createStore || o.config.redux.createStore));
        }
      }
      return t;
    })(l({}, e, {
      name: t
    }));
    return new x(r).init();
  }, R = {
    init: j
  };
  (e.getState = function () {
    O("global getState has been removed in @rematch/core 1.0.0-beta.3.\n\tSee https://github.com/rematch/rematch/blob/master/CHANGELOG.md#100-beta3---2018-06-23 for details.\n\tFor a quick fix, import and use store.getState.");
  }, e.dispatch = function () {
    O("global dispatch has been removed in @rematch/core 1.0.0-beta.3.\n\tSee https://github.com/rematch/rematch/blob/master/CHANGELOG.md#100-beta3---2018-06-23 for details.\n\tFor a quick fix, import and use store.dispatch.");
  }, e.createModel = function (e) {
    return e;
  }, e.init = j, e.default = R, Object.defineProperty(e, "__esModule", {
    value: !0
  }));
});

});
	___scope___.entry = "dist/umd/rematch.js";
})
FuseBox.pkg("@rematch/immer", {}, function(___scope___){
___scope___.file("dist/rematch-immer.umd.js", function(exports, require, module){
var process = require("process");
!(function (e, t) {
  "object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.RematchImmer = {});
})(this, function (e) {
  "use strict";
  var t = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};
  var r = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, n = "undefined" != typeof Symbol ? Symbol("immer-proxy-state") : "__$immer_state", o = "An immer producer returned a new value *and* modified its draft. Either return a new value *or* modify the draft.";
  var i = !("undefined" != typeof process || "verifyMinified" !== (function () {}).name), u = "undefined" != typeof Proxy;
  function f(e) {
    return !!e && !!e[n];
  }
  function a(e) {
    if (!e) return !1;
    if ("object" !== (void 0 === e ? "undefined" : r(e))) return !1;
    if (Array.isArray(e)) return !0;
    var t = Object.getPrototypeOf(e);
    return null === t || t === Object.prototype;
  }
  function c(e) {
    return (i && Object.freeze(e), e);
  }
  function d(e) {
    return Array.isArray(e) ? e.slice() : void 0 === e.__proto__ ? Object.assign(Object.create(null), e) : Object.assign({}, e);
  }
  function s(e, t) {
    if (Array.isArray(e)) for (var r = 0; r < e.length; r++) t(r, e[r]); else for (var n in e) t(n, e[n]);
  }
  function l(e, t) {
    return Object.prototype.hasOwnProperty.call(e, t);
  }
  function p(e) {
    if (f(e)) {
      var t = e[n];
      return !0 === t.modified ? !0 === t.finalized ? t.copy : (t.finalized = !0, (function (e, t) {
        var r = t.base;
        return (s(e, function (t, n) {
          n !== r[t] && (e[t] = p(n));
        }), c(e));
      })(u ? t.copy : t.copy = d(e), t)) : t.base;
    }
    return ((function e(t) {
      if (!a(t)) return;
      if (Object.isFrozen(t)) return;
      s(t, function (r, n) {
        f(n) ? t[r] = p(n) : e(n);
      });
      c(t);
    })(e), e);
  }
  function y(e, t) {
    return e === t ? 0 !== e || 1 / e == 1 / t : e != e && t != t;
  }
  var b = null, h = {
    get: function (e, t) {
      if (t === n) return e;
      if (e.modified) {
        var r = e.copy[t];
        return r === e.base[t] && a(r) ? e.copy[t] = g(e, r) : r;
      }
      if (l(e.proxies, t)) return e.proxies[t];
      var o = e.base[t];
      return !f(o) && a(o) ? e.proxies[t] = g(e, o) : o;
    },
    has: function (e, t) {
      return (t in m(e));
    },
    ownKeys: function (e) {
      return Reflect.ownKeys(m(e));
    },
    set: function (e, t, r) {
      if (!e.modified) {
        if ((t in e.base) && y(e.base[t], r) || l(e.proxies, t) && e.proxies[t] === r) return !0;
        w(e);
      }
      return (e.copy[t] = r, !0);
    },
    deleteProperty: function (e, t) {
      return (w(e), delete e.copy[t], !0);
    },
    getOwnPropertyDescriptor: function (e, t) {
      var r = e.modified ? e.copy : l(e.proxies, t) ? e.proxies : e.base, n = Reflect.getOwnPropertyDescriptor(r, t);
      !n || Array.isArray(r) && "length" === t || (n.configurable = !0);
      return n;
    },
    defineProperty: function () {
      throw new Error("Immer does currently not support defining properties on draft objects");
    },
    setPrototypeOf: function () {
      throw new Error("Don't even try this...");
    }
  }, v = {};
  function m(e) {
    return !0 === e.modified ? e.copy : e.base;
  }
  function w(e) {
    e.modified || (e.modified = !0, e.copy = d(e.base), Object.assign(e.copy, e.proxies), e.parent && w(e.parent));
  }
  function g(e, t) {
    var r = (function (e, t) {
      return {
        modified: !1,
        finalized: !1,
        parent: e,
        base: t,
        copy: void 0,
        proxies: {}
      };
    })(e, t), n = Array.isArray(t) ? Proxy.revocable([r], v) : Proxy.revocable(r, h);
    return (b.push(n), n.proxy);
  }
  s(h, function (e, t) {
    v[e] = function () {
      return (arguments[0] = arguments[0][0], t.apply(this, arguments));
    };
  });
  var j = {}, O = null;
  function x(e) {
    return e.hasCopy ? e.copy : e.base;
  }
  function E(e) {
    e.modified || (e.modified = !0, e.parent && E(e.parent));
  }
  function A(e) {
    e.hasCopy || (e.hasCopy = !0, e.copy = d(e.base));
  }
  function P(e, t) {
    var r = d(t);
    s(t, function (e) {
      var t;
      Object.defineProperty(r, "" + e, j[t = "" + e] || (j[t] = {
        configurable: !0,
        enumerable: !0,
        get: function () {
          return (function (e, t) {
            S(e);
            var r = x(e)[t];
            return !e.finalizing && r === e.base[t] && a(r) ? (A(e), e.copy[t] = P(e, r)) : r;
          })(this[n], t);
        },
        set: function (e) {
          !(function (e, t, r) {
            if ((S(e), !e.modified)) {
              if (y(x(e)[t], r)) return;
              (E(e), A(e));
            }
            e.copy[t] = r;
          })(this[n], t, e);
        }
      }));
    });
    var o = (function (e, t, r) {
      return {
        modified: !1,
        hasCopy: !1,
        parent: e,
        base: r,
        proxy: t,
        copy: void 0,
        finished: !1,
        finalizing: !1,
        finalized: !1
      };
    })(e, r, t);
    return (Object.defineProperty(r, n, {
      value: o,
      enumerable: !1,
      writable: !0
    }), O.push(o), r);
  }
  function S(e) {
    if (!0 === e.finished) throw new Error("Cannot use a proxy that has been revoked. Did you pass an object from inside an immer function to an async process?");
  }
  function _(e) {
    return !(function (e, t) {
      if (y(e, t)) return !0;
      if ("object" !== (void 0 === e ? "undefined" : r(e)) || null === e || "object" !== (void 0 === t ? "undefined" : r(t)) || null === t) return !1;
      var n = Object.keys(e), o = Object.keys(t);
      if (n.length !== o.length) return !1;
      for (var i = 0; i < n.length; i++) if (!hasOwnProperty.call(t, n[i]) || !y(e[n[i]], t[n[i]])) return !1;
      return !0;
    })(Object.keys(e.base), Object.keys(e.proxy));
  }
  function I(e) {
    var t = e.proxy;
    if (t.length !== e.base.length) return !0;
    var r = Object.getOwnPropertyDescriptor(t, t.length - 1);
    return !(!r || r.get);
  }
  function R(e, t) {
    var r = O;
    O = [];
    try {
      var i = P(void 0, e), u = t.call(i, i);
      (s(O, function (e, t) {
        t.finalizing = !0;
      }), (function () {
        for (var e = O.length - 1; e >= 0; e--) {
          var t = O[e];
          !1 === t.modified && (Array.isArray(t.base) ? I(t) && E(t) : _(t) && E(t));
        }
      })());
      var f = void 0;
      if (void 0 !== u && u !== i) {
        if (i[n].modified) throw new Error(o);
        f = p(u);
      } else f = p(i);
      return (s(O, function (e, t) {
        t.finished = !0;
      }), f);
    } finally {
      O = r;
    }
  }
  function k(e, t) {
    if (1 !== arguments.length && 2 !== arguments.length) throw new Error("produce expects 1 or 2 arguments, got " + arguments.length);
    if ("function" == typeof e) {
      if ("function" == typeof t) throw new Error("if first argument is a function (curried invocation), the second argument to produce cannot be a function");
      var i = t, f = e;
      return function () {
        var e = arguments;
        return k(void 0 === e[0] && void 0 !== i ? i : e[0], function (t) {
          return (e[0] = t, f.apply(t, e));
        });
      };
    }
    if ("function" != typeof t) throw new Error("if first argument is not a function, the second argument to produce should be a function");
    if ("object" !== (void 0 === e ? "undefined" : r(e)) || null === e) return t(e);
    if (!a(e)) throw new Error("the first argument to an immer producer should be a primitive, plain object or array, got " + (void 0 === e ? "undefined" : r(e)) + ": \"" + e + "\"");
    return u ? (function (e, t) {
      var r = b;
      b = [];
      try {
        var i = g(void 0, e), u = t.call(i, i), f = void 0;
        if (void 0 !== u && u !== i) {
          if (i[n].modified) throw new Error(o);
          f = p(u);
        } else f = p(i);
        return (s(b, function (e, t) {
          return t.revoke();
        }), f);
      } finally {
        b = r;
      }
    })(e, t) : R(e, t);
  }
  var T = Object.freeze({
    setAutoFreeze: function (e) {
      i = e;
    },
    setUseProxies: function (e) {
      u = e;
    },
    default: k
  });
  var z = (function (e) {
    var t, r = e.Symbol;
    return ("function" == typeof r ? r.observable ? t = r.observable : (t = r("observable"), r.observable = t) : t = "@@observable", t);
  })("undefined" != typeof self ? self : "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof module ? module : Function("return this")()), C = {
    INIT: "@@redux/INIT" + Math.random().toString(36).substring(7).split("").join("."),
    REPLACE: "@@redux/REPLACE" + Math.random().toString(36).substring(7).split("").join(".")
  }, D = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
    return typeof e;
  } : function (e) {
    return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
  }, N = Object.assign || (function (e) {
    for (var t = 1; t < arguments.length; t++) {
      var r = arguments[t];
      for (var n in r) Object.prototype.hasOwnProperty.call(r, n) && (e[n] = r[n]);
    }
    return e;
  });
  function M(e, t) {
    var r = t && t.type;
    return "Given " + (r && "action \"" + String(r) + "\"" || "an action") + ", reducer \"" + e + "\" returned undefined. To ignore an action, you must explicitly return the previous state. If you want this reducer to hold no value, you can return null instead of undefined.";
  }
  function U(e, t) {
    return function () {
      return t(e.apply(this, arguments));
    };
  }
  function F() {
    for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
    return 0 === t.length ? function (e) {
      return e;
    } : 1 === t.length ? t[0] : t.reduce(function (e, t) {
      return function () {
        return e(t.apply(void 0, arguments));
      };
    });
  }
  var K, L = Object.freeze({
    createStore: function e(t, r, n) {
      var o;
      if (("function" == typeof r && void 0 === n && (n = r, r = void 0), void 0 !== n)) {
        if ("function" != typeof n) throw new Error("Expected the enhancer to be a function.");
        return n(e)(t, r);
      }
      if ("function" != typeof t) throw new Error("Expected the reducer to be a function.");
      var i = t, u = r, f = [], a = f, c = !1;
      function d() {
        a === f && (a = f.slice());
      }
      function s() {
        if (c) throw new Error("You may not call store.getState() while the reducer is executing. The reducer has already received the state as an argument. Pass it down from the top reducer instead of reading it from the store.");
        return u;
      }
      function l(e) {
        if ("function" != typeof e) throw new Error("Expected the listener to be a function.");
        if (c) throw new Error("You may not call store.subscribe() while the reducer is executing. If you would like to be notified after the store has been updated, subscribe from a component and invoke store.getState() in the callback to access the latest state. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
        var t = !0;
        return (d(), a.push(e), function () {
          if (t) {
            if (c) throw new Error("You may not unsubscribe from a store listener while the reducer is executing. See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
            (t = !1, d());
            var r = a.indexOf(e);
            a.splice(r, 1);
          }
        });
      }
      function p(e) {
        if (!(function (e) {
          if ("object" !== (void 0 === e ? "undefined" : D(e)) || null === e) return !1;
          for (var t = e; null !== Object.getPrototypeOf(t); ) t = Object.getPrototypeOf(t);
          return Object.getPrototypeOf(e) === t;
        })(e)) throw new Error("Actions must be plain objects. Use custom middleware for async actions.");
        if (void 0 === e.type) throw new Error("Actions may not have an undefined \"type\" property. Have you misspelled a constant?");
        if (c) throw new Error("Reducers may not dispatch actions.");
        try {
          (c = !0, u = i(u, e));
        } finally {
          c = !1;
        }
        for (var t = f = a, r = 0; r < t.length; r++) (0, t[r])();
        return e;
      }
      return (p({
        type: C.INIT
      }), (o = {
        dispatch: p,
        subscribe: l,
        getState: s,
        replaceReducer: function (e) {
          if ("function" != typeof e) throw new Error("Expected the nextReducer to be a function.");
          (i = e, p({
            type: C.REPLACE
          }));
        }
      })[z] = function () {
        var e, t = l;
        return ((e = {
          subscribe: function (e) {
            if ("object" !== (void 0 === e ? "undefined" : D(e)) || null === e) throw new TypeError("Expected the observer to be an object.");
            function r() {
              e.next && e.next(s());
            }
            return (r(), {
              unsubscribe: t(r)
            });
          }
        })[z] = function () {
          return this;
        }, e);
      }, o);
    },
    combineReducers: function (e) {
      for (var t = Object.keys(e), r = {}, n = 0; n < t.length; n++) {
        var o = t[n];
        "function" == typeof e[o] && (r[o] = e[o]);
      }
      var i = Object.keys(r), u = void 0;
      try {
        !(function (e) {
          Object.keys(e).forEach(function (t) {
            var r = e[t];
            if (void 0 === r(void 0, {
              type: C.INIT
            })) throw new Error("Reducer \"" + t + "\" returned undefined during initialization. If the state passed to the reducer is undefined, you must explicitly return the initial state. The initial state may not be undefined. If you don't want to set a value for this reducer, you can use null instead of undefined.");
            if (void 0 === r(void 0, {
              type: "@@redux/PROBE_UNKNOWN_ACTION_" + Math.random().toString(36).substring(7).split("").join(".")
            })) throw new Error("Reducer \"" + t + "\" returned undefined when probed with a random type. Don't try to handle " + C.INIT + " or other actions in \"redux/*\" namespace. They are considered private. Instead, you must return the current state for any unknown actions, unless it is undefined, in which case you must return the initial state, regardless of the action type. The initial state may not be undefined, but can be null.");
          });
        })(r);
      } catch (e) {
        u = e;
      }
      return function () {
        var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = arguments[1];
        if (u) throw u;
        for (var n = !1, o = {}, f = 0; f < i.length; f++) {
          var a = i[f], c = e[a], d = (0, r[a])(c, t);
          if (void 0 === d) {
            var s = M(a, t);
            throw new Error(s);
          }
          (o[a] = d, n = n || d !== c);
        }
        return n ? o : e;
      };
    },
    bindActionCreators: function (e, t) {
      if ("function" == typeof e) return U(e, t);
      if ("object" !== (void 0 === e ? "undefined" : D(e)) || null === e) throw new Error("bindActionCreators expected an object or a function, instead received " + (null === e ? "null" : void 0 === e ? "undefined" : D(e)) + ". Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
      for (var r = Object.keys(e), n = {}, o = 0; o < r.length; o++) {
        var i = r[o], u = e[i];
        "function" == typeof u && (n[i] = U(u, t));
      }
      return n;
    },
    applyMiddleware: function () {
      for (var e = arguments.length, t = Array(e), r = 0; r < e; r++) t[r] = arguments[r];
      return function (e) {
        return function () {
          for (var r = arguments.length, n = Array(r), o = 0; o < r; o++) n[o] = arguments[o];
          var i = e.apply(void 0, n), u = function () {
            throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
          }, f = {
            getState: i.getState,
            dispatch: function () {
              return u.apply(void 0, arguments);
            }
          }, a = t.map(function (e) {
            return e(f);
          });
          return (u = F.apply(void 0, a)(i.dispatch), N({}, i, {
            dispatch: u
          }));
        };
      };
    },
    compose: F,
    __DO_NOT_USE__ActionTypes: C
  }), Y = T && k || T, B = (function (e, t) {
    return (e(t = {
      exports: {}
    }, t.exports), t.exports);
  })(function (e, r) {
    var n = t && t.__importDefault || (function (e) {
      return e && e.__esModule ? e : {
        default: e
      };
    });
    Object.defineProperty(r, "__esModule", {
      value: !0
    });
    var o = n(Y);
    function i(e) {
      for (var t = {}, r = function (e, r) {
        t[e] = function (e, t) {
          return "object" == typeof e ? o.default(e, function (e) {
            r(e, t);
          }) : r(e, t);
        };
      }, n = 0, i = Object.entries(e); n < i.length; n++) {
        var u = i[n];
        r(u[0], u[1]);
      }
      return L.combineReducers(t);
    }
    r.default = function () {
      return {
        config: {
          redux: {
            combineReducers: i
          }
        }
      };
    };
  }), G = (K = B) && K.__esModule && Object.prototype.hasOwnProperty.call(K, "default") ? K.default : K;
  (e.default = G, Object.defineProperty(e, "__esModule", {
    value: !0
  }));
});

});
	___scope___.entry = "dist/rematch-immer.umd.js";
})
FuseBox.pkg("redux", {}, function(___scope___){
___scope___.file("es/redux.js", function(exports, require, module){
var process = require("process");
const __req1__ = require("symbol-observable");
var randomString = function randomString() {
  return Math.random().toString(36).substring(7).split("").join(".");
};
var ActionTypes = {
  INIT: "@@redux/INIT" + randomString(),
  REPLACE: "@@redux/REPLACE" + randomString(),
  PROBE_UNKNOWN_ACTION: function PROBE_UNKNOWN_ACTION() {
    return "@@redux/PROBE_UNKNOWN_ACTION" + randomString();
  }
};
function isPlainObject(obj) {
  if (typeof obj !== "object" || obj === null) return false;
  var proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(obj) === proto;
}
function createStore(reducer, preloadedState, enhancer) {
  var _ref2;
  if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") {
    throw new Error("It looks like you are passing several store enhancers to " + "createStore(). This is not supported. Instead, compose them " + "together to a single function.");
  }
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (typeof enhancer !== "undefined") {
    if (typeof enhancer !== "function") {
      throw new Error("Expected the enhancer to be a function.");
    }
    return enhancer(createStore)(reducer, preloadedState);
  }
  if (typeof reducer !== "function") {
    throw new Error("Expected the reducer to be a function.");
  }
  var currentReducer = reducer;
  var currentState = preloadedState;
  var currentListeners = [];
  var nextListeners = currentListeners;
  var isDispatching = false;
  function ensureCanMutateNextListeners() {
    if (nextListeners === currentListeners) {
      nextListeners = currentListeners.slice();
    }
  }
  function getState() {
    if (isDispatching) {
      throw new Error("You may not call store.getState() while the reducer is executing. " + "The reducer has already received the state as an argument. " + "Pass it down from the top reducer instead of reading it from the store.");
    }
    return currentState;
  }
  function subscribe(listener) {
    if (typeof listener !== "function") {
      throw new Error("Expected the listener to be a function.");
    }
    if (isDispatching) {
      throw new Error("You may not call store.subscribe() while the reducer is executing. " + "If you would like to be notified after the store has been updated, subscribe from a " + "component and invoke store.getState() in the callback to access the latest state. " + "See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
    }
    var isSubscribed = true;
    ensureCanMutateNextListeners();
    nextListeners.push(listener);
    return function unsubscribe() {
      if (!isSubscribed) {
        return;
      }
      if (isDispatching) {
        throw new Error("You may not unsubscribe from a store listener while the reducer is executing. " + "See https://redux.js.org/api-reference/store#subscribe(listener) for more details.");
      }
      isSubscribed = false;
      ensureCanMutateNextListeners();
      var index = nextListeners.indexOf(listener);
      nextListeners.splice(index, 1);
    };
  }
  function dispatch(action) {
    if (!isPlainObject(action)) {
      throw new Error("Actions must be plain objects. " + "Use custom middleware for async actions.");
    }
    if (typeof action.type === "undefined") {
      throw new Error("Actions may not have an undefined \"type\" property. " + "Have you misspelled a constant?");
    }
    if (isDispatching) {
      throw new Error("Reducers may not dispatch actions.");
    }
    try {
      isDispatching = true;
      currentState = currentReducer(currentState, action);
    } finally {
      isDispatching = false;
    }
    var listeners = currentListeners = nextListeners;
    for (var i = 0; i < listeners.length; i++) {
      var listener = listeners[i];
      listener();
    }
    return action;
  }
  function replaceReducer(nextReducer) {
    if (typeof nextReducer !== "function") {
      throw new Error("Expected the nextReducer to be a function.");
    }
    currentReducer = nextReducer;
    dispatch({
      type: ActionTypes.REPLACE
    });
  }
  function observable() {
    var _ref;
    var outerSubscribe = subscribe;
    return (_ref = {
      subscribe: function subscribe(observer) {
        if (typeof observer !== "object" || observer === null) {
          throw new TypeError("Expected the observer to be an object.");
        }
        function observeState() {
          if (observer.next) {
            observer.next(getState());
          }
        }
        observeState();
        var unsubscribe = outerSubscribe(observeState);
        return {
          unsubscribe: unsubscribe
        };
      }
    }, _ref[__req1__.default] = function () {
      return this;
    }, _ref);
  }
  dispatch({
    type: ActionTypes.INIT
  });
  return (_ref2 = {
    dispatch: dispatch,
    subscribe: subscribe,
    getState: getState,
    replaceReducer: replaceReducer
  }, _ref2[__req1__.default] = observable, _ref2);
}
function warning(message) {
  if (typeof console !== "undefined" && typeof console.error === "function") {
    console.error(message);
  }
  try {
    throw new Error(message);
  } catch (e) {}
}
function getUndefinedStateErrorMessage(key, action) {
  var actionType = action && action.type;
  var actionDescription = actionType && "action \"" + String(actionType) + "\"" || "an action";
  return "Given " + actionDescription + ", reducer \"" + key + "\" returned undefined. " + "To ignore an action, you must explicitly return the previous state. " + "If you want this reducer to hold no value, you can return null instead of undefined.";
}
function getUnexpectedStateShapeWarningMessage(inputState, reducers, action, unexpectedKeyCache) {
  var reducerKeys = Object.keys(reducers);
  var argumentName = action && action.type === ActionTypes.INIT ? "preloadedState argument passed to createStore" : "previous state received by the reducer";
  if (reducerKeys.length === 0) {
    return "Store does not have a valid reducer. Make sure the argument passed " + "to combineReducers is an object whose values are reducers.";
  }
  if (!isPlainObject(inputState)) {
    return "The " + argumentName + " has unexpected type of \"" + ({}).toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] + "\". Expected argument to be an object with the following " + ("keys: \"" + reducerKeys.join("\", \"") + "\"");
  }
  var unexpectedKeys = Object.keys(inputState).filter(function (key) {
    return !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key];
  });
  unexpectedKeys.forEach(function (key) {
    unexpectedKeyCache[key] = true;
  });
  if (action && action.type === ActionTypes.REPLACE) return;
  if (unexpectedKeys.length > 0) {
    return "Unexpected " + (unexpectedKeys.length > 1 ? "keys" : "key") + " " + ("\"" + unexpectedKeys.join("\", \"") + "\" found in " + argumentName + ". ") + "Expected to find one of the known reducer keys instead: " + ("\"" + reducerKeys.join("\", \"") + "\". Unexpected keys will be ignored.");
  }
}
function assertReducerShape(reducers) {
  Object.keys(reducers).forEach(function (key) {
    var reducer = reducers[key];
    var initialState = reducer(undefined, {
      type: ActionTypes.INIT
    });
    if (typeof initialState === "undefined") {
      throw new Error("Reducer \"" + key + "\" returned undefined during initialization. " + "If the state passed to the reducer is undefined, you must " + "explicitly return the initial state. The initial state may " + "not be undefined. If you don't want to set a value for this reducer, " + "you can use null instead of undefined.");
    }
    if (typeof reducer(undefined, {
      type: ActionTypes.PROBE_UNKNOWN_ACTION()
    }) === "undefined") {
      throw new Error("Reducer \"" + key + "\" returned undefined when probed with a random type. " + ("Don't try to handle " + ActionTypes.INIT + " or other actions in \"redux/*\" ") + "namespace. They are considered private. Instead, you must return the " + "current state for any unknown actions, unless it is undefined, " + "in which case you must return the initial state, regardless of the " + "action type. The initial state may not be undefined, but can be null.");
    }
  });
}
function combineReducers(reducers) {
  var reducerKeys = Object.keys(reducers);
  var finalReducers = {};
  for (var i = 0; i < reducerKeys.length; i++) {
    var key = reducerKeys[i];
    if (process.env.NODE_ENV !== "production") {
      if (typeof reducers[key] === "undefined") {
        warning("No reducer provided for key \"" + key + "\"");
      }
    }
    if (typeof reducers[key] === "function") {
      finalReducers[key] = reducers[key];
    }
  }
  var finalReducerKeys = Object.keys(finalReducers);
  var unexpectedKeyCache;
  if (process.env.NODE_ENV !== "production") {
    unexpectedKeyCache = {};
  }
  var shapeAssertionError;
  try {
    assertReducerShape(finalReducers);
  } catch (e) {
    shapeAssertionError = e;
  }
  return function combination(state, action) {
    if (state === void 0) {
      state = {};
    }
    if (shapeAssertionError) {
      throw shapeAssertionError;
    }
    if (process.env.NODE_ENV !== "production") {
      var warningMessage = getUnexpectedStateShapeWarningMessage(state, finalReducers, action, unexpectedKeyCache);
      if (warningMessage) {
        warning(warningMessage);
      }
    }
    var hasChanged = false;
    var nextState = {};
    for (var _i = 0; _i < finalReducerKeys.length; _i++) {
      var _key = finalReducerKeys[_i];
      var reducer = finalReducers[_key];
      var previousStateForKey = state[_key];
      var nextStateForKey = reducer(previousStateForKey, action);
      if (typeof nextStateForKey === "undefined") {
        var errorMessage = getUndefinedStateErrorMessage(_key, action);
        throw new Error(errorMessage);
      }
      nextState[_key] = nextStateForKey;
      hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
    }
    return hasChanged ? nextState : state;
  };
}
function bindActionCreator(actionCreator, dispatch) {
  return function () {
    return dispatch(actionCreator.apply(this, arguments));
  };
}
function bindActionCreators(actionCreators, dispatch) {
  if (typeof actionCreators === "function") {
    return bindActionCreator(actionCreators, dispatch);
  }
  if (typeof actionCreators !== "object" || actionCreators === null) {
    throw new Error("bindActionCreators expected an object or a function, instead received " + (actionCreators === null ? "null" : typeof actionCreators) + ". " + "Did you write \"import ActionCreators from\" instead of \"import * as ActionCreators from\"?");
  }
  var boundActionCreators = {};
  for (var key in actionCreators) {
    var actionCreator = actionCreators[key];
    if (typeof actionCreator === "function") {
      boundActionCreators[key] = bindActionCreator(actionCreator, dispatch);
    }
  }
  return boundActionCreators;
}
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
function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);
  if (Object.getOwnPropertySymbols) {
    keys.push.apply(keys, Object.getOwnPropertySymbols(object));
  }
  if (enumerableOnly) keys = keys.filter(function (sym) {
    return Object.getOwnPropertyDescriptor(object, sym).enumerable;
  });
  return keys;
}
function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};
    if (i % 2) {
      ownKeys(source, true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(source).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }
  return target;
}
function compose() {
  for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) {
    funcs[_key] = arguments[_key];
  }
  if (funcs.length === 0) {
    return function (arg) {
      return arg;
    };
  }
  if (funcs.length === 1) {
    return funcs[0];
  }
  return funcs.reduce(function (a, b) {
    return function () {
      return a(b.apply(void 0, arguments));
    };
  });
}
function applyMiddleware() {
  for (var _len = arguments.length, middlewares = new Array(_len), _key = 0; _key < _len; _key++) {
    middlewares[_key] = arguments[_key];
  }
  return function (createStore) {
    return function () {
      var store = createStore.apply(void 0, arguments);
      var _dispatch = function dispatch() {
        throw new Error("Dispatching while constructing your middleware is not allowed. " + "Other middleware would not be applied to this dispatch.");
      };
      var middlewareAPI = {
        getState: store.getState,
        dispatch: function dispatch() {
          return _dispatch.apply(void 0, arguments);
        }
      };
      var chain = middlewares.map(function (middleware) {
        return middleware(middlewareAPI);
      });
      _dispatch = compose.apply(void 0, chain)(store.dispatch);
      return _objectSpread2({}, store, {
        dispatch: _dispatch
      });
    };
  };
}
function isCrushed() {}
if (process.env.NODE_ENV !== "production" && typeof isCrushed.name === "string" && isCrushed.name !== "isCrushed") {
  warning("You are currently using minified code outside of NODE_ENV === \"production\". " + "This means that you are running a slower development build of Redux. " + "You can use loose-envify (https://github.com/zertosh/loose-envify) for browserify " + "or setting mode to production in webpack (https://webpack.js.org/concepts/mode/) " + "to ensure you have the correct code for your production build.");
}
module.exports.__DO_NOT_USE__ActionTypes = ActionTypes;
module.exports.applyMiddleware = applyMiddleware;
module.exports.bindActionCreators = bindActionCreators;
module.exports.combineReducers = combineReducers;
module.exports.compose = compose;
module.exports.createStore = createStore;

});
	___scope___.entry = "es/redux.js";
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
FuseBox.pkg("symbol-observable", {}, function(___scope___){
___scope___.file("es/index.js", function(exports, require, module){
const __req1__ = require("./ponyfill.js");
var root;
if (typeof self !== "undefined") {
  root = self;
} else if (typeof window !== "undefined") {
  root = window;
} else if (typeof global !== "undefined") {
  root = global;
} else if (typeof module !== "undefined") {
  root = module;
} else {
  root = Function("return this")();
}
var result = __req1__.default(root);
module.exports.default = result;

});
___scope___.file("es/ponyfill.js", function(exports, require, module){
function symbolObservablePonyfill(root) {
  var result;
  var Symbol = root.Symbol;
  if (typeof Symbol === "function") {
    if (Symbol.observable) {
      result = Symbol.observable;
    } else {
      result = Symbol("observable");
      Symbol.observable = result;
    }
  } else {
    result = "@@observable";
  }
  return result;
}
;
module.exports.default = symbolObservablePonyfill;

});
	___scope___.entry = "es/index.js";
})