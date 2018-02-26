<?php
// ---- INSPECTOR ---- //
// Change function name to scripts / styles based on what you want to see
/* function wpa54064_inspect_styles() {
 *     global $wp_styles;
 *     foreach( $wp_styles->queue as $handle ) :
 *     echo $handle . ' | ';
 *     endforeach;
 * }
 * add_action( 'wp_print_styles', 'wpa54064_inspect_styles' );*/


// ---- IMPORT SCRIPTS & STYLES ---- //
// Global Scripts
function rls_header_scripts() {
    if ($GLOBALS['pagenow'] != 'wp-login.php' && !is_admin()) {
        // Conditionizr
        /* wp_register_script('conditionizr', get_template_directory_uri() . '/js/lib/conditionizr-4.3.0.min.js', array(), '4.3.0');
         * wp_enqueue_script('conditionizr');*/
        // Modernizr
        /* wp_register_script('modernizr', get_template_directory_uri() . '/js/lib/modernizr-2.7.1.min.js', array(), '2.7.1');
         * wp_enqueue_script('modernizr');*/
        // Materialize
        wp_register_script('materialize', get_template_directory_uri() . '/scripts/lib/materialize/bin/materialize.min.js', array('jquery'), '');
        wp_enqueue_script('materialize');
        // Custom
        wp_register_script('rlsscripts', get_template_directory_uri() . '/scripts/scripts.js', array('jquery'), '1.0.0'); 
        wp_enqueue_script('rlsscripts');
    }
}

// Conditional Scripts
function rls_conditional_scripts() {
    // Vue config for documentation page
    if (basename(get_permalink()) == 'documentation') {
        wp_enqueue_script( 'vue-documentation', get_template_directory_uri() . '/documentation/dist/js/bundle.js', [], false, true );
    }
    if (basename(get_permalink()) == 'blog') {
        wp_enqueue_script( 'masonry', 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js', [], false, true );
    }
}


// Global Styles
function rls_styles() {
    // Material Icons
    wp_enqueue_style('google-fonts', 'https://fonts.googleapis.com/icon?family=Material+Icons', false); 
    // Materialize
    wp_register_style('index', get_template_directory_uri() . '/styles/index.css', array(), '1.0', 'all');
    wp_enqueue_style('index');
    // Custom
    /* wp_register_style('custom', get_template_directory_uri() . '/styles/custom.css', array(), '1.0', 'all');
     * wp_enqueue_style('custom');*/
}

// Conditional Styles
function rls_conditional_styles() {
    /* if (!is_wpe()) {
     *     // Custom
     *     wp_register_style('css', get_template_directory_uri() . '/style.css', array(), '1.0', 'all');
     *     wp_enqueue_style('css');
     * }*/
    if (is_home() == 1 || is_category() == 1) {
        wp_enqueue_script( 'masonry', 'https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js', [], false, true );
        wp_enqueue_script( 'imagesLoaded', 'https://unpkg.com/imagesloaded@4/imagesloaded.pkgd.min.js', [], false, true );
    }
}


// ---- REMOVE SCRIPTS & STYLES ---- //
function remove_assets() {
    wp_deregister_style('wcs-checkout');
    wp_dequeue_style('wcs-checkout');
    wp_deregister_style('wc-memberships-frontend');
    wp_dequeue_style('wc-memberships-frontend');
    wp_deregister_style('wcs-view-subscription');
    wp_dequeue_style('wcs-view-subscription');
    wp_deregister_style('select2');
    wp_dequeue_style('select2');
    wp_deregister_style('opc_styles');
    wp_dequeue_style('opc_styles');
    wp_deregister_style('yoast-seo-adminbar');
    wp_dequeue_style('yoast-seo-adminbar');
    wp_deregister_style('affwp-forms');
    wp_dequeue_style('affwp-forms');
    wp_deregister_style('stripe_paymentfonts');
    wp_dequeue_style('stripe_paymentfonts');
    wp_deregister_style('wc-bundle-style');
    wp_dequeue_style('wc-bundle-style');

    if (!is_page('documentation')) {
        wp_dequeue_style('prism');
        wp_deregister_style('prism');
    }
}
add_action('wp_enqueue_scripts', 'remove_assets', 9999);
add_action('wp_head', 'remove_assets', 9999);
?>
