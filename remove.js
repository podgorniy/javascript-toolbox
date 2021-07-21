function remove (node) {
	var papa;

	if (node && (papa = node.parentNode)) {
		papa.removeChild(node);
		return node;
	}
	return false;
}
