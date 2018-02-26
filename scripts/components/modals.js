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
