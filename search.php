<?php
get_header();
?>


<main id="feed" class="container">
    <h1 class="center-align">
        <?php echo 'Search Results <span class="lowercase"> for "'.$wp_query->query['s'].'"</span>'; ?>
    </h1>

    <div class="controls">
        <?php get_template_part('snippets/feed/search'); ?>
        <?php get_template_part('snippets/feed/category-dropdown'); ?>
    </div>

    <div class="content">
        <blockquote id="no-results" class="pink hide">
            None of the search results contain the term <span class="target"></span>. Try searching <a href="/blog">the blog</a>.
        </blockquote>
        <?php get_template_part('loop'); ?>
    </div>

    <?php get_template_part('pagination'); ?>
</main>


<?php get_footer();
