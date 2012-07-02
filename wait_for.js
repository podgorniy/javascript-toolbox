// TOFO make code pretty
/*global mmcore:true*/
function wait_for (condition, callback, timeout, interval, on_fail) {
	var control;


	control = {
		_timeout : null,
		stop : function () {
			clearTimeout(this._timeout);
			if (on_fail) {
				on_fail();
			}
		}
	};
	interval = interval || 50;
	(function waiter () {
		var condition_result;

		try {
			condition_result = condition();
		} catch (err) {
			mmcore.EH(err);
		}

		if (condition_result) {
			callback();
		} else {
			control._timeout = setTimeout(waiter, interval);
		}
	}());

	if (timeout) {
		setTimeout(function () {
			control.stop();
		}, timeout);
	}

	return control;
}
