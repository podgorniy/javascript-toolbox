/**
 * Iterator over array. When array processing is too long
 * next array items processed async
 * @param  {Array-like}   arr                  any array-like object
 * @param  {Function} callback             function will be called with each array item
 * @param  {Integer}   max_process_time     max time for whole array items processing
 * @param  {Integer}   next_iteration_after run next iteration after. 0 is by default
 * @return {Boolean}   true, if all items were processed synchroniously
 */	
function async (arr, callback, max_process_time, next_iteration_after) {
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
