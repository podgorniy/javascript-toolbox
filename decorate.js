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
function decorate (initial, decorate_before, decorate_after) {
	return function () {
		var initial_call_result;

		if (typeof decorate_before === 'function') {
			if (!!decorate_before.apply(this, arguments) === false) return;
		}
		initial_call_result = initial.apply(this, arguments);
		if (typeof decorate_after === 'function') {
			decorate_after.apply(this, arguments);
		}
		return initial_call_result;
	}
}
