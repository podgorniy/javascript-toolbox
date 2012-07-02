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
