<?php
// Loads hero sub components and styles
if (have_rows('hero')) {
    while (have_rows('hero')) {
        the_row();

        // Hero
        $image         = get_sub_field('background_image');
        $color         = get_sub_field('color');
        $color_variant = get_sub_field('color_variant');
        $children      = get_sub_field('children');

        // CTA
        $background    = get_sub_field('background');
        $position      = get_sub_field('position');
        $alignment     = get_sub_field('alignment');
        $style         = get_sub_field('style');
    }
}

// Load the hero variation
include(locate_template('snippets/hero/'.get_sub_field('variation').'.php'));
?>
