(function ($, root, undefined) {
    $(function () {
        'use strict';


        // ---- NEW STUFF ---- //
        if ($('body.affiliates').length) {
            $('main').css('margin-top','44px');
            $('.navbar-fixed nav').addClass('nav-extended');
            $('.nav-wrapper').after('<div class="nav-content"></div>');
            $('#affwp-affiliate-dashboard-tabs').appendTo($('.nav-content')).tabs();
            moveNotice();
            $('.collapsible').collapsible();
            Materialize.updateTextFields();
        }




        // ---- ACCOUNTS ---- //
        if ($('.woocommerce-customer-logout .woocommerce .woocommerce-message')) {
            $('.woocommerce-customer-logout .woocommerce .woocommerce-message').addClass('notice');
            moveNotice();
        }

        // ---- NAV ---- //
        // Mobile
        $("#mobile-menu").sideNav({
            menuWidth: 260,
            edge: 'right'
        });

        // ---- CONSULTATION ---- //
        if ($('.consultation').length) {
            consultation();
        }

        // ---- MENUS ---- //
        // Dropdowns
        $(".dropdown-button").dropdown({
            constrainWidth: false,
        });

        // ---- MODALS ---- //
        if ($('.modal-trigger').length > 0) {
            if ($('#home').length > 0) {
                homeVideo();
            }
            if ($('#feed').length > 0) {
                blogVideo();
            }
        }

        // ---- CONTENT ---- //
        if ($('#feed').length > 0) {
            filterPosts();
        }
        if ($('#article').length > 0) {
            $('.parallax').parallax();
            /* $('iframe').wrap('<div class="video-container"></div>');*/
        }

        // ---- WOOCOMMERCE ---- //
        // Notices
        if ($('.notice').length > 0) {
            moveNotice();
        }
        $(document.body).on('updated_cart_totals', function() {
            moveNotice();
        });
        // Products
        if ($('main#product').length > 0) {
            $('select').material_select();
        }
        // Cart
        if ($('.woocommerce-cart-form').length > 0) {
            $('.product-remove a').click(function() {
                refreshCartNotice();
            });
        }
        // Checkout
        $('#payment [type=radio]').click(function() {
            console.log('click');
        });

        // ---- CONTACT ---- //
        if ($('main#contact').length > 0) {
            contactUs();
        }

        // ---- SCROLLING ---- //
        var didScroll;
        $(window).scroll(function(){
            didScroll = true;
            var top = $(window).scrollTop();

            if ($('.home').length > 0) {
                if (top > 5 && $('nav').hasClass('transparent')) {
                    $('nav').removeClass('transparent');
                }
                else if (top < 5 && !$('nav').hasClass('transparent')) {
                    $('nav').addClass('transparent');
                }
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
        });

        setInterval(function() {
            if (didScroll) {
                /* toggleNav();*/
                didScroll = false;
            }
        }, 250);

    });


    // ---- CONSULTATION ---- //
    function consultation() {
        $('nav').addClass('no-shadow');
    }


    // ---- MODALS ---- //
    function homeVideo() {
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

    function blogVideo() {
        $('.modal').modal({
            ready: function(modal) {
                var id = $(modal).attr('id');
                var video = document.getElementById(id+'-player');

                // Insert iframe
                if ($(modal).find('iframe').length) {
                    autoplay(video);
                }
                else {
                    var url = $(modal).attr('data-url') + "?enablejsapi=1&showinfo=0";
                    $(modal).find('.modal-content').html('<iframe id="'+id+'-player" src="'+url+'" frameborder="0" allowfullscreen></iframe>');
                    var video = document.getElementById(id+'-player');
                    video.onload = function() {
                        if ($(modal).hasClass('open')) {
                            autoplay(video);
                        }
                    }
                }
            },
            complete: function(modal) {
                var id = $(modal).attr('id');
                var video = document.getElementById(id+'-player');
                autostop(video);
            }
        })
    }
    function autoplay(video) {
        video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    function autostop(video) {
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
    }


    // ---- CONTENT ---- //
    function filterPosts() {
        // Autocomplete dropdown
        /* var autofill = $('#search').data('autofill').split(' ');
         * var data = {};
         * $.each(autofill, function(i,v) {
         *     data[v] = null;
         * });
         * $('#search').autocomplete({
         *     data: data,
         *     limit: 3,
         *     minLength: 2,
         * });*/

        // Updates post visibility on the page based on search terms
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


    // ---- WOOCOMMERCE ---- //
    function moveNotice() {
        $('.notice').each(function() {
            $(this).prependTo($('main'));
        });
    }

    function refreshCartNotice() {
        var cartLoop = setInterval(function() {
            if ($('main .container .notice').length > 0) {
                moveNotice();
                clearInterval(cartLoop);
            }
        }, 250);
    }


    // ---- CONTACT US ---- //
    function contactUs() {
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

})(jQuery, this);
