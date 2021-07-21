function make_iterable (func) {
	var arr_proto;

	arr_proto = Array.prototype;
	return function (el) {
		var res,
			args,
			i;

		res = [];
		args = [undefined].concat(arr_proto.slice.call(arguments, 1));
		if ('length' in el) {
			for (i = 0; i < el.length; i += 1) {
				args.splice(0,1,el[i]);
				res[i] = func.apply(this, args);
			}
		} else {
			res.push(func.apply(this, arguments));
		}
		return res;
	};
}
