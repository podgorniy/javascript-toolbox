function splitter (initial, pair_separator, key_value_separator) {
	var param_type = Object.prototype.toString.call(initial),
		res,
		kvPairs,
		kvPair,
		key;

	pair_separator = pair_separator || '&';
	key_value_separator = key_value_separator || '=';
	if (param_type === '[object String]') {
		res = {};
		if (initial) {
			kvPairs = initial.split(pair_separator);
			for (var i = 0; i < kvPairs.length; i += 1) {
				kvPair = kvPairs[i].split(key_value_separator);
				res[kvPair[0]] = kvPair[1];
			}
		}
	} else if (param_type === '[object Object]') {
		res = '';
		for (key in initial) {
			if (initial.hasOwnProperty(key)) {
				res ? res += (pair_separator + key + key_value_separator + initial[key])
				: res = key + key_value_separator + initial[key];
			}
		}
	}
	return res;
}
