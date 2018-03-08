<?php $video_options = get_sub_field('video_options'); ?>
<div class="hero-container ">

    <?php if( $video_options && in_array('background', $video_options) ): ?>
        <div class="video mask flex center v-center z-index-1">
            <video width="320" height="240" autoplay muted loop class="mask">
                <source src="<?php the_sub_field('video_background'); ?>" type="video/mp4">
            </video>
        </div>
    <?php endif; ?>  
    <?php if( have_rows('hero') ): while( have_rows('hero') ): the_row(); 
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
        <div class="hero white-text  flex wrap z-index-1 <?php echo $color; ?> <?php echo $style ?> <?php echo $alignement ?> <?php echo $background ?> <?php echo $colorVariant ?>"  
             <?php if ($image): ?>
             style="background-image:url('<?php echo $image; ?>');"
             <?php endif; ?> >
            <div class="mask flex v-center z-index-1 <?php echo $alignement ?>">
                <div class="caption flex v-center center">
                    <!-- @title-group -->
                    <?php if( $children && in_array('title', $children) ): ?>
                        <div class="white-text t-depth-2 title-group ">
                            <?php if ($title): ?>
                                <h1 class="h1">
                                    <?php echo $title ?>
                                </h1>
                            <?php endif; ?>
                            <?php if ($subtitle): ?>
                                <h2 class="h2">
                                    <?php echo $subtitle ?>
                                </h2>
                            <?php endif; ?>
                            <?php if ($description): ?>
                                <?php echo $description ?>
                            <?php endif; ?>
                        </div>
                    <?php endif; ?>
                    <!-- @button-group -->
                    <?php if( $children && in_array('button', $children) ): ?>
                        <div class="button-group">
                            <?php if( have_rows('buttons') ): while( have_rows('buttons') ): the_row(); 
                            $style = get_sub_field('style');
                            $link = get_sub_field('link');
                            ?>
                                <a href="<?php echo $link['url']; ?>" class="button <?= the_sub_field('type') ?> <?= the_sub_field('color') ?> <?= the_sub_field('size') ?> <?= the_sub_field('color_variant') ?> <?= the_sub_field('hover') ?>"><?php echo $link['title']; ?></a>
                            <?php endwhile; endif; ?>
                        </div>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    <?php endwhile; endif; ?>
    <?php if( $video_options && in_array('interactive', $video_options) ): ?>
        <div class="video mask flex center v-center pv-3 z-index-1">
            <?php the_sub_field('video'); ?>
        </div>
    <?php endif; ?>  
</div>
