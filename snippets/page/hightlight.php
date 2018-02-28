<?php 
    $icon = get_sub_field('icon');
    $colSize = $icon ? "m10" : "m12";

    $fullWidth = get_sub_field('full_width');
?>

<?php 
//Capturing the content
ob_start(); ?>
<div class="row">
    <?php if ($icon): ?>
    <div class="col m2 center-align pv-5">
        <i class="material-icons" style="font-size:70px "><?=$icon?></i>
    </div>
    <?php endif; ?>
    <div class="col <?=$colSize?>">
        <?php the_sub_field('text') ?>
    </div>
</div>    
<?php
$content = ob_get_contents();
ob_end_clean();?>



<?php if (!$fullWidth): ?>
<div class="container">
  <div class="row">
    <div class="col m12">
        <div class="<?php the_sub_field('background_color') ?> mix">
            <?=$content?>  
        </div>
    </div>
  </div>
</div>
<? else: ?>
<div class="<?php the_sub_field('background_color') ?> mix">
    <div class="container">
        <?=$content?>     
    </div>    
</div>
<? endif ?>