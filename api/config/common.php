<?php
class Common
{
    //FUNCTION SELECT
    public function createSelectQuery($fields, $table, $where, $orderBy, $limit)
    {
        $str = "";
        if (!empty($where)) {
            $where =  $this->concatenarBind($str, $where, true);
        } else {
            $where = " 1 = 1";
        }
        if (!empty($orderBy)) {
            $orderBy = " ORDER BY " . $orderBy;
        }
        $str = "SELECT " . $fields . " FROM " . $table . " WHERE " . $where . $orderBy . $limit;

        return $str;
    }

    function read($select, $where, $order, $clase, $limit)
    {

        $query = $this->createSelectQuery($select, $clase->table_name, $where, $order, $limit);
        $stmt = $clase->conn->prepare($query);

        if (!empty($where)) {
            $where = $this->sanitize($clase, $where);
            $this->bindParameter($stmt, $clase, $where);
        }

        return $this->returnResponse($stmt);
    }


    function readReturnObject($select, $where, $order, $clase, $limit)
    {
        $response = $this->read($select, $where, $order, $clase, $limit);

        return (object)  $response["data"][0];
    }




    //FUNCTION EXIST

    function exist($clase, $where)
    {

        $query = $this->createSelectQuery("*", $clase->table_name, $where, "", "");
        $stmt = $clase->conn->prepare($query);

        if (!empty($where)) {
            $where = $this->sanitize($clase, $where);
            $this->bindParameter($stmt, $clase, $where);
        }

        return $this->returnResponse($stmt)["success"];
    }


    //FUNCTION SELECT PERSONALIZADO

    function readPersonalizado($select, $clase, $arrayParameter)
    {

        $stmt = $clase->conn->prepare($select);

        $this->bindParameterPersonalizado($stmt, $arrayParameter);

        return $this->returnResponse($stmt);
    }

    public function bindParameterPersonalizado($stmt, $parameters)
    {
        foreach ($parameters as $clave => $valor) {
            $stmt->bindParam(":" . $clave, $valor);
        }
    }



    //FUNCTION INSERT

    public function createInsertQuery($table, $parameters)
    {
        $str = "INSERT INTO " . $table . " SET ";
        $str =  $this->concatenarBind($str, $parameters);
        return $str;
    }

    function create($insertParams, $clase)
    {
        $query = $this->createInsertQuery($clase->table_name, $insertParams);
        $stmt = $clase->conn->prepare($query);

        $this->sanitize($clase, $insertParams);

        $this->bindParameter($stmt, $clase, $insertParams);

        if ($stmt->execute()) {
            return array("success" => true, "id" => $clase->conn->lastInsertId());
        } else {
            return array("success" => false, "id" => 0);
        }
    }


    //FUNCTION UPDATE

    public function createUpdateQuery($table, $updateFields, $whereFields)
    {
        $str = "UPDATE " . $table . " SET ";
        $str = $this->concatenarBind($str, $updateFields);
        $str = rtrim($str, ", ") . " WHERE ";
        $str = $this->concatenarBind($str, $whereFields);

        return $str;
    }

    function update($updateParams, $whereParams, $clase)
    {
        $AllParams = $updateParams . "," . $whereParams;
        $query = $this->createUpdateQuery($clase->table_name, $updateParams, $whereParams);

        $stmt = $clase->conn->prepare($query);

        $AllParams = $this->sanitize($clase, $AllParams);
        $this->bindParameter($stmt, $clase, $AllParams);

        if ($stmt->execute()) {
            return array("success" => true, "id" => $clase->id);
        }
        return array("success" => false, "id" => 0);
    }


    //FUNCTION DELETE



    public function createDeleteQuery($table, $whereFields)
    {
        $str = "DELETE FROM " . $table . " WHERE ";
        $str = $this->concatenarBind($str, $whereFields);
        return $str;
    }

    function delete($whereParams, $clase)
    {

        $query = $this->createDeleteQuery($clase->table_name, $whereParams);


        $stmt = $clase->conn->prepare($query);

        $whereParams = $this->sanitize($clase, $whereParams);

        $this->bindParameter($stmt, $clase, $whereParams);

        if ($stmt->execute()) {
            return array("success" => true, "id" => $clase->id);
        }
        return array("success" => false, "id" => 0);
    }





    //FUNCTION COMMON FUNCTIONS

    public function returnResponse($stmt)
    {
        $stmt->execute();

        $num = $stmt->rowCount();
        if ($num > 0) {
            $returnData = $this->statementMappingArray($stmt);
            return array("success" => true, "data" => $returnData);
        } else {
            return array("success" => false, "data" => "");
        }
    }

