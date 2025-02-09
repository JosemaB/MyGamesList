document.addEventListener('DOMContentLoaded', iniciarPerfil);

function iniciarPerfil() {
    // Llamar a la función para cargar los avatares cuando se abra el modal
    document.getElementById('staticBackdrop').addEventListener('show.bs.modal', loadAvatars);



    /*Funciones */
    // Función para cargar los avatares en el modal
    async function loadAvatars() {
        // Obtén el contenedor del modal donde se mostrarán las imágenes
        const avatarList = document.getElementById('avatar-list');

        try {
            // Hacer la solicitud AJAX con fetch
            const response = await fetch('http://localhost:3000/backend/helpers/getAvatars.php');
            // Si la respuesta no es ok, lanza un error
            if (!response.ok) {
                throw new Error('Error al cargar las imágenes');
            }
            // Convertir la respuesta en formato JSON
            const avatars = await response.json();
            console.log(avatars);
            // Limpiar el contenido anterior
            avatarList.innerHTML = '';

            // Si hay un error, muestra un mensaje
            if (avatars.error) {
                avatarList.innerHTML = `<p>${avatars.error}</p>`;
                return;
            }
            // Verificar si 'avatars' es un array
            if (Array.isArray(avatars)) {
                avatars.forEach((avatar) => {
                    // Tu código para mostrar los avatares
                    console.log(avatar);  // Para depurar
                    let avatarImg = document.createElement('img');
                    avatarImg.src = avatar;
                    avatarList.appendChild(avatarImg);
                });
            } else {
                console.error("No se recibió un arreglo de avatares");
            }
        } catch (error) {
            console.error('Error al cargar los avatares:', error);
            avatarList.innerHTML = `<p>Error al cargar los avatares.</p>`;
        }
    }

}