<?php $mask_classes = $color.' '.$color_variant; ?> 
<div class="panel <?php  if (in_array("inline", get_sub_field('style_panel'))) { echo 'container'; }  ?> <?php echo $mask_classes;?>">
    <div class="newsletter">
            <div class="container">
                <div class="title-group <?php the_sub_field('alignment')?>">    
                    <p class="h1 title <?php the_sub_field('title_color')?>"><?php the_sub_field('title')?></p> 
                </div>
                <form action="" >
                    <input name="" type="email" value="" placeholder="Email"/>
                    <button type="submit" class="button right <?php the_sub_field('submit_color')?>">Submit</button>
                    <div class="clearfix"></div>
                </form>
        </div>
    </div>
</div>