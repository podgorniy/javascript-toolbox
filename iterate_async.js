/*
example of use
var arr = ['masha','nadya', 'elena'];
iterate_async(arr, function (el, index, arr) {
    console.log(el + ' is #' + (index + 1));
}, 99);
*/
function iterate_async (arr, callback, timeout) {
	var item_to_proceed;

	item_to_proceed = 0;
	(function proceed_next () {
		if (item_to_proceed < arr.length) {
			setTimeout(function () {
				callback.call(arr, arr[item_to_proceed], item_to_proceed, arr);
				item_to_proceed += 1;
				proceed_next();
			}, timeout || 50);
		}
	}());
}
