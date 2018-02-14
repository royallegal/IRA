<?php
/* ---- WIDGET AREAS ---- */
if (function_exists('register_sidebar')) {
    // Top Widgets
    register_sidebar(array(
        'name'          => 'Before Content',
        'description'   => 'These widgets are always visible and will appear below hero images / videos but above the body text.',
        'id'            => 'top-widgets',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4>',
        'after_title'   => '</h4>',
    ));
    // Bottom Widgets
    register_sidebar(array(
        'name'          => 'After Content',
        'description'   => 'These widgets are always visible and will appear below the article content but above the comments area.',
        'id'            => 'bottom-widgets',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4>',
        'after_title'   => '</h4>',
    ));

    // Sidebar Widgets
    register_sidebar(array(
        'name'          => 'Sidebar',
        'description'   => 'Widgets in this area will only be shown on the sidebar in desktop views and under the post content in mobile views.',
        'id'            => 'sidebar-widgets',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4>',
        'after_title'   => '</h4>',
    ));
    // Mobile Widgets
    register_sidebar(array(
        'name'          => 'Mobile Only',
        'description'   => 'Widgets in this area will only be displayed in mobile views.',
        'id'            => 'mobile-widgets',
        'before_widget' => '<div id="%1$s" class="widget %2$s">',
        'after_widget'  => '</div>',
        'before_title'  => '<h4>',
        'after_title'   => '</h4>',
    ));
}




add_filter('wp_generate_tag_cloud_data', 'my_tag_cloud_data', 10, 1);
function my_tag_cloud_data($tags_data) {
    foreach ($tags_data as $key=>$tag) {
        $tags_data[$key]['class'].=' chip';
    }
    return $tags_data;
}
?>
