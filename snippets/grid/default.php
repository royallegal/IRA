<?php 
    $columns = get_sub_field('columns');
    $size = count($columns);
    $classes = array (
        "2" => "s12 m6 l6",
        "3" => "s12 m4 l4", 
        "4" => "s12 m3 l3",
    )
?>
<div class="panel <?php if( $style == 'inline' ) { echo 'container'; }  ?> <?php echo $mask_classes;?>">
    <div class="grid">
        <div class="container">
            <div class="row">
                <?php if( have_rows('columns') ): while( have_rows('columns') ): the_row(); 
                    $text = get_sub_field('text');
                    $image = get_sub_field('image');
                    $video = get_sub_field('video');
                ?>
                    <div class="col <?= $classes[$size]?>">
                        <?php if( $text ): ?>
                            <?php echo $text ?>
                        <?php endif; ?>
                        <?php if( $image ): ?>
                            <img src="<?php echo $image ?>" alt="">
                        <?php endif; ?>
                        <?php if( $video ): ?>
                            <?php echo $video ?>
                        <?php endif; ?>
                    </div>
                <?php endwhile; endif; ?>
            </div>
        </div>
    </div>
</div>


