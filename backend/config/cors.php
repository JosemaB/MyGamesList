<?php
// Si es una solicitud OPTIONS, responde con los encabezados CORS
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    header("Access-Control-Allow-Origin: http://localhost:5500"); // Permite el acceso desde tu frontend
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Métodos permitidos
    header("Access-Control-Allow-Headers: Content-Type, Authorization"); // Cabeceras permitidas
    exit(); // Termina la ejecución para evitar que continúe procesando la solicitud OPTIONS
}

header("Access-Control-Allow-Origin: http://localhost:5500");  // Permite el acceso desde tu frontend
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");  // Métodos permitidos
header("Access-Control-Allow-Headers: Content-Type, Authorization, XDEBUG_SESSION");  // Cabeceras permitidas


