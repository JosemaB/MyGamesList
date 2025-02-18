import { redesSociales, obtenerDatosUsuario, mostrarToast, borrarResena, alertDanger, alertSuccess, spinner, borrarAlerta, limpiarHTML, borrarSpinner, formatDate } from '../../js/funciones.js';

document.addEventListener('DOMContentLoaded', iniciarUsuario);

async function iniciarUsuario() {

    const idUsario = 2; /*Hacemos pruebas con este usuario */
    const datosUsuario = await obtenerDatosUsuario(idUsario);
    console.log(datosUsuario);
    perfilInformacion(datosUsuario);
    function perfilInformacion(datosUsuario) {
        const { nombre_usuario, fecha_registro, avatar, sobremi, steam, youtube, discord } = datosUsuario.contenidoUsuario;
        document.getElementById('nombreUsuario').innerText = nombre_usuario;
        document.getElementById('registro').innerText = `Miembro desde: ${formatDate(fecha_registro)}`;
        document.getElementById('imgUsuario').src = (avatar === null ? '/img/avatares/sinAvatar.png' : avatar);  //Por si el avatar es null

        /*Si existe sobre mi, agregamos su card */
        if (sobremi) {
            const divAcercaDeMi = document.getElementById('acercaDeMi');
            // Crear la estructura del div "card"
            const card = document.createElement('div');
            card.classList.add('card');

            // Crear la cabecera de la tarjeta
            const cardHeader = document.createElement('div');
            cardHeader.classList.add('card-header');

            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title', 'text-center', 'fw-bold');
            cardTitle.textContent = 'Acerca de mí';

            cardHeader.appendChild(cardTitle);

            // Crear el cuerpo de la tarjeta
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');

            const cardText = document.createElement('p');
            cardText.classList.add('card-text', 'parrafoAcercaDeMi');

            // Opcional: Puedes agregar contenido a la etiqueta <p> aquí si lo deseas
            cardText.textContent = sobremi;

            cardBody.appendChild(cardText);

            // Agregar la cabecera y el cuerpo a la tarjeta
            card.appendChild(cardHeader);
            card.appendChild(cardBody);

            divAcercaDeMi.appendChild(card);
        }
        redesSociales(discord, steam, youtube);
    }
}