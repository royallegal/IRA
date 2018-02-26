<?php
if (have_posts()) {
    while (have_posts()) {
        the_post();
        if (get_post_type() != 'product') {
            get_template_part( 'snippets/feed/article-card' );
        }
    } 
} ?>

