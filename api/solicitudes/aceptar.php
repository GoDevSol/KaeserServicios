<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/commonMail.php';

include_once '../objects/solicitudes.php';
include_once '../objects/user.php';
include_once '../objects/productos.php';

$solicitud = new Solicitudes($db);
$user = new User($db);
$productos = new Producto($db);

$db->beginTransaction();
if (
    !empty($data->id)
) {

    $common->inputMappingObj($data, $solicitud);
    $input = $common->readReturnObject("*", "id=", "", $solicitud, "");

    $common->inputMappingObj($input, $solicitud);
    $solicitud->compania = $data->name;
    $common->inputMappingObj($input, $user);

    $user->id_Solicitud = $solicitud->id;
    $user->id_Compania = $data->codEmpresa;
    $user->compania = $data->name;
    $user->user = $solicitud->nombre . $solicitud->apellido;
    $user->password = $data->codEmpresa . "Pass";

    $productos->soldToParty = $user->id_Compania;

    if (!($user->getTotalUsuarios() >= $productos->getCompanyCantidad())) {

        $result = $solicitud->updateAccept();
        $result2 = $user->create();


        if ($result["success"] == true && $result2["success"] == true) {

            $word = array();
            $word["nombrePersona"] = $solicitud->nombre . " " . $solicitud->apellido;
            $word["nombreCompania"] = $solicitud->compania;
            $word["user"] = $user->user;
            $word["contra"] = $data->codEmpresa . "Pass";

            $responseEmail = sendMailFunction("../htmlTemplate/acceptRequest.html", $word, "adminSupport@kaeserservicios.com", "Soporte Aplicacion Kaeser", $solicitud->correo, "KAESER SERVICE - Creacion de Usuario ");

            if ($responseEmail) {
                $db->commit();
                $common->response200(array("message" => "solicitudes was modified", "id" => $result["id"]));
            } else {
                $db->rollBack();
                $common->response503("Unable to modified.");
            }
        } else {
            $common->response503("Unable to modified solicitudes.");
        }
    } else {


        $word = array();
        $word["nombrePersona"] = $solicitud->nombre . " " . $solicitud->apellido;
        $word["nombreCompania"] = $solicitud->compania;

        $responseEmail = sendMailFunction("../htmlTemplate/acceptRequestFail.html", $word, "adminSupport@kaeserservicios.com", "Soporte Aplicacion Kaeser", $solicitud->correo, "KAESER SERVICE - Creacion de Usuario Fallida ");

        $common->response503("Unable to modified solicitudes.");
    }
} else {
    $common->response404("Unable to modified solicitudes. Data is incomplete.");
}
