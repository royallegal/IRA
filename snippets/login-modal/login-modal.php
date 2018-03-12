<?php if (! is_user_logged_in()) { ?>
<div id="loginModal" class="modal">
    <div class="row">
        <div class="splash"></div>

        <div class="col s12 m6">
            <!-- LOST PASSWORD -->
            <div class="lost section">
                <form id="passwordLost" action="passwordLost" method="post" style="width: 100%">
                    <div class="title-group">
                        <p class="h3">Can't Sign In?</p>
                        <p>No worries, we'll send you a new password via email</p>
                    </div>
                    <p class="status"> </p>
                    <div class="input-field">
                        <input id="lostUsername" type="text" name="email">
                        <label for="lostUsername">Username</label>
                    </div>
                    <?php wp_nonce_field('ajax-lostpass-nonce', 'lostSecurity'); ?>
                    <div class="left-align button-group">
                        <input class="button to-blue blue" type="submit" value="Recover" name="submit">
                        <a href="#" data-goto-login>Back to login</a>
                    </div>
                </form>
            </div>
        </div>

        <div class="col s12 m6">
            <!-- LOGIN -->
            <div class="login section">
                <form id="login" action="login" method="post">
                    <div class="title-group">
                        <p class="h3">Howdy Stranger</p>
                        <p>Let's get you signed in!</p>
                    </div>
                    <div class="input-field">
                        <input id="loginUsername" type="text" name="username">
                        <label for="loginUsername">Username</label>
                    </div> 
                    <div class="input-field">
                        <input id="loginPassword" type="password" name="password">
                        <label for="loginPassword">Password</label>
                    </div> 

                    <p id="rememberMe">
                        <input type="checkbox" id="loginRemember" />
                        <label for="loginRemember">Remember me</label>
                    </p>
                    <?php wp_nonce_field('ajax-login-nonce', 'loginSecurity'); ?>

                    <div class="form-status">
                        <div class="left-align status-swap button-group">
                            <button class="blue to-blue button" type="submit">Login</button>
                            <a id="lost-link" href="#lost-password" data-goto-lost>
                                Lost your password?
                            </a>
                        </div>
                        <?php get_template_part('snippets/loaders/form-status'); ?>
                    </div>
                </form>
            </div>

            <div class="reset col s12 m6">
                <!-- PASSWORD RESET -->
                <div class="section">
                    <?php
                    $errors = new WP_Error();
                    $user = check_password_reset_key($_GET['key'], $_GET['login']);

                    if (is_wp_error($user)) {
                        if ($user->get_error_code() === 'expired_key')
                            $errors->add('expiredkey', __('It looks like the link you\'re using has expired. Try reset your password.'));
                        else
                            $errors->add('invalidkey', __('It looks like the link you\'re using is invalid. Try reset your password.'));
                    }

                    // display error message
                    if ($errors->get_error_code()) {
                    ?>
                        <div class="title-group">
                            <p class="h3">Oops, this isn't right!</p>
                            <p class="center-align">
                                <?php echo $errors->get_error_message($errors->get_error_code()); ?>
                            </p>
                        </div>
                        <div class="button-group">
                            <a href="#" class="blue to-blue button" data-goto-login>Login</a>
                            <a id="lost-link"
                               class="gray to-blue button"
                               href="#lost-password"
                               data-goto-lost>
                                Reset
                            </a>
                        </div>

                    <?php
                    } else {
                    ?>

                        <form id="passwordReset" method="post" autocomplete="off">
                            <div class="title-group">
                                <h3>Reset your password</h3>
                                <p>You can now change your password</p>
                            </div>
                            <p class="status"></p>
                            <input type="hidden"
                                   name="user_key"
                                   id="user_key"
                                   value="<?php echo esc_attr($_GET['key']); ?>"
                                   autocomplete="off" />
                            <input type="hidden"
                                   name="user_login"
                                   id="user_login"
                                   value="<?php echo esc_attr($_GET['login']); ?>"
                                   autocomplete="off" />
                            <label for="resetPass1"><?php _e('New password') ?>
                                <br />
                                <input type="password"
                                       name="pass1"
                                       id="resetPass1"
                                       class="input"
                                       size="20"
                                       autocomplete="off" />
                            </label>
                                <label for="resetPass2"><?php _e('Confirm new password') ?><br />
                                    <input type="password"
                                           name="pass2"
                                           id="resetPass2"
                                           class="input"
                                           size="20"
                                           value=""
                                           autocomplete="off" /></label>
                                    <?php wp_nonce_field('ajax-reset-nonce', 'resetSecurity'); ?>
                                    <?php
                                    // Fires following the 'Strength indicator' meter in the user password reset form
                                    // @since 3.9.0
                                    // @param WP_User $user User object of the user whose password is being reset
                                    do_action('resetpass_form', $user);
                                    ?>
                                    <input class="button blue"
                                           type="submit"
                                           value="Reset Password"
                                           name="submit">
                                    
                        </form>
                    <?php } ?>
                </div>
            </div>

        </div>
    </div>
</div>
<?php } ?>
