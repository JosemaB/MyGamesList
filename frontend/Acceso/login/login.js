document.addEventListener('DOMContentLoaded', iniciarLogin);

function iniciarLogin() {
    // Obtener la URL de la página anterior
    let referrer = document.referrer;

    // Verificar si la URL anterior pertenece al mismo dominio
    if (referrer.includes(window.location.hostname)) {
        // Si la página de referencia es el login, redirigir al inicio
        if (referrer.includes('/Acceso/login/login.html')) {
            localStorage.setItem('redirectUrl', '../../index.html');
        } else {
            // Si es una página interna diferente al login, guardarla para redirección
            localStorage.setItem('redirectUrl', referrer);
        }
    } else {
        // Si es una página externa, redirigir al inicio
        localStorage.setItem('redirectUrl', '../../index.html');
    }

    /*Selectores*/
    // Obtener el botón del DOM
    let btnClose = document.getElementById('btnClose');

    // Selecciona el formulario por su ID
    const formulario = document.getElementById('miFormulario');

    // Añadir el event listener al botón
    btnClose.addEventListener('click', redirigirPaginaAnterior);

    // Función que se ejecuta al hacer clic en el botón
    function redirigirPaginaAnterior() {
        // Recuperar la URL de redirección almacenada
        let redirectUrl = localStorage.getItem('redirectUrl') || '/inicio';
        window.location.href = redirectUrl; // Redirige a la URL almacenada
    }

    formulario.addEventListener('submit', (e) => {
        // Evita que el formulario se envíe de manera predeterminada
        e.preventDefault();

        // Obtener todos los campos del formulario
        const campos = [formulario.email, formulario.password];

        // Limpiar el estilo de error antes de la validación
        campos.forEach(campo => campo.classList.remove('error'));

        let hayErrores = false; //Para saber si tiene el formulario errores antes de pasarlo al backend
        // Validar si los campos están vacíos y aplicar el estilo de error
        campos.forEach(campo => {
            if (campo.value.trim() === "") {
                campo.classList.add('error');
                hayErrores = true;
            }
        });

        const errorDiv = document.getElementById('errores');
        const existeAlerta = errorDiv.querySelector('.alert-danger');
        if (existeAlerta) {
            existeAlerta.remove();
        }
        // Crear el div de la alerta
        const alerta = document.createElement("div");

        // Agregar clases de Bootstrap
        alerta.classList.add("alert", "alert-danger");
        alerta.setAttribute("role", "alert");
        alerta.style.margin = '0';

        // Validar campos vacíos
        if (hayErrores) {
            alerta.innerHTML = "El correo y la contraseña son obligatorios";
            errorDiv.appendChild(alerta);
        }

        //Submit backend

    });
}
function mostrarPassword() {
    const password = document.querySelector('#password');
    if (password.type === "password") {
        password.type = 'text';
    } else {
        password.type = 'password';
    }
}
