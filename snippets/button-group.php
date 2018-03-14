<div class="button-group">
    <?php
    if (have_rows("buttons")) {
        while (have_rows("buttons")) {
            the_row();
            $randId = substr(md5(microtime()),rand(0,26),10);

            // Basic Info
            $title   = get_sub_field('button_label');
            $icon    = get_sub_field('icon');
            $iconPos = get_sub_field('icon_position');

            // Behavior
            if (get_sub_field("behavior") == "link") {
                $href    = get_sub_field("link")["url"];
                $target  = get_sub_field("link")["target"];
            }
            elseif (get_sub_field("behavior") == "modal") {
                $modal   = get_sub_field('modal');
                $href    = "#videoModal".$randId;
                $video   = get_sub_field('video');
                $iframe  = get_sub_field('iframe');
                // Add autoplay settings based on provider
                if (strpos($iframe, "youtube")) {
                    $iframe  = preg_replace('/src="(.+?)"/', 'src="$1&enablejsapi=1"', $iframe);
                }
                elseif (strpos($iframe, "vimeo")) {
                    /* $iframe  = preg_replace('/src="(.+?)"/', 'src="$1&enablejsapi=1"', $iframe);*/
                }
            }

            // Styling
            $styles  = get_sub_field("styles");
            $styles  = $styles ? implode(" ", get_sub_field("styles")) : '';
            $size    = get_sub_field("size");
            $color   = get_sub_field("color");
            $variant = get_sub_field("color_variant");
            $hover   = get_sub_field("hover");
            $popup   = $modal ? 'modal-trigger' : '';
            $classes = $styles.' '.$size.' '.$color.' '.$variant.' '.$hover.' '.$popup;
    ?>

    <a href="<?= $href; ?>" class="<?= $classes; ?> button" target="<?= $target; ?>">
        <i class="material-icons <?= $iconPos; ?>"><?= $icon; ?></i>
        <?php echo $title; ?>
    </a>

    <?php if ($modal) { ?>
        <div id="videoModal<?=$randId?>" class="modal">
            <?php if ($iframe) : ?>
                <div class="video-container">
                    <?php echo $iframe; ?>
                </div>
            <?php
            elseif ($video) : echo $video;
            endif;
            ?>
        </div>
    <?php } ?>

    <?php } } ?>
</div>
