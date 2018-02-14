<?php
// ---- TABLE OF CONTENTS ---- //
// 1. Excerpts
// 2. Related Posts 


// ---- EXCERPTS ---- //
// Remove <p> tags from excerpts
remove_filter('the_excerpt', 'wpautop');
// Remove <p> tags in manual exerpts
add_filter('rlswp_excerpt', 'shortcode_unautop');

// Text Only Excerpts
// rls_text_excerpt('rlswp_index')
function rls_text_excerpt($length) {
    return 25;
}
// Media & Text Excerpts
// rls_media_excerpt('rlswp_index')
function rls_media_excerpt($length) {
    return 25;
}
// Excerpt
function rlswp_excerpt($length_callback = '', $more_callback = '') {
    global $post;

    if (function_exists($length_callback)) {
        add_filter('excerpt_length', $length_callback);
    }
    if (function_exists($more_callback)) {
        add_filter('excerpt_more', $more_callback);
    }

    $output = get_the_excerpt();
    $output = apply_filters('wptexturize', $output);
    $output = apply_filters('convert_chars', $output);
    $output = '<p>'.$output.'</p>';
    echo $output;
}
add_filter('rlswp_excerpt', 'do_shortcode');

// Adds a "View Article" button instead of [...]
function rls_read_more_button($more) {
    global $post;
    return '<div class="center-align read-more"><a class=" gray view-article button" href="'.get_permalink($post->ID).'">'
          .__('Read More', 'rls')
          .'</a></div>';
}
add_filter('excerpt_more', 'rls_read_more_button');


// ---- RELATED POSTS ---- //
function ci_get_related_posts( $post_id, $related_count, $args = array() ) {
    $args = wp_parse_args( (array) $args, array(
	'orderby' => 'rand',
	'return'  => 'query', // Valid values are: 'query' (WP_Query object), 'array' (the arguments array)
    ) );

    $related_args = array(
	'post_type'      => get_post_type( $post_id ),
	'posts_per_page' => $related_count,
	'post_status'    => 'publish',
	'post__not_in'   => array( $post_id ),
	'orderby'        => $args['orderby'],
	'tax_query'      => array()
    );

    $post       = get_post( $post_id );
    $taxonomies = get_object_taxonomies( $post, 'names' );

    foreach ( $taxonomies as $taxonomy ) {
	$terms = get_the_terms( $post_id, $taxonomy );
	if ( empty( $terms ) ) {
	    continue;
	}
	$term_list                   = wp_list_pluck( $terms, 'slug' );
	$related_args['tax_query'][] = array(
	    'taxonomy' => $taxonomy,
	    'field'    => 'slug',
	    'terms'    => $term_list
	);
    }

    if ( count( $related_args['tax_query'] ) > 1 ) {
	$related_args['tax_query']['relation'] = 'OR';
    }

    if ( $args['return'] == 'query' ) {
	return new WP_Query( $related_args );
    } else {
	return $related_args;
    }
}
?>
