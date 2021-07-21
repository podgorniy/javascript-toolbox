function get_siblings (node) {
	var res = [],
		sibling;

	while ((sibling = node.nextSibling)) {
		if (sibling.nodeType !== 3 && sibling.nodeType !== 8) res.push(sibling);
		node = sibling;
	}
	return res;
}
