function make_arg_iterable (func) {
	return function (el) {
		var res,
			args,
			arr_proto,
			i;

		arr_proto = Array.prototype;
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
