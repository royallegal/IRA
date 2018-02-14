<a class='dropdown-button' href='#' data-activates='category-dropdown' data-beloworigin="true">Topics</a>
<ul id='category-dropdown' class='dropdown-content'>
    <li><a href="/blog">All Topics</a></li>
    <li class="divider"></li>
    <?php
    $categories = get_categories();
    foreach ($categories as $category) {
        if (strtolower($category->name) != 'uncategorized') {
            echo '<li><a href="/category/'.$category->slug.'">'.
                 $category->name.
                 '</a></li>';
        }
    }
    ?>
</ul>
