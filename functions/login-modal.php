<?php


if( !function_exists( 'login_popup_modal' ) ):
	add_action( 'wp_footer', 'login_popup_modal' );
	function login_popup_modal(){
    	get_template_part("snippets/login-modal/login-modal");
	}
endif;