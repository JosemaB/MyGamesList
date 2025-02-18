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

        redesSociales(discord, steam, youtube);
    }
}