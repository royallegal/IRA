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
        'steel',
        'gray',
        'white',
        'disabled'
    );
    $types = array(
        array(
            "name" => "Types",
            "values" => array (
                'default',
                'raised',
                'ghost',
                'rounded'
            )
        ),
        array(
            "name" => "Colors",
            "values" => array(
                'gradient',
                'mix',
                'to-white',
                'to-blue'
            )
        ),
        array(
            "name" => "Shades",
            "values" => array(
                'light',
                'dark',
                'accent'
            )
        ),
        array(
            "name" => "Size",
            "values" => array(
                'small',
                'default',
                'large'
            )
        )
    )

?>
<h3>Buttons</h3>
<div class="row" id="buttons">
    <div class="col s12">
        <ul class="tabs">
            <?php foreach($types as $type): ?>
            <li class="tab"><a href="#buttons-<?=$type["name"]?>"><?=$type["name"]?></a></li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php foreach($types as $type): ?>
        <div id="buttons-<?=$type["name"]?>" class="col s12">
            <table class="bordered responsive-table">
                <thead>
                <tr>
                    <?php foreach($type["values"] as $value): ?>
                        <th><?=$value?></th>
                    <?php endforeach; ?>
                </tr>
                </thead>
                <tbody>
                <?php foreach($colors as $color): ?>
                    <tr>
                        <?php foreach($type["values"] as $value): ?>
                            <td class="<?= $value."-buttons ".$color."-buttons" ?>">
                            <a class="<?="button ".$color." ".($value != "default" ? $value :  "")?>" href="#">
                                <?php if($type["name"] == "Size"): ?>
                                    <i class="material-icons left">beenhere</i>
                                <?php endif; ?>
                                <?=$value?> <?=$color?> 
                            </a>
                            </td>
                        <?php endforeach; ?>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php endforeach; ?>
  </div>