<?php 
$colors = array(
  'pink',
  'red',
  'purple',
  'blue',
  'teal',
  'green',
  'yellow',
  'orange',
  'tan',
  'brown',
  'steel'
);

$shades= array (
  'light',
  'base',
  'dark'
);

$variants= array (
  'accent',
  'gradient',
  'mix'                 
);

?>

<h3>Colors</h3>
<div id="colors" class="section scrollspy">
    <h6>Shades</h6>
    <div class="center-align">
        <?php foreach($colors as $color): ?>
        <div class="flex">
            <div class="title swatch">
                <?=$color?>
            </div>
            <?php foreach($shades as $shade): ?>
            <div class="<?=$color." ".$shade." swatch"?>">
                <?=$shade?>
            </div>
            <?php endforeach; ?>
        </div>
        <?php endforeach; ?>
    </div>

    <h6>Variants</h6>
    <div class="center-align">
        <?php foreach($colors as $color): ?>
        <div class="flex">
            <div class="title swatch">
                <?=$color?>
            </div>
            <?php foreach($variants as $variant): ?>
            <div class="<?=$color." ".$variant." swatch"?>">
                <?=$variant?>
            </div>
            <?php endforeach; ?>
        </div>
        <?php endforeach; ?>
    </div>
</div>