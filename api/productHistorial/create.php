<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../objects/productosHistorial.php';
include_once '../objects/productos.php';
include_once '../common/commonMail.php';

$historial = new ProductoHistorial($db);

$producto = new Producto($db);
error_reporting(0);


if (!empty($data->id)  && !empty($data->fecha) && !empty($data->horo)) {

    $producto->equipment = $data->id;

    $common->inputMappingObj($producto->readByEquipment(), $producto);
    $common->inputMappingObj($producto->readByEquipment(), $historial);

    $historial->ultimoHorometro = $producto->ultimoHorometro;
    $historial->fechaUltimoHorometro = $producto->fechaUltimoHorometro;

    $producto->fechaPenultimoHorometro = $producto->fechaUltimoHorometro;
    $producto->penultimoHorometro = $producto->ultimoHorometro;

    $producto->fechaUltimoHorometro = $data->fecha;
    $producto->ultimoHorometro = $data->horo;

    $db->beginTransaction();


    try {
        $respuesta = $historial->create();

        $producto->updateHorometro();

        $db->commit();

        $common->response200($respuesta);
    } catch (\Throwable $th) {
        $db->rollBack();
    }
} else {
    $common->response404("Unable to create solicitudes. Data is incomplete.");
}
