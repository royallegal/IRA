<?php
/* Template Name: Test */
get_header();

$colors = array('pink', 'red', 'purple', 'blue', 'teal', 'green', 'yellow', 'orange', 'tan', 'brown', 'steel');

foreach ($colors as $color) :
?>

    <div class="valign-wrapper hero-container vh-40 panel <?= $color ?> mix">
        <div class="title-group">
            <h1 class="white-text t-depth-2"><?= $color ?> mix</h1>
        </div>
        <div class="button-group">
            <a class="white ghost raised button" href="">Sample Button</a>
        </div>
    </div>
    <div class="panel"></div>
    <div class="panel"></div>


<?php
endforeach;
get_footer();
?>
