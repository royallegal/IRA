function royal_login() {

    // Materialize Modal
    $('#loginModal').modal({
        inDuration: 200,
        outDuration: 150,
        complete: function() {
            $('#loginModal .login').css({
                zIndex: 1,
                opacity: 1
            });
            $('#loginModal .splash').removeClass('shift');
        }
    });


    // ---- CONTROLS ---- //
    // Transitions to login form
    $('[data-goto-login]').on('click', function() {
        $('#loginModal .splash').removeClass('shift');
    })

    // Transition to password recovery form
    $('[data-goto-lost]').on('click', function() {
        $('#loginModal .splash').addClass('shift');
    })

    // Auto-opens modal if user is coming via a reset link
    if (location.search.includes("action=rp")) {
        $('#loginModal .login').css({
            zIndex: 0,
            opacity: 0
        });

        setTimeout(function() {
            $('#loginModal').modal('open');
        }, 750);
    }
    $('#loginModal .reset #lost-link').click(function() {
        setTimeout(function() {
            $('#loginModal .login').css("z-index", 1).animate({
                opacity: 1
            }, 250);
        }, 350);
    });


    // ---- METHODS ---- //
    // Perform AJAX login on form submit
    $('form#login').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php',
            data: {
                'action': 'ajax_login',
                'username': $('form#login #loginUsername').val(),
                'password': $('form#login #loginPassword').val(),
                'remember': $('form#login #loginRemember').attr("checked"),
                'loginSecurity': $('form#login #loginSecurity').val()
            }
        }).done(function(data) {
            $('form#login .success .message').text(data.message);
            if (data.loggedin == true) {
                location.reload();
            }
        });
    });

    // Perform AJAX login on form submit
    $('form#passwordLost').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php',
            data: {
                'action': 'lost_pass',
                'user_login': $('form#passwordLost #lostUsername').val(),
                'lostSecurity': $('form#passwordLost #lostSecurity').val()
            },
            success: function(data) {
                $('form#passwordLost p.status').text(data.message);
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
                action:         'reset_pass',
                pass1:		$('form#passwordReset #resetPass1').val(),
                pass2:		$('form#passwordReset #resetPass2').val(),
                user_key:	$('form#passwordReset #user_key').val(),
                user_login:	$('form#passwordReset #user_login').val(),
                'resetSecurity': $('form#passwordReset #resetSecurity').val()
            },
            success: function(data){
                $('form#passwordLost p.status').text(data.message);
            }
        });
    });

    // Perform AJAX login on form submit
    $('form#logout').on('submit', function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            dataType: 'json',
            url: '/wp-admin/admin-ajax.php',
            data: {
                'action': 'ajax_logout',
                'logoutSecurity': $('form#logout #logoutSecurity').val() },
            success: function(data){
                if (data.loggedout == true){
                    location.reload();
                }
            }
        });
    });
}
