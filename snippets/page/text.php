<?php
    $style = get_sub_field('style');
    $color = get_sub_field('color');
    $color_variant = get_sub_field('color_variant');
    $text = get_sub_field('text');

    $mask_classes = $color.' '.$color_variant; 

// Load the text variation
include(locate_template('snippets/text/'.get_sub_field('variation').'.php'));
?>
