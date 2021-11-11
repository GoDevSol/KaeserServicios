<?php
include_once '../common/commonHeaderGET.php';
include_once '../common/commonInclude.php';
include_once '../objects/encuestaHeader.php';

$encuesta = new EncuestaHeader($db);
$encuestaResult = $encuesta->readAll();

if ($encuestaResult["success"] == true) {
    $common->response200(array("data" => $encuestaResult["data"]));
} else {
    $common->response404("No data found.");
}
