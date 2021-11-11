<?php
include_once '../config/common.php';
class EncuestaHeader
{
    // DB connection y table name
    public $conn;
    public $table_name = "encuestaHeader";
    public Common $common;

    // object properties
    public $id;
    public $nombre;
    public $estado;
    public $creadorUsuario;
    public $objetivo;
    public $preguntas;


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

    function create()
    {
        $insertParams = "nombre,estado,creadorUsuario,objetivo";
        return $this->common->create($insertParams, $this);
    }

    function updatePreguntas()
    {
        $updateParams = "preguntas";
        $whereParams = "id=";
        return $this->common->update($updateParams, $whereParams, $this);
    }





    function getCompanyCantidad()
    {
        $whereParams = "soldToParty=";
        $result = $this->common->read("DISTINCT soldToParty,cantidadDeUsuarios", $whereParams, " 1 DESC", $this, "");
        return $result["data"][0]["cantidadDeUsuarios"];
    }

    function readByCompany()
    {
        $whereParams = "soldToParty=";
        return $this->common->read(
            "*",
            $whereParams,
            " 1 DESC",
            $this,
            ""
        );
    }

    function readByCompanyAndEquipment()
    {
        $whereParams = "soldToParty=,equipment=";
        return $this->common->read(
            "*",
            $whereParams,
            " 1 DESC",
            $this,
            ""
        );
    }

    function readByEquipment()
    {
        $whereParams = "equipment=";
        return $this->common->readReturnObject("*", $whereParams, " 1 DESC", $this, "");
    }

    function readByEquipmentResponse()
    {
        $whereParams = "equipment=";
        return $this->common->read(
            "*",
            $whereParams,
            " 1 DESC",
            $this,
            ""
        );
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
}
