<?php
include_once '../../config/ConexionBdd.php';  //Para la conexion de la base de datos MyGamesList
include_once '../../config/cors.php';  // Incluye CORS para poder hacer la conexion con mi frontend
include_once '../../helpers/funciones.php';

try {
    // Obtener los datos enviados en formato JSON
    $datos = json_decode(file_get_contents('php://input'), true);
    if ($datos) {
        //Creamos la conexion ya con los campos validados
        $baseDeDatos = new ConexionBdd();
        $conexion = $baseDeDatos->getConnection();
        
        //Validar los campos steam ...
        
        $idUsuario = $datos['idUsuario'];
        $sobremi = $datos['sobremi'];
        $steam = $datos['steam'];
        $youtobe = $datos['youtobe'];
        $discord = $datos['discord'];

        // Verificar si el usuario existe
        $sql_check_list = "SELECT * FROM usuarios WHERE id_usuario = ?";
        $stmt = $conexion->prepare($sql_check_list);
        $stmt->bind_param("i", $idUsuario);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows === 0) {
            $error = "El usuario no existe";
        } else {

            // Consulta SQL para actualizar los campos
            $sql = "UPDATE usuarios SET sobremi = ?, steam = ?, youtobe = ?, discord = ? WHERE id_usuario = ?";
            $stmt = $conexion->prepare($sql);
            $stmt->bind_param("ssssi", $sobremi, $steam, $youtobe, $discord, $id_usuario);

            // Ejecutar la consulta
            if ($stmt->execute()) {
                $exito = "Los datos se han actualizado correctamente.";
            } else {
                $error = "Error al actualizar los datos: " . $stmt->error;
            }
            // Cerrar conexión
            $stmt->close();

        }

        $conexion->close();
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