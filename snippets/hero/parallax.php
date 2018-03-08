<div class="flex <?php echo $alignment; ?> parallax-container ">
    <div class="parallax">
        <?php if ($image) { ?>
            <img alt="" src="<?php echo $image; ?>"/>
        <?php } ?>

        <?php
        $opacity = $image ? "trans-70" : "";
        $mask_classes = $color.' '.$variant.' '.$opacity;
        ?>
        <div class="<?php echo $mask_classes;?> mask"></div>
    </div>

    <?php
    if (have_rows('hero')) {
        while (have_rows('hero')) {
            the_row();
            if ($children) {  ?>
        <div class="<?php echo $style.' '.$background;?> cta-group">
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
