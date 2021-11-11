<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';

include '../common/commonMail.php';
include_once '../objects/solicitudes.php';
include_once '../objects/config.php';

$solicitudes = new Solicitudes($db);
$db->beginTransaction();

if (
    !empty($data->nombre) &&    !empty($data->apellido) &&    !empty($data->compania) &&    !empty($data->correo) &&    !empty($data->telefono)
) {
    $common->inputMappingObj($data, $solicitudes);

    $result = $solicitudes->create();

    if ($result["success"] == true) {

        $word = array();
        $word["nombrePersona"] = $data->nombre . " " . $data->apellido;
        $word["nombreCompania"] = $data->compania;
        $word["correo"] = $data->correo;
        $word["telefono"] = $data->telefono;

        $configuracion = new Configuracion($db);
        $configuracionResult = $configuracion->readByconf("correoAdmin");

        $response = sendMailFunction("../htmlTemplate/createRequest.html", $word, "adminSupport@kaeserservicios.com", "Soporte Aplicacion", $configuracionResult, "KAESER SERVICE - Creacion de Usuario - " . $data->compania);
        $responseEmail = sendMailFunction("../htmlTemplate/createRequestClient.html", $word, "adminSupport@kaeserservicios.com", "Soporte Aplicacion Kaeser", $data->correo, "KAESER SERVICE - Solicitud de Usuario ");


        if ($response) {
            $db->commit();
            $common->response200(array("message" => "solicitudes was Created", "id" => $result["id"]));
        } else {
            $db->rollBack();
            $common->response503("Unable to create solicitudes.");
        }
    } else {
        $common->response503("Unable to create solicitudes.");
    }
} else {
    $common->response404("Unable to create solicitudes. Data is incomplete.");
}
