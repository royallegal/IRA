<article class="<?=$article_class?> image post" tags="<?= $tags ?>" cats="<?= get_the_category()[0]->slug ?>" itemscope itemtype="http://schema.org/BlogPosting">

    <div class="background">
        <?php if (has_post_thumbnail()) { ?>
            <?php echo the_post_thumbnail('full', array('class'=>'responsive-img', 'itemprop' => 'image' )); ?>
        <?php } ?>
        <div class="half bottom <?=$color?> trans-70"></div>
    </div>

    <div class="white-text foregroud p-2">
        <?=the_category()?>
        <h4 class="mt-1 uppercase" itemprop="name headline">
            <a class="white-text" href="<?php the_permalink();?>" title="<?php the_title();?>" itemprop="url">
                <?php the_title(); ?>
            </a>
        </h4>
        <div class="meta-group border-top white-text">
            <div class="meta-item">
                <i class="material-icons">remove_red_eye</i>
                <span>300</span>
            </div>
            <div class="meta-item">
                <i class="material-icons">share</i>
                <span>300</span>
            </div>
            <div class="meta-item">
                <i class="material-icons">mode_comment</i>
                <span>300</span>
            </div>
        </div>
    </div>
</article>
