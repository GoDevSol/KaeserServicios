<?php
include_once '../common/commonHeaderGET.php';
include_once '../common/commonInclude.php';
include_once '../objects/productos.php';

$producto = new Producto($db);
$productoResult = $producto->readAll();
$index = 0;

foreach ($productoResult['data'] as $valor) {
    $valor['QRCode'] = $common->encrypt($valor["equipment"], "Kaeser");
    $productoResult['data'][$index] = $valor;
    $index++;
}


if ($productoResult["success"] == true) {
    $common->response200(array("data" => $productoResult["data"]));
} else {
    $common->response404("No data found.");
}
