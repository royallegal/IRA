function royal_modals() {

    function autoplay(video) {
        video.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
    }
    function autostop(video) {
        video.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
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

    if($('[hero-video-modal]').length > 0 ){
        //We need to move the dom element to the body so the z-index works and the 
        //modal is not displayed below the overlay
        $("[hero-video-modal]").detach().appendTo('body');

        $('[hero-video-modal]').modal({
            complete: function(modal) {
                var $modal = $(modal);
                var $iframe = $modal.find('iframe');
                autostop($iframe.get(0));
            }
        }); 
    }
}
