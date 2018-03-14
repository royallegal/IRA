<?php
// Adds the snippet of the modal to the footer hook
if (!function_exists('login_popup_modal')) {
    add_action('wp_footer', 'login_popup_modal');
    function login_popup_modal(){
        get_template_part("snippets/nav/login-modal");
    }
}


/**
 * AJAX LOGIN
 */
add_action('wp_ajax_nopriv_ajax_login', 'ajax_login_callback');
if (!function_exists('ajax_login_callback')){
    function ajax_login_callback() {
        // First check the nonce, if it fails the function will break
        check_ajax_referer('ajax-login-nonce', 'loginSecurity');

        // Nonce is checked, get the POST data and sign user on
        $info = array();
	$info['user_login'] = sanitize_text_field($_POST['username']);;
        $info['user_password'] = $_POST['password'];
	$info['remember'] = isset($_POST['remember']);

        $user_signon = wp_signon($info, true);
        if (is_wp_error($user_signon)){
            echo json_encode(array('loggedin'=>false, 'message'=>__('Wrong username or password.')));
        } else {
            echo json_encode(array('loggedin'=>true, 'message'=>__('Login successful, redirecting...')));
        }

        die();
    }
} 

/**
 * AJAX RECOVER PASSWORD REQUEST
 */
add_action('wp_ajax_nopriv_lost_pass', 'lost_pass_callback');
add_action('wp_ajax_lost_pass', 'lost_pass_callback');
function lost_pass_callback() {

    global $wpdb, $wp_hasher;
    
    check_ajax_referer('ajax-lostpass-nonce', 'lostSecurity');
    $user_login = sanitize_text_field($_POST['user_login']);
    
    $errors = new WP_Error();

    if (empty($user_login)) {
	$errors->add('empty_username', __('Enter a username or e-mail address.'));
    } else if (strpos($user_login, '@')) {
	$user_data = get_user_by('email', trim($user_login));
	if (empty($user_data))
	    $errors->add('invalid_email', __('There is no user registered with that email address.'));
    } else {
	$login = trim($user_login);
	$user_data = get_user_by('login', $login);
    }
    
    do_action('lostpassword_post', $errors);
    
    if ($errors->get_error_code()){
        echo json_encode(array("message" => $errors->get_error_message($errors->get_error_code())));
        die();
    }
    if (!$user_data) {
	echo json_encode(array("message" => $errors->get_error_message($errors->get_error_code())));
	die();
    }

    // Redefining user_login ensures we return the right case in the email.
    $user_login = $user_data->user_login;
    $user_email = $user_data->user_email;
    $key = get_password_reset_key($user_data);

    if (is_wp_error($key)) {
	return $key;
    }

    $message = __('Someone requested that the password be reset for the following account:') . "\r\n\r\n";
    $message .= network_home_url('/') . "\r\n\r\n";
    $message .= sprintf(__('Username: %s'), $user_login) . "\r\n\r\n";
    $message .= __('If this was a mistake, just ignore this email and nothing will happen.') . "\r\n\r\n";
    $message .= __('To reset your password, visit the following address:') . "\r\n\r\n";
    //$message .= network_site_url("wp-login.php?action=rp&key=$key&login=" . rawurlencode($user_login), 'login') . "\r\n";

    // replace PAGE_ID with reset page ID
    $message .= network_home_url('/'). "?action=rp&key=$key&login=" . rawurlencode($user_login) . "\r\n";

    if (is_multisite())
	$blogname = $GLOBALS['current_site']->site_name;
    else
	/*
	 * The blogname option is escaped with esc_html on the way into the database
	 * in sanitize_option we want to reverse this for the plain text arena of emails.
	 */
	$blogname = wp_specialchars_decode(get_option('blogname'), ENT_QUOTES);

    $title = sprintf(__('[%s] Password Reset'), $blogname);

    $title = apply_filters('retrieve_password_title', $title, $user_login, $user_data);
    $message = apply_filters('retrieve_password_message', $message, $key, $user_login, $user_data);

    if (wp_mail($user_email, wp_specialchars_decode($title), $message))
	$errors->add('confirm', __('Check your e-mail for the confirmation link.'), 'message');
    else
	$errors->add('could_not_sent', __('The e-mail could not be sent.') . "<br />\n" . __('Possible reason: your host may have disabled the mail() function.'), 'message');


    // display error message
    if ($errors->get_error_code())
	echo json_encode(array("message" => $errors->get_error_message($errors->get_error_code())));

    // return proper result
    die();
}


/**
 * AJAX TO RESET PASSWORD
 */

add_action('wp_ajax_nopriv_reset_pass', 'reset_pass_callback');
add_action('wp_ajax_reset_pass', 'reset_pass_callback');
function reset_pass_callback() {

    $errors = new WP_Error();
    $nonce = $_POST['nonce'];
    check_ajax_referer('ajax-reset-nonce', 'resetSecurity');

    $pass1 	= $_POST['pass1'];
    $pass2 	= $_POST['pass2'];
    $key 	= $_POST['user_key'];
    $login 	= $_POST['user_login'];

    $user = check_password_reset_key($key, $login);

    // check to see if user added some string
    if (empty($pass1) || empty($pass2))
	$errors->add('password_required', __('Password is required field'));

    // is pass1 and pass2 match?
    if (isset($pass1) && $pass1 != $pass2)
	$errors->add('password_reset_mismatch', __('The passwords do not match.'));

    /**
     * Fires before the password reset procedure is validated.
     *
     * @since 3.5.0
     *
     * @param object           $errors WP Error object.
     * @param WP_User|WP_Error $user   WP_User object if the login and reset key match. WP_Error object otherwise.
     */
    do_action('validate_password_reset', $errors, $user);

    if ((! $errors->get_error_code()) && isset($pass1) && !empty($pass1)) {
	reset_password($user, $pass1);

	$errors->add('password_reset', __('Your password has been reset.'));
    }

    // display error message
    if ($errors->get_error_code())
	echo json_encode(array("message" => $errors->get_error_message($errors->get_error_code())));
    
    // return proper result
    die();
}

/**
 * AJAX RECOVER PASSWORD REQUEST
 */
add_action('wp_ajax_ajax_logout', 'ajax_logout_callback');
if (!function_exists('ajax_logout_callback')){
    function ajax_logout_callback() {
        check_ajax_referer('ajax-logout-nonce', 'logoutSecurity');
        wp_logout();
        ob_clean();
        echo json_encode(array('loggedout'=>true, 'message'=>__('Logged out')));
        die();
    }
}
