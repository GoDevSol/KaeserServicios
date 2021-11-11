<?php
include_once __DIR__ . '/../config/common.php';
class Producto
{
    // DB connection y table name
    public $conn;
    public $table_name = "productos";
    public Common $common;

    // object properties
    public $soldToParty;
    public $cliente;
    public $equipment;
    public $categoria;
    public $equipo;
    public $penultimoHorometro;
    public $fechaPenultimoHorometro;
    public $ultimoHorometro;
    public $fechaUltimoHorometro;
    public $cantidadDeUsuarios;


    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->common = new Common();
    }


    function readAll()
    {
        $whereParams = "";
        return $this->common->read("soldToParty,cliente,equipment,categoria,equipo,penultimoHorometro,date_format(fechaPenultimoHorometro, '%d-%m-%Y ') as fechaPenultimoHorometro,ultimoHorometro,date_format(fechaUltimoHorometro, '%d-%m-%Y ') as fechaUltimoHorometro,cantidadDeUsuarios", $whereParams, " 1 DESC", $this, "");
    }

    function readByCompany()
    {
        $whereParams = "soldToParty=";
        return $this->common->read("*", $whereParams, " 1 DESC", $this, "");
    }

    function readByCompanyAndEquipment()
    {
        $whereParams = "soldToParty=,equipment=";
        return $this->common->read("*", $whereParams, " 1 DESC", $this, "");
    }

    function readByEquipment()
    {
        $whereParams = "equipment=";
        return $this->common->readReturnObject("*", $whereParams, " 1 DESC", $this, "");
    }

    function readByEquipmentResponse()
    {
        $whereParams = "equipment=";
        return $this->common->read("*", $whereParams, " 1 DESC", $this, "");
    }

    function getAllCompany()
    {
        return $this->common->read("DISTINCT soldToParty,cliente,cantidadDeUsuarios", "", " 1 DESC", $this, "");
    }

    function updateCantidad()
    {
        $updateParams = "cantidadDeUsuarios";
        $whereParams = "soldToParty=";
        return $this->common->update($updateParams, $whereParams, $this);
    }

    function updateHorometro()
    {
        $updateParams = "penultimoHorometro,fechaPenultimoHorometro,ultimoHorometro,fechaUltimoHorometro";
        $whereParams = "equipment=";
        return $this->common->update($updateParams, $whereParams, $this);
    }

    function updateSoldParty()
    {
        $updateParams = "soldToParty,cliente,cantidadDeUsuarios";
        $whereParams = "equipment=";
        return $this->common->update($updateParams, $whereParams, $this);
    }

    function create()
    {

        $insertParams = "soldToParty,cliente,equipment,categoria,equipo,penultimoHorometro,fechaPenultimoHorometro,ultimoHorometro,fechaUltimoHorometro,cantidadDeUsuarios";
        return $this->common->create($insertParams, $this);
    }

    function getCompanyCantidad()
    {
        $whereParams = "soldToParty=";
        $result = $this->common->read("DISTINCT soldToParty,cantidadDeUsuarios", $whereParams, " 1 DESC", $this, "");
        return $result["data"][0]["cantidadDeUsuarios"];
    }
}
