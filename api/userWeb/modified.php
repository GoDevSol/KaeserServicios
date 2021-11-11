<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../objects/userWeb.php';

$user = new UserWeb($db);

if (!empty($data->nombres)  && !empty($data->correo) && !empty($data->id)) {
    $common->inputMappingObj($data, $user);

    $result = $user->updateUser();

    $common->response200("User was created.");
} else {

    $common->response404("Data is incomplete.");
}
