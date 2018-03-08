
<div class="caption flex v-center center trans-0">
    <!-- @title-group -->
    <?php if( $children && in_array('title', $children) ): ?>
        <div class="white-text t-depth-2 title-group ">
            <?php if ($title): ?>
                <h1 class="h1"><?= $title ?></h1>
            <?php endif; ?>
            <?php if ($subtitle): ?>
                <h2 class="h2"> <?= $subtitle ?> </h2>
            <?php endif; ?>
            <?php if ($description): ?>
                <?= $description ?>
            <?php endif; ?>
        </div>
    <?php endif; ?>
    <!-- @button-group -->
    <?php if( $children && in_array('button', $children) ): ?>
        <div class="button-group">
            <?php foreach ($buttons as &$button): $link = $button["link"] ?>
                <a href="<?= $link["url"]; ?>" target="<?=$link["target"]?>" class="button <?= $button["type"] ?> <?= $button["color"]  ?> <?= $button["size"]  ?> <?= $button["color_variant"] ?> <?= $button["hover"] ?>">
                    <?= $link['title']; ?>
                </a>
            <?php endforeach; ?>
        </div>
    <?php endif; ?>
</div>