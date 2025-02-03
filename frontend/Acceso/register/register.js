document.addEventListener('DOMContentLoaded', iniciarLogin);

function iniciarLogin() {
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

    formulario.addEventListener('submit', (e) => {
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
            alerta.innerHTML = "Por favor, completa todos los campos";
            errorDiv.appendChild(alerta);
        }else{
            //Submit backend
            enviarDatos(camposRegister[0].value, camposRegister[1].value, camposRegister[2].value, camposRegister[3].value);
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
            console.log('Respuesta de PHP:', data);

        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
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