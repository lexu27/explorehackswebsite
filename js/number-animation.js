function isElementInViewport (el) {

    // Special bonus for those using jQuery
    if (typeof jQuery === "function" && el instanceof jQuery) {
        el = el[0];
    }

    var rect = el.getBoundingClientRect();
    const data = {bottom: rect.bottom, right: rect.right, screenHeight: $(window).height(), screenWidth: $(window).width()}

    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= $(window).height() &&
        rect.right <= $(window).width()
    );
}


function onVisibilityChange(el, callback) {
    return function () {
        var visible = isElementInViewport(el);
        if (visible) {
            if (typeof callback == 'function') {
                callback();
            }
        }
    }
}

var handler = onVisibilityChange(counters[0], function() {
    /* Your code go here */
    const speed = 300;
    updateCounts(speed);
});


// jQuery
$(window).on('DOMContentLoaded load resize scroll', handler);