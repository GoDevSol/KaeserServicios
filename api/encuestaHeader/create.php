<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/validateToken.php';
include_once '../objects/encuestaHeader.php';

$encuesta = new EncuestaHeader($db);

$validate = validateToken($data->jwt, $key);


if (
    !empty($data->nombre)  && !empty($data->objetivo)
    && $validate['status'] == true
) {



    $db->beginTransaction();

    $jwtData = $validate['data'];

    $encuesta->creadorUsuario = $jwtData->id;
    $encuesta->estado = 1;

    $common->inputMappingObj($data, $encuesta);

    $resultEncuesta = $encuesta->create();

    if ($resultEncuesta["success"] == true) {
        $db->commit();
        $common->response200(array("message" => "encuesta was created", "id" => $resultEncuesta["id"]));
    } else {
        $db->rollback();
        $common->response503("Unable create encuesta.");
    }
} else {

    $common->response404("Data is incomplete.");
}
