function replace_string_occurances (src_string, string_to_replace, replace_rule) {
	var escaped_string,
		reg;

	escaped_string = string_to_replace.replace(/[\(\)\[\]\\\.\^\$\|\?\+]/g, '\\$&');
	reg = new RegExp(escaped_string, 'g');
	return src_string.replace(reg, replace_rule);
}
