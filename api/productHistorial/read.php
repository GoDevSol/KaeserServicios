<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../objects/productosHistorial.php';


$historial = new ProductoHistorial($db);

if (
    !empty($data->equipment)
) {
    $common->inputMappingObj($data, $historial);
    $result = $historial->readByEquipment();

    if ($result["success"] == true) {
        $common->response200(array("data" => $result["data"]));
    } else {
        $common->response404("No data found.");
    }
} else {
    $common->response404("Unable to create solicitudes. Data is incomplete.");
}
