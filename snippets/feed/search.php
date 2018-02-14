<?php
/* function SearchFilter($query) {
 *     if ($query->is_search) {
 *         $query->set('post_type', 'post');
 *     }
 *     return $query;
 * }
 * add_filter('pre_get_posts','SearchFilter');
 * 
 * function remove_pages_from_search() {
 *     global $wp_post_types;
 *     $wp_post_types['page']->exclude_from_search = true;
 * }
 * add_action('init', 'remove_pages_from_search');*/

/* $tags = get_tags();
 * $autofill = '';
 * foreach ($tags as $tag) {
 *     $autofill = $autofill.' '.$tag->name;
 * }
 * add this to html #search ==> data-autofill="<?php echo $autofill; ?>"*/
?>

<form class="search" method="get" action="<?php echo home_url(); ?>" role="search">
    <i class="small material-icons">search</i>
    <input id="search" class="search-input autocomplete" type="search" name="s" placeholder="Search" autocomplete="off">
</form>
