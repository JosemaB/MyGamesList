
// Variable global para almacenar la sesión
let sessionData = null;

// Función para obtener la sesión usando async/await
async function obtenerSesion() {
    try {
        const response = await fetch('http://localhost:3000/backend/controllers/verificar_sesion.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        sessionData = data; // Guardamos la sesión en la variable global

    } catch (error) {
        console.error('Error al obtener la sesión:', error);
    }
}
// Función para iniciar la aplicación solo cuando la sesión esté lista
export async function iniciarGuardian() {
    await obtenerSesion(); // Esperamos a que la sesión se obtenga antes de continuar
    if (sessionData.error === "Sesion no valida") {

    } else if (sessionData.error === "No hay sesion activa") {
        usuarioNoConectadoMovil();
        usuarioNoConectadoEscritorio();
    } else if (sessionData.success) {
        const avatar = sessionData.exito.usuario.avatar;
        usuarioConectadoMovil(avatar);
        usuarioConectadoEscritorio(avatar);
    }
}
function usuarioNoConectadoMovil() {
    const divHeaderMoviles = document.getElementById('headerMoviles');
    // Crear el contenedor div con clases 'text-center d-block d-xl-none fs-1'
    const div = document.createElement('div');
    div.classList.add('text-center', 'd-block', 'd-xl-none', 'fs-1');

    // Crear el enlace <a> con clases 'text-decoration-none text-reset' y el href
    const a = document.createElement('a');
    a.classList.add('text-decoration-none', 'text-reset');
    a.href = '/Acceso/login/login.html';

    // Crear el icono <i> con clases 'usuarioNoConectado mx-2 bi bi-person-circle'
    const i = document.createElement('i');
    i.classList.add('usuarioNoConectado', 'mx-2', 'bi', 'bi-person-circle');

    // Añadir el icono <i> al enlace <a>
    a.appendChild(i);

    // Añadir el enlace <a> al contenedor <div>
    div.appendChild(a);

    // Suponiendo que quieres agregar el contenedor al body o a otro elemento específico
    divHeaderMoviles.appendChild(div);  // O puedes especificar otro contenedor

}
function usuarioNoConectadoEscritorio() {
    const divHeaderEscritorio = document.getElementById('headerEscritorio');
    // Crear el contenedor div con clases 'd-none d-xl-block fs-1'
    const div = document.createElement('div');
    div.classList.add('d-none', 'd-xl-block', 'fs-1');

    // Crear el enlace <a> con clases 'text-decoration-none text-reset' y el href
    const a = document.createElement('a');
    a.classList.add('text-decoration-none', 'text-reset');
    a.href = '/Acceso/login/login.html';

    // Crear el icono <i> con clases 'usuarioNoConectado ms-3 me-4 bi bi-person-circle'
    const i = document.createElement('i');
    i.classList.add('usuarioNoConectado', 'ms-3', 'me-4', 'bi', 'bi-person-circle');

    // Añadir el icono <i> al enlace <a>
    a.appendChild(i);

    // Añadir el enlace <a> al contenedor <div>
    div.appendChild(a);

    // Suponiendo que quieres agregar el contenedor al body o a otro elemento específico
    divHeaderEscritorio.appendChild(div);  // O puedes especificar otro contenedor

}
function usuarioConectadoMovil(avatar) {
    const divHeaderMoviles = document.getElementById('headerMoviles');
    const navItem = document.createElement('div');
    navItem.classList.add('nav-item', 'dropdown', 'd-block', 'd-xl-none', 'mx-auto', 'text-center');

    const link = document.createElement('a');
    link.classList.add('nav-link', 'dropdown-toggle');
    link.setAttribute('href', '#');
    link.setAttribute('role', 'button');
    link.setAttribute('data-bs-toggle', 'dropdown');
    link.setAttribute('aria-expanded', 'false');

    const img = document.createElement('img');
    img.setAttribute('src', avatar);
    img.setAttribute('alt', 'mdo');
    img.setAttribute('width', '45');
    img.setAttribute('height', '45');
    img.classList.add('rounded-circle');

    link.appendChild(img);
    navItem.appendChild(link);

    // Crear la lista desplegable
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu', 'text-center', 'text-small');


    // Crear y agregar el tercer item (Perfil)
    const perfilItem = document.createElement('li');
    const perfilLink = document.createElement('a');
    perfilLink.classList.add('dropdown-item', 'text-white', 'fw-bold');
    perfilLink.setAttribute('href', '/Perfiles/perfil/perfil.html');  // Modificar enlace aquí
    perfilLink.textContent = 'Perfil';
    perfilItem.appendChild(perfilLink);
    dropdownMenu.appendChild(perfilItem);

    // Crear y agregar el quinto item (Cerrar sesión)
    const logoutItem = document.createElement('li');
    const logoutLink = document.createElement('a');
    logoutLink.classList.add('dropdown-item', 'text-white', 'fw-bold');
    logoutLink.setAttribute('href', '#');  // Modificar enlace aquí
    logoutLink.textContent = 'Cerrar Sesion';
    logoutItem.appendChild(logoutLink);
    dropdownMenu.appendChild(logoutItem);

    // Agregar el evento de clic al enlace de cerrar sesión
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();  // Prevenir la acción predeterminada del enlace (que no navegue)

        // Aquí puedes agregar el código para cerrar la sesión
        cerrarSesion();
    });

    navItem.appendChild(dropdownMenu);
    divHeaderMoviles.appendChild(navItem);

}

