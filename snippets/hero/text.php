<?php $mask_classes = $color.' '.$color_variant; ?> 
<div class="panel <?php  if (in_array("inline", get_sub_field('style_panel'))) { echo 'container'; }  ?> <?php echo $mask_classes;?>">
    <div class="text">
            <div class="container">
                <div class="title-group <?php the_sub_field('title_color')?> <?php the_sub_field('alignment')?>">    
                    <?php the_sub_field('text')?>
                </div>
            
        </div>
    </div>
</div>