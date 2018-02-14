<?php
$contact = new Contact();


class Contact {

    function __construct() {
        $this->post = array();
        $this->ajax();

        // Insightly API
        $this->crm      = new stdClass();
        $this->crm_user = '';

        $this->response = array(
            'status' => false,
            'error'  => 'Sorry, there was a problem ('.__LINE__.')',
            'data'   => false
        );
    }


    public function ajax() {
        add_action('wp_ajax_nopriv_contact_us_form', array($this, 'on_submit'));
        add_action('wp_ajax_contact_us_form', array($this, 'on_submit'));
    }


    public function on_submit() {
        // Get post data
        $this->post = array(
            'first'   => $_POST['first'],
            'last'    => $_POST['last'],
            'phone'   => $_POST['phone'],
            'email'   => $_POST['email'],
            'message' => $_POST['message']
        );

        // Validate post data
        foreach ($this->post as $key=>$data) {
            if (!$key == 'message') {
                $data = trim($data);
                $data = stripslashes($data);
                $data = htmlspecialchars($data);
            }

            if ($key == 'first' || $key == 'last') {
                $data = ucwords($data);
            }

            if ($key == 'phone') {
                $data = preg_replace('/[^0-9]/', '', $data);
            }

            if ($key == 'email') {
                $data = strtolower($data);
            }

            $this->post[$key] = $data;
        }

        // Get Insightly
        $this->crm      = new Insightly();
        $this->crm_user = $this->crm->get_contacts(array("email"=>$this->post['email']))[0]->CONTACT_ID;

        // Create contact if user doesn't exist
        if (!is_object($this->crm->get_contact($this->crm_user))) {
            $this->crm_contact();

            // Update variable from newly created user
            $this->crm_user = $this->crm->get_contacts(array("email"=>$this->post['email']))[0]->CONTACT_ID;
        }

        // Add an Insightly task to respond to the user
        $this->crm_task();

        // Save the contact form message to the Insightly user's notes
        if ($this->post['message']) {
            $this->crm_note();
        }

        // Enroll user in MailChimp
        /* if (new_user) {
         *     mailchimp();
         * }*/

        // Send emails via WordPress
        $this->send_emails();

        $this->response = array(
            'status' => true,
            'error'  => false,
            'data'   => $this->post
        );

        // Close connection
        $this->finish();
    }


    public function crm_contact() {
        // Adds contact form data to Insightly
        $env = is_wpe() ? "Prospect" : "Test"; // Production vs stating env
        $info = (object) [
            "FIRST_NAME"   => $this->post['first'],
            "LAST_NAME"    => $this->post['last'],
            "CUSTOMFIELDS" => array(
                0 => (object) [
                    "CUSTOM_FIELD_ID" => "CONTACT_FIELD_1",
                    "FIELD_VALUE"     => $env
                ]
            ),
            "CONTACTINFOS" => array(
                0 => (object) [
                    "TYPE"   => "EMAIL",
                    "LABEL"  => "WORK",
                    "DETAIL" => $this->post['email']
                ],
                1 => (object) [
                    "TYPE"   => "PHONE",
                    "LABEL"  => "WORK",
                    "DETAIL" => $this->post['phone']
                ]
            )
        ];
        $this->crm->add_contact($info);
    }


    public function crm_task() {
        $task = (object) [
            "TITLE"=>"Contact ".$this->post['first']." ".$this->post['last'],
            "PUBLICLY_VISIBLE"=>true,
            "COMPLETED"=>false,
            "STATUS"=>"Not Started",
            "RESPONSIBLE_USER_ID"=>606969,
            "OWNER_USER_ID"=>606969,
            "TASKLINKS"=>array(
                0=>(object) [
                    "TASK_LINK_ID"=>$this->crm_user,
                    "CONTACT_ID"=>$this->crm_user
                ]
            )
        ];
        $this->crm->add_task($task);
    }


    public function crm_note() {
        $note = (object) [
            "TITLE"             => "Contact Form",
            "BODY"              => $this->post['message'],
            "LINK_SUBJECT_ID"   => $this->crm_user,
            "LINK_SUBJECT_TYPE" => "CONTACT",
            "NOTELINKS"         => array(
                0 => (object) [
                    "CONTACT_ID" => $this->crm_user
                ]
            )
        ];
        $this->crm->add_note($note);
    }


    public function mailchimp() {
        $this->debug('MailChimp ('.__LINE__.')');
    }


    public function send_emails() {
        $email = new Email;

        // Admin Email(s)
        if (is_wpe()) {
            $admin = "scott@royallegalsolutions.com"; // Production
            $staff = ["swedy13@gmail.com", "kellie@royallegalsolutions.com", "support@royallegalsolutions.com"];
        }
        else {
            $admin = "swedy13@gmail.com";  // Staging
            $staff = "";     // Add developer testing accounts here...
        }
        $email->
        from("Royal Legal Solutions <wordpress@royallegalsolutions.com>")->
        to($admin)->  // Use [$contact 1, $contact2, etc...] for multiple
        bcc($staff)->
        subject('New contact from Royal Legal Solutions')->
        template(get_template_directory().'/emails/contact_admin.html', [
            'name'    => $this->post['first'].' '.$this->post['last'],
            'phone'   => $this->post['phone'],
            'email'   => $this->post['email'],
            'message' => $this->post['message']
        ])->
        send();

        // Automated Response
        $email->
        from("Royal Legal Solutions <wordpress@royallegalsolutions.com>")->
        to($this->post['email'])->
        subject('Thank you for contacting Royal Legal Solutions')->
        template(get_template_directory().'/emails/contact_thankyou.html', [
	    'name'    => $this->post['first'],
	    'phone'   => $this->post['phone'],
	    'email'   => $this->post['email']
        ])->
        send();
    }


    private function finish() {
        json_encode($this->response);
        die();
    }


    private function debug($message) {
        echo json_encode($message);
        return true;
    }
}
?>
