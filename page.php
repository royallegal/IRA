<?php get_header(); ?>


<main id="page">
    <?php
    the_content();

    if (have_rows('content')) {
        while (have_rows('content')) {
            the_row();
            get_template_part("snippets/page/".get_row_layout());
        }
    }
    ?>
</main>


<?php get_footer(); ?>
