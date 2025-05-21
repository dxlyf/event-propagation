var __defProp = Object.defineProperty;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __publicField = (obj, key, value) => __defNormalProp(obj, typeof key !== "symbol" ? key + "" : key, value);
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
var eventemitter3 = { exports: {} };
var hasRequiredEventemitter3;
function requireEventemitter3() {
  if (hasRequiredEventemitter3) return eventemitter3.exports;
  hasRequiredEventemitter3 = 1;
  (function(module) {
    var has = Object.prototype.hasOwnProperty, prefix = "~";
    function Events() {
    }
    if (Object.create) {
      Events.prototype = /* @__PURE__ */ Object.create(null);
      if (!new Events().__proto__) prefix = false;
    }
    function EE(fn, context, once) {
      this.fn = fn;
      this.context = context;
      this.once = once || false;
    }
    function addListener(emitter, event, fn, context, once) {
      if (typeof fn !== "function") {
        throw new TypeError("The listener must be a function");
      }
      var listener = new EE(fn, context || emitter, once), evt = prefix ? prefix + event : event;
      if (!emitter._events[evt]) emitter._events[evt] = listener, emitter._eventsCount++;
      else if (!emitter._events[evt].fn) emitter._events[evt].push(listener);
      else emitter._events[evt] = [emitter._events[evt], listener];
      return emitter;
    }
    function clearEvent(emitter, evt) {
      if (--emitter._eventsCount === 0) emitter._events = new Events();
      else delete emitter._events[evt];
    }
    function EventEmitter2() {
      this._events = new Events();
      this._eventsCount = 0;
    }
    EventEmitter2.prototype.eventNames = function eventNames() {
      var names = [], events, name;
      if (this._eventsCount === 0) return names;
      for (name in events = this._events) {
        if (has.call(events, name)) names.push(prefix ? name.slice(1) : name);
      }
      if (Object.getOwnPropertySymbols) {
        return names.concat(Object.getOwnPropertySymbols(events));
      }
      return names;
    };
    EventEmitter2.prototype.listeners = function listeners(event) {
      var evt = prefix ? prefix + event : event, handlers = this._events[evt];
      if (!handlers) return [];
      if (handlers.fn) return [handlers.fn];
      for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
        ee[i] = handlers[i].fn;
      }
      return ee;
    };
    EventEmitter2.prototype.listenerCount = function listenerCount(event) {
      var evt = prefix ? prefix + event : event, listeners = this._events[evt];
      if (!listeners) return 0;
      if (listeners.fn) return 1;
      return listeners.length;
    };
    EventEmitter2.prototype.emit = function emit(event, a1, a2, a3, a4, a5) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return false;
      var listeners = this._events[evt], len = arguments.length, args, i;
      if (listeners.fn) {
        if (listeners.once) this.removeListener(event, listeners.fn, void 0, true);
        switch (len) {
          case 1:
            return listeners.fn.call(listeners.context), true;
          case 2:
            return listeners.fn.call(listeners.context, a1), true;
          case 3:
            return listeners.fn.call(listeners.context, a1, a2), true;
          case 4:
            return listeners.fn.call(listeners.context, a1, a2, a3), true;
          case 5:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4), true;
          case 6:
            return listeners.fn.call(listeners.context, a1, a2, a3, a4, a5), true;
        }
        for (i = 1, args = new Array(len - 1); i < len; i++) {
          args[i - 1] = arguments[i];
        }
        listeners.fn.apply(listeners.context, args);
      } else {
        var length = listeners.length, j;
        for (i = 0; i < length; i++) {
          if (listeners[i].once) this.removeListener(event, listeners[i].fn, void 0, true);
          switch (len) {
            case 1:
              listeners[i].fn.call(listeners[i].context);
              break;
            case 2:
              listeners[i].fn.call(listeners[i].context, a1);
              break;
            case 3:
              listeners[i].fn.call(listeners[i].context, a1, a2);
              break;
            case 4:
              listeners[i].fn.call(listeners[i].context, a1, a2, a3);
              break;
            default:
              if (!args) for (j = 1, args = new Array(len - 1); j < len; j++) {
                args[j - 1] = arguments[j];
              }
              listeners[i].fn.apply(listeners[i].context, args);
          }
        }
      }
      return true;
    };
    EventEmitter2.prototype.on = function on(event, fn, context) {
      return addListener(this, event, fn, context, false);
    };
    EventEmitter2.prototype.once = function once(event, fn, context) {
      return addListener(this, event, fn, context, true);
    };
    EventEmitter2.prototype.removeListener = function removeListener(event, fn, context, once) {
      var evt = prefix ? prefix + event : event;
      if (!this._events[evt]) return this;
      if (!fn) {
        clearEvent(this, evt);
        return this;
      }
      var listeners = this._events[evt];
      if (listeners.fn) {
        if (listeners.fn === fn && (!once || listeners.once) && (!context || listeners.context === context)) {
          clearEvent(this, evt);
        }
      } else {
        for (var i = 0, events = [], length = listeners.length; i < length; i++) {
          if (listeners[i].fn !== fn || once && !listeners[i].once || context && listeners[i].context !== context) {
            events.push(listeners[i]);
          }
        }
        if (events.length) this._events[evt] = events.length === 1 ? events[0] : events;
        else clearEvent(this, evt);
      }
      return this;
    };
    EventEmitter2.prototype.removeAllListeners = function removeAllListeners(event) {
      var evt;
      if (event) {
        evt = prefix ? prefix + event : event;
        if (this._events[evt]) clearEvent(this, evt);
      } else {
        this._events = new Events();
        this._eventsCount = 0;
      }
      return this;
    };
    EventEmitter2.prototype.off = EventEmitter2.prototype.removeListener;
    EventEmitter2.prototype.addListener = EventEmitter2.prototype.on;
    EventEmitter2.prefixed = prefix;
    EventEmitter2.EventEmitter = EventEmitter2;
    {
      module.exports = EventEmitter2;
    }
  })(eventemitter3);
  return eventemitter3.exports;
}
var eventemitter3Exports = requireEventemitter3();
const EventEmitter = /* @__PURE__ */ getDefaultExportFromCjs(eventemitter3Exports);
const EventPhase = {
  NONE: 0,
  CAPTURING_PHASE: 1,
  AT_TARGET: 2,
  BUBBLING_PHASE: 3
};
const NONE = EventPhase.NONE;
const CAPTURING_PHASE = EventPhase.CAPTURING_PHASE;
const AT_TARGET = EventPhase.AT_TARGET;
const BUBBLING_PHASE = EventPhase.BUBBLING_PHASE;
class Event {
  // Stop bubbles immediately
  constructor(type, bubbles, cancelable) {
    __publicField(this, "type", "none");
    __publicField(this, "parentNode", null);
    __publicField(this, "target", null);
    __publicField(this, "currentTarget", null);
    __publicField(this, "data", null);
    __publicField(this, "eventPhase", NONE);
    __publicField(this, "bubbles", false);
    // Does it support bubbling
    __publicField(this, "cancelable", false);
    // Is it possible to block default behavior
    __publicField(this, "defaultPrevented", false);
    // Whether to block by default
    __publicField(this, "cancelBubble", false);
    // Whether to stop bubbles
    __publicField(this, "immediateCancelBubble", false);
    this.initEvent(type, bubbles, cancelable);
  }
  static create(type, bubbles, cancelable) {
    return new this(type, bubbles, cancelable);
  }
  setData(data) {
    this.data = data;
    return this;
  }
  initEvent(type, bubbles = true, cancelable = true) {
    this.type = type;
    this.bubbles = bubbles;
    this.cancelable = cancelable;
  }
  /**
   * 
   * @returns {EventTarget[]}
   */
  composedPath() {
    let current = this.currentTarget;
    let composePath = [];
    while (current) {
      composePath.push(current);
      current = current.parentNode;
    }
    return composePath;
  }
  preventDefault() {
    if (this.cancelable) {
      this.defaultPrevented = true;
    }
  }
  stopPropagation() {
    this.cancelBubble = true;
  }
  stopImmediatePropagation() {
    this.stopPropagation();
    this.immediateCancelBubble = true;
  }
}
function getOptions(options) {
  if (typeof options === "boolean" || !options) {
    options = {
      capture: !!options
    };
  }
  options = { capture: false, once: false, ...options || {} };
  return options;
}
function getEmitterListenerEvents(emitter, evt) {
  var handlers = emitter._events[evt], ee;
  if (!handlers) return [];
  if (handlers.fn) return [handlers];
  for (var i = 0, l = handlers.length, ee = new Array(l); i < l; i++) {
    ee[i] = handlers[i];
  }
  return ee;
}
class EventTarget {
  constructor() {
    __publicField(this, "parentNode", null);
    __publicField(this, "_bubble_emitter", new EventEmitter());
    __publicField(this, "_capture_emitter", new EventEmitter());
  }
  addEventListener(type, fn, options) {
    options = getOptions(options);
    const emitter = options.capture ? this._capture_emitter : this._bubble_emitter;
    if (options && options.once) {
      emitter.once(type, fn);
    } else {
      emitter.on(type, fn);
    }
  }
  removeEventListener(type, fn, options) {
    options = getOptions(options);
    const emitter = options.capture ? this._capture_emitter : this._bubble_emitter;
    emitter.off(type, fn);
  }
  /**
   * 
   * @param {Event} e 
   */
  dispatchEvent(e) {
    e.currentTarget = this;
    const type = e.type;
    const nodePath = e.composedPath();
    const nodePathLength = nodePath.length;
    for (let i = nodePathLength - 1; i >= 0; i--) {
      const emitter = nodePath[i]._capture_emitter;
      const listenerCount = emitter.listenerCount(type);
      if (listenerCount > 0) {
        e.target = nodePath[i];
        e.eventPhase = e.target !== this ? CAPTURING_PHASE : AT_TARGET;
        const listeners = getEmitterListenerEvents(emitter, type);
        for (let j = 0, len = listeners.length; j < len; j++) {
          const event = listeners[j];
          if (event.once) {
            emitter.removeListener(type, event.fn, event.context, event.once);
          }
          event.fn(e);
          if (e.immediateCancelBubble) {
            break;
          }
        }
      }
      if (e.cancelBubble) {
        break;
      }
    }
    if (!e.cancelBubble) {
      for (let i = 0; i < nodePathLength; i++) {
        const emitter = nodePath[i]._bubble_emitter;
        const listenerCount = emitter.listenerCount(type);
        if (listenerCount > 0) {
          e.target = nodePath[i];
          e.eventPhase = e.target !== this ? BUBBLING_PHASE : AT_TARGET;
          const listeners = getEmitterListenerEvents(emitter, type);
          for (let j = 0, len = listeners.length; j < len; j++) {
            const event = listeners[j];
            if (event.once) {
              emitter.removeListener(type, event.fn, event.context, event.once);
            }
            event.fn(e);
            if (e.immediateCancelBubble) {
              break;
            }
          }
        }
        if (e.cancelBubble || !e.bubbles) {
          break;
        }
      }
    }
    e.eventPhase = NONE;
    return !e.defaultPrevented;
  }
  removeAllListeners() {
    this._bubble_emitter.removeAllListeners();
    this._capture_emitter.removeAllListeners();
  }
}
EventTarget.prototype.on = EventTarget.prototype.addEventListener;
EventTarget.prototype.off = EventTarget.prototype.removeEventListener;
EventTarget.prototype.emit = EventTarget.prototype.dispatchEvent;
export {
  AT_TARGET,
  BUBBLING_PHASE,
  CAPTURING_PHASE,
  Event,
  EventTarget as EventEmitter4,
  EventPhase,
  EventTarget,
  NONE
};
