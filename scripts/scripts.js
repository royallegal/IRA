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

function royal_login() {
    $('#login-modal').modal();

    // Chooses which of the three modal forms to display
    $('#login-modal a').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        royal_showForm(target);
    });

    // Submits AJAX call & loader, closes on completion
    $('#login-modal input[type=submit]').click(function(e) {
        var form = $(this).find('form');
        var action = $(form).attr('action');

        if (action == "login") {
            royal_ajaxLogin();
        }
        else if (action == "register") {
            royal_ajaxRegister();
        }
        else if (action == "reset") {
            royal_ajaxReset();
        }
        else {
            // error
            // use "classes/email.php" to send an error notification to swedy13@gmail.com
            // only send email if an error occurs on the production site
            // if (is_wpe()) { ...send password }
        }
    });
}


function royal_showLoginField(target) {
    $('#login-modal .row').addClass('hide');
    $(target).removeClass('hide');
}


function royal_ajaxLogin(form) {
    // If (login validation == "successful") {
    //     AJAX login call here...
    // }
}




$("#loginCall, .btn-loginform").click(function () {
    //alert('working...');
    $('#register-hd').hide();
    $('#register-popup').hide();
    $('#forgot-hd').hide();
    $('#forgot_password-popup').hide();

    $('#login-hd').fadeIn();
    $('#login-popup').fadeIn();
});

$("#signupCall, #signupCall2").click(function () {
    $('#login-hd').hide();
    $('#login-popup').hide();
    $('#forgot-hd').hide();
    $('#forgot_password-popup').hide();

    $('#register-hd').fadeIn();
    $('#register-popup').fadeIn();
});

$("#forgotCall").click(function () {
    $('#register-hd').hide();
    $('#register-popup').hide();
    $('#login-hd').hide();
    $('#login-popup').hide();

    $('#forgot-hd').fadeIn();
    $('#forgot_password-popup').fadeIn();
});

// Perform AJAX login/register on form submit
$('form#login-popup, form#register-popup').on('submit', function (e) {
    if (!$(this).valid()) return false;
    $('p.status', this).show().text(ajax_auth_object.loadingmessage);
    action = 'ajaxlogin';
    username =  $('form#login-popup #username').val();
    password = $('form#login-popup #password').val();
    email = '';
    security = $('form#login-popup #security').val();
    if ($(this).attr('id') == 'register-popup') {
        action = 'ajaxregister';
        username = $('#signonname').val();
        password = $('#signonpassword').val();
        email = $('#email').val();
        security = $('#signonsecurity').val();  
    }  
    ctrl = $(this);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: ajax_auth_object.ajaxurl,
        data: {
            'action': action,
            'username': username,
            'password': password,
            'email': email,
            'security': security
        },
        success: function (data) {
            $('p.status', ctrl).text(data.message);
            if (data.loggedin == true) {
                document.location.href = ajax_auth_object.redirecturl;
            }
        }
    });
    e.preventDefault();
});

// Perform AJAX forget password on form submit
$('form#forgot_password-popup').on('submit', function(e){
    if (!$(this).valid()) return false;
    $('p.status', this).show().text(ajax_auth_object.loadingmessage);
    ctrl = $(this);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: ajax_auth_object.ajaxurl,
        data: { 
            'action': 'ajaxforgotpassword', 
            'user_login': $('#user_login').val(), 
            'security': $('#forgotsecurity').val(), 
        },
        success: function(data){                    
            $('p.status',ctrl).text(data.message);              
        }
    });
    e.preventDefault();
    return false;
});

// Client side form validation
if (jQuery("#register-popup").length) 
    jQuery("#register-popup").validate(
        {rules:{
            password2:{ equalTo:'#signonpassword' 
            }   
        }}
    );
else if (jQuery("#login-popup").length) 
    jQuery("#login-popup").validate();
