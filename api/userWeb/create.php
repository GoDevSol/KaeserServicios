<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/commonMail.php';
include_once '../objects/userWeb.php';

$user = new UserWeb($db);

if (!empty($data->nombres)  && !empty($data->correo)) {
    $db->beginTransaction();
    $common->inputMappingObj($data, $user);

    $user->user = str_replace(" ", "", $data->nombres) . "Kaeser";

    $user->password = "TemporalPass";

    $result = $user->create();

    $word = array();
    $word["user"] = $user->user;
    $word["contra"] = "TemporalPass";

    $responseEmail = sendMailFunction("../htmlTemplate/acceptRequestWeb.html", $word, "adminSupport@kaeserservicios.com", "Soporte Aplicacion Kaeser", $data->correo, "KAESER SERVICE - Creacion de Usuario ");

    if ($responseEmail) {
        $db->commit();
        $common->response200(array("message" => "solicitudes was modified", "id" => $result["id"]));
    } else {
        $db->rollBack();
        $common->response503("Unable to modified.");
    }
} else {

    $common->response404("Data is incomplete.");
}
