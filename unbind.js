function unbind (obj, event_name, handler) {
	if (obj.removeEventListener) {
		obj.removeEventListener(event_name, handler, false);
	} else {
		obj.detachEvent('on' + event_name, handler);
	}
}