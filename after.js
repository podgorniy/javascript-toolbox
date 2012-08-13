function next (node) {
	while ( node && (node = node.nextSibling) ) {
		if ( node.nodeType !== 8 && node.nodeType !== 3 ){
			return node;
		}
	}
}


function after (node_to_isert, insert_point) {
	var next_node;

	next_node = next(insert_point);
	if (next_node) {
		insert_point.parentNode.insertBefore(node_to_isert, next_node);
	} else {
		insert_point.parentNode.appendChild(node_to_isert);
	}
}