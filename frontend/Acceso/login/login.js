import { alertDanger, alertSuccess, urlPaginaAnterior } from "../../js/funciones.js";
document.addEventListener('DOMContentLoaded', iniciarLogin);

function iniciarLogin() {
    //Selectores
    document.getElementById('checkbox').addEventListener('click', mostrarPassword);

    //Obtiene la url de la pagina anteriror para cuadno le da a la x volver 
    urlPaginaAnterior('/Acceso/login/login.html');

    /*Selectores*/
    // Obtener el botón del DOM
    let btnClose = document.getElementById('btnClose');

    // Selecciona el formulario por su ID
    const formulario = document.getElementById('miFormulario');

    //formulario modal
    const formularioModal = document.getElementById('formModal');
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

        const alertaDiv = document.getElementById('alertas');
        //Para que no genere muchas alertas
        borrarAlertaForm();

        // Validar campos vacíos
        if (hayErrores) {
            alertaDiv.appendChild(alertDanger("El correo y la contraseña son obligatorios"));
        } else {
            //Ahora pasamos los datos al backend
            const datos = await enviarDatosForm(camposLogin[0].value.trim(), camposLogin[1].value.trim());

            if (!datos["success"]) {
                camposLogin.forEach(campo => {
                    campo.classList.add('error');
                });
                alertaDiv.appendChild(alertDanger(datos["error"]));
            } else if (datos["success"]) { //Lo compruebo asi sin else por si falla los datos y no hacerlo aunque haya generado error
                //No meto ningun div de exito aunque lo envie en el backend porque se incia sesion mas rapido en el register lo veo un poco 
                //mas logico esperar por si quiere hacer otra cosa
                window.location.href = "/index.html";
            }
        }


    });

    formularioModal.addEventListener('submit', async (e) => {
        e.preventDefault();
        const email = formularioModal.emailModal;
        //Para eliminar el focus cuando se envia el boton submit por si acaso
        email.classList.remove('error');
        let error = false;
        if (email.value.trim() === "") {
            email.classList.add('error');
            error = true;
        }
        const alertaDiv = document.getElementById('alertasModal');
        const existeAlerta = alertaDiv.querySelector('.alert');
        if (existeAlerta) {
            existeAlerta.remove();
        }

        // Validar campos vacíos
        if (error) {
            alertaDiv.appendChild(alertDanger("Por favor, ingresa tu correo electrónico"));
        } else {
            //Ahora pasamos los datos al backend   
            const datos = await envidarDatosFormModal(email);
            console.log(datos);
        }

    });
    closeBtn.addEventListener('click', (e) => {
        const alertaDiv = document.getElementById('alertasModal');
        const existeAlerta = alertaDiv.querySelector('.alert');
        if (existeAlerta) {
            formularioModal.emailModal.classList.remove('error');
            existeAlerta.remove();
        }
    });

    async function enviarDatosForm(email, password) {
        const datos = {
            email: email,
            password: password
        };
        try {
            // Enviar datos usando fetch
            const response = await fetch('http://localhost:3000/backend/controllers/auth.php', {
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

            //Por si la base de datos esta caida para que no salgan muchas alertas hago esto se que es poner lo mismo pero si no me salta muchisimas
            borrarAlertaForm();
            console.log(data);

            return data;

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
    async function envidarDatosFormModal(email) {
        const datos = {
            email: email,
        };

        try {
            // Enviar datos usando fetch
            const response = await fetch('http://localhost:3000/backend/controllers/recover.php', {
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

            //Para eliminar las alertas de modal por si await tarda mucho
            const alertaDiv = document.getElementById('alertasModal');
            const existeAlerta = alertaDiv.querySelector('.alert');
            
            if (existeAlerta) {
                existeAlerta.remove();
            }
            return data;

        } catch (error) {
            console.error('Error al enviar datos:', error);
        }
    }
    function borrarAlertaForm() {
        //Por si la base de datos esta caida para que no salgan muchas alertas hago esto se que es poner lo mismo pero si no me salta muchisimas
        const alertaDiv = document.getElementById('alertas');
        const existeAlerta = alertaDiv.querySelector('.alert');
        if (existeAlerta) {
            existeAlerta.remove();
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

