var ce = (function () {
	var event_storage,
		global_context;

	event_storage = {};
	global_context = this;

	function index_of (arr, el) {
		var io,
			i;

		io = Array.prototype.indexOf;
		if (io) {
			return io.call(arr, el);
		} else {
			for (i = 0; i < arr.length; i += 1) {
				if (el === arr[i]) {
					return i;
				}
			}
		}
	}

	function watch (event_name, callback) {
		if (!event_storage[event_name]) {
			event_storage[event_name] = [];
		}
		event_storage[event_name].push(callback);
	}

	function unwatch (event_name, callback) {
		var event_callbacks,
			callback_position;

		event_callbacks = event_storage[event_name];
		if (event_callbacks) {
			if (callback) {
				callback_position = index_of(event_callbacks, callback);
				if (callback_position !== -1) {
					event_callbacks.splice(callback_position, 1);
					if (!event_callbacks.length) {
						delete event_storage[event_name];
					}
					return true;
				}
			} else {
				delete event_storage[event_name];
				return true;
			}
		}
		return false;
	}

	function fire (event_name, data) {
		var event_callbacks,
			i;

		event_callbacks = event_storage[event_name];
		if (event_callbacks) {
			for (i = 0; i < event_callbacks.length; i += 1) {
				event_callbacks[i].call(global_context, data);
			}
		}
	}

	return {
		watch : watch,
		unwatch : unwatch,
		fire : fire,
		_event_storage : event_storage
	};
}());