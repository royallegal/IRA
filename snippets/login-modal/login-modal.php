<!-- Modal Structure -->
<div id="loginModal" class="modal">
    <div class="carousel carousel-slider">
        <div class="carousel-item">
            <div class="row mb-0">
                <div class="col m6 relative white-text center-align" >
                    <div class="mask pink mix"></div>
                    <div class="mask "></div>
                    <div class="flex center v-center" style="height: 100%"> 
                        <div>
                        <h3>Login</h3>
                        <p>PLease enter your credentials</p>
                        <p>Already Have an account?</p>
                        </div>
                    </div>
                </div>
                <div class="col m6">
                    <div class="p-2 flex center v-center" style="height: 100%">
                        <form id="login" action="login" method="post">
                            <p class="status"> </p>
                            <label for="username">Username</label>
                            <input id="username" type="text" name="username">
                            <label for="password">Password</label>
                            <input id="password" type="password" name="password">
                            <input class="button blue" type="submit" value="Login" name="submit">
                            <a class="lost" href="<?php echo wp_lostpassword_url(); ?>">Lost your password?</a>
                            <?php wp_nonce_field( 'ajax-login-nonce', 'security' ); ?>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <div class="row mb-0">
                <div class="col m6 relative white-text center-align" >
                    <div class="mask orange mix"></div>
                    <div class="mask "></div>
                    <div class="flex center v-center" style="height: 100%"> 
                        <div>
                        <h3>Recover your password</h3>
                        <p>PLease enter your credentials</p>
                        <p>Already Have an account?</p>
                        </div>
                    </div>
                </div>
                <div class="col m6">
                    <div class="p-2 flex center v-center" style="height: 100%">
                        <form id="passwordLost" action="passwordLost" method="post">
                            <label for="username">Username</label>
                            <input id="username" type="text" name="email">
                            <input class="button blue" type="submit" value="Recover Password" name="submit">
                            <?php wp_nonce_field( 'ajax-lostpass-nonce', 'security' ); ?>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <div class="carousel-item">
            <div class="row mb-0">
                <div class="col m6 relative white-text center-align" >
                    <div class="mask blue mix"></div>
                    <div class="mask "></div>
                    <div class="flex center v-center" style="height: 100%"> 
                        <div>
                        <h3>Reset your password</h3>
                        <p>PLease enter your credentials</p>
                        <p>Already Have an account?</p>
                        </div>
                    </div>
                </div>
                <div class="col m6">
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
                                    echo $errors->get_error_message( $errors->get_error_code() );
                                else:
                                ?>
                                <form id="passwordReset" method="post" autocomplete="off">
                                    <input type="hidden" name="user_key" id="user_key" value="<?php echo esc_attr( $_GET['key'] ); ?>" autocomplete="off" />
                                    <input type="hidden" name="user_login" id="user_login" value="<?php echo esc_attr( $_GET['login'] ); ?>" autocomplete="off" />

                                    <label for="pass1"><?php _e('New password') ?><br />
                                    <input type="password" name="pass1" id="pass1" class="input" size="20" value="" autocomplete="off" /></label>
                                    <label for="pass2"><?php _e('Confirm new password') ?><br />
                                    <input type="password" name="pass2" id="pass2" class="input" size="20" value="" autocomplete="off" /></label>
                                    <?php wp_nonce_field( 'ajax-reset-nonce', 'security' ); ?>
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



