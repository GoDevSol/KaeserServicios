<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/validateToken.php';

$validate = validateToken($data->jwt, $key);

$common->response200(array(
    "message" => "Access granted.",
    "data" => $validate['data']
));
