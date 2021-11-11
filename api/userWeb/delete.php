<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../objects/solicitudes.php';
include_once '../objects/userWeb.php';

$user = new UserWeb($db);
$db->beginTransaction();

if (
    !empty($data->id)
) {
    $user->id = $data->id;

    $common->inputMappingObj($data, $user);

    $resultUser = $user->deteleById();

    if ($resultUser["success"] == true) {
        $db->commit();
        $common->response200(array("message" => "user was deleted", "id" => $result["id"]));
    } else {
        $db->rollback();
        $common->response503("Unable to delete user.");
    }
} else {
    $common->response404("Unable to delete user. Data is incomplete.");
}
