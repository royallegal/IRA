<div class="hero-container flex <?= $position ?> ">
    <div class="hero "
         style="<?= ($image) ? "background-image:url('".$image."')" : ""; ?>" >
        <?php
        $opacity = $image ? "trans-70" : "";
        $mask_classes = $color.' '.$color_variant.' '.$opacity;
        ?>
        <div class="mask <?= $mask_classes ?>"> </div>
    </div>

    <?php 
    if (have_rows('hero')) {
        while (have_rows('hero')) {
            the_row();
            if ($children) {
    ?>
        <div class="<?= $style.' '.$background.' '.$alignment;?> cta-group">
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
    <?php 
    }
    }
    }
    ?>
</div>
