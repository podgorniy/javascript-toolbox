var mediator = (function() {
	'use strict';

	var handlers;
	var events;

	handlers = [];
	events = [];
	return {
		subscribe: function(event_name, handler) {
			var event_index;

			event_index = events.indexOf(event_name);
			if(event_index === -1) {
				event_index = (events.push(event_name) - 1);
			}

			if(!handlers[event_index]) {
				handlers[event_index] = [];
			}
			handlers[event_index].push(handler);
		},
		publish: function(event_name, data) {
			var event_index;
			var i;

			event_index = events.indexOf(event_name);
			if(event_index === -1) {
				return false;
			} else {
				handlers[event_index].forEach(function(handler) {
					handler(data, event_name);
				});
			}
		}
	};
}());
