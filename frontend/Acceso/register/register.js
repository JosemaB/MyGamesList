import { alertDanger, alertSuccess } from "../../js/funciones.js";

document.addEventListener('DOMContentLoaded', iniciarLogin);

function iniciarLogin() {
    document.getElementById('checkbox').addEventListener('click', mostrarPassword);

    // Obtener la URL de la página anterior
    let referrer = document.referrer;

    // Verificar si la URL anterior pertenece al mismo dominio
    if (referrer.includes(window.location.hostname)) {

        if (referrer.includes('/Acceso/register/register.html')) {
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

    formulario.addEventListener('submit', async (e) => {
        // Evita que el formulario se envíe de manera predeterminada
        e.preventDefault();

        // Obtener todos los campos del formulario
        const camposRegister = [formulario.email, formulario.usuario, formulario.password, formulario.confirmPassword];

        // Limpiar el estilo de error antes de la validación
        camposRegister.forEach(campo => campo.classList.remove('error'));

        let hayErrores = false; //Para saber si tiene el formulario errores antes de pasarlo al backend
        // Validar si los campos están vacíos y aplicar el estilo de error
        camposRegister.forEach(campo => {
            if (campo.value.trim() === "") {
                campo.classList.add('error');
                hayErrores = true;
            }
        });

        const alertaDiv = document.getElementById('alertas');
        const existeAlerta = alertaDiv.querySelector('.alert');
        if (existeAlerta) {
            existeAlerta.remove();
        }

        // Validar campos vacíos
        if (hayErrores) {
            alertaDiv.appendChild(alertDanger("Por favor, completa todos los campos"));
        } else {
            //Submit backend
            const datos = await enviarDatos(camposRegister[0].value, camposRegister[1].value, camposRegister[2].value, camposRegister[3].value);

            if (!datos["success"]) {
                alertaDiv.appendChild(alertDanger(datos["error"]));

            } else if (datos["success"]) { //Lo compruebo asi sin else por si falla los datos y no hacerlo aunque haya generado error
                alertaDiv.appendChild(alertSuccess(datos["exito"]));
                document.getElementById('crearCuentaBtn').style.display = 'none';

                // Redirigir al login después de 4 segundos
                setTimeout(() => {
                    window.location.href = "../login/login.html";
                }, 4000);
            }
        }

    });
    async function enviarDatos(email, usuario, password, confirmPassword) {
        const datos = {
            email: email,
            usuario: usuario,
            password: password,
            confirmPassword: confirmPassword
        };
        try {
            // Enviar datos usando fetch
            const response = await fetch('http://localhost:3000/backend/controllers/register.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(datos) // Enviamos los datos como JSON
            });

            // Verificamos si la respuesta es correcta
            if (!response.ok) {
                throw new Error('Error en la respuesta de PHP');
            }
            // Convertimos la respuesta en JSON
            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    }
    function mostrarPassword() {
        const password = document.querySelector('#password');
        const confirmPassword = document.querySelector('#confirmPassword');
    
        if (password.type === "password") {
            password.type = 'text';
            confirmPassword.type = 'text';
    
        } else {
            password.type = 'password';
            confirmPassword.type = 'password';
        }
    }
}
