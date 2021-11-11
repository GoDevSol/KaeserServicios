<?php
include_once '../config/common.php';
class ProductoHistorial
{
    // DB connection y table name
    public $conn;
    public $table_name = "productoshistorial";
    public Common $common;

    // object properties
    public $soldToParty;
    public $cliente;
    public $equipment;
    public $categoria;
    public $equipo;
    public $ultimoHorometro;
    public $fechaUltimoHorometro;


    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->common = new Common();
    }


    function readAll()
    {
        $whereParams = "";
        return $this->common->read("*", $whereParams, " 1 DESC", $this, "");
    }

    function readByEquipment()
    {
        $whereParams = "equipment=";
        return $this->common->read("*", $whereParams, " 1 DESC", $this, "");
    }

    function create()
    {
        $insertParams = "soldToParty,cliente,equipment,categoria,equipo,ultimoHorometro,fechaUltimoHorometro";
        return $this->common->create($insertParams, $this);
    }

    function updateCantidad()
    {
        $updateParams = "cantidadDeUsuarios";
        $whereParams = "soldToParty=";
        return $this->common->update($updateParams, $whereParams, $this);
    }
}
