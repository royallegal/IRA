<?php
global $woocommerce;
$items  = $woocommerce->cart->get_cart_contents_count();
?>

<div class="navbar-fixed">
    <nav>
        <div class="nav-wrapper">
            <a class="logo-group" href="/">
                <div id="rls-logo"></div>
                <div id="rls-title">IRA Business Trusts</div>
            </a>
            <a id="mobile-menu"
               href="#"
               data-activates="sidebar-nav"
               class="button-collapse">
                <i class="material-icons">menu</i>
            </a>

            <!-- Left Menu -->
            <ul id="nav-left" class="left hide-on-med-and-down">
                <li><a href="/professionals">Professionals</a></li>
                <li><a href="/how-it-works">How It Works</a></li>
                <li><a href="/pricing">Pricing</a></li>
                <li>
                    <a href="/about-us">About <i class="small material-icons right">arrow_drop_down</i></a>
                </li>
                <li><a href="/contact-us">Contact Us</a></li>
                <li><a href="tel:5127573994">1.512.757.3994</a></li>
            </ul>

            <!-- Right Menu -->
            <?php
            $user   = wp_get_current_user();
            $first  = $user->user_firstname;
            $logout = esc_url(wc_logout_url(wc_get_page_permalink('myaccount')));
            ?>
            <ul id="nav-right" class="right hide-on-med-and-down">
                <?php if (current_user_can('edit_posts')) { ?>
                    <li>
                        <a href="/quick-cart">
                        <i class="material-icons left">shopping_cart</i>
                        Cart (<span id="cart-count"><?php echo $items; ?></span>)
                        </a>
                    </li>
                <?php } ?>
                <li id="user-account">
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
        </div>
    </nav>
</div>
