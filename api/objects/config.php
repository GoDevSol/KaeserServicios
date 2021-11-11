<?php
include_once '../config/common.php';
class Configuracion
{
    // DB connection y table name
    public $conn;
    public $table_name = "configuracion";
    public Common $common;

    // object properties
    public $id;
    public $configuracion;
    public $valor;


    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->common = new Common();
    }

    // read all
    function read()
    {
        return $this->common->read("*", "", "", $this, "");
    }

    function readByconf($conf)
    {
        $whereParams = "configuracion=";
        $this->configuracion = $conf;
        $data = $this->common->read("*", $whereParams, "", $this, "");
        return $data["data"][0]["valor"];
    }



    function updateConf()
    {
        $updateParams = "valor";
        $whereParams = "id=";
        $this->estado = 1;

        return $this->common->update($updateParams, $whereParams, $this);
    }
}
