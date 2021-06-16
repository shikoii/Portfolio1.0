const smoothScrollingIsSupported = 'scrollBehavior' in document.documentElement.style;
const scrollOptions = {
    behavior: 'smooth',
    left: 0,
    top: 0,
};

function getScrollTop() {
    return (window.pageYOffset || document.documentElement.scrollTop) - (document.documentElement.clientTop || 0);
}

function scrollToTop(e, duration = 1050) {
    const start = window.performance.now();
    const scrollTop = getScrollTop();

    if (scrollTop === 0) return;

    /*
        Normal Use
    */
    if (smoothScrollingIsSupported) {
        window.scrollTo(scrollOptions);
    }

    /*
        For IE and Safari
    */
    if (!smoothScrollingIsSupported) {
        const step = (timestamp) => {
            const elapsed = timestamp - start;
            const k = Math.round(elapsed / duration * 100) / 100;

            if (k <= 1.05) {
                window.scrollTo(scrollOptions.left, scrollTop * (1 - k) + scrollOptions.top * k);
                window.requestAnimationFrame(step);
            }
        };

        window.requestAnimationFrame(step);
    }
}

document.querySelector('button').addEventListener('click', scrollToTop, null);
