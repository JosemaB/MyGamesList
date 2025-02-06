<?php
include_once '../config/ConexionBdd.php';  // Para la conexión de la base de datos MyGamesList
include_once '../config/cors.php';  // Incluye CORS para poder hacer la conexión con mi frontend
include_once '../validators/userValidator.php';
include_once '../../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

$datos = json_decode(file_get_contents('php://input'), true);
try {
    if ($datos) {
        // Comprobar si ese correo existe en la BDD antes de hacer más cosas
        $email = validarCadena($datos['email']);

        // Creamos la conexión ya con los campos validados
        $baseDeDatos = new ConexionBdd();
        $conexion = $baseDeDatos->getConnection();

        // Para saber si existe ese email
        $consultaCorreo = $conexion->prepare("select nombre_usuario from usuarios where email = ?;");
        $consultaCorreo->bind_param("s", $email);
        $consultaCorreo->execute();
        $emailResultado = $consultaCorreo->get_result();

        if ($emailResultado->num_rows > 0) {
            // Enviar el correo usando PHPMailer
            $mail = new PHPMailer(true);
            try {
                // Configuración del servidor SMTP
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'jmabenavides25@gmail.com';  // Cambia esto con tu correo
                $mail->Password = 'geze jlgl xhmz lkuw';  // Usa un token si tienes 2FA activado
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
                $mail->Port = 587;

                // Remitente y destinatario
                $mail->setFrom('jmabenavides25@gmail.com', 'MyGamesList');
                $nombreUsuario = $emailResultado->fetch_assoc();
                $mail->addAddress($email, $nombreUsuario['nombre_usuario']);  // El correo ingresado en el formulario

                //Generamos un token que sea unico para saber si ese ususario recupero esa contraseña
                /*// Generar un token único
                $token = bin2hex(random_bytes(16)); // Esto genera un token de 32 caracteres

                // Establecer la fecha de expiración (1 hora después de la creación)
                $expiresAt = date('Y-m-d H:i:s', strtotime('+1 hour')); // Fecha actual + 1 hora

                // Conectar a la base de datos y hacer la inserción
                $query = "INSERT INTO password_resets (email, token) VALUES (?, ?)";
                $insertToken = $conexion->prepare($query);
                $insertToken->bind_param("ss", $email, $token);
                $insertToken->execute();*/

                // Contenido del correo
                $mail->isHTML(true);
                $mail->Subject = 'Recuperar cuenta MygamesList';
                $mail->Body = 'Este es el cuerpo del correo en formato HTML.';
                $mail->AltBody = 'Este es el cuerpo del correo en texto plano para clientes que no soportan HTML.';

                // Enviar el correo
                $mail->send();
                $exito = "Correo enviado exitosamente.";

            } catch (Exception $e) {
                // Si hay un error con PHPMailer
                $error = "No se pudo enviar el correo. Error: {$mail->ErrorInfo}";
            }
        } else {
            $error = "El correo electrónico ingresado no está asociado a ninguna cuenta";
        }
        // Cerramos la conexión
        $baseDeDatos->closeConnection();
    }
} catch (Exception $e) {
    $error = $e->getMessage();
}

// Si hay error, devolver como JSON
if (isset($error)) {
    echo json_encode(["success" => false, "error" => $error]);
} else if (isset($exito)) {
    // Si todo está bien, devolvemos éxito
    echo json_encode(["success" => true, "exito" => $exito]);
}
?>