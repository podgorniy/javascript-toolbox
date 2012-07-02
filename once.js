function once (func) {
	var fired;
	return function () {
		if (!fired) {
			fired = false;
			return func.apply(this, arguments);
		}
	};
}
