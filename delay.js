function delay (func, time) {
	return function () {
		var args, self;

		args = arguments;
		self = this;
		return setTimeout(function () {
			func.apply(self, args);
		}, time || 0);
	};
}
