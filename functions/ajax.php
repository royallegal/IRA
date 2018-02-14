<?php 

add_action( 'wp_ajax_rls_more_posts', 'rls_more_posts_callback' );
add_action( 'wp_ajax_nopriv_rls_more_posts', 'rls_more_posts_callback' );

if(!function_exists('rls_more_posts_callback')){
    function rls_more_posts_callback() {
        $category = $_POST["category"] ?: null;
        $offset = $_POST["offset"] ?: 0;
        $posts_per_page = $_POST["posts_per_page"] ?: 6;
        $args = array(
            'posts_per_page'	=> $posts_per_page,
            'post_type'		=> 'post',
            'offset' => $offset
        );
        if($category != "all" and $category != null) {
            $args['category_name'] = $category;
        }
        $post_query = new WP_Query($args);
        if($post_query->have_posts() ) {
            while ($post_query->have_posts()) {
                $post_query->the_post();
                get_template_part( 'snippets/feed/article-card' );

                //interlaces ads in posts
                $index = $post_query->current_post +1;
                if ($index % 6 == 0) { 
                    get_template_part( 'snippets/feed/ad' );
                }
            }
        } else {
            status_header( '404' );
            wp_send_json_error('No post found');
        }
        wp_die(); 
    }
}
