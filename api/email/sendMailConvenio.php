<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/commonMail.php';
include_once '../objects/config.php';

if (
    !empty($data->nombre) &&    !empty($data->apellido) &&    !empty($data->compania) &&    !empty($data->correo) &&    !empty($data->body) &&    !empty($data->telefono)
) {


    $word = array();
    $word["nombrePersona"] = $data->nombre . " " . $data->apellido;
    $word["nombreCompania"] = $data->compania;
    $word["correo"] = $data->correo;
    $word["telefono"] = $data->telefono;

    $configuracion = new Configuracion($db);
    $configuracionResult = $configuracion->readByconf("correoConvenios");

    $responseEmail = sendMailFunction("../htmlTemplate/cotizacion.html", $word, "adminSupport@kaeserservicios.com", "Soporte Aplicacion Kaeser", $configuracionResult, "KAESER SERVICE - Convenios de Mantenimiento ");

    if ($responseEmail) {

        $common->response200(array("message" => "Se ha enviado el correo exitosamente"));
    } else {
        $common->response503(array("message" => "No se pudo mandar el correo."));
    }
} else {
    $common->response404("Datos incompletos.");
}
