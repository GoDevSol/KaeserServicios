<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../objects/solicitudes.php';
include_once '../objects/user.php';

$solicitudes = new Solicitudes($db);
$user = new User($db);
$db->beginTransaction();

if (
    !empty($data->id)
) {
    $user->id_Solicitud = $data->id;

    $common->inputMappingObj($data, $solicitudes);

    $result = $solicitudes->deleteSolicitud();
    $resultUser = $user->deteleBySolicitud();


    if ($result["success"] == true && $resultUser["success"] == true) {
        $db->commit();
        $common->response200(array("message" => "solicitudes was Created", "id" => $result["id"]));
    } else {
        $db->rollback();
        $common->response503("Unable to create solicitudes.");
    }
} else {
    $common->response404("Unable to delete solicitud. Data is incomplete.");
}
