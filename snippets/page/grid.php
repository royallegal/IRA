<?php
    $style = get_sub_field('style');
    $color = get_sub_field('color');
    $color_variant = get_sub_field('color_variant');

    $mask_classes = $color.' '.$color_variant;

// Load the grid variation
include(locate_template('snippets/grid/'.get_sub_field('variation').'.php'));
?>
