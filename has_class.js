function has_class(node, class_names) {
	var i, node_class;

	class_names = class_names.replace(/^\s+|\s+$/g, '').split(/\s+/);
	node_class = node.className && (' ' + node.className + ' ');
	if (node_class) {
		for (i = 0; i < class_names.length; i += 1) {
			if (node_class.indexOf(' ' + class_names[i] + ' ') === -1) {
				return false;
			}
		}
	} else {
		return false;
	}
	return true;
}