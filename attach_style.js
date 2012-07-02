function attach_style (text) {
	var style = document.createElement('style'),
		first_script;

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
	first_script = document.getElementsByTagName('script')[0];
	if ( first_script ) {
		first_script.parentNode.insertBefore(style, first_script);
	} else {
		document.getElementsByTagName('head')[0].appendChild(style);
	}
	return style;
}
