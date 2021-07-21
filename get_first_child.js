function get_first_child (node) {
	var first_child;

	first_child = node && node.firstChild;
	while ( first_child && (first_child.nodeType === 3 || first_child.nodeType === 8) ) {
	    first_child = first_child.nextSibling;
	}
	return first_child;
}
