<div class="hero-container valign-wrapper center-align">
    <div class="hero" 
      <?php if (get_sub_field('background_image')): ?> 
        style="background-image:url(<?=get_sub_field('background_image')?>);"
      <?php endif; ?>
    ></div>
    <div class="<?php the_sub_field('background_color') ?> mix trans-80 mask"></div>
    <div class="white-text t-depth-2 title-group">
        <?php if (get_sub_field('title')): ?>
            <p class="h1"><?= the_sub_field('title')?></p>
        <?php endif; ?>
        <?php if (get_sub_field('subtitle')): ?>
            <p class="h2"><?= the_sub_field('subtitle')?></p>
        <?php endif; ?>
    </div>
</div>