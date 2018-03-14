<div class="button-group">
    <?php
    if (have_rows("buttons")) {
        while (have_rows("buttons")) {
            the_row();
            $randId = substr(md5(microtime()),rand(0,26),10);

            // Basic Info
            $title   = get_sub_field("link")["title"];
            $label   = get_sub_field('button_label');
            $text    = ($label) ? $label : $title;
            $icon    = get_sub_field('icon');
            $iconPos = get_sub_field('icon_position');

            // Behaviour
            $url     = get_sub_field("link")["url"];
            $modal   = get_sub_field('modal');
            $target  = get_sub_field("link")["target"];
            $video   = get_sub_field('video');
            $video   = preg_replace('/src="(.+?)"/', 'src="$1&enablejsapi=1"', $video);

            $href = ($modal) ? "#videoModal".$randId : $url;

            // Styling
            $styles  = implode(" ", get_sub_field("styles"));
            $size    = get_sub_field("size");
            $color   = get_sub_field("color");
            $variant = get_sub_field("color_variant");
            $hover   = get_sub_field("hover");
            $popup   = $modal ? 'modal-trigger' : '';
            $classes = $styles.' '.$size.' '.$color.' '.$variant.' '.$hover.' '.$popup;
    ?>

        <a href="<?= $href; ?>" class="<?= $classes; ?> button" target="<?= $target; ?>">
            <i class="material-icons <?= $iconPos; ?>"><?= $icon; ?></i>
            <?php echo $text ?>
        </a>

        <?php if ($modal) : ?>
            <div id="videoModal<?=$randId?>" hero-video-modal class="modal video">
                <div class="video-container">
                    <?= $video ?>
                </div>
            </div>
        <?php endif; ?>

    <?php } } ?>
</div>
