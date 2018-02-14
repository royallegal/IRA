<?php
global $wp_query;
$pages = rlswp_pagination();

if ($pages) {
    $first_page   = 0;
    $last_page    = sizeof($pages) - 1;
    $current_page = max(1, get_query_var('paged'));

    echo '<ul class="pagination" style="text-align:center; margin:35px 0 0;">';

    foreach ($pages as $i=>$page) {
        preg_match_all('/<a[^>]+href=([\'"])(?<href>.+?)\1[^>]*>/i', $page, $url);
        if ($i == $current_page) {
            $url      = '#';
            $active   = 'active';
        }
        else {
            $url      = $url['href'][0];
            $active   = '';
        }

        if ($i == $first_page || $i == $last_page) {
            $diabled = 'disabled';
        } else { $disabled = ''; }

        if ($i == $first_page) {
            echo '<li class="'.$disabled.'">';
            echo '<a href="'.$url.'"><i class="material-icons">chevron_left</i></a>';
        }
        elseif ($i != $first_page && $i != $last_page) {
            echo '<li class="'.$active.'">';
            echo '<a href="'.$url.'">'.$i.'</a>';
        }
        elseif ($i == $last_page) {
            echo '<li class="'.$disabled.'">';
            echo '<a href="'.$url.'"><i class="material-icons">chevron_right</i></a>';
        }

        echo '</li>';
    }

    echo '</ul>';
}
?>
