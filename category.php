<?php
get_header();
?>


<main id="feed" class="container">
    <h1 class="center-align">
        <?php echo $wp_query->queried_object->cat_name; ?>
    </h1>

    <div class="controls">
        <?php get_template_part('snippets/feed/search'); ?>
        <?php get_template_part('snippets/feed/category-dropdown'); ?>
    </div>

    <div class="content">
        <blockquote id="no-results" class="pink hide">
            None of the articles in this category mention <span class="target"></span>. Try searching <a href="/blog">the blog</a>.
        </blockquote>
        <?php get_template_part('loop'); ?>
    </div>
</main>


<?php get_footer();
