<?php
include_once '../config/common.php';
class User
{
    // database connection and table name
    public $conn;
    public $table_name = "user";
    public Common $common;

    // object properties
    public $id;
    public $id_Compania;
    public $id_Solicitud;
    public $nombre;
    public $apellido;
    public $compania;
    public $correo;
    public $telefono;
    public $user;
    public $password;


    public function __construct($db)
    {
        $this->conn = $db;
        $this->common = new Common();
    }

    function create()
    {
        $insertParams = "id_Compania,id_Solicitud,nombre,apellido,compania,correo,telefono,user,password";
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
        return $this->common->create($insertParams, $this);
    }

    // check if given email exist in the database
    function emailExists()
    {
        $result = $this->common->read("*", "user", "", $this, "");

        if ($result["success"] == true) {
            $this->common->inputMappingObj((object) $result["data"][0], $this);
            return true;
        } else {
            return false;
        }
    }


    function getTotalUsuarios()
    {
        $whereParams = "id_Compania=";
        $result = $this->common->read("*", $whereParams, "", $this, "");
        return count($result["data"]);
    }
}
