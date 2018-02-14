<?php
get_header();
?>


<main id="feed" class="container">
    <div class="controls">
        <?php get_template_part('snippets/feed/search'); ?>
        <?php get_template_part('snippets/feed/category-dropdown'); ?>
    </div>

    <div class="content">
        <blockquote id="no-results" class="pink hide">
            Sorry, we don't have content for <span class="target"></span> yet.
        </blockquote>
        <?php get_template_part('loop'); ?>
    </div>
</main>


<?php get_footer();
