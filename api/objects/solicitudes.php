<?php
include_once '../config/common.php';
class Solicitudes
{
    // DB connection y table name
    public $conn;
    public $table_name = "solicitudes";
    public Common $common;

    // object properties

    public $id;
    public $nombre;
    public $apellido;
    public $compania;
    public $correo;
    public $telefono;
    public $estado;


    // constructor with $db as database connection
    public function __construct($db)
    {
        $this->conn = $db;
        $this->common = new Common();
    }

    // read all
    function readAll()
    {
        return $this->common->read("*", "", "", $this, "");
    }

    function create()
    {
        $insertParams = "nombre,apellido,compania,correo,telefono";

        return $this->common->create($insertParams, $this);
    }


    // update the product
    function updateAccept()
    {
        $updateParams = "estado,compania";
        $whereParams = "id=";
        $this->estado = 1;

        return $this->common->update($updateParams, $whereParams, $this);
    }

    function updateCancel()
    {
        $updateParams = "estado";
        $whereParams = "id=";
        $this->estado = -1;

        return $this->common->update($updateParams, $whereParams, $this);
    }

    function deleteSolicitud()
    {
        $whereParams = "id=";
        return $this->common->delete($whereParams, $this);
    }
}
