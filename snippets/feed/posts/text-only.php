<article class="<?=$article_class?> text post" tags="<?= $tags ?>" cats="<?= get_the_category()[0]->slug ?>" itemscope itemtype="http://schema.org/BlogPosting">
    <div class="foregroud p-2 black-text">
        <?=the_category()?>
        <h4 class="mt-1 black-text uppercase" itemprop="name headline">
            <a href="<?php the_permalink();?>" title="<?php the_title();?>" itemprop="url">
                <?php the_title(); ?>
            </a>
        </h4>
        <div class="excerpt">
            <?php rlswp_excerpt('600', null); ?>
        </div>
        
        <div class="flex inline">

            <div class="meta-group border-top mr-1">
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

            <a href="<?=get_permalink()?>" style="margin-left: auto;" class="blue default button">Read more</a> 

        </div>

    </div>
</article>
