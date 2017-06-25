'use strict';

whenReady(function () {
    {
        // main slider
        new Swiper('#slider', {
            loop: true,
            autoplay: 5000,
            effect: 'fade'
        });
    }
});