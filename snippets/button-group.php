<div class="button-group">
    <?php
    if (have_rows("buttons")) {
        while (have_rows("buttons")) {
            the_row();
            $randId = substr(md5(microtime()),rand(0,26),10); 
            /* $style   = get_sub_field("style");*/
            $type    = get_sub_field("type");
            $size    = get_sub_field("size");
            $color   = get_sub_field("color");
            $variant = get_sub_field("color_variant");
            $hover   = get_sub_field("hover");
            $modal   = get_sub_field('modal');
            $button  = get_sub_field('button_label');
            $icon    = get_sub_field('icon');
            $iconPos = get_sub_field('icon_position');
            
            $classes = $type.' '.$size.' '.$color.' '.$variant.' '.$hover;
            
            $url     = get_sub_field("link")["url"];
            $title   = get_sub_field("link")["title"];
            $target   = get_sub_field("link")["target"];
            
            $video   = get_sub_field('video');
            $video = preg_replace('/src="(.+?)"/', 'src="$1&enablejsapi=1"', $video);
        ?>
        <?php  if( $modal && in_array('Modal', $modal) ): ?> 
            <a href="#videoModal<?=$randId?>" class="<?= $classes; ?> button modal-trigger">
                <?php if( $iconPos == 'left' ): ?>
                    <i class="material-icons mr-1"><?= $icon; ?></i>
                <?php endif; ?>
                    <?= $button; ?>    
                <?php if( $iconPos == 'right' ): ?>
                    <i class="material-icons ml-1"><?= $icon; ?></i>
                <?php endif; ?>
            </a>
            <div id="videoModal<?=$randId?>" hero-video-modal class="modal video">
                <div class="video-container">
                    <?= $video ?>
                </div>
            </div>
        <?php else: ?>
            <a href="<?= $url; ?>" class="<?= $classes; ?> button" target="<?= $target; ?>">
                <?php if( $iconPos == 'left' ): ?>
                    <i class="material-icons mr-1"><?= $icon; ?></i>
                <?php endif; ?>
                    <?= $title; ?>
                <?php if( $iconPos == 'right' ): ?>
                    <i class="material-icons ml-1"><?= $icon; ?></i>
                <?php endif; ?>
            </a>
        <?php endif; ?>

    <?php
    }
    }
    ?>
</div>
