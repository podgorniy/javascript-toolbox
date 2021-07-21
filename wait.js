function wait (sec) {
	var start_time;

	start_time = new Date().getTime();
	while ( new Date().getTime() < start_time + sec * 1000);
}
