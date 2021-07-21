function next (node) {
	while ( node && (node = node.nextSibling) ) {
		if ( node.nodeType !== 8 && node.nodeType !== 3 ){
			return node;
		}
	}
}
