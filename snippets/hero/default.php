<div class="hero-container ">
    <?php
        $container_style = ($image) ? "background-image:url('<?= $image; ?>')" : "";
    ?>
    <div class="hero white-text z-index-1 flex wrap <?= $alignment ?> " style="<?= $container_style; ?>" >
        <?php
            $opacity = $image ? "trans-70" : "";
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
</div>
