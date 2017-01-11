$('document').ready(function() {

    // ------------- trims ------------- //
    var ticking = false;
    var isFirefox = (/Firefox/i.test(navigator.userAgent));
    var isIe = (/MSIE/i.test(navigator.userAgent)) || (/Trident.*rv\:11\./i.test(navigator.userAgent));
    var scrollSensitivitySetting = 30;
    var slideDurationSetting = 600; // ms
    var currentSlideNumber = 0;
    var totalSlideNumber = $(".background").length;



    // ------------- DETERMINE DELTA/SCROLL DIRECTION ------------- //
    function wheelScroll(evt) {
        if (isFirefox) {
            // Firefox
            delta = evt.detail * (-120);
        } else if (isIe) {
            // IE
            delta = -evt.deltaY;
        } else {
            // le reste
            delta = evt.wheelDelta;
        }
        if (ticking != true) {
            if (delta <= -scrollSensitivitySetting) {
                goDown();
            }
            if (delta >= scrollSensitivitySetting) {
                goUp();
            }
        }
    }

    function touchScroll(ts, te) {
        delta = te - ts;
        if (ticking != true) {
            if (delta <= -scrollSensitivitySetting) {
                goDown();
            }
            if (delta >= scrollSensitivitySetting) {
                goUp();
            }
        }
    }

    function goDown() {
        //Down scroll
        ticking = true;
        if (currentSlideNumber !== totalSlideNumber - 1) {
            currentSlideNumber++;
            nextItem();
        }
        slideDurationTimeout(slideDurationSetting);
    }

    function goUp() {
        //Up scroll
        ticking = true;
        if (currentSlideNumber !== 0) {
            currentSlideNumber--;
        }
        previousItem();
        slideDurationTimeout(slideDurationSetting);

    }

    function goto(slide) {
        if (currentSlideNumber == slide) {
            //nada
        } else if (currentSlideNumber > slide) {
            var maxIter = currentSlideNumber - slide;
            for (var i = 0; i < maxIter; i++) {
                goUp();
            }
        } else if (currentSlideNumber < slide) {
            var minIter = slide - currentSlideNumber;
            for (var j = 0; j < minIter; j++) {
                goDown();
            }
        }
    }

    // -------------- Watcher menu -------------- //

    var menuItems = $('.goto');
    menuItems.click(function() {
        goto($(this).attr("id"));
    });
    menuItems.hover(function() {
        goto($(this).attr("id"));
    });



    // ------------- Timeout pour locker les slides ------------- //
    function slideDurationTimeout(slideDuration) {
        setTimeout(function() {
            ticking = false;
        }, slideDuration);
    }

    // ------------- Add event listener ------------- //
    var mousewheelEvent = isFirefox ? "DOMMouseScroll" : "wheel";
    var ts;

    window.addEventListener(mousewheelEvent, $.throttle(60, wheelScroll), false);
    window.addEventListener("touchstart", function(e) {
        ts = e.touches[0].clientY;
    }, false);
    window.addEventListener("touchend", function(e) {
        var te = e.changedTouches[0].clientY;
        touchScroll(ts, te);
    }, false);

    // ------------- Animations ------------- //
    function nextItem() {
        var $previousSlide = $(".background").eq(currentSlideNumber - 1);
        $previousSlide.removeClass("up-scroll").addClass("down-scroll");

    }

    function previousItem() {
        var $currentSlide = $(".background").eq(currentSlideNumber);
        $currentSlide.removeClass("down-scroll").addClass("up-scroll");


    }

    // ------------ Keywords anim --------- //
    var words = ["Gulp", "Angular", "Laravel", "Node", "Bower", "Npm", "Jquery", "Typescript", "Poo", "Analytics", "Addword", "Composer"];

    window.addEventListener("load", function() {
        var randoms = window.document.getElementsByClassName("randoms");
        for (i = 0; i < randoms.length; i++)
            changeWord(randoms[i]);
    }, false);

    function changeWord(a) {
        a.style.opacity = '0.1';
        a.innerHTML = words[getRandomInt(0, words.length - 1)];
        setTimeout(function() {
            a.style.opacity = '1';
        }, 425);
        setTimeout(function() {
            changeWord(a);
        }, getRandomInt(2000, 3600));
    }


    function getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    // ------------ Menu anim --------- //

    $('.open-menu').on('click', function() {
        $('.overlay').addClass('open');
    });

    $('.close-menu').on('click', function() {
        $('.overlay').removeClass('open');
    });

    $('nav').on('click', function() {
        $('.overlay').removeClass('open');
    });

});