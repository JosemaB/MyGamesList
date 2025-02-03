<?php
function validarCadena($cadena) {
    $cadena = trim($cadena); // Eliminar espacios en blanco al inicio y al final
    $cadena = stripslashes($cadena); // Eliminar barras invertidas
    $cadena = htmlspecialchars($cadena); // Convertir caracteres especiales a entidades HTML
    return $cadena;
}
function valdiarConCarateresEspeciales($cadena){
    $cadena = trim($cadena); // Eliminar espacios en blanco al inicio y al final
    $cadena = stripslashes($cadena); // Eliminar barras invertidas
    return $cadena;
}