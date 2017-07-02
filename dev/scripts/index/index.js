whenReady(function() {
    { // main slider
        new Swiper('#slider', {
            loop: true,
            autoplay: 5000,
            effect: 'fade'
        });
    }

    { // gallery
        new Swiper('#gallery', {
            slidesPerView: 4,
            nextButton: '.swiper-button-next',
            prevButton: '.swiper-button-prev',
            spaceBetween: 30
        });
    }

    { // map
        (function() {
            let googleMap = document.getElementById('google-map');

            if (!googleMap) return;

            let center = {
                    lat: 55.751244,
                    lng: 37.618423
                },
                map = new google.maps.Map(googleMap, {
                    zoom: 15,
                    center: center
                }),
                marker = new google.maps.Marker({
                    position: center,
                    map: map
                });
        }());
    }
});