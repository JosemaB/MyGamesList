import { cerrarSesion } from '../../js/guardian.js';
import { limpiarHTML, getCookie, ocultarBotones, mostrarBotones, alertDanger, alertSuccess, mostrarToast, borrarAlerta, borrarSpinner, spinner, sinResultado, cardMensajeError } from '../../js/funciones.js';

const usuarioData = JSON.parse(localStorage.getItem("usuarioData"));
console.log(usuarioData);
const sesionToken = getCookie('sesion_token');
if (!sesionToken || usuarioData.rol !== "Administrador") {
    window.location.href = "/index.html";
}

document.addEventListener('DOMContentLoaded', iniciarAdministradir);

async function iniciarAdministradir() {
    document.querySelector('main').style.display = 'block';
    /*Selectores resultado */
    const divtotalUsuariosResultado = document.getElementById('totalUsuariosResultado');

    /*Selectores input */
    const inputBuscarUsuario = document.getElementById('inputBuscarUsuario');

    /*Cargamos los datos */
    const informeGeneral = await obtenerInformeGeneral();
    const datosUsuarios = informeGeneral.data.usuarios;
    const datosListas = informeGeneral.data.listas;
    const datosResenas = informeGeneral.data.resenas;

    mostrarUsuarios(datosUsuarios);
    console.log(informeGeneral);

    /*Cerrar sesion desde admin*/
    document.getElementById('cerrarSesionMovil').addEventListener('click', cerrarSesion);
    document.getElementById('cerrarSesionEscritorio').addEventListener('click', cerrarSesion);
    /*Cargamos el navbar para que se sincronice */
    navbarSincronizado();
    cargarDatosGrafico(datosUsuarios.length, datosListas.length, datosResenas.length);

    async function obtenerInformeGeneral() {
        const response = await fetch('http://localhost:3000/backend/helpers/adminHelpers/getInformeGlobal.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            },
        });
        // Verificamos si la respuesta es correcta
        if (!response.ok) {
            throw new Error('Error en la respuesta de PHP');
        }

        // Convertimos la respuesta en JSON
        const data = await response.json();
        return data;
    }

    /*Home */
    function cargarDatosGrafico(totalUsuarios, totalListas, totalReseñas) {
        // Configuración del gráfico de barras
        const barCtx = document.getElementById('barChart')?.getContext('2d');

        const barChart = new Chart(barCtx, {
            type: 'bar',
            data: {
                labels: ['Usuarios', 'Listas', 'Reseñas'],
                datasets: [{
                    label: 'Total',
                    data: [totalUsuarios, totalListas, totalReseñas], // Usa las variables aquí
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.5)',
                        'rgba(54, 163, 235, 0.5)',
                        'rgba(153, 102, 255, 0.5)',
                    ],
                    borderColor: [
                        'rgb(75, 192, 192)',
                        'rgb(54, 162, 235)',
                        'rgb(153, 102, 255)',
                    ],
                    borderWidth: 1,
                }]
            },
            options: {
                responsive: true, // Se ajusta automáticamente
                maintainAspectRatio: false, // Evita distorsión en el tamaño
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    function navbarSincronizado() {
        // Selecciona todos los botones de navegación en ambos menús
        const navButtonsDesktop = document.querySelectorAll('.sidebar .nav-link');
        const navButtonsMobile = document.querySelectorAll('#offcanvasSidebar .nav-link');

        // Función para sincronizar el estado activo
        function syncActiveTab(clickedButton, buttons) {
            buttons.forEach(button => {
                if (button.getAttribute('aria-controls') === clickedButton.getAttribute('aria-controls')) {
                    button.classList.add('active');
                    button.setAttribute('aria-selected', 'true');
                } else {
                    button.classList.remove('active');
                    button.setAttribute('aria-selected', 'false');
                }
            });
        }

        // Añade event listeners a los botones del menú de escritorio
        navButtonsDesktop.forEach(button => {
            button.addEventListener('click', function () {
                syncActiveTab(button, navButtonsMobile);
            });
        });

        // Añade event listeners a los botones del menú móvil
        navButtonsMobile.forEach(button => {
            button.addEventListener('click', function () {
                syncActiveTab(button, navButtonsDesktop);
            });
        });
    }

    /* Usuarios */
    function mostrarUsuarios(datosUsuarios) {

        const fragment = document.createDocumentFragment(); // Crear el fragmento
        datosUsuarios.forEach(usuario => {
            // Crear el contenedor principal
            const card = document.createElement('div');
            card.classList.add('card', 'cardUsuario', 'col-12', 'my-1');
            card.id = `cardUsuario-${usuario.id_usuario}`;
            // Crear el cuerpo de la tarjeta
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            // Crear el contenedor para la flexbox
            const flexContainer = document.createElement('div');
            flexContainer.classList.add('d-flex', 'justify-content-between', 'align-items-center');

            // Crear la sección de imagen y nombre de usuario
            const userInfo = document.createElement('div');
            userInfo.classList.add('d-flex', 'align-items-center', 'justify-content-center');

            // Crear el enlace y la imagen de usuario
            const userLink = document.createElement('a');
            userLink.href = `/Perfiles/usuario/usuario.html?id=${usuario.id_usuario}`;
            const userImage = document.createElement('img');
            userImage.src = usuario.avatar;
            userImage.classList.add('img-fluid');
            userImage.alt = `Imagen de ${usuario.nombre_usuario}`;
            userLink.appendChild(userImage);

            // Crear el nombre de usuario
            const userName = document.createElement('span');
            userName.classList.add('nombre-usuario', 'ms-2', 'fw-bold');
            userName.textContent = usuario.nombre_usuario;

            // Añadir la imagen y nombre de usuario al contenedor
            userInfo.appendChild(userLink);
            userInfo.appendChild(userName);

            // Crear la sección del dropdown
            const dropdown = document.createElement('div');
            dropdown.classList.add('dropdown');

            // Crear el botón para abrir el menú
            const dropdownButton = document.createElement('button');
            dropdownButton.classList.add('text-center', 'btn');
            dropdownButton.type = 'button';
            dropdownButton.setAttribute('data-bs-toggle', 'dropdown');
            dropdownButton.setAttribute('aria-expanded', 'false');
            dropdownButton.innerHTML = '<span class="text-light fs-4 fw-bold">⋮</span>';

            // Crear el menú desplegable
            const dropdownMenu = document.createElement('ul');
            dropdownMenu.classList.add('dropdown-menu', 'dropdown-menu-dark');

            // Crear las opciones del menú
            const renameOption = document.createElement('li');
            const renameLink = document.createElement('a');
            renameLink.classList.add('dropdown-item');
            renameLink.href = '#';
            renameLink.textContent = 'Renombrar usuario';

            // Asignar los manejadores de click para el "subir el rango"
            renameLink.addEventListener("click", function (event) {
                event.preventDefault();  // Evitar la acción predeterminada del enlace
                document.getElementById('newUsuarioName').value = usuario.nombre_usuario;
                const alerta = document.getElementById('alertasRenameUsuario');
                borrarAlerta(alerta);
                borrarSpinner(alerta);
                mostrarBotones('#renameUsuarioModal');

                // Aquí puedes agregar la lógica para renombrar la lista
                const cardId = card.id; // Obtener el ID de la tarjeta

                // Mostramos el modal de rename lista
                const renameUsuarioModal = new bootstrap.Modal(document.getElementById('renameUsuarioModal'));
                renameUsuarioModal.show();

                // Lógica cuando se confirma la eliminación
                const confirmRenameUsuarioButton = document.getElementById('confirmRenameUsuarioButton');

                confirmRenameUsuarioButton.onclick = async function () {
                    ocultarBotones('#renameUsuarioModal');
                    borrarAlerta(alerta);
                    const spinnerElement = spinner();
                    spinnerElement.style.marginTop = '20px';
                    spinnerElement.style.marginLeft = 'auto';
                    spinnerElement.style.marginRight = 'auto';
                    alerta.appendChild(spinnerElement);
                    const nombreNuevo = document.getElementById('newUsuarioName').value;

                    //Llamamos a la funcion de cambiar nombre
                    const data = await renameUsuario(cardId.split('-')[1], nombreNuevo);

                    borrarSpinner(alerta);

                    if (!data["success"]) {
                        mostrarBotones('#renameUsuarioModal');
                        // Si error es un string, lo mostramos directamente
                        alerta.appendChild(alertDanger(data.error));
                    } else if (data["success"]) {
                        mostrarToast(data.exito, 'success');
                        userName.textContent = nombreNuevo;
                        renameUsuarioModal.hide();
                    }
                }
            });

            renameOption.appendChild(renameLink);

            dropdownMenu.appendChild(renameOption);
            if (usuario.id_rol === 1) {
                // Crear la opción del menú para "Subir rango"
                const rankOption = document.createElement('li');
                const rankLink = document.createElement('a');
                rankLink.classList.add('dropdown-item');
                rankLink.href = '#';
                rankLink.textContent = 'Subir rango';

                rankOption.appendChild(rankLink);
                dropdownMenu.appendChild(rankOption);
                // Asignar los manejadores de click para el "subir el rango"
                rankOption.addEventListener("click", function (event) {
                    event.preventDefault();  // Evitar la acción predeterminada del enlace
                    const alerta = document.getElementById('alertaConfirmSubirUsuario');
                    borrarAlerta(alerta);
                    borrarSpinner(alerta);
                    mostrarBotones('#subirRangoModal');

                    // Aquí puedes agregar la lógica para renombrar la lista
                    const cardId = card.id; // Obtener el ID de la tarjeta

                    // Mostramos el modal de rename lista
                    const subirRangoModal = new bootstrap.Modal(document.getElementById('subirRangoModal'));
                    subirRangoModal.show();

                    // Lógica cuando se confirma la eliminación
                    const confirmarSubirUsuarioBTN = document.getElementById('confirmarSubirUsuarioBTN');

                    confirmarSubirUsuarioBTN.onclick = async function () {
                        borrarAlerta(alerta);


                        const spinnerElement = spinner();
                        spinnerElement.style.marginTop = '20px';
                        spinnerElement.style.marginLeft = 'auto';
                        spinnerElement.style.marginRight = 'auto';
                        alerta.appendChild(spinnerElement);

                        ocultarBotones('#subirRangoModal');

                        //Llamamos a la funcion de cambiar nombre
                        const data = await subirRangoUsuario(cardId.split('-')[1]);

                        borrarSpinner(alerta);

                        if (!data["success"]) {
                            // Si error es un string, lo mostramos directamente
                            alerta.appendChild(alertDanger(data.error));
                        } else if (data["success"]) {
                            alerta.appendChild(alertSuccess(data.exito));
                        }
                    }
                });
            } else {
                // Crear la opción del menú para "Bajar rango"
                const rankOption = document.createElement('li');
                const rankLink = document.createElement('a');
                rankLink.classList.add('dropdown-item');
                rankLink.href = '#';
                rankLink.textContent = 'Bajar rango';

                rankOption.appendChild(rankLink);
                dropdownMenu.appendChild(rankOption);

                // Asignar los manejadores de click para el "bajar el rango"
                rankOption.addEventListener("click", function (event) {
                    event.preventDefault();  // Evitar la acción predeterminada del enlace
                    const alerta = document.getElementById('alertaConfirmBajarUsuario');
                    borrarAlerta(alerta);
                    borrarSpinner(alerta);
                    mostrarBotones('#bajarRangoModal');

                    // Aquí puedes agregar la lógica para renombrar la lista
                    const cardId = card.id; // Obtener el ID de la tarjeta

                    // Mostramos el modal de rename lista
                    const bajarRangoModal = new bootstrap.Modal(document.getElementById('bajarRangoModal'));
                    bajarRangoModal.show();

                    // Lógica cuando se confirma la eliminación
                    const confirmarBajarUsuarioBTN = document.getElementById('confirmarBajarUsuarioBTN');

                    confirmarBajarUsuarioBTN.onclick = async function () {
                        borrarAlerta(alerta);


                        const spinnerElement = spinner();
                        spinnerElement.style.marginTop = '20px';
                        spinnerElement.style.marginLeft = 'auto';
                        spinnerElement.style.marginRight = 'auto';
                        alerta.appendChild(spinnerElement);

                        ocultarBotones('#bajarRangoModal');

                        //Llamamos a la funcion de cambiar nombre
                        const data = await bajarRangoUsuario(cardId.split('-')[1]);

                        borrarSpinner(alerta);

                        if (!data["success"]) {
                            alerta.appendChild(alertDanger(data.error));
                        } else if (data["success"]) {
                            alerta.appendChild(alertSuccess(data.exito));
                        }
                    }
                });
            }

            const deleteOption = document.createElement('li');
            const deleteLink = document.createElement('a');
            deleteLink.classList.add('dropdown-item');
            deleteLink.href = '#';
            deleteLink.textContent = 'Eliminar usuario';
            deleteOption.appendChild(deleteLink);
            dropdownMenu.appendChild(deleteOption);

            // Añadir el botón y el menú al contenedor del dropdown
            dropdown.appendChild(dropdownButton);
            dropdown.appendChild(dropdownMenu);

            // Añadir todo a la flexbox
            flexContainer.appendChild(userInfo);
            flexContainer.appendChild(dropdown);

            // Añadir el párrafo y la flexbox al cuerpo de la tarjeta

            if (usuario.id_rol === 2) {
                // Crear el párrafo con la clase 'card-text administrador'
                const adminText = document.createElement('p');
                adminText.classList.add('card-text', 'administrador');
                adminText.textContent = 'Administrador';
                cardBody.appendChild(adminText);
            }
            cardBody.appendChild(flexContainer);

            // Añadir el cuerpo de la tarjeta al contenedor principal
            card.appendChild(cardBody);

            // Finalmente, añadir la tarjeta al documento (por ejemplo, al body)
            fragment.appendChild(card);
        });
        divtotalUsuariosResultado.appendChild(fragment);

    }
    async function renameUsuario(idUsuario, nombreUsuario) {
        const datos = {
            idUsuario: idUsuario,
            nombreUsuario: nombreUsuario
        }
        const response = await fetch('http://localhost:3000/backend/controllers/controllerAdmin/renameUsuario.php', {
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

    async function bajarRangoUsuario(idUsuario) {
        const datos = {
            idUsuario: idUsuario
        }
        const response = await fetch('http://localhost:3000/backend/controllers/controllerAdmin/bajarRango.php', {
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
    async function subirRangoUsuario(idUsuario) {
        const datos = {
            idUsuario: idUsuario
        }
        const response = await fetch('http://localhost:3000/backend/controllers/controllerAdmin/subirRango.php', {
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
    async function obtenerrUsuariosPorNombre(nombreUsuario) {
        const datos = {
            nombreUsuario: nombreUsuario
        }
        const response = await fetch('http://localhost:3000/backend/helpers/adminHelpers/getUsuariosPorNombre.php', {
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
    // Añadir un event listener usuario para el evento 'input'
    inputBuscarUsuario?.addEventListener('input', () => {

        // Si ya hay un intervalo en ejecución, lo detenemos
        clearInterval(inputBuscarUsuario.intervalId);

        // Iniciar un nuevo intervalo de 500ms
        inputBuscarUsuario.intervalId = setInterval(async (e) => {

            if (inputBuscarUsuario.value) {
                limpiarHTML(divtotalUsuariosResultado);
                const spinnerElement = spinner();
                spinnerElement.style.margin = 'auto';
                spinnerElement.style.marginTop = '20px';
                divtotalUsuariosResultado.appendChild(spinnerElement);
                /*Enviamos al backend y nos mostrara un resultado de usuarios */
                const datosUsuarioporNombre = await obtenerrUsuariosPorNombre(inputBuscarUsuario.value);
                borrarSpinner(divtotalUsuariosResultado);
                if (datosUsuarioporNombre.success) {
                    if (datosUsuarioporNombre.usuarios.length > 0) {
                        mostrarUsuarios(datosUsuarioporNombre.usuarios);
                    } else {
                        divtotalUsuariosResultado.appendChild(sinResultado());
                    }
                } else {
                    cardMensajeError('Ups... parece que tenemos un problema técnico. Inténtalo de nuevo más tarde', divtotalUsuariosResultado);
                }

            } else {
                limpiarHTML(divtotalUsuariosResultado);
                mostrarUsuarios(datosUsuarios);
            }
        }, 500);

        // Resetear el temporizador para detectar cuando el usuario deja de escribir
        clearTimeout(inputBuscarUsuario.typingTimer);
        inputBuscarUsuario.typingTimer = setTimeout(() => {
            clearInterval(inputBuscarUsuario.intervalId);
        }, 500);
    });

}