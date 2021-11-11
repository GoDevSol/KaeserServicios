<?php
include_once '../common/commonHeaderGET.php';
include_once '../common/commonInclude.php';
include_once '../objects/userWeb.php';

$user = new UserWeb($db);
$userResult = $user->readAll();

if ($userResult["success"] == true) {
    $common->response200(array("data" => $userResult["data"]));
} else {
    $common->response404("No data found.");
}
