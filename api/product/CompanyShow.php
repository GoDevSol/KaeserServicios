<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../objects/productos.php';

$product = new Producto($db);
$productResult = $product->getAllCompany();

if ($productResult["success"] == true) {
    $common->response200(array("data" => $productResult["data"]));
} else {
    $common->response404("No data found.");
}
