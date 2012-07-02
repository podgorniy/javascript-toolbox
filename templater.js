function templater (string, data) {
	return string.replace(/\$([^\$]+)\$/g, function (match_string, param_name) {
		return data[param_name];
	});
}
