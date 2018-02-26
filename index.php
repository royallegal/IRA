<?php
get_header();

if($_GET["offset"]){
    query_posts('posts_per_page='.$_GET["offset"]);
}
?>

<div id="feed" class="row mt-6">
    <div class="fixed-action-btn">
        <button class="pink default button floating mb-1" data-toggle-sidebar><i class="material-icons">menu</i></button>
        <br>
        <button class="pink default button floating"><i class="material-icons">chat_bubble</i></button>
    </div>   
    <div class="col m12 s12">
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

        <!-- spinner -->
        <div class="text-center mt-3">
            <div data-load-more-spinner data-offset="<?= $wp_query->post_count ?>" data-posts-per-page="12" class="hide preloader-wrapper small active">
                <div class="spinner-layer spinner-red-only">
                    <div class="circle-clipper left">
                        <div class="circle"></div>
                    </div>
                    <div class="gap-patch">
                        <div class="circle"></div>
                    </div>
                    <div class="circle-clipper right">
                        <div class="circle"></div>
                    </div>
                </div>
            </div>
        </div>

    </div> 
    <div class="col m3 s12 feed-sidebar">
        <?php get_template_part('sidebar'); ?>
    </div>
</div>

<?php get_footer();