    public function concatenarBind($variable, $param, $where = false)
    {
        $arrayParam = explode(",", $param);

        foreach ($arrayParam as $valor) {
            $signEqual = explode("=", $valor);
            $signMore = explode(">", $valor);
            $signLess = explode("<", $valor);

            if (count($signEqual) == 2) {
                if ($where) {
                    $variable = $variable .  $signEqual[0] . "=:" . $signEqual[0] . " AND ";
                } else {

                    $variable = $variable .  $signEqual[0] . "=:" . $signEqual[0] . ", ";
                }
            } else if (count($signMore) == 2) {
                if ($where) {
                    $variable = $variable .  $signEqual[0] . ">:" . $signEqual[0] . " AND ";
                } else {

                    $variable = $variable .  $signEqual[0] . ">:" . $signEqual[0] . ", ";
                }
            } else if (count($signLess) == 2) {
                if ($where) {
                    $variable = $variable .  $signEqual[0] . "<:" . $signEqual[0] . " AND ";
                } else {

                    $variable = $variable .  $signEqual[0] . "<:" . $signEqual[0] . ", ";
                }
            } else {
                if ($where) {
                    $variable = $variable .  $signEqual[0] . "=:" . $signEqual[0] . " AND ";
                } else {

                    $variable = $variable .  $valor . "=:" . $valor . ", ";
                }
            }
        }

        if ($where) {
            return rtrim($variable, "AND ");
        } else

            return rtrim($variable, ", ");
    }


    public function objectToResponse($variables, $class)
    {
        $variablesArray = explode(",", $variables);
        $responseArray = array();

        foreach ($variablesArray as $valor) {
            $responseArray[$valor] = $class->$valor;
        }
        return $responseArray;
    }

    public function statementMappingArray($dbResponse)
    {
        $responseArray = array();

        while ($row = $dbResponse->fetch(PDO::FETCH_ASSOC)) {
            $arrayItem = array();
            foreach ($row as $clave => $valor) {
                $arrayItem[$clave] = $valor;
            }
            array_push($responseArray, $arrayItem);
        }

        return $responseArray;
    }

    public function statementMappingObj($dbResponse, $class)
    {
        $num = $dbResponse->rowCount();
        if ($num > 0) {

            $row = $dbResponse->fetch(PDO::FETCH_ASSOC);

            foreach ($row as $clave => $valor) {
                $class->$clave = $valor;
            }
            return true;
        }
        return false;
    }

    public function inputMappingObj($data, $class)
    {
        foreach ($data as $clave => $valor) {
            if (property_exists($class, $clave)) {
                $class->$clave = $data->$clave;
            }
        }
    }



    public function sanitize($class, $parameters)
    {
        $parameters = str_replace("=", "", $parameters);
        $parameters = str_replace(">", "", $parameters);
        $parameters = str_replace("<", "", $parameters);

        $parameterArray = explode(",", $parameters);
        foreach ($parameterArray as $valor) {
            $class->$valor = htmlspecialchars(strip_tags($class->$valor));
        }

        return $parameters;
    }

    public function bindParameter($stmt, $class, $parameters)
    {
        $parameterArray = explode(",", $parameters);
        foreach ($parameterArray as $valor) {
            $stmt->bindParam(":" . $valor, $class->$valor);
        }
    }












    //RESPONSE FUNCTION
    public function response200($Response)
    {
        http_response_code(200);
        echo json_encode($Response);
    }

    public function response404($message)
    {
        http_response_code(404);
        echo json_encode(
            array("message" => $message)
        );
    }

    public function response503($message)
    {
        http_response_code(503);
        echo json_encode(
            array("message" => $message)
        );
    }

    public function encrypt($string, $key)
    {
        $result = '';
        for ($i = 0; $i < strlen($string); $i++) {
            $char = substr($string, $i, 1);
            $keychar = substr($key, ($i % strlen($key)) - 1, 1);
            $char = chr(ord($char) + ord($keychar));
            $result .= $char;
        }
        return base64_encode($result);
    }

    function decrypt($string, $key)
    {
        $result = '';
        $string = base64_decode($string);
        for ($i = 0; $i < strlen($string); $i++) {
            $char = substr($string, $i, 1);
            $keychar = substr($key, ($i % strlen($key)) - 1, 1);
            $char = chr(ord($char) - ord($keychar));
            $result .= $char;
        }
        return $result;
    }
}
