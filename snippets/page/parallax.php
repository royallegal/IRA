
    <div class="parallax-container pv-15">
        <div class="parallax">
            <img src="<?=get_sub_field('background_image')?>" alt="">
            <?php /*get_responsive_image(get_sub_field('background_image'))*/ ?>
        </div>
        <div class="container">
            <div class="white-text title-group">
              <?php  the_sub_field("text")?>
            </div>
        </div>
    </div>