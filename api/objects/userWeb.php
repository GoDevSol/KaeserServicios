<?php
include_once '../config/common.php';
class UserWeb
{
    // database connection and table name
    public $conn;
    public $table_name = "userweb";
    public Common $common;

    // object properties
    public $id;
    public $tipo;
    public $nombres;
    public $correo;
    public $user;
    public $password;


    public function __construct($db)
    {
        $this->conn = $db;
        $this->common = new Common();
    }


    function readAll()
    {
        return $this->common->read("*", "", "", $this, "");
    }

    function getUser()
    {
        return $this->common->read("*", "id=", "", $this, "");
    }


    function create()
    {
        $insertParams = "tipo,nombres,correo,user,password";
        $this->password = password_hash($this->password, PASSWORD_BCRYPT);
        return $this->common->create($insertParams, $this);
    }

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

    function loadId()
    {
        $result = $this->common->read("*", "id", "", $this, "");

        if ($result["success"] == true) {
            $this->common->inputMappingObj((object) $result["data"][0], $this);
            return true;
        } else {
            return false;
        }
    }

    function deteleBySolicitud()
    {
        $whereParams = "id_Solicitud=";
        return $this->common->delete($whereParams, $this);
    }

    function updateUser()
    {
        $updateParams = "tipo,nombres,correo";
        $whereParams = "id=";
        $this->estado = -1;

        return $this->common->update($updateParams, $whereParams, $this);
    }

    function updatePassword()
    {
        $updateParams = "password";
        $whereParams = "id=";

        return $this->common->update($updateParams, $whereParams, $this);
    }

    function deteleById()
    {
        $whereParams = "id=";
        return $this->common->delete($whereParams, $this);
    }
}
