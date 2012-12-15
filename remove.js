function remove (node) {
	var papa;

	if (node && (papa = node.parentNode)) {
		papa.removeChild(node);
	}
}
