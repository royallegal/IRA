<?php
global $woocommerce;
$items  = $woocommerce->cart->get_cart_contents_count();
$user   = wp_get_current_user();
$first  = $user->user_firstname;
$logout = esc_url(wc_logout_url(wc_get_page_permalink('myaccount')));
?>

<ul class="side-nav" id="sidebar-nav">
    <li><a href="/how-it-works">How It Works</a></li>
    <li><a href="/pricing">Pricing</a></li>
    <li><a href="/get-started">Get Started</a></li>
    <li><a href="/contact-us">Contact Us</a></li>

    <li><a href="/blog">Blog</a></li>

    <?php if (current_user_can('edit')) { ?>
        <li><a href="/quick-cart">
            Cart (<span id="cart-count"><?php echo $items; ?></span>)
        </a></li>
    <?php } ?>

    <li id="sidebar-user-account" class="baseline flex">
        <?php if (is_user_logged_in()) { ?>
            <a id="username" href="/my-account">
                <i class="material-icons left">person</i>
                <?php
                if (!empty($first)) {
                    echo "Hi ".$first;
                } else {
                    echo "My Account";
                }
                ?>
            </a>
            <form id="logout" action="logout" method="post">
                <?php wp_nonce_field( 'ajax-logout-nonce', 'logoutSecurity' ); ?>
                <button type="submit" name="submit">(logout)</button>
            </form> 
        <?php } else { ?>
            <a id="login" class="modal-trigger" href="#loginModal">Log In</a>
        <?php } ?>
    </li>
</ul>
