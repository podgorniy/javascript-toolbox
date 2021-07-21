/*global window, console */
// todo список 0 - 100% вычисленных значений для самых распространенных функций анимации
// todo default settings as object
var animate = (function () {
	'use strict';
	var doOnNextRepaint;
	var processingList;
	var now;
	var animationIsRunning;
	var indexOf;

	processingList = [];
	animationIsRunning = false;

	var easing;

	easing = {
		swing : function (p) {
			return (- Math.cos( p*Math.PI ) / 2 ) + 0.5;
		},
		linear : function (p) {
			return p;
		}
	};

	doOnNextRepaint = (function () {
		return window.mozRequestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.requestAnimationFrame ||
			function (func) {
				setTimeout(func, 16);
			};
	}());

	now = (function () {
		if (Date.now) {
			return function () {
				return Date.now();
			};
		} else {
			return function () {
				new Date().getTime();
			};
		}
	}());

	indexOf = (function () {
		if (Array.prototype.indexOf) {
			return function (arr, obj) {
				Array.prototype.indexOf.call(arr, obj)
			};
		} else {
			return function (arr, obj) {
				var i;
				for (i = 0; i < arr.length; i += 1) {
					if (arr[i] === obj) {
						return i;
					}
				}
				return -1;
			};
		}
	}());

	function animationTick () {
		var i,
			thisMoment,
			animationProgress,
			animator;

		thisMoment = now();
		i = 0;
		while (i < processingList.length) {
			animator = processingList[i];
			animationProgress = (thisMoment - animator.start) / animator.animationTime;
			if (animationProgress > 1) {
				animationProgress = 1;
			} else {
				i += 1;
			}

			try {
				animator.func.call(window, easing[animator.easig](animationProgress));
			} catch (err) {
				setTimeout(function () {
					throw err;
				}, 0);
			}

			//TODO избавиться от размазанности в коде
			if (animationProgress === 1) {
				animator.stop();
			}
		}
		animationIsRunning = processingList.length ? true : false;
	}

	function initAnimation () {
		if (!animationIsRunning) {
			doOnNextRepaint(function animation () {
				animationTick();
				if (animationIsRunning) {
					doOnNextRepaint(animation);
				}
			});
		}
	}

	function stop () {
		var me,
			my_index;

		my_index = indexOf(processingList, this);
		if (my_index !== -1) {
			processingList.splice(my_index, 1);
		}
	}

	function animate (func, animationTime, easig) {
		var animator;

		animator = {
			func : func,
			animationTime : animationTime,
			start : now(),
			stop : stop,
			easig : easig || 'linear'
		};
		processingList.push(animator);
		initAnimation();
		return animator;
	}

	return animate;
}());
