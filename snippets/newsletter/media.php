<div class="panel <?php if( $style == 'inline' ) { echo 'container'; }  ?> <?= $mask_classes;?>">
    <div class="split">
        <div class="container">
            <div class="row">
                <div class="col s5">
                <?php if( $media == 'image' ) { 
                       echo '<img src="' . $image . '" alt="">';
                    }
                     if( $media == 'video' ) { 
                        echo $video;
                     }  ?>
                </div>
                <div class="col s6 offset-s1">  
                    <?php
                        include(locate_template('snippets/newsletter/content.php'));
                    ?> 
                </div>
            </div>
        </div>
    </div>
</div>