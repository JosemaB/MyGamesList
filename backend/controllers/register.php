<?php
include '../config/cors.php';  // Incluye CORS para poder ahcer la conexion con mi frontend

// Obtener los datos enviados en formato JSON
$datos = json_decode(file_get_contents('php://input'), true);

// Acceder a los datos
$nombre = $datos['email'];
$edad = $datos['password'];

// Procesar y devolver respuesta (en formato JSON)
$response = [
    'mensaje' => "Hola $nombre, tienes $edad años.",
    'status' => 'exitoso'
];

//Procesar datos antes de inciar sesion



// Enviar la respuesta como JSON
echo json_encode($response);