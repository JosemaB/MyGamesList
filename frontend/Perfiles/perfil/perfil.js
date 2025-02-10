document.addEventListener('DOMContentLoaded', iniciarPerfil);
import { limpiarHTML, spinner } from '../../js/funciones.js';

function iniciarPerfil() {
    // Llamar a la función para cargar los avatares cuando se abra el modal
    document.getElementById('staticBackdrop').addEventListener('show.bs.modal', loadAvatars);

    /*Variables "globales script" */
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
                button.classList.add('col-4');

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
}