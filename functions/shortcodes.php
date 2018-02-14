<?php
// Run manually to add <p> and <br> to $content
remove_filter('the_content', 'wpautop');


// Hero
function hero_shortcode($params, $content=null) {
    // Defaults
    extract(shortcode_atts(array(
        "color"    => "blue",
        "height"   => "500px",
    ), $params));

    if (has_post_thumbnail($post->ID)) {
        $image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'single-post-thumbnail');
    }

    $image = '<div class="hero" style="height:'.$height.'; background-image:url('.$image[0].');"></div>';
    $mask  = '<div class="'.$color.' mask" style="height:'.$height.';"></div>';

    return '<div class="hero-container valign-wrapper center-align" style="height:'.$height.'">'.$image.''.$mask.''.do_shortcode($content).'</div>';
}
add_shortcode('hero', 'hero_shortcode');


// Buttons
function button_shortcode($props, $content=null) {
    extract(shortcode_atts(array(
        "id"      => "modal",
        "classes" => "cta",
        "href"    => "#",
        "modal"   => false
    ), $props));

    if ($modal) {
        $href = "#".$id;
        $classes = $classes." modal-trigger";
    }

    return '<a class="btn '.$classes.'" href="'.$href.'">'.$content.'</a>';
}
add_shortcode('button', 'button_shortcode');


// Modals
function modal_shortcode($props, $content=null) {
    extract(shortcode_atts(array(
        "id" => "modal",
        "video" => false
    ), $props));

    return '<div id="'.$id.'" class="modal '.(($video) ? "video" : "").'"><div class="modal-content">'.$content.'</div></div>';
}
add_shortcode('modal', 'modal_shortcode');


// Captions
function caption_shortcode($props) {
    extract(shortcode_atts(array(
        "title"    => "",
        "subtitle" => "",
        "theme"    => "light"
    ), $props));

    $title = ($title) ? ('<h1>'.$title.'</h1>') : '';
    $subtitle = ($subtitle) ? ('<h2>'.$subtitle.'</h2>') : '';

    return '<div class="caption center-align '.$theme.'">'.$title.''.$subtitle.'</div>';
}
add_shortcode('caption', 'caption_shortcode');


// Videos
function video_shortcode($props, $content=null) {
    return '<div class="video-container">'.$content.'</div>';
}
add_shortcode('video', 'video_shortcode');
?>
