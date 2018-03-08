<div class="button-group">
    <?php
    if (have_rows("buttons")) {
        while (have_rows("buttons")) {
            the_row();
            /* $style   = get_sub_field("style");*/
            $type    = get_sub_field("type");
            $size    = get_sub_field("size");
            $color   = get_sub_field("color");
            $variant = get_sub_field("color_variant");
            $hover   = get_sub_field("hover");
            $classes = $type.' '.$size.' '.$color.' '.$variant.' '.$hover;

            $url     = get_sub_field("link")["url"];
            $title   = get_sub_field("link")["title"];
    ?>
        <a href="<?php echo $url; ?>" class="<?php echo $classes; ?> button">
            <?php echo $title; ?>
        </a>
    <?php 
    }
    }
    ?>
</div>
