import {cerrarSesion} from '../../js/guardian.js';
document.addEventListener('DOMContentLoaded', function () {
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
    /*Home */

    /*Cerrar sesion desde admin*/
    document.getElementById('cerrarSesionMovil').addEventListener('click', cerrarSesion);
    document.getElementById('cerrarSesionEscritorio').addEventListener('click', cerrarSesion);

});