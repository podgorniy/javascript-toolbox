function exec_out_of_dom (node, callback) {
	var papa,
		next_sibling;

	papa = node.parentNode;
	next_sibling = node.nextSibling;
	papa.removeChild(node);
	callback();
	if (next_sibling) {
		papa.inserBefore(node, next_sibling);
	} else {
		papa.appendChild(node);
	}
}