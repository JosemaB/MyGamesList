import { alertDanger, alertSuccess, urlPaginaAnterior, spinner } from "../../js/funciones.js";
document.addEventListener('DOMContentLoaded', iniciarLogin);

function iniciarLogin() {
    document.getElementById('mostrarPassword').addEventListener('click', mostrarPassword);

    /*Selectores*/
    // Obtener el botón del DOM
    let btnClose = document.getElementById('btnClose');
    // Formulario
    const formulario = document.getElementById('miFormulario');
    // Añadir el event listener al botón
    btnClose.addEventListener('click', redirigirInicio);

    formulario.addEventListener('submit', async (e) => {
        e.preventDefault();
        // Obtener todos los campos del formulario
        const camposRecover = [formulario.newPassword, formulario.confirmNewPassword];

        // Limpiar el estilo de error antes de la validación
        camposRecover.forEach(campo => campo.classList.remove('error'));

        let hayErrores = false; //Para saber si tiene el formulario errores antes de pasarlo al backend

        // Validar si los campos están vacíos y aplicar el estilo de error
        camposRecover.forEach(campo => {
            if (campo.value.trim() === "") {
                campo.classList.add('error');
                hayErrores = true;
            }
        });

        const alertaDiv = document.getElementById('alertas');
        //Para que no genere muchas alertas
        borrarAlerta();

        // Validar campos vacíos
        if (hayErrores) {
            alertaDiv.appendChild(alertDanger("Por favor, completa todos los campos"));
        } else {
            //Enviamos al backend los campos
        }

    });

    //Funciones
    function redirigirInicio() {
        // Aqui en este caso redirige al inicio
        let redirectUrl = '../../index.html';
        window.location.href = redirectUrl; // Redirige a la URL almacenada
    }
    //Mostrar contraseñas
    function mostrarPassword() {
        const password = document.querySelector('#newPassword');
        const confirmNewPassword = document.querySelector('#confirmNewPassword');

        if (password.type === "password") {
            password.type = 'text';
            confirmNewPassword.type = 'text';
        } else {
            password.type = 'password';
            confirmNewPassword.type = 'password';

        }
    }
    function borrarAlerta() {
        //Por si la base de datos esta caida para que no salgan muchas alertas hago esto se que es poner lo mismo pero si no me salta muchisimas
        const alertaDiv = document.getElementById('alertas');
        const existeAlerta = alertaDiv.querySelector('.alert');
        if (existeAlerta) {
            existeAlerta.remove();
        }
    }
}