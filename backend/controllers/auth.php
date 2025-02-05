<?php
include_once '../config/ConexionBdd.php';  //Para la conexion de la base de datos MyGamesList
include_once '../config/cors.php';  // Incluye CORS para poder hacer la conexion con mi frontend
include_once '../validators/userValidator.php';
include_once '../helpers/funciones.php';

// Obtener los datos enviados en formato JSON
$datos = json_decode(file_get_contents('php://input'), true);
if ($datos) {
    $email = validarCadena($datos['email']);

    //Creamos la conexion ya con los campos validados
    $baseDeDatos = new ConexionBdd();
    $conexion = $baseDeDatos->getConnection();

    try {
        //Buscar otro tipos de inriptacion en el siguiente dia
        //Aqui se comprueba si el usuario existe
        $consultaUsuario = $conexion->prepare("select contrasena from usuarios where email = ?");
        $consultaUsuario->bind_param("s", $email);
        $consultaUsuario->execute();
        $usuarioExiste = $consultaUsuario->get_result();
        $usuarioResultado = $usuarioExiste->fetch_assoc();

        if ($usuarioExiste->num_rows !== 0) {
            if (password_verify($datos['password'], $usuarioResultado["contrasena"])) {
                $exito = "Usuario dentro de la sesion";
            } else {
                $error = 'Error. Usuario o Contraseña incorrectos';
            }
            //Para mandar un mensaje mas correcto
        } else {
            $error = "El usuario que quieres inicar sesion no existe(Crea tu cuenta para poder iniciar sesion)";
        }
    } catch (Exception $ex) {
        echo $ex->getMessage();
    }

}

// Si hay error, los devolvemos como JSON y detenemos la ejecución
if (isset($error)) {
    echo json_encode(["success" => false, "error" => $error]);
} else if (isset($exito)) {
    // Si todo está bien, continuamos con el registro
    echo json_encode(["success" => true, "exito" => $exito]);
}
