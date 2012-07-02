function splitter (initial, pair_delimeter, key_value_delimeter) {
	var pair_delimeter = pair_delimeter || '&',
		key_value_delimeter = key_value_delimeter || '=',
		param_type = Object.prototype.toString.call(initial),
		res,
		kvPairs,
		kvPair,
		key;

	if (param_type === '[object String]') {
		res = {};
		kvPairs = initial.split(pair_delimeter);
		for (var i = 0; i < kvPairs.length; i += 1) {
			kvPair = kvPairs[i].split(key_value_delimeter);
			res[kvPair[0]] = kvPair[1];
		}
	} else if (param_type === '[object Object]') {
		res = '';
		for (key in initial) {
			res ? res += (pair_delimeter + key + key_value_delimeter + initial[key])
				: res = key + key_value_delimeter + initial[key];
		}
	}
	return res;
}
