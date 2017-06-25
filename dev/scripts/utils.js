'use strict';

/**
 * Полифилл matches
 */
(function() {
    if (!Element.prototype.matches) {
        Element.prototype.matches =
            Element.prototype.matchesSelector ||
            Element.prototype.webkitMatchesSelector ||
            Element.prototype.mozMatchesSelector ||
            Element.prototype.msMatchesSelector;
    }
})();

/**
 * Полифилл closest
 */
(function(el) {
    if (!el.prototype.closest) {
        el.prototype.closest = function(css) {
            let node = this;
            while (node) {
                if (node.matches(css)) return node;
                else node = node.parentElement;
            }
            return null;
        };
    }
})(Element);

/**
 * Полифилл forEach
 */
(function(array, nodeList) {
    if (!array.prototype.forEach || !nodeList.prototype.forEach) {
        array.prototype.forEach = nodeList.prototype.forEach = function(callback, thisArg) {
            if (this === null) throw new TypeError(' this is null or not defined');
            if (typeof callback !== 'function') throw new TypeError(callback + ' is not a function');

            let T,
                k = 0,
                O = Object(this),
                len = O.length >>> 0;

            if (arguments.length > 1) T = thisArg;

            while (k < len) {
                let kValue;
                if (k in O) {
                    kValue = O[k];
                    callback.call(T, kValue, k, O);
                }
                k++;
            }
        }
    }
})(Array, NodeList);

/**
 * Вешаем обработчик на ребенка элемента
 * @param children DOM children element
 * @param eventName str event name
 * @param handler callback
 * @param eventDive boolean; default = false
 */
(function(node) {
    node.prototype.delegate = function(eventName, children, handler, eventDive) {
        let element = this;

        children = (function(value) {
            if (children.nodeType)
                return children;
            if (typeof value === 'string')
                return element.querySelectorAll(value);
            return undefined;
        })(children);

        if (!children) throw new Error('Аргумент children должен быть элементом или строкой.');

        if (node.prototype.addEventListener) {
            eventDive = eventDive || false;
            return node.prototype.addEventListener.call(element, eventName, function(e) {
                let target = e.target;
                if (children instanceof NodeList) {
                    children.forEach((item) => {
                        if (target === item) return handler.call(self, e);
                    });
                } else if (target !== children) return handler.call(self, e);
            }, eventDive);
        } else if (node.prototype.attachEvent) {
            return node.prototype.attachEvent.call(element, eventName, function(e) {
                if (e.target || e.srcElement !== children) return;
                handler.call(this);
            }, eventDive);
        }
    };
})(Node);

/**
 * Сокращение вызова console.log
 * на log
 */
(function(log) { window.log = log; })(console.log);

/**
 * Удаляем обработчик на элемент
 * @param eventName str event name
 * @param handler callback
 * @param eventDive boolean; default = false
 */
(function(node) {
    node.prototype.off = function(eventName, handler, eventDive) {
        let element = this;
        if (node.prototype.removeEventListener) {
            eventDive = eventDive || false;
            return node.prototype.removeEventListener.call(element, eventName, handler, eventDive);
        } else if (node.prototype.dispatchEvent)
            return node.prototype.dispatchEvent.call(element, 'on' + eventName, handler);
    };
})(Node);

/**
 * Вешаем обработчик на элемент
 * @param eventName str event name
 * @param handler callback
 * @param eventDive boolean; default = false
 */
(function(node) {
    node.prototype.on = function(eventName, handler, eventDive) {
        let element = this;
        if (node.prototype.addEventListener) {
            eventDive = eventDive || false;
            return element.addEventListener.call(element, eventName, handler, eventDive);
        } else if (node.prototype.attachEvent) {
            if (eventName === 'DOMContentLoaded') return;
            return node.attachEvent.call(element, 'on' + eventName, handler);
        }
    };
})(Node);

/**
 * Обертка для функций,
 * которые будут вызваны
 * когда документ загрузится
 */
window.whenReady = (function() {
    let funcs = [],
        ready = false;

    function handler(e) {
        if (ready) return;
        if (e.type === 'readystatechange' &&
            document.readyState !== 'complete') return;

        for (let i = 0; i < funcs.length; i++) funcs[i].call(document);

        ready = true;
        funcs = null;
    }

    document.on('DOMContentLoaded', handler);
    document.on('readystatechange', handler);
    // window.on('load', handler);

    return function whenReady(func) {
        if (ready) func.call(document);
        else funcs.push(func);
    }
})();