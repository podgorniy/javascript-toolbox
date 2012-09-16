/**
 Takes array (or array-like) object, function, that will be called
 with everyitem from the array. If it took longer, that max_process_time,
 next part of the unprocessed items will run after next_iteration_after.
 Returns true, if all items were processed synchroniously. Otherwise
 false is returned.


Example of use.
Each callback takes 300 ms to run. Timeout is 500ms. So only
2 items is processed in single nonbreakable process. 100ms is
a gap between nonbreakable runs.

function wait (sec) {
	var start_time;

	start_time = new Date().getTime();
	while ( new Date().getTime() < start_time + sec * 1000);
}

smart_async_iterator([1,2,3,4,5,6,7,8,9,0], function (item, index, arr) {
	console.log(item);
	wait(0.3);
}, 500, 100);
*/
function smart_async_iterator (arr, callback, max_process_time, next_iteration_after) {
	var then,
		current_processing_item;

	then = new Date().getTime();
	current_processing_item = 0;
	return (function process_untill_timeout_or_itemsout () {
		var i,
			now;

		for (i = current_processing_item; i < arr.length; i += 1) {
			callback(arr[i], i, arr);
			current_processing_item = i + 1;
			now = new Date().getTime();
			if (now - then > max_process_time && current_processing_item !== arr.length) {
				setTimeout(process_untill_timeout_or_itemsout, next_iteration_after);
				then = now;
				return false;
			}
		}
		return true;
	}());
}