<article class="<?=$article_class?> video post" tags="<?= $tags ?>" cats="<?= get_the_category()[0]->slug ?>" itemscope itemtype="http://schema.org/BlogPosting">

    <div class="background">
        <?php if (has_post_thumbnail()) { ?>
            <?php echo the_post_thumbnail('full', array('class'=>'responsive-img', 'itemprop' => 'image' )); ?>
        <?php } ?>
        <div class="half top <?=$color?> trans-70"></div>

    </div>


    <a class="play-button modal-trigger white-text"  href="#videoModal-<?=get_the_ID()?>" data-article-id="<?=get_the_ID()?>">
        <i class="material-icons">play_circle_filled</i>
    </a>
    

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

    <!-- the video modal-->
    <div id="videoModal-<?=get_the_ID()?>" class="modal" data-video-src="<?=$video?>">
        <div class="modal-content">
            <div class="embed-container">
                <iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
            </div>   
        </div>
    </div>

</article>
