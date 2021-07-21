function compose() {
	var composed;

	composed = arguments;
	return function(arg) {
		var res;

		res = arg;
		for (var i = 0; i < composed.length; i += 1) {
			res = composed[i].call(this, res);
		}
		return res;
	};
}
