function royal_login() {
    $('#login-modal').modal();

    // Chooses which of the three modal forms to display
    $('#login-modal a').click(function(e) {
        e.preventDefault();
        var target = $(this).attr('href');
        royal_showForm(target);
    });

    // Submits AJAX call & loader, closes on completion
    $('#login-modal input[type=submit]').click(function(e) {
        var form = $(this).find('form');
        var action = $(form).attr('action');

        if (action == "login") {
            royal_ajaxLogin();
        }
        else if (action == "register") {
            royal_ajaxRegister();
        }
        else if (action == "reset") {
            royal_ajaxReset();
        }
        else {
            // error
            // use "classes/email.php" to send an error notification to swedy13@gmail.com
            // only send email if an error occurs on the production site
            // if (is_wpe()) { ...send password }
        }
    });
}


function royal_showLoginField(target) {
    $('#login-modal .row').addClass('hide');
    $(target).removeClass('hide');
}


function royal_ajaxLogin(form) {
    // If (login validation == "successful") {
    //     AJAX login call here...
    // }
}




$("#loginCall, .btn-loginform").click(function () {
    //alert('working...');
    $('#register-hd').hide();
    $('#register-popup').hide();
    $('#forgot-hd').hide();
    $('#forgot_password-popup').hide();

    $('#login-hd').fadeIn();
    $('#login-popup').fadeIn();
});

$("#signupCall, #signupCall2").click(function () {
    $('#login-hd').hide();
    $('#login-popup').hide();
    $('#forgot-hd').hide();
    $('#forgot_password-popup').hide();

    $('#register-hd').fadeIn();
    $('#register-popup').fadeIn();
});

$("#forgotCall").click(function () {
    $('#register-hd').hide();
    $('#register-popup').hide();
    $('#login-hd').hide();
    $('#login-popup').hide();

    $('#forgot-hd').fadeIn();
    $('#forgot_password-popup').fadeIn();
});

// Perform AJAX login/register on form submit
$('form#login-popup, form#register-popup').on('submit', function (e) {
    if (!$(this).valid()) return false;
    $('p.status', this).show().text(ajax_auth_object.loadingmessage);
    action = 'ajaxlogin';
    username =  $('form#login-popup #username').val();
    password = $('form#login-popup #password').val();
    email = '';
    security = $('form#login-popup #security').val();
    if ($(this).attr('id') == 'register-popup') {
        action = 'ajaxregister';
        username = $('#signonname').val();
        password = $('#signonpassword').val();
        email = $('#email').val();
        security = $('#signonsecurity').val();  
    }  
    ctrl = $(this);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: ajax_auth_object.ajaxurl,
        data: {
            'action': action,
            'username': username,
            'password': password,
            'email': email,
            'security': security
        },
        success: function (data) {
            $('p.status', ctrl).text(data.message);
            if (data.loggedin == true) {
                document.location.href = ajax_auth_object.redirecturl;
            }
        }
    });
    e.preventDefault();
});

// Perform AJAX forget password on form submit
$('form#forgot_password-popup').on('submit', function(e){
    if (!$(this).valid()) return false;
    $('p.status', this).show().text(ajax_auth_object.loadingmessage);
    ctrl = $(this);
    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: ajax_auth_object.ajaxurl,
        data: { 
            'action': 'ajaxforgotpassword', 
            'user_login': $('#user_login').val(), 
            'security': $('#forgotsecurity').val(), 
        },
        success: function(data){                    
            $('p.status',ctrl).text(data.message);              
        }
    });
    e.preventDefault();
    return false;
});

// Client side form validation
if (jQuery("#register-popup").length) 
    jQuery("#register-popup").validate(
        {rules:{
            password2:{ equalTo:'#signonpassword' 
            }   
        }}
    );
else if (jQuery("#login-popup").length) 
    jQuery("#login-popup").validate();
if(jQuery('#forgot_password-popup').length)
    jQuery('#forgot_password-popup').validate();



jQuery(document).ready(function($) {
    // Perform AJAX login on form submit
    $('form#login').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php',
            data: { 
                'action': 'ajax_login',
                'username': $('form#login #username').val(), 
                'password': $('form#login #password').val(), 
                'security': $('form#login #security').val() },
            success: function(data){
                $('form#login p.status').text(data.message);
                $('#loginModal').trigger('calculateHeights');
                if (data.loggedin == true){
                    location.reload();
                }
            }
        });
    });
    $('form#passwordLost').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php', 
            data: { 
                'action': 'lost_pass',
                'user_login': $('form#passwordReset #username').val(),
                'security': $('form#passwordReset #security').val()
            },
            success: function(data){
                $('#loginModal').trigger('calculateHeights');
                if (data.loggedin == true){
                    location.reload();
                }
            }
        });
    });
    $('form#passwordReset').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php', 
            data: { 
				action: 	'reset_pass',
				pass1:		$('form#passwordReset #pass1').val(),
				pass2:		$('form#passwordReset #pass2').val(),
				user_key:	$('form#passwordReset #user_key').val(),
				user_login:	$('form#passwordReset #user_login').val(),
                'security': $('form#passwordReset #security').val()
            },
            success: function(data){
                $('#loginModal').trigger('calculateHeights');
                if (data.loggedin == true){
                    location.reload();
                }
            }
        });
    });

}); 