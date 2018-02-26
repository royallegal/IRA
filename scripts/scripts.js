;(function ($) {
function getMorePosts(offset, posts_per_page, category){
  return $.ajax({
    type: 'POST',
    url: '/wp-admin/admin-ajax.php',
    data: {
      category: category,
      offset: offset,
      posts_per_page: posts_per_page,
      action: 'rls_more_posts'
    }
  });
}
function royal_article() {
    // Responsive iFrames
    /* $('iframe').wrap('<div class="video-container"></div>');*/

    // Parallax
    if ($('.parallax-container').length) {
        console.log('PARALLAX');
        var featured = $('.featured-image .parallax');
        var promotion = $('.promotion-image .parallax');

        if (featured.length && promotion.length) {
            console.log('BOTH');
            featured.parallax();
            promotion.parallax();
        }
        else if (featured.length) {
            console.log('FEATURED');
            featured.parallax();
        }
        else if (promotion.length) {
            console.log('PROMOTIO');
            promotion.parallax();
        }
        else {
            console.log('ELSE');
            $('.parallax').parallax();
        }
    }
}

function royal_consultation() {
    $('nav').addClass('no-shadow');
}

function royal_contact() {
    // Submission
    $('form').submit(function(e) {
        e.preventDefault();
        var first   = $("#first").val();
        var last    = $("#last").val();
        var phone   = $("#phone").val();
        var email   = $("#email").val();
        var message = $("#message").val();
        var submit  = $("button[type='submit']");
        var circles = $(".preloader-wrapper").parent();
        var confirm = $(".confirm");

        // Removes existing validation
        confirm.removeClass('pink green').addClass('hide').find('p').remove();
        $('.invalid, .valid').removeClass('invalid valid');

        // Validation
        if (first == "" || last == "" || phone == "" || email == "") {
            confirm.addClass('pink').removeClass('hide').html("<p>Oops, looks like we're missing some information. Please fill out all the fields.</p>");
        }

        else {
            // Toggle Preloader
            submit.addClass('hide');
            circles.removeClass('hide');

            $.ajax({
                type: 'POST',
                url: "/wp-admin/admin-ajax.php",
                data: {
                    action: 'contact_us_form',
                    first: first,
                    last: last,
                    phone: phone,
                    email: email,
                    message: message.replace(/(?:\r\n|\r|\n)/g, '<br/>'),
                },

                success: function(data) {
                    if (data == "0") {
                        // Error message
                        confirm.addClass('pink').removeClass('hide').html("<p>Oops, looks like there was a problem! Check back later or email us directly at <a href='mailto:scott@royallegalsolutions.com'>scott@royallegalsolutions.com</a>.</p>");
                    }
                    else {
                        // Success message
                        confirm.addClass('green').removeClass('hide').html("<p>Success! Check your email. We'll be in touch shortly.</p>");
                    }
                },

                error: function(err) {
                    // Error message
                    confirm.addClass('pink').removeClass('hide').html("<p>Oops, looks like there was a problem! Check back later or email us directly at <a href='mailto:scott@royallegalsolutions.com'>scott@royallegalsolutions.com</a>.</p>");
                },

                complete: function(res) {
                    $('form')[0].reset();
                    Materialize.updateTextFields();
                    $('form textarea').trigger('autoresize');

                    // Toggle Preloader
                    circles.addClass('hide');
                    submit.removeClass('hide');
                }
            });
        }
    });
}

function royal_filterPosts() {
    $('#search').change(function() {
        var filter = $(this).val();

        // Extend :contains selector
        jQuery.expr[':'].contains = function(a, i, m) {
            return jQuery(a).text().toUpperCase().indexOf(m[3].toUpperCase()) >= 0;
        };

        // Hides cards that don't match input
        $("#feed .content .card-container:visible article .card-title a:not(:contains("+filter+"))").closest('.card-container').fadeOut();

        // Shows cards that match input
        $("#feed .content .card-container:not(:visible) article .card-title a:contains("+filter+")").closest('.card-container').fadeIn();

        // Add empty message when if no posts are visible
        var message = $('#feed #no-results');
        if ($("#feed .content .card-container:visible article .card-title a:contains("+filter+")").size() == 0) {
            if (message.hasClass('hide')) {
                setTimeout(function() {
                    $('#feed #no-results').removeClass('hide');
                }, 400);
            }
            message.find('.target').text(filter);
        } else { message.addClass('hide'); }

    }).keyup(function() {
        $(this).change();
    });
}

jQuery(document).ready(function($) {
    // Perform AJAX login on form submit
    $('form#login').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php',
            data: { 
                'action': 'ajax_login',
                'username': $('form#login #loginUsername').val(), 
                'password': $('form#login #loginPassword').val(), 
                'remember': $('form#login #loginRemember').attr("checked"), 
                'loginSecurity': $('form#login #loginSecurity').val() 
            },
            success: function(data){
                $('form#login p.status').text(data.message);
                if (data.loggedin == true){
                    location.reload();
                }
            }
        });
    });
    $('form#passwordLost').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php', 
            data: { 
                'action': 'lost_pass',
                'user_login': $('form#passwordLost #lostUsername').val(),
                'lostSecurity': $('form#passwordLost #lostSecurity').val()
            },
            success: function(data){
                $('form#passwordLost p.status').text(data.message);
            }
        });
    });
    $('form#passwordReset').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php', 
            data: { 
                action: 	'reset_pass',
                pass1:		$('form#passwordReset #resetPass1').val(),
                pass2:		$('form#passwordReset #resetPass2').val(),
                user_key:	$('form#passwordReset #user_key').val(),
                user_login:	$('form#passwordReset #user_login').val(),
                'resetSecurity': $('form#passwordReset #resetSecurity').val()
            },
            success: function(data){
                $('form#passwordLost p.status').text(data.message);
            }
        });
    });
});
!function(t,n){"object"==typeof exports&&"undefined"!=typeof module?module.exports=n():"function"==typeof define&&define.amd?define(n):t.Macy=n()}(this,function(){"use strict";function t(t,n){var e=void 0;return function(){e&&clearTimeout(e),e=setTimeout(t,n)}}function n(t,n){for(var e=t.length,o=e,r=[];e--;)r.push(n(t[o-e-1]));return r}function e(t,n){A(t,n,arguments.length>2&&void 0!==arguments[2]&&arguments[2])}function o(t){for(var n=t.options,e=t.responsiveOptions,o=t.keys,r=t.docWidth,i=void 0,s=0;s<o.length;s++){var a=parseInt(o[s],10);r>=a&&(i=n.breakAt[a],O(i,e))}return e}function r(t){for(var n=t.options,e=t.responsiveOptions,o=t.keys,r=t.docWidth,i=void 0,s=o.length-1;s>=0;s--){var a=parseInt(o[s],10);r<=a&&(i=n.breakAt[a],O(i,e))}return e}function i(t){var n=document.body.clientWidth,e={columns:t.columns};L(t.margin)?e.margin={x:t.margin.x,y:t.margin.y}:e.margin={x:t.margin,y:t.margin};var i=Object.keys(t.breakAt);return t.mobileFirst?o({options:t,responsiveOptions:e,keys:i,docWidth:n}):r({options:t,responsiveOptions:e,keys:i,docWidth:n})}function s(t){return i(t).columns}function a(t){return i(t).margin}function c(t){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1],e=s(t),o=a(t).x,r=100/e;return n?1===e?"100%":(o=(e-1)*o/e,"calc("+r+"% - "+o+"px)"):r}function u(t,n){var e=s(t.options),o=0,r=void 0,i=void 0;return 1===++n?0:(i=a(t.options).x,r=(i-(e-1)*i/e)*(n-1),o+=c(t.options,!1)*(n-1),"calc("+o+"% + "+r+"px)")}function l(t){var n=0,e=t.container;m(t.rows,function(t){n=t>n?t:n}),e.style.height=n+"px"}function p(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=s(t.options),i=a(t.options).y;C(t,r,e),m(n,function(n){var e=0,r=parseInt(n.offsetHeight,10);isNaN(r)||(t.rows.forEach(function(n,o){n<t.rows[e]&&(e=o)}),n.style.position="absolute",n.style.top=t.rows[e]+"px",n.style.left=""+t.cols[e],t.rows[e]+=isNaN(r)?0:r+i,o&&(n.dataset.macyComplete=1))}),o&&(t.tmpRows=null),l(t)}function h(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2],o=!(arguments.length>3&&void 0!==arguments[3])||arguments[3],r=s(t.options),i=a(t.options).y;C(t,r,e),m(n,function(n){t.lastcol===r&&(t.lastcol=0);var e=M(n,"height");e=parseInt(n.offsetHeight,10),isNaN(e)||(n.style.position="absolute",n.style.top=t.rows[t.lastcol]+"px",n.style.left=""+t.cols[t.lastcol],t.rows[t.lastcol]+=isNaN(e)?0:e+i,t.lastcol+=1,o&&(n.dataset.macyComplete=1))}),o&&(t.tmpRows=null),l(t)}var f=function t(n,e){if(!(this instanceof t))return new t(n,e);if(n=n.replace(/^\s*/,"").replace(/\s*$/,""),e)return this.byCss(n,e);for(var o in this.selectors)if(e=o.split("/"),new RegExp(e[1],e[2]).test(n))return this.selectors[o](n);return this.byCss(n)};f.prototype.byCss=function(t,n){return(n||document).querySelectorAll(t)},f.prototype.selectors={},f.prototype.selectors[/^\.[\w\-]+$/]=function(t){return document.getElementsByClassName(t.substring(1))},f.prototype.selectors[/^\w+$/]=function(t){return document.getElementsByTagName(t)},f.prototype.selectors[/^\#[\w\-]+$/]=function(t){return document.getElementById(t.substring(1))};var m=function(t,n){for(var e=t.length,o=e;e--;)n(t[o-e-1])},v=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.running=!1,this.events=[],this.add(t)};v.prototype.run=function(){if(!this.running&&this.events.length>0){var t=this.events.shift();this.running=!0,t(),this.running=!1,this.run()}},v.prototype.add=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return!!n&&(Array.isArray(n)?m(n,function(n){return t.add(n)}):(this.events.push(n),void this.run()))},v.prototype.clear=function(){this.events=[]};var d=function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};return this.instance=t,this.data=n,this},g=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];this.events={},this.instance=t};g.prototype.on=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]&&arguments[1];return!(!t||!n)&&(Array.isArray(this.events[t])||(this.events[t]=[]),this.events[t].push(n))},g.prototype.emit=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0],n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!t||!Array.isArray(this.events[t]))return!1;var e=new d(this.instance,n);m(this.events[t],function(t){return t(e)})};var y=function(t){return!("naturalHeight"in t&&t.naturalHeight+t.naturalWidth===0)||t.width+t.height!==0},E=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return new Promise(function(t,e){if(n.complete)return y(n)?t(n):e(n);n.addEventListener("load",function(){return y(n)?t(n):e(n)}),n.addEventListener("error",function(){return e(n)})}).then(function(n){e&&t.emit(t.constants.EVENT_IMAGE_LOAD,{img:n})}).catch(function(n){return t.emit(t.constants.EVENT_IMAGE_ERROR,{img:n})})},w=function(t,e){var o=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return n(e,function(n){return E(t,n,o)})},A=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];return Promise.all(w(t,n,e)).then(function(){t.emit(t.constants.EVENT_IMAGE_COMPLETE)})},I=function(n){return t(function(){n.emit(n.constants.EVENT_RESIZE),n.queue.add(function(){return n.recalculate(!0,!0)})},100)},N=function(t){if(t.container=f(t.options.container),t.container instanceof f||!t.container)return!!t.options.debug&&console.error("Error: Container not found");delete t.options.container,t.container.length&&(t.container=t.container[0]),t.container.style.position="relative"},T=function(t){t.queue=new v,t.events=new g(t),t.rows=[],t.resizer=I(t)},b=function(t){var n=f("img",t.container);window.addEventListener("resize",t.resizer),t.on(t.constants.EVENT_IMAGE_LOAD,function(){return t.recalculate(!1,!1)}),t.on(t.constants.EVENT_IMAGE_COMPLETE,function(){return t.recalculate(!0,!0)}),t.options.useOwnImageLoader||e(t,n,!t.options.waitForImages),t.emit(t.constants.EVENT_INITIALIZED)},_=function(t){N(t),T(t),b(t)},L=function(t){return t===Object(t)&&"[object Array]"!==Object.prototype.toString.call(t)},O=function(t,n){L(t)||(n.columns=t),L(t)&&t.columns&&(n.columns=t.columns),L(t)&&t.margin&&!L(t.margin)&&(n.margin={x:t.margin,y:t.margin}),L(t)&&t.margin&&L(t.margin)&&t.margin.x&&(n.margin.x=t.margin.x),L(t)&&t.margin&&L(t.margin)&&t.margin.y&&(n.margin.y=t.margin.y)},M=function(t,n){return window.getComputedStyle(t,null).getPropertyValue(n)},C=function(t,n){var e=arguments.length>2&&void 0!==arguments[2]&&arguments[2];if(t.lastcol||(t.lastcol=0),t.rows.length<1&&(e=!0),e){t.rows=[],t.cols=[],t.lastcol=0;for(var o=n-1;o>=0;o--)t.rows[o]=0,t.cols[o]=u(t,o)}else if(t.tmpRows){t.rows=[];for(var o=n-1;o>=0;o--)t.rows[o]=t.tmpRows[o]}else{t.tmpRows=[];for(var o=n-1;o>=0;o--)t.tmpRows[o]=t.rows[o]}},V=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],e=!(arguments.length>2&&void 0!==arguments[2])||arguments[2],o=n?t.container.children:f(':scope > *:not([data-macy-complete="1"])',t.container),r=c(t.options);return m(o,function(t){n&&(t.dataset.macyComplete=0),t.style.width=r}),t.options.trueOrder?(h(t,o,n,e),t.emit(t.constants.EVENT_RECALCULATED)):(p(t,o,n,e),t.emit(t.constants.EVENT_RECALCULATED))},R=Object.assign||function(t){for(var n=1;n<arguments.length;n++){var e=arguments[n];for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&(t[o]=e[o])}return t},x={columns:4,margin:2,trueOrder:!1,waitForImages:!1,useImageLoader:!0,breakAt:{},useOwnImageLoader:!1,onInit:!1};!function(){try{document.createElement("a").querySelector(":scope *")}catch(t){!function(){function t(t){return function(e){if(e&&n.test(e)){var o=this.getAttribute("id");o||(this.id="q"+Math.floor(9e6*Math.random())+1e6),arguments[0]=e.replace(n,"#"+this.id);var r=t.apply(this,arguments);return null===o?this.removeAttribute("id"):o||(this.id=o),r}return t.apply(this,arguments)}}var n=/:scope\b/gi,e=t(Element.prototype.querySelector);Element.prototype.querySelector=function(t){return e.apply(this,arguments)};var o=t(Element.prototype.querySelectorAll);Element.prototype.querySelectorAll=function(t){return o.apply(this,arguments)}}()}}();var q=function t(){var n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:x;if(!(this instanceof t))return new t(n);this.options={},R(this.options,x,n),_(this)};return q.init=function(t){return console.warn("Depreciated: Macy.init will be removed in v3.0.0 opt to use Macy directly like so Macy({ /*options here*/ }) "),new q(t)},q.prototype.recalculateOnImageLoad=function(){var t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return e(this,f("img",this.container),!t)},q.prototype.runOnImageLoad=function(t){var n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],o=f("img",this.container);return this.on(this.constants.EVENT_IMAGE_COMPLETE,t),n&&this.on(this.constants.EVENT_IMAGE_LOAD,t),e(this,o,n)},q.prototype.recalculate=function(){var t=this,n=arguments.length>0&&void 0!==arguments[0]&&arguments[0],e=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return e&&this.queue.clear(),this.queue.add(function(){return V(t,n,e)})},q.prototype.remove=function(){window.removeEventListener("resize",this.resizer),m(this.container.children,function(t){t.removeAttribute("data-macy-complete"),t.removeAttribute("style")}),this.container.removeAttribute("style")},q.prototype.reInit=function(){this.recalculate(!0,!0),this.emit(this.constants.EVENT_INITIALIZED),window.addEventListener("resize",this.resizer),this.container.style.position="relative"},q.prototype.on=function(t,n){this.events.on(t,n)},q.prototype.emit=function(t,n){this.events.emit(t,n)},q.constants={EVENT_INITIALIZED:"macy.initialized",EVENT_RECALCULATED:"macy.recalculated",EVENT_IMAGE_LOAD:"macy.image.load",EVENT_IMAGE_ERROR:"macy.image.error",EVENT_IMAGE_COMPLETE:"macy.images.complete",EVENT_RESIZE:"macy.resize"},q.prototype.constants=q.constants,q});

function royal_menus() {
    // Mobile Menu
    $("#mobile-menu").sideNav({
        menuWidth: 260,
        edge: 'right'
    });


    // Dropdowns
    $("nav .dropdown-button").dropdown({
        constrainWidth: false
    });


    // Hero Displays
    if ($('.hero-container, .parallax-container').length) {
        $('nav').addClass('transparent');
    }
}


function royal_toggle_menus(top) {
    if (top > 5 && $('nav').hasClass('transparent')) {
        $('nav').removeClass('transparent');
    }
    else if (top < 5 && !$('nav').hasClass('transparent')) {
        $('nav').addClass('transparent');
    }
}

function royal_modals() {

    function autoplay(video) {
        video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    function autostop(video) {
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }

    // Home Page Video
    if ($('#home').length > 0) {
        var video = document.getElementById("player");
        $('.modal').modal({
            ready: function(modal) {
                if ($(modal).hasClass('video')) {
                    autoplay(video);
                }
            },
            complete: function(modal) {
                if ($(modal).hasClass('video')) {
                    autostop(video);
                }
            }
        });
    }


    // Blog Videos
    if ($('#feed').length > 0) {
        $('.modal').modal({
            ready: function(modal) {
                var $modal = $(modal);
                var videoSrc = $modal.data('video-src');
                var $iframe = $modal.find('iframe');

                if($iframe && !$iframe.attr('src')){
                    $iframe.attr('src', videoSrc + "?enablejsapi=1&showinfo=0")
                    $iframe.on('load', function(){
                        autoplay(this);
                    })
                }else{
                    autoplay($iframe.get(0));
                }
            },
            complete: function(modal) {
                var $modal = $(modal);
                var $iframe = $modal.find('iframe');
                autostop($iframe.get(0));
            }
        })
    }

    if($('#loginModal').length > 0 ){
        $('#loginModal').modal({
            ready: function(modal){
                $('#loginModal .carousel.carousel-slider').carousel({fullWidth: true, noWrap: true }); 
                //Transition to slide if resetting password
                if(location.search.includes("action=rp")) {
                    $('#loginModal .carousel.carousel-slider').carousel('set', 2); 
                }
            }
        });
        //Open modal automatically if reset password is pressent
        if(location.search.includes("action=rp")) {
            $('#loginModal').modal('open');
        }
        $('[data-goto-lost]').on('click', function(){
            $('#loginModal .carousel.carousel-slider').carousel('set', 1); 
        })
        $('[data-goto-login]').on('click', function(){
            $('#loginModal .carousel.carousel-slider').carousel('set', 0); 
        })

    }
}

// Moves the WooCommerce notice to the top of the page
function royal_moveNotice() {
    $('.notice').each(function() {
        $(this).prependTo($('main'));
    });
}


// Moves newly added WooCommerce cart notices to the top of the page
function royal_refreshCartNotice() {
    var cartLoop = setInterval(function() {
        if ($('main .container .notice').length > 0) {
            royal_moveNotice();
            clearInterval(cartLoop);
        }
    }, 250);
}

function royal_quiz() {

    // Asset Protection Quiz
    if ($('#asset-protection-quiz').length) {
        // Materialize carousel settings
        $('#asset-protection-quiz .carousel.carousel-slider').carousel({
            fullWidth: true,
            indicators:true
        });

        // Questions panel display & navigation
        $('.toggle-section').hide();
        $('.btn-quiz-toggle').unbind('click').bind('click',function(){
            $('.toggle-section').slideToggle('fast',function(){
                if($('.toggle-section').css('display')=='block'){
                    $('.btn-quiz-toggle').html("CLOSE QUIZ");
                    $('.btn-quiz-toggle').addClass("close");
                }else{
                    $('.btn-quiz-toggle').html("TAKE THE QUIZ");
                    $('.btn-quiz-toggle').removeClass("close");
                }
            });
        });

        // Results & email
        // Code goes here...
    }

}

$(document).ready(function() {
    'use strict';

    // ---- GLOBAL ---- //
    royal_menus();

    // ---- GENERAL ---- //
    if ($.fn.parallax && $('.parallax').length){
        $('.parallax').parallax();
    }
    if ($.fn.carousel && $('.carousel-slider').length){
        $('.carousel-slider').carousel({
            duration: 350,
            fullWidth: true
        });
    } 


    // ---- MOBILE ---- //


    // ---- LANDING PAGES ---- //
    if ($('#home').length) {
        $('#home .carousel-slider').carousel({
            duration: 350,
            fullWidth: true
        });
        setTimeout(autoplay, 9000);
        function autoplay() {
            $('#home .carousel-slider').carousel('next');
            setTimeout(autoplay, 12000);
        }
    }


    // ---- PROMOTIONS ---- //
    if ($('.modal-trigger').length) {
        royal_modals();
    }
    /* if ($('.quiz').length){
     *     royal_quiz();
     * }*/


    // ---- WOOCOMMERCE ---- //
    if ($('body.woocommerce').length) {
        royal_woocommerce();
    }


    // ---- BLOG ---- //
    if ($('#feed').length) {
        $('#feed .carousel.carousel-slider').carousel({fullWidth: true});
        var columns =  $('#feed .col').first().hasClass('m9') ? 3 : 4;
        var $msnry = $('.masonry').masonry( {
            itemSelector: 'article',
            percentPosition: true,
            fitWidth: true,
            hiddenStyle: {
                transform: 'translateY(100px)',
                opacity: 0
            },
            visibleStyle: {
                transform: 'translateY(0px)',
                opacity: 1
            }
        });

        if ($.fn.imagesLoaded) {
            $msnry.imagesLoaded().progress(function(instance, image) {
                $msnry.masonry('layout');
                resizeImages();
            });
            $(window).on('resize', function() {
                $msnry.masonry('layout');
                resizeImages();
            });
        }

        //button to load more posts via ajax
        $('[data-load-more-posts]').on('click', function(){
            var $this = $(this);
            $this.data('active-text', $this.text()).text("Loading posts...").attr('disabled', true);
            var offset = $this.data("offset");
            var postsPerPage = $this.data("posts-per-page");
            getMorePosts(offset, postsPerPage).then(function(res){
                var $res = $(res);
                $msnry.append( $res ).masonry( 'appended', $res );
                var newOffset = offset+postsPerPage;
                var newParams = '?offset='+ newOffset;
                window.history.pushState({urlPath:newParams},"",newParams)
                $this.data("offset",newOffset);
                $this.text($this.data('active-text')).attr('disabled', false);
            })
        })

        $('[data-toggle-sidebar]').on('click', function(){
            $msnry.masonry('layout', true)
            $('#feed .col').first().toggleClass('m9').toggleClass('m12').toggleClass('with-sidebar');
            $msnry.masonry('layout', true)
            $('#feed .col').last().toggleClass('shown'); 
            setTimeout(function(){
                resizeImages();
            }, 400)
        })

        royal_filterPosts();
    }
    if ($('main#article').length > 0) {
        royal_article();
    }
});

/* $(window).resize(function() {
 *     if ($('.my-account').length) {
 *     }
 * })*/

var didScroll;
$(window).scroll(function(){
    didScroll = true;
    var top = $(window).scrollTop();

    if ($('.hero-container, .parallax-container').length) {
        royal_toggle_menus(top);
    }

    if ($('.consultation').length > 0) {
        var hero = $('.hero-container').height();
        if (top > hero && $('nav').hasClass('no-shadow')) {
            $('nav').removeClass('no-shadow');
        }
        else if (top < hero && !$('nav').hasClass('no-shadow')) {
            $('nav').addClass('no-shadow');
        }
    }
    if($('#feed').length && $('[data-load-more-spinner]').hasClass('hide')){
        if($(window).scrollTop() + $(window).height() + $('footer').height() > $(document).height()) {
            var $spinner = $('[data-load-more-spinner]');
            $spinner.removeClass('hide');
            var offset = $spinner.data("offset");
            var postsPerPage = $spinner.data("posts-per-page");
            getMorePosts(offset, postsPerPage).then(function(res){
                var $res = $(res);
                $('.masonry').append( $res ).masonry( 'appended', $res );
                var newOffset = offset+postsPerPage;
                var newParams = '?offset='+ newOffset;
                window.history.pushState({urlPath:newParams},"",newParams)
                $spinner.data("offset",newOffset);
                $spinner.addClass('hide');
            }).fail(function(){ 
                $spinner.addClass('hide');
            })
        }
    }
});

setInterval(function() {
    if (didScroll) {
        /* toggleNav();*/
        didScroll = false;
    }
}, 250);


function royal_woocommerce() {

    // ---- Notices ---- //
    if ($('.notice').length > 0) {
        royal_moveNotice();
    }
    $(document.body).on('updated_cart_totals', function() {
        royal_moveNotice();
    });

    // ---- Products ---- //
    if ($('main#product').length > 0) {
        $('select').material_select();
    }

    // ---- Cart ---- //
    if ($('.woocommerce-cart-form').length > 0) {
        $('.product-remove a').click(function() {
            royal_refreshCartNotice();
        });
    }

    // ---- Checkout ----- //
    /* $('#payment [type=radio]').click(function() {
     *     console.log('click');
     * });*/
}

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiLCJhcnRpY2xlLmpzIiwiY29uc3VsdGF0aW9uLmpzIiwiY29udGFjdC5qcyIsImZpbHRlclBvc3RzLmpzIiwibG9naW4uanMiLCJtYXNvbnJ5LmpzIiwibWVudXMuanMiLCJtb2RhbHMuanMiLCJub3RpY2UuanMiLCJxdWl6LmpzIiwicmVhZHkuanMiLCJyZXNpemUuanMiLCJzY3JvbGwuanMiLCJ2YWxpZGF0ZS5qcyIsIndvb2NvbW1lcmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMURBO0FBQ0E7QUNEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBnZXRNb3JlUG9zdHMob2Zmc2V0LCBwb3N0c19wZXJfcGFnZSwgY2F0ZWdvcnkpe1xuICByZXR1cm4gJC5hamF4KHtcbiAgICB0eXBlOiAnUE9TVCcsXG4gICAgdXJsOiAnL3dwLWFkbWluL2FkbWluLWFqYXgucGhwJyxcbiAgICBkYXRhOiB7XG4gICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXG4gICAgICBvZmZzZXQ6IG9mZnNldCxcbiAgICAgIHBvc3RzX3Blcl9wYWdlOiBwb3N0c19wZXJfcGFnZSxcbiAgICAgIGFjdGlvbjogJ3Jsc19tb3JlX3Bvc3RzJ1xuICAgIH1cbiAgfSk7XG59IiwiZnVuY3Rpb24gcm95YWxfYXJ0aWNsZSgpIHtcbiAgICAvLyBSZXNwb25zaXZlIGlGcmFtZXNcbiAgICAvKiAkKCdpZnJhbWUnKS53cmFwKCc8ZGl2IGNsYXNzPVwidmlkZW8tY29udGFpbmVyXCI+PC9kaXY+Jyk7Ki9cblxuICAgIC8vIFBhcmFsbGF4XG4gICAgaWYgKCQoJy5wYXJhbGxheC1jb250YWluZXInKS5sZW5ndGgpIHtcbiAgICAgICAgY29uc29sZS5sb2coJ1BBUkFMTEFYJyk7XG4gICAgICAgIHZhciBmZWF0dXJlZCA9ICQoJy5mZWF0dXJlZC1pbWFnZSAucGFyYWxsYXgnKTtcbiAgICAgICAgdmFyIHByb21vdGlvbiA9ICQoJy5wcm9tb3Rpb24taW1hZ2UgLnBhcmFsbGF4Jyk7XG5cbiAgICAgICAgaWYgKGZlYXR1cmVkLmxlbmd0aCAmJiBwcm9tb3Rpb24ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQk9USCcpO1xuICAgICAgICAgICAgZmVhdHVyZWQucGFyYWxsYXgoKTtcbiAgICAgICAgICAgIHByb21vdGlvbi5wYXJhbGxheCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKGZlYXR1cmVkLmxlbmd0aCkge1xuICAgICAgICAgICAgY29uc29sZS5sb2coJ0ZFQVRVUkVEJyk7XG4gICAgICAgICAgICBmZWF0dXJlZC5wYXJhbGxheCgpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2UgaWYgKHByb21vdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQUk9NT1RJTycpO1xuICAgICAgICAgICAgcHJvbW90aW9uLnBhcmFsbGF4KCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRUxTRScpO1xuICAgICAgICAgICAgJCgnLnBhcmFsbGF4JykucGFyYWxsYXgoKTtcbiAgICAgICAgfVxuICAgIH1cbn1cbiIsImZ1bmN0aW9uIHJveWFsX2NvbnN1bHRhdGlvbigpIHtcbiAgICAkKCduYXYnKS5hZGRDbGFzcygnbm8tc2hhZG93Jyk7XG59XG4iLCJmdW5jdGlvbiByb3lhbF9jb250YWN0KCkge1xuICAgIC8vIFN1Ym1pc3Npb25cbiAgICAkKCdmb3JtJykuc3VibWl0KGZ1bmN0aW9uKGUpIHtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICB2YXIgZmlyc3QgICA9ICQoXCIjZmlyc3RcIikudmFsKCk7XG4gICAgICAgIHZhciBsYXN0ICAgID0gJChcIiNsYXN0XCIpLnZhbCgpO1xuICAgICAgICB2YXIgcGhvbmUgICA9ICQoXCIjcGhvbmVcIikudmFsKCk7XG4gICAgICAgIHZhciBlbWFpbCAgID0gJChcIiNlbWFpbFwiKS52YWwoKTtcbiAgICAgICAgdmFyIG1lc3NhZ2UgPSAkKFwiI21lc3NhZ2VcIikudmFsKCk7XG4gICAgICAgIHZhciBzdWJtaXQgID0gJChcImJ1dHRvblt0eXBlPSdzdWJtaXQnXVwiKTtcbiAgICAgICAgdmFyIGNpcmNsZXMgPSAkKFwiLnByZWxvYWRlci13cmFwcGVyXCIpLnBhcmVudCgpO1xuICAgICAgICB2YXIgY29uZmlybSA9ICQoXCIuY29uZmlybVwiKTtcblxuICAgICAgICAvLyBSZW1vdmVzIGV4aXN0aW5nIHZhbGlkYXRpb25cbiAgICAgICAgY29uZmlybS5yZW1vdmVDbGFzcygncGluayBncmVlbicpLmFkZENsYXNzKCdoaWRlJykuZmluZCgncCcpLnJlbW92ZSgpO1xuICAgICAgICAkKCcuaW52YWxpZCwgLnZhbGlkJykucmVtb3ZlQ2xhc3MoJ2ludmFsaWQgdmFsaWQnKTtcblxuICAgICAgICAvLyBWYWxpZGF0aW9uXG4gICAgICAgIGlmIChmaXJzdCA9PSBcIlwiIHx8IGxhc3QgPT0gXCJcIiB8fCBwaG9uZSA9PSBcIlwiIHx8IGVtYWlsID09IFwiXCIpIHtcbiAgICAgICAgICAgIGNvbmZpcm0uYWRkQ2xhc3MoJ3BpbmsnKS5yZW1vdmVDbGFzcygnaGlkZScpLmh0bWwoXCI8cD5Pb3BzLCBsb29rcyBsaWtlIHdlJ3JlIG1pc3Npbmcgc29tZSBpbmZvcm1hdGlvbi4gUGxlYXNlIGZpbGwgb3V0IGFsbCB0aGUgZmllbGRzLjwvcD5cIik7XG4gICAgICAgIH1cblxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIC8vIFRvZ2dsZSBQcmVsb2FkZXJcbiAgICAgICAgICAgIHN1Ym1pdC5hZGRDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgY2lyY2xlcy5yZW1vdmVDbGFzcygnaGlkZScpO1xuXG4gICAgICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgICAgICB1cmw6IFwiL3dwLWFkbWluL2FkbWluLWFqYXgucGhwXCIsXG4gICAgICAgICAgICAgICAgZGF0YToge1xuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdjb250YWN0X3VzX2Zvcm0nLFxuICAgICAgICAgICAgICAgICAgICBmaXJzdDogZmlyc3QsXG4gICAgICAgICAgICAgICAgICAgIGxhc3Q6IGxhc3QsXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZSxcbiAgICAgICAgICAgICAgICAgICAgZW1haWw6IGVtYWlsLFxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLnJlcGxhY2UoLyg/OlxcclxcbnxcXHJ8XFxuKS9nLCAnPGJyLz4nKSxcbiAgICAgICAgICAgICAgICB9LFxuXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcIjBcIikge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRXJyb3IgbWVzc2FnZVxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybS5hZGRDbGFzcygncGluaycpLnJlbW92ZUNsYXNzKCdoaWRlJykuaHRtbChcIjxwPk9vcHMsIGxvb2tzIGxpa2UgdGhlcmUgd2FzIGEgcHJvYmxlbSEgQ2hlY2sgYmFjayBsYXRlciBvciBlbWFpbCB1cyBkaXJlY3RseSBhdCA8YSBocmVmPSdtYWlsdG86c2NvdHRAcm95YWxsZWdhbHNvbHV0aW9ucy5jb20nPnNjb3R0QHJveWFsbGVnYWxzb2x1dGlvbnMuY29tPC9hPi48L3A+XCIpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VjY2VzcyBtZXNzYWdlXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtLmFkZENsYXNzKCdncmVlbicpLnJlbW92ZUNsYXNzKCdoaWRlJykuaHRtbChcIjxwPlN1Y2Nlc3MhIENoZWNrIHlvdXIgZW1haWwuIFdlJ2xsIGJlIGluIHRvdWNoIHNob3J0bHkuPC9wPlwiKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBlcnJvcjogZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgICAgICAgICAgICAgIC8vIEVycm9yIG1lc3NhZ2VcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybS5hZGRDbGFzcygncGluaycpLnJlbW92ZUNsYXNzKCdoaWRlJykuaHRtbChcIjxwPk9vcHMsIGxvb2tzIGxpa2UgdGhlcmUgd2FzIGEgcHJvYmxlbSEgQ2hlY2sgYmFjayBsYXRlciBvciBlbWFpbCB1cyBkaXJlY3RseSBhdCA8YSBocmVmPSdtYWlsdG86c2NvdHRAcm95YWxsZWdhbHNvbHV0aW9ucy5jb20nPnNjb3R0QHJveWFsbGVnYWxzb2x1dGlvbnMuY29tPC9hPi48L3A+XCIpO1xuICAgICAgICAgICAgICAgIH0sXG5cbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVzKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJ2Zvcm0nKVswXS5yZXNldCgpO1xuICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKCk7XG4gICAgICAgICAgICAgICAgICAgICQoJ2Zvcm0gdGV4dGFyZWEnKS50cmlnZ2VyKCdhdXRvcmVzaXplJyk7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIFByZWxvYWRlclxuICAgICAgICAgICAgICAgICAgICBjaXJjbGVzLmFkZENsYXNzKCdoaWRlJyk7XG4gICAgICAgICAgICAgICAgICAgIHN1Ym1pdC5yZW1vdmVDbGFzcygnaGlkZScpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4iLCJmdW5jdGlvbiByb3lhbF9maWx0ZXJQb3N0cygpIHtcbiAgICAkKCcjc2VhcmNoJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xuICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS52YWwoKTtcblxuICAgICAgICAvLyBFeHRlbmQgOmNvbnRhaW5zIHNlbGVjdG9yXG4gICAgICAgIGpRdWVyeS5leHByWyc6J10uY29udGFpbnMgPSBmdW5jdGlvbihhLCBpLCBtKSB7XG4gICAgICAgICAgICByZXR1cm4galF1ZXJ5KGEpLnRleHQoKS50b1VwcGVyQ2FzZSgpLmluZGV4T2YobVszXS50b1VwcGVyQ2FzZSgpKSA+PSAwO1xuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEhpZGVzIGNhcmRzIHRoYXQgZG9uJ3QgbWF0Y2ggaW5wdXRcbiAgICAgICAgJChcIiNmZWVkIC5jb250ZW50IC5jYXJkLWNvbnRhaW5lcjp2aXNpYmxlIGFydGljbGUgLmNhcmQtdGl0bGUgYTpub3QoOmNvbnRhaW5zKFwiK2ZpbHRlcitcIikpXCIpLmNsb3Nlc3QoJy5jYXJkLWNvbnRhaW5lcicpLmZhZGVPdXQoKTtcblxuICAgICAgICAvLyBTaG93cyBjYXJkcyB0aGF0IG1hdGNoIGlucHV0XG4gICAgICAgICQoXCIjZmVlZCAuY29udGVudCAuY2FyZC1jb250YWluZXI6bm90KDp2aXNpYmxlKSBhcnRpY2xlIC5jYXJkLXRpdGxlIGE6Y29udGFpbnMoXCIrZmlsdGVyK1wiKVwiKS5jbG9zZXN0KCcuY2FyZC1jb250YWluZXInKS5mYWRlSW4oKTtcblxuICAgICAgICAvLyBBZGQgZW1wdHkgbWVzc2FnZSB3aGVuIGlmIG5vIHBvc3RzIGFyZSB2aXNpYmxlXG4gICAgICAgIHZhciBtZXNzYWdlID0gJCgnI2ZlZWQgI25vLXJlc3VsdHMnKTtcbiAgICAgICAgaWYgKCQoXCIjZmVlZCAuY29udGVudCAuY2FyZC1jb250YWluZXI6dmlzaWJsZSBhcnRpY2xlIC5jYXJkLXRpdGxlIGE6Y29udGFpbnMoXCIrZmlsdGVyK1wiKVwiKS5zaXplKCkgPT0gMCkge1xuICAgICAgICAgICAgaWYgKG1lc3NhZ2UuaGFzQ2xhc3MoJ2hpZGUnKSkge1xuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgICAgICAgICQoJyNmZWVkICNuby1yZXN1bHRzJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgICAgICB9LCA0MDApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbWVzc2FnZS5maW5kKCcudGFyZ2V0JykudGV4dChmaWx0ZXIpO1xuICAgICAgICB9IGVsc2UgeyBtZXNzYWdlLmFkZENsYXNzKCdoaWRlJyk7IH1cblxuICAgIH0pLmtleXVwKGZ1bmN0aW9uKCkge1xuICAgICAgICAkKHRoaXMpLmNoYW5nZSgpO1xuICAgIH0pO1xufVxuIiwialF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XG4gICAgLy8gUGVyZm9ybSBBSkFYIGxvZ2luIG9uIGZvcm0gc3VibWl0XG4gICAgJCgnZm9ybSNsb2dpbicpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHVybDogJy93cC1hZG1pbi9hZG1pbi1hamF4LnBocCcsXG4gICAgICAgICAgICBkYXRhOiB7IFxuICAgICAgICAgICAgICAgICdhY3Rpb24nOiAnYWpheF9sb2dpbicsXG4gICAgICAgICAgICAgICAgJ3VzZXJuYW1lJzogJCgnZm9ybSNsb2dpbiAjbG9naW5Vc2VybmFtZScpLnZhbCgpLCBcbiAgICAgICAgICAgICAgICAncGFzc3dvcmQnOiAkKCdmb3JtI2xvZ2luICNsb2dpblBhc3N3b3JkJykudmFsKCksIFxuICAgICAgICAgICAgICAgICdyZW1lbWJlcic6ICQoJ2Zvcm0jbG9naW4gI2xvZ2luUmVtZW1iZXInKS5hdHRyKFwiY2hlY2tlZFwiKSwgXG4gICAgICAgICAgICAgICAgJ2xvZ2luU2VjdXJpdHknOiAkKCdmb3JtI2xvZ2luICNsb2dpblNlY3VyaXR5JykudmFsKCkgXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgJCgnZm9ybSNsb2dpbiBwLnN0YXR1cycpLnRleHQoZGF0YS5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5sb2dnZWRpbiA9PSB0cnVlKXtcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAkKCdmb3JtI3Bhc3N3b3JkTG9zdCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAkLmFqYXgoe1xuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHVybDogJy93cC1hZG1pbi9hZG1pbi1hamF4LnBocCcsIFxuICAgICAgICAgICAgZGF0YTogeyBcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2xvc3RfcGFzcycsXG4gICAgICAgICAgICAgICAgJ3VzZXJfbG9naW4nOiAkKCdmb3JtI3Bhc3N3b3JkTG9zdCAjbG9zdFVzZXJuYW1lJykudmFsKCksXG4gICAgICAgICAgICAgICAgJ2xvc3RTZWN1cml0eSc6ICQoJ2Zvcm0jcGFzc3dvcmRMb3N0ICNsb3N0U2VjdXJpdHknKS52YWwoKVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICAgICAgICAgICQoJ2Zvcm0jcGFzc3dvcmRMb3N0IHAuc3RhdHVzJykudGV4dChkYXRhLm1lc3NhZ2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbiAgICAkKCdmb3JtI3Bhc3N3b3JkUmVzZXQnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgJC5hamF4KHtcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXG4gICAgICAgICAgICB1cmw6ICcvd3AtYWRtaW4vYWRtaW4tYWpheC5waHAnLCBcbiAgICAgICAgICAgIGRhdGE6IHsgXG4gICAgICAgICAgICAgICAgYWN0aW9uOiBcdCdyZXNldF9wYXNzJyxcbiAgICAgICAgICAgICAgICBwYXNzMTpcdFx0JCgnZm9ybSNwYXNzd29yZFJlc2V0ICNyZXNldFBhc3MxJykudmFsKCksXG4gICAgICAgICAgICAgICAgcGFzczI6XHRcdCQoJ2Zvcm0jcGFzc3dvcmRSZXNldCAjcmVzZXRQYXNzMicpLnZhbCgpLFxuICAgICAgICAgICAgICAgIHVzZXJfa2V5Olx0JCgnZm9ybSNwYXNzd29yZFJlc2V0ICN1c2VyX2tleScpLnZhbCgpLFxuICAgICAgICAgICAgICAgIHVzZXJfbG9naW46XHQkKCdmb3JtI3Bhc3N3b3JkUmVzZXQgI3VzZXJfbG9naW4nKS52YWwoKSxcbiAgICAgICAgICAgICAgICAncmVzZXRTZWN1cml0eSc6ICQoJ2Zvcm0jcGFzc3dvcmRSZXNldCAjcmVzZXRTZWN1cml0eScpLnZhbCgpXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgICAgICAgICAgJCgnZm9ybSNwYXNzd29yZExvc3QgcC5zdGF0dXMnKS50ZXh0KGRhdGEubWVzc2FnZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH0pO1xufSk7IiwiIWZ1bmN0aW9uKHQsbil7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9bigpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUobik6dC5NYWN5PW4oKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxuKXt2YXIgZT12b2lkIDA7cmV0dXJuIGZ1bmN0aW9uKCl7ZSYmY2xlYXJUaW1lb3V0KGUpLGU9c2V0VGltZW91dCh0LG4pfX1mdW5jdGlvbiBuKHQsbil7Zm9yKHZhciBlPXQubGVuZ3RoLG89ZSxyPVtdO2UtLTspci5wdXNoKG4odFtvLWUtMV0pKTtyZXR1cm4gcn1mdW5jdGlvbiBlKHQsbil7QSh0LG4sYXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXSl9ZnVuY3Rpb24gbyh0KXtmb3IodmFyIG49dC5vcHRpb25zLGU9dC5yZXNwb25zaXZlT3B0aW9ucyxvPXQua2V5cyxyPXQuZG9jV2lkdGgsaT12b2lkIDAscz0wO3M8by5sZW5ndGg7cysrKXt2YXIgYT1wYXJzZUludChvW3NdLDEwKTtyPj1hJiYoaT1uLmJyZWFrQXRbYV0sTyhpLGUpKX1yZXR1cm4gZX1mdW5jdGlvbiByKHQpe2Zvcih2YXIgbj10Lm9wdGlvbnMsZT10LnJlc3BvbnNpdmVPcHRpb25zLG89dC5rZXlzLHI9dC5kb2NXaWR0aCxpPXZvaWQgMCxzPW8ubGVuZ3RoLTE7cz49MDtzLS0pe3ZhciBhPXBhcnNlSW50KG9bc10sMTApO3I8PWEmJihpPW4uYnJlYWtBdFthXSxPKGksZSkpfXJldHVybiBlfWZ1bmN0aW9uIGkodCl7dmFyIG49ZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxlPXtjb2x1bW5zOnQuY29sdW1uc307TCh0Lm1hcmdpbik/ZS5tYXJnaW49e3g6dC5tYXJnaW4ueCx5OnQubWFyZ2luLnl9OmUubWFyZ2luPXt4OnQubWFyZ2luLHk6dC5tYXJnaW59O3ZhciBpPU9iamVjdC5rZXlzKHQuYnJlYWtBdCk7cmV0dXJuIHQubW9iaWxlRmlyc3Q/byh7b3B0aW9uczp0LHJlc3BvbnNpdmVPcHRpb25zOmUsa2V5czppLGRvY1dpZHRoOm59KTpyKHtvcHRpb25zOnQscmVzcG9uc2l2ZU9wdGlvbnM6ZSxrZXlzOmksZG9jV2lkdGg6bn0pfWZ1bmN0aW9uIHModCl7cmV0dXJuIGkodCkuY29sdW1uc31mdW5jdGlvbiBhKHQpe3JldHVybiBpKHQpLm1hcmdpbn1mdW5jdGlvbiBjKHQpe3ZhciBuPSEoYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0pfHxhcmd1bWVudHNbMV0sZT1zKHQpLG89YSh0KS54LHI9MTAwL2U7cmV0dXJuIG4/MT09PWU/XCIxMDAlXCI6KG89KGUtMSkqby9lLFwiY2FsYyhcIityK1wiJSAtIFwiK28rXCJweClcIik6cn1mdW5jdGlvbiB1KHQsbil7dmFyIGU9cyh0Lm9wdGlvbnMpLG89MCxyPXZvaWQgMCxpPXZvaWQgMDtyZXR1cm4gMT09PSsrbj8wOihpPWEodC5vcHRpb25zKS54LHI9KGktKGUtMSkqaS9lKSoobi0xKSxvKz1jKHQub3B0aW9ucywhMSkqKG4tMSksXCJjYWxjKFwiK28rXCIlICsgXCIrcitcInB4KVwiKX1mdW5jdGlvbiBsKHQpe3ZhciBuPTAsZT10LmNvbnRhaW5lcjttKHQucm93cyxmdW5jdGlvbih0KXtuPXQ+bj90Om59KSxlLnN0eWxlLmhlaWdodD1uK1wicHhcIn1mdW5jdGlvbiBwKHQsbil7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXSxvPSEoYXJndW1lbnRzLmxlbmd0aD4zJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10pfHxhcmd1bWVudHNbM10scj1zKHQub3B0aW9ucyksaT1hKHQub3B0aW9ucykueTtDKHQscixlKSxtKG4sZnVuY3Rpb24obil7dmFyIGU9MCxyPXBhcnNlSW50KG4ub2Zmc2V0SGVpZ2h0LDEwKTtpc05hTihyKXx8KHQucm93cy5mb3JFYWNoKGZ1bmN0aW9uKG4sbyl7bjx0LnJvd3NbZV0mJihlPW8pfSksbi5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsbi5zdHlsZS50b3A9dC5yb3dzW2VdK1wicHhcIixuLnN0eWxlLmxlZnQ9XCJcIit0LmNvbHNbZV0sdC5yb3dzW2VdKz1pc05hTihyKT8wOnIraSxvJiYobi5kYXRhc2V0Lm1hY3lDb21wbGV0ZT0xKSl9KSxvJiYodC50bXBSb3dzPW51bGwpLGwodCl9ZnVuY3Rpb24gaCh0LG4pe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl0sbz0hKGFyZ3VtZW50cy5sZW5ndGg+MyYmdm9pZCAwIT09YXJndW1lbnRzWzNdKXx8YXJndW1lbnRzWzNdLHI9cyh0Lm9wdGlvbnMpLGk9YSh0Lm9wdGlvbnMpLnk7Qyh0LHIsZSksbShuLGZ1bmN0aW9uKG4pe3QubGFzdGNvbD09PXImJih0Lmxhc3Rjb2w9MCk7dmFyIGU9TShuLFwiaGVpZ2h0XCIpO2U9cGFyc2VJbnQobi5vZmZzZXRIZWlnaHQsMTApLGlzTmFOKGUpfHwobi5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsbi5zdHlsZS50b3A9dC5yb3dzW3QubGFzdGNvbF0rXCJweFwiLG4uc3R5bGUubGVmdD1cIlwiK3QuY29sc1t0Lmxhc3Rjb2xdLHQucm93c1t0Lmxhc3Rjb2xdKz1pc05hTihlKT8wOmUraSx0Lmxhc3Rjb2wrPTEsbyYmKG4uZGF0YXNldC5tYWN5Q29tcGxldGU9MSkpfSksbyYmKHQudG1wUm93cz1udWxsKSxsKHQpfXZhciBmPWZ1bmN0aW9uIHQobixlKXtpZighKHRoaXMgaW5zdGFuY2VvZiB0KSlyZXR1cm4gbmV3IHQobixlKTtpZihuPW4ucmVwbGFjZSgvXlxccyovLFwiXCIpLnJlcGxhY2UoL1xccyokLyxcIlwiKSxlKXJldHVybiB0aGlzLmJ5Q3NzKG4sZSk7Zm9yKHZhciBvIGluIHRoaXMuc2VsZWN0b3JzKWlmKGU9by5zcGxpdChcIi9cIiksbmV3IFJlZ0V4cChlWzFdLGVbMl0pLnRlc3QobikpcmV0dXJuIHRoaXMuc2VsZWN0b3JzW29dKG4pO3JldHVybiB0aGlzLmJ5Q3NzKG4pfTtmLnByb3RvdHlwZS5ieUNzcz1mdW5jdGlvbih0LG4pe3JldHVybihufHxkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbCh0KX0sZi5wcm90b3R5cGUuc2VsZWN0b3JzPXt9LGYucHJvdG90eXBlLnNlbGVjdG9yc1svXlxcLltcXHdcXC1dKyQvXT1mdW5jdGlvbih0KXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0LnN1YnN0cmluZygxKSl9LGYucHJvdG90eXBlLnNlbGVjdG9yc1svXlxcdyskL109ZnVuY3Rpb24odCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHQpfSxmLnByb3RvdHlwZS5zZWxlY3RvcnNbL15cXCNbXFx3XFwtXSskL109ZnVuY3Rpb24odCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQuc3Vic3RyaW5nKDEpKX07dmFyIG09ZnVuY3Rpb24odCxuKXtmb3IodmFyIGU9dC5sZW5ndGgsbz1lO2UtLTspbih0W28tZS0xXSl9LHY9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO3RoaXMucnVubmluZz0hMSx0aGlzLmV2ZW50cz1bXSx0aGlzLmFkZCh0KX07di5wcm90b3R5cGUucnVuPWZ1bmN0aW9uKCl7aWYoIXRoaXMucnVubmluZyYmdGhpcy5ldmVudHMubGVuZ3RoPjApe3ZhciB0PXRoaXMuZXZlbnRzLnNoaWZ0KCk7dGhpcy5ydW5uaW5nPSEwLHQoKSx0aGlzLnJ1bm5pbmc9ITEsdGhpcy5ydW4oKX19LHYucHJvdG90eXBlLmFkZD1mdW5jdGlvbigpe3ZhciB0PXRoaXMsbj1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO3JldHVybiEhbiYmKEFycmF5LmlzQXJyYXkobik/bShuLGZ1bmN0aW9uKG4pe3JldHVybiB0LmFkZChuKX0pOih0aGlzLmV2ZW50cy5wdXNoKG4pLHZvaWQgdGhpcy5ydW4oKSkpfSx2LnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuZXZlbnRzPVtdfTt2YXIgZD1mdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e307cmV0dXJuIHRoaXMuaW5zdGFuY2U9dCx0aGlzLmRhdGE9bix0aGlzfSxnPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTt0aGlzLmV2ZW50cz17fSx0aGlzLmluc3RhbmNlPXR9O2cucHJvdG90eXBlLm9uPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07cmV0dXJuISghdHx8IW4pJiYoQXJyYXkuaXNBcnJheSh0aGlzLmV2ZW50c1t0XSl8fCh0aGlzLmV2ZW50c1t0XT1bXSksdGhpcy5ldmVudHNbdF0ucHVzaChuKSl9LGcucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9O2lmKCF0fHwhQXJyYXkuaXNBcnJheSh0aGlzLmV2ZW50c1t0XSkpcmV0dXJuITE7dmFyIGU9bmV3IGQodGhpcy5pbnN0YW5jZSxuKTttKHRoaXMuZXZlbnRzW3RdLGZ1bmN0aW9uKHQpe3JldHVybiB0KGUpfSl9O3ZhciB5PWZ1bmN0aW9uKHQpe3JldHVybiEoXCJuYXR1cmFsSGVpZ2h0XCJpbiB0JiZ0Lm5hdHVyYWxIZWlnaHQrdC5uYXR1cmFsV2lkdGg9PT0wKXx8dC53aWR0aCt0LmhlaWdodCE9PTB9LEU9ZnVuY3Rpb24odCxuKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbih0LGUpe2lmKG4uY29tcGxldGUpcmV0dXJuIHkobik/dChuKTplKG4pO24uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixmdW5jdGlvbigpe3JldHVybiB5KG4pP3Qobik6ZShuKX0pLG4uYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZnVuY3Rpb24oKXtyZXR1cm4gZShuKX0pfSkudGhlbihmdW5jdGlvbihuKXtlJiZ0LmVtaXQodC5jb25zdGFudHMuRVZFTlRfSU1BR0VfTE9BRCx7aW1nOm59KX0pLmNhdGNoKGZ1bmN0aW9uKG4pe3JldHVybiB0LmVtaXQodC5jb25zdGFudHMuRVZFTlRfSU1BR0VfRVJST1Ise2ltZzpufSl9KX0sdz1mdW5jdGlvbih0LGUpe3ZhciBvPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07cmV0dXJuIG4oZSxmdW5jdGlvbihuKXtyZXR1cm4gRSh0LG4sbyl9KX0sQT1mdW5jdGlvbih0LG4pe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07cmV0dXJuIFByb21pc2UuYWxsKHcodCxuLGUpKS50aGVuKGZ1bmN0aW9uKCl7dC5lbWl0KHQuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0NPTVBMRVRFKX0pfSxJPWZ1bmN0aW9uKG4pe3JldHVybiB0KGZ1bmN0aW9uKCl7bi5lbWl0KG4uY29uc3RhbnRzLkVWRU5UX1JFU0laRSksbi5xdWV1ZS5hZGQoZnVuY3Rpb24oKXtyZXR1cm4gbi5yZWNhbGN1bGF0ZSghMCwhMCl9KX0sMTAwKX0sTj1mdW5jdGlvbih0KXtpZih0LmNvbnRhaW5lcj1mKHQub3B0aW9ucy5jb250YWluZXIpLHQuY29udGFpbmVyIGluc3RhbmNlb2YgZnx8IXQuY29udGFpbmVyKXJldHVybiEhdC5vcHRpb25zLmRlYnVnJiZjb25zb2xlLmVycm9yKFwiRXJyb3I6IENvbnRhaW5lciBub3QgZm91bmRcIik7ZGVsZXRlIHQub3B0aW9ucy5jb250YWluZXIsdC5jb250YWluZXIubGVuZ3RoJiYodC5jb250YWluZXI9dC5jb250YWluZXJbMF0pLHQuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIn0sVD1mdW5jdGlvbih0KXt0LnF1ZXVlPW5ldyB2LHQuZXZlbnRzPW5ldyBnKHQpLHQucm93cz1bXSx0LnJlc2l6ZXI9SSh0KX0sYj1mdW5jdGlvbih0KXt2YXIgbj1mKFwiaW1nXCIsdC5jb250YWluZXIpO3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdC5yZXNpemVyKSx0Lm9uKHQuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0xPQUQsZnVuY3Rpb24oKXtyZXR1cm4gdC5yZWNhbGN1bGF0ZSghMSwhMSl9KSx0Lm9uKHQuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0NPTVBMRVRFLGZ1bmN0aW9uKCl7cmV0dXJuIHQucmVjYWxjdWxhdGUoITAsITApfSksdC5vcHRpb25zLnVzZU93bkltYWdlTG9hZGVyfHxlKHQsbiwhdC5vcHRpb25zLndhaXRGb3JJbWFnZXMpLHQuZW1pdCh0LmNvbnN0YW50cy5FVkVOVF9JTklUSUFMSVpFRCl9LF89ZnVuY3Rpb24odCl7Tih0KSxUKHQpLGIodCl9LEw9ZnVuY3Rpb24odCl7cmV0dXJuIHQ9PT1PYmplY3QodCkmJlwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KX0sTz1mdW5jdGlvbih0LG4pe0wodCl8fChuLmNvbHVtbnM9dCksTCh0KSYmdC5jb2x1bW5zJiYobi5jb2x1bW5zPXQuY29sdW1ucyksTCh0KSYmdC5tYXJnaW4mJiFMKHQubWFyZ2luKSYmKG4ubWFyZ2luPXt4OnQubWFyZ2luLHk6dC5tYXJnaW59KSxMKHQpJiZ0Lm1hcmdpbiYmTCh0Lm1hcmdpbikmJnQubWFyZ2luLngmJihuLm1hcmdpbi54PXQubWFyZ2luLngpLEwodCkmJnQubWFyZ2luJiZMKHQubWFyZ2luKSYmdC5tYXJnaW4ueSYmKG4ubWFyZ2luLnk9dC5tYXJnaW4ueSl9LE09ZnVuY3Rpb24odCxuKXtyZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodCxudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKG4pfSxDPWZ1bmN0aW9uKHQsbil7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXTtpZih0Lmxhc3Rjb2x8fCh0Lmxhc3Rjb2w9MCksdC5yb3dzLmxlbmd0aDwxJiYoZT0hMCksZSl7dC5yb3dzPVtdLHQuY29scz1bXSx0Lmxhc3Rjb2w9MDtmb3IodmFyIG89bi0xO28+PTA7by0tKXQucm93c1tvXT0wLHQuY29sc1tvXT11KHQsbyl9ZWxzZSBpZih0LnRtcFJvd3Mpe3Qucm93cz1bXTtmb3IodmFyIG89bi0xO28+PTA7by0tKXQucm93c1tvXT10LnRtcFJvd3Nbb119ZWxzZXt0LnRtcFJvd3M9W107Zm9yKHZhciBvPW4tMTtvPj0wO28tLSl0LnRtcFJvd3Nbb109dC5yb3dzW29dfX0sVj1mdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdLGU9IShhcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSl8fGFyZ3VtZW50c1syXSxvPW4/dC5jb250YWluZXIuY2hpbGRyZW46ZignOnNjb3BlID4gKjpub3QoW2RhdGEtbWFjeS1jb21wbGV0ZT1cIjFcIl0pJyx0LmNvbnRhaW5lcikscj1jKHQub3B0aW9ucyk7cmV0dXJuIG0obyxmdW5jdGlvbih0KXtuJiYodC5kYXRhc2V0Lm1hY3lDb21wbGV0ZT0wKSx0LnN0eWxlLndpZHRoPXJ9KSx0Lm9wdGlvbnMudHJ1ZU9yZGVyPyhoKHQsbyxuLGUpLHQuZW1pdCh0LmNvbnN0YW50cy5FVkVOVF9SRUNBTENVTEFURUQpKToocCh0LG8sbixlKSx0LmVtaXQodC5jb25zdGFudHMuRVZFTlRfUkVDQUxDVUxBVEVEKSl9LFI9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odCl7Zm9yKHZhciBuPTE7bjxhcmd1bWVudHMubGVuZ3RoO24rKyl7dmFyIGU9YXJndW1lbnRzW25dO2Zvcih2YXIgbyBpbiBlKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLG8pJiYodFtvXT1lW29dKX1yZXR1cm4gdH0seD17Y29sdW1uczo0LG1hcmdpbjoyLHRydWVPcmRlcjohMSx3YWl0Rm9ySW1hZ2VzOiExLHVzZUltYWdlTG9hZGVyOiEwLGJyZWFrQXQ6e30sdXNlT3duSW1hZ2VMb2FkZXI6ITEsb25Jbml0OiExfTshZnVuY3Rpb24oKXt0cnl7ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikucXVlcnlTZWxlY3RvcihcIjpzY29wZSAqXCIpfWNhdGNoKHQpeyFmdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKGUmJm4udGVzdChlKSl7dmFyIG89dGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtvfHwodGhpcy5pZD1cInFcIitNYXRoLmZsb29yKDllNipNYXRoLnJhbmRvbSgpKSsxZTYpLGFyZ3VtZW50c1swXT1lLnJlcGxhY2UobixcIiNcIit0aGlzLmlkKTt2YXIgcj10LmFwcGx5KHRoaXMsYXJndW1lbnRzKTtyZXR1cm4gbnVsbD09PW8/dGhpcy5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTpvfHwodGhpcy5pZD1vKSxyfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19dmFyIG49LzpzY29wZVxcYi9naSxlPXQoRWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3Rvcik7RWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3Rvcj1mdW5jdGlvbih0KXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O3ZhciBvPXQoRWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3RvckFsbCk7RWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3RvckFsbD1mdW5jdGlvbih0KXtyZXR1cm4gby5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfX0oKTt2YXIgcT1mdW5jdGlvbiB0KCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOng7aWYoISh0aGlzIGluc3RhbmNlb2YgdCkpcmV0dXJuIG5ldyB0KG4pO3RoaXMub3B0aW9ucz17fSxSKHRoaXMub3B0aW9ucyx4LG4pLF8odGhpcyl9O3JldHVybiBxLmluaXQ9ZnVuY3Rpb24odCl7cmV0dXJuIGNvbnNvbGUud2FybihcIkRlcHJlY2lhdGVkOiBNYWN5LmluaXQgd2lsbCBiZSByZW1vdmVkIGluIHYzLjAuMCBvcHQgdG8gdXNlIE1hY3kgZGlyZWN0bHkgbGlrZSBzbyBNYWN5KHsgLypvcHRpb25zIGhlcmUqLyB9KSBcIiksbmV3IHEodCl9LHEucHJvdG90eXBlLnJlY2FsY3VsYXRlT25JbWFnZUxvYWQ9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO3JldHVybiBlKHRoaXMsZihcImltZ1wiLHRoaXMuY29udGFpbmVyKSwhdCl9LHEucHJvdG90eXBlLnJ1bk9uSW1hZ2VMb2FkPWZ1bmN0aW9uKHQpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0sbz1mKFwiaW1nXCIsdGhpcy5jb250YWluZXIpO3JldHVybiB0aGlzLm9uKHRoaXMuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0NPTVBMRVRFLHQpLG4mJnRoaXMub24odGhpcy5jb25zdGFudHMuRVZFTlRfSU1BR0VfTE9BRCx0KSxlKHRoaXMsbyxuKX0scS5wcm90b3R5cGUucmVjYWxjdWxhdGU9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG49YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxlPSEoYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0pfHxhcmd1bWVudHNbMV07cmV0dXJuIGUmJnRoaXMucXVldWUuY2xlYXIoKSx0aGlzLnF1ZXVlLmFkZChmdW5jdGlvbigpe3JldHVybiBWKHQsbixlKX0pfSxxLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oKXt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMucmVzaXplciksbSh0aGlzLmNvbnRhaW5lci5jaGlsZHJlbixmdW5jdGlvbih0KXt0LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtbWFjeS1jb21wbGV0ZVwiKSx0LnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpfSksdGhpcy5jb250YWluZXIucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIil9LHEucHJvdG90eXBlLnJlSW5pdD1mdW5jdGlvbigpe3RoaXMucmVjYWxjdWxhdGUoITAsITApLHRoaXMuZW1pdCh0aGlzLmNvbnN0YW50cy5FVkVOVF9JTklUSUFMSVpFRCksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLnJlc2l6ZXIpLHRoaXMuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIn0scS5wcm90b3R5cGUub249ZnVuY3Rpb24odCxuKXt0aGlzLmV2ZW50cy5vbih0LG4pfSxxLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKHQsbil7dGhpcy5ldmVudHMuZW1pdCh0LG4pfSxxLmNvbnN0YW50cz17RVZFTlRfSU5JVElBTElaRUQ6XCJtYWN5LmluaXRpYWxpemVkXCIsRVZFTlRfUkVDQUxDVUxBVEVEOlwibWFjeS5yZWNhbGN1bGF0ZWRcIixFVkVOVF9JTUFHRV9MT0FEOlwibWFjeS5pbWFnZS5sb2FkXCIsRVZFTlRfSU1BR0VfRVJST1I6XCJtYWN5LmltYWdlLmVycm9yXCIsRVZFTlRfSU1BR0VfQ09NUExFVEU6XCJtYWN5LmltYWdlcy5jb21wbGV0ZVwiLEVWRU5UX1JFU0laRTpcIm1hY3kucmVzaXplXCJ9LHEucHJvdG90eXBlLmNvbnN0YW50cz1xLmNvbnN0YW50cyxxfSk7XG4iLCJmdW5jdGlvbiByb3lhbF9tZW51cygpIHtcbiAgICAvLyBNb2JpbGUgTWVudVxuICAgICQoXCIjbW9iaWxlLW1lbnVcIikuc2lkZU5hdih7XG4gICAgICAgIG1lbnVXaWR0aDogMjYwLFxuICAgICAgICBlZGdlOiAncmlnaHQnXG4gICAgfSk7XG5cblxuICAgIC8vIERyb3Bkb3duc1xuICAgICQoXCJuYXYgLmRyb3Bkb3duLWJ1dHRvblwiKS5kcm9wZG93bih7XG4gICAgICAgIGNvbnN0cmFpbldpZHRoOiBmYWxzZVxuICAgIH0pO1xuXG5cbiAgICAvLyBIZXJvIERpc3BsYXlzXG4gICAgaWYgKCQoJy5oZXJvLWNvbnRhaW5lciwgLnBhcmFsbGF4LWNvbnRhaW5lcicpLmxlbmd0aCkge1xuICAgICAgICAkKCduYXYnKS5hZGRDbGFzcygndHJhbnNwYXJlbnQnKTtcbiAgICB9XG59XG5cblxuZnVuY3Rpb24gcm95YWxfdG9nZ2xlX21lbnVzKHRvcCkge1xuICAgIGlmICh0b3AgPiA1ICYmICQoJ25hdicpLmhhc0NsYXNzKCd0cmFuc3BhcmVudCcpKSB7XG4gICAgICAgICQoJ25hdicpLnJlbW92ZUNsYXNzKCd0cmFuc3BhcmVudCcpO1xuICAgIH1cbiAgICBlbHNlIGlmICh0b3AgPCA1ICYmICEkKCduYXYnKS5oYXNDbGFzcygndHJhbnNwYXJlbnQnKSkge1xuICAgICAgICAkKCduYXYnKS5hZGRDbGFzcygndHJhbnNwYXJlbnQnKTtcbiAgICB9XG59XG4iLCJmdW5jdGlvbiByb3lhbF9tb2RhbHMoKSB7XG5cbiAgICBmdW5jdGlvbiBhdXRvcGxheSh2aWRlbykge1xuICAgICAgICB2aWRlby5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwicGxheVZpZGVvXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBhdXRvc3RvcCh2aWRlbykge1xuICAgICAgICB2aWRlby5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwicGF1c2VWaWRlb1wiLFwiYXJnc1wiOlwiXCJ9JywgJyonKTtcbiAgICB9XG5cbiAgICAvLyBIb21lIFBhZ2UgVmlkZW9cbiAgICBpZiAoJCgnI2hvbWUnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgIHZhciB2aWRlbyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicGxheWVyXCIpO1xuICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCh7XG4gICAgICAgICAgICByZWFkeTogZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChtb2RhbCkuaGFzQ2xhc3MoJ3ZpZGVvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXkodmlkZW8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24obW9kYWwpIHtcbiAgICAgICAgICAgICAgICBpZiAoJChtb2RhbCkuaGFzQ2xhc3MoJ3ZpZGVvJykpIHtcbiAgICAgICAgICAgICAgICAgICAgYXV0b3N0b3AodmlkZW8pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuXG5cbiAgICAvLyBCbG9nIFZpZGVvc1xuICAgIGlmICgkKCcjZmVlZCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoe1xuICAgICAgICAgICAgcmVhZHk6IGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICAgICAgICAgICAgdmFyICRtb2RhbCA9ICQobW9kYWwpO1xuICAgICAgICAgICAgICAgIHZhciB2aWRlb1NyYyA9ICRtb2RhbC5kYXRhKCd2aWRlby1zcmMnKTtcbiAgICAgICAgICAgICAgICB2YXIgJGlmcmFtZSA9ICRtb2RhbC5maW5kKCdpZnJhbWUnKTtcblxuICAgICAgICAgICAgICAgIGlmKCRpZnJhbWUgJiYgISRpZnJhbWUuYXR0cignc3JjJykpe1xuICAgICAgICAgICAgICAgICAgICAkaWZyYW1lLmF0dHIoJ3NyYycsIHZpZGVvU3JjICsgXCI/ZW5hYmxlanNhcGk9MSZzaG93aW5mbz0wXCIpXG4gICAgICAgICAgICAgICAgICAgICRpZnJhbWUub24oJ2xvYWQnLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXkodGhpcyk7XG4gICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5KCRpZnJhbWUuZ2V0KDApKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKG1vZGFsKSB7XG4gICAgICAgICAgICAgICAgdmFyICRtb2RhbCA9ICQobW9kYWwpO1xuICAgICAgICAgICAgICAgIHZhciAkaWZyYW1lID0gJG1vZGFsLmZpbmQoJ2lmcmFtZScpO1xuICAgICAgICAgICAgICAgIGF1dG9zdG9wKCRpZnJhbWUuZ2V0KDApKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSlcbiAgICB9XG5cbiAgICBpZigkKCcjbG9naW5Nb2RhbCcpLmxlbmd0aCA+IDAgKXtcbiAgICAgICAgJCgnI2xvZ2luTW9kYWwnKS5tb2RhbCh7XG4gICAgICAgICAgICByZWFkeTogZnVuY3Rpb24obW9kYWwpe1xuICAgICAgICAgICAgICAgICQoJyNsb2dpbk1vZGFsIC5jYXJvdXNlbC5jYXJvdXNlbC1zbGlkZXInKS5jYXJvdXNlbCh7ZnVsbFdpZHRoOiB0cnVlLCBub1dyYXA6IHRydWUgfSk7IFxuICAgICAgICAgICAgICAgIC8vVHJhbnNpdGlvbiB0byBzbGlkZSBpZiByZXNldHRpbmcgcGFzc3dvcmRcbiAgICAgICAgICAgICAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoXCJhY3Rpb249cnBcIikpIHtcbiAgICAgICAgICAgICAgICAgICAgJCgnI2xvZ2luTW9kYWwgLmNhcm91c2VsLmNhcm91c2VsLXNsaWRlcicpLmNhcm91c2VsKCdzZXQnLCAyKTsgXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgLy9PcGVuIG1vZGFsIGF1dG9tYXRpY2FsbHkgaWYgcmVzZXQgcGFzc3dvcmQgaXMgcHJlc3NlbnRcbiAgICAgICAgaWYobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKFwiYWN0aW9uPXJwXCIpKSB7XG4gICAgICAgICAgICAkKCcjbG9naW5Nb2RhbCcpLm1vZGFsKCdvcGVuJyk7XG4gICAgICAgIH1cbiAgICAgICAgJCgnW2RhdGEtZ290by1sb3N0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcjbG9naW5Nb2RhbCAuY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoJ3NldCcsIDEpOyBcbiAgICAgICAgfSlcbiAgICAgICAgJCgnW2RhdGEtZ290by1sb2dpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJCgnI2xvZ2luTW9kYWwgLmNhcm91c2VsLmNhcm91c2VsLXNsaWRlcicpLmNhcm91c2VsKCdzZXQnLCAwKTsgXG4gICAgICAgIH0pXG5cbiAgICB9XG59XG4iLCIvLyBNb3ZlcyB0aGUgV29vQ29tbWVyY2Ugbm90aWNlIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2VcbmZ1bmN0aW9uIHJveWFsX21vdmVOb3RpY2UoKSB7XG4gICAgJCgnLm5vdGljZScpLmVhY2goZnVuY3Rpb24oKSB7XG4gICAgICAgICQodGhpcykucHJlcGVuZFRvKCQoJ21haW4nKSk7XG4gICAgfSk7XG59XG5cblxuLy8gTW92ZXMgbmV3bHkgYWRkZWQgV29vQ29tbWVyY2UgY2FydCBub3RpY2VzIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2VcbmZ1bmN0aW9uIHJveWFsX3JlZnJlc2hDYXJ0Tm90aWNlKCkge1xuICAgIHZhciBjYXJ0TG9vcCA9IHNldEludGVydmFsKGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAoJCgnbWFpbiAuY29udGFpbmVyIC5ub3RpY2UnKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICByb3lhbF9tb3ZlTm90aWNlKCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGNhcnRMb29wKTtcbiAgICAgICAgfVxuICAgIH0sIDI1MCk7XG59XG4iLCJmdW5jdGlvbiByb3lhbF9xdWl6KCkge1xuXG4gICAgLy8gQXNzZXQgUHJvdGVjdGlvbiBRdWl6XG4gICAgaWYgKCQoJyNhc3NldC1wcm90ZWN0aW9uLXF1aXonKS5sZW5ndGgpIHtcbiAgICAgICAgLy8gTWF0ZXJpYWxpemUgY2Fyb3VzZWwgc2V0dGluZ3NcbiAgICAgICAgJCgnI2Fzc2V0LXByb3RlY3Rpb24tcXVpeiAuY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoe1xuICAgICAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxuICAgICAgICAgICAgaW5kaWNhdG9yczp0cnVlXG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFF1ZXN0aW9ucyBwYW5lbCBkaXNwbGF5ICYgbmF2aWdhdGlvblxuICAgICAgICAkKCcudG9nZ2xlLXNlY3Rpb24nKS5oaWRlKCk7XG4gICAgICAgICQoJy5idG4tcXVpei10b2dnbGUnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAkKCcudG9nZ2xlLXNlY3Rpb24nKS5zbGlkZVRvZ2dsZSgnZmFzdCcsZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICBpZigkKCcudG9nZ2xlLXNlY3Rpb24nKS5jc3MoJ2Rpc3BsYXknKT09J2Jsb2NrJyl7XG4gICAgICAgICAgICAgICAgICAgICQoJy5idG4tcXVpei10b2dnbGUnKS5odG1sKFwiQ0xPU0UgUVVJWlwiKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi1xdWl6LXRvZ2dsZScpLmFkZENsYXNzKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfWVsc2V7XG4gICAgICAgICAgICAgICAgICAgICQoJy5idG4tcXVpei10b2dnbGUnKS5odG1sKFwiVEFLRSBUSEUgUVVJWlwiKTtcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi1xdWl6LXRvZ2dsZScpLnJlbW92ZUNsYXNzKFwiY2xvc2VcIik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFJlc3VsdHMgJiBlbWFpbFxuICAgICAgICAvLyBDb2RlIGdvZXMgaGVyZS4uLlxuICAgIH1cblxufVxuIiwiJChkb2N1bWVudCkucmVhZHkoZnVuY3Rpb24oKSB7XG4gICAgJ3VzZSBzdHJpY3QnO1xuXG4gICAgLy8gLS0tLSBHTE9CQUwgLS0tLSAvL1xuICAgIHJveWFsX21lbnVzKCk7XG5cbiAgICAvLyAtLS0tIEdFTkVSQUwgLS0tLSAvL1xuICAgIGlmICgkLmZuLnBhcmFsbGF4ICYmICQoJy5wYXJhbGxheCcpLmxlbmd0aCl7XG4gICAgICAgICQoJy5wYXJhbGxheCcpLnBhcmFsbGF4KCk7XG4gICAgfVxuICAgIGlmICgkLmZuLmNhcm91c2VsICYmICQoJy5jYXJvdXNlbC1zbGlkZXInKS5sZW5ndGgpe1xuICAgICAgICAkKCcuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoe1xuICAgICAgICAgICAgZHVyYXRpb246IDM1MCxcbiAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZVxuICAgICAgICB9KTtcbiAgICB9IFxuXG5cbiAgICAvLyAtLS0tIE1PQklMRSAtLS0tIC8vXG5cblxuICAgIC8vIC0tLS0gTEFORElORyBQQUdFUyAtLS0tIC8vXG4gICAgaWYgKCQoJyNob21lJykubGVuZ3RoKSB7XG4gICAgICAgICQoJyNob21lIC5jYXJvdXNlbC1zbGlkZXInKS5jYXJvdXNlbCh7XG4gICAgICAgICAgICBkdXJhdGlvbjogMzUwLFxuICAgICAgICAgICAgZnVsbFdpZHRoOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBzZXRUaW1lb3V0KGF1dG9wbGF5LCA5MDAwKTtcbiAgICAgICAgZnVuY3Rpb24gYXV0b3BsYXkoKSB7XG4gICAgICAgICAgICAkKCcjaG9tZSAuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoJ25leHQnKTtcbiAgICAgICAgICAgIHNldFRpbWVvdXQoYXV0b3BsYXksIDEyMDAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG4gICAgLy8gLS0tLSBQUk9NT1RJT05TIC0tLS0gLy9cbiAgICBpZiAoJCgnLm1vZGFsLXRyaWdnZXInKS5sZW5ndGgpIHtcbiAgICAgICAgcm95YWxfbW9kYWxzKCk7XG4gICAgfVxuICAgIC8qIGlmICgkKCcucXVpeicpLmxlbmd0aCl7XG4gICAgICogICAgIHJveWFsX3F1aXooKTtcbiAgICAgKiB9Ki9cblxuXG4gICAgLy8gLS0tLSBXT09DT01NRVJDRSAtLS0tIC8vXG4gICAgaWYgKCQoJ2JvZHkud29vY29tbWVyY2UnKS5sZW5ndGgpIHtcbiAgICAgICAgcm95YWxfd29vY29tbWVyY2UoKTtcbiAgICB9XG5cblxuICAgIC8vIC0tLS0gQkxPRyAtLS0tIC8vXG4gICAgaWYgKCQoJyNmZWVkJykubGVuZ3RoKSB7XG4gICAgICAgICQoJyNmZWVkIC5jYXJvdXNlbC5jYXJvdXNlbC1zbGlkZXInKS5jYXJvdXNlbCh7ZnVsbFdpZHRoOiB0cnVlfSk7XG4gICAgICAgIHZhciBjb2x1bW5zID0gICQoJyNmZWVkIC5jb2wnKS5maXJzdCgpLmhhc0NsYXNzKCdtOScpID8gMyA6IDQ7XG4gICAgICAgIHZhciAkbXNucnkgPSAkKCcubWFzb25yeScpLm1hc29ucnkoIHtcbiAgICAgICAgICAgIGl0ZW1TZWxlY3RvcjogJ2FydGljbGUnLFxuICAgICAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxuICAgICAgICAgICAgZml0V2lkdGg6IHRydWUsXG4gICAgICAgICAgICBoaWRkZW5TdHlsZToge1xuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTAwcHgpJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAwXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgdmlzaWJsZVN0eWxlOiB7XG4gICAgICAgICAgICAgICAgdHJhbnNmb3JtOiAndHJhbnNsYXRlWSgwcHgpJyxcbiAgICAgICAgICAgICAgICBvcGFjaXR5OiAxXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmICgkLmZuLmltYWdlc0xvYWRlZCkge1xuICAgICAgICAgICAgJG1zbnJ5LmltYWdlc0xvYWRlZCgpLnByb2dyZXNzKGZ1bmN0aW9uKGluc3RhbmNlLCBpbWFnZSkge1xuICAgICAgICAgICAgICAgICRtc25yeS5tYXNvbnJ5KCdsYXlvdXQnKTtcbiAgICAgICAgICAgICAgICByZXNpemVJbWFnZXMoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgJCh3aW5kb3cpLm9uKCdyZXNpemUnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAkbXNucnkubWFzb25yeSgnbGF5b3V0Jyk7XG4gICAgICAgICAgICAgICAgcmVzaXplSW1hZ2VzKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vYnV0dG9uIHRvIGxvYWQgbW9yZSBwb3N0cyB2aWEgYWpheFxuICAgICAgICAkKCdbZGF0YS1sb2FkLW1vcmUtcG9zdHNdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcbiAgICAgICAgICAgIHZhciAkdGhpcyA9ICQodGhpcyk7XG4gICAgICAgICAgICAkdGhpcy5kYXRhKCdhY3RpdmUtdGV4dCcsICR0aGlzLnRleHQoKSkudGV4dChcIkxvYWRpbmcgcG9zdHMuLi5cIikuYXR0cignZGlzYWJsZWQnLCB0cnVlKTtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdGhpcy5kYXRhKFwib2Zmc2V0XCIpO1xuICAgICAgICAgICAgdmFyIHBvc3RzUGVyUGFnZSA9ICR0aGlzLmRhdGEoXCJwb3N0cy1wZXItcGFnZVwiKTtcbiAgICAgICAgICAgIGdldE1vcmVQb3N0cyhvZmZzZXQsIHBvc3RzUGVyUGFnZSkudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgIHZhciAkcmVzID0gJChyZXMpO1xuICAgICAgICAgICAgICAgICRtc25yeS5hcHBlbmQoICRyZXMgKS5tYXNvbnJ5KCAnYXBwZW5kZWQnLCAkcmVzICk7XG4gICAgICAgICAgICAgICAgdmFyIG5ld09mZnNldCA9IG9mZnNldCtwb3N0c1BlclBhZ2U7XG4gICAgICAgICAgICAgICAgdmFyIG5ld1BhcmFtcyA9ICc/b2Zmc2V0PScrIG5ld09mZnNldDtcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUoe3VybFBhdGg6bmV3UGFyYW1zfSxcIlwiLG5ld1BhcmFtcylcbiAgICAgICAgICAgICAgICAkdGhpcy5kYXRhKFwib2Zmc2V0XCIsbmV3T2Zmc2V0KTtcbiAgICAgICAgICAgICAgICAkdGhpcy50ZXh0KCR0aGlzLmRhdGEoJ2FjdGl2ZS10ZXh0JykpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xuICAgICAgICAgICAgfSlcbiAgICAgICAgfSlcblxuICAgICAgICAkKCdbZGF0YS10b2dnbGUtc2lkZWJhcl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgJG1zbnJ5Lm1hc29ucnkoJ2xheW91dCcsIHRydWUpXG4gICAgICAgICAgICAkKCcjZmVlZCAuY29sJykuZmlyc3QoKS50b2dnbGVDbGFzcygnbTknKS50b2dnbGVDbGFzcygnbTEyJykudG9nZ2xlQ2xhc3MoJ3dpdGgtc2lkZWJhcicpO1xuICAgICAgICAgICAgJG1zbnJ5Lm1hc29ucnkoJ2xheW91dCcsIHRydWUpXG4gICAgICAgICAgICAkKCcjZmVlZCAuY29sJykubGFzdCgpLnRvZ2dsZUNsYXNzKCdzaG93bicpOyBcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICAgICByZXNpemVJbWFnZXMoKTtcbiAgICAgICAgICAgIH0sIDQwMClcbiAgICAgICAgfSlcblxuICAgICAgICByb3lhbF9maWx0ZXJQb3N0cygpO1xuICAgIH1cbiAgICBpZiAoJCgnbWFpbiNhcnRpY2xlJykubGVuZ3RoID4gMCkge1xuICAgICAgICByb3lhbF9hcnRpY2xlKCk7XG4gICAgfVxufSk7XG4iLCIvKiAkKHdpbmRvdykucmVzaXplKGZ1bmN0aW9uKCkge1xuICogICAgIGlmICgkKCcubXktYWNjb3VudCcpLmxlbmd0aCkge1xuICogICAgIH1cbiAqIH0pKi9cbiIsInZhciBkaWRTY3JvbGw7XG4kKHdpbmRvdykuc2Nyb2xsKGZ1bmN0aW9uKCl7XG4gICAgZGlkU2Nyb2xsID0gdHJ1ZTtcbiAgICB2YXIgdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xuXG4gICAgaWYgKCQoJy5oZXJvLWNvbnRhaW5lciwgLnBhcmFsbGF4LWNvbnRhaW5lcicpLmxlbmd0aCkge1xuICAgICAgICByb3lhbF90b2dnbGVfbWVudXModG9wKTtcbiAgICB9XG5cbiAgICBpZiAoJCgnLmNvbnN1bHRhdGlvbicpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgdmFyIGhlcm8gPSAkKCcuaGVyby1jb250YWluZXInKS5oZWlnaHQoKTtcbiAgICAgICAgaWYgKHRvcCA+IGhlcm8gJiYgJCgnbmF2JykuaGFzQ2xhc3MoJ25vLXNoYWRvdycpKSB7XG4gICAgICAgICAgICAkKCduYXYnKS5yZW1vdmVDbGFzcygnbm8tc2hhZG93Jyk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSBpZiAodG9wIDwgaGVybyAmJiAhJCgnbmF2JykuaGFzQ2xhc3MoJ25vLXNoYWRvdycpKSB7XG4gICAgICAgICAgICAkKCduYXYnKS5hZGRDbGFzcygnbm8tc2hhZG93Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYoJCgnI2ZlZWQnKS5sZW5ndGggJiYgJCgnW2RhdGEtbG9hZC1tb3JlLXNwaW5uZXJdJykuaGFzQ2xhc3MoJ2hpZGUnKSl7XG4gICAgICAgIGlmKCQod2luZG93KS5zY3JvbGxUb3AoKSArICQod2luZG93KS5oZWlnaHQoKSArICQoJ2Zvb3RlcicpLmhlaWdodCgpID4gJChkb2N1bWVudCkuaGVpZ2h0KCkpIHtcbiAgICAgICAgICAgIHZhciAkc3Bpbm5lciA9ICQoJ1tkYXRhLWxvYWQtbW9yZS1zcGlubmVyXScpO1xuICAgICAgICAgICAgJHNwaW5uZXIucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkc3Bpbm5lci5kYXRhKFwib2Zmc2V0XCIpO1xuICAgICAgICAgICAgdmFyIHBvc3RzUGVyUGFnZSA9ICRzcGlubmVyLmRhdGEoXCJwb3N0cy1wZXItcGFnZVwiKTtcbiAgICAgICAgICAgIGdldE1vcmVQb3N0cyhvZmZzZXQsIHBvc3RzUGVyUGFnZSkudGhlbihmdW5jdGlvbihyZXMpe1xuICAgICAgICAgICAgICAgIHZhciAkcmVzID0gJChyZXMpO1xuICAgICAgICAgICAgICAgICQoJy5tYXNvbnJ5JykuYXBwZW5kKCAkcmVzICkubWFzb25yeSggJ2FwcGVuZGVkJywgJHJlcyApO1xuICAgICAgICAgICAgICAgIHZhciBuZXdPZmZzZXQgPSBvZmZzZXQrcG9zdHNQZXJQYWdlO1xuICAgICAgICAgICAgICAgIHZhciBuZXdQYXJhbXMgPSAnP29mZnNldD0nKyBuZXdPZmZzZXQ7XG4gICAgICAgICAgICAgICAgd2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKHt1cmxQYXRoOm5ld1BhcmFtc30sXCJcIixuZXdQYXJhbXMpXG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuZGF0YShcIm9mZnNldFwiLG5ld09mZnNldCk7XG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgIH0pLmZhaWwoZnVuY3Rpb24oKXsgXG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuYWRkQ2xhc3MoJ2hpZGUnKTtcbiAgICAgICAgICAgIH0pXG4gICAgICAgIH1cbiAgICB9XG59KTtcblxuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgaWYgKGRpZFNjcm9sbCkge1xuICAgICAgICAvKiB0b2dnbGVOYXYoKTsqL1xuICAgICAgICBkaWRTY3JvbGwgPSBmYWxzZTtcbiAgICB9XG59LCAyNTApO1xuIiwiIiwiZnVuY3Rpb24gcm95YWxfd29vY29tbWVyY2UoKSB7XG5cbiAgICAvLyAtLS0tIE5vdGljZXMgLS0tLSAvL1xuICAgIGlmICgkKCcubm90aWNlJykubGVuZ3RoID4gMCkge1xuICAgICAgICByb3lhbF9tb3ZlTm90aWNlKCk7XG4gICAgfVxuICAgICQoZG9jdW1lbnQuYm9keSkub24oJ3VwZGF0ZWRfY2FydF90b3RhbHMnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgcm95YWxfbW92ZU5vdGljZSgpO1xuICAgIH0pO1xuXG4gICAgLy8gLS0tLSBQcm9kdWN0cyAtLS0tIC8vXG4gICAgaWYgKCQoJ21haW4jcHJvZHVjdCcpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KCk7XG4gICAgfVxuXG4gICAgLy8gLS0tLSBDYXJ0IC0tLS0gLy9cbiAgICBpZiAoJCgnLndvb2NvbW1lcmNlLWNhcnQtZm9ybScpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgJCgnLnByb2R1Y3QtcmVtb3ZlIGEnKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIHJveWFsX3JlZnJlc2hDYXJ0Tm90aWNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIC0tLS0gQ2hlY2tvdXQgLS0tLS0gLy9cbiAgICAvKiAkKCcjcGF5bWVudCBbdHlwZT1yYWRpb10nKS5jbGljayhmdW5jdGlvbigpIHtcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XG4gICAgICogfSk7Ki9cbn1cbiJdfQ==

})(jQuery);