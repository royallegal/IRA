<?php
/* Template Name: Contact Us */
get_header();
$image = wp_get_attachment_image_src(get_post_thumbnail_id($post->ID), 'single-post-thumbnail');
?>


<main id="contact" style="background-image:url('<?php echo $image[0];?>');">
    <div class="mask"></div>
    <div class="container row">
        <div class="white-text col m6 s12">
            <h3>Don't risk a lawsuit. Contact our legal experts today!</h3>
            <p>Royal Legal Solutions is here to deliver the asset protection solutions to defend your wealth from potential litigation. Tell us what you want to accomplish and we'll provide the optimal plan for your business needs.</p>
            <address>
                <div>
                    <h4>Royal Legal Solutions</h4>
                    <a href="https://goo.gl/maps/HeEpUQSNuro" target="_blank">2400 East Cesar Chavez Street, Suite #208, Austin, Texas 78702</a>
                </div>
                <p>Phone: 512.757.3994</p>
                <p>Fax: 512.842.9373</p>
            </address>
        </div>

        <form class="col m6 s12">
            <div class="row">
                <div class="input-field col s6">
                    <input id="first" name="first" autocomplete="given-name" type="text" class="validate">
                    <label for="first">First Name</label>
                </div>
                <div class="input-field col s6">
                    <input id="last" name="last" autocomplete="family-name" type="text" class="validate">
                    <label for="last">Last Name</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <input id="phone" name="phone" autocomplete="tel" type="text" class="validate">
                    <label for="phone">Phone</label>
                </div>
            </div>

            <div class="row">
                <div class="input-field col s12">
                    <input id="email" name="email" autocomplete="email" type="email" class="validate">
                    <label for="email">Email</label>
                </div>
            </div>

            <div>
                <div class="input-field col s12">
                    <textarea id="message" class="materialize-textarea"></textarea>
                    <label for="message">How can we help you?</label>
                </div>
            </div>

            <div class="row">
                <div class="col s12">
                    <div class="hide confirm quote"><p></p></div>
                    <button class="btn-flat" type="submit" name="action">
                        Get in Touch
                        <i class="material-icons right">send</i>
                    </button>
                    <div id="submit-status" class="hide">
                        <div class="preloader-wrapper small active"><?php get_template_part('snippets/animations/spinner_multicolor'); ?></div>
                        <p>We're sending your message...</p>
                    </div>
                </div>
            </div>
        </form>
    </div>
</main>


<?php get_footer(); ?>
