<!-- Modal Structure -->
<div id="loginModal" class="modal">
    <div class="carousel carousel-slider">
        <div class="carousel-item">
            <div class="row mb-0">
                <div class="col m6 relative white-text center-align pv-2-xs" >
                    <div class="mask pink mix"></div>
                    <div class="mask "></div>
                    <div class="flex center v-center" style="height: 100%"> 
                        <div>
                            <h3>Login</h3>
                            <p>Please enter your credentials to login</p>
                            <a class="lost button white" href="#lost-password" data-goto-lost>Lost your password?</a>
                        </div>
                    </div>
                </div>
                <div class="col m6 pv-2-xs">
                    <div class="p-2 flex center v-center" style="height: 100%">
                        <form id="login" action="login" method="post" style="width: 100%">
                            <p class="status"> </p>
                            <div class="input-field">
                                <input id="loginUsername" type="text" name="username">
                                <label for="loginUsername">Username</label>
                            </div> 
                            <div class="input-field">
                                <input id="loginPassword" type="password" name="password">
                                <label for="loginPassword">Password</label>
                            </div> 
                            <p>
                                <input type="checkbox" id="loginRemember" />
                                <label for="loginRemember">Remember me</label>
                            </p>
                            <?php wp_nonce_field( 'ajax-login-nonce', 'loginSecurity' ); ?>
                            <input class="button blue mr-2 mt-2" type="submit" value="Login" name="submit">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <div class="row mb-0">
                <div class="col m6 relative white-text center-align pv-2-xs" >
                    <div class="mask orange mix"></div>
                    <div class="mask "></div>
                    <div class="flex center v-center" style="height: 100%"> 
                        <div>
                            <h3>Recover your password</h3>
                            <p>Please enter yout email to get a password reset link</p>
                            <p>Already Have an account?</p>
                            <button class="button white" data-goto-login>Log in</button>
                        </div>
                    </div>
                </div>
                <div class="col m6 pv-2-xs">
                    <div class="p-2 flex center v-center" style="height: 100%">
                        <form id="passwordLost" action="passwordLost" method="post" style="width: 100%">
                            <p class="status"> </p>
                            <div class="input-field">
                                <input id="lostUsername" type="text" name="email">
                                <label for="lostUsername">Username</label>
                            </div>
                            <?php wp_nonce_field( 'ajax-lostpass-nonce', 'lostSecurity' ); ?>
                            <input class="button blue" type="submit" value="Recover Password" name="submit">
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <div class="row mb-0">
                <div class="col m6 relative white-text center-align pv-2-xs" >
                    <div class="mask blue mix"></div>
                    <div class="mask "></div>
                    <div class="flex center v-center" style="height: 100%"> 
                        <div>
                        <h3>Reset your password</h3>
                        <p>You can now change your password</p>
                        </div>
                    </div>
                </div>
                <div class="col m6 pv-2-xs">
                    <div class="p-2 flex center v-center" style="height: 100%">
                            <?php
                                $errors = new WP_Error();
                                $user = check_password_reset_key($_GET['key'], $_GET['login']);

                                if ( is_wp_error( $user ) ) {
                                    if ( $user->get_error_code() === 'expired_key' )
                                        $errors->add( 'expiredkey', __( 'Sorry, that key has expired. Please try again.' ) );
                                    else
                                        $errors->add( 'invalidkey', __( 'Sorry, that key does not appear to be valid.' ) );
                                }

                                // display error message
                                if ( $errors->get_error_code() ):
                                ?> 
                                    <p class="center-align">
                                        <?php echo $errors->get_error_message( $errors->get_error_code() ); ?>
                                        <br>
                                        <a href="#" data-goto-login>Login</a>
                                    </p>
                                <?php else: ?>

                                <form id="passwordReset" method="post" autocomplete="off">
                                    <p class="status"> </p>
                                    <input type="hidden" name="user_key" id="user_key" value="<?php echo esc_attr( $_GET['key'] ); ?>" autocomplete="off" />
                                    <input type="hidden" name="user_login" id="user_login" value="<?php echo esc_attr( $_GET['login'] ); ?>" autocomplete="off" />

                                    <label for="resetPass1"><?php _e('New password') ?><br />
                                    <input type="password" name="pass1" id="resetPass1" class="input" size="20" value="" autocomplete="off" /></label>
                                    <label for="resetPass2"><?php _e('Confirm new password') ?><br />
                                    <input type="password" name="pass2" id="resetPass2" class="input" size="20" value="" autocomplete="off" /></label>
                                    <?php wp_nonce_field( 'ajax-reset-nonce', 'resetSecurity' ); ?>
                                    <?php
                                    /**
                                     * Fires following the 'Strength indicator' meter in the user password reset form.
                                     *
                                     * @since 3.9.0
                                     *
                                     * @param WP_User $user User object of the user whose password is being reset.
                                     */
                                    do_action( 'resetpass_form', $user );
                                    ?>
                                    <input class="button blue" type="submit" value="Reset Password" name="submit">
                                    
                                </form>
                            <?php endif ?>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>



