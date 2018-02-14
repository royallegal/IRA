<?php
get_header();

if (have_posts()) : the_post();

$image = get_featured_image()[0];
$video = get_featured_video()[0];
?>
    <main id="article" class="with-sidebar">

        <?php if (!empty($image)) {?>
            <!-- Parallax Image -->
            <div class="featured-image vh-40 valign-wrapper center-align parallax-container">
                <div class="parallax"><img src="<?= $image ?>"></div>
            </div>
        <?php } ?>

        <div class="container">
            <!-- Mobile Widgets -->
            <?php if (wp_is_mobile() && is_active_sidebar('mobile-widgets')) { ?>
                <div id="mobile-widgets">
                    <?php dynamic_sidebar('mobile-widgets'); ?>
                </div>
            <?php } ?>

            <!-- Top Widgets -->
            <?php if (is_active_sidebar('top-widgets')) { ?>
                <div id="top-widgets">
                    <?php dynamic_sidebar('top-widgets'); ?>
                </div>
            <?php } ?>

            <!-- Post -->
            <div class="content">
                <!-- Articles -->
                <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

                    <!-- Dynamic Title -->
                    <h1><?php the_title(); ?></h1>

                    <?php if (!empty($video)) {?>
                        <!-- Video Embed -->
                        <div class="video-container responsive-video">
                            <?php
                            if (strpos($video, "embed")) : ?>
                                <iframe src="<?= $video; ?>"
                                        frameborder="0"
                                        allow="autoplay; encrypted-media"
                                        allowfullscreen>
                                </iframe>
                            <?php else : ?>
                                <iframe src="'https://www.youtube.com/embed/'<?= substr($video, strpos($video, "=")+1); ?>"
                                        frameborder="0"
                                        allow="autoplay; encrypted-media"
                                        allowfullscreen>
                                </iframe>
                            <?php endif;?>
                        </div>
                    <?php } ?>

                    <?php the_content(); ?>

                    <!-- Bottom Widgets -->
                    <?php if (is_active_sidebar('bottom-widgets')) { ?>
                        <div id="bottom-widgets">
                            <?php dynamic_sidebar('bottom-widgets'); ?>
                        </div>
                    <?php } ?>
                </article>

                <!-- Sidebar -->
                <?php get_sidebar(); ?>
            </div>
        </div>

        <!-- Promotion -->
        <div class="promotion-image valign-wrapper center-align vh-30 parallax-container" style="margin:25px 0;">
            <div class="parallax">
                <img alt="Don't let a legal disaster destroy your life" src="https://royallegalsolutions.com/wp-content/uploads/2018/01/iStock-545347988.jpg"/>
            </div>
            <div class="purple mix trans-70 mask"></div>
            <div class="container t-depth-2 white-text center title-group">
                <h2 class="title">Can you survive a legal disaster?</h2>
                <h4 class="sub-title">Cover your assets with an asset protection plan from Royal Legal Solutions.</h4>
            </div>
            <div class="button-group">
                <a class="raised white ghost button" href="/product/consultation/">Get a Consultation</a>
            </div>
        </div>

        <!-- Related Posts -->
        <div class="panel">
            <?php
            $related = ci_get_related_posts(get_the_ID(), 3);
            remove_filter('excerpt_more', 'rls_read_more_button');

            if ($related->have_posts()):
                       $colors = array("pink", "red", "blue", "teal", "green", "yellow", "orange");
            ?>
                <div class="related-posts container row">
                    <p class="center-align h2">Looking for More?</p>
                    <?php
                    while ($related->have_posts()):
                    $related->the_post();
                    $randKey = array_rand($colors);
                    $color = $colors[$randKey];
                    unset($colors[$randKey]);
                    ?>
                        <div class="col s12 m4">
                            <div class="card">
                                <div class="card-content">
                                    <a href="<?= the_permalink() ?>"><?php the_title(); ?></a>
                                    <p>Testing stuff....</p>
                                </div>
                                <div class="card-action">
                                    <a class="<?= $color ?> mix center-align button" href="<?= the_permalink() ?>">Read More</a>
                                </div>
                            </div>
                        </div>
                    <?php endwhile; ?>
                </div>
            <?php
            endif;
            wp_reset_postdata();
            ?>
        </div>

        <!-- Comments -->
        <div class="container">
            <?php comments_open() ? comments_template() : ''; ?>
        </div>
    </main>


<?php else : ?>
    <?php get_template_part('404'); ?>
<?php endif; ?>


<?php get_footer(); ?>
