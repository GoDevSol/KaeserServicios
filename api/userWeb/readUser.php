<?php
include_once './../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';


include_once '../objects/userWeb.php';

$user = new UserWeb($db);
$common->inputMappingObj($data, $user);

$userResult = $user->getUser();

if ($userResult["success"] == true) {
    $common->response200(array("data" => $userResult["data"]));
} else {
    $common->response404("No data found.");
}
