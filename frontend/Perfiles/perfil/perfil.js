import { alertDanger, alertSuccess, spinner, borrarAlerta, mostrarPassword, getCookie, formatDate } from '../../js/funciones.js';
import { guardarCambiosStorage } from "../../js/guardian.js";

const sesionToken = getCookie('sesion_token');
if (!sesionToken) {
    window.location.href = "/index.html";
}
document.addEventListener('DOMContentLoaded', iniciarPerfil);
async function iniciarPerfil() {
    /*Los datos del usuario */
    const usuarioData = JSON.parse(localStorage.getItem("usuarioData"));
    const listasDeJuegos = await obtenerListas();

    console.log(listasDeJuegos);
    console.log(usuarioData);

    /*Perfil informacion lo que se ve todo el rato*/
    perfilInformacion();

    /*Mostramos el contenido Main del usuario */
    mostrarMain();

    /*Mostramos las listas */
    mostrarListas();

    /*Cargamos la seccion config */
    configPerfil();


    /*Contenido Main */
    function mostrarMain() {
        const { total_listas } = listasDeJuegos.listas;

        /*Total de listas */
        document.getElementById('totalListas').innerHTML = total_listas;
    }


    /*Listas de videojeugos */
    /*Selectores */
    const formList = document.getElementById('formCrearLista');

    formList?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombreLista = formList.nombreList;
        const alerta = document.getElementById('alertaList');

        borrarAlerta(alerta);
        nombreLista.classList.remove('error');
        if (nombreLista.value.trim() === "") {
            nombreLista.classList.add('error');
            alerta.appendChild(alertDanger("El nombre de la lista es obligatorio"));
        } else {
            //Enviamos al backend
        }
    });

    function mostrarListas() {
        const divListas = document.getElementById('nav-listas');
        if (listasDeJuegos.success) {
            const { total_contenido, total_listas } = listasDeJuegos.listas;
            document.getElementById('numListas').innerHTML = `${total_listas} / 10 listas`;
            if (total_listas == 0) {
                // Crear el contenedor principal
                const cardDiv = document.createElement('div');
                cardDiv.classList.add('card', 'mt-2', 'cardSinListaDeJuegos');

                // Crear el cuerpo de la tarjeta
                const cardBodyDiv = document.createElement('div');
                cardBodyDiv.classList.add('card-body', 'd-flex', 'align-items-center', 'justify-content-between', 'flex-column');

                // Crear el icono
                const icon = document.createElement('i');
                icon.classList.add('text-center', 'fs-2', 'bi', 'bi-bookmark-heart-fill');

                // Crear el título
                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title', 'fw-bold', 'text-center');
                cardTitle.textContent = '¡Crea tu primera lista de juegos!';

                // Crear el texto descriptivo
                const cardText = document.createElement('p');
                cardText.classList.add('card-text', 'text-center');
                cardText.textContent = '¡Genial que estés aquí! Organiza tus listas y mantén todo bajo control para acceder rápidamente a tus juegos favoritos';

                // Agregar los elementos al cuerpo de la tarjeta
                cardBodyDiv.appendChild(icon);
                cardBodyDiv.appendChild(cardTitle);
                cardBodyDiv.appendChild(cardText);

                // Agregar el cuerpo de la tarjeta al contenedor principal
                cardDiv.appendChild(cardBodyDiv);

                // Agregar la tarjeta al cuerpo del documento (o a otro elemento específico)
                divListas.appendChild(cardDiv);
                
            } else {

                total_contenido.forEach(lista => {
                    card.classList.add("card", "col-6", "my-1", "cardListaModalJuego");
                    card.id = "cardLista-";

                    // Crear el cuerpo de la tarjeta
                    let cardBody = document.createElement("div");
                    cardBody.classList.add("card-body");

                    // Crear la fila para el título y el dropdown
                    let flexDiv = document.createElement("div");
                    flexDiv.classList.add("d-flex", "justify-content-between", "align-items-center");

                    // Crear el título de la tarjeta
                    let title = document.createElement("h5");
                    title.classList.add("card-title", "tituloLista", "m-0");
                    title.setAttribute("data-bs-toggle", "modal");
                    title.setAttribute("data-bs-target", "#listJuegos");
                    title.textContent = "⭐ Animes Favoritos ⭐";

                    // Crear el dropdown
                    let dropdownDiv = document.createElement("div");
                    dropdownDiv.classList.add("dropdown");

                    let button = document.createElement("button");
                    button.classList.add("text-cente", "btn");
                    button.setAttribute("type", "button");
                    button.setAttribute("data-bs-toggle", "dropdown");
                    button.setAttribute("aria-expanded", "false");

                    let buttonSpan = document.createElement("span");
                    buttonSpan.classList.add("text-light", "fs-4", "fw-bold");
                    buttonSpan.textContent = "⋮";

                    // Crear el menú desplegable
                    let dropdownMenu = document.createElement("ul");
                    dropdownMenu.classList.add("dropdown-menu", "dropdown-menu-dark");

                    let renameItem = document.createElement("li");
                    let renameLink = document.createElement("a");
                    renameLink.classList.add("dropdown-item");
                    renameLink.setAttribute("href", "#");
                    renameLink.textContent = "Renombrar Lista";
                    renameItem.appendChild(renameLink);

                    let deleteItem = document.createElement("li");
                    let deleteLink = document.createElement("a");
                    deleteLink.classList.add("dropdown-item");
                    deleteLink.setAttribute("href", "#");
                    deleteLink.textContent = "Eliminar Lista";
                    deleteItem.appendChild(deleteLink);

                    dropdownMenu.appendChild(renameItem);
                    dropdownMenu.appendChild(deleteItem);

                    dropdownDiv.appendChild(button);
                    dropdownDiv.appendChild(dropdownMenu);

                    // Agregar el título y el dropdown a la fila
                    flexDiv.appendChild(title);
                    flexDiv.appendChild(dropdownDiv);

                    // Crear el párrafo con la fecha de creación
                    let paragraph = document.createElement("p");
                    paragraph.classList.add("card-text", "text-light");
                    paragraph.textContent = "Fecha de creación:";

                    // Agregar los elementos al cuerpo de la tarjeta
                    cardBody.appendChild(flexDiv);
                    cardBody.appendChild(paragraph);

                    // Agregar el cuerpo de la tarjeta a la tarjeta
                    card.appendChild(cardBody);

                    // Agregar la tarjeta al documento, por ejemplo, a un contenedor con el id "container"
                    divListas.appendChild(card);
                });
            }
        }

    }
    async function obtenerListas() {
        const { id } = usuarioData;
        const datos = {
            id: id
        }
        const response = await fetch('http://localhost:3000/backend/helpers/getListasJuegos.php', {
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
        return data;
    }

    /*Configuracion */
    //Lo hago asi porque es mas intuitivo
    const formPersonalizarPerfil = document.getElementById('formPersonalizarPerfil');
    const formEmail = document.getElementById('formEmail');
    document.getElementById('mostrarPasswordEmail')?.addEventListener('click', () => {
        mostrarPassword(document.getElementById('contrasenaEmail'));
    });

    const formNewPassword = document.getElementById('formNewPassword');
    document.getElementById('mostrarPasswordNuevaContrasena')?.addEventListener('click', () => {
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
                    nombreActual: usuarioData.nombre,
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
                    if (typeof data.error === "string") {
                        // Si error es un string, lo mostramos directamente
                        alerta.appendChild(alertDanger(data.error));
                    } else if (typeof data.error === "object") {
                        // Si error es un objeto, obtenemos la primera clave y mostramos el mensaje
                        const key = Object.keys(data.error)[0]; // "password" o "email"

                        if ("nombre" === key) {
                            nombre.classList.add('error'); // Marca el campo con error
                        }
                        // Mostrar el mensaje de error
                        alerta.appendChild(alertDanger(data.error[key]));
                    }
                } else if (data["success"]) {
                    document.getElementById("guardarCambios").style.display = "none";
                    alerta.appendChild(alertSuccess(data["exito"]));
                    await guardarCambiosStorage();
                    setTimeout(() => {
                        window.location.reload(); // Recarga la página después de 1 segundo
                    }, 500);

                }
            } catch (error) {
                console.error("Error al enviar los datos:", error);
            }
        }
    });

    formEmail?.addEventListener('submit', async (e) => {
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
                document.getElementById("btnRestablecerEmail").style.display = "none";

                //Id del usaurio actual
                const { id } = usuarioData;
                const datos = {
                    id: id,
                    email: formEmail.email.value,
                    newEmail: formEmail.newEmail.value,
                    constrasena: formEmail.contrasenaEmail.value
                }
                const response = await fetch('http://localhost:3000/backend/controllers/controllerPerfilConfig/cambiarEmail.php', {
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
                document.getElementById("btnRestablecerEmail").style.display = "block";
                if (existingSpinner) {
                    // Si existe, lo eliminamos
                    alerta.removeChild(existingSpinner);
                }
                borrarAlerta(alerta);

                if (!data["success"]) {
                    if (typeof data.error === "string") {
                        // Si error es un string, lo mostramos directamente
                        alerta.appendChild(alertDanger(data.error));
                    } else if (typeof data.error === "object") {
                        // Si error es un objeto, obtenemos la primera clave y mostramos el mensaje
                        const key = Object.keys(data.error)[0];
                        campos.forEach(campo => {
                            if (campo.id === key) {
                                campo.classList.add('error'); // Marca el campo con error
                            }
                        });
                        // Mostrar el mensaje de error
                        alerta.appendChild(alertDanger(data.error[key]));
                    }
                } else if (data["success"]) {
                    document.getElementById("btnRestablecerEmail").style.display = "none";
                    alerta.appendChild(alertSuccess(data["exito"]));
                    await guardarCambiosStorage();
                    setTimeout(() => {
                        window.location.reload(); // Recarga la página después de 1 segundo
                    }, 500);

                }
            } catch (error) {
                console.error("Error al enviar los datos:", error);
            }
        }
    });

    formNewPassword?.addEventListener('submit', async (e) => {
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
                document.getElementById("btnRestablecerContrasena").style.display = "none";

                //Id del usaurio actual
                const { id } = usuarioData;
                const datos = {
                    id: id,
                    passwordActual: formNewPassword.passwordActual.value,
                    newPassword: formNewPassword.newPassword.value,
                    confirmNewPassword: formNewPassword.confirmNewPassword.value
                }
                const response = await fetch('http://localhost:3000/backend/controllers/controllerPerfilConfig/cambiarContrasena.php', {
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
                document.getElementById("btnRestablecerContrasena").style.display = "block";
                if (existingSpinner) {
                    // Si existe, lo eliminamos
                    alerta.removeChild(existingSpinner);
                }
                borrarAlerta(alerta);

                if (!data["success"]) {
                    if (typeof data.error === "string") {
                        // Si error es un string, lo mostramos directamente
                        alerta.appendChild(alertDanger(data.error));
                    } else if (typeof data.error === "object") {
                        // Si error es un objeto, obtenemos la primera clave y mostramos el mensaje
                        const key = Object.keys(data.error)[0];
                        campos.forEach(campo => {
                            if (campo.id === key) {
                                campo.classList.add('error'); // Marca el campo con error
                            }
                        });
                        // Mostrar el mensaje de error
                        alerta.appendChild(alertDanger(data.error[key]));
                    }
                } else if (data["success"]) {
                    document.getElementById("btnRestablecerContrasena").style.display = "none";
                    alerta.appendChild(alertSuccess(data["exito"]));
                    await guardarCambiosStorage();
                    setTimeout(() => {
                        window.location.reload(); // Recarga la página después de 1 segundo
                    }, 500);

                }
            } catch (error) {
                console.error("Error al enviar los datos:", error);
            }
        }
    });

    formContacto.addEventListener('submit', async (e) => {
        e.preventDefault();
        const alerta = document.getElementById('alertasContacto');
        const textContacto = formContacto.contacto;

        borrarAlerta(alerta);
        textContacto.classList.remove('error');

        if (textContacto.value.trim() === "") {
            textContacto.classList.add('error');
            alerta.appendChild(alertDanger("Por favor, ingresa un mensaje"));
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
                document.getElementById("btnEnviarContacto").style.display = "none";

                //Id del usaurio actual
                const { email, nombre } = usuarioData;
                const datos = {
                    email: email,
                    mensaje: textContacto.value,
                    usuario: nombre
                }
                const response = await fetch('http://localhost:3000/backend/controllers/controllerPerfilConfig/contacto.php', {
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
                document.getElementById("btnEnviarContacto").style.display = "block";
                if (existingSpinner) {
                    // Si existe, lo eliminamos
                    alerta.removeChild(existingSpinner);
                }
                borrarAlerta(alerta);

                if (!data["success"]) {
                    if (typeof data.error === "string") {
                        // Si error es un string, lo mostramos directamente
                        alerta.appendChild(alertDanger(data.error));
                    } else if (typeof data.error === "object") {
                        // Si error es un objeto, obtenemos la primera clave y mostramos el mensaje
                        const key = Object.keys(data.error)[0]; // "password" o "email"

                        if ("mensaje" === key) {
                            textContacto.classList.add('error'); // Marca el campo con error
                        }
                        // Mostrar el mensaje de error
                        alerta.appendChild(alertDanger(data.error[key]));
                    }
                } else if (data["success"]) {
                    document.getElementById("btnEnviarContacto").style.display = "none";
                    alerta.appendChild(alertSuccess(data["exito"]));
                    await guardarCambiosStorage();
                }
            } catch (error) {
                console.error("Error al enviar los datos:", error);
            }
        }
    });
    /*Funciones */
    function perfilInformacion() {
        const { nombre, fecha_registro, avatar } = usuarioData;
        document.getElementById('nombreUsuario').innerText = nombre;
        document.getElementById('registro').innerText = `Miembro desde: ${formatDate(fecha_registro)}`;
        document.getElementById('imgUsuario').src = (avatar === null ? '/img/avatares/sinAvatar.png' : avatar);  //Por si el avatar es null

    }

    function configPerfil() {
        const divEmail = document.getElementById('v-pills-email');
        const divContrasena = document.getElementById('v-pills-contrasena');

        /*Personalizar perfil */
        const { metodo_registro, nombre, avatar } = usuarioData;
        document.getElementById('cambiarImg').src = (avatar === null ? '/img/avatares/sinAvatar.png' : avatar); //Por si el avatar es null
        document.getElementById('cambioNameUsuario').value = nombre;

        /*Comprobamos si viene de google */
        if (metodo_registro === "google") {
            //Para la contrasena
            // Crear contenedor principal
            const divMain = document.createElement('div');
            divMain.classList.add('d-flex', 'align-items-center', 'justify-content-center');

            // Crear la tarjeta
            const divCard = document.createElement('div');
            divCard.classList.add('card', 'text-white', 'card-google-login-message', 'mb-3');

            // Crear el encabezado de la tarjeta
            const divCardHeader = document.createElement('div');
            divCardHeader.classList.add('card-header', 'fw-bold', 'text-center', 'text-danger');
            divCardHeader.textContent = 'Cambio de contraseña deshabilitado';

            // Crear el cuerpo de la tarjeta
            const divCardBody = document.createElement('div');
            divCardBody.classList.add('card-body');

            // Crear el texto dentro del cuerpo de la tarjeta
            const pCardText = document.createElement('p');
            pCardText.classList.add('card-text', 'text-light');
            pCardText.textContent = 'No es posible cambiar tu contraseña ya que iniciaste sesión utilizando tu cuenta de Google';

            // Agregar los elementos al DOM
            divCardBody.appendChild(pCardText);
            divCard.appendChild(divCardHeader);
            divCard.appendChild(divCardBody);
            divMain.appendChild(divCard);

            // Agregar el contenedor de la contrasena
            divContrasena.appendChild(divMain);

            //Correo electronico no permitido
            // Crear contenedor principal
            const container = document.createElement('div');
            container.classList.add('d-flex', 'align-items-center', 'justify-content-center');

            // Crear la tarjeta
            const emailCard = document.createElement('div');
            emailCard.classList.add('card', 'text-white', 'card-google-login-message', 'mb-3');

            // Crear el encabezado de la tarjeta
            const emailCardHeader = document.createElement('div');
            emailCardHeader.classList.add('card-header', 'fw-bold', 'text-center', 'text-danger');
            emailCardHeader.textContent = 'Cambio de correo deshabilitado';

            // Crear el cuerpo de la tarjeta
            const emailCardBody = document.createElement('div');
            emailCardBody.classList.add('card-body');

            // Crear el texto dentro del cuerpo de la tarjeta
            const emailCardText = document.createElement('p');
            emailCardText.classList.add('card-text', 'text-light');
            emailCardText.textContent = 'No es posible cambiar tu correo ya que iniciaste sesión utilizando tu cuenta de correo electrónico';

            // Agregar los elementos al DOM
            emailCardBody.appendChild(emailCardText);
            emailCard.appendChild(emailCardHeader);
            emailCard.appendChild(emailCardBody);
            container.appendChild(emailCard);

            // Agregar el contenedor de correo
            divEmail.appendChild(container);

        } else {
            //Para la contrasena
            // Crear el div contenedor
            const divContainer = document.createElement('div');
            divContainer.classList.add('mb-2', 'mx-4');

            // Crear el formulario (renombrado a passwordForm)
            const passwordForm = document.createElement('form');
            passwordForm.classList.add('p-4');
            passwordForm.id = 'formNewPassword';

            // Crear el campo de usuario (oculto)
            const fakeUsernameInput = document.createElement('input');
            fakeUsernameInput.type = 'text';
            fakeUsernameInput.id = 'fakeUsername';
            fakeUsernameInput.name = 'fakeUsername';
            fakeUsernameInput.autocomplete = 'username';
            fakeUsernameInput.style.display = 'none';

            // Agregar el campo de usuario al formulario
            passwordForm.appendChild(fakeUsernameInput);

            // Crear el campo de contraseña actual
            const passwordActualDiv = document.createElement('div');
            passwordActualDiv.classList.add('mb-3');

            const passwordActualLabel = document.createElement('label');
            passwordActualLabel.setAttribute('for', 'passwordActual');
            passwordActualLabel.classList.add('fw-bold', 'form-label');
            passwordActualLabel.textContent = 'Contraseña actual';

            const passwordActualInput = document.createElement('input');
            passwordActualInput.type = 'password';
            passwordActualInput.classList.add('form-control');
            passwordActualInput.id = 'passwordActual';
            passwordActualInput.name = 'passwordActual';
            passwordActualInput.autocomplete = 'new-password';
            passwordActualInput.placeholder = '***********';

            // Agregar elementos al campo de contraseña actual
            passwordActualDiv.appendChild(passwordActualLabel);
            passwordActualDiv.appendChild(passwordActualInput);
            passwordForm.appendChild(passwordActualDiv);

            // Crear el campo de nueva contraseña
            const newPasswordDiv = document.createElement('div');
            newPasswordDiv.classList.add('mb-3');

            const newPasswordLabel = document.createElement('label');
            newPasswordLabel.setAttribute('for', 'newPassword');
            newPasswordLabel.classList.add('fw-bold', 'form-label');
            newPasswordLabel.textContent = 'Nueva contraseña';

            const newPasswordInput = document.createElement('input');
            newPasswordInput.type = 'password';
            newPasswordInput.classList.add('form-control');
            newPasswordInput.id = 'newPassword';
            newPasswordInput.name = 'newPassword';
            newPasswordInput.autocomplete = 'new-password';
            newPasswordInput.placeholder = '***********';

            // Agregar elementos al campo de nueva contraseña
            newPasswordDiv.appendChild(newPasswordLabel);
            newPasswordDiv.appendChild(newPasswordInput);
            passwordForm.appendChild(newPasswordDiv);

            // Crear el campo de confirmar nueva contraseña
            const confirmNewPasswordDiv = document.createElement('div');
            confirmNewPasswordDiv.classList.add('mb-3');

            const confirmNewPasswordLabel = document.createElement('label');
            confirmNewPasswordLabel.setAttribute('for', 'confirmNewPassword');
            confirmNewPasswordLabel.classList.add('fw-bold', 'form-label');
            confirmNewPasswordLabel.textContent = 'Confirmar nueva contraseña';

            const confirmNewPasswordInput = document.createElement('input');
            confirmNewPasswordInput.type = 'password';
            confirmNewPasswordInput.classList.add('form-control');
            confirmNewPasswordInput.id = 'confirmNewPassword';
            confirmNewPasswordInput.name = 'confirmNewPassword';
            confirmNewPasswordInput.autocomplete = 'new-password';
            confirmNewPasswordInput.placeholder = '***********';

            // Agregar elementos al campo de confirmar nueva contraseña
            confirmNewPasswordDiv.appendChild(confirmNewPasswordLabel);
            confirmNewPasswordDiv.appendChild(confirmNewPasswordInput);
            passwordForm.appendChild(confirmNewPasswordDiv);

            // Crear el campo de checkbox para mostrar contraseñas
            const checkboxDiv = document.createElement('div');
            checkboxDiv.classList.add('mb-3', 'form-check');

            const checkboxInput = document.createElement('input');
            checkboxInput.type = 'checkbox';
            checkboxInput.classList.add('form-check-input');
            checkboxInput.id = 'mostrarPasswordNuevaContrasena';

            const checkboxLabel = document.createElement('label');
            checkboxLabel.classList.add('form-check-label');
            checkboxLabel.setAttribute('for', 'mostrarPasswordNuevaContrasena');
            checkboxLabel.textContent = 'Mostrar contraseñas';

            // Agregar el checkbox al formulario
            checkboxDiv.appendChild(checkboxInput);
            checkboxDiv.appendChild(checkboxLabel);
            passwordForm.appendChild(checkboxDiv);

            // Crear el botón de guardar cambios
            const saveButton = document.createElement('button');
            saveButton.id = 'btnRestablecerContrasena';
            saveButton.type = 'submit';
            saveButton.name = 'enviar';
            saveButton.classList.add('fw-bold', 'col-12', 'btn');
            saveButton.textContent = 'Guardar cambios';

            // Agregar el botón al formulario
            passwordForm.appendChild(saveButton);

            // Crear el div para alertas
            const alertDiv = document.createElement('div');
            alertDiv.classList.add('col-12', 'm-0', 'mt-2', 'p-0', 'text-center');
            alertDiv.id = 'alertasNuevaContrasena';

            // Agregar el div de alertas al formulario
            passwordForm.appendChild(alertDiv);

            // Agregar el formulario al div contenedor
            divContainer.appendChild(passwordForm);

            // Agregar el contenedor de la contrasena
            divContrasena.appendChild(divContainer);

            //Para email
            // Crear el contenedor principal
            const formContainer = document.createElement('div');
            formContainer.classList.add('mb-2', 'mx-4');

            // Crear el formulario
            const form = document.createElement('form');
            form.classList.add('p-4');
            form.id = 'formEmail';

            // Crear el campo para el correo electrónico actual
            const currentEmailGroup = document.createElement('div');
            currentEmailGroup.classList.add('mb-3');
            const currentEmailLabel = document.createElement('label');
            currentEmailLabel.classList.add('fw-bold', 'form-label');
            currentEmailLabel.setAttribute('for', 'email');
            currentEmailLabel.textContent = 'Correo electrónico actual';
            const currentEmailInput = document.createElement('input');
            currentEmailInput.classList.add('form-control');
            currentEmailInput.setAttribute('type', 'email');
            currentEmailInput.setAttribute('id', 'email');
            currentEmailInput.setAttribute('placeholder', 'Ingresa tu correo electrónico');
            currentEmailInput.setAttribute('autocomplete', 'email');
            currentEmailGroup.appendChild(currentEmailLabel);
            currentEmailGroup.appendChild(currentEmailInput);

            // Crear el campo para el nuevo correo electrónico
            const newEmailGroup = document.createElement('div');
            newEmailGroup.classList.add('mb-3');
            const newEmailLabel = document.createElement('label');
            newEmailLabel.classList.add('fw-bold', 'form-label');
            newEmailLabel.setAttribute('for', 'newEmail');
            newEmailLabel.textContent = 'Nuevo correo electrónico';
            const newEmailInput = document.createElement('input');
            newEmailInput.classList.add('form-control');
            newEmailInput.setAttribute('type', 'email');
            newEmailInput.setAttribute('id', 'newEmail');
            newEmailInput.setAttribute('placeholder', 'Ingresa tu nuevo correo electrónico');
            newEmailInput.setAttribute('autocomplete', 'email');
            newEmailGroup.appendChild(newEmailLabel);
            newEmailGroup.appendChild(newEmailInput);

            // Crear el campo para la contraseña
            const passwordGroup = document.createElement('div');
            passwordGroup.classList.add('mb-3');
            const passwordLabel = document.createElement('label');
            passwordLabel.classList.add('fw-bold', 'form-label');
            passwordLabel.setAttribute('for', 'contrasenaEmail');
            passwordLabel.textContent = 'Contraseña';
            const passwordInput = document.createElement('input');
            passwordInput.classList.add('form-control');
            passwordInput.setAttribute('type', 'password');
            passwordInput.setAttribute('id', 'contrasenaEmail');
            passwordInput.setAttribute('name', 'contrasenaEmail');
            passwordInput.setAttribute('autocomplete', 'new-password');
            passwordInput.setAttribute('placeholder', '***********');
            passwordGroup.appendChild(passwordLabel);
            passwordGroup.appendChild(passwordInput);

            // Crear la casilla para mostrar/ocultar la contraseña
            const showPasswordGroup = document.createElement('div');
            showPasswordGroup.classList.add('mb-3', 'form-check');
            const showPasswordCheckbox = document.createElement('input');
            showPasswordCheckbox.classList.add('form-check-input');
            showPasswordCheckbox.setAttribute('type', 'checkbox');
            showPasswordCheckbox.setAttribute('id', 'mostrarPasswordEmail');
            const showPasswordLabel = document.createElement('label');
            showPasswordLabel.classList.add('form-check-label');
            showPasswordLabel.setAttribute('for', 'mostrarPasswordEmail');
            showPasswordLabel.textContent = 'Mostrar contraseña';
            showPasswordGroup.appendChild(showPasswordCheckbox);
            showPasswordGroup.appendChild(showPasswordLabel);

            // Crear el botón de enviar
            const submitButton = document.createElement('button');
            submitButton.classList.add('fw-bold', 'col-12', 'btn');
            submitButton.setAttribute('id', 'btnRestablecerEmail');
            submitButton.setAttribute('type', 'submit');
            submitButton.setAttribute('name', 'enviar');
            submitButton.textContent = 'Guardar cambios';

            // Crear el contenedor para las alertas
            const alertContainer = document.createElement('div');
            alertContainer.classList.add('col-12', 'm-0', 'mt-2', 'p-0', 'text-center');
            alertContainer.setAttribute('id', 'alertasNuevoEmail');

            // Agregar todos los elementos al formulario
            form.appendChild(currentEmailGroup);
            form.appendChild(newEmailGroup);
            form.appendChild(passwordGroup);
            form.appendChild(showPasswordGroup);
            form.appendChild(submitButton);
            form.appendChild(alertContainer);

            // Agregar el formulario al contenedor principal
            formContainer.appendChild(form);

            // Agregar el contenedor de correo
            divEmail.appendChild(formContainer);
        }
    }

}