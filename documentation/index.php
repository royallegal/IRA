<?php
/* Template Name: Documentation */
get_header();
?>

<main id="documentation" class="mt-6">
    <div class="container wide">
        <?php include(locate_template('documentation/components/cards.php'));?>
        <?php include(locate_template('documentation/components/helpers.php'));?>
        <?php include(locate_template('documentation/components/buttons.php'));?>
        <?php include(locate_template('documentation/components/colors.php'));?>
    </div>
</main>


<?php get_footer(); ?>