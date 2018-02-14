<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
    <head>
	<meta charset="<?php bloginfo('charset'); ?>">
	<title><?php wp_title(''); ?><?php if(wp_title('', false))?></title>

	<link href="//www.google-analytics.com" rel="dns-prefetch">
        <link href="<?php echo get_template_directory_uri(); ?>/wp-content/uploads/2017/07/cropped-RLS-Favicon-1.png"
              rel="shortcut icon">
        <link href="<?php echo get_template_directory_uri(); ?>/wp-content/uploads/2017/07/cropped-RLS-Favicon-1.png"
              rel="apple-touch-icon-precomposed">

	<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<?php wp_head(); ?>
    </head>


    <body <?php body_class(); ?>>

        <!-- Google Tags -->
        <?php if (function_exists('gtm4wp_the_gtm_tag')) {
            gtm4wp_the_gtm_tag();
        } ?>

        <header>
            <!-- Nav -->
            <?php get_template_part('snippets/nav/full'); ?>
            <?php get_template_part('snippets/nav/mobile'); ?>
        </header>
