/*
	ie8+, ff, chrome

	Example of use
	event_manager.live('div a', 'click', function () {
		console.log(this.href + ' click');
	});
*/

var event_manager = (function () {
	"use strict";

	var public_methods,
		index_of,
		bindings;

	public_methods = {};
	bindings = {};

	// returns index of the element
	index_of = (function () {
		var io;

		io = Array.prototype.indexOf;
		if (io) {
			return function (el, arr) {
				return io.call(arr, el);
			};
		} else {
			return function (el, arr) {
				var i;

				for (i = 0; i < arr.length; i += 1) {
					if (el === arr[i]) {
						return i;
					}
				}
				return -1;
			};
		}
	}());

	// you can modify it as deep, as you want
	function bind (obj, eventName, handler) {
		var handler_wrapper = function (event) {
			event = event || window.event;
			if (event.srcElement) {
				event.target = event.srcElement;
			}
			return handler.call(obj, event);
		};

		if (obj.addEventListener) {
			obj.addEventListener(eventName, handler_wrapper, false);
		} else if (obj.attachEvent) {
			obj.attachEvent('on' + eventName, handler_wrapper);
		}
		return handler_wrapper;
	}


	function unbind (obj, event_name, handler) {
		if (obj.removeEventListener) {
			obj.removeEventListener(event_name, handler, false);
		} else {
			obj.detachEvent('on' + event_name, handler);
		}
	}


	function is_empty_object (object) {
		var key;

		for (key in object) {
			if (object.hasOwnProperty(key)) {
				return false;
			}
		}
		return true;
	}

	function super_handler (event_name) {
		return function (event) {
			var selector,
				handlers,
				target_node,
				nodes_by_selector,
				i;

			target_node = event.target;
			for (selector in bindings[event_name].handlers) {
				if (bindings[event_name].handlers.hasOwnProperty(selector)) {
					handlers = bindings[event_name].handlers[selector];
					nodes_by_selector = document.querySelectorAll(selector);

					// walk top from the node
					while (target_node) {
						if (index_of(target_node, nodes_by_selector) !== -1) {
							for (i = 0; i < handlers.length; i += 1) {
								handlers[i].call(target_node, event);
							}
							// seek untill first match
							break;
						}
						target_node = target_node.parentNode;
					}

					// start over again
					target_node = event.target;
				}
			}
		};
	}

	function live (selector, event_name, handler) {
		if (!bindings[event_name]) {
			bindings[event_name] = {
				super_handler : bind(document, event_name, super_handler(event_name)),
				handlers : {}
			};
		}
		if (!bindings[event_name].handlers[selector]) {
			bindings[event_name].handlers[selector] = [];
		}
		bindings[event_name].handlers[selector].push(handler);
		return handler;
	}

	function die (selector, event_name, handler) {
		var handler_index;

		if (!handler) {
			// event, selector
			delete bindings[event_name].handlers[selector];
			if (is_empty_object(bindings[event_name].handlers)) {
				unbind(document, event_name, bindings[event_name].super_handler);
				delete bindings[event_name];
			}
		} else {
			// event, selector, handler
			if (bindings[event_name]) {
				handler_index = index_of(handler, bindings[event_name].handlers[selector]);
				if (handler_index !== -1) {
					bindings[event_name].handlers[selector].splice(handler_index, 1);
					if (!bindings[event_name].handlers[selector].length) {
						delete bindings[event_name].handlers[selector];
					}
				}
			}
		}
	}

	public_methods.live = live;
	public_methods.die = die;
	return public_methods;
}());