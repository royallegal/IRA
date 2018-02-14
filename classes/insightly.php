<?php
class Insightly {
    private $apikey;
    public  $v;

    public function __construct() {
        $this->apikey = '64a00447-52a4-44ef-9955-c7cc8d78d406';
        $this->v = 'v2.2'; // API Version
    }

    public function add_address($id, $address_id, $address) {
        $url_path = "/".$this->v."/Contacts/".$id."/Addresses";
        $request = null;
        if (isset($address) && $address > 0) {
            $address["ADDRESS_ID"] = $address_id;
            $request = $this->PUT($url_path);
        }
        else {            
            $request = $this->POST($url_path);
        }
        return $request->body($address)->asJSON();
    }


    /* ---- CONTACTS ---- */
    /* POST */
    /* New Contact (auto-generates ID) */
    public function add_contact($contact) {
        $url_path = "/".$this->v."/Contacts";
        $request = null;
        if (isset($contact->CONTACT_ID) && $contact->CONTACT_ID > 0) {
            $request = $this->PUT($url_path);
        }
        else {
            $request = $this->POST($url_path);
        }
        return $request->body($contact)->asJSON();
    }

    public function update_custom_fields($id, $data) {
        $url_path = "/v2.2/Contacts/".$id."/CustomFields";
        return $this->PUT($url_path)->body($data)->asJSON();
    }

    /* DELETE */
    /* By ID */
    public function delete_contact($id) {
        $this->DELETE("/".$this->v."/Contacts/$id")->asString();
        return true;
    }

    /* GET */
    /* All Contacts */
    public function get_contacts($options = null) {
        $email = isset($options["email"]) ? $options["email"] : null;
        $tag = isset($options["tag"]) ? $options["tag"] : null;
        $ids = isset($options["ids"]) ? $options["ids"] : null;
        $request = $this->GET("/v2.1/Contacts");
        // handle standard OData options
        $this->build_query($request, $options);
        // handle other options
        if ($email != null) {
            $request->query_param("email", $email);
        }
        if ($tag != null) {
            $request->query_param("tag", $tag);
        }
        if ($ids != null) {
            $s = "";
            foreach($ids as $key => $value) {
                if ($key > 0) {
                    $s = $s . ",";
                }
                $s = $s . $value;
            }
            $request->query_param("ids", $s);
        }
        return $request->asJSON();
    }

    /* By ID */
    public function get_contact($id) {
        return $this->GET("/".$this->v."/Contacts/" . $id)->asJSON();
    }

    /* By Contact Info */
    public function get_contact_emails($contact_id) {
        return $this->GET("/".$this->v."/Contacts/$contact_id/Emails")->asJSON();
    }
    public function get_contact_notes($contact_id) {
        return $this->GET("/".$this->v."/Contacts/$contact_id/Notes")->asJSON();
    }
    public function get_contact_tasks($contact_id) {
        return $this->GET("/".$this->v."/Contacts/$contact_id/Tasks")->asJSON();
    }

    public function get_countries() {
        return $this->GET("/".$this->v."/Countries")->asJSON();
    }
    public function get_currencies() {
        return $this->GET("/".$this->v."/Currencies")->asJSON();
    }

    /* CUSTOM FIELDS */
    public function get_custom_fields() {
        return $this->GET("/v2.2/CustomFields")->asJSON();
    }
    public function get_custom_field_groups($id) {
        return $this->GET("/v2.2/CustomFields/$id")->asJSON();
    }

    public function get_emails($options = null) {
        $request = $this->GET("/v2.1/Emails");
        $this->build_query($request, $options);
        return $request->asJSON();
    }
    public function get_email($id) {
        return $this->GET("/v2.1/Emails/$id")->asJSON();
    }
    public function delete_email($id) {
        $this->DELETE("/v2.1/Emails/$id")->asString();
        return true;
    }
    public function get_email_comments($email_id) {
        $this->GET("/v2.1/Emails/$email_id/Comments")->asJSON();
    }
    public function add_email_comment($email_id, $body, $owner_user_id) {
        $data = new stdClass();
        $data->BODY = $body;
        $data->OWNER_USER_ID = $owner_user_id;
        return $this->POST("/v2.1/Emails/")->body($data)->asJSON();
    }

