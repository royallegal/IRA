<?php
// Loads hero sub components and styles
if (have_rows('hero')) {
    while (have_rows('hero')) {
        the_row();

        // ---- CTA ---- //
        // STYLES
        /* We have three primary styles and some secondary, conditional styles:
         * 1. Floating
         *    - left
         *    - right
         *    - center
         * 2. Full Height
         *    - left
         *    - right
         * 3. Mask */
        $style = get_sub_field('style');

        // BACKGROUNDS
        $background = get_sub_field('background');
        $alignment = get_sub_field('alignement');
        $children = get_sub_field('children');
        $color = get_sub_field('color');
        $image = get_sub_field('background_image');
        /* $alt = get_sub_field('alt_tag');  NEED ALT TAG*/
        $variant = get_sub_field('color_variant');
        $title = get_sub_field('title');
        $subtitle = get_sub_field('subtitle');
        $description = get_sub_field('description');
    }
}

// Load the hero variation
include(locate_template('snippets/hero/'.get_sub_field('variation').'.php'));
?>
