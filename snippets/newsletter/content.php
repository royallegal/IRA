<?php 
  $has_file = ($downloads_file && $file_to_download);
  $file_attr = $has_file ? "data-file='".$file_to_download."'" : "";
?>
<div class="title-group <?= $alignment ?>">    
    <p class="h1 title"><?= $title ?></p>
    <?=$text?>
</div>
<form action="" data-newsletter-form <?=$file_attr?>>
  <div data-form-success class="<?= $alignment ?> hidden">
    <h3><?=$thank_you?></h3>
    <?php if($has_file) { ?>
      <p class="<?= $alignment ?>">You can now download your file</p>
      <a href="<?=$file_to_download?>" target="_blank" class="button <?= $submit_color ?>">Download file</a>
    <?php } ?>
  </div>

  <div data-form-content>
      <div class="input-field">
          <input id="email" type="email" class="validate" name="email" required>
          <label for="email">Email</label>
      </div>
      <button type="submit" class="button right <?= $submit_color ?>">Submit</button>
      <div class="clearfix"></div>
  </div>
</form>