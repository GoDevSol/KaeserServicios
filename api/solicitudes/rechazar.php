<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/commonMail.php';

include_once '../objects/solicitudes.php';
include_once '../objects/user.php';

$solicitud = new Solicitudes($db);
$db->beginTransaction();
if (
    !empty($data->id)
) {

    $common->inputMappingObj($data, $solicitud);

    $result = $solicitud->updateCancel();

    if ($result["success"] == true) {

        $word = array();

        $input = $common->readReturnObject("*", "id=", "", $solicitud, "");

        $common->inputMappingObj($input, $solicitud);

        $responseEmail = sendMailFunction("../htmlTemplate/cancelRequest.html", $word, "adminSupport@kaeserservicios.com", "Soporte Aplicacion Kaeser", $solicitud->correo, "KAESER SERVICE - Solicitud de Usuario ");

        if ($responseEmail) {
            $db->commit();
            $common->response200(array("message" => "solicitud was modified", "id" => $result["id"]));
        } else {
            $db->rollBack();
            $common->response503("Unable to update solicitud.");
        }
    } else {
        $common->response503("Unable to update solicitud.");
    }
} else {
    $common->response404("Unable to update solicitud. Data is incomplete.");
}
