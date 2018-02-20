<?php 
  /* Images */
  $wpimg = has_post_thumbnail()
          ? get_the_post_thumbnail_url()
          : '';
  $cpimg = get_post_custom()['featured_image']
          ? get_post_custom()['featured_image'][0]
          : '';

  /* Video */
  $video = get_post_custom()['featured_video'][0];

  /* Tags */
  $wp_tags = wp_get_post_tags(get_the_ID());
  $taglist = array();
  foreach ($wp_tags as $tag) {
      array_push($taglist, $tag->name);
  }
  $tags = implode(" ", $taglist);

  $colors = array("pink", "red", "blue", "teal", "green", "yellow");
  $randKey = array_rand($colors);
  $color = $colors[$randKey];
?>
<article tags="<?= $tags ?>" cats="<?= get_the_category()[0]->slug ?>" itemscope itemtype="http://schema.org/BlogPosting">
    <div class="image-wrapper">
        <?php if($video){ ?>
            <a class="play-button modal-trigger"  href="#videoModal-<?=get_the_ID()?>" data-article-id="<?=get_the_ID()?>">
                <i class="material-icons">play_circle_outline</i>
            </a>
        <?php } ?>
        <?php if (has_post_thumbnail()) { ?>
            <?php echo the_post_thumbnail('full', array('class'=>'responsive-img', 'itemprop' => 'image' )); ?>
        <?php } ?>
        <?php if(get_the_ID() === 1961) { ?>
            <div class="carousel carousel-slider" data-indicators="true">
                <a class="carousel-item" href="#one!"><img src="http://via.placeholder.com/350x150"></a>
                <a class="carousel-item" href="#two!"><img src="http://via.placeholder.com/350x150"></a>
                <a class="carousel-item" href="#three!"><img src="http://via.placeholder.com/350x150"></a>
                <a class="carousel-item" href="#four!"><img src="http://via.placeholder.com/350x150"></a>
            </div>
        <?php } ?> 
    </div>

    <div class="p-1 title <?=has_post_thumbnail() ? "" : " mix"?>">
        <?=the_category()?>
        <div class="mt-1"><small itemprop="datePublished"><?=the_date("F j, Y")?></small></div>
        <h4 itemprop="name headline"><a href="<?php the_permalink();?>" title="<?php the_title();?>" itemprop="url">
            <?php the_title(); ?>
        </a></h4>
        <div class="line <?=$color." mix"?>"></div>
    </div>

    <!-- excerpt -->
    <div class="p-h-1 excerpt">
        <?php rlswp_excerpt('rls_text_excerpt'); ?>
    </div>

    <!-- the video modal-->
    <?php if ($video) { ?>
    <div id="videoModal-<?=get_the_ID()?>" class="modal" data-video-src="<?=$video?>">
        <div class="modal-content">
            <div class="embed-container">
                <iframe width="560" height="315" src="" frameborder="0" allowfullscreen></iframe>
            </div>   
        </div>
    </div>
    <?php } ?>

</article>