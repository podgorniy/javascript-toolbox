/*
 exaple of use


var data, processed;

data = [10,20,30,40];
processed = iterate(data, function (val, i) {
    console.log(val);
});

data = {
    masha : 10,
    pasha : 20,
    sasha : 30,
    lesha : 40
};

processed = iterate(data, function (val, i) {
    console.log(val);
});

*/

// THINK same returning type. Like "new list.constructor"

function iterate(list, func) {
	var i, res;

	if ( 'length' in list ) {
		res = [];
		for (i = 0; i < list.length; i += 1) {
			res.push(func.call(list, list[i], i));
		}
	} else {
		res = {};
		for (i in list) {
			if (list.hasOwnProperty(i)) {
				res[i] = func.call(list, list[i], i);
			}
		}
	}
	return res;
}
