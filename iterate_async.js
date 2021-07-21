/*
example of use
var arr = ['masha','nadya', 'elena'];
iterate_async(arr, function (el, index, arr) {
    console.log(el + ' is #' + (index + 1));
}, 99);
*/
function iterate_async (arr, callback, timeout) {
	var index_of_processing_item;

	index_of_processing_item = 0;
	(function proceed_next () {
		if (index_of_processing_item < arr.length) {
			setTimeout(function () {
				callback.call(arr, arr[index_of_processing_item], index_of_processing_item, arr);
				index_of_processing_item += 1;
				proceed_next();
			}, timeout || 50);
		}
	}());
}
