<?php
include_once '../config/ConexionBdd.php';  //Para la conexion de la base de datos MyGamesList
include_once '../config/cors.php';  // Incluye CORS para poder hacer la conexion con mi frontend
include_once '../helpers/funciones.php';

try {
    // Obtener los datos enviados en formato JSON
    $datos = json_decode(file_get_contents('php://input'), true);
    if ($datos) {

        $email = validarCadena($datos['email']);
        //Creamos la conexion ya con los campos validados
        $baseDeDatos = new ConexionBdd();
        $conexion = $baseDeDatos->getConnection();

        //Aqui se comprueba si el usuario existe
        $consultaUsuario = $conexion->prepare("select contrasena from usuarios where email = ?");
        $consultaUsuario->bind_param("s", $email);
        $consultaUsuario->execute();
        $usuarioExiste = $consultaUsuario->get_result();
        $usuarioResultado = $usuarioExiste->fetch_assoc();

        if ($usuarioExiste->num_rows !== 0) {
            if (password_verify($datos['password'], $usuarioResultado["contrasena"])) {
                $exito = "Usuario dentro de la sesion";
                //Faltaria crear cookeis y agregar sesion
            } else {
                $error = 'Error. Usuario o Contraseña incorrectos';
            }
            //Para mandar un mensaje mas correcto
        } else {
            $error = "El correo electrónico ingresado no está asociado a ninguna cuenta, regístrate para acceder";
        }
        //Cerramos la conexion
        $baseDeDatos->closeConnection();
    } else {
        $error = "Datos no encontrados";
    }
} catch (Exception $ex) {
    $error = $ex->getMessage();
}

// Si hay error, los devolvemos como JSON y detenemos la ejecución
if (isset($error)) {
    echo json_encode(["success" => false, "error" => $error]);
} else if (isset($exito)) {
    // Si todo está bien, continuamos con el registro
    echo json_encode(["success" => true, "exito" => $exito]);
}
exit();
