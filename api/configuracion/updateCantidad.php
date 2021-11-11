<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include '../common/commonMail.php';

include_once '../objects/productos.php';
error_reporting(0);
$product = new Producto($db);

$db->beginTransaction();

if (
    !empty($data->soldToParty)
) {
    $common->inputMappingObj($data, $product);

    $result = $product->updateCantidad();

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
