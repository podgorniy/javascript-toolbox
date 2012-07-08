function filter (arr, callback) {
	var i, len, res;

	if ( arr.filter ) {
		res = arr.filter(callback);
	} else {
		res = [];
		for (i = 0, len = arr.length; i < len; i += 1) {
			if ( callback(arr[i], i, arr) ){
				res.push(arr[i]);
			}
		}
	}
	return res;
}
