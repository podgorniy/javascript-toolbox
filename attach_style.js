function attach_style (text) {
	var style = document.createElement('style');

	style.type = 'text/css';
	if ( /WebKit|MSIE/i.test(navigator.userAgent) ) {
		if ( style.styleSheet ) {
			style.styleSheet.cssText = text;
		} else {
			style.innerText = text;
		}
	} else {
		style.innerHTML = text;
	}
	document.getElementsByTagName('head')[0].appendChild(style);
	return style;
}
