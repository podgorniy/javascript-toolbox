/**
 * Bulletproof singletone constructor. Can be used with or 
 * without new, can be called from whatever (object method,
 * standalone function). Works fine in strict mode
 */
var Singletone = (function () {
	var instance;

	return function Construct_singletone () {
		if (instance) {
			return instance;
		}
		if (this && this.constructor === Construct_singletone) {
			instance = this;
		} else {
			return new Construct_singletone();
		}
	};
}());
