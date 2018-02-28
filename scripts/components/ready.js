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
