<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include '../common/commonMail.php';

include_once '../objects/config.php';

$configuracion = new Configuracion($db);

$db->beginTransaction();

if (
    !empty($data->id)
) {
    $common->inputMappingObj($data, $configuracion);

    $result = $configuracion->updateConf();

    if ($result["success"] == true) {
        $db->commit();
        $common->response200(array("message" => "solicitudes was Created", "id" => $result["id"]));
    } else {
        $db->rollBack();
        $common->response503("Unable to create solicitudes.");
    }
} else {
    $common->response404("Unable to create solicitudes. Data is incomplete.");
}
