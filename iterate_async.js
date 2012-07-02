/*
example of use
var arr = ['masha','nadya', 'elena'];
iterate_async(arr, function (el, index, arr) {
    console.log(el + ' is #' + (index + 1));
}, 99);
*/
function iterate_async (arr, callback, timeout) {
	var index;

	index = 0;
	(function proceed_next () {
		if (index < arr.length) {
			setTimeout(function () {
				callback.call(arr, arr[index], index, arr);
				index += 1;
				proceed_next();
			}, timeout || 50);
		}
	}());
}
