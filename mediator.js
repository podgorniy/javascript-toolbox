var mediator = (function () {
	'use strict';
	var events;

	events = {};
	return {
		subscribe : function (event_name, callback) {
			if (!events[event_name]) {
				events[event_name] = [];
			}
			events[event_name].push(callback);
		},

		unsubscribe : function (event_name, callback_) {
			if (arguments.length === 1) {
				delete events[event_name];
			} else {
				if (events[event_name]) {
					events[event_name] = events[event_name].filter(function (callback) {
						return callback !== callback_;
					});
				}
			}
		},

		publish : function (event_name, data) {
			var callbacks;
			var i;

			callbacks = events[event_name];
			if (callbacks && callbacks.length) {
				for (i = 0; i < callbacks.length; i += 1) {
					callbacks[i].call(undefined, data);
				}
			}
		}
	}
}());
