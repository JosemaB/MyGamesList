document.addEventListener('DOMContentLoaded', iniciarLogin);

function iniciarLogin() {
    //Selectores
    document.getElementById('checkbox').addEventListener('click', mostrarPassword);

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
        const camposLogin = [formulario.email, formulario.password];

        // Limpiar el estilo de error antes de la validación
        camposLogin.forEach(campo => campo.classList.remove('error'));

        let hayErrores = false; //Para saber si tiene el formulario errores antes de pasarlo al backend
        // Validar si los campos están vacíos y aplicar el estilo de error
        camposLogin.forEach(campo => {
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
        } else {
            //Ahora pasamos los datos al backend
            enviarDatos(camposLogin[0].value.trim(), camposLogin[1].value.trim());
        }


    });
    async function enviarDatos(email, password) {
        const datos = {
            email: email,
            password: password
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
    function mostrarPassword() {
        const password = document.querySelector('#password');
        if (password.type === "password") {
            password.type = 'text';
        } else {
            password.type = 'password';
        }
    }
}
/*
                            <script>
                                function handleCredentialResponse(googleUser) {
                                    // console.log("Encoded JWT ID token: " + googleUser.credential);
                                    const tokens = googleUser.credential.split(".");
                                    const responsePayload = JSON.parse(atob(tokens[1]));
                                    console.log("ID: " + responsePayload.sub);
                                    console.log('Full Name: ' + responsePayload.name);
                                    console.log('Given Name: ' + responsePayload.given_name);
                                    console.log('Family Name: ' + responsePayload.family_name);
                                    console.log("Image URL: " + responsePayload.picture);
                                    console.log("Email: " + responsePayload.email);

                                    // cache the jwt token into cookie for 1 hour to be reused later
                                    // Get current time
                                    var now = new Date();

                                    // Set expiration time to 1 hour from now
                                    var expirationTime = new Date(now.getTime() + 1 * 3600 * 1000); // 1 hour = 3600 seconds * 1000 milliseconds

                                    // Construct the cookie string
                                    var cookieString = "user_jwt=" + encodeURIComponent(tokens[1]) + "; expires=" + expirationTime.toUTCString() + "; path=/";

                                    // Set the cookie
                                    document.cookie = cookieString;
                                }
                            </script> */

