<?php
/* Template Name: Renewal */
get_header();
$sku = "1900";
$productid = wc_get_product_id_by_sku($sku);
$args = array(
    'post_type'     => 'product_variation',
    'post_status'   => array('private', 'publish'),
    'numberposts'   => -1,
    'orderby'       => 'menu_order',
    'order'         => 'asc',
    'post_parent'   => $productid
);

$variations = get_posts($args);
foreach ($variations as $variation) {
    $variation_ID = $variation->ID;
    $product_variation = new WC_Product_Variation($variation_ID);
    $variation_image = $product_variation->get_image();
    $variation_price = $product_variation->get_price_html();
    break;
}
?>


<main id="renewal">
    <div class="center-align blue gradient hero panel row">
        <div class="col s12">
            <div class="white-text title-group">
                <h1 class="title">Family Office Renewal</h1>
                <p class="subtitle">Freeing you to find the next great deal for only $49/month</p>
            </div>
            <div class="button-group">
                <a class="snow ghost btn-flat" href="/checkout/?add-to-cart=<?php echo $productid; ?>&variation_id=<?php echo $variation_ID; ?>">Renew Now</a>
            </div>
        </div>
    </div>


    <div class="container panel">
        <h2 class="center-align">We know you're busy</h2>
        <p>You should be free to focus on what matters most in life rather than investing precious time and attention to muddle through corporate complaince and on-going legal questions. We can help!</p>

        <div class="row">
            <div class="col s12 m6">
                <ul class="naked collection">
                    <li class="collection-item avatar">
                        <img alt="Use Royal Legal Solutions as your stautorily required registered agent" src="https://royallegal.staging.wpengine.com/wp-content/uploads/2018/01/real-estate-home-house-rent-property-building-deal-done-303bc1d82f5c1307-128x128.png" class="circle"/>
                        <span class="title">Registered Agent</span>
                        <p>We'll be your lawfully required agent</p>
                        <p>Normal Cost: <span class="chip">$100/year</span></p>
                    </li>
                    <li class="collection-item avatar">
                        <img alt="Regular corporate compliance reviews" src="https://royallegal.staging.wpengine.com/wp-content/uploads/2018/01/navigate-find-pin-location-search-gps-home-magnify-37c1c9a15f23cbbc-128x128.png" class="circle"/>
                        <span class="title">On-Going Updates</span>
                        <p>We ensure you are always in compliance</p>
                        <p>Normal Cost: <span class="chip">$250/year</span></p>
                    </li>
                    <li class="collection-item avatar">
                        <img alt="Stay anonymous with a nominee trustee" src="https://royallegal.staging.wpengine.com/wp-content/uploads/2018/01/handover-key-give-hand-property-deal-agreement-3be67a0e60e5d3e0-128x128.png" class="circle"/>
                        <span class="title">Nominee Trustee Service</span>
                        <p>We maintain the anonymity of your assets</p>
                    </li>
                </ul>
            </div>

            <div class="col s12 m6">
                <ul class="naked collection">
                    <li class="collection-item avatar">
                        <img alt="We file tax for your company annually" src="https://royallegal.staging.wpengine.com/wp-content/uploads/2018/01/payment-dollar-currency-note-finance-money-cash-3f1298e0193dccf7-128x128.png" class="circle"/>
                        <span class="title">Franchise Tax Filing</span>
                        <p>We handle your year end franchise taxes</p>
                        <p>Normal Cost: <span class="chip">$500/year</span></p>
                    </li>
                    <li class="collection-item avatar">
                        <img alt="Bi-annual contract optimization" src="https://royallegal.staging.wpengine.com/wp-content/uploads/2018/01/paper-document-property-rate-increase-decrease-analysis-growth-37700c5318b0a1ba-128x128.png" class="circle"/>
                        <span class="title">Twice Yearly Review</span>
                        <p>We routinely optimize your holdings</p>
                        <p>Normal Cost: <span class="chip">$300/year</span></p>
                    </li>
                    <li class="collection-item avatar">
                        <img alt="Get a local Texas business address" src="https://royallegal.staging.wpengine.com/wp-content/uploads/2018/01/post-curier-mail-message-letter-home-estate-house-3f98ddfdf63362b1-128x128.png" class="circle"/>
                        <span class="title">Business Address</span>
                        <p>We act as your in-state office</p>
                    </li>
                </ul>
            </div>
        </div>

        <div class="center-align">
            <div class="top divider"></div>
            <p>Save dozens of hours and hundreds of dollars with a low cost subscription to the Family Office plan.</p>
            <a class="btn-flat" href="/checkout/?add-to-cart=<?php echo $productid; ?>&variation_id=<?php echo $variation_ID; ?>">Get Started for only $49</a>
        </div>
    </div>
</main>


<?php get_footer(); ?>
