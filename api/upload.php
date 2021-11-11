<?php
include_once './common/commonHeaderPOST.php';
include_once './common/commonInclude.php';
include_once './objects/productos.php';




$errorHandler = true;
$db->beginTransaction();
if (($handle     =   fopen($_FILES['file']['tmp_name'], 'r')) !== FALSE) {
    while (($row =   fgetcsv($handle, 1000, ";")) !== FALSE) {

        $row[0] = str_replace(chr(239), '', $row[0]);
        $row[0] = str_replace(chr(187), '', $row[0]);
        $row[0] = str_replace(chr(191), '', $row[0]);




        if (is_numeric($row[2])) {
            $producto = new Producto($db);

            $row[8] = str_replace("/", "-", $row[8]);
            $row[6] = str_replace("/", "-", $row[6]);

            $row[6] = date("Y-m-d", strtotime($row[6]));
            $row[8] = date("Y-m-d", strtotime($row[8]));

            $producto->soldToParty = $row[0];
            $producto->cliente = $row[1];
            $producto->equipment = $row[2];
            $producto->categoria = $row[3];
            $producto->equipo = $row[4];
            $producto->penultimoHorometro = $row[5];
            $producto->fechaPenultimoHorometro = $row[6];
            $producto->ultimoHorometro = $row[7];
            $producto->fechaUltimoHorometro = $row[8];


            $result = $producto->readByCompany();

            if ($result["success"]) {
                $producto->cantidadDeUsuarios =  $result["data"][0]["cantidadDeUsuarios"];
            } else {
                $producto->cantidadDeUsuarios = 5;
            }


            try {
                $producto->create();
            } catch (\Throwable $th) {
                try {
                    $producto->updateSoldParty();
                } catch (\Throwable $th) {

                    $errorHandler == false;
                    echo $th;
                }
            }
        }
    }

    fclose($handle);

    if ($errorHandler == true) {
        $db->commit();
    } else {
        $db->rollBack();
    }
}
