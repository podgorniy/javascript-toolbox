var worker = (function () {
	var stack;
	var callsGap;
	var sinseLastCall;
	var lastCall;

	// functions stack
	stack = [];

	// time between calls
	callsGap = 999;

	// last time when function from stack was processed
	lastCall = 0;

	// async iterator on functions stack
	function processStack () {
		var thisMoment;
		var funcArgsPair;

		thisMoment = now();
		sinseLastCall = thisMoment - lastCall;

		// there are items to process and this function wasn't called 
		// recentrly (less, than callsGap time)
		if (sinseLastCall >= callsGap && stack.length) {

			// remember call time
			lastCall = thisMoment;

			// process first item
			funcArgsPair = stack.shift()();
			funcArgsPair.func.apply(window, funcArgsPair.args);

			// plan next process tick
			// we plan it anyway, in case, new function will
			// be added less, than in callsGap time 
			setTimeout(processStack, callsGap);
		}
	}

	function now () {
		return new Date().getTime();
	}

	function isIsArrayLike (obj) {
		return length in obj && typeof obj !== 'function';
	}

	return function (func, args) {
		stack.push({
			func : func,
			args : isIsArrayLike(args) ? args : [args]
		});
		processStack();
	};
}());