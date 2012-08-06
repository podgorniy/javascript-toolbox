function simulate_mouse_events (node, mouseEvent) {
	var options,
		oEvent;

	options = {
		pointerX: 0,
		pointerY: 0,
		clientX : 0,
		clientY : 0,
		button: 0,
		ctrlKey: false,
		altKey: false,
		shiftKey: false,
		metaKey: false,
		bubbles: true,
		cancelable: true
	};

	if (document.createEvent) {
		oEvent = document.createEvent('MouseEvents');
		oEvent.initMouseEvent(mouseEvent, options.bubbles, options.cancelable, document.defaultView, options.button, options.pointerX, options.pointerY, options.pointerX, options.pointerY, options.ctrlKey, options.altKey, options.shiftKey, options.metaKey, options.button, node);
		node.dispatchEvent(oEvent);
	} else {
		var msEvent = document.createEventObject();
		for (var eventPropName in options) {
			msEvent[eventPropName] = options[eventPropName];
		}
		node.fireEvent('on' + mouseEvent, msEvent);
	}
}
