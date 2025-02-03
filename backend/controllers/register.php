<?php
include_once '../config/cors.php';  // Incluye CORS para poder hacer la conexion con mi frontend
include_once '../validators/userValidator.php';
include_once '../helpers/funciones.php';


// Obtener los datos enviados en formato JSON
$datos = json_decode(file_get_contents('php://input'), true);

if ($datos) { //Vemos si sexite los datos
    try {
        $email = $datos['email'];
        $usuario = $datos['usuario'];
        $password = $datos['password'];
        $confirmPassword = $datos['confirmPassword'];

        //Validamos los datos antes de la inserccion en la bdd
        if (!validarCorreo($email)) {
            $errores["email"] = "El correo electrónico no es válido";
        }
        if (!validarCadena($usuario)) {
            $errores["usuario"] = "El nombre de usuario no es válido";
        }
        if (!validarContrasena($password)) {
            $errores["password"] = "La contraseña debe cumplir con los siguientes requisitos: 6 caracteres, mayúscula, minúscula, número y un carácter especial";
        }
        if (!validarContrasena($confirmPassword) || $confirmPassword != $password) {
            $errores["confirmPassword"] = "Las contraseñas no coinciden, por favor verifica y vuelve a intentarlo";
        }

        if (!isset($errores)) {//Seguiriamos si no tuvieramos errores
            //Consultariamos si el usuario existe
            $response = "Datos validos";

        } else {
            $response = $errores;
        }

        echo json_encode($response);
    } catch (Exception $e) {
        $errores = $e->getMessage();
    }
}
