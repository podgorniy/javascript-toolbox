function to_array (obj) {
	return Object.prototype.toString.call(obj) !== '[object Array]' ? obj : Array.prototype.slice.call(obj);
}
