<?php
    $variation = get_sub_field('variation');
    if( have_rows('hero') ): while( have_rows('hero') ): the_row(); 
        $style = get_sub_field('style');
        $background = get_sub_field('background');
        $alignement = get_sub_field('alignement');
        $children = get_sub_field('children');
        $color = get_sub_field('color');
        $image = get_sub_field('background_image');
        $colorVariant = get_sub_field('color_variant');
        $title = get_sub_field('title');
        $subtitle = get_sub_field('subtitle');
        $description = get_sub_field('description');
        $buttons = get_sub_field('buttons');
    endwhile; endif;
?>

<?php if( $variation == 'default' ): ?>
    <div class="hero-container ">
        <div class="hero white-text z-index-1 flex wrap  <?= $style ?> <?= $alignement ?> <?= $background ?> " 
            <?php if ($image): ?>style="background-image:url('<?= $image; ?>');"<?php endif; ?> >
            <div class="mask <?= $color; ?> <?= $colorVariant ?>  <?= $image ? "trans-40" : "" ?>"> </div>
            <div class="mask flex v-center z-index-1 <?= $alignement ?> ">
                <?php include(locate_template('snippets/page/hero-content.php'));?>
            </div>
        </div>  
    </div>
<?php endif; ?>

<?php if( $variation == 'parallax' ): ?>
    <div class="parallax-container ">
      <div class="parallax white-text  flex wrap z-index-1 <?=$style ?> <?=$alignement ?> <?=$background ?> ">
        <?php if ($image): ?><img src="<?=$image; ?>" alt=""><?php endif; ?> 
        <div class="mask z-index-1 <?=$color; ?> <?=$colorVariant ?> <?= $image ? "trans-40" : "" ?>"> </div>
        <div class="mask flex v-center z-index-1 <?=$alignement ?>">
            <?php include(locate_template('snippets/page/hero-content.php'));?>
        </div>
      </div>
    </div>
<?php endif; ?>


<?php if( $variation == 'video' ): 
    $video_options = get_sub_field('video_options');
    $hasBgVideo = ( $video_options && in_array('background', $video_options));
     ?>
    <div class="hero-container ">
        <?php if( $hasBgVideo ): ?>
            <div class="video mask flex center v-center z-index-1">
                <video width="320" height="240" autoplay muted loop class="mask">
                    <source src="<?php the_sub_field('video_background'); ?>" type="video/mp4">
                </video>
            </div>
        <?php endif; ?>  
    <div class="hero white-text z-index-1 flex wrap  <?= $style ?> <?= $alignement ?> <?= $background ?> " 
        <?php if ($image): ?>style="background-image:url('<?= $image; ?>');"<?php endif; ?> >
        <div class="mask <?= $color; ?> <?= $colorVariant ?>  <?= $image || $hasBgVideo ? "trans-40" : "" ?>"> </div>
        <div class="mask flex v-center z-index-1 <?= $alignement ?> ">
            <?php include(locate_template('snippets/page/hero-content.php'));?>
        </div>
    </div>  

    <?php if( $video_options && in_array('interactive', $video_options) ): ?>
        <div class="video mask flex center v-center pv-3 z-index-1">
            <?php the_sub_field('video'); ?>
        </div>
    <?php endif; ?>  
    </div>
<?php endif; ?>


<?php if( $variation == 'slider' ): ?>
  <div class="hero-container carousel carousel-slider" data-indicators="true">
    <?php if( have_rows('slider') ): while( have_rows('slider') ): the_row(); 
      $style = get_sub_field('style');
      $background = get_sub_field('background');
      $alignement = get_sub_field('alignement');
      $children = get_sub_field('children');
      $color = get_sub_field('color');
      $image = get_sub_field('background_image');
      $colorVariant = get_sub_field('color_variant');
      $title = get_sub_field('title');
      $subtitle = get_sub_field('subtitle');
      $description = get_sub_field('description');
    ?>
    <div class="carousel-item ">
      <div class="hero white-text z-index-1 flex wrap <?= $style ?> <?= $alignement ?> <?= $background ?> " href="#one!"
        <?php if ($image): ?> style="background-image:url('<?= $image; ?>');"<?php endif; ?> >
        <div class="mask <?= $color; ?> <?= $colorVariant ?>  <?= $image ? "trans-40" : "" ?>"> </div>
        <div class="mask flex v-center <?= $alignement ?>">
            <?php include(locate_template('snippets/page/hero-content.php'));?>
        </div>
      </div>
    </div>
    <?php endwhile; endif; ?>
  </div>
<?php endif; ?>





