
<div class="panel <?php if( $style == 'inline' ) { echo 'container'; }  ?> <?php echo $mask_classes;?>">
    <div class="newsletter">
        <div class="container">
            <div class="title-group <?php echo $alignment ?>">    
                <p class="h1 title"><?php echo $title ?></p> 
            </div>
            <form action="" >
                <div class="input-field">
                    <input id="email" type="email" class="validate">
                    <label for="email">Email</label>
                </div>
                <button type="submit" class="button right <?php echo $submit_color ?>">Submit</button>
                <div class="clearfix"></div>
            </form>
        </div>
    </div>
</div>