// Initialize Firebase
var config = {
    apiKey: "AIzaSyDEjAIfmIrSuzdt3YwkJ-JJntGiFXDz7R4",
    authDomain: "portfolio-5ee92.firebaseapp.com",
    databaseURL: "https://portfolio-5ee92.firebaseio.com",
    storageBucket: "portfolio-5ee92.appspot.com",
    messagingSenderId: "321162431279"
};

var firebaseApp = firebase.initializeApp(config)
var db = firebaseApp.database()


var vm = new Vue({
    el: "#projects",
    firebase: {
        // can bind to either a direct Firebase reference or a query
        items: db.ref("projects")
    }
});

$('.section-header').css('top', '-' + ($('.section-header h1').outerHeight() + 10) + 'px')
$(window).resize(function () {
    $('.section-header').css('top', '-' + ($('.section-header h1').outerHeight() + 10) + 'px')
})

document.getElementById("nav-toggle").addEventListener("click", toggleNav);

function toggleNav() {
    var nav = document.getElementById("nav-menu");
    var className = nav.getAttribute("class");
    if (className == "nav-right nav-menu") {
        nav.className = "nav-right nav-menu is-active";
        var navbarHeight = $('.navigation').outerHeight();
        $('.menu-rotate').css('transform', 'rotate(180deg)')
    } else {
        nav.className = "nav-right nav-menu";
        var navbarHeight = $('.navigation').outerHeight();
        $('.menu-rotate').css('transform', 'rotate(0deg)')
    }
}


var didScroll;
var lastScrollTop = 0;
var delta = 5;

$(window).scroll(function (event) {
    didScroll = true;
});

setInterval(function () {
    if (didScroll) {
        hasScrolled();
        didScroll = false;
    }
}, 250);

function hasScrolled() {
    var st = $(this).scrollTop();
    var navbarHeight = $('.navigation').outerHeight();
    var navMenuHeight = $('#nav-menu').outerHeight();

    if (Math.abs(lastScrollTop - st) <= delta)
        return;

    if (st > lastScrollTop && st > navbarHeight) {
        // Scroll Down
        $(".navigation").css('top', '-' + (navbarHeight + navMenuHeight) + 'px')
    } else {
        // Scroll Up
        if (st + $(window).height() < $(document).height()) {
            $(".navigation").css('top', '0px')
        }
    }

    lastScrollTop = st;
}
$(function () {
    $('a[href*="#"]:not([href="#"])').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top
                }, 1000);
                return false;
            }
        }
    });
});
jQuery(document).ready(function () {
    jQuery('a[href^="#"]').on('load', function (e) {
        e.preventDefault();

        var target = this.hash;
        var $target = $(target);

        jQuery('html, body').stop().animate({
            'scrollTop': $target.offset().top
        }, 900, 'swing', function () {
            window.location.hash = target;
        });
    });
});