
<h3>Helpers</h3>
<div class="row">
    <div class="col s12">
        <ul class="tabs">
            <li class="tab"><a href="#helpers-display">Display Helpers</a></li>
            <li class="tab"><a href="#helpers-opacity">Opacity Helpers</a></li>
            <li class="tab"><a href="#helpers-spacing">Spacing Helpers</a></li>
        </ul>
    </div>
</div>

<div id="helpers-display">
    <p>Display helpers allow you to change the display mode of your containers quickly. </p>
    
    <?php 
        $flexOptions = array(
            "",
            "center",
            "spaced",
            "split",
            "v-center",
            "baseline",
            "start",
            "end"
        )
    ?>
    <?php foreach($flexOptions as $flex): ?>
        <code>.flex.<?=$flex?></code>
        <div class="flex <?=$flex?> light purple mb-3">
            <div class="blue pv-3 ph-1 m-1">Content</div>
            <div class="blue p-1 m-1">Content</div>
            <div class="blue p-1 m-1">Content</div>
        </div>
    <?php endforeach ?>
</div>

<div id="helpers-opacity">
    <?php 
        $opacities = array(
            "trans-10",
            "trans-20",
            "trans-25",
            "trans-30",
            "trans-33",
            "trans-40",
            "trans-50",
            "trans-60",
            "trans-67",
            "trans-70",
            "trans-75",
            "trans-80",
            "trans-90",
            "trans-100"
        )
    ?>

    <div class="flex">
        <?php foreach($opacities as $opacity): ?>
            <div class="swatch red <?=$opacity?>">
                <?=$opacity?>
            </div>
        <?php endforeach; ?>
    </div>
</div>

<div id="helpers-spacing">
        <p>Many times a component has different spacings around it depending on where it is located. Spacers help you add paddings and margins of different sizes conveniently, without having to create a new class for every case.</p>
        <p>
        You have access to classes like <code>mt-2</code> which stands to margin-top: 20px, so same goes for something like <code>pb-3</code> padding-bottom: 30px. -There is also <code>mv-2</code> which stands for vertical margin or margin-top: 20px; margin-bottom:20px; and <code>ph-3</code> would be padding horizontal 30px;
        </p>
        <p>
        This classes use the convention type_position_negative_number_target
        </p>

        <table>
            <thead>
                <tr>
                    <th>Member</th>
                    <th>Options</th>
                    <th>Example classes</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>type</td>
                    <td><code>m</code> margin, <code>p</code> padding</td>
                    <td><code>.m2</code>, <code>.p3</code></td>
                </tr>
                <tr>
                    <td>position</td>
                    <td><code>t</code> top, <code>b</code> bottom, <code>l</code> left, <code>r</code> right, <code>v</code> vertical, <code>h</code> horizontal</td>
                    <td><code>.mt-2</code> <code>.pv-6</code> <code>.mb-3</code></td>
                </tr>
                <tr>
                    <td>negative</td>
                    <td><code>n</code></td>
                    <td><code>.mt-n-2</code> only available for margins</td>
                </tr>
                <tr>
                    <td>number</td>
                    <td>0 to 20</td>
                    <td><code>.mh-0</code> <code>.ph-15</code></td>
                </tr>
                <tr>
                    <td>target</td>
                    <td><code>xs</code>, <code>sm</code>, <code>md</code>, <code>lg</code></td>
                    <td><code>.mt-2-xs</code> <code>.mt-4-sm</code></td>
                </tr>
            </tbody>
        </table>
</div>