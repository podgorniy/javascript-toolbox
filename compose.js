function compose() {
	var composed;

	composed = arguments;
	return function() {
		var res;

		res = arguments;
		for (var i = 0; i < composed.length; i += 1) {
			res = composed.apply(this, res);
		}
		return res;
	};
}