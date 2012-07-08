function index_of (arr, obj) {
	var i;

	if (arr.indexOf) {
		return arr.indexOf(obj);
	} else {
		for (i = 0; i < arr.length; i += 1) {
			if (arr[i] === obj) return i;
		}
	}
	return - 1;
}
