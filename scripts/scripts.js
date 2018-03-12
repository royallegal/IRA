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
    if($('#videoModal').length > 0 ){
       $('#videoModal').modal();
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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFqYXguanMiLCJhcnRpY2xlLmpzIiwiY29uc3VsdGF0aW9uLmpzIiwiY29udGFjdC5qcyIsImZpbHRlclBvc3RzLmpzIiwibG9naW4uanMiLCJtYXNvbnJ5LmpzIiwibWVudXMuanMiLCJtb2RhbHMuanMiLCJub3RpY2UuanMiLCJxdWl6LmpzIiwicmVhZHkuanMiLCJyZXNpemUuanMiLCJzY3JvbGwuanMiLCJ2YWxpZGF0ZS5qcyIsIndvb2NvbW1lcmNlLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQ0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3JOQTtBQUNBO0FDREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMvRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNqSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbImZ1bmN0aW9uIGdldE1vcmVQb3N0cyhvZmZzZXQsIHBvc3RzX3Blcl9wYWdlLCBjYXRlZ29yeSl7XHJcbiAgcmV0dXJuICQuYWpheCh7XHJcbiAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICB1cmw6ICcvd3AtYWRtaW4vYWRtaW4tYWpheC5waHAnLFxyXG4gICAgZGF0YToge1xyXG4gICAgICBjYXRlZ29yeTogY2F0ZWdvcnksXHJcbiAgICAgIG9mZnNldDogb2Zmc2V0LFxyXG4gICAgICBwb3N0c19wZXJfcGFnZTogcG9zdHNfcGVyX3BhZ2UsXHJcbiAgICAgIGFjdGlvbjogJ3Jsc19tb3JlX3Bvc3RzJ1xyXG4gICAgfVxyXG4gIH0pO1xyXG59IiwiZnVuY3Rpb24gcm95YWxfYXJ0aWNsZSgpIHtcclxuICAgIC8vIFJlc3BvbnNpdmUgaUZyYW1lc1xyXG4gICAgLyogJCgnaWZyYW1lJykud3JhcCgnPGRpdiBjbGFzcz1cInZpZGVvLWNvbnRhaW5lclwiPjwvZGl2PicpOyovXHJcblxyXG4gICAgLy8gUGFyYWxsYXhcclxuICAgIGlmICgkKCcucGFyYWxsYXgtY29udGFpbmVyJykubGVuZ3RoKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ1BBUkFMTEFYJyk7XHJcbiAgICAgICAgdmFyIGZlYXR1cmVkID0gJCgnLmZlYXR1cmVkLWltYWdlIC5wYXJhbGxheCcpO1xyXG4gICAgICAgIHZhciBwcm9tb3Rpb24gPSAkKCcucHJvbW90aW9uLWltYWdlIC5wYXJhbGxheCcpO1xyXG5cclxuICAgICAgICBpZiAoZmVhdHVyZWQubGVuZ3RoICYmIHByb21vdGlvbi5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0JPVEgnKTtcclxuICAgICAgICAgICAgZmVhdHVyZWQucGFyYWxsYXgoKTtcclxuICAgICAgICAgICAgcHJvbW90aW9uLnBhcmFsbGF4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKGZlYXR1cmVkLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRkVBVFVSRUQnKTtcclxuICAgICAgICAgICAgZmVhdHVyZWQucGFyYWxsYXgoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZWxzZSBpZiAocHJvbW90aW9uLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnUFJPTU9USU8nKTtcclxuICAgICAgICAgICAgcHJvbW90aW9uLnBhcmFsbGF4KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2Uge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnRUxTRScpO1xyXG4gICAgICAgICAgICAkKCcucGFyYWxsYXgnKS5wYXJhbGxheCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCJmdW5jdGlvbiByb3lhbF9jb25zdWx0YXRpb24oKSB7XHJcbiAgICAkKCduYXYnKS5hZGRDbGFzcygnbm8tc2hhZG93Jyk7XHJcbn1cclxuIiwiZnVuY3Rpb24gcm95YWxfY29udGFjdCgpIHtcclxuICAgIC8vIFN1Ym1pc3Npb25cclxuICAgICQoJ2Zvcm0nKS5zdWJtaXQoZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB2YXIgZmlyc3QgICA9ICQoXCIjZmlyc3RcIikudmFsKCk7XHJcbiAgICAgICAgdmFyIGxhc3QgICAgPSAkKFwiI2xhc3RcIikudmFsKCk7XHJcbiAgICAgICAgdmFyIHBob25lICAgPSAkKFwiI3Bob25lXCIpLnZhbCgpO1xyXG4gICAgICAgIHZhciBlbWFpbCAgID0gJChcIiNlbWFpbFwiKS52YWwoKTtcclxuICAgICAgICB2YXIgbWVzc2FnZSA9ICQoXCIjbWVzc2FnZVwiKS52YWwoKTtcclxuICAgICAgICB2YXIgc3VibWl0ICA9ICQoXCJidXR0b25bdHlwZT0nc3VibWl0J11cIik7XHJcbiAgICAgICAgdmFyIGNpcmNsZXMgPSAkKFwiLnByZWxvYWRlci13cmFwcGVyXCIpLnBhcmVudCgpO1xyXG4gICAgICAgIHZhciBjb25maXJtID0gJChcIi5jb25maXJtXCIpO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmVzIGV4aXN0aW5nIHZhbGlkYXRpb25cclxuICAgICAgICBjb25maXJtLnJlbW92ZUNsYXNzKCdwaW5rIGdyZWVuJykuYWRkQ2xhc3MoJ2hpZGUnKS5maW5kKCdwJykucmVtb3ZlKCk7XHJcbiAgICAgICAgJCgnLmludmFsaWQsIC52YWxpZCcpLnJlbW92ZUNsYXNzKCdpbnZhbGlkIHZhbGlkJyk7XHJcblxyXG4gICAgICAgIC8vIFZhbGlkYXRpb25cclxuICAgICAgICBpZiAoZmlyc3QgPT0gXCJcIiB8fCBsYXN0ID09IFwiXCIgfHwgcGhvbmUgPT0gXCJcIiB8fCBlbWFpbCA9PSBcIlwiKSB7XHJcbiAgICAgICAgICAgIGNvbmZpcm0uYWRkQ2xhc3MoJ3BpbmsnKS5yZW1vdmVDbGFzcygnaGlkZScpLmh0bWwoXCI8cD5Pb3BzLCBsb29rcyBsaWtlIHdlJ3JlIG1pc3Npbmcgc29tZSBpbmZvcm1hdGlvbi4gUGxlYXNlIGZpbGwgb3V0IGFsbCB0aGUgZmllbGRzLjwvcD5cIik7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gVG9nZ2xlIFByZWxvYWRlclxyXG4gICAgICAgICAgICBzdWJtaXQuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgY2lyY2xlcy5yZW1vdmVDbGFzcygnaGlkZScpO1xyXG5cclxuICAgICAgICAgICAgJC5hamF4KHtcclxuICAgICAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIHVybDogXCIvd3AtYWRtaW4vYWRtaW4tYWpheC5waHBcIixcclxuICAgICAgICAgICAgICAgIGRhdGE6IHtcclxuICAgICAgICAgICAgICAgICAgICBhY3Rpb246ICdjb250YWN0X3VzX2Zvcm0nLFxyXG4gICAgICAgICAgICAgICAgICAgIGZpcnN0OiBmaXJzdCxcclxuICAgICAgICAgICAgICAgICAgICBsYXN0OiBsYXN0LFxyXG4gICAgICAgICAgICAgICAgICAgIHBob25lOiBwaG9uZSxcclxuICAgICAgICAgICAgICAgICAgICBlbWFpbDogZW1haWwsXHJcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZTogbWVzc2FnZS5yZXBsYWNlKC8oPzpcXHJcXG58XFxyfFxcbikvZywgJzxici8+JyksXHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YSA9PSBcIjBcIikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBFcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbmZpcm0uYWRkQ2xhc3MoJ3BpbmsnKS5yZW1vdmVDbGFzcygnaGlkZScpLmh0bWwoXCI8cD5Pb3BzLCBsb29rcyBsaWtlIHRoZXJlIHdhcyBhIHByb2JsZW0hIENoZWNrIGJhY2sgbGF0ZXIgb3IgZW1haWwgdXMgZGlyZWN0bHkgYXQgPGEgaHJlZj0nbWFpbHRvOnNjb3R0QHJveWFsbGVnYWxzb2x1dGlvbnMuY29tJz5zY290dEByb3lhbGxlZ2Fsc29sdXRpb25zLmNvbTwvYT4uPC9wPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFN1Y2Nlc3MgbWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maXJtLmFkZENsYXNzKCdncmVlbicpLnJlbW92ZUNsYXNzKCdoaWRlJykuaHRtbChcIjxwPlN1Y2Nlc3MhIENoZWNrIHlvdXIgZW1haWwuIFdlJ2xsIGJlIGluIHRvdWNoIHNob3J0bHkuPC9wPlwiKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9LFxyXG5cclxuICAgICAgICAgICAgICAgIGVycm9yOiBmdW5jdGlvbihlcnIpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBFcnJvciBtZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgY29uZmlybS5hZGRDbGFzcygncGluaycpLnJlbW92ZUNsYXNzKCdoaWRlJykuaHRtbChcIjxwPk9vcHMsIGxvb2tzIGxpa2UgdGhlcmUgd2FzIGEgcHJvYmxlbSEgQ2hlY2sgYmFjayBsYXRlciBvciBlbWFpbCB1cyBkaXJlY3RseSBhdCA8YSBocmVmPSdtYWlsdG86c2NvdHRAcm95YWxsZWdhbHNvbHV0aW9ucy5jb20nPnNjb3R0QHJveWFsbGVnYWxzb2x1dGlvbnMuY29tPC9hPi48L3A+XCIpO1xyXG4gICAgICAgICAgICAgICAgfSxcclxuXHJcbiAgICAgICAgICAgICAgICBjb21wbGV0ZTogZnVuY3Rpb24ocmVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgJCgnZm9ybScpWzBdLnJlc2V0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgTWF0ZXJpYWxpemUudXBkYXRlVGV4dEZpZWxkcygpO1xyXG4gICAgICAgICAgICAgICAgICAgICQoJ2Zvcm0gdGV4dGFyZWEnKS50cmlnZ2VyKCdhdXRvcmVzaXplJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRvZ2dsZSBQcmVsb2FkZXJcclxuICAgICAgICAgICAgICAgICAgICBjaXJjbGVzLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc3VibWl0LnJlbW92ZUNsYXNzKCdoaWRlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcbiIsImZ1bmN0aW9uIHJveWFsX2ZpbHRlclBvc3RzKCkge1xyXG4gICAgJCgnI3NlYXJjaCcpLmNoYW5nZShmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgZmlsdGVyID0gJCh0aGlzKS52YWwoKTtcclxuXHJcbiAgICAgICAgLy8gRXh0ZW5kIDpjb250YWlucyBzZWxlY3RvclxyXG4gICAgICAgIGpRdWVyeS5leHByWyc6J10uY29udGFpbnMgPSBmdW5jdGlvbihhLCBpLCBtKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBqUXVlcnkoYSkudGV4dCgpLnRvVXBwZXJDYXNlKCkuaW5kZXhPZihtWzNdLnRvVXBwZXJDYXNlKCkpID49IDA7XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICAgICAgLy8gSGlkZXMgY2FyZHMgdGhhdCBkb24ndCBtYXRjaCBpbnB1dFxyXG4gICAgICAgICQoXCIjZmVlZCAuY29udGVudCAuY2FyZC1jb250YWluZXI6dmlzaWJsZSBhcnRpY2xlIC5jYXJkLXRpdGxlIGE6bm90KDpjb250YWlucyhcIitmaWx0ZXIrXCIpKVwiKS5jbG9zZXN0KCcuY2FyZC1jb250YWluZXInKS5mYWRlT3V0KCk7XHJcblxyXG4gICAgICAgIC8vIFNob3dzIGNhcmRzIHRoYXQgbWF0Y2ggaW5wdXRcclxuICAgICAgICAkKFwiI2ZlZWQgLmNvbnRlbnQgLmNhcmQtY29udGFpbmVyOm5vdCg6dmlzaWJsZSkgYXJ0aWNsZSAuY2FyZC10aXRsZSBhOmNvbnRhaW5zKFwiK2ZpbHRlcitcIilcIikuY2xvc2VzdCgnLmNhcmQtY29udGFpbmVyJykuZmFkZUluKCk7XHJcblxyXG4gICAgICAgIC8vIEFkZCBlbXB0eSBtZXNzYWdlIHdoZW4gaWYgbm8gcG9zdHMgYXJlIHZpc2libGVcclxuICAgICAgICB2YXIgbWVzc2FnZSA9ICQoJyNmZWVkICNuby1yZXN1bHRzJyk7XHJcbiAgICAgICAgaWYgKCQoXCIjZmVlZCAuY29udGVudCAuY2FyZC1jb250YWluZXI6dmlzaWJsZSBhcnRpY2xlIC5jYXJkLXRpdGxlIGE6Y29udGFpbnMoXCIrZmlsdGVyK1wiKVwiKS5zaXplKCkgPT0gMCkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZS5oYXNDbGFzcygnaGlkZScpKSB7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgICQoJyNmZWVkICNuby1yZXN1bHRzJykucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgICAgIH0sIDQwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbWVzc2FnZS5maW5kKCcudGFyZ2V0JykudGV4dChmaWx0ZXIpO1xyXG4gICAgICAgIH0gZWxzZSB7IG1lc3NhZ2UuYWRkQ2xhc3MoJ2hpZGUnKTsgfVxyXG5cclxuICAgIH0pLmtleXVwKGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQodGhpcykuY2hhbmdlKCk7XHJcbiAgICB9KTtcclxufVxyXG4iLCJmdW5jdGlvbiByb3lhbF9sb2dpbigpIHtcclxuICAgICQoJyNsb2dpbi1tb2RhbCcpLm1vZGFsKCk7XHJcblxyXG4gICAgLy8gQ2hvb3NlcyB3aGljaCBvZiB0aGUgdGhyZWUgbW9kYWwgZm9ybXMgdG8gZGlzcGxheVxyXG4gICAgJCgnI2xvZ2luLW1vZGFsIGEnKS5jbGljayhmdW5jdGlvbihlKSB7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgIHZhciB0YXJnZXQgPSAkKHRoaXMpLmF0dHIoJ2hyZWYnKTtcclxuICAgICAgICByb3lhbF9zaG93Rm9ybSh0YXJnZXQpO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gU3VibWl0cyBBSkFYIGNhbGwgJiBsb2FkZXIsIGNsb3NlcyBvbiBjb21wbGV0aW9uXHJcbiAgICAkKCcjbG9naW4tbW9kYWwgaW5wdXRbdHlwZT1zdWJtaXRdJykuY2xpY2soZnVuY3Rpb24oZSkge1xyXG4gICAgICAgIHZhciBmb3JtID0gJCh0aGlzKS5maW5kKCdmb3JtJyk7XHJcbiAgICAgICAgdmFyIGFjdGlvbiA9ICQoZm9ybSkuYXR0cignYWN0aW9uJyk7XHJcblxyXG4gICAgICAgIGlmIChhY3Rpb24gPT0gXCJsb2dpblwiKSB7XHJcbiAgICAgICAgICAgIHJveWFsX2FqYXhMb2dpbigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhY3Rpb24gPT0gXCJyZWdpc3RlclwiKSB7XHJcbiAgICAgICAgICAgIHJveWFsX2FqYXhSZWdpc3RlcigpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIGlmIChhY3Rpb24gPT0gXCJyZXNldFwiKSB7XHJcbiAgICAgICAgICAgIHJveWFsX2FqYXhSZXNldCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbHNlIHtcclxuICAgICAgICAgICAgLy8gZXJyb3JcclxuICAgICAgICAgICAgLy8gdXNlIFwiY2xhc3Nlcy9lbWFpbC5waHBcIiB0byBzZW5kIGFuIGVycm9yIG5vdGlmaWNhdGlvbiB0byBzd2VkeTEzQGdtYWlsLmNvbVxyXG4gICAgICAgICAgICAvLyBvbmx5IHNlbmQgZW1haWwgaWYgYW4gZXJyb3Igb2NjdXJzIG9uIHRoZSBwcm9kdWN0aW9uIHNpdGVcclxuICAgICAgICAgICAgLy8gaWYgKGlzX3dwZSgpKSB7IC4uLnNlbmQgcGFzc3dvcmQgfVxyXG4gICAgICAgIH1cclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcm95YWxfc2hvd0xvZ2luRmllbGQodGFyZ2V0KSB7XHJcbiAgICAkKCcjbG9naW4tbW9kYWwgLnJvdycpLmFkZENsYXNzKCdoaWRlJyk7XHJcbiAgICAkKHRhcmdldCkucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxufVxyXG5cclxuXHJcbmZ1bmN0aW9uIHJveWFsX2FqYXhMb2dpbihmb3JtKSB7XHJcbiAgICAvLyBJZiAobG9naW4gdmFsaWRhdGlvbiA9PSBcInN1Y2Nlc3NmdWxcIikge1xyXG4gICAgLy8gICAgIEFKQVggbG9naW4gY2FsbCBoZXJlLi4uXHJcbiAgICAvLyB9XHJcbn1cclxuXHJcblxyXG5cclxuXHJcbiQoXCIjbG9naW5DYWxsLCAuYnRuLWxvZ2luZm9ybVwiKS5jbGljayhmdW5jdGlvbiAoKSB7XHJcbiAgICAvL2FsZXJ0KCd3b3JraW5nLi4uJyk7XHJcbiAgICAkKCcjcmVnaXN0ZXItaGQnKS5oaWRlKCk7XHJcbiAgICAkKCcjcmVnaXN0ZXItcG9wdXAnKS5oaWRlKCk7XHJcbiAgICAkKCcjZm9yZ290LWhkJykuaGlkZSgpO1xyXG4gICAgJCgnI2ZvcmdvdF9wYXNzd29yZC1wb3B1cCcpLmhpZGUoKTtcclxuXHJcbiAgICAkKCcjbG9naW4taGQnKS5mYWRlSW4oKTtcclxuICAgICQoJyNsb2dpbi1wb3B1cCcpLmZhZGVJbigpO1xyXG59KTtcclxuXHJcbiQoXCIjc2lnbnVwQ2FsbCwgI3NpZ251cENhbGwyXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNsb2dpbi1oZCcpLmhpZGUoKTtcclxuICAgICQoJyNsb2dpbi1wb3B1cCcpLmhpZGUoKTtcclxuICAgICQoJyNmb3Jnb3QtaGQnKS5oaWRlKCk7XHJcbiAgICAkKCcjZm9yZ290X3Bhc3N3b3JkLXBvcHVwJykuaGlkZSgpO1xyXG5cclxuICAgICQoJyNyZWdpc3Rlci1oZCcpLmZhZGVJbigpO1xyXG4gICAgJCgnI3JlZ2lzdGVyLXBvcHVwJykuZmFkZUluKCk7XHJcbn0pO1xyXG5cclxuJChcIiNmb3Jnb3RDYWxsXCIpLmNsaWNrKGZ1bmN0aW9uICgpIHtcclxuICAgICQoJyNyZWdpc3Rlci1oZCcpLmhpZGUoKTtcclxuICAgICQoJyNyZWdpc3Rlci1wb3B1cCcpLmhpZGUoKTtcclxuICAgICQoJyNsb2dpbi1oZCcpLmhpZGUoKTtcclxuICAgICQoJyNsb2dpbi1wb3B1cCcpLmhpZGUoKTtcclxuXHJcbiAgICAkKCcjZm9yZ290LWhkJykuZmFkZUluKCk7XHJcbiAgICAkKCcjZm9yZ290X3Bhc3N3b3JkLXBvcHVwJykuZmFkZUluKCk7XHJcbn0pO1xyXG5cclxuLy8gUGVyZm9ybSBBSkFYIGxvZ2luL3JlZ2lzdGVyIG9uIGZvcm0gc3VibWl0XHJcbiQoJ2Zvcm0jbG9naW4tcG9wdXAsIGZvcm0jcmVnaXN0ZXItcG9wdXAnKS5vbignc3VibWl0JywgZnVuY3Rpb24gKGUpIHtcclxuICAgIGlmICghJCh0aGlzKS52YWxpZCgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAkKCdwLnN0YXR1cycsIHRoaXMpLnNob3coKS50ZXh0KGFqYXhfYXV0aF9vYmplY3QubG9hZGluZ21lc3NhZ2UpO1xyXG4gICAgYWN0aW9uID0gJ2FqYXhsb2dpbic7XHJcbiAgICB1c2VybmFtZSA9ICAkKCdmb3JtI2xvZ2luLXBvcHVwICN1c2VybmFtZScpLnZhbCgpO1xyXG4gICAgcGFzc3dvcmQgPSAkKCdmb3JtI2xvZ2luLXBvcHVwICNwYXNzd29yZCcpLnZhbCgpO1xyXG4gICAgZW1haWwgPSAnJztcclxuICAgIHNlY3VyaXR5ID0gJCgnZm9ybSNsb2dpbi1wb3B1cCAjc2VjdXJpdHknKS52YWwoKTtcclxuICAgIGlmICgkKHRoaXMpLmF0dHIoJ2lkJykgPT0gJ3JlZ2lzdGVyLXBvcHVwJykge1xyXG4gICAgICAgIGFjdGlvbiA9ICdhamF4cmVnaXN0ZXInO1xyXG4gICAgICAgIHVzZXJuYW1lID0gJCgnI3NpZ25vbm5hbWUnKS52YWwoKTtcclxuICAgICAgICBwYXNzd29yZCA9ICQoJyNzaWdub25wYXNzd29yZCcpLnZhbCgpO1xyXG4gICAgICAgIGVtYWlsID0gJCgnI2VtYWlsJykudmFsKCk7XHJcbiAgICAgICAgc2VjdXJpdHkgPSAkKCcjc2lnbm9uc2VjdXJpdHknKS52YWwoKTsgIFxyXG4gICAgfSAgXHJcbiAgICBjdHJsID0gJCh0aGlzKTtcclxuICAgICQuYWpheCh7XHJcbiAgICAgICAgdHlwZTogJ1BPU1QnLFxyXG4gICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgdXJsOiBhamF4X2F1dGhfb2JqZWN0LmFqYXh1cmwsXHJcbiAgICAgICAgZGF0YToge1xyXG4gICAgICAgICAgICAnYWN0aW9uJzogYWN0aW9uLFxyXG4gICAgICAgICAgICAndXNlcm5hbWUnOiB1c2VybmFtZSxcclxuICAgICAgICAgICAgJ3Bhc3N3b3JkJzogcGFzc3dvcmQsXHJcbiAgICAgICAgICAgICdlbWFpbCc6IGVtYWlsLFxyXG4gICAgICAgICAgICAnc2VjdXJpdHknOiBzZWN1cml0eVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgc3VjY2VzczogZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgJCgncC5zdGF0dXMnLCBjdHJsKS50ZXh0KGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmxvZ2dlZGluID09IHRydWUpIHtcclxuICAgICAgICAgICAgICAgIGRvY3VtZW50LmxvY2F0aW9uLmhyZWYgPSBhamF4X2F1dGhfb2JqZWN0LnJlZGlyZWN0dXJsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSk7XHJcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XHJcbn0pO1xyXG5cclxuLy8gUGVyZm9ybSBBSkFYIGZvcmdldCBwYXNzd29yZCBvbiBmb3JtIHN1Ym1pdFxyXG4kKCdmb3JtI2ZvcmdvdF9wYXNzd29yZC1wb3B1cCcpLm9uKCdzdWJtaXQnLCBmdW5jdGlvbihlKXtcclxuICAgIGlmICghJCh0aGlzKS52YWxpZCgpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAkKCdwLnN0YXR1cycsIHRoaXMpLnNob3coKS50ZXh0KGFqYXhfYXV0aF9vYmplY3QubG9hZGluZ21lc3NhZ2UpO1xyXG4gICAgY3RybCA9ICQodGhpcyk7XHJcbiAgICAkLmFqYXgoe1xyXG4gICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICBkYXRhVHlwZTogJ2pzb24nLFxyXG4gICAgICAgIHVybDogYWpheF9hdXRoX29iamVjdC5hamF4dXJsLFxyXG4gICAgICAgIGRhdGE6IHsgXHJcbiAgICAgICAgICAgICdhY3Rpb24nOiAnYWpheGZvcmdvdHBhc3N3b3JkJywgXHJcbiAgICAgICAgICAgICd1c2VyX2xvZ2luJzogJCgnI3VzZXJfbG9naW4nKS52YWwoKSwgXHJcbiAgICAgICAgICAgICdzZWN1cml0eSc6ICQoJyNmb3Jnb3RzZWN1cml0eScpLnZhbCgpLCBcclxuICAgICAgICB9LFxyXG4gICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpeyAgICAgICAgICAgICAgICAgICAgXHJcbiAgICAgICAgICAgICQoJ3Auc3RhdHVzJyxjdHJsKS50ZXh0KGRhdGEubWVzc2FnZSk7ICAgICAgICAgICAgICBcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgIHJldHVybiBmYWxzZTtcclxufSk7XHJcblxyXG4vLyBDbGllbnQgc2lkZSBmb3JtIHZhbGlkYXRpb25cclxuaWYgKGpRdWVyeShcIiNyZWdpc3Rlci1wb3B1cFwiKS5sZW5ndGgpIFxyXG4gICAgalF1ZXJ5KFwiI3JlZ2lzdGVyLXBvcHVwXCIpLnZhbGlkYXRlKFxyXG4gICAgICAgIHtydWxlczp7XHJcbiAgICAgICAgICAgIHBhc3N3b3JkMjp7IGVxdWFsVG86JyNzaWdub25wYXNzd29yZCcgXHJcbiAgICAgICAgICAgIH0gICBcclxuICAgICAgICB9fVxyXG4gICAgKTtcclxuZWxzZSBpZiAoalF1ZXJ5KFwiI2xvZ2luLXBvcHVwXCIpLmxlbmd0aCkgXHJcbiAgICBqUXVlcnkoXCIjbG9naW4tcG9wdXBcIikudmFsaWRhdGUoKTtcclxuaWYoalF1ZXJ5KCcjZm9yZ290X3Bhc3N3b3JkLXBvcHVwJykubGVuZ3RoKVxyXG4gICAgalF1ZXJ5KCcjZm9yZ290X3Bhc3N3b3JkLXBvcHVwJykudmFsaWRhdGUoKTtcclxuXHJcblxyXG5cclxualF1ZXJ5KGRvY3VtZW50KS5yZWFkeShmdW5jdGlvbigkKSB7XHJcbiAgICAvLyBQZXJmb3JtIEFKQVggbG9naW4gb24gZm9ybSBzdWJtaXRcclxuICAgICQoJ2Zvcm0jbG9naW4nKS5vbignc3VibWl0JywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xyXG4gICAgICAgICQuYWpheCh7XHJcbiAgICAgICAgICAgIHR5cGU6ICdQT1NUJyxcclxuICAgICAgICAgICAgZGF0YVR5cGU6ICdqc29uJyxcclxuICAgICAgICAgICAgdXJsOiAnL3dwLWFkbWluL2FkbWluLWFqYXgucGhwJyxcclxuICAgICAgICAgICAgZGF0YTogeyBcclxuICAgICAgICAgICAgICAgICdhY3Rpb24nOiAnYWpheF9sb2dpbicsXHJcbiAgICAgICAgICAgICAgICAndXNlcm5hbWUnOiAkKCdmb3JtI2xvZ2luICNsb2dpblVzZXJuYW1lJykudmFsKCksIFxyXG4gICAgICAgICAgICAgICAgJ3Bhc3N3b3JkJzogJCgnZm9ybSNsb2dpbiAjbG9naW5QYXNzd29yZCcpLnZhbCgpLCBcclxuICAgICAgICAgICAgICAgICdsb2dpblNlY3VyaXR5JzogJCgnZm9ybSNsb2dpbiAjbG9naW5TZWN1cml0eScpLnZhbCgpIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgJCgnZm9ybSNsb2dpbiBwLnN0YXR1cycpLnRleHQoZGF0YS5tZXNzYWdlKTtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLmxvZ2dlZGluID09IHRydWUpe1xyXG4gICAgICAgICAgICAgICAgICAgIGxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuICAgICQoJ2Zvcm0jcGFzc3dvcmRMb3N0Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICBjb25zb2xlLmxvZyhcIldURkZGRjIyMjIyXCIpOyBcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHVybDogJy93cC1hZG1pbi9hZG1pbi1hamF4LnBocCcsIFxyXG4gICAgICAgICAgICBkYXRhOiB7IFxyXG4gICAgICAgICAgICAgICAgJ2FjdGlvbic6ICdsb3N0X3Bhc3MnLFxyXG4gICAgICAgICAgICAgICAgJ3VzZXJfbG9naW4nOiAkKCdmb3JtI3Bhc3N3b3JkTG9zdCAjbG9zdFVzZXJuYW1lJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAnbG9zdFNlY3VyaXR5JzogJCgnZm9ybSNwYXNzd29yZExvc3QgI2xvc3RTZWN1cml0eScpLnZhbCgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgJCgnZm9ybSNwYXNzd29yZExvc3QgcC5zdGF0dXMnKS50ZXh0KGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG4gICAgJCgnZm9ybSNwYXNzd29yZFJlc2V0Jykub24oJ3N1Ym1pdCcsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICAkLmFqYXgoe1xyXG4gICAgICAgICAgICB0eXBlOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGRhdGFUeXBlOiAnanNvbicsXHJcbiAgICAgICAgICAgIHVybDogJy93cC1hZG1pbi9hZG1pbi1hamF4LnBocCcsIFxyXG4gICAgICAgICAgICBkYXRhOiB7IFxyXG5cdFx0XHRcdGFjdGlvbjogXHQncmVzZXRfcGFzcycsXHJcblx0XHRcdFx0cGFzczE6XHRcdCQoJ2Zvcm0jcGFzc3dvcmRSZXNldCAjcmVzZXRQYXNzMScpLnZhbCgpLFxyXG5cdFx0XHRcdHBhc3MyOlx0XHQkKCdmb3JtI3Bhc3N3b3JkUmVzZXQgI3Jlc2V0UGFzczInKS52YWwoKSxcclxuXHRcdFx0XHR1c2VyX2tleTpcdCQoJ2Zvcm0jcGFzc3dvcmRSZXNldCAjdXNlcl9rZXknKS52YWwoKSxcclxuXHRcdFx0XHR1c2VyX2xvZ2luOlx0JCgnZm9ybSNwYXNzd29yZFJlc2V0ICN1c2VyX2xvZ2luJykudmFsKCksXHJcbiAgICAgICAgICAgICAgICAncmVzZXRTZWN1cml0eSc6ICQoJ2Zvcm0jcGFzc3dvcmRSZXNldCAjcmVzZXRTZWN1cml0eScpLnZhbCgpXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIHN1Y2Nlc3M6IGZ1bmN0aW9uKGRhdGEpe1xyXG4gICAgICAgICAgICAgICAgJCgnZm9ybSNwYXNzd29yZExvc3QgcC5zdGF0dXMnKS50ZXh0KGRhdGEubWVzc2FnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxufSk7ICIsIiFmdW5jdGlvbih0LG4pe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPW4oKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKG4pOnQuTWFjeT1uKCl9KHRoaXMsZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtmdW5jdGlvbiB0KHQsbil7dmFyIGU9dm9pZCAwO3JldHVybiBmdW5jdGlvbigpe2UmJmNsZWFyVGltZW91dChlKSxlPXNldFRpbWVvdXQodCxuKX19ZnVuY3Rpb24gbih0LG4pe2Zvcih2YXIgZT10Lmxlbmd0aCxvPWUscj1bXTtlLS07KXIucHVzaChuKHRbby1lLTFdKSk7cmV0dXJuIHJ9ZnVuY3Rpb24gZSh0LG4pe0EodCxuLGFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl0pfWZ1bmN0aW9uIG8odCl7Zm9yKHZhciBuPXQub3B0aW9ucyxlPXQucmVzcG9uc2l2ZU9wdGlvbnMsbz10LmtleXMscj10LmRvY1dpZHRoLGk9dm9pZCAwLHM9MDtzPG8ubGVuZ3RoO3MrKyl7dmFyIGE9cGFyc2VJbnQob1tzXSwxMCk7cj49YSYmKGk9bi5icmVha0F0W2FdLE8oaSxlKSl9cmV0dXJuIGV9ZnVuY3Rpb24gcih0KXtmb3IodmFyIG49dC5vcHRpb25zLGU9dC5yZXNwb25zaXZlT3B0aW9ucyxvPXQua2V5cyxyPXQuZG9jV2lkdGgsaT12b2lkIDAscz1vLmxlbmd0aC0xO3M+PTA7cy0tKXt2YXIgYT1wYXJzZUludChvW3NdLDEwKTtyPD1hJiYoaT1uLmJyZWFrQXRbYV0sTyhpLGUpKX1yZXR1cm4gZX1mdW5jdGlvbiBpKHQpe3ZhciBuPWRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgsZT17Y29sdW1uczp0LmNvbHVtbnN9O0wodC5tYXJnaW4pP2UubWFyZ2luPXt4OnQubWFyZ2luLngseTp0Lm1hcmdpbi55fTplLm1hcmdpbj17eDp0Lm1hcmdpbix5OnQubWFyZ2lufTt2YXIgaT1PYmplY3Qua2V5cyh0LmJyZWFrQXQpO3JldHVybiB0Lm1vYmlsZUZpcnN0P28oe29wdGlvbnM6dCxyZXNwb25zaXZlT3B0aW9uczplLGtleXM6aSxkb2NXaWR0aDpufSk6cih7b3B0aW9uczp0LHJlc3BvbnNpdmVPcHRpb25zOmUsa2V5czppLGRvY1dpZHRoOm59KX1mdW5jdGlvbiBzKHQpe3JldHVybiBpKHQpLmNvbHVtbnN9ZnVuY3Rpb24gYSh0KXtyZXR1cm4gaSh0KS5tYXJnaW59ZnVuY3Rpb24gYyh0KXt2YXIgbj0hKGFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdKXx8YXJndW1lbnRzWzFdLGU9cyh0KSxvPWEodCkueCxyPTEwMC9lO3JldHVybiBuPzE9PT1lP1wiMTAwJVwiOihvPShlLTEpKm8vZSxcImNhbGMoXCIrcitcIiUgLSBcIitvK1wicHgpXCIpOnJ9ZnVuY3Rpb24gdSh0LG4pe3ZhciBlPXModC5vcHRpb25zKSxvPTAscj12b2lkIDAsaT12b2lkIDA7cmV0dXJuIDE9PT0rK24/MDooaT1hKHQub3B0aW9ucykueCxyPShpLShlLTEpKmkvZSkqKG4tMSksbys9Yyh0Lm9wdGlvbnMsITEpKihuLTEpLFwiY2FsYyhcIitvK1wiJSArIFwiK3IrXCJweClcIil9ZnVuY3Rpb24gbCh0KXt2YXIgbj0wLGU9dC5jb250YWluZXI7bSh0LnJvd3MsZnVuY3Rpb24odCl7bj10Pm4/dDpufSksZS5zdHlsZS5oZWlnaHQ9bitcInB4XCJ9ZnVuY3Rpb24gcCh0LG4pe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl0sbz0hKGFyZ3VtZW50cy5sZW5ndGg+MyYmdm9pZCAwIT09YXJndW1lbnRzWzNdKXx8YXJndW1lbnRzWzNdLHI9cyh0Lm9wdGlvbnMpLGk9YSh0Lm9wdGlvbnMpLnk7Qyh0LHIsZSksbShuLGZ1bmN0aW9uKG4pe3ZhciBlPTAscj1wYXJzZUludChuLm9mZnNldEhlaWdodCwxMCk7aXNOYU4ocil8fCh0LnJvd3MuZm9yRWFjaChmdW5jdGlvbihuLG8pe248dC5yb3dzW2VdJiYoZT1vKX0pLG4uc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLG4uc3R5bGUudG9wPXQucm93c1tlXStcInB4XCIsbi5zdHlsZS5sZWZ0PVwiXCIrdC5jb2xzW2VdLHQucm93c1tlXSs9aXNOYU4ocik/MDpyK2ksbyYmKG4uZGF0YXNldC5tYWN5Q29tcGxldGU9MSkpfSksbyYmKHQudG1wUm93cz1udWxsKSxsKHQpfWZ1bmN0aW9uIGgodCxuKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdLG89IShhcmd1bWVudHMubGVuZ3RoPjMmJnZvaWQgMCE9PWFyZ3VtZW50c1szXSl8fGFyZ3VtZW50c1szXSxyPXModC5vcHRpb25zKSxpPWEodC5vcHRpb25zKS55O0ModCxyLGUpLG0obixmdW5jdGlvbihuKXt0Lmxhc3Rjb2w9PT1yJiYodC5sYXN0Y29sPTApO3ZhciBlPU0obixcImhlaWdodFwiKTtlPXBhcnNlSW50KG4ub2Zmc2V0SGVpZ2h0LDEwKSxpc05hTihlKXx8KG4uc3R5bGUucG9zaXRpb249XCJhYnNvbHV0ZVwiLG4uc3R5bGUudG9wPXQucm93c1t0Lmxhc3Rjb2xdK1wicHhcIixuLnN0eWxlLmxlZnQ9XCJcIit0LmNvbHNbdC5sYXN0Y29sXSx0LnJvd3NbdC5sYXN0Y29sXSs9aXNOYU4oZSk/MDplK2ksdC5sYXN0Y29sKz0xLG8mJihuLmRhdGFzZXQubWFjeUNvbXBsZXRlPTEpKX0pLG8mJih0LnRtcFJvd3M9bnVsbCksbCh0KX12YXIgZj1mdW5jdGlvbiB0KG4sZSl7aWYoISh0aGlzIGluc3RhbmNlb2YgdCkpcmV0dXJuIG5ldyB0KG4sZSk7aWYobj1uLnJlcGxhY2UoL15cXHMqLyxcIlwiKS5yZXBsYWNlKC9cXHMqJC8sXCJcIiksZSlyZXR1cm4gdGhpcy5ieUNzcyhuLGUpO2Zvcih2YXIgbyBpbiB0aGlzLnNlbGVjdG9ycylpZihlPW8uc3BsaXQoXCIvXCIpLG5ldyBSZWdFeHAoZVsxXSxlWzJdKS50ZXN0KG4pKXJldHVybiB0aGlzLnNlbGVjdG9yc1tvXShuKTtyZXR1cm4gdGhpcy5ieUNzcyhuKX07Zi5wcm90b3R5cGUuYnlDc3M9ZnVuY3Rpb24odCxuKXtyZXR1cm4obnx8ZG9jdW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwodCl9LGYucHJvdG90eXBlLnNlbGVjdG9ycz17fSxmLnByb3RvdHlwZS5zZWxlY3RvcnNbL15cXC5bXFx3XFwtXSskL109ZnVuY3Rpb24odCl7cmV0dXJuIGRvY3VtZW50LmdldEVsZW1lbnRzQnlDbGFzc05hbWUodC5zdWJzdHJpbmcoMSkpfSxmLnByb3RvdHlwZS5zZWxlY3RvcnNbL15cXHcrJC9dPWZ1bmN0aW9uKHQpe3JldHVybiBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSh0KX0sZi5wcm90b3R5cGUuc2VsZWN0b3JzWy9eXFwjW1xcd1xcLV0rJC9dPWZ1bmN0aW9uKHQpe3JldHVybiBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LnN1YnN0cmluZygxKSl9O3ZhciBtPWZ1bmN0aW9uKHQsbil7Zm9yKHZhciBlPXQubGVuZ3RoLG89ZTtlLS07KW4odFtvLWUtMV0pfSx2PWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTt0aGlzLnJ1bm5pbmc9ITEsdGhpcy5ldmVudHM9W10sdGhpcy5hZGQodCl9O3YucHJvdG90eXBlLnJ1bj1mdW5jdGlvbigpe2lmKCF0aGlzLnJ1bm5pbmcmJnRoaXMuZXZlbnRzLmxlbmd0aD4wKXt2YXIgdD10aGlzLmV2ZW50cy5zaGlmdCgpO3RoaXMucnVubmluZz0hMCx0KCksdGhpcy5ydW5uaW5nPSExLHRoaXMucnVuKCl9fSx2LnByb3RvdHlwZS5hZGQ9ZnVuY3Rpb24oKXt2YXIgdD10aGlzLG49YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtyZXR1cm4hIW4mJihBcnJheS5pc0FycmF5KG4pP20obixmdW5jdGlvbihuKXtyZXR1cm4gdC5hZGQobil9KToodGhpcy5ldmVudHMucHVzaChuKSx2b2lkIHRoaXMucnVuKCkpKX0sdi5wcm90b3R5cGUuY2xlYXI9ZnVuY3Rpb24oKXt0aGlzLmV2ZW50cz1bXX07dmFyIGQ9ZnVuY3Rpb24odCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9O3JldHVybiB0aGlzLmluc3RhbmNlPXQsdGhpcy5kYXRhPW4sdGhpc30sZz1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF07dGhpcy5ldmVudHM9e30sdGhpcy5pbnN0YW5jZT10fTtnLnByb3RvdHlwZS5vbj1mdW5jdGlvbigpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdO3JldHVybiEoIXR8fCFuKSYmKEFycmF5LmlzQXJyYXkodGhpcy5ldmVudHNbdF0pfHwodGhpcy5ldmVudHNbdF09W10pLHRoaXMuZXZlbnRzW3RdLnB1c2gobikpfSxnLnByb3RvdHlwZS5lbWl0PWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXSxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fTtpZighdHx8IUFycmF5LmlzQXJyYXkodGhpcy5ldmVudHNbdF0pKXJldHVybiExO3ZhciBlPW5ldyBkKHRoaXMuaW5zdGFuY2Usbik7bSh0aGlzLmV2ZW50c1t0XSxmdW5jdGlvbih0KXtyZXR1cm4gdChlKX0pfTt2YXIgeT1mdW5jdGlvbih0KXtyZXR1cm4hKFwibmF0dXJhbEhlaWdodFwiaW4gdCYmdC5uYXR1cmFsSGVpZ2h0K3QubmF0dXJhbFdpZHRoPT09MCl8fHQud2lkdGgrdC5oZWlnaHQhPT0wfSxFPWZ1bmN0aW9uKHQsbil7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0mJmFyZ3VtZW50c1syXTtyZXR1cm4gbmV3IFByb21pc2UoZnVuY3Rpb24odCxlKXtpZihuLmNvbXBsZXRlKXJldHVybiB5KG4pP3Qobik6ZShuKTtuLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsZnVuY3Rpb24oKXtyZXR1cm4geShuKT90KG4pOmUobil9KSxuLmFkZEV2ZW50TGlzdGVuZXIoXCJlcnJvclwiLGZ1bmN0aW9uKCl7cmV0dXJuIGUobil9KX0pLnRoZW4oZnVuY3Rpb24obil7ZSYmdC5lbWl0KHQuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0xPQUQse2ltZzpufSl9KS5jYXRjaChmdW5jdGlvbihuKXtyZXR1cm4gdC5lbWl0KHQuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0VSUk9SLHtpbWc6bn0pfSl9LHc9ZnVuY3Rpb24odCxlKXt2YXIgbz1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO3JldHVybiBuKGUsZnVuY3Rpb24obil7cmV0dXJuIEUodCxuLG8pfSl9LEE9ZnVuY3Rpb24odCxuKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXSYmYXJndW1lbnRzWzJdO3JldHVybiBQcm9taXNlLmFsbCh3KHQsbixlKSkudGhlbihmdW5jdGlvbigpe3QuZW1pdCh0LmNvbnN0YW50cy5FVkVOVF9JTUFHRV9DT01QTEVURSl9KX0sST1mdW5jdGlvbihuKXtyZXR1cm4gdChmdW5jdGlvbigpe24uZW1pdChuLmNvbnN0YW50cy5FVkVOVF9SRVNJWkUpLG4ucXVldWUuYWRkKGZ1bmN0aW9uKCl7cmV0dXJuIG4ucmVjYWxjdWxhdGUoITAsITApfSl9LDEwMCl9LE49ZnVuY3Rpb24odCl7aWYodC5jb250YWluZXI9Zih0Lm9wdGlvbnMuY29udGFpbmVyKSx0LmNvbnRhaW5lciBpbnN0YW5jZW9mIGZ8fCF0LmNvbnRhaW5lcilyZXR1cm4hIXQub3B0aW9ucy5kZWJ1ZyYmY29uc29sZS5lcnJvcihcIkVycm9yOiBDb250YWluZXIgbm90IGZvdW5kXCIpO2RlbGV0ZSB0Lm9wdGlvbnMuY29udGFpbmVyLHQuY29udGFpbmVyLmxlbmd0aCYmKHQuY29udGFpbmVyPXQuY29udGFpbmVyWzBdKSx0LmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbj1cInJlbGF0aXZlXCJ9LFQ9ZnVuY3Rpb24odCl7dC5xdWV1ZT1uZXcgdix0LmV2ZW50cz1uZXcgZyh0KSx0LnJvd3M9W10sdC5yZXNpemVyPUkodCl9LGI9ZnVuY3Rpb24odCl7dmFyIG49ZihcImltZ1wiLHQuY29udGFpbmVyKTt3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLHQucmVzaXplciksdC5vbih0LmNvbnN0YW50cy5FVkVOVF9JTUFHRV9MT0FELGZ1bmN0aW9uKCl7cmV0dXJuIHQucmVjYWxjdWxhdGUoITEsITEpfSksdC5vbih0LmNvbnN0YW50cy5FVkVOVF9JTUFHRV9DT01QTEVURSxmdW5jdGlvbigpe3JldHVybiB0LnJlY2FsY3VsYXRlKCEwLCEwKX0pLHQub3B0aW9ucy51c2VPd25JbWFnZUxvYWRlcnx8ZSh0LG4sIXQub3B0aW9ucy53YWl0Rm9ySW1hZ2VzKSx0LmVtaXQodC5jb25zdGFudHMuRVZFTlRfSU5JVElBTElaRUQpfSxfPWZ1bmN0aW9uKHQpe04odCksVCh0KSxiKHQpfSxMPWZ1bmN0aW9uKHQpe3JldHVybiB0PT09T2JqZWN0KHQpJiZcIltvYmplY3QgQXJyYXldXCIhPT1PYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodCl9LE89ZnVuY3Rpb24odCxuKXtMKHQpfHwobi5jb2x1bW5zPXQpLEwodCkmJnQuY29sdW1ucyYmKG4uY29sdW1ucz10LmNvbHVtbnMpLEwodCkmJnQubWFyZ2luJiYhTCh0Lm1hcmdpbikmJihuLm1hcmdpbj17eDp0Lm1hcmdpbix5OnQubWFyZ2lufSksTCh0KSYmdC5tYXJnaW4mJkwodC5tYXJnaW4pJiZ0Lm1hcmdpbi54JiYobi5tYXJnaW4ueD10Lm1hcmdpbi54KSxMKHQpJiZ0Lm1hcmdpbiYmTCh0Lm1hcmdpbikmJnQubWFyZ2luLnkmJihuLm1hcmdpbi55PXQubWFyZ2luLnkpfSxNPWZ1bmN0aW9uKHQsbil7cmV0dXJuIHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHQsbnVsbCkuZ2V0UHJvcGVydHlWYWx1ZShuKX0sQz1mdW5jdGlvbih0LG4pe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdJiZhcmd1bWVudHNbMl07aWYodC5sYXN0Y29sfHwodC5sYXN0Y29sPTApLHQucm93cy5sZW5ndGg8MSYmKGU9ITApLGUpe3Qucm93cz1bXSx0LmNvbHM9W10sdC5sYXN0Y29sPTA7Zm9yKHZhciBvPW4tMTtvPj0wO28tLSl0LnJvd3Nbb109MCx0LmNvbHNbb109dSh0LG8pfWVsc2UgaWYodC50bXBSb3dzKXt0LnJvd3M9W107Zm9yKHZhciBvPW4tMTtvPj0wO28tLSl0LnJvd3Nbb109dC50bXBSb3dzW29dfWVsc2V7dC50bXBSb3dzPVtdO2Zvcih2YXIgbz1uLTE7bz49MDtvLS0pdC50bXBSb3dzW29dPXQucm93c1tvXX19LFY9ZnVuY3Rpb24odCl7dmFyIG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0mJmFyZ3VtZW50c1sxXSxlPSEoYXJndW1lbnRzLmxlbmd0aD4yJiZ2b2lkIDAhPT1hcmd1bWVudHNbMl0pfHxhcmd1bWVudHNbMl0sbz1uP3QuY29udGFpbmVyLmNoaWxkcmVuOmYoJzpzY29wZSA+ICo6bm90KFtkYXRhLW1hY3ktY29tcGxldGU9XCIxXCJdKScsdC5jb250YWluZXIpLHI9Yyh0Lm9wdGlvbnMpO3JldHVybiBtKG8sZnVuY3Rpb24odCl7biYmKHQuZGF0YXNldC5tYWN5Q29tcGxldGU9MCksdC5zdHlsZS53aWR0aD1yfSksdC5vcHRpb25zLnRydWVPcmRlcj8oaCh0LG8sbixlKSx0LmVtaXQodC5jb25zdGFudHMuRVZFTlRfUkVDQUxDVUxBVEVEKSk6KHAodCxvLG4sZSksdC5lbWl0KHQuY29uc3RhbnRzLkVWRU5UX1JFQ0FMQ1VMQVRFRCkpfSxSPU9iamVjdC5hc3NpZ258fGZ1bmN0aW9uKHQpe2Zvcih2YXIgbj0xO248YXJndW1lbnRzLmxlbmd0aDtuKyspe3ZhciBlPWFyZ3VtZW50c1tuXTtmb3IodmFyIG8gaW4gZSlPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoZSxvKSYmKHRbb109ZVtvXSl9cmV0dXJuIHR9LHg9e2NvbHVtbnM6NCxtYXJnaW46Mix0cnVlT3JkZXI6ITEsd2FpdEZvckltYWdlczohMSx1c2VJbWFnZUxvYWRlcjohMCxicmVha0F0Ont9LHVzZU93bkltYWdlTG9hZGVyOiExLG9uSW5pdDohMX07IWZ1bmN0aW9uKCl7dHJ5e2RvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJhXCIpLnF1ZXJ5U2VsZWN0b3IoXCI6c2NvcGUgKlwiKX1jYXRjaCh0KXshZnVuY3Rpb24oKXtmdW5jdGlvbiB0KHQpe3JldHVybiBmdW5jdGlvbihlKXtpZihlJiZuLnRlc3QoZSkpe3ZhciBvPXRoaXMuZ2V0QXR0cmlidXRlKFwiaWRcIik7b3x8KHRoaXMuaWQ9XCJxXCIrTWF0aC5mbG9vcig5ZTYqTWF0aC5yYW5kb20oKSkrMWU2KSxhcmd1bWVudHNbMF09ZS5yZXBsYWNlKG4sXCIjXCIrdGhpcy5pZCk7dmFyIHI9dC5hcHBseSh0aGlzLGFyZ3VtZW50cyk7cmV0dXJuIG51bGw9PT1vP3RoaXMucmVtb3ZlQXR0cmlidXRlKFwiaWRcIik6b3x8KHRoaXMuaWQ9bykscn1yZXR1cm4gdC5hcHBseSh0aGlzLGFyZ3VtZW50cyl9fXZhciBuPS86c2NvcGVcXGIvZ2ksZT10KEVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3IpO0VsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3I9ZnVuY3Rpb24odCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfTt2YXIgbz10KEVsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGwpO0VsZW1lbnQucHJvdG90eXBlLnF1ZXJ5U2VsZWN0b3JBbGw9ZnVuY3Rpb24odCl7cmV0dXJuIG8uYXBwbHkodGhpcyxhcmd1bWVudHMpfX0oKX19KCk7dmFyIHE9ZnVuY3Rpb24gdCgpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp4O2lmKCEodGhpcyBpbnN0YW5jZW9mIHQpKXJldHVybiBuZXcgdChuKTt0aGlzLm9wdGlvbnM9e30sUih0aGlzLm9wdGlvbnMseCxuKSxfKHRoaXMpfTtyZXR1cm4gcS5pbml0PWZ1bmN0aW9uKHQpe3JldHVybiBjb25zb2xlLndhcm4oXCJEZXByZWNpYXRlZDogTWFjeS5pbml0IHdpbGwgYmUgcmVtb3ZlZCBpbiB2My4wLjAgb3B0IHRvIHVzZSBNYWN5IGRpcmVjdGx5IGxpa2Ugc28gTWFjeSh7IC8qb3B0aW9ucyBoZXJlKi8gfSkgXCIpLG5ldyBxKHQpfSxxLnByb3RvdHlwZS5yZWNhbGN1bGF0ZU9uSW1hZ2VMb2FkPWZ1bmN0aW9uKCl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0mJmFyZ3VtZW50c1swXTtyZXR1cm4gZSh0aGlzLGYoXCJpbWdcIix0aGlzLmNvbnRhaW5lciksIXQpfSxxLnByb3RvdHlwZS5ydW5PbkltYWdlTG9hZD1mdW5jdGlvbih0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSYmYXJndW1lbnRzWzFdLG89ZihcImltZ1wiLHRoaXMuY29udGFpbmVyKTtyZXR1cm4gdGhpcy5vbih0aGlzLmNvbnN0YW50cy5FVkVOVF9JTUFHRV9DT01QTEVURSx0KSxuJiZ0aGlzLm9uKHRoaXMuY29uc3RhbnRzLkVWRU5UX0lNQUdFX0xPQUQsdCksZSh0aGlzLG8sbil9LHEucHJvdG90eXBlLnJlY2FsY3VsYXRlPWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcyxuPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sZT0hKGFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdKXx8YXJndW1lbnRzWzFdO3JldHVybiBlJiZ0aGlzLnF1ZXVlLmNsZWFyKCksdGhpcy5xdWV1ZS5hZGQoZnVuY3Rpb24oKXtyZXR1cm4gVih0LG4sZSl9KX0scS5wcm90b3R5cGUucmVtb3ZlPWZ1bmN0aW9uKCl7d2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIix0aGlzLnJlc2l6ZXIpLG0odGhpcy5jb250YWluZXIuY2hpbGRyZW4sZnVuY3Rpb24odCl7dC5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLW1hY3ktY29tcGxldGVcIiksdC5yZW1vdmVBdHRyaWJ1dGUoXCJzdHlsZVwiKX0pLHRoaXMuY29udGFpbmVyLnJlbW92ZUF0dHJpYnV0ZShcInN0eWxlXCIpfSxxLnByb3RvdHlwZS5yZUluaXQ9ZnVuY3Rpb24oKXt0aGlzLnJlY2FsY3VsYXRlKCEwLCEwKSx0aGlzLmVtaXQodGhpcy5jb25zdGFudHMuRVZFTlRfSU5JVElBTElaRUQpLHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicmVzaXplXCIsdGhpcy5yZXNpemVyKSx0aGlzLmNvbnRhaW5lci5zdHlsZS5wb3NpdGlvbj1cInJlbGF0aXZlXCJ9LHEucHJvdG90eXBlLm9uPWZ1bmN0aW9uKHQsbil7dGhpcy5ldmVudHMub24odCxuKX0scS5wcm90b3R5cGUuZW1pdD1mdW5jdGlvbih0LG4pe3RoaXMuZXZlbnRzLmVtaXQodCxuKX0scS5jb25zdGFudHM9e0VWRU5UX0lOSVRJQUxJWkVEOlwibWFjeS5pbml0aWFsaXplZFwiLEVWRU5UX1JFQ0FMQ1VMQVRFRDpcIm1hY3kucmVjYWxjdWxhdGVkXCIsRVZFTlRfSU1BR0VfTE9BRDpcIm1hY3kuaW1hZ2UubG9hZFwiLEVWRU5UX0lNQUdFX0VSUk9SOlwibWFjeS5pbWFnZS5lcnJvclwiLEVWRU5UX0lNQUdFX0NPTVBMRVRFOlwibWFjeS5pbWFnZXMuY29tcGxldGVcIixFVkVOVF9SRVNJWkU6XCJtYWN5LnJlc2l6ZVwifSxxLnByb3RvdHlwZS5jb25zdGFudHM9cS5jb25zdGFudHMscX0pO1xyXG4iLCJmdW5jdGlvbiByb3lhbF9tZW51cygpIHtcclxuICAgIC8vIE1vYmlsZSBNZW51XHJcbiAgICAkKFwiI21vYmlsZS1tZW51XCIpLnNpZGVOYXYoe1xyXG4gICAgICAgIG1lbnVXaWR0aDogMjYwLFxyXG4gICAgICAgIGVkZ2U6ICdyaWdodCdcclxuICAgIH0pO1xyXG5cclxuXHJcbiAgICAvLyBEcm9wZG93bnNcclxuICAgICQoXCJuYXYgLmRyb3Bkb3duLWJ1dHRvblwiKS5kcm9wZG93bih7XHJcbiAgICAgICAgY29uc3RyYWluV2lkdGg6IGZhbHNlXHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgLy8gSGVybyBEaXNwbGF5c1xyXG4gICAgaWYgKCQoJy5oZXJvLWNvbnRhaW5lciwgLnBhcmFsbGF4LWNvbnRhaW5lcicpLmxlbmd0aCkge1xyXG4gICAgICAgICQoJ25hdicpLmFkZENsYXNzKCd0cmFuc3BhcmVudCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5cclxuZnVuY3Rpb24gcm95YWxfdG9nZ2xlX21lbnVzKHRvcCkge1xyXG4gICAgaWYgKHRvcCA+IDUgJiYgJCgnbmF2JykuaGFzQ2xhc3MoJ3RyYW5zcGFyZW50JykpIHtcclxuICAgICAgICAkKCduYXYnKS5yZW1vdmVDbGFzcygndHJhbnNwYXJlbnQnKTtcclxuICAgIH1cclxuICAgIGVsc2UgaWYgKHRvcCA8IDUgJiYgISQoJ25hdicpLmhhc0NsYXNzKCd0cmFuc3BhcmVudCcpKSB7XHJcbiAgICAgICAgJCgnbmF2JykuYWRkQ2xhc3MoJ3RyYW5zcGFyZW50Jyk7XHJcbiAgICB9XHJcbn1cclxuIiwiZnVuY3Rpb24gcm95YWxfbW9kYWxzKCkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGF1dG9wbGF5KHZpZGVvKSB7XHJcbiAgICAgICAgdmlkZW8uY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcInBsYXlWaWRlb1wiLFwiYXJnc1wiOlwiXCJ9JywgJyonKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIGF1dG9zdG9wKHZpZGVvKSB7XHJcbiAgICAgICAgdmlkZW8uY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZSgne1wiZXZlbnRcIjpcImNvbW1hbmRcIixcImZ1bmNcIjpcInBhdXNlVmlkZW9cIixcImFyZ3NcIjpcIlwifScsICcqJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gSG9tZSBQYWdlIFZpZGVvXHJcbiAgICBpZiAoJCgnI2hvbWUnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgdmFyIHZpZGVvID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJwbGF5ZXJcIik7XHJcbiAgICAgICAgJCgnLm1vZGFsJykubW9kYWwoe1xyXG4gICAgICAgICAgICByZWFkeTogZnVuY3Rpb24obW9kYWwpIHtcclxuICAgICAgICAgICAgICAgIGlmICgkKG1vZGFsKS5oYXNDbGFzcygndmlkZW8nKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5KHZpZGVvKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgY29tcGxldGU6IGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoJChtb2RhbCkuaGFzQ2xhc3MoJ3ZpZGVvJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvc3RvcCh2aWRlbyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBcclxuXHJcbiAgICAvLyBCbG9nIFZpZGVvc1xyXG4gICAgaWYgKCQoJyNmZWVkJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5tb2RhbCcpLm1vZGFsKHtcclxuICAgICAgICAgICAgcmVhZHk6IGZ1bmN0aW9uKG1vZGFsKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgJG1vZGFsID0gJChtb2RhbCk7XHJcbiAgICAgICAgICAgICAgICB2YXIgdmlkZW9TcmMgPSAkbW9kYWwuZGF0YSgndmlkZW8tc3JjJyk7XHJcbiAgICAgICAgICAgICAgICB2YXIgJGlmcmFtZSA9ICRtb2RhbC5maW5kKCdpZnJhbWUnKTtcclxuXHJcbiAgICAgICAgICAgICAgICBpZigkaWZyYW1lICYmICEkaWZyYW1lLmF0dHIoJ3NyYycpKXtcclxuICAgICAgICAgICAgICAgICAgICAkaWZyYW1lLmF0dHIoJ3NyYycsIHZpZGVvU3JjICsgXCI/ZW5hYmxlanNhcGk9MSZzaG93aW5mbz0wXCIpXHJcbiAgICAgICAgICAgICAgICAgICAgJGlmcmFtZS5vbignbG9hZCcsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGF1dG9wbGF5KHRoaXMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICB9ZWxzZXtcclxuICAgICAgICAgICAgICAgICAgICBhdXRvcGxheSgkaWZyYW1lLmdldCgwKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGNvbXBsZXRlOiBmdW5jdGlvbihtb2RhbCkge1xyXG4gICAgICAgICAgICAgICAgdmFyICRtb2RhbCA9ICQobW9kYWwpO1xyXG4gICAgICAgICAgICAgICAgdmFyICRpZnJhbWUgPSAkbW9kYWwuZmluZCgnaWZyYW1lJyk7XHJcbiAgICAgICAgICAgICAgICBhdXRvc3RvcCgkaWZyYW1lLmdldCgwKSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfVxyXG5cclxuICAgIGlmKCQoJyNsb2dpbk1vZGFsJykubGVuZ3RoID4gMCApe1xyXG4gICAgICAgICQoJyNsb2dpbk1vZGFsJykubW9kYWwoe1xyXG4gICAgICAgICAgICByZWFkeTogZnVuY3Rpb24obW9kYWwpe1xyXG4gICAgICAgICAgICAgICAgJCgnI2xvZ2luTW9kYWwgLmNhcm91c2VsLmNhcm91c2VsLXNsaWRlcicpLmNhcm91c2VsKHtmdWxsV2lkdGg6IHRydWUsIG5vV3JhcDogdHJ1ZSB9KTsgXHJcbiAgICAgICAgICAgICAgICAvL1RyYW5zaXRpb24gdG8gc2xpZGUgaWYgcmVzZXR0aW5nIHBhc3N3b3JkXHJcbiAgICAgICAgICAgICAgICBpZihsb2NhdGlvbi5zZWFyY2guaW5jbHVkZXMoXCJhY3Rpb249cnBcIikpIHtcclxuICAgICAgICAgICAgICAgICAgICAkKCcjbG9naW5Nb2RhbCAuY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoJ3NldCcsIDIpOyBcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vT3BlbiBtb2RhbCBhdXRvbWF0aWNhbGx5IGlmIHJlc2V0IHBhc3N3b3JkIGlzIHByZXNzZW50XHJcbiAgICAgICAgaWYobG9jYXRpb24uc2VhcmNoLmluY2x1ZGVzKFwiYWN0aW9uPXJwXCIpKSB7XHJcbiAgICAgICAgICAgICQoJyNsb2dpbk1vZGFsJykubW9kYWwoJ29wZW4nKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgJCgnW2RhdGEtZ290by1sb3N0XScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJyNsb2dpbk1vZGFsIC5jYXJvdXNlbC5jYXJvdXNlbC1zbGlkZXInKS5jYXJvdXNlbCgnc2V0JywgMSk7IFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgJCgnW2RhdGEtZ290by1sb2dpbl0nKS5vbignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAkKCcjbG9naW5Nb2RhbCAuY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoJ3NldCcsIDApOyBcclxuICAgICAgICB9KVxyXG5cclxuICAgIH1cclxuICAgIGlmKCQoJyN2aWRlb01vZGFsJykubGVuZ3RoID4gMCApe1xyXG4gICAgICAgJCgnI3ZpZGVvTW9kYWwnKS5tb2RhbCgpO1xyXG4gICAgfVxyXG59XHJcbiIsIi8vIE1vdmVzIHRoZSBXb29Db21tZXJjZSBub3RpY2UgdG8gdGhlIHRvcCBvZiB0aGUgcGFnZVxyXG5mdW5jdGlvbiByb3lhbF9tb3ZlTm90aWNlKCkge1xyXG4gICAgJCgnLm5vdGljZScpLmVhY2goZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgJCh0aGlzKS5wcmVwZW5kVG8oJCgnbWFpbicpKTtcclxuICAgIH0pO1xyXG59XHJcblxyXG5cclxuLy8gTW92ZXMgbmV3bHkgYWRkZWQgV29vQ29tbWVyY2UgY2FydCBub3RpY2VzIHRvIHRoZSB0b3Agb2YgdGhlIHBhZ2VcclxuZnVuY3Rpb24gcm95YWxfcmVmcmVzaENhcnROb3RpY2UoKSB7XHJcbiAgICB2YXIgY2FydExvb3AgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcclxuICAgICAgICBpZiAoJCgnbWFpbiAuY29udGFpbmVyIC5ub3RpY2UnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHJveWFsX21vdmVOb3RpY2UoKTtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjYXJ0TG9vcCk7XHJcbiAgICAgICAgfVxyXG4gICAgfSwgMjUwKTtcclxufVxyXG4iLCJmdW5jdGlvbiByb3lhbF9xdWl6KCkge1xyXG5cclxuICAgIC8vIEFzc2V0IFByb3RlY3Rpb24gUXVpelxyXG4gICAgaWYgKCQoJyNhc3NldC1wcm90ZWN0aW9uLXF1aXonKS5sZW5ndGgpIHtcclxuICAgICAgICAvLyBNYXRlcmlhbGl6ZSBjYXJvdXNlbCBzZXR0aW5nc1xyXG4gICAgICAgICQoJyNhc3NldC1wcm90ZWN0aW9uLXF1aXogLmNhcm91c2VsLmNhcm91c2VsLXNsaWRlcicpLmNhcm91c2VsKHtcclxuICAgICAgICAgICAgZnVsbFdpZHRoOiB0cnVlLFxyXG4gICAgICAgICAgICBpbmRpY2F0b3JzOnRydWVcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gUXVlc3Rpb25zIHBhbmVsIGRpc3BsYXkgJiBuYXZpZ2F0aW9uXHJcbiAgICAgICAgJCgnLnRvZ2dsZS1zZWN0aW9uJykuaGlkZSgpO1xyXG4gICAgICAgICQoJy5idG4tcXVpei10b2dnbGUnKS51bmJpbmQoJ2NsaWNrJykuYmluZCgnY2xpY2snLGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICQoJy50b2dnbGUtc2VjdGlvbicpLnNsaWRlVG9nZ2xlKCdmYXN0JyxmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaWYoJCgnLnRvZ2dsZS1zZWN0aW9uJykuY3NzKCdkaXNwbGF5Jyk9PSdibG9jaycpe1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG4tcXVpei10b2dnbGUnKS5odG1sKFwiQ0xPU0UgUVVJWlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuLXF1aXotdG9nZ2xlJykuYWRkQ2xhc3MoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIH1lbHNle1xyXG4gICAgICAgICAgICAgICAgICAgICQoJy5idG4tcXVpei10b2dnbGUnKS5odG1sKFwiVEFLRSBUSEUgUVVJWlwiKTtcclxuICAgICAgICAgICAgICAgICAgICAkKCcuYnRuLXF1aXotdG9nZ2xlJykucmVtb3ZlQ2xhc3MoXCJjbG9zZVwiKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFJlc3VsdHMgJiBlbWFpbFxyXG4gICAgICAgIC8vIENvZGUgZ29lcyBoZXJlLi4uXHJcbiAgICB9XHJcblxyXG59XHJcbiIsIiQoZG9jdW1lbnQpLnJlYWR5KGZ1bmN0aW9uKCkge1xyXG4gICAgJ3VzZSBzdHJpY3QnO1xyXG5cclxuICAgIC8vIC0tLS0gR0xPQkFMIC0tLS0gLy9cclxuICAgIHJveWFsX21lbnVzKCk7XHJcblxyXG5cclxuICAgIC8vIC0tLS0gR0VORVJBTCAtLS0tIC8vXHJcbiAgICBpZiAoJC5mbi5wYXJhbGxheCAmJiAkKCcucGFyYWxsYXgnKS5sZW5ndGgpe1xyXG4gICAgICAgICQoJy5wYXJhbGxheCcpLnBhcmFsbGF4KCk7XHJcbiAgICB9XHJcbiAgICBpZiAoJC5mbi5jYXJvdXNlbCAmJiAkKCcuY2Fyb3VzZWwtc2xpZGVyJykubGVuZ3RoKXtcclxuICAgICAgICAkKCcuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoe1xyXG4gICAgICAgICAgICBkdXJhdGlvbjogMzUwLFxyXG4gICAgICAgICAgICBmdWxsV2lkdGg6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgIH0gXHJcblxyXG5cclxuICAgIC8vIC0tLS0gTU9CSUxFIC0tLS0gLy9cclxuXHJcblxyXG4gICAgLy8gLS0tLSBMQU5ESU5HIFBBR0VTIC0tLS0gLy9cclxuICAgIGlmICgkKCcjaG9tZScpLmxlbmd0aCkge1xyXG4gICAgICAgICQoJyNob21lIC5jYXJvdXNlbC1zbGlkZXInKS5jYXJvdXNlbCh7XHJcbiAgICAgICAgICAgIGR1cmF0aW9uOiAzNTAsXHJcbiAgICAgICAgICAgIGZ1bGxXaWR0aDogdHJ1ZVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHNldFRpbWVvdXQoYXV0b3BsYXksIDkwMDApO1xyXG4gICAgICAgIGZ1bmN0aW9uIGF1dG9wbGF5KCkge1xyXG4gICAgICAgICAgICAkKCcjaG9tZSAuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoJ25leHQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dChhdXRvcGxheSwgMTIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcblxyXG4gICAgLy8gLS0tLSBQUk9NT1RJT05TIC0tLS0gLy9cclxuICAgIGlmICgkKCcubW9kYWwtdHJpZ2dlcicpLmxlbmd0aCkge1xyXG4gICAgICAgIHJveWFsX21vZGFscygpO1xyXG4gICAgfVxyXG4gICAgLyogaWYgKCQoJy5xdWl6JykubGVuZ3RoKXtcclxuICAgICAqICAgICByb3lhbF9xdWl6KCk7XHJcbiAgICAgKiB9Ki9cclxuXHJcblxyXG4gICAgLy8gLS0tLSBXT09DT01NRVJDRSAtLS0tIC8vXHJcbiAgICBpZiAoJCgnYm9keS53b29jb21tZXJjZScpLmxlbmd0aCkge1xyXG4gICAgICAgIHJveWFsX3dvb2NvbW1lcmNlKCk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIC8vIC0tLS0gQkxPRyAtLS0tIC8vXHJcbiAgICBpZiAoJCgnI2ZlZWQnKS5sZW5ndGgpIHtcclxuICAgICAgICAkKCcjZmVlZCAuY2Fyb3VzZWwuY2Fyb3VzZWwtc2xpZGVyJykuY2Fyb3VzZWwoe2Z1bGxXaWR0aDogdHJ1ZX0pO1xyXG4gICAgICAgIHZhciBjb2x1bW5zID0gICQoJyNmZWVkIC5jb2wnKS5maXJzdCgpLmhhc0NsYXNzKCdtOScpID8gMyA6IDQ7XHJcbiAgICAgICAgdmFyICRtc25yeSA9ICQoJy5tYXNvbnJ5JykubWFzb25yeSgge1xyXG4gICAgICAgICAgICBpdGVtU2VsZWN0b3I6ICdhcnRpY2xlJyxcclxuICAgICAgICAgICAgcGVyY2VudFBvc2l0aW9uOiB0cnVlLFxyXG4gICAgICAgICAgICBmaXRXaWR0aDogdHJ1ZSxcclxuICAgICAgICAgICAgaGlkZGVuU3R5bGU6IHtcclxuICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogJ3RyYW5zbGF0ZVkoMTAwcHgpJyxcclxuICAgICAgICAgICAgICAgIG9wYWNpdHk6IDBcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgdmlzaWJsZVN0eWxlOiB7XHJcbiAgICAgICAgICAgICAgICB0cmFuc2Zvcm06ICd0cmFuc2xhdGVZKDBweCknLFxyXG4gICAgICAgICAgICAgICAgb3BhY2l0eTogMVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmICgkLmZuLmltYWdlc0xvYWRlZCkge1xyXG4gICAgICAgICAgICAkbXNucnkuaW1hZ2VzTG9hZGVkKCkucHJvZ3Jlc3MoZnVuY3Rpb24oaW5zdGFuY2UsIGltYWdlKSB7XHJcbiAgICAgICAgICAgICAgICAkbXNucnkubWFzb25yeSgnbGF5b3V0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXNpemVJbWFnZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICQod2luZG93KS5vbigncmVzaXplJywgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAkbXNucnkubWFzb25yeSgnbGF5b3V0Jyk7XHJcbiAgICAgICAgICAgICAgICByZXNpemVJbWFnZXMoKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvL2J1dHRvbiB0byBsb2FkIG1vcmUgcG9zdHMgdmlhIGFqYXhcclxuICAgICAgICAkKCdbZGF0YS1sb2FkLW1vcmUtcG9zdHNdJykub24oJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgdmFyICR0aGlzID0gJCh0aGlzKTtcclxuICAgICAgICAgICAgJHRoaXMuZGF0YSgnYWN0aXZlLXRleHQnLCAkdGhpcy50ZXh0KCkpLnRleHQoXCJMb2FkaW5nIHBvc3RzLi4uXCIpLmF0dHIoJ2Rpc2FibGVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHZhciBvZmZzZXQgPSAkdGhpcy5kYXRhKFwib2Zmc2V0XCIpO1xyXG4gICAgICAgICAgICB2YXIgcG9zdHNQZXJQYWdlID0gJHRoaXMuZGF0YShcInBvc3RzLXBlci1wYWdlXCIpO1xyXG4gICAgICAgICAgICBnZXRNb3JlUG9zdHMob2Zmc2V0LCBwb3N0c1BlclBhZ2UpLnRoZW4oZnVuY3Rpb24ocmVzKXtcclxuICAgICAgICAgICAgICAgIHZhciAkcmVzID0gJChyZXMpO1xyXG4gICAgICAgICAgICAgICAgJG1zbnJ5LmFwcGVuZCggJHJlcyApLm1hc29ucnkoICdhcHBlbmRlZCcsICRyZXMgKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdPZmZzZXQgPSBvZmZzZXQrcG9zdHNQZXJQYWdlO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1BhcmFtcyA9ICc/b2Zmc2V0PScrIG5ld09mZnNldDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7dXJsUGF0aDpuZXdQYXJhbXN9LFwiXCIsbmV3UGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgJHRoaXMuZGF0YShcIm9mZnNldFwiLG5ld09mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAkdGhpcy50ZXh0KCR0aGlzLmRhdGEoJ2FjdGl2ZS10ZXh0JykpLmF0dHIoJ2Rpc2FibGVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pXHJcblxyXG4gICAgICAgICQoJ1tkYXRhLXRvZ2dsZS1zaWRlYmFyXScpLm9uKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICRtc25yeS5tYXNvbnJ5KCdsYXlvdXQnLCB0cnVlKVxyXG4gICAgICAgICAgICAkKCcjZmVlZCAuY29sJykuZmlyc3QoKS50b2dnbGVDbGFzcygnbTknKS50b2dnbGVDbGFzcygnbTEyJykudG9nZ2xlQ2xhc3MoJ3dpdGgtc2lkZWJhcicpO1xyXG4gICAgICAgICAgICAkbXNucnkubWFzb25yeSgnbGF5b3V0JywgdHJ1ZSlcclxuICAgICAgICAgICAgJCgnI2ZlZWQgLmNvbCcpLmxhc3QoKS50b2dnbGVDbGFzcygnc2hvd24nKTsgXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIHJlc2l6ZUltYWdlcygpO1xyXG4gICAgICAgICAgICB9LCA0MDApXHJcbiAgICAgICAgfSlcclxuXHJcbiAgICAgICAgcm95YWxfZmlsdGVyUG9zdHMoKTtcclxuICAgIH1cclxuICAgIGlmICgkKCdtYWluI2FydGljbGUnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgcm95YWxfYXJ0aWNsZSgpO1xyXG4gICAgfVxyXG59KTtcclxuIiwiLyogJCh3aW5kb3cpLnJlc2l6ZShmdW5jdGlvbigpIHtcclxuICogICAgIGlmICgkKCcubXktYWNjb3VudCcpLmxlbmd0aCkge1xyXG4gKiAgICAgfVxyXG4gKiB9KSovXHJcbiIsInZhciBkaWRTY3JvbGw7XHJcbiQod2luZG93KS5zY3JvbGwoZnVuY3Rpb24oKXtcclxuICAgIGRpZFNjcm9sbCA9IHRydWU7XHJcbiAgICB2YXIgdG9wID0gJCh3aW5kb3cpLnNjcm9sbFRvcCgpO1xyXG5cclxuICAgIGlmICgkKCcuaGVyby1jb250YWluZXIsIC5wYXJhbGxheC1jb250YWluZXInKS5sZW5ndGgpIHtcclxuICAgICAgICByb3lhbF90b2dnbGVfbWVudXModG9wKTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAoJCgnLmNvbnN1bHRhdGlvbicpLmxlbmd0aCA+IDApIHtcclxuICAgICAgICB2YXIgaGVybyA9ICQoJy5oZXJvLWNvbnRhaW5lcicpLmhlaWdodCgpO1xyXG4gICAgICAgIGlmICh0b3AgPiBoZXJvICYmICQoJ25hdicpLmhhc0NsYXNzKCduby1zaGFkb3cnKSkge1xyXG4gICAgICAgICAgICAkKCduYXYnKS5yZW1vdmVDbGFzcygnbm8tc2hhZG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsc2UgaWYgKHRvcCA8IGhlcm8gJiYgISQoJ25hdicpLmhhc0NsYXNzKCduby1zaGFkb3cnKSkge1xyXG4gICAgICAgICAgICAkKCduYXYnKS5hZGRDbGFzcygnbm8tc2hhZG93Jyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgaWYoJCgnI2ZlZWQnKS5sZW5ndGggJiYgJCgnW2RhdGEtbG9hZC1tb3JlLXNwaW5uZXJdJykuaGFzQ2xhc3MoJ2hpZGUnKSl7XHJcbiAgICAgICAgaWYoJCh3aW5kb3cpLnNjcm9sbFRvcCgpICsgJCh3aW5kb3cpLmhlaWdodCgpICsgJCgnZm9vdGVyJykuaGVpZ2h0KCkgPiAkKGRvY3VtZW50KS5oZWlnaHQoKSkge1xyXG4gICAgICAgICAgICB2YXIgJHNwaW5uZXIgPSAkKCdbZGF0YS1sb2FkLW1vcmUtc3Bpbm5lcl0nKTtcclxuICAgICAgICAgICAgJHNwaW5uZXIucmVtb3ZlQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgdmFyIG9mZnNldCA9ICRzcGlubmVyLmRhdGEoXCJvZmZzZXRcIik7XHJcbiAgICAgICAgICAgIHZhciBwb3N0c1BlclBhZ2UgPSAkc3Bpbm5lci5kYXRhKFwicG9zdHMtcGVyLXBhZ2VcIik7XHJcbiAgICAgICAgICAgIGdldE1vcmVQb3N0cyhvZmZzZXQsIHBvc3RzUGVyUGFnZSkudGhlbihmdW5jdGlvbihyZXMpe1xyXG4gICAgICAgICAgICAgICAgdmFyICRyZXMgPSAkKHJlcyk7XHJcbiAgICAgICAgICAgICAgICAkKCcubWFzb25yeScpLmFwcGVuZCggJHJlcyApLm1hc29ucnkoICdhcHBlbmRlZCcsICRyZXMgKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdPZmZzZXQgPSBvZmZzZXQrcG9zdHNQZXJQYWdlO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1BhcmFtcyA9ICc/b2Zmc2V0PScrIG5ld09mZnNldDtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZSh7dXJsUGF0aDpuZXdQYXJhbXN9LFwiXCIsbmV3UGFyYW1zKVxyXG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuZGF0YShcIm9mZnNldFwiLG5ld09mZnNldCk7XHJcbiAgICAgICAgICAgICAgICAkc3Bpbm5lci5hZGRDbGFzcygnaGlkZScpO1xyXG4gICAgICAgICAgICB9KS5mYWlsKGZ1bmN0aW9uKCl7IFxyXG4gICAgICAgICAgICAgICAgJHNwaW5uZXIuYWRkQ2xhc3MoJ2hpZGUnKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoZGlkU2Nyb2xsKSB7XHJcbiAgICAgICAgLyogdG9nZ2xlTmF2KCk7Ki9cclxuICAgICAgICBkaWRTY3JvbGwgPSBmYWxzZTtcclxuICAgIH1cclxufSwgMjUwKTtcclxuIiwiIiwiZnVuY3Rpb24gcm95YWxfd29vY29tbWVyY2UoKSB7XHJcblxyXG4gICAgLy8gLS0tLSBOb3RpY2VzIC0tLS0gLy9cclxuICAgIGlmICgkKCcubm90aWNlJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgIHJveWFsX21vdmVOb3RpY2UoKTtcclxuICAgIH1cclxuICAgICQoZG9jdW1lbnQuYm9keSkub24oJ3VwZGF0ZWRfY2FydF90b3RhbHMnLCBmdW5jdGlvbigpIHtcclxuICAgICAgICByb3lhbF9tb3ZlTm90aWNlKCk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyAtLS0tIFByb2R1Y3RzIC0tLS0gLy9cclxuICAgIGlmICgkKCdtYWluI3Byb2R1Y3QnKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgJCgnc2VsZWN0JykubWF0ZXJpYWxfc2VsZWN0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLSBDYXJ0IC0tLS0gLy9cclxuICAgIGlmICgkKCcud29vY29tbWVyY2UtY2FydC1mb3JtJykubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICQoJy5wcm9kdWN0LXJlbW92ZSBhJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgIHJveWFsX3JlZnJlc2hDYXJ0Tm90aWNlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gLS0tLSBDaGVja291dCAtLS0tLSAvL1xyXG4gICAgLyogJCgnI3BheW1lbnQgW3R5cGU9cmFkaW9dJykuY2xpY2soZnVuY3Rpb24oKSB7XHJcbiAgICAgKiAgICAgY29uc29sZS5sb2coJ2NsaWNrJyk7XHJcbiAgICAgKiB9KTsqL1xyXG59XHJcbiJdfQ==

})(jQuery);