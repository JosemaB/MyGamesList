




export function validarHeaderMovil() {
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
    img.setAttribute('src', '/img/agregar-usuario.png');
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
    perfilLink.setAttribute('href', '../Perfiles/perfil/perfil.html');  // Modificar enlace aquí
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

    navItem.appendChild(dropdownMenu);
    divHeaderMoviles.appendChild(navItem);

}

export function validarHeaderEscritorio() {
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
    img.setAttribute('src', '/img/agregar-usuario.png');
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
    perfilLink.setAttribute('href', '../Perfiles/perfil/perfil.html');  // Modificar enlace aquí
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

    navItem.appendChild(dropdownMenu);
    divHeaderEscritorio.appendChild(navItem);

}