if(jQuery('#forgot_password-popup').length)
    jQuery('#forgot_password-popup').validate();



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
                'loginSecurity': $('form#login #loginSecurity').val() },
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
        console.log("WTFFFF22222"); 
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiLCJhcnRpY2xlLmpzIiwiY29uc3VsdGF0aW9uLmpzIiwiY29udGFjdC5qcyIsImZpbHRlclBvc3RzLmpzIiwibG9naW4uanMiLCJtYXNvbnJ5LmpzIiwibWVudXMuanMiLCJtb2RhbHMuanMiLCJub3RpY2UuanMiLCJxdWl6LmpzIiwicmVhZHkuanMiLCJyZXNpemUuanMiLCJzY3JvbGwuanMiLCJ2YWxpZGF0ZS5qcyIsIndvb2NvbW1lcmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JOQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gZ2V0TW9yZVBvc3RzKG9mZnNldCwgcG9zdHNfcGVyX3BhZ2UsIGNhdGVnb3J5KXtcclxuICByZXR1cm4gJC5hamF4KHtcclxuICAgIHR5cGU6ICdQT1NUJyxcclxuICAgIHVybDogJy93cC1hZG1pbi9hZG1pbi1hamF4LnBocCcsXHJcbiAgICBkYXRhOiB7XHJcbiAgICAgIGNhdGVnb3J5OiBjYXRlZ29yeSxcclxuICAgICAgb2Zmc2V0OiBvZmZzZXQsXHJcbiAgICAgIHBvc3RzX3Blcl9wYWdlOiBwb3N0c19wZXJfcGFnZSxcclxuICAgICAgYWN0aW9uOiAncmxzX21vcmVfcG9zdHMnXHJcbiAgICB9XHJcbiAgfSk7XHJcbn0iLCJmdW5jdGlvbiByb3lhbF9hcnRpY2xlKCkge1xyXG4gICAgLy8gUmVzcG9uc2l2ZSBpRnJhbWVzXHJcbiAgICAvKiAkKCdpZnJhbWUnKS53cmFwKCc8ZGl2IGNsYXNzPVwidmlkZW8tY29udGFpbmVyXCI+PC9kaXY+Jyk7Ki9cclxuXHJcbiAgICAvLyBQYXJhbGxheFxyXG4gICAgaWYgKCQoJy5wYXJhbGxheC1jb250YWluZXInKS5sZW5ndGgpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnUEFSQUxMQVgnKTtcclxuICAgICAgICB2YXIgZmVhdHVyZWQgPSAkKCcuZmVhdHVyZWQtaW1hZ2UgLnBhcmFsbGF4Jyk7XHJcbiAgICAgICAgdmFyIHByb21vdGlvbiA9ICQoJy5wcm9tb3Rpb24taW1hZ2UgLnBhcmFsbGF4Jyk7XHJcblxyXG4gICAgICAgIGlmIChmZWF0dXJlZC5sZW5ndGggJiYgcHJvbW90aW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQk9USCcpO1xyXG4gICAgICAgICAgICBmZWF0dXJlZC5wYXJhbGxheCgpO1xyXG4gICAgICAgICAgICBwcm9tb3Rpb24ucGFyYWxsYXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAoZmVhdHVyZWQubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGRUFUVVJFRCcpO1xyXG4gICAgICAgICAgICBmZWF0dXJlZC5wYXJhbGxheCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChwcm9tb3Rpb24ubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdQUk9NT1RJTycpO1xyXG4gICAgICAgICAgICBwcm9tb3Rpb24ucGFyYWxsYXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdFTFNFJyk7XHJcbiAgICAgICAgICAgICQoJy5wYXJhbGxheCcpLnBhcmFsbGF4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsImZ1bmN0aW9uIHJveWFsX2NvbnN1bHRhdGlvbigpIHtcclxuICAgICQoJ25hdicpLmFkZENsYXNzKCduby1zaGFkb3cnKTtcclxufVxyXG4iLCJmdW5jdGlvbiByb3lhbF9jb250YWN0KCkge1xyXG4gICAgLy8gU3VibWlzc2lvblxyXG4gICAgJCgnZm9ybScpLnN1Ym1pdChmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciBmaXJzdCAgID0gJChcIiNmaXJzdFwiKS52YWwoKTtcclxuICAgICAgICB2YXIgbGFzdCAgICA9ICQoXCIjbGFzdFwiKS52YWwoKTtcclxuICAgICAgICB2YXIgcGhvbmUgICA9ICQoXCIjcGhvbmVcIikudmFsKCk7XHJcbiAgICAgICAgdmFyIGVtYWlsICAgPSAkKFwiI2VtYWlsXCIpLnZhbCgpO1xyXG4gICAgICAgIHZhciBtZXNzYWdlID0gJChcIiNtZXNzYWdlXCIpLnZhbCgpO1xyXG4gICAgICAgIHZhciBzdWJtaXQgID0gJChcImJ1dHRvblt0eXBlPSdzdWJtaXQnXVwiKTtcclxuICAgICAgICB2YXIgY2lyY2xlcyA9ICQoXCIucHJlbG9hZGVyLXdyYXBwZXJcIikucGFyZW50KCk7XHJcbiAgICAgICAgdmFyIGNvbmZpcm0gPSAkKFwiLmNvbmZpcm1cIik7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZXMgZXhpc3RpbmcgdmFsaWRhdGlvblxyXG4gICAgICAgIGNvbmZpcm0ucmVtb3ZlQ2xhc3MoJ3BpbmsgZ3JlZW4nKS5hZGRDbGFzcygnaGlkZScpLmZpbmQoJ3AnKS5yZW1vdmUoKTtcclxuICAgICAgICAkKCcuaW52YWxpZCwgLnZhbGlkJykucmVtb3ZlQ2xhc3MoJ2ludmFsaWQgdmFsaWQnKTtcclxuXHJcbiAgICAgICAgLy8gVmFsaWRhdGlvblxyXG4gICAgICAgIGlmIChmaXJzdCA9PSBcIlwiIHx8IGxhc3QgPT0gXCJcIiB8fCBwaG9uZSA9PSBcIlwiIHx8IGVtYWlsID09IFwiXCIpIHtcclxuICAgICAgICAgICAgY29uZmlybS5hZGRDbGFzcygncGluaycpLnJlbW92ZUNsYXNzKCdoaWRlJykuaHRtbChcIjxwPk9vcHMsIGxvb2tzIGxpa2Ugd2UncmUgbWlzc2luZyBzb21lIGluZm9ybWF0aW9uLiBQbGVhc2UgZmlsbCBvdXQgYWxsIHRoZSBmaWVsZHMuPC9wPlwiKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBUb2dnbGUgUHJlbG9hZGVyXHJcbiAgICAgICAgICAgIHN1Ym1pdC5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICAgICBjaXJjbGVzLnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcblxyXG4gICAgICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgdXJsOiBcIi93cC1hZG1pbi9hZG1pbi1hamF4LnBocFwiLFxyXG4gICAgICAgICAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAgICAgICAgIGFjdGlvbjogJ2NvbnRhY3RfdXNfZm9ybScsXHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3Q6IGZpcnN0LFxyXG4gICAgICAgICAgICAgICAgICAgIGxhc3Q6IGxhc3QsXHJcbiAgICAgICAgICAgICAgICAgICAgcGhvbmU6IHBob25lLFxyXG4gICAgICAgICAgICAgICAgICAgIGVtYWlsOiBlbWFpbCxcclxuICAgICAgICAgICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlLnJlcGxhY2UoLyg/OlxcclxcbnxcXHJ8XFxuKS9nLCAnPGJyLz4nKSxcclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhID09IFwiMFwiKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uZmlybS5hZGRDbGFzcygncGluaycpLnJlbW92ZUNsYXNzKCdoaWRlJykuaHRtbChcIjxwPk9vcHMsIGxvb2tzIGxpa2UgdGhlcmUgd2FzIGEgcHJvYmxlbSEgQ2hlY2sgYmFjayBsYXRlciBvciBlbWFpbCB1cyBkaXJlY3RseSBhdCA8YSBocmVmPSdtYWlsdG86c2NvdHRAcm95YWxsZWdhbHNvbHV0aW9ucy5jb20nPnNjb3R0QHJveWFsbGVnYWxzb2x1dGlvbnMuY29tPC9hPi48L3A+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3VjY2VzcyBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm0uYWRkQ2xhc3MoJ2dyZWVuJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKS5odG1sKFwiPHA+U3VjY2VzcyEgQ2hlY2sgeW91ciBlbWFpbC4gV2UnbGwgYmUgaW4gdG91Y2ggc2hvcnRseS48L3A+XCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0sXHJcblxyXG4gICAgICAgICAgICAgICAgZXJyb3I6IGZ1bmN0aW9uKGVycikge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEVycm9yIG1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICBjb25maXJtLmFkZENsYXNzKCdwaW5rJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKS5odG1sKFwiPHA+T29wcywgbG9va3MgbGlrZSB0aGVyZSB3YXMgYSBwcm9ibGVtISBDaGVjayBiYWNrIGxhdGVyIG9yIGVtYWlsIHVzIGRpcmVjdGx5IGF0IDxhIGhyZWY9J21haWx0bzpzY290dEByb3lhbGxlZ2Fsc29sdXRpb25zLmNvbSc+c2NvdHRAcm95YWxsZWdhbHNvbHV0aW9ucy5jb208L2E+LjwvcD5cIik7XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihyZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCdmb3JtJylbMF0ucmVzZXQoKTtcclxuICAgICAgICAgICAgICAgICAgICBNYXRlcmlhbGl6ZS51cGRhdGVUZXh0RmllbGRzKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnZm9ybSB0ZXh0YXJlYScpLnRyaWdnZXIoJ2F1dG9yZXNpemUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gVG9nZ2xlIFByZWxvYWRlclxyXG4gICAgICAgICAgICAgICAgICAgIGNpcmNsZXMuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBzdWJtaXQucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuIiwiZnVuY3Rpb24gcm95YWxfZmlsdGVyUG9zdHMoKSB7XHJcbiAgICAkKCcjc2VhcmNoJykuY2hhbmdlKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHZhciBmaWx0ZXIgPSAkKHRoaXMpLnZhbCgpO1xyXG5cclxuICAgICAgICAvLyBFeHRlbmQgOmNvbnRhaW5zIHNlbGVjdG9yXHJcbiAgICAgICAgalF1ZXJ5LmV4cHJbJzonXS5jb250YWlucyA9IGZ1bmN0aW9uKGEsIGksIG0pIHtcclxuICAgICAgICAgICAgcmV0dXJuIGpRdWVyeShhKS50ZXh0KCkudG9VcHBlckNhc2UoKS5pbmRleE9mKG1bM10udG9VcHBlckNhc2UoKSkgPj0gMDtcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICAvLyBIaWRlcyBjYXJkcyB0aGF0IGRvbid0IG1hdGNoIGlucHV0XHJcbiAgICAgICAgJChcIiNmZWVkIC5jb250ZW50IC5jYXJkLWNvbnRhaW5lcjp2aXNpYmxlIGFydGljbGUgLmNhcmQtdGl0bGUgYTpub3QoOmNvbnRhaW5zKFwiK2ZpbHRlcitcIikpXCIpLmNsb3Nlc3QoJy5jYXJkLWNvbnRhaW5lcicpLmZhZGVPdXQoKTtcclxuXHJcbiAgICAgICAgLy8gU2hvd3MgY2FyZHMgdGhhdCBtYXRjaCBpbnB1dFxyXG4gICAgICAgICQoXCIjZmVlZCAuY29udGVudCAuY2FyZC1jb250YWluZXI6bm90KDp2aXNpYmxlKSBhcnRpY2xlIC5jYXJkLXRpdGxlIGE6Y29udGFpbnMoXCIrZmlsdGVyK1wiKVwiKS5jbG9zZXN0KCcuY2FyZC1jb250YWluZXInKS5mYWRlSW4oKTtcclxuXHJcbiAgICAgICAgLy8gQWRkIGVtcHR5IG1lc3NhZ2Ugd2hlbiBpZiBubyBwb3N0cyBhcmUgdmlzaWJsZVxyXG4gICAgICAgIHZhciBtZXNzYWdlID0gJCgnI2ZlZWQgI25vLXJlc3VsdHMnKTtcclxuICAgICAgICBpZiAoJChcIiNmZWVkIC5jb250ZW50IC5jYXJkLWNvbnRhaW5lcjp2aXNpYmxlIGFydGljbGUgLmNhcmQtdGl0bGUgYTpjb250YWlucyhcIitmaWx0ZXIrXCIpXCIpLnNpemUoKSA9PSAwKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlLmhhc0NsYXNzKCdoaWRlJykpIHtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnI2ZlZWQgI25vLXJlc3VsdHMnKS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBtZXNzYWdlLmZpbmQoJy50YXJnZXQnKS50ZXh0KGZpbHRlcik7XHJcbiAgICAgICAgfSBlbHNlIHsgbWVzc2FnZS5hZGRDbGFzcygnaGlkZScpOyB9XHJcblxyXG4gICAgfSkua2V5dXAoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5jaGFuZ2UoKTtcclxuICAgIH0pO1xyXG59XHJcbiIsImZ1bmN0aW9uIHJveWFsX2xvZ2luKCkge1xyXG4gICAgJCgnI2xvZ2luLW1vZGFsJykubW9kYWwoKTtcclxuXHJcbiAgICAvLyBDaG9vc2VzIHdoaWNoIG9mIHRoZSB0aHJlZSBtb2RhbCBmb3JtcyB0byBkaXNwbGF5XHJcbiAgICAkKCcjbG9naW4tbW9kYWwgYScpLmNsaWNrKGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgdmFyIHRhcmdldCA9ICQodGhpcykuYXR0cignaHJlZicpO1xyXG4gICAgICAgIHJveWFsX3Nob3dGb3JtKHRhcmdldCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBTdWJtaXRzIEFKQVggY2FsbCAmIGxvYWRlciwgY2xvc2VzIG9uIGNvbXBsZXRpb25cclxuICAgICQoJyNsb2dpbi1tb2RhbCBpbnB1dFt0eXBlPXN1Ym1pdF0nKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgdmFyIGZvcm0gPSAkKHRoaXMpLmZpbmQoJ2Zvcm0nKTtcclxuICAgICAgICB2YXIgYWN0aW9uID0gJChmb3JtKS5hdHRyKCdhY3Rpb24nKTtcclxuXHJcbiAgICAgICAgaWYgKGFjdGlvbiA9PSBcImxvZ2luXCIpIHtcclxuICAgICAgICAgICAgcm95YWxfYWpheExvZ2luKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PSBcInJlZ2lzdGVyXCIpIHtcclxuICAgICAgICAgICAgcm95YWxfYWpheFJlZ2lzdGVyKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGFjdGlvbiA9PSBcInJlc2V0XCIpIHtcclxuICAgICAgICAgICAgcm95YWxfYWpheFJlc2V0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBlcnJvclxyXG4gICAgICAgICAgICAvLyB1c2UgXCJjbGFzc2VzL2VtYWlsLnBocFwiIHRvIHNlbmQgYW4gZXJyb3Igbm90aWZpY2F0aW9uIHRvIHN3ZWR5MTNAZ21haWwuY29tXHJcbiAgICAgICAgICAgIC8vIG9ubHkgc2VuZCBlbWFpbCBpZiBhbiBlcnJvciBvY2N1cnMgb24gdGhlIHByb2R1Y3Rpb24gc2l0ZVxyXG4gICAgICAgICAgICAvLyBpZiAoaXNfd3BlKCkpIHsgLi4uc2VuZCBwYXNzd29yZCB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiByb3lhbF9zaG93TG9naW5GaWVsZCh0YXJnZXQpIHtcclxuICAgICQoJyNsb2dpbi1tb2RhbCAucm93JykuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICQodGFyZ2V0KS5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcm95YWxfYWpheExvZ2luKGZvcm0pIHtcclxuICAgIC8vIElmIChsb2dpbiB2YWxpZGF0aW9uID09IFwic3VjY2Vzc2Z1bFwiKSB7XHJcbiAgICAvLyAgICAgQUpBWCBsb2dpbiBjYWxsIGhlcmUuLi5cclxuICAgIC8vIH1cclxufVxyXG5cclxuXHJcblxyXG5cclxuJChcIiNsb2dpbkNhbGwsIC5idG4tbG9naW5mb3JtXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgIC8vYWxlcnQoJ3dvcmtpbmcuLi4nKTtcclxuICAgICQoJyNyZWdpc3Rlci1oZCcpLmhpZGUoKTtcclxuICAgICQoJyNyZWdpc3Rlci1wb3B1cCcpLmhpZGUoKTtcclxuICAgICQoJyNmb3Jnb3QtaGQnKS5oaWRlKCk7XHJcbiAgICAkKCcjZm9yZ290X3Bhc3N3b3JkLXBvcHVwJykuaGlkZSgpO1xyXG5cclxuICAgICQoJyNsb2dpbi1oZCcpLmZhZGVJbigpO1xyXG4gICAgJCgnI2xvZ2luLXBvcHVwJykuZmFkZUluKCk7XHJcbn0pO1xyXG5cclxuJChcIiNzaWdudXBDYWxsLCAjc2lnbnVwQ2FsbDJcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI2xvZ2luLWhkJykuaGlkZSgpO1xyXG4gICAgJCgnI2xvZ2luLXBvcHVwJykuaGlkZSgpO1xyXG4gICAgJCgnI2ZvcmdvdC1oZCcpLmhpZGUoKTtcclxuICAgICQoJyNmb3Jnb3RfcGFzc3dvcmQtcG9wdXAnKS5oaWRlKCk7XHJcblxyXG4gICAgJCgnI3JlZ2lzdGVyLWhkJykuZmFkZUluKCk7XHJcbiAgICAkKCcjcmVnaXN0ZXItcG9wdXAnKS5mYWRlSW4oKTtcclxufSk7XHJcblxyXG4kKFwiI2ZvcmdvdENhbGxcIikuY2xpY2soZnVuY3Rpb24gKCkge1xyXG4gICAgJCgnI3JlZ2lzdGVyLWhkJykuaGlkZSgpO1xyXG4gICAgJCgnI3JlZ2lzdGVyLXBvcHVwJykuaGlkZSgpO1xyXG4gICAgJCgnI2xvZ2luLWhkJykuaGlkZSgpO1xyXG4gICAgJCgnI2xvZ2luLXBvcHVwJykuaGlkZSgpO1xyXG5cclxuICAgICQoJyNmb3Jnb3QtaGQnKS5mYWRlSW4oKTtcclxuICAgICQoJyNmb3Jnb3RfcGFzc3dvcmQtcG9wdXAnKS5mYWRlSW4oKTtcclxufSk7XHJcblxyXG4vLyBQZXJmb3JtIEFKQVggbG9naW4vcmVnaXN0ZXIgb24gZm9ybSBzdWJtaXRcclxuJCgnZm9ybSNsb2dpbi1wb3B1cCwgZm9ybSNyZWdpc3Rlci1wb3B1cCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbiAoZSkge1xyXG4gICAgaWYgKCEkKHRoaXMpLnZhbGlkKCkpIHJldHVybiBmYWxzZTtcclxuICAgICQoJ3Auc3RhdHVzJywgdGhpcykuc2hvdygpLnRleHQoYWpheF9hdXRoX29iamVjdC5sb2FkaW5nbWVzc2FnZSk7XHJcbiAgICBhY3Rpb24gPSAnYWpheGxvZ2luJztcclxuICAgIHVzZXJuYW1lID0gICQoJ2Zvcm0jbG9naW4tcG9wdXAgI3VzZXJuYW1lJykudmFsKCk7XHJcbiAgICBwYXNzd29yZCA9ICQoJ2Zvcm0jbG9naW4tcG9wdXAgI3Bhc3N3b3JkJykudmFsKCk7XHJcbiAgICBlbWFpbCA9ICcnO1xyXG4gICAgc2VjdXJpdHkgPSAkKCdmb3JtI2xvZ2luLXBvcHVwICNzZWN1cml0eScpLnZhbCgpO1xyXG4gICAgaWYgKCQodGhpcykuYXR0cignaWQnKSA9PSAncmVnaXN0ZXItcG9wdXAnKSB7XHJcbiAgICAgICAgYWN0aW9uID0gJ2FqYXhyZWdpc3Rlcic7XHJcbiAgICAgICAgdXNlcm5hbWUgPSAkKCcjc2lnbm9ubmFtZScpLnZhbCgpO1xyXG4gICAgICAgIHBhc3N3b3JkID0gJCgnI3NpZ25vbnBhc3N3b3JkJykudmFsKCk7XHJcbiAgICAgICAgZW1haWwgPSAkKCcjZW1haWwnKS52YWwoKTtcclxuICAgICAgICBzZWN1cml0eSA9ICQoJyNzaWdub25zZWN1cml0eScpLnZhbCgpOyAgXHJcbiAgICB9ICBcclxuICAgIGN0cmwgPSAkKHRoaXMpO1xyXG4gICAgJC5hamF4KHtcclxuICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICB1cmw6IGFqYXhfYXV0aF9vYmplY3QuYWpheHVybCxcclxuICAgICAgICBkYXRhOiB7XHJcbiAgICAgICAgICAgICdhY3Rpb24nOiBhY3Rpb24sXHJcbiAgICAgICAgICAgICd1c2VybmFtZSc6IHVzZXJuYW1lLFxyXG4gICAgICAgICAgICAncGFzc3dvcmQnOiBwYXNzd29yZCxcclxuICAgICAgICAgICAgJ2VtYWlsJzogZW1haWwsXHJcbiAgICAgICAgICAgICdzZWN1cml0eSc6IHNlY3VyaXR5XHJcbiAgICAgICAgfSxcclxuICAgICAgICBzdWNjZXNzOiBmdW5jdGlvbiAoZGF0YSkge1xyXG4gICAgICAgICAgICAkKCdwLnN0YXR1cycsIGN0cmwpLnRleHQoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgaWYgKGRhdGEubG9nZ2VkaW4gPT0gdHJ1ZSkge1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQubG9jYXRpb24uaHJlZiA9IGFqYXhfYXV0aF9vYmplY3QucmVkaXJlY3R1cmw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxufSk7XHJcblxyXG4vLyBQZXJmb3JtIEFKQVggZm9yZ2V0IHBhc3N3b3JkIG9uIGZvcm0gc3VibWl0XHJcbiQoJ2Zvcm0jZm9yZ290X3Bhc3N3b3JkLXBvcHVwJykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgaWYgKCEkKHRoaXMpLnZhbGlkKCkpIHJldHVybiBmYWxzZTtcclxuICAgICQoJ3Auc3RhdHVzJywgdGhpcykuc2hvdygpLnRleHQoYWpheF9hdXRoX29iamVjdC5sb2FkaW5nbWVzc2FnZSk7XHJcbiAgICBjdHJsID0gJCh0aGlzKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdXJsOiBhamF4X2F1dGhfb2JqZWN0LmFqYXh1cmwsXHJcbiAgICAgICAgZGF0YTogeyBcclxuICAgICAgICAgICAgJ2FjdGlvbic6ICdhamF4Zm9yZ290cGFzc3dvcmQnLCBcclxuICAgICAgICAgICAgJ3VzZXJfbG9naW4nOiAkKCcjdXNlcl9sb2dpbicpLnZhbCgpLCBcclxuICAgICAgICAgICAgJ3NlY3VyaXR5JzogJCgnI2ZvcmdvdHNlY3VyaXR5JykudmFsKCksIFxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7ICAgICAgICAgICAgICAgICAgICBcclxuICAgICAgICAgICAgJCgncC5zdGF0dXMnLGN0cmwpLnRleHQoZGF0YS5tZXNzYWdlKTsgICAgICAgICAgICAgIFxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgcmV0dXJuIGZhbHNlO1xyXG59KTtcclxuXHJcbi8vIENsaWVudCBzaWRlIGZvcm0gdmFsaWRhdGlvblxyXG5pZiAoalF1ZXJ5KFwiI3JlZ2lzdGVyLXBvcHVwXCIpLmxlbmd0aCkgXHJcbiAgICBqUXVlcnkoXCIjcmVnaXN0ZXItcG9wdXBcIikudmFsaWRhdGUoXHJcbiAgICAgICAge3J1bGVzOntcclxuICAgICAgICAgICAgcGFzc3dvcmQyOnsgZXF1YWxUbzonI3NpZ25vbnBhc3N3b3JkJyBcclxuICAgICAgICAgICAgfSAgIFxyXG4gICAgICAgIH19XHJcbiAgICApO1xyXG5lbHNlIGlmIChqUXVlcnkoXCIjbG9naW4tcG9wdXBcIikubGVuZ3RoKSBcclxuICAgIGpRdWVyeShcIiNsb2dpbi1wb3B1cFwiKS52YWxpZGF0ZSgpO1xyXG5pZihqUXVlcnkoJyNmb3Jnb3RfcGFzc3dvcmQtcG9wdXAnKS5sZW5ndGgpXHJcbiAgICBqUXVlcnkoJyNmb3Jnb3RfcGFzc3dvcmQtcG9wdXAnKS52YWxpZGF0ZSgpO1xyXG5cclxuXHJcblxyXG5qUXVlcnkoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCQpIHtcclxuICAgIC8vIFBlcmZvcm0gQUpBWCBsb2dpbiBvbiBmb3JtIHN1Ym1pdFxyXG4gICAgJCgnZm9ybSNsb2dpbicpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbiAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgICAgICB1cmw6ICcvd3AtYWRtaW4vYWRtaW4tYWpheC5waHAnLFxyXG4gICAgICAgICAgICBkYXRhOiB7IFxyXG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdhamF4X2xvZ2luJyxcclxuICAgICAgICAgICAgICAgICd1c2VybmFtZSc6ICQoJ2Zvcm0jbG9naW4gI2xvZ2luVXNlcm5hbWUnKS52YWwoKSwgXHJcbiAgICAgICAgICAgICAgICAncGFzc3dvcmQnOiAkKCdmb3JtI2xvZ2luICNsb2dpblBhc3N3b3JkJykudmFsKCksIFxyXG4gICAgICAgICAgICAgICAgJ2xvZ2luU2VjdXJpdHknOiAkKCdmb3JtI2xvZ2luICNsb2dpblNlY3VyaXR5JykudmFsKCkgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAkKCdmb3JtI2xvZ2luIHAuc3RhdHVzJykudGV4dChkYXRhLm1lc3NhZ2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubG9nZ2VkaW4gPT0gdHJ1ZSl7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgJCgnZm9ybSNwYXNzd29yZExvc3QnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwiV1RGRkZGMjIyMjJcIik7IFxyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgdXJsOiAnL3dwLWFkbWluL2FkbWluLWFqYXgucGhwJywgXHJcbiAgICAgICAgICAgIGRhdGE6IHsgXHJcbiAgICAgICAgICAgICAgICAnYWN0aW9uJzogJ2xvc3RfcGFzcycsXHJcbiAgICAgICAgICAgICAgICAndXNlcl9sb2dpbic6ICQoJ2Zvcm0jcGFzc3dvcmRMb3N0ICNsb3N0VXNlcm5hbWUnKS52YWwoKSxcclxuICAgICAgICAgICAgICAgICdsb3N0U2VjdXJpdHknOiAkKCdmb3JtI3Bhc3N3b3JkTG9zdCAjbG9zdFNlY3VyaXR5JykudmFsKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAkKCdmb3JtI3Bhc3N3b3JkTG9zdCBwLnN0YXR1cycpLnRleHQoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcbiAgICAkKCdmb3JtI3Bhc3N3b3JkUmVzZXQnKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgdXJsOiAnL3dwLWFkbWluL2FkbWluLWFqYXgucGhwJywgXHJcbiAgICAgICAgICAgIGRhdGE6IHsgXHJcblx0XHRcdFx0YWN0aW9uOiBcdCdyZXNldF9wYXNzJyxcclxuXHRcdFx0XHRwYXNzMTpcdFx0JCgnZm9ybSNwYXNzd29yZFJlc2V0ICNyZXNldFBhc3MxJykudmFsKCksXHJcblx0XHRcdFx0cGFzczI6XHRcdCQoJ2Zvcm0jcGFzc3dvcmRSZXNldCAjcmVzZXRQYXNzMicpLnZhbCgpLFxyXG5cdFx0XHRcdHVzZXJfa2V5Olx0JCgnZm9ybSNwYXNzd29yZFJlc2V0ICN1c2VyX2tleScpLnZhbCgpLFxyXG5cdFx0XHRcdHVzZXJfbG9naW46XHQkKCdmb3JtI3Bhc3N3b3JkUmVzZXQgI3VzZXJfbG9naW4nKS52YWwoKSxcclxuICAgICAgICAgICAgICAgICdyZXNldFNlY3VyaXR5JzogJCgnZm9ybSNwYXNzd29yZFJlc2V0ICNyZXNldFNlY3VyaXR5JykudmFsKClcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgc3VjY2VzczogZnVuY3Rpb24oZGF0YSl7XHJcbiAgICAgICAgICAgICAgICAkKCdmb3JtI3Bhc3N3b3JkTG9zdCBwLnN0YXR1cycpLnRleHQoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG59KTsgIiwiIWZ1bmN0aW9uKHQsbil7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9bigpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUobik6dC5NYWN5PW4oKX0odGhpcyxmdW5jdGlvbigpe1widXNlIHN0cmljdFwiO2Z1bmN0aW9uIHQodCxuKXt2YXIgZT12b2lkIDA7cmV0dXJuIGZ1bmN0aW9uKCl7ZSYmY2xlYXJUaW1lb3V0KGUpLGU9c2V0VGltZW91dCh0LG4pfX1mdW5jdGlvbiBuKHQsbil7Zm9yKHZhciBlPXQubGVuZ3RoLG89ZSxyPVtdO2UtLTspci5wdXNoKG4odFtvLWUtMV0pKTtyZXR1cm4gcn1mdW5jdGlvbiBlKHQsbil7QSh0LG4sYXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXSl9ZnVuY3Rpb24gbyh0KXtmb3IodmFyIG49dC5vcHRpb25zLGU9dC5yZXNwb25zaXZlT3B0aW9ucyxvPXQua2V5cyxyPXQuZG9jV2lkdGgsaT12b2lkIDAscz0wO3M8by5sZW5ndGg7cysrKXt2YXIgYT1wYXJzZUludChvW3NdLDEwKTtyPj1hJiYoaT1uLmJyZWFrQXRbYV0sTyhpLGUpKX1yZXR1cm4gZX1mdW5jdGlvbiByKHQpe2Zvcih2YXIgbj10Lm9wdGlvbnMsZT10LnJlc3BvbnNpdmVPcHRpb25zLG89dC5rZXlzLHI9dC5kb2NXaWR0aCxpPXZvaWQgMCxzPW8ubGVuZ3RoLTE7cz49MDtzLS0pe3ZhciBhPXBhcnNlSW50KG9bc10sMTApO3I8PWEmJihpPW4uYnJlYWtBdFthXSxPKGksZSkpfXJldHVybiBlfWZ1bmN0aW9uIGkodCl7dmFyIG49ZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCxlPXtjb2x1bW5zOnQuY29sdW1uc307TCh0Lm1hcmdpbik/ZS5tYXJnaW49e3g6dC5tYXJnaW4ueCx5OnQubWFyZ2luLnl9OmUubWFyZ2luPXt4OnQubWFyZ2luLHk6dC5tYXJnaW59O3ZhciBpPU9iamVjdC5rZXlzKHQuYnJlYWtBdCk7cmV0dXJuIHQubW9iaWxlRmlyc3Q/byh7b3B0aW9uczp0LHJlc3BvbnNpdmVPcHRpb25zOmUsa2V5czppLGRvY1dpZHRoOm59KTpyKHtvcHRpb25zOnQscmVzcG9uc2l2ZU9wdGlvbnM6ZSxrZXlzOmksZG9jV2lkdGg6bn0pfWZ1bmN0aW9uIHModCl7cmV0dXJuIGkodCkuY29sdW1uc31mdW5jdGlvbiBhKHQpe3JldHVybiBpKHQpLm1hcmdpbn1mdW5jdGlvbiBjKHQpe3ZhciBuPSEoYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0pfHxhcmd1bWVudHNbMV0sZT1zKHQpLG89YSh0KS54LHI9MTAwL2U7cmV0dXJuIG4/MT09PWU/XCIxMDAlXCI6KG89KGUtMSkqby9lLFwiY2FsYyhcIityK1wiJSAtIFwiK28rXCJweClcIik6cn1mdW5jdGlvbiB1KHQsbil7dmFyIGU9cyh0Lm9wdGlvbnMpLG89MCxyPXZvaWQgMCxpPXZvaWQgMDtyZXR1cm4gMT09PSsrbj8wOihpPWEodC5vcHRpb25zKS54LHI9KGktKGUtMSkqaS9lKSoobi0xKSxvKz1jKHQub3B0aW9ucywhMSkqKG4tMSksXCJjYWxjKFwiK28rXCIlICsgXCIrcitcInB4KVwiKX1mdW5jdGlvbiBsKHQpe3ZhciBuPTAsZT10LmNvbnRhaW5lcjttKHQucm93cyxmdW5jdGlvbih0KXtuPXQ+bj90Om59KSxlLnN0eWxlLmhlaWdodD1uK1wicHhcIn1mdW5jdGlvbiBwKHQsbil7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXSxvPSEoYXJndW1lbnRzLmxlbmd0aD4zJiZ2b2lkIDAhPT1hcmd1bWVudHNbM10pfHxhcmd1bWVudHNbM10scj1zKHQub3B0aW9ucyksaT1hKHQub3B0aW9ucykueTtDKHQscixlKSxtKG4sZnVuY3Rpb24obil7dmFyIGU9MCxyPXBhcnNlSW50KG4ub2Zmc2V0SGVpZ2h0LDEwKTtpc05hTihyKXx8KHQucm93cy5mb3JFYWNoKGZ1bmN0aW9uKG4sbyl7bjx0LnJvd3NbZV0mJihlPW8pfSksbi5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsbi5zdHlsZS50b3A9dC5yb3dzW2VdK1wicHhcIixuLnN0eWxlLmxlZnQ9XCJcIit0LmNvbHNbZV0sdC5yb3dzW2VdKz1pc05hTihyKT8wOnIraSxvJiYobi5kYXRhc2V0Lm1hY3lDb21wbGV0ZT0xKSl9KSxvJiYodC50bXBSb3dzPW51bGwpLGwodCl9ZnVuY3Rpb24gaCh0LG4pe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl0sbz0hKGFyZ3VtZW50cy5sZW5ndGg+MyYmdm9pZCAwIT09YXJndW1lbnRzWzNdKXx8YXJndW1lbnRzWzNdLHI9cyh0Lm9wdGlvbnMpLGk9YSh0Lm9wdGlvbnMpLnk7Qyh0LHIsZSksbShuLGZ1bmN0aW9uKG4pe3QubGFzdGNvbD09PXImJih0Lmxhc3Rjb2w9MCk7dmFyIGU9TShuLFwiaGVpZ2h0XCIpO2U9cGFyc2VJbnQobi5vZmZzZXRIZWlnaHQsMTApLGlzTmFOKGUpfHwobi5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIsbi5zdHlsZS50b3A9dC5yb3dzW3QubGFzdGNvbF0rXCJweFwiLG4uc3R5bGUubGVmdD1cIlwiK3QuY29sc1t0Lmxhc3Rjb2xdLHQucm93c1t0Lmxhc3Rjb2xdKz1pc05hTihlKT8wOmUraSx0Lmxhc3Rjb2wrPTEsbyYmKG4uZGF0YXNldC5tYWN5Q29tcGxldGU9MSkpfSksbyYmKHQudG1wUm93cz1udWxsKSxsKHQpfXZhciBmPWZ1bmN0aW9uIHQobixlKXtpZighKHRoaXMgaW5zdGFuY2VvZiB0KSlyZXR1cm4gbmV3IHQobixlKTtpZihuPW4ucmVwbGFjZSgvXlxccyovLFwiXCIpLnJlcGxhY2UoL1xccyokLyxcIlwiKSxlKXJldHVybiB0aGlzLmJ5Q3NzKG4sZSk7Zm9yKHZhciBvIGluIHRoaXMuc2VsZWN0b3JzKWlmKGU9by5zcGxpdChcIi9cIiksbmV3IFJlZ0V4cChlWzFdLGVbMl0pLnRlc3QobikpcmV0dXJuIHRoaXMuc2VsZWN0b3JzW29dKG4pO3JldHVybiB0aGlzLmJ5Q3NzKG4pfTtmLnByb3RvdHlwZS5ieUNzcz1mdW5jdGlvbih0LG4pe3JldHVybihufHxkb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbCh0KX0sZi5wcm90b3R5cGUuc2VsZWN0b3JzPXt9LGYucHJvdG90eXBlLnNlbGVjdG9yc1svXlxcLltcXHdcXC1dKyQvXT1mdW5jdGlvbih0KXtyZXR1cm4gZG9jdW1lbnQuZ2V0RWxlbWVudHNCeUNsYXNzTmFtZSh0LnN1YnN0cmluZygxKSl9LGYucHJvdG90eXBlLnNlbGVjdG9yc1svXlxcdyskL109ZnVuY3Rpb24odCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKHQpfSxmLnByb3RvdHlwZS5zZWxlY3RvcnNbL15cXCNbXFx3XFwtXSskL109ZnVuY3Rpb24odCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQuc3Vic3RyaW5nKDEpKX07dmFyIG09ZnVuY3Rpb24odCxuKXtmb3IodmFyIGU9dC5sZW5ndGgsbz1lO2UtLTspbih0W28tZS0xXSl9LHY9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO3RoaXMucnVubmluZz0hMSx0aGlzLmV2ZW50cz1bXSx0aGlzLmFkZCh0KX07di5wcm90b3R5cGUucnVuPWZ1bmN0aW9uKCl7aWYoIXRoaXMucnVubmluZyYmdGhpcy5ldmVudHMubGVuZ3RoPjApe3ZhciB0PXRoaXMuZXZlbnRzLnNoaWZ0KCk7dGhpcy5ydW5uaW5nPSEwLHQoKSx0aGlzLnJ1bm5pbmc9ITEsdGhpcy5ydW4oKX19LHYucHJvdG90eXBlLmFkZD1mdW5jdGlvbigpe3ZhciB0PXRoaXMsbj1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO3JldHVybiEhbiYmKEFycmF5LmlzQXJyYXkobik/bShuLGZ1bmN0aW9uKG4pe3JldHVybiB0LmFkZChuKX0pOih0aGlzLmV2ZW50cy5wdXNoKG4pLHZvaWQgdGhpcy5ydW4oKSkpfSx2LnByb3RvdHlwZS5jbGVhcj1mdW5jdGlvbigpe3RoaXMuZXZlbnRzPVtdfTt2YXIgZD1mdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e307cmV0dXJuIHRoaXMuaW5zdGFuY2U9dCx0aGlzLmRhdGE9bix0aGlzfSxnPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTt0aGlzLmV2ZW50cz17fSx0aGlzLmluc3RhbmNlPXR9O2cucHJvdG90eXBlLm9uPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV07cmV0dXJuISghdHx8IW4pJiYoQXJyYXkuaXNBcnJheSh0aGlzLmV2ZW50c1t0XSl8fCh0aGlzLmV2ZW50c1t0XT1bXSksdGhpcy5ldmVudHNbdF0ucHVzaChuKSl9LGcucHJvdG90eXBlLmVtaXQ9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9O2lmKCF0fHwhQXJyYXkuaXNBcnJheSh0aGlzLmV2ZW50c1t0XSkpcmV0dXJuITE7dmFyIGU9bmV3IGQodGhpcy5pbnN0YW5jZSxuKTttKHRoaXMuZXZlbnRzW3RdLGZ1bmN0aW9uKHQpe3JldHVybiB0KGUpfSl9O3ZhciB5PWZ1bmN0aW9uKHQpe3JldHVybiEoXCJuYXR1cmFsSGVpZ2h0XCJpbiB0JiZ0Lm5hdHVyYWxIZWlnaHQrdC5uYXR1cmFsV2lkdGg9PT0wKXx8dC53aWR0aCt0LmhlaWdodCE9PTB9LEU9ZnVuY3Rpb24odCxuKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO3JldHVybiBuZXcgUHJvbWlzZShmdW5jdGlvbih0LGUpe2lmKG4uY29tcGxldGUpcmV0dXJuIHkobik/dChuKTplKG4pO24uYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIixmdW5jdGlvbigpe3JldHVybiB5KG4pP3Qobik6ZShuKX0pLG4uYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsZnVuY3Rpb24oKXtyZXR1cm4gZShuKX0pfSkudGhlbihmdW5jdGlvbihuKXtlJiZ0LmVtaXQodC5jb25zdGFudHMuRVZFTlRfSU1BR0VfTE9BRCx7aW1nOm59KX0pLmNhdGNoKGZ1bmN0aW9uKG4pe3JldHVybiB0LmVtaXQodC5jb25zdGFudHMuRVZFTlRfSU1BR0VfRVJST1Ise2ltZzpufSl9KX0sdz1mdW5jdGlvbih0LGUpe3ZhciBvPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07cmV0dXJuIG4oZSxmdW5jdGlvbihuKXtyZXR1cm4gRSh0LG4sbyl9KX0sQT1mdW5jdGlvbih0LG4pe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07cmV0dXJuIFByb21pc2UuYWxsKHcodCxuLGUpKS50aGVuKGZ1bmN0aW9uKCl7dC5lbWl0KHQuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0NPTVBMRVRFKX0pfSxJPWZ1bmN0aW9uKG4pe3JldHVybiB0KGZ1bmN0aW9uKCl7bi5lbWl0KG4uY29uc3RhbnRzLkVWRU5UX1JFU0laRSksbi5xdWV1ZS5hZGQoZnVuY3Rpb24oKXtyZXR1cm4gbi5yZWNhbGN1bGF0ZSghMCwhMCl9KX0sMTAwKX0sTj1mdW5jdGlvbih0KXtpZih0LmNvbnRhaW5lcj1mKHQub3B0aW9ucy5jb250YWluZXIpLHQuY29udGFpbmVyIGluc3RhbmNlb2YgZnx8IXQuY29udGFpbmVyKXJldHVybiEhdC5vcHRpb25zLmRlYnVnJiZjb25zb2xlLmVycm9yKFwiRXJyb3I6IENvbnRhaW5lciBub3QgZm91bmRcIik7ZGVsZXRlIHQub3B0aW9ucy5jb250YWluZXIsdC5jb250YWluZXIubGVuZ3RoJiYodC5jb250YWluZXI9dC5jb250YWluZXJbMF0pLHQuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIn0sVD1mdW5jdGlvbih0KXt0LnF1ZXVlPW5ldyB2LHQuZXZlbnRzPW5ldyBnKHQpLHQucm93cz1bXSx0LnJlc2l6ZXI9SSh0KX0sYj1mdW5jdGlvbih0KXt2YXIgbj1mKFwiaW1nXCIsdC5jb250YWluZXIpO3dpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdC5yZXNpemVyKSx0Lm9uKHQuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0xPQUQsZnVuY3Rpb24oKXtyZXR1cm4gdC5yZWNhbGN1bGF0ZSghMSwhMSl9KSx0Lm9uKHQuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0NPTVBMRVRFLGZ1bmN0aW9uKCl7cmV0dXJuIHQucmVjYWxjdWxhdGUoITAsITApfSksdC5vcHRpb25zLnVzZU93bkltYWdlTG9hZGVyfHxlKHQsbiwhdC5vcHRpb25zLndhaXRGb3JJbWFnZXMpLHQuZW1pdCh0LmNvbnN0YW50cy5FVkVOVF9JTklUSUFMSVpFRCl9LF89ZnVuY3Rpb24odCl7Tih0KSxUKHQpLGIodCl9LEw9ZnVuY3Rpb24odCl7cmV0dXJuIHQ9PT1PYmplY3QodCkmJlwiW29iamVjdCBBcnJheV1cIiE9PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbCh0KX0sTz1mdW5jdGlvbih0LG4pe0wodCl8fChuLmNvbHVtbnM9dCksTCh0KSYmdC5jb2x1bW5zJiYobi5jb2x1bW5zPXQuY29sdW1ucyksTCh0KSYmdC5tYXJnaW4mJiFMKHQubWFyZ2luKSYmKG4ubWFyZ2luPXt4OnQubWFyZ2luLHk6dC5tYXJnaW59KSxMKHQpJiZ0Lm1hcmdpbiYmTCh0Lm1hcmdpbikmJnQubWFyZ2luLngmJihuLm1hcmdpbi54PXQubWFyZ2luLngpLEwodCkmJnQubWFyZ2luJiZMKHQubWFyZ2luKSYmdC5tYXJnaW4ueSYmKG4ubWFyZ2luLnk9dC5tYXJnaW4ueSl9LE09ZnVuY3Rpb24odCxuKXtyZXR1cm4gd2luZG93LmdldENvbXB1dGVkU3R5bGUodCxudWxsKS5nZXRQcm9wZXJ0eVZhbHVlKG4pfSxDPWZ1bmN0aW9uKHQsbil7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXTtpZih0Lmxhc3Rjb2x8fCh0Lmxhc3Rjb2w9MCksdC5yb3dzLmxlbmd0aDwxJiYoZT0hMCksZSl7dC5yb3dzPVtdLHQuY29scz1bXSx0Lmxhc3Rjb2w9MDtmb3IodmFyIG89bi0xO28+PTA7by0tKXQucm93c1tvXT0wLHQuY29sc1tvXT11KHQsbyl9ZWxzZSBpZih0LnRtcFJvd3Mpe3Qucm93cz1bXTtmb3IodmFyIG89bi0xO28+PTA7by0tKXQucm93c1tvXT10LnRtcFJvd3Nbb119ZWxzZXt0LnRtcFJvd3M9W107Zm9yKHZhciBvPW4tMTtvPj0wO28tLSl0LnRtcFJvd3Nbb109dC5yb3dzW29dfX0sVj1mdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdLGU9IShhcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSl8fGFyZ3VtZW50c1syXSxvPW4/dC5jb250YWluZXIuY2hpbGRyZW46ZignOnNjb3BlID4gKjpub3QoW2RhdGEtbWFjeS1jb21wbGV0ZT1cIjFcIl0pJyx0LmNvbnRhaW5lcikscj1jKHQub3B0aW9ucyk7cmV0dXJuIG0obyxmdW5jdGlvbih0KXtuJiYodC5kYXRhc2V0Lm1hY3lDb21wbGV0ZT0wKSx0LnN0eWxlLndpZHRoPXJ9KSx0Lm9wdGlvbnMudHJ1ZU9yZGVyPyhoKHQsbyxuLGUpLHQuZW1pdCh0LmNvbnN0YW50cy5FVkVOVF9SRUNBTENVTEFURUQpKToocCh0LG8sbixlKSx0LmVtaXQodC5jb25zdGFudHMuRVZFTlRfUkVDQUxDVUxBVEVEKSl9LFI9T2JqZWN0LmFzc2lnbnx8ZnVuY3Rpb24odCl7Zm9yKHZhciBuPTE7bjxhcmd1bWVudHMubGVuZ3RoO24rKyl7dmFyIGU9YXJndW1lbnRzW25dO2Zvcih2YXIgbyBpbiBlKU9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChlLG8pJiYodFtvXT1lW29dKX1yZXR1cm4gdH0seD17Y29sdW1uczo0LG1hcmdpbjoyLHRydWVPcmRlcjohMSx3YWl0Rm9ySW1hZ2VzOiExLHVzZUltYWdlTG9hZGVyOiEwLGJyZWFrQXQ6e30sdXNlT3duSW1hZ2VMb2FkZXI6ITEsb25Jbml0OiExfTshZnVuY3Rpb24oKXt0cnl7ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImFcIikucXVlcnlTZWxlY3RvcihcIjpzY29wZSAqXCIpfWNhdGNoKHQpeyFmdW5jdGlvbigpe2Z1bmN0aW9uIHQodCl7cmV0dXJuIGZ1bmN0aW9uKGUpe2lmKGUmJm4udGVzdChlKSl7dmFyIG89dGhpcy5nZXRBdHRyaWJ1dGUoXCJpZFwiKTtvfHwodGhpcy5pZD1cInFcIitNYXRoLmZsb29yKDllNipNYXRoLnJhbmRvbSgpKSsxZTYpLGFyZ3VtZW50c1swXT1lLnJlcGxhY2UobixcIiNcIit0aGlzLmlkKTt2YXIgcj10LmFwcGx5KHRoaXMsYXJndW1lbnRzKTtyZXR1cm4gbnVsbD09PW8/dGhpcy5yZW1vdmVBdHRyaWJ1dGUoXCJpZFwiKTpvfHwodGhpcy5pZD1vKSxyfXJldHVybiB0LmFwcGx5KHRoaXMsYXJndW1lbnRzKX19dmFyIG49LzpzY29wZVxcYi9naSxlPXQoRWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3Rvcik7RWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3Rvcj1mdW5jdGlvbih0KXtyZXR1cm4gZS5hcHBseSh0aGlzLGFyZ3VtZW50cyl9O3ZhciBvPXQoRWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3RvckFsbCk7RWxlbWVudC5wcm90b3R5cGUucXVlcnlTZWxlY3RvckFsbD1mdW5jdGlvbih0KXtyZXR1cm4gby5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fSgpfX0oKTt2YXIgcT1mdW5jdGlvbiB0KCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOng7aWYoISh0aGlzIGluc3RhbmNlb2YgdCkpcmV0dXJuIG5ldyB0KG4pO3RoaXMub3B0aW9ucz17fSxSKHRoaXMub3B0aW9ucyx4LG4pLF8odGhpcyl9O3JldHVybiBxLmluaXQ9ZnVuY3Rpb24odCl7cmV0dXJuIGNvbnNvbGUud2FybihcIkRlcHJlY2lhdGVkOiBNYWN5LmluaXQgd2lsbCBiZSByZW1vdmVkIGluIHYzLjAuMCBvcHQgdG8gdXNlIE1hY3kgZGlyZWN0bHkgbGlrZSBzbyBNYWN5KHsgLypvcHRpb25zIGhlcmUqLyB9KSBcIiksbmV3IHEodCl9LHEucHJvdG90eXBlLnJlY2FsY3VsYXRlT25JbWFnZUxvYWQ9ZnVuY3Rpb24oKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdO3JldHVybiBlKHRoaXMsZihcImltZ1wiLHRoaXMuY29udGFpbmVyKSwhdCl9LHEucHJvdG90eXBlLnJ1bk9uSW1hZ2VMb2FkPWZ1bmN0aW9uKHQpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdJiZhcmd1bWVudHNbMV0sbz1mKFwiaW1nXCIsdGhpcy5jb250YWluZXIpO3JldHVybiB0aGlzLm9uKHRoaXMuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0NPTVBMRVRFLHQpLG4mJnRoaXMub24odGhpcy5jb25zdGFudHMuRVZFTlRfSU1BR0VfTE9BRCx0KSxlKHRoaXMsbyxuKX0scS5wcm90b3R5cGUucmVjYWxjdWxhdGU9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG49YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxlPSEoYXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0pfHxhcmd1bWVudHNbMV07cmV0dXJuIGUmJnRoaXMucXVldWUuY2xlYXIoKSx0aGlzLnF1ZXVlLmFkZChmdW5jdGlvbigpe3JldHVybiBWKHQsbixlKX0pfSxxLnByb3RvdHlwZS5yZW1vdmU9ZnVuY3Rpb24oKXt3aW5kb3cucmVtb3ZlRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHRoaXMucmVzaXplciksbSh0aGlzLmNvbnRhaW5lci5jaGlsZHJlbixmdW5jdGlvbih0KXt0LnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtbWFjeS1jb21wbGV0ZVwiKSx0LnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpfSksdGhpcy5jb250YWluZXIucmVtb3ZlQXR0cmlidXRlKFwic3R5bGVcIil9LHEucHJvdG90eXBlLnJlSW5pdD1mdW5jdGlvbigpe3RoaXMucmVjYWxjdWxhdGUoITAsITApLHRoaXMuZW1pdCh0aGlzLmNvbnN0YW50cy5FVkVOVF9JTklUSUFMSVpFRCksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLnJlc2l6ZXIpLHRoaXMuY29udGFpbmVyLnN0eWxlLnBvc2l0aW9uPVwicmVsYXRpdmVcIn0scS5wcm90b3R5cGUub249ZnVuY3Rpb24odCxuKXt0aGlzLmV2ZW50cy5vbih0LG4pfSxxLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKHQsbil7dGhpcy5ldmVudHMuZW1pdCh0LG4pfSxxLmNvbnN0YW50cz17RVZFTlRfSU5JVElBTElaRUQ6XCJtYWN5LmluaXRpYWxpemVkXCIsRVZFTlRfUkVDQUxDVUxBVEVEOlwibWFjeS5yZWNhbGN1bGF0ZWRcIixFVkVOVF9JTUFHRV9MT0FEOlwibWFjeS5pbWFnZS5sb2FkXCIsRVZFTlRfSU1BR0VfRVJST1I6XCJtYWN5LmltYWdlLmVycm9yXCIsRVZFTlRfSU1BR0VfQ09NUExFVEU6XCJtYWN5LmltYWdlcy5jb21wbGV0ZVwiLEVWRU5UX1JFU0laRTpcIm1hY3kucmVzaXplXCJ9LHEucHJvdG90eXBlLmNvbnN0YW50cz1xLmNvbnN0YW50cyxxfSk7XHJcbiIsImZ1bmN0aW9uIHJveWFsX21lbnVzKCkge1xyXG4gICAgLy8gTW9iaWxlIE1lbnVcclxuICAgICQoXCIjbW9iaWxlLW1lbnVcIikuc2lkZU5hdih7XHJcbiAgICAgICAgbWVudVdpZHRoOiAyNjAsXHJcbiAgICAgICAgZWRnZTogJ3JpZ2h0J1xyXG4gICAgfSk7XHJcblxyXG5cclxuICAgIC8vIERyb3Bkb3duc1xyXG4gICAgJChcIm5hdiAuZHJvcGRvd24tYnV0dG9uXCIpLmRyb3Bkb3duKHtcclxuICAgICAgICBjb25zdHJhaW5XaWR0aDogZmFsc2VcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBIZXJvIERpc3BsYXlzXHJcbiAgICBpZiAoJCgnLmhlcm8tY29udGFpbmVyLCAucGFyYWxsYXgtY29udGFpbmVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgJCgnbmF2JykuYWRkQ2xhc3MoJ3RyYW5zcGFyZW50Jyk7XHJcbiAgICB9XHJcbn1cclxuXHJcblxyXG5mdW5jdGlvbiByb3lhbF90b2dnbGVfbWVudXModG9wKSB7XHJcbiAgICBpZiAodG9wID4gNSAmJiAkKCduYXYnKS5oYXNDbGFzcygndHJhbnNwYXJlbnQnKSkge1xyXG4gICAgICAgICQoJ25hdicpLnJlbW92ZUNsYXNzKCd0cmFuc3BhcmVudCcpO1xyXG4gICAgfVxyXG4gICAgZWxzZSBpZiAodG9wIDwgNSAmJiAhJCgnbmF2JykuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykpIHtcclxuICAgICAgICAkKCduYXYnKS5hZGRDbGFzcygndHJhbnNwYXJlbnQnKTtcclxuICAgIH1cclxufVxyXG4iLCJmdW5jdGlvbiByb3lhbF9tb2RhbHMoKSB7XHJcblxyXG4gICAgZnVuY3Rpb24gYXV0b3BsYXkodmlkZW8pIHtcclxuICAgICAgICB2aWRlby5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwicGxheVZpZGVvXCIsXCJhcmdzXCI6XCJcIn0nLCAnKicpO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gYXV0b3N0b3AodmlkZW8pIHtcclxuICAgICAgICB2aWRlby5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKCd7XCJldmVudFwiOlwiY29tbWFuZFwiLFwiZnVuY1wiOlwicGF1c2VWaWRlb1wiLFwiYXJnc1wiOlwiXCJ9JywgJyonKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBIb21lIFBhZ2UgVmlkZW9cclxuICAgIGlmICgkKCcjaG9tZScpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgdmlkZW8gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInBsYXllclwiKTtcclxuICAgICAgICAkKCcubW9kYWwnKS5tb2RhbCh7XHJcbiAgICAgICAgICAgIHJlYWR5OiBmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCQobW9kYWwpLmhhc0NsYXNzKCd2aWRlbycpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYXV0b3BsYXkodmlkZW8pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKG1vZGFsKS5oYXNDbGFzcygndmlkZW8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9zdG9wKHZpZGVvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuXHJcbiAgICAvLyBCbG9nIFZpZGVvc1xyXG4gICAgaWYgKCQoJyNmZWVkJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKHtcclxuICAgICAgICAgICAgcmVhZHk6IGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJG1vZGFsID0gJChtb2RhbCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9TcmMgPSAkbW9kYWwuZGF0YSgndmlkZW8tc3JjJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGlmcmFtZSA9ICRtb2RhbC5maW5kKCdpZnJhbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkaWZyYW1lICYmICEkaWZyYW1lLmF0dHIoJ3NyYycpKXtcclxuICAgICAgICAgICAgICAgICAgICAkaWZyYW1lLmF0dHIoJ3NyYycsIHZpZGVvU3JjICsgXCI/ZW5hYmxlanNhcGk9MSZzaG93aW5mbz0wXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgJGlmcmFtZS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheSgkaWZyYW1lLmdldCgwKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRtb2RhbCA9ICQobW9kYWwpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRpZnJhbWUgPSAkbW9kYWwuZmluZCgnaWZyYW1lJyk7XHJcbiAgICAgICAgICAgICAgICBhdXRvc3RvcCgkaWZyYW1lLmdldCgwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJyNsb2dpbk1vZGFsJykubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICQoJyNsb2dpbk1vZGFsJykubW9kYWwoe1xyXG4gICAgICAgICAgICByZWFkeTogZnVuY3Rpb24obW9kYWwpe1xyXG4gICAgICAgICAgICAgICAgJCgnI2xvZ2luTW9kYWwgLmNhcm91c2VsLmNhcm91c2VsLXNsaWRlcicpLmNhcm91c2VsKHtmdWxsV2lkdGg6IHRydWUsIG5vV3JhcDogdHJ1ZSB9KTsgXHJcbiAgICAgICAgICAgICAgICAvL1RyYW5zaXRpb24gdG8gc2xpZGUgaWYgcmVzZXR0aW5nIHBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoXCJhY3Rpb249cnBcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjbG9naW5Nb2RhbCAuY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoJ3NldCcsIDIpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vT3BlbiBtb2RhbCBhdXRvbWF0aWNhbGx5IGlmIHJlc2V0IHBhc3N3b3JkIGlzIHByZXNzZW50XHJcbiAgICAgICAgaWYobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKFwiYWN0aW9uPXJwXCIpKSB7XHJcbiAgICAgICAgICAgICQoJyNsb2dpbk1vZGFsJykubW9kYWwoJ29wZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnW2RhdGEtZ290by1sb3N0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJyNsb2dpbk1vZGFsIC5jYXJvdXNlbC5jYXJvdXNlbC1zbGlkZXInKS5jYXJvdXNlbCgnc2V0JywgMSk7IFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJCgnW2RhdGEtZ290by1sb2dpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCcjbG9naW5Nb2RhbCAuY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoJ3NldCcsIDApOyBcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxufVxyXG4iLCIvLyBNb3ZlcyB0aGUgV29vQ29tbWVyY2Ugbm90aWNlIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2VcclxuZnVuY3Rpb24gcm95YWxfbW92ZU5vdGljZSgpIHtcclxuICAgICQoJy5ub3RpY2UnKS5lYWNoKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykucHJlcGVuZFRvKCQoJ21haW4nKSk7XHJcbiAgICB9KTtcclxufVxyXG5cclxuXHJcbi8vIE1vdmVzIG5ld2x5IGFkZGVkIFdvb0NvbW1lcmNlIGNhcnQgbm90aWNlcyB0byB0aGUgdG9wIG9mIHRoZSBwYWdlXHJcbmZ1bmN0aW9uIHJveWFsX3JlZnJlc2hDYXJ0Tm90aWNlKCkge1xyXG4gICAgdmFyIGNhcnRMb29wID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgaWYgKCQoJ21haW4gLmNvbnRhaW5lciAubm90aWNlJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICByb3lhbF9tb3ZlTm90aWNlKCk7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoY2FydExvb3ApO1xyXG4gICAgICAgIH1cclxuICAgIH0sIDI1MCk7XHJcbn1cclxuIiwiZnVuY3Rpb24gcm95YWxfcXVpeigpIHtcclxuXHJcbiAgICAvLyBBc3NldCBQcm90ZWN0aW9uIFF1aXpcclxuICAgIGlmICgkKCcjYXNzZXQtcHJvdGVjdGlvbi1xdWl6JykubGVuZ3RoKSB7XHJcbiAgICAgICAgLy8gTWF0ZXJpYWxpemUgY2Fyb3VzZWwgc2V0dGluZ3NcclxuICAgICAgICAkKCcjYXNzZXQtcHJvdGVjdGlvbi1xdWl6IC5jYXJvdXNlbC5jYXJvdXNlbC1zbGlkZXInKS5jYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgaW5kaWNhdG9yczp0cnVlXHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFF1ZXN0aW9ucyBwYW5lbCBkaXNwbGF5ICYgbmF2aWdhdGlvblxyXG4gICAgICAgICQoJy50b2dnbGUtc2VjdGlvbicpLmhpZGUoKTtcclxuICAgICAgICAkKCcuYnRuLXF1aXotdG9nZ2xlJykudW5iaW5kKCdjbGljaycpLmJpbmQoJ2NsaWNrJyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCcudG9nZ2xlLXNlY3Rpb24nKS5zbGlkZVRvZ2dsZSgnZmFzdCcsZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGlmKCQoJy50b2dnbGUtc2VjdGlvbicpLmNzcygnZGlzcGxheScpPT0nYmxvY2snKXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuLXF1aXotdG9nZ2xlJykuaHRtbChcIkNMT1NFIFFVSVpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi1xdWl6LXRvZ2dsZScpLmFkZENsYXNzKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuLXF1aXotdG9nZ2xlJykuaHRtbChcIlRBS0UgVEhFIFFVSVpcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnLmJ0bi1xdWl6LXRvZ2dsZScpLnJlbW92ZUNsYXNzKFwiY2xvc2VcIik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBSZXN1bHRzICYgZW1haWxcclxuICAgICAgICAvLyBDb2RlIGdvZXMgaGVyZS4uLlxyXG4gICAgfVxyXG5cclxufVxyXG4iLCIkKGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigpIHtcclxuICAgICd1c2Ugc3RyaWN0JztcclxuXHJcbiAgICAvLyAtLS0tIEdMT0JBTCAtLS0tIC8vXHJcbiAgICByb3lhbF9tZW51cygpO1xyXG5cclxuICAgIC8vIC0tLS0gR0VORVJBTCAtLS0tIC8vXHJcbiAgICBpZiAoJC5mbi5wYXJhbGxheCAmJiAkKCcucGFyYWxsYXgnKS5sZW5ndGgpe1xyXG4gICAgICAgICQoJy5wYXJhbGxheCcpLnBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoJC5mbi5jYXJvdXNlbCAmJiAkKCcuY2Fyb3VzZWwtc2xpZGVyJykubGVuZ3RoKXtcclxuICAgICAgICAkKCcuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMzUwLFxyXG4gICAgICAgICAgICBmdWxsV2lkdGg6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH0gXHJcblxyXG5cclxuICAgIC8vIC0tLS0gTU9CSUxFIC0tLS0gLy9cclxuXHJcblxyXG4gICAgLy8gLS0tLSBMQU5ESU5HIFBBR0VTIC0tLS0gLy9cclxuICAgIGlmICgkKCcjaG9tZScpLmxlbmd0aCkge1xyXG4gICAgICAgICQoJyNob21lIC5jYXJvdXNlbC1zbGlkZXInKS5jYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzNTAsXHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoYXV0b3BsYXksIDkwMDApO1xyXG4gICAgICAgIGZ1bmN0aW9uIGF1dG9wbGF5KCkge1xyXG4gICAgICAgICAgICAkKCcjaG9tZSAuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoJ25leHQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChhdXRvcGxheSwgMTIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gLS0tLSBQUk9NT1RJT05TIC0tLS0gLy9cclxuICAgIGlmICgkKCcubW9kYWwtdHJpZ2dlcicpLmxlbmd0aCkge1xyXG4gICAgICAgIHJveWFsX21vZGFscygpO1xyXG4gICAgfVxyXG4gICAgLyogaWYgKCQoJy5xdWl6JykubGVuZ3RoKXtcclxuICAgICAqICAgICByb3lhbF9xdWl6KCk7XHJcbiAgICAgKiB9Ki9cclxuXHJcblxyXG4gICAgLy8gLS0tLSBXT09DT01NRVJDRSAtLS0tIC8vXHJcbiAgICBpZiAoJCgnYm9keS53b29jb21tZXJjZScpLmxlbmd0aCkge1xyXG4gICAgICAgIHJveWFsX3dvb2NvbW1lcmNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIC0tLS0gQkxPRyAtLS0tIC8vXHJcbiAgICBpZiAoJCgnI2ZlZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAkKCcjZmVlZCAuY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoe2Z1bGxXaWR0aDogdHJ1ZX0pO1xyXG4gICAgICAgIHZhciBjb2x1bW5zID0gICQoJyNmZWVkIC5jb2wnKS5maXJzdCgpLmhhc0NsYXNzKCdtOScpID8gMyA6IDQ7XHJcbiAgICAgICAgdmFyICRtc25yeSA9ICQoJy5tYXNvbnJ5JykubWFzb25yeSgge1xyXG4gICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICdhcnRpY2xlJyxcclxuICAgICAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBmaXRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgaGlkZGVuU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTAwcHgpJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdmlzaWJsZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDBweCknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICgkLmZuLmltYWdlc0xvYWRlZCkge1xyXG4gICAgICAgICAgICAkbXNucnkuaW1hZ2VzTG9hZGVkKCkucHJvZ3Jlc3MoZnVuY3Rpb24oaW5zdGFuY2UsIGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAkbXNucnkubWFzb25yeSgnbGF5b3V0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXNpemVJbWFnZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkbXNucnkubWFzb25yeSgnbGF5b3V0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXNpemVJbWFnZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2J1dHRvbiB0byBsb2FkIG1vcmUgcG9zdHMgdmlhIGFqYXhcclxuICAgICAgICAkKCdbZGF0YS1sb2FkLW1vcmUtcG9zdHNdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJHRoaXMuZGF0YSgnYWN0aXZlLXRleHQnLCAkdGhpcy50ZXh0KCkpLnRleHQoXCJMb2FkaW5nIHBvc3RzLi4uXCIpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdGhpcy5kYXRhKFwib2Zmc2V0XCIpO1xyXG4gICAgICAgICAgICB2YXIgcG9zdHNQZXJQYWdlID0gJHRoaXMuZGF0YShcInBvc3RzLXBlci1wYWdlXCIpO1xyXG4gICAgICAgICAgICBnZXRNb3JlUG9zdHMob2Zmc2V0LCBwb3N0c1BlclBhZ2UpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgIHZhciAkcmVzID0gJChyZXMpO1xyXG4gICAgICAgICAgICAgICAgJG1zbnJ5LmFwcGVuZCggJHJlcyApLm1hc29ucnkoICdhcHBlbmRlZCcsICRyZXMgKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdPZmZzZXQgPSBvZmZzZXQrcG9zdHNQZXJQYWdlO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1BhcmFtcyA9ICc/b2Zmc2V0PScrIG5ld09mZnNldDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7dXJsUGF0aDpuZXdQYXJhbXN9LFwiXCIsbmV3UGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgJHRoaXMuZGF0YShcIm9mZnNldFwiLG5ld09mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy50ZXh0KCR0aGlzLmRhdGEoJ2FjdGl2ZS10ZXh0JykpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZS1zaWRlYmFyXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRtc25yeS5tYXNvbnJ5KCdsYXlvdXQnLCB0cnVlKVxyXG4gICAgICAgICAgICAkKCcjZmVlZCAuY29sJykuZmlyc3QoKS50b2dnbGVDbGFzcygnbTknKS50b2dnbGVDbGFzcygnbTEyJykudG9nZ2xlQ2xhc3MoJ3dpdGgtc2lkZWJhcicpO1xyXG4gICAgICAgICAgICAkbXNucnkubWFzb25yeSgnbGF5b3V0JywgdHJ1ZSlcclxuICAgICAgICAgICAgJCgnI2ZlZWQgLmNvbCcpLmxhc3QoKS50b2dnbGVDbGFzcygnc2hvd24nKTsgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHJlc2l6ZUltYWdlcygpO1xyXG4gICAgICAgICAgICB9LCA0MDApXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcm95YWxfZmlsdGVyUG9zdHMoKTtcclxuICAgIH1cclxuICAgIGlmICgkKCdtYWluI2FydGljbGUnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcm95YWxfYXJ0aWNsZSgpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiLyogJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICogICAgIGlmICgkKCcubXktYWNjb3VudCcpLmxlbmd0aCkge1xyXG4gKiAgICAgfVxyXG4gKiB9KSovXHJcbiIsInZhciBkaWRTY3JvbGw7XHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgIGRpZFNjcm9sbCA9IHRydWU7XHJcbiAgICB2YXIgdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgIGlmICgkKCcuaGVyby1jb250YWluZXIsIC5wYXJhbGxheC1jb250YWluZXInKS5sZW5ndGgpIHtcclxuICAgICAgICByb3lhbF90b2dnbGVfbWVudXModG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJCgnLmNvbnN1bHRhdGlvbicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgaGVybyA9ICQoJy5oZXJvLWNvbnRhaW5lcicpLmhlaWdodCgpO1xyXG4gICAgICAgIGlmICh0b3AgPiBoZXJvICYmICQoJ25hdicpLmhhc0NsYXNzKCduby1zaGFkb3cnKSkge1xyXG4gICAgICAgICAgICAkKCduYXYnKS5yZW1vdmVDbGFzcygnbm8tc2hhZG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRvcCA8IGhlcm8gJiYgISQoJ25hdicpLmhhc0NsYXNzKCduby1zaGFkb3cnKSkge1xyXG4gICAgICAgICAgICAkKCduYXYnKS5hZGRDbGFzcygnbm8tc2hhZG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoJCgnI2ZlZWQnKS5sZW5ndGggJiYgJCgnW2RhdGEtbG9hZC1tb3JlLXNwaW5uZXJdJykuaGFzQ2xhc3MoJ2hpZGUnKSl7XHJcbiAgICAgICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpICsgJCgnZm9vdGVyJykuaGVpZ2h0KCkgPiAkKGRvY3VtZW50KS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgICB2YXIgJHNwaW5uZXIgPSAkKCdbZGF0YS1sb2FkLW1vcmUtc3Bpbm5lcl0nKTtcclxuICAgICAgICAgICAgJHNwaW5uZXIucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9ICRzcGlubmVyLmRhdGEoXCJvZmZzZXRcIik7XHJcbiAgICAgICAgICAgIHZhciBwb3N0c1BlclBhZ2UgPSAkc3Bpbm5lci5kYXRhKFwicG9zdHMtcGVyLXBhZ2VcIik7XHJcbiAgICAgICAgICAgIGdldE1vcmVQb3N0cyhvZmZzZXQsIHBvc3RzUGVyUGFnZSkudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgdmFyICRyZXMgPSAkKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAkKCcubWFzb25yeScpLmFwcGVuZCggJHJlcyApLm1hc29ucnkoICdhcHBlbmRlZCcsICRyZXMgKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdPZmZzZXQgPSBvZmZzZXQrcG9zdHNQZXJQYWdlO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1BhcmFtcyA9ICc/b2Zmc2V0PScrIG5ld09mZnNldDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7dXJsUGF0aDpuZXdQYXJhbXN9LFwiXCIsbmV3UGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuZGF0YShcIm9mZnNldFwiLG5ld09mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAkc3Bpbm5lci5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoZGlkU2Nyb2xsKSB7XHJcbiAgICAgICAgLyogdG9nZ2xlTmF2KCk7Ki9cclxuICAgICAgICBkaWRTY3JvbGwgPSBmYWxzZTtcclxuICAgIH1cclxufSwgMjUwKTtcclxuIiwiIiwiZnVuY3Rpb24gcm95YWxfd29vY29tbWVyY2UoKSB7XHJcblxyXG4gICAgLy8gLS0tLSBOb3RpY2VzIC0tLS0gLy9cclxuICAgIGlmICgkKCcubm90aWNlJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJveWFsX21vdmVOb3RpY2UoKTtcclxuICAgIH1cclxuICAgICQoZG9jdW1lbnQuYm9keSkub24oJ3VwZGF0ZWRfY2FydF90b3RhbHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByb3lhbF9tb3ZlTm90aWNlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAtLS0tIFByb2R1Y3RzIC0tLS0gLy9cclxuICAgIGlmICgkKCdtYWluI3Byb2R1Y3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLSBDYXJ0IC0tLS0gLy9cclxuICAgIGlmICgkKCcud29vY29tbWVyY2UtY2FydC1mb3JtJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5wcm9kdWN0LXJlbW92ZSBhJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJveWFsX3JlZnJlc2hDYXJ0Tm90aWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLSBDaGVja291dCAtLS0tLSAvL1xyXG4gICAgLyogJCgnI3BheW1lbnQgW3R5cGU9cmFkaW9dJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XHJcbiAgICAgKiB9KTsqL1xyXG59XHJcbiJdfQ==

})(jQuery);