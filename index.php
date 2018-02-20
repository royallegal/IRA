<?php
get_header();

if($_GET["offset"]){
    query_posts('posts_per_page='.$_GET["offset"]);
}
?>

<div  id="feed"  class="row mt-6">
    <button class="pink default button" data-toggle-sidebar>Toggle sidebar</button>
    <div class="col m9 s12">
        <main class="masonry">
            <!-- <div class="controls">
                <?php get_template_part('snippets/feed/search'); ?>
                <?php get_template_part('snippets/feed/category-dropdown'); ?>
                </div>

                <blockquote id="no-results" class="pink hide">
                There were no results for <span class="target"></span>.
                </blockquote> -->

            <?php get_template_part('loop'); ?>
        </main>
        <div class="text-center">
            <button class="pink default button" data-load-more-posts data-offset="<?= $wp_query->post_count ?>" data-posts-per-page="8">Load more</button>
        </div>
    </div>
    <div class="col m3 s12 feed-sidebar">
        <?php get_template_part('sidebar'); ?>
    </div>
</div>

<?php get_footer();
