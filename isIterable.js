function isIterable (obj) {
	return typeof obj !== 'function' && 'length' in obj;
}