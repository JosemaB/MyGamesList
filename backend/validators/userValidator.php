<?php
include_once '../helpers/funciones.php';

function validarCorreo($correo)
{
    $correoSaneado = validarCadena($correo);
    return preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $correoSaneado);
}

/* Contraseña
(?=.*[A-Z]): Asegura que haya al menos una letra mayúscula.

(?=.*[a-z]): Asegura que haya al menos una letra minúscula.

(?=.*\d): Asegura que haya al menos un número.

(?=.[!@#$%^&]): Asegura que haya al menos un carácter especial.

.{6,}: Asegura que la contraseña tenga al menos 6 caracteres de longitud. 
*/
function validarContrasena($contrasena)
{
    $contrasenaSaneada = valdiarConCarateresEspeciales($contrasena);
    return preg_match('/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*?.]).{6,}$/', $contrasenaSaneada);
}