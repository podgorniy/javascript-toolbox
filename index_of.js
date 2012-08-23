function index_of (arr, el) {
	var io,
		i;

	io = Array.prototype.indexOf;
	if (io) {
		return io.call(arr, el);
	} else {
		for (i = 0; i < arr.length; i += 1) {
			if (el === arr[i]) {
				return i;
			}
		}
	}
}