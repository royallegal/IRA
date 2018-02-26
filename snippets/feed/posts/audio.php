<article class="<?=$article_class?> audio post" tags="<?= $tags ?>" cats="<?= get_the_category()[0]->slug ?>" itemscope itemtype="http://schema.org/BlogPosting">

  <div class="background">
    <div class="color top  <?=$color?>"></div>
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
    <div class="audio">
      <audio controls>
        <source src="<?=$audio?>" type="audio/mpeg">
        Your browser does not support the audio tag.
      </audio>
    </div>

  </div>

</article>