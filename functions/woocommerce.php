<?php
// ---- GLOBAL ---- //
// Declare WooCommerce Support
function wc_support() {
    add_theme_support('woocommerce');
}
add_action('after_setup_theme', 'wc_support');

// Remove default styles
add_filter('woocommerce_enqueue_styles', '__return_empty_array');


// ---- CUSTOM FUNCTIONS ---- //
function get_products_by_category($category) {
    $products = new WP_Query(array(
        'post_type'      => 'product',
        'posts_per_page' => -1,
        'product_cat'    => $category
    ));
    return $products->posts;
}


// ---- PRODUCT PAGES ---- //
// Remove Breadcrumbs
remove_action('woocommerce_before_main_content','woocommerce_breadcrumb', 20, 0);
// Remove Pictures
remove_action('woocommerce_before_single_product_summary', 'woocommerce_show_product_images', 20);
// Remove customer facing CHECKOUT
remove_action( 'woocommerce_after_shop_loop_item', 'woocommerce_template_loop_add_to_cart');
remove_action( 'woocommerce_single_product_summary', 'woocommerce_template_single_add_to_cart');


// ---- CHECKOUT ---- //
// Skip cart page
add_filter('woocommerce_add_to_cart_redirect', 'themeprefix_add_to_cart_redirect');
function themeprefix_add_to_cart_redirect() {
    global $woocommerce;
    $checkout_url = wc_get_checkout_url();
    return $checkout_url;
}

// Remove billing address
function custom_override_checkout_fields($fields) {
    /* unset($fields['billing']['billing_first_name']);
     * unset($fields['billing']['billing_last_name']);*/
    unset($fields['billing']['billing_company']);
    unset($fields['billing']['billing_address_1']);
    unset($fields['billing']['billing_address_2']);
    unset($fields['billing']['billing_city']);
    unset($fields['billing']['billing_postcode']);
    unset($fields['billing']['billing_country']);
    unset($fields['billing']['billing_state']);
    unset($fields['billing']['billing_phone']);
    /* unset($fields['billing']['billing_email']);*/
    unset($fields['order']['order_comments']);
    return $fields;
}
add_filter('woocommerce_checkout_fields', 'custom_override_checkout_fields');
?>
