<?php
    $style = get_sub_field('style');
    $alignment = get_sub_field('alignment');
    $color = get_sub_field('color');
    $color_variant = get_sub_field('color_variant');
    $title = get_sub_field('title');
    $text = get_sub_field('text');
    $submit_color = get_sub_field('submit_color');
    $media = get_sub_field('media');
    $video = get_sub_field('video');
    $image = get_sub_field('image');

    $mask_classes = $color.' '.$color_variant;

// Load the newsletter variation
include(locate_template('snippets/newsletter/'.get_sub_field('variation').'.php'));
?>
