<?php
    $style = get_sub_field('style');
    $alignment = get_sub_field('alignment');
    $color = get_sub_field('color');
    $color_variant = get_sub_field('color_variant');
    $title = get_sub_field('title');
    $submit_color = get_sub_field('submit_color');
    $media = get_sub_field('media');

    $mask_classes = $color.' '.$color_variant; 
// Load the hero variation
include(locate_template('snippets/newsletter/'.get_sub_field('variation').'.php'));
?>
