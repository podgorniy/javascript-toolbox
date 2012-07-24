function decorate (initial, decorate_before, decorate_after) {
	return function () {
		var initial_call_result;

		if (typeof decorate_before === 'function') {
			if (!!decorate_before.apply(this, arguments) === false) {
				return;
			}
		}
		initial_call_result = initial.apply(this, arguments);
		if (typeof decorate_after === 'function') {
			decorate_after.apply(this, arguments);
		}
		return initial_call_result;
	};
}


function chain (func, callback) {
	var callbacks,
		func_states;

	callbacks = [];
	func_states = [];
	chain = function (func, callback) {
		var callback_index,
			chained,
			func_index;

		callback_index = callbacks.indexOf(callback);
		if (callback_index === -1) {
			chained = {
				func : [],
				state : [],
				test : function () {
					for (var i = 0; i < this.func.length; i += 1) {
						if (!this.state[i]) {
							return;
						}
					}
					callback();
					this.state = [];
				}
			};
			callbacks.push(callback);
			func_states.push(chained);
		} else {
			chained = func_states[callback_index];
		}

		func_index = chained.func.push(func) - 1;
		func = decorate(func, null, function () {
			chained.state[func_index] = true;
			chained.test();
		});
		return func;
	};
	return chain.apply(this, arguments);
}

/* example of use */

function on_all_async_ready () {
	console.log('all ready');
}

var on_2_of_3_ready = function () {
    console.info('1 and 2 ready');
}

var async_1 = chain(function () {
	console.info('first async');
}, on_all_async_ready);

async_1 = chain(async_1, on_2_of_3_ready);


var async_2 = chain(function () {
	console.info('second_async');
}, on_all_async_ready);

async_2 = chain(async_2, on_2_of_3_ready);


var async_3 = chain(function () {
	console.info('third async');
}, on_all_async_ready);


setTimeout(function () {
	async_1();
	setTimeout(async_2, 1000);
	setTimeout(async_3, 2000);
}, 2000);