function usuarioConectadoEscritorio(avatar) {
    const divHeaderEscritorio = document.getElementById('headerEscritorio');

    const navItem = document.createElement('div');
    navItem.classList.add('nav-item', 'dropdown', 'd-none', 'd-xl-block');

    // Crear el enlace con la imagen
    const link = document.createElement('a');
    link.classList.add('nav-link', 'dropdown-toggle');
    link.setAttribute('href', '#');
    link.setAttribute('role', 'button');
    link.setAttribute('data-bs-toggle', 'dropdown');
    link.setAttribute('aria-expanded', 'false');

    // Crear la imagen
    const img = document.createElement('img');
    img.setAttribute('src', avatar);
    img.setAttribute('alt', 'mdo');
    img.setAttribute('width', '45');
    img.setAttribute('height', '45');
    img.classList.add('rounded-circle');

    link.appendChild(img);
    navItem.appendChild(link);

    // Crear la lista desplegable
    const dropdownMenu = document.createElement('ul');
    dropdownMenu.classList.add('dropdown-menu', 'text-small', 'text-end');

    // Crear y agregar el tercer item (Perfil)
    const perfilItem = document.createElement('li');
    const perfilLink = document.createElement('a');
    perfilLink.classList.add('dropdown-item', 'text-white', 'fw-bold', 'text-center');
    perfilLink.setAttribute('href', '/Perfiles/perfil/perfil.html');  // Modificar enlace aquí
    perfilLink.textContent = 'Perfil';
    perfilItem.appendChild(perfilLink);
    dropdownMenu.appendChild(perfilItem);


    // Crear y agregar el quinto item (Cerrar sesión)
    const logoutItem = document.createElement('li');
    const logoutLink = document.createElement('a');
    logoutLink.classList.add('dropdown-item', 'text-white', 'fw-bold', 'text-center');
    logoutLink.setAttribute('href', '#');  // Enlace modificado aquí
    logoutLink.textContent = 'Cerrar Sesion';
    logoutItem.appendChild(logoutLink);
    dropdownMenu.appendChild(logoutItem);

    // Agregar el evento de clic al enlace de cerrar sesión
    logoutLink.addEventListener('click', function (event) {
        event.preventDefault();  // Prevenir la acción predeterminada del enlace (que no navegue)

        // Aquí puedes agregar el código para cerrar la sesión
        cerrarSesion();
    });

    navItem.appendChild(dropdownMenu);
    divHeaderEscritorio.appendChild(navItem);

}

// Función para cerrar sesión
async function cerrarSesion() {
    try {
        const response = await fetch('http://localhost:3000/backend/controllers/cerrar_sesion.php', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await response.json();
        if (data.success) {
            // Recargar la página después de cerrar sesión
            window.location.reload();  // Esto recargará la página
        } else {
            console.error(data.error);
        }

    } catch (error) {
        console.error('Error al obtener la sesión:', error);
    }


}
