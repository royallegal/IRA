<?php 
    /* Images */
    $wpimg = has_post_thumbnail()
            ? get_the_post_thumbnail_url()
            : '';
    $cpimg = get_post_custom()['featured_image']
            ? get_post_custom()['featured_image'][0]
            : '';

    $index = $wp_query->current_post +1;
    /* Video */
    $video = get_post_custom()['featured_video'][0];

    /* Audio */
    $audio = get_post_custom()['featured_audio'][0];

    /* Tags */
    $wp_tags = wp_get_post_tags(get_the_ID());
    $taglist = array();
    foreach ($wp_tags as $tag) {
        array_push($taglist, $tag->name);
    }
    $tags = implode(" ", $taglist);

    //random color
    $colors = array("pink", "red", "blue", "teal", "green", "yellow", "orange");
    $randKey = array_rand($colors);
    $color = $colors[$randKey];

    //select double or single based on index
    $index = $wp_query->current_post +1;
    $article_class = (in_array($index, array(1,3,8,10,15,17,22,24,29,31))) ? "double" :"single";

    if($video){
        include(locate_template('snippets/feed/posts/video.php'));
    }else if($wpimg){
        include(locate_template('snippets/feed/posts/featured-image.php'));
    }else if($audio){
        include(locate_template('snippets/feed/posts/audio.php'));
    }else{
        include(locate_template('snippets/feed/posts/text-only.php'));
    }
?>
