<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../objects/productos.php';


$producto = new Producto($db);
$db->beginTransaction();


if (
    !empty($data->soldToParty) &&    !empty($data->equipment)
) {
    $common->inputMappingObj($data, $producto);
    $result = $producto->readByCompanyAndEquipment();

    if ($result["success"] == true) {
        $common->response200(array("data" => $result["data"]));
    } else {
        $common->response404("No data found.");
    }
} else {
    $common->response404("Unable to create solicitudes. Data is incomplete.");
}
