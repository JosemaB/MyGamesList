import { alertDanger, alertSuccess, spinner, borrarAlerta, mostrarPassword, getCookie, formatDate } from '../../js/funciones.js';
import { iniciarGuardian } from "../../js/guardian.js";

const sesionToken = getCookie('sesion_token');
if (!sesionToken) {
    window.location.href = "/index.html";
}
document.addEventListener('DOMContentLoaded', iniciarPerfil);
function iniciarPerfil() {
    /*Los datos del usuario */
    const usuarioData = JSON.parse(localStorage.getItem("usuarioData"));
    console.log(usuarioData);
    /*Configuraciones usuario y sus datos*/
    perfilInformacion(usuarioData);
    personalizarPefil(usuarioData);

    /*Configuracion */
    //Lo hago asi porque es mas intuitivo
    const formPersonalizarPerfil = document.getElementById('formPersonalizarPerfil');
    const formEmail = document.getElementById('formEmail');
    document.getElementById('mostrarPasswordEmail').addEventListener('click', () => {
        mostrarPassword(document.getElementById('contrasenaEmail'));
    });

    const formNewPassword = document.getElementById('formNewPassword');
    document.getElementById('mostrarPasswordNuevaContrasena').addEventListener('click', () => {
        mostrarPassword(document.getElementById('passwordActual'));
        mostrarPassword(document.getElementById('newPassword'));
        mostrarPassword(document.getElementById('confirmNewPassword'));

    });

    const formContacto = document.getElementById('formContacto');

    // Llamar a la función para cargar los avatares cuando se abra el modal
    document.getElementById('staticBackdrop').addEventListener('show.bs.modal', loadAvatars);

    /*Variables "Locales script" */
    let selectedAvatar = null; //Selecion de avatar

    async function loadAvatars() {
        const avatarList = document.getElementById('avatar-list');
        const acceptButton = document.getElementById('acceptButton');
        const cambiarImg = document.getElementById('cambiarImg');

        // Limpiar el contenido anterior
        avatarList.innerHTML = '';
        try {
            const existingSpinner = avatarList.querySelector('.spinner');
            if (existingSpinner) {
                avatarList.removeChild(existingSpinner);
            }
            const spinnerElement = spinner();
            spinnerElement.style.padding = '0';
            spinnerElement.style.margin = '0';

            avatarList.appendChild(spinnerElement);
            const response = await fetch('http://localhost:3000/backend/helpers/getAvatars.php');
            avatarList.removeChild(spinnerElement);
            if (!response.ok) {
                throw new Error('Error al cargar las imágenes');
            }

            const avatars = await response.json();

            avatars.forEach((avatar) => {
                const button = document.createElement('button');
                button.classList.add('col-4', 'btnAvatar');

                let avatarImg = document.createElement('img');
                avatarImg.src = avatar;
                avatarImg.alt = "Avatar";
                button.appendChild(avatarImg);

                // Ruta relativa
                let rutaRelativa = avatar;
                let regex = /^(\.\.\/)+/;
                let rutaAbsoluta = rutaRelativa.replace(regex, "http://localhost:5500/");
                if (cambiarImg.src === rutaAbsoluta) {
                    button.classList.add('selected');
                }
                button.style.cursor = "pointer";
                // Evento para seleccionar el avatar
                button.addEventListener('click', () => {
                    // Remueve la clase 'selected' de otros botones
                    document.querySelectorAll('#avatar-list button').forEach(btn => btn.classList.remove('selected'));

                    // Agrega la clase al botón seleccionado
                    button.classList.add('selected');

                    // Habilita el botón de aceptar
                    if (cambiarImg.src !== rutaAbsoluta) {
                        acceptButton.disabled = false;
                    } else {
                        acceptButton.disabled = true;
                    }

                    // Guarda la URL del avatar seleccionado
                    selectedAvatar = avatar;
                });

                avatarList.appendChild(button);
            });

        } catch (error) {
            console.error('Error al cargar los avatares:', error);
            avatarList.innerHTML = `<p style="color: red;">Error al cargar los avatares.</p>`;
        }
    }
    document.getElementById('btnCloseModal').addEventListener('click', () => {
        selectedAvatar = null;
        // Deshabilitar el botón de aceptación después de la selección
        acceptButton.disabled = true;
    });
    // Evento para el botón de aceptar
    acceptButton.addEventListener('click', () => {
        if (selectedAvatar) {
            cambiarImg.src = selectedAvatar;
        } else {
            alert('Por favor, selecciona un avatar.');
        }
        // Deshabilitar el botón de aceptación después de la selección
        acceptButton.disabled = true;
    });

    formPersonalizarPerfil.addEventListener('submit', async (e) => {
        e.preventDefault();
        const alerta = document.getElementById('alertaEditarPerfil');
        const img = formPersonalizarPerfil.cambiarImg.src;
        const nombre = formPersonalizarPerfil.cambioNameUsuario;

        borrarAlerta(alerta);
        nombre.classList.remove('error');
        if (nombre.value.trim() === "") {
            nombre.classList.add('error');
            alerta.appendChild(alertDanger("El nombre es obligatorio"));
        } else {

            try {

                // Verificamos si ya existe un spinner en el div
                var existingSpinner = alerta.querySelector('.spinner'); // Asegúrate de que '.spinner' es un selector único

                if (existingSpinner) {
                    // Si existe, lo eliminamos
                    alerta.removeChild(existingSpinner);
                }
                //Spinner
                const spinnerElement = spinner();
                spinnerElement.style.marginTop = '30px';
                spinnerElement.style.marginBottom = '10px';
                alerta.appendChild(spinnerElement);
                document.getElementById("guardarCambios").style.display = "none";

                const { id } = usuarioData;
                const datos = {
                    id: id,
                    img: img,
                    nombre: nombre.value
                }
                const response = await fetch('http://localhost:3000/backend/controllers/controllerPerfilConfig/personalizarPerfil.php', {
                    method: 'POST',
                    credentials: "include",
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

                // Verificamos si ya existe un spinner en el div
                var existingSpinner = alerta.querySelector('.spinner'); // Asegúrate de que '.spinner' es un selector único
                document.getElementById("guardarCambios").style.display = "block";
                if (existingSpinner) {
                    // Si existe, lo eliminamos
                    alerta.removeChild(existingSpinner);
                }
                borrarAlerta(alerta);

                if (!data["success"]) {
                    alerta.appendChild(alertDanger(data["error"]));
                } else if (data["success"]) {
                    document.getElementById("guardarCambios").style.display = "none";
                    alerta.appendChild(alertSuccess(data["exito"]));
                    await iniciarGuardian();
                    window.location.reload(); // Recarga la página después de 1 segundo
                }
            } catch (error) {
                console.error("Error al enviar los datos:", error);
            }
        }
    });

    formEmail.addEventListener('submit', (e) => {
        e.preventDefault();
        const alerta = document.getElementById('alertasNuevoEmail');

        // Obtener todos los campos del formulario
        const campos = [formEmail.email, formEmail.newEmail, formEmail.contrasenaEmail];

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

        //Para que no genere muchas alertas
        borrarAlerta(alerta);

        // Validar campos vacíos
        if (hayErrores) {
            alerta.appendChild(alertDanger("Todos los campos son obligatorios"));
        } else {
            //Envio backend
        }
    });

    formNewPassword.addEventListener('submit', (e) => {
        e.preventDefault();
        const alerta = document.getElementById('alertasNuevaContrasena');

        // Obtener todos los campos del formulario
        const campos = [formNewPassword.passwordActual, formNewPassword.newPassword, formNewPassword.confirmNewPassword];

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

        //Para que no genere muchas alertas
        borrarAlerta(alerta);

        // Validar campos vacíos
        if (hayErrores) {
            alerta.appendChild(alertDanger("Todos los campos son obligatorios"));
        } else {
            //Envio backend
        }
    });

    formContacto.addEventListener('submit', (e) => {
        e.preventDefault();
        const alerta = document.getElementById('alertasContacto');
        const textContacto = formContacto.contacto;

        borrarAlerta(alerta);
        textContacto.classList.remove('error');

        if (textContacto.value.trim() === "") {
            textContacto.classList.add('error');
            alerta.appendChild(alertDanger("Por favor, ingresa un mensaje"));
        } else {
            //Backend se enviaria y comprobara sus errores
        }
    });
    /*Funciones */
    function perfilInformacion(usuario) {
        const { nombre, fecha_registro, avatar } = usuario;
        document.getElementById('nombreUsuario').innerText = nombre;
        document.getElementById('registro').innerText = `Miembro desde: ${formatDate(fecha_registro)}`;
        document.getElementById('imgUsuario').src = (avatar === null ? '/img/avatares/sinAvatar.png' : avatar);  //Por si el avatar es null

    }

    function personalizarPefil(usuario) {
        const { nombre, avatar } = usuario;
        document.getElementById('cambiarImg').src = (avatar === null ? '/img/avatares/sinAvatar.png' : avatar); //Por si el avatar es null
        document.getElementById('cambioNameUsuario').value = nombre;

    }
}