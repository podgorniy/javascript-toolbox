function is_empty_object (object) {
	var prop;

	for (prop in object) {
		if (object.hasOwnProperty(prop)) {
			return false;
		}
	}
	return true;
}