    public function get_events($options = null) {
        $request = $this->GET("/v2.1/Events");
        $this->build_query($request, $options);
        return $request->asJSON();
    }
    public function get_event($id) {
        return $this->GET("/v2.1/Events/$id")->asJSON();
    }
    public function add_event($event) {
        if ($event == "sample") {
            $return = $this->get_events(array("top" => 1));
            return $return[0];
        }
        $url_path = "/v2.1/Events";
        if (isset($event->EVENT_ID) && ($event->EVENT_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($event)->asJSON();
    }
    public function delete_event($id) {
        $this->DELETE("/v2.1/Events/$id")->asString();
        return true;
    }

    public function get_file_categories() {
        return $this->GET("/v2.1/FileCategories")->asJSON();
    }
    public function get_file_category($id) {
        return $this->GET("/v2.1/FileCategories/$id")->asJSON();
    }
    public function add_file_category($category) {
        if ($category == "sample") {
            $return = $this->get_file_categories();
            return $return[0];
        }
        $url_path = "/v2.1/FileCategories";
        if (isset($category->CATEGORY_ID)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($category)->asJSON();
    }
    public function delete_file_category($id) {
        $this->DELETE("/v2.1/FileCategories/$id")->asString();
        return true;
    }

    public function get_notes($options = null) {
        $request = $this->GET("/v2.1/Notes");
        $this->build_query($request, $options);
        return $request->asJSON();
    }
    public function get_note($id) {
        return $request = $this->GET("/v2.1/Notes/$id")->asJSON();
    }
    public function add_note($note) {
        if ($note == "sample") {
            $return = $this->get_notes(array("top" => 1));
            return $return[0];
        }
        $url_path = "/v2.1/Notes";
        if (isset($note->NOTE_ID) && ($note->NOTE_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($note)->asJSON();
    }
    public function get_note_comments($note_id) {
        return $this->GET("/v2.1/Notes/$note_id/Comments")->asJSON();
    }
    public function add_note_comment($note_id, $comment) {
        if ($comment == "sample") {
            $comment = new stdClass();
            $comment->COMMENT_ID = 0;
            $comment->BODY = "This is a comment.";
            $comment->OWNER_USER_ID = 1;
            $comment->DATE_CREATED_UTC = "2014-07-15 16:40:00";
            $comment->DATE_UPDATED_UTC = "2014-07-15 16:40:00";
            return $comment;
        }
        return $this->POST("/v2.1/$note_id/Comments")->body($comment)->asJSON();
    }
    public function delete_note($id) {
        $this->DELETE("/v2.1/Notes/$id")->asString();
        return true;
    }

    public function get_opportunities($options = null) {
        $request = $this->GET("/v2.1/Opportunities");
        $this->build_query($request, $options);
        return $request->asJSON();
    }
    public function get_opportunity($id) {
        return $this->GET("/v2.1/Opportunities/" . $id)->asJSON();
    }
    public function add_opportunity($opportunity) {
        if ($opportunity == "sample") {
            $return = $this->get_opportunities(array("top" => 1));
            return $return[0];
        }
        $url_path = "/v2.1/Opportunities";
        if (isset($opportunity->OPPORTUNITY_ID) && ($opportunity->OPPORTUNITY_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($opportunity)->asJSON();
    }
    public function delete_opportunity($id) {
        $this->DELETE("/v2.1/Opportunities/$id")->asString();
        return true;
    }
    public function get_opportunity_emails($opportunity_id) {
        return $this->GET("/v2.1/Opportunities/$opportunity_id/Emails")->asJSON();
    }
    public function get_opportunity_notes($opportunity_id) {
        return $this->GET("/v2.1/Opportunities/$opportunity_id/Notes")->asJSON();
    }
    public function get_opportunity_history($opportunity_id) {
        return $this->GET("/v2.1/Opportunities/$opportunity_id/StateHistory")->asJSON();
    }
    public function get_opportunity_tasks($opportunity_id) {
        return $this->GET("/v2.1/Opportunities/$opportunity_id/Tasks")->asJSON();
    }
    public function get_opportunity_categories() {
        return $this->GET("/v2.1/OpportunityCategories")->asJSON();
    }
    public function get_opportunity_category($id) {
        return $this->GET("/v2.1/OpportunityCategories/$id")->asJSON();
    }
    public function add_opportunity_category($category) {
        if ($category == "sample") {
            $return = $this->get_opportunity_categories();
            return $return[0];
        }
        $url_path = "/v2.1/OpportunityCategories";
        if (isset($category->CATEGORY_ID) && ($category->CATEGORY_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($category)->asJSON();
    }
    public function delete_opportunity_category($id) {
        $this->DELETE("/v2.1/OpportunityCategories/$id")->asString();
        return true;
    }
    public function get_opportunity_reasons() {
        return $this->GET("/v2.1/OpportunityStateReasons")->asJSON();
    }

    public function get_organizations($options = null) {
        $request = $this->GET("/v2.1/Organisations");
        $this->build_query($request, $options);
        return $request->asJSON();
    }
    public function get_organization($id) {
        return $this->GET("/v2.1/Organisations/$id")->asJSON();
    }
    public function addOrganization($organization) {
        if ($organization == "sample") {
            $return = $this->get_organizations(array("top" => 1));
            return $return[0];
        }
        $url_path = "/v2.1/Organisations";
        if (isset($organization->ORGANISATION_ID) && ($organization->ORGANISATION_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($organization)->asJSON();
    }
    public function delete_organization($id) {
        $this->DELETE("/v2.1/Organisations/$id")->asString();
        return true;
    }
    public function get_organization_emails($organization_id) {
        return $this->GET("/v2.1/Organisations/$organization_id/Emails")->asJSON();
    }
    public function get_organization_notes($organization_id) {
        return $this->GET("/v2.1/Organisations/$organization_id/Notes")->asJSON();
    }
    public function get_organization_tasks($organization_id) {
        return $this->GET("/v2.1/Organisations/$organization_id/Tasks")->asJSON();
    }

    public function get_pipelines() {
        return $this->GET("/v2.1/Pipelines")->asJSON();
    }
    public function get_pipeline($id) {
        return $this->GET("/v2.1/Pipelines/$id")->asJSON();
    }
    public function get_pipeline_stages() {
        return $this->GET("/v2.1/PipelineStages")->asJSON();
    }
    public function get_pipeline_stage($id) {
        return $this->GET("/v2.1/PipelineStages/$id")->asJSON();
    }

    public function get_project_categories() {
        return $this->GET("/v2.1/ProjectCategories")->asJSON();
    }
    public function get_project_category($id) {
        return $this->GET("/v2.1/ProjectCategories/$id")->asJSON();
    }
    public function add_project_category($category) {
        if ($category == "sample") {
            $return = $this->get_project_categoriest();
            return $return[0];
        }
        $url_path = "/v2.1ProjectCategories";
        if (isset($category->CATEGORY_ID) && ($category->CATEGORY_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($category)->asJSON();
    }
    public function delete_project_category($id) {
        $this->DELETE("/v2.1/ProjectCategories/$id")->asString();
        return true;
    }

    public function get_projects($options = null) {
        $tag = isset($options["tag"]) ? $options["tag"] : null;
        $ids = isset($options["ids"]) ? $options["ids"] : null;
  	
        $request = $this->GET("/v2.1/Projects");
        // handle standard OData options
        $this->build_query($request, $options);
        // handle other options
        if ($tag != null) {
            $request->query_param("tag", $tag);
        }
        if ($ids != null) {
            $s = "";
            foreach($ids as $key => $value) {
                if ($key > 0) {
                    $s = $s . ",";
                }
                $s = $s . $value;
            }
            $request->query_param("ids", $s);
        }
        return $request->asJSON();
    }
    public function get_project($id) {
        return $this->GET("/v2.1/Projects/$id")->asJSON();
    }
    public function add_project($project) {
        if ($project == "sample") {
            $return = $this->getProjects();
            return $return[0];
        }
        $url_path = "/v2.2/Projects";
        if (isset($project->PROJECT_ID) && ($project->PROJECT_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($project)->asJSON();
    }
    public function delete_project($id) {
        $this->DELETE("/v2.1/Projects/$id")->asString();
        return true;
    }

    public function get_project_emails($project_id) {
        return $this->GET("/v2.1/Projects/$project_id/Emails")->asJSON();
    }
    public function get_project_notes($project_id) {
        return $this->GET("/v2.1/Projects/$project_id/Notes")->asJSON();
    }
    public function get_project_tasks($project_id) {
        return $this->GET("/v2.1/Projects/$project_id/Tasks")->asJSON();
    }

    public function get_relationships() {
        return $this->GET("/v2.1/Relationships")->asJSON();
    }

    public function get_tags($id) {
        return $this->GET("/v2.1/Tags/$id")->asJSON();
    }

    public function get_tasks($options = null) {
        $request = $this->GET("/v2.1/Tasks");
        $this->build_query($request, $options);
        if (isset($options["ids"])) {
            $ids = "";
            foreach($options["ids"] as $id) {
                $ids .= $id . ",";
            }
            $request.query_param("ids", $ids);
        }
        return $request->asJSON();
    }
    public function get_task($id) {
        return $this->GET("/v2.1/Tasks/$id")->asJSON();
    }
    public function add_task($task) {
        if ($task == "sample") {
            $return = $this->getTasks(array("top" => 1));
            return $return[0];
        }
        $url_path = "/v2.1/Tasks";
        if (isset($task->TASK_ID) && ($task->TASK_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($task)->asJSON();
    }
    public function delete_task($id) {
        $this->DELETE("/v2.1/Tasks/$id")->asString();
        return true;
    }
    public function get_task_comments($task_id) {
        return $this->GET("/v2.1/Tasks/$task_id/Comments")->asJSON();
    }
    public function add_task_comment($task_id, $comment) {
        return $this->POST("/v2.1/Tasks/$task_id/Comments")->body($comment)->asJSON();
    }

    public function get_teams($options = null) {
        $request = $this->GET("/v2.1/Teams");
        $this->build_query($request, $options);
        return $request->asJSON();
    }
    public function get_team($id) {
        return $this->GET("/v2.1/Teams/$id")->asJSON();
    }
    public function add_team($team) {
        if ($team == "sample") {
            $return = $this->getTeams(array("top" => 1));
            return $return[0];
        }
        $url_path = "/v2.1/Teams";
        if (isset($team->TEAM_ID) && ($team->TEAM_ID > 0)) {
            $request = $this->PUT($url_path);
        }
        else{
            $request = $this->POST($url_path);
        }
        return $request->body($team)->asJSON();
    }
    public function delete_team($id) {
        $this->DELETE("/v2.1/Teams/$id")->asString();
        return true;
    }
    public function get_team_members($team_id) {
        return $this->POST("/v2.1/TeamMembers/teamid=$team_id")->asJSON();
    }
    public function get_team_member($id) {
        return $this->POST("/v2.1/TeamMembers/$id")->asJSON();
    }
    public function add_team_member($team_member) {
        if ($team_member == "sample") {
            $team_member = new stdClass();
            $team_member->PERMISSION_ID = 1;
            $team_member->TEAM_ID = 1;
            $team_member->MEMBER_USER_ID = 1;
            $team_member->MEMBER_TEAM_ID = 1;
            return $team_member;
        }
        return $this->POST("/v2.1/TeamMembers")->body($team_member)->asJSON();
    }
    public function update_team_member($team_member) {
        return $this->PUT("/v2.1/TeamMembers")->body($team_member)->asJSON();
    }
    public function delete_team_member($id) {
        $this->DELETE("/v2.1/TeamMembers/$id")->asString();
        return true;
    }

    public function get_users() {
        return $this->GET("/v2.1/Users")->asJSON();
    }
    public function get_user($id) {
        return $this->GET("/v2.1/Users/" . $id)->asJSON();
    }

    /**
     * Add OData query filters to a request
     * 
     * Accepted options:
     * 	- top
     * 	- skip
     * 	- orderby
     * 	- an array of filters 
     * 
     * @param Insightly_Request $request
     * @param array $options
     * @return Insightly_Request
     * @link http://www.odata.org/documentation/odata-version-2-0/uri-conventions/
     */
    private function build_query($request, $options) {
  	$top = isset($options["top"]) ? $options["top"] : null;
  	$skip = isset($options["skip"]) ? $options["skip"] : null;
  	$orderby = isset($options["orderby"]) ? $options["orderby"] : null;
  	$filters = isset($options["filters"]) ? $options["filters"] : null;
        if ($top != null) {
            $request->query_param('$top', $top);
        }
        if ($skip != null) {
            $request->query_param('$skip', $skip);
        }
        if ($orderby != null) {
            $request->query_param('$orderby', $orderby);
        }
        if ($filters != null) {
            foreach($filters as $filter) {
                $filterValue = str_replace(array('=', '>', '<'),
                                           array(' eq ', ' gt ', ' lt '),
                                           $filter);
                $request->query_param('$filter', $filterValue);
            }
        }
        return $request;
    }

    // ---- HELPER METHODS ---- //
    // Create GET request
    private function GET($url_path) {
        return new Insightly_Request("GET", $this->apikey, $url_path);
    }
    // Create PUT request
    private function PUT($url_path) {
        return new Insightly_Request("PUT", $this->apikey, $url_path);
    }
    // Create POST request
    private function POST($url_path) {
        return new Insightly_Request("POST", $this->apikey, $url_path);
    }
    // Create DELETE request
    private function DELETE($url_path) {
        return new Insightly_Request("DELETE", $this->apikey, $url_path);
    }
}


/* API Requests class
 * Helper class for executing REST requests to the Insightly API.
 * 
 * Usage:
 *  - Instanciate: $request = new Insightly_Request('GET', $apikey, 'create.../)
 *  - Execute: $request->toString();
 *  - Or implicitly execute: $request->asJSON(); */
class Insightly_Request {
    const URL_BASE = 'https://api.insight.ly';
    /* @var resource */
    private $curl;
    /* @var string */
    private $url_path;
    /* @var array */
    private $headers;
    /* @var array */
    private $querystrings;
    /* @var string */
    private $body;

    /* Request initialisation */
    function __construct($method, $apikey, $url_path) {
        $this->curl = curl_init();
        $this->url_path = $url_path;
        $this->headers = array("Authorization: Basic " . base64_encode($apikey . ":"));
        $this->querystrings = array();
        $this->body = null;
        switch($method) {
            case "GET": // default
                break;
            case "DELETE":
                $this->method("DELETE");
                break;
            case "POST":
                $this->method("POST");
                break;
            case "PUT":
                $this->method("PUT");
                break;
            default: throw new Exception('Invalid HTTP method: ' . $method);
        }
        // Have curl return the response, rather than echoing it
        curl_setopt($this->curl, CURLOPT_RETURNTRANSFER, true);
    }

    /* Get executed request response */
    public function asString() {
        // This may be useful for debugging
        curl_setopt($this->curl, CURLOPT_VERBOSE, true);
        $url =  Insightly_Request::URL_BASE . $this->url_path . $this->build_query();
        curl_setopt($this->curl, CURLOPT_URL, $url);
        curl_setopt($this->curl, CURLOPT_HTTPHEADER, $this->headers);
        $response = curl_exec($this->curl);

        // Debugging
        /* echo '<pre>';
         * print_r($response);
         * echo '</pre>';*/

        $errno = curl_errno($this->curl);
        if ($errno != 0) {
            throw new Exception("HTTP Error (" . $errno . "): " . curl_error($this->curl));
        }
        $status_code = curl_getinfo($this->curl, CURLINFO_HTTP_CODE);

        if (!($status_code == 200 || $status_code == 201 || $status_code == 202 || $status_code == 401)) {
            throw new Exception("Bad HTTP status code: " . $status_code);
        }
        return $response;
    }

    /* Return decoded JSON response */
    public function asJSON() {
        $data = json_decode($this->asString());
        $errno = json_last_error();
        if ($errno != JSON_ERROR_NONE) {
            throw new Exception("Error encountered decoding JSON: " . json_last_error_msg());
        }
        return $data;
    }

    /* Add data to the current request */
    public function body($obj) {
        $data = json_encode($obj);
        $errno = json_last_error();
        if ($errno != JSON_ERROR_NONE) {
            throw new Exception("Error encountered encoding JSON: " . json_last_error_message());
        }
        curl_setopt($this->curl, CURLOPT_POSTFIELDS, $data);
        $this->headers[] = "Content-Type: application/json";

        return $this;
    }

    /* Set request method */
    private function method($method) {
        curl_setopt($this->curl, CURLOPT_CUSTOMREQUEST, $method);
        return $this;
    }

    /* Add query parameter to the current request */
    public function query_param($name, $value) {
        // build the query string for this name/value pair
        $querystring = http_build_query(array($name => $value));
        // append it to the list of query strings
        $this->querystrings[] = $querystring;
        return $this;
    }

    /* Build query string for the current request */
    private function build_query() {
        if (count($this->querystrings) == 0) {
            return "";
        }
        else{
            $querystring = "?";
            foreach($this->querystrings as $index => $value) {
                if ($index > 0) {
                    $querystring .= "&";
                }
                $querystring .= $value;
            }
            return $querystring;
        }
    }
}
?>
