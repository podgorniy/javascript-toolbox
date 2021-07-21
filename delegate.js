/*
	Delegate handler to parent DOM node. Example of use

	delegate(document.body, 'click', function(el) {
		return el.nodeName === 'SPAN'
	}, function() {
		console.info(this, arguments)
	});
*/
function delegate (handlerNode, eventName, handlerCondition, handler) {
	var hadlerWrapper;

	hadlerWrapper = function (event) {
		var target;

		event = event || window.event;
		target = event.target || event.srcElement;
		while (target !== handlerNode) {
			if (handlerCondition(target)) {
				handler.call(target, event);
			}
			target = target.parentNode;
		}
	};

	if (handlerNode.addEventListener) {
		handlerNode.addEventListener(eventName, hadlerWrapper, false);
	} else if (handlerNode.attachEvent) {
		handlerNode.attachEvent('on' + eventName, hadlerWrapper);
	}
}
