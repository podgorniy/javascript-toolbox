// TODO write with first sync call posibility
function planned (func, delay) {
	var was_planned,
		timer;

	was_planned = false;
	return function () {
		if (!was_planned) {
			timer = setTimeout(function () {
				func();
				was_planned = false;
			}, delay || 0);
		}
		was_planned = true;
		return timer;
	};
}
