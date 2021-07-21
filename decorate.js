/*
	Small version
	Adds function before or after another
*/
function decorate (initial, decorate_before, decorate_after) {
	return function () {
		var initial_call_result;

		if (typeof decorate_before === 'function') {
			decorate_before.apply(this, arguments);
		}
		initial_call_result = initial.apply(this, arguments);
		if (typeof decorate_after === 'function') {
			decorate_after.apply(this, arguments);
		}
		return initial_call_result;
	};
}
/*
 Example of use
 document.write = decorate (document.write, function () {
	console.log(this === document);// true;
 }, function () {
	console.log('DOM is updated');
 });

 document.write = decorate (document.write, null, function () {
	console.log('After document.write');
 });
*/

/*
	1. add function before and after modified
	2. change arguments, passed to modified
	3. prevent modified from running
	4. change modified returning value
*/
function decorate (initial, decorate_before, decorate_after) {
	return function () {
		var initial_call_result,
			updated_params,
			updated_result;

		if (typeof decorate_before === 'function') {
			updated_params = decorate_before.apply(this, arguments);
			if (!updated_params) {
				return;
			}
		}
		initial_call_result = initial.apply(this, updated_params || arguments);
		if (typeof decorate_after === 'function') {
			updated_result = decorate_after.apply(this, arguments);
		}
		return updated_result === undefined ? initial_call_result : updated_result;
	};
}
/*
	example

	// add before (logging calls before execution)
	document.write = decorate(document.write, function () {
		console.log('document.write called with', arguments);
		return arguments;
	});

	// add after (logging call after execution)
	document.write = decorate(document.write, null, function () {
		console.log('after document.write');
	});

	// add before and after (profile calls)
	document.write = decorate(document.write, function () {
		console.profile('document.write');
		return arguments;
	}, function () {
		console.profileEnd('document.write');
	});

	// prevent from executing
	document.write = decorate(document.write, function () {
		if (dom_is_ready()) {
			return false;
		} else {
			return arguments;
		}
	});


	// modify arguments
	document.write = decorate(document.write, function (str) {
		var args;

		args = [replace_divs(str)];
		return args;
	}, document.write);

	// change returning value
	document.write = decorate(document.write, null, function () {
		if (dom_is_ready()){
			return true;
		}
	});
*/


function decorate (func, before, after) {
	var res;
	var key;

	res = function () {
		var temp_res;
		var alternative_args;
		var alternative_res;

		if (typeof before === 'function') {
			before.apply(this, arguments);
		}

		temp_res = func.apply(this, arguments);

		if (typeof after === 'function') {
			after.apply(this, arguments);
		}
		return temp_res;
	}

	res.prototype = func.prototype;

	for (key in func) {
		if (func.hasOwnProperty(key)) {
			res[key] = func[key];
		}
	}

	return res;
}
