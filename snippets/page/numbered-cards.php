<div class="<?php the_sub_field('background_color') ?> mix pt-3 pb-6">
    <div class="container">
        <h1 class="center-align mb-5"><?php the_sub_field('title') ?></h1>

        <?php 
          $cards = get_sub_field('cards');
          $num = 1;
          if( $cards ): 
            foreach( $cards as $card ):?>

            <div class="card">
                <div class="row">
                    <div class="col m3">
                        <div class="circled-number black-text mt-4"><?=$num?></div>
                    </div>
                    <div class="col m8 black-text">
                        <?=$card["text"]?>
                    </div>
                </div>
                <hr class="m-0">
                <div class="row">
                    <div class="col m3"> </div>
                    <div class="col m8 black-text">
                        <?=$card["sub_text"]?>
                    </div>
                </div>
            </div>
            
        <?php $num++;endforeach;  endif ?>

    </div>
</div>