
<div class="panel <?php if( $style == 'inline' ) { echo 'container'; }  ?> <?= $mask_classes;?>">
    <div class="newsletter">
        <div class="container">
        <?php
            include(locate_template('snippets/newsletter/content.php'));
        ?>
        </div>
    </div>
</div>