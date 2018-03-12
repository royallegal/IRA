function royal_modals() {

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

    if ($('[id*="videoModal"]').length > 0 ) {
        $('[id*="videoModal"]').modal({
            ready: function(modal) {
                auto('play', modal);
            },
            complete: function(modal) {
                auto('pause', modal);
            }
        });
    }
}


// Video Functions
function auto(action, modal) {
    var iframe = $(modal).find('iframe');
    var src    = iframe.attr('src');
    var func   = action + 'Video';

    if (src.includes('youtube')) {
        iframe.get(0).contentWindow.postMessage('{"event":"command","func":"'+func+'","args":""}', '*');
    }
    else if (src.includes('vimeo')) {
        // vimeo autoplay
    }
    if($('#videoModal').length > 0 ){
       $('#videoModal').modal();
    }
}
