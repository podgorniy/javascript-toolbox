function once (func) {
	var fired;
	return function () {
		if (!fired) {
			fired = true;
			return func.apply(this, arguments);
		}
	};
}
