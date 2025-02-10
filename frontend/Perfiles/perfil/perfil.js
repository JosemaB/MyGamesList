document.addEventListener('DOMContentLoaded', iniciarPerfil);

function iniciarPerfil() {
    // Llamar a la función para cargar los avatares cuando se abra el modal
    document.getElementById('staticBackdrop').addEventListener('show.bs.modal', loadAvatars);

    /*Funciones */
    // Función para cargar los avatares en el modal
    async function loadAvatars() {
        const avatarList = document.getElementById('avatar-list');
        const acceptButton = document.getElementById('acceptButton');
        let selectedAvatar = null; // Definir la variable globalmente

        try {
            const response = await fetch('http://localhost:3000/backend/helpers/getAvatars.php');

            if (!response.ok) {
                throw new Error('Error al cargar las imágenes');
            }

            const avatars = await response.json();

            // Limpiar el contenido anterior
            avatarList.innerHTML = '';

            avatars.forEach((avatar) => {
                const button = document.createElement('button');
                button.classList.add('col-4');

                let avatarImg = document.createElement('img');
                avatarImg.src = avatar;
                avatarImg.alt = "Avatar"; // Buenas prácticas
                button.appendChild(avatarImg);

                // Evento para seleccionar el avatar
                button.addEventListener('click', () => {
                    // Remueve la clase 'selected' de otros botones
                    document.querySelectorAll('#avatar-list button').forEach(btn => btn.classList.remove('selected'));

                    // Agrega la clase al botón seleccionado
                    button.classList.add('selected');

                    // Guarda la URL del avatar seleccionado
                    selectedAvatar = avatar;
                });

                avatarList.appendChild(button);
            });
            // Evento para obtener la URL cuando se acepte el modal
            acceptButton.addEventListener('click', () => {
                if (selectedAvatar) {
                    console.log('Avatar seleccionado:', selectedAvatar);
                    // Aquí puedes usar la URL como necesites
                } else {
                    alert('Por favor, selecciona un avatar.');
                }
            });

        } catch (error) {
            console.error('Error al cargar los avatares:', error);
            avatarList.innerHTML = `<p style="color: red;">Error al cargar los avatares.</p>`;
        }
    }


}