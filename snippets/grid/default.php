<?php 
    $columns = get_sub_field('columns');
    $size = count($columns);
    $classes = array (
        "2" => "s12 m6 l6",
        "3" => "s12 m4 l4",
        "4" => "s12 m3 l3",
    )
?>
<div class="panel <?php if( $style == 'inline' ) { echo 'container'; }  ?> <?= $mask_classes;?>">
    <div class="grid">
        <div class="container">
            <div class="row">
                <?php if( have_rows('columns') ): while( have_rows('columns') ): the_row();
                    $text = get_sub_field('text');
                    $image = get_sub_field('image');
                    $video = get_sub_field('video');
                ?>
                    <div class="col <?= $classes[$size]?>">
                        <?php if( $text ) {
                            echo $text;
                        }
                        if( $image ) {
                            echo '<img src="' . $image . '" alt="">';
                        }
                        if( $video ) {
                           echo $video;
                        }  ?>
                    </div>
                <?php endwhile; endif; ?>
            </div>
        </div>
    </div>
</div>


