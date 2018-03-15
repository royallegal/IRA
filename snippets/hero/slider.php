
    <div class="hero-container carousel carousel-slider" data-indicators="true">
        <?php if( have_rows('slider') ): while( have_rows('slider') ): the_row(); 
        $style = get_sub_field('style');
        $background = get_sub_field('background');
        $alignement = get_sub_field('alignement');
        $children = get_sub_field('children');
        $color = get_sub_field('color');
        $image = get_sub_field('background_image');
        $colorVariant = get_sub_field('color_variant');
        $title = get_sub_field('title');
        $subtitle = get_sub_field('subtitle');
        $description = get_sub_field('description');
        ?>
        <div class="carousel-item ">
            <?php
            $container_style = ($image) ? "background-image:url('".$image."')" : "";
            ?>
            <div class="hero z-index-1 <?= $alignment ?> " style="<?= $container_style; ?>" >
                <?php
                    $opacity = $image ? "trans-70" : "";
                    $mask_classes = $color.' '.$colorVariant.' '.$opacity;
                ?>
                <div class="mask <?= $mask_classes ?>"> </div>
                <?php if ($children) {  ?>
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
                <?php } ?>
            </div>
        </div>
        <?php endwhile; endif; ?>
    </div>
