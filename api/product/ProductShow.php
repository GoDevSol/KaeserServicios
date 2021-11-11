
<?php
include_once '../common/commonHeaderPOST.php';
include_once '../common/commonInclude.php';
include_once '../common/validateToken.php';
include_once '../objects/productos.php';

$product = new Producto($db);

$validate = validateToken($data->jwt, $key);

if ($validate['status'] == true) {
    $jwtData = $validate['data'];
    $product->soldToParty = $jwtData->id_Compania;
    $productResult = $product->readByCompany();
    $index = 0;


    foreach ($productResult['data'] as $valor) {

        foreach ($valor as $arrayClave => $arrayValue) {
            $valor[ucfirst($arrayClave)] = $valor[$arrayClave];
            unset($valor[$arrayClave]);
        }
        $valor['Color'] = "danger";
        $valor['Value'] = 0.95;
        $valor['Message'] = "Tu <strong>" . $valor['Categoria'] . " " . $valor['Equipo'] . "</strong> esta a un <strong>" . "100" . "%</strong> de uso.";

        $productResult['data'][$index] = $valor;
        $index++;
    }
    $productResult['records'] = $productResult['data'];
    unset($productResult['data']);

    $common->response200($productResult);
} else {
    $common->response404("Unable to get product. Data is incorrect.");
}
