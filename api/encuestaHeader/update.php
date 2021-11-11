<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/validateToken.php';
include_once '../objects/encuestaHeader.php';

$encuesta = new EncuestaHeader($db);

if (!empty($data->id)  && !empty($data->preguntas)) {

    $db->beginTransaction();

    $common->inputMappingObj($data, $encuesta);

    $resultEncuesta = $encuesta->updatePreguntas();

    if ($resultEncuesta["success"] == true) {
        $db->commit();
        $common->response200(array("message" => "encuesta was updated", "id" => $resultEncuesta["id"]));
    } else {
        $db->rollback();
        $common->response503("Unable update encuesta.");
    }
} else {

    $common->response404("Data is incomplete.");
}
