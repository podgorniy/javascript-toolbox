/*
example of use
var arr = ['masha','nadya', 'elena'];
iterate_async(arr, function (el, index, arr) {
    console.log(el + ' is #' + (index + 1));
}, 99);
*/
function iterate_async (arr, callback, timeout) {
    var index_of_processing_item,
        final_arr = [];

    index_of_processing_item = 0;
    (function proceed_next () {
        if (index_of_processing_item < arr.length) {
            setTimeout(function () {
                final_arr.push(callback.call(arr,
                    arr[index_of_processing_item],
                    index_of_processing_item,
                    arr));
                index_of_processing_item += 1;
                proceed_next();
            }, timeout || 50);
        } else {
            return console.log(final_arr);
        }
    }());
}
