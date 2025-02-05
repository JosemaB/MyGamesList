<?php
include_once '../config/ConexionBdd.php';  //Para la conexion de la base de datos MyGamesList
include_once '../config/cors.php';  // Incluye CORS para poder hacer la conexion con mi frontend
include_once '../validators/userValidator.php';

$datos = json_decode(file_get_contents('php://input'), true);
if ($datos) {
    //Comprobar si ese correo existe en al bdd antes de hacer mas cosas
}
echo json_encode("hola");
