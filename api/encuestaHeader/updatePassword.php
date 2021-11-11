<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/validateToken.php';
include_once '../common/commonIncludeJWT.php';
include_once '../objects/userWeb.php';

use \Firebase\JWT\JWT;

$user = new UserWeb($db);

if (!empty($data->password)  && !empty($data->passwordConfirm) && !empty($data->passwordOld) && !empty($data->jwt)) {

    $validate = validateToken($data->jwt, $key);

    if ($validate['status'] == true) {

        $jwtData = $validate['data'];
        $user->id =  $jwtData->id;
        $user->loadId();

        if (password_verify($data->passwordOld, $user->password)) {

            if ($data->password == $data->passwordConfirm) {
                $user->password = password_hash($data->password, PASSWORD_BCRYPT);
                $user->updatePassword();

                $common->response200(array("message" => true));
            } else {
                $common->response404("FATAL ERROR");
            }
        } else {
            $common->response404("Las contraseñas no coinciden.");
        }
    } else {
        $common->response404("La contraseña actual no coincide.");
    }
} else {

    $common->response404("Data is incomplete.");
}
