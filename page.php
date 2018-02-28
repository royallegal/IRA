<?php get_header(); ?>


<main id="page">
	<?php the_content() ?>
	<?php 
	if(have_rows('content')){
		while(have_rows('content')) {
			the_row();
			if(get_row_layout() == "hero") {
				get_template_part( 'snippets/page/hero' );
			}
			if(get_row_layout() == "text_block") {
				get_template_part( 'snippets/page/text-block' );
			}
			if(get_row_layout() == "numbered_cards") {
				get_template_part( 'snippets/page/numbered-cards' );
			}
			if(get_row_layout() == "hightlight") {
				get_template_part( 'snippets/page/hightlight' );
			}
			if(get_row_layout() == "parallax") {
				get_template_part( 'snippets/page/parallax' );
			}
			if(get_row_layout() == "testimonial") {
				get_template_part( 'snippets/page/testimonial' );
			}
		}
	}
	?>
</main>


<?php get_footer(); ?>
