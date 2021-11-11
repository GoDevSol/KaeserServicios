<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/validateToken.php';
include_once '../common/commonIncludeJWT.php';
include_once '../objects/userWeb.php';

use \Firebase\JWT\JWT;

$user = new UserWeb($db);

if (!empty($data->id)) {


    $user->id =  $data->id;
    $user->loadId();
    $user->password = password_hash("TemporalPass", PASSWORD_BCRYPT);
    $user->updatePassword();

    $common->response200(array("message" => true));
} else {

    $common->response404("Data is incomplete.");
}
