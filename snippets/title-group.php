<?php
$title        = get_sub_field('title');
$subtitle     = get_sub_field('subtitle');
$description  = get_sub_field('description');
if ($image || $background == "background-dark") {
    $text_classes = "white-text t-depth-1-half";
}
?>

<div class="<?php echo $text_classes; ?> title-group">
    <?php if ($title) { ?>
        <p class="h1 title">
            <?php echo $title ?>
        </p>
    <?php } ?>

    <?php if ($subtitle) { ?>
        <p class="h2 subtitle">
            <?php echo $subtitle ?>
        </p>
    <?php } ?>

    <?php if ($description) {
        echo $description;
    } ?>
</div>
