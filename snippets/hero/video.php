<?php $video_options = get_sub_field('video_options'); ?>

    <div class="hero-container ">

        <?php
            $hasBgVideo = ( $video_options && in_array('background', $video_options) );
            if( $hasBgVideo ): ?>
                <div class="video mask flex center v-center z-index-1">
                    <video width="320" height="240" autoplay muted loop class="mask">
                        <source src="<?php the_sub_field('video_background'); ?>" type="video/mp4">
                    </video>
                </div>
        <?php endif; ?>  


        <?php $container_style = ($image) ? "background-image:url('".$image."')" : "";?>
        <div class="hero z-index-1 <?= $alignment ?> " style="<?= $container_style; ?>" >
            <?php
                $opacity = $hasBgVideo ? "trans-70" : "";
                $mask_classes = $color.' '.$colorVariant.' '.$opacity;
            ?>
            <div class="mask <?= $mask_classes ?>"> </div>
                <?php 
                if (have_rows('hero')) {
                    while (have_rows('hero')) { the_row();
                        if ($children) {  ?>
                    <div class="<?= $style.' '.$background;?> cta-group">
                        <div>
                        <?php 
                        // ---- TITLE GROUP ---- //
                        if (in_array("title", $children)) {
                            include(locate_template('snippets/title-group.php'));
                        }

                        // ---- BUTTON GROUP ---- //
                        if (in_array("button", $children)) {
                            include(locate_template('snippets/button-group.php'));
                        }

                        // ---- FORMS ---- //
                        if (in_array("form", $children)) {
                        }
                        ?>
                        </div>
                    </div>
                <?php 
                }
                }
                }
                ?>
        </div>

        <?php if( $video_options && in_array('interactive', $video_options) ): ?>
            <div class="video mask flex center v-center pv-3 z-index-1">
                <?php the_sub_field('video'); ?>
            </div>
        <?php endif; ?>  
   
</div>