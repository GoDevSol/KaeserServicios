<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/commonMail.php';

include_once '../objects/solicitudes.php';
include_once '../objects/user.php';

$solicitud = new Solicitudes($db);

$user = new User($db);



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

$user->getCompania();
$user->getTotalUsuarios();
