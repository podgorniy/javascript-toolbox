/*
	Delegate handler to parent DOM node. Example of use

	delegate(document.body, 'click', function(el) {
		return el.nodeName === 'SPAN'
	}, function() {
		console.info(this, arguments)
	});
*/
function delegate (el, event_name, test, handler) {
	var hadler_wrapper;

	hadler_wrapper = function (event) {
		var event = event || window.event,
			target = event.target || event.srcElement;

		while ( target !== el ) {
			if ( test(target) ) {
				handler.call(el, event);
			}
			target = target.parentNode;
		}
	};

	if (el.addEventListener) {
		el.addEventListener(event_name, hadler_wrapper, false);
	} else if (el.attachEvent) {
		el.attachEvent('on' + event_name, hadler_wrapper);
	}
}
