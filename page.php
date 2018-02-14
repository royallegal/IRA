<?php get_header(); ?>


<main id="page">
    <div class="container">
	<?php if (have_posts()): while (have_posts()) : the_post(); ?>
	    <article id="post-<?php the_ID();?>" <?php post_class();?>>
		<?php the_content(); ?>
	    </article>
	<?php endwhile; ?>

	<?php else: ?>
	<h1><?php _e( 'Sorry, nothing to display.', 'html5blank' ); ?></h1>

	<?php endif; ?>
    </div>
</main>


<?php get_footer(); ?>
