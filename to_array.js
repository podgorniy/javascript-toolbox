/*
	Speed tests
	http://jsperf.com/to-array
*/
function to_array (obj) {
	var i,
		length,
		res;

	if (Object.prototype.toString.call(obj) === '[object Array]') {
		return obj;
	}
	length = obj.length;
	res = [];
	for (i = 0; i < length; i += 1) {
		res.push(obj[i]);
	}
	return res;
}
