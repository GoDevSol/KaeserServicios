<?php
include_once '../common/commonHeaderGET.php';
include_once '../common/commonInclude.php';
include_once '../objects/config.php';

$configuracion = new Configuracion($db);
$configuracionResult = $configuracion->read();

if ($configuracionResult["success"] == true) {
    $common->response200(array("data" => $configuracionResult["data"]));
} else {
    $common->response404("No data found.");
